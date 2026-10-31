// Bamboo, Bronze and the Bay (Kamakura, Kanagawa)

import stationPhoto from '../assets/journey/kamakura/station.jpg'
import komachiDoriPhoto from '../assets/journey/kamakura/komachi-dori.jpg'
import hachimanguPhoto from '../assets/journey/kamakura/hachimangu.jpg'
import hokokujiPhoto from '../assets/journey/kamakura/hokokuji.jpg'
import greatBuddhaPhoto from '../assets/journey/kamakura/great-buddha.jpg'
import yuigahamaPhoto from '../assets/journey/kamakura/yuigahama.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const station = {
  id: 'kamakuraStation',
  name: 'Kamakura Station',
  photo: stationPhoto,
  photoAlt: 'The front of Kamakura Station, with its small clock tower, under a clear sky',
  memory: 'Where the day began.',
  mapPlace: 'Kamakura Station',
  travelMode: 'transit',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Kamakura.' },
    { text: 'Long before it was a day out from Tokyo, this small town by the sea was where the samurai ruled Japan from. You’ll feel it as the day goes on: shrines in the hills, temples down quiet lanes, and the sea never far away.' },
    { className: 'narrationClose', text: 'The first stop starts right by the station. Follow the map, and tap “I’m Here” when you reach the gate at the start of Komachi-dori.' },
  ],
}

const komachiDori = {
  id: 'komachiDori',
  name: 'Komachi-dori',
  photo: komachiDoriPhoto,
  photoAlt: 'The sign over the entrance to Komachi-dori, a narrow shopping street hung with paper streamers',
  memory: 'Snacks in hand on Komachi-dori.',
  mapPlace: 'Komachi-dori, Kamakura',
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'This is Komachi-dori, a narrow street of snack stalls, sweet shops and little stores, and it’s usually busy. Don’t fight the crowd. Drift along with it.' },
    { text: 'Grab something to eat as you walk: whatever looks good, and smells better. Keep an eye on the side alleys too. Some of the quieter shops are tucked just off the main street.' },
    { className: 'narrationClose', text: 'At the far end, the street brings you out near the shrine. That’s where we’re going next.' },
  ],
}

const hokokuji = {
  id: 'hokokuji',
  name: 'Hokokuji',
  photo: hokokujiPhoto,
  photoAlt: 'A stone path winding through a dense grove of tall bamboo at Hokokuji',
  memory: 'A moment of quiet in the bamboo.',
  teaser: 'A small temple with a bamboo grove behind it. The quietest stop of the day, if you let it be.',
  mapPlace: 'Hokokuji Temple, Kamakura',
  travelMode: 'walking',
  ...DETOUR,
  narration: [
    { text: 'You’ve found the bamboo. Hokokuji is a small temple, and most people come for the grove behind it.' },
    { text: 'Walk the path slowly. Listen for the stalks knocking together when the wind moves through. It’s easy to rush this one. Try not to.' },
    BACK_TO_ROUTE,
  ],
}

const hachimangu = {
  id: 'tsurugaokaHachimangu',
  name: 'Tsurugaoka Hachimangu',
  photo: hachimanguPhoto,
  photoAlt: 'The red main hall of Tsurugaoka Hachimangu at the top of its stone steps, among green hills',
  memory: 'Up the steps to the shrine.',
  mapPlace: 'Tsurugaoka Hachimangu',
  travelMode: 'walking',
  ...BUILD,
  detours: [hokokuji],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'This is Tsurugaoka Hachimangu, Kamakura’s most important shrine, and the heart of the old town. The long avenue that runs down to the sea was laid out to lead here.' },
    { text: 'Climb the stone steps to the main hall, then turn around and look back the way you came, over the town toward the water.' },
    { text: 'From here, the day can go two ways. A little way east there’s a quiet bamboo grove, if you’d like a detour. Otherwise, the Great Buddha is waiting.' },
  ],
}

const greatBuddha = {
  id: 'greatBuddha',
  name: 'The Great Buddha',
  photo: greatBuddhaPhoto,
  photoAlt: 'The bronze Great Buddha of Kamakura, seated in the open air before a wooded hill',
  memory: 'Face to face with the Great Buddha.',
  // At Kotoku-in, the temple it belongs to.
  mapPlace: 'Kotoku-in, Kamakura',
  travelMode: 'transit',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'The Great Buddha has sat here for centuries. There was once a hall built around it, but the hall is long gone, and the Buddha stayed, out in the open air.' },
    { text: 'Walk up close, then step back and take in the whole of it. Notice how calm the face is, however many people are standing around it.' },
    PEAK_CLOSE,
  ],
}

const yuigahama = {
  id: 'yuigahama',
  name: 'Yuigahama Beach',
  photo: yuigahamaPhoto,
  photoAlt: 'The sun setting over the sea at Yuigahama Beach, with someone crouched at the water’s edge',
  memory: 'Sunset on Yuigahama.',
  mapPlace: 'Yuigahama Beach, Kamakura',
  travelMode: 'walking',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. Yuigahama is a short walk downhill from the Buddha, and it’s the kind of place where a day ends on its own.' },
    { text: 'Find a spot on the sand and watch the light change over the bay. If you’re here near sunset, stay for it.' },
    DINNER,
  ],
}

export default {
  id: 'kamakura',
  aiMade: true,
  name: 'Bamboo, Bronze and the Bay',
  location: 'KAMAKURA · KANAGAWA, JAPAN',
  photo: greatBuddhaPhoto,
  photoAlt: greatBuddha.photoAlt,
  blurb: 'Through the old samurai capital, from a busy shopping street to the Great Buddha, and down to the sea.',
  tagline: TAGLINE,
  time: '~5 hours',
  walking: 'Easy walking',
  stops: '~5 stops',
  departure: station,
  discovery: komachiDori,
  build: hachimangu,
  peak: greatBuddha,
  afterglow: yuigahama,
  startArea: 'Kamakura, Kanagawa, Japan',
  startNote: START_NOTE,
  match: { moods: ['Peaceful', 'Cultural', 'Romantic'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 5, effort: 'Easy' },
  why: [
    'Kamakura feels like another world from Tokyo: temples in the hills, a great shrine at the heart of town, and the sea at the end of every street that runs south. This journey takes you through the busy part first, then lets the day grow quieter and bigger at the same time, until you’re standing in front of something you won’t forget, with the beach waiting just below.',
  ],
  route: [station, komachiDori, hachimangu, greatBuddha, yuigahama],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Kamakura, from the shopping street to the sea. Whatever you took from the day, it’s yours now.',
    summary: 'You started at the station, ate your way down Komachi-dori, climbed the steps of Tsurugaoka Hachimangu, stood before the Great Buddha, and finished on the sand at Yuigahama.',
  },
}
