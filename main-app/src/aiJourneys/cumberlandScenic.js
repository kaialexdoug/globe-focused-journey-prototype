// Water on Every Side (Cumberland, Wisconsin): the Scenic one of the
// Cumberland journeys, made for the AI journey test (Dad's handoff, for a
// field test on Sunday, November 22, 2026, from downtown at 11 AM). See
// cumberlandHistory.js for how the Cumberland journeys were put together.
//
// Every stop has its exact spot (`mapPoint`, from OpenStreetMap), and the walk
// to it from the stop before, from OpenStreetMap's walking routes
// (routing.openstreetmap.de), with heights from Open-Meteo, worked out in
// November 2026. It's flat all the way, on town streets.
//
// It walks around the island the town stands on, from the east shore, where
// a lumber company's sawmill stood in 1909, up to the causeway where the
// highway crosses the lake, and out onto Eagle Point. The facts are from
// Wikipedia (Cumberland and the Hay River), the Wisconsin DNR's lake
// inventory (as quoted in search results), the 1909 Sanborn fire-insurance
// map of Cumberland (Library of Congress), and listings for Eagle Point Park,
// checked in November 2026.
//
// Hero image (Dad's hero rules): a summer sunset over a lake, a wooden dock
// running out into the still water, and a tall sky for the title. It was
// found in a web search in November 2026, and where it was taken, who took
// it and its licence aren't confirmed yet: check them before the app goes
// public (see Photo credits in the README). A car's hood along its bottom
// edge was cropped off. Grade: Peaceful (soft contrast, muted color); the
// photo's used as it is. Crop: keep the dock, right of the middle. Tourist
// Park's stop uses it too.
//
// The other photos are from Wikimedia Commons (credited in the README). Where
// a stop has no photo of its own, the 1909 fire-insurance map of that part of
// town stands in, and says so. Nobody from Unfold has walked it yet.

import sunsetPhoto from '../assets/journey/cumberland/lake-sunset-dock.jpg'
import mapDowntownPhoto from '../assets/journey/cumberland/map-1909-downtown.jpg'
import mapLumberPhoto from '../assets/journey/cumberland/map-1909-lumber.jpg'
import mapNorthPhoto from '../assets/journey/cumberland/map-1909-north.jpg'
import mapKeyPhoto from '../assets/journey/cumberland/map-1909-key.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const downtown = {
  id: 'cbGroveStreet',
  name: 'Second Avenue and Grove Street',
  mapName: 'Grove Street',
  photo: mapDowntownPhoto,
  photoAlt: 'A sheet of Cumberland’s 1909 fire-insurance map, showing the downtown blocks building by building, in yellow and pink',
  memory: 'Where the day began.',
  mapPlace: 'Grove Street and 2nd Avenue, Cumberland, WI',
  mapPoint: { lat: 45.5349, lng: -92.0217 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Cumberland.' },
    { kind: 'heading', text: 'The Island City' },
    { text: 'Beaver Dam Lake wraps almost all the way around the middle of Cumberland, so the old town stands on an island. That’s why Cumberland calls itself the Island City.' },
    { kind: 'heading', text: 'A deep lake' },
    { text: 'It’s a big lake, about 1,100 acres, and a deep one: around 106 feet at its deepest, the deepest lake in Barron County.' },
    { kind: 'find', text: 'Look east down Grove Street: the water’s at the end of it.' },
    { className: 'narrationClose', text: 'Walk to the end of Grove Street.' },
  ],
}

const eastShore = {
  id: 'cbEastShore',
  name: 'The East Shore at Grove Street',
  mapName: 'East Shore',
  photo: mapLumberPhoto,
  photoAlt: 'The Beaver Dam Lumber Company’s sawmill, planing mill and lumberyards beside the lake, on Cumberland’s 1909 fire-insurance map',
  memory: 'The shore where the sawmill stood.',
  mapPlace: 'Grove Street at Comstock Avenue, Cumberland, WI',
  mapPoint: { lat: 45.53521, lng: -92.01613 },
  travelMode: 'walking',
  distanceMeters: 519,
  travelMinutes: 7,
  effort: { level: 'easy', note: 'Flat, east along Grove Street to the water' },
  stayMinutes: [10, 15],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'A lumberyard on the shore' },
    { text: 'In 1909, this side of the island was busy. The town’s fire-insurance map shows the Beaver Dam Lumber Company along the shore here, with its sawmill, a planing mill and long rows of lumber stacked in its yards.' },
    { kind: 'heading', text: 'Not the first mill' },
    { text: 'An earlier steam sawmill stood in the north of town, on what’s still called Mill Hill. It burned down in 1884.' },
    { kind: 'find', text: 'Look out across the open water, then back at the quiet streets behind you. Some of them were lumberyards once.' },
    { className: 'narrationClose', text: 'Follow the shore north. The best view is still to come.' },
  ],
}

const arcade = {
  id: 'cbArcadeAvenue',
  name: 'Arcade Avenue',
  photo: mapNorthPhoto,
  photoAlt: 'The north end of the island on Cumberland’s 1909 fire-insurance map, its streets and houses drawn in yellow',
  memory: 'Glimpses of the lake between the houses.',
  mapPlace: 'Arcade Avenue and Hunter Street, Cumberland, WI',
  mapPoint: { lat: 45.54098, lng: -92.01795 },
  travelMode: 'walking',
  distanceMeters: 879,
  travelMinutes: 12,
  effort: { level: 'easy', note: 'Flat, north through quiet streets near the east shore' },
  stayMinutes: [10, 15],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'Glimpses of the water' },
    { text: 'Along this side of the island, the lake keeps appearing between the houses and the trees. In late autumn, with the leaves down, you can see much more of it.' },
    { kind: 'heading', text: 'Where it all goes' },
    { text: 'All this water drains out of the south end of the lake as the Hay River, which runs about 50 miles to the Red Cedar River, and on by way of the Chippewa to the Mississippi.' },
    { kind: 'find', text: 'Find a gap between the houses where you can see straight across the lake to the far shore.' },
    { className: 'narrationClose', text: 'Keep going north, to where the highway crosses the water.' },
  ],
}

const causeway = {
  id: 'cbTouristPark',
  name: 'Tourist Park and the Causeway',
  mapName: 'Tourist Park',
  photo: sunsetPhoto,
  photoAlt: 'A summer sunset over a lake, with a wooden dock running out into the still water',
  // Right of the middle for the dock, low enough for the horizon in a wide crop.
  photoPosition: '80% 78%',
  memory: 'Water on every side.',
  mapPlace: 'Cumberland Tourist Park & Beach, Cumberland, WI',
  mapPoint: { lat: 45.54413, lng: -92.01944 },
  travelMode: 'walking',
  distanceMeters: 637,
  travelMinutes: 8,
  effort: { level: 'easy', note: 'Flat, up Arcade Avenue and along Lake Street to the park' },
  stayMinutes: [20, 30],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'Water on both sides' },
    { text: 'Here, at the north end of the island, Highway 63 crosses the lake on a causeway and a short bridge. Stand by the water in Tourist Park and look both ways: the lake stretches off to the north, and wraps back around the town behind you.' },
    { kind: 'heading', text: 'The town’s beach' },
    { text: 'Tourist Park is the city’s park and beach. In summer it’s full of swimmers. On a late-autumn day, you may have it to yourself.' },
    { kind: 'find', text: 'Stand at the water’s edge, or on the pier if it’s still in, and turn slowly in a full circle. How much of the way round can you see water?' },
    PEAK_CLOSE,
  ],
}

const eaglePoint = {
  id: 'cbEaglePoint',
  name: 'Eagle Point Park',
  mapName: 'Eagle Point',
  photo: mapKeyPhoto,
  photoAlt: 'The index sheet of Cumberland’s 1909 fire-insurance map, with a little map of the island and Beaver Dam Lake on both sides of it',
  memory: 'Looking back at the island.',
  mapPlace: 'Eagle Point Park, Island Avenue, Cumberland, WI',
  mapPoint: { lat: 45.54593, lng: -92.02902 },
  travelMode: 'walking',
  distanceMeters: 911,
  travelMinutes: 12,
  effort: { level: 'easy', note: 'Flat, west along Lake Street and Island Avenue onto the point' },
  stayMinutes: [20, 30],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'A point in the lake' },
    { text: 'Eagle Point is a small city park and campground, about 11 acres, on a point of land almost surrounded by Beaver Dam Lake. Camping is for the warmer months, so in late autumn it’s quiet.' },
    { kind: 'heading', text: 'Looking back' },
    { text: 'From the shore here, you look back across the water toward the island you’ve just walked around. It’s the same lake you saw from the east shore and the causeway, from its quiet side.' },
    { kind: 'find', text: 'For your memory photo, frame the water with the town beyond it.' },
    { className: 'narrationClose', text: 'Sit a while, and ask yourself: of all the views today, which one would you come back for?' },
  ],
}

export default {
  id: 'cumberlandScenic',
  aiMade: true,
  name: 'Water on Every Side',
  location: 'CUMBERLAND · WISCONSIN, USA',
  city: 'Cumberland',
  photo: sunsetPhoto,
  photoAlt: causeway.photoAlt,
  photoPosition: causeway.photoPosition,
  blurb: 'Around the Island City: a lumber shore, a causeway over the lake, and a quiet point to look back from.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Scenic', 'Nature', 'Historical'],
  departure: downtown,
  discovery: eastShore,
  build: arcade,
  peak: causeway,
  afterglow: eaglePoint,
  startArea: 'Downtown Cumberland, Wisconsin, USA',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Late spring to mid-fall',
    seasonNote: 'For blue water and green shores, or the fall colors in early to mid-October. In late autumn, with the leaves down, you see more of the lake, but it’s cold by the water.',
    timeOfDay: 'On a clear day, from late morning',
    timeNote: 'The views are best in sunshine, and the walk ends on Eagle Point’s quiet side.',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against the City of Cumberland's
  // pages and listings for Eagle Point Park.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'A warm, windproof jacket, a hat and gloves: it’s colder by the water, especially in late autumn.',
      'Comfortable shoes: it’s about 3 km, all on town streets.',
      'Something to sit on, if you want to stay a while at Eagle Point.',
    ],
    costs: [
      'The whole walk is free, and so are Tourist Park and Eagle Point Park.',
    ],
    getting: [
      'Cumberland is about 80 miles north-east of the Twin Cities. There’s street parking downtown.',
      'The walk ends at Eagle Point Park, about 1.5 km north-west of where it starts: walk back down Second Avenue, about 20 minutes.',
    ],
    access: [
      'Flat all the way, on town streets and sidewalks.',
      'Paths inside Eagle Point Park may be unpaved, and muddy or icy.',
      'Restrooms in the parks may be closed outside the summer season.',
    ],
    restrictions: [
      { lead: 'The lake', text: 'In late autumn and early winter the ice is thin and unsafe: don’t walk out on it, however solid it looks.' },
      { lead: 'Eagle Point Campground', text: 'Open for camping in the warmer months only. Reservations open each January.' },
      { lead: 'Highway 63', text: 'The causeway is a busy highway: enjoy the view from Tourist Park, not from the road.' },
    ],
    tips: [
      'Bring binoculars: in late autumn, before the ice, lakes like this one are a stop for ducks and other water birds on their way south.',
      'Sunset is around 4:30 PM in late November, if you want to come back for it.',
      'In summer, Tourist Park’s beach is the town’s swimming spot.',
    ],
  },
  match: {
    moods: { Peaceful: 90, Adventurous: 35, Romantic: 75, Curious: 55, Playful: 45, Cultural: 30 },
    with: { Solo: 85, Couple: 85, Family: 65, 'Friends / Group': 65 },
    preferences: {
      'Pet friendly': 80, 'Avoid alcohol': 90, 'More nature': 80, 'Food stops': 10,
      Coastal: 60, 'More urban': 15, 'Hiking involved': 20, 'Budget friendly': 100,
    },
  },
  description: [
    'Cumberland’s old town stands on an island, with Beaver Dam Lake, the deepest lake in Barron County, wrapped almost all the way around it. You’re never more than a few minutes from the water.',
    'This walk goes around the island: out to the east shore, where a lumber company stacked its boards in 1909, up past glimpses of the lake to the causeway where the highway crosses it, and out onto Eagle Point to look back at the town on its island.',
  ],
  // Why It's Cool on the journey's page (JourneyPage.jsx): what you'll
  // discover, why it matters, and what it feels like, a sentence each.
  whyCool: {
    discovery: 'A town on an island, with Beaver Dam Lake wrapped almost all the way around it.',
    significance: 'The deepest lake in Barron County, and the lumber days when boards were stacked along its shore.',
    feeling: 'Peaceful and open: glimpses of water between the houses, a causeway, and a view back to the island from Eagle Point.',
  },
  route: [downtown, eastShore, arcade, causeway, eaglePoint],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was the Island City, with water on every side. Whatever you took from the walk, it’s yours now.',
    summary: 'You started in the middle of the island, found the old lumber shore, caught glimpses of the lake along Arcade Avenue, stood by the water at the causeway, and finished looking back from Eagle Point.',
  },
}
