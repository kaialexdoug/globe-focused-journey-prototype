import {
  CloudIcon,
  FogIcon,
  InfoIcon,
  MoonCloudIcon,
  MoonIcon,
  RainIcon,
  SnowIcon,
  StormIcon,
  SunIcon,
  SunriseIcon,
  SunsetIcon,
  WeatherIcon,
  WindIcon,
} from './Icons.jsx'
import { clockText, conditionWords, degreesText, sameTimeAsPhone, temperatureText, weatherKind } from './weather.js'

// The weather, as Get Ready shows it (GetReadyPage.jsx), and a stop's
// directions screen in a smaller size (StopWeather.jsx): the temperature now,
// sunrise and sunset, the next 24 hours an hour at a time (the first few in
// view, and the rest a swipe away), and the verdict on how the weather suits
// the journey (weather.js). Just the weather once it's in: each page says in
// its own words when it's still coming, or couldn't be had.

// The picture for each kind of weather (weatherKind in weather.js).
const KIND_ICONS = {
  clear: SunIcon,
  clearNight: MoonIcon,
  partly: WeatherIcon,
  partlyNight: MoonCloudIcon,
  cloudy: CloudIcon,
  fog: FogIcon,
  rain: RainIcon,
  snow: SnowIcon,
  storm: StormIcon,
  wind: WindIcon,
}

function WeatherPicture({ weather, className }) {
  const Picture = KIND_ICONS[weatherKind(weather)]
  return <Picture className={className} />
}

// The verdict's colours, by its level (weather.js).
const VERDICT_CLASSES = {
  good: 'isGood',
  mostlyGood: 'isMostlyGood',
  risky: 'isRisky',
  poor: 'isPoor',
}

// `place` is where the times are local to, if that isn't the phone's time
// ("Waseda"), and `verdict` is from conditionsVerdict.
function WeatherReport({ conditions, verdict, place, units }) {
  return (
    <>
      <div className="readyNow">
        <div className="readyBox readyTemp">
          <WeatherPicture weather={conditions.now} className="readyTempIcon" />
          <div>
            <p className="readyTempValue">{temperatureText(conditions.now.celsius, units)}</p>
            <p className="readyTempWords">{conditionWords(conditions.now.code)}</p>
          </div>
        </div>
        <div className="readyBox readySun">
          <div className="readySunItem">
            <SunriseIcon className="readySunIcon" />
            <span className="readySunLabel">Sunrise</span>
            <span className="readySunTime">{clockText(conditions.sunrise)}</span>
          </div>
          <div className="readySunItem">
            <SunsetIcon className="readySunIcon" />
            <span className="readySunLabel">Sunset</span>
            <span className="readySunTime">{clockText(conditions.sunset)}</span>
          </div>
        </div>
      </div>

      {/* Now, then every hour for the next day: the first few in view, and
          the rest a swipe away. */}
      <ol className="readyHours" aria-label="The next 24 hours">
        {conditions.hours.map((hour, index) => {
          const weather = index === 0 ? conditions.now : hour
          return (
            <li key={hour.time} className="readyHour">
              <span className="readyHourTime">{index === 0 ? 'Now' : clockText(hour.time)}</span>
              <WeatherPicture weather={weather} className="readyHourIcon" />
              <span className="visuallyHidden">{conditionWords(weather.code)}, </span>
              <span className="readyHourTemp">{degreesText(weather.celsius, units)}</span>
            </li>
          )
        })}
      </ol>
      {!sameTimeAsPhone(conditions) && <p className="readyNote">Times are local to {place}.</p>}

      <div className={`readyVerdict ${VERDICT_CLASSES[verdict.level]}`} role="status">
        <InfoIcon className="readyVerdictIcon" />
        <div>
          <p className="readyVerdictTitle">{verdict.title}</p>
          <p className="readyVerdictText">{verdict.text}</p>
        </div>
      </div>
      <p className="readyCredit">Weather from Open-Meteo.com</p>
    </>
  )
}

export default WeatherReport
