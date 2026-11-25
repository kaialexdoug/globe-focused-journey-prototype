// A Church a Mile South (Cumberland, Wisconsin): the Cultural one of the
// Cumberland journeys, made for the AI journey test (Dad's handoff, for a
// field test on Sunday, November 22, 2026, from downtown at 11 AM). See
// cumberlandHistory.js for how the Cumberland journeys were put together.
//
// Every stop has its exact spot (`mapPoint`, from OpenStreetMap and its
// address search), and the walk to it from the stop before, from
// OpenStreetMap's walking routes (routing.openstreetmap.de), with heights
// from Open-Meteo, worked out in November 2026. St. Anthony Street, south of
// town, has no sidewalk on the map, so part of the way is on the road's edge.
//
// The story is Cumberland's people: the Italians who built the Chiodo Block
// and their own church, the Norwegians and Swedes, a girl from a Lutheran and
// Catholic family who became a famous poet, and two brothers from the high
// school who won Olympic gold. The facts are from Wikipedia (Cumberland,
// Madeleva Wolff, John and Ben Peterson), the Diocese of Superior's history of
// the parish, the Wisconsin Historical Society's building records (as quoted
// in search results: the Chiodo Block, First Lutheran Church), the 1909
// Sanborn fire-insurance map's index, and news reports on the Rutabaga
// Festival, checked in November 2026. Sunday Mass at St. Anthony's is at
// 10:30 AM, so a walk from 11 AM gets there after it.
//
// Hero image (Dad's hero rules): St. Anthony the Abbot Church, the walk's
// peak, straight on: red brick, its bell tower and the statue in its niche,
// under a clear sky with room for the title. It was found in a web search in
// November 2026, and who took it and its licence aren't confirmed yet: check
// them before the app goes public (see Photo credits in the README). Grade:
// Cultural (faithful colors and textures, a subtle film finish); the photo's
// used as it is. Crop: the tower in the middle. The church's stop uses it
// too, and the cemetery's stop has a photo of the cemetery's sign, found the
// same way.
//
// The other photos are from Wikimedia Commons (credited in the README). Where a stop
// has no photo of its own, another stands in, and says so. Nobody from Unfold
// has walked it yet.

import autumnPhoto from '../assets/journey/cumberland/second-avenue-autumn.jpg'
import elmStreetPhoto from '../assets/journey/cumberland/elm-street.jpg'
import townSignPhoto from '../assets/journey/cumberland/town-sign.jpg'
import churchPhoto from '../assets/journey/cumberland/st-anthony-church.webp'
import cemeteryPhoto from '../assets/journey/cumberland/st-anthony-cemetery.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const chiodoBlock = {
  id: 'cbChiodoBlock',
  name: 'The Chiodo Block',
  mapName: 'Chiodo Block',
  photo: autumnPhoto,
  photoAlt: 'Second Avenue in October, with brick storefronts, a flag and autumn trees under a blue sky',
  memory: 'Where the day began.',
  mapPlace: '1201 2nd Avenue, Cumberland, WI',
  mapPoint: { lat: 45.53248, lng: -92.02163 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [10, 15],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Cumberland.' },
    { kind: 'heading', text: 'An Italian name on the corner' },
    { text: 'This two-storey brick block on the corner of Second Avenue was built in 1922, and it carries an Italian family name: Chiodo. By then, Italians had been part of Cumberland for decades. In the 1880s, they were already the biggest group in its Catholic parish.' },
    { kind: 'heading', text: 'Norwegians, Swedes and Italians' },
    { text: 'Two of the very first settlers, A. Ritan and the Dahlby family, were Norwegian. In 1909, the town’s fire-insurance map listed a Norwegian Lutheran church, a Swedish Lutheran church and a Catholic church, side by side in one small town.' },
    { kind: 'find', text: 'The Corner Bar and Restaurant is in this building now. On a Sunday in football season, look for green and gold: in Wisconsin, Sunday often means the Packers.' },
    { className: 'narrationClose', text: 'Next, a church on the west side of town, and a family with two faiths.' },
  ],
}

const firstLutheran = {
  id: 'cbFirstLutheran',
  name: 'First Lutheran Church',
  mapName: 'First Lutheran',
  photo: elmStreetPhoto,
  photoAlt: 'Elm Street, the town’s main east–west road, at Second Avenue, standing in for the church further west along it',
  memory: 'Two faiths, one family.',
  mapPlace: 'First Lutheran Church, Elm Street and 8th Avenue, Cumberland, WI',
  mapPoint: { lat: 45.53152, lng: -92.03094 },
  travelMode: 'walking',
  distanceMeters: 1215,
  travelMinutes: 16,
  effort: { level: 'easy', note: 'West across town on quiet streets, gently uphill at the end' },
  stayMinutes: [10, 15],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Older than the city' },
    { text: 'First Lutheran’s congregation was organized in 1882, three years before Cumberland became a city. This church, at Elm Street and 8th Avenue, was dedicated in 1963.' },
    { kind: 'heading', text: 'Two faiths, one family' },
    { text: 'Mary Evaline Wolff was born in Cumberland in 1887. Her father, August Wolff, was a Lutheran harness maker who was twice the town’s mayor; her mother, Lucy, was a devout Catholic. She grew up to be Sister Madeleva, a poet and the president of Saint Mary’s College in Indiana, known as “the lady abbess of nun poets.”' },
    { kind: 'find', text: 'As a girl, Madeleva ice-skated from morning to night all winter, and in 1909 the town even had a skating rink. Keep an eye out for frozen water on the way.' },
    { className: 'narrationClose', text: 'Next, the school that sent two brothers to the Olympics. It’s just a block away.' },
  ],
}

const highSchool = {
  id: 'cbHighSchool',
  name: 'Cumberland High School',
  mapName: 'High School',
  photo: townSignPhoto,
  photoAlt: 'The green Cumberland town sign beside Highway 63, with autumn trees behind, standing in for the school',
  memory: 'Where two Olympic champions went to school.',
  mapPlace: 'Cumberland High School, Cumberland, WI',
  mapPoint: { lat: 45.52912, lng: -92.0299 },
  travelMode: 'walking',
  distanceMeters: 333,
  travelMinutes: 4,
  effort: { level: 'easy', note: 'Flat, a block south' },
  stayMinutes: [10, 15],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'Two brothers, two Olympics' },
    { text: 'John and Ben Peterson grew up on a dairy farm in nearby Comstock, and went to Cumberland High School. At the 1972 Olympics in Munich, Ben won gold in freestyle wrestling, and John won silver.' },
    { kind: 'heading', text: 'Then they swapped' },
    { text: 'Four years later, in Montreal, they did it the other way round: John won gold, and Ben silver. Both are in the National Wrestling Hall of Fame.' },
    { kind: 'find', text: 'Find the school’s sports fields. Ben played football for Cumberland High before he was an Olympic champion.' },
    { className: 'narrationClose', text: 'Now the longest part of the walk: south, out of town, to the church the Italians built.' },
  ],
}

const stAnthony = {
  id: 'cbStAnthony',
  name: 'St. Anthony the Abbot Church',
  mapName: 'St. Anthony’s',
  photo: churchPhoto,
  photoAlt: 'St. Anthony the Abbot Church, red brick with a square bell tower and a statue in a niche above the door, beside its sign',
  memory: 'The church a mile south.',
  mapPlace: 'St. Anthony the Abbot Catholic Church, 900 Saint Anthony Street, Cumberland, WI',
  mapPoint: { lat: 45.51758, lng: -92.01476 },
  travelMode: 'walking',
  distanceMeters: 2887,
  travelMinutes: 38,
  effort: { level: 'easy', note: 'South on 8th Avenue, then east along St. Anthony Street, a gentle rise and fall. Part of it is on the road’s edge' },
  stayMinutes: [15, 25],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'A church of their own' },
    { text: 'Cumberland’s first Catholic church, St. Mary’s of the Wayside, was finished in 1884, back in town on Second Avenue. Italian immigrants outnumbered the other Catholics, and in 1885 they left to build a church of their own, a mile south of town. They named it for St. Anthony the Abbot.' },
    { kind: 'heading', text: 'Coming back together' },
    { text: 'In 1973 the two parishes merged, and Mass moved here. St. Mary’s church was sold in 1984, and in 1986 the parish went back to the name St. Anthony the Abbot. The parish center across the street went up in 1993.' },
    { kind: 'find', text: 'Find the parish center across the street, and the cemetery just beside the church.' },
    PEAK_CLOSE,
  ],
}

const cemetery = {
  id: 'cbStAnthonyCemetery',
  name: 'St. Anthony’s Cemetery',
  mapName: 'Cemetery',
  photo: cemeteryPhoto,
  photoAlt: 'The sign of St. Anthony Abbot Catholic Cemetery on a summer lawn, with gravestones and tall evergreens behind it',
  memory: 'Reading the family names.',
  mapPlace: 'Saint Anthony Catholic Cemetery, Cumberland, WI',
  mapPoint: { lat: 45.51836, lng: -92.01568 },
  travelMode: 'walking',
  distanceMeters: 161,
  travelMinutes: 2,
  effort: { level: 'easy', note: 'Flat, just beside the church' },
  stayMinutes: [15, 25],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The families who built it' },
    { text: 'This is the parish’s cemetery. Walk quietly among the stones and read the family names: look for the Italian ones, the families who left St. Mary’s to build the church beside you.' },
    { kind: 'heading', text: 'Still a festival town' },
    { text: 'In the 1960s, Cumberland grew more than 600 acres of rutabagas and was called the Rutabaga Capital of the World. It still holds a Rutabaga Festival every year, the weekend before Labor Day, and the Knights of Columbus stand has long been part of it.' },
    { kind: 'find', text: 'For your memory photo, frame the church from here, with the old stones in front.' },
    { className: 'narrationClose', text: 'Take your time. On the way back into town, ask yourself: what would it take for you to build a place of your own, a mile from everyone else?' },
  ],
}

export default {
  id: 'cumberlandCulture',
  aiMade: true,
  name: 'A Church a Mile South',
  location: 'CUMBERLAND · WISCONSIN, USA',
  city: 'Cumberland',
  photo: churchPhoto,
  photoAlt: stAnthony.photoAlt,
  blurb: 'Italian families, a poet nun, two Olympic brothers, and the church a mile out of town.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Cultural', 'Historical', 'Hidden Gems'],
  departure: chiodoBlock,
  discovery: firstLutheran,
  build: highSchool,
  peak: stAnthony,
  afterglow: cemetery,
  startArea: 'Downtown Cumberland, Wisconsin, USA',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Late spring to fall',
    seasonNote: 'It’s nearly three miles, much of it in the open, so it’s best on a dry day without snow. The Rutabaga Festival, the weekend before Labor Day, shows the town at its liveliest.',
    timeOfDay: 'Late morning to early afternoon',
    timeNote: 'On a Sunday, set off after 11 AM, so you reach St. Anthony’s after its 10:30 Mass.',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against the parish's Mass times,
  // Google's listings and the Wisconsin DNR's deer season dates.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Comfortable walking shoes: it’s nearly three miles, and part of it is on the road’s edge.',
      'Warm layers, a hat and gloves in late autumn, and something bright to wear on the roads outside town.',
      'Water, and a snack: there’s nowhere to buy food on the way south.',
    ],
    costs: [
      'The whole walk is free.',
      'Budget for lunch back in town, at the Corner Bar and Restaurant in the Chiodo Block, for instance.',
    ],
    getting: [
      'Cumberland is about 80 miles north-east of the Twin Cities. There’s street parking downtown, on and around Second Avenue.',
      'The walk ends at St. Anthony’s, about 2 km south of where it starts. Walk back along the path beside County Road P (about 30 minutes), or arrange a ride.',
    ],
    access: [
      'Sidewalks and paths in town, but St. Anthony Street, south of town, has no sidewalk: walk facing the traffic.',
      'It’s mostly flat, with a gentle rise and fall on the way south.',
      'With a stroller or wheelchair, the road’s edge on St. Anthony Street is the hard part.',
    ],
    restrictions: [
      { lead: 'St. Anthony the Abbot', text: 'Sunday Mass is at 10:30 AM (Saturday vigil 6 PM). It’s a working church: visit quietly, and don’t walk around inside during Mass.' },
      { lead: 'Cumberland High School', text: 'It’s school property: see it from the street, especially on a school day.' },
      { lead: 'Deer season', text: 'Wisconsin’s gun deer season runs November 21–29, 2026. Stay on the roads, and wear something bright or blaze orange outside town.' },
    ],
    tips: [
      'The Corner Bar and Restaurant, in the Chiodo Block where you start, opens at 10 AM, every day.',
      'If you’re here on the weekend before Labor Day, the Rutabaga Festival takes over the town, with a parade, music and a Golden Baga hunt.',
      'The parish’s story comes from the Diocese of Superior’s history, Our Journey Through Faith (2005).',
    ],
  },
  match: {
    moods: { Peaceful: 65, Adventurous: 35, Romantic: 30, Curious: 80, Playful: 25, Cultural: 95 },
    with: { Solo: 80, Couple: 70, Family: 45, 'Friends / Group': 60 },
    preferences: {
      'Pet friendly': 60, 'Avoid alcohol': 70, 'More nature': 30, 'Food stops': 30,
      Coastal: 5, 'More urban': 30, 'Hiking involved': 30, 'Budget friendly': 95,
    },
  },
  description: [
    'Cumberland’s people came from all over: Norwegians and Swedes, and Italians, who by the 1880s outnumbered every other group in the Catholic parish. In 1885 they walked out of the church in town and built one of their own, a mile south.',
    'This walk follows them there: from the Italian name on a corner of Second Avenue, past a Lutheran church and the story of a Lutheran mayor whose daughter became a famous poet, and the school that sent two brothers to Olympic gold, out to St. Anthony the Abbot and the families who rest beside it.',
  ],
  // Why It's Cool on the journey's page (JourneyPage.jsx): what you'll
  // discover, why it matters, and what it feels like, a sentence each.
  whyCool: {
    discovery: 'How Norwegians, Swedes and Italians made one small town, and why the Italians built a church a mile south.',
    significance: 'A parish that split in 1885 and came back together in 1973, a mayor’s daughter who became a famous poet, and two brothers with Olympic gold.',
    feeling: 'Thoughtful and personal: a quiet walk out of town, following families whose names are still on the stones.',
  },
  route: [chiodoBlock, firstLutheran, highSchool, stAnthony, cemetery],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Cumberland, told through its people. Whatever you took from the walk, it’s yours now.',
    summary: 'You started at the Chiodo Block, heard about the poet from a two-faith family at First Lutheran, passed the Peterson brothers’ school, walked a mile south to St. Anthony the Abbot, and finished among the families who built it.',
  },
}
