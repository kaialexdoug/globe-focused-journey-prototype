// The Free Train to the Gulf Stream (Downtown Miami): a curious day for a
// family, made to the Journey Engine V2 format at the developer's request
// (28 Nov 2026: three family journeys in Miami).
//
// Its peak, chosen first: the Gulf Stream Aquarium at Frost Science, a
// 500,000-gallon tank you stand underneath, looking up through its great round
// window. The thread is the water Miami grew from: the Tequesta built at the
// mouth of the river some 2,000 years ago, the free Metromover carries you
// over that river, the bay opens up at Bayfront Park, the Gulf Stream flows
// past offshore, and the day ends on the bay at sunset.
//
// Primary mood: Curious. Audience: a family. On foot, about 2.8 km, plus a
// free ride on Metromover.
//
// Spots from OpenStreetMap; walks and the Metromover ride from Google's
// Routes API (November 2026). Checked in November 2026 against Miami-Dade
// County (Metromover: free, hours, loops), Frost Science (the aquarium,
// tickets, hours, parking), the Pérez Art Museum (Verde), Wikipedia and the
// Florida Trail of Indian Heritage (the Miami Circle), and the City of Miami
// and Miami International Airport (drones). See JOURNEY_ENGINE_LOG.md.

import heroPhoto from '../assets/journey/miami-downtown/hero.jpg'
import miamiCirclePhoto from '../assets/journey/miami-downtown/miami-circle.jpg'
import bridgeViewPhoto from '../assets/journey/miami-downtown/bridge-view.jpg'
import metromoverPhoto from '../assets/journey/miami-downtown/metromover.jpg'
import bayfrontPhoto from '../assets/journey/miami-downtown/bayfront.jpg'
import baysidePhoto from '../assets/journey/miami-downtown/bayside.jpg'
import pammTerracePhoto from '../assets/journey/miami-downtown/pamm-terrace.jpg'
import verdePhoto from '../assets/journey/miami-downtown/verde.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE, DINNER } from './parts.js'

const miamiCircle = {
  id: 'miamiCircle',
  name: 'The Miami Circle',
  photo: miamiCirclePhoto,
  photoAlt: 'The outline of the Miami Circle on a lawn at the mouth of the Miami River',
  memory: 'Where Miami began.',
  mapPlace: 'Miami Circle Park, 401 Brickell Ave, Miami',
  mapPoint: { lat: 25.769, lng: -80.18883 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [15, 20],
  nearby: [
    {
      name: 'The Brickell Avenue Bridge',
      kind: 'photo',
      note: 'Walk onto the bridge for the classic view of the circle’s lawn, the mouth of the river and the bay, with Brickell’s towers all around.',
      meters: 175,
      photo: bridgeViewPhoto,
      photoAlt: 'The Miami Circle park at the river’s mouth, seen from the Brickell Avenue Bridge',
      mapPlace: 'Brickell Avenue Bridge, Miami',
      mapPoint: { lat: 25.76991, lng: -80.19002 },
    },
  ],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Today is all about water: the river, the bay and the ocean that made Miami. We start with the very first Miamians.' },
    { kind: 'heading', text: 'A circle in the rock' },
    { text: 'In 1998 an old apartment building here was knocked down to make way for new towers. Before building could start, archaeologists found 24 holes cut into the limestone bedrock in a perfect circle, 38 feet across. They were made by the Tequesta people, probably for a building, somewhere between 1,700 and 2,700 years ago.' },
    { kind: 'heading', text: 'Saved, then buried' },
    { text: 'The state bought the land to save it, and the circle was covered over again with limestone to protect it. You can’t see the holes, but the lawn marks where they are. The Tequesta chose this spot for the same reason you’ll see all day: water, where the river meets the bay.' },
    { kind: 'find', text: 'Find the outline of the circle on the grass, and walk all the way around it together.' },
    { className: 'narrationClose', text: 'Now walk a few minutes to the Fifth Street Metromover station. Tap “I’m Here” on the platform.' },
  ],
}

const metromover = {
  id: 'metromoverRide',
  name: 'The Free Train',
  photo: metromoverPhoto,
  photoAlt: 'The elevated Metromover track curving over the Miami River between towers',
  memory: 'Over the river with no driver.',
  mapPlace: 'Fifth Street Metromover Station, Miami',
  mapPoint: { lat: 25.7692, lng: -80.19217 },
  travelMode: 'walking',
  distanceMeters: 409,
  travelMinutes: 6,
  effort: { level: 'easy', note: 'A short, flat walk through Brickell' },
  stayMinutes: [10, 15],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'A train with no driver' },
    { text: 'Metromover is a little elevated train that loops around downtown Miami, and it’s completely free. It runs itself, with no driver, so whoever sits at the front gets the driver’s view.' },
    { text: 'Take the Brickell Loop north three stops to Bayfront Park. Just after you leave, the train crosses the Miami River on its own bridge: the same river the Tequesta lived beside.' },
    { kind: 'find', text: 'Grab a seat at the front if you can, and watch for the river sliding by underneath.' },
    { className: 'narrationClose', text: 'Get off at Bayfront Park Station and walk into the park toward the water. Tap “I’m Here” by the bay.' },
  ],
}

const bayfrontPark = {
  id: 'bayfrontPark',
  name: 'Bayfront Park',
  photo: bayfrontPhoto,
  photoAlt: 'A palm-lined path along the water at Bayfront Park, downtown Miami',
  memory: 'The bay opens up.',
  mapPlace: 'Bayfront Park, 301 Biscayne Blvd, Miami',
  mapPoint: { lat: 25.77538, lng: -80.18617 },
  travelMode: 'transit',
  distanceMeters: 1321,
  travelMinutes: 10,
  effort: { level: 'easy', note: 'Three stops on the Metromover Brickell Loop, then a short walk' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Bayside Marketplace',
      kind: 'food',
      note: 'Shops and plenty of places to eat around a marina, right next to the park: an easy lunch stop before the museum.',
      meters: 330,
      photo: baysidePhoto,
      photoAlt: 'Boats in the marina at Bayside Marketplace, with downtown towers behind',
      mapPlace: 'Bayside Marketplace, 401 Biscayne Blvd, Miami',
      mapPoint: { lat: 25.77824, lng: -80.1871 },
    },
  ],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'The bay' },
    { text: 'This is Biscayne Bay, the shallow lagoon between the mainland and the islands. Across the water to the east is PortMiami, where on many days you’ll see giant cruise ships tied up.' },
    { kind: 'heading', text: 'Beyond the islands' },
    { text: 'Out past the islands runs something even bigger: the Gulf Stream, a warm current flowing north through the ocean just off Miami. You can’t see it from here, but you’re about to stand underneath it.' },
    { kind: 'find', text: 'Look east across the water and count the cruise ships, if any are in port today.' },
    { className: 'narrationClose', text: 'Walk north along the bay, past Bayside, to Frost Science, about 25 minutes. Tap “I’m Here” at the entrance.' },
  ],
}

const frost = {
  id: 'frostAquarium',
  name: 'Frost Science',
  photo: heroPhoto,
  photoAlt: 'Looking up through the great round window under the Gulf Stream Aquarium at Frost Science',
  memory: 'Standing under the Gulf Stream.',
  mapPlace: 'Phillip and Patricia Frost Museum of Science, 1101 Biscayne Blvd, Miami',
  mapPoint: { lat: 25.78514, lng: -80.18794 },
  travelMode: 'walking',
  distanceMeters: 1849,
  travelMinutes: 25,
  effort: { level: 'easy', note: 'A flat walk north along Biscayne Boulevard and the bay' },
  stayMinutes: [120, 180],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The ocean, indoors' },
    { text: 'The Gulf Stream Aquarium is a huge cone-shaped tank holding 500,000 gallons of seawater, filled with fish from the open ocean off Miami. It spans three floors. Down in the Ocean Gallery at the bottom, its floor becomes your ceiling: a great round window, called the oculus, that you look up through from below.' },
    { text: 'Your ticket also covers the museum’s other floors and one show in the planetarium. Shows are limited, so book yours as soon as you arrive.' },
    { kind: 'find', text: 'Look straight up through the oculus, and see who can spot the biggest fish swimming over your heads.' },
    PEAK_CLOSE,
  ],
}

const pammTerrace = {
  id: 'pammTerrace',
  name: 'The Hanging Gardens',
  photo: pammTerracePhoto,
  photoAlt: 'Hanging gardens and slender columns on the terrace of the Pérez Art Museum, facing the bay',
  memory: 'Sunset over the bay.',
  mapPlace: 'Pérez Art Museum Miami terrace, Museum Park, Miami',
  mapPoint: { lat: 25.78603, lng: -80.18634 },
  travelMode: 'walking',
  distanceMeters: 573,
  travelMinutes: 8,
  effort: { level: 'easy', note: 'Next door, across Museum Park' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Verde',
      kind: 'food',
      note: 'The Pérez Art Museum’s own restaurant, with outdoor tables on the terrace facing the bay. Its hours are limited and change, so check before you plan dinner here.',
      meters: 30,
      photo: verdePhoto,
      photoAlt: 'Plants hanging in long columns beside the Pérez Art Museum',
      mapPlace: 'Verde at Pérez Art Museum Miami, 1103 Biscayne Blvd, Miami',
      mapPoint: { lat: 25.78603, lng: -80.18634 },
    },
  ],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Gardens in the air' },
    { text: 'Next door, the Pérez Art Museum’s terrace looks straight out over the bay, with plants hanging down in long green columns from its roof. It’s a calm place to finish after the busy museum.' },
    { kind: 'heading', text: 'Back to the water' },
    { text: 'You started where the Tequesta built beside the river, crossed that river on a train with no driver, met the bay, and stood under the Gulf Stream. All of Miami’s story, from the very first circle in the rock, is about water.' },
    { kind: 'find', text: 'Find a spot facing the bay and watch the light change on the water as the sun goes down behind you.' },
    DINNER,
  ],
}

export default {
  id: 'miamiDowntown',
  aiMade: true,
  name: 'The Free Train to the Gulf Stream',
  location: 'DOWNTOWN MIAMI · FLORIDA, USA',
  city: 'Miami',
  photo: heroPhoto,
  photoAlt: 'Looking up through the oculus under the Gulf Stream Aquarium at Frost Science',
  blurb: 'A 2,000-year-old circle in the rock, a free train with no driver, the bay, and the Gulf Stream overhead.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experienceLevel: 'richExperience',
  experiences: ['Interactive', 'Historical', 'Nature', 'Scenic'],
  departure: miamiCircle,
  discovery: metromover,
  build: bayfrontPark,
  peak: frost,
  afterglow: pammTerrace,
  startArea: 'Downtown Miami, Florida, USA',
  startNote: START_NOTE,
  bestTime: {
    season: 'Any time of year',
    seasonNote: 'Most of the day is indoors or in the shade of the bay walk. Summer afternoons bring heat and thunderstorms.',
    timeOfDay: 'From late morning to sunset',
    timeNote: 'Frost Science is open from around 10 AM to 6 PM. Arrive early in the day for the best choice of planetarium shows.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Comfortable shoes, water and sun protection for the walk along the bay.',
      'A light layer: the museum is air-conditioned.',
    ],
    costs: [
      { lead: 'Frost Science', text: 'From $29.95 for adults and $24.95 for children aged 4 to 11; under 4s free. Includes one planetarium show. Buy online before you go.' },
      'The Miami Circle, Metromover, Bayfront Park and the museum terrace are free.',
    ],
    getting: [
      { lead: 'Parking', text: 'Park once at the end and ride the free Metromover to the start: Frost Science’s garage is a flat $18 by its own site, and Museum Park Station is right outside. Ride to Fifth Street Station and walk a few minutes to the Miami Circle.' },
      'Metromover runs from about 5:30 AM to 10 PM. During repair work, free shuttle buses sometimes cover closed sections: check Miami-Dade Transit’s alerts.',
    ],
    access: [
      'Flat, paved paths all the way, and Metromover stations have elevators (Miami-Dade posts which are out of service online). Ask Frost Science about access to its exhibits.',
    ],
    restrictions: [
      { lead: 'Drones', text: 'Not on this route: Miami’s city parks need a special permit for drones, and downtown sits under Miami International Airport’s controlled airspace. Check the FAA’s B4UFLY app before flying anywhere in Miami.' },
    ],
    tips: [
      'Sit at the front of Metromover: with no driver, it has the best view.',
      'Book your planetarium show as soon as you arrive at Frost Science.',
    ],
  },
  match: {
    moods: { Peaceful: 35, Adventurous: 40, Romantic: 40, Curious: 95, Playful: 85, Cultural: 70 },
    with: { Solo: 70, Couple: 75, Family: 96, 'Friends / Group': 80 },
    preferences: {
      'Pet friendly': 5, 'Avoid alcohol': 95, 'More nature': 50, 'Food stops': 50,
      Coastal: 70, 'More urban': 92, 'Hiking involved': 5, 'Budget friendly': 60,
    },
  },
  description: [
    'Some 2,000 years ago, the Tequesta cut a circle of holes into the rock where the Miami River meets the bay. Today the river is crossed by a free little train with no driver, and the bay is lined with parks and museums.',
    'This family day starts at the Miami Circle, rides Metromover over the river to Bayfront Park, stands beneath the Gulf Stream Aquarium at Frost Science, and ends on the bay at sunset.',
  ],
  whyCool: {
    discovery: 'A circle cut in the rock by the Tequesta, found under an apartment block in 1998.',
    significance: 'The water Miami grew from: the river, the bay and the Gulf Stream offshore.',
    feeling: 'Wide-eyed and fun: a driverless train, giant fish overhead and a sunset over the bay.',
  },
  route: [miamiCircle, metromover, bayfrontPark, frost, pammTerrace],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Miami, from the first circle in the rock to the Gulf Stream.',
    summary: 'You stood where the Tequesta built 2,000 years ago, rode the free train over the Miami River, met the bay at Bayfront Park, looked up into the Gulf Stream at Frost Science, and watched the sun go down over the water.',
  },
}
