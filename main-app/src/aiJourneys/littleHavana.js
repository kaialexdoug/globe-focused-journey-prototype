// Follow the Roosters Down Calle Ocho (Little Havana, Miami): a cultural
// afternoon for a family, made to the Journey Engine V2 format at the
// developer's request (28 Nov 2026: three family journeys in Miami).
//
// Its peak, chosen first: Domino Park, where Cuban grandfathers have slapped
// down domino tiles under the shade since the 1970s, the living heart of
// Little Havana. The thread is home far from home: a memorial to what was
// lost, stars for the talent that came, a cinema that started showing films
// in Spanish, the old games kept alive, and a restaurant where it's all talked
// over. For the children, a rooster hunt runs the whole way.
//
// Primary mood: Cultural. Audience: a family. On foot along Calle Ocho, about
// 450 m, then a short drive to dinner. The route keeps to the family side of
// the street: Calle Ocho also has cigar shops and bars.
//
// Spots from OpenStreetMap (the memorial's spot on the boulevard is
// approximate); walks and the drive from Google's Routes API (November 2026).
// Checked in November 2026 against Greater Miami's tourism board (the
// roosters, the Walk of Fame, the Tower Theater, Domino Park, Versailles),
// Visit Florida, Lonely Planet (Cuban Memorial Boulevard) and Miami
// International Airport (drones). See JOURNEY_ENGINE_LOG.md.

import heroPhoto from '../assets/journey/little-havana/hero.jpg'
import memorialPhoto from '../assets/journey/little-havana/memorial.jpg'
import cubaMapPhoto from '../assets/journey/little-havana/cuba-map.jpg'
import starPhoto from '../assets/journey/little-havana/star.jpg'
import roosterPhoto from '../assets/journey/little-havana/rooster.jpg'
import towerTheaterPhoto from '../assets/journey/little-havana/tower-theater.jpg'
import dominoParkPhoto from '../assets/journey/little-havana/domino-park.jpg'
import versaillesPhoto from '../assets/journey/little-havana/versailles.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const memorial = {
  id: 'cubanMemorial',
  name: 'Cuban Memorial Boulevard',
  photo: memorialPhoto,
  photoAlt: 'Flags and monuments on Cuban Memorial Boulevard in Little Havana',
  memory: 'Remembering home.',
  mapPlace: 'Cuban Memorial Boulevard, SW 13th Ave at SW 8th St, Miami',
  mapPoint: { lat: 25.7649, lng: -80.21648 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [15, 20],
  nearby: [
    {
      name: 'The Map of Cuba',
      kind: 'culture',
      note: 'A stone map of the island carrying words by José Martí, Cuba’s national hero, with a great ceiba tree at its centre.',
      meters: 80,
      photo: cubaMapPhoto,
      photoAlt: 'A memorial with the island of Cuba carved in relief, under shady trees',
      mapPlace: 'Cuban Memorial Boulevard, SW 13th Ave, Miami',
      mapPoint: { lat: 25.7642, lng: -80.2165 },
    },
  ],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Welcome to Little Havana, the heart of Cuban Miami. Today’s mission for the kids: count every rooster you see. They’re everywhere, once you start looking.' },
    { kind: 'heading', text: 'A boulevard of memories' },
    { text: 'After Cuba’s revolution in 1959, many Cubans left the island, and a great many settled in this neighbourhood. Along this shady boulevard they put up monuments to the home they’d left: a memorial to José Martí, Cuba’s national hero, a stone map of the island, and a flame for the exiles who died in the Bay of Pigs invasion of 1961.' },
    { kind: 'find', text: 'Find the flame, and the map of Cuba. Can you find Havana on it?' },
    { className: 'narrationClose', text: 'Now walk west along Calle Ocho, Southwest 8th Street, a couple of minutes. Look down at the pavement as you go. Tap “I’m Here” when you find a pink star.' },
  ],
}

const walkOfFame = {
  id: 'walkOfFame',
  name: 'The Walk of Fame',
  photo: starPhoto,
  photoAlt: 'A pink marble star for the singer Thalía set into the pavement on Calle Ocho',
  memory: 'Stars on the pavement.',
  mapPlace: 'Calle Ocho Walk of Fame, SW 8th St at SW 14th Ave, Miami',
  mapPoint: { lat: 25.76581, lng: -80.21749 },
  travelMode: 'walking',
  distanceMeters: 198,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'A short, flat walk along Calle Ocho' },
  stayMinutes: [15, 20],
  nearby: [
    {
      name: 'The Rooster Statues',
      kind: 'photo',
      note: 'Six-foot painted roosters stand along Calle Ocho, each dressed differently. One at SW 16th Avenue is painted with both the U.S. and Cuban flags. They make the best family photo on the street.',
      meters: 350,
      photo: roosterPhoto,
      photoAlt: 'One of the brightly painted rooster statues on Calle Ocho',
      mapPlace: 'SW 8th St at SW 16th Ave, Miami',
      mapPoint: { lat: 25.7657, lng: -80.221 },
    },
  ],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Stars on Calle Ocho' },
    { text: 'From 12th to 17th Avenue, pink marble stars are set into the pavement for Latin stars who made this street proud, like the singers Celia Cruz and Gloria Estefan.' },
    { kind: 'heading', text: 'The roosters' },
    { text: 'And the roosters? Big painted rooster statues, about as tall as a grown-up, stand along the street, each dressed differently: as a farmworker, a carpenter, a doctor. In Little Havana they’re a symbol of Cuban pride.' },
    { kind: 'find', text: 'Find Celia Cruz’s star. She was called the Queen of Salsa. And how many roosters have you counted so far?' },
    { className: 'narrationClose', text: 'Keep walking west to the old cinema with a tower on top, at 15th Avenue. Tap “I’m Here” under its sign.' },
  ],
}

const towerTheater = {
  id: 'towerTheater',
  name: 'The Tower Theater',
  photo: towerTheaterPhoto,
  photoAlt: 'The cream Art Deco Tower Theater with its tall tower on Calle Ocho',
  memory: 'Movies in Spanish.',
  mapPlace: 'Tower Theater, 1508 SW 8th St, Miami',
  mapPoint: { lat: 25.76536, lng: -80.21967 },
  travelMode: 'walking',
  distanceMeters: 235,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'A short, flat walk along Calle Ocho' },
  stayMinutes: [10, 15],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'A cinema for newcomers' },
    { text: 'The Tower Theater opened in 1926. When Cuban families arrived in the 1960s, it began showing films with Spanish subtitles, and then films in Spanish, so the newcomers could go to the movies in their own language. It still shows films and stage shows today.' },
    { kind: 'find', text: 'Look up and find the tower that gives the theatre its name.' },
    { className: 'narrationClose', text: 'Right next door is the park everyone comes to see. Listen: you’ll probably hear it before you see it. Tap “I’m Here” at its gate.' },
  ],
}

const dominoPark = {
  id: 'dominoPark',
  name: 'Domino Park',
  photo: dominoParkPhoto,
  photoAlt: 'Men playing dominoes at shaded tables in Domino Park, Little Havana',
  memory: 'The click of the tiles.',
  mapPlace: 'Máximo Gómez Park (Domino Park), 801 SW 15th Ave, Miami',
  mapPoint: { lat: 25.76549, lng: -80.21937 },
  travelMode: 'walking',
  distanceMeters: 20,
  travelMinutes: 1,
  effort: { level: 'easy', note: 'Right next door' },
  stayMinutes: [20, 30],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The game from home' },
    { text: 'This is Máximo Gómez Park, named after a general of Cuba’s wars of independence, but everyone calls it Domino Park. Since the 1970s, older Cubans have come here to play dominoes, just as they did back home: tiles slapped down on the tables, arguments, laughter, and games that go on for hours.' },
    { kind: 'heading', text: 'Watch, don’t play' },
    { text: 'The tables are for members of the park’s domino club, who are over 50. Visitors are welcome to watch, as long as they keep it polite and quiet. After the memorial, the stars and the cinema, this is what it all comes to: people keeping a piece of home alive, one game at a time.' },
    { kind: 'find', text: 'Listen for the clatter when a game ends and the tiles are shuffled for the next. Count the tables that are playing.' },
    PEAK_CLOSE,
  ],
}

const versailles = {
  id: 'versailles',
  name: 'Versailles',
  photo: versaillesPhoto,
  photoAlt: 'Versailles Restaurant on Calle Ocho, with its sign over the entrance',
  memory: 'Dinner at the Cuban table.',
  mapPlace: 'Versailles Restaurant, 3555 SW 8th St, Miami',
  mapPoint: { lat: 25.76499, lng: -80.25277 },
  travelMode: 'driving',
  distanceMeters: 4234,
  travelMinutes: 11,
  effort: { level: 'easy', note: 'A short drive west along Calle Ocho' },
  stayMinutes: [45, 75],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Miami’s Cuban living room' },
    { text: 'Versailles has served Cuban food on Calle Ocho since 1971. For the exile community it became much more than a restaurant: the place to meet, to argue about Cuba and to celebrate, and politicians still stop here to be seen. It’s family-run, and recommended by the Michelin Guide.' },
    { kind: 'heading', text: 'The window' },
    { text: 'Outside is the ventanita, a little walk-up window where people stand and drink tiny cups of strong, sweet Cuban coffee. From the memorial to the dominoes to this table, today was about the home Cubans built here.' },
    { kind: 'find', text: 'Before you order, check the final rooster count. Who found the most?' },
    { className: 'narrationClose', text: 'Order something to share and stay as long as you like. That’s Little Havana.' },
  ],
}

export default {
  id: 'littleHavana',
  aiMade: true,
  name: 'Follow the Roosters Down Calle Ocho',
  location: 'LITTLE HAVANA · FLORIDA, USA',
  city: 'Miami',
  photo: heroPhoto,
  photoAlt: 'Domino tables under the pergola at Domino Park, Little Havana',
  blurb: 'A memorial to home, stars on the pavement, painted roosters, dominoes in the park and dinner at Versailles.',
  walking: 'Walk + drive',
  stops: '~5 stops',
  difficulty: 'Easy',
  experienceLevel: 'richExperience',
  experiences: ['Cultural', 'Historical', 'Culinary', 'Interactive'],
  departure: memorial,
  discovery: walkOfFame,
  build: towerTheater,
  peak: dominoPark,
  afterglow: versailles,
  startArea: 'Little Havana, Miami, Florida, USA',
  startNote: START_NOTE,
  bestTime: {
    season: 'Any time of year',
    seasonNote: 'The Calle Ocho street festival each March is huge fun but very crowded.',
    timeOfDay: 'Afternoon into dinner',
    timeNote: 'Domino Park is liveliest in the daytime; finish at Versailles for an early dinner.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Sun protection and water.',
      'Small bills or a card for coffee and snacks along the way.',
    ],
    costs: [
      'The walk is free. Versailles is inexpensive by Miami standards (the Michelin Guide lists it as $).',
    ],
    getting: [
      { lead: 'Parking', text: 'Calle Ocho has metered parking, and there are public car parks around Domino Park. The side streets sometimes have free spaces, but read the signs: some are for residents only. Versailles has its own car park, so drive there at the end.' },
      'The City of Miami’s free trolley has a route through Little Havana: check its current schedule.',
    ],
    access: [
      'Flat pavements along Calle Ocho, with busy road crossings. Fine for strollers and wheelchairs.',
    ],
    restrictions: [
      { lead: 'Drones', text: 'Not here: Little Havana is within five miles of Miami International Airport, which asks drone flyers that close to contact it and the FAA control tower first, and the street is crowded.' },
      'Domino Park’s tables are for its club members. Watch quietly, and ask before taking close-up photos of the players.',
    ],
    tips: [
      'Cuban coffee is strong and very sweet: children may prefer a fresh juice or a milkshake.',
      'Calle Ocho also has cigar shops and bars; this route keeps to the family side of the street.',
    ],
  },
  match: {
    moods: { Peaceful: 40, Adventurous: 30, Romantic: 60, Curious: 85, Playful: 75, Cultural: 97 },
    with: { Solo: 70, Couple: 80, Family: 94, 'Friends / Group': 85 },
    preferences: {
      'Pet friendly': 40, 'Avoid alcohol': 85, 'More nature': 5, 'Food stops': 90,
      Coastal: 0, 'More urban': 95, 'Hiking involved': 0, 'Budget friendly': 92,
    },
  },
  description: [
    'After Cuba’s revolution, many Cubans who left the island made a new home on Calle Ocho, Southwest 8th Street, in what became Little Havana. They brought their music, their food and their games with them.',
    'This family walk starts at the memorial to the home they left, finds the stars on the pavement and the painted roosters, passes a cinema that began showing films in Spanish, watches the domino players in their park, and ends with dinner at Versailles.',
  ],
  whyCool: {
    discovery: 'Domino Park, where older Cubans play the game from home every day.',
    significance: 'The heart of Cuban Miami, built by exiles from the 1960s on.',
    feeling: 'Lively and warm: the clatter of dominoes, strong coffee and a rooster hunt.',
  },
  route: [memorial, walkOfFame, towerTheater, dominoPark, versailles],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Calle Ocho, rooster by rooster.',
    summary: 'You started at the memorial to the home Cubans left, found the stars on Calle Ocho and the painted roosters, heard how the Tower Theater welcomed newcomers, watched the domino players, and ended at the Cuban table at Versailles.',
  },
}
