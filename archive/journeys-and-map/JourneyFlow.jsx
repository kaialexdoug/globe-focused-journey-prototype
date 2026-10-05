import { useState } from 'react'
import JourneyPreview from './JourneyPreview.jsx'
import ActiveJourney from './ActiveJourney.jsx'

// Pick a journey, look at it, walk it, finish it. One `stage` variable decides
// which screen is on, the same way App.jsx switches pages.
//
// Two places use this: the Journeys tab, which passes every journey, and the
// quiz result, which passes the handful that suit your answers. The only
// difference between them is the list handed in and the wording above it.
//
// `onWalkingChange` tells App when the walk starts and stops, so the nav bar
// can get out of the way for it.
function JourneyFlow({ journeys, label, note, onBack, onWalkingChange }) {
  const [stage, setStage] = useState('list')
  const [journey, setJourney] = useState(null)
  const [beatsSeen, setBeatsSeen] = useState(0)

  function openPreview(picked) {
    setJourney(picked)
    setStage('preview')
  }

  function begin() {
    setStage('active')
    onWalkingChange(true)
  }

  function leave() {
    setStage('preview')
    onWalkingChange(false)
  }

  function finish(beats) {
    setBeatsSeen(beats)
    setStage('complete')
    onWalkingChange(false)
  }

  if (stage === 'preview') {
    return (
      <JourneyPreview
        journey={journey}
        onBegin={begin}
        onBack={() => setStage('list')}
      />
    )
  }

  if (stage === 'active') {
    return (
      <ActiveJourney journey={journey} onFinish={finish} onLeave={leave} />
    )
  }

  if (stage === 'complete') {
    return (
      <JourneyComplete
        journey={journey}
        beatsSeen={beatsSeen}
        onDone={() => setStage('list')}
      />
    )
  }

  return (
    <JourneyList
      journeys={journeys}
      label={label}
      note={note}
      onPick={openPreview}
      onBack={onBack}
    />
  )
}

// Screen 1: the journeys on offer, as cards.
function JourneyList({ journeys, label, note, onPick, onBack }) {
  return (
    <div className="journeyList">
      <p className="resultLabel">{label}</p>
      <p className="journeyListNote">{note}</p>

      {journeys.map((journey, index) => (
        <button
          key={journey.id}
          className="journeyCard"
          onClick={() => onPick(journey)}
        >
          {index === 0 && onBack && (
            <span className="journeyBadge">CLOSEST MATCH</span>
          )}
          <h2 className="journeyCardTitle">{journey.title}</h2>
          <p className="journeyTags">
            {journey.duration_estimate} · {journey.distance_estimate} ·{' '}
            {journey.pace_tag}
          </p>
          <p className="journeyCardText">{journey.short_description}</p>
          <span className="journeyCardGo">BEGIN JOURNEY &gt;</span>
        </button>
      ))}

      {onBack && (
        <div className="testTakeBtnContainer">
          <button className="backBtn" onClick={onBack}>
            &lt; BACK TO YOUR RESULT
          </button>
        </div>
      )}
    </div>
  )
}

// Screen 4: what happened, and two questions worth asking while it is fresh.
function JourneyComplete({ journey, beatsSeen, onDone }) {
  const [paid, setPaid] = useState(null)

  return (
    <div className="completeScreen">
      <p className="resultLabel">JOURNEY COMPLETE</p>
      <h1 className="mainHook">{journey.title}</h1>

      <div className="completeStats">
        <div className="completeStat">
          <span className="completeNum">{beatsSeen}</span>
          <span className="completeCaption">MOMENTS</span>
        </div>
        <div className="completeStat">
          <span className="completeNum">{journey.distance_estimate}</span>
          <span className="completeCaption">WALKED</span>
        </div>
        <div className="completeStat">
          <span className="completeNum">{journey.duration_estimate}</span>
          <span className="completeCaption">TAKEN</span>
        </div>
      </div>

      <div className="divider"></div>

      {/* Reflection prompts. Nothing is stored anywhere in the prototype —
          they are here to show the shape of the ending. */}
      <p className="reflectPrompt">What surprised you?</p>
      <p className="reflectPrompt">Which stop would you go back to?</p>

      <div className="divider"></div>

      <p className="payQuestion">Would you have paid for this?</p>
      <div className="payChoices">
        {['No', 'Maybe', 'Yes'].map((choice) => (
          <button
            key={choice}
            className={paid === choice ? 'payBtn isSelected' : 'payBtn'}
            onClick={() => setPaid(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
      {paid && <p className="payThanks">Noted. Thank you.</p>}

      <div className="testTakeBtnContainer">
        <button className="introBtn" onClick={onDone}>
          BACK TO JOURNEYS ➜
        </button>
      </div>
    </div>
  )
}

export default JourneyFlow
