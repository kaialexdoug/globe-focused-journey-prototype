import { useEffect, useRef, useState } from 'react'

import { askForCompass, compassState, onCompassAnswer } from './compass.js'
import { CompassIcon, LocateIcon } from './Icons.jsx'
import { MAP_ID } from './config.js'
import { findRoute, loadGoogleMaps } from './googleMaps.js'
import { makePin, namePlacer } from './mapPins.js'

// The live map on a stop's directions screen: Google's interactive map, with
// the stop's photo and name where it is, the route from where you are to it,
// and a blue dot that moves with you while the app's open. It needs the stop's exact spot (`mapPoint` on
// its card). Stops without one get the simpler embedded map instead
// (EmbedMap in StopPages.jsx), and so does any stop if this one can't load,
// or can't find a route from where you are (`onFail`).
//
// Google counts one map load each time this map appears, and one route
// request. Both are free up to a monthly allowance, and capped per day in
// Google Cloud. The dot moving costs nothing: that all happens on the phone.

// Google's map script and the route-finding are shared with the map of the
// whole route on See Your Journey (googleMaps.js). A stop you'd get to by
// train only gets a route if you're within walking distance; otherwise it's
// the embedded map, with the trains.

// Which way you're facing comes from the phone's compass, and shows as a
// beam from your dot, like in Google Maps. On an iPhone, the app asks to use
// it when you start the journey (compass.js), so it's there by the time the
// map is. If it somehow hasn't asked yet, the map has a Show Direction button.

// How far the screen's turned from upright (on its side, say), so the beam
// still points the way the top of the phone does.
function screenTurn() {
  return window.screen?.orientation?.angle ?? window.orientation ?? 0
}

// The compass heading, in degrees clockwise from north, from one reading of
// the phone's orientation, or null if it doesn't say. An iPhone gives it
// as is; elsewhere it's worked out from `alpha`, if that's measured from
// north (`absolute`) rather than from wherever the phone started.
function compassHeading(event) {
  if (typeof event.webkitCompassHeading === 'number') {
    return event.webkitCompassHeading + screenTurn()
  }
  if (event.absolute && typeof event.alpha === 'number') {
    return 360 - event.alpha + screenTurn()
  }
  return null
}

function LiveMap({ stop, onFail }) {
  const canvasRef = useRef(null)
  const failRef = useRef(onFail)
  // Puts you back in the middle, once the map's up.
  const recenterRef = useRef(null)
  // No location yet (or not allowed): the map just shows the stop.
  const [lost, setLost] = useState(false)
  // You've moved the map off yourself, so it's stopped following you.
  const [wandered, setWandered] = useState(false)
  // Only if the phone hasn't been asked about the compass yet.
  const [askCompass, setAskCompass] = useState(() => compassState() === 'unasked')

  useEffect(() => {
    failRef.current = onFail
  })

  useEffect(() => {
    let cancelled = false
    let watchId = null
    let lostTimer = null

    // You: a blue dot, with the beam for which way you're facing behind it,
    // hidden until there's a heading.
    const you = document.createElement('div')
    you.className = 'liveMapYou'
    const beam = document.createElement('div')
    beam.className = 'liveMapBeam'
    const dot = document.createElement('div')
    dot.className = 'liveMapDot'
    you.append(beam, dot)

    // The heading, smoothed out, as a compass jitters. Drawn at most once a
    // frame. Until the compass says anything, the way you're walking stands
    // in for it.
    let heading = null
    let fromCompass = false
    let frame = 0
    function showHeading(degrees) {
      if (heading === null) {
        heading = degrees
      } else {
        // The short way round: from 350° to 10° is 20°, not 340°. The heading
        // itself can go past 360°, so the beam never spins the long way back.
        const turn = ((((degrees - heading) % 360) + 540) % 360) - 180
        heading += turn * 0.3
      }
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0
          beam.style.transform = `rotate(${heading}deg)`
          beam.classList.add('isShown')
        })
      }
    }
    function onOrientation(event) {
      const degrees = compassHeading(event)
      if (degrees !== null) {
        fromCompass = true
        showHeading(degrees)
      }
    }
    // Android's reading measured from north has its own event. Elsewhere it's
    // the usual one, which says whether it's measured from north.
    const orientationEvent = 'ondeviceorientationabsolute' in window ? 'deviceorientationabsolute' : 'deviceorientation'
    function listenToCompass() {
      window.addEventListener(orientationEvent, onOrientation)
    }
    // Straight away if it's allowed, or else as soon as it is: the answer to
    // the question asked when the journey started can come after the map.
    if (compassState() === 'allowed') {
      listenToCompass()
    }
    const stopWaiting = onCompassAnswer((state) => {
      if (state === 'allowed') {
        listenToCompass()
      }
      setAskCompass(state === 'unasked')
    })

    function fail(error) {
      console.error('Live map not shown:', error)
      if (!cancelled) {
        failRef.current()
      }
    }
    // Google calls this if it turns the key down (if it's not allowed on
    // this site, say).
    window.gm_authFailure = () => fail(new Error('Google turned down the Maps key'))

    async function start() {
      await loadGoogleMaps()
      const { importLibrary } = window.google.maps
      const [{ LatLngBounds }, { Map, Circle, Polyline }, { AdvancedMarkerElement }, { Route }] = await Promise.all([
        importLibrary('core'),
        importLibrary('maps'),
        importLibrary('marker'),
        importLibrary('routes'),
      ])
      if (cancelled) {
        return
      }

      const styles = getComputedStyle(document.documentElement)
      const map = new Map(canvasRef.current, {
        center: stop.mapPoint,
        zoom: 16,
        mapId: MAP_ID,
        // Light, to match the app. (When dark mode comes back, this follows it.)
        colorScheme: 'LIGHT',
        disableDefaultUI: true,
        // One finger moves the map, as in Google Maps.
        gestureHandling: 'greedy',
        clickableIcons: false,
      })

      // The stop: its photo, with its name beside it on whichever side is on
      // the map (mapPins.js), as on the route map on See Your Journey. Your
      // dot goes over the photo, and the name over that.
      const pin = makePin(stop, { large: true })
      new AdvancedMarkerElement({ map, position: stop.mapPoint, content: pin.photoPin, title: stop.name, zIndex: 0 })
      new AdvancedMarkerElement({ map, position: stop.mapPoint, content: pin.namePin, zIndex: 2 })
      map.addListener('idle', namePlacer(canvasRef.current, [pin]))

      // You, in a pale circle as wide as the phone's unsure of.
      const youMarker = new AdvancedMarkerElement({ content: you, zIndex: 1 })
      const halo = new Circle({ clickable: false, strokeOpacity: 0, fillColor: '#4285f4', fillOpacity: 0.15 })

      let following = true
      map.addListener('dragstart', () => {
        following = false
        setWandered(true)
      })
      recenterRef.current = () => {
        following = true
        setWandered(false)
        if (youMarker.position) {
          map.panTo(youMarker.position)
        }
      }

      if (!('geolocation' in navigator)) {
        setLost(true)
        return
      }
      // Still nothing after a while: say so, but keep looking.
      lostTimer = setTimeout(() => setLost(true), 12000)

      let routed = false
      watchId = navigator.geolocation.watchPosition(
        async (position) => {
          if (cancelled) {
            return
          }
          clearTimeout(lostTimer)
          setLost(false)
          const here = { lat: position.coords.latitude, lng: position.coords.longitude }
          youMarker.position = here
          youMarker.map = map
          // No compass (or not yet): the way you're walking, while you are.
          const { heading: walkingHeading, speed } = position.coords
          if (!fromCompass && Number.isFinite(walkingHeading) && speed > 0.5) {
            showHeading(walkingHeading)
          }
          halo.setCenter(here)
          halo.setRadius(position.coords.accuracy)
          halo.setMap(map)

          if (!routed) {
            // The first time: you, the stop and the route between, all in view.
            routed = true
            const view = new LatLngBounds()
            view.extend(here)
            view.extend(stop.mapPoint)
            map.fitBounds(view, 48)
            let path = null
            try {
              path = await findRoute(Route, here, stop)
            } catch (error) {
              console.warn(`No route to ${stop.name}:`, error)
            }
            if (cancelled) {
              return
            }
            if (!path) {
              // No route from here (too far to walk to the station, say):
              // the embedded map instead, which has the trains.
              failRef.current()
              return
            }
            new Polyline({
              map,
              path,
              strokeColor: styles.getPropertyValue('--unfold-green').trim() || '#13393a',
              strokeOpacity: 0.9,
              strokeWeight: 5,
            })
            path.forEach((point) => view.extend(point))
            if (following) {
              map.fitBounds(view, 48)
            }
          } else if (following && !map.getBounds()?.contains(here)) {
            // After that, it only moves when you're about to walk off it.
            map.panTo(here)
          }
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            clearTimeout(lostTimer)
            setLost(true)
          }
        },
        { enableHighAccuracy: true, maximumAge: 5000 }
      )
    }

    start().catch(fail)

    return () => {
      cancelled = true
      clearTimeout(lostTimer)
      cancelAnimationFrame(frame)
      window.removeEventListener(orientationEvent, onOrientation)
      stopWaiting()
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [stop])

  return (
    <>
      {lost && <p className="mapNote">We couldn't find your location — here's {stop.name}.</p>}
      <div className="liveMap">
        <div className="liveMapCanvas" ref={canvasRef}></div>
        {askCompass && (
          <button className="liveMapCompass" onClick={askForCompass}>
            <CompassIcon />
            Show direction
          </button>
        )}
        {wandered && (
          <button className="liveMapRecenter" onClick={() => recenterRef.current?.()} aria-label="Back to where you are">
            <LocateIcon />
          </button>
        )}
      </div>
    </>
  )
}

export default LiveMap
