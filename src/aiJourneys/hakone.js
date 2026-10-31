// Up the Mountain, Down to the Lake (Hakone, Kanagawa)

import yumotoPhoto from '../assets/journey/hakone/yumoto.jpg'
import openAirMuseumPhoto from '../assets/journey/hakone/open-air-museum.jpg'
import owakudaniPhoto from '../assets/journey/hakone/owakudani.jpg'
import checkpointPhoto from '../assets/journey/hakone/checkpoint.jpg'
import hakoneShrinePhoto from '../assets/journey/hakone/hakone-shrine.jpg'
import cedarAvenuePhoto from '../assets/journey/hakone/cedar-avenue.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const yumoto = {
  id: 'hakoneYumoto',
  name: 'Hakone-Yumoto Station',
  photo: yumotoPhoto,
  photoAlt: 'Hakone-Yumoto Station in the evening, with a small red mountain train at the platform below the wooded hillside',
  memory: 'Where the day began.',
  mapPlace: 'Hakone-Yumoto Station',
  travelMode: 'transit',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Hakone.' },
    { text: 'Hakone-Yumoto is where the mountains begin. From here, a little railway climbs into the hills, zigzagging back and forth to get up the slope, and the rest of the day goes up with it, then over to the lake on the other side.' },
    { className: 'narrationClose', text: 'Take the mountain railway up toward Gora, and get off at Chokoku-no-Mori. The first stop is just by the station.' },
  ],
}

const openAirMuseum = {
  id: 'hakoneOpenAirMuseum',
  name: 'Hakone Open-Air Museum',
  photo: openAirMuseumPhoto,
  photoAlt: 'A rounded pavilion built from stacked wooden beams, on a grassy slope at the Hakone Open-Air Museum',
  memory: 'Art out on the hillside.',
  mapPlace: 'The Hakone Open-Air Museum',
  travelMode: 'transit',
  ...DISCOVERY,
  narration: [
    { text: 'Most of the art here isn’t indoors at all. Sculptures stand out on the lawns and hillsides, with the mountains behind them.' },
    { text: 'Wander at your own pace. Some pieces are huge, some are easy to walk straight past, and a few you can step right inside.' },
    { className: 'narrationClose', text: 'When you’re ready, head higher. The next stop is where the mountain is still smoking.' },
  ],
}

const checkpoint = {
  id: 'hakoneCheckpoint',
  name: 'Hakone Checkpoint',
  photo: checkpointPhoto,
  photoAlt: 'The wooden buildings of the Hakone Checkpoint seen from the hillside above, with Lake Ashi and the mountains behind',
  memory: 'Through the old checkpoint.',
  teaser: 'An old checkpoint on the road to Edo, rebuilt beside the lake. A short walk along the shore from the shrine.',
  mapPlace: 'Hakone Sekisho',
  travelMode: 'transit',
  ...DETOUR,
  narration: [
    { text: 'The old road between Edo and Kyoto came through these mountains, and every traveller on it had to pass a checkpoint here. What you see now has been rebuilt the way it once was.' },
    { text: 'Walk through the gates and imagine arriving on foot after days on the road, hoping your papers were in order.' },
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
  travelMode: 'transit',
  ...BUILD,
  detours: [checkpoint],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'From Gora, a cable car and then a ropeway carry you up over the ridge, and the ground below turns bare and grey. This is Owakudani, a volcanic valley where the earth still steams, and you’ll smell the sulphur in the air.' },
    { text: 'Look out for the black eggs. They’re boiled in the hot springs here, and the shells come out black. Eating one is said to add years to your life. The valley is still active, and access is sometimes limited. If it is, the view from the ropeway is worth the ride on its own.' },
    { text: 'The ropeway carries on down to Lake Ashi, and a boat takes you across. There’s an old checkpoint by the water, if you’d like a detour. Otherwise, the shrine is waiting.' },
  ],
}

const hakoneShrine = {
  id: 'hakoneShrine',
  name: 'Hakone Shrine',
  photo: hakoneShrinePhoto,
  photoAlt: 'The red torii of Hakone Shrine standing in the clear water of Lake Ashi, with wooded hills behind',
  memory: 'The red gate in the lake.',
  mapPlace: 'Hakone Shrine',
  travelMode: 'transit',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'Hakone Shrine sits among tall cedars on the shore of Lake Ashi, and its red torii stands right out in the water.' },
    { text: 'Climb up to the shrine through the trees, then come back down to the gate by the lake. On a clear day, watch for Fuji over the hills across the water.' },
    PEAK_CLOSE,
  ],
}

const cedarAvenue = {
  id: 'hakoneCedarAvenue',
  name: 'Old Tokaido Cedar Avenue',
  photo: cedarAvenuePhoto,
  photoAlt: 'A quiet path running between rows of huge old cedar trees, with sunlight on the ground',
  memory: 'Under the old cedars.',
  mapPlace: 'Old Tokaido Road Cedar Avenue, Hakone',
  travelMode: 'walking',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. The old road to Edo ran right along here, and the cedars on either side were planted to shade the travellers walking it. Some of them are centuries old.' },
    { text: 'Walk a little way under them. It’s quieter here than anywhere else today, and the light coming through the trees is a good way to end it.' },
    DINNER,
  ],
}

export default {
  id: 'hakone',
  aiMade: true,
  name: 'Up the Mountain, Down to the Lake',
  location: 'HAKONE · KANAGAWA, JAPAN',
  photo: hakoneShrinePhoto,
  photoAlt: hakoneShrine.photoAlt,
  blurb: 'Up into the mountains by train, cable car and ropeway, past a steaming volcanic valley, and down to a red gate in the lake.',
  tagline: TAGLINE,
  time: '~6 hours',
  walking: 'Easy walking',
  stops: '~5 stops',
  departure: yumoto,
  discovery: openAirMuseum,
  build: owakudani,
  peak: hakoneShrine,
  afterglow: cedarAvenue,
  startArea: 'Hakone, Kanagawa, Japan',
  startNote: START_NOTE,
  match: { moods: ['Adventurous', 'Peaceful', 'Romantic'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 6, effort: 'Easy' },
  why: [
    'Hakone is a day of getting there: a mountain railway, a cable car, a ropeway over a smoking valley, and a boat across a lake. Each one shows you something new, and by the time you reach the shrine on the water, you’ll have seen the mountains from every side.',
  ],
  route: [yumoto, openAirMuseum, owakudani, hakoneShrine, cedarAvenue],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Hakone, from the station at the bottom to the lake at the top. Whatever you took from the day, it’s yours now.',
    summary: 'You started at Hakone-Yumoto, wandered the Open-Air Museum, rode over the steam at Owakudani, found the red gate of Hakone Shrine in the lake, and finished under the cedars on the old road to Edo.',
  },
}
