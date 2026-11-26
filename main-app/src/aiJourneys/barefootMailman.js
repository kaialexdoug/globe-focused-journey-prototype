// In the Barefoot Mailman's Footsteps (Pompano Beach): a beach walk for a
// couple, made to the Journey Engine V2 handoff (Broward County, Florida).
//
// Its peak, chosen first: Hillsboro Inlet and its lighthouse of 1907, seen
// across the inlet from Hillsboro Inlet Park at the end of a long barefoot
// walk up the beach, where in 1887 one of the barefoot mailmen disappeared.
// The thread is the mail route itself: before roads, letters were carried
// along this beach on foot, and you walk a piece of it.
//
// Primary mood: Adventurous. Audience: a couple. On foot along the beach,
// about 3.5 km each way (the sand makes it feel longer).
//
// Exact spots from OpenStreetMap and geotagged Commons photos; walks from
// Google's Routes API (November 2026). Checked in November 2026 against
// Florida State Parks (the barefoot mail route), Florida's historical marker
// for James Hamilton, Broward County's page on the Hillsboro Inlet Light
// Station, and Pompano Beach's pages for its pier.

import heroPhoto from '../assets/journey/barefoot-mailman/hero.jpg'
import pierPhoto from '../assets/journey/barefoot-mailman/pier.jpg'
import beachPhoto from '../assets/journey/barefoot-mailman/beach.jpg'
import lighthousePhoto from '../assets/journey/barefoot-mailman/lighthouse.jpg'
import inletPhoto from '../assets/journey/barefoot-mailman/inlet.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const pier = {
  id: 'pompanoPier',
  name: 'Pompano Beach Pier',
  photo: pierPhoto,
  photoAlt: 'The long fishing pier at Pompano Beach stretching out over the sea',
  memory: 'Shoes off.',
  mapPlace: 'Fisher Family Pier, Pompano Beach, FL',
  mapPoint: { lat: 26.23518, lng: -80.08726 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [15, 20],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Take your shoes off. Today you’re carrying the mail.' },
    { kind: 'heading', text: 'The pier' },
    { text: 'Pompano Beach’s pier runs about 900 feet out to sea, and its far end is shaped like the fish the town is named for. Walk out first and look north up the coast: the lighthouse at the end of today’s walk is up there.' },
    { kind: 'find', text: 'From the end of the pier, look north along the shore and find the lighthouse.' },
    { className: 'narrationClose', text: 'Now down to the sand, and walk north along the water’s edge, about 20 minutes. Tap “I’m Here” when the hotels give way to houses.' },
  ],
}

const mailmansBeach = {
  id: 'mailmansBeach',
  name: 'The Mail Route',
  photo: beachPhoto,
  photoAlt: 'The long beach at Pompano Beach from the air, with the pier and the ocean',
  memory: 'Sixty-eight miles on foot.',
  mapPlace: 'Pompano Beach, FL',
  mapPoint: { lat: 26.245, lng: -80.085 },
  travelMode: 'walking',
  distanceMeters: 1599,
  travelMinutes: 22,
  effort: { level: 'moderate', note: 'North along the beach, on sand' },
  stayMinutes: [5, 10],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The barefoot mailmen' },
    { text: 'In the late 1800s there was no road down this coast. The mail between Palm Beach and Miami was carried on foot, 68 miles along the beach, by men who walked barefoot on the hard, wet sand at the water’s edge, because it was easier going. Where inlets cut the beach, they rowed across in small boats kept there for them.' },
    { kind: 'find', text: 'Find the hard, wet sand right at the edge of the water and walk on that, the way they did. Feel the difference?' },
    { className: 'narrationClose', text: 'Keep going north to the inlet, about 25 minutes more. Tap “I’m Here” at Hillsboro Inlet Park.' },
  ],
}

const inletPark = {
  id: 'hillsboroInletPark',
  name: 'Hillsboro Inlet Park',
  photo: inletPhoto,
  photoAlt: 'Hillsboro Inlet and its lighthouse from the air, with boats in the channel',
  memory: 'Where James Hamilton was lost.',
  mapPlace: 'Hillsboro Inlet Park, 2700 N Ocean Blvd, Pompano Beach, FL',
  mapPoint: { lat: 26.26067, lng: -80.08428 },
  travelMode: 'walking',
  distanceMeters: 1891,
  travelMinutes: 26,
  effort: { level: 'moderate', note: 'On along the sand to the inlet' },
  stayMinutes: [15, 20],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'The inlet' },
    { text: 'In October 1887 a barefoot mailman named James Edward Hamilton reached this inlet and found that someone had moved his boat to the far side. He is believed to have tried to swim across, and drowned. He was never found. A state historical marker tells his story, and a statue of a barefoot mailman stands by the lighthouse across the water.' },
    { kind: 'find', text: 'Watch how fast the water runs through the inlet, and think of a man standing here with the mail, looking across.' },
    { className: 'narrationClose', text: 'Now find the best spot in the park to see the lighthouse. Tap “I’m Here” when it’s in view.' },
  ],
}

const lighthouse = {
  id: 'hillsboroLighthouse',
  name: 'Hillsboro Inlet Lighthouse',
  mapName: 'The lighthouse',
  photo: lighthousePhoto,
  photoAlt: 'The black-and-white iron Hillsboro Inlet Lighthouse among palms',
  memory: 'The light across the inlet.',
  mapPlace: 'Hillsboro Inlet Park, Pompano Beach, FL',
  mapPoint: { lat: 26.26, lng: -80.0832 },
  travelMode: 'walking',
  distanceMeters: 98,
  travelMinutes: 1,
  effort: { level: 'easy', note: 'A few steps to the water' },
  stayMinutes: [30, 45],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The light' },
    { text: 'Across the water stands the Hillsboro Inlet Lighthouse, finished in 1907, twenty years after Hamilton was lost, its light 136 feet above the sea. It stands on private land, so this park is the place to see it clearly. Boats still run in and out beneath it, timing the tide and the waves.' },
    { kind: 'find', text: 'Stay until the light comes on, if you can, and count the boats that make it through the inlet.' },
    PEAK_CLOSE,
  ],
}

const walkBack = {
  id: 'walkBack',
  name: 'Back to the Pier',
  photo: pierPhoto,
  photoAlt: 'The long fishing pier at Pompano Beach stretching out over the sea',
  memory: 'The mail delivered.',
  mapPlace: 'Fisher Family Pier, Pompano Beach, FL',
  mapPoint: { lat: 26.23518, lng: -80.08726 },
  travelMode: 'walking',
  distanceMeters: 3231,
  travelMinutes: 45,
  effort: { level: 'moderate', note: 'Back south along the beach' },
  stayMinutes: [15, 30],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Delivered' },
    { text: 'The barefoot mailmen made this walk every week, there and back, in all weather. You’ve done a few miles of it. Walk back along the water’s edge as the light goes, with the pier lights ahead of you.' },
    { kind: 'find', text: 'Look back once, near the pier, and find the lighthouse’s beam.' },
    { className: 'narrationClose', text: 'That’s the end. Find dinner near the pier: you’ve earned it.' },
  ],
}

export default {
  id: 'barefootMailman',
  aiMade: true,
  name: 'In the Barefoot Mailman’s Footsteps',
  location: 'POMPANO BEACH · FLORIDA, USA',
  city: 'Pompano Beach',
  photo: heroPhoto,
  photoAlt: 'The Hillsboro Inlet Lighthouse rising above palms',
  blurb: 'Walk a piece of the old barefoot mail route up the beach to the inlet where a mailman was lost, and its lighthouse.',
  walking: 'Moderate walking',
  stops: '~5 stops',
  difficulty: 'Moderate',
  experiences: ['Adventure', 'Historical', 'Scenic', 'Nature'],
  departure: pier,
  discovery: mailmansBeach,
  build: inletPark,
  peak: lighthouse,
  afterglow: walkBack,
  startArea: 'Pompano Beach, Florida, USA',
  startNote: START_NOTE,
  bestTime: {
    season: 'October to May',
    seasonNote: 'Cooler for a long beach walk. Walk near low tide, when the hard sand is widest.',
    timeOfDay: 'Late afternoon',
    timeNote: 'So you reach the inlet as the light softens, with time to walk back before dark.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Bare feet, or sandals you don’t mind getting wet.',
      'Water and sun protection: there’s little shade on the beach.',
      'A tide table: the walk is easiest at low tide.',
    ],
    costs: [
      'The beach and Hillsboro Inlet Park are free.',
      { lead: 'The pier', text: 'There’s a fee to fish from it.' },
    ],
    getting: [
      'Start at the pier at the end of Atlantic Boulevard, in Pompano Beach. There’s public parking nearby.',
      'It’s an out-and-back walk: you return along the beach to the pier.',
    ],
    access: [
      'About 7 km of walking on sand in all. Not suitable for strollers or wheelchairs.',
    ],
    restrictions: [
      { lead: 'The lighthouse', text: 'It stands on private land. The Hillsboro Lighthouse Preservation Society runs tours on a few days a year: check its website.' },
      { lead: 'The inlet', text: 'The current runs fast through it: don’t swim there.' },
    ],
    tips: [
      'The pier is open from early morning until 10 PM, by most listings.',
    ],
  },
  match: {
    moods: { Peaceful: 60, Adventurous: 85, Romantic: 70, Curious: 75, Playful: 40, Cultural: 45 },
    with: { Solo: 75, Couple: 90, Family: 45, 'Friends / Group': 75 },
    preferences: {
      'Pet friendly': 10, 'Avoid alcohol': 95, 'More nature': 75, 'Food stops': 10,
      Coastal: 98, 'More urban': 10, 'Hiking involved': 60, 'Budget friendly': 95,
    },
  },
  description: [
    'Before there were roads on this coast, the mail from Palm Beach to Miami went on foot: 68 miles along the beach, carried by men who walked barefoot on the hard sand at the water’s edge.',
    'This walk takes a piece of their route, from Pompano Beach’s pier north along the sand to Hillsboro Inlet, where in 1887 one of them was lost, and where a lighthouse has stood since 1907.',
  ],
  whyCool: {
    discovery: 'The barefoot mail route, still a beach you can walk.',
    significance: 'The inlet where mailman James Hamilton was lost in 1887, and its 1907 lighthouse.',
    feeling: 'Free and windswept: a long walk barefoot, with a story waiting at the end.',
  },
  route: [pier, mailmansBeach, inletPark, lighthouse, walkBack],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was a piece of the barefoot mail route, and you delivered.',
    summary: 'You started on Pompano Beach’s pier, walked barefoot up the old mail route along the water’s edge, reached the inlet where James Hamilton was lost in 1887, watched the lighthouse across the water, and walked the mail back home.',
  },
}
