import { useEffect, useRef } from 'react'
import { L, createMap, drawRoute, beatIcon } from './mapBase'

// A street map of one journey: the walking path traced over it, and a numbered
// pin on every beat.
//
// Leaflet is not a React library — it builds its own DOM. So the pattern is:
// give it an empty <div>, build the map inside a useEffect once, and tear it
// down again when this component goes away.
function JourneyMap({ journey, selectedBeat, onSelectBeat }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])

  // Held in a ref so that a new copy of the callback doesn't rebuild the map.
  const onSelectRef = useRef(onSelectBeat)
  useEffect(() => {
    onSelectRef.current = onSelectBeat
  }, [onSelectBeat])

  // Build the map. Only ever runs again if the journey itself changes.
  useEffect(() => {
    const map = createMap(containerRef.current)
    mapRef.current = map

    drawRoute(map, journey.path)

    markersRef.current = journey.beats.map((beat, index) => {
      const marker = L.marker([beat.lat, beat.lng], {
        icon: beatIcon(index + 1),
        title: beat.location_label,
      }).addTo(map)

      marker.on('click', () => onSelectRef.current(index))
      return marker
    })

    // Frame the whole walk, leaving room for the pins near the edges.
    map.fitBounds(L.latLngBounds(journey.path), { padding: [30, 30] })

    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current = []
    }
  }, [journey])

  // Highlight the selected beat, and bring it into view.
  useEffect(() => {
    markersRef.current.forEach((marker, index) => {
      const element = marker.getElement()
      if (element) {
        element.classList.toggle('isSelected', index === selectedBeat)
      }
    })

    if (mapRef.current && selectedBeat !== null) {
      const beat = journey.beats[selectedBeat]
      mapRef.current.panTo([beat.lat, beat.lng])
    }
  }, [journey, selectedBeat])

  return <div className="journeyMap" ref={containerRef}></div>
}

export default JourneyMap
