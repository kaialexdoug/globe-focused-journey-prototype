import { MAPS_API_KEY } from './config.js'

// Google's maps, shared by the live map on a stop's directions screen
// (LiveMap.jsx) and the map of the whole route on See Your Journey
// (RouteMap.jsx): loading Google's map script, and finding the route from one
// place to a stop.

// Google's map script, loaded the first time a map's needed, and shared by
// every one after.
let mapsLoading = null

export function loadGoogleMaps() {
  if (!mapsLoading) {
    mapsLoading = new Promise((resolve, reject) => {
      window.unfoldMapsReady = resolve
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&v=weekly&loading=async&callback=unfoldMapsReady`
      script.async = true
      script.onerror = () => {
        // So the next map tries again.
        mapsLoading = null
        script.remove()
        reject(new Error('Google’s map script didn’t load'))
      }
      document.head.append(script)
    })
  }
  return mapsLoading
}

// A stop's travelMode, in Google's words.
const TRAVEL_MODES = { walking: 'WALKING', transit: 'TRANSIT', driving: 'DRIVING', bicycling: 'BICYCLING' }

// The route-finding here has no train routes in Japan (Google Maps itself,
// and so the embedded map, does). For a stop you'd get to by train, you get
// a walking route instead if you're this close, and otherwise no route.
const WALKABLE_METERS = 3000

// Near enough, over a few kilometres.
function metersBetween(a, b) {
  const radians = Math.PI / 180
  const x = (b.lng - a.lng) * radians * Math.cos(((a.lat + b.lat) / 2) * radians)
  const y = (b.lat - a.lat) * radians
  return Math.hypot(x, y) * 6371000
}

// The route from `from` to the stop, as points along it, or null if there
// isn't one. `Route` is Google's, from its routes library.
export async function findRoute(Route, from, stop) {
  let travelMode = TRAVEL_MODES[stop.travelMode] ?? 'WALKING'
  if (stop.travelMode === 'transit') {
    if (metersBetween(from, stop.mapPoint) >= WALKABLE_METERS) {
      return null
    }
    travelMode = 'WALKING'
  }

  const { routes } = await Route.computeRoutes({
    origin: from,
    destination: stop.mapPoint,
    travelMode,
    // Only the line itself: asking for more costs more.
    fields: ['path'],
  })
  return routes?.[0]?.path?.map((point) => ({ lat: point.lat, lng: point.lng })) ?? null
}
