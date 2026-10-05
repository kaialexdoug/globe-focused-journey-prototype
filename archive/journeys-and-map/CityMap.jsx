import { useEffect, useRef, useState } from 'react'
import { JOURNEYS } from './journeys'
import { L, createMap, drawRoute, beatIcon } from './mapBase'

// The Map tab: every journey drawn on one map of Tokyo, to pan around and look
// at. Picking one from the list below brings it forward and zooms to it;
// picking it again zooms back out to all of them.
function CityMap() {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const layersRef = useRef([])

  const [selected, setSelected] = useState(null)
  const [beatLabel, setBeatLabel] = useState(null)

  // Build the map once. Everything on it is redrawn by the effect below.
  useEffect(() => {
    const map = createMap(containerRef.current)
    mapRef.current = map
    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // Draw the routes, and redraw them whenever the selection changes so the
  // chosen one comes forward and the rest step back.
  useEffect(() => {
    const map = mapRef.current
    if (!map) {
      return
    }

    // Clear whatever was drawn last time.
    layersRef.current.forEach((layer) => layer.remove())
    layersRef.current = []

    JOURNEYS.forEach((journey, journeyIndex) => {
      const chosen = selected === journeyIndex
      const dimmed = selected !== null && !chosen
      layersRef.current.push(...drawRoute(map, journey.path, dimmed))

      if (chosen) {
        // The journey being looked at gets a pin on every beat, numbered the
        // way the walk runs.
        journey.beats.forEach((beat, beatIndex) => {
          const marker = L.marker([beat.lat, beat.lng], {
            icon: beatIcon(beatIndex + 1),
            title: beat.location_label,
          }).addTo(map)

          marker.on('click', () => setBeatLabel(beat.location_label))
          layersRef.current.push(marker)
        })
        return
      }

      // Every other journey gets a single pin at its start, numbered to match
      // the list below. Five pins per journey would be one overlapping clump
      // at this zoom, and the numbers would fight with the list's.
      const start = journey.beats[0]
      const marker = L.marker([start.lat, start.lng], {
        icon: beatIcon(journeyIndex + 1),
        opacity: dimmed ? 0.4 : 1,
        title: journey.title,
      }).addTo(map)

      marker.on('click', () => {
        setBeatLabel(null)
        setSelected(journeyIndex)
      })

      layersRef.current.push(marker)
    })

    // Frame either the chosen journey or the whole city. The move is not
    // animated: an animated fit can be dropped if another one is still
    // running, which left the map stuck on the journey before this one.
    const framed =
      selected === null
        ? JOURNEYS.flatMap((journey) => journey.path)
        : JOURNEYS[selected].path

    map.invalidateSize()
    map.fitBounds(L.latLngBounds(framed), { padding: [30, 30], animate: false })
  }, [selected])

  function pick(index) {
    setBeatLabel(null)
    setSelected(selected === index ? null : index)
  }

  return (
    <div className="mapTab">
      <p className="resultLabel">THE MAP</p>
      <p className="journeyListNote">
        Every journey we have walked in Tokyo so far. Drag, zoom, and tap a
        marker to see what is there.
      </p>

      <div className="cityMap" ref={containerRef}></div>
      <p className="mapHint">
        {beatLabel ||
          (selected === null
            ? 'Tap a marker, or a journey below, to open it up.'
            : `${JOURNEYS[selected].title} — tap a stop, or the journey again to zoom back out.`)}
      </p>

      <div className="stopList">
        {JOURNEYS.map((journey, index) => (
          <button
            key={journey.id}
            className={selected === index ? 'stopItem isSelected' : 'stopItem'}
            onClick={() => pick(index)}
          >
            <span className="stopNum">{index + 1}</span>
            <span className="stopBody">
              <span className="stopName">{journey.title}</span>
              <span className="stopNote">
                {journey.duration_estimate} · {journey.distance_estimate} ·{' '}
                {journey.beats.length} stops
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CityMap
