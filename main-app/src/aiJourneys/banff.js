// Tea Above the Lake (Lake Louise, Banff National Park): an adventurous day
// hike for friends, made to the Journey Engine V2 handoff (flagship
// destinations: Banff).
//
// Its peak, chosen first: the lookout on top of the Big Beehive, high above
// Lake Louise's milky turquoise water, reached by a mountain trail with a
// tea house of 1901 halfway up. Why it's exceptional: few places put a
// glacier lake, a climb and a mountain tea house in a single morning. The
// thread is people who came up here for the view: a princess the lake is
// named for, a prime minister's wife who gave her name to the lake above,
// and the hikers the tea house was built to shelter.
//
// Primary mood: Adventurous. Audience: friends. On foot, about 10 km round
// trip with roughly 500 m of climbing, on mountain trails.
//
// Exact spots from OpenStreetMap; trail distances from Google's Routes API
// (November 2026). Checked in November 2026 against Wikipedia (the tea
// house), Banff Lake Louise Tourism, Travel Alberta and hiking guides (the
// trail, the season, parking). See JOURNEY_ENGINE_LOG.md.

import heroPhoto from '../assets/journey/banff/hero.jpg'
import lakeLouisePhoto from '../assets/journey/banff/lake-louise.jpg'
import mirrorLakePhoto from '../assets/journey/banff/mirror-lake.jpg'
import teaHousePhoto from '../assets/journey/banff/tea-house.jpg'
import beehivePhoto from '../assets/journey/banff/beehive.jpg'
import backPhoto from '../assets/journey/banff/back.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const lakeLouise = {
  id: 'lakeLouise',
  name: 'Lake Louise',
  photo: lakeLouisePhoto,
  photoAlt: 'The milky turquoise water of Lake Louise beneath glaciers and mountains',
  memory: 'The turquoise lake.',
  mapPlace: 'Lake Louise lakeshore, Banff National Park, Alberta',
  mapPoint: { lat: 51.41665, lng: -116.21808 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [15, 20],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Take a good look at the lake. In a few hours you’ll be looking straight down at it.' },
    { kind: 'heading', text: 'Why it’s that colour' },
    { text: 'The glaciers above grind the rock into a fine powder, called rock flour, and meltwater carries it into the lake. The tiny particles hang in the water and scatter the light, turning it this milky turquoise.' },
    { kind: 'heading', text: 'A princess’s lake' },
    { text: 'The lake is named for Princess Louise, a daughter of Queen Victoria; the province of Alberta takes its name from another of her names.' },
    { kind: 'find', text: 'Find the glacier at the far end of the lake, then pick out the rounded rock on the mountainside to your right: that’s the Big Beehive, where you’re going.' },
    { className: 'narrationClose', text: 'Take the Lake Agnes trail up through the forest, about 3 km and an hour of steady climbing. Tap “I’m Here” at Mirror Lake.' },
  ],
}

const mirrorLake = {
  id: 'mirrorLake',
  name: 'Mirror Lake',
  photo: mirrorLakePhoto,
  photoAlt: 'Small, still Mirror Lake beneath the rounded rock of the Big Beehive',
  memory: 'The Beehive in the water.',
  mapPlace: 'Mirror Lake, Banff National Park, Alberta',
  mapPoint: { lat: 51.41596, lng: -116.24018 },
  travelMode: 'walking',
  distanceMeters: 2734,
  travelMinutes: 55,
  effort: { level: 'hard', note: 'A steady climb on a forest trail with switchbacks' },
  stayMinutes: [10, 15],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Halfway up' },
    { text: 'Mirror Lake is a small, still pool right below the Big Beehive, so called because on a calm day the rock is reflected perfectly in it. You’ve already climbed well above Lake Louise.' },
    { kind: 'find', text: 'Wait for the water to go still, and find the Beehive upside down in it.' },
    { className: 'narrationClose', text: 'Now up the last steep stretch and a flight of steps beside a waterfall to Lake Agnes, about 15 minutes. Tap “I’m Here” at the tea house.' },
  ],
}

const lakeAgnes = {
  id: 'lakeAgnes',
  name: 'Lake Agnes Tea House',
  photo: teaHousePhoto,
  photoAlt: 'The wooden Lake Agnes Tea House among the trees by the lake',
  memory: 'Tea at the top of the trail.',
  mapPlace: 'Lake Agnes Tea House, Banff National Park, Alberta',
  mapPoint: { lat: 51.41642, lng: -116.24422 },
  travelMode: 'walking',
  distanceMeters: 650,
  travelMinutes: 14,
  effort: { level: 'hard', note: 'Steep, with steps beside a waterfall at the top' },
  stayMinutes: [30, 45],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'A shelter for hikers' },
    { text: 'The tea house was built in 1901 as a refuge for hikers, and you still can only get here on foot or on horseback. Supplies come up the trail, and the tea is brewed in the little log house by the lake.' },
    { kind: 'heading', text: 'Lake Agnes' },
    { text: 'The lake is named for Agnes Macdonald, the wife of Canada’s first prime minister, who came up here in the 1880s and was taken with it.' },
    { kind: 'find', text: 'Order a pot of tea and sit outside. Find the waterfall you climbed beside, spilling out of the lake.' },
    { className: 'narrationClose', text: 'Now round the lake and up the switchbacks to the top of the Big Beehive, about 40 minutes. Tap “I’m Here” at the lookout.' },
  ],
}

const bigBeehive = {
  id: 'bigBeehive',
  name: 'The Big Beehive',
  photo: beehivePhoto,
  photoAlt: 'Lake Louise far below, seen from the top of the Big Beehive',
  memory: 'The lake from above.',
  mapPlace: 'Big Beehive lookout, Banff National Park, Alberta',
  mapPoint: { lat: 51.41456, lng: -116.24343 },
  travelMode: 'walking',
  distanceMeters: 1643,
  travelMinutes: 38,
  effort: { level: 'hard', note: 'Round Lake Agnes, then steep switchbacks to the top' },
  stayMinutes: [30, 45],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'Straight down' },
    { text: 'From the top of the Beehive, Lake Louise lies almost straight below you, a turquoise slab between the mountains, with the big hotel at its far end looking like a toy. Everything you walked this morning is laid out beneath you.' },
    { kind: 'find', text: 'Find the spot on the shore where you started, then trace the trail you climbed.' },
    PEAK_CLOSE,
  ],
}

const backToLouise = {
  id: 'backToLouise',
  name: 'Back to the Lake',
  photo: backPhoto,
  photoAlt: 'Lake Louise and the mountains around it on a calm day',
  memory: 'Down to the water again.',
  mapPlace: 'Lake Louise lakeshore, Banff National Park, Alberta',
  mapPoint: { lat: 51.41665, lng: -116.21808 },
  travelMode: 'walking',
  distanceMeters: 5028,
  travelMinutes: 85,
  effort: { level: 'moderate', note: 'Downhill, back through the forest to the lake' },
  stayMinutes: [20, 30],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The same lake, a different view' },
    { text: 'Back on the shore, the lake looks different now that you’ve seen it from above. The Beehive is just a small round rock on the mountainside again, and you’ve stood on top of it.' },
    { kind: 'find', text: 'Find the Big Beehive from the shore, and point it out to each other.' },
    { className: 'narrationClose', text: 'That’s the climb done. You’ve earned a rest.' },
  ],
}

export default {
  id: 'banff',
  aiMade: true,
  name: 'Tea Above the Lake',
  location: 'LAKE LOUISE · ALBERTA, CANADA',
  city: 'Lake Louise',
  photo: heroPhoto,
  photoAlt: 'Lake Louise’s turquoise water far below, seen from the Big Beehive',
  blurb: 'A turquoise glacier lake, a climb to a tea house of 1901, and the view straight down from the Big Beehive.',
  walking: 'Some climbing',
  stops: '~5 stops',
  difficulty: 'Active',
  experienceLevel: 'standoutJourney',
  experiences: ['Adventure', 'Nature', 'Scenic', 'Historical'],
  departure: lakeLouise,
  discovery: mirrorLake,
  build: lakeAgnes,
  peak: bigBeehive,
  afterglow: backToLouise,
  startArea: 'Lake Louise, Banff National Park, Alberta, Canada',
  startNote: START_NOTE,
  bestTime: {
    season: 'Late June to September',
    seasonNote: 'The trail can be snowy into June, and the tea house has opened in mid-June and closed in early October in recent years.',
    timeOfDay: 'Early morning',
    timeNote: 'Parking at Lake Louise fills up early, and the trail and tea house get busy by late morning.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Hiking boots, layers and a rain jacket: mountain weather changes fast.',
      'Water and snacks, and money for the tea house.',
      'Bear spray, and know how to use it.',
    ],
    costs: [
      { lead: 'Park pass', text: 'A Parks Canada pass is needed to stop in Banff National Park.' },
      { lead: 'Parking', text: 'The Lake Louise lakeshore car park charges a fee and often fills before mid-morning.' },
      'The tea house sells tea, soups and baked goods.',
    ],
    getting: [
      'Start on the shore of Lake Louise, in front of the hotel. The trail to Lake Agnes leaves from the lakeshore path.',
      'In summer, Parks Canada runs shuttles to Lake Louise that are often easier than parking: book ahead.',
    ],
    access: [
      'About 10 km of mountain trail with roughly 500 m of climbing, steep in places, with steps near the tea house. Not suitable for strollers or wheelchairs.',
    ],
    restrictions: [
      { lead: 'Wildlife', text: 'This is bear country: hike in a group, make noise, and keep food packed away.' },
      'Check Parks Canada’s trail reports before you go, for closures and warnings.',
    ],
    tips: [
      'Go early: the tea house can have a queue by late morning.',
    ],
  },
  match: {
    moods: { Peaceful: 60, Adventurous: 96, Romantic: 70, Curious: 50, Playful: 45, Cultural: 30 },
    with: { Solo: 70, Couple: 85, Family: 60, 'Friends / Group': 95 },
    preferences: {
      'Pet friendly': 30, 'Avoid alcohol': 95, 'More nature': 98, 'Food stops': 30,
      Coastal: 0, 'More urban': 0, 'Hiking involved': 98, 'Budget friendly': 70,
    },
  },
  description: [
    'Lake Louise is milky turquoise because of the glaciers above it. A trail climbs from its shore up through the forest to a smaller lake and a tea house built for hikers in 1901, and on up to a rock called the Big Beehive.',
    'This day hike climbs past Mirror Lake to tea at Lake Agnes, then up to the top of the Beehive to look straight down on Lake Louise, before heading back down to its shore.',
  ],
  whyCool: {
    discovery: 'A tea house of 1901 that you can only reach on foot or horseback.',
    significance: 'Lake Louise, in Canada’s first national park, coloured by glacial rock flour.',
    feeling: 'Breathless and elated: a real climb, a hot cup of tea, and a view straight down.',
  },
  route: [lakeLouise, mirrorLake, lakeAgnes, bigBeehive, backToLouise],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Lake Louise, from the shore to the top of the Beehive.',
    summary: 'You set off from the shore of Lake Louise, climbed past Mirror Lake to tea at Lake Agnes, stood on top of the Big Beehive above the lake, and came back down to the water.',
  },
}
