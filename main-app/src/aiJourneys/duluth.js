// At the Edge of the Big Lake (Duluth, Minnesota), built the same way as the
// Waseda journey (testJourney.js). Every stop has its exact spot (`mapPoint`,
// from Wikipedia and OpenStreetMap), so it gets the live map, and the way to
// it from the stop before: how far (`distanceMeters`), how long
// (`travelMinutes`) and how hard (`effort`), from Google's routes and the
// heights along them (Open-Meteo), worked out once, in November 2026. The
// first two legs are on foot, and the rest by car.
//
// The narration tells one story from stop to stop: the canal Duluth dug
// through the sandbar in 1871, the bridge over it, the shore path, a Viking
// ship and a Norwegian immigrant's hill, and the sandbar itself to end on. The
// history was checked against published sources (Wikipedia) in November
// 2026. Stories that are only legends say so.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import canalParkPhoto from '../assets/journey/duluth/canal-park.jpg'
import liftBridgePhoto from '../assets/journey/duluth/lift-bridge.jpg'
import lakewalkPhoto from '../assets/journey/duluth/lakewalk.jpg'
import glensheenPhoto from '../assets/journey/duluth/glensheen.jpg'
import engerTowerPhoto from '../assets/journey/duluth/enger-tower.jpg'
import parkPointPhoto from '../assets/journey/duluth/park-point.jpg'

// The spots near the stops.
import maritimeCenterPhoto from '../assets/journey/duluth/maritime-center.jpg'
import northPierLightPhoto from '../assets/journey/duluth/north-pier-light.jpg'
import fitgersPhoto from '../assets/journey/duluth/fitgers.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const canalPark = {
  id: 'canalPark',
  name: 'Canal Park',
  photo: canalParkPhoto,
  photoAlt: 'A big red lake freighter moored in the harbor at Canal Park, in the evening light',
  memory: 'Where the day began.',
  mapPlace: 'Canal Park, Duluth, MN',
  mapPoint: { lat: 46.78027778, lng: -92.09305556 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [10, 20],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Duluth.' },
    { kind: 'heading', text: 'The Zenith City' },
    { text: 'Duluth is named after Daniel Greysolon, Sieur du Lhut, a French explorer who came this way in 1679. Its nickname came later, from the founder of its first newspaper, in a Fourth of July speech: the Zenith City of the Unsalted Seas.' },
    { kind: 'heading', text: 'A door dug with shovels' },
    { text: 'The long sandbar in front of you, Minnesota Point, used to stand between the town and the lake, so ships for Duluth had to sail out past its rival, Superior, in Wisconsin. In 1870 Duluth began cutting a canal straight through it. Wisconsin went to court to stop it, but local lore says that on 30 April 1871, residents called out by a brewer named Sidney Luce came with shovels and picks and dug the first channel themselves. The court order came that July, too late.' },
    { kind: 'find', text: 'Find the canal those shovels started: the straight cut out to the lake between two long piers, each with a lighthouse near its end.' },
    { className: 'narrationClose', text: 'The first stop is the big steel bridge over the canal, just a few minutes away. Tap “I’m Here” when you reach it.' },
  ],
}

const liftBridge = {
  id: 'liftBridge',
  name: 'Aerial Lift Bridge',
  mapName: 'Lift Bridge',
  photo: liftBridgePhoto,
  photoAlt: 'Duluth’s Aerial Lift Bridge, a tall steel frame over the ship canal, against a blue sky',
  // The photo is wide and the screen is tall: keep the left tower in view,
  // rather than just the middle of the span.
  photoPosition: '5% center',
  memory: 'Watching the bridge, waiting for a ship.',
  mapPlace: 'Aerial Lift Bridge, Duluth, MN',
  mapPoint: { lat: 46.779, lng: -92.0929 },
  travelMode: 'walking',
  distanceMeters: 241,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'Flat, a few minutes across Canal Park' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Lake Superior Maritime Visitor Center',
      note: 'Right by the canal: the story of the great ships of the lakes, from the Army Corps of Engineers, who look after the canal',
      meters: 104,
      photo: maritimeCenterPhoto,
      photoAlt: 'The Lake Superior Maritime Visitor Center, beside the ship canal',
      mapPlace: 'Lake Superior Maritime Visitor Center, Duluth, MN',
      mapPoint: { lat: 46.77986111, lng: -92.09236111 },
    },
    {
      name: 'North Pier Light',
      note: 'Walk out to the end of the north pier for the little lighthouse, with the whole lake in front of you',
      meters: 413,
      photo: northPierLightPhoto,
      photoAlt: 'The white lighthouse at the end of Duluth’s north pier',
      mapPlace: 'Duluth Harbor North Pier Light, Duluth, MN',
      mapPoint: { lat: 46.78094444, lng: -92.08827778 },
    },
  ],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'A ferry in the air' },
    { text: 'The bridge began in 1905 as a transporter bridge. A gondola hung from the steel frame and carried up to 350 people at a time, with wagons, streetcars and cars, across the canal in about a minute. At busy times it went over every five minutes. In 1929 and 1930 it was rebuilt into the lift bridge you see now.' },
    { kind: 'heading', text: 'Saying hello' },
    { text: 'Its middle span rises 135 feet in about a minute, around five thousand times a year. As a ship comes through, it sounds its horn, and the bridge answers back with the same blasts. The most common is the Captain’s Salute: one long, then two short.' },
    { kind: 'find', text: 'Wait for a ship, and listen for the Captain’s Salute, long, short, short, and the bridge copying it back.' },
    { className: 'narrationClose', text: 'Next, we follow the shore on the Lakewalk, about half an hour on foot.' },
  ],
}

const glensheen = {
  id: 'glensheen',
  name: 'Glensheen',
  photo: glensheenPhoto,
  photoAlt: 'Glensheen, a large brick mansion, at the top of a sloping lawn among tall trees',
  memory: 'An old estate on the shore.',
  teaser: 'A grand family estate on the lake, with its gardens running down to its own boathouse. A short drive up the shore.',
  mapPlace: 'Glensheen, Duluth, MN',
  mapPoint: { lat: 46.81522, lng: -92.05179 },
  travelMode: 'driving',
  // From the Lakewalk stop. Driven, so the time it adds is there and back.
  distanceMeters: 3304,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'A short drive up the shore on London Road' },
  stayMinutes: [60, 90],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'The house on the lake' },
    { text: 'Glensheen was begun in 1905, the year the bridge opened, and finished in 1908, as the family home of Chester Congdon. It has 39 rooms on twelve acres of shore, and it cost $854,000 at the time, more than $22 million today.' },
    { kind: 'heading', text: 'Left as it was' },
    { text: 'In 1968 the estate was given to the University of Minnesota Duluth, which runs it as a museum. Chester Congdon’s art collection still hangs where it did when the family lived here.' },
    { kind: 'find', text: 'Find the boathouse, down at the bottom of the gardens on the water’s edge.' },
    BACK_TO_ROUTE,
  ],
}

const lakewalk = {
  id: 'lakewalk',
  name: 'The Lakewalk',
  mapName: 'Lakewalk',
  photo: lakewalkPhoto,
  photoAlt: 'The Lakewalk boardwalk along the rocky shore of Lake Superior, with the Lift Bridge in the distance',
  memory: 'Along the shore, with the lake beside you.',
  // Where the walk along the Lakewalk takes you.
  mapPlace: 'Leif Erikson Park, Duluth, MN',
  mapPoint: { lat: 46.7961735, lng: -92.0833062 },
  travelMode: 'walking',
  distanceMeters: 2451,
  travelMinutes: 34,
  effort: { level: 'easy', note: 'Mostly flat, along the shore on the Lakewalk' },
  stayMinutes: [45, 60],
  nearby: [
    {
      name: 'Fitger’s',
      note: 'Duluth’s old brewery, which made beer here from 1881 to 1972. Now it’s shops, places to eat and a museum of the brewery’s history',
      meters: 687,
      photo: fitgersPhoto,
      photoAlt: 'The old brick Fitger’s Brewery building on Superior Street',
      mapPlace: 'Fitger’s, Duluth, MN',
      mapPoint: { lat: 46.7925, lng: -92.09055556 },
    },
  ],
  ...BUILD,
  detours: [glensheen],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'A path made from a freeway' },
    { text: 'When Interstate 35 was pushed through Duluth, the rock blasted out for it was used to build a new beach along the lake, and the Lakewalk was laid on top. Here the road went into tunnels instead, which is why the old Fitger’s brewery, the rose garden and this park are still standing. The brewery that became Fitger’s started out in 1859 on a stream owned by Sidney Luce, the man with the shovels.' },
    { kind: 'heading', text: 'A Viking ship on the lake' },
    { text: 'The park is named for a ship. The Leif Erikson, a Viking ship replica, was built in Norway in 1926, and Captain Gerhard Folgerø sailed it from Bergen by way of Iceland, Greenland and Labrador, then through the Great Lakes, landing in Duluth on 23 June 1927, after 6,700 miles. It stood in this park for decades, and since 2021 it’s been on show up the shore at Knife River.' },
    { kind: 'find', text: 'Find the statue of Leif Erikson himself, still standing in the park that took his ship’s name.' },
    { className: 'narrationClose', text: 'Up the shore, there’s an old estate that makes a good detour. Otherwise, the best view in Duluth is next, up the hill, and you’ll want the car for it.' },
  ],
}

const engerTower = {
  id: 'engerTower',
  name: 'Enger Tower',
  photo: engerTowerPhoto,
  photoAlt: 'Enger Tower, a tall eight-sided stone lookout tower, against a deep blue sky',
  memory: 'The city, the harbor and the lake, all at once.',
  mapPlace: 'Enger Tower, Duluth, MN',
  mapPoint: { lat: 46.77611111, lng: -92.125 },
  travelMode: 'driving',
  distanceMeters: 11835,
  travelMinutes: 12,
  effort: { level: 'easy', note: 'A drive up the hill: the tower stands about 150 metres above the lake' },
  stayMinutes: [20, 30],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'A furniture seller’s hill' },
    { text: 'Bert Enger came to America from Norway like the ship’s crew, failed at his first business, then did well selling furniture in Duluth. When he died in 1931, he left much of what he had to the city, including this hill.' },
    { kind: 'heading', text: 'Norway’s crown prince' },
    { text: 'The tower was built in his honour: eighty feet of stone, five stories high. It was dedicated on 15 June 1939 by Crown Prince Olav and Crown Princess Märtha of Norway, twelve years after the Viking ship came in below.' },
    { kind: 'find', text: 'From the top, find the Lift Bridge where you started. Then follow the thin line of Park Point out across the water: that’s where the day ends.' },
    PEAK_CLOSE,
  ],
}

const parkPoint = {
  id: 'parkPoint',
  name: 'Park Point Beach',
  photo: parkPointPhoto,
  photoAlt: 'A long sandy beach on Lake Superior at Park Point, with driftwood on the sand',
  memory: 'The end of the day, on the sand.',
  mapPlace: 'Park Point Beach House, Duluth, MN',
  mapPoint: { lat: 46.7313497, lng: -92.0510557 },
  travelMode: 'driving',
  distanceMeters: 11046,
  travelMinutes: 21,
  effort: { level: 'easy', note: 'Down the hill and over the Lift Bridge onto Park Point. If the bridge is up for a ship, it’s a short wait' },
  stayMinutes: [45, 60],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'An island since 1871' },
    { text: 'You’re on Minnesota Point, the sandbar the canal cut through. Since those shovels in 1871 it’s been, strictly speaking, an island, and since 1905 the bridge has joined it to the city. Earlier, you watched the bridge. This time, you went over it.' },
    { kind: 'heading', text: 'Miles of sand' },
    { text: 'The point runs about seven miles out between the lake and the harbor. With Wisconsin Point reaching out from the other side, that’s about ten miles of sand in all.' },
    { kind: 'find', text: 'Look back up the shore. On a clear day you can pick out the Lift Bridge, far off where the day began.' },
    DINNER,
  ],
}

export default {
  id: 'duluth',
  aiMade: true,
  name: 'At the Edge of the Big Lake',
  location: 'DULUTH · MINNESOTA, USA',
  city: 'Duluth',
  // The Lakewalk rather than the bridge: it's tall, like the screens it
  // fills, and the bridge is in it anyway, in the distance.
  photo: lakewalkPhoto,
  photoAlt: lakewalk.photoAlt,
  blurb: 'Along Lake Superior, from the Lift Bridge up to the best view in town.',
  walking: 'Walk + drive',
  stops: '~5 stops',
  difficulty: 'Easy',
  experienceLevel: 'localDiscovery',
  experiences: ['Scenic', 'Nature', 'Historical'],
  departure: canalPark,
  discovery: liftBridge,
  build: lakewalk,
  peak: engerTower,
  afterglow: parkPoint,
  startArea: 'Duluth, Minnesota, USA',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Summer to early fall',
    seasonNote: 'For warm days by the lake, and the ships coming in under the bridge. The fall colors come in from late September.',
    timeOfDay: 'In the afternoon and evening',
    timeNote: 'It ends on the beach at Park Point, lovely as the light goes.',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against Glensheen's ticketing, the
  // Maritime Visitor Center's listing and the Duluth Fire Department's beach
  // warnings.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'A warm layer, even in summer: it’s often much cooler by the lake than inland.',
      'Comfortable shoes, for the Lakewalk and Enger Tower’s stairs.',
      'Water, sunscreen and a hat for the beach at the end.',
    ],
    costs: [
      'Canal Park, the Lift Bridge, the Lakewalk, Enger Tower and Park Point Beach are free.',
      { lead: 'Lake Superior Maritime Visitor Center', text: 'Free (donations welcome).' },
      { lead: 'Glensheen', text: 'The self-guided Classic Tour is $20, $18 for seniors (62+) and veterans, and $8 for ages 5–17.' },
      'Parking in Canal Park is mostly paid.',
    ],
    getting: [
      'You’ll want a car: the walk starts in Canal Park, then drives up to Enger Tower and out to Park Point.',
      'Park in one of Canal Park’s lots to start. They fill up on summer weekends, so come early.',
      'The walk ends at Park Point Beach, about 6 km from Canal Park, across the Lift Bridge.',
      'When the Lift Bridge rises for a ship, traffic to and from Park Point waits a few minutes.',
    ],
    access: [
      'Canal Park and the Lakewalk are flat and paved.',
      'Enger Tower is climbed by stairs.',
      'Park Point is a sand beach, hard going with a wheelchair or stroller beyond the paths.',
    ],
    restrictions: [
      { lead: 'Maritime Visitor Center', text: 'Hours change with the season: check before you go.' },
      { lead: 'Glensheen', text: 'Hours change with the season. Check in at the Ticket House to start the tour.' },
      { lead: 'Park Point Beach', text: 'There are no lifeguards, and rip currents can be dangerous. When the red flags are up, stay out of the water.' },
    ],
    tips: [
      'Check the ship schedule (the Duluth Shipping News) to see a big ship pass under the Lift Bridge.',
      'Lake Superior is cold all year: even in August, it’s more of a paddle than a swim.',
      'The view from Enger Tower is best in the late afternoon and at sunset.',
    ],
  },
  match: {
    moods: { Peaceful: 75, Adventurous: 65, Romantic: 65, Curious: 70, Playful: 55, Cultural: 50 },
    with: { Solo: 75, Couple: 85, Family: 85, 'Friends / Group': 80 },
    preferences: {
      'Pet friendly': 70, 'Avoid alcohol': 70, 'More nature': 80, 'Food stops': 60,
      Coastal: 85, 'More urban': 45, 'Hiking involved': 30, 'Budget friendly': 65,
    },
  },
  description: [
    'Duluth sits at the very tip of Lake Superior, and in 1871 its people dug themselves a door to it: a canal cut straight through the sandbar, by hand, the story goes, before the courts could stop them. Everything here grew up around that cut: the bridge that rises over it for the ships, the path along the shore, and the hill where it all lays itself out below you.',
    'This journey follows that story from the canal to the top of the hill, with a Viking ship and Norway’s crown prince along the way, and ends on the sandbar itself, on a beach that runs for miles.',
  ],
  // Why It's Cool on the journey's page (JourneyPage.jsx): what you'll
  // discover, why it matters, and what it feels like, a sentence each.
  whyCool: {
    discovery: 'How a town at the tip of Lake Superior dug its own door to the lake, and grew up around it.',
    significance: 'The canal cut through the sandbar in 1871, the bridge that lifts for the ships, and the Norwegian immigrant remembered by the tower on the hill.',
    feeling: 'Big-sky and breezy: waves on the shore, ships under the bridge, and miles of sand to finish.',
  },
  route: [canalPark, liftBridge, lakewalk, engerTower, parkPoint],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Duluth, from the waterfront to the top of the hill and back to the lake. Whatever you took from the day, it’s yours now.',
    summary: 'You started in Canal Park by the canal, watched the Lift Bridge, walked the Lakewalk along the shore, climbed Enger Tower for the view over everything, and finished on the beach at Park Point.',
  },
}
