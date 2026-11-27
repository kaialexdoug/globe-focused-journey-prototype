// From Purgatory to the Clouds (Eden Prairie, Minnesota): a summer weekend
// for a family with children, made to the Journey Engine V2 handoff (Eden
// Prairie: a compelling child-friendly suburban experience).
//
// Its peak, chosen first: Wings of the North Air Museum at Flying Cloud
// Airport, a hangar of old aircraft and a full-size Spirit of St. Louis. The
// airport began as a landing strip a farmer built on his own farm, and that
// farm is still here, so the day runs from a marsh to the farm to the
// planes. It's only open at weekends, 11 to 3, so the day is built around
// that. The thread is how places got their names and their stories: a marsh
// settlers called Purgatory, a bridge named for the city's first woman
// mayor, a farmer's field that became an airport named for a cloud.
//
// Primary mood: Playful. Audience: a family with children. By car between
// the stops (up to 12 km apart), with short walks. First drafted with Staring
// Lake Park and Lions Tap in it; they were swapped for the Cummins farm and
// Bryant Lake because no licensed photos of them could be found (see
// JOURNEY_ENGINE_LOG.md).
//
// Exact spots from OpenStreetMap and Wikipedia; drives from Google's Routes
// API (November 2026). Checked in November 2026 against the Riley Purgatory
// Bluff Creek Watershed District and the Eden Prairie Historical Society
// (the names), Eden Prairie Local News (Mayor Jean Harris), Wikipedia (the
// John R. Cummins Farmhouse), the City of Eden Prairie (Flying Cloud
// Airport's history), Wings of the North's own page (hours, prices, the
// gate), and Three Rivers Park District (Bryant Lake).

import heroPhoto from '../assets/journey/eden-prairie/hero.jpg'
import purgatoryPhoto from '../assets/journey/eden-prairie/purgatory-creek.jpg'
import bridgePhoto from '../assets/journey/eden-prairie/jean-harris-bridge.jpg'
import farmPhoto from '../assets/journey/eden-prairie/cummins-farm.jpg'
import museumPhoto from '../assets/journey/eden-prairie/wings-of-the-north.jpg'
import bryantPhoto from '../assets/journey/eden-prairie/bryant-lake.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const purgatoryCreek = {
  id: 'purgatoryCreek',
  name: 'Purgatory Creek',
  photo: purgatoryPhoto,
  photoAlt: 'The marsh at Purgatory Creek Park, with reeds in front and a fountain beyond',
  memory: 'Bird-spotting in a marsh called Purgatory.',
  mapPlace: 'Purgatory Creek Park, Technology Drive, Eden Prairie, MN',
  mapPoint: { lat: 44.85934, lng: -93.44124 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [20, 30],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Welcome to Purgatory!' },
    { kind: 'heading', text: 'Why “Purgatory”?' },
    { text: 'When the first settlers came here in the 1850s, they were so fed up with the swampy land along this stream that they compared it to purgatory, and the name stuck. Not everyone agreed: some called it Mill Creek, for the mill on it, and others called it Hennepin Creek.' },
    { kind: 'heading', text: 'A paradise for birds' },
    { text: 'What settlers hated, wildlife loves. This marsh is full of birds, from waterbirds on the open water to tiny marsh wrens hiding in the reeds.' },
    { kind: 'find', text: 'Who can spot the most different birds? Count them as you walk to the bridge.' },
    { className: 'narrationClose', text: 'Follow the path into the park to the bridge across the marsh, and tap “I’m Here” on it.' },
  ],
}

const jeanHarrisBridge = {
  id: 'jeanHarrisBridge',
  name: 'The Gathering Bridge',
  mapName: 'Bridge',
  photo: bridgePhoto,
  photoAlt: 'The Jean Harris Gathering Bridge in Purgatory Creek Park, with a round design on its deck',
  memory: 'On the Gathering Bridge over the marsh.',
  mapPlace: 'Jean Harris Gathering Bridge, Purgatory Creek Park, Eden Prairie, MN',
  mapPoint: { lat: 44.85865, lng: -93.44028 },
  travelMode: 'walking',
  distanceMeters: 150,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'A short, flat walk into the park' },
  stayMinutes: [10, 15],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'A bridge named for a mayor' },
    { text: 'This bridge carries the name of Dr. Jean Harris. She was Eden Prairie’s first woman mayor and its first African American mayor, elected in 1995, and she served until she died in 2001. Before that, she spent eight years on the city council.' },
    { kind: 'heading', text: 'A prairie called Eden' },
    { text: 'In 1853, a writer called Elizabeth Ellet admired this land of rolling grass and lakes so much that she called it Eden. The settlers kept the name. So you’re standing in Purgatory, in Eden, at the same time.' },
    { kind: 'find', text: 'Find the big circle on the bridge’s deck, and everyone stand in the middle of it together.' },
    { className: 'narrationClose', text: 'Next, an old farm, about five minutes’ drive south on Pioneer Trail, where the story of the airport begins. Tap “I’m Here” at the red-brick farmhouse.' },
  ],
}

const cumminsFarm = {
  id: 'cumminsFarm',
  name: 'The Cummins Farm',
  photo: farmPhoto,
  photoAlt: 'The John R. Cummins Farmhouse, a brick house from 1880, in Silverness Park',
  memory: 'The farm where the airport began.',
  mapPlace: 'Cummins-Phipps-Grill House, 13600 Pioneer Trail, Eden Prairie, MN',
  mapPoint: { lat: 44.82991, lng: -93.44901 },
  travelMode: 'driving',
  distanceMeters: 4491,
  travelMinutes: 6,
  effort: { level: 'easy', note: 'South on Pioneer Trail' },
  stayMinutes: [15, 25],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'Three families, one farm' },
    { text: 'John and Mattie Cummins started farming here in 1856, and built this brick house in 1879 and 1880. Then came the Phipps family. Edwin Phipps sold so much asparagus from his stand on the road nearby that he was called the “Asparagus King of Hennepin County”, and Harriet Phipps planted 500 peonies, a bed that still blooms every June.' },
    { kind: 'heading', text: 'Pappy’s runway' },
    { text: 'Their daughter Mildred married Martin Grill, who everyone called “Pappy”. In 1937, Pappy built a landing strip right here on the farm. In 1941, during the war, the Navy sent student pilots to practise on it, and after the war he sold it. Today it’s Flying Cloud Airport, just over there.' },
    { kind: 'find', text: 'Find the old peony bed (in June it’s covered in flowers). Then look and listen for a plane taking off from what was once Pappy’s field.' },
    { className: 'narrationClose', text: 'Now to the planes themselves. Drive to Gate H, on the airport’s north-west side, a few minutes away, and tap “I’m Here” at the gate.' },
  ],
}

const wingsOfTheNorth = {
  id: 'wingsOfTheNorth',
  name: 'Wings of the North',
  photo: museumPhoto,
  photoAlt: 'A vintage warplane in the hangar of Wings of the North Air Museum',
  memory: 'The planes at Wings of the North.',
  mapPlace: 'Wings of the North Air Museum, Gate H, Flying Cloud Airport, Eden Prairie, MN',
  mapPoint: { lat: 44.83259, lng: -93.46528 },
  travelMode: 'driving',
  distanceMeters: 1653,
  travelMinutes: 2,
  effort: { level: 'easy', note: 'Along Pioneer Trail to the airport' },
  stayMinutes: [45, 75],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'An airport named for a cloud' },
    { text: 'When Pappy’s strip became a public airport, it was going to be called Southwest Minneapolis Airport. The man running it, John Stuber, suggested Flying Cloud instead, and that’s the name that stuck.' },
    { kind: 'heading', text: 'The Spirit of St. Louis' },
    { text: 'In this hangar, volunteers look after old aircraft, and there’s a full-size copy of the Spirit of St. Louis, made for a film. The real one was flown by Charles Lindbergh, who grew up in Little Falls, Minnesota: in 1927 he flew it alone, without stopping, from New York to Paris.' },
    { kind: 'find', text: 'Find the Spirit of St. Louis. Lindbergh had no windscreen at the front, so how do you think he saw where he was going?' },
    PEAK_CLOSE,
  ],
}

const bryantLake = {
  id: 'bryantLake',
  name: 'Bryant Lake',
  photo: bryantPhoto,
  photoAlt: 'The sandy swimming beach at Bryant Lake Regional Park',
  memory: 'The end of the day at Bryant Lake.',
  mapPlace: 'Bryant Lake Regional Park, 6800 Rowland Road, Eden Prairie, MN',
  mapPoint: { lat: 44.88188, lng: -93.42971 },
  travelMode: 'driving',
  distanceMeters: 12360,
  travelMinutes: 12,
  effort: { level: 'easy', note: 'Back north across the city' },
  stayMinutes: [45, 90],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Sand, swings and paddleboats' },
    { text: 'Bryant Lake Regional Park has a sandy beach, a big playground, a fishing pier, and in summer, paddleboats, kayaks and paddleboards to rent. It’s the place to run off whatever energy is left.' },
    { kind: 'heading', text: 'From Purgatory to the clouds' },
    { text: 'Today you went from a marsh called Purgatory, over a mayor’s bridge, to a farm where a man built his own runway, and into a hangar of planes at the airport it became. That’s a lot of stories for one day. Which was your favourite?' },
    { kind: 'find', text: 'Find the playground, or the water. You choose.' },
    { className: 'narrationClose', text: 'That’s the day. Stay until somebody gets hungry.' },
  ],
}

export default {
  id: 'edenPrairie',
  aiMade: true,
  name: 'From Purgatory to the Clouds',
  location: 'EDEN PRAIRIE · MINNESOTA, USA',
  city: 'Eden Prairie',
  photo: heroPhoto,
  photoAlt: 'A P-51 Mustang outside the Wings of the North hangar at Flying Cloud Airport',
  blurb: 'A marsh named Purgatory, a farm where a man built his own runway, old warplanes and a beach.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experienceLevel: 'localDiscovery',
  experiences: ['Interactive', 'Historical', 'Nature', 'Hidden Gems'],
  departure: purgatoryCreek,
  discovery: jeanHarrisBridge,
  build: cumminsFarm,
  peak: wingsOfTheNorth,
  afterglow: bryantLake,
  startArea: 'Eden Prairie, Minnesota, USA',
  startNote: START_NOTE,
  bestTime: {
    season: 'June to August, at the weekend',
    seasonNote: 'The air museum is only open on Saturdays and Sundays; summer brings the beach and paddleboats, and early June the peonies.',
    timeOfDay: 'From about 9:30 in the morning',
    timeNote: 'So you reach the museum, open 11 AM–3 PM, before lunch, and the beach in the afternoon.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'A car: the stops are up to 12 km apart.',
      'Swimsuits and towels for Bryant Lake, and sunscreen.',
      'Bug spray in summer, for the marsh.',
      'Binoculars, for the birds at Purgatory Creek.',
    ],
    costs: [
      'Purgatory Creek Park and the Cummins farm’s grounds are free.',
      { lead: 'Wings of the North Air Museum', text: '$12 for adults and $5 for children aged 7–17, with one child free for each paying adult.' },
      { lead: 'Bryant Lake', text: 'The beach is free. Paddleboats were $18 an hour in 2025 (11 AM–7 PM, late May to early September), and kayaks, canoes and paddleboards can be rented too. Sources disagree on whether a park pass is needed: check Three Rivers Park District’s page.' },
    ],
    getting: [
      'Start at Purgatory Creek Park’s parking lot on Technology Drive.',
      'The Cummins farm is in Silverness Park, at 13600 Pioneer Trail.',
      { lead: 'The air museum', text: 'Go to Gate H on the north-west side of Flying Cloud Airport. At the keypad, tap it to wake it, press “Visitor”, then “WOTN Museum”, and tell the volunteer who answers that you’re visiting the museum. Then drive through to the museum’s parking.' },
      'Bryant Lake Regional Park is at 6800 Rowland Road, in the north of the city.',
    ],
    access: [
      'The paths at Purgatory Creek are mostly flat, and the bridge is fine for strollers.',
      'The fishing pier at Bryant Lake is wheelchair accessible.',
    ],
    restrictions: [
      { lead: 'Wings of the North', text: 'Open Saturdays and Sundays, 11 AM–3 PM. Not every plane is there every day: call ahead if there’s one you want to see.' },
      { lead: 'The Cummins-Phipps-Grill House', text: 'Run by the Eden Prairie Historical Society, and open inside for its events and tours. The grounds are part of the park.' },
      { lead: 'Bryant Lake’s beach', text: 'Open in summer, and unguarded: keep a close eye on children in the water.' },
      'Fishing from the pier needs a Minnesota fishing licence, for anyone old enough to need one.',
    ],
    tips: [
      'Come in early June to see Harriet Phipps’s peony bed in flower.',
      'For burgers afterwards, Lions Tap on Flying Cloud Drive is a local favourite, known for its fried onions.',
      'Wings of the North sometimes holds pancake breakfasts with planes out on show: check its calendar.',
    ],
  },
  match: {
    moods: { Peaceful: 45, Adventurous: 45, Romantic: 15, Curious: 70, Playful: 95, Cultural: 30 },
    with: { Solo: 25, Couple: 40, Family: 98, 'Friends / Group': 50 },
    preferences: {
      'Pet friendly': 35, 'Avoid alcohol': 95, 'More nature': 70, 'Food stops': 30,
      Coastal: 30, 'More urban': 40, 'Hiking involved': 10, 'Budget friendly': 75,
    },
  },
  description: [
    'Every place in Eden Prairie has a story in its name. Settlers called a soggy marsh Purgatory, a writer called the rolling prairie Eden, and a farmer built a runway on his own farm that grew into an airport named for a cloud.',
    'This family day follows those stories: birds in the marsh, a bridge named for the city’s first woman mayor, the farm where the runway began, a hangar of old planes with a full-size Spirit of St. Louis, and a beach to finish.',
  ],
  whyCool: {
    discovery: 'How a farmer’s own landing strip grew into Flying Cloud Airport.',
    significance: 'Eden Prairie’s first woman mayor, a farm from 1856, and the plane Minnesota’s Charles Lindbergh flew across the Atlantic.',
    feeling: 'Playful and easy: birds, an old farm, airplanes and a beach, with something for every age.',
  },
  route: [purgatoryCreek, jeanHarrisBridge, cumminsFarm, wingsOfTheNorth, bryantLake],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Eden Prairie, from Purgatory up into the clouds, and down to the beach.',
    summary: 'You spotted birds at Purgatory Creek, stood on the Gathering Bridge, found the farm where Pappy Grill built his runway, saw the Spirit of St. Louis at Wings of the North, and finished at Bryant Lake.',
  },
}
