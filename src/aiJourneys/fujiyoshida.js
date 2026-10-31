// In the Shadow of Fuji (Fujiyoshida, Yamanashi)

import stationPhoto from '../assets/journey/fujiyoshida/station.jpg'
import honchoDoriPhoto from '../assets/journey/fujiyoshida/honcho-dori.jpg'
import arakuraShrinePhoto from '../assets/journey/fujiyoshida/arakura-shrine.jpg'
import kitaguchiHonguPhoto from '../assets/journey/fujiyoshida/kitaguchi-hongu.jpg'
import chureitoPhoto from '../assets/journey/fujiyoshida/chureito.jpg'
import lakeKawaguchiPhoto from '../assets/journey/fujiyoshida/lake-kawaguchi.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const station = {
  id: 'shimoyoshida',
  name: 'Shimoyoshida Station',
  photo: stationPhoto,
  photoAlt: 'Shimoyoshida Station, a small cream-coloured station building with a red canopy, before green hills',
  memory: 'Where the day began.',
  mapPlace: 'Shimoyoshida Station',
  travelMode: 'transit',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Fujiyoshida.' },
    { text: 'This town sits right at the foot of Mount Fuji. On a clear day, the mountain fills the sky above the rooftops, and it follows you everywhere you go.' },
    { className: 'narrationClose', text: 'Head out from the station toward the old main street. The first stop is a short walk away.' },
  ],
}

const honchoDori = {
  id: 'honchoDori',
  name: 'Honcho-dori',
  photo: honchoDoriPhoto,
  photoAlt: 'Honcho-dori, a long straight street lined with old-fashioned lamps, with Mount Fuji half hidden in cloud at the far end',
  memory: 'Fuji at the end of the street.',
  mapPlace: 'Honcho-dori, Fujiyoshida',
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'Honcho-dori is the old main street, and it runs straight toward the mountain. Find the spot where Fuji sits right at the end of the road, framed by the shops on either side.' },
    { text: 'It’s a real street with real traffic, so take your photo from the pavement.' },
    { className: 'narrationClose', text: 'When you’re ready, head for the shrine at the foot of the hill.' },
  ],
}

const kitaguchiHongu = {
  id: 'kitaguchiHongu',
  name: 'Kitaguchi Hongu Fuji Sengen Shrine',
  photo: kitaguchiHonguPhoto,
  photoAlt: 'A huge red wooden torii at Kitaguchi Hongu Fuji Sengen Shrine, with the shrine hall beyond it among tall trees',
  memory: 'Where the pilgrims set out for Fuji.',
  teaser: 'The old starting point for pilgrims climbing Fuji, in a forest of giant cedars. A short ride across town.',
  mapPlace: 'Kitaguchi Hongu Fuji Sengen Jinja',
  travelMode: 'transit',
  ...DETOUR,
  narration: [
    { text: 'For centuries, pilgrims climbing Mount Fuji set out from here. The shrine stands in a forest of giant cedars, and its great wooden torii is one of the biggest you’ll see.' },
    { text: 'Walk the avenue of trees up to the halls, and imagine setting off from here for the summit.' },
    BACK_TO_ROUTE,
  ],
}

const arakuraShrine = {
  id: 'arakuraShrine',
  name: 'Arakura Fuji Sengen Shrine',
  photo: arakuraShrinePhoto,
  photoAlt: 'A red torii at the top of stone steps at Arakura Fuji Sengen Shrine, with stone lanterns and autumn leaves',
  memory: 'At the foot of the long stairs.',
  mapPlace: 'Arakura Fuji Sengen Shrine',
  travelMode: 'walking',
  ...BUILD,
  detours: [kitaguchiHongu],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'This is Arakura Fuji Sengen Shrine, at the foot of the hill. Behind it, a long flight of steps climbs up through the trees.' },
    { text: 'Stop at the shrine before you go up. It’s quieter down here, and the climb ahead is a good one.' },
    { text: 'Across town, there’s an older shrine where pilgrims once set out for Fuji, if you’d like a detour. Otherwise, start climbing.' },
  ],
}

const chureito = {
  id: 'chureito',
  name: 'Chureito Pagoda',
  photo: chureitoPhoto,
  photoAlt: 'The red five-storey Chureito Pagoda, with snow-capped Mount Fuji rising behind it',
  memory: 'The pagoda and the mountain.',
  mapPlace: 'Chureito Pagoda',
  travelMode: 'walking',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'You might recognise this one. Climb past the pagoda to the viewing deck above it, and there it is: the red pagoda, the town below, and Fuji rising behind them all.' },
    { text: 'If the mountain is hiding in cloud, wait a while. It has a way of coming out when you least expect it.' },
    PEAK_CLOSE,
  ],
}

const lakeKawaguchi = {
  id: 'lakeKawaguchi',
  name: 'Lake Kawaguchi',
  photo: lakeKawaguchiPhoto,
  photoAlt: 'Mount Fuji across the blue water of Lake Kawaguchi, with a bare tree and golden grass on the shore',
  memory: 'Fuji over the lake at the end of the day.',
  mapPlace: 'Lake Kawaguchi',
  travelMode: 'transit',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. Take the train on to Kawaguchiko, and walk down to the lake.' },
    { text: 'Find a spot on the north shore and look back across the water. On a still evening, Fuji is reflected right there in the lake.' },
    DINNER,
  ],
}

export default {
  id: 'fujiyoshida',
  aiMade: true,
  name: 'In the Shadow of Fuji',
  location: 'FUJIYOSHIDA · YAMANASHI, JAPAN',
  photo: chureitoPhoto,
  photoAlt: chureito.photoAlt,
  blurb: 'Through the town at the foot of Mount Fuji, up the long steps to the most famous view of the mountain, and on to the lake.',
  tagline: TAGLINE,
  time: '~6 hours',
  walking: 'Some climbing',
  stops: '~5 stops',
  departure: station,
  discovery: honchoDori,
  build: arakuraShrine,
  peak: chureito,
  afterglow: lakeKawaguchi,
  startArea: 'Fujiyoshida, Yamanashi, Japan',
  startNote: START_NOTE,
  match: { moods: ['Romantic', 'Peaceful', 'Adventurous'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 6, effort: 'Moderate' },
  why: [
    'In Fujiyoshida, Mount Fuji isn’t a distant view. It’s right there, at the end of the main street and over the rooftops. This journey walks you through the town at its foot, climbs to the pagoda that frames it best, and ends by the lake, where on a still evening you get the mountain twice.',
  ],
  route: [station, honchoDori, arakuraShrine, chureito, lakeKawaguchi],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Fujiyoshida, a whole day in the shadow of the mountain. Whatever you took from the day, it’s yours now.',
    summary: 'You started at Shimoyoshida Station, found Fuji at the end of Honcho-dori, stopped at Arakura Fuji Sengen Shrine, climbed to the Chureito Pagoda, and finished by Lake Kawaguchi.',
  },
}
