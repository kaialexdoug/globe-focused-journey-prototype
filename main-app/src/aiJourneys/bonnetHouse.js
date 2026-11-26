// A Wedding Gift by the Sea (Fort Lauderdale): a peaceful late morning
// alone, made to the Journey Engine V2 handoff (Broward County, Florida).
//
// Its peak, chosen first: Bonnet House, an artists' winter home of 1920 in
// a subtropical garden where squirrel monkeys live in the trees, on land a
// father gave his daughter and her new husband. The thread is one man's
// love of a stretch of wild coast: Hugh Taylor Birch, who bought it for
// about a dollar an acre, gave part of it to his daughter, and the rest to
// everyone as a park.
//
// Primary mood: Peaceful. Audience: one person. On foot, about 3 km, flat.
//
// Exact spots from OpenStreetMap and geotagged Commons photos; walks from
// Google's Routes API (November 2026). Checked in November 2026 against
// Florida State Parks' pages for Hugh Taylor Birch State Park (its history,
// hours and fees) and Bonnet House's own pages (its history, hours and
// admission). The beach at the end has no licensed photo yet, so it shows
// the "no image available" placeholder.

import heroPhoto from '../assets/journey/bonnet-house/hero.jpg'
import terramarPhoto from '../assets/journey/bonnet-house/terramar.jpg'
import egretPhoto from '../assets/journey/bonnet-house/egret.jpg'
import monkeyPhoto from '../assets/journey/bonnet-house/monkey.jpg'
import housePhoto from '../assets/journey/bonnet-house/house.jpg'
import noImage from '../assets/journey/no-image.svg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const birchPark = {
  id: 'birchPark',
  name: 'Hugh Taylor Birch State Park',
  mapName: 'Birch State Park',
  photo: terramarPhoto,
  photoAlt: 'The white Terramar Visitor Center, Hugh Taylor Birch’s Art Deco house, among palms',
  memory: 'A dollar an acre.',
  mapPlace: 'Terramar Visitor Center, Hugh Taylor Birch State Park, Fort Lauderdale, FL',
  mapPoint: { lat: 26.1378, lng: -80.1059 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [15, 20],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'A quiet morning, in a green island in the middle of the city.' },
    { kind: 'heading', text: 'A dollar an acre' },
    { text: 'In 1893 a Chicago lawyer, Hugh Taylor Birch, came south to escape the crowds pouring into his city for the World’s Fair. He found a tiny settlement on the New River and fell for the empty coast beside it, buying oceanfront land for about a dollar an acre until he owned three and a half miles of beach.' },
    { kind: 'heading', text: 'Terramar' },
    { text: 'At 90, in 1940, he built this Art Deco house and called his estate Terramar, “land to the sea”. Rather than see it built over, he gave it away as a public park; the state took title on the last day of 1941, and Birch died two years later.' },
    { kind: 'find', text: 'Stand still for a minute and listen: traffic on one side, birds on the other.' },
    { className: 'narrationClose', text: 'Walk north into the park, along the lagoon, about 10 minutes. Tap “I’m Here” where the water opens out.' },
  ],
}

const lagoon = {
  id: 'birchLagoon',
  name: 'The Park’s Quiet Side',
  photo: egretPhoto,
  photoAlt: 'A great egret standing in the shallows in Hugh Taylor Birch State Park',
  memory: 'An island of green in the city.',
  mapPlace: 'Hugh Taylor Birch State Park, Fort Lauderdale, FL',
  mapPoint: { lat: 26.143, lng: -80.106 },
  travelMode: 'walking',
  distanceMeters: 633,
  travelMinutes: 9,
  effort: { level: 'easy', note: 'Flat, along the park road and paths' },
  stayMinutes: [20, 30],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Between the ocean and the waterway' },
    { text: 'The park is a narrow barrier island of trees between the Atlantic and the Intracoastal Waterway, often compared to Central Park: an island of green in a busy city. In the shallows and the hammock you may see herons and egrets going about their mornings.' },
    { kind: 'find', text: 'Find a bird standing perfectly still in the water, and wait to see who moves first.' },
    { className: 'narrationClose', text: 'Now back south, across Sunrise Boulevard, to Bonnet House, about 15 minutes. Tap “I’m Here” at its gate.' },
  ],
}

const bonnetGardens = {
  id: 'bonnetGardens',
  name: 'Bonnet House Gardens',
  photo: monkeyPhoto,
  photoAlt: 'A squirrel monkey in the trees of the Bonnet House grounds',
  memory: 'A wedding gift.',
  mapPlace: 'Bonnet House Museum & Gardens, 900 N Birch Rd, Fort Lauderdale, FL',
  mapPoint: { lat: 26.1358, lng: -80.1041 },
  travelMode: 'walking',
  distanceMeters: 896,
  travelMinutes: 13,
  effort: { level: 'easy', note: 'Flat, back south across Sunrise Boulevard' },
  stayMinutes: [30, 45],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'A wedding gift' },
    { text: 'In 1911 Birch bought this land too. In 1919 his daughter Helen married a Chicago artist, Frederic Bartlett, and Frederic designed and began building a house here with his father-in-law’s help. It’s believed Birch wanted the newlyweds to have a winter home on the coast he loved.' },
    { kind: 'heading', text: 'Older than it looks' },
    { text: 'People were here long before. A shell mound left by the Tequesta suggests they lived on this ground perhaps as far back as 2,000 BC, living on what the fresh, brackish and salt waters around it gave them. Today, squirrel monkeys live in the trees.' },
    { kind: 'find', text: 'Walk slowly under the trees and look up. See if you can spot a squirrel monkey before it spots you.' },
    { className: 'narrationClose', text: 'Then on to the house itself. Tap “I’m Here” in its courtyard.' },
  ],
}

const bonnetHouse = {
  id: 'bonnetHouseStop',
  name: 'Bonnet House',
  photo: housePhoto,
  photoAlt: 'The buildings of Bonnet House among tropical gardens',
  memory: 'Two artists’ winter home.',
  mapPlace: 'Bonnet House, 900 N Birch Rd, Fort Lauderdale, FL',
  mapPoint: { lat: 26.13507, lng: -80.10472 },
  travelMode: 'walking',
  distanceMeters: 641,
  travelMinutes: 9,
  effort: { level: 'easy', note: 'Through the grounds' },
  stayMinutes: [60, 90],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'Loss, and a second life' },
    { text: 'Helen died in 1925, and for years Frederic hardly came. Then in 1931 he married Evelyn Fortune Lilly, and the two of them filled the house with the colour and whimsy you see today. Frederic died in 1953; Evelyn kept coming back every winter.' },
    { kind: 'heading', text: 'A gift to everyone' },
    { text: 'In 1983 Evelyn gave Bonnet House to the Florida Trust for Historic Preservation: at the time, the largest charitable gift in Florida’s history. It’s one of the few complete homes and studios of two American artists you can still visit with their own things inside.' },
    { kind: 'find', text: 'Find a quiet corner of the courtyard and sit. This is what Birch wanted to keep: the stillness, a few steps from the sea.' },
    PEAK_CLOSE,
  ],
}

const beach = {
  id: 'birchBeach',
  name: 'The Beach',
  photo: noImage,
  photoAlt: 'No photo yet of the beach across from Bonnet House',
  memory: 'Three and a half miles of it, once.',
  mapPlace: 'Fort Lauderdale Beach at Sunrise Boulevard, Fort Lauderdale, FL',
  mapPoint: { lat: 26.1355, lng: -80.1015 },
  travelMode: 'walking',
  distanceMeters: 828,
  travelMinutes: 12,
  effort: { level: 'easy', note: 'Out to A1A and across to the sand' },
  stayMinutes: [20, 45],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The coast he loved' },
    { text: 'Birch once owned three and a half miles of this shore. He gave some to his daughter and the rest to the public, and both gifts are still here for you: a garden and a park between the towers.' },
    { kind: 'find', text: 'Walk down to the water and look back at the line of green behind the beach. That’s what he saved.' },
    { className: 'narrationClose', text: 'That’s the end. Take as long as you like by the water.' },
  ],
}

export default {
  id: 'bonnetHouse',
  aiMade: true,
  name: 'A Wedding Gift by the Sea',
  location: 'FORT LAUDERDALE · FLORIDA, USA',
  city: 'Fort Lauderdale',
  photo: heroPhoto,
  photoAlt: 'Bonnet House among palms and tropical gardens in Fort Lauderdale',
  blurb: 'A coast bought for a dollar an acre, a quiet park, monkeys in the trees, and an artists’ house given as a gift twice.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Historical', 'Nature', 'Cultural', 'Hidden Gems'],
  departure: birchPark,
  discovery: lagoon,
  build: bonnetGardens,
  peak: bonnetHouse,
  afterglow: beach,
  startArea: 'Fort Lauderdale, Florida, USA',
  startNote: START_NOTE,
  bestTime: {
    season: 'November to April',
    seasonNote: 'The cooler months, when the Bartletts came too.',
    timeOfDay: 'From about 9 in the morning',
    timeNote: 'The park in the cool of the morning, and Bonnet House when it opens at 11.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Comfortable shoes, water and sun protection.',
      'Insect repellent for the gardens.',
    ],
    costs: [
      { lead: 'Hugh Taylor Birch State Park', text: '$2 on foot or by bike, $6 per car (up to eight people).' },
      { lead: 'Bonnet House', text: 'About $30 for adults for a self-guided visit (its pages differ: check when you book).' },
    ],
    getting: [
      'Start at the park entrance on Sunrise Boulevard, just west of the beach. The park has parking.',
      'Bonnet House is at 900 North Birch Road, just south of Sunrise Boulevard.',
    ],
    access: [
      'Flat paths throughout the park and the gardens.',
    ],
    restrictions: [
      { lead: 'Hugh Taylor Birch State Park', text: 'Open 8 AM to sunset every day.' },
      { lead: 'Bonnet House', text: 'Tuesday to Sunday, 11 AM–4 PM (last admission 4 PM, grounds close at 5). Closed Mondays, holidays, and for the Fort Lauderdale Air Show.' },
      'Don’t feed or touch the monkeys.',
    ],
    tips: [
      'Bonnet House also offers guided tours of the house: check its Visit page.',
    ],
  },
  match: {
    moods: { Peaceful: 95, Adventurous: 15, Romantic: 75, Curious: 70, Playful: 30, Cultural: 75 },
    with: { Solo: 95, Couple: 85, Family: 50, 'Friends / Group': 45 },
    preferences: {
      'Pet friendly': 20, 'Avoid alcohol': 95, 'More nature': 80, 'Food stops': 10,
      Coastal: 80, 'More urban': 30, 'Hiking involved': 15, 'Budget friendly': 50,
    },
  },
  description: [
    'In the 1890s a Chicago lawyer fell in love with an empty stretch of Florida coast and bought it for about a dollar an acre. He gave part of it to his daughter and her husband, an artist, for a winter home, and the rest to the public as a park.',
    'This quiet morning walks through both gifts: the park’s green island between the ocean and the waterway, then the gardens and house of Bonnet House, where monkeys live in the trees, and ends on the beach he once owned.',
  ],
  whyCool: {
    discovery: 'An artists’ house of 1920, still full of their own things, with monkeys in the garden.',
    significance: 'A Tequesta shell mound, and what was once the largest charitable gift in Florida’s history.',
    feeling: 'Peaceful and unhurried: a green, quiet morning a few steps from the city.',
  },
  route: [birchPark, lagoon, bonnetGardens, bonnetHouse, beach],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Hugh Taylor Birch’s coast, and both of his gifts.',
    summary: 'You started at Birch’s Art Deco house, walked the park’s quiet side, looked for monkeys in the Bonnet House gardens, saw the house the Bartletts made, and ended on the beach.',
  },
}
