// Today's weather where a journey starts, for Weather & Best Time to Go on
// See Your Journey (BestTime.jsx) and for Get Ready (GetReadyPage.jsx): what
// it's like now, every hour for the next day, and sunrise and sunset. It's
// looked up from Open-Meteo (free, no key needed, but it asks to be
// credited), for the journey's first stop (`departure.mapPoint`), and kept
// for a few minutes so opening a page again doesn't look it up again. If it
// hasn't come back within 15 seconds, it's given up on, rather than being
// waited for forever on a weak signal (Get Ready then offers to try again).
//
// Times are the journey's local time, as Open-Meteo gives them ("13:00"),
// whatever time zone the phone is in.
//
// And a summary of the weather for as long as the journey takes, and
// anything on its way later that day (forecastSummary, at the end).

import { isImperial, toFahrenheit } from './units.js'

const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'
const KEEP_FOR = 10 * 60 * 1000
const GIVE_UP_AFTER = 15 * 1000

// What counts as cold or hot, by how warm it feels ("apparent temperature",
// which takes in the wind and the humidity): 3°C (37°F) and 31°C (88°F).
// And windy, in gusts: 50 km/h (31 mph).
const COLD = 3
const HOT = 31
const WINDY = 50
// How windy it has to be, in gusts, for the hour's icon to be the wind.
const WINDY_ICON = 40
// How likely rain has to be (%) to count, even when the forecast's own
// weather for the hour doesn't say rain.
const RAIN_LIKELY = 60

// The conditions, by where they're for: { at, conditions }.
const saved = new Map()
// Lookups still on their way, so two pages asking at once share one.
const asking = new Map()

function placeKey(point) {
  return `${point.lat.toFixed(3)},${point.lng.toFixed(3)}`
}

// The conditions already looked up for a place in the last few minutes, or
// null.
export function savedConditions(point) {
  const entry = point && saved.get(placeKey(point))
  return entry && Date.now() - entry.at < KEEP_FOR ? entry.conditions : null
}

// The conditions for a place, looked up if they haven't been lately:
// {
//   now: { celsius, feelsLike, code, isDay, gusts },
//   hours: [{ time: '2026-11-15T14:00', celsius, feelsLike, code, isDay,
//             rainChance, gusts }, ...] from this hour, for the next 24,
//   sunrise: '06:15', sunset: '16:31',
//   offsetSeconds: the place's offset from UTC, to tell whether its time
//                  is the phone's,
// }
export function lookUpConditions(point) {
  const already = savedConditions(point)
  if (already) {
    return Promise.resolve(already)
  }
  const key = placeKey(point)
  if (!asking.has(key)) {
    asking.set(
      key,
      fetchConditions(point).finally(() => asking.delete(key)),
    )
  }
  return asking.get(key)
}

async function fetchConditions(point) {
  const params = new URLSearchParams({
    latitude: point.lat,
    longitude: point.lng,
    current: 'temperature_2m,apparent_temperature,weather_code,is_day,wind_gusts_10m',
    hourly: 'temperature_2m,apparent_temperature,weather_code,is_day,precipitation_probability,wind_gusts_10m',
    daily: 'sunrise,sunset',
    timezone: 'auto',
    forecast_days: '2',
  })
  // The signal stops it after 15 seconds, reading the answer included, and
  // it fails like any other lookup that couldn't be had.
  const response = await fetch(`${WEATHER_URL}?${params}`, {
    signal: AbortSignal.timeout(GIVE_UP_AFTER),
  })
  if (!response.ok) {
    throw new Error(`Weather lookup failed (${response.status})`)
  }
  const data = await response.json()
  const { current, hourly, daily } = data

  // This hour, and the 24 after it.
  const thisHour = current.time.slice(0, 13) + ':00'
  const first = Math.max(0, hourly.time.indexOf(thisHour))
  const hours = hourly.time.slice(first, first + 25).map((time, index) => {
    const at = first + index
    return {
      time,
      celsius: hourly.temperature_2m[at],
      feelsLike: hourly.apparent_temperature[at],
      code: hourly.weather_code[at],
      isDay: hourly.is_day[at] === 1,
      rainChance: hourly.precipitation_probability[at] ?? 0,
      gusts: hourly.wind_gusts_10m[at] ?? 0,
    }
  })

  const conditions = {
    now: {
      celsius: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      code: current.weather_code,
      isDay: current.is_day === 1,
      gusts: current.wind_gusts_10m ?? 0,
    },
    hours,
    sunrise: daily.sunrise[0].slice(11, 16),
    sunset: daily.sunset[0].slice(11, 16),
    offsetSeconds: data.utc_offset_seconds,
  }
  saved.set(placeKey(point), { at: Date.now(), conditions })
  return conditions
}

// --- In words and pictures ---

// What the weather is, in words, from its WMO weather code.
export function conditionWords(code) {
  if (code === 0) return 'Clear'
  if (code === 1) return 'Mostly clear'
  if (code === 2) return 'Partly cloudy'
  if (code === 3) return 'Cloudy'
  if (code === 45 || code === 48) return 'Foggy'
  if (code >= 51 && code <= 57) return 'Drizzle'
  if (code >= 61 && code <= 67) return 'Rain'
  if (code >= 71 && code <= 77) return 'Snow'
  if (code >= 80 && code <= 82) return 'Rain showers'
  if (code === 85 || code === 86) return 'Snow showers'
  if (code >= 95) return 'Thunderstorms'
  return 'Mixed weather'
}

const isStorm = (code) => code >= 95
const isSnow = (code) => (code >= 71 && code <= 77) || code === 85 || code === 86
const isRain = (code) => (code >= 51 && code <= 67) || (code >= 80 && code <= 82)

// Which picture an hour gets: 'clear', 'partly', 'cloudy', 'fog', 'rain',
// 'snow', 'storm' or 'wind', with clear and partly cloudy at night as
// 'clearNight' and 'partlyNight'.
export function weatherKind({ code, isDay, gusts = 0 }) {
  if (isStorm(code)) return 'storm'
  if (isSnow(code)) return 'snow'
  if (isRain(code)) return 'rain'
  if (gusts >= WINDY_ICON) return 'wind'
  if (code === 45 || code === 48) return 'fog'
  if (code === 3) return 'cloudy'
  if (code === 1 || code === 2) return isDay ? 'partly' : 'partlyNight'
  return isDay ? 'clear' : 'clearNight'
}

// A temperature to the nearest degree, in Celsius, or in imperial Fahrenheit.
// (The forecast is always in Celsius.)
function degrees(celsius, units) {
  return Math.round(isImperial(units) ? toFahrenheit(celsius) : celsius)
}

const degreeMark = (units) => (isImperial(units) ? '°F' : '°C')

// "15°C", or "59°F".
export function temperatureText(celsius, units) {
  return `${degrees(celsius, units)}${degreeMark(units)}`
}

// "15°", for under each hour.
export function degreesText(celsius, units) {
  return `${degrees(celsius, units)}°`
}

// "13:00" or "2026-11-15T13:00" as "1 PM" (or "6:15 AM", with its minutes).
export function clockText(time) {
  const [hours, minutes] = time.slice(-5).split(':').map(Number)
  const suffix = hours < 12 ? 'AM' : 'PM'
  const hour = hours % 12 === 0 ? 12 : hours % 12
  return minutes === 0 ? `${hour} ${suffix}` : `${hour}:${String(minutes).padStart(2, '0')} ${suffix}`
}

// Whether the journey's local time is the phone's, so the times need no
// saying which time zone they're in.
export function sameTimeAsPhone(conditions) {
  return -new Date().getTimezoneOffset() * 60 === conditions.offsetSeconds
}

// --- The forecast for the journey ---
//
// Not a verdict on whether to go (someone out for a winter walk doesn't mind
// the cold), just what the weather's going to be: the one thing most worth
// knowing about it while the journey takes, with its own icon and colour
// (WeatherReport.jsx), and a line saying more.

// The kinds of weather worth a mention, the first of them found the one the
// summary's about. If none of them come up, it's about the sky instead
// (calmType, below).
const NOTABLE = ['storm', 'snow', 'freezingRain', 'rain', 'drizzle', 'hot', 'cold', 'wind', 'fog']

// Which go together. A summary can mention a second kind from another family
// ("Snow… and it'll feel like 25°F"), but not two from the same one
// (thunderstorms bring rain, so the rain isn't said as well).
const FAMILY = {
  storm: 'wet',
  snow: 'wet',
  freezingRain: 'wet',
  rain: 'wet',
  drizzle: 'wet',
  hot: 'feel',
  cold: 'feel',
  wind: 'wind',
  fog: 'fog',
}

const isFreezingRain = (code) => code === 56 || code === 57 || code === 66 || code === 67
const isDrizzle = (code) => code >= 51 && code <= 55
const isFog = (code) => code === 45 || code === 48

// Everything worth a mention in an hour: one kind of rain or snow at most,
// and how it feels, the wind and fog besides.
function hourTypes(hour) {
  const { code } = hour
  const types = []
  if (isStorm(code)) types.push('storm')
  else if (isSnow(code)) types.push('snow')
  else if (isFreezingRain(code)) types.push('freezingRain')
  else if ((code >= 61 && code <= 65) || (code >= 80 && code <= 82)) types.push('rain')
  else if (isDrizzle(code)) types.push('drizzle')
  else if (hour.rainChance >= RAIN_LIKELY) types.push('rain')
  if (hour.feelsLike >= HOT) types.push('hot')
  if (hour.feelsLike <= COLD) types.push('cold')
  if (hour.gusts >= WINDY) types.push('wind')
  if (isFog(code)) types.push('fog')
  return types
}

// The hours with a kind of weather.
function hoursWith(type, hours) {
  return hours.filter((hour) => hourTypes(hour).includes(type))
}

// The summary's title, for each kind of weather.
const TITLES = {
  storm: 'Thunderstorms likely',
  snow: 'Snowy conditions today',
  freezingRain: 'Freezing rain today',
  rain: 'Rain likely today',
  drizzle: 'Drizzle today',
  hot: 'Hot conditions today',
  cold: 'Cold conditions today',
  wind: 'Windy today',
  fog: 'Foggy today',
  clear: 'Clear skies today',
  clearNight: 'Clear skies tonight',
  partly: 'Partly cloudy today',
  partlyNight: 'Partly cloudy tonight',
  cloudy: 'Cloudy today',
}

// How the summary talks about the walk: all of it, from Get Ready, or what's
// left of it, from a stop on the way (StopWeather.jsx).
const WHOLE_WALK = {
  mostOf: 'most of your walk',
  all: 'your whole walk',
  start: 'at the start of your walk',
  partway: 'partway through your walk',
  end: 'toward the end of your walk',
}

const REST_OF_WALK = {
  mostOf: 'most of the rest of your walk',
  all: 'the rest of your walk',
  start: 'as you head to this stop',
  partway: 'later in your journey',
  end: 'toward the end of your journey',
}

// Where in the walk an hour is: at the start, toward the end, or partway.
function partOfWalk(index, walkLength, words) {
  if (index === 0) return words.start
  if (index === walkLength - 1) return words.end
  return words.partway
}

// "around 2 PM", or "right now" for this hour.
function whenText(hour, index) {
  return index === 0 ? 'right now' : `around ${clockText(hour.time)}`
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// "between 14 and 17°C", or "around 15°C".
function rangeText(hours, units) {
  const temperatures = hours.map((hour) => degrees(hour.celsius, units))
  const low = Math.min(...temperatures)
  const high = Math.max(...temperatures)
  const mark = degreeMark(units)
  return low === high ? `around ${low}${mark}` : `between ${low} and ${high}${mark}`
}

// For most of the walk, or all of it (`span`), from the hours with it:
// "Snow is likely for most of your walk", or "Feels like 14°F for most of
// your walk" (the coldest it'll feel, or the hottest).
function mostlyText(type, hours, units, span) {
  const feels = hours.map((hour) => hour.feelsLike)
  return {
    storm: `Thunderstorms are likely for ${span}`,
    snow: `Snow is likely for ${span}`,
    freezingRain: `Freezing rain is likely for ${span}`,
    rain: `Rain is likely for ${span}`,
    drizzle: `Drizzle is likely for ${span}`,
    hot: `Feels like ${temperatureText(Math.max(...feels), units)} for ${span}`,
    cold: `Feels like ${temperatureText(Math.min(...feels), units)} for ${span}`,
    wind: `Strong gusts are likely for ${span}`,
    fog: `Fog is likely for ${span}`,
  }[type]
}

// For some of it, from when it starts: "Rain is likely around 1 PM".
function atText(type, hour, index, units) {
  const when = whenText(hour, index)
  const feels = temperatureText(hour.feelsLike, units)
  return {
    storm: `Thunderstorms are likely ${when}`,
    snow: `Snow is likely ${when}`,
    freezingRain: `Freezing rain is likely ${when}`,
    rain: `Rain is likely ${when}`,
    drizzle: `Drizzle is likely ${when}`,
    hot: `It’ll feel like ${feels} ${when}`,
    cold: `It’ll feel like ${feels} ${when}`,
    wind: `Strong gusts are likely ${when}`,
    fog: `Fog is likely ${when}`,
  }[type]
}

// The second kind of weather, after "and": never rain or snow, as those
// always come first.
function alsoText(type, hours, units) {
  const feels = hours.map((hour) => hour.feelsLike)
  return {
    hot: `it’ll feel like ${temperatureText(Math.max(...feels), units)}`,
    cold: `it’ll feel like ${temperatureText(Math.min(...feels), units)}`,
    wind: 'strong gusts are likely too',
    fog: 'there may be fog too',
  }[type]
}

// After the walk, later the same day, from when: "Rain is likely later,
// from 6 PM."
function laterText(type, hour, units) {
  const time = clockText(hour.time)
  const feels = temperatureText(hour.feelsLike, units)
  return {
    storm: `Thunderstorms are likely later, from ${time}.`,
    snow: `Snow is likely later, from ${time}.`,
    freezingRain: `Freezing rain is likely later, from ${time}.`,
    rain: `Rain is likely later, from ${time}.`,
    drizzle: `Drizzle is likely later, from ${time}.`,
    hot: `It’ll get hot later, feeling like ${feels} by ${time}.`,
    cold: `It’ll turn cold later, feeling like ${feels} by ${time}.`,
    wind: `Strong gusts are likely later, from ${time}.`,
    fog: `Fog is likely later, from ${time}.`,
  }[type]
}

// The sky, when there's nothing else to mention: clear, cloudy, or some of
// each, at night if most of the walk's after dark.
function calmType(hours) {
  const night = hours.filter((hour) => !hour.isDay).length > hours.length / 2
  if (hours.every((hour) => hour.code <= 1)) return night ? 'clearNight' : 'clear'
  if (hours.every((hour) => hour.code === 3)) return 'cloudy'
  return night ? 'partlyNight' : 'partly'
}

// The weather while the journey takes, setting off now, on a journey taking
// `journeyHours`, with its temperatures in `units`. With `rest`, it's for
// what's left of a journey already under way, and `journeyHours` is how
// long that takes; it says so ("the rest of your walk").
//
// It's { type, title, text }. `type` is the kind of weather it's about, for
// its icon and colour: one of NOTABLE above if any of them come up during
// the walk (the first of them that does), or otherwise the sky ('clear',
// 'clearNight', 'partly', 'partlyNight' or 'cloudy'). `title` names it
// ("Cold conditions today"), and `text` says more ("Feels like 14°F for
// most of your walk."). When the walk's own weather is calm, `text` also
// says if anything's on its way later that day.
export function forecastSummary(conditions, journeyHours, units, { rest = false } = {}) {
  const { hours } = conditions
  const words = rest ? REST_OF_WALK : WHOLE_WALK
  // The hours the walk takes up, counting this one: 2½ hours is this hour
  // and the next two.
  const walkHours = hours.slice(0, Math.max(1, Math.ceil(journeyHours)))
  const found = new Set(walkHours.flatMap(hourTypes))
  const main = NOTABLE.find((type) => found.has(type))

  if (main) {
    const withMain = hoursWith(main, walkHours)
    let text
    if (withMain.length === walkHours.length) {
      text = mostlyText(main, withMain, units, words.all)
    } else if (withMain.length > walkHours.length / 2) {
      text = mostlyText(main, withMain, units, words.mostOf)
    } else {
      const index = walkHours.indexOf(withMain[0])
      text = `${atText(main, withMain[0], index, units)}, ${partOfWalk(index, walkHours.length, words)}`
    }
    const also = NOTABLE.find((type) => found.has(type) && FAMILY[type] !== FAMILY[main])
    if (also) {
      text += `, and ${alsoText(also, hoursWith(also, walkHours), units)}`
    }
    text += '.'
    if (main === 'freezingRain') {
      text += ' Paths may be icy.'
    }
    return { type: main, title: TITLES[main], text }
  }

  const type = calmType(walkHours)
  const range = rangeText(walkHours, units)
  let text = type === 'clear' || type === 'clearNight' ? `${capitalize(range)} for ${words.all}.` : `Dry, ${range} for ${words.all}.`
  // Anything later the same day, after the walk.
  const today = walkHours[0].time.slice(0, 10)
  const laterHour = hours
    .slice(walkHours.length)
    .find((hour) => hour.time.slice(0, 10) === today && hourTypes(hour).length > 0)
  if (laterHour) {
    const later = NOTABLE.find((each) => hourTypes(laterHour).includes(each))
    text += ` ${laterText(later, laterHour, units)}`
  }
  return { type, title: TITLES[type], text }
}
