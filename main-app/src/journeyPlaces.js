// The places the journeys are in, for "Where to?" on Find My Journey: what to
// suggest as you type, and whether a journey's in the place you said.
//
// They come from each journey's `location`, "KAMAKURA · KANAGAWA, JAPAN", so
// there are three to a journey (Kamakura, Kanagawa and Japan), or two when
// there's no region ("NASSAU · THE BAHAMAS"), and from its `city` when that has
// another name (Waseda's is Shinjuku). A new journey's places are suggested as
// soon as it's added.

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

// A journey's places, from the most local to the country: the area it's in,
// the city that's in (if it's not the same), its region and its country.
function placesOf(journey) {
  const [area, rest] = journey.location.split(' · ')
  const parts = rest.split(', ')
  const country = parts.at(-1)
  const region = parts.length > 1 ? parts[0] : null
  const places = [
    { name: titleCase(area), kind: 'area', region, country },
    journey.city && { name: titleCase(journey.city), kind: 'area', region, country },
    region && { name: titleCase(region), kind: 'region', region, country },
    { name: titleCase(country), kind: 'country', region: null, country },
  ].filter(Boolean)
  // Each name once: the city's often the area ("Kamakura"), and a city can
  // share its region's name (Kyoto).
  return places.filter(
    (place, index) => places.findIndex((other) => normalize(other.name) === normalize(place.name)) === index,
  )
}

// Every place with a journey, each once, with how many journeys it has. A
// place's `name` is what goes in the box once it's picked ("Minnesota"), so
// it's found again if the box is tapped again. `within` is where it is, to go
// beside it in a suggestion ("Kanagawa, Japan"), or "" for a country.
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
        const within = {
          area: place.region ? `${titleCase(place.region)}, ${country}` : country,
          region: country,
          country: '',
        }[place.kind]
        byName.set(key, { ...place, key, within, count: 1 })
      }
    }
  }
  return [...byName.values()]
}

// Up to `limit` places to suggest for what's been typed: those whose name
// starts with it first, then those with a later word that does. Only what's
// before a comma counts, so "Minnesota, USA" still finds Minnesota. With
// nothing typed yet, the countries and regions with the most journeys.
export function suggestPlaces(places, typed, limit = 5) {
  const wanted = normalize(typed.split(',')[0])
  const mostFirst = (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  if (!wanted) {
    return places
      .filter((place) => place.kind !== 'area')
      .sort(mostFirst)
      .slice(0, limit)
  }
  return placesStarting(places, wanted, mostFirst).slice(0, limit)
}

// The places with a name that starts with `wanted`, then those with a later
// word that does ("falls" finds Taylors Falls), each in `order`.
function placesStarting(places, wanted, order) {
  const starts = places.filter((place) => place.key.startsWith(wanted)).sort(order)
  const later = places
    .filter((place) => !place.key.startsWith(wanted) && place.key.split(' ').some((word) => word.startsWith(wanted)))
    .sort(order)
  return [...starts, ...later]
}

// The place in the box: its own name, or with where it is after a comma
// ("Kamakura, Japan"), or part of a name (at least three letters, at the start
// of a word) that's in only one place's. Null if it's empty, not anywhere
// with a journey yet, or could be more than one place.
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
  const starting = first.length >= 3 ? placesStarting(places, first, () => 0) : []
  return starting.length === 1 ? starting[0] : null
}

// Whether a journey's in `place`, one of catalogPlaces: in the area, the city,
// the region or the country.
export function isInPlace(journey, place) {
  return placesOf(journey).some((each) => normalize(each.name) === place.key)
}
