// Hold On Tight! (San Francisco): a playful day for a family, made to the
// Journey Engine V2 handoff (flagship destinations: San Francisco).
//
// Its peak, chosen first: the Musée Mécanique, a free hall of antique
// coin-operated machines where every game still costs about a quarter. Why
// San Francisco is exceptional for a family: the cable cars are rides that
// are also the city's transport, the hills come with a famously crooked
// street, and the waterfront ends with sea lions who moved in uninvited.
// The thread is the city at play: old machines that still work.
//
// Primary mood: Playful. Audience: a family with children. A cable car ride
// (about 25 minutes), then about 2 km on foot, mostly downhill or flat.
//
// Exact spots from OpenStreetMap; walks and the ride from Google's Routes
// API (November 2026). Checked in November 2026 against SFMTA (cable car
// fares) and visitor listings for the Musée Mécanique, with well-documented
// history of the cable cars, Lombard Street and the Pier 39 sea lions.

import heroPhoto from '../assets/journey/san-francisco/hero.jpg'
import powellPhoto from '../assets/journey/san-francisco/powell.jpg'
import lombardPhoto from '../assets/journey/san-francisco/lombard.jpg'
import alcatrazPhoto from '../assets/journey/san-francisco/alcatraz.jpg'
import museePhoto from '../assets/journey/san-francisco/musee.jpg'
import seaLionsPhoto from '../assets/journey/san-francisco/sea-lions.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const powell = {
  id: 'powellMarket',
  name: 'The Cable Car Turntable',
  photo: powellPhoto,
  photoAlt: 'A cable car on the turntable at Powell and Market Streets',
  memory: 'Turned round by hand.',
  mapPlace: 'Cable car turntable, Powell and Market Streets, San Francisco',
  mapPoint: { lat: 37.78471, lng: -122.4077 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [15, 30],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Today the city is your playground. First, the most famous ride in town.' },
    { kind: 'heading', text: 'Pulled by a rope under the street' },
    { text: 'San Francisco’s cable cars have no engines. Under the street runs a steel cable, always moving, and the gripman grabs it with a lever to go, and lets go to stop. Andrew Hallidie ran the first one up Clay Street in 1873; the story goes that he’d seen horses struggling on the steep hills.' },
    { kind: 'heading', text: 'The turntable' },
    { text: 'The cars can only go one way, so at the end of the line the crew pushes them round on this turntable, by hand.' },
    { kind: 'find', text: 'Watch a cable car being turned round. How many people does it take to push it?' },
    { className: 'narrationClose', text: 'Get on a Powell-Hyde car (it says Hyde on the front) and ride it up and over the hills to Lombard Street, about 25 minutes. Hold on tight! Tap “I’m Here” when you get off at Hyde and Lombard.' },
  ],
}

const lombard = {
  id: 'lombardStreet',
  name: 'Lombard Street',
  photo: lombardPhoto,
  photoAlt: 'The flower-lined hairpin bends of Lombard Street on Russian Hill',
  memory: 'The crooked street.',
  mapPlace: 'Lombard Street at Hyde Street, San Francisco',
  mapPoint: { lat: 37.80212, lng: -122.41872 },
  travelMode: 'transit',
  distanceMeters: 3387,
  travelMinutes: 26,
  effort: { level: 'easy', note: 'A cable car ride over the hills' },
  stayMinutes: [15, 25],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Too steep to go straight' },
    { text: 'This block of Lombard Street was too steep for cars to drive straight down, so in 1922 it was rebuilt with eight tight hairpin bends, lined with flowers. Now cars zigzag down slowly, and people come from all over the world to watch.' },
    { kind: 'find', text: 'Walk down the steps beside the bends and count them. Are there really eight?' },
    { className: 'narrationClose', text: 'Back up to Hyde Street and walk on down toward the bay, or hop back on the cable car to the end of the line, about 10 minutes. Tap “I’m Here” where you can see Alcatraz.' },
  ],
}

const hyde = {
  id: 'hydeStreet',
  name: 'Hyde Street and Alcatraz',
  photo: alcatrazPhoto,
  photoAlt: 'A cable car climbing Hyde Street with Alcatraz Island out in the bay',
  memory: 'The island in the bay.',
  mapPlace: 'Hyde Street cable car turnaround, Aquatic Park, San Francisco',
  mapPoint: { lat: 37.80687, lng: -122.42073 },
  travelMode: 'walking',
  distanceMeters: 635,
  travelMinutes: 11,
  effort: { level: 'easy', note: 'Downhill toward the bay' },
  stayMinutes: [10, 20],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'The steepest view' },
    { text: 'Hyde Street drops toward the bay so steeply that the cable cars look as if they’re about to dive into it. Out in the water is Alcatraz, the island that was once the most famous prison in America.' },
    { kind: 'find', text: 'Find Alcatraz in the bay, and the Golden Gate Bridge off to the left.' },
    { className: 'narrationClose', text: 'Now along the waterfront to Pier 45 and the Musée Mécanique, about 10 minutes. Bring your quarters. Tap “I’m Here” at the door.' },
  ],
}

const musee = {
  id: 'museeMecanique',
  name: 'Musée Mécanique',
  photo: museePhoto,
  photoAlt: 'Rows of antique coin-operated arcade machines inside the Musée Mécanique',
  memory: 'A quarter a go.',
  mapPlace: 'Musée Mécanique, Pier 45, Fisherman’s Wharf, San Francisco',
  mapPoint: { lat: 37.80925, lng: -122.41579 },
  travelMode: 'walking',
  distanceMeters: 621,
  travelMinutes: 8,
  effort: { level: 'easy', note: 'Flat, along the waterfront' },
  stayMinutes: [45, 90],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'A museum where you touch everything' },
    { text: 'The Musée Mécanique is one of the biggest collections of antique coin-operated machines anywhere: more than 300 of them, from mechanical fortune tellers and moving dioramas to old arcade games. It’s free to walk in, and most machines take a quarter or two to play. They all still work.' },
    { kind: 'find', text: 'Each choose one machine to try: the spookiest, the silliest and the oldest. Then swap.' },
    PEAK_CLOSE,
  ],
}

const seaLions = {
  id: 'seaLions',
  name: 'The Sea Lions of Pier 39',
  photo: seaLionsPhoto,
  photoAlt: 'California sea lions piled on the floating docks at Pier 39',
  memory: 'Uninvited guests.',
  mapPlace: 'Pier 39 Sea Lions, K-Dock, Fisherman’s Wharf, San Francisco',
  mapPoint: { lat: 37.81064, lng: -122.41158 },
  travelMode: 'walking',
  distanceMeters: 717,
  travelMinutes: 10,
  effort: { level: 'easy', note: 'Flat, along the waterfront' },
  stayMinutes: [20, 40],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'They just moved in' },
    { text: 'After the Loma Prieta earthquake in 1989, California sea lions started hauling themselves out onto the boat docks here, and they never left. The marina gave the docks to them, and now hundreds may be here, barking, snoozing and shoving each other into the water.' },
    { kind: 'find', text: 'Pick one sea lion and follow it. How long until it gets pushed off?' },
    { className: 'narrationClose', text: 'That’s a city at play. Well done for holding on tight.' },
  ],
}

export default {
  id: 'sanFrancisco',
  aiMade: true,
  name: 'Hold On Tight!',
  location: 'SAN FRANCISCO · CALIFORNIA, USA',
  city: 'San Francisco',
  photo: heroPhoto,
  photoAlt: 'A San Francisco cable car climbing Hyde Street',
  blurb: 'A cable car over the hills, the crooked street, a hall of antique arcade games, and sea lions that moved in.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experienceLevel: 'richExperience',
  experiences: ['Interactive', 'Historical', 'Scenic', 'Hidden Gems'],
  departure: powell,
  discovery: lombard,
  build: hyde,
  peak: musee,
  afterglow: seaLions,
  startArea: 'Union Square, San Francisco, California, USA',
  startNote: START_NOTE,
  bestTime: {
    season: 'Any time of year',
    seasonNote: 'September and October are often the sunniest months by the bay.',
    timeOfDay: 'Morning',
    timeNote: 'The cable car line at Powell and Market is shortest early, and the Musée opens at 10.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Quarters and dollar coins for the Musée Mécanique.',
      'A warm layer, even in summer: the bay is often cool and windy.',
    ],
    costs: [
      { lead: 'Cable car', text: '$9 a ride (SFMTA, from December 2025), one way, with no transfers. A Muni visitor passport covers unlimited rides.' },
      { lead: 'Musée Mécanique', text: 'Free to enter; most machines cost 25¢ to $1 a play.' },
      'Lombard Street and the sea lions are free.',
    ],
    getting: [
      'Start at the cable car turntable at Powell and Market Streets, by Union Square.',
      'Take the Powell-Hyde line (not Powell-Mason) to Lombard Street.',
    ],
    access: [
      'The cable cars aren’t wheelchair accessible. Lombard Street has steps beside the bends; the waterfront is flat.',
    ],
    restrictions: [
      { lead: 'Musée Mécanique', text: 'Listings give 10 AM–8 PM most days: check its site.' },
      'On the cable car, keep children seated inside or held firmly, and stay inside the yellow line.',
    ],
    tips: [
      'Board at the Powell and Market turntable for the best chance of a seat, or ride standing on the running board, holding on tight.',
    ],
  },
  match: {
    moods: { Peaceful: 25, Adventurous: 50, Romantic: 45, Curious: 70, Playful: 98, Cultural: 45 },
    with: { Solo: 55, Couple: 75, Family: 98, 'Friends / Group': 85 },
    preferences: {
      'Pet friendly': 20, 'Avoid alcohol': 90, 'More nature': 25, 'Food stops': 50,
      Coastal: 70, 'More urban': 85, 'Hiking involved': 10, 'Budget friendly': 80,
    },
  },
  description: [
    'San Francisco plays like no other city. Its cable cars, pulled by a moving rope under the street, are both transport and the best ride in town, its hills come with a famously crooked street, and its waterfront has a hall of old arcade machines and a colony of sea lions.',
    'This family day rides a cable car over the hills to Lombard Street, walks down to the bay with Alcatraz in view, plays the antique games of the Musée Mécanique, and ends with the sea lions of Pier 39.',
  ],
  whyCool: {
    discovery: 'More than 300 antique coin-operated machines that still work, free to walk in.',
    significance: 'The world’s last manually operated cable car system, running since the 1870s.',
    feeling: 'Bouncy and fun: hanging on as the cable car tips over the hill.',
  },
  route: [powell, lombard, hyde, musee, seaLions],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was San Francisco at play.',
    summary: 'You watched a cable car turned by hand at Powell and Market, rode over the hills to Lombard Street, walked down to the bay with Alcatraz in view, played the old machines of the Musée Mécanique, and ended with the sea lions at Pier 39.',
  },
}
