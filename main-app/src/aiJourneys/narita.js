// The Temple Town Before Your Flight (Narita, Chiba), built the same way as
// the Waseda journey (testJourney.js). Every stop has its exact spot
// (`mapPoint`, from Wikipedia and OpenStreetMap), so it gets the live map,
// and the walk to it from the stop before: how far (`distanceMeters`), how
// long (`travelMinutes`) and how hard (`effort`), from Google's walking
// routes and the heights along them (Open-Meteo), worked out once, in
// November 2026.
//
// The narration tells one story from stop to stop: a town that welcomed
// travelers long before the airport, around a temple founded in 940 to pray
// down a rebellion, and the pilgrims' street that has fed them grilled eel
// ever since. The history was checked against published sources (Wikipedia,
// in English and Japanese) in November 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import stationPhoto from '../assets/journey/narita/station.jpg'
import omotesandoPhoto from '../assets/journey/narita/omotesando.jpg'
import shinshojiPhoto from '../assets/journey/narita/shinshoji.jpg'
import calligraphyMuseumPhoto from '../assets/journey/narita/calligraphy-museum.jpg'
import pagodaPhoto from '../assets/journey/narita/pagoda.jpg'
import kawatoyoPhoto from '../assets/journey/narita/kawatoyo.jpg'

// The spots near the stops.
import threeStoriedPagodaPhoto from '../assets/journey/narita/three-storied-pagoda.jpg'
import parkPhoto from '../assets/journey/narita/naritasan-park.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE,
} from './parts.js'

const station = {
  id: 'naritaStation',
  name: 'JR Narita Station',
  photo: stationPhoto,
  photoAlt: 'The front of JR Narita Station on a sunny day, with a wide paved square before it',
  memory: 'Where the day began.',
  mapPlace: 'JR Narita Station',
  mapPoint: { lat: 35.7778492, lng: 140.3140837 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Narita.' },
    { kind: 'heading', text: 'Before the planes' },
    { text: 'Most people only know the name from the airport. But this town was welcoming travelers long before there were planes: for more than a thousand years, pilgrims have come here to visit its great temple.' },
    { kind: 'heading', text: 'Ten million a year' },
    { text: 'They still come. More than ten million people visit the temple every year, and in the first days of the New Year, around three million, more than at any other temple in Japan.' },
    { kind: 'find', text: 'On your way down, follow your nose to the first eel restaurant. There are about sixty of them along the way.' },
    { className: 'narrationClose', text: 'From the station, follow the road downhill. It turns into the old street that leads to the temple.' },
  ],
}

const omotesando = {
  id: 'naritaOmotesando',
  name: 'Narita Omotesando',
  mapName: 'Omotesando',
  photo: omotesandoPhoto,
  photoAlt: 'Narita Omotesando in the evening, a quiet curving street of old wooden shopfronts',
  memory: 'Down the old street to the temple.',
  // By the little Yakushido hall, partway down the street.
  mapPlace: 'Narita Omotesando',
  mapPoint: { lat: 35.7824205, lng: 140.3156399 },
  travelMode: 'walking',
  distanceMeters: 686,
  travelMinutes: 9,
  effort: { level: 'easy', note: 'Gently down the old street' },
  stayMinutes: [30, 45],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The pilgrims’ street' },
    { text: 'This is Omotesando, the old street that winds about 800 meters from the station down to the temple. Many of the shops are in wooden buildings that have stood here for generations, since the days when pilgrims walked here from Edo.' },
    { kind: 'heading', text: 'The smell of eel' },
    { text: 'The street is famous for eel, and about sixty restaurants serve it. You’ll smell it grilling long before you see it. Keep that in mind for later.' },
    { kind: 'find', text: 'Find the little temple hall of Yakushido, right on the street.' },
    { className: 'narrationClose', text: 'At the bottom of the street, the temple gate is waiting.' },
  ],
}

const calligraphyMuseum = {
  id: 'naritaCalligraphyMuseum',
  name: 'Naritasan Calligraphy Museum',
  mapName: 'Calligraphy Museum',
  photo: calligraphyMuseumPhoto,
  photoAlt: 'A path curving up between pine trees and clipped shrubs to the Naritasan Calligraphy Museum',
  memory: 'Brushstrokes in the park.',
  teaser: 'A museum of Japanese calligraphy, tucked into the park behind the temple. A short walk through the gardens.',
  mapPlace: 'Naritasan Calligraphy Museum',
  mapPoint: { lat: 35.7875305, lng: 140.3221656 },
  travelMode: 'walking',
  // From the temple gate, then on to the pagoda through the park.
  distanceMeters: 755,
  travelMinutes: 11,
  extraMeters: 679,
  effort: { level: 'easy', note: 'Through the park behind the temple, with some steps' },
  stayMinutes: [30, 45],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'The art of the brush' },
    { text: 'This quiet museum, in the park behind the temple, is devoted to calligraphy, the art of writing with a brush.' },
    { kind: 'heading', text: 'Made once' },
    { text: 'Even if you can’t read a word, look at the strokes: fast, slow, thick, thin. Each one was made once, and couldn’t be taken back.' },
    { kind: 'find', text: 'Find the boldest single stroke in the room, and guess how fast the brush was moving.' },
    BACK_TO_ROUTE,
  ],
}

const shinshoji = {
  id: 'naritasanShinshoji',
  name: 'Naritasan Shinshoji',
  mapName: 'Shinshoji',
  photo: shinshojiPhoto,
  photoAlt: 'The great two-storey main gate of Naritasan Shinshoji, under a clear blue sky',
  memory: 'Through the great gate at Shinshoji.',
  // The main gate, at the bottom of the temple grounds.
  mapPlace: 'Naritasan Shinshoji Temple',
  mapPoint: { lat: 35.7846419, lng: 140.3181051 },
  travelMode: 'walking',
  distanceMeters: 371,
  travelMinutes: 5,
  effort: { level: 'easy', note: 'Down the rest of the street to the gate' },
  stayMinutes: [45, 60],
  nearby: [
    {
      name: 'Three-storied pagoda',
      note: 'A painted pagoda from the early 1700s, beside the main hall',
      meters: 110,
      photo: threeStoriedPagodaPhoto,
      photoAlt: 'The three-storied pagoda at Shinshoji, with its eaves painted in bright colors, against a pale sky',
      mapPlace: '成田山新勝寺 三重塔',
      mapPoint: { lat: 35.7855947, lng: 140.3185464 },
    },
  ],
  ...BUILD,
  detours: [calligraphyMuseum],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'Founded against a rebel' },
    { text: 'In 939, a warrior named Taira no Masakado rose up against the emperor in eastern Japan. A monk, Kanchō, was sent from Kyoto with a statue of Fudō Myōō, the fierce guardian, said to have been carved by the great teacher Kūkai, to pray for the rebellion’s end. When it ended, in 940, the temple was founded here around the statue.' },
    { kind: 'heading', text: 'The fire ritual' },
    { text: 'Climb up through the great gate, and the halls spread out across the hillside above you. If you hear drums from the main hall, the goma fire ritual may be under way, with prayers offered in the flames before Fudō. Step in quietly and watch, if you can.' },
    { kind: 'find', text: 'Find the three-storied pagoda beside the main hall, painted in bright colors under its eaves.' },
    { className: 'narrationClose', text: 'In the park behind the temple, there’s a calligraphy museum, if you’d like a detour. Otherwise, climb on to the pagoda.' },
  ],
}

const pagoda = {
  id: 'naritaPeacePagoda',
  name: 'Great Pagoda of Peace',
  mapName: 'Pagoda of Peace',
  photo: pagodaPhoto,
  photoAlt: 'The Great Pagoda of Peace, a tall red and white pagoda with a golden spire, at the top of a flight of steps',
  memory: 'At the top of the temple grounds.',
  mapPlace: 'Great Pagoda of Peace, Naritasan',
  mapPoint: { lat: 35.7878742, lng: 140.3200178 },
  travelMode: 'walking',
  distanceMeters: 543,
  travelMinutes: 8,
  effort: { level: 'easy', note: 'Up through the temple grounds, with steps' },
  stayMinutes: [15, 30],
  nearby: [
    {
      name: 'Naritasan Park',
      note: 'The temple’s hillside park, with ponds, waterfalls and cherry trees',
      meters: 160,
      photo: parkPhoto,
      photoAlt: 'A pond in Naritasan Park with a little pavilion, framed by cherry blossom and red maple leaves',
      mapPlace: '成田山公園',
      mapPoint: { lat: 35.7865667, lng: 140.320777 },
    },
  ],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'At the top' },
    { text: 'At the very top of the temple grounds stands the Great Pagoda of Peace, red and white with a golden spire. Climb the steps, then turn and look back over the temple roofs.' },
    { kind: 'heading', text: 'The park below' },
    { text: 'Behind it, the temple’s park spreads down the hill, with ponds, little waterfalls and, in spring, cherry blossom. Kanchō’s statue came all this way more than a thousand years ago, and the pilgrims have been following it ever since.' },
    { kind: 'find', text: 'From the top of the steps, find the main hall below you, and the gate you came in by.' },
    PEAK_CLOSE,
  ],
}

const kawatoyo = {
  id: 'kawatoyo',
  name: 'Kawatoyo',
  photo: kawatoyoPhoto,
  photoAlt: 'Kawatoyo, an old three-storey wooden eel restaurant on Narita Omotesando, with people outside',
  memory: 'Grilled eel to end the day.',
  mapPlace: 'Kawatoyo Honten, Narita',
  mapPoint: { lat: 35.78338889, lng: 140.31672222 },
  travelMode: 'walking',
  distanceMeters: 726,
  travelMinutes: 10,
  effort: { level: 'easy', note: 'Back down through the temple and up the old street' },
  stayMinutes: [45, 60],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The old eel house' },
    { text: 'That’s the last stop. Back up Omotesando, Kawatoyo has been serving eel since 1910, in a tall wooden building that’s now protected as a cultural property. Of all the street’s eel restaurants, it draws the biggest crowds.' },
    { kind: 'heading', text: 'Watch, then eat' },
    { text: 'The eels are prepared right at the front, so you can watch before you eat. Grilled eel over rice is the reason a lot of people come to Narita at all.' },
    { kind: 'find', text: 'Watch the eels being prepared at the front of the shop before you go in.' },
    // Dinner is the stop here, so this replaces the usual DINNER line.
    { className: 'narrationClose', text: 'There may be a queue. It’s worth the wait, and you’ve earned this one.' },
  ],
}

export default {
  id: 'narita',
  aiMade: true,
  name: 'The Temple Town Before Your Flight',
  location: 'NARITA · CHIBA, JAPAN',
  city: 'Narita',
  photo: pagodaPhoto,
  photoAlt: pagoda.photoAlt,
  blurb: 'An old street of eel shops and a great temple, a short train ride from the airport.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Cultural', 'Culinary', 'Historical', 'Hidden Gems'],
  departure: station,
  discovery: omotesando,
  build: shinshoji,
  peak: pagoda,
  afterglow: kawatoyo,
  startArea: 'Narita, Chiba, Japan',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Spring or late fall',
    seasonNote: 'For the cherry blossoms in Naritasan Park in spring, or its autumn leaves in late November.',
    timeOfDay: 'During the day, before your flight',
    timeNote: 'Leave plenty of time to get to the airport afterward.',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against the Naritasan Calligraphy
  // Museum's published fees and hours, and Kawatoyo's listings.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Comfortable shoes, for the slope down Omotesando and the steps around the temple.',
      'Cash: Kawatoyo doesn’t take credit cards (it does take PayPay).',
      'A Suica or PASMO card (or one on your phone) for the train.',
      'If you’re flying, as little as you can: leave big bags in a coin locker at the airport.',
    ],
    costs: [
      'Naritasan Shinshoji, the Great Pagoda of Peace and Naritasan Park are free.',
      { lead: 'Naritasan Calligraphy Museum', text: '¥800 (from October 20, 2026). Free for anyone under 18.' },
      'Budget for lunch: eel is Narita’s specialty, and it isn’t cheap.',
    ],
    getting: [
      'Start at JR Narita Station (Keisei Narita Station is right next to it). The airport is about 10 minutes away by train.',
      'The walk ends at Kawatoyo, on Omotesando, about 10 minutes’ walk back up to the stations.',
      'If you drive, there are paid lots along Omotesando, and the Calligraphy Museum has a few free spaces.',
    ],
    access: [
      'Omotesando slopes gently down to the temple, so it’s uphill on the way back.',
      'There are stone steps up through the temple grounds to the Great Pagoda, and more in the park behind it.',
      'Omotesando is crowded at weekends, and packed over New Year.',
    ],
    restrictions: [
      { lead: 'Calligraphy Museum', text: '9 AM–4 PM, last entry 3:30 PM. Closed on Mondays (or the next weekday, after a holiday Monday), between exhibitions and at the end of the year.' },
      { lead: 'Kawatoyo', text: '10 AM–5 PM. It doesn’t take reservations: you queue.' },
    ],
    tips: [
      'At Kawatoyo, the eels are prepared right at the front of the shop, where you can watch.',
      'At weekends, the queue for Kawatoyo can be an hour or two: go early, or on a weekday.',
      'Several times a day, you can sit in on the Goma fire ritual in the Great Main Hall. Ask at the temple for the times.',
      'If you’re flying, leave plenty of time: aim to be at the airport two to three hours before your flight.',
      'Over the first few days of January, millions of people visit Shinshoji, and the town is packed.',
    ],
  },
  match: {
    moods: { Peaceful: 75, Adventurous: 25, Romantic: 40, Curious: 70, Playful: 30, Cultural: 90 },
    with: { Solo: 90, Couple: 70, Family: 60, 'Friends / Group': 60 },
    preferences: {
      'Pet friendly': 20, 'Avoid alcohol': 90, 'More nature': 45, 'Food stops': 80,
      Coastal: 5, 'More urban': 40, 'Hiking involved': 10, 'Budget friendly': 65,
    },
  },
  description: [
    'Most people only know Narita from the airport, but the town was welcoming travelers for a thousand years before there were planes. Its great temple was founded in 940 to pray down a rebellion, and pilgrims have walked the old street to it ever since, stopping for grilled eel on the way.',
    'This journey walks you down that street to the temple, up through its halls to the Great Pagoda of Peace, and back for eel at one of the oldest restaurants in town. It’s easy to fit in before a flight.',
  ],
  route: [station, omotesando, shinshoji, pagoda, kawatoyo],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Narita, the town behind the airport. Whatever you took from the day, it’s yours now.',
    summary: 'You started at JR Narita Station, walked the old Omotesando, passed through the great gate of Shinshoji, climbed to the Great Pagoda of Peace, and finished with grilled eel at Kawatoyo.',
  },
}
