// Searching the Journey Library, by a journey's name or the name of any of
// its stops, detours included.

// Lower case, without accents or punctuation, so "komachi dori" finds
// "Komachi-dori", and a plain "o" finds an "ō".
export function simplify(text) {
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

// What's typed in the search bar, as separate words.
export function searchWords(query) {
  const simple = simplify(query)
  return simple ? simple.split(' ') : []
}

// Whether a journey comes up for the words searched for, given its stops (from
// stopsOf in journeyStore.js). It does if every word is somewhere in its name
// or its stops' names, not necessarily all in the same one, so "kamakura
// buddha" finds the journey with Kamakura Station and the Great Buddha. The
// start of a word is enough: "budd" finds "Buddha".
//
// Gives back null if it doesn't come up, or else the ids of the stops to point
// out: the ones with a searched-for word that isn't in the journey's name,
// since they're why it came up.
export function matchJourney(journey, words, stops) {
  const name = simplify(journey.name)
  const stopNames = [...stops.main, ...stops.detours].map(({ stop }) => ({ id: stop.id, name: simplify(stop.name) }))
  const has = (text, word) => text.split(' ').some((textWord) => textWord.startsWith(word))

  const everyWordFound = words.every((word) => has(name, word) || stopNames.some((stop) => has(stop.name, word)))
  if (!everyWordFound) {
    return null
  }
  const notInName = words.filter((word) => !has(name, word))
  const stopIds = stopNames.filter((stop) => notInName.some((word) => has(stop.name, word))).map((stop) => stop.id)
  return { stopIds }
}
