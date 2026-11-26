// The River at Dusk (Varanasi, India): a cultural late afternoon and
// evening for one person, made to the Journey Engine V2 handoff (flagship
// destinations: anywhere in India).
//
// Why Varanasi: the handoff asks for the strongest real experience, not the
// capital, and nothing in India is more powerful than walking the ghats of
// one of the world's oldest living cities to the evening Ganga Aarti. Its
// peak, chosen first: the aarti at Dashashwamedh Ghat, where priests offer
// fire to the river as the light goes. The thread is the river as the
// city's centre of life and death: bathing, washing, cremation, prayer.
//
// Primary mood: Cultural. Audience: solo. On foot along the ghats, about
// 2 km, with many steps.
//
// Exact spots from OpenStreetMap; distances from Google's Routes API and
// along the ghats (November 2026). Checked in November 2026 against India's
// tourism ministry (Dashashwamedh Ghat), Wikipedia's Ghats in Varanasi, and
// guides to the aarti's timing and etiquette. Harishchandra Ghat, a
// cremation ghat, deliberately has no photo: it shows the "no image
// available" placeholder.

import heroPhoto from '../assets/journey/varanasi/hero.jpg'
import assiPhoto from '../assets/journey/varanasi/assi.jpg'
import kedarPhoto from '../assets/journey/varanasi/kedar.jpg'
import aartiPhoto from '../assets/journey/varanasi/aarti.jpg'
import diyaPhoto from '../assets/journey/varanasi/diya.jpg'
import noImage from '../assets/journey/no-image.svg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const assi = {
  id: 'assiGhat',
  name: 'Assi Ghat',
  photo: assiPhoto,
  photoAlt: 'Temples and wide steps at Assi Ghat beside the Ganges',
  memory: 'Where the walk begins.',
  mapPlace: 'Assi Ghat, Varanasi',
  mapPoint: { lat: 25.28904, lng: 83.00697 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [15, 20],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re at the southern end of the ghats. Walk north with the river on your right, and let the city show you its life.' },
    { kind: 'heading', text: 'Steps down to the river' },
    { text: 'The ghats are great flights of stone steps running down to the Ganges, one after another for miles along the river. People come down them to bathe, to wash, to pray and to meet. Assi Ghat, at the southern end, is livelier with students and visitors, and holds its own morning ceremony at dawn.' },
    { kind: 'find', text: 'Sit on the steps for a few minutes and watch what people come down to the river to do.' },
    { className: 'narrationClose', text: 'Walk north along the river, about 15 minutes. Tap “I’m Here” at Harishchandra Ghat, where you’ll see smoke rising.' },
  ],
}

const harishchandra = {
  id: 'harishchandraGhat',
  name: 'Harishchandra Ghat',
  photo: noImage,
  photoAlt: 'No photo of Harishchandra Ghat: it is a cremation ghat',
  memory: 'Life and death on the same river.',
  mapPlace: 'Harishchandra Ghat, Varanasi',
  mapPoint: { lat: 25.29831, lng: 83.00719 },
  travelMode: 'walking',
  distanceMeters: 1100,
  travelMinutes: 16,
  effort: { level: 'easy', note: 'North along the ghats, up and down steps' },
  stayMinutes: [5, 10],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'A cremation ghat' },
    { text: 'Harishchandra is one of Varanasi’s two cremation ghats. Many Hindus believe that to be cremated here, by the sacred river, brings release from the cycle of rebirth, and families bring their dead from far away. It is named for King Harishchandra, who, the story goes, worked at a cremation ground to keep his word.' },
    { kind: 'find', text: 'Stand back respectfully and simply watch for a moment. Don’t take photographs here.' },
    { className: 'narrationClose', text: 'Walk on a few minutes north to the striped steps of Kedar Ghat. Tap “I’m Here” at the steps.' },
  ],
}

const kedar = {
  id: 'kedarGhat',
  name: 'Kedar Ghat',
  photo: kedarPhoto,
  photoAlt: 'The red and white striped steps of Kedar Ghat rising from the Ganges',
  memory: 'The striped steps.',
  mapPlace: 'Kedar Ghat, Varanasi',
  mapPoint: { lat: 25.29905, lng: 83.00728 },
  travelMode: 'walking',
  distanceMeters: 197,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'A few minutes north along the ghats' },
  stayMinutes: [15, 20],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'Shiva’s ghat' },
    { text: 'Kedar Ghat is easy to spot by its red and white striped steps. At the top stands a temple to Shiva in his form as Kedarnath, the lord of a Himalayan shrine, and the steps are busy with people bathing and offering prayers.' },
    { kind: 'heading', text: 'The same river' },
    { text: 'A few steps from the cremation fires, people are bathing, laughing and praying in the same water. In Varanasi, life and death sit side by side on the river, and no one looks away from either.' },
    { kind: 'find', text: 'Count the stripes on the steps as you climb to the temple.' },
    { className: 'narrationClose', text: 'Now on north to Dashashwamedh Ghat for the evening aarti, about 10 minutes. Go early to find a place. Tap “I’m Here” on the steps.' },
  ],
}

const dashashwamedh = {
  id: 'dashashwamedh',
  name: 'Dashashwamedh Ghat',
  photo: aartiPhoto,
  photoAlt: 'A priest raising a tiered brass lamp of fire during the Ganga Aarti',
  memory: 'Fire offered to the river.',
  mapPlace: 'Dashashwamedh Ghat, Varanasi',
  mapPoint: { lat: 25.3038, lng: 83.00843 },
  travelMode: 'walking',
  distanceMeters: 650,
  travelMinutes: 9,
  effort: { level: 'easy', note: 'North along the ghats, busy in the evening' },
  stayMinutes: [60, 90],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The heart of the ghats' },
    { text: 'Dashashwamedh is one of the oldest and most sacred ghats in Varanasi, and every evening it holds the Ganga Aarti. A row of young priests, usually seven, in matching robes, perform a ritual of prayer to the river with bells, conch shells, incense and great tiered lamps of fire, raised and swung in slow circles.' },
    { kind: 'heading', text: 'For the river' },
    { text: 'The ceremony is an offering to the Ganges itself, honoured here as a goddess. Thousands gather on the steps and in boats on the water, and as the lamps turn, the whole riverbank seems to hold its breath.' },
    { kind: 'find', text: 'Watch one priest’s lamp and follow its circles of fire through the whole ceremony.' },
    PEAK_CLOSE,
  ],
}

const diya = {
  id: 'diya',
  name: 'A Lamp on the River',
  photo: diyaPhoto,
  photoAlt: 'A small flame offered at Dashashwamedh Ghat during the evening aarti',
  memory: 'A small flame on the dark water.',
  mapPlace: 'Dashashwamedh Ghat waterside, Varanasi',
  mapPoint: { lat: 25.3046, lng: 83.0095 },
  travelMode: 'walking',
  distanceMeters: 120,
  travelMinutes: 2,
  effort: { level: 'easy', note: 'Down the steps to the water' },
  stayMinutes: [15, 30],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Your own offering' },
    { text: 'After the aarti, people buy little leaf cups of flowers with a small candle, a diya, and set them floating on the river with a wish or a prayer. The current carries them away downstream, a line of small lights on the dark water.' },
    { kind: 'find', text: 'If you’d like to, buy a diya from one of the sellers on the steps, light it, and set it on the water.' },
    { className: 'narrationClose', text: 'That’s the river at dusk. Take a moment on the steps before you go.' },
  ],
}

export default {
  id: 'varanasi',
  aiMade: true,
  name: 'The River at Dusk',
  location: 'VARANASI · UTTAR PRADESH, INDIA',
  city: 'Varanasi',
  photo: heroPhoto,
  photoAlt: 'Priests performing the evening Ganga Aarti at Dashashwamedh Ghat',
  blurb: 'The ghats of one of the world’s oldest cities, life and death on one river, and fire offered to the Ganges at dusk.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Cultural', 'Historical', 'Scenic'],
  departure: assi,
  discovery: harishchandra,
  build: kedar,
  peak: dashashwamedh,
  afterglow: diya,
  startArea: 'Varanasi, Uttar Pradesh, India',
  startNote: START_NOTE,
  bestTime: {
    season: 'October to March',
    seasonNote: 'Cooler and dry. Summer is very hot, and in the monsoon the river can flood the lower ghats.',
    timeOfDay: 'Late afternoon into evening',
    timeNote: 'The aarti starts around 6 to 7 PM in winter and around 7 PM in summer: arrive at least 30 minutes early.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Modest clothing: shoulders and knees covered.',
      'Shoes you can slip off easily: many people go barefoot on the ghat steps.',
      'Small notes for a diya and donations.',
    ],
    costs: [
      'The walk and the aarti are free. Ignore anyone selling “special passes” to the aarti.',
      { lead: 'Optional', text: 'A diya from a seller on the steps costs a few rupees; boats can be hired to watch the aarti from the water.' },
    ],
    getting: [
      'Start at Assi Ghat, at the southern end of the main ghats. It ends at Dashashwamedh Ghat, near the centre of the old city.',
    ],
    access: [
      'Many steep, uneven steps, sometimes slippery near the water. Crowded in the evening. Not suitable for wheelchairs.',
    ],
    restrictions: [
      { lead: 'Cremation ghats', text: 'Never photograph cremations, and keep a respectful distance.' },
      'The aarti is a religious ceremony: some guides say not to use flash or film during it; follow what people around you do.',
    ],
    tips: [
      'Get to Dashashwamedh early and find a place on the steps facing the platforms.',
      'Come back at dawn another day for the river at its most peaceful.',
    ],
  },
  match: {
    moods: { Peaceful: 55, Adventurous: 45, Romantic: 45, Curious: 85, Playful: 15, Cultural: 98 },
    with: { Solo: 95, Couple: 80, Family: 40, 'Friends / Group': 70 },
    preferences: {
      'Pet friendly': 5, 'Avoid alcohol': 98, 'More nature': 30, 'Food stops': 30,
      Coastal: 0, 'More urban': 80, 'Hiking involved': 10, 'Budget friendly': 98,
    },
  },
  description: [
    'Varanasi is one of the oldest continuously inhabited cities in the world, and its life is lived on the steps down to the Ganges: bathing, washing, praying, and cremating the dead, all on the same river.',
    'This walk follows the ghats north from Assi, past a cremation ghat and the striped steps of Kedar Ghat, to Dashashwamedh for the evening Ganga Aarti, and ends with a small lamp set floating on the dark water.',
  ],
  whyCool: {
    discovery: 'Life and death side by side on the steps of one river.',
    significance: 'One of the world’s oldest living cities, and the Ganga Aarti at its most sacred ghat.',
    feeling: 'Overwhelming and moving: fire, bells and chanting over the river as night falls.',
  },
  route: [assi, harishchandra, kedar, dashashwamedh, diya],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was the river at dusk.',
    summary: 'You set off from Assi Ghat, passed the fires of Harishchandra Ghat, climbed the striped steps of Kedar Ghat, watched the Ganga Aarti at Dashashwamedh, and set a small light floating on the river.',
  },
}
