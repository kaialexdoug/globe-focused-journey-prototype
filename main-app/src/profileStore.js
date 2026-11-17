// The profile: just a name, kept on this device (in the browser's storage),
// with the journeys you've started and finished, and a few totals. There's no
// account or password, and nothing leaves the device.
//
// The journey you're partway through is kept separately, and saved at every
// step, so you can pick it up again even after closing the app.

const PROFILE_KEY = 'unfold.profile'
const PROGRESS_KEY = 'unfold.progress'
const SAVED_KEY = 'unfold.saved'
// Saved journeys were "liked" journeys, kept under this, before.
const OLD_LIKES_KEY = 'unfold.likes'
const UNITS_KEY = 'unfold.units'

// Browser storage can be switched off or full. Then nothing is kept, and the
// app carries on without it.
function read(key) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

function write(key, value) {
  try {
    if (value == null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  } catch {
    // Not kept, and nothing else to do about it.
  }
}

export const loadProfile = () => read(PROFILE_KEY)
export const storeProfile = (profile) => write(PROFILE_KEY, profile)

// The journey under way: { journeyId, page, detourId, detoursTaken }, or null.
export const loadProgress = () => read(PROGRESS_KEY)
export const storeProgress = (progress) => write(PROGRESS_KEY, progress)

// The ids of the journeys you've saved, with or without a profile. Journeys
// liked before saving took liking's place carry over as saved ones, and the
// old list is cleared once they have, leaving its key free for when liking
// comes back. (Then this fallback can go.)
export const loadSaved = () => read(SAVED_KEY) ?? read(OLD_LIKES_KEY) ?? []
export function storeSaved(saved) {
  write(SAVED_KEY, saved)
  write(OLD_LIKES_KEY, null)
}

// Metric or imperial (units.js), for when there's no profile to keep it on.
// With a profile, it's kept on the profile instead (`units`).
export const loadUnits = () => read(UNITS_KEY) ?? 'metric'
export const storeUnits = (units) => write(UNITS_KEY, units)

// `units` is what you'd chosen before having a profile, carried onto it.
export function newProfile(name, units = 'metric') {
  return {
    name,
    createdAt: new Date().toISOString(),
    // By journey id: { startedAt, timesCompleted, lastCompletedAt,
    // lastDetoursTaken }. Being here means you "own" the journey.
    journeys: {},
    stats: { journeysStarted: 0, journeysCompleted: 0, stopsVisited: 0, detoursTaken: 0 },
    // The names picked on My Interests and My Preferences. (Profiles made
    // before these existed don't have them.)
    interests: [],
    preferences: [],
    // 'metric' or 'imperial', from Settings. (Older profiles don't have it,
    // and go by what's kept on the device.)
    units,
  }
}

export function withJourneyStarted(profile, journeyId) {
  const before = profile.journeys[journeyId] ?? { timesCompleted: 0 }
  return {
    ...profile,
    journeys: {
      ...profile.journeys,
      [journeyId]: { ...before, startedAt: new Date().toISOString() },
    },
    stats: { ...profile.stats, journeysStarted: profile.stats.journeysStarted + 1 },
  }
}

// `detoursTaken` is the ids of the detours taken on this run, and
// `stopCount` every stop on the route plus those detours.
export function withJourneyCompleted(profile, journeyId, detoursTaken, stopCount) {
  const before = profile.journeys[journeyId] ?? { timesCompleted: 0 }
  return {
    ...profile,
    journeys: {
      ...profile.journeys,
      [journeyId]: {
        ...before,
        timesCompleted: before.timesCompleted + 1,
        lastCompletedAt: new Date().toISOString(),
        lastDetoursTaken: detoursTaken,
      },
    },
    stats: {
      ...profile.stats,
      journeysCompleted: profile.stats.journeysCompleted + 1,
      stopsVisited: profile.stats.stopsVisited + stopCount,
      detoursTaken: profile.stats.detoursTaken + detoursTaken.length,
    },
  }
}
