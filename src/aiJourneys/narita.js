// The Temple Town Before Your Flight (Narita, Chiba)

import stationPhoto from '../assets/journey/narita/station.jpg'
import omotesandoPhoto from '../assets/journey/narita/omotesando.jpg'
import shinshojiPhoto from '../assets/journey/narita/shinshoji.jpg'
import calligraphyMuseumPhoto from '../assets/journey/narita/calligraphy-museum.jpg'
import pagodaPhoto from '../assets/journey/narita/pagoda.jpg'
import kawatoyoPhoto from '../assets/journey/narita/kawatoyo.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE,
} from './parts.js'

const station = {
  id: 'naritaStation',
  name: 'JR Narita Station',
  photo: stationPhoto,
  photoAlt: 'The front of JR Narita Station on a sunny day, with a wide paved square before it',
  memory: 'Where the day began.',
  mapPlace: 'JR Narita Station',
  travelMode: 'transit',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Narita.' },
    { text: 'Most people only know the name from the airport. But this town was welcoming travellers long before there were planes: for centuries, pilgrims have come here to visit its great temple.' },
    { className: 'narrationClose', text: 'From the station, follow the road downhill. It turns into the old street that leads to the temple.' },
  ],
}

const omotesando = {
  id: 'naritaOmotesando',
  name: 'Narita Omotesando',
  photo: omotesandoPhoto,
  photoAlt: 'Narita Omotesando in the evening, a quiet curving street of old wooden shopfronts',
  memory: 'Down the old street to the temple.',
  mapPlace: 'Narita Omotesando',
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'This is Omotesando, the old street that winds down to the temple. Many of the shops are in wooden buildings that have stood here for generations.' },
    { text: 'The street is famous for eel. You’ll smell it grilling long before you see it. Keep that in mind for later.' },
    { className: 'narrationClose', text: 'At the bottom of the street, the temple gate is waiting.' },
  ],
}

const calligraphyMuseum = {
  id: 'naritaCalligraphyMuseum',
  name: 'Naritasan Calligraphy Museum',
  photo: calligraphyMuseumPhoto,
  photoAlt: 'A path curving up between pine trees and clipped shrubs to the Naritasan Calligraphy Museum',
  memory: 'Brushstrokes in the park.',
  teaser: 'A museum of Japanese calligraphy, tucked into the park behind the temple. A short walk through the gardens.',
  mapPlace: 'Naritasan Calligraphy Museum',
  travelMode: 'walking',
  ...DETOUR,
  narration: [
    { text: 'This quiet museum is devoted to calligraphy, the art of writing with a brush.' },
    { text: 'Even if you can’t read a word, look at the strokes: fast, slow, thick, thin. Each one was made once, and couldn’t be taken back.' },
    BACK_TO_ROUTE,
  ],
}

const shinshoji = {
  id: 'naritasanShinshoji',
  name: 'Naritasan Shinshoji',
  photo: shinshojiPhoto,
  photoAlt: 'The great two-storey main gate of Naritasan Shinshoji, under a clear blue sky',
  memory: 'Through the great gate at Shinshoji.',
  mapPlace: 'Naritasan Shinshoji Temple',
  travelMode: 'walking',
  ...BUILD,
  detours: [calligraphyMuseum],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'Naritasan Shinshoji is the temple everyone came for. Climb up through the great gate, and the halls spread out across the hillside above you.' },
    { text: 'If you hear drums from the main hall, a fire ritual may be under way. Step in quietly and watch, if you can.' },
    { text: 'In the park behind the temple, there’s a calligraphy museum, if you’d like a detour. Otherwise, climb on to the pagoda.' },
  ],
}

const pagoda = {
  id: 'naritaPeacePagoda',
  name: 'Great Pagoda of Peace',
  photo: pagodaPhoto,
  photoAlt: 'The Great Pagoda of Peace, a tall red and white pagoda with a golden spire, at the top of a flight of steps',
  memory: 'At the top of the temple grounds.',
  mapPlace: 'Great Pagoda of Peace, Naritasan',
  travelMode: 'walking',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'At the very top of the temple grounds stands the Great Pagoda of Peace, red and white with a golden spire.' },
    { text: 'Climb the steps, then turn and look back over the temple roofs. Afterward, wander down through the park behind it, with its ponds and little waterfalls.' },
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
  travelMode: 'walking',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. Back up Omotesando, Kawatoyo is one of the street’s old eel restaurants, in a tall wooden building.' },
    { text: 'The eels are prepared right at the front, so you can watch before you eat. Grilled eel over rice is the reason a lot of people come to Narita at all.' },
    // Dinner is the stop here, so this replaces the usual DINNER line.
    { className: 'narrationClose', text: 'There may be a queue. It’s worth the wait, and you’ve earned this one.' },
  ],
}

export default {
  id: 'narita',
  aiMade: true,
  name: 'The Temple Town Before Your Flight',
  location: 'NARITA · CHIBA, JAPAN',
  photo: pagodaPhoto,
  photoAlt: pagoda.photoAlt,
  blurb: 'Down the old street of eel shops, through a great temple on the hill, and up to its pagoda, a short train ride from the airport.',
  tagline: TAGLINE,
  time: '~4 hours',
  walking: 'Easy walking',
  stops: '~5 stops',
  departure: station,
  discovery: omotesando,
  build: shinshoji,
  peak: pagoda,
  afterglow: kawatoyo,
  startArea: 'Narita, Chiba, Japan',
  startNote: START_NOTE,
  match: { moods: ['Cultural', 'Peaceful', 'Curious'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 4, effort: 'Easy' },
  why: [
    'Narita is the first or last place many people see in Japan, and most of them only see the airport. Just down the line is an old temple town with a great temple on the hill, a street of wooden shops, and a lot of very good eel. It’s a whole journey in the time you might spend waiting at a gate.',
  ],
  route: [station, omotesando, shinshoji, pagoda, kawatoyo],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Narita, the town behind the airport. Whatever you took from the day, it’s yours now.',
    summary: 'You started at JR Narita Station, walked the old Omotesando, passed through the great gate of Shinshoji, climbed to the Great Pagoda of Peace, and finished with grilled eel at Kawatoyo.',
  },
}
