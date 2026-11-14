import { useEffect, useState } from 'react'

import { ChevronRightIcon, LeafIcon, SunIcon, WeatherIcon } from './Icons.jsx'
import { conditionWords, lookUpConditions, savedConditions } from './weather.js'

// Weather & Best Time to Go, on See Your Journey, just above the route
// details and folded away the same way: a bar with today's weather where the
// journey starts and the best time of day to go, which opens to show the
// best season and the best time of day, each in a card of its own.
//
// It needs the journey's `bestTime`: { season, seasonNote, timeOfDay,
// timeNote }, where the season reads after "Best in" ("Mid–late fall"), the
// time of day after "Best" ("During daylight hours"), and each note says
// why (the time of day's note is optional). Today's weather is looked up for
// the journey's first stop (weather.js); until it's in, or if it can't be
// had, the bar gives the best season instead.

// "During daylight hours" becomes "during daylight hours", to follow "Best".
function lowerFirst(text) {
  return text.charAt(0).toLowerCase() + text.slice(1)
}

function BestTime({ journey }) {
  const { bestTime } = journey
  const point = journey.departure.mapPoint
  const [conditions, setConditions] = useState(() => (point ? savedConditions(point) : null))
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!point || savedConditions(point)) {
      return undefined
    }
    let current = true
    lookUpConditions(point)
      .then((found) => {
        if (current) setConditions(found)
      })
      .catch(() => {
        // Without it, the bar just gives the best season.
      })
    return () => {
      current = false
    }
  }, [point])

  const bestTimeOfDay = `Best ${lowerFirst(bestTime.timeOfDay)}`
  let summary = `Best in ${lowerFirst(bestTime.season)}, ${lowerFirst(bestTime.timeOfDay)}`
  if (conditions) {
    const { celsius, code } = conditions.now
    const rounded = Math.round(celsius)
    // From the rounded Celsius, so the two always agree (15°C is 59°F).
    const fahrenheit = Math.round((rounded * 9) / 5 + 32)
    summary = `${conditionWords(code)}, ${rounded}°C (${fahrenheit}°F) now · ${bestTimeOfDay}`
  }

  return (
    <section className="bestTime" aria-labelledby="bestTimeTitle">
      <h2 className="routeFoldHeading" id="bestTimeTitle">
        <button
          className={open ? 'routeFoldBar isOpen' : 'routeFoldBar'}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="bestTimeFold"
        >
          <WeatherIcon className="routeFoldIcon" />
          <span className="routeFoldText">
            <span className="routeFoldTitle">Weather &amp; Best Time to Go</span>
            <span className="routeFoldSummary">{summary}</span>
          </span>
          <ChevronRightIcon className="routeFoldChevron" />
        </button>
      </h2>

      {/* Folded away until it's opened: out of reach (inert) while it is. */}
      <div className={open ? 'routeFold isOpen' : 'routeFold'} id="bestTimeFold" inert={!open}>
        <div className="routeFoldInner">
          <ul className="bestTimeList">
            <li className="bestTimeCard">
              <LeafIcon className="bestTimeIcon" />
              <div>
                <p className="bestTimeLabel">Recommended season</p>
                <p className="bestTimeValue">{bestTime.season}</p>
                {bestTime.seasonNote && <p className="bestTimeNote">{bestTime.seasonNote}</p>}
              </div>
            </li>
            <li className="bestTimeCard">
              <SunIcon className="bestTimeIcon" />
              <div>
                <p className="bestTimeLabel">Recommended time of day</p>
                <p className="bestTimeValue">{bestTime.timeOfDay}</p>
                {bestTime.timeNote && <p className="bestTimeNote">{bestTime.timeNote}</p>}
              </div>
            </li>
          </ul>
          {conditions && <p className="bestTimeCredit">Today’s weather from Open-Meteo.com</p>}
        </div>
      </div>
    </section>
  )
}

export default BestTime
