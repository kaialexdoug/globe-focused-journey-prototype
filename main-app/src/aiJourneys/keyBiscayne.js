// The Island the Zoo Left Behind (Key Biscayne, Miami): a playful day for a
// family, made to the Journey Engine V2 format at the developer's request
// (28 Nov 2026: three family journeys in Miami, one on Key Biscayne).
//
// Its peak, chosen first: the Gardens at Crandon Park, where Miami's first
// zoo stood until around 1980 and its peacocks still strut among the old
// enclosures. The obvious peak, the Cape Florida Lighthouse, was ruled out:
// its grounds have been closed since 28 Oct 2026 after king-tide flooding,
// with tours cancelled until further notice. The thread is what the island
// keeps: a causeway traded for a plantation, mangrove roots turned to stone,
// a sandbar the sea keeps moving, and the peacocks the zoo left behind.
//
// Primary mood: Playful. Audience: a family. By car between the stops, with
// a walk to the fossil reef and time on the beach.
//
// Spots from OpenStreetMap, and for the gardens the US government's survey
// of the zoo's old station (approximate); drives and walks from Google's
// Routes API (November 2026). Checked in November 2026 against Miami-Dade
// Parks (Crandon Park: fees, the sandbar, the carousel, the zoo's start),
// Florida State Parks (Bill Baggs: fees, the lighthouse closure, drones),
// Wikipedia (the 1940 gift and the 1947 causeway) and an FIU geology guide
// (the fossil reef's age). The nature center has no licensed photo yet, so
// it shows the "no image available" placeholder.

import heroPhoto from '../assets/journey/key-biscayne/hero.jpg'
import skylinePhoto from '../assets/journey/key-biscayne/skyline.jpg'
import rustyPelicanPhoto from '../assets/journey/key-biscayne/rusty-pelican.jpg'
import beachPhoto from '../assets/journey/key-biscayne/beach.jpg'
import palmsPhoto from '../assets/journey/key-biscayne/palms.jpg'
import peacockPhoto from '../assets/journey/key-biscayne/peacock.jpg'
import sunsetPhoto from '../assets/journey/key-biscayne/sunset.jpg'
import boatersGrillPhoto from '../assets/journey/key-biscayne/boaters-grill.jpg'
import lighthousePhoto from '../assets/journey/key-biscayne/lighthouse.jpg'
import noImage from '../assets/journey/no-image.svg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const hobie = {
  id: 'hobieSkyline',
  name: 'The Causeway View',
  photo: skylinePhoto,
  photoAlt: 'Downtown Miami’s towers across the water from Virginia Key',
  memory: 'The bridge that bought a park.',
  mapPlace: 'Hobie Island Beach Park, Rickenbacker Causeway, Miami',
  mapPoint: { lat: 25.74507, lng: -80.17602 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [15, 20],
  nearby: [
    {
      name: 'The Rusty Pelican',
      kind: 'food',
      note: 'A restaurant on the water with the same skyline across the bay: a good place for lunch, or come back for the view at night.',
      meters: 330,
      photo: rustyPelicanPhoto,
      photoAlt: 'Miami’s skyline across Biscayne Bay, seen from the Rusty Pelican',
      mapPlace: 'Rusty Pelican, 3201 Rickenbacker Causeway, Miami',
      mapPoint: { lat: 25.74801, lng: -80.17545 },
    },
  ],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Today you’re exploring an island that people, animals and the sea have all left their mark on. Keep your eyes open: some of what they left is still here.' },
    { kind: 'heading', text: 'A bridge for a park' },
    { text: 'Key Biscayne was once the largest coconut plantation in the United States. In 1940 the family that owned it gave more than 800 acres to the county for a public park. In return, the county promised to build a road across the water. The war held it up, and the causeway you just drove opened in 1947.' },
    { kind: 'find', text: 'Find the bridge you just crossed, and follow it with your eyes back to the towers of the city where it starts.' },
    { className: 'narrationClose', text: 'Drive on over the next bridge to the north end of Crandon Park. Tap “I’m Here” at the nature center.' },
  ],
}

const natureCenter = {
  id: 'biscayneNatureCenter',
  name: 'The Fossil Reef',
  photo: noImage,
  photoAlt: 'No photo yet of the Biscayne Nature Center or the fossil reef',
  memory: 'Roots that turned to stone.',
  mapPlace: 'Marjory Stoneman Douglas Biscayne Nature Center, 6767 Crandon Blvd, Key Biscayne',
  mapPoint: { lat: 25.71541, lng: -80.15145 },
  travelMode: 'driving',
  distanceMeters: 5601,
  travelMinutes: 9,
  effort: { level: 'easy', note: 'A short drive over the Bear Cut bridge' },
  stayMinutes: [45, 60],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Before the coconuts' },
    { text: 'Long before the plantation, mangroves grew at this end of the island. When they died, their tangled roots slowly turned to rock. The fossil reef at the end of the trail is made of them, and it’s roughly 1,000 to 2,000 years old.' },
    { text: 'The nature center is named for Marjory Stoneman Douglas, the writer who called the Everglades a “river of grass” and spent her life protecting them.' },
    { kind: 'find', text: 'Follow the trail and boardwalk to the fossil reef overlook, and find the lumpy grey rock at the water’s edge. Those are the old roots. It shows best at low tide.' },
    { className: 'narrationClose', text: 'Now head to the beach just south of here, a few minutes away. Tap “I’m Here” on the sand.' },
  ],
}

const beach = {
  id: 'crandonBeach',
  name: 'Crandon Beach',
  photo: beachPhoto,
  photoAlt: 'Calm, shallow water and a wide beach at Crandon Park',
  memory: 'Wading out to the sandbar.',
  mapPlace: 'Crandon Park Beach, Key Biscayne',
  mapPoint: { lat: 25.70804, lng: -80.15224 },
  travelMode: 'driving',
  distanceMeters: 735,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'A short drive to the beach car park, or about 1 km on foot' },
  stayMinutes: [60, 90],
  nearby: [
    {
      name: 'The Plantation Palms',
      kind: 'photo',
      note: 'Turn your back to the sea for a photo of the coconut palms behind the beach, a reminder of the plantation this park used to be. Late afternoon light is warmest.',
      meters: 50,
      photo: palmsPhoto,
      photoAlt: 'Coconut palms behind the beach at Crandon Park, under a blue sky',
      mapPlace: 'Crandon Park Beach, Key Biscayne',
      mapPoint: { lat: 25.7083, lng: -80.1528 },
    },
  ],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'A wall the sea built' },
    { text: 'Out past the shallows is a long sandbar that breaks the waves before they reach the beach, which is why the water here is so calm. The sea keeps moving it: storms and currents change its shape from season to season. Many people swim or wade out to it and walk along its length.' },
    { kind: 'heading', text: 'Horses the zoo left behind' },
    { text: 'Near the beach is the park’s family amusement center, with a carousel whose horses were made in 1949. They were locked away for years after the zoo left, until volunteers repainted them and gave them names like Mercy and Pretty Phoebe. Its hours vary, so call ahead if you’d like a ride.' },
    { kind: 'find', text: 'Find the line where the waves break offshore. That’s the sandbar. Stay near the lifeguard towers if you go out to it.' },
    { className: 'narrationClose', text: 'When you’ve dried off, drive to the south end of the park, about 5 minutes, to the Gardens at Crandon Park. Tap “I’m Here” at the gardens.' },
  ],
}

const gardens = {
  id: 'crandonGardens',
  name: 'The Gardens at Crandon Park',
  photo: peacockPhoto,
  photoAlt: 'A blue peacock walking among the trees in Crandon Park',
  memory: 'The peacocks that stayed.',
  mapPlace: 'The Gardens at Crandon Park, Key Biscayne',
  mapPoint: { lat: 25.69333, lng: -80.16306 },
  travelMode: 'driving',
  distanceMeters: 2473,
  travelMinutes: 5,
  effort: { level: 'easy', note: 'A short drive south through the park' },
  stayMinutes: [30, 45],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'Miami’s first zoo' },
    { text: 'In 1948 the county bought three monkeys, a goat and two black bears from a small travelling show, for $270, and put them here. That was the start of the Crandon Park Zoo. By 1965 it had more than a thousand animals and was one of the major zoos in the country.' },
    { kind: 'heading', text: 'The ones who stayed' },
    { text: 'Around 1980 the zoo moved south to a new home, which became Zoo Miami. The animals went with it, but the gardens stayed, with traces of the old enclosures, and so did the peacocks. Today they strut along the paths as if they own the place.' },
    { kind: 'find', text: 'Count the peacocks you can see, and listen for their loud, wailing call. Then look for a wall or a pond that might once have been part of the zoo.' },
    PEAK_CLOSE,
  ],
}

const noNameHarbor = {
  id: 'noNameHarbor',
  name: 'No Name Harbor',
  photo: sunsetPhoto,
  photoAlt: 'The sun setting over Biscayne Bay from Key Biscayne',
  memory: 'Sunset on the bay side.',
  mapPlace: 'No Name Harbor, Bill Baggs Cape Florida State Park, Key Biscayne',
  mapPoint: { lat: 25.67677, lng: -80.16282 },
  travelMode: 'driving',
  distanceMeters: 2571,
  travelMinutes: 7,
  effort: { level: 'easy', note: 'Through the village to the state park at the island’s tip' },
  stayMinutes: [45, 75],
  nearby: [
    {
      name: 'Boater’s Grill',
      kind: 'food',
      note: 'A casual seafood restaurant right on the harbor, with tables outside facing the boats. Popular at sunset, so expect a wait.',
      meters: 210,
      photo: boatersGrillPhoto,
      photoAlt: 'Boats moored at No Name Harbor beside Boater’s Grill in the evening',
      mapPlace: 'Boater’s Grill, 1200 Crandon Blvd, Key Biscayne',
      mapPoint: { lat: 25.67534, lng: -80.16146 },
    },
    {
      name: 'The Cape Florida Lighthouse',
      kind: 'photo',
      note: 'Built in 1825 at the island’s tip. Its grounds have been closed since late October 2026 after king tides flooded them, but you can photograph the tower from the open beach to its north.',
      meters: 1000,
      photo: lighthousePhoto,
      photoAlt: 'The white Cape Florida Lighthouse against a blue sky, seen from the beach',
      mapPlace: 'Bill Baggs Cape Florida State Park beach, Key Biscayne',
      mapPoint: { lat: 25.6715, lng: -80.1553 },
    },
  ],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The quiet side' },
    { text: 'No Name Harbor is a little sheltered bay where boats tie up for the night. Facing west across Biscayne Bay, it’s where the island watches the sun go down.' },
    { kind: 'heading', text: 'Still changing' },
    { text: 'The island hasn’t stopped changing. This autumn, king tides flooded the grounds of the old lighthouse at its tip, and they’re closed while the park works on them. A plantation, a zoo, roots turned to stone, a sandbar that moves with every storm: Key Biscayne keeps what people and the sea leave behind, and keeps reshaping it.' },
    { kind: 'find', text: 'Find a spot on the seawall and watch the sun sink behind the mainland. See who in your family can spot the first light come on across the water.' },
    { className: 'narrationClose', text: 'That’s the island. Dinner’s by the water, if you like.' },
  ],
}

export default {
  id: 'keyBiscayne',
  aiMade: true,
  name: 'The Island the Zoo Left Behind',
  location: 'KEY BISCAYNE · FLORIDA, USA',
  city: 'Key Biscayne',
  photo: heroPhoto,
  photoAlt: 'A peacock in Crandon Park on Key Biscayne',
  blurb: 'A causeway traded for a plantation, a reef of stone roots, a sandbar the sea keeps moving, and the peacocks Miami’s first zoo left behind.',
  walking: 'Walk + drive',
  stops: '~5 stops',
  difficulty: 'Easy',
  experienceLevel: 'localDiscovery',
  experiences: ['Nature', 'Interactive', 'Hidden Gems', 'Scenic'],
  departure: hobie,
  discovery: natureCenter,
  build: beach,
  peak: gardens,
  afterglow: noNameHarbor,
  startArea: 'Key Biscayne, Miami, Florida, USA',
  startNote: START_NOTE,
  bestTime: {
    season: 'November to April',
    seasonNote: 'The drier, cooler months. Summer afternoons bring heat and thunderstorms.',
    timeOfDay: 'From late morning until sunset',
    timeNote: 'Check the tide before you go: the fossil reef shows best at low tide. Bill Baggs closes at sunset.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Swimsuits, towels, water shoes and reef-safe sunscreen.',
      'Water and snacks for the day.',
      'Insect repellent for the trail to the fossil reef.',
    ],
    costs: [
      { lead: 'Rickenbacker Causeway toll', text: '$3.25 with SunPass or $6.50 by Toll-By-Plate for a car, per Miami-Dade County.' },
      { lead: 'Crandon Park', text: '$7 a car Monday to Thursday and $10 Friday to Sunday, plus tax. The nature center and gardens are free.' },
      { lead: 'Bill Baggs Cape Florida State Park', text: '$8 per vehicle.' },
    ],
    getting: [
      { lead: 'Parking', text: 'Hobie Island Beach Park has roadside parking along the causeway, free by most accounts. Crandon Park has more than 3,000 spaces, with car parks by the nature center and the beach. At Bill Baggs, park by No Name Harbor. On weekends, arrive before noon for the easiest parking.' },
      'You’ll need a car: the stops are spread along about 11 km of road.',
    ],
    access: [
      'The beach and boardwalks are mostly flat. The trail to the fossil reef is about 1.5 km each way. Crandon Park has beach wheelchairs for visitors with limited mobility.',
    ],
    restrictions: [
      { lead: 'Drones', text: 'Not allowed: Miami-Dade parks ban launching any aircraft without the parks director’s written permission, and Florida state parks ban it outright.' },
      { lead: 'Lighthouse', text: 'The Cape Florida Lighthouse grounds have been closed since 28 Oct 2026 after king-tide flooding, with tours cancelled. Check Florida State Parks before you go.' },
      'Crandon Park doesn’t allow pets (except service animals), glass containers or flotation devices on the beach.',
    ],
    tips: [
      'Swim only near the lifeguard towers, and keep an eye on the tide if you wade to the sandbar.',
      'Peacocks are wild: admire them, but don’t feed or chase them.',
    ],
  },
  match: {
    moods: { Peaceful: 70, Adventurous: 55, Romantic: 45, Curious: 75, Playful: 92, Cultural: 30 },
    with: { Solo: 55, Couple: 70, Family: 96, 'Friends / Group': 75 },
    preferences: {
      'Pet friendly': 5, 'Avoid alcohol': 90, 'More nature': 90, 'Food stops': 40,
      Coastal: 98, 'More urban': 10, 'Hiking involved': 30, 'Budget friendly': 75,
    },
  },
  description: [
    'Key Biscayne was a coconut plantation, then the home of Miami’s first zoo. When the zoo moved away around 1980, it left its gardens behind, along with a carousel and a flock of peacocks that never left.',
    'This family day crosses the causeway the park was traded for, finds a reef made of stone mangrove roots, wades out to a sandbar, follows the peacocks through the old zoo, and ends with sunset on the bay side.',
  ],
  whyCool: {
    discovery: 'Peacocks still strutting among the ruins of Miami’s first zoo.',
    significance: 'A park traded for a causeway in 1940, and a reef of mangrove roots turned to stone.',
    feeling: 'Sunny and carefree: sand between your toes, calm water and a sunset over the bay.',
  },
  route: [hobie, natureCenter, beach, gardens, noNameHarbor],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was the island the zoo left behind.',
    summary: 'You crossed the causeway a park was traded for, found a reef of stone roots, waded toward the sandbar, met the peacocks the zoo left behind, and watched the sun go down over the bay.',
  },
}
