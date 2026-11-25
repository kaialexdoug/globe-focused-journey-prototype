import { useEffect, useState } from 'react'

import { LeafIcon, SunIcon } from './Icons.jsx'
import { useUnits } from './units.js'
import { conditionWords, lookUpConditions, savedConditions, temperatureText } from './weather.js'
import { WeatherPicture } from './WeatherReport.jsx'

// Weather & Best Time to Go, in the Details tab on a journey's page
// (JourneyPage.jsx): the weather where the journey starts right now, then
// the best season and the best time of day to go, each in a card of its own.
//
// It needs the journey's `bestTime`: { season, seasonNote, timeOfDay,
// timeNote }, where the season is the best time of year ("Mid–late fall"),
// the time of day the best time to set off ("During daylight hours"), and
// each note says why (the time of day's note is optional). Today's weather
// is looked up for the journey's first stop (weather.js); until it's in, or
// if it can't be had, its card is left out.

// Today's weather where the journey starts, once it's in (null till then,
// or if it can't be had).
function useConditions(journey) {
  const point = journey.departure.mapPoint
  const [conditions, setConditions] = useState(() => (point ? savedConditions(point) : null))

  useEffect(() => {
    if (!point) {
      return undefined
    }
    let current = true
    // Asked even when it's already showing: if it was kept from the last few
    // minutes, this just gives the same back (see GetReadyPage.jsx).
    lookUpConditions(point)
      .then((found) => {
        if (current) setConditions(found)
      })
      .catch(() => {
        // Without it, the weather's just left out.
      })
    return () => {
      current = false
    }
  }, [point])

  return conditions
}

function BestTime({ journey }) {
  const units = useUnits()
  const { bestTime } = journey
  const conditions = useConditions(journey)
  return (
    <>
      <ul className="bestTimeList">
        {/* The weather there now: "Partly cloudy, 13°C", in your units. */}
        {conditions && (
          <li className="bestTimeCard">
            <WeatherPicture weather={conditions.now} className="bestTimeIcon" />
            <div>
              <p className="bestTimeLabel">There right now</p>
              <p className="bestTimeValue">
                {conditionWords(conditions.now.code)}, {temperatureText(conditions.now.celsius, units)}
              </p>
            </div>
          </li>
        )}
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
      {/* Open-Meteo asks to be credited for its weather. */}
      {conditions && <p className="bestTimeCredit">Today’s weather from Open-Meteo.com</p>}
    </>
  )
}

export default BestTime
