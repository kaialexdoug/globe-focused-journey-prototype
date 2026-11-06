// Searching the Journey Library, by a journey's name or the name of any of
// its stops, detours included. The searching itself is the app's own
// (main-app/src/journeySearch.js), so the two find things the same way.

import { matchWords, searchWords, simplify } from '../../main-app/src/journeySearch.js'

export { searchWords, simplify }

// Whether a journey comes up for the words searched for, given its stops (from
// stopsOf in journeyStore.js): every word has to be in its name or its stops'
// names. Gives back null if it doesn't come up, or else the ids of the stops
// to point out (`stopIds`), since they're why it came up.
export function matchJourney(journey, words, stops) {
  return matchWords(
    words,
    journey.name,
    [...stops.main, ...stops.detours].map(({ stop }) => stop),
  )
}
