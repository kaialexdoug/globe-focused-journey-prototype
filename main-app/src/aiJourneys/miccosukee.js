// Across the River of Grass (the Miccosukee village and Shark Valley, on the
// Tamiami Trail west of Miami): an adventurous day for a family, made to the
// Journey Engine V2 format at the developer's request (28 Nov 2026: a
// journey with a Miccosukee airboat ride).
//
// Its peak, chosen first: the Miccosukee airboat ride, with tribal guides,
// across the sawgrass to a hammock camp the same family has owned for more
// than 100 years. The thread is the people of the river of grass: who the
// Miccosukee are, how they lived on islands in the sawgrass, the alligators
// they knew, the boat that skims across it, and at the end, the same river of
// grass walked slowly on a boardwalk.
//
// Primary mood: Adventurous. Audience: a family. About 50 minutes' drive west
// of Miami, then the airboat tour (about 1 hour 40 minutes in all) and a short
// drive to Shark Valley.
//
// Spots from OpenStreetMap, the airboats' own map link and a geotagged
// Commons photo (the spots inside the village are approximate); the drives
// from Google's Routes API (November 2026). Checked in November 2026 against
// the Miccosukee Tribe's own sites (the airboat tour, its prices and hours,
// the village's hours and museum), the National Park Service (Shark Valley's
// hours and fees, drones) and Wikipedia (the tribe's history). The museum
// and the restaurant have no licensed photo yet, so they show the "no image
// available" placeholder.

import heroPhoto from '../assets/journey/miccosukee/hero.jpg'
import villagePhoto from '../assets/journey/miccosukee/village.jpg'
import babyGatorPhoto from '../assets/journey/miccosukee/baby-gator.jpg'
import boardwalkPhoto from '../assets/journey/miccosukee/boardwalk.jpg'
import marshSunsetPhoto from '../assets/journey/miccosukee/marsh-sunset.jpg'
import gatorPhoto from '../assets/journey/miccosukee/gator.jpg'
import noImage from '../assets/journey/no-image.svg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const trail = {
  id: 'tamiamiTrail',
  name: 'The Village on the Trail',
  photo: villagePhoto,
  photoAlt: 'The entrance to the Miccosukee Indian Village on the Tamiami Trail, with a big alligator statue',
  memory: 'Arriving on Miccosukee land.',
  mapPlace: 'Miccosukee Indian Village, Tamiami Trail (US-41), Miami',
  mapPoint: { lat: 25.76129, lng: -80.77519 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [10, 15],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Out here, the city is gone. All around you is the Everglades, and today you’ll cross it with the people who call it home.' },
    { kind: 'heading', text: 'A road through the river' },
    { text: 'The Tamiami Trail, the road you drove in on, was finished in 1928 to link Tampa and Miami straight across the Everglades. In the 1920s and 1930s many Miccosukee families set up camps along it, and became known as the Trail Indians. The Miccosukee Tribe of Indians of Florida was recognised by the United States in 1962. You’re on their land now.' },
    { text: 'Your airboat tour includes the tribe’s museum, an alligator show and the boat ride itself. The guides set the order, so tap “I’m Here” at each part as you come to it.' },
    { kind: 'find', text: 'Find the giant alligator at the entrance. Is it bigger than your car?' },
    { className: 'narrationClose', text: 'Check in for your tour, and follow your guides. Tap “I’m Here” when you reach the museum.' },
  ],
}

const museum = {
  id: 'miccosukeeMuseum',
  name: 'The Miccosukee Museum',
  photo: noImage,
  photoAlt: 'No photo yet of the Miccosukee museum',
  memory: 'Life on the islands of the sawgrass.',
  mapPlace: 'Miccosukee Indian Village museum, Tamiami Trail (US-41), Miami',
  mapPoint: { lat: 25.7599, lng: -80.7748 },
  travelMode: 'walking',
  distanceMeters: 160,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'A short walk into the village' },
  stayMinutes: [20, 30],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Pushed into the Everglades' },
    { text: 'The Miccosukee once lived much farther north. In the wars of the 1800s, the United States pushed them south, deep into the Everglades. Families made their homes on hammocks, small islands of trees rising out of the sawgrass, in open-sided houses roofed with palm leaves called chickees.' },
    { text: 'The museum opened in 1983. It tells that story in old photographs, documents and things the Miccosukee made and used.' },
    { kind: 'find', text: 'Look for Miccosukee patchwork: bright bands of tiny pieces of cloth sewn together in patterns. See who can find the most colours in one piece.' },
    { className: 'narrationClose', text: 'Next, the alligators. Tap “I’m Here” at the alligator show.' },
  ],
}

const alligatorShow = {
  id: 'alligatorShow',
  name: 'The Alligator Show',
  photo: babyGatorPhoto,
  photoAlt: 'A Miccosukee guide showing how to hold a young alligator safely',
  memory: 'Holding a baby alligator.',
  mapPlace: 'Miccosukee Indian Village alligator show, Tamiami Trail (US-41), Miami',
  mapPoint: { lat: 25.7601, lng: -80.77564 },
  travelMode: 'walking',
  distanceMeters: 90,
  travelMinutes: 2,
  effort: { level: 'easy', note: 'Across the village' },
  stayMinutes: [30, 40],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'Living with alligators' },
    { text: 'For people living in the sawgrass, alligators were neighbours, and food. The tribe says wrestling alligators began as a way of hunting and surviving in the Everglades. Today its handlers use it to show visitors how powerful these animals are, and why they matter to the swamp.' },
    { text: 'After the show, you can hold a baby alligator, with a handler showing you how.' },
    { kind: 'find', text: 'When it’s your turn, feel the difference between the bumpy back and the smooth belly. Then count its toes.' },
    { className: 'narrationClose', text: 'Now follow your guides to the airboat dock on the canal. Tap “I’m Here” when you’re on board.' },
  ],
}

const airboat = {
  id: 'airboatRide',
  name: 'Into the River of Grass',
  photo: heroPhoto,
  photoAlt: 'A Miccosukee airboat waiting on the canal at the edge of the sawgrass',
  memory: 'Flying over the sawgrass.',
  mapPlace: 'Miccosukee Airboat Rides, Mile Marker 36, US-41, Miami',
  mapPoint: { lat: 25.76186, lng: -80.77523 },
  travelMode: 'walking',
  distanceMeters: 335,
  travelMinutes: 5,
  effort: { level: 'easy', note: 'To the canal by the Tamiami Trail, a fast road: cross only where your guides lead you' },
  stayMinutes: [50, 60],
  nearby: [
    {
      name: 'Miccosukee Restaurant',
      kind: 'food',
      note: 'The tribe’s restaurant along the trail, known for Indian fry bread and pumpkin bread, with catfish and frog legs on the menu too. Check it’s open before you go.',
      meters: 690,
      photo: noImage,
      photoAlt: 'No photo yet of the Miccosukee Restaurant',
      mapPlace: 'Miccosukee Restaurant, Tamiami Trail (US-41), Miami',
      mapPoint: { lat: 25.76214, lng: -80.7684 },
    },
  ],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'A boat with a giant fan' },
    { text: 'An airboat has a flat bottom and a huge fan at the back, so it can skim across water only a few inches deep, and right over the grass. It’s loud and fast, and it goes where no ordinary boat could.' },
    { kind: 'heading', text: 'To the island camp' },
    { text: 'Your tribal guides will take you out across the sawgrass for about 40 minutes, to a hammock-style camp owned by the same Miccosukee family for more than 100 years: the kind of island home you saw in the museum. There you can step ashore and walk the boardwalk.' },
    { kind: 'find', text: 'Keep watch from the boat for an alligator lying still in the water, with just its eyes and nose showing.' },
    PEAK_CLOSE,
  ],
}

const sharkValley = {
  id: 'sharkValley',
  name: 'Shark Valley',
  photo: boardwalkPhoto,
  photoAlt: 'A visitor on the Bobcat Boardwalk through the sawgrass at Shark Valley',
  memory: 'Walking the river of grass.',
  mapPlace: 'Shark Valley Visitor Center, Everglades National Park',
  mapPoint: { lat: 25.75694, lng: -80.76538 },
  travelMode: 'driving',
  distanceMeters: 1586,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'A few minutes east along the trail to the park entrance' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Sunset over the Sawgrass',
      kind: 'photo',
      note: 'In winter the sun sets before the park closes to cars at 6 PM. Stand by the water near the visitor centre for birds silhouetted against the sky.',
      meters: 175,
      photo: marshSunsetPhoto,
      photoAlt: 'An anhinga silhouetted on a branch against an orange sunset over the marsh',
      mapPlace: 'Shark Valley, Everglades National Park',
      mapPoint: { lat: 25.75572, lng: -80.7665 },
    },
    {
      name: 'Alligators by the Canal',
      kind: 'photo',
      note: 'Alligators often lie in the sun along the canal beside the start of the Tram Road. Photograph them from a safe distance: never closer than the path.',
      meters: 280,
      photo: gatorPhoto,
      photoAlt: 'An alligator resting in the grass beside the Shark Valley trail',
      mapPlace: 'Tram Road, Shark Valley, Everglades National Park',
      mapPoint: { lat: 25.7545, lng: -80.7662 },
    },
  ],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The river of grass' },
    { text: 'You’re now in Everglades National Park. The writer Marjory Stoneman Douglas called the Everglades a “river of grass”: a sheet of water, often only inches deep, flowing slowly south through the sawgrass toward the sea.' },
    { kind: 'heading', text: 'Slowly, this time' },
    { text: 'This morning you crossed it at full speed. Now walk out over it on the Bobcat Boardwalk and listen. The Miccosukee have lived in this river of grass for more than 200 years, and from here you can see why it’s worth protecting.' },
    { kind: 'find', text: 'Look down into the water beside the boardwalk for fish, turtles or a gator, and up for herons standing perfectly still.' },
    { className: 'narrationClose', text: 'That’s the river of grass. Drive back east, into the sunset’s glow behind you.' },
  ],
}

export default {
  id: 'miccosukee',
  aiMade: true,
  name: 'Across the River of Grass',
  location: 'EVERGLADES · FLORIDA, USA',
  city: 'Miami',
  photo: heroPhoto,
  photoAlt: 'A Miccosukee airboat on the canal at the edge of the Everglades',
  blurb: 'The Miccosukee story, an alligator show, an airboat across the sawgrass to an island camp, and a boardwalk through the river of grass.',
  walking: 'Walk + drive',
  stops: '~5 stops',
  difficulty: 'Easy',
  experienceLevel: 'richExperience',
  experiences: ['Adventure', 'Cultural', 'Nature', 'Interactive'],
  departure: trail,
  discovery: museum,
  build: alligatorShow,
  peak: airboat,
  afterglow: sharkValley,
  startArea: 'Tamiami Trail, west of Miami, Florida, USA',
  startNote: START_NOTE,
  bestTime: {
    season: 'November to April',
    seasonNote: 'The dry season, with more wildlife near the water and fewer mosquitoes. Summer is hot, wet and buggy.',
    timeOfDay: 'Thursday to Sunday, from mid-morning',
    timeNote: 'The village is open Thursday to Sunday, 9 AM to 4 PM. The airboats run daily, with the last boat at 4 PM.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Ear protection for small children: airboats are loud.',
      'Insect repellent, sun protection, hats and water.',
      'A light layer for the wind on the boat.',
    ],
    costs: [
      { lead: 'Miccosukee airboat tour', text: '$45 for adults (13 and over), $28 for children 7 to 12, and $4 for children up to 6, with a 3% fee on card payments. It includes the boat ride, the alligator show, holding a baby alligator, the museum and the island camp. Book online.' },
      { lead: 'Shark Valley', text: 'An Everglades National Park pass, $20 to $35, card only. Non-US residents aged 16 and over pay an extra $100 each, unless they have an annual or America the Beautiful pass.' },
    ],
    getting: [
      'About 50 minutes’ drive west of downtown Miami on the Tamiami Trail (US-41). You’ll need a car.',
      { lead: 'Parking', text: 'Park at the airboat site or the village, on either side of the trail: the tour charges no extra park fee. Shark Valley has its own car park inside the entrance, which gets busy from December to April, when its tram operator warns of delays getting in. Arrive at Shark Valley by mid-afternoon: cars can’t enter after 6 PM.' },
    ],
    access: [
      'Boarding an airboat means stepping down into it: tell the crew if anyone needs help. The village paths and the Bobcat Boardwalk are flat.',
    ],
    restrictions: [
      { lead: 'Drones', text: 'Not allowed: Everglades National Park, including Shark Valley, bans them, and the village and airboat tour are on Miccosukee land, where you’d need the tribe’s permission.' },
      { lead: 'Wildlife', text: 'Never feed or approach alligators, and keep children close to you near the water.' },
      'Ask before photographing tribal members, and respect areas marked private.',
    ],
    tips: [
      'The village is closed on Christmas Day and New Year’s Day, and the airboats on Thanksgiving and Christmas Day.',
      'Combine it with the Shark Valley tram tour on another day if your family loves the Everglades.',
    ],
  },
  match: {
    moods: { Peaceful: 45, Adventurous: 94, Romantic: 30, Curious: 88, Playful: 75, Cultural: 85 },
    with: { Solo: 65, Couple: 70, Family: 96, 'Friends / Group': 88 },
    preferences: {
      'Pet friendly': 5, 'Avoid alcohol': 95, 'More nature': 96, 'Food stops': 30,
      Coastal: 10, 'More urban': 0, 'Hiking involved': 15, 'Budget friendly': 55,
    },
  },
  description: [
    'West of Miami, the Tamiami Trail runs straight across the Everglades, a river of grass where the Miccosukee have lived for more than 200 years, on islands of trees in the sawgrass.',
    'This family day starts at the Miccosukee village, learns the tribe’s story in its museum, meets the alligators, crosses the sawgrass by airboat to a family’s island camp, and ends walking the river of grass at Shark Valley.',
  ],
  whyCool: {
    discovery: 'An airboat ride with Miccosukee guides to a family camp more than 100 years old.',
    significance: 'The Everglades, and the people who have made their home in it for over two centuries.',
    feeling: 'Thrilling and wild: the roar of the fan, alligators close by, then quiet on the boardwalk.',
  },
  route: [trail, museum, alligatorShow, airboat, sharkValley],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was the river of grass, fast and slow.',
    summary: 'You arrived on Miccosukee land on the Tamiami Trail, learned their story in the museum, held a baby alligator, crossed the sawgrass by airboat to an island camp, and walked the river of grass at Shark Valley.',
  },
}
