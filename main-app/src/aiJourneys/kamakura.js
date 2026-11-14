// Bamboo, Bronze and the Bay (Kamakura, Kanagawa), built the same way as
// the Waseda journey (testJourney.js). Every stop has its exact spot
// (`mapPoint`, from Wikipedia and OpenStreetMap), so it gets the live map,
// and the way to it from the stop before: how far (`distanceMeters`), how
// long (`travelMinutes`) and how hard (`effort`), from Google's walking
// routes and the heights along them (Open-Meteo), worked out once, in
// November 2026. Google has no train routes in Japan, so the ride on the
// Enoden is its length on the line (Wikipedia), and its time is an estimate.
//
// The narration tells one story from stop to stop: the town the first
// samurai government ruled Japan from, from the shrine and the avenue its
// founder built, to the Buddha cast in its heyday and the beach where it
// fell. The history was checked against published sources (Wikipedia) in
// November 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import stationPhoto from '../assets/journey/kamakura/station.jpg'
import komachiDoriPhoto from '../assets/journey/kamakura/komachi-dori.jpg'
import hachimanguPhoto from '../assets/journey/kamakura/hachimangu.jpg'
import hokokujiPhoto from '../assets/journey/kamakura/hokokuji.jpg'
import greatBuddhaPhoto from '../assets/journey/kamakura/great-buddha.jpg'
import yuigahamaPhoto from '../assets/journey/kamakura/yuigahama.jpg'

// The spots near the stops.
import zeniaraiPhoto from '../assets/journey/kamakura/zeniarai-benten.jpg'
import kenchojiPhoto from '../assets/journey/kamakura/kenchoji.jpg'
import jomyojiPhoto from '../assets/journey/kamakura/jomyoji.jpg'
import hasederaPhoto from '../assets/journey/kamakura/hasedera.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const station = {
  id: 'kamakuraStation',
  name: 'Kamakura Station',
  photo: stationPhoto,
  photoAlt: 'The front of Kamakura Station, with its small clock tower, under a clear sky',
  memory: 'Where the day began.',
  mapPlace: 'Kamakura Station',
  mapPoint: { lat: 35.31907222, lng: 139.55043611 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  nearby: [
    {
      name: 'Zeniarai Benten',
      note: 'A shrine in a cave in the hills, where people wash their money in the spring for luck',
      meters: 1060,
      photo: zeniaraiPhoto,
      photoAlt: 'A stone torii in front of the tunnel cut through the rock into Zeniarai Benten',
      mapPlace: '銭洗弁財天宇賀福神社, 鎌倉',
      mapPoint: { lat: 35.32581389, lng: 139.54225 },
    },
  ],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Kamakura.' },
    { kind: 'heading', text: 'The samurai capital' },
    { text: 'From 1185 to 1333, this small town by the sea was where Japan was really ruled from. Minamoto no Yoritomo set up the first samurai government here, and today follows his town from the shrine he built, to the Buddha cast in its heyday, to the beach where it all ended.' },
    { kind: 'heading', text: 'Washing money' },
    { text: 'In the hills west of the station is Zeniarai Benten, a shrine in a cave. The story goes that Yoritomo found its spring after a god came to him in a dream, and since 1257, people have washed their coins in it, hoping they’ll multiply.' },
    { kind: 'find', text: 'Find the little clock tower on the front of the station. Then find the gate at the start of Komachi-dori, just to the north.' },
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
  mapPoint: { lat: 35.3207763, lng: 139.5519605 },
  travelMode: 'walking',
  distanceMeters: 250,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'Flat, just around the corner from the station' },
  stayMinutes: [30, 45],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The back way to the shrine' },
    { text: 'This is Komachi-dori, a narrow street of snack stalls, sweet shops and little stores, running alongside the town’s great avenue up to the shrine. It’s usually busy. Don’t fight the crowd. Drift along with it.' },
    { kind: 'heading', text: 'Snacks as you go' },
    { text: 'Grab something to eat as you walk: whatever looks good, and smells better. Keep an eye on the side alleys too. Some of the quieter shops are tucked just off the main street.' },
    { kind: 'find', text: 'Find a side alley off the main street, and see what’s tucked away down it.' },
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
  mapPoint: { lat: 35.3195248, lng: 139.5689009 },
  travelMode: 'walking',
  // From the shrine, then back to Kamakura Station for the train, which is
  // further from here than from the shrine.
  distanceMeters: 1566,
  travelMinutes: 22,
  extraMeters: 2965,
  effort: { level: 'easy', note: 'East along the road, a little uphill at the end' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Jomyoji',
      note: 'One of Kamakura’s five great Zen temples, with an old teahouse that’s open to visitors',
      meters: 430,
      photo: jomyojiPhoto,
      photoAlt: 'The main hall of Jomyoji, with a wide green roof, at the end of a stone path through a raked garden',
      mapPlace: '浄妙寺, 鎌倉',
      mapPoint: { lat: 35.32283333, lng: 139.57130556 },
    },
  ],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'The bamboo temple' },
    { text: 'You’ve found the bamboo. Hokokuji was founded in 1334, the year after the samurai government fell, and most people come for the grove behind it: about two thousand tall moso bamboo.' },
    { kind: 'heading', text: 'For the fallen' },
    { text: 'Near the bell tower, stone towers stand in memory of the thousands of warriors killed in 1333, in the battle that brought the old government down. Walk the path slowly. Listen for the stalks knocking together when the wind moves through.' },
    { kind: 'find', text: 'Find the little teahouse in the grove, and sit for a bowl of tea among the bamboo.' },
    BACK_TO_ROUTE,
  ],
}

const hachimangu = {
  id: 'tsurugaokaHachimangu',
  name: 'Tsurugaoka Hachimangu',
  mapName: 'Hachimangu',
  photo: hachimanguPhoto,
  photoAlt: 'The red main hall of Tsurugaoka Hachimangu at the top of its stone steps, among green hills',
  memory: 'Up the steps to the shrine.',
  mapPlace: 'Tsurugaoka Hachimangu',
  mapPoint: { lat: 35.32472222, lng: 139.55583333 },
  travelMode: 'walking',
  distanceMeters: 684,
  travelMinutes: 10,
  effort: { level: 'easy', note: 'Flat to the shrine, then its stone steps' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Kenchoji',
      note: 'The oldest Zen training monastery in Japan, finished in 1253',
      meters: 790,
      photo: kenchojiPhoto,
      photoAlt: 'The great wooden Sanmon gate of Kenchoji, with tall trees either side',
      mapPlace: '建長寺, 鎌倉',
      mapPoint: { lat: 35.33178889, lng: 139.55534722 },
    },
  ],
  ...BUILD,
  detours: [hokokuji],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'The shogun’s shrine' },
    { text: 'This is Tsurugaoka Hachimangu, Kamakura’s most important shrine. Yoritomo moved it here in 1191 to protect his government, and laid out his town around it. The long avenue in front, Wakamiya Ōji, runs 1.8 kilometers straight down to the sea. He built it in 1182 as a prayer for the safe birth of his first son.' },
    { kind: 'heading', text: 'Murder on the steps' },
    { text: 'In 1219, on a snowy evening, Yoritomo’s last son, the shogun Sanetomo, was coming down these steps when his own nephew sprang out and killed him. A great ginkgo beside the steps was said to have hidden the killer, though that part of the story was added centuries later. The old tree came down in a storm in 2010.' },
    { kind: 'find', text: 'Climb the stone steps to the main hall, then turn around and look down the avenue toward the sea. Then find where the old ginkgo stood, beside the steps.' },
    { className: 'narrationClose', text: 'From here, the day can go two ways. A walk to the east, there’s a quiet bamboo grove, if you’d like a detour. Otherwise, the Great Buddha is waiting.' },
  ],
}

const greatBuddha = {
  id: 'greatBuddha',
  name: 'The Great Buddha',
  mapName: 'Great Buddha',
  photo: greatBuddhaPhoto,
  photoAlt: 'The bronze Great Buddha of Kamakura, seated in the open air before a wooded hill',
  memory: 'Face to face with the Great Buddha.',
  // At Kotoku-in, the temple it belongs to.
  mapPlace: 'Kotoku-in, Kamakura',
  mapPoint: { lat: 35.31686, lng: 139.53572 },
  travelMode: 'transit',
  // The Enoden from Kamakura to Hase is 1.7 km. With the walk back to
  // Kamakura Station (918 m, 13 minutes) and up from Hase Station (628 m, 9
  // minutes), which aren't counted in the walking, it's about half an hour.
  distanceMeters: 1700,
  travelMinutes: 30,
  effort: { level: 'easy', note: 'A walk back to Kamakura Station, the little Enoden train to Hase, then a gentle walk uphill' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Hasedera',
      note: 'A hillside temple with a huge carved Kannon, and a view out over the bay',
      meters: 540,
      photo: hasederaPhoto,
      photoAlt: 'The Kannon hall of Hasedera, a wooden temple building on a hillside among trees',
      mapPlace: '長谷寺, 鎌倉',
      mapPoint: { lat: 35.3125, lng: 139.53305556 },
    },
  ],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'Cast in bronze' },
    { text: 'The Great Buddha was cast around 1252, when Kamakura was at its height, and with its base it stands 13.35 meters tall. A great wooden Buddha stood here before it, finished in 1243 after ten years of work.' },
    { kind: 'heading', text: 'Out in the open' },
    { text: 'There was once a hall around it, too. Storms wrecked it twice, and in 1498 a tsunami washed the last one away. Since then, the Buddha has sat out in the open air, as calm as ever, however many people are standing around it.' },
    { kind: 'find', text: 'Walk up close and look near its ears: there are still traces of the gold it was once covered in. Then step back and take in the whole of it.' },
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
  mapPoint: { lat: 35.3079, lng: 139.5395 },
  travelMode: 'walking',
  distanceMeters: 1076,
  travelMinutes: 15,
  effort: { level: 'easy', note: 'Downhill through Hase to the sea' },
  stayMinutes: [30, 60],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The end of the avenue' },
    { text: 'That’s the last stop. Yuigahama is the beach the shrine’s great avenue runs down to, a little way along the sand from here, and the sea the tsunami came from that took the Buddha’s hall.' },
    { kind: 'heading', text: 'Where it ended' },
    { text: 'In 1333, the samurai government’s last defenders fought on this beach against the army of Nitta Yoshisada, and Kamakura fell. Today it’s the kind of place where a day ends on its own.' },
    { kind: 'find', text: 'Find a spot on the sand and watch the light change over the bay. If you’re here near sunset, stay for it.' },
    DINNER,
  ],
}

export default {
  id: 'kamakura',
  aiMade: true,
  name: 'Bamboo, Bronze and the Bay',
  location: 'KAMAKURA · KANAGAWA, JAPAN',
  city: 'Kamakura',
  photo: greatBuddhaPhoto,
  photoAlt: greatBuddha.photoAlt,
  blurb: 'Through the old samurai capital, from the Great Buddha down to the sea.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Cultural', 'Historical', 'Nature', 'Scenic', 'Culinary'],
  departure: station,
  discovery: komachiDori,
  build: hachimangu,
  peak: greatBuddha,
  afterglow: yuigahama,
  startArea: 'Kamakura, Kanagawa, Japan',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Early summer',
    seasonNote: 'For the hydrangeas around Hasedera, near the Great Buddha, in June. Late fall, with the autumn leaves, is lovely too.',
    timeOfDay: 'On a weekday, from late morning',
    timeNote: 'Kamakura gets very busy at weekends, and this way you reach the beach for sunset.',
  },
  match: {
    moods: { Peaceful: 70, Adventurous: 45, Romantic: 70, Curious: 65, Playful: 50, Cultural: 95 },
    with: { Solo: 85, Couple: 90, Family: 75, 'Friends / Group': 85 },
    preferences: {
      'Pet friendly': 30, 'Avoid alcohol': 85, 'More nature': 60, 'Food stops': 80,
      Coastal: 80, 'More urban': 40, 'Hiking involved': 20, 'Budget friendly': 65,
    },
  },
  description: [
    'For a century and a half, this small town by the sea was where Japan was really ruled from, by the first samurai government. Its founder built a great shrine and an avenue running straight down to the sea, and in its heyday it cast a giant bronze Buddha that still sits in the open air.',
    'This journey takes you from a street of snacks to the shogun’s shrine, out to a temple in the bamboo if you like, on the little Enoden train to the Great Buddha, and down to the beach where the old capital fell.',
  ],
  route: [station, komachiDori, hachimangu, greatBuddha, yuigahama],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Kamakura, from the shopping street to the sea. Whatever you took from the day, it’s yours now.',
    summary: 'You started at the station, ate your way down Komachi-dori, climbed the steps of Tsurugaoka Hachimangu, stood before the Great Buddha, and finished on the sand at Yuigahama.',
  },
}
