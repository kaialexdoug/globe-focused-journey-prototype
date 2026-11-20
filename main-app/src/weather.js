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
// And the verdict on whether now is a good time for the journey: whether
// it'll stay dry and comfortable for as long as the journey takes, and for
// the rest of the day.

import { isImperial, toFahrenheit } from './units.js'

const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'
const KEEP_FOR = 10 * 60 * 1000
const GIVE_UP_AFTER = 15 * 1000

// What counts as uncomfortable, by how warm it feels ("apparent
// temperature", which takes in the wind and the humidity), and how windy is
// too windy, in gusts.
export const TOO_COLD = 3
export const TOO_HOT = 31
export const TOO_WINDY = 50
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

// --- The verdict ---

// What's wrong with an hour, if anything, most serious first: 'storm',
// 'snow', 'rain', 'hot', 'cold' or 'wind', or null if it's fine.
function hourProblem(hour) {
  if (isStorm(hour.code)) return 'storm'
  if (isSnow(hour.code)) return 'snow'
  if (isRain(hour.code) || hour.rainChance >= RAIN_LIKELY) return 'rain'
  if (hour.feelsLike >= TOO_HOT) return 'hot'
  if (hour.feelsLike <= TOO_COLD) return 'cold'
  if (hour.gusts >= TOO_WINDY) return 'wind'
  return null
}

const PROBLEM_ORDER = ['storm', 'snow', 'rain', 'hot', 'cold', 'wind']

// The most serious problem among some hours.
function worstProblem(problems) {
  return PROBLEM_ORDER.find((problem) => problems.includes(problem))
}

// "around 2 PM", or "right now" for this hour.
function whenText(hour, index) {
  return index === 0 ? 'right now' : `around ${clockText(hour.time)}`
}

// How the verdict talks about the walk: all of it, from Get Ready, or what's
// left of it, from a stop on the way (StopWeather.jsx).
const WHOLE_WALK = {
  walk: 'your walk',
  mostOf: 'most of your walk',
  all: 'your whole walk',
  start: 'at the start of your walk',
  partway: 'partway through your walk',
  end: 'toward the end of your walk',
  poorTitle: 'Poor conditions for this journey',
  goodTitle: 'Good conditions for this journey',
}

const REST_OF_WALK = {
  walk: 'the rest of your walk',
  mostOf: 'most of the rest of your walk',
  all: 'the rest of your walk',
  start: 'as you head to this stop',
  partway: 'later in your journey',
  end: 'toward the end of your journey',
  poorTitle: 'Poor conditions for the rest of the journey',
  goodTitle: 'Good conditions for the rest of the journey',
}

// Where in the walk an hour is: at the start, toward the end, or partway.
function partOfWalk(index, walkLength, words) {
  if (index === 0) return words.start
  if (index === walkLength - 1) return words.end
  return words.partway
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// What the sky's like, for a fine day: "Clear skies", "Some cloud"...
function skyWords(hours) {
  const kinds = hours.map(weatherKind)
  if (kinds.every((kind) => kind === 'clear' || kind === 'clearNight')) return 'Clear skies'
  if (kinds.includes('fog')) return 'A little mist, but dry'
  if (kinds.every((kind) => kind === 'cloudy')) return 'Cloudy but dry'
  return 'Some cloud, but dry'
}

// "between 14 and 17°C", or "around 15°C".
function rangeText(hours, units) {
  const temperatures = hours.map((hour) => degrees(hour.celsius, units))
  const low = Math.min(...temperatures)
  const high = Math.max(...temperatures)
  const mark = degreeMark(units)
  return low === high ? `around ${low}${mark}` : `between ${low} and ${high}${mark}`
}

// The problem during the walk, in words: "rain is likely around 2 PM".
function problemText(problem, hour, index, units) {
  const when = whenText(hour, index)
  const feels = temperatureText(hour.feelsLike, units)
  return {
    storm: `thunderstorms are likely ${when}`,
    snow: `snow is likely ${when}`,
    rain: `rain is likely ${when}`,
    hot: `it’ll feel like ${feels} ${when}`,
    cold: `it’ll feel like ${feels} ${when}`,
    wind: `strong gusts are likely ${when}`,
  }[problem]
}

// After the walk, from when: "rain is likely from 6 PM".
function laterText(problem, hour, units) {
  const time = clockText(hour.time)
  const feels = temperatureText(hour.feelsLike, units)
  return {
    storm: `thunderstorms are likely from ${time}`,
    snow: `snow is likely from ${time}`,
    rain: `rain is likely from ${time}`,
    hot: `it’ll get hot later, feeling like ${feels} by ${time}`,
    cold: `it’ll turn cold later, feeling like ${feels} by ${time}`,
    wind: `strong gusts are likely from ${time}`,
  }[problem]
}

// What to do about it, during the walk (the verdict's `advice`).
const ADVICE = {
  storm: 'Keep an eye on the sky, and find shelter if it turns.',
  snow: 'Dress warmly, and watch your step.',
  rain: 'Bring an umbrella, or start a little later.',
  hot: 'Bring water, and take it slowly in the heat.',
  cold: 'Dress warmly, with a hat and gloves.',
  wind: 'Expect strong gusts in open places.',
}

// For most of the walk.
function mostlyText(problem, hours, units, words) {
  const feels = hours.map((hour) => degrees(hour.feelsLike, units))
  const mark = degreeMark(units)
  return {
    storm: `Thunderstorms are likely during ${words.walk}.`,
    snow: `Snow is likely for ${words.mostOf}.`,
    rain: `Rain is likely for ${words.mostOf}.`,
    hot: `It’ll feel like ${Math.max(...feels)}${mark} for ${words.mostOf}.`,
    cold: `It’ll feel like ${Math.min(...feels)}${mark} for ${words.mostOf}.`,
    wind: `Strong winds are likely for ${words.mostOf}.`,
  }[problem]
}

// The verdict for setting off now, on a journey taking `journeyHours`, with
// its temperatures in `units`. With `rest`, it's for what's left of a journey
// already under way, and `journeyHours` is how long that takes; it says so
// ("the rest of your walk").
//
// It's { level, title, text, advice }, where level is 'good', 'mostlyGood', 'risky'
// or 'poor':
//   good        dry and comfortable for the walk, and the rest of the day
//   mostlyGood  fine for the walk, but rain (or cold, or heat, or wind)
//               later, within the next day
//   risky       some of the walk in it, but most of it fine
//   poor        most of the walk in it
// `text` just says why, briefly. `advice` is what to do about it, for risky
// and poor: kept apart from `text`, and not shown on Get Ready for now, so
// the notice stays short (it may come back in another form).
export function conditionsVerdict(conditions, journeyHours, units, { rest = false } = {}) {
  const { hours } = conditions
  const words = rest ? REST_OF_WALK : WHOLE_WALK
  // The hours the walk takes up, counting this one: 2½ hours is this hour
  // and the next two.
  const walkHours = hours.slice(0, Math.max(1, Math.ceil(journeyHours)))
  const laterHours = hours.slice(walkHours.length)
  const walkProblems = walkHours.map(hourProblem)
  const badCount = walkProblems.filter(Boolean).length

  if (badCount > walkHours.length / 2) {
    const problem = worstProblem(walkProblems)
    return {
      level: 'poor',
      title: words.poorTitle,
      text: mostlyText(problem, walkHours, units, words),
      advice: 'Another day, or a later start, may be better.',
    }
  }

  if (badCount > 0) {
    const problem = worstProblem(walkProblems)
    const index = walkProblems.indexOf(problem)
    return {
      level: 'risky',
      title: 'Risky conditions',
      text: `${capitalize(problemText(problem, walkHours[index], index, units))}, ${partOfWalk(index, walkHours.length, words)}.`,
      advice: ADVICE[problem],
    }
  }

  const laterIndex = laterHours.findIndex((hour) => hourProblem(hour))
  if (laterIndex >= 0) {
    const hour = laterHours[laterIndex]
    return {
      level: 'mostlyGood',
      title: 'Mostly good conditions',
      text: `Fine for ${words.walk}, but ${laterText(hourProblem(hour), hour, units)}.`,
    }
  }

  return {
    level: 'good',
    title: words.goodTitle,
    text: `${skyWords(walkHours)}, and ${rangeText(walkHours, units)} for ${words.all}.`,
  }
}
