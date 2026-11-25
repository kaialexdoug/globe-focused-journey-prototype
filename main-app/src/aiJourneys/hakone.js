// Up the Mountain, Down to the Lake (Hakone, Kanagawa), built the same way
// as the Waseda journey (testJourney.js). Every stop has its exact spot
// (`mapPoint`, from Wikipedia and OpenStreetMap), so it gets the live map,
// and the way to it from the stop before: how far (`distanceMeters`), how
// long (`travelMinutes`) and how hard (`effort`), worked out once, in
// November 2026. The walks are from Google's walking routes and the heights
// along them (Open-Meteo). Google has no train routes in Japan, so a ride
// is its length on the lines (Wikipedia): the mountain railway, the cable
// car and the ropeway, and for the boat, the distance between its piers.
// The ride times are estimates, and the short walks to and from the
// stations aren't counted in the walking.
//
// The narration tells one story from stop to stop: a country built by a
// volcano, from the railway that zigzags up into it, to the valley where it
// still steams, the lake in its crater, the samurai's shrine on the shore,
// and the old Tokaido road that travelers once walked over these mountains.
// The history was checked against published sources (Wikipedia, in English
// and Japanese) in November 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import yumotoPhoto from '../assets/journey/hakone/yumoto.jpg'
import openAirMuseumPhoto from '../assets/journey/hakone/open-air-museum.jpg'
import owakudaniPhoto from '../assets/journey/hakone/owakudani.jpg'
import checkpointPhoto from '../assets/journey/hakone/checkpoint.jpg'
import hakoneShrinePhoto from '../assets/journey/hakone/hakone-shrine.jpg'
import cedarAvenuePhoto from '../assets/journey/hakone/cedar-avenue.jpg'

// The spots near the stops.
import goraParkPhoto from '../assets/journey/hakone/gora-park.jpg'
import onshiParkPhoto from '../assets/journey/hakone/onshi-hakone-park.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const yumoto = {
  id: 'hakoneYumoto',
  name: 'Hakone-Yumoto Station',
  photo: yumotoPhoto,
  photoAlt: 'Hakone-Yumoto Station in the evening, with a small red mountain train at the platform below the wooded hillside',
  memory: 'Where the day began.',
  mapPlace: 'Hakone-Yumoto Station',
  mapPoint: { lat: 35.23352778, lng: 139.10390833 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Hakone.' },
    { kind: 'heading', text: 'Into the mountains' },
    { text: 'Hakone-Yumoto is where the mountains begin. From here, a little railway, opened in 1919, climbs into the hills. The slope is so steep that the train has to zigzag up it, stopping at switchbacks and setting off the other way.' },
    { kind: 'heading', text: 'A volcano’s country' },
    { text: 'All of Hakone sits in an old volcano. Today you’ll ride up to where it still steams, down to the lake in its crater, and finish on the old Tokaido road, where travelers once walked over these mountains between Edo and Kyoto.' },
    { kind: 'find', text: 'On the way up, watch for the switchbacks, where the driver walks to the other end of the train and it heads off the other way.' },
    { className: 'narrationClose', text: 'Take the mountain railway up toward Gora, and get off at Chokoku-no-Mori. The first stop is just by the station.' },
  ],
}

const openAirMuseum = {
  id: 'hakoneOpenAirMuseum',
  name: 'Hakone Open-Air Museum',
  mapName: 'Open-Air Museum',
  photo: openAirMuseumPhoto,
  photoAlt: 'A rounded pavilion built from stacked wooden beams, on a grassy slope at the Hakone Open-Air Museum',
  memory: 'Art out on the hillside.',
  mapPlace: 'The Hakone Open-Air Museum',
  mapPoint: { lat: 35.24472222, lng: 139.05138889 },
  travelMode: 'transit',
  // The mountain railway from Hakone-Yumoto to Chokoku-no-Mori is 8.2 km,
  // then it's a short walk (222 m) to the museum.
  distanceMeters: 8200,
  travelMinutes: 40,
  effort: { level: 'easy', note: 'The mountain railway up the switchbacks, then a short walk from Chokoku-no-Mori Station' },
  stayMinutes: [60, 90],
  nearby: [
    {
      name: 'Gora Park',
      note: 'A hillside garden opened in 1914, with a fountain at its heart',
      meters: 710,
      photo: goraParkPhoto,
      photoAlt: 'A tall fountain in the middle of a pool in Gora Park, with gardens and a mountain behind',
      mapPlace: '強羅公園, 箱根',
      mapPoint: { lat: 35.2486387, lng: 139.045249 },
    },
  ],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Art in the open' },
    { text: 'This was Japan’s first open-air museum, opened in 1969, and most of its art isn’t indoors at all. About 120 sculptures stand out on the lawns and hillsides, with the mountains behind them.' },
    { kind: 'heading', text: 'A hall of Picasso' },
    { text: 'There’s a whole pavilion of around 300 works by Picasso, too. Wander at your own pace. Some pieces are huge, some are easy to walk straight past, and a few you can step right inside.' },
    { kind: 'find', text: 'Find a sculpture you can step inside, and look out at the mountains from it.' },
    { className: 'narrationClose', text: 'When you’re ready, head higher. The next stop is where the mountain is still smoking.' },
  ],
}

const checkpoint = {
  id: 'hakoneCheckpoint',
  name: 'Hakone Checkpoint',
  mapName: 'Checkpoint',
  photo: checkpointPhoto,
  photoAlt: 'The wooden buildings of the Hakone Checkpoint seen from the hillside above, with Lake Ashi and the mountains behind',
  memory: 'Through the old checkpoint.',
  teaser: 'An old checkpoint on the road to Edo, rebuilt beside the lake. Get off the boat one stop early, and walk to the shrine along the shore.',
  mapPlace: 'Hakone Sekisho',
  mapPoint: { lat: 35.192361, lng: 139.026139 },
  travelMode: 'transit',
  // From Owakudani: the ropeway to Togendai (2.5 km), then the boat to
  // Hakone-machi (about 5.9 km between the piers) and a short walk (566 m).
  // The boat stops at Hakone-machi before Moto-Hakone anyway, so what the
  // detour adds is the walk on to the shrine along the shore (2,006 m)
  // instead of from Moto-Hakone's pier (996 m).
  distanceMeters: 8500,
  travelMinutes: 55,
  extraMeters: 1010,
  effort: { level: 'easy', note: 'The ropeway and the boat, then a short walk along the shore' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Onshi-Hakone Park',
      note: 'Gardens on a point in the lake, where an imperial villa stood from 1886, with views of the mountains',
      meters: 450,
      photo: onshiParkPhoto,
      photoAlt: 'A path curving through the gardens of Onshi-Hakone Park, with a green mountain beyond',
      mapPlace: '恩賜箱根公園',
      mapPoint: { lat: 35.19638889, lng: 139.02591667 },
    },
  ],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'The gate on the road to Edo' },
    { text: 'From 1619 to 1869, every traveler on the Tokaido had to pass a checkpoint here. The guards watched above all for guns heading toward Edo, and for women leaving it. What you see has been rebuilt the way it once was.' },
    { kind: 'heading', text: 'Papers, please' },
    { text: 'Walk through the gates and imagine arriving on foot after days on the road, hoping your papers were in order. Then follow the shore toward the shrine, under the cedars of the old road.' },
    { kind: 'find', text: 'Climb up to the lookout above the checkpoint, and look down over the gates and the lake.' },
    BACK_TO_ROUTE,
  ],
}

const owakudani = {
  id: 'owakudani',
  name: 'Owakudani',
  photo: owakudaniPhoto,
  photoAlt: 'The bare, snow-streaked slopes of Owakudani, with steam rising from the volcanic ground below a rocky peak',
  memory: 'Steam, sulphur and black eggs.',
  mapPlace: 'Owakudani',
  mapPoint: { lat: 35.241916, lng: 139.020667 },
  travelMode: 'transit',
  // One stop on the railway to Gora (0.7 km), the cable car to Sounzan
  // (1.2 km), then the ropeway to Owakudani (1.5 km).
  distanceMeters: 3400,
  travelMinutes: 40,
  effort: { level: 'easy', note: 'The railway to Gora, the cable car up the hill, then the ropeway over the ridge' },
  stayMinutes: [30, 45],
  ...BUILD,
  detours: [checkpoint],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'Where the mountain steams' },
    { text: 'From Gora, a cable car and then a ropeway carry you up over the ridge, and the ground below turns bare and grey. This is Owakudani, a valley blasted out by an eruption about 3,000 years ago, and the earth here still steams. You’ll smell the sulfur in the air.' },
    { kind: 'heading', text: 'Black eggs' },
    { text: 'Eggs boiled in the hot springs here come out with black shells, from the minerals in the water, and eating one is said to add seven years to your life. The valley is still active, and it was closed for a while in 2015. If access is limited, the view from the ropeway is still worth it.' },
    { kind: 'find', text: 'Find someone eating a black egg, or better still, eat one yourself, and count your seven extra years.' },
    { className: 'narrationClose', text: 'The ropeway carries on down to Lake Ashi, and a boat takes you across. There’s an old checkpoint by the water, if you’d like a detour. Otherwise, the shrine is waiting.' },
  ],
}

const hakoneShrine = {
  id: 'hakoneShrine',
  name: 'Hakone Shrine',
  photo: hakoneShrinePhoto,
  photoAlt: 'The red torii of Hakone Shrine standing in the clear water of Lake Ashi, with wooded hills behind',
  memory: 'The red gate in the lake.',
  mapPlace: 'Hakone Shrine',
  mapPoint: { lat: 35.20388889, lng: 139.02555556 },
  travelMode: 'transit',
  // The ropeway down to Togendai (2.5 km), the boat across the lake to
  // Moto-Hakone by way of Hakone-machi (about 7.2 km between the piers),
  // then a walk up to the shrine (996 m, 15 minutes).
  distanceMeters: 9700,
  travelMinutes: 75,
  effort: { level: 'easy', note: 'The ropeway, the boat across the lake, then a walk up through the cedars with some steps' },
  stayMinutes: [30, 45],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The samurai’s shrine' },
    { text: 'Hakone Shrine is said to have been founded in 757. Minamoto no Yoritomo, the first shogun, took refuge with its god after losing a battle, and when he came to power he became its patron. For centuries, it was a favorite of the samurai.' },
    { kind: 'heading', text: 'A gate in the water' },
    { text: 'Legend says a nine-headed dragon once lived at the bottom of the lake, until a priest named Mangan calmed it. The shrine’s red torii stands right out in the water. Climb up through the tall cedars to the shrine, then come back down to the gate by the lake.' },
    { kind: 'find', text: 'Find the red torii standing in the lake. On a clear day, look for Fuji over the hills across the water.' },
    PEAK_CLOSE,
  ],
}

const cedarAvenue = {
  id: 'hakoneCedarAvenue',
  name: 'Old Tokaido Cedar Avenue',
  mapName: 'Cedar Avenue',
  photo: cedarAvenuePhoto,
  photoAlt: 'A quiet path running between rows of huge old cedar trees, with sunlight on the ground',
  memory: 'Under the old cedars.',
  mapPlace: 'Old Tokaido Road Cedar Avenue, Hakone',
  mapPoint: { lat: 35.196684, lng: 139.0289864 },
  travelMode: 'walking',
  distanceMeters: 1441,
  travelMinutes: 20,
  effort: { level: 'easy', note: 'Down from the shrine and along the lake' },
  stayMinutes: [20, 30],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Shade for the old road' },
    { text: 'That’s the last stop. The old Tokaido ran right along here, and in 1618, the shogunate had these cedars planted to shade the travelers walking it. The oldest are said to be around 350 years old.' },
    { kind: 'heading', text: 'What’s left' },
    { text: 'There were once many more. Most of the old road’s trees were cut down about a century ago, to pay for a new road, and only these by the lake were left. Walk a little way under them. It’s quieter here than anywhere else today.' },
    { kind: 'find', text: 'Find the biggest cedar you can, and put your arms around it. See how far they reach.' },
    DINNER,
  ],
}

export default {
  id: 'hakone',
  aiMade: true,
  name: 'Up the Mountain, Down to the Lake',
  location: 'HAKONE · KANAGAWA, JAPAN',
  city: 'Hakone',
  photo: hakoneShrinePhoto,
  photoAlt: hakoneShrine.photoAlt,
  blurb: 'Up the mountains by ropeway, past a steaming valley, to a red gate in the lake.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Scenic', 'Nature', 'Historical', 'Cultural', 'Adventure'],
  departure: yumoto,
  discovery: openAirMuseum,
  build: owakudani,
  peak: hakoneShrine,
  afterglow: cedarAvenue,
  startArea: 'Hakone, Kanagawa, Japan',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Mid–late fall',
    seasonNote: 'For the autumn leaves in November, and clear views of Fuji over Lake Ashi.',
    timeOfDay: 'Starting early in the morning',
    timeNote: 'It’s a long day of riding, and the ropeway and the boats stop running in the late afternoon.',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against the Open-Air Museum's and
  // the Hakone Checkpoint's published fees and hours, and Odakyu's Hakone
  // Navi for the Free Pass and the ropeway.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'A warm layer: Owakudani is about 1,000 metres up, and much cooler than the valley.',
      'Comfortable shoes, for the steps up to Hakone Shrine and the old cedar avenue.',
      'Some cash, for snacks like Owakudani’s black eggs.',
      'A rain jacket: Hakone’s weather turns quickly, and it rains a lot in June and July.',
    ],
    costs: [
      { lead: 'Hakone Free Pass', text: 'Covers the mountain railway, the cable car, the ropeway, the boat across the lake and the buses. From Shinjuku, ¥7,100 for two days (it also covers the Odakyu train there and back).' },
      { lead: 'Hakone Open-Air Museum', text: '¥2,000, or ¥1,800 if you buy online.' },
      { lead: 'Hakone Checkpoint', text: '¥500, or ¥250 for children.' },
      'Hakone Shrine and the cedar avenue are free.',
    ],
    getting: [
      'Start at Hakone-Yumoto Station, on the Odakyu Line from Shinjuku (the Romancecar goes straight through).',
      'Most of the way is by Hakone’s own transport: the mountain railway, the cable car, the ropeway over Owakudani and the boat across Lake Ashi.',
      'The walk ends by the lake at Moto-Hakone, about 8 km from where it starts. Hakone Tozan buses run from there back down to Hakone-Yumoto.',
      'Driving doesn’t suit this route, and Hakone’s roads jam at weekends: come by train.',
    ],
    access: [
      'Most of it is sitting on trains, cable cars and boats, with short walks between them.',
      'There are steps up to Hakone Shrine through the cedars, and the cedar avenue is an old, unpaved road.',
      'The Open-Air Museum’s grounds are outdoors and hilly in places.',
    ],
    restrictions: [
      { lead: 'Hakone Ropeway', text: 'Stops for volcanic gas, strong wind or bad weather, and for inspections, sometimes with no warning. Free Pass holders can take the replacement bus. Check its status on the morning you go.' },
      { lead: 'Owakudani', text: 'People with asthma or heart conditions, pregnant women and small children are advised not to stop there because of the volcanic gas.' },
      { lead: 'Hakone Open-Air Museum', text: '9 AM–5 PM every day, last entry 4:30 PM.' },
      { lead: 'Hakone Checkpoint', text: '9 AM–5 PM (to 4:30 PM, December to February), last entry 30 minutes before closing. Open every day.' },
    ],
    tips: [
      'Set off early: it’s a long day, and the ropeway and boats get busy by late morning.',
      'From the boat, look out for Hakone Shrine’s red torii gate, standing in the water.',
      'On a clear day, Mount Fuji appears from the ropeway and from the lake, usually best in the morning and in winter.',
    ],
  },
  match: {
    moods: { Peaceful: 70, Adventurous: 85, Romantic: 70, Curious: 65, Playful: 60, Cultural: 55 },
    with: { Solo: 70, Couple: 85, Family: 85, 'Friends / Group': 85 },
    preferences: {
      'Pet friendly': 25, 'Avoid alcohol': 90, 'More nature': 85, 'Food stops': 45,
      Coastal: 10, 'More urban': 10, 'Hiking involved': 35, 'Budget friendly': 35,
    },
  },
  description: [
    'Hakone sits inside an old volcano, in the mountains between Tokyo and Fuji. A little railway zigzags up into it, a cable car and a ropeway carry you over a valley that still steams, and a boat takes you across the lake in its crater to a samurai shrine on the shore.',
    'This journey rides all of them, with an open-air museum on the way up, and ends on foot on the old Tokaido road, under cedars planted four hundred years ago to shade the travelers walking it.',
  ],
  // Why It's Cool on the journey's page (JourneyPage.jsx): what you'll
  // discover, why it matters, and what it feels like, a sentence each.
  whyCool: {
    discovery: 'The inside of an old volcano, crossed by mountain railway, cable car, ropeway and boat.',
    significance: 'A valley that still steams, a samurai shrine said to date from 757, and cedars planted four hundred years ago to shade the Tokaido.',
    feeling: 'Adventurous and fresh: mountain air, a smoking valley and a lake crossing, then a calm walk under the cedars.',
  },
  route: [yumoto, openAirMuseum, owakudani, hakoneShrine, cedarAvenue],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Hakone, from the station at the bottom to the lake at the top. Whatever you took from the day, it’s yours now.',
    summary: 'You started at Hakone-Yumoto, wandered the Open-Air Museum, rode over the steam at Owakudani, found the red gate of Hakone Shrine in the lake, and finished under the cedars on the old road to Edo.',
  },
}
