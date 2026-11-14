// Down by the St. Croix (Stillwater, Minnesota), built the same way as the
// Waseda journey (testJourney.js). Every stop has its exact spot (`mapPoint`,
// from Wikipedia and OpenStreetMap), so it gets the live map, and the walk to
// it from the stop before: how far (`distanceMeters`), how long
// (`travelMinutes`) and how hard (`effort`), from Google's walking routes and
// the heights along them (Open-Meteo), worked out once, in November 2026.
//
// The narration tells one story from stop to stop: a lumber town on the
// river, the meeting on Main Street that started Minnesota, the boom-town
// courthouse, the prison where Jesse James's partners were held, and the old
// bridge over to Wisconsin. The history was checked against published
// sources (Wikipedia) in November 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import lowellParkPhoto from '../assets/journey/stillwater/lowell-park.jpg'
import mainStreetPhoto from '../assets/journey/stillwater/main-street.jpg'
import courthousePhoto from '../assets/journey/stillwater/courthouse.jpg'
import wardensHousePhoto from '../assets/journey/stillwater/wardens-house.jpg'
import liftBridgePhoto from '../assets/journey/stillwater/lift-bridge.jpg'
import liftBridgeNightPhoto from '../assets/journey/stillwater/lift-bridge-night.jpg'

// The spots near the stops.
import staplesSawmillPhoto from '../assets/journey/stillwater/staples-sawmill.jpg'
import nelsonsPhoto from '../assets/journey/stillwater/nelsons-ice-cream.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const lowellPark = {
  id: 'lowellPark',
  name: 'Lowell Park',
  photo: lowellParkPhoto,
  photoAlt: 'A white pavilion on the riverfront in Lowell Park, with the St. Croix River and the Lift Bridge behind',
  memory: 'Where the day began.',
  mapPlace: 'Lowell Park, Stillwater, MN',
  mapPoint: { lat: 45.0577798, lng: -92.8049645 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [10, 20],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Stillwater.' },
    { kind: 'heading', text: 'A town named for calm water' },
    { text: 'In 1843, John McKusick built the first sawmill here and suggested the name Stillwater. The town was founded that October, and it grew on lumber: logs cut in the forests to the north came floating down the St. Croix to its mills.' },
    { kind: 'heading', text: 'The log boom' },
    { text: 'Upriver, from 1856 to 1914, the St. Croix Boom caught the logs on their way down, sorted them by their owners’ marks, and sent them on to the right mills.' },
    { kind: 'find', text: 'Find the Lift Bridge downriver, with its two tall towers. You’ll be walking across it later.' },
    { className: 'narrationClose', text: 'Main Street is right behind you.' },
  ],
}

const mainStreet = {
  id: 'stillwaterMainStreet',
  name: 'Main Street',
  photo: mainStreetPhoto,
  photoAlt: 'The old brick rooftops of downtown Stillwater, with wooded bluffs behind them, under a blue sky',
  memory: 'Browsing along Main Street.',
  mapPlace: 'Main Street and Myrtle Street, Stillwater, MN',
  mapPoint: { lat: 45.05597, lng: -92.80612 },
  travelMode: 'walking',
  distanceMeters: 257,
  travelMinutes: 4,
  effort: { level: 'easy', note: 'Flat, a block in from the river' },
  stayMinutes: [45, 60],
  nearby: [
    {
      name: 'Isaac Staples’ Sawmill',
      note: 'Stillwater’s second sawmill, from 1850, with its 80-foot smokestack. Now it’s shops, with apartments upstairs',
      meters: 431,
      photo: staplesSawmillPhoto,
      photoAlt: 'The old stone sawmill powerhouse and its tall smokestack, at the north end of Main Street',
      mapPlace: 'Isaac Staples Sawmill, Stillwater, MN',
      mapPoint: { lat: 45.059722, lng: -92.8075 },
    },
  ],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The birthplace of Minnesota' },
    { text: 'In 1848, a convention met right here, on the corner of Main and Myrtle, and began the process that made Minnesota a territory, and in the end a state. That’s why Stillwater calls itself the birthplace of Minnesota.' },
    { kind: 'heading', text: 'Built on lumber' },
    { text: 'The brick buildings along Main Street went up on lumber money. Today they’re full of antique shops, bookshops and places to eat.' },
    { kind: 'find', text: 'At the north end of Main Street, find the old Staples sawmill, its tall stone smokestack still standing after more than 170 years.' },
    { className: 'narrationClose', text: 'When you’re ready, head up the hill. There’s a view waiting.' },
  ],
}

const wardensHouse = {
  id: 'wardensHouse',
  name: 'Warden’s House Museum',
  mapName: 'Warden’s House',
  photo: wardensHousePhoto,
  photoAlt: 'The Warden’s House, a two-storey stone house with a wooden porch, framed by trees',
  memory: 'The warden’s old house.',
  teaser: 'The house where the wardens of the old territorial prison once lived, now a small museum. At the north end of town.',
  mapPlace: 'Warden’s House Museum, Stillwater, MN',
  mapPoint: { lat: 45.06166667, lng: -92.8075 },
  travelMode: 'walking',
  // From the courthouse. On to the Lift Bridge after, it's 966 m, so taking
  // it adds 1,364 m of walking to going straight there.
  distanceMeters: 1467,
  travelMinutes: 20,
  extraMeters: 1364,
  effort: { level: 'easy', note: 'Down off the hill and north along the edge of town' },
  stayMinutes: [30, 45],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'The warden’s house' },
    { text: 'From 1853 to 1914, this limestone house was home to the wardens of Minnesota’s territorial prison, which became the state prison when Minnesota became a state. The prison stood just to the north, down in the ravine.' },
    { kind: 'heading', text: 'The Younger brothers' },
    { text: 'Its most famous prisoners were Cole, Bob and Jim Younger, who rode with Jesse James. The prison closed in 1914, and most of it was torn down in 1936. This house is the only building left from Minnesota’s territory days.' },
    { kind: 'find', text: 'Look down into the ravine to the north, where the prison walls once stood.' },
    BACK_TO_ROUTE,
  ],
}

const courthouse = {
  id: 'stillwaterCourthouse',
  name: 'Historic Courthouse',
  photo: courthousePhoto,
  photoAlt: 'The old Washington County Courthouse, a brick building with a cupola on top, on a hill above a flowerbed',
  memory: 'Up the hill to the old courthouse.',
  mapPlace: 'Washington County Historic Courthouse, Stillwater, MN',
  mapPoint: { lat: 45.05166667, lng: -92.8075 },
  travelMode: 'walking',
  distanceMeters: 804,
  travelMinutes: 13,
  effort: { level: 'moderate', note: 'Uphill: a climb of about 40 metres to the courthouse on its hill' },
  stayMinutes: [15, 30],
  nearby: [
    {
      name: 'Nelson’s Ice Cream',
      note: 'Up the hill: an ice cream shop since 1923, famous for enormous cones. The Lumberjack is five scoops',
      meters: 917,
      photo: nelsonsPhoto,
      photoAlt: 'Nelson’s Ice Cream, a small shop on a street corner',
      mapPlace: 'Nelson’s Ice Cream, Stillwater, MN',
      mapPoint: { lat: 45.053472, lng: -92.818889 },
    },
  ],
  ...BUILD,
  detours: [wardensHouse],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'A boom-town courthouse' },
    { text: 'The Washington County Courthouse opened in 1870, while the county was booming on lumber. It’s one of the oldest courthouses still standing in Minnesota, and the county was run from here for more than a century, until 1975.' },
    { kind: 'heading', text: 'Limestone, brick and a dome' },
    { text: 'It stands on a limestone foundation, with brick walls and a dome and cupola on top. Since the county moved out, it’s been restored and used for community events.' },
    { kind: 'find', text: 'Find the cupola on top of the dome, then turn around and look down over the town and the river. You’ve climbed higher than you think.' },
    { className: 'narrationClose', text: 'At the north end of town is the old prison warden’s house, if you’d like a detour. Otherwise, head back down to the river for the bridge.' },
  ],
}

const liftBridge = {
  id: 'stillwaterLiftBridge',
  name: 'Stillwater Lift Bridge',
  mapName: 'Lift Bridge',
  photo: liftBridgePhoto,
  photoAlt: 'The Stillwater Lift Bridge, a steel bridge with two tall lifting towers, over the St. Croix River on a clear day',
  memory: 'Halfway across the St. Croix.',
  mapPlace: 'Stillwater Lift Bridge',
  mapPoint: { lat: 45.0567434, lng: -92.8022374 },
  travelMode: 'walking',
  distanceMeters: 1069,
  travelMinutes: 14,
  effort: { level: 'easy', note: 'Downhill all the way back to the river' },
  stayMinutes: [20, 30],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The last of its kind' },
    { text: 'The bridge was built in 1931 to replace a swing bridge, and it was the last of its kind built in these parts. Its middle span, 140 feet long, lifts straight up between the towers to let boats through.' },
    { kind: 'heading', text: 'For walkers now' },
    { text: 'In 2017 a new highway bridge opened downriver, and this one was kept for people on foot and on bikes. The river below is the state line: Minnesota behind you, Wisconsin ahead.' },
    { kind: 'find', text: 'Stop where you think the middle of the river is. That’s where Minnesota ends and Wisconsin begins.' },
    PEAK_CLOSE,
  ],
}

const riverfront = {
  id: 'stillwaterRiverfront',
  name: 'The Riverfront at Dusk',
  mapName: 'Riverfront',
  photo: liftBridgeNightPhoto,
  photoAlt: 'The Stillwater Lift Bridge lit up at night, its lights reflected in red and gold on the river',
  memory: 'The bridge lit up over the river.',
  mapPlace: 'Lowell Park, Stillwater, MN',
  mapPoint: { lat: 45.0552, lng: -92.8037 },
  travelMode: 'walking',
  distanceMeters: 307,
  travelMinutes: 4,
  effort: { level: 'easy', note: 'Back off the bridge into Lowell Park' },
  stayMinutes: [30, 60],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Full circle' },
    { text: 'You’re back by the water where the day began, and where the town did too: the logs floated in here, the mills cut them, and much of what you walked past today was built on what they earned.' },
    { kind: 'heading', text: 'Lights on the river' },
    { text: 'Find a bench and wait for dusk. When the lights come on, the bridge you walked across glows over the river, and the whole town seems to slow down.' },
    { kind: 'find', text: 'Once the bridge lights up, find its reflection stretched out across the water.' },
    DINNER,
  ],
}

export default {
  id: 'stillwater',
  aiMade: true,
  name: 'Down by the St. Croix',
  location: 'STILLWATER · MINNESOTA, USA',
  city: 'Stillwater',
  photo: liftBridgePhoto,
  photoAlt: liftBridge.photoAlt,
  blurb: 'An old river town, a walk across the water, and a bridge that lights up at dusk.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Historical', 'Scenic', 'Hidden Gems'],
  departure: lowellPark,
  discovery: mainStreet,
  build: courthouse,
  peak: liftBridge,
  afterglow: riverfront,
  startArea: 'Stillwater, Minnesota, USA',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Fall',
    seasonNote: 'For the fall colors along the St. Croix, in early to mid-October.',
    timeOfDay: 'In the afternoon and evening',
    timeNote: 'It ends by the river at dusk, as the lights come on.',
  },
  match: {
    moods: { Peaceful: 70, Adventurous: 30, Romantic: 90, Curious: 70, Playful: 45, Cultural: 55 },
    with: { Solo: 60, Couple: 95, Family: 60, 'Friends / Group': 75 },
    preferences: {
      'Pet friendly': 55, 'Avoid alcohol': 60, 'More nature': 40, 'Food stops': 65,
      Coastal: 10, 'More urban': 45, 'Hiking involved': 10, 'Budget friendly': 75,
    },
  },
  description: [
    'Stillwater grew up on lumber, when logs from the northern forests came floating down the St. Croix to its mills, and it calls itself the birthplace of Minnesota: the state got its start at a meeting on the corner of Main Street.',
    'This journey walks from the riverfront through the old lumber town, up to its courthouse on the hill, past the prison where Jesse James’s partners were locked away, and out over the river on the old lift bridge, then back to the water as the lights come on.',
  ],
  route: [lowellPark, mainStreet, courthouse, liftBridge, riverfront],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Stillwater, down by the river and back again. Whatever you took from the day, it’s yours now.',
    summary: 'You started by the river in Lowell Park, browsed along Main Street, climbed the hill to the old courthouse, walked out across the Lift Bridge, and finished on the riverfront as the lights came on.',
  },
}
