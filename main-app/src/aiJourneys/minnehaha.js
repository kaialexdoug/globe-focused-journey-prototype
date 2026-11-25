// The Falls in the City (Minnehaha Park, Minneapolis), built the same way as
// the Waseda journey (testJourney.js). Every stop has its exact spot
// (`mapPoint`, from Wikipedia and OpenStreetMap), so it gets the live map,
// and the walk to it from the stop before: how far (`distanceMeters`), how
// long (`travelMinutes`) and how hard (`effort`), from Google's walking
// routes and the heights along them (Open-Meteo), worked out once, in
// November 2026.
//
// The narration tells one story from stop to stop: a waterfall with a Dakota
// name, made famous by a poem whose poet never saw it, the visitors who came
// by train, a showman's copy of the poet's house, and the glen the falls
// have carved on their way back from the river. The history was checked
// against published sources (Wikipedia) in November 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import parkPhoto from '../assets/journey/minnehaha/park.jpg'
import depotPhoto from '../assets/journey/minnehaha/depot.jpg'
import longfellowHousePhoto from '../assets/journey/minnehaha/longfellow-house.jpg'
import statuePhoto from '../assets/journey/minnehaha/statue.jpg'
import fallsPhoto from '../assets/journey/minnehaha/falls.jpg'
import glenPhoto from '../assets/journey/minnehaha/glen.jpg'

// The spots near the stops.
import stevensHousePhoto from '../assets/journey/minnehaha/stevens-house.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const park = {
  id: 'minnehahaPark',
  name: 'Minnehaha Park',
  photo: parkPhoto,
  photoAlt: 'The words Minnehaha Park on the white wall of a park building, with autumn leaves on the path',
  memory: 'Where the day began.',
  mapPlace: '50th Street/Minnehaha Park Station',
  mapPoint: { lat: 44.9123, lng: -93.2101 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re at Minnehaha Park.' },
    { kind: 'heading', text: 'Curling water' },
    { text: 'The name is Dakota, from mni, water, and ȟaȟa, curling: the falls and the creek were named long before the city grew up around them. Early soldiers and settlers called them Brown’s Falls, or Little Falls, but the Dakota name is the one that stuck.' },
    { kind: 'heading', text: 'A poem’s fame' },
    { text: 'In 1855, Henry Wadsworth Longfellow published The Song of Hiawatha, about an Ojibwe hero and his love for Minnehaha, a Dakota woman. It made these falls famous across the world. Longfellow himself never came to see them.' },
    { kind: 'find', text: 'Listen for the falls as you walk into the park. You’ll hear them before you see them.' },
    { className: 'narrationClose', text: 'The first stop is an old railroad station, a few minutes’ walk into the park.' },
  ],
}

const depot = {
  id: 'minnehahaDepot',
  name: 'Minnehaha Depot',
  photo: depotPhoto,
  photoAlt: 'The historical marker for the Minnehaha Depot, telling the story of the little station called “the Princess”',
  memory: 'The little station called the Princess.',
  mapPlace: 'Minnehaha Depot',
  mapPoint: { lat: 44.914168, lng: -93.2113248 },
  travelMode: 'walking',
  distanceMeters: 294,
  travelMinutes: 4,
  effort: { level: 'easy', note: 'Flat, into the park' },
  stayMinutes: [10, 15],
  nearby: [
    {
      name: 'John H. Stevens House',
      note: 'The first authorized house on the west bank of what became Minneapolis, from 1849, carried here in 1896 by thousands of schoolchildren and ten horses',
      meters: 130,
      photo: stevensHousePhoto,
      photoAlt: 'The John H. Stevens House, a small white wooden house with green shutters',
      mapPlace: 'John H. Stevens House, Minnehaha Park, Minneapolis',
      mapPoint: { lat: 44.91388889, lng: -93.20972222 },
    },
  ],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The Princess' },
    { text: 'The Milwaukee Road built this little station in 1875 to bring visitors out to the falls. With its fine wooden trim, people called it the Princess, and the name stuck to it ever after.' },
    { kind: 'heading', text: 'A house carried by children' },
    { text: 'Just along from here is a house with an even better journey. The John H. Stevens House, from 1849, was the first authorized house on the west bank of what became Minneapolis. In 1896 it was moved here, pulled by ten horses and thousands of schoolchildren taking turns.' },
    { kind: 'find', text: 'Find the depot’s deep, overhanging roof and its fancy wooden trim, the details that earned it its nickname.' },
    { className: 'narrationClose', text: 'Next, a house built to look like the poet’s own, a short walk away.' },
  ],
}

const statue = {
  id: 'hiawathaStatue',
  name: 'Hiawatha and Minnehaha',
  mapName: 'Hiawatha statue',
  photo: statuePhoto,
  photoAlt: 'A bronze statue of Hiawatha carrying Minnehaha, beside the creek among red and gold autumn trees',
  memory: 'The statue by the creek.',
  teaser: 'A statue of the poem’s two lovers, by the creek just above the falls. A few steps off the path.',
  mapPlace: 'Hiawatha and Minnehaha Statue, Minneapolis',
  mapPoint: { lat: 44.9155, lng: -93.2117 },
  travelMode: 'walking',
  // From the Longfellow House. It's just off the path to the falls, so the
  // extra walking is only the few steps there and back.
  distanceMeters: 267,
  travelMinutes: 4,
  extraMeters: 112,
  effort: { level: 'easy', note: 'Flat, along the creek' },
  stayMinutes: [10, 15],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'The lovers of the poem' },
    { text: 'Here they are, the two from Longfellow’s poem: Hiawatha, an Ojibwe hero, carrying Minnehaha across the water. In the poem she dies in a hard winter, and Hiawatha mourns her.' },
    { kind: 'heading', text: 'Paid for by children' },
    { text: 'Like the Stevens House, this statue owes a lot to schoolchildren. The sculptor, Jacob Fjelde, made it in plaster, and Minnesota children gave small donations toward it. It was finally cast in bronze and unveiled here in 1912, while local children sang and recited parts of the poem.' },
    { kind: 'find', text: 'Look at how Hiawatha holds Minnehaha, and find which way they’re facing: toward the falls, or away?' },
    BACK_TO_ROUTE,
  ],
}

const longfellowHouse = {
  id: 'longfellowHouse',
  name: 'Longfellow House',
  photo: longfellowHousePhoto,
  photoAlt: 'The Longfellow House, a yellow two-storey house with a white picket fence and tall evergreens either side',
  memory: 'A copy of the poet’s house.',
  mapPlace: 'Longfellow House, Minnehaha Park, Minneapolis',
  mapPoint: { lat: 44.915972, lng: -93.21375 },
  travelMode: 'walking',
  distanceMeters: 370,
  travelMinutes: 5,
  effort: { level: 'easy', note: 'Flat, through the park' },
  stayMinutes: [15, 20],
  ...BUILD,
  detours: [statue],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'A showman’s zoo' },
    { text: 'Robert “Fish” Jones was a Minneapolis businessman and showman who collected animals. In 1906 he opened a zoo here, with zebras, monkeys and a polar bear said to have come from Norway, and he built himself this house, styled after Longfellow’s own home in Cambridge, Massachusetts.' },
    { kind: 'heading', text: 'The guest who never came' },
    { text: 'In 1908, Alice Longfellow, the poet’s daughter, wrote to say she hoped to visit the gardens one day. She never did, just like her father. The zoo is long gone, but the house still stands.' },
    { kind: 'find', text: 'Find the white picket fence, and imagine zebras grazing just beyond it.' },
    { className: 'narrationClose', text: 'There’s a statue of the poem’s lovers by the creek, if you’d like a detour. Otherwise, follow the sound of the water.' },
  ],
}

const falls = {
  id: 'minnehahaFalls',
  name: 'Minnehaha Falls',
  photo: fallsPhoto,
  photoAlt: 'Minnehaha Falls pouring over a limestone ledge into a green glen, with people on the path beside it',
  memory: 'At the foot of the falls.',
  mapPlace: 'Minnehaha Falls',
  mapPoint: { lat: 44.9153316, lng: -93.210983 },
  travelMode: 'walking',
  distanceMeters: 323,
  travelMinutes: 4,
  effort: { level: 'easy', note: 'Flat, along the creek to the top of the falls' },
  stayMinutes: [20, 30],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'Falls on the move' },
    { text: 'Ten thousand years ago, at the end of the last ice age, these falls poured straight into the Mississippi. Since then the water has worn its way back, several thousand feet upstream, carving out the glen below you as it went.' },
    { kind: 'heading', text: 'Frozen in winter' },
    { text: 'In winter the falls freeze into a wall of ice, and people come out to see them all year round: in 2024, the park had an estimated 2.3 million visits.' },
    { kind: 'find', text: 'Take the steps down into the glen and stand at the foot of the falls. Find the spot where the spray reaches you.' },
    PEAK_CLOSE,
  ],
}

const glen = {
  id: 'minnehahaGlen',
  name: 'Minnehaha Glen',
  photo: glenPhoto,
  photoAlt: 'Minnehaha Creek running through a wooded glen under an old stone bridge, among autumn trees',
  memory: 'Down the glen toward the river.',
  // Where the creek meets the Mississippi, at the end of the glen.
  mapPlace: 'Minnehaha Creek, Minnehaha Regional Park, Minneapolis',
  mapPoint: { lat: 44.9088543, lng: -93.2004996 },
  travelMode: 'walking',
  distanceMeters: 1253,
  travelMinutes: 17,
  effort: { level: 'moderate', note: 'Down steps into the glen, then along the creek to the river. Coming back means climbing out again' },
  stayMinutes: [30, 60],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The path the falls carved' },
    { text: 'This glen is the trail the falls have left behind them, all the way from the river. Minnehaha Creek has come 22 miles from Lake Minnetonka to get here, and this is the last stretch before it joins the Mississippi.' },
    { kind: 'heading', text: 'An old mill dam' },
    { text: 'People tried to put the creek to work, too. In 1853 or 1854 a mill dam of stone and earth was built down here, and what’s left of it is still beside the creek.' },
    { kind: 'find', text: 'Find the remains of the old mill dam beside the creek. Then follow the water to where it meets the Mississippi.' },
    DINNER,
  ],
}

export default {
  id: 'minnehaha',
  aiMade: true,
  name: 'The Falls in the City',
  location: 'MINNEHAHA FALLS · MINNESOTA, USA',
  city: 'Minneapolis',
  photo: fallsPhoto,
  photoAlt: falls.photoAlt,
  blurb: 'A waterfall in the middle of the city, and the poem that made it famous.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Nature', 'Scenic', 'Historical'],
  departure: park,
  discovery: depot,
  build: longfellowHouse,
  peak: falls,
  afterglow: glen,
  startArea: 'Minneapolis, Minnesota, USA',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Spring',
    seasonNote: 'When the falls run fullest, after the snow melts. In a cold winter they freeze solid, which is worth a trip too.',
    timeOfDay: 'During daylight hours',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against Metro Transit's fares and
  // the Minneapolis Park Board's information on the park.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Shoes with a good grip, for the steps down into the glen and the creek path.',
      'A warm layer in spring and fall, and proper winter gear if you go to see the frozen falls.',
      'A light rail ticket from the machine at the station, or the Transit app.',
      'Insect repellent in summer, down by the creek.',
    ],
    costs: [
      'The park, the falls, the Longfellow House grounds and the statue are free.',
      { lead: 'Light rail', text: '$2 a ride ($1 for seniors and youth), all day.' },
      'Parking in the park’s lots is paid, at meters.',
    ],
    getting: [
      'Start at 50th Street/Minnehaha Park Station, on the Blue Line light rail, at the edge of the park.',
      'The walk ends in Minnehaha Glen, about 1 km from the station, so it’s a short walk back.',
      'If you drive, the lots fill on summer weekends: come early.',
    ],
    access: [
      'Flat and paved through the park to the top of the falls, which you can see from above.',
      'The way down into the glen is by steps, and you have to climb back out. The path along the creek is uneven and can be muddy.',
      'There are restrooms in the park.',
    ],
    restrictions: [
      { lead: 'Minnehaha Depot and the Stevens House', text: 'Only open on some summer days: check before you go if you want to see inside.' },
      'Stay on the paths around the falls: the rocks are slippery, and the edges are steep.',
    ],
    tips: [
      'Sea Salt Eatery, by the falls, is a local favorite in summer, with long lines at weekends. It closes for the winter.',
      'The falls are at their fullest in spring. In a dry late summer they can slow to a trickle.',
      'In a cold winter, the falls freeze into a wall of ice, worth the trip on its own.',
    ],
  },
  match: {
    moods: { Peaceful: 80, Adventurous: 45, Romantic: 65, Curious: 50, Playful: 70, Cultural: 45 },
    with: { Solo: 70, Couple: 80, Family: 95, 'Friends / Group': 75 },
    preferences: {
      'Pet friendly': 85, 'Avoid alcohol': 90, 'More nature': 80, 'Food stops': 40,
      Coastal: 5, 'More urban': 45, 'Hiking involved': 35, 'Budget friendly': 95,
    },
  },
  description: [
    'Minnehaha Falls has a Dakota name and a poet’s fame: Longfellow made it known around the world in The Song of Hiawatha, without ever coming to see it. Ever since, people have come out to the falls by train, by streetcar and on foot, and the park around them has gathered stories of its own.',
    'This journey walks you from a little station called the Princess, past a pioneer house carried here by schoolchildren and a showman’s copy of the poet’s home, to the falls themselves, then down the glen they’ve carved all the way to the Mississippi.',
  ],
  // Why It's Cool on the journey's page (JourneyPage.jsx): what you'll
  // discover, why it matters, and what it feels like, a sentence each.
  whyCool: {
    discovery: 'A waterfall in the middle of the city, made famous by a poet who never came to see it.',
    significance: 'A Dakota name, Longfellow’s Song of Hiawatha, and a glen carved by falls that have been moving upstream since the ice age.',
    feeling: 'Fresh and playful: the roar of the falls, quirky local stories, and a shady walk down to the big river.',
  },
  route: [park, depot, longfellowHouse, falls, glen],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Minnehaha, a waterfall and a poem in the middle of the city. Whatever you took from the day, it’s yours now.',
    summary: 'You started at Minnehaha Park, found the little depot called the Princess, visited the Longfellow House, stood at the foot of Minnehaha Falls, and finished walking down the glen.',
  },
}
