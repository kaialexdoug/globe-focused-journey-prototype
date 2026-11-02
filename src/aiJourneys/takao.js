// A Mountain on the Edge of Tokyo (Mount Takao, Tokyo)

import stationPhoto from '../assets/journey/takao/station.jpg'
import cableCarPhoto from '../assets/journey/takao/cable-car.jpg'
import yakuoinPhoto from '../assets/journey/takao/yakuoin.jpg'
import monkeyParkPhoto from '../assets/journey/takao/monkey-park.jpg'
import summitPhoto from '../assets/journey/takao/summit.jpg'
import gokurakuyuPhoto from '../assets/journey/takao/gokurakuyu.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const station = {
  id: 'takaosanguchi',
  name: 'Takaosanguchi Station',
  photo: stationPhoto,
  photoAlt: 'A red torii by the road near Takaosanguchi Station, with shops and wooded hills behind',
  memory: 'Where the day began.',
  mapPlace: 'Takaosanguchi Station',
  travelMode: 'transit',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re at the foot of Mount Takao.' },
    { text: 'You’re still in Tokyo, but only just. The trains stop here, and the forest starts. Today you’ll go up a mountain that people have been climbing for centuries, some for the view, some to pray.' },
    { className: 'narrationClose', text: 'Follow the road up from the station. The first stop is only a few minutes away, at the bottom of the cable car.' },
  ],
}

const cableCar = {
  id: 'takaoCableCar',
  name: 'Takao Cable Car',
  photo: cableCarPhoto,
  photoAlt: 'The cable car station at the foot of Mount Takao, with its tall pointed glass front, under a clear blue sky',
  memory: 'Up the steep slope by cable car.',
  mapPlace: 'Kiyotaki Station, Mount Takao',
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'This is the bottom of the cable car, which climbs one of the steepest slopes of any in Japan. Grab a window, and watch the forest tilt past.' },
    { text: 'If you’d rather walk, the main trail starts right beside the station, and it’s paved most of the way. Either way, you’ll meet the route again at the top.' },
    { className: 'narrationClose', text: 'From the top station, follow the path on up the mountain to the temple.' },
  ],
}

const monkeyPark = {
  id: 'takaoMonkeyPark',
  name: 'Monkey Park',
  photo: monkeyParkPhoto,
  photoAlt: 'Japanese macaques resting on wooden beams and rocks in the sun at the monkey park on Mount Takao',
  memory: 'Watching the monkeys.',
  teaser: 'A troop of Japanese macaques, near the top of the cable car. A short walk back down the path.',
  mapPlace: 'Takao Monkey Park',
  travelMode: 'walking',
  ...DETOUR,
  narration: [
    { text: 'You’ve found the monkeys. A troop of Japanese macaques lives here, and they’re as curious about you as you are about them.' },
    { text: 'Watch them for a while: the grooming, the squabbles, the little ones chasing each other. Keep your snacks out of sight.' },
    BACK_TO_ROUTE,
  ],
}

const yakuoin = {
  id: 'yakuoin',
  name: 'Yakuoin',
  photo: yakuoinPhoto,
  photoAlt: 'A long flight of stone steps climbing through the trees at Yakuoin, lined with red lanterns',
  memory: 'Up the steps to the mountain temple.',
  mapPlace: 'Yakuoin, Mount Takao',
  travelMode: 'walking',
  ...BUILD,
  detours: [monkeyPark],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'Yakuoin is the temple on the mountain, and the reason pilgrims have climbed Takao for so long. Look out for the tengu, the long-nosed mountain spirits who are said to guard it.' },
    { text: 'Take the steps slowly. The halls are tucked into the slope among tall cedars, and there’s always something new around the next corner.' },
    { text: 'Back down the path, near the cable car, there’s a monkey park, if you’d like a detour. Otherwise, the summit isn’t far now.' },
  ],
}

const summit = {
  id: 'takaoSummit',
  name: 'Mount Takao Summit',
  photo: summitPhoto,
  photoAlt: 'People at the viewpoint on the summit of Mount Takao, looking out over layers of blue mountains',
  memory: 'On top of the mountain.',
  mapPlace: 'Mount Takao Summit',
  travelMode: 'walking',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'This is the top of Mount Takao. Walk to the viewpoint, and the mountains roll away in layers to the west.' },
    { text: 'On a clear day, Fuji stands out among them. If it’s hiding in the cloud, the view is worth the climb anyway.' },
    PEAK_CLOSE,
  ],
}

const gokurakuyu = {
  id: 'gokurakuyu',
  name: 'Gokurakuyu Hot Spring',
  photo: gokurakuyuPhoto,
  photoAlt: 'The wooden front of the Gokurakuyu hot spring building, beside the station at the foot of the mountain',
  memory: 'A hot soak after the climb.',
  mapPlace: 'Keio Takaosan Onsen Gokurakuyu',
  travelMode: 'walking',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. Head back down, by cable car or on foot, and you’ll find this hot spring right beside the station where you started.' },
    { text: 'There’s no better end to a day on a mountain than a long soak. Let your legs remember the climb, and let the rest of you forget it.' },
    DINNER,
  ],
}

export default {
  id: 'takao',
  aiMade: true,
  name: 'A Mountain on the Edge of Tokyo',
  location: 'MOUNT TAKAO · TOKYO, JAPAN',
  photo: yakuoinPhoto,
  photoAlt: yakuoin.photoAlt,
  blurb: 'Up a steep cable car into the forest, past a mountain temple to the summit, and down to a hot spring at the bottom.',
  tagline: TAGLINE,
  time: '~5 hours',
  walking: 'Some climbing',
  stops: '~5 stops',
  departure: station,
  discovery: cableCar,
  build: yakuoin,
  peak: summit,
  afterglow: gokurakuyu,
  startArea: 'Hachioji, Tokyo, Japan',
  startNote: START_NOTE,
  match: { moods: ['Adventurous', 'Peaceful', 'Playful'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 5, effort: 'Moderate' },
  why: [
    'Mount Takao is the easiest way out of Tokyo and into the forest: a short train ride, and suddenly you’re among cedars on a mountain path. This journey takes you up by cable car, through a temple that pilgrims have climbed to for centuries, to a view that on a good day reaches all the way to Fuji, and then down to a hot bath.',
  ],
  route: [station, cableCar, yakuoin, summit, gokurakuyu],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Mount Takao, up and back down again. Whatever you took from the day, it’s yours now.',
    summary: 'You started at Takaosanguchi, rode the cable car up the steep slope, climbed the steps of Yakuoin, stood on the summit looking out over the mountains, and finished with a soak at Gokurakuyu.',
  },
}
