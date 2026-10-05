import { useState } from 'react'
import JourneyMap from './JourneyMap.jsx'

// Screen 2: what this walk is, before committing to it. The map is the point
// of this screen — the traced path and the key spots along it.
function JourneyPreview({ journey, onBegin, onBack }) {
  const [selectedBeat, setSelectedBeat] = useState(null)

  return (
    <div className="previewScreen">
      <p className="resultLabel">JOURNEY PREVIEW</p>
      <h1 className="mainHook">{journey.title}</h1>
      <p className="journeyTags">
        {journey.duration_estimate} · {journey.distance_estimate} ·{' '}
        {journey.pace_tag}
      </p>
      <p className="resultText">{journey.short_description}</p>

      <div className="moodTags">
        {journey.mood_tags.map((tag) => (
          <span key={tag} className="moodTag">
            {tag}
          </span>
        ))}
      </div>

      <JourneyMap
        journey={journey}
        selectedBeat={selectedBeat}
        onSelectBeat={setSelectedBeat}
      />
      <p className="mapHint">Tap a marker, or a stop below, to place it.</p>

      {/* The key spots. Deliberately just the place names — the lines
          themselves are saved for the walk. */}
      <div className="stopList">
        {journey.beats.map((beat, index) => (
          <button
            key={beat.id}
            className={selectedBeat === index ? 'stopItem isSelected' : 'stopItem'}
            onClick={() => setSelectedBeat(index)}
          >
            <span className="stopNum">{index + 1}</span>
            <span className="stopBody">
              <span className="stopName">{beat.location_label}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="testTakeBtnContainer">
        <button className="introBtn" onClick={onBegin}>
          BEGIN JOURNEY ➜
        </button>
        <button className="backBtn" onClick={onBack}>
          NOT NOW
        </button>
      </div>
    </div>
  )
}

export default JourneyPreview
