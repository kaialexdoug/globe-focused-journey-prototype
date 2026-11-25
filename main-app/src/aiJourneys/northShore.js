// Up the North Shore (Two Harbors to Palisade Head, Minnesota), built the
// same way as the Waseda journey (testJourney.js). Every stop has its exact
// spot (`mapPoint`, from Wikipedia and OpenStreetMap), so it gets the live
// map, and the way to it from the stop before: how far (`distanceMeters`),
// how long (`travelMinutes`) and how hard (`effort`), from Google's routes
// and the heights along them (Open-Meteo), worked out once, in November 2026.
// The first leg is on foot, and the rest by car up Highway 61.
//
// The narration tells one story from stop to stop: the North Shore is old
// lava, and nearly everything on it comes back to what's in the rock, from
// the iron that built Two Harbors to the storm that sank the ore boats and
// the cliff the day ends on. The history was checked against published
// sources (Wikipedia) in November 2026. Stories that are only legends say so.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import lighthousePhoto from '../assets/journey/north-shore/lighthouse.jpg'
import ednaGPhoto from '../assets/journey/north-shore/edna-g.jpg'
import gooseberryFallsPhoto from '../assets/journey/north-shore/gooseberry-falls.jpg'
import ionasBeachPhoto from '../assets/journey/north-shore/ionas-beach.jpg'
import splitRockPhoto from '../assets/journey/north-shore/split-rock.jpg'
import palisadeHeadPhoto from '../assets/journey/north-shore/palisade-head.jpg'

// The spots near the stops.
import breakwaterLightPhoto from '../assets/journey/north-shore/breakwater-light.jpg'
import museum3mPhoto from '../assets/journey/north-shore/3m-museum.jpg'
import depotMuseumPhoto from '../assets/journey/north-shore/depot-museum.jpg'
import tettegouchePhoto from '../assets/journey/north-shore/tettegouche.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const lighthouse = {
  id: 'twoHarborsLighthouse',
  name: 'Two Harbors Lighthouse',
  mapName: 'Two Harbors Light',
  photo: lighthousePhoto,
  photoAlt: 'The red brick Two Harbors Lighthouse and keeper’s house, under a clear blue sky',
  memory: 'Where the day began.',
  mapPlace: 'Two Harbors Light Station, Two Harbors, MN',
  mapPoint: { lat: 47.01398056, lng: -91.66347778 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Two Harbors Breakwater Light',
      note: 'A second little lighthouse, out at the end of the long breakwater that guards the harbor',
      meters: 589,
      photo: breakwaterLightPhoto,
      photoAlt: 'The small Two Harbors Breakwater Light at the end of the breakwater',
      mapPlace: 'Two Harbors Breakwater Light, Two Harbors, MN',
      mapPoint: { lat: 47.010608, lng: -91.669472 },
    },
  ],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re on the North Shore.' },
    { kind: 'heading', text: 'The oldest light in Minnesota' },
    { text: 'This red brick lighthouse was first lit on 14 April 1892, and it’s still working: the oldest lighthouse in Minnesota still in use. Three keepers took turns here to make sure it was lit every night.' },
    { kind: 'heading', text: 'A town built on iron' },
    { text: 'Two Harbors began as a camp for the men building a railroad in 1883, to bring iron ore down from the mines inland. The first load reached the docks in July 1884. Almost everything on this shore, it turns out, comes back to what’s in the rock.' },
    { kind: 'find', text: 'Find the breakwater light: a second little lighthouse at the end of the long breakwater, guarding the mouth of the harbor.' },
    { className: 'narrationClose', text: 'The first stop is just down the hill, by the ore docks.' },
  ],
}

const ednaG = {
  id: 'ednaG',
  name: 'The Edna G',
  mapName: 'Edna G',
  photo: ednaGPhoto,
  photoAlt: 'The Edna G, an old red and yellow tugboat, moored in front of the huge timber ore docks at Two Harbors',
  memory: 'The old tug by the ore docks.',
  mapPlace: 'Edna G Tugboat, Two Harbors, MN',
  mapPoint: { lat: 47.0169, lng: -91.67264444 },
  travelMode: 'walking',
  distanceMeters: 945,
  travelMinutes: 13,
  effort: { level: 'easy', note: 'Flat, along the harbor' },
  stayMinutes: [15, 30],
  nearby: [
    {
      name: '3M Birthplace Museum',
      note: 'The office where 3M was started in 1902, as a mining company',
      meters: 459,
      photo: museum3mPhoto,
      photoAlt: 'The small old office building that is now the 3M Birthplace Museum in Two Harbors',
      mapPlace: '3M Museum, Two Harbors, MN',
      mapPoint: { lat: 47.020917, lng: -91.67125 },
    },
    {
      name: 'Depot Museum',
      note: 'The old railroad station, now the town’s history museum, with the iron range railroad’s story',
      meters: 292,
      photo: depotMuseumPhoto,
      photoAlt: 'The old brick railroad depot at Two Harbors',
      mapPlace: 'Lake County Historical Depot Museum, Two Harbors, MN',
      mapPoint: { lat: 47.018889, lng: -91.670139 },
    },
  ],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The last of the steam tugs' },
    { text: 'The Edna G was built in 1896 for the Duluth and Iron Range Railroad, the line that built this town, to nudge the ore boats in and out of the harbor. When she retired in 1981, she was the last coal-fired steam tug working anywhere on the Great Lakes.' },
    { kind: 'heading', text: 'Digging for the wrong thing' },
    { text: 'Just up the street, in 1902, five businessmen started a mining company, sure the North Shore was full of corundum, a hard mineral for grinding. The rock turned out to be anorthosite, worth nothing. So they turned to making sandpaper instead, and the Minnesota Mining and Manufacturing Company became 3M.' },
    { kind: 'find', text: 'Find the ore docks behind the Edna G. If a freighter’s in, you can watch it being loaded with iron, as boats have been here since 1884.' },
    { className: 'narrationClose', text: 'Back in the car now. Next, a river that falls all the way to the lake.' },
  ],
}

const ionasBeach = {
  id: 'ionasBeach',
  name: 'Iona’s Beach',
  photo: ionasBeachPhoto,
  photoAlt: 'A curving beach of pink pebbles at Iona’s Beach, with clear water and a small pine on the shore',
  memory: 'Listening to the stones.',
  teaser: 'A little cove of pink stones that people say sings when the waves pull back. Just up the shore.',
  mapPlace: 'Iona’s Beach Scientific and Natural Area, MN',
  mapPoint: { lat: 47.1670262, lng: -91.4216326 },
  travelMode: 'driving',
  // From Gooseberry Falls. Driven, so the time it adds is there and back.
  distanceMeters: 5615,
  travelMinutes: 6,
  effort: { level: 'easy', note: 'A few minutes further up Highway 61, then a short path down to the beach' },
  stayMinutes: [20, 30],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'A beach of pink stone' },
    { text: 'Instead of sand, Iona’s Beach is made of flat pink stones, rhyolite, the same old lava as the cliff where the day ends, broken off by the waves and rounded smooth.' },
    { kind: 'heading', text: 'The singing beach' },
    { text: 'People say the beach sings. As each wave pulls back, the stones tumble against each other with a sound like wind chimes. It’s a protected natural area, so the stones stay where they are.' },
    { kind: 'find', text: 'Stand near the water, close your eyes, and listen as a wave pulls back over the stones.' },
    BACK_TO_ROUTE,
  ],
}

const gooseberryFalls = {
  id: 'gooseberryFalls',
  name: 'Gooseberry Falls',
  photo: gooseberryFallsPhoto,
  photoAlt: 'Gooseberry Falls pouring over dark rock ledges, framed by tall evergreens',
  memory: 'On the rocks by Gooseberry Falls.',
  mapPlace: 'Gooseberry Falls State Park Visitor Center, MN',
  mapPoint: { lat: 47.1407822, lng: -91.4697643 },
  travelMode: 'driving',
  distanceMeters: 22307,
  travelMinutes: 20,
  effort: { level: 'easy', note: 'Up the shore on Highway 61, then short paths to the falls' },
  stayMinutes: [45, 60],
  ...BUILD,
  detours: [ionasBeach],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'Falls cut through lava' },
    { text: 'The Gooseberry River comes down to the lake over the Upper, Middle and Lower Falls, cutting down through layers of old lava. The softer layers were full of little bubbles, which filled with minerals over millions of years. That’s where Lake Superior agates come from, and you can still find them on the beach where the river meets the lake.' },
    { kind: 'heading', text: 'Built by hand' },
    { text: 'The stone buildings, walls and paths were built by the young men of the Civilian Conservation Corps, between 1934 and 1941, a Depression-era program that put people to work building parks. The park itself opened in 1937.' },
    { kind: 'find', text: 'Down at the river mouth, look for an agate among the pebbles: a stone with fine bands of red and orange, like the rings of a tree.' },
    { className: 'narrationClose', text: 'Further up the shore there’s a little beach of pink stones, if you’d like a detour. Otherwise, the lighthouse is next.' },
  ],
}

const splitRock = {
  id: 'splitRock',
  name: 'Split Rock Lighthouse',
  mapName: 'Split Rock',
  photo: splitRockPhoto,
  photoAlt: 'Split Rock Lighthouse on top of its sheer cliff above Lake Superior, with ice on the rocks and a pink dawn sky',
  // The photo is wide and the screen is tall: keep the lighthouse in view,
  // rather than just the sky beside it.
  photoPosition: '28% center',
  memory: 'The lighthouse on the cliff.',
  mapPlace: 'Split Rock Lighthouse',
  mapPoint: { lat: 47.2000961, lng: -91.3670173 },
  travelMode: 'driving',
  distanceMeters: 12332,
  travelMinutes: 12,
  effort: { level: 'easy', note: 'Up Highway 61, past the turn for Iona’s Beach' },
  stayMinutes: [45, 60],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'After the storm' },
    { text: 'On 27 and 28 November 1905, the Mataafa Storm wrecked or damaged 29 ships on Lake Superior and killed 36 sailors. The Mataafa itself was carrying iron ore out of Duluth, and the barge Madeira sank just up the shore from here. This lighthouse was built because of that storm, and first lit on 31 July 1910.' },
    { kind: 'heading', text: 'A lens floating on mercury' },
    { text: 'The great glass lens at the top was made in Paris. It floats on a bath of liquid mercury, so it turns almost without friction, driven by clockwork: weights that ran down the middle of the tower and had to be cranked back up by hand.' },
    { kind: 'find', text: 'Take the path down to the shore below and look up at the lighthouse on its cliff: that’s how the sailors saw it.' },
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
  mapPoint: { lat: 47.3205568, lng: -91.2105902 },
  travelMode: 'driving',
  distanceMeters: 19226,
  travelMinutes: 19,
  effort: { level: 'easy', note: 'Up Highway 61, then a narrow, steep road to the top' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Tettegouche State Park',
      note: 'Just up the shore: the cliff trail out to Shovel Point, and the High Falls of the Baptism River',
      meters: 1895,
      photo: tettegouchePhoto,
      photoAlt: 'The High Falls of the Baptism River, pouring between rock walls in Tettegouche State Park',
      mapPlace: 'Tettegouche State Park, MN',
      mapPoint: { lat: 47.33583333, lng: -91.19944444 },
    },
  ],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'A billion years of lava' },
    { text: 'Palisade Head is the end of a lava flow some 200 feet thick, from about 1.1 billion years ago. The rock, rhyolite, like the pink stones of Iona’s Beach, is so hard it outlasted everything around it, which is why it stands up over the lake, 335 feet at its highest.' },
    { kind: 'heading', text: 'Mind the edge' },
    { text: 'There are no railings here, just the rock and a sheer drop to the water. Climbers come from all over to scale these cliffs from below, so stay well back from the edge and leave it to them.' },
    { kind: 'find', text: 'Look northeast along the shore to Shovel Point, the next headland, where the cliffs carry on.' },
    DINNER,
  ],
}

export default {
  id: 'northShore',
  aiMade: true,
  name: 'Up the North Shore',
  location: 'NORTH SHORE · MINNESOTA, USA',
  city: 'Two Harbors',
  // The falls rather than the lighthouse: it's tall, like the screens it
  // fills.
  photo: gooseberryFallsPhoto,
  photoAlt: gooseberryFalls.photoAlt,
  blurb: 'Up the shore of Lake Superior, past roaring falls to a lighthouse on a cliff.',
  walking: 'Walk + drive',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Scenic', 'Nature', 'Adventure', 'Historical'],
  departure: lighthouse,
  discovery: ednaG,
  build: gooseberryFalls,
  peak: splitRock,
  afterglow: palisadeHead,
  startArea: 'Two Harbors, Minnesota, USA',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Early fall',
    seasonNote: 'For the fall colors along the shore, from late September into early October.',
    timeOfDay: 'Starting in the morning',
    timeNote: 'It’s a long drive up the shore, with a lot to stop for.',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against the Minnesota DNR's state
  // park permit and Gooseberry Falls pages, Minnesota law on Palisade Head,
  // and the Minnesota Historical Society's Split Rock pages.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Warm layers and a rain jacket: the weather by Lake Superior changes fast, and it’s cool even in summer.',
      'Shoes with a good grip, for wet rocks by the falls and bare rock at Palisade Head.',
      'Insect repellent in June and July, when the biting flies are out.',
      'Water and snacks: there are long stretches between towns.',
    ],
    costs: [
      { lead: 'State park vehicle permit', text: '$7 for a day, or $35 for a year. You need one for most of the parks along the way.' },
      { lead: 'Gooseberry Falls', text: 'No permit needed to park at the visitor center by the falls, only to drive on to the lakeshore and picnic areas.' },
      { lead: 'Split Rock Lighthouse', text: 'Run by the Minnesota Historical Society, with its own admission, which changes with the season. Parking there is free during its hours.' },
      'Two Harbors’ lighthouse, the Edna G and the town’s museums are run by local groups, with small fees for tours.',
    ],
    getting: [
      'You’ll need a car: the walk drives up Highway 61 along the shore.',
      'It starts at the lighthouse in Two Harbors, about 45 minutes up the shore from Duluth.',
      'The walk ends at Palisade Head, about 50 km up the shore from where it starts: about 40 minutes’ drive back.',
      'The road up Palisade Head is narrow and steep. A permit isn’t needed there if you stay under an hour.',
    ],
    access: [
      'Short paths at Gooseberry Falls lead from the visitor center to the falls, with steps down to the river.',
      'At Split Rock, there are stairs up the lighthouse tower, and a long flight of steps down to the shore.',
      'Palisade Head is bare, uneven rock, with sheer drops: not suitable for a wheelchair or stroller.',
    ],
    restrictions: [
      { lead: 'Palisade Head', text: 'There are no railings at the cliff edges. Keep children and dogs close.' },
      { lead: 'Split Rock Lighthouse', text: 'Hours and tours change with the season. A state park permit is needed when the historic site is closed.' },
      'Many of the smaller museums and tours along the shore only open from late spring to fall.',
    ],
    tips: [
      'Every November 10, Split Rock lights its beacon in memory of the Edmund Fitzgerald, lost with all 29 crew in 1975.',
      'The fall colors along the shore are usually at their best from late September to early October.',
      'Gooseberry Falls gets very busy on summer weekends: go early in the morning.',
      'At Iona’s Beach, listen to the waves rattle the flat pink stones.',
    ],
  },
  match: {
    moods: { Peaceful: 75, Adventurous: 90, Romantic: 70, Curious: 65, Playful: 45, Cultural: 35 },
    with: { Solo: 75, Couple: 85, Family: 80, 'Friends / Group': 85 },
    preferences: {
      'Pet friendly': 70, 'Avoid alcohol': 95, 'More nature': 95, 'Food stops': 25,
      Coastal: 95, 'More urban': 5, 'Hiking involved': 45, 'Budget friendly': 70,
    },
  },
  description: [
    'The North Shore is made of ancient lava, and almost everything along it comes back to what’s in the rock: the iron that built Two Harbors, the mineral 3M came looking for and never found, the agates in the rivers, and the cliffs the ore boats had to get past in the storms.',
    'This journey follows the shore northeast from the oldest working lighthouse in Minnesota, past an old steam tug and a river that falls to the lake, to the lighthouse built after the worst storm of all, and ends high on a cliff of billion-year-old rock.',
  ],
  // Why It's Cool on the journey's page (JourneyPage.jsx): what you'll
  // discover, why it matters, and what it feels like, a sentence each.
  whyCool: {
    discovery: 'A coast made of ancient lava, where almost everything comes back to what’s in the rock.',
    significance: 'The iron that built Two Harbors, the company that came looking for the wrong mineral and became 3M, and the storm that gave Split Rock its lighthouse.',
    feeling: 'Wild and dramatic: waterfalls and lighthouses, ending high on a cliff with nothing but rock and water below.',
  },
  route: [lighthouse, ednaG, gooseberryFalls, splitRock, palisadeHead],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was the North Shore, from the harbor to the cliffs. Whatever you took from the day, it’s yours now.',
    summary: 'You started at the Two Harbors Lighthouse, met the Edna G by the ore docks, climbed down beside Gooseberry Falls, stood under Split Rock Lighthouse, and finished on top of Palisade Head.',
  },
}
