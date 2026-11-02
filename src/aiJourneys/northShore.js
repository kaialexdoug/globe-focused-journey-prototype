// Up the North Shore (Two Harbors to Palisade Head, Minnesota)

import lighthousePhoto from '../assets/journey/north-shore/lighthouse.jpg'
import ednaGPhoto from '../assets/journey/north-shore/edna-g.jpg'
import gooseberryFallsPhoto from '../assets/journey/north-shore/gooseberry-falls.jpg'
import ionasBeachPhoto from '../assets/journey/north-shore/ionas-beach.jpg'
import splitRockPhoto from '../assets/journey/north-shore/split-rock.jpg'
import palisadeHeadPhoto from '../assets/journey/north-shore/palisade-head.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const lighthouse = {
  id: 'twoHarborsLighthouse',
  name: 'Two Harbors Lighthouse',
  photo: lighthousePhoto,
  photoAlt: 'The red brick Two Harbors Lighthouse and keeper’s house, under a clear blue sky',
  memory: 'Where the day began.',
  mapPlace: 'Two Harbors Light Station, Two Harbors, MN',
  travelMode: 'driving',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re on the North Shore.' },
    { text: 'From here, the highway follows Lake Superior northeast, past waterfalls, cliffs and lighthouses, and that’s the whole day. Two Harbors grew up shipping iron ore, and its red brick lighthouse has watched over the harbor for well over a century.' },
    { className: 'narrationClose', text: 'The first stop is just down the hill, by the ore docks.' },
  ],
}

const ednaG = {
  id: 'ednaG',
  name: 'The Edna G',
  photo: ednaGPhoto,
  photoAlt: 'The Edna G, an old red and yellow tugboat, moored in front of the huge timber ore docks at Two Harbors',
  memory: 'The old tug by the ore docks.',
  mapPlace: 'Edna G Tugboat, Two Harbors, MN',
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'The Edna G is an old steam tugboat that spent most of her working life nudging ore boats in and out of this harbor. Now she’s retired here for good.' },
    { text: 'Behind her are the ore docks, long and enormous, where the big lake freighters load up. If one is in, stay and watch for a while.' },
    { className: 'narrationClose', text: 'Back in the car now. The next stop is a river that falls all the way to the lake.' },
  ],
}

const ionasBeach = {
  id: 'ionasBeach',
  name: 'Iona’s Beach',
  photo: ionasBeachPhoto,
  photoAlt: 'A curving beach of pink pebbles at Iona’s Beach, with clear water and a small pine on the shore',
  memory: 'Listening to the stones.',
  teaser: 'A little cove of pink stones that people say sings when the waves pull back. Just up the shore.',
  mapPlace: 'Iona’s Beach, Two Harbors, MN',
  travelMode: 'driving',
  ...DETOUR,
  narration: [
    { text: 'You’ve found Iona’s Beach, a cove where the beach is made of flat pink stones instead of sand.' },
    { text: 'People say the beach sings. Stand near the water and listen as the waves pull back over the stones.' },
    BACK_TO_ROUTE,
  ],
}

const gooseberryFalls = {
  id: 'gooseberryFalls',
  name: 'Gooseberry Falls',
  photo: gooseberryFallsPhoto,
  photoAlt: 'Gooseberry Falls pouring over dark rock ledges, framed by tall evergreens',
  memory: 'On the rocks by Gooseberry Falls.',
  mapPlace: 'Gooseberry Falls State Park',
  travelMode: 'driving',
  ...BUILD,
  detours: [ionasBeach],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'The Gooseberry River comes down to the lake over a series of falls. Paths and bridges lead you to the upper, middle and lower ones.' },
    { text: 'Walk down onto the rocks beside them, and feel the spray. Then follow the river down to where it meets the lake.' },
    { text: 'Further up the shore, there’s a little beach of pink stones, if you’d like a detour. Otherwise, the lighthouse is next.' },
  ],
}

const splitRock = {
  id: 'splitRock',
  name: 'Split Rock Lighthouse',
  photo: splitRockPhoto,
  photoAlt: 'Split Rock Lighthouse on top of its sheer cliff above Lake Superior, with ice on the rocks and a pink dawn sky',
  // The photo is wide and the screen is tall: keep the lighthouse in view,
  // rather than just the sky beside it.
  photoPosition: '28% center',
  memory: 'The lighthouse on the cliff.',
  mapPlace: 'Split Rock Lighthouse',
  travelMode: 'driving',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'Split Rock Lighthouse stands on the edge of a sheer cliff, high over the lake. It was built after a great storm wrecked ships all along this shore.' },
    { text: 'Look at it from the top, then take the path down to the shore below and look up. That’s how the sailors saw it.' },
    PEAK_CLOSE,
  ],
}

const palisadeHead = {
  id: 'palisadeHead',
  name: 'Palisade Head',
  photo: palisadeHeadPhoto,
  photoAlt: 'The view from Palisade Head along tall rock cliffs above the deep blue water of Lake Superior',
  memory: 'The end of the day, high over the lake.',
  mapPlace: 'Palisade Head, MN',
  travelMode: 'driving',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. Palisade Head is a great block of rock towering over the lake, with a narrow road that climbs to the top.' },
    { text: 'Walk out toward the edge, carefully: there are no railings. Then sit on the warm rock, look up the shore, and watch the light go over the biggest lake you’ll ever see.' },
    DINNER,
  ],
}

export default {
  id: 'northShore',
  aiMade: true,
  name: 'Up the North Shore',
  location: 'NORTH SHORE · MINNESOTA, USA',
  // The falls rather than the lighthouse: it's tall, like the screens it
  // fills.
  photo: gooseberryFallsPhoto,
  photoAlt: gooseberryFalls.photoAlt,
  blurb: 'Up the shore of Lake Superior, past an old tugboat and roaring falls, to a lighthouse on a cliff and the end of the day high above the lake.',
  tagline: TAGLINE,
  time: '~6 hours',
  walking: 'Walk + drive',
  stops: '~5 stops',
  departure: lighthouse,
  discovery: ednaG,
  build: gooseberryFalls,
  peak: splitRock,
  afterglow: palisadeHead,
  startArea: 'Two Harbors, Minnesota, USA',
  startNote: START_NOTE,
  match: { moods: ['Adventurous', 'Peaceful', 'Romantic'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 6, effort: 'Easy' },
  why: [
    'The North Shore is one long road beside one enormous lake, and every few miles it gives you something new: a harbor, a waterfall, a lighthouse, a cliff. This journey takes the best stretch of it, and saves the highest view for the end of the day.',
  ],
  route: [lighthouse, ednaG, gooseberryFalls, splitRock, palisadeHead],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was the North Shore, from the harbor to the cliffs. Whatever you took from the day, it’s yours now.',
    summary: 'You started at the Two Harbors Lighthouse, met the Edna G by the ore docks, climbed down beside Gooseberry Falls, stood under Split Rock Lighthouse, and finished on top of Palisade Head.',
  },
}
