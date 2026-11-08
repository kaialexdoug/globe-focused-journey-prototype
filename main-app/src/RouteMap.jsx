import { useEffect, useRef, useState } from 'react'

import { MAP_ID } from './config.js'
import { findRoute, loadGoogleMaps } from './googleMaps.js'
import { makePin, namePlacer } from './mapPins.js'

// The whole route on a map, at the bottom of the route preview on See Your
// Journey (RoutePreview.jsx): a pin at each stop, with a little photo, its
// number and its name (mapPins.js), joined up in order by the walking route
// in a solid line. A detour hangs off the stop it branches from in a dotted line, out
// to the detour and on to the next stop.
//
// It needs every stop's exact spot (`mapPoint`), so for now only the Waseda
// journey has it. If Google's map doesn't load, it isn't shown at all. A
// stop can have a shorter name for the map (`mapName`, like "Kansen-en" for
// Kansen-en Garden), as names take up a lot of a phone-sized map; its full
// name is in the list just above.
//
// Google's terms don't let us keep their route lines, so they're asked for
// each time the map's shown, one request per line, and then kept for as long
// as the app's open, so going back to the journey doesn't ask again. The map
// itself counts as one map load, as the live map does. Both are free up to a
// monthly allowance, and the map only loads once you scroll near it.

// Each stop to pin, in order, with its number on the route. A detour comes
// straight after the stop it branches from, without a number.
function mapPins(journey) {
  const pins = []
  journey.route.forEach((stop, index) => {
    pins.push({ stop, number: index + 1 })
    stop.detours?.forEach((detour) => pins.push({ stop: detour, detour: true }))
  })
  return pins
}

// Each line to draw, from a spot to a stop: solid from each stop to the
// next, and dotted out to a detour and from it on to the next stop (or back,
// from the last stop).
function mapLines(journey) {
  const lines = []
  journey.route.forEach((stop, index) => {
    const next = journey.route[index + 1]
    if (next) {
      lines.push({ from: stop.mapPoint, to: next })
    }
    stop.detours?.forEach((detour) => {
      lines.push({ from: stop.mapPoint, to: detour, detour: true })
      lines.push({ from: detour.mapPoint, to: next ?? stop, detour: true })
    })
  })
  return lines
}

// The lines already found, for as long as the app's open.
const foundRoutes = new Map()

// The route for a line, or a straight line if Google hasn't got one.
async function routeFor(Route, line) {
  const end = line.to.mapPoint
  const key = `${line.from.lat},${line.from.lng} ${end.lat},${end.lng}`
  if (!foundRoutes.has(key)) {
    const finding = findRoute(Route, line.from, line.to).catch((error) => {
      console.warn(`No route to ${line.to.name}:`, error)
      // Try again next time.
      foundRoutes.delete(key)
      return null
    })
    foundRoutes.set(key, finding)
  }
  return (await foundRoutes.get(key)) ?? [line.from, end]
}

// The room left around the stops and lines when the map's fitted to them,
// for the photos and names, in pixels.
const FIT_PADDING = { top: 56, bottom: 56, left: 30, right: 30 }

function RouteMap({ journey }) {
  const canvasRef = useRef(null)
  const [failed, setFailed] = useState(false)
  const pins = mapPins(journey)
  const canShow = pins.every((pin) => pin.stop.mapPoint)
  const hasDetours = pins.some((pin) => pin.detour)

  useEffect(() => {
    if (!canShow) {
      return
    }
    let cancelled = false
    let resizing = null
    const canvas = canvasRef.current

    function fail(error) {
      console.error('Route map not shown:', error)
      if (!cancelled) {
        setFailed(true)
      }
    }

    async function start() {
      await loadGoogleMaps()
      // Google calls this if it turns the key down.
      window.gm_authFailure = () => fail(new Error('Google turned down the Maps key'))
      const { importLibrary } = window.google.maps
      const [{ LatLngBounds, SymbolPath }, { Map, Polyline }, { AdvancedMarkerElement }, { Route }] = await Promise.all([
        importLibrary('core'),
        importLibrary('maps'),
        importLibrary('marker'),
        importLibrary('routes'),
      ])
      if (cancelled) {
        return
      }

      const stops = mapPins(journey)
      const map = new Map(canvas, {
        center: stops[0].stop.mapPoint,
        zoom: 14,
        mapId: MAP_ID,
        colorScheme: 'LIGHT',
        disableDefaultUI: true,
        // The page scrolls past it with one finger; two move the map.
        gestureHandling: 'cooperative',
        clickableIcons: false,
        // So the stops can fill the map, rather than the nearest whole zoom.
        isFractionalZoomEnabled: true,
      })
      const view = new LatLngBounds()
      stops.forEach((pin) => view.extend(pin.stop.mapPoint))
      map.fitBounds(view, FIT_PADDING)

      // The pins: each stop's photo, with its number on the route, and its
      // name beside it, placed again whenever the map's moved or zoomed.
      const placed = stops.map((pin, index) => {
        const made = makePin(pin.stop, { number: pin.number, detour: pin.detour })
        new AdvancedMarkerElement({
          map,
          position: pin.stop.mapPoint,
          content: made.photoPin,
          title: pin.detour ? `Optional detour: ${pin.stop.name}` : `${pin.number}. ${pin.stop.name}`,
          // The stops on the route over any detours, so their numbers show,
          // and earlier stops over later ones.
          zIndex: pin.detour ? 0 : stops.length - index,
        })
        // The names over all the photos.
        new AdvancedMarkerElement({
          map,
          position: pin.stop.mapPoint,
          content: made.namePin,
          zIndex: stops.length * 2 - index,
        })
        return made
      })
      map.addListener('idle', namePlacer(canvas, placed))

      // Once you've moved the map yourself, it stays where you put it.
      let moved = false
      map.addListener('dragstart', () => {
        moved = true
      })
      // Otherwise, it's fitted again if it changes size (with the phone
      // turned on its side, say).
      resizing = new ResizeObserver(() => {
        if (!moved) {
          map.fitBounds(view, FIT_PADDING)
        }
      })
      resizing.observe(canvas)

      // The lines, each drawn as soon as it's found. Once they all are, the
      // map's fitted to them too, as a walk can wander outside its stops.
      const green = getComputedStyle(document.documentElement).getPropertyValue('--unfold-green').trim() || '#13393a'
      const drawing = mapLines(journey).map((line) =>
        routeFor(Route, line).then((path) => {
          if (cancelled) {
            return
          }
          path.forEach((point) => view.extend(point))
          if (line.detour) {
            new Polyline({
              map,
              path,
              strokeOpacity: 0,
              zIndex: 3,
              icons: [
                {
                  icon: { path: SymbolPath.CIRCLE, scale: 2, fillColor: green, fillOpacity: 1, strokeOpacity: 0 },
                  offset: '0',
                  repeat: '9px',
                },
              ],
            })
          } else {
            // A white edge under the line, so it stands out from the streets.
            new Polyline({ map, path, strokeColor: '#ffffff', strokeOpacity: 0.9, strokeWeight: 8, zIndex: 1 })
            new Polyline({ map, path, strokeColor: green, strokeOpacity: 0.9, strokeWeight: 4, zIndex: 2 })
          }
        })
      )
      await Promise.all(drawing)
      if (!cancelled && !moved) {
        map.fitBounds(view, FIT_PADDING)
      }
    }

    // Only once it's close to being scrolled into view.
    const watcher = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          watcher.disconnect()
          start().catch(fail)
        }
      },
      { rootMargin: '300px 0px' }
    )
    watcher.observe(canvas)

    return () => {
      cancelled = true
      watcher.disconnect()
      resizing?.disconnect()
    }
  }, [journey, canShow])

  if (!canShow || failed) {
    return null
  }

  return (
    <div className="routeMap">
      <div className="routeMapCanvas" ref={canvasRef}></div>
      <div className="routeMapKey" aria-hidden="true">
        <span className="routeMapKeyItem">
          <span className="routeMapKeyLine"></span>
          The route
        </span>
        {hasDetours && (
          <span className="routeMapKeyItem">
            <span className="routeMapKeyLine isDotted"></span>
            Optional detour
          </span>
        )}
      </div>
    </div>
  )
}

export default RouteMap
