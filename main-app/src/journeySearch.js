// Searching journeys by their name, where they are, or the name of any of
// their stops, detours included. Search, from the magnifying glass on Home,
// uses it, and so does the Journey Library in Unfold Studio
// (studio/src/search.js).

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

// What's typed in a search box, as separate words.
export function searchWords(query) {
  const simple = simplify(query)
  return simple ? simple.split(' ') : []
}

// Whether a journey comes up for the words searched for (from searchWords),
// given the words of its own to search (`own`: its name, say, and where it
// is) and its stops (`stops`, each with an `id` and a `name`). It does if
// every word is somewhere in those, not necessarily all in the same one, so
// "kamakura buddha" finds the journey with Kamakura Station and the Great
// Buddha. The start of a word is enough: "budd" finds "Buddha".
//
// Gives back null if it doesn't come up, or else the ids of the stops that are
// why it came up: the ones with a searched-for word that isn't in its own.
export function matchWords(words, own, stops) {
  const ownWords = simplify(own)
  const stopNames = stops.map((stop) => ({ id: stop.id, name: simplify(stop.name) }))
  const has = (text, word) => text.split(' ').some((textWord) => textWord.startsWith(word))

  const everyWordFound = words.every((word) => has(ownWords, word) || stopNames.some((stop) => has(stop.name, word)))
  if (!everyWordFound) {
    return null
  }
  const notOwn = words.filter((word) => !has(ownWords, word))
  const stopIds = stopNames.filter((stop) => notOwn.some((word) => has(stop.name, word))).map((stop) => stop.id)
  return { stopIds }
}

// A journey's stops in order, each followed by its detours.
function stopsAndDetours(journey) {
  return journey.route.flatMap((stop) => [stop, ...(stop.detours ?? [])])
}

// The journeys that come up for `query`, each with the stops that are why
// (`stops`, empty if it came up by its own name or where it is). Those that
// came up by their own name or place come first, and otherwise they're in the
// order given. With nothing typed, it's every journey.
export function searchJourneys(journeys, query) {
  const words = searchWords(query)
  if (words.length === 0) {
    return journeys.map((journey) => ({ journey, stops: [] }))
  }

  const results = []
  for (const journey of journeys) {
    const stops = stopsAndDetours(journey)
    const match = matchWords(words, `${journey.name} ${journey.location}`, stops)
    if (match) {
      results.push({ journey, stops: stops.filter((stop) => match.stopIds.includes(stop.id)) })
    }
  }
  return [...results.filter(({ stops }) => stops.length === 0), ...results.filter(({ stops }) => stops.length > 0)]
}
