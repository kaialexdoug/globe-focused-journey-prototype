// Broadwalk to the Treetops (Hollywood): a playful family day, made to the
// Journey Engine V2 handoff (Broward County, Florida).
//
// Its peak, chosen first: climbing the five-level observation tower at the
// Anne Kolb Nature Center, high over a mangrove forest, with the ocean on
// one side and the city on the other. The way there is the Broadwalk, a
// wide promenade on the sand that a 1920s dreamer built to rival Atlantic
// City. The thread is two kinds of shore: the busy beach people built, and
// the wild one next door that people saved.
//
// Primary mood: Playful. Audience: a family with children. On foot along
// the Broadwalk (about 1 km, or ride bikes), then a 5-minute drive to the
// nature center.
//
// Exact spots from OpenStreetMap and geotagged Commons photos; walks and the
// drive from Google's Routes API (November 2026). Checked in November 2026
// against the American Planning Association's "Great Places" page on the
// Broadwalk, Florida Memory on Hollywood's founding, and the Great Florida
// Birding Trail and visitor listings for the Anne Kolb Nature Center.

import heroPhoto from '../assets/journey/hollywood-beach/hero.jpg'
import theatrePhoto from '../assets/journey/hollywood-beach/theatre.jpg'
import broadwalkPhoto from '../assets/journey/hollywood-beach/broadwalk.jpg'
import northPhoto from '../assets/journey/hollywood-beach/beach-2.jpg'
import towerPhoto from '../assets/journey/hollywood-beach/tower-view.jpg'
import boardwalkPhoto from '../assets/journey/hollywood-beach/boardwalk.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const johnsonStreet = {
  id: 'johnsonStreet',
  name: 'Hollywood Beach Theatre',
  photo: theatrePhoto,
  photoAlt: 'The open-air Hollywood Beach Theatre on the Broadwalk at Johnson Street',
  memory: 'A dreamer’s beach.',
  mapPlace: 'Hollywood Beach Theatre, Johnson Street and the Broadwalk, Hollywood, FL',
  mapPoint: { lat: 26.01952, lng: -80.11514 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [10, 15],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Today you’ve got two beaches: the one people built, and the wild one next door.' },
    { kind: 'heading', text: 'A dreamer’s town' },
    { text: 'In the 1920s a developer called Joseph Young dreamed up a whole new city here, Hollywood-by-the-Sea, and became its first mayor when it was incorporated in 1925. He wanted a South Florida answer to Atlantic City, and its heart was this: a wide promenade right on the beach.' },
    { kind: 'heading', text: 'The Broadwalk' },
    { text: 'It’s called the Broadwalk, not the boardwalk, because it’s paved, not planked: about two and a half miles long and 30 feet wide, with the sand on one side and cafés, shops and parks on the other.' },
    { kind: 'find', text: 'Find the open-air stage of the theatre, and take turns doing a bow on it.' },
    { className: 'narrationClose', text: 'Now head north along the Broadwalk, a couple of minutes. Tap “I’m Here” when you’re out on the promenade by the sand.' },
  ],
}

const broadwalk = {
  id: 'broadwalk',
  name: 'The Broadwalk',
  photo: broadwalkPhoto,
  photoAlt: 'The beach and the sea beside the Broadwalk at Hollywood Beach',
  memory: 'Wheels, feet and sand.',
  mapPlace: 'Hollywood Beach Broadwalk, Hollywood, FL',
  mapPoint: { lat: 26.0211, lng: -80.1152 },
  travelMode: 'walking',
  distanceMeters: 175,
  travelMinutes: 2,
  effort: { level: 'easy', note: 'Flat, along the Broadwalk' },
  stayMinutes: [15, 30],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Everyone’s promenade' },
    { text: 'The Broadwalk is shared by walkers, joggers, people on bikes and families with strollers, with the beach right alongside. Charnow Park, on the Broadwalk, has shade, picnic spots, playgrounds and a fountain children can play in.' },
    { kind: 'find', text: 'Play spot-it: who can find a dog, a bike, a sandcastle and a pelican first?' },
    { className: 'narrationClose', text: 'Keep going north, about 10 minutes. Tap “I’m Here” when the buildings thin out.' },
  ],
}

const northBroadwalk = {
  id: 'northBroadwalk',
  name: 'North Along the Sand',
  photo: northPhoto,
  photoAlt: 'Palms and pale sand beside the sea at Hollywood Beach',
  memory: 'The edge of the built beach.',
  mapPlace: 'Hollywood Beach Broadwalk, Hollywood, FL',
  mapPoint: { lat: 26.0279, lng: -80.1148 },
  travelMode: 'walking',
  distanceMeters: 756,
  travelMinutes: 10,
  effort: { level: 'easy', note: 'Flat, along the Broadwalk' },
  stayMinutes: [20, 45],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'Time for the sea' },
    { text: 'This is a good stretch for a swim and a picnic. Somewhere just west of here, across the Intracoastal Waterway, is a very different kind of shore: a mangrove forest nobody was allowed to build on. That’s where you’re going next.' },
    { kind: 'find', text: 'Build a sandcastle with a moat, and see how long it lasts against the waves.' },
    { className: 'narrationClose', text: 'When you’re ready, drive to the Anne Kolb Nature Center on Sheridan Street, about 5 minutes. Tap “I’m Here” at the entrance.' },
  ],
}

const kolbTower = {
  id: 'kolbTower',
  name: 'The Observation Tower',
  photo: towerPhoto,
  photoAlt: 'Mangroves and water seen from the observation tower at the Anne Kolb Nature Center',
  memory: 'Above the treetops.',
  mapPlace: 'Anne Kolb Nature Center, 751 Sheridan St, Hollywood, FL',
  mapPoint: { lat: 26.0387, lng: -80.1199 },
  travelMode: 'driving',
  distanceMeters: 2045,
  travelMinutes: 5,
  effort: { level: 'easy', note: 'A short drive across the Intracoastal, then the tower’s stairs' },
  stayMinutes: [30, 60],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'Up the tower' },
    { text: 'Climb the five levels of the observation tower, about 68 feet up, and you’re above a whole forest of mangroves, with the ocean on one side and the city on the other. Inside the nature center there’s a 3,500-gallon saltwater aquarium and a short film about the life of this lagoon.' },
    { kind: 'heading', text: 'The shore that was saved' },
    { text: 'The center is named after Anne Kolb, who worked to save this land from being built on. Broward County bought it in 1990, and the center opened in 1996. Look back east: you can see the beach you came from.' },
    { kind: 'find', text: 'From the top, find the ocean, the city, and a boat on the water. Who spots a bird of prey first?' },
    PEAK_CLOSE,
  ],
}

const kolbBoardwalk = {
  id: 'kolbBoardwalk',
  name: 'The Mangrove Boardwalk',
  photo: boardwalkPhoto,
  photoAlt: 'A boardwalk winding through the mangroves below the Anne Kolb tower',
  memory: 'In among the roots.',
  mapPlace: 'Anne Kolb Nature Center, Hollywood, FL',
  mapPoint: { lat: 26.0384, lng: -80.1195 },
  travelMode: 'walking',
  distanceMeters: 153,
  travelMinutes: 2,
  effort: { level: 'easy', note: 'Down the tower and onto the boardwalk' },
  stayMinutes: [20, 40],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'A nursery in the roots' },
    { text: 'Down on the boardwalk, you’re in among the tangled roots you saw from above. Mangroves like these are nurseries for young fish, crabs and birds: a wild shore, right next to the busy one.' },
    { kind: 'find', text: 'Look down between the roots. Can you spot a crab or a fish?' },
    { className: 'narrationClose', text: 'That’s two beaches in one day. Well done, explorers.' },
  ],
}

export default {
  id: 'hollywoodBeach',
  aiMade: true,
  name: 'Broadwalk to the Treetops',
  location: 'HOLLYWOOD · FLORIDA, USA',
  city: 'Hollywood',
  photo: heroPhoto,
  photoAlt: 'Palms and pale sand beside the sea at Hollywood Beach',
  blurb: 'A 1920s promenade on the sand, a swim and a sandcastle, then a tower above a mangrove forest.',
  walking: 'Walk + drive',
  stops: '~5 stops',
  difficulty: 'Easy',
  experienceLevel: 'simpleEscape',
  experiences: ['Interactive', 'Nature', 'Scenic', 'Historical'],
  departure: johnsonStreet,
  discovery: broadwalk,
  build: northBroadwalk,
  peak: kolbTower,
  afterglow: kolbBoardwalk,
  startArea: 'Hollywood, Florida, USA',
  startNote: START_NOTE,
  bestTime: {
    season: 'Any time of year',
    seasonNote: 'Cooler from November to April; summer is hot but best for swimming.',
    timeOfDay: 'From mid-morning',
    timeNote: 'The beach first, then the nature center in the afternoon, before it closes.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Swimsuits, towels, sun hats and sunscreen.',
      'A bucket and spade for the sandcastle.',
      'Binoculars for the tower, and insect repellent for the boardwalk.',
    ],
    costs: [
      'The Broadwalk and the beach are free; parking nearby is paid.',
      { lead: 'Anne Kolb Nature Center', text: 'The trails and tower are free by most listings; there may be a small fee for the exhibit hall.' },
    ],
    getting: [
      'Start at the Hollywood Beach Theatre on the Broadwalk at Johnson Street.',
      'The nature center is at 751 Sheridan Street, about 5 minutes’ drive from the beach. Walking there is long and busy, so drive.',
    ],
    access: [
      'The Broadwalk is flat and paved, good for strollers and bikes. The tower has stairs.',
    ],
    restrictions: [
      { lead: 'Anne Kolb Nature Center', text: 'Listings give 9 AM–5 PM; hours vary with the season, so check before you go.' },
    ],
    tips: [
      'Charnow Park’s fountain is a good place to cool off between swims.',
    ],
  },
  match: {
    moods: { Peaceful: 50, Adventurous: 45, Romantic: 30, Curious: 60, Playful: 95, Cultural: 25 },
    with: { Solo: 40, Couple: 55, Family: 98, 'Friends / Group': 65 },
    preferences: {
      'Pet friendly': 30, 'Avoid alcohol': 85, 'More nature': 70, 'Food stops': 50,
      Coastal: 95, 'More urban': 40, 'Hiking involved': 10, 'Budget friendly': 90,
    },
  },
  description: [
    'In the 1920s Joseph Young built a whole city by the sea, Hollywood, and gave it a wide promenade right on the beach. Next door, across the waterway, a mangrove forest was saved from building and given a tower to climb.',
    'This family day is two shores in one: the busy Broadwalk and its beach, for walking, swimming and sandcastles, then the wild one, with a tower above the treetops and a boardwalk among the roots.',
  ],
  whyCool: {
    discovery: 'A 2.5-mile promenade right on the sand, and a mangrove forest next door.',
    significance: 'Joseph Young’s 1920s Hollywood-by-the-Sea, and a wild shore saved from building.',
    feeling: 'Sunny and playful: swim, build, climb and explore, all in one day.',
  },
  route: [johnsonStreet, broadwalk, northBroadwalk, kolbTower, kolbBoardwalk],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was two beaches in one day: the built one and the wild one.',
    summary: 'You started at the Broadwalk’s theatre, walked and played along the promenade, built a sandcastle on the beach, climbed the tower above the mangroves at the Anne Kolb Nature Center, and explored the boardwalk among the roots.',
  },
}
