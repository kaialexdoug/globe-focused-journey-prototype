// Where the Hay River Begins (Cumberland, Wisconsin): the Nature one of the
// Cumberland journeys, made for the AI journey test (Dad's handoff, for a
// field test on Sunday, November 22, 2026, from downtown at 11 AM). See
// cumberlandHistory.js for how the Cumberland journeys were put together.
//
// Every stop has its exact spot (`mapPoint`, from OpenStreetMap, where the
// Hay River's own line on the map begins), and the walk to it from the stop
// before, from OpenStreetMap's walking routes (routing.openstreetmap.de),
// with heights from Open-Meteo, worked out in November 2026. Between the two
// lakes, 1st Avenue (County Road P) has no sidewalk on the map, so that part
// is on the road's edge.
//
// It follows the water out of town: the lake's south arm, the road between it
// and little Collingwood Lake, and the spot where the lake turns into the Hay
// River, then back to Library Lake in the middle of town. The facts are from
// Wikipedia (Cumberland and the Hay River), the Wisconsin DNR's lake inventory
// and fish survey (as quoted in search results), and OpenStreetMap, checked in
// November 2026.
//
// Hero image (Dad's hero rules): autumn woods in full color, reflected in
// still water. It was found in a web search in November 2026, and where it
// was taken, who took it and its licence aren't confirmed yet: check them
// before the app goes public (see Photo credits in the README). It isn't
// known to be the Hay River, so it stands for the walk's season and mood,
// not the place. Grade: Peaceful (soft contrast, muted color); the photo's
// used as it is. Crop: the water in the middle. There's no photo of the Hay
// River's start yet: one from Sunday's field test, of the water starting to
// flow, should go on its stop, and could be the hero too.
//
// The other photos are from Wikimedia Commons (credited in the README). Where a stop
// has no photo of its own, another stands in, and says so. Nobody from Unfold
// has walked it yet.

import lakePhoto from '../assets/journey/cumberland/beaver-dam-lake.jpg'
import pondPhoto from '../assets/journey/cumberland/autumn-pond.jpg'
import elmStreetPhoto from '../assets/journey/cumberland/elm-street.jpg'
import mapKeyPhoto from '../assets/journey/cumberland/map-1909-key.jpg'
import townSignPhoto from '../assets/journey/cumberland/town-sign.jpg'
import mapDowntownPhoto from '../assets/journey/cumberland/map-1909-downtown.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const elmStreet = {
  id: 'cbElmStreet',
  name: 'Elm Street and 1st Avenue',
  mapName: 'Elm Street',
  photo: elmStreetPhoto,
  photoAlt: 'Elm Street at Second Avenue, at the south end of downtown Cumberland, a block from where the walk begins',
  memory: 'Where the day began.',
  mapPlace: 'Elm Street and 1st Avenue, Cumberland, WI',
  mapPoint: { lat: 45.5323, lng: -92.0203 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Cumberland.' },
    { kind: 'heading', text: 'The lake made by the beavers' },
    { text: 'The Ojibwe, who lived here first, called this lake Che-wa-cum-ma-towangok: “the lake made by the beavers.” Its English name, Beaver Dam Lake, says much the same.' },
    { kind: 'heading', text: 'Following the water out' },
    { text: 'This walk follows the lake south, to the place where it stops being a lake and becomes a river.' },
    { kind: 'find', text: 'Look south-east, past the buildings, for the first glint of the lake’s south arm.' },
    { className: 'narrationClose', text: 'Head south along 1st Avenue.' },
  ],
}

const southBay = {
  id: 'cbSouthBay',
  name: 'The South Arm of the Lake',
  mapName: 'South Arm',
  photo: mapKeyPhoto,
  photoAlt: 'The index sheet of Cumberland’s 1909 fire-insurance map, with a little map of the town and Beaver Dam Lake on both sides of it',
  memory: 'Watching the water birds.',
  mapPlace: '1st Avenue, south of Elm Street, Cumberland, WI',
  mapPoint: { lat: 45.5299, lng: -92.019 },
  travelMode: 'walking',
  distanceMeters: 380,
  travelMinutes: 5,
  effort: { level: 'easy', note: 'Flat, south along 1st Avenue' },
  stayMinutes: [15, 20],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'A stop on the way south' },
    { text: 'In late autumn, before the ice comes, open northern lakes like this one are a resting place for ducks and other water birds on their way south for the winter.' },
    { kind: 'heading', text: 'Who lives below' },
    { text: 'Under the surface, Beaver Dam Lake holds largemouth bass, northern pike and panfish, with smallmouth bass and walleye too. In its deepest spot, it goes down about 106 feet.' },
    { kind: 'find', text: 'Watch the water for a minute. Count the birds you can see, and try to catch one diving.' },
    { className: 'narrationClose', text: 'Keep going south, between two lakes.' },
  ],
}

const betweenLakes = {
  id: 'cbBetweenLakes',
  name: 'Between Two Lakes',
  photo: townSignPhoto,
  photoAlt: 'Autumn trees beside the road at the edge of Cumberland, by its green town sign, standing in for the road between the lakes',
  memory: 'A lake on each side.',
  mapPlace: '1st Avenue (County Road P), by Collingwood Lake, Cumberland, WI',
  mapPoint: { lat: 45.527, lng: -92.0185 },
  travelMode: 'walking',
  distanceMeters: 386,
  travelMinutes: 5,
  effort: { level: 'easy', note: 'Flat, south on the edge of 1st Avenue (County Road P)' },
  stayMinutes: [10, 15],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'Two lakes, one road' },
    { text: 'Here the road runs between two lakes: little Collingwood Lake on one side, and the long south arm of Beaver Dam Lake on the other.' },
    { kind: 'heading', text: 'Waiting for the ice' },
    { text: 'By December, lakes like these usually freeze over, and the ice fishermen move out onto them. In late November, the water’s still open, and often perfectly still.' },
    { kind: 'find', text: 'Stand where you can see both lakes at once. Which one is calmer?' },
    { className: 'narrationClose', text: 'The river starts just ahead.' },
  ],
}

const haySource = {
  id: 'cbHayRiver',
  name: 'The Start of the Hay River',
  mapName: 'Hay River',
  photo: lakePhoto,
  photoAlt: 'Beaver Dam Lake on a summer day, its wooded shores across blue water, from the edge of town',
  photoPosition: '70% center',
  memory: 'Where the lake becomes a river.',
  mapPlace: 'Hay River, 1st Avenue, Cumberland, WI',
  mapPoint: { lat: 45.52465, lng: -92.01653 },
  travelMode: 'walking',
  distanceMeters: 308,
  travelMinutes: 4,
  effort: { level: 'easy', note: 'Flat, a little further south on 1st Avenue' },
  stayMinutes: [20, 30],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'Where a lake becomes a river' },
    { text: 'Right about here, Beaver Dam Lake narrows and starts to flow away south. This is the Hay River, and it begins at Cumberland.' },
    { kind: 'heading', text: 'All the way to the Gulf' },
    { text: 'It runs about 50 miles to the Red Cedar River, which joins the Chippewa, which joins the Mississippi. A leaf that floats away from here could, in principle, end up in the Gulf of Mexico.' },
    { kind: 'find', text: 'Drop a leaf where the water starts to move, and watch which way it goes.' },
    PEAK_CLOSE,
  ],
}

const libraryLake = {
  id: 'cbLibraryLake',
  name: 'Library Lake',
  photo: mapDowntownPhoto,
  photoAlt: 'A sheet of Cumberland’s 1909 fire-insurance map, showing the downtown blocks near the lake, building by building',
  memory: 'Still water in the middle of town.',
  mapPlace: 'Library Lake, by the Grove Street bridge, Cumberland, WI',
  mapPoint: { lat: 45.53484, lng: -92.02543 },
  travelMode: 'walking',
  distanceMeters: 1698,
  travelMinutes: 23,
  effort: { level: 'easy', note: 'Back north on 1st Avenue, then on paths and quiet streets into the middle of town' },
  stayMinutes: [15, 25],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'A lake in the middle of town' },
    { text: 'Library Lake sits just behind Second Avenue, a small, quiet lake that meets the west arm of Beaver Dam Lake under the Grove Street bridge.' },
    { kind: 'heading', text: 'Four kinds of water' },
    { text: 'Today you’ve seen the big lake, its long south arm, little Collingwood Lake, and the river leaving it all behind. Here, in the middle of town, the water’s at its stillest.' },
    { kind: 'find', text: 'For your memory photo, get the bridge and the still water in one frame.' },
    { className: 'narrationClose', text: 'Sit for a moment, and ask yourself: where will the water you saw leaving today be in a month?' },
  ],
}

export default {
  id: 'cumberlandNature',
  aiMade: true,
  name: 'Where the Hay River Begins',
  location: 'CUMBERLAND · WISCONSIN, USA',
  city: 'Cumberland',
  photo: pondPhoto,
  photoAlt: 'Autumn woods in yellow, orange and green, reflected in a still stretch of water edged with grass',
  blurb: 'Follow the lake made by the beavers to the spot where it turns into a river.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Nature', 'Scenic', 'Interactive'],
  departure: elmStreet,
  discovery: southBay,
  build: betweenLakes,
  peak: haySource,
  afterglow: libraryLake,
  startArea: 'Downtown Cumberland, Wisconsin, USA',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Spring or fall',
    seasonNote: 'For the water birds passing through on their way north or south. In late autumn, go before the ice comes, usually by early December.',
    timeOfDay: 'In the morning',
    timeNote: 'Birds are most active early, and the water’s often calmest before the wind picks up.',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against OpenStreetMap and the
  // Wisconsin DNR's deer season dates.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Warm layers, a hat and gloves: it’s cold by the water in late autumn.',
      'Something bright to wear on the road between the lakes, and blaze orange during deer season.',
      'Binoculars, for the water birds.',
      'Shoes that don’t mind mud at the water’s edge.',
    ],
    costs: [
      'The whole walk is free.',
    ],
    getting: [
      'Cumberland is about 80 miles north-east of the Twin Cities. There’s street parking downtown.',
      'The walk ends at Library Lake, in the middle of town, about 500 metres from where it starts.',
    ],
    access: [
      'Flat all the way.',
      'Between the two lakes, 1st Avenue (County Road P) has no sidewalk on the map: walk on its edge, facing the traffic, for about half a kilometre.',
      'The water’s edge can be muddy, or icy in late autumn: take care near it.',
    ],
    restrictions: [
      { lead: 'The ice', text: 'In late autumn and early winter, the ice on the lakes is thin and unsafe. Don’t step onto it.' },
      { lead: 'Deer season', text: 'Wisconsin’s gun deer season runs November 21–29, 2026. Stay on the roads and paths, and wear something bright.' },
      'Some of the shore is private land: watch from the road and public spots.',
    ],
    tips: [
      'Go in the morning, when the water birds are most active.',
      'The Hay River flows south out of town all the way to the Red Cedar River, about 50 miles away.',
      'Sunset is around 4:30 PM in late November.',
    ],
  },
  match: {
    moods: { Peaceful: 90, Adventurous: 40, Romantic: 55, Curious: 75, Playful: 50, Cultural: 25 },
    with: { Solo: 90, Couple: 75, Family: 65, 'Friends / Group': 55 },
    preferences: {
      'Pet friendly': 85, 'Avoid alcohol': 95, 'More nature': 95, 'Food stops': 5,
      Coastal: 50, 'More urban': 5, 'Hiking involved': 25, 'Budget friendly': 100,
    },
  },
  description: [
    'The Ojibwe called it the lake made by the beavers. Beaver Dam Lake wraps around Cumberland, the deepest lake in Barron County, and at the south end of town it quietly turns into a river.',
    'This walk follows the water there: past the lake’s long south arm, between it and little Collingwood Lake, to the spot where the Hay River begins its 50-mile run toward the Mississippi, then back to a still lake in the middle of town.',
  ],
  // Why It's Cool on the journey's page (JourneyPage.jsx): what you'll
  // discover, why it matters, and what it feels like, a sentence each.
  whyCool: {
    discovery: 'The spot where a lake quietly turns into a river, at the south end of town.',
    significance: 'The lake the Ojibwe named for the beavers, and the start of the Hay River’s 50-mile run to the Mississippi.',
    feeling: 'Still and calm: quiet shores, resting water birds, and the slow pull of the water as it leaves.',
  },
  route: [elmStreet, southBay, betweenLakes, haySource, libraryLake],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Cumberland, following the water out. Whatever you took from the walk, it’s yours now.',
    summary: 'You started at the south end of downtown, watched the water birds on the lake’s south arm, walked between two lakes, found where the Hay River begins, and finished by still water in the middle of town.',
  },
}
