// Where the Harbor Lights Come On (Yokohama, Kanagawa)

import motomachiPhoto from '../assets/journey/yokohama/motomachi.jpg'
import chinatownPhoto from '../assets/journey/yokohama/chinatown.jpg'
import harborViewParkPhoto from '../assets/journey/yokohama/harbor-view-park.jpg'
import hikawaMaruPhoto from '../assets/journey/yokohama/hikawa-maru.jpg'
import osanbashiPhoto from '../assets/journey/yokohama/osanbashi.jpg'
import redBrickPhoto from '../assets/journey/yokohama/red-brick.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const motomachi = {
  id: 'motomachi',
  name: 'Motomachi',
  photo: motomachiPhoto,
  photoAlt: 'The arch over the entrance to Motomachi shopping street, topped with a sculpted bird, between tall buildings',
  memory: 'Where the day began.',
  mapPlace: 'Motomachi Shopping Street, Yokohama',
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [20, 30],
  nearby: [
    { name: 'Foreign General Cemetery', note: 'Where many of Yokohama’s early foreign residents are buried, up on the Bluff', meters: 400 },
  ],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Yokohama.' },
    { text: 'When Japan first opened its ports to the world, Yokohama was one of them, and the city has been looking out to sea ever since. Motomachi is an old shopping street at the foot of the Bluff, the hill where foreign traders once made their homes.' },
    { className: 'narrationClose', text: 'Take the train to Motomachi-Chukagai Station, then wander the street for a while. The first stop is just around the corner.' },
  ],
}

const chinatown = {
  id: 'yokohamaChinatown',
  name: 'Yokohama Chinatown',
  photo: chinatownPhoto,
  photoAlt: 'A narrow lane in Yokohama Chinatown hung with rows of red paper lanterns',
  memory: 'Lanterns and steamed buns in Chinatown.',
  mapPlace: 'Yokohama Chinatown',
  travelMode: 'walking',
  travelMinutes: 5,
  stayMinutes: [45, 60],
  nearby: [
    { name: 'Kanteibyo', note: 'A temple in the middle of Chinatown, bright with red and gold', meters: 200 },
  ],
  ...DISCOVERY,
  narration: [
    { text: 'This is Japan’s biggest Chinatown: bright gates, red lanterns, and food stalls on every corner.' },
    { text: 'Eat as you go. Steamed buns are the classic, but follow your nose. The side lanes are often calmer than the main street, and just as good.' },
    { className: 'narrationClose', text: 'When you’ve had your fill, we’ll climb the hill for a view of the water.' },
  ],
}

const hikawaMaru = {
  id: 'hikawaMaru',
  name: 'Yamashita Park & the Hikawa Maru',
  photo: hikawaMaruPhoto,
  photoAlt: 'The bow of the Hikawa Maru, an old black-hulled ocean liner, moored beside the promenade in Yamashita Park',
  memory: 'An old liner, moored for good.',
  teaser: 'An old ocean liner that once crossed the Pacific, now moored for good beside the waterfront park. Just down the hill.',
  mapPlace: 'Hikawa Maru, Yokohama',
  travelMode: 'walking',
  travelMinutes: 10,
  stayMinutes: [30, 45],
  nearby: [
    { name: 'Hotel New Grand', note: 'A grand hotel from the 1920s, said to be where Napolitan spaghetti was invented', meters: 150 },
  ],
  ...DETOUR,
  narration: [
    { text: 'Yamashita Park runs along the waterfront, and at the end of it is the Hikawa Maru, an ocean liner that once sailed across the Pacific and now stays here as a museum ship.' },
    { text: 'Walk along the water to see it up close. It’s easy to imagine the harbor full of ships like this one.' },
    BACK_TO_ROUTE,
  ],
}

const harborViewPark = {
  id: 'harborViewPark',
  name: 'Harbor View Park',
  photo: harborViewParkPhoto,
  photoAlt: 'A curving stone path through a garden of yellow and pink roses at Harbor View Park',
  memory: 'Looking out over the harbor from the Bluff.',
  mapPlace: 'Harbor View Park, Yokohama',
  travelMode: 'walking',
  travelMinutes: 15,
  stayMinutes: [15, 30],
  nearby: [
    { name: 'British House Yokohama', note: 'An old British consul’s house, with a rose garden', meters: 100 },
  ],
  ...BUILD,
  detours: [hikawaMaru],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'Harbor View Park sits up on the Bluff, and it lives up to its name. From the lookout, the whole harbor opens out below you, with the Bay Bridge stretching across the water.' },
    { text: 'Take a slow walk through the gardens, then find a spot at the railing and watch the ships for a while.' },
    { text: 'Down by the water, an old ocean liner makes a good detour. Otherwise, head for the pier. It’s best as the light starts to fade.' },
  ],
}

const osanbashi = {
  id: 'osanbashi',
  name: 'Osanbashi Pier',
  photo: osanbashiPhoto,
  photoAlt: 'The rolling wooden deck on the roof of Osanbashi Pier, rising and falling like waves under a cloudy sky',
  memory: 'On the pier as the lights came on.',
  mapPlace: 'Osanbashi Pier',
  travelMode: 'walking',
  travelMinutes: 20,
  stayMinutes: [30, 45],
  nearby: [
    { name: 'Zō-no-hana Park', note: 'By the old breakwater, curved like an elephant’s trunk, where the port began', meters: 300 },
  ],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'Osanbashi Pier reaches right out into the harbor, and its whole roof is a great wooden deck that rolls up and down like waves. Anyone can walk up here.' },
    { text: 'Go out to the far end and turn around. Across the water, the towers of Minato Mirai and the big Ferris wheel light up as the evening comes in.' },
    PEAK_CLOSE,
  ],
}

const redBrick = {
  id: 'redBrickWarehouse',
  name: 'Red Brick Warehouse',
  photo: redBrickPhoto,
  photoAlt: 'One of the Red Brick Warehouses lit up at night, with people walking past the entrance',
  memory: 'The evening at the old warehouses.',
  mapPlace: 'Yokohama Red Brick Warehouse',
  travelMode: 'walking',
  travelMinutes: 10,
  stayMinutes: [45, 60],
  nearby: [
    { name: 'Cup Noodles Museum', note: 'All about instant noodles, where you can design your own cup', meters: 600 },
  ],
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. These two long brick warehouses were built for the port in its early days. Now they’re full of shops and places to eat, and they glow at night.' },
    { text: 'Wander through, or just sit outside and watch the harbor lights. You’ve seen them from every angle now.' },
    DINNER,
  ],
}

export default {
  id: 'yokohama',
  aiMade: true,
  name: 'Where the Harbor Lights Come On',
  location: 'YOKOHAMA · KANAGAWA, JAPAN',
  city: 'Yokohama',
  photo: chinatownPhoto,
  photoAlt: chinatown.photoAlt,
  blurb: 'Through Chinatown and out onto the pier, as the city lights up over the water.',
  tagline: TAGLINE,
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experience: 'Scenic',
  departure: motomachi,
  discovery: chinatown,
  build: harborViewPark,
  peak: osanbashi,
  afterglow: redBrick,
  startArea: 'Yokohama, Kanagawa, Japan',
  startNote: START_NOTE,
  match: {
    moods: { Peaceful: 35, Adventurous: 40, Romantic: 90, Curious: 70, Playful: 80, Cultural: 55 },
    with: { Solo: 65, Couple: 95, Family: 75, 'Friends / Group': 90 },
    preferences: {
      'Pet friendly': 45, 'Avoid alcohol': 60, 'More nature': 25, 'Food stops': 90,
      Coastal: 85, 'More urban': 90, 'Hiking involved': 10, 'Budget friendly': 65,
    },
  },
  description: [
    'Yokohama grew up around its harbor, and this journey keeps the water in view nearly the whole way. It starts with food and noise in Chinatown, climbs to a quiet view over the bay, and saves the best part for the end of the day, when the lights come on across the harbor.',
  ],
  route: [motomachi, chinatown, harborViewPark, osanbashi, redBrick],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Yokohama, from the old streets to the harbor at night. Whatever you took from the day, it’s yours now.',
    summary: 'You started in Motomachi, ate your way through Chinatown, looked out over the bay from Harbor View Park, watched the lights come on from Osanbashi Pier, and finished at the Red Brick Warehouses.',
  },
}
