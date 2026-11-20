import { useEffect, useState } from 'react'

import Header from './Header.jsx'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
  EffortIcon,
  InfoIcon,
  NavigateIcon,
  WalkIcon,
} from './Icons.jsx'
import WeatherReport from './WeatherReport.jsx'
import { journeyPlaceName } from './journeyPlaces.js'
import { durationText, journeyHours, metersText, rideTotals, walkingTotals } from './journeyTimes.js'
import { conditionsVerdict, lookUpConditions, savedConditions } from './weather.js'
import { useUnits } from './units.js'

// Get Ready, between BEGIN JOURNEY and the first stop: today's conditions
// where the journey starts (weather.js), so you can tell whether now's a good
// time to go. The temperature now, sunrise and sunset, the next 24 hours an
// hour at a time, and a verdict on how the weather suits the journey, from
// now until it'd end (all in WeatherReport.jsx). Then how long it takes and
// how hard it is, and whether you're at the starting point: I'M HERE goes
// straight to the first stop, and GET DIRECTIONS to the way there.

// How hard the journey is, as bars on its effort icon.
const EFFORT_LEVELS = { Easy: 1, Moderate: 2, Active: 3 }

function GetReadyPage({ journey, onBack, onStopJourney, onImHere, onDirections }) {
  const units = useUnits()
  const point = journey.departure.mapPoint
  const [conditions, setConditions] = useState(() => (point ? savedConditions(point) : null))
  const [failed, setFailed] = useState(!point)
  // Goes up by one each time TRY AGAIN is pressed, to look it up again.
  const [tries, setTries] = useState(0)

  useEffect(() => {
    if (!point) {
      return undefined
    }
    let current = true
    // Asked even when the weather's already on the page: if it was kept from
    // the last few minutes, this just gives the same back. (Stopping here
    // instead could leave the page checking forever, if the weather came in
    // after the page first looked for it, but before this.)
    lookUpConditions(point)
      .then((found) => {
        if (current) setConditions(found)
      })
      .catch(() => {
        if (current) setFailed(true)
      })
    return () => {
      current = false
    }
  }, [point, tries])

  // Back to "Checking today's weather…", and look again.
  function tryAgain() {
    setFailed(false)
    setTries((count) => count + 1)
  }

  const place = journeyPlaceName(journey)
  const hours = journeyHours(journey)
  const walking = walkingTotals(journey)
  const ride = rideTotals(journey)
  const verdict = conditions ? conditionsVerdict(conditions, hours, units) : null

  return (
    <div className="stepPage getReadyPage">
      <div className="stepBar">
        <button className="stepBack" onClick={onBack} aria-label="Back to the journey">
          <ArrowLeftIcon />
        </button>
        <Header />
        <button className="stepClose" onClick={onStopJourney} aria-label="End journey">
          <CloseIcon />
        </button>
      </div>

      <h1 className="stepTitle">Get Ready for Your Journey</h1>
      <p className="stepText">Today’s conditions for {place}</p>

      {conditions ? (
        <WeatherReport conditions={conditions} verdict={verdict} place={place} units={units} />
      ) : failed ? (
        // With TRY AGAIN in the middle, under the words.
        <div className="readyVerdict isUnknown" role="status">
          <InfoIcon className="readyVerdictIcon" />
          <div>
            <p className="readyVerdictTitle">Couldn’t get today’s weather</p>
            <p className="readyVerdictText">Have a look at the sky, and the forecast, before you set off.</p>
          </div>
          {point && (
            <button className="readyRetry" onClick={tryAgain}>
              Try Again
            </button>
          )}
        </div>
      ) : (
        <p className="readyLoading" role="status">
          Checking today’s weather…
        </p>
      )}

      {/* How long it takes, and how hard it is. */}
      <div className="readyWalk">
        <div className="readyWalkItem">
          <WalkIcon className="readyWalkIcon" />
          <div>
            <p className="readyWalkValue">About {durationText(hours * 60)}</p>
            <p className="readyWalkSub">
              {metersText(walking.meters, units)} on foot
              {ride && ` · ${metersText(ride.meters, units)} by ${ride.modes.includes('driving') ? 'car' : 'train'}`}
            </p>
          </div>
        </div>
        <div className="readyWalkItem">
          <EffortIcon className="readyWalkIcon isEffort" level={EFFORT_LEVELS[journey.difficulty] ?? 1} />
          <div>
            <p className="readyWalkSub">Effort</p>
            <p className="readyWalkValue">{journey.difficulty}</p>
          </div>
        </div>
      </div>

      <h2 className="readyQuestion">Are you at the starting point?</h2>
      <button className="introBtn readyStart" onClick={onImHere}>
        I’m Here – Start Journey
        <ArrowRightIcon />
      </button>
      <button className="introBtn isGhost hasIcon readyDirections" onClick={onDirections}>
        <NavigateIcon />
        Get Directions
      </button>
    </div>
  )
}

export default GetReadyPage
