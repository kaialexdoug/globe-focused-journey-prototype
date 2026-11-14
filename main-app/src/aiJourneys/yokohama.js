// Where the Harbor Lights Come On (Yokohama, Kanagawa), built the same way
// as the Waseda journey (testJourney.js). Every stop has its exact spot
// (`mapPoint`, from Wikipedia and OpenStreetMap), so it gets the live map,
// and the walk to it from the stop before: how far (`distanceMeters`), how
// long (`travelMinutes`) and how hard (`effort`), from Google's walking
// routes and the heights along them (Open-Meteo), worked out once, in
// November 2026.
//
// The narration tells one story from stop to stop: a fishing village that
// became one of Japan's first ports open to the world in 1859, the villagers
// who moved out, the foreigners and Chinese traders who moved in, the city
// rebuilt after the 1923 earthquake, and the harbor lit up at night. The
// history was checked against published sources (Wikipedia, in English and
// Japanese) in November 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import motomachiPhoto from '../assets/journey/yokohama/motomachi.jpg'
import chinatownPhoto from '../assets/journey/yokohama/chinatown.jpg'
import harborViewParkPhoto from '../assets/journey/yokohama/harbor-view-park.jpg'
import hikawaMaruPhoto from '../assets/journey/yokohama/hikawa-maru.jpg'
import osanbashiPhoto from '../assets/journey/yokohama/osanbashi.jpg'
import redBrickPhoto from '../assets/journey/yokohama/red-brick.jpg'

// The spots near the stops.
import cemeteryPhoto from '../assets/journey/yokohama/foreign-cemetery.jpg'
import kanteibyoPhoto from '../assets/journey/yokohama/kanteibyo.jpg'
import britishHousePhoto from '../assets/journey/yokohama/british-house.jpg'
import hotelNewGrandPhoto from '../assets/journey/yokohama/hotel-new-grand.jpg'
import zoNoHanaPhoto from '../assets/journey/yokohama/zo-no-hana.jpg'
import cupNoodlesPhoto from '../assets/journey/yokohama/cup-noodles-museum.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const motomachi = {
  id: 'motomachi',
  name: 'Motomachi',
  photo: motomachiPhoto,
  photoAlt: 'The arch over the entrance to Motomachi shopping street, topped with a sculpted bird, between tall buildings',
  memory: 'Where the day began.',
  mapPlace: 'Motomachi Shopping Street, Yokohama',
  mapPoint: { lat: 35.4402292, lng: 139.6479342 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Foreign General Cemetery',
      note: 'Where some 4,400 foreigners from over 40 countries are buried, up on the Bluff',
      meters: 410,
      photo: cemeteryPhoto,
      photoAlt: 'The stone gateposts and wall at the entrance to the Foreign General Cemetery, under a big tree',
      mapPlace: '横浜外国人墓地',
      mapPoint: { lat: 35.43952778, lng: 139.65236111 },
    },
  ],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Yokohama.' },
    { kind: 'heading', text: 'The town that moved' },
    { text: 'Yokohama was a small fishing village until 1859, when Japan opened its ports to the world and a port was built here. The villagers were moved out to make room, and they settled right here: Motomachi means “the original town.” Once the foreign traders came, it became their shopping street.' },
    { kind: 'heading', text: 'A grave by the sea' },
    { text: 'Up on the Bluff above the street, the foreign traders made their homes. The cemetery up there began in 1854, before the port had even opened, when a young American sailor from Commodore Perry’s fleet fell from a mast, and Perry asked for a grave where he could see the sea.' },
    { kind: 'find', text: 'Find the arch over the street, with a phoenix on top.' },
    { className: 'narrationClose', text: 'Take the train to Motomachi-Chukagai Station, then wander the street for a while. The first stop is just around the corner.' },
  ],
}

const chinatown = {
  id: 'yokohamaChinatown',
  name: 'Yokohama Chinatown',
  mapName: 'Chinatown',
  photo: chinatownPhoto,
  photoAlt: 'A narrow lane in Yokohama Chinatown hung with rows of red paper lanterns',
  memory: 'Lanterns and steamed buns in Chinatown.',
  mapPlace: 'Yokohama Chinatown',
  mapPoint: { lat: 35.442815, lng: 139.645929 },
  travelMode: 'walking',
  distanceMeters: 452,
  travelMinutes: 6,
  effort: { level: 'easy', note: 'Flat, just across the canal' },
  stayMinutes: [45, 60],
  nearby: [
    {
      name: 'Kanteibyo',
      note: 'A temple to Guan Yu, a hero of old China, bright with red and gold',
      meters: 80,
      photo: kanteibyoPhoto,
      photoAlt: 'The red and gold gate of Kanteibyo, crowned with dragons, at the top of a flight of stone steps',
      mapPlace: '横浜関帝廟',
      mapPoint: { lat: 35.442453, lng: 139.6452218 },
    },
  ],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The biggest in Japan' },
    { text: 'When the port opened in 1859, Chinese traders came too, and settled right here. Today this is Japan’s biggest Chinatown, with around 250 shops and restaurants: bright gates, red lanterns, and food stalls on every corner.' },
    { kind: 'heading', text: 'Eat as you go' },
    { text: 'Steamed buns are the classic, but follow your nose. The side lanes are often calmer than the main street, and just as good.' },
    { kind: 'find', text: 'Find Kanteibyo, the temple glowing red and gold among the shops, and look up at the dragons on its roof.' },
    { className: 'narrationClose', text: 'When you’ve had your fill, we’ll climb the hill for a view of the water.' },
  ],
}

const hikawaMaru = {
  id: 'hikawaMaru',
  name: 'Yamashita Park & the Hikawa Maru',
  mapName: 'Hikawa Maru',
  photo: hikawaMaruPhoto,
  photoAlt: 'The bow of the Hikawa Maru, an old black-hulled ocean liner, moored beside the promenade in Yamashita Park',
  memory: 'An old liner, moored for good.',
  teaser: 'An old ocean liner that once crossed the Pacific, now moored for good beside the waterfront park. Just down the hill.',
  mapPlace: 'Hikawa Maru, Yokohama',
  mapPoint: { lat: 35.44666667, lng: 139.65138889 },
  travelMode: 'walking',
  // From Harbor View Park, then on to the pier along the waterfront.
  distanceMeters: 998,
  travelMinutes: 14,
  extraMeters: 158,
  effort: { level: 'easy', note: 'Downhill from the Bluff to the waterfront' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Hotel New Grand',
      note: 'A grand hotel opened in 1927, where General MacArthur spent his first night in Japan',
      meters: 270,
      photo: hotelNewGrandPhoto,
      photoAlt: 'The curved white front of the Hotel New Grand on a street corner, with its tower behind',
      mapPlace: 'Hotel New Grand, Yokohama',
      mapPoint: { lat: 35.444773, lng: 139.649593 },
    },
  ],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'A park from the rubble' },
    { text: 'Much of Yokohama was destroyed in the great earthquake of 1923. The rubble of the city center was used to build out the waterfront, and Yamashita Park opened on top of it in 1930.' },
    { kind: 'heading', text: 'The liner that came home' },
    { text: 'That same year, the Hikawa Maru made her first voyage to Seattle, and Charlie Chaplin sailed on her in 1932. In the war she became a hospital ship. Both her sister ships were lost, but she came through, and now she’s moored here for good.' },
    { kind: 'find', text: 'Walk along the water to her bow, and find her name painted on it.' },
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
  mapPoint: { lat: 35.43988889, lng: 139.655 },
  travelMode: 'walking',
  distanceMeters: 1165,
  travelMinutes: 17,
  effort: { level: 'moderate', note: 'Uphill at the end, onto the Bluff' },
  stayMinutes: [15, 30],
  nearby: [
    {
      name: 'British House Yokohama',
      note: 'Built in 1937 as the home of Britain’s consul general, with a rose garden',
      meters: 80,
      photo: britishHousePhoto,
      photoAlt: 'British House, a white two-storey house with a red tiled roof, behind a garden of purple flowers',
      mapPlace: '横浜市イギリス館',
      mapPoint: { lat: 35.43940278, lng: 139.65441667 },
    },
  ],
  ...BUILD,
  detours: [hikawaMaru],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'Soldiers on the hill' },
    { text: 'When the port opened, British and French troops were stationed up here on the Bluff. Long after they’d gone, it became a park, opened in 1962, and named after a popular song from just after the war: the hill where you can see the harbor.' },
    { kind: 'heading', text: 'The harbor below' },
    { text: 'The white house among the roses is British House, built in 1937 as the home of Britain’s consul. From the lookout, the whole harbor opens out below you, with the Bay Bridge stretching across the water.' },
    { kind: 'find', text: 'Find a spot at the railing and pick out the Bay Bridge. Then watch for a ship moving across the harbor below.' },
    { className: 'narrationClose', text: 'Down by the water, an old ocean liner makes a good detour. Otherwise, head for the pier. It’s best as the light starts to fade.' },
  ],
}

const osanbashi = {
  id: 'osanbashi',
  name: 'Osanbashi Pier',
  photo: osanbashiPhoto,
  photoAlt: 'The rolling wooden deck on the roof of Osanbashi Pier, rising and falling like waves under a cloudy sky',
  memory: 'On the pier as the lights came on.',
  mapPlace: 'Osanbashi Pier',
  mapPoint: { lat: 35.45166667, lng: 139.64777778 },
  travelMode: 'walking',
  distanceMeters: 2006,
  travelMinutes: 29,
  effort: { level: 'easy', note: 'Down off the Bluff, then flat along the waterfront' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Zō-no-hana Park',
      note: 'Where the port began in 1859, by the old breakwater curved like an elephant’s trunk',
      meters: 480,
      photo: zoNoHanaPhoto,
      photoAlt: 'The curved stone breakwater of Zō-no-hana reaching out into the calm harbor, with the pier terminal beyond',
      mapPlace: '象の鼻パーク',
      mapPoint: { lat: 35.44961111, lng: 139.64316667 },
    },
  ],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The great pier' },
    { text: 'Ships have tied up here since 1894, when the first steel pier was built. The terminal under your feet was finished in 2002, chosen from more than 660 designs, and its whole roof is a great wooden deck that rolls up and down like waves. Anyone can walk up here.' },
    { kind: 'heading', text: 'The lights come on' },
    { text: 'Go out to the far end and turn around. Across the water, the towers of Minato Mirai and the big Ferris wheel light up as the evening comes in.' },
    { kind: 'find', text: 'Look along the waterfront for the Hikawa Maru, and the green Bluff behind it, where you stood earlier.' },
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
  mapPoint: { lat: 35.4524046, lng: 139.6429182 },
  travelMode: 'walking',
  distanceMeters: 1384,
  travelMinutes: 18,
  effort: { level: 'easy', note: 'Flat, around the water' },
  stayMinutes: [45, 60],
  nearby: [
    {
      name: 'Cup Noodles Museum',
      note: 'A museum of instant noodles and the man who invented them, where you can design your own cup',
      meters: 500,
      photo: cupNoodlesPhoto,
      photoAlt: 'The Cup Noodles Museum, a tall red-brown building with a band of glass along the top',
      mapPlace: 'カップヌードルミュージアム 横浜',
      mapPoint: { lat: 35.45547222, lng: 139.63886111 },
    },
  ],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The customs warehouses' },
    { text: 'That’s the last stop. These two long brick warehouses were built for the port’s customs, in 1911 and 1913, and they held goods until 1989. In 2002 they opened again, full of shops and places to eat, and they glow at night.' },
    { kind: 'heading', text: 'From every angle' },
    { text: 'Wander through, or just sit outside and watch the harbor lights. You’ve seen them from the hill and from the pier, and now from the water’s edge.' },
    { kind: 'find', text: 'Stand between the two warehouses and look up at the old brick. Then turn around and find the lights across the water.' },
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
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Scenic', 'Culinary', 'Historical'],
  departure: motomachi,
  discovery: chinatown,
  build: harborViewPark,
  peak: osanbashi,
  afterglow: redBrick,
  startArea: 'Yokohama, Kanagawa, Japan',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Spring or fall',
    seasonNote: 'For the roses at Harbor View Park, from mid-May to mid-June and mid-October to mid-November, and mild evenings on the waterfront.',
    timeOfDay: 'In the afternoon and evening',
    timeNote: 'Time it to reach the pier as the harbor lights come on.',
  },
  match: {
    moods: { Peaceful: 35, Adventurous: 40, Romantic: 90, Curious: 70, Playful: 80, Cultural: 55 },
    with: { Solo: 65, Couple: 95, Family: 75, 'Friends / Group': 90 },
    preferences: {
      'Pet friendly': 45, 'Avoid alcohol': 60, 'More nature': 25, 'Food stops': 90,
      Coastal: 85, 'More urban': 90, 'Hiking involved': 10, 'Budget friendly': 65,
    },
  },
  description: [
    'In 1859, a small fishing village became one of the first ports where Japan opened its doors to the world. Traders came from the West and from China, the villagers moved out to make room, and the city that grew up has been looking out to sea ever since.',
    'This journey walks from the old shopping street and Chinatown up onto the Bluff for the view, down to the waterfront the city built from its own rubble, and out onto the pier as the harbor lights come on.',
  ],
  route: [motomachi, chinatown, harborViewPark, osanbashi, redBrick],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Yokohama, from the old streets to the harbor at night. Whatever you took from the day, it’s yours now.',
    summary: 'You started in Motomachi, ate your way through Chinatown, looked out over the bay from Harbor View Park, watched the lights come on from Osanbashi Pier, and finished at the Red Brick Warehouses.',
  },
}
