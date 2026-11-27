import { CastleIcon, LeafIcon, SearchIcon, StarIcon } from './Icons.jsx'

// What kind of experience a journey is, shown on its page under
// Expectations, so nobody sets off on a quiet lakeside walk expecting Kyoto.
// Four kinds, from the simplest to the most exceptional, each with its symbol
// and a sentence on what to expect. None is worse than another: a Simple
// Escape is just a different kind of day out from a Standout Journey.
//
// A journey says which it is with `experienceLevel` (one of the keys below).
// Every journey in the app has one (a first pass by Claude, 27 Nov 2026, for
// the developer to review); one without it, made in Unfold Studio say, shows
// DEFAULT_EXPERIENCE_LEVEL.

export const EXPERIENCE_LEVELS = {
  simpleEscape: {
    label: 'Simple Escape',
    Icon: LeafIcon,
    text: 'A relaxing, easygoing outing with a few modest discoveries along the way.',
  },
  localDiscovery: {
    label: 'Local Discovery',
    Icon: SearchIcon,
    text: 'An interesting local outing with hidden gems and stories you might otherwise overlook.',
  },
  richExperience: {
    label: 'Rich Experience',
    Icon: CastleIcon,
    text: 'A deeper, story-rich journey with memorable places and meaningful discoveries.',
  },
  standoutJourney: {
    label: 'Standout Journey',
    Icon: StarIcon,
    text: 'An exceptional journey with distinctive places, compelling discoveries and an unforgettable highlight.',
  },
}

export const DEFAULT_EXPERIENCE_LEVEL = 'richExperience'

export function experienceLevel(journey) {
  return EXPERIENCE_LEVELS[journey.experienceLevel] ?? EXPERIENCE_LEVELS[DEFAULT_EXPERIENCE_LEVEL]
}
