// The places the journeys are in, for "Where to?" on Find My Journey: what to
// suggest as you type, and how near a journey is to where you said.
//
// They come from each journey's `location`, "KAMAKURA · KANAGAWA, JAPAN", so
// there are three to a journey (Kamakura, Kanagawa and Japan), or two when
// there's no region ("NASSAU · THE BAHAMAS"). A new journey's places are
// suggested as soon as it's added.

// Other names people might type for a country, as they're written in the
// journeys' locations (once normalized, below).
const COUNTRY_NAMES = {
  us: 'usa',
  'united states': 'usa',
  'united states of america': 'usa',
  america: 'usa',
}

// A name to compare with others: lowercase, without accents, full stops,
// commas or a "The" in front, and with "Saint" as "St".
function normalize(name) {
  const plain = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[.,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^the /, '')
    .replace(/^saint /, 'st ')
  return COUNTRY_NAMES[plain] ?? plain
}

// "ST. PAUL" as "St. Paul", and "USA" left as it is.
function titleCase(name) {
  return name
    .toLowerCase()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
    .replace('Usa', 'USA')
}

// A journey's places, from the most local to the country.
function placesOf(journey) {
  const [area, rest] = journey.location.split(' · ')
  const parts = rest.split(', ')
  const country = parts.at(-1)
  const region = parts.length > 1 ? parts[0] : null
  return [
    { name: titleCase(area), kind: 'area', region, country },
    region && { name: titleCase(region), kind: 'region', region, country },
    { name: titleCase(country), kind: 'country', region: null, country },
  ].filter(Boolean)
}

// Every place with a journey, each once, with how many journeys it has. A
// place's `label` is what goes in the box once it's picked: its name, and the
// country unless it is one ("Kamakura, Japan"). `within` is where it is, to
// go beside it in a suggestion ("Kanagawa, Japan"), or "" for a country.
export function catalogPlaces(journeys) {
  const byName = new Map()
  for (const journey of journeys) {
    for (const place of placesOf(journey)) {
      const key = normalize(place.name)
      const known = byName.get(key)
      if (known) {
        known.count += 1
      } else {
        const country = titleCase(place.country)
        const label = place.kind === 'country' ? place.name : `${place.name}, ${country}`
        const within = {
          area: place.region ? `${titleCase(place.region)}, ${country}` : country,
          region: country,
          country: '',
        }[place.kind]
        byName.set(key, { ...place, key, label, within, count: 1 })
      }
    }
  }
  return [...byName.values()]
}

// Up to `limit` places to suggest for what's been typed: those whose name
// starts with it first, then those with a later word that does. With nothing
// typed yet, the countries and regions with the most journeys.
export function suggestPlaces(places, typed, limit = 5) {
  const wanted = normalize(typed)
  const mostFirst = (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  if (!wanted) {
    return places
      .filter((place) => place.kind !== 'area')
      .sort(mostFirst)
      .slice(0, limit)
  }
  const starts = places.filter((place) => place.key.startsWith(wanted)).sort(mostFirst)
  const later = places
    .filter((place) => !place.key.startsWith(wanted) && place.key.split(' ').some((word) => word.startsWith(wanted)))
    .sort(mostFirst)
  return [...starts, ...later].slice(0, limit)
}

// The place in the box: its own name, or a picked label ("Kamakura, Japan"),
// or the start of a name (at least three letters), as long as only one place
// starts that way. Null if it's empty, or not anywhere with a journey yet.
export function findPlace(places, typed) {
  const whole = normalize(typed)
  const first = normalize(typed.split(',')[0])
  if (!first) {
    return null
  }
  const exact = places.find((place) => place.key === whole) ?? places.find((place) => place.key === first)
  if (exact) {
    return exact
  }
  const starting = first.length >= 3 ? places.filter((place) => place.key.startsWith(first)) : []
  return starting.length === 1 ? starting[0] : null
}

// How near a journey is to `place`, out of 100: in it is a perfect fit. Near
// a town, somewhere else in its region counts for something, and anywhere in
// the same country for a little.
export function placeFit(journey, place) {
  const theirs = placesOf(journey)
  if (theirs.some((each) => normalize(each.name) === place.key)) {
    return 100
  }
  const { region, country } = theirs[0]
  if (place.kind === 'area' && place.region && region === place.region) {
    return 50
  }
  if (place.kind !== 'country' && country === place.country) {
    return 25
  }
  return 0
}
