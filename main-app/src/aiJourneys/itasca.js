// Where the Mississippi Begins (Itasca State Park, Minnesota), built the
// same way as the Waseda journey (testJourney.js). Every stop has its exact
// spot (`mapPoint`, from Wikipedia and OpenStreetMap), so it gets the live
// map, and the way to it from the stop before: how far (`distanceMeters`),
// how long (`travelMinutes`) and how hard (`effort`), from Google's walking
// and driving routes and the heights along them (Open-Meteo), worked out
// once, in November 2026.
//
// The narration tells one story from stop to stop: who found the river's
// source, who named it, and who fought to save the pines around it, a
// surveyor who won by one vote and a young woman who faced down a lumber
// boss, before you cross the river yourself. The history was checked
// against published sources (Wikipedia) in November 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import douglasLodgePhoto from '../assets/journey/itasca/douglas-lodge.jpg'
import preachersGrovePhoto from '../assets/journey/itasca/preachers-grove.jpg'
import headwatersCenterPhoto from '../assets/journey/itasca/headwaters-center.jpg'
import fireTowerPhoto from '../assets/journey/itasca/fire-tower.jpg'
import headwatersPhoto from '../assets/journey/itasca/headwaters.jpg'
import lakeItascaPhoto from '../assets/journey/itasca/lake-itasca.jpg'

// The spots near the stops.
import forestInnPhoto from '../assets/journey/itasca/forest-inn.jpg'
import oldTimersCabinPhoto from '../assets/journey/itasca/old-timers-cabin.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const douglasLodge = {
  id: 'douglasLodge',
  name: 'Douglas Lodge',
  photo: douglasLodgePhoto,
  photoAlt: 'Douglas Lodge, a long log building among tall pines, with a wooden sign on the lawn in front',
  memory: 'Where the day began.',
  mapPlace: 'Douglas Lodge, Itasca State Park, MN',
  mapPoint: { lat: 47.1916395, lng: -95.1707565 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [15, 30],
  nearby: [
    {
      name: 'Forest Inn',
      note: 'Built of split stone and logs by a crew of 200 from the Civilian Conservation Corps, one of the biggest buildings they made in Minnesota’s state parks',
      meters: 130,
      photo: forestInnPhoto,
      photoAlt: 'The Forest Inn, a long log and stone building with a carved sign over its door, among tall pines',
      mapPlace: 'Forest Inn, Itasca State Park, MN',
      mapPoint: { lat: 47.1916279, lng: -95.1690885 },
    },
  ],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Itasca State Park.' },
    { kind: 'heading', text: 'Saved by one vote' },
    { text: 'This is Minnesota’s oldest state park, and the second oldest in the country. In the 1880s, loggers were cutting their way through these pine forests, and a surveyor named Jacob Brower set out to save what was left around the lake. In 1891 the legislature made it a park, by a margin of one vote.' },
    { kind: 'heading', text: 'The first lodge' },
    { text: 'Douglas Lodge, from 1905, is the oldest building in the park. It’s named for Wallace Douglas, the state’s attorney general, who fought to save the park’s timber in those early years.' },
    { kind: 'find', text: 'Find the peeled logs in the lodge’s walls. Every one of them grew in this forest.' },
    { className: 'narrationClose', text: 'The first stop is a walk north along the lake, through the pines.' },
  ],
}

const preachersGrove = {
  id: 'preachersGrove',
  name: 'Preacher’s Grove',
  photo: preachersGrovePhoto,
  photoAlt: 'Tall, straight red pine trunks rising from a grassy slope in Preacher’s Grove',
  memory: 'Among the old pines.',
  mapPlace: 'Preacher’s Grove, Itasca State Park, MN',
  mapPoint: { lat: 47.200588, lng: -95.174326 },
  travelMode: 'walking',
  distanceMeters: 1394,
  travelMinutes: 19,
  effort: { level: 'easy', note: 'A gentle trail along the lake, a little up and down' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Old Timer’s Cabin',
      note: 'A little cabin of enormous logs, built by the Civilian Conservation Corps, who called it the Honeymooner’s Cabin',
      meters: 710,
      photo: oldTimersCabinPhoto,
      photoAlt: 'The Old Timer’s Cabin, a small cabin built of huge logs on a stone base, among pines and birches',
      mapPlace: 'Old Timer’s Cabin, Itasca State Park, MN',
      mapPoint: { lat: 47.1941793, lng: -95.1735887 },
    },
  ],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'What Brower saved' },
    { text: 'These are the trees the fight was about. Red pine is Minnesota’s state tree, and some of the red pines in Itasca are more than 200 years old, older than the state itself.' },
    { kind: 'heading', text: 'The Honeymooner’s Cabin' },
    { text: 'Back along the trail, you passed the Old Timer’s Cabin, built of enormous logs by the Civilian Conservation Corps in the 1930s. They nicknamed it the Honeymooner’s Cabin, for being so small and so far out of the way.' },
    { kind: 'find', text: 'Find the tallest pine you can, stand at its foot, and look straight up.' },
    { className: 'narrationClose', text: 'Walk back to the lodge, then drive to the north end of the lake. That’s where the river starts.' },
  ],
}

const fireTower = {
  id: 'aitonHeights',
  name: 'Aiton Heights Fire Tower',
  mapName: 'Fire tower',
  photo: fireTowerPhoto,
  photoAlt: 'Aiton Heights Fire Tower, a tall steel lookout tower with zigzag stairs, rising above green treetops',
  memory: 'Up above the forest.',
  teaser: 'An old fire lookout tower on a ridge, with the forest spread out below. A drive and a short walk from the lake.',
  mapPlace: 'Aiton Heights Fire Tower, Itasca State Park, MN',
  mapPoint: { lat: 47.1859, lng: -95.18865 },
  travelMode: 'driving',
  // From the Headwaters Center. Wilderness Drive is one way, so the drive
  // there (15.2 km, 31 minutes) is longer than the drive back (9.7 km, 17
  // minutes): these are the two averaged, so there and back adds up right.
  distanceMeters: 12447,
  travelMinutes: 24,
  effort: { level: 'moderate', note: 'A drive around Wilderness Drive and a short walk, then 100 feet of stairs to the top' },
  stayMinutes: [20, 30],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'Watching for smoke' },
    { text: 'From this tower, lookouts once watched for smoke over the forest. It’s a climb of about 100 feet to the top, and anyone can go up.' },
    { kind: 'heading', text: 'What they fought for' },
    { text: 'From up there, you can see what Brower and the others were fighting for: the pine forest and its lakes, stretching out in every direction. If heights aren’t for you, the ridge at the bottom is lovely too.' },
    { kind: 'find', text: 'From the top, try to find Lake Itasca among the trees.' },
    BACK_TO_ROUTE,
  ],
}

const headwatersCenter = {
  id: 'headwatersCenter',
  name: 'Mary Gibbs Headwaters Center',
  mapName: 'Headwaters Center',
  photo: headwatersCenterPhoto,
  photoAlt: 'The entrance to the Mary Gibbs Mississippi Headwaters Center, with a wooden sign and a timber gateway',
  memory: 'Getting close to the river’s start.',
  mapPlace: 'Mary Gibbs Mississippi Headwaters Center, Itasca State Park, MN',
  mapPoint: { lat: 47.2403142, lng: -95.210867 },
  travelMode: 'driving',
  // Back along the trail to the lodge (about 19 minutes, not counted in the
  // walking), then the drive from the lodge (8.1 km, 13 minutes).
  distanceMeters: 8090,
  travelMinutes: 32,
  effort: { level: 'easy', note: 'A 19-minute walk back to the lodge, then a 13-minute drive up the lake' },
  stayMinutes: [30, 45],
  ...BUILD,
  detours: [fireTower],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'The guide and the name' },
    { text: 'The Ojibwe called this Elk Lake. In 1832, an Ojibwe guide, Ozaawindib, led the explorer Henry Schoolcraft here, and Schoolcraft declared it the source of the Mississippi. He made up a new name for it from the Latin for “true head”, veritas caput: Itasca.' },
    { kind: 'heading', text: 'The woman at the dam' },
    { text: 'This center is named for Mary Gibbs. In 1903, at 24, she was put in charge of the park, the first woman park commissioner in the country. When a logging company’s dam threatened the old pines, she went to open it herself. The lumber boss threatened to shoot anyone who touched the levers. She told him he wouldn’t shoot her hand off, and took hold of them anyway.' },
    { kind: 'find', text: 'Find Mary Gibbs’s name on the center, then follow the path toward the shore.' },
    { className: 'narrationClose', text: 'Out in the forest, there’s an old fire tower you can climb, if you’d like a detour. Otherwise, the river is a few minutes’ walk away.' },
  ],
}

const headwaters = {
  id: 'mississippiHeadwaters',
  name: 'Mississippi Headwaters',
  photo: headwatersPhoto,
  photoAlt: 'A line of stepping stones across the shallow stream flowing out of Lake Itasca, with forest beyond',
  memory: 'Crossing the Mississippi on foot.',
  mapPlace: 'Mississippi Headwaters, Itasca State Park, MN',
  mapPoint: { lat: 47.239771, lng: -95.207987 },
  travelMode: 'walking',
  distanceMeters: 258,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'A short, flat path to the shore' },
  stayMinutes: [30, 45],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The river at its start' },
    { text: 'Here, a small stream slips out of Lake Itasca over a line of rocks. This is the Mississippi, right at its start, 1,475 feet above the sea. From here it runs 2,340 miles to the Gulf of Mexico.' },
    { kind: 'heading', text: 'Which stream counts?' },
    { text: 'People argued about it. In 1888, Jacob Brower spent five months here, checking whether a creek running into the south end of the lake should count as the source instead. He decided it shouldn’t, because it didn’t always flow, so the river officially starts right here.' },
    { kind: 'find', text: 'Cross the river on the stepping stones, or take off your shoes and wade. Then find the wooden marker by the water that tells you how far the river has to go.' },
    PEAK_CLOSE,
  ],
}

const lakeItasca = {
  id: 'lakeItasca',
  name: 'Lake Itasca',
  photo: lakeItascaPhoto,
  photoAlt: 'Wooden docks reaching out into the calm water of Lake Itasca under a grey evening sky',
  memory: 'Evening on the lake.',
  // The shore below Douglas Lodge, where the day began.
  mapPlace: 'Lake Itasca, below Douglas Lodge, Itasca State Park, MN',
  mapPoint: { lat: 47.192741, lng: -95.171159 },
  travelMode: 'driving',
  // Back to the car (about 3 minutes), then the drive down the lake.
  distanceMeters: 8545,
  travelMinutes: 18,
  effort: { level: 'easy', note: 'Back to the car, then the drive back down to the lodge' },
  stayMinutes: [30, 60],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Back on the shore' },
    { text: 'You’re back below Douglas Lodge, where the day began. Find a spot by the water and watch the evening come in. Itasca has more than 200 kinds of birds, and loons are among them.' },
    { kind: 'heading', text: 'Ninety days to the sea' },
    { text: 'Think about the water you stepped across this afternoon. It takes about 90 days to reach the Gulf of Mexico, past Minneapolis, St. Louis and New Orleans. Tonight, it’s only just set out.' },
    { kind: 'find', text: 'Find a quiet spot on the shore, and listen for the call of a loon.' },
    DINNER,
  ],
}

export default {
  id: 'itasca',
  aiMade: true,
  name: 'Where the Mississippi Begins',
  location: 'ITASCA STATE PARK · MINNESOTA, USA',
  city: null,
  // The headwaters photo is wide, and the card crops the stones out.
  photo: preachersGrovePhoto,
  photoAlt: preachersGrove.photoAlt,
  blurb: 'Through old pine forest, to where the Mississippi is small enough to step across.',
  walking: 'Walk + drive',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Nature', 'Adventure', 'Interactive'],
  departure: douglasLodge,
  discovery: preachersGrove,
  build: headwatersCenter,
  peak: headwaters,
  afterglow: lakeItasca,
  startArea: 'Itasca State Park, Minnesota, USA',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Late summer to early fall',
    seasonNote: 'When it’s warm enough to wade across the headwaters. The fall colors start in late September.',
    timeOfDay: 'From late morning',
    timeNote: 'It ends on the shore of Lake Itasca as the evening comes in.',
  },
  match: {
    moods: { Peaceful: 90, Adventurous: 65, Romantic: 50, Curious: 70, Playful: 50, Cultural: 25 },
    with: { Solo: 80, Couple: 75, Family: 90, 'Friends / Group': 75 },
    preferences: {
      'Pet friendly': 65, 'Avoid alcohol': 95, 'More nature': 95, 'Food stops': 20,
      Coastal: 15, 'More urban': 5, 'Hiking involved': 70, 'Budget friendly': 80,
    },
  },
  description: [
    'Deep in the pine forests of northern Minnesota, a small stream slips out of a lake over a line of rocks, and that’s the Mississippi. The park around it was saved from the loggers by a single vote, and by a young woman who stood up to a lumber boss at his dam.',
    'This journey takes you from the old log lodge through the pines the fight was about, to the river’s source, where you can cross the Mississippi in a few steps, and back to the lake for the evening.',
  ],
  route: [douglasLodge, preachersGrove, headwatersCenter, headwaters, lakeItasca],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Itasca, and the very start of the Mississippi. Whatever you took from the day, it’s yours now.',
    summary: 'You started at Douglas Lodge, walked among the old pines of Preacher’s Grove, got the river’s story at the Headwaters Center, crossed the Mississippi on stepping stones, and finished by Lake Itasca.',
  },
}
