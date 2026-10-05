import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// The pieces both maps share: the dark base map, a traced route, and a beat
// pin. Keeping them here means the two map screens can't drift apart.

// Builds a Leaflet map in `container` with the app's street tiles on it.
export function createMap(container) {
  const map = L.map(container, {
    // Scroll-zoom would fight with scrolling the page on a phone.
    scrollWheelZoom: false,
  })

  // Street tiles from OpenStreetMap: free, and no API key to manage. They
  // arrive light-coloured and are turned dark by a CSS filter on
  // .leaflet-tile in App.css, which keeps the map inside the app's palette.
  //
  // These load over the internet — with no connection the map comes up empty,
  // but nothing else breaks.
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  return map
}

// Draws one walking route: a soft wide line for the glow, the sharp one on
// top. `dimmed` is for routes that aren't the one being looked at.
export function drawRoute(map, path, dimmed = false) {
  const suffix = dimmed ? ' isDimmed' : ''
  return [
    L.polyline(path, { className: 'journeyPathGlow' + suffix }).addTo(map),
    L.polyline(path, { className: 'journeyPath' + suffix }).addTo(map),
  ]
}

// A numbered pin. divIcon means the pin is just a piece of HTML, so it can be
// styled in App.css like everything else.
export function beatIcon(number) {
  return L.divIcon({
    className: 'beatPinWrap',
    html: `<span class="beatPin">${number}</span>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  })
}

export { L }
