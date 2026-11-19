// Cliffs Over the St. Croix (Taylors Falls, Minnesota), built the same way
// as the Waseda journey (testJourney.js). Every stop has its exact spot
// (`mapPoint`, from Wikipedia and OpenStreetMap), so it gets the live map,
// and the way to it from the stop before: how far (`distanceMeters`), how
// long (`travelMinutes`) and how hard (`effort`), from Google's walking and
// driving routes and the heights along them (Open-Meteo), worked out once,
// in November 2026.
//
// The narration tells one story from stop to stop: a lumber town that looks
// like New England, the river that carried its logs, and the rock beneath
// it all, poured out as lava a billion years ago and drilled by ice-age
// floods, ending with art made this year in a meadow nearby. The history was
// checked against published sources (Wikipedia) in November 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import angelHillPhoto from '../assets/journey/taylors-falls/angel-hill.jpg'
import benchStreetPhoto from '../assets/journey/taylors-falls/bench-street.jpg'
import potholesPhoto from '../assets/journey/taylors-falls/potholes.jpg'
import riverboatPhoto from '../assets/journey/taylors-falls/riverboat.jpg'
import dallesPhoto from '../assets/journey/taylors-falls/dalles.jpg'
import franconiaPhoto from '../assets/journey/taylors-falls/franconia.jpg'

// The spots near the stops.
import folsomHousePhoto from '../assets/journey/taylors-falls/folsom-house.jpg'
import libraryPhoto from '../assets/journey/taylors-falls/library.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const angelHill = {
  id: 'angelHill',
  name: 'Angel Hill',
  photo: angelHillPhoto,
  photoAlt: 'A white wooden church with a square bell tower and a picket fence on Angel Hill, under a blue sky',
  memory: 'Where the day began.',
  // The white church on the hill, the United Methodist Church.
  mapPlace: 'Taylors Falls United Methodist Church, 290 West Government Street, Taylors Falls, MN',
  mapPoint: { lat: 45.4005646, lng: -92.6548361 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [15, 20],
  nearby: [
    {
      name: 'Folsom House',
      note: 'The lumberman W. H. C. Folsom’s house, still furnished with the family’s own things',
      meters: 60,
      photo: folsomHousePhoto,
      photoAlt: 'The Folsom House, a long white clapboard house with dark green shutters and a pillared porch',
      mapPlace: 'Folsom House, 272 West Government Street, Taylors Falls, MN',
      mapPoint: { lat: 45.4005941, lng: -92.6540959 },
    },
  ],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Taylors Falls.' },
    { kind: 'heading', text: 'A village from back east' },
    { text: 'Taylors Falls was laid out around 1850, on the St. Croix River, right on the border with Wisconsin. Up here on Angel Hill, the settlers built white wooden houses and churches like the ones they’d left back east, and it still looks like a village in New England.' },
    { kind: 'heading', text: 'The lumberman’s house' },
    { text: 'Just along the street is the house of W. H. C. Folsom, who came here in 1850, made his money in lumber and served six terms as a state senator. It’s still furnished with the family’s own things, down to the grand piano.' },
    { kind: 'find', text: 'Find the white church with the square bell tower. Then find the Folsom House, with its dark green shutters.' },
    { className: 'narrationClose', text: 'Have a slow look around, then head down the hill to the main street.' },
  ],
}

const benchStreet = {
  id: 'benchStreet',
  name: 'Bench Street',
  photo: benchStreetPhoto,
  photoAlt: 'The main street of Taylors Falls in autumn, with shops along one side and a wooded bluff behind',
  memory: 'Down the main street.',
  mapPlace: 'Bench Street, Taylors Falls, MN',
  mapPoint: { lat: 45.4041138, lng: -92.6529556 },
  travelMode: 'walking',
  distanceMeters: 614,
  travelMinutes: 8,
  effort: { level: 'easy', note: 'Down the hill into town' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Taylors Falls Public Library',
      note: 'Built in 1854 as a tailor’s shop, and the town’s library since 1887',
      meters: 20,
      photo: libraryPhoto,
      photoAlt: 'The Taylors Falls library, a small pale yellow wooden building with carved white trim and steps up to its door',
      mapPlace: 'Taylors Falls Public Library, 473 Bench Street, Taylors Falls, MN',
      mapPoint: { lat: 45.40397, lng: -92.65289 },
    },
  ],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Under the bluff' },
    { text: 'Bench Street is the town’s main street, running along the foot of the bluff. In the logging days, this was a town of lumbermen and river men, and Swedish settlers came too: it’s where the characters in Vilhelm Moberg’s famous novel The Emigrants first settle.' },
    { kind: 'heading', text: 'The tailor’s library' },
    { text: 'The little library here was built in 1854 as a tailor’s shop. The tailor, John Jacob Spengler, worked in the front room, lived in the back with his family, and sewed uniforms for Union soldiers in the Civil War. It’s been the town library since 1887.' },
    { kind: 'find', text: 'Find the little yellow library, with its carved trim over the door. Then pick up something to eat for later.' },
    { className: 'narrationClose', text: 'At the bottom of the street is the river, and the park that makes this place famous.' },
  ],
}

const riverboat = {
  id: 'stCroixRiverboat',
  name: 'A Boat on the St. Croix',
  mapName: 'Boat landing',
  photo: riverboatPhoto,
  photoAlt: 'A white riverboat on the dark St. Croix River, between wooded banks under a sky of white clouds',
  memory: 'Out on the river.',
  teaser: 'A boat ride up the river through the cliffs, if the boats are running. Right by the park.',
  mapPlace: 'Taylors Falls Scenic Boat Tours, 155 South Street, Taylors Falls, MN',
  mapPoint: { lat: 45.4013499, lng: -92.6509118 },
  travelMode: 'walking',
  // From the potholes, then on to the cliffs from the landing.
  distanceMeters: 265,
  travelMinutes: 3,
  extraMeters: 517,
  effort: { level: 'easy', note: 'Down to the boat landing by the river' },
  stayMinutes: [60, 90],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'The river’s view' },
    { text: 'If the boats are running, take a ride. From the water, you see the Dalles the way the river does, with dark cliffs rising straight up on either side.' },
    { kind: 'heading', text: 'Logs, wall to wall' },
    { text: 'In 1886, this stretch of river saw what’s believed to be the worst log jam in history: at least 150 million board feet of logs, backed up for three miles. People came from all over just to look at it.' },
    { kind: 'find', text: 'Look up at the cliffs as you go by, and see if you can spot any climbers on the rock.' },
    BACK_TO_ROUTE,
  ],
}

const potholes = {
  id: 'glacialPotholes',
  name: 'Glacial Potholes',
  photo: potholesPhoto,
  photoAlt: 'A deep, smooth, round hole worn into dark rock, with ferns growing around its rim',
  memory: 'Peering into the potholes.',
  // The park's visitor center, beside the potholes.
  mapPlace: 'Interstate State Park Visitor Center, Taylors Falls, MN',
  mapPoint: { lat: 45.3999926, lng: -92.6511651 },
  travelMode: 'walking',
  distanceMeters: 670,
  travelMinutes: 10,
  effort: { level: 'easy', note: 'Down Bench Street to the park by the river' },
  stayMinutes: [30, 45],
  ...BUILD,
  detours: [riverboat],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'Holes drilled by water' },
    { text: 'About 10,700 years ago, at the end of the last ice age, floods from a huge glacial lake to the north came pouring down this valley. Where the water swirled, it spun sand and stones around and around, and drilled deep, round holes into the rock.' },
    { kind: 'heading', text: 'The deepest in the world' },
    { text: 'There are more than 80 of them here, more than anywhere else in the world. One, the Bottomless Pit, has been dug out to 60 feet deep, the deepest pothole anyone has explored.' },
    { kind: 'find', text: 'Find the biggest pothole you can, and peer down inside. Some are big enough to stand in.' },
    { className: 'narrationClose', text: 'There’s a boat ride on the river, if you’d like a detour. Otherwise, the cliffs are just along the trail.' },
  ],
}

const dalles = {
  id: 'dallesOfTheStCroix',
  name: 'The Dalles of the St. Croix',
  mapName: 'The Dalles',
  photo: dallesPhoto,
  photoAlt: 'Looking down from the cliffs at the St. Croix River winding through a rocky gorge, among autumn trees',
  memory: 'High above the river.',
  // On the River Trail, along the top of the cliffs.
  mapPlace: 'Walter F. Mondale River Trail, Interstate State Park, Taylors Falls, MN',
  mapPoint: { lat: 45.3984, lng: -92.6524 },
  travelMode: 'walking',
  distanceMeters: 214,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'Along the trail above the gorge. Watch your step near the edges' },
  stayMinutes: [30, 45],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'A billion years of rock' },
    { text: 'These cliffs are basalt, from lava that poured out about 1.1 billion years ago, when the middle of the continent was tearing apart. At least ten separate lava flows are stacked up in the rock here, and the ice-age floods that drilled the potholes cut this gorge right through them.' },
    { kind: 'heading', text: 'One park, two states' },
    { text: 'In 1895, Minnesota and Wisconsin each set aside their side of the Dalles, and together they made the first interstate park in the country. That’s why the parks on both banks have the same name.' },
    { kind: 'find', text: 'Look across to the Wisconsin cliffs, and see if you can find the Old Man of the Dalles, a rock that looks like a human face.' },
    PEAK_CLOSE,
  ],
}

const franconia = {
  id: 'franconia',
  name: 'Franconia Sculpture Park',
  photo: franconiaPhoto,
  photoAlt: 'A road sign in a meadow at Franconia Sculpture Park that reads “I saw that worrying came to nothing”',
  memory: 'Wandering among the sculptures.',
  mapPlace: 'Franconia Sculpture Park, 29836 St. Croix Trail, Franconia, MN',
  mapPoint: { lat: 45.3808734, lng: -92.7070036 },
  travelMode: 'driving',
  // Back along the trail to the car park (about 3 minutes), then the drive.
  distanceMeters: 6085,
  travelMinutes: 11,
  effort: { level: 'easy', note: 'Back to the car, then a short drive out of town' },
  stayMinutes: [45, 60],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Art in a meadow' },
    { text: 'A short drive from the river, Franconia Sculpture Park is 50 acres of open meadow with more than 100 sculptures, some huge, some strange, some funny. A small group of artists started it in 1996, and it’s free to wander.' },
    { kind: 'heading', text: 'Made this year' },
    { text: 'The Dalles took a billion years and an ice-age flood to make. These are much newer: every year, more than 40 artists come here to build new work, so the meadow is always changing.' },
    { kind: 'find', text: 'Find the sculpture that surprises you most, and walk all the way around it as the light gets low.' },
    DINNER,
  ],
}

export default {
  id: 'taylorsFalls',
  aiMade: true,
  name: 'Cliffs Over the St. Croix',
  location: 'TAYLORS FALLS · MINNESOTA, USA',
  city: 'Taylors Falls',
  photo: dallesPhoto,
  photoAlt: dalles.photoAlt,
  blurb: 'Holes drilled by the ice age, cliffs over the river, and a meadow of sculptures.',
  walking: 'Walk + drive',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Adventure', 'Nature', 'Scenic', 'Hidden Gems'],
  departure: angelHill,
  discovery: benchStreet,
  build: potholes,
  peak: dalles,
  afterglow: franconia,
  startArea: 'Taylors Falls, Minnesota, USA',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Early fall',
    seasonNote: 'For the fall colors over the gorge, from late September into October. The boat tours only run in the warmer months.',
    timeOfDay: 'From late morning',
    timeNote: 'Franconia stays open into the evening, so there’s no rush at the end.',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against the Minnesota DNR's state
  // park permit page and the Minnesota Historical Society's Folsom House page.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Shoes with a good grip, for the bare rock and stairs around the Glacial Potholes.',
      'Water, a hat and sunscreen: the rocks above the river get hot in summer.',
      'Insect repellent in summer.',
    ],
    costs: [
      { lead: 'State park vehicle permit', text: '$7 for a day, or $35 for a year, to park at Interstate State Park, by the Glacial Potholes.' },
      { lead: 'Folsom House', text: 'Free (donations welcome).' },
      { lead: 'Franconia Sculpture Park', text: 'Free (donations welcome).' },
      'The boat trips on the St. Croix are paid, and only run in the warmer months.',
    ],
    getting: [
      'You’ll need a car: Taylors Falls is about an hour northeast of the Twin Cities.',
      'The walk ends at Franconia Sculpture Park, about 5 km from where it starts, a short drive out of town.',
    ],
    access: [
      'Bench Street is a steep street down into town.',
      'The paths around the Glacial Potholes are bare, uneven rock with stairs: not suitable for a wheelchair or stroller.',
      'Franconia Sculpture Park is open fields with mown paths.',
    ],
    restrictions: [
      { lead: 'The Dalles', text: 'There are steep drops along the gorge, without railings in places. Keep children and dogs close.' },
      { lead: 'Folsom House', text: 'Only open in the warmer months: check before you go.' },
    ],
    tips: [
      'Look down into the potholes: some are deeper than a person is tall, drilled by stones swirling in the meltwater.',
      'The fall colors in the gorge are usually best in early to mid October.',
      'Franconia is outdoors, so it’s best on a dry day, with time to wander.',
    ],
  },
  match: {
    moods: { Peaceful: 50, Adventurous: 85, Romantic: 45, Curious: 80, Playful: 85, Cultural: 40 },
    with: { Solo: 65, Couple: 70, Family: 90, 'Friends / Group': 90 },
    preferences: {
      'Pet friendly': 55, 'Avoid alcohol': 90, 'More nature': 80, 'Food stops': 30,
      Coastal: 10, 'More urban': 10, 'Hiking involved': 50, 'Budget friendly': 65,
    },
  },
  description: [
    'Taylors Falls is small, but the river beside it has carved out something huge: a gorge of billion-year-old cliffs, and rock drilled full of holes by the floods at the end of the ice age. It was a lumber town once, built to look like New England, and the logs of the whole valley came through here.',
    'This journey starts in the quiet old village on the hill, walks down to the river and along the top of the cliffs, and ends somewhere completely different, in a meadow full of art.',
  ],
  route: [angelHill, benchStreet, potholes, dalles, franconia],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Taylors Falls, from the old town to the cliffs and out into the fields. Whatever you took from the day, it’s yours now.',
    summary: 'You started on Angel Hill, walked down Bench Street, peered into the glacial potholes, looked down over the Dalles of the St. Croix, and finished among the sculptures at Franconia.',
  },
}
