// The Harbor at the Edge of the Woods (Grand Marais, Minnesota)

import harborPhoto from '../assets/journey/grand-marais/harbor.jpg'
import donutsPhoto from '../assets/journey/grand-marais/donuts.jpg'
import northHousePhoto from '../assets/journey/grand-marais/north-house.jpg'
import cascadeRiverPhoto from '../assets/journey/grand-marais/cascade-river.jpg'
import artistsPointPhoto from '../assets/journey/grand-marais/artists-point.jpg'
import lighthousePhoto from '../assets/journey/grand-marais/lighthouse.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const harbor = {
  id: 'grandMaraisHarbor',
  name: 'Grand Marais Harbor',
  photo: harborPhoto,
  photoAlt: 'Sailboats moored in the calm water of Grand Marais harbor in soft evening light, with a gull flying overhead',
  memory: 'Where the day began.',
  mapPlace: 'Grand Marais Harbor, MN',
  travelMode: 'driving',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Grand Marais.' },
    { text: 'This small harbor town sits far up the North Shore of Lake Superior, with the great northern woods behind it. It’s a town of fishermen, makers and artists, and everything here happens around the harbor.' },
    { className: 'narrationClose', text: 'Walk along the waterfront. The first stop is a little red building you’ll probably smell before you see.' },
  ],
}

const donuts = {
  id: 'worldsBestDonuts',
  name: 'World’s Best Donuts',
  photo: donutsPhoto,
  photoAlt: 'The little red World’s Best Donuts shop with white trim and window boxes of flowers',
  memory: 'A donut by the harbor.',
  mapPlace: 'World’s Best Donuts, Grand Marais, MN',
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'The name is bold. The building is tiny. Decide for yourself.' },
    { text: 'Take your donut down to the water and eat it looking out over the harbor.' },
    { className: 'narrationClose', text: 'Next, a school where people come to learn the old ways of making things.' },
  ],
}

const cascadeRiver = {
  id: 'cascadeRiver',
  name: 'Cascade River State Park',
  photo: cascadeRiverPhoto,
  photoAlt: 'The view from a lookout in Cascade River State Park, over a wide forest of green trees to a distant ridge',
  memory: 'The river through the gorge.',
  teaser: 'A river that drops through a narrow gorge in a string of little waterfalls. A short drive down the shore.',
  mapPlace: 'Cascade River State Park',
  travelMode: 'driving',
  ...DETOUR,
  narration: [
    { text: 'Here, the Cascade River tumbles down to the lake through a narrow rocky gorge, in one small waterfall after another.' },
    { text: 'Follow the trail up beside the river, and cross the footbridges over it. Keep going for a view out over the forest.' },
    BACK_TO_ROUTE,
  ],
}

const northHouse = {
  id: 'northHouse',
  name: 'North House Folk School',
  photo: northHousePhoto,
  photoAlt: 'A workbench with hand tools and a half-made piece of wood, under frosted windows in a workshop at North House Folk School',
  memory: 'Old crafts by the harbor.',
  mapPlace: 'North House Folk School',
  travelMode: 'walking',
  ...BUILD,
  detours: [cascadeRiver],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'North House Folk School sits right on the harbor. People come from all over to learn the old crafts of the north here: building boats, carving wood, and plenty more.' },
    { text: 'Wander the campus and see what’s being made. You might find a boat slowly taking shape in one of the workshops.' },
    { text: 'A short drive down the shore, there’s a river in a gorge, if you’d like a detour. Otherwise, the point is waiting.' },
  ],
}

const artistsPoint = {
  id: 'artistsPoint',
  name: 'Artist’s Point',
  photo: artistsPointPhoto,
  photoAlt: 'Broad, flat ledges of pinkish rock at Artist’s Point, with the lake on either side and trees beyond',
  memory: 'On the rocks at Artist’s Point.',
  mapPlace: 'Artist’s Point, Grand Marais, MN',
  travelMode: 'walking',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'Artist’s Point is a finger of rock beside the harbor, where the trees give way to bare ledges and open water.' },
    { text: 'Walk out over the rocks, find a flat spot, and sit. On one side is the calm harbor. On the other, Lake Superior goes on forever.' },
    PEAK_CLOSE,
  ],
}

const lighthouse = {
  id: 'grandMaraisLighthouse',
  name: 'Grand Marais Lighthouse',
  photo: lighthousePhoto,
  photoAlt: 'The small white Grand Marais Lighthouse at the end of the breakwall, against a pink evening sky',
  memory: 'At the lighthouse as the sun went down.',
  mapPlace: 'Grand Marais Lighthouse',
  travelMode: 'walking',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. From the point, walk out along the breakwall to the little lighthouse at the end. Take care if the waves are up: the wall gets wet and slippery.' },
    { text: 'Stand by the light and watch the evening settle over the harbor and the town.' },
    DINNER,
  ],
}

export default {
  id: 'grandMarais',
  aiMade: true,
  name: 'The Harbor at the Edge of the Woods',
  location: 'GRAND MARAIS · MINNESOTA, USA',
  photo: lighthousePhoto,
  photoAlt: lighthouse.photoAlt,
  blurb: 'Around a little harbor on Lake Superior, from donuts by the water to the rocks of Artist’s Point and the lighthouse at sunset.',
  tagline: TAGLINE,
  time: '~5 hours',
  walking: 'Easy walking',
  stops: '~5 stops',
  departure: harbor,
  discovery: donuts,
  build: northHouse,
  peak: artistsPoint,
  afterglow: lighthouse,
  startArea: 'Grand Marais, Minnesota, USA',
  startNote: START_NOTE,
  match: { moods: ['Peaceful', 'Romantic', 'Curious'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 5, effort: 'Easy' },
  why: [
    'Grand Marais is a long way up the shore, and that’s part of its charm. It’s a small town wrapped around a harbor, with the lake in front and the forest behind. This journey stays close to the water all day, and ends at the little lighthouse as the sun goes down.',
  ],
  route: [harbor, donuts, northHouse, artistsPoint, lighthouse],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Grand Marais, all the way around the harbor. Whatever you took from the day, it’s yours now.',
    summary: 'You started at the harbor, had a donut by the water, looked in on the workshops at North House Folk School, sat on the rocks at Artist’s Point, and finished at the lighthouse at the end of the breakwall.',
  },
}
