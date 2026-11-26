// Follow the Water (Lucayan National Park, Grand Bahama): a curious morning
// for a group of friends, made to the Journey Engine V2 handoff (the Bahamas:
// one of two, chosen for friends and a curious mood; Nassau already has its
// own journey).
//
// Its peak, chosen first: Gold Rock Beach, a wide, empty beach with a reef
// offshore, reached on a boardwalk through mangroves. The thread is the
// water's own journey: rain soaking into the limestone, a lens of fresh
// water floating on salt in a cave, the Lucayans who drank it and were
// buried beside it, a mangrove creek the fish travel to through underground
// tunnels, and the sea it all ends in.
//
// Primary mood: Curious. Audience: friends. By car to the park (about 35 km
// east of Freeport), then about 2.4 km on foot. The park is only open at
// weekends.
//
// Exact spots from OpenStreetMap (the afterglow's spot on the boardwalk is
// approximate); walks from Google's Routes API (November 2026). Checked in
// November 2026 against the Bahamas National Trust's own pages for the park
// (fees, hours, the caves, the Lucayan remains, the remipedes, Gold Rock
// Creek and Beach, and the park's history). Photos are from 2012 and 2013,
// before Hurricane Dorian (2019). See JOURNEY_ENGINE_LOG.md.

import heroPhoto from '../assets/journey/grand-bahama/hero.jpg'
import pineyardsPhoto from '../assets/journey/grand-bahama/pineyards.jpg'
import bensCavePhoto from '../assets/journey/grand-bahama/bens-cave.jpg'
import burialMoundPhoto from '../assets/journey/grand-bahama/burial-mound.jpg'
import goldRockBeachPhoto from '../assets/journey/grand-bahama/gold-rock-beach.jpg'
import boardwalkPhoto from '../assets/journey/grand-bahama/boardwalk.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const entrance = {
  id: 'lucayanEntrance',
  name: 'Lucayan National Park',
  photo: pineyardsPhoto,
  photoAlt: 'Tall Caribbean pines and palmettos in Lucayan National Park',
  memory: 'The jewel of Grand Bahama.',
  mapPlace: 'Lucayan National Park, Grand Bahama Highway, Grand Bahama',
  mapPoint: { lat: 26.60543, lng: -78.40067 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in what the Bahamas National Trust calls the jewel of Grand Bahama. Today, follow the water.' },
    { kind: 'heading', text: 'Saved for everyone' },
    { text: 'In 1981 a commercial diving company wanted to lease the land around the caves here for its own exclusive use. The Bahamas National Trust argued that the caves belonged to the whole country’s natural and historic heritage, and in 1982 it took a 99-year lease to protect them instead. The park was even closed for two years to let it recover, and reopened in 1985.' },
    { kind: 'heading', text: 'Every kind of Bahamian land' },
    { text: 'In one small park there’s pine forest, dense coppice, mangrove creek and beach: every one of the Bahamas’ land habitats. And under all of it is limestone, full of holes.' },
    { kind: 'find', text: 'Look at the ground under the pines: rock and needles, and no streams anywhere. So where does the rain go? Keep that question for the next stop.' },
    { className: 'narrationClose', text: 'Follow the path to Ben’s Cave, about 5 minutes. Tap “I’m Here” at the top of its stairs.' },
  ],
}

const bensCave = {
  id: 'bensCave',
  name: 'Ben’s Cave',
  photo: bensCavePhoto,
  photoAlt: 'Clear blue water at the bottom of Ben’s Cave, with roots hanging from the rock',
  memory: 'Fresh water floating on salt.',
  mapPlace: 'Ben’s Cave, Lucayan National Park, Grand Bahama',
  mapPoint: { lat: 26.60544, lng: -78.40183 },
  travelMode: 'walking',
  distanceMeters: 419,
  travelMinutes: 6,
  effort: { level: 'easy', note: 'A short path through the forest, then stairs down to a platform' },
  stayMinutes: [15, 20],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Where the rain goes' },
    { text: 'Here’s the answer. The rain soaks down through the limestone and collects underground. Ben’s Cave holds about 60 feet of water: the top 30 feet are fresh, floating on 30 feet of salt water from the sea, with a mixing zone in between. It’s the entrance to one of the longest underwater cave systems in the world, with more than six miles of tunnels charted.' },
    { kind: 'heading', text: 'Fish that changed their minds' },
    { text: 'Grey snappers, which are saltwater fish, swim up in the fresh layer, and they travel back and forth between this cave and a creek near the sea through tunnels under your feet. In the late 1970s a biologist diving here caught a tiny, blind, centipede-like animal that turned out to be not just a new species but a whole new class of crustacean, the remipedes.' },
    { kind: 'find', text: 'From the platform, look for grey snappers in the water: sea fish living in fresh water. You’ll meet their creek later.' },
    { className: 'narrationClose', text: 'Next door is a second cave, where people were laid to rest here long before Columbus came. Tap “I’m Here” at Burial Mound Cave.' },
  ],
}

const burialMound = {
  id: 'burialMoundCave',
  name: 'Burial Mound Cave',
  photo: burialMoundPhoto,
  photoAlt: 'Blue water in the shadow of the rock at Burial Mound Cave',
  memory: 'The first Bahamians.',
  mapPlace: 'Burial Mound Cave, Lucayan National Park, Grand Bahama',
  mapPoint: { lat: 26.60607, lng: -78.40231 },
  travelMode: 'walking',
  distanceMeters: 209,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'A few minutes along the path, then stairs down to a platform' },
  stayMinutes: [10, 15],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'The first Bahamians' },
    { text: 'In 1986 archaeologists found the remains of six Lucayans on the floor of this cave. One was carbon-dated at the Smithsonian Institution and confirmed to be from the Lucayan era: proof that people lived on Grand Bahama before Columbus. The park is named for them.' },
    { kind: 'heading', text: 'Their water, and their resting place' },
    { text: 'The Lucayans came to these caves for fresh water, and used them as places of ceremony and burial. The water down there is so low in oxygen that what they left has been preserved. The fresh water in the island’s caves and blue holes still matters to the people who live here today.' },
    { kind: 'find', text: 'Stand quietly at the rail for a moment. This was their water, and their resting place.' },
    { className: 'narrationClose', text: 'Now back to the road. Cross the Grand Bahama Highway carefully, and take the boardwalk through the mangroves to the sea, about 15 minutes. Tap “I’m Here” on the sand at Gold Rock Beach.' },
  ],
}

const goldRockBeach = {
  id: 'goldRockBeach',
  name: 'Gold Rock Beach',
  photo: goldRockBeachPhoto,
  photoAlt: 'Turquoise water and a long, empty sweep of sand at Gold Rock Beach',
  memory: 'Where the water ends up.',
  mapPlace: 'Gold Rock Beach, Lucayan National Park, Grand Bahama',
  mapPoint: { lat: 26.59986, lng: -78.40653 },
  travelMode: 'walking',
  distanceMeters: 969,
  travelMinutes: 13,
  effort: { level: 'easy', note: 'Across the highway, then a level boardwalk through the mangroves' },
  stayMinutes: [60, 120],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The Welcome Mat' },
    { text: 'Gold Rock Beach is known as the Welcome Mat of Grand Bahama, and in 2018 USA Today’s readers voted it the best beach in the Caribbean. There’s a healthy reef offshore, because this coast is undeveloped, and because the mangrove creek behind you raises parrotfish that graze the algae off the coral.' },
    { kind: 'heading', text: 'Coral in a nursery' },
    { text: 'Out to the south-east, the Trust and its partners run a coral nursery that can grow 250 elkhorn and staghorn corals at a time, to plant back on the reef.' },
    { kind: 'find', text: 'Find Gold Rock itself, the little rocky islet offshore that the beach is named for.' },
    PEAK_CLOSE,
  ],
}

const goldRockCreek = {
  id: 'goldRockCreek',
  name: 'Gold Rock Creek',
  photo: boardwalkPhoto,
  photoAlt: 'The wooden boardwalk winding through the mangroves of Gold Rock Creek',
  memory: 'The nursery in the mangroves.',
  mapPlace: 'Gold Rock Creek boardwalk, Lucayan National Park, Grand Bahama',
  mapPoint: { lat: 26.6025, lng: -78.4045 },
  travelMode: 'walking',
  distanceMeters: 264,
  travelMinutes: 4,
  effort: { level: 'easy', note: 'Back along the boardwalk' },
  stayMinutes: [15, 25],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The nursery' },
    { text: 'Gold Rock Creek winds through the mangroves and out to the ocean about two miles east. It’s the last intact mangrove tidal creek on Grand Bahama’s southern shore, a nursery for young fish, with wading birds hunting among the stilt-like roots.' },
    { kind: 'heading', text: 'The water’s whole journey' },
    { text: 'And it’s connected to where you started. The grey snappers you looked for in Ben’s Cave swim between the cave and this creek through tunnels in the rock. Rain to cave, cave to creek, creek to reef: you’ve followed the water all the way.' },
    { kind: 'find', text: 'Stop halfway along the boardwalk and look down among the roots. How many kinds of fish can you count?' },
    { className: 'narrationClose', text: 'Walk back to the car park, about 7 minutes. The park closes at 4 PM.' },
  ],
}

export default {
  id: 'grandBahama',
  aiMade: true,
  name: 'Follow the Water',
  location: 'LUCAYAN NATIONAL PARK · GRAND BAHAMA, THE BAHAMAS',
  city: 'East Grand Bahama',
  photo: heroPhoto,
  photoAlt: 'Turquoise shallows and a long sweep of sand at Gold Rock Beach, Grand Bahama',
  blurb: 'Fresh water floating on salt in a cave, the first Bahamians, a mangrove nursery and an empty beach.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Nature', 'Hidden Gems', 'Historical', 'Scenic'],
  departure: entrance,
  discovery: bensCave,
  build: burialMound,
  peak: goldRockBeach,
  afterglow: goldRockCreek,
  startArea: 'East Grand Bahama, The Bahamas',
  startNote: START_NOTE,
  bestTime: {
    season: 'Any time of year, at the weekend',
    seasonNote: 'The park is only open on Saturdays and Sundays. In summer it’s hot and buggy in the mangroves, and bats shelter in the caves.',
    timeOfDay: 'From 9 in the morning',
    timeNote: 'The park is open 9 AM–4 PM. Mornings are cooler for the walk.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'A car: the park is about 35 km east of Freeport, and buses there are few.',
      'Swimsuits, towels, water and sun protection: there’s little shade on the beach.',
      'Insect repellent for the mangroves.',
      'Snorkel gear, if you have it, for the shallows.',
    ],
    costs: [
      { lead: 'Day pass', text: '$15 for adults (15–59), $8 for children (6–14), $10 for seniors (60+), VAT included. Free for Bahamas National Trust members.' },
    ],
    getting: [
      'Drive east along the Grand Bahama Highway, about 30 minutes from Freeport, and park at the park entrance by the road.',
      'The caves are on the north side of the highway; the boardwalk and the beach are on the south side.',
    ],
    access: [
      'Stairs lead down to viewing platforms at both caves.',
      'The boardwalk is level. You cross the highway on foot between the caves and the beach.',
      'There are restrooms at the park.',
    ],
    restrictions: [
      { lead: 'Opening hours', text: 'Saturdays and Sundays only, 9 AM–4 PM (the Trust’s own page, November 2026). Check before you go.' },
      { lead: 'The caves', text: 'They’re for looking, not swimming: diving in them needs the Trust’s permission.' },
      'The park was damaged by Hurricane Dorian in 2019 and has been restored: some paths and boardwalks may look different from the photos here, which are older.',
    ],
    tips: [
      'Many visitors time the beach for low tide, when wide flats of sand open up.',
      'Bring a picnic, and take everything back out with you.',
    ],
  },
  match: {
    moods: { Peaceful: 60, Adventurous: 70, Romantic: 45, Curious: 95, Playful: 50, Cultural: 55 },
    with: { Solo: 75, Couple: 80, Family: 75, 'Friends / Group': 92 },
    preferences: {
      'Pet friendly': 10, 'Avoid alcohol': 95, 'More nature': 95, 'Food stops': 5,
      Coastal: 95, 'More urban': 0, 'Hiking involved': 30, 'Budget friendly': 75,
    },
  },
  description: [
    'On Grand Bahama, the rain doesn’t run off in rivers. It sinks into the limestone and collects in caves, where fresh water floats on top of the sea, and fish swim between the caves and a mangrove creek through tunnels in the rock.',
    'This walk follows that water: down to a cave where a whole new kind of animal was found, to the cave where the first Bahamians were laid to rest, through the mangroves, and out to an empty beach with a reef offshore.',
  ],
  whyCool: {
    discovery: 'A cave where fresh water floats on salt, and sea fish live in the fresh layer.',
    significance: 'The remains of the Lucayans, the first Bahamians, and one of the world’s longest underwater cave systems.',
    feeling: 'Curious and free: a morning of how-does-that-work, ending on an empty beach.',
  },
  route: [entrance, bensCave, burialMound, goldRockBeach, goldRockCreek],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was the water’s whole journey, from the caves to the sea.',
    summary: 'You walked into the pines of Lucayan National Park, looked down into Ben’s Cave and Burial Mound Cave, crossed the mangroves to Gold Rock Beach, and came back along Gold Rock Creek, where the cave fish come to the sea.',
  },
}
