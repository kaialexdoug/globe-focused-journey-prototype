// The Shrines in the Cedars (Nikko, Tochigi), built the same way as the
// Waseda journey (testJourney.js). Every stop has its exact spot
// (`mapPoint`, from Wikipedia and OpenStreetMap), so it gets the live map,
// and the walk to it from the stop before: how far (`distanceMeters`), how
// long (`travelMinutes`) and how hard (`effort`), from Google's walking
// routes and the heights along them (Open-Meteo), worked out once, in
// November 2026.
//
// The narration tells one story from stop to stop: the monk who first made
// these mountains holy in the 760s, and the Tokugawa shoguns who were laid
// to rest among them nine centuries later, from the sacred bridge to the
// golden gate of Toshogu, ending by a gorge carved from the sacred
// mountain's lava. The history was checked against published sources
// (Wikipedia, in English and Japanese) in November 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import stationPhoto from '../assets/journey/nikko/station.jpg'
import shinkyoPhoto from '../assets/journey/nikko/shinkyo.jpg'
import rinnojiPhoto from '../assets/journey/nikko/rinnoji.jpg'
import taiyuinPhoto from '../assets/journey/nikko/taiyuin.jpg'
import toshoguPhoto from '../assets/journey/nikko/toshogu.jpg'
import kanmangafuchiPhoto from '../assets/journey/nikko/kanmangafuchi.jpg'

// The spots near the stops.
import jrStationPhoto from '../assets/journey/nikko/jr-nikko-station.jpg'
import kanayaPhoto from '../assets/journey/nikko/kanaya-hotel.jpg'
import futarasanPhoto from '../assets/journey/nikko/futarasan.jpg'
import shoyoenPhoto from '../assets/journey/nikko/shoyoen.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const station = {
  id: 'tobuNikko',
  name: 'Tobu-Nikko Station',
  photo: stationPhoto,
  photoAlt: 'Tobu-Nikko Station, a station building with a steep roof, under a sky of white clouds',
  memory: 'Where the day began.',
  mapPlace: 'Tobu-Nikko Station',
  mapPoint: { lat: 36.748056, lng: 139.62008 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  nearby: [
    {
      name: 'JR Nikko Station',
      note: 'A pale wooden station building from the early 1900s, on a line that opened in 1890',
      meters: 210,
      photo: jrStationPhoto,
      photoAlt: 'JR Nikko Station, a pale pink and white wooden building, with snowy mountains behind',
      mapPlace: 'JR Nikko Station',
      mapPoint: { lat: 36.7471805, lng: 139.622122 },
    },
  ],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Nikko.' },
    { kind: 'heading', text: 'A holy mountain town' },
    { text: 'Nikko has been a sacred place since the 760s, when a monk named Shōdō Shōnin came into these mountains to train, and founded the first temple and shrine here.' },
    { kind: 'heading', text: 'The shogun’s shrine' },
    { text: 'Nine centuries later, when Tokugawa Ieyasu, the first Tokugawa shogun, died, his great shrine was built here, deep in the cedar forest. His grandson Iemitsu made it grander still.' },
    { kind: 'find', text: 'Find JR Nikko Station next door, a pale wooden station building from the early 1900s.' },
    { className: 'narrationClose', text: 'Walk up the main street, or take the bus. The first stop is where the town ends and the shrines begin.' },
  ],
}

const shinkyo = {
  id: 'shinkyo',
  name: 'Shinkyo Bridge',
  photo: shinkyoPhoto,
  photoAlt: 'The red Shinkyo Bridge arching over the clear Daiya River, among trees in autumn colour',
  memory: 'The red bridge over the river.',
  mapPlace: 'Shinkyo Bridge',
  mapPoint: { lat: 36.75336111, lng: 139.604 },
  travelMode: 'walking',
  distanceMeters: 1671,
  travelMinutes: 26,
  effort: { level: 'easy', note: 'A steady, gentle climb up the main street' },
  stayMinutes: [10, 20],
  nearby: [
    {
      name: 'Nikko Kanaya Hotel',
      note: 'Japan’s oldest Western-style resort hotel, opened in 1873 at the suggestion of the American missionary James Hepburn',
      meters: 140,
      photo: kanayaPhoto,
      photoAlt: 'The long white main building of the Nikko Kanaya Hotel, with snow along the drive',
      mapPlace: 'Nikko Kanaya Hotel',
      mapPoint: { lat: 36.7520827, lng: 139.6040332 },
    },
  ],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The sacred bridge' },
    { text: 'This is the Shinkyo, the sacred bridge, and its red arch over the Daiya River marks the way into the shrines and temples. Legend says that when Shōdō Shōnin couldn’t get across the river, a god threw two snakes over it, and they became a bridge.' },
    { kind: 'heading', text: 'Only for the shogun' },
    { text: 'For centuries, only the shogun, the emperor’s envoys and mountain ascetics were allowed to walk over it. Today anyone can, for a small fee, though you have to turn around and come back the way you came.' },
    { kind: 'find', text: 'Stand on the road bridge beside it and look down at the water, clear and fast, straight out of the mountains.' },
    { className: 'narrationClose', text: 'Across the road, the path climbs into the trees. The temples are just above.' },
  ],
}

const taiyuin = {
  id: 'taiyuin',
  name: 'Taiyuin',
  photo: taiyuinPhoto,
  photoAlt: 'An ornate gold and black gate at the top of stone steps at Taiyuin, among tall cedars',
  memory: 'The quieter mausoleum.',
  teaser: 'The mausoleum of the shogun’s grandson, quieter than Toshogu and almost as beautiful. A short walk through the trees.',
  mapPlace: 'Taiyuin, Nikko',
  mapPoint: { lat: 36.758001, lng: 139.5959149 },
  travelMode: 'walking',
  // From Rinnoji, then on to Toshogu from here.
  distanceMeters: 708,
  travelMinutes: 11,
  extraMeters: 741,
  effort: { level: 'easy', note: 'Uphill through the cedars' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Futarasan Shrine',
      note: 'The shrine to Nikko’s three sacred mountains, founded in 767 by Shōdō Shōnin',
      meters: 60,
      photo: futarasanPhoto,
      photoAlt: 'A row of stone lanterns in front of the red main hall of Futarasan Shrine, among tall cedars',
      mapPlace: '日光二荒山神社',
      mapPoint: { lat: 36.75833333, lng: 139.59638889 },
    },
  ],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'The grandson’s resting place' },
    { text: 'Taiyuin is the resting place of Iemitsu, grandson of the first shogun, and the one who made Toshogu so grand. It’s said he had his own built a little more modestly, out of respect for his grandfather.' },
    { kind: 'heading', text: 'Modest is relative' },
    { text: 'Climb up through its gates, one above the other up the slope, and enjoy them with fewer people around.' },
    { kind: 'find', text: 'Count the gates as you climb up through them to the hall at the top.' },
    BACK_TO_ROUTE,
  ],
}

const rinnoji = {
  id: 'rinnoji',
  name: 'Rinnoji',
  photo: rinnojiPhoto,
  photoAlt: 'The great red hall of Rinnoji, with its green-tiled roofs, against a blue sky',
  memory: 'Under the great hall at Rinnoji.',
  mapPlace: 'Rinnoji Temple, Nikko',
  mapPoint: { lat: 36.75438889, lng: 139.60113889 },
  travelMode: 'walking',
  distanceMeters: 351,
  travelMinutes: 7,
  effort: { level: 'easy', note: 'Up the path into the trees' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Shoyoen',
      note: 'Rinnoji’s small garden, with a path around its pond',
      meters: 30,
      photo: shoyoenPhoto,
      photoAlt: 'Clipped shrubs and a little waterfall around the pond in the Shoyoen garden, among tall trees',
      mapPlace: '逍遥園, 日光',
      mapPoint: { lat: 36.7542224, lng: 139.6008391 },
    },
  ],
  ...BUILD,
  detours: [taiyuin],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'The first temple' },
    { text: 'Rinnoji was founded in 766 by Shōdō Shōnin himself, and it’s Nikko’s great temple. Its main hall, the Hall of the Three Buddhas, is huge and red.' },
    { kind: 'heading', text: 'Three golden giants' },
    { text: 'Inside sit three enormous gilded statues: Amida, a Kannon with a thousand arms, and a Kannon with a horse’s head. They’re said to be the Buddhist forms of the gods of Nikko’s three sacred mountains. Step inside and take a moment in front of them. They’re much bigger than you expect.' },
    { kind: 'find', text: 'Find the Kannon with a horse’s head on top of his own.' },
    { className: 'narrationClose', text: 'Further into the forest, there’s a quieter mausoleum, if you’d like a detour. Otherwise, Toshogu is waiting.' },
  ],
}

const toshogu = {
  id: 'toshogu',
  name: 'Toshogu',
  photo: toshoguPhoto,
  photoAlt: 'The Yomeimon Gate at Toshogu, covered in white, gold and coloured carvings, at the top of stone steps',
  memory: 'In front of the Yomeimon Gate.',
  mapPlace: 'Nikko Toshogu',
  mapPoint: { lat: 36.758064, lng: 139.598958 },
  travelMode: 'walking',
  distanceMeters: 607,
  travelMinutes: 10,
  effort: { level: 'easy', note: 'Up the wide avenue through the cedars' },
  stayMinutes: [60, 90],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'Built for a shogun' },
    { text: 'Toshogu is the shrine of Tokugawa Ieyasu, who founded the shogunate that ruled Japan for more than 250 years, and he’s buried here. It was first built in 1617, and his grandson Iemitsu made it grander still. Nothing about it is plain: every surface is carved, painted or covered in gold.' },
    { kind: 'heading', text: 'The sunset gate' },
    { text: 'The Yomeimon Gate is the most famous of all. People say you could look at it until sunset and still not take it all in. Toshogu, Rinnoji and Futarasan Shrine are a World Heritage Site together.' },
    { kind: 'find', text: 'Find the three wise monkeys carved over the stables, and the little sleeping cat over a gateway further in.' },
    PEAK_CLOSE,
  ],
}

const kanmangafuchi = {
  id: 'kanmangafuchi',
  name: 'Kanmangafuchi Abyss',
  mapName: 'Kanmangafuchi',
  photo: kanmangafuchiPhoto,
  photoAlt: 'A long row of mossy stone Jizo statues in red caps along a forest path at Kanmangafuchi',
  memory: 'Counting the stone Jizo by the river.',
  // The row of Jizo statues, along the gorge.
  mapPlace: 'Kanmangafuchi Abyss',
  mapPoint: { lat: 36.749092, lng: 139.5891809 },
  travelMode: 'walking',
  distanceMeters: 1748,
  travelMinutes: 25,
  effort: { level: 'easy', note: 'Downhill, across the river and a little way upstream' },
  stayMinutes: [20, 30],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Lava and water' },
    { text: 'That’s the last stop. Kanmangafuchi is a small gorge where the Daiya River has worn its way through lava from Mount Nantai, one of Nikko’s sacred mountains, and the water rushes white over the dark rock.' },
    { kind: 'heading', text: 'The ghost Jizo' },
    { text: 'Along the path sits a long row of stone Jizo statues in red caps, known as the Bake Jizo, the ghost Jizo. People say that if you count them, you’ll get a different number every time.' },
    { kind: 'find', text: 'Count the Jizo on your way along the path, and again on your way back. See if you get the same number.' },
    DINNER,
  ],
}

export default {
  id: 'nikko',
  aiMade: true,
  name: 'The Shrines in the Cedars',
  location: 'NIKKO · TOCHIGI, JAPAN',
  city: 'Nikko',
  photo: shinkyoPhoto,
  photoAlt: shinkyo.photoAlt,
  blurb: 'Over the sacred red bridge, through temples and shrines in the cedar forest.',
  walking: 'Some climbing',
  stops: '~5 stops',
  difficulty: 'Moderate',
  experiences: ['Cultural', 'Historical', 'Nature', 'Scenic'],
  departure: station,
  discovery: shinkyo,
  build: rinnoji,
  peak: toshogu,
  afterglow: kanmangafuchi,
  startArea: 'Nikko, Tochigi, Japan',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Mid-fall',
    seasonNote: 'For the autumn leaves around the shrines and along the river, from late October into early November.',
    timeOfDay: 'Starting in the morning',
    timeNote: 'The shrines and temples close in the late afternoon, earlier in winter.',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against Toshogu's and Rinnoji's own
  // sites, and Futarasan Shrine's published fee for the Shinkyo Bridge.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Shoes that slip off easily: you take them off inside some of the halls.',
      'A warm layer: Nikko is in the mountains, and much colder than Tokyo, especially in the shade of the cedars.',
      'Cash for the entry fees, and a Suica or PASMO card (or one on your phone) for the buses.',
      'An umbrella in the rainy season (June to mid-July).',
    ],
    costs: [
      { lead: 'Toshogu', text: '¥1,600, or ¥550 for elementary and junior high school students. ¥2,400 with the Treasure Museum.' },
      { lead: 'Rinnoji', text: 'Sanbutsudo ¥400, Taiyuin ¥550, or ¥900 for both (¥1,000 with the treasure hall and the Shoyoen garden).' },
      { lead: 'Shinkyo Bridge', text: '¥300 to walk across it.' },
      'Kanmangafuchi Abyss is free.',
    ],
    getting: [
      'Start at Tobu-Nikko Station, on the Tobu Line from Asakusa (JR Nikko Station is just next door).',
      'The walk ends at Kanmangafuchi Abyss, about 3 km from the station. Walk back down past the Shinkyo Bridge, where buses run to both stations, or take a taxi.',
      'Buses on the World Heritage loop run between the stations and the shrines, if you’d rather not walk uphill.',
      'If you drive, there are paid lots near the shrines, but they fill up in the autumn-leaf season.',
    ],
    access: [
      'A steady uphill walk, with stone steps and gravel paths around the shrines.',
      'Toshogu has long flights of stone steps, and the way up to Ieyasu’s tomb is about 200 more.',
      'The path along Kanmangafuchi is uneven by the river.',
    ],
    restrictions: [
      { lead: 'Toshogu', text: '9 AM–5 PM from April to October, and to 4 PM from November to March. Last entry 30 minutes before closing.' },
      { lead: 'Rinnoji and Taiyuin', text: '8 AM–5 PM from April to October, and to 4 PM from November to March. Last entry 30 minutes before closing. Closed for ceremonies on a few days, like February 3 and April 2.' },
      'Some halls don’t allow photos inside: look for the signs.',
    ],
    tips: [
      'Start early: the shrines are much calmer before the tour groups arrive, mid-morning.',
      'Look for the famous carvings at Toshogu: the three wise monkeys, and the sleeping cat over the way to Ieyasu’s tomb.',
      'In mid-October to early November, the autumn leaves make the roads very busy: take the train.',
      'Count the Jizo statues along Kanmangafuchi. Legend says you’ll never get the same number twice.',
    ],
  },
  match: {
    moods: { Peaceful: 70, Adventurous: 50, Romantic: 50, Curious: 80, Playful: 30, Cultural: 95 },
    with: { Solo: 85, Couple: 75, Family: 60, 'Friends / Group': 70 },
    preferences: {
      'Pet friendly': 15, 'Avoid alcohol': 95, 'More nature': 75, 'Food stops': 35,
      Coastal: 5, 'More urban': 10, 'Hiking involved': 40, 'Budget friendly': 35,
    },
  },
  description: [
    'Nikko has been a holy place since the 760s, when a monk came into these mountains to train. Nine centuries later, the first Tokugawa shogun was laid to rest here, and his grandson built him a shrine so covered in carving and gold that people say you could look at it until sunset.',
    'This journey walks from the town over the sacred red bridge, through the great temple and the cedar forest to Toshogu, and ends by a quiet gorge, counting the stone statues along the river.',
  ],
  // Why It's Cool on the journey's page (JourneyPage.jsx): what you'll
  // discover, why it matters, and what it feels like, a sentence each.
  whyCool: {
    discovery: 'A holy mountain town where a shogun lies in a shrine of carving and gold, deep in the cedar forest.',
    significance: 'From the monk who came here to train in the 760s to the shrine of the shogun whose family ruled Japan for more than 250 years.',
    feeling: 'Awe-inspiring, then peaceful: gold and carving in the shade of the cedars, and a quiet gorge lined with stone statues.',
  },
  route: [station, shinkyo, rinnoji, toshogu, kanmangafuchi],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Nikko, from the bridge to the forest and down to the river. Whatever you took from the day, it’s yours now.',
    summary: 'You started at Tobu-Nikko Station, found the red Shinkyo Bridge over the river, stood under the great hall of Rinnoji, took in the Yomeimon Gate at Toshogu, and finished counting the stone Jizo at Kanmangafuchi.',
  },
}
