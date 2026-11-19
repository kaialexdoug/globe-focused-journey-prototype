// Where the City Began (St. Anthony Falls, Minneapolis), built the same way
// as the Waseda journey (testJourney.js). Every stop has its exact spot
// (`mapPoint`, from Wikipedia and OpenStreetMap), so it gets the live map,
// and the walk to it from the stop before: how far (`distanceMeters`), how
// long (`travelMinutes`) and how hard (`effort`), from Google's walking
// routes and the heights along them (Open-Meteo), worked out once, in
// November 2026.
//
// The narration tells one story from stop to stop: the only waterfall on the
// Mississippi, the flour mills it powered, the rivals who built the biggest
// in the world on either bank, and the railroad baron's bridge between them.
// The history was checked against published sources (Wikipedia) in November
// 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import stadiumPhoto from '../assets/journey/minneapolis/stadium.jpg'
import goldMedalParkPhoto from '../assets/journey/minneapolis/gold-medal-park.jpg'
import millCityPhoto from '../assets/journey/minneapolis/mill-city.jpg'
import guthriePhoto from '../assets/journey/minneapolis/guthrie.jpg'
import stoneArchBridgePhoto from '../assets/journey/minneapolis/stone-arch-bridge.jpg'
import stAnthonyMainPhoto from '../assets/journey/minneapolis/st-anthony-main.jpg'

// The spots near the stops.
import millRuinsPhoto from '../assets/journey/minneapolis/mill-ruins.jpg'
import pillsburyPhoto from '../assets/journey/minneapolis/pillsbury-a-mill.jpg'
import nicolletIslandPhoto from '../assets/journey/minneapolis/nicollet-island.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const stadium = {
  id: 'usBankStadium',
  name: 'U.S. Bank Stadium',
  photo: stadiumPhoto,
  photoAlt: 'U.S. Bank Stadium, a huge angular building of dark panels and glass, behind a wide green lawn',
  memory: 'Where the day began.',
  mapPlace: 'U.S. Bank Stadium Station',
  mapPoint: { lat: 44.975, lng: -93.26 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Minneapolis.' },
    { kind: 'heading', text: 'The whirlpool' },
    { text: 'The city grew up around a waterfall, a few minutes’ walk north of here. The Dakota called it Owámniyomni, the whirlpool. In 1680 a French-speaking friar, Louis Hennepin, wrote about it for the world and named it the Falls of Saint Anthony, after his patron saint.' },
    { kind: 'heading', text: 'Mill City' },
    { text: 'Those falls turned the wheels of the mills. For a while in the 1800s, Minneapolis was the lumber and flour milling capital of the world, and it earned the nickname it still goes by: Mill City.' },
    { kind: 'find', text: 'As you walk toward the river, look for the giant Gold Medal Flour sign on top of an old grain elevator. You’ll be standing under it soon.' },
    { className: 'narrationClose', text: 'The first stop is a park with a hill you can climb, about fifteen minutes away. Tap “I’m Here” when you reach it.' },
  ],
}

const goldMedalPark = {
  id: 'goldMedalPark',
  name: 'Gold Medal Park',
  photo: goldMedalParkPhoto,
  photoAlt: 'The grassy spiral hill in Gold Medal Park, with the dark blue Guthrie Theater rising behind it',
  memory: 'Up the spiral hill.',
  mapPlace: 'Gold Medal Park, Minneapolis',
  mapPoint: { lat: 44.9775, lng: -93.253056 },
  travelMode: 'walking',
  distanceMeters: 989,
  travelMinutes: 15,
  effort: { level: 'easy', note: 'Flat, through the Downtown East streets' },
  stayMinutes: [15, 30],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Named for a flour' },
    { text: 'The park takes its name from Gold Medal flour, the brand on that big sign by the river. It belonged to the Washburn-Crosby company, later General Mills, whose old mill is this walk’s next stop. Its hill, 32 feet high, was inspired by the ancient Native American mounds found all over Minnesota.' },
    { kind: 'heading', text: 'Three hundred trees' },
    { text: 'All of it is new: the lawn, the spiral path and some three hundred trees, some of them brought in fully grown from as far away as New Jersey.' },
    { kind: 'find', text: 'Walk the spiral path to the top of the mound, and find the Gold Medal Flour sign over the rooftops toward the river.' },
    { className: 'narrationClose', text: 'The next stop is under that sign, about seven minutes away.' },
  ],
}

const guthrie = {
  id: 'guthrieEndlessBridge',
  name: 'The Guthrie’s Endless Bridge',
  mapName: 'Endless Bridge',
  photo: guthriePhoto,
  photoAlt: 'The Guthrie Theater’s Endless Bridge, a long blue walkway reaching out from the side of the building into the sky',
  memory: 'Out on the Endless Bridge.',
  teaser: 'A walkway that reaches out from the side of a theater toward the river. Right next door.',
  mapPlace: 'Guthrie Theater, Minneapolis',
  mapPoint: { lat: 44.97805556, lng: -93.25527778 },
  travelMode: 'walking',
  // From the Mill City Museum. On to the Stone Arch Bridge after, it's 952 m,
  // so taking it adds 450 m of walking to going straight there.
  distanceMeters: 176,
  travelMinutes: 2,
  extraMeters: 450,
  effort: { level: 'easy', note: 'Next door, then up inside the theater' },
  stayMinutes: [15, 20],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'A bridge to nowhere' },
    { text: 'The Guthrie Theater moved to the riverfront in 2006, into this dark blue building by the French architect Jean Nouvel. Its Endless Bridge reaches 178 feet out from the building toward the river, held up only at one end.' },
    { kind: 'heading', text: 'Open to anyone' },
    { text: 'You don’t need a ticket to walk out on it while the building’s open. From the end, the whole Mill District is laid out in front of you: the ruins, the falls and the bridge of stone arches you’re heading to next.' },
    { kind: 'find', text: 'Walk to the very end of the Endless Bridge and find the Stone Arch Bridge, curving across the river.' },
    BACK_TO_ROUTE,
  ],
}

const millCity = {
  id: 'millCityMuseum',
  name: 'Mill City Museum',
  mapName: 'Mill City',
  photo: millCityPhoto,
  photoAlt: 'Mill City Museum, a modern glass building set inside the tall stone ruins of an old flour mill',
  memory: 'Inside the ruins of the old mill.',
  mapPlace: 'Mill City Museum',
  mapPoint: { lat: 44.9787954, lng: -93.2572281 },
  travelMode: 'walking',
  distanceMeters: 516,
  travelMinutes: 7,
  effort: { level: 'easy', note: 'Flat, gently down toward the river' },
  stayMinutes: [45, 60],
  nearby: [
    {
      name: 'Mill Ruins Park',
      note: 'The old mill canals and walls, dug out of the riverbank by archaeologists',
      meters: 167,
      photo: millRuinsPhoto,
      photoAlt: 'The stone ruins of old mill walls and channels in Mill Ruins Park',
      mapPlace: 'Mill Ruins Park, Minneapolis',
      mapPoint: { lat: 44.98035833, lng: -93.25782222 },
    },
  ],
  ...BUILD,
  detours: [guthrie],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'The biggest mill in the world' },
    { text: 'These walls are what’s left of the Washburn A Mill, the largest flour mill in the world when it was finished in 1874. On 2 May 1878, a spark set off the flour dust in the air inside, and the explosion destroyed the mill and killed fourteen workers. The fire that followed killed four more and burned down five other mills.' },
    { kind: 'heading', text: 'Built again' },
    { text: 'By 1880 a new Washburn A Mill stood here, the largest in the world once more, until a rival opened across the river the following year. It closed in 1965, a fire nearly destroyed it in 1991, and in 2003 the museum opened inside the ruins.' },
    { kind: 'find', text: 'Inside, take a ride in the Flour Tower, an old freight elevator that carries you up through the floors of a working mill.' },
    { className: 'narrationClose', text: 'The theater next door has a bridge out over the river, if you’d like a detour. Otherwise, head for the falls.' },
  ],
}

const stoneArchBridge = {
  id: 'stoneArchBridge',
  name: 'Stone Arch Bridge',
  photo: stoneArchBridgePhoto,
  photoAlt: 'The long Stone Arch Bridge curving across the blue Mississippi, with the Minneapolis skyline beyond',
  memory: 'Across the river on the Stone Arch Bridge.',
  mapPlace: 'Stone Arch Bridge',
  mapPoint: { lat: 44.98083333, lng: -93.25361111 },
  travelMode: 'walking',
  distanceMeters: 678,
  travelMinutes: 9,
  effort: { level: 'easy', note: 'Flat, along the riverbank to the bridge' },
  stayMinutes: [20, 30],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'Hill’s Folly' },
    { text: 'James J. Hill, the railroad baron, built this bridge in 1883 for his trains, at a cost of $650,000. People called it Hill’s Folly, until it proved its worth. It’s the only bridge of stone arches on the whole Mississippi.' },
    { kind: 'heading', text: 'Holding back the falls' },
    { text: 'From here you can see the falls that started it all. The water was eating its way upstream, so in 1880 the face of the falls was covered with a sloping apron of timber to hold it in place. In the 1950s it was rebuilt in concrete, and that smooth slope is most of what you see today.' },
    { kind: 'find', text: 'Halfway across, look upriver and find the falls: the smooth concrete apron, with the water sheeting over it.' },
    PEAK_CLOSE,
  ],
}

const stAnthonyMain = {
  id: 'stAnthonyMain',
  name: 'St. Anthony Main',
  photo: stAnthonyMainPhoto,
  photoAlt: 'An old brick building lit up at night on St. Anthony Main, with a glowing neon sign beyond',
  memory: 'The evening on the old riverfront.',
  mapPlace: 'St. Anthony Main, Minneapolis',
  mapPoint: { lat: 44.98474, lng: -93.255421 },
  travelMode: 'walking',
  distanceMeters: 803,
  travelMinutes: 11,
  effort: { level: 'easy', note: 'Across the bridge, then a gentle rise up the east bank' },
  stayMinutes: [30, 60],
  nearby: [
    {
      name: 'Pillsbury A-Mill',
      note: 'The rival mill, the largest in the world for forty years, now artists’ lofts',
      meters: 234,
      photo: pillsburyPhoto,
      photoAlt: 'The Pillsbury A-Mill, a tall stone mill building by the river',
      mapPlace: 'Pillsbury A-Mill, Minneapolis',
      mapPoint: { lat: 44.98393889, lng: -93.25266389 },
    },
    {
      name: 'Nicollet Island',
      note: 'A small island in the river, with old houses and an old stone inn',
      meters: 682,
      photo: nicolletIslandPhoto,
      photoAlt: 'The old stone Nicollet Island Inn, on Nicollet Island',
      mapPlace: 'Nicollet Island, Minneapolis',
      mapPoint: { lat: 44.98745, lng: -93.2632 },
    },
  ],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The other town' },
    { text: 'This side of the river was once a town of its own, St. Anthony, and this was its Main Street. Some of its buildings are among the oldest in the city: the Upton Block went up in 1855, the Pracna in 1890.' },
    { kind: 'heading', text: 'The rival' },
    { text: 'In 1881, Charles Pillsbury opened his A-Mill just along from here, after years of planning in secret. It was the largest flour mill in the world for forty years, driven by two of the most powerful waterwheels ever built. Today it’s artists’ lofts.' },
    { kind: 'find', text: 'Find the sign on the old Pillsbury mill, Pillsbury’s Best Flour. Then look back across the river for Gold Medal: two old rivals, still facing each other.' },
    DINNER,
  ],
}

export default {
  id: 'minneapolis',
  aiMade: true,
  name: 'Where the City Began',
  location: 'MINNEAPOLIS · MINNESOTA, USA',
  city: 'Minneapolis',
  photo: millCityPhoto,
  photoAlt: millCity.photoAlt,
  photoPosition: '24% center',
  blurb: 'Through the ruins of the old flour mills, and across a bridge of stone arches.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Historical', 'Cultural', 'Scenic'],
  departure: stadium,
  discovery: goldMedalPark,
  build: millCity,
  peak: stoneArchBridge,
  afterglow: stAnthonyMain,
  startArea: 'Minneapolis, Minnesota, USA',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Summer or early fall',
    seasonNote: 'For warm evenings by the river, before the cold sets in.',
    timeOfDay: 'In the afternoon and evening',
    timeNote: 'It ends on the riverfront, with the city lit up across the water.',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against the Minnesota Historical
  // Society's Mill City Museum pages, Metro Transit's fares and MnDOT's
  // Stone Arch Bridge news.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Comfortable shoes, and a warm layer: it’s windy by the river, and bitterly cold in winter.',
      'A light rail ticket from the machine at the station, or the Transit app, for getting there.',
      'Water and sunscreen in summer: the bridge has no shade.',
    ],
    costs: [
      { lead: 'Light rail', text: '$2 a ride ($1 for seniors and youth), all day.' },
      { lead: 'Mill City Museum', text: '$15, $12 for seniors (65+), veterans, military and college students, and $8 for ages 5–17. Tickets are only sold at the museum.' },
      'Gold Medal Park, the Guthrie’s Endless Bridge, Mill Ruins Park, the Stone Arch Bridge and St. Anthony Main are free.',
    ],
    getting: [
      'Start at U.S. Bank Stadium Station, on the Green and Blue light rail lines.',
      'The walk ends at St. Anthony Main, about 1 km from the start across the river.',
      'If you drive, use a downtown parking ramp. On Vikings game days, parking near the stadium is expensive and the streets are packed.',
    ],
    access: [
      'Flat and paved most of the way, and the Stone Arch Bridge is wide and level.',
      'There’s a gentle rise up the east bank, and Main Street at St. Anthony Main is cobbled.',
      'Mill City Museum has elevators.',
    ],
    restrictions: [
      { lead: 'Mill City Museum', text: 'Thursday and Friday 10 AM–4 PM, Saturday and Sunday 10 AM–5 PM. Closed Monday to Wednesday.' },
      { lead: 'Guthrie’s Endless Bridge', text: 'Free to walk out on whenever the theater building is open.' },
    ],
    tips: [
      'At Mill City Museum, don’t miss the Flour Tower ride and the observation deck, looking down on St. Anthony Falls.',
      'Cross the Stone Arch Bridge at sunset, for the light on the falls and the city.',
      'Check the Vikings’ schedule: game days change the whole neighborhood.',
    ],
  },
  match: {
    moods: { Peaceful: 40, Adventurous: 35, Romantic: 70, Curious: 90, Playful: 45, Cultural: 80 },
    with: { Solo: 85, Couple: 85, Family: 65, 'Friends / Group': 75 },
    preferences: {
      'Pet friendly': 40, 'Avoid alcohol': 65, 'More nature': 30, 'Food stops': 50,
      Coastal: 10, 'More urban': 95, 'Hiking involved': 5, 'Budget friendly': 75,
    },
  },
  description: [
    'Minneapolis grew up around the only waterfall on the Mississippi. Its power turned the wheels of flour mills so big that two of them, on opposite banks, took turns being the largest in the world, and the city still goes by the name they gave it: Mill City.',
    'This journey walks you through that story: up a hill named for a flour, into the ruins of a mill that blew up and was built again, across a railroad baron’s bridge of stone arches beside the falls, and over to the old Main Street on the other bank, where the rival’s sign still shines across the water.',
  ],
  route: [stadium, goldMedalPark, millCity, stoneArchBridge, stAnthonyMain],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Minneapolis, back where it all began. Whatever you took from the day, it’s yours now.',
    summary: 'You started by the stadium, climbed the spiral hill in Gold Medal Park, walked among the ruins at Mill City Museum, crossed the Stone Arch Bridge, and finished on St. Anthony Main.',
  },
}
