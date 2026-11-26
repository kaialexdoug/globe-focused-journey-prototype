// The River That Made Fort Lauderdale: a curious afternoon for a couple
// along the New River, made to the Journey Engine V2 handoff (Broward
// County, Florida: one of the county's group, each a different place, mood
// and audience).
//
// Its peak, chosen first: a guided tour of Stranahan House (1901), the
// city's oldest surviving building, a trading post where Seminole families
// came by dugout canoe. The thread is the river and the couple who grew a
// city beside it: Frank Stranahan, who came in 1893 to run a ferry, and Ivy
// Cromartie, who came in 1899 to be the settlement's first teacher.
//
// Primary mood: Curious. Audience: a couple. On foot along the Riverwalk,
// about 3.2 km, flat.
//
// Exact spots from OpenStreetMap and geotagged Commons photos; walks from
// Google's Routes API (November 2026). Checked in November 2026 against
// Stranahan House's own pages (its history, tours and prices) and listings
// for History Fort Lauderdale (the New River Inn, the King-Cromartie House
// and the schoolhouse replica). See JOURNEY_ENGINE_LOG.md.

import heroPhoto from '../assets/journey/ftl-river/hero.jpg'
import esplanadePhoto from '../assets/journey/ftl-river/esplanade.jpg'
import newRiverInnPhoto from '../assets/journey/ftl-river/new-river-inn.jpg'
import riverwalkPhoto from '../assets/journey/ftl-river/riverwalk.jpg'
import stranahanPhoto from '../assets/journey/ftl-river/stranahan-house.jpg'
import lasOlasPhoto from '../assets/journey/ftl-river/las-olas.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE, DINNER } from './parts.js'

const esplanade = {
  id: 'esplanadePark',
  name: 'The New River',
  photo: esplanadePhoto,
  photoAlt: 'The Riverwalk and the New River beside the Broward Center for the Performing Arts',
  memory: 'The river the city grew from.',
  mapPlace: 'Esplanade Park, Riverwalk, Fort Lauderdale, FL',
  mapPoint: { lat: 26.11926, lng: -80.14842 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'This river is why there’s a city here at all.' },
    { kind: 'heading', text: 'A highway of water' },
    { text: 'Long before roads, the New River was the way in and out. Seminole families paddled down it in dugout canoes to trade, and the first settlers built along its banks. Fort Lauderdale itself is named after forts built nearby during the Second Seminole War, and the city wasn’t incorporated until 1911.' },
    { kind: 'heading', text: 'Two people' },
    { text: 'This afternoon follows the river east to the house of the two people who did more than anyone to turn a trading post into a town: a young man from Ohio who came to run a ferry, and an 18-year-old teacher.' },
    { kind: 'find', text: 'Watch the river for a minute. Count the boats that go by: it’s still a highway.' },
    { className: 'narrationClose', text: 'Walk east along the Riverwalk to History Fort Lauderdale, about 5 minutes. Tap “I’m Here” at the New River Inn.' },
  ],
}

const historyFtl = {
  id: 'historyFortLauderdale',
  name: 'History Fort Lauderdale',
  photo: newRiverInnPhoto,
  photoAlt: 'The New River Inn of 1905, now the history museum, with its long verandas',
  memory: 'The schoolhouse where the story begins.',
  mapPlace: 'History Fort Lauderdale, 231 SW 2nd Ave, Fort Lauderdale, FL',
  mapPoint: { lat: 26.11975, lng: -80.14575 },
  travelMode: 'walking',
  distanceMeters: 422,
  travelMinutes: 6,
  effort: { level: 'easy', note: 'Flat, along the Riverwalk' },
  stayMinutes: [30, 60],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The oldest hotel in the county' },
    { text: 'The New River Inn was built in 1905 by Edwin T. King, the area’s first contractor, and it’s the oldest surviving hotel building in Broward County. Today it’s the main museum of local history, beside the 1907 King-Cromartie House and a little schoolhouse.' },
    { kind: 'heading', text: 'Nine pupils and a teacher' },
    { text: 'The schoolhouse is a copy of the one the settlement built in 1899, when there were finally enough children to need a teacher. They hired Ivy Cromartie, 18, from Lemon City, for $48 a month, to teach nine pupils. The man who ran the trading post down the river was also the postmaster, and before long Ivy and Frank Stranahan were courting.' },
    { kind: 'find', text: 'Find the little schoolhouse, and imagine the nine desks.' },
    { className: 'narrationClose', text: 'Now follow the Riverwalk east, toward the Stranahans’ house, about 15 minutes. Tap “I’m Here” where the river bends near Federal Highway.' },
  ],
}

const riverwalk = {
  id: 'riverwalk',
  name: 'The Riverwalk',
  photo: riverwalkPhoto,
  photoAlt: 'Boats moored along the New River beside the Riverwalk in Fort Lauderdale',
  memory: 'A ferry, a trading post and a courtship.',
  mapPlace: 'Riverwalk, New River, Fort Lauderdale, FL',
  mapPoint: { lat: 26.1167, lng: -80.1392 },
  travelMode: 'walking',
  distanceMeters: 1065,
  travelMinutes: 15,
  effort: { level: 'easy', note: 'Flat, east along the river' },
  stayMinutes: [10, 15],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'The man from Ohio' },
    { text: 'Frank Stranahan arrived in January 1893, aged 27, to manage his cousin’s ferry and camp on the New River. He soon built a thriving trade with the Seminoles, and he was known for treating them fairly; whole families would paddle in and camp at the post for days. In 1894 he bought ten acres along the river, and the settlement grew up around his store.' },
    { kind: 'heading', text: 'A wedding on the river' },
    { text: 'Frank and Ivy married on 16 August 1900. Like most women then, she gave up her teaching post when she married, but not teaching: she began giving lessons to Seminole children, in a way that earned the respect of the tribe’s elders.' },
    { kind: 'find', text: 'Look across the water for the white two-storey house with deep verandas. That’s where you’re going.' },
    { className: 'narrationClose', text: 'Walk on to Stranahan House, about 15 minutes. Tours start on the hour: tap “I’m Here” at its gate.' },
  ],
}

const stranahan = {
  id: 'stranahanHouse',
  name: 'Stranahan House',
  photo: stranahanPhoto,
  photoAlt: 'Stranahan House, a white two-storey wooden house with deep verandas, among palms',
  memory: 'The trading post that became a home.',
  mapPlace: 'Historic Stranahan House Museum, 335 S Federal Hwy, Fort Lauderdale, FL',
  mapPoint: { lat: 26.11844, lng: -80.13745 },
  travelMode: 'walking',
  distanceMeters: 974,
  travelMinutes: 13,
  effort: { level: 'easy', note: 'Flat, along the river' },
  stayMinutes: [60, 75],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'A trading post, then a home' },
    { text: 'Frank built this house in 1901. Downstairs was the trading post, upstairs a hall for the whole community. As the town grew, especially after the railroad arrived, he moved his business to a store and a bank nearby, and the post became the Stranahans’ home. It’s the oldest surviving building in Fort Lauderdale.' },
    { kind: 'heading', text: 'What came after' },
    { text: 'The Florida land boom collapsed in 1926, and two hurricanes followed. Frank lost nearly everything, and in 1929 he died in the river in front of this house. Ivy stayed. She rented out rooms, led civic causes, founded a local Friends of the Seminoles, and lived here until her death in 1971, at 90. The house has been a museum since 1984.' },
    { kind: 'find', text: 'On the tour, find the room that was the trading post, and picture the canoes pulled up on the riverbank outside.' },
    PEAK_CLOSE,
  ],
}

const lasOlas = {
  id: 'lasOlas',
  name: 'Las Olas Boulevard',
  photo: lasOlasPhoto,
  photoAlt: 'Shops and palms along Las Olas Boulevard in Fort Lauderdale',
  memory: 'Dinner in the city they started.',
  mapPlace: 'Las Olas Boulevard, Fort Lauderdale, FL',
  mapPoint: { lat: 26.1193, lng: -80.1328 },
  travelMode: 'walking',
  distanceMeters: 740,
  travelMinutes: 10,
  effort: { level: 'easy', note: 'Flat, a few blocks north and east' },
  stayMinutes: [60, 120],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The city they started' },
    { text: 'A few blocks from a trading post on a river, Las Olas Boulevard is all shops, galleries and restaurants now. Everything around you grew from that ferry, that store and that one-room school.' },
    { kind: 'find', text: 'Find a table outside, and toast Frank and Ivy.' },
    DINNER,
  ],
}

export default {
  id: 'fortLauderdaleRiver',
  aiMade: true,
  name: 'The River That Made Fort Lauderdale',
  location: 'FORT LAUDERDALE · FLORIDA, USA',
  city: 'Fort Lauderdale',
  photo: heroPhoto,
  photoAlt: 'Stranahan House seen from the New River in Fort Lauderdale',
  blurb: 'A river highway, a one-room school, a trading post where Seminole families came by canoe, and the couple who built a city.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Historical', 'Cultural', 'Scenic'],
  departure: esplanade,
  discovery: historyFtl,
  build: riverwalk,
  peak: stranahan,
  afterglow: lasOlas,
  startArea: 'Downtown Fort Lauderdale, Florida, USA',
  startNote: START_NOTE,
  bestTime: {
    season: 'October to May',
    seasonNote: 'The cooler, drier months make the Riverwalk pleasant all afternoon.',
    timeOfDay: 'From about noon',
    timeNote: 'To catch a 2 or 3 PM tour at Stranahan House, and Las Olas at dinnertime.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Comfortable shoes: about 3 km on the Riverwalk, and an hour on your feet in the house.',
      'Water and sun protection.',
    ],
    costs: [
      { lead: 'Stranahan House', text: 'Guided tours only, about $12–13 for adults (its pages differ), less for seniors, students and children. Book online to be sure of a place.' },
      { lead: 'History Fort Lauderdale', text: 'About $10 for adults, with tours of the house and schoolhouse (listings; check before you go).' },
      'The Riverwalk is free.',
    ],
    getting: [
      'Start at Esplanade Park on the Riverwalk, by the Broward Center for the Performing Arts, downtown. There’s public parking nearby.',
      'It ends on Las Olas Boulevard, a few blocks from Stranahan House.',
    ],
    access: [
      'The Riverwalk is flat and paved. The house tour involves stairs.',
    ],
    restrictions: [
      { lead: 'Stranahan House', text: 'Tours start on the hour (often 1, 2 and 3 PM) and last 45–60 minutes; times vary with volunteers, so check its tour page. Closed on major holidays.' },
      { lead: 'History Fort Lauderdale', text: 'Listings give 10 AM–4 PM, with guided tours at 1, 2 and 3 PM.' },
    ],
    tips: [
      'Book the Stranahan House tour first, then plan the walk back from it.',
      'Fort Lauderdale residents get in free on Wednesdays, with ID.',
    ],
  },
  match: {
    moods: { Peaceful: 45, Adventurous: 15, Romantic: 60, Curious: 92, Playful: 25, Cultural: 85 },
    with: { Solo: 75, Couple: 92, Family: 45, 'Friends / Group': 65 },
    preferences: {
      'Pet friendly': 40, 'Avoid alcohol': 70, 'More nature': 30, 'Food stops': 70,
      Coastal: 20, 'More urban': 85, 'Hiking involved': 5, 'Budget friendly': 70,
    },
  },
  description: [
    'Fort Lauderdale began on a river. In the 1890s it was a ferry crossing and a trading post where Seminole families came by dugout canoe, run by a young man from Ohio who married the settlement’s first teacher.',
    'This walk follows the New River from the museum where her schoolhouse stands to the house they built in 1901, now the city’s oldest, and ends on Las Olas Boulevard in the city that grew around them.',
  ],
  whyCool: {
    discovery: 'A trading post where Seminole families came by canoe, still standing on the river.',
    significance: 'The oldest building in Fort Lauderdale, and the couple who founded the city.',
    feeling: 'Curious and moving: a love story, a city’s beginning, and a hard ending, told in the house itself.',
  },
  route: [esplanade, historyFtl, riverwalk, stranahan, lasOlas],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was the New River, and the people who made a city beside it.',
    summary: 'You started on the New River, saw the schoolhouse where Ivy Cromartie taught, followed the Riverwalk to the house Frank Stranahan built in 1901, toured it, and ended on Las Olas Boulevard.',
  },
}
