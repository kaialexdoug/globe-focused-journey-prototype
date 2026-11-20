// The Island City’s Main Street (Cumberland, Wisconsin): the Historical one
// of the Cumberland journeys, made for the AI journey test (Dad's handoff,
// for a field test on Sunday, November 22, 2026, from downtown at 11 AM).
// Each Cumberland journey is its own journey, one per kind of experience
// that Cumberland could honestly support.
//
// Every stop has its exact spot (`mapPoint`, from OpenStreetMap and its
// address search), and the walk to it from the stop before, from
// OpenStreetMap's walking routes (routing.openstreetmap.de), with heights
// from Open-Meteo, worked out in November 2026. Downtown is flat.
//
// The facts are from Wikipedia (Cumberland, its library and St. Mary's
// Rectory), the Wisconsin Historical Society's building records (as quoted in
// search results: the State Bank, Uecke's Opera House), and the 1909 Sanborn
// fire-insurance map of Cumberland (Library of Congress), checked in November
// 2026. The Tower House's new owners are from its own ordering page.
//
// Hero image (Dad's hero rules): the Carnegie library, now the Thomas St.
// Angelo Public Library, from the corner on a clear day with the trees bare:
// its columns, its steps, and PUBLIC LIBRARY carved above them. Why: one
// clear subject that says “old main street” at a glance. It was found in a
// web search in November 2026, and who took it and its licence aren't
// confirmed yet: check them before the app goes public (see Photo credits in
// the README). Grade: Cultural (faithful colors and textures, a subtle film
// finish); the photo's used as it is. Crop: the door and columns in the
// middle. The library's stop uses it too. Its name is from the sign in it.
//
// The other photos are from Wikimedia Commons (credited in the README). The Old State
// Bank has no photo of its own, so a photo of other storefronts on the same
// street stands in, and says so. Nobody from Unfold has walked it yet.

import libraryPhoto from '../assets/journey/cumberland/library-front.webp'
import shopsPhoto from '../assets/journey/cumberland/second-avenue-shops.jpg'
import operaHousePhoto from '../assets/journey/cumberland/uecke-opera-house.jpg'
import rectoryPhoto from '../assets/journey/cumberland/rectory.jpg'
import towerPhoto from '../assets/journey/cumberland/second-avenue-tower.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const library = {
  id: 'cbLibrary',
  name: 'Thomas St. Angelo Public Library',
  mapName: 'Library',
  photo: libraryPhoto,
  photoAlt: 'The Thomas St. Angelo Public Library, a brick Carnegie library with stone columns either side of its door, steps up to it, and its sign out front',
  memory: 'Where the day began.',
  mapPlace: 'Thomas St. Angelo Public Library, 1305 2nd Avenue, Cumberland, WI',
  mapPoint: { lat: 45.53412, lng: -92.02157 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [10, 15],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Cumberland.' },
    { kind: 'heading', text: 'The Island City' },
    { text: 'Cumberland grew up on land almost surrounded by Beaver Dam Lake, which is why it’s called the Island City. The railroad came through in 1878, the town took its name from Cumberland, Maryland, in 1880, and it became a city in 1885.' },
    { kind: 'heading', text: 'A gift from Andrew Carnegie' },
    { text: 'In 1905, Andrew Carnegie gave the town $10,000 for a library, and this is it, finished in 1906. Its architect, C. H. Patsche, built it to the same design as his library in Fairmont, Minnesota. It’s on the National Register of Historic Places, and it’s still the town’s library, now called the Thomas St. Angelo Public Library.' },
    { kind: 'find', text: 'Find the words carved above the door, then count the columns either side of it.' },
    { className: 'narrationClose', text: 'Next, a bank that became a newspaper, a few doors up Second Avenue.' },
  ],
}

const stateBank = {
  id: 'cbStateBank',
  name: 'The Old State Bank',
  mapName: 'Old State Bank',
  photo: shopsPhoto,
  photoAlt: 'Storefronts along Second Avenue under a blue sky, standing in for the old bank a few doors away',
  memory: 'From a bank to the town’s newspaper.',
  mapPlace: '1375 2nd Avenue, Cumberland, WI',
  mapPoint: { lat: 45.53509, lng: -92.0216 },
  travelMode: 'walking',
  distanceMeters: 108,
  travelMinutes: 2,
  effort: { level: 'easy', note: 'Flat, a few doors up Second Avenue' },
  stayMinutes: [10, 15],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Money, then the news' },
    { text: 'This was built in 1916 for the State Bank of Cumberland, of brick and Bedford stone. In 1965 the town’s newspaper, the Cumberland Advocate, moved in, and gave it the look it has today.' },
    { kind: 'heading', text: 'News since 1881' },
    { text: 'Cumberland’s first newspaper, the Cumberland Herald, started printing in 1881, and later became the Advocate. The town’s first bank opened two years after that, in 1883.' },
    { kind: 'find', text: 'Stand across the street and pick out which buildings on this block are brick, and which are wood.' },
    { className: 'narrationClose', text: 'Next, an opera house, just around the corner on Foster Street.' },
  ],
}

const operaHouse = {
  id: 'cbOperaHouse',
  name: 'Uecke’s Opera House',
  mapName: 'Opera House',
  photo: operaHousePhoto,
  photoAlt: 'The former Uecke’s Opera House, a white two-storey building with a gable front, on a street corner',
  memory: 'The opera house with a stage upstairs.',
  mapPlace: '1190 Foster Street, Cumberland, WI',
  mapPoint: { lat: 45.53643, lng: -92.02131 },
  travelMode: 'walking',
  distanceMeters: 181,
  travelMinutes: 2,
  effort: { level: 'easy', note: 'Flat, up Second Avenue to Foster Street' },
  stayMinutes: [10, 15],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'A stage upstairs' },
    { text: 'Uecke’s Opera House opened in 1903 and cost $10,000 to build. Downstairs was Albert Uecke’s real estate business. Upstairs was a hall with a stage, where the town held its school graduations and its shows.' },
    { kind: 'heading', text: 'From the stage to city hall' },
    { text: 'Albert Uecke went on to be elected mayor. And in 1909, when the fire-insurance surveyors mapped the town, they listed this building simply as the Uecke Opera House.' },
    { kind: 'find', text: 'Look up at the second floor, where the hall was, and picture a graduating class crossing the stage.' },
    { className: 'narrationClose', text: 'One more building, a few minutes north. It’s the highlight of the street.' },
  ],
}

const rectory = {
  id: 'cbRectory',
  name: 'St. Mary’s Rectory',
  mapName: 'Rectory',
  photo: rectoryPhoto,
  photoAlt: 'St. Mary’s Rectory, a big brick house with gables and a round-arched porch, behind a lawn and trees (a black-and-white photo)',
  memory: 'The scholar’s rectory on Second Avenue.',
  mapPlace: 'St. Mary’s Rectory, 1575 2nd Avenue, Cumberland, WI',
  mapPoint: { lat: 45.53875, lng: -92.02202 },
  travelMode: 'walking',
  distanceMeters: 288,
  travelMinutes: 4,
  effort: { level: 'easy', note: 'Flat, north along Second Avenue' },
  stayMinutes: [10, 15],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'A house for a scholar' },
    { text: 'This brick house was built in 1904 as the rectory of St. Mary’s of the Wayside, the town’s first Catholic church. It was built for the Reverend Dr. Stephen Leinfelder, who was the youngest American to hold degrees in both philosophy and theology.' },
    { kind: 'heading', text: 'Queen Anne, with arches' },
    { text: 'It’s a late Queen Anne house with Romanesque Revival touches, and it’s on the National Register of Historic Places. The church sold it in 1985, and it’s been a boarding house and a bed and breakfast since. Today it’s a private home, so enjoy it from the sidewalk.' },
    { kind: 'find', text: 'Find the round arches, the Romanesque touch, on a house that’s otherwise all gables and Queen Anne.' },
    PEAK_CLOSE,
  ],
}

const towerHouse = {
  id: 'cbTowerHouse',
  name: 'The Tower House',
  mapName: 'Tower House',
  photo: towerPhoto,
  photoAlt: 'Second Avenue, looking north, with the Tower House’s little white tower on top of a brick building on the left',
  memory: 'Coffee under the little tower.',
  mapPlace: 'The Tower House, 1445 2nd Avenue, Cumberland, WI',
  mapPoint: { lat: 45.5362, lng: -92.02204 },
  travelMode: 'walking',
  distanceMeters: 282,
  travelMinutes: 4,
  effort: { level: 'easy', note: 'Flat, back down Second Avenue' },
  stayMinutes: [20, 40],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The building with the tower' },
    { text: 'You can’t miss the Tower House: it’s the brick building with the little white tower on top. New owners took it over in 2025, and it’s now home to Lightning Bolt Coffee and a lounge, among other things.' },
    { kind: 'heading', text: 'A street that kept its buildings' },
    { text: 'On one short stretch of Second Avenue, you’ve passed a library, a bank, an opera house and a rectory, every one of them more than a hundred years old, and all still standing.' },
    { kind: 'find', text: 'For your memory photo, stand across the street and get the tower and Second Avenue in one frame.' },
    { className: 'narrationClose', text: 'Find a seat, if it’s open, and ask yourself: which of these buildings would you have most liked to see in its first year?' },
  ],
}

export default {
  id: 'cumberlandHistory',
  aiMade: true,
  name: 'The Island City’s Main Street',
  location: 'CUMBERLAND · WISCONSIN, USA',
  city: 'Cumberland',
  photo: libraryPhoto,
  photoAlt: library.photoAlt,
  blurb: 'A Carnegie library, an opera house with a stage upstairs, and a scholar’s rectory, all on one street.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Historical', 'Cultural', 'Hidden Gems'],
  departure: library,
  discovery: stateBank,
  build: operaHouse,
  peak: rectory,
  afterglow: towerHouse,
  startArea: 'Downtown Cumberland, Wisconsin, USA',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Late spring to fall',
    seasonNote: 'The walk is short and on sidewalks, so it works in any season, but the trees along Second Avenue are at their best from May to October.',
    timeOfDay: 'Late morning, on a weekday or Saturday',
    timeNote: 'The library is open on weekdays and Saturday mornings, but closed on Sundays.',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against the library's own listing,
  // the Tower House's ordering page and Google's listings.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Comfortable shoes: it’s all on sidewalks, and under a mile.',
      'Warm layers in late autumn and winter: it’s often around freezing by late November.',
      'Some cash or a card for coffee at the end.',
    ],
    costs: [
      'The whole walk is free: everything’s seen from the street, and the library is free to go into when it’s open.',
      'Budget for a coffee or lunch at the end.',
    ],
    getting: [
      'Cumberland is about 80 miles north-east of the Twin Cities. Second Avenue is US Highway 63, through the middle of town.',
      'There’s street parking downtown.',
      'The walk ends at the Tower House, about 300 metres from the library where it starts.',
    ],
    access: [
      'Flat sidewalks all the way, fine with a stroller or wheelchair.',
      'The library has steps up to its front door.',
    ],
    restrictions: [
      { lead: 'Thomas St. Angelo Public Library', text: 'Monday to Friday 9 AM–7 PM, Saturday 9 AM–1 PM. Closed on Sundays, so on a Sunday you’ll see it from outside.' },
      { lead: 'St. Mary’s Rectory', text: 'A private home: please stay on the sidewalk.' },
      { lead: 'The Tower House', text: 'It changed hands in 2025, and its hours have changed with it. Listings show it open on Sundays until mid-afternoon, but check before you go.' },
    ],
    tips: [
      'On the weekend before Labor Day, the Rutabaga Festival fills downtown with music, food and a parade.',
      'For a Sunday breakfast or lunch nearby, the Country Skillet Cafe is open on Sunday mornings, and the Corner Bar and Restaurant from 10 AM.',
      'The Library of Congress has the fire-insurance maps of Cumberland from 1893, 1899 and 1909: look up the 1909 one and compare it with the street as you walk.',
    ],
  },
  match: {
    moods: { Peaceful: 65, Adventurous: 15, Romantic: 45, Curious: 80, Playful: 30, Cultural: 85 },
    with: { Solo: 85, Couple: 75, Family: 55, 'Friends / Group': 60 },
    preferences: {
      'Pet friendly': 70, 'Avoid alcohol': 80, 'More nature': 10, 'Food stops': 45,
      Coastal: 5, 'More urban': 60, 'Hiking involved': 5, 'Budget friendly': 95,
    },
  },
  description: [
    'Cumberland is a small town on an island, almost surrounded by Beaver Dam Lake, and its main street has kept a remarkable run of buildings from its first boom: a library paid for by Andrew Carnegie, a bank of brick and stone, an opera house with a stage upstairs, and a grand brick rectory.',
    'This short walk up Second Avenue reads the town’s story in them, from the railroad years to the town’s newspaper, and ends with a coffee under the little tower that everyone in town knows.',
  ],
  route: [library, stateBank, operaHouse, rectory, towerHouse],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Cumberland’s main street, read one building at a time. Whatever you took from the walk, it’s yours now.',
    summary: 'You started at the Carnegie library, found the bank that became a newspaper, stood under the opera house’s old hall, reached the scholar’s rectory, and finished with a coffee at the Tower House.',
  },
}
