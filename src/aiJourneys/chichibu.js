// Into the Chichibu Hills (Chichibu and Nagatoro, Saitama)

import stationPhoto from '../assets/journey/chichibu/station.jpg'
import hitsujiyamaPhoto from '../assets/journey/chichibu/hitsujiyama.jpg'
import chichibuShrinePhoto from '../assets/journey/chichibu/chichibu-shrine.jpg'
import festivalHallPhoto from '../assets/journey/chichibu/festival-hall.jpg'
import iwadatamiPhoto from '../assets/journey/chichibu/iwadatami.jpg'
import hodosanPhoto from '../assets/journey/chichibu/hodosan.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const station = {
  id: 'seibuChichibu',
  name: 'Seibu-Chichibu Station',
  photo: stationPhoto,
  photoAlt: 'Seibu-Chichibu Station, a low modern station building with a tall glass front, under a blue sky',
  memory: 'Where the day began.',
  mapPlace: 'Seibu-Chichibu Station',
  travelMode: 'transit',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Chichibu.' },
    { text: 'This valley town sits in the mountains of western Saitama, where the suburbs of Tokyo finally give way to hills and rivers. The day starts in town, and ends further down the valley, by the water.' },
    { className: 'narrationClose', text: 'The first stop is up on the hill above the station. Follow the map, and enjoy the climb.' },
  ],
}

const hitsujiyama = {
  id: 'hitsujiyama',
  name: 'Hitsujiyama Park',
  photo: hitsujiyamaPhoto,
  photoAlt: 'A hillside at Hitsujiyama Park covered in bands of pink, white and red flowers, with people walking between them',
  memory: 'Looking out over the valley from Hitsujiyama.',
  mapPlace: 'Hitsujiyama Park',
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'Hitsujiyama Park sits on a hill above the town, with a view across the whole valley to the mountains on the other side.' },
    { text: 'In spring, the hillside here turns pink, white and purple with moss phlox. At other times of year it’s quieter, and the view is just as good.' },
    { className: 'narrationClose', text: 'When you’re ready, head back down into town. The shrine is next.' },
  ],
}

const festivalHall = {
  id: 'chichibuMatsuriKaikan',
  name: 'Chichibu Matsuri Kaikan',
  photo: festivalHallPhoto,
  photoAlt: 'The Chichibu Matsuri Kaikan, a festival museum with a tall blue-grey glass wing, among green trees',
  memory: 'Up close with the festival floats.',
  teaser: 'A museum of the town’s great winter festival, with its floats up close. Right next to the shrine.',
  mapPlace: 'Chichibu Matsuri Kaikan',
  travelMode: 'walking',
  ...DETOUR,
  narration: [
    { text: 'Every winter, Chichibu holds a great night festival, when huge wooden floats covered in lanterns are hauled through the streets.' },
    { text: 'This museum lets you see the floats up close, and get a feel for the night, whatever the season.' },
    BACK_TO_ROUTE,
  ],
}

const chichibuShrine = {
  id: 'chichibuShrine',
  name: 'Chichibu Shrine',
  photo: chichibuShrinePhoto,
  photoAlt: 'The main hall of Chichibu Shrine, red with a sweeping roof, beside a weeping cherry tree in blossom',
  memory: 'Looking for the carvings at Chichibu Shrine.',
  mapPlace: 'Chichibu Shrine',
  travelMode: 'walking',
  ...BUILD,
  detours: [festivalHall],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'Chichibu Shrine is the heart of the town, and the home of its great winter festival.' },
    { text: 'Walk around the main hall and look closely at the carvings. See if you can find the dragon held in chains, and the owl.' },
    { text: 'Next door, there’s a museum of the festival, if you’d like a detour. Otherwise, it’s time to take the train down the valley.' },
  ],
}

const iwadatami = {
  id: 'iwadatami',
  name: 'Nagatoro Iwadatami',
  photo: iwadatamiPhoto,
  photoAlt: 'Wide, flat shelves of grey rock along the still Arakawa River at Nagatoro, with hills beyond',
  memory: 'On the rocks by the river at Nagatoro.',
  mapPlace: 'Iwadatami, Nagatoro',
  travelMode: 'transit',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'Take the Chichibu Railway down the valley to Nagatoro. A short walk from the station, the Arakawa River runs past wide, flat shelves of rock, layered like stone tatami mats. That’s what Iwadatami means.' },
    { text: 'Walk out across the rocks and find a spot near the water. Watch for boats coming down the river, and let the day slow right down.' },
    PEAK_CLOSE,
  ],
}

const hodosan = {
  id: 'hodosanShrine',
  name: 'Hodosan Shrine',
  photo: hodosanPhoto,
  photoAlt: 'The main hall of Hodosan Shrine, with brightly painted carvings under its dark roof, among tall trees',
  memory: 'The painted shrine at the foot of the mountain.',
  mapPlace: 'Hodosan Shrine',
  travelMode: 'walking',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. Hodosan Shrine stands at the foot of Mount Hodo, a walk up the road from Nagatoro Station.' },
    { text: 'Look closely at the main hall. It’s covered in carvings painted in bright colours, and they reward a slow look in the late light.' },
    DINNER,
  ],
}

export default {
  id: 'chichibu',
  aiMade: true,
  name: 'Into the Chichibu Hills',
  location: 'CHICHIBU · SAITAMA, JAPAN',
  photo: iwadatamiPhoto,
  photoAlt: iwadatami.photoAlt,
  blurb: 'From a hilltop park and the town shrine, down the valley by train to flat river rocks at Nagatoro.',
  tagline: TAGLINE,
  time: '~6 hours',
  walking: 'Easy walking',
  stops: '~5 stops',
  departure: station,
  discovery: hitsujiyama,
  build: chichibuShrine,
  peak: iwadatami,
  afterglow: hodosan,
  startArea: 'Chichibu, Saitama, Japan',
  startNote: START_NOTE,
  match: { moods: ['Peaceful', 'Adventurous', 'Cultural'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 6, effort: 'Easy' },
  why: [
    'Chichibu feels much further from Tokyo than it is: mountains all around, a slower pace, and a river running through the valley. This journey starts in town, with a view over everything, and then follows the valley down to the water, where the best place to be is sitting on a warm rock doing nothing at all.',
  ],
  route: [station, hitsujiyama, chichibuShrine, iwadatami, hodosan],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Chichibu, from the hilltop down to the river. Whatever you took from the day, it’s yours now.',
    summary: 'You started at Seibu-Chichibu Station, looked out over the valley from Hitsujiyama Park, found the carvings at Chichibu Shrine, sat by the river on the rocks at Nagatoro, and finished at the painted halls of Hodosan Shrine.',
  },
}
