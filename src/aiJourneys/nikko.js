// The Shrines in the Cedars (Nikko, Tochigi)

import stationPhoto from '../assets/journey/nikko/station.jpg'
import shinkyoPhoto from '../assets/journey/nikko/shinkyo.jpg'
import rinnojiPhoto from '../assets/journey/nikko/rinnoji.jpg'
import taiyuinPhoto from '../assets/journey/nikko/taiyuin.jpg'
import toshoguPhoto from '../assets/journey/nikko/toshogu.jpg'
import kanmangafuchiPhoto from '../assets/journey/nikko/kanmangafuchi.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const station = {
  id: 'tobuNikko',
  name: 'Tobu-Nikko Station',
  photo: stationPhoto,
  photoAlt: 'Tobu-Nikko Station, a station building with a steep roof, under a sky of white clouds',
  memory: 'Where the day began.',
  mapPlace: 'Tobu-Nikko Station',
  travelMode: 'transit',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Nikko.' },
    { text: 'This town in the mountains has been a sacred place for centuries. When the first Tokugawa shogun died, it was here that his great shrine was built, deep in the cedar forest.' },
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
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'This is the Shinkyo, the sacred bridge. Its red arch over the Daiya River marks the way into the shrines and temples of Nikko.' },
    { text: 'Stand on the road bridge beside it and look down at the water. It’s clear and fast, straight out of the mountains.' },
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
  travelMode: 'walking',
  ...DETOUR,
  narration: [
    { text: 'Taiyuin is the resting place of Iemitsu, grandson of the first shogun. It’s said he had it built a little more modestly than his grandfather’s shrine, out of respect.' },
    { text: 'Modest is relative. Climb up through its gates, and enjoy them with fewer people around.' },
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
  travelMode: 'walking',
  ...BUILD,
  detours: [taiyuin],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'Rinnoji is Nikko’s great temple. Its main hall is huge and red, and inside sit three enormous gilded statues.' },
    { text: 'Step inside and take a moment in front of them. They’re much bigger than you expect.' },
    { text: 'Further into the forest, there’s a quieter mausoleum, if you’d like a detour. Otherwise, Toshogu is waiting.' },
  ],
}

const toshogu = {
  id: 'toshogu',
  name: 'Toshogu',
  photo: toshoguPhoto,
  photoAlt: 'The Yomeimon Gate at Toshogu, covered in white, gold and coloured carvings, at the top of stone steps',
  memory: 'In front of the Yomeimon Gate.',
  mapPlace: 'Nikko Toshogu',
  travelMode: 'walking',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'Toshogu is the shrine of the first Tokugawa shogun, and nothing about it is plain. Every surface is carved, painted or covered in gold.' },
    { text: 'The Yomeimon Gate is the most famous of all. People say you could look at it until sunset and still not take it all in. Look out too for the three wise monkeys carved over the stables, and the little sleeping cat.' },
    PEAK_CLOSE,
  ],
}

const kanmangafuchi = {
  id: 'kanmangafuchi',
  name: 'Kanmangafuchi Abyss',
  photo: kanmangafuchiPhoto,
  photoAlt: 'A long row of mossy stone Jizo statues in red caps along a forest path at Kanmangafuchi',
  memory: 'Counting the stone Jizo by the river.',
  mapPlace: 'Kanmangafuchi Abyss',
  travelMode: 'walking',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. Kanmangafuchi is a walk across the river and a little way upstream, to a gorge where the water rushes over dark rock.' },
    { text: 'Along the path sits a long row of stone Jizo statues in red caps. People say that if you count them, you’ll get a different number every time. Try it, and see.' },
    DINNER,
  ],
}

export default {
  id: 'nikko',
  aiMade: true,
  name: 'The Shrines in the Cedars',
  location: 'NIKKO · TOCHIGI, JAPAN',
  photo: shinkyoPhoto,
  photoAlt: shinkyo.photoAlt,
  blurb: 'Over the sacred red bridge, through temples and shrines in the cedar forest, to a quiet gorge lined with stone statues.',
  tagline: TAGLINE,
  time: '~5 hours',
  walking: 'Easy walking',
  stops: '~5 stops',
  departure: station,
  discovery: shinkyo,
  build: rinnoji,
  peak: toshogu,
  afterglow: kanmangafuchi,
  startArea: 'Nikko, Tochigi, Japan',
  startNote: START_NOTE,
  match: { moods: ['Cultural', 'Curious', 'Peaceful'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 5, effort: 'Easy' },
  why: [
    'Nikko is where Japan went all out. The shrines and temples here sit in a forest of giant cedars, and the greatest of them is covered from top to bottom in carving and gold. This journey crosses the sacred bridge, climbs through the temples to the shrine everyone comes for, and ends somewhere much quieter, by the river.',
  ],
  route: [station, shinkyo, rinnoji, toshogu, kanmangafuchi],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Nikko, from the bridge to the forest and down to the river. Whatever you took from the day, it’s yours now.',
    summary: 'You started at Tobu-Nikko Station, found the red Shinkyo Bridge over the river, stood under the great hall of Rinnoji, took in the Yomeimon Gate at Toshogu, and finished counting the stone Jizo at Kanmangafuchi.',
  },
}
