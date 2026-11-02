// At the Edge of the Big Lake (Duluth, Minnesota)

import canalParkPhoto from '../assets/journey/duluth/canal-park.jpg'
import liftBridgePhoto from '../assets/journey/duluth/lift-bridge.jpg'
import lakewalkPhoto from '../assets/journey/duluth/lakewalk.jpg'
import glensheenPhoto from '../assets/journey/duluth/glensheen.jpg'
import engerTowerPhoto from '../assets/journey/duluth/enger-tower.jpg'
import parkPointPhoto from '../assets/journey/duluth/park-point.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const canalPark = {
  id: 'canalPark',
  name: 'Canal Park',
  photo: canalParkPhoto,
  photoAlt: 'A big red lake freighter moored in the harbor at Canal Park, in the evening light',
  memory: 'Where the day began.',
  mapPlace: 'Canal Park, Duluth, MN',
  travelMode: 'driving',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Duluth.' },
    { text: 'Canal Park is the old waterfront, where the city meets Lake Superior. The first few stops are all on foot from here.' },
    { className: 'narrationClose', text: 'Head toward the water. You’ll see the first stop long before you reach it: the big steel bridge over the canal.' },
  ],
}

const liftBridge = {
  id: 'liftBridge',
  name: 'Aerial Lift Bridge',
  photo: liftBridgePhoto,
  photoAlt: 'Duluth’s Aerial Lift Bridge, a tall steel frame over the ship canal, against a blue sky',
  // The photo is wide and the screen is tall: keep the left tower in view,
  // rather than just the middle of the span.
  photoPosition: '5% center',
  memory: 'Watching the bridge, waiting for a ship.',
  mapPlace: 'Aerial Lift Bridge, Duluth, MN',
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'This is the Aerial Lift Bridge, and it’s the reason everyone comes down here. When a ship needs to pass, the whole middle of the bridge rises straight up to let it through.' },
    { text: 'Walk out along the pier beside the canal. If a ship is coming in, you’ll hear it before you see the bridge move. If not, the lake is worth the walk on its own.' },
    { className: 'narrationClose', text: 'When you’re ready, we’ll follow the shore.' },
  ],
}

const glensheen = {
  id: 'glensheen',
  name: 'Glensheen',
  photo: glensheenPhoto,
  photoAlt: 'Glensheen, a large brick mansion, at the top of a sloping lawn among tall trees',
  memory: 'An old estate on the shore.',
  teaser: 'A grand old estate right on the lake, with its grounds running down to the water. A step back in time, a short drive up the shore.',
  mapPlace: 'Glensheen, Duluth, MN',
  travelMode: 'driving',
  ...DETOUR,
  narration: [
    { text: 'You’ve found Glensheen, a grand old family estate on the shore of the lake.' },
    { text: 'Wander the grounds down toward the water and imagine living here, with Lake Superior at the bottom of the garden.' },
    BACK_TO_ROUTE,
  ],
}

const lakewalk = {
  id: 'lakewalk',
  name: 'The Lakewalk',
  photo: lakewalkPhoto,
  photoAlt: 'The Lakewalk boardwalk along the rocky shore of Lake Superior, with the Lift Bridge in the distance',
  memory: 'Along the shore, with the lake beside you.',
  mapPlace: 'Duluth Lakewalk',
  travelMode: 'walking',
  ...BUILD,
  detours: [glensheen],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'The Lakewalk follows the shore northeast from Canal Park, with the lake on one side and the city climbing its hill on the other.' },
    { text: 'Walk as far as you like. Stop on the rocks, look for ships out on the horizon, and turn around now and then to watch the bridge getting smaller behind you.' },
    { text: 'Further up the shore, there’s an old estate that makes a good detour. Otherwise, the best view in Duluth is next, and you’ll want the car for it.' },
  ],
}

const engerTower = {
  id: 'engerTower',
  name: 'Enger Tower',
  photo: engerTowerPhoto,
  photoAlt: 'Enger Tower, a tall eight-sided stone lookout tower, against a deep blue sky',
  memory: 'The city, the harbor and the lake, all at once.',
  mapPlace: 'Enger Tower, Duluth, MN',
  travelMode: 'driving',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'Enger Tower stands on the hill above the city. Climb to the top, and Duluth lays itself out below you: the harbor, the bridge where you started, and Lake Superior stretching off further than you can see.' },
    PEAK_CLOSE,
  ],
}

const parkPoint = {
  id: 'parkPoint',
  name: 'Park Point Beach',
  photo: parkPointPhoto,
  photoAlt: 'A long sandy beach on Lake Superior at Park Point, with driftwood on the sand',
  memory: 'The end of the day, on the sand.',
  mapPlace: 'Park Point Beach, Duluth, MN',
  travelMode: 'driving',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. To get here, you crossed the Lift Bridge onto Park Point, the long, thin strip of sand between the lake and the harbor. This time, you were the one going over it.' },
    { text: 'The beach on the lake side goes on and on. Walk the sand, find some driftwood to sit on, and let the day settle.' },
    DINNER,
  ],
}

export default {
  id: 'duluth',
  aiMade: true,
  name: 'At the Edge of the Big Lake',
  location: 'DULUTH · MINNESOTA, USA',
  // The Lakewalk rather than the bridge: it's tall, like the screens it
  // fills, and the bridge is in it anyway, in the distance.
  photo: lakewalkPhoto,
  photoAlt: lakewalk.photoAlt,
  blurb: 'Along the shore of Lake Superior, from the Lift Bridge up to the best view in town, and back down to the beach.',
  tagline: TAGLINE,
  time: '~5 hours',
  walking: 'Walk + drive',
  stops: '~5 stops',
  departure: canalPark,
  discovery: liftBridge,
  build: lakewalk,
  peak: engerTower,
  afterglow: parkPoint,
  startArea: 'Duluth, Minnesota, USA',
  startNote: START_NOTE,
  match: { moods: ['Peaceful', 'Adventurous', 'Curious'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 5, effort: 'Easy' },
  why: [
    'Duluth sits at the very tip of Lake Superior, and the lake is in everything here: the ships, the weather, the way the whole city leans toward the water. This journey starts down on the waterfront, follows the shore, and climbs to a view that puts it all together, then brings you back down to the sand to end the day.',
  ],
  route: [canalPark, liftBridge, lakewalk, engerTower, parkPoint],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Duluth, from the waterfront to the top of the hill and back to the lake. Whatever you took from the day, it’s yours now.',
    summary: 'You started in Canal Park, watched the Lift Bridge, walked the Lakewalk along the shore, climbed Enger Tower for the view over everything, and finished on the beach at Park Point.',
  },
}
