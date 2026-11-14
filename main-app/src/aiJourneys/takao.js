// A Mountain on the Edge of Tokyo (Mount Takao, Tokyo), built the same way
// as the Waseda journey (testJourney.js). Every stop has its exact spot
// (`mapPoint`, from Wikipedia and OpenStreetMap), so it gets the live map,
// and the walk to it from the stop before: how far (`distanceMeters`), how
// long (`travelMinutes`) and how hard (`effort`), from Google's walking
// routes and the heights along them (Open-Meteo), worked out once, in
// November 2026. The cable car ride (1.0 km) is part of the time at its
// stop, so the walk to the temple is from the top station.
//
// The narration tells one story from stop to stop: a holy mountain on the
// edge of the city, climbed by pilgrims for nearly 1,300 years and by
// millions of walkers today, from the steepest railway in Japan to the
// temple of the tengu and the view of Fuji from the top. The history was
// checked against published sources (Wikipedia, in English and Japanese) in
// November 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import stationPhoto from '../assets/journey/takao/station.jpg'
import cableCarPhoto from '../assets/journey/takao/cable-car.jpg'
import yakuoinPhoto from '../assets/journey/takao/yakuoin.jpg'
import monkeyParkPhoto from '../assets/journey/takao/monkey-park.jpg'
import summitPhoto from '../assets/journey/takao/summit.jpg'
import gokurakuyuPhoto from '../assets/journey/takao/gokurakuyu.jpg'

// The spots near the stops.
import museumPhoto from '../assets/journey/takao/takao-599-museum.jpg'
import momijidaiPhoto from '../assets/journey/takao/momijidai.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const station = {
  id: 'takaosanguchi',
  name: 'Takaosanguchi Station',
  photo: stationPhoto,
  photoAlt: 'A red torii by the road near Takaosanguchi Station, with shops and wooded hills behind',
  memory: 'Where the day began.',
  mapPlace: 'Takaosanguchi Station',
  mapPoint: { lat: 35.632224, lng: 139.269882 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  nearby: [
    {
      name: 'TAKAO 599 Museum',
      note: 'A museum of the mountain’s plants and animals, named for its height',
      meters: 230,
      photo: museumPhoto,
      photoAlt: 'The long, low TAKAO 599 Museum behind a wide lawn, with autumn hills behind',
      mapPlace: 'TAKAO 599 MUSEUM',
      mapPoint: { lat: 35.63041667, lng: 139.26875278 },
    },
  ],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re at the foot of Mount Takao.' },
    { kind: 'heading', text: 'Still Tokyo' },
    { text: 'You’re still in Tokyo, but only just. The trains stop here, and the forest starts. Mount Takao is 599 meters high, less than an hour from the middle of the city, and more than two and a half million people climb it every year.' },
    { kind: 'heading', text: 'A holy mountain' },
    { text: 'People have been coming up this mountain for nearly 1,300 years, some for the view and some to pray. Its temple was founded in 744, and for centuries, mountain ascetics trained here, among the spirits called tengu.' },
    { kind: 'find', text: 'Find the red torii by the road near the station, at the start of the way up.' },
    { className: 'narrationClose', text: 'Follow the road up from the station. The first stop is only a few minutes away, at the bottom of the cable car.' },
  ],
}

const cableCar = {
  id: 'takaoCableCar',
  name: 'Takao Cable Car',
  mapName: 'Cable car',
  photo: cableCarPhoto,
  photoAlt: 'The cable car station at the foot of Mount Takao, with its tall pointed glass front, under a clear blue sky',
  memory: 'Up the steep slope by cable car.',
  // Kiyotaki Station, at the bottom.
  mapPlace: 'Kiyotaki Station, Mount Takao',
  mapPoint: { lat: 35.6311026, lng: 139.2668989 },
  travelMode: 'walking',
  distanceMeters: 320,
  travelMinutes: 5,
  effort: { level: 'easy', note: 'A short way up the road from the station' },
  stayMinutes: [15, 20],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The steepest in Japan' },
    { text: 'This is the bottom of the cable car, the steepest railway line in Japan: at its steepest, the track climbs at 31 degrees. It’s a kilometer to the top. Grab a window, and watch the forest tilt past.' },
    { kind: 'heading', text: 'Or on foot' },
    { text: 'If you’d rather walk, Trail 1 starts right beside the station, and it’s paved most of the way. Either way, you’ll meet the route again at the top.' },
    { kind: 'find', text: 'At the top, on the path to the temple, find the octopus cedar, an old tree whose roots spread out like an octopus’s legs.' },
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
  mapPoint: { lat: 35.6298255, lng: 139.2549341 },
  travelMode: 'walking',
  // From Yakuoin, and back again on the way to the summit.
  distanceMeters: 932,
  travelMinutes: 13,
  extraMeters: 1864,
  effort: { level: 'easy', note: 'Back down the paved path' },
  stayMinutes: [20, 30],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'The troop' },
    { text: 'You’ve found the monkeys. A troop of Japanese macaques lives here, and they’re as curious about you as you are about them. Beside them is a garden of the mountain’s wild plants.' },
    { kind: 'heading', text: 'Watch for a while' },
    { text: 'Take your time: the grooming, the squabbles, the little ones chasing each other. Keep your snacks out of sight.' },
    { kind: 'find', text: 'Find the youngest monkey in the troop, and watch who keeps an eye on it.' },
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
  mapPoint: { lat: 35.6259997, lng: 139.2504407 },
  travelMode: 'walking',
  // From the top of the cable car.
  distanceMeters: 1089,
  travelMinutes: 17,
  effort: { level: 'moderate', note: 'Up the paved path through the cedars, then the temple’s stone steps' },
  stayMinutes: [30, 45],
  ...BUILD,
  detours: [monkeyPark],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'Founded in 744' },
    { text: 'Yakuoin is the temple on the mountain, and the reason pilgrims have climbed Takao for so long. It’s said to have been founded in 744 by the monk Gyōki, on the orders of the Emperor Shōmu, to protect the eastern lands.' },
    { kind: 'heading', text: 'The tengu' },
    { text: 'In the 1370s, a monk from Kyoto brought the worship of a mountain god, Izuna Gongen, and Takao became a training ground for ascetics. Look out for the tengu, the long-nosed mountain spirits said to guard it. People still pray to them for good fortune.' },
    { kind: 'find', text: 'Find the statues of the two tengu: one with a long nose, and one with a beak like a crow’s.' },
    { className: 'narrationClose', text: 'Back down the path, near the cable car, there’s a monkey park, if you’d like a detour. Otherwise, the summit isn’t far now.' },
  ],
}

const summit = {
  id: 'takaoSummit',
  name: 'Mount Takao Summit',
  mapName: 'Summit',
  photo: summitPhoto,
  photoAlt: 'People at the viewpoint on the summit of Mount Takao, looking out over layers of blue mountains',
  memory: 'On top of the mountain.',
  mapPlace: 'Mount Takao Summit',
  mapPoint: { lat: 35.6252267, lng: 139.2436878 },
  travelMode: 'walking',
  distanceMeters: 733,
  travelMinutes: 14,
  effort: { level: 'moderate', note: 'Steeper now, the last climb to the top' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Momijidai',
      note: 'A ridge just past the summit, with teahouses, maples that blaze in autumn, and a view toward Fuji on clear days',
      meters: 320,
      photo: momijidaiPhoto,
      photoAlt: 'Golden autumn leaves lit by the sun among tall trees at Momijidai',
      mapPlace: 'もみじ台, 高尾山',
      mapPoint: { lat: 35.6248152, lng: 139.2401634 },
    },
  ],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: '599 meters up' },
    { text: 'This is the top of Mount Takao. Walk to the viewpoint, and the mountains roll away in layers to the west. On a clear day, Fuji stands out among them. If it’s hiding in the cloud, the view is worth the climb anyway.' },
    { kind: 'heading', text: 'The start of a long walk' },
    { text: 'The summit is also where the Tōkai Nature Trail begins. From here, it runs for 1,697 kilometers, over mountains and through villages, all the way to Osaka.' },
    { kind: 'find', text: 'Find Fuji among the mountains to the west, if the clouds will let you.' },
    PEAK_CLOSE,
  ],
}

const gokurakuyu = {
  id: 'gokurakuyu',
  name: 'Gokurakuyu Hot Spring',
  mapName: 'Gokurakuyu',
  photo: gokurakuyuPhoto,
  photoAlt: 'The wooden front of the Gokurakuyu hot spring building, beside the station at the foot of the mountain',
  memory: 'A hot soak after the climb.',
  mapPlace: 'Keio Takaosan Onsen Gokurakuyu',
  mapPoint: { lat: 35.63208333, lng: 139.26925 },
  travelMode: 'walking',
  // All the way down on foot. Taking the cable car down instead saves about
  // a kilometer of steep downhill.
  distanceMeters: 3959,
  travelMinutes: 63,
  effort: { level: 'moderate', note: 'Back down the mountain on foot, or by cable car for part of the way' },
  stayMinutes: [60, 90],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Back down' },
    { text: 'That’s the last stop. Head back down the mountain, on foot all the way or by cable car for part of it, and you’ll find this hot spring right beside the station where you started. It opened in 2015.' },
    { kind: 'heading', text: 'A long soak' },
    { text: 'There’s no better end to a day on a mountain than a long soak. Let your legs remember the climb, and let the rest of you forget it.' },
    { kind: 'find', text: 'Find the outdoor bath, and look up for the mountain you just climbed.' },
    DINNER,
  ],
}

export default {
  id: 'takao',
  aiMade: true,
  name: 'A Mountain on the Edge of Tokyo',
  location: 'MOUNT TAKAO · TOKYO, JAPAN',
  city: 'Hachioji',
  photo: yakuoinPhoto,
  photoAlt: yakuoin.photoAlt,
  blurb: 'Up a steep cable car into the forest, past a mountain temple to the summit.',
  walking: 'Some climbing',
  stops: '~5 stops',
  difficulty: 'Moderate',
  experiences: ['Nature', 'Adventure', 'Scenic', 'Cultural'],
  departure: station,
  discovery: cableCar,
  build: yakuoin,
  peak: summit,
  afterglow: gokurakuyu,
  startArea: 'Hachioji, Tokyo, Japan',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Mid–late fall',
    seasonNote: 'For the autumn leaves in mid to late November, and cool air for the climb.',
    timeOfDay: 'On a weekday morning',
    timeNote: 'Autumn weekends are very busy, and an early start leaves time for a soak at the end.',
  },
  match: {
    moods: { Peaceful: 65, Adventurous: 85, Romantic: 40, Curious: 60, Playful: 70, Cultural: 50 },
    with: { Solo: 80, Couple: 70, Family: 85, 'Friends / Group': 90 },
    preferences: {
      'Pet friendly': 35, 'Avoid alcohol': 90, 'More nature': 95, 'Food stops': 50,
      Coastal: 5, 'More urban': 5, 'Hiking involved': 90, 'Budget friendly': 60,
    },
  },
  description: [
    'Mount Takao sits right on the edge of Tokyo, less than an hour from the middle of the city, and people have been climbing it for nearly 1,300 years: pilgrims to its temple, ascetics training among the tengu, and today more than two and a half million walkers a year.',
    'This journey rides Japan’s steepest railway up the mountain, climbs through the cedars to the temple of the tengu and on to the summit for a view toward Fuji, then comes back down for a long soak in a hot spring.',
  ],
  route: [station, cableCar, yakuoin, summit, gokurakuyu],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Mount Takao, up and back down again. Whatever you took from the day, it’s yours now.',
    summary: 'You started at Takaosanguchi, rode the cable car up the steep slope, climbed the steps of Yakuoin, stood on the summit looking out over the mountains, and finished with a soak at Gokurakuyu.',
  },
}
