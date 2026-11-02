// The Tokyo That Stayed (Yanaka, Tokyo)

import nipporiPhoto from '../assets/journey/yanaka/nippori.jpg'
import cemeteryPhoto from '../assets/journey/yanaka/cemetery.jpg'
import yanakaGinzaPhoto from '../assets/journey/yanaka/yanaka-ginza.jpg'
import scaiPhoto from '../assets/journey/yanaka/scai.jpg'
import nezuShrinePhoto from '../assets/journey/yanaka/nezu-shrine.jpg'
import shinobazuPhoto from '../assets/journey/yanaka/shinobazu.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const nippori = {
  id: 'nippori',
  name: 'Nippori Station',
  photo: nipporiPhoto,
  photoAlt: 'Nippori Station from above, with trains passing below and tall apartment towers behind',
  memory: 'Where the day began.',
  mapPlace: 'Nippori Station',
  travelMode: 'transit',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Yanaka.' },
    { text: 'Much of this corner of Tokyo came through the disasters that reshaped the rest of the city, and it still feels like an older place: wooden houses, narrow lanes, and temples on nearly every corner.' },
    { className: 'narrationClose', text: 'Leave the station by the west exit and head up the slope. The first stop is only a few minutes away.' },
  ],
}

const cemetery = {
  id: 'yanakaCemetery',
  name: 'Yanaka Cemetery',
  photo: cemeteryPhoto,
  photoAlt: 'People walking down the wide avenue through Yanaka Cemetery, under cherry trees in full blossom',
  memory: 'A slow walk through Yanaka Cemetery.',
  mapPlace: 'Yanaka Cemetery',
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'A cemetery might seem like a strange place to start, but Yanaka’s feels more like a park: wide, quiet paths, old trees, and the odd cat asleep in the sun.' },
    { text: 'Walk the main avenue. It’s lined with cherry trees, and in spring it turns into a tunnel of blossom. Whenever you come, it’s one of the calmest walks in Tokyo.' },
    { className: 'narrationClose', text: 'Keep going, and the lanes will lead you down toward the old shopping street.' },
  ],
}

const scai = {
  id: 'scaiTheBathhouse',
  name: 'SCAI The Bathhouse',
  photo: scaiPhoto,
  photoAlt: 'SCAI The Bathhouse, an old public bathhouse with a curved tiled roof, now an art gallery',
  memory: 'Art in an old bathhouse.',
  teaser: 'An old neighbourhood bathhouse turned into a contemporary art gallery. A short walk back up the hill.',
  mapPlace: 'SCAI THE BATHHOUSE',
  travelMode: 'walking',
  ...DETOUR,
  narration: [
    { text: 'This was once a public bathhouse, where the neighbourhood came to wash. Now it’s a contemporary art gallery, with the old roof still on top.' },
    { text: 'The shows change, so you never quite know what you’ll find inside. That’s half the fun.' },
    BACK_TO_ROUTE,
  ],
}

const yanakaGinza = {
  id: 'yanakaGinza',
  name: 'Yanaka Ginza',
  photo: yanakaGinzaPhoto,
  photoAlt: 'Looking down the Yuyake Dandan steps toward the busy Yanaka Ginza shopping street',
  memory: 'Down the sunset steps to Yanaka Ginza.',
  mapPlace: 'Yanaka Ginza',
  travelMode: 'walking',
  ...BUILD,
  detours: [scai],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'You come into Yanaka Ginza down a short flight of steps called Yuyake Dandan, the “sunset steps”, named for the view at the end of the day.' },
    { text: 'Below is a small shopping street of family-run shops: croquettes, crackers, sweets and pickles. Pick something up and eat it as you walk.' },
    { text: 'There’s an old bathhouse turned art gallery nearby, if you’d like a detour. Otherwise, the shrine is next.' },
  ],
}

const nezuShrine = {
  id: 'nezuShrine',
  name: 'Nezu Shrine',
  photo: nezuShrinePhoto,
  photoAlt: 'A stone torii at Nezu Shrine, with a path of small red torii gates leading away behind it among green shrubs',
  memory: 'Through the red gates at Nezu.',
  mapPlace: 'Nezu Shrine',
  travelMode: 'walking',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'Nezu Shrine is said to be one of the oldest in Tokyo, and it’s one of the loveliest. Beside the main halls, a path of small red torii gates winds up the slope like a tunnel.' },
    { text: 'Walk through the gates slowly. Then look out over the hillside of azaleas, which flowers in spring, and the pond below.' },
    PEAK_CLOSE,
  ],
}

const shinobazu = {
  id: 'shinobazuPond',
  name: 'Shinobazu Pond',
  photo: shinobazuPhoto,
  photoAlt: 'Shinobazu Pond covered in green lotus leaves, with a small temple hall and city towers beyond',
  memory: 'The end of the day by the lotus pond.',
  mapPlace: 'Shinobazu Pond',
  travelMode: 'walking',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. Shinobazu Pond sits at the edge of Ueno Park, and in summer it’s covered in lotus leaves. A small temple hall stands on an island in the middle.' },
    { text: 'Walk out along the causeway to the island, or find a bench by the water. The city is right there, but it feels a long way off.' },
    DINNER,
  ],
}

export default {
  id: 'yanaka',
  aiMade: true,
  name: 'The Tokyo That Stayed',
  location: 'YANAKA · TOKYO, JAPAN',
  photo: nezuShrinePhoto,
  photoAlt: nezuShrine.photoAlt,
  blurb: 'Through the old lanes of Yanaka, down the sunset steps, and through a tunnel of red gates to a lotus pond.',
  tagline: TAGLINE,
  time: '~4 hours',
  walking: 'Easy walking',
  stops: '~5 stops',
  departure: nippori,
  discovery: cemetery,
  build: yanakaGinza,
  peak: nezuShrine,
  afterglow: shinobazu,
  startArea: 'Yanaka, Tokyo, Japan',
  startNote: START_NOTE,
  match: { moods: ['Peaceful', 'Cultural', 'Curious'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 4, effort: 'Easy' },
  why: [
    'Yanaka is the Tokyo that a lot of visitors never find: slow, low-rise and quiet, with more temples than tower blocks. This journey is all on foot, and it takes its time, through a cemetery that feels like a park and a shopping street that feels like a village, to a shrine that’s one of the city’s quiet wonders.',
  ],
  route: [nippori, cemetery, yanakaGinza, nezuShrine, shinobazu],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Yanaka, the old Tokyo, at walking pace. Whatever you took from the day, it’s yours now.',
    summary: 'You started at Nippori, walked the avenue through Yanaka Cemetery, came down the sunset steps to Yanaka Ginza, passed through the red gates of Nezu Shrine, and finished by the lotus leaves on Shinobazu Pond.',
  },
}
