import { useEffect, useState } from 'react'

import { ChevronRightIcon, InfoIcon, WeatherIcon } from './Icons.jsx'
import WeatherReport from './WeatherReport.jsx'
import { journeyPlaceName } from './journeyPlaces.js'
import { hoursFrom } from './journeyTimes.js'
import { useUnits } from './units.js'
import { conditionsVerdict, lookUpConditions, savedConditions } from './weather.js'

// The weather where a stop is, on its directions screen (DirectionsPage in
// StopPages.jsx): SEE CURRENT WEATHER FORECAST, a small button above the map,
// unfolds a smaller Get Ready (WeatherReport.jsx). The temperature now,
// sunrise and sunset, the next 24 hours, and how the weather suits the rest
// of the journey, from this stop on. It's for the stop's own spot
// (`mapPoint`), and only looked up once it's opened (weather.js keeps it for
// a few minutes, so opening it again doesn't look it up again).
function StopWeather({ journey, stop }) {
  const units = useUnits()
  const point = stop.mapPoint
  const [open, setOpen] = useState(false)
  const [conditions, setConditions] = useState(() => savedConditions(point))
  const [failed, setFailed] = useState(false)
  // Goes up by one each time TRY AGAIN is pressed, to look it up again.
  const [tries, setTries] = useState(0)

  // Each time it's opened (and on TRY AGAIN), so it's never more than a few
  // minutes old, but never while it's folded away.
  useEffect(() => {
    if (!open) {
      return undefined
    }
    let current = true
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
  }, [open, point, tries])

  // Back to "Checking the weather here…", and look again.
  function tryAgain() {
    setFailed(false)
    setTries((count) => count + 1)
  }

  const foldId = `stopWeather-${stop.id}`
  const verdict = conditions ? conditionsVerdict(conditions, hoursFrom(journey, stop), units, { rest: true }) : null

  return (
    <div className="stopWeather">
      <button
        className={open ? 'stopWeatherToggle isOpen' : 'stopWeatherToggle'}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        aria-expanded={open}
        aria-controls={foldId}
      >
        <WeatherIcon className="stopWeatherIcon" />
        {open ? 'Hide Weather Forecast' : 'See Current Weather Forecast'}
        <ChevronRightIcon className="stopWeatherChevron" />
      </button>

      {/* Folded away until it's opened: out of reach (inert) while it is. */}
      <div className={open ? 'routeFold isOpen' : 'routeFold'} id={foldId} inert={!open}>
        <div className="routeFoldInner">
          <div className="stopWeatherBody">
            {conditions ? (
              <WeatherReport conditions={conditions} verdict={verdict} place={journeyPlaceName(journey)} units={units} />
            ) : failed ? (
              // With TRY AGAIN in the middle, under the words.
              <div className="readyVerdict isUnknown" role="status">
                <InfoIcon className="readyVerdictIcon" />
                <div>
                  <p className="readyVerdictTitle">Couldn’t get the weather here</p>
                  <p className="readyVerdictText">Have a look at the sky before you head on.</p>
                </div>
                <button className="readyRetry" onClick={tryAgain}>
                  Try Again
                </button>
              </div>
            ) : (
              <p className="readyLoading" role="status">
                Checking the weather here…
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StopWeather
