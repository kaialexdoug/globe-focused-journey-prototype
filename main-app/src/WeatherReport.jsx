import {
  CloudIcon,
  ColdIcon,
  DrizzleIcon,
  FogIcon,
  HotIcon,
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
// view, and the rest a swipe away), and a summary of the weather while the
// journey takes (forecastSummary in weather.js). Just the weather once it's in: each page says in
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

export function WeatherPicture({ weather, className }) {
  const Picture = KIND_ICONS[weatherKind(weather)]
  return <Picture className={className} />
}

// The summary's icon and colour, for each kind of weather it can be about
// (forecastSummary in weather.js), as Dad and the developer picked them:
// blue for thunderstorms, rain and drizzle; light blue for snow, freezing
// rain and cold; red-orange for heat; gray for wind, fog and cloud; and the
// app's usual orange on gray for a clear or partly cloudy sky.
const SUMMARY_LOOKS = {
  storm: { Icon: StormIcon, tone: 'isBlue' },
  snow: { Icon: SnowIcon, tone: 'isIce' },
  freezingRain: { Icon: RainIcon, tone: 'isIce' },
  rain: { Icon: RainIcon, tone: 'isBlue' },
  drizzle: { Icon: DrizzleIcon, tone: 'isBlue' },
  hot: { Icon: HotIcon, tone: 'isHeat' },
  cold: { Icon: ColdIcon, tone: 'isIce' },
  wind: { Icon: WindIcon, tone: 'isGray' },
  fog: { Icon: FogIcon, tone: 'isGray' },
  clear: { Icon: SunIcon, tone: 'isFair' },
  clearNight: { Icon: MoonIcon, tone: 'isFair' },
  partly: { Icon: WeatherIcon, tone: 'isFair' },
  partlyNight: { Icon: MoonCloudIcon, tone: 'isFair' },
  cloudy: { Icon: CloudIcon, tone: 'isGray' },
}

// `place` is where the times are local to, if that isn't the phone's time
// ("Waseda"), and `summary` is from forecastSummary.
function WeatherReport({ conditions, summary, place, units }) {
  const { Icon: SummaryIcon, tone } = SUMMARY_LOOKS[summary.type]
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

      <div className={`readyNotice ${tone}`} role="status">
        <SummaryIcon className="readyNoticeIcon" />
        <div>
          <p className="readyNoticeTitle">{summary.title}</p>
          <p className="readyNoticeText">{summary.text}</p>
        </div>
      </div>
      <p className="readyCredit">Weather from Open-Meteo.com</p>
    </>
  )
}

export default WeatherReport
