// How well a journey matches your answers on Find My Journey, as a percentage.
// There's no guessing or randomness here: the same answers always give the same
// numbers, and anyone can work one out by hand.
//
// Each thing you answered gets a score out of 100 for this journey, and the match
// is their average, with some counting for more than others (WEIGHTS). Anything
// you skipped is left out, so it neither helps nor hurts.
//
//   Mood         how well it suits that mood (`match.moods` on its card)
//   Who          how well it suits that group (`match.with`)
//   Time         how its length compares with the time you have (timeFit)
//   Pace         how its difficulty compares with your pace (PACE_FIT)
//   Preferences  the average of those you picked (`match.preferences`)
//
// The ratings on the cards are estimates from what's on each journey, not checked
// facts, so a high match doesn't promise, say, that dogs are allowed everywhere.

const WEIGHTS = { mood: 40, companion: 20, time: 20, pace: 20, preferences: 20 }

// The hours each answer on the time question covers.
const TIME_WINDOWS = {
  '1–2 hrs': [1, 2],
  '2–4 hrs': [2, 4],
  '4+ hrs': [4, Infinity],
}

// Inside the time you have is a perfect fit. Too long loses more for each hour
// over than too short does for each hour under, because you can't finish it.
function timeFit(hours, time) {
  const [least, most] = TIME_WINDOWS[time]
  if (hours > most) {
    return Math.max(0, 100 - 30 * (hours - most))
  }
  if (hours < least) {
    return Math.max(0, 100 - 15 * (least - hours))
  }
  return 100
}

// Your pace, then how well each journey difficulty suits it. Too hard loses more
// than too easy, because you can still enjoy an easy journey.
const PACE_FIT = {
  Easy: { Easy: 100, Moderate: 50, Active: 10 },
  Moderate: { Easy: 70, Moderate: 100, Active: 60 },
  Active: { Easy: 40, Moderate: 75, Active: 100 },
}

function average(numbers) {
  return numbers.reduce((total, number) => total + number, 0) / numbers.length
}

// The match for one journey: a whole number out of 100, or null if you skipped
// everything, so there's nothing to go on. `answers` is what Find My Journey
// collected: { mood, companion, time, pace, preferences }.
export function matchPercent(journey, answers) {
  const { hours, moods, with: companions, preferences } = journey.match
  const scores = {}
  if (answers.mood) {
    scores.mood = moods[answers.mood]
  }
  if (answers.companion) {
    scores.companion = companions[answers.companion]
  }
  if (answers.time) {
    scores.time = timeFit(hours, answers.time)
  }
  if (answers.pace) {
    scores.pace = PACE_FIT[answers.pace][journey.difficulty]
  }
  if (answers.preferences.length > 0) {
    scores.preferences = average(answers.preferences.map((each) => preferences[each]))
  }

  const answered = Object.keys(scores)
  if (answered.length === 0) {
    return null
  }
  const totalWeight = answered.reduce((total, part) => total + WEIGHTS[part], 0)
  const weighted = answered.reduce((total, part) => total + scores[part] * WEIGHTS[part], 0)
  return Math.round(weighted / totalWeight)
}

// Every journey with its match, from most matched to least. A tie keeps the order
// they came in, which puts the checked journeys first.
export function rankJourneys(journeys, answers) {
  return journeys
    .map((journey) => ({ journey, percent: matchPercent(journey, answers) }))
    .sort((a, b) => (b.percent ?? 0) - (a.percent ?? 0))
}
