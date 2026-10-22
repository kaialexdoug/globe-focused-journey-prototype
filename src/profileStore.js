// The profile: just a name, kept on this device (in the browser's storage),
// with your traveler type, the journeys you've started and finished, and a
// few totals. There's no account or password, and nothing leaves the device.
//
// The journey you're partway through is kept separately, and saved at every
// step, so you can pick it up again even after closing the app.

const PROFILE_KEY = 'unfold.profile'
const PROGRESS_KEY = 'unfold.progress'
const SETTINGS_KEY = 'unfold.settings'

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

// Settings for this device, with or without a profile, and kept if the
// profile is deleted. `theme` is "dark" (the default) or "light".
export const loadSettings = () => ({ theme: 'dark', ...read(SETTINGS_KEY) })
export const storeSettings = (settings) => write(SETTINGS_KEY, settings)

export function newProfile(name, travelerTypeName) {
  return {
    name,
    travelerType: travelerTypeName ?? null,
    createdAt: new Date().toISOString(),
    // By journey id: { startedAt, timesCompleted, lastCompletedAt,
    // lastDetoursTaken }. Being here means you "own" the journey.
    journeys: {},
    stats: { journeysStarted: 0, journeysCompleted: 0, stopsVisited: 0, detoursTaken: 0 },
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
