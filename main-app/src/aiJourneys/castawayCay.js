// Castaways for a Day (Castaway Cay, the Bahamas): a cruise-day island
// adventure for a family, made to the Journey Engine V2 handoff (Disney
// Castaway Cay: a family journey that works around the cruise schedule,
// access, and the all-aboard time).
//
// Its peak, chosen first: Pelican Plunge, the water-play platform with two
// waterslides out in the family lagoon, included in the cruise. The day is
// built around the ship: the lookout tower in the cool of the morning, the
// lagoon in the heat of the day, and finishing near the ship with time to
// spare. The thread is castaways and treasure: a cay where silver went down
// with a ship, smugglers once landed, and now families come ashore for a day.
//
// Primary mood: Playful. Audience: a family with children. On foot (trams
// and rental bikes can save the walking), about 5 km in all.
//
// Exact spots from OpenStreetMap; walks from Google's Routes API (November
// 2026). Checked in November 2026 against Disney Cruise Line's own page on
// what to expect at Castaway Cay (what's included, Pelican Plunge, Scuttle's
// Cove, ID, trams, prohibited items) and Wikipedia's article on the island
// (Gorda Cay's history, the treasure, the 1997 lease, the dredging, the
// submarines in the lagoon, the post office). The all-aboard time, the
// tower and bike rentals, and the post office's hours come from guests'
// reports, and are marked so. Three stops have no licensed photo yet, so
// they show the "no image available" placeholder.

import heroPhoto from '../assets/journey/castaway-cay/hero.jpg'
import pierPhoto from '../assets/journey/castaway-cay/pier.jpg'
import lagoonPhoto from '../assets/journey/castaway-cay/lagoon.jpg'
import pelicanPlungePhoto from '../assets/journey/castaway-cay/family-beach.jpg'
import noImage from '../assets/journey/no-image.svg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const pier = {
  id: 'castawayPier',
  name: 'The Pier',
  photo: pierPhoto,
  photoAlt: 'A Disney cruise ship docked at the Castaway Cay pier, seen through palms',
  memory: 'Ashore on a castaway island.',
  mapPlace: 'Arrival Plaza, Castaway Cay, Bahamas',
  mapPoint: { lat: 26.07956, lng: -77.5374 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Your ship has tied up right alongside the island. Welcome ashore, castaways.' },
    { kind: 'heading', text: 'Treasure Island' },
    { text: 'Before it was Castaway Cay, this was Gorda Cay. In 1657 a ship carrying silver rescued from two earlier shipwrecks sank near here. In 1950, two men found a 72-pound silver bar on the seabed nearby, with a casting mark from 1652. People have hunted the waters for more ever since.' },
    { kind: 'heading', text: 'A castaway island' },
    { text: 'In 1997, Disney leased the island from the Bahamas for 99 years and renamed it. It was the first cruise line island where the ships dock right at the island, so nobody needs a little boat to get ashore. Only about 55 of its 1,000 acres are used; the rest is wild.' },
    { kind: 'find', text: 'First, open the Disney Cruise Line Navigator app and find today’s all-aboard time. Set an alarm for an hour before it.' },
    { className: 'narrationClose', text: 'Now head north up the island to the Observation Tower, about 30 minutes on foot past the old runway, or ride: bikes can be rented. Tap “I’m Here” at the foot of the tower.' },
  ],
}

const tower = {
  id: 'observationTower',
  name: 'The Observation Tower',
  mapName: 'The Tower',
  photo: noImage,
  photoAlt: 'No photo yet of the Observation Tower',
  memory: 'The whole island from the lookout.',
  mapPlace: 'Observation Tower, Castaway Cay, Bahamas',
  mapPoint: { lat: 26.09622, lng: -77.53682 },
  travelMode: 'walking',
  distanceMeters: 2230,
  travelMinutes: 30,
  effort: { level: 'moderate', note: 'Long and flat, in the sun, along the old runway and island trails' },
  stayMinutes: [15, 25],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The smugglers’ runway' },
    { text: 'On your way you passed the island’s old airstrip, about 945 metres long. Back in the 1930s, bootleggers smuggling drink used it as a stopover, and later other smugglers did too. These days the only people racing along it are running the Castaway Cay 5K.' },
    { kind: 'heading', text: 'Lookout' },
    { text: 'Every castaway needs a lookout. Up the tower, you can see out over the wild part of the island, the trails, and the sea all round.' },
    { kind: 'find', text: 'From the top, find your ship. How small does it look from here?' },
    { className: 'narrationClose', text: 'Now down to Family Beach, about 20 minutes on foot. Tap “I’m Here” on the sand.' },
  ],
}

const lagoon = {
  id: 'snorkelLagoon',
  name: 'Family Beach and the Lagoon',
  mapName: 'The lagoon',
  photo: lagoonPhoto,
  photoAlt: 'The shallow turquoise lagoon at Castaway Cay, seen from a distance',
  memory: 'Secrets under the lagoon.',
  mapPlace: 'Family Beach, Castaway Cay, Bahamas',
  mapPoint: { lat: 26.08847, lng: -77.5426 },
  travelMode: 'walking',
  distanceMeters: 1347,
  travelMinutes: 18,
  effort: { level: 'easy', note: 'Flat, back down the island to the beach' },
  stayMinutes: [45, 90],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'A beach made by hand' },
    { text: 'Making the island ready took 18 months. Builders dredged around 50,000 truckloads of sand from the ocean, and made a 1,700-foot channel so the ships could come right up to the pier.' },
    { kind: 'heading', text: 'Secrets under the water' },
    { text: 'Hidden in the snorkelling area are two old submarines from a ride that used to run at Walt Disney World, 20,000 Leagues Under the Sea, lying on the lagoon floor like a shipwreck.' },
    { kind: 'find', text: 'If you snorkel, look for the old submarines on the bottom of the lagoon.' },
    { className: 'narrationClose', text: 'Now along the beach to the platform out in the water. Tap “I’m Here” on the sand opposite Pelican Plunge.' },
  ],
}

const pelicanPlunge = {
  id: 'pelicanPlunge',
  name: 'Pelican Plunge',
  photo: pelicanPlungePhoto,
  photoAlt: 'Turquoise water and palms at Family Beach, with a cruise ship beyond',
  memory: 'Two slides into the lagoon.',
  mapPlace: 'Pelican Plunge, Castaway Cay, Bahamas',
  mapPoint: { lat: 26.08733, lng: -77.54092 },
  travelMode: 'walking',
  distanceMeters: 399,
  travelMinutes: 5,
  effort: { level: 'easy', note: 'Along the beach' },
  stayMinutes: [45, 90],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'Out in the lagoon' },
    { text: 'Pelican Plunge is a water-play platform out in the lagoon, with two waterslides for all ages. Swim or wade out, climb up, and slide back down into the water. It’s included with your cruise, and there are life jackets on the island for children who need them.' },
    { kind: 'find', text: 'Race each other down the two slides. Who’s fastest? Who makes the biggest splash?' },
    PEAK_CLOSE,
  ],
}

const postOffice = {
  id: 'castawayPostOffice',
  name: 'The Post Office',
  photo: noImage,
  photoAlt: 'No photo yet of the Castaway Cay post office',
  memory: 'A postcard from a castaway.',
  mapPlace: 'Post Office, Arrival Plaza, Castaway Cay, Bahamas',
  mapPoint: { lat: 26.08026, lng: -77.53647 },
  travelMode: 'walking',
  distanceMeters: 1138,
  travelMinutes: 16,
  effort: { level: 'easy', note: 'Back toward the ship, or take the tram' },
  stayMinutes: [10, 20],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Mail from a castaway' },
    { text: 'By the ship there’s a real post office, with Bahamian stamps and a postmark you can’t get anywhere else. Guests say its hours change from day to day, and that it only takes cash.' },
    { kind: 'heading', text: 'Rescued' },
    { text: 'Every castaway story ends with a ship coming to take you home. Yours is right there at the pier, and it won’t sail without you, as long as you’re back by all-aboard time.' },
    { kind: 'find', text: 'Write a postcard to yourselves about your castaway day, and post it here. It may take weeks to arrive: a surprise for later.' },
    { className: 'narrationClose', text: 'Now back aboard, well before the all-aboard time.' },
  ],
}

export default {
  id: 'castawayCay',
  aiMade: true,
  name: 'Castaways for a Day',
  location: 'CASTAWAY CAY · SOUTH ABACO, THE BAHAMAS',
  city: 'Castaway Cay',
  photo: heroPhoto,
  photoAlt: 'Palms on Castaway Cay, with a Disney cruise ship docked beyond',
  blurb: 'Treasure and smugglers, a lookout tower, submarines in the lagoon, two waterslides, and a postcard home.',
  walking: 'Moderate walking',
  stops: '~5 stops',
  difficulty: 'Moderate',
  experiences: ['Interactive', 'Scenic', 'Nature', 'Hidden Gems'],
  departure: pier,
  discovery: tower,
  build: lagoon,
  peak: pelicanPlunge,
  afterglow: postOffice,
  startArea: 'Castaway Cay, The Bahamas',
  startNote: START_NOTE,
  bestTime: {
    season: 'Your ship’s day at Castaway Cay',
    seasonNote: 'The island is only open to Disney Cruise Line guests, on the days their ship calls.',
    timeOfDay: 'From when you can go ashore',
    timeNote: 'The tower in the cool of the morning, the lagoon in the heat of the day, and the post office last, near the ship.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'ID for everyone 18 or over: you need it to go ashore and to get back on the ship.',
      'Swimsuits, water shoes, hats and plenty of sunscreen. Towels, chairs and umbrellas are provided.',
      'Cash in small bills for the post office.',
      'Water for the walk to the tower.',
    ],
    costs: [
      { lead: 'Included with your cruise', text: 'The beaches, chairs, umbrellas and towels, lunch at Cookie’s BBQ, soft-serve ice cream and drink stations, Pelican Plunge and Scuttle’s Cove for children.' },
      { lead: 'Extra', text: 'Snorkel gear, floats and boats, bike rentals (about $11 an hour has been reported) and other Port Adventures.' },
    ],
    getting: [
      'The ship docks at the island: just walk off. Trams run often between the ship and the beaches.',
      'It ends by the ship, at Arrival Plaza.',
    ],
    access: [
      'The trams take personal and electric wheelchairs, but not sand wheelchairs. There are accessible restrooms on the island.',
      'The walk to the tower and back is long and sunny: with small children, take the tram to Pelican Point and walk from there, or rent bikes (children’s bikes and child seats are available, guests report).',
    ],
    restrictions: [
      { lead: 'All aboard', text: 'Check the time in the Navigator app. Guests usually report a time in mid-afternoon, around 4:30, but it varies by sailing. Start heading back half an hour before.' },
      { lead: 'Don’t bring', text: 'Drones, your own wagons, your own floats, or fishing gear.' },
      'Serenity Bay is for adults only.',
    ],
    tips: [
      'Near Family Beach, Scuttle’s Cove has supervised activities for children aged 3 to 12, and Spring-A-Leak is a splash area for little ones.',
      'If the post office is closed, guests say Guest Services on the ship sells Bahamian stamps.',
    ],
  },
  match: {
    moods: { Peaceful: 50, Adventurous: 55, Romantic: 30, Curious: 50, Playful: 98, Cultural: 15 },
    with: { Solo: 35, Couple: 60, Family: 98, 'Friends / Group': 70 },
    preferences: {
      'Pet friendly': 0, 'Avoid alcohol': 70, 'More nature': 60, 'Food stops': 70,
      Coastal: 98, 'More urban': 0, 'Hiking involved': 20, 'Budget friendly': 85,
    },
  },
  description: [
    'Long before it was Disney’s island, Gorda Cay was a place where treasure ships went down and smugglers landed planes. Today it’s where families come ashore for a day, with a lookout tower, a lagoon hiding old submarines, and two waterslides out in the water.',
    'This castaway day starts at the pier, climbs the tower while it’s cool, spends the hot hours in the lagoon and on Pelican Plunge, and ends with a postcard home, well before the ship sails.',
  ],
  whyCool: {
    discovery: 'A cay with sunken treasure nearby, an old smugglers’ runway, and submarines under the lagoon.',
    significance: 'The first cruise line island where the ships dock right at the island.',
    feeling: 'Playful and sun-soaked: a whole island to play on, and a ship to catch home.',
  },
  route: [pier, tower, lagoon, pelicanPlunge, postOffice],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was a castaway day, and you made the ship.',
    summary: 'You came ashore at the pier, climbed the lookout tower past the old runway, looked for submarines in the lagoon, raced down the slides at Pelican Plunge, and posted a card home before all aboard.',
  },
}
