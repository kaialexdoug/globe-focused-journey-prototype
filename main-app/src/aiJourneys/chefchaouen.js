// The Blue Town at Dusk (Chefchaouen, Morocco): a peaceful afternoon into
// evening for a couple, made to the Journey Engine V2 handoff (flagship
// destinations: anywhere in Morocco).
//
// Why Chefchaouen, not Marrakech or the capital: the handoff asks for the
// strongest experience, and for a peaceful one there's nowhere like this
// small mountain town, its lanes washed in every shade of blue. Its peak,
// chosen first: sunset from the hill of the Spanish Mosque, with the whole
// blue town below. The thread is water and blue: the spring the town was
// built by, and the colour no one can quite explain.
//
// Primary mood: Peaceful. Audience: a couple. On foot, about 2.9 km, with a
// steady climb to the mosque.
//
// Exact spots from OpenStreetMap; walks from Google's Routes API (November
// 2026). Checked in November 2026 against published histories of the town
// (its founding in 1471, the kasbah, the theories about the blue) and guides
// to the walk to the Spanish Mosque. See JOURNEY_ENGINE_LOG.md.

import heroPhoto from '../assets/journey/chefchaouen/hero.jpg'
import kasbahPhoto from '../assets/journey/chefchaouen/kasbah.jpg'
import lanesPhoto from '../assets/journey/chefchaouen/lanes.jpg'
import rasElMaaPhoto from '../assets/journey/chefchaouen/ras-el-maa.jpg'
import mosquePhoto from '../assets/journey/chefchaouen/mosque.jpg'
import plazaPhoto from '../assets/journey/chefchaouen/plaza.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE, DINNER } from './parts.js'

const kasbah = {
  id: 'kasbah',
  name: 'The Kasbah',
  photo: kasbahPhoto,
  photoAlt: 'The red-walled kasbah of Chefchaouen with the Rif mountains behind',
  memory: 'A fortress in the mountains.',
  mapPlace: 'Kasbah, Place Outa el-Hammam, Chefchaouen',
  mapPoint: { lat: 35.16862, lng: -5.2618 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [20, 30],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Slow down. In Chefchaouen there’s nothing to rush for.' },
    { kind: 'heading', text: 'A fortress first' },
    { text: 'Chefchaouen was founded in 1471 by Moulay Ali ben Rachid, and it began as just this: a small fortress, the kasbah, built to defend against Portuguese and Spanish attacks. The town grew up around it, in the folds of the Rif mountains.' },
    { kind: 'find', text: 'From the square, find the two peaks behind the town. Its name is often said to come from them: “look at the horns”.' },
    { className: 'narrationClose', text: 'Now wander up into the blue lanes of the medina, about 5 minutes. Tap “I’m Here” when everything around you is blue.' },
  ],
}

const blueLanes = {
  id: 'blueLanes',
  name: 'The Blue Lanes',
  photo: lanesPhoto,
  photoAlt: 'A narrow lane of blue-washed walls and steps in Chefchaouen’s medina',
  memory: 'Every shade of blue.',
  mapPlace: 'Medina, Chefchaouen',
  mapPoint: { lat: 35.17, lng: -5.26 },
  travelMode: 'walking',
  distanceMeters: 350,
  travelMinutes: 6,
  effort: { level: 'easy', note: 'Uphill through narrow lanes and steps' },
  stayMinutes: [30, 45],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Why blue?' },
    { text: 'Nobody can say for sure. Some say Jewish families who settled here, particularly in the 1930s, brought the custom of painting walls blue; others say the blue is much older, or that it stands for the sky or the sea. What everyone agrees on is that people repaint it, again and again, and every wall is a slightly different shade.' },
    { kind: 'find', text: 'Find the bluest doorway you can, and the palest one. Then decide together which you like better.' },
    { className: 'narrationClose', text: 'Follow the lanes up to the spring at the top of the town, a few minutes more. Tap “I’m Here” by the water.' },
  ],
}

const rasElMaa = {
  id: 'rasElMaa',
  name: 'Ras el-Maa',
  photo: rasElMaaPhoto,
  photoAlt: 'Water spilling over rocks at Ras el-Maa, the spring at the top of Chefchaouen',
  memory: 'The spring the town was built by.',
  mapPlace: 'Ras el-Maa spring, Chefchaouen',
  mapPoint: { lat: 35.17149, lng: -5.25609 },
  travelMode: 'walking',
  distanceMeters: 355,
  travelMinutes: 6,
  effort: { level: 'easy', note: 'Up through the lanes to the edge of town' },
  stayMinutes: [15, 25],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'Head of the water' },
    { text: 'Ras el-Maa means “head of the water”: the spring where the stream comes tumbling out of the mountain at the top of the town. People still come here to wash, to cool their feet and to sit and listen to it.' },
    { kind: 'find', text: 'Dip your fingers in. It comes straight from the mountain, and it’s cold.' },
    { className: 'narrationClose', text: 'Now cross the stream and take the path up the hill opposite to the Spanish Mosque, about 15 minutes of steady climbing. Tap “I’m Here” at the mosque.' },
  ],
}

const mosque = {
  id: 'spanishMosque',
  name: 'The Spanish Mosque',
  photo: mosquePhoto,
  photoAlt: 'The white Spanish Mosque on its hill above Chefchaouen',
  memory: 'Sunset over the blue town.',
  mapPlace: 'Spanish Mosque (Jemaa Bouzafar), Chefchaouen',
  mapPoint: { lat: 35.16553, lng: -5.25563 },
  travelMode: 'walking',
  distanceMeters: 812,
  travelMinutes: 15,
  effort: { level: 'moderate', note: 'A steady climb on a dirt path' },
  stayMinutes: [45, 60],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'A mosque without worshippers' },
    { text: 'The Spanish built this white mosque on the hill in the 1920s, during their rule over the region. It never drew the town’s people to pray, and it was left empty. Now it’s where everyone comes for the view.' },
    { kind: 'heading', text: 'The town turns blue again' },
    { text: 'From here the whole of Chefchaouen spreads below you, blue and white against the mountains. As the sun goes down, the walls deepen, and the call to prayer rises from the town.' },
    { kind: 'find', text: 'Find the kasbah where you started, and the square beside it, down in the blue.' },
    PEAK_CLOSE,
  ],
}

const plazaEvening = {
  id: 'plazaEvening',
  name: 'Outa el-Hammam at Night',
  photo: plazaPhoto,
  photoAlt: 'The square of Outa el-Hammam and the kasbah in Chefchaouen',
  memory: 'Mint tea in the square.',
  mapPlace: 'Place Outa el-Hammam, Chefchaouen',
  mapPoint: { lat: 35.1688, lng: -5.2625 },
  travelMode: 'walking',
  distanceMeters: 1348,
  travelMinutes: 20,
  effort: { level: 'easy', note: 'Back down the hill and through the medina' },
  stayMinutes: [60, 90],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Back to the square' },
    { text: 'Down in the square by the kasbah, the cafés fill up in the evening. Order a glass of sweet mint tea and watch the town go by under the lamps.' },
    { kind: 'find', text: 'Find a table looking up at the kasbah’s tower, where you began.' },
    DINNER,
  ],
}

export default {
  id: 'chefchaouen',
  aiMade: true,
  name: 'The Blue Town at Dusk',
  location: 'CHEFCHAOUEN · TANGER-TÉTOUAN-AL HOCEÏMA, MOROCCO',
  city: 'Chefchaouen',
  photo: heroPhoto,
  photoAlt: 'Blue-washed walls and steps in a lane of Chefchaouen',
  blurb: 'A mountain fortress, lanes washed in blue, a cold spring, and sunset from the hill of the Spanish Mosque.',
  walking: 'Some climbing',
  stops: '~5 stops',
  difficulty: 'Moderate',
  experiences: ['Scenic', 'Cultural', 'Historical', 'Hidden Gems'],
  departure: kasbah,
  discovery: blueLanes,
  build: rasElMaa,
  peak: mosque,
  afterglow: plazaEvening,
  startArea: 'Chefchaouen, Morocco',
  startNote: START_NOTE,
  bestTime: {
    season: 'March to June, and September to November',
    seasonNote: 'Mild in the mountains. Summer is hot; winter can be cold and wet.',
    timeOfDay: 'From mid-afternoon until after sunset',
    timeNote: 'So you’re on the hill at the Spanish Mosque as the sun goes down.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Shoes with grip for the steps and the dirt path up the hill.',
      'A torch or phone light for the walk back down after sunset.',
      'Modest clothing: shoulders and knees covered.',
    ],
    costs: [
      'The walk is free. The kasbah charges a small admission to go inside.',
    ],
    getting: [
      'Start at the square of Outa el-Hammam, in the heart of the medina, by the kasbah.',
      'Chefchaouen is a few hours by road from Tangier, and closer to Tétouan.',
    ],
    access: [
      'Steep lanes with many steps; the path to the mosque is a dirt track. Not suitable for wheelchairs or strollers.',
    ],
    restrictions: [
      'People live behind these blue doors: ask before photographing anyone, and keep your voice low in the lanes.',
      'The Spanish Mosque is no longer used for prayer; it is a viewpoint.',
    ],
    tips: [
      'Walk up with plenty of time: guides give 30 to 45 minutes from the medina to the mosque.',
    ],
  },
  match: {
    moods: { Peaceful: 96, Adventurous: 40, Romantic: 85, Curious: 60, Playful: 25, Cultural: 75 },
    with: { Solo: 80, Couple: 95, Family: 45, 'Friends / Group': 60 },
    preferences: {
      'Pet friendly': 20, 'Avoid alcohol': 98, 'More nature': 60, 'Food stops': 40,
      Coastal: 0, 'More urban': 40, 'Hiking involved': 40, 'Budget friendly': 95,
    },
  },
  description: [
    'High in Morocco’s Rif mountains, Chefchaouen began as a fortress in 1471 and grew into a town of narrow lanes washed in every shade of blue, for reasons nobody can quite agree on.',
    'This slow afternoon for two wanders from the kasbah into the blue lanes, up to the cold spring of Ras el-Maa, and across to the hill of the Spanish Mosque for sunset over the whole town, then back for mint tea in the square.',
  ],
  whyCool: {
    discovery: 'A whole town of blue walls, and no one quite knows why.',
    significance: 'A mountain stronghold founded in 1471, and the spring it grew up beside.',
    feeling: 'Slow and calm: soft blue lanes, running water, and a sunset over it all.',
  },
  route: [kasbah, blueLanes, rasElMaa, mosque, plazaEvening],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Chefchaouen, blue from the kasbah to the hilltop.',
    summary: 'You started at the kasbah, wandered the blue lanes, sat by the spring of Ras el-Maa, watched the sun set from the Spanish Mosque, and ended with mint tea in the square.',
  },
}
