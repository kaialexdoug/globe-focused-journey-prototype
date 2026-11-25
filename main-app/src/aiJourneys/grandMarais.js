// The Harbor at the Edge of the Woods (Grand Marais, Minnesota), built the
// same way as the Waseda journey (testJourney.js). Every stop has its exact
// spot (`mapPoint`, from Wikipedia and OpenStreetMap), so it gets the live
// map, and the way to it from the stop before: how far (`distanceMeters`),
// how long (`travelMinutes`) and how hard (`effort`), from Google's walking
// and driving routes and the heights along them (Open-Meteo), worked out
// once, in November 2026. Google doesn't route along the breakwall, so the
// walk out to the lighthouse was measured on the map.
//
// The narration tells one story from stop to stop: a harbor of "double
// water", sheltered by an island of old lava, and the people who have made
// their living around it, from the voyageurs and the fishermen to the
// blacksmiths, the lighthouse keepers and the makers of today. The history
// was checked against published sources (Wikipedia and North House Folk
// School) in November 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import harborPhoto from '../assets/journey/grand-marais/harbor.jpg'
import donutsPhoto from '../assets/journey/grand-marais/donuts.jpg'
import northHousePhoto from '../assets/journey/grand-marais/north-house.jpg'
import cascadeRiverPhoto from '../assets/journey/grand-marais/cascade-river.jpg'
import artistsPointPhoto from '../assets/journey/grand-marais/artists-point.jpg'
import lighthousePhoto from '../assets/journey/grand-marais/lighthouse.jpg'

// The spots near the stops.
import ballyPhoto from '../assets/journey/grand-marais/bally-blacksmith.jpg'
import keepersHousePhoto from '../assets/journey/grand-marais/lightkeepers-house.jpg'
import fishhousePhoto from '../assets/journey/grand-marais/jim-scott-fishhouse.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const harbor = {
  id: 'grandMaraisHarbor',
  name: 'Grand Marais Harbor',
  photo: harborPhoto,
  photoAlt: 'Sailboats moored in the calm water of Grand Marais harbor in soft evening light, with a gull flying overhead',
  memory: 'Where the day began.',
  mapPlace: 'Harbor Park, Grand Marais, MN',
  mapPoint: { lat: 47.7489838, lng: -90.3352601 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [15, 20],
  nearby: [
    {
      name: 'Bally Blacksmith Shop',
      note: 'Where three generations of the Bally family worked as blacksmiths, from 1911 until 2010',
      meters: 260,
      photo: ballyPhoto,
      photoAlt: 'The Bally Blacksmith Shop, a white wooden building with red doors, painted “Bill Bally Blacksmithing & Welding”',
      mapPlace: 'Bally Blacksmith Shop, Grand Marais, MN',
      mapPoint: { lat: 47.750712, lng: -90.332894 },
    },
  ],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Grand Marais.' },
    { kind: 'heading', text: 'Double water' },
    { text: 'The Ojibwe name for this place is Gichi-biitoobiig, the great double water, for the two bays side by side. In the 1700s it was a busy fur-trading station, and the French Canadian voyageurs called it Grand Marais, the great marsh, after a little marsh at the head of the bay.' },
    { kind: 'heading', text: 'A town of makers' },
    { text: 'Ever since, Grand Marais has lived by what people make and catch here. Just up the street, the Bally family were blacksmiths for nearly a century, from 1911, mending everything from lumber-camp gear to fishing rigs, cars and snowmobiles.' },
    { kind: 'find', text: 'Find the rocky point across the harbor. That’s Artist’s Point, and you’ll be out on it later.' },
    { className: 'narrationClose', text: 'Walk along the waterfront. The first stop is a little red building you’ll probably smell before you see.' },
  ],
}

const donuts = {
  id: 'worldsBestDonuts',
  name: 'World’s Best Donuts',
  photo: donutsPhoto,
  photoAlt: 'The little red World’s Best Donuts shop with white trim and window boxes of flowers',
  memory: 'A donut by the harbor.',
  mapPlace: 'World’s Best Donuts, 10 East Wisconsin Street, Grand Marais, MN',
  mapPoint: { lat: 47.7491237, lng: -90.3328646 },
  travelMode: 'walking',
  distanceMeters: 188,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'Flat, along the waterfront' },
  stayMinutes: [15, 30],
  nearby: [
    {
      name: 'Lightkeeper’s House',
      note: 'Built in 1896 for the family who kept the harbor light, and now the county’s history museum',
      meters: 20,
      photo: keepersHousePhoto,
      photoAlt: 'The Lightkeeper’s House, a white two-storey wooden house with a Museum sign over its door',
      mapPlace: 'Cook County History Museum, Grand Marais, MN',
      mapPoint: { lat: 47.74902, lng: -90.33272 },
    },
  ],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'A bold name' },
    { text: 'Merieta Altrichter started making donuts by hand here in 1969, to add to the money from her day job. In 1978 the little shop took its bold new name, and her family has run it ever since. Decide for yourself.' },
    { kind: 'heading', text: 'The keeper’s house' },
    { text: 'Right next door is the Lightkeeper’s House, built in 1896 for the family who kept the harbor light. It’s the county’s history museum now. You’ll see the light itself at the end of the day.' },
    { kind: 'find', text: 'Take your donut down to the water, and find the little white lighthouse at the end of the breakwall.' },
    { className: 'narrationClose', text: 'Next, a school on the harbor where people come to learn the old ways of making things.' },
  ],
}

const cascadeRiver = {
  id: 'cascadeRiver',
  name: 'Cascade River State Park',
  mapName: 'Cascade River',
  photo: cascadeRiverPhoto,
  photoAlt: 'The view from a lookout in Cascade River State Park, over a wide forest of green trees to a distant ridge',
  memory: 'The river through the gorge.',
  teaser: 'A river that drops through a narrow gorge in a string of little waterfalls. A short drive down the shore.',
  // Where the river comes down to the lake, at the highway.
  mapPlace: 'Cascade River State Park, MN',
  mapPoint: { lat: 47.706838, lng: -90.522621 },
  travelMode: 'driving',
  // From North House. Driven, so the time it adds is there and back.
  distanceMeters: 14901,
  travelMinutes: 10,
  effort: { level: 'easy', note: 'A ten-minute drive down the shore on Highway 61' },
  stayMinutes: [45, 60],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'A river in steps' },
    { text: 'Here, the Cascade River comes down to the lake through a narrow rocky gorge, in one small waterfall after another.' },
    { kind: 'heading', text: 'Built to be seen' },
    { text: 'In 1934, the Civilian Conservation Corps started building a wayside here, with a stone overlook wall 535 feet long, made of rock quarried nearby. It was held up as a model of how a roadside park should be done.' },
    { kind: 'find', text: 'Follow the trail up beside the river, and count the falls as you climb.' },
    BACK_TO_ROUTE,
  ],
}

const northHouse = {
  id: 'northHouse',
  name: 'North House Folk School',
  mapName: 'North House',
  photo: northHousePhoto,
  photoAlt: 'A workbench with hand tools and a half-made piece of wood, under frosted windows in a workshop at North House Folk School',
  memory: 'Old crafts by the harbor.',
  mapPlace: 'North House Folk School, 500 West Highway 61, Grand Marais, MN',
  mapPoint: { lat: 47.7490946, lng: -90.3403716 },
  travelMode: 'walking',
  distanceMeters: 572,
  travelMinutes: 8,
  effort: { level: 'easy', note: 'Along the harbor, a little uphill at the end' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Jim Scott Fishhouse',
      note: 'Built in 1907 by a family of fishermen, to clean and pack their catch, and mend their gear over the winter',
      meters: 40,
      photo: fishhousePhoto,
      photoAlt: 'The Jim Scott Fishhouse, a weathered wooden building covered in shingles',
      mapPlace: 'Jim Scott Fishhouse, Grand Marais, MN',
      mapPoint: { lat: 47.748833, lng: -90.339972 },
    },
  ],
  ...BUILD,
  detours: [cascadeRiver],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'Old crafts of the north' },
    { text: 'North House Folk School began in 1997, with a catalog of 26 classes and no building to teach them in. Then two old buildings came free on the harbor, and it’s been growing here ever since. People come from all over to learn the old crafts of the north: building boats, carving wood and plenty more.' },
    { kind: 'heading', text: 'The fishermen’s harbor' },
    { text: 'Next door is the Jim Scott Fishhouse, built in 1907 by a family of fishermen. In the season they cleaned and packed lake trout and whitefish in it, and over the winter they stored and mended their gear.' },
    { kind: 'find', text: 'Wander the campus and find something half-made: a boat, a bowl or a basket, taking shape in one of the workshops.' },
    { className: 'narrationClose', text: 'A short drive down the shore, there’s a river in a gorge, if you’d like a detour. Otherwise, walk around the harbor to the point.' },
  ],
}

const artistsPoint = {
  id: 'artistsPoint',
  name: 'Artist’s Point',
  photo: artistsPointPhoto,
  photoAlt: 'Broad, flat ledges of pinkish rock at Artist’s Point, with the lake on either side and trees beyond',
  memory: 'On the rocks at Artist’s Point.',
  mapPlace: 'Artist’s Point, Grand Marais, MN',
  mapPoint: { lat: 47.7452445, lng: -90.3296007 },
  travelMode: 'walking',
  distanceMeters: 844,
  travelMinutes: 11,
  effort: { level: 'easy', note: 'Around the harbor, then out over uneven rock' },
  stayMinutes: [30, 45],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The island that made a harbor' },
    { text: 'Artist’s Point was once an island of old lava. Over time, the lake’s currents piled up gravel between it and the shore, until it was joined to the land. It’s what shelters the harbor, and why the voyageurs and the fishermen found a safe place to land here.' },
    { kind: 'heading', text: 'Two kinds of water' },
    { text: 'On one side of you, the harbor is calm. On the other is Lake Superior, the biggest freshwater lake in the world by area, going on as far as you can see.' },
    { kind: 'find', text: 'Find a flat ledge facing the open lake, and sit for a while. Then turn around and find the harbor you walked around.' },
    PEAK_CLOSE,
  ],
}

const lighthouse = {
  id: 'grandMaraisLighthouse',
  name: 'Grand Marais Lighthouse',
  mapName: 'Lighthouse',
  photo: lighthousePhoto,
  photoAlt: 'The small white Grand Marais Lighthouse at the end of the breakwall, against a pink evening sky',
  memory: 'At the lighthouse as the sun went down.',
  mapPlace: 'Grand Marais Lighthouse, MN',
  mapPoint: { lat: 47.7451461, lng: -90.3380287 },
  travelMode: 'walking',
  // Back off the point to the breakwall (about 250 m), then out along it to
  // the light (about 400 m), measured on the map.
  distanceMeters: 645,
  travelMinutes: 9,
  effort: { level: 'easy', note: 'Out along the breakwall, which gets wet and slippery when the waves are up' },
  stayMinutes: [20, 30],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The light at the end' },
    { text: 'This little light was first lit in 1922, and it still guides boats into the harbor. Take care out here if the waves are up: the wall gets wet and slippery.' },
    { kind: 'heading', text: 'One harbor' },
    { text: 'Look back at the town from here: the keeper’s house where you had your donut, the fishhouse and the folk school, all around one harbor. It’s the same water the voyageurs came into, back in the 1700s.' },
    { kind: 'find', text: 'As it gets dark, watch for the light to come on at the top of the tower.' },
    DINNER,
  ],
}

export default {
  id: 'grandMarais',
  aiMade: true,
  name: 'The Harbor at the Edge of the Woods',
  location: 'GRAND MARAIS · MINNESOTA, USA',
  city: 'Grand Marais',
  photo: lighthousePhoto,
  photoAlt: lighthouse.photoAlt,
  blurb: 'Around a little harbor, from donuts by the water to the lighthouse at sunset.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Scenic', 'Hidden Gems', 'Interactive', 'Culinary', 'Nature'],
  departure: harbor,
  discovery: donuts,
  build: northHouse,
  peak: artistsPoint,
  afterglow: lighthouse,
  startArea: 'Grand Marais, Minnesota, USA',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Summer to early fall',
    seasonNote: 'For warm days on the harbor. The fall colors come in from late September.',
    timeOfDay: 'In the afternoon and evening',
    timeNote: 'It ends at the lighthouse, best at sunset.',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against the Minnesota DNR's state
  // park permit page.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Warm layers and a windproof jacket: Lake Superior keeps Grand Marais cool, even in summer.',
      'Shoes with a good grip, for the bare rock at Artist’s Point and the breakwall.',
      'Insect repellent in June and July.',
      'Some cash for the little shops and stands.',
    ],
    costs: [
      'The harbor, Artist’s Point, the lighthouse and North House’s grounds are free.',
      { lead: 'Cascade River State Park', text: 'A vehicle permit: $7 for a day, or $35 for a year.' },
      'Budget for donuts, and lunch by the harbor.',
    ],
    getting: [
      'You’ll need a car: Grand Marais is about 2½ hours up the shore from Duluth on Highway 61.',
      'The walk starts at the harbor and ends at the lighthouse, about 500 metres away.',
      'There’s parking around the harbor, but it fills on summer weekends.',
    ],
    access: [
      'Flat along the harbor, with a little rise up to North House.',
      'Artist’s Point is bare, uneven rock, and the breakwall to the lighthouse has no railings: neither suits a wheelchair or stroller.',
    ],
    restrictions: [
      { lead: 'The breakwall', text: 'Don’t go out on it when waves are breaking over it: it gets wet and very slippery.' },
      'Many shops, World’s Best Donuts included, only open in the warmer months, from spring to fall.',
    ],
    tips: [
      'World’s Best Donuts sells out: go early in the morning.',
      'Stay on Artist’s Point for sunset over the harbor.',
      'On a clear, dark night away from the town lights, you might see the northern lights.',
    ],
  },
  match: {
    moods: { Peaceful: 85, Adventurous: 50, Romantic: 80, Curious: 70, Playful: 45, Cultural: 40 },
    with: { Solo: 75, Couple: 90, Family: 70, 'Friends / Group': 70 },
    preferences: {
      'Pet friendly': 70, 'Avoid alcohol': 85, 'More nature': 80, 'Food stops': 65,
      Coastal: 90, 'More urban': 10, 'Hiking involved': 50, 'Budget friendly': 75,
    },
  },
  description: [
    'Grand Marais is a little harbor town far up the North Shore of Lake Superior, with the great northern woods behind it. Voyageurs traded furs here, fishermen and blacksmiths made their living here, and today it’s a town of makers and artists, all gathered around one sheltered harbor.',
    'This journey walks you around that harbor, from a donut shop by the water and a folk school full of old crafts, out onto the rocks of Artist’s Point, and along the breakwall to the lighthouse at sunset.',
  ],
  // Why It's Cool on the journey's page (JourneyPage.jsx): what you'll
  // discover, why it matters, and what it feels like, a sentence each.
  whyCool: {
    discovery: 'A little harbor town of makers and artists, where the North Shore meets the great northern woods.',
    significance: 'The voyageurs, fishermen and craftspeople who made their lives around one sheltered harbor, and the island of lava that made it.',
    feeling: 'Cozy and creative: a warm donut by the water, old crafts, wave-washed rocks, and a lighthouse at sunset.',
  },
  route: [harbor, donuts, northHouse, artistsPoint, lighthouse],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Grand Marais, all the way around the harbor. Whatever you took from the day, it’s yours now.',
    summary: 'You started at the harbor, had a donut by the water, looked in on the workshops at North House Folk School, sat on the rocks at Artist’s Point, and finished at the lighthouse at the end of the breakwall.',
  },
}
