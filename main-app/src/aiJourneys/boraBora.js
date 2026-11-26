// The Lagoon at Sundown (Bora Bora, French Polynesia): a romantic day for a
// couple around the island, made to the Journey Engine V2 handoff (flagship
// destinations: Bora Bora).
//
// Its peak, chosen first: sunset on Matira Beach, the island's one public
// beach, where the sun goes down into the lagoon. Why Bora Bora is
// exceptional: a high green island ringed by a turquoise lagoon and a reef,
// with a history of Polynesian sacred sites and a secret wartime base. The
// thread is arrivals: Polynesian voyagers, American sailors in 1942, and
// the two of you.
//
// Primary mood: Romantic. Audience: a couple. By car, scooter or bike on the
// round-island road, with short walks; no boat needed.
//
// Exact spots from OpenStreetMap; drives from Google's Routes API (November
// 2026). Checked in November 2026 against Pacific Wrecks and Wikipedia (the
// 1943 airfield), Bora Bora's own site (Operation Bobcat) and visitor
// listings for Matira Beach. The evening stop has no licensed photo yet, so
// it shows the "no image available" placeholder.

import heroPhoto from '../assets/journey/bora-bora/hero.jpg'
import vaitapePhoto from '../assets/journey/bora-bora/vaitape.jpg'
import maraePhoto from '../assets/journey/bora-bora/marae.jpg'
import faanuiPhoto from '../assets/journey/bora-bora/faanui.jpg'
import matiraPhoto from '../assets/journey/bora-bora/matira.jpg'
import noImage from '../assets/journey/no-image.svg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE, DINNER } from './parts.js'

const vaitape = {
  id: 'vaitape',
  name: 'Vaitape',
  photo: vaitapePhoto,
  photoAlt: 'The main street of Vaitape, Bora Bora’s village, with stalls under the trees',
  memory: 'Arriving on the island.',
  mapPlace: 'Vaitape, Bora Bora, French Polynesia',
  mapPoint: { lat: -16.50652, lng: -151.75143 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [20, 30],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’ve arrived on Bora Bora. Today is just the two of you and the island.' },
    { kind: 'heading', text: 'The way in' },
    { text: 'Vaitape is the island’s main village, where the boats from the airport come in. That airport, out on a small islet in the lagoon, was built by the US Navy’s Seabees in early 1943. Even getting here, you’ve followed in someone else’s footsteps.' },
    { kind: 'heading', text: 'Around the island' },
    { text: 'One road runs round the whole island, between the green mountain and the lagoon. Today you’ll follow it north to an old sacred site and a quiet bay, then all the way round to the southern tip for sunset.' },
    { kind: 'find', text: 'Look up from the village and find Mount Otemanu, the island’s great dark peak. You’ll see it from every stop today.' },
    { className: 'narrationClose', text: 'Head north on the round-island road to Marae Fare Opu, about 10 minutes. Tap “I’m Here” at the stones.' },
  ],
}

const marae = {
  id: 'maraeFareOpu',
  name: 'Marae Fare Opu',
  photo: maraePhoto,
  photoAlt: 'An ancient marae stone by the shore on Bora Bora',
  memory: 'A sacred place of stone.',
  mapPlace: 'Marae Fare Opu, Faanui, Bora Bora',
  mapPoint: { lat: -16.4795, lng: -151.75252 },
  travelMode: 'driving',
  distanceMeters: 6531,
  travelMinutes: 11,
  effort: { level: 'easy', note: 'North along the coast road' },
  stayMinutes: [15, 20],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The first arrivals' },
    { text: 'Long before anyone came by plane, Polynesian voyagers found these islands by canoe, reading the stars and the swell. A marae like this one was their sacred ground: a place of stones where people gathered, honoured their gods and their ancestors, and marked the great moments of their lives.' },
    { kind: 'heading', text: 'Stones by the water' },
    { text: 'Fare Opu stands right by the lagoon. Some of its stones are said to be carved with turtles, a creature that mattered deeply to the voyagers.' },
    { kind: 'find', text: 'Look closely at the large flat stones and see if you can find a carving.' },
    { className: 'narrationClose', text: 'Now on round Faanui Bay, a couple of minutes. Tap “I’m Here” by the water.' },
  ],
}

const faanui = {
  id: 'faanuiBay',
  name: 'Faanui Bay',
  photo: faanuiPhoto,
  photoAlt: 'Faanui Bay, a calm inlet beneath Bora Bora’s green mountains',
  memory: 'A secret base called Bobcat.',
  mapPlace: 'Faanui Bay, Bora Bora',
  mapPoint: { lat: -16.4865, lng: -151.7445 },
  travelMode: 'driving',
  distanceMeters: 1311,
  travelMinutes: 2,
  effort: { level: 'easy', note: 'Along the bay' },
  stayMinutes: [15, 20],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'Operation Bobcat' },
    { text: 'In 1942, with war spreading across the Pacific, the United States set up a secret supply base on Bora Bora. To keep it quiet, it was given a code name: Bobcat. Some 5,000 American servicemen arrived on this small island, and the runway they built on a motu out in the lagoon is the airport visitors land at today.' },
    { kind: 'heading', text: 'And then they left' },
    { text: 'The base closed after the war, and the island went back to its quiet. What stayed was the runway, and in time the visitors it brought, people coming not to defend the island but simply to see it.' },
    { kind: 'find', text: 'Stand by the bay and look for the reef’s white line of surf out beyond the lagoon. That reef is what makes the lagoon so calm.' },
    { className: 'narrationClose', text: 'Now all the way round to the southern tip, to Matira Beach, about 20 minutes. Tap “I’m Here” on the sand.' },
  ],
}

const matira = {
  id: 'matiraBeach',
  name: 'Matira Beach',
  photo: matiraPhoto,
  photoAlt: 'White sand and clear turquoise water at Matira Beach, Bora Bora',
  memory: 'Sunset in the lagoon.',
  mapPlace: 'Matira Beach, Bora Bora',
  mapPoint: { lat: -16.5376, lng: -151.73952 },
  travelMode: 'driving',
  distanceMeters: 11916,
  travelMinutes: 19,
  effort: { level: 'easy', note: 'South round the island road' },
  stayMinutes: [90, 150],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The beach for everyone' },
    { text: 'Most of Bora Bora’s beaches belong to its resorts. Matira, at the island’s southern tip, is the one that belongs to everyone, with soft white sand and water so clear and shallow you can wade a long way out. At low tide you can walk from the sandbar at Matira Point toward the reef.' },
    { kind: 'heading', text: 'Sundown' },
    { text: 'As evening comes, the sun goes down across the lagoon, and the sky and the water turn the same colours. This is what you came for.' },
    { kind: 'find', text: 'Wade out together until the water is at your knees, turn round, and look back at Mount Otemanu in the last of the light.' },
    PEAK_CLOSE,
  ],
}

const evening = {
  id: 'matiraEvening',
  name: 'Matira at Night',
  photo: noImage,
  photoAlt: 'No photo yet of Matira after dark',
  memory: 'Dinner by the lagoon.',
  mapPlace: 'Matira, Bora Bora',
  mapPoint: { lat: -16.53835, lng: -151.73884 },
  travelMode: 'walking',
  distanceMeters: 111,
  travelMinutes: 2,
  effort: { level: 'easy', note: 'A few steps along the beach' },
  stayMinutes: [60, 120],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'After the sun' },
    { text: 'There are restaurants and bars along the beach here. Voyagers by canoe, sailors in wartime, and now the two of you: everyone who comes to Bora Bora arrives across the water, and stays for this.' },
    { kind: 'find', text: 'Find a table where you can hear the lagoon.' },
    DINNER,
  ],
}

export default {
  id: 'boraBora',
  aiMade: true,
  name: 'The Lagoon at Sundown',
  location: 'BORA BORA · LEEWARD ISLANDS, FRENCH POLYNESIA',
  city: 'Bora Bora',
  photo: heroPhoto,
  photoAlt: 'Kayaks on the white sand at Matira, with Mount Otemanu rising over the lagoon',
  blurb: 'An old sacred site, a secret wartime base, and sunset on the island’s one public beach.',
  walking: 'Walk + drive',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Scenic', 'Historical', 'Cultural', 'Nature'],
  departure: vaitape,
  discovery: marae,
  build: faanui,
  peak: matira,
  afterglow: evening,
  startArea: 'Vaitape, Bora Bora, French Polynesia',
  startNote: START_NOTE,
  bestTime: {
    season: 'May to October',
    seasonNote: 'The drier, cooler season in French Polynesia.',
    timeOfDay: 'From early afternoon until after sunset',
    timeNote: 'So you reach Matira with time on the sand before the sun goes down.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Swimsuits, water shoes and reef-safe sunscreen.',
      'Cash and a card: smaller places may not take cards.',
    ],
    costs: [
      'The marae, the bay and Matira Beach are free, with free parking at Matira.',
      { lead: 'Getting around', text: 'Hire a car, scooter or bike in Vaitape. Public transport on the island is very limited.' },
    ],
    getting: [
      'Start in Vaitape, where the boat from the airport arrives.',
      'The round-island road is about 30 km. Matira is at the southern tip.',
    ],
    access: [
      'Mostly flat. The marae and the beach are on sand and uneven stone.',
    ],
    restrictions: [
      'A marae is a sacred site: don’t climb on the stones.',
      'At Matira Point, wade only at low tide, and watch the current near the reef.',
    ],
    tips: [
      'Some resort beaches look public but aren’t: Matira is the one that is.',
    ],
  },
  match: {
    moods: { Peaceful: 75, Adventurous: 35, Romantic: 98, Curious: 55, Playful: 40, Cultural: 55 },
    with: { Solo: 40, Couple: 98, Family: 60, 'Friends / Group': 60 },
    preferences: {
      'Pet friendly': 10, 'Avoid alcohol': 60, 'More nature': 80, 'Food stops': 50,
      Coastal: 98, 'More urban': 5, 'Hiking involved': 10, 'Budget friendly': 40,
    },
  },
  description: [
    'Bora Bora is a high green island in a ring of turquoise lagoon and reef. People have arrived here across the water for centuries: Polynesian voyagers who raised sacred stones, and in 1942 thousands of American servicemen on a secret mission.',
    'This day for two follows the round-island road from the village to an ancient marae and a quiet bay, then all the way to Matira, the island’s one public beach, to watch the sun go down into the lagoon.',
  ],
  whyCool: {
    discovery: 'An airport built by the US Navy in 1943, and a marae by the lagoon.',
    significance: 'One of the most beautiful lagoons on earth, around a sacred Polynesian island.',
    feeling: 'Warm and golden: the lagoon, the mountain, and a sunset just for two.',
  },
  route: [vaitape, marae, faanui, matira, evening],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Bora Bora, from the village to the lagoon at sundown.',
    summary: 'You set off from Vaitape, found Marae Fare Opu by the lagoon, heard about the secret base at Faanui Bay, watched the sun go down from Matira Beach, and ended with dinner by the water.',
  },
}
