// Down by the St. Croix (Stillwater, Minnesota)

import lowellParkPhoto from '../assets/journey/stillwater/lowell-park.jpg'
import mainStreetPhoto from '../assets/journey/stillwater/main-street.jpg'
import courthousePhoto from '../assets/journey/stillwater/courthouse.jpg'
import wardensHousePhoto from '../assets/journey/stillwater/wardens-house.jpg'
import liftBridgePhoto from '../assets/journey/stillwater/lift-bridge.jpg'
import liftBridgeNightPhoto from '../assets/journey/stillwater/lift-bridge-night.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const lowellPark = {
  id: 'lowellPark',
  name: 'Lowell Park',
  photo: lowellParkPhoto,
  photoAlt: 'A white pavilion on the riverfront in Lowell Park, with the St. Croix River and the Lift Bridge behind',
  memory: 'Where the day began.',
  mapPlace: 'Lowell Park, Stillwater, MN',
  travelMode: 'driving',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Stillwater.' },
    { text: 'This old river town calls itself the birthplace of Minnesota. It grew up on lumber, when logs from the northern forests came floating down the St. Croix, and the old town still sits right on the water.' },
    { className: 'narrationClose', text: 'Have a look along the river, then turn around. Main Street is right behind you.' },
  ],
}

const mainStreet = {
  id: 'stillwaterMainStreet',
  name: 'Main Street',
  photo: mainStreetPhoto,
  photoAlt: 'The old brick rooftops of downtown Stillwater, with wooded bluffs behind them, under a blue sky',
  memory: 'Browsing along Main Street.',
  mapPlace: 'Main Street, Stillwater, MN',
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'Main Street is lined with old brick buildings from the lumber days, and they’re full of antique shops, bookshops and places to eat.' },
    { text: 'Take your time. Go into whatever catches your eye, and look up now and then at the old fronts above the shop windows.' },
    { className: 'narrationClose', text: 'When you’re ready, head up the hill. There’s a view waiting.' },
  ],
}

const wardensHouse = {
  id: 'wardensHouse',
  name: 'Warden’s House Museum',
  photo: wardensHousePhoto,
  photoAlt: 'The Warden’s House, a two-storey stone house with a wooden porch, framed by trees',
  memory: 'The warden’s old house.',
  teaser: 'The house where the wardens of the old territorial prison once lived, now a small museum. At the north end of Main Street.',
  mapPlace: 'Warden’s House Museum, Stillwater, MN',
  travelMode: 'walking',
  ...DETOUR,
  narration: [
    { text: 'Stillwater was home to the territorial prison, and this stone house was where its wardens lived. Now it’s a small museum of the town’s past.' },
    { text: 'Have a look around, and imagine the town as it was, with the prison just down the road.' },
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
  travelMode: 'walking',
  ...BUILD,
  detours: [wardensHouse],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'Up on the hill above downtown, the old courthouse sits on its lawn. It’s said to be the oldest courthouse still standing in Minnesota.' },
    { text: 'Walk around it, then look back down at the town and the river. You’ve climbed higher than you think.' },
    { text: 'At the other end of Main Street, there’s an old warden’s house, if you’d like a detour. Otherwise, head back down to the river for the bridge.' },
  ],
}

const liftBridge = {
  id: 'stillwaterLiftBridge',
  name: 'Stillwater Lift Bridge',
  photo: liftBridgePhoto,
  photoAlt: 'The Stillwater Lift Bridge, a steel bridge with two tall lifting towers, over the St. Croix River on a clear day',
  memory: 'Halfway across the St. Croix.',
  mapPlace: 'Stillwater Lift Bridge',
  travelMode: 'walking',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'The old Lift Bridge crosses the St. Croix to Wisconsin. Cars don’t use it anymore; now it’s for people on foot and on bikes.' },
    { text: 'Walk out to the middle and stop. Minnesota is behind you, Wisconsin is in front, and the river runs between, wide and slow.' },
    PEAK_CLOSE,
  ],
}

const riverfront = {
  id: 'stillwaterRiverfront',
  name: 'The Riverfront at Dusk',
  photo: liftBridgeNightPhoto,
  photoAlt: 'The Stillwater Lift Bridge lit up at night, its lights reflected in red and gold on the river',
  memory: 'The bridge lit up over the river.',
  mapPlace: 'Lowell Park, Stillwater, MN',
  travelMode: 'walking',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop, and you’re back where you started, by the water.' },
    { text: 'Find a bench and wait for dusk. When the lights come on, the bridge you just walked across glows over the river, and the whole town seems to slow down.' },
    DINNER,
  ],
}

export default {
  id: 'stillwater',
  aiMade: true,
  name: 'Down by the St. Croix',
  location: 'STILLWATER · MINNESOTA, USA',
  photo: liftBridgePhoto,
  photoAlt: liftBridge.photoAlt,
  blurb: 'Through an old river town, up the hill for the view, and out across the river on foot, to watch the bridge light up at dusk.',
  tagline: TAGLINE,
  time: '~4 hours',
  walking: 'Easy walking',
  stops: '~5 stops',
  departure: lowellPark,
  discovery: mainStreet,
  build: courthouse,
  peak: liftBridge,
  afterglow: riverfront,
  startArea: 'Stillwater, Minnesota, USA',
  startNote: START_NOTE,
  match: { moods: ['Romantic', 'Peaceful', 'Curious'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 4, effort: 'Easy' },
  why: [
    'Stillwater is the kind of river town that makes you want to slow down: old brick streets, bookshops, and a wide, quiet river with a bridge you can walk across. This journey takes you through the town, up the hill for a look at it all, over the water, and back again in time for the lights.',
  ],
  route: [lowellPark, mainStreet, courthouse, liftBridge, riverfront],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Stillwater, down by the river and back again. Whatever you took from the day, it’s yours now.',
    summary: 'You started by the river in Lowell Park, browsed along Main Street, climbed the hill to the old courthouse, walked out across the Lift Bridge, and finished on the riverfront as the lights came on.',
  },
}
