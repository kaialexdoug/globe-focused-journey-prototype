// Into the Chichibu Hills (Chichibu and Nagatoro, Saitama), built the same
// way as the Waseda journey (testJourney.js). Every stop has its exact spot
// (`mapPoint`, from Wikipedia and OpenStreetMap), so it gets the live map,
// and the way to it from the stop before: how far (`distanceMeters`), how
// long (`travelMinutes`) and how hard (`effort`), worked out once, in
// November 2026. The walks are from Google's walking routes and the heights
// along them (Open-Meteo). Google has no train routes in Japan, so the ride
// down the valley is its length on the Chichibu Railway (Wikipedia), and its
// time is an estimate.
//
// The narration tells one story from stop to stop: a valley town in the
// mountains, two of its three great shrines, the winter night festival
// that's been held for over 300 years, and the river that carved the rocks
// at Nagatoro. The history was checked against published sources
// (Wikipedia, in English and Japanese) in November 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import stationPhoto from '../assets/journey/chichibu/station.jpg'
import hitsujiyamaPhoto from '../assets/journey/chichibu/hitsujiyama.jpg'
import chichibuShrinePhoto from '../assets/journey/chichibu/chichibu-shrine.jpg'
import festivalHallPhoto from '../assets/journey/chichibu/festival-hall.jpg'
import iwadatamiPhoto from '../assets/journey/chichibu/iwadatami.jpg'
import hodosanPhoto from '../assets/journey/chichibu/hodosan.jpg'

// The spots near the stops.
import ropewayPhoto from '../assets/journey/chichibu/hodosan-ropeway.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const station = {
  id: 'seibuChichibu',
  name: 'Seibu-Chichibu Station',
  photo: stationPhoto,
  photoAlt: 'Seibu-Chichibu Station, a low modern station building with a tall glass front, under a blue sky',
  memory: 'Where the day began.',
  mapPlace: 'Seibu-Chichibu Station',
  mapPoint: { lat: 35.990068, lng: 139.083111 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Chichibu.' },
    { kind: 'heading', text: 'The valley town' },
    { text: 'This valley town sits in the mountains of western Saitama, where the suburbs of Tokyo finally give way to hills and rivers. The day starts in town, and ends further down the valley, by the water.' },
    { kind: 'heading', text: 'Two great shrines' },
    { text: 'Chichibu is known for its three great shrines, and you’ll visit two of them today: the town’s own, home of a winter festival held for more than 300 years, and one at the foot of a mountain, with a legend about a dog and a fire.' },
    { kind: 'find', text: 'Look south from the station for the hill above the town. That’s where you’re going first.' },
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
  mapPoint: { lat: 35.98555556, lng: 139.08875 },
  travelMode: 'walking',
  distanceMeters: 1477,
  travelMinutes: 23,
  effort: { level: 'moderate', note: 'Uphill most of the way, onto the hill above town' },
  stayMinutes: [30, 45],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The hill of flowers' },
    { text: 'Hitsujiyama Park sits on a hill above the town. From early April to early May, its hillside turns pink, white and purple with moss phlox, planted in bands across the slope, and people come from all over to see it.' },
    { kind: 'heading', text: 'The view' },
    { text: 'At other times of year it’s quieter, and the view is just as good: across the whole valley to the mountains on the other side.' },
    { kind: 'find', text: 'Find Mount Buko across the valley, the big mountain with part of its face cut away by quarrying.' },
    { className: 'narrationClose', text: 'When you’re ready, head back down into town. The shrine is next.' },
  ],
}

const festivalHall = {
  id: 'chichibuMatsuriKaikan',
  name: 'Chichibu Matsuri Kaikan',
  mapName: 'Festival museum',
  photo: festivalHallPhoto,
  photoAlt: 'The Chichibu Matsuri Kaikan, a festival museum with a tall blue-grey glass wing, among green trees',
  memory: 'Up close with the festival floats.',
  teaser: 'A museum of the town’s great winter festival, with its floats up close. Right next to the shrine.',
  mapPlace: 'Chichibu Matsuri Kaikan',
  mapPoint: { lat: 35.99730556, lng: 139.08516667 },
  travelMode: 'walking',
  // From the shrine. It's on the way to Chichibu Station for the train, so
  // it adds no walking.
  distanceMeters: 220,
  travelMinutes: 3,
  extraMeters: 0,
  effort: { level: 'easy', note: 'Just across the road from the shrine' },
  stayMinutes: [30, 45],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'The floats up close' },
    { text: 'This museum is all about the night festival. Here you can see the great floats up close, and get a feel for the night, whatever the season.' },
    { kind: 'heading', text: 'One of the great three' },
    { text: 'It’s counted among Japan’s three great float festivals, along with Kyoto’s Gion Festival and the festivals of Takayama.' },
    { kind: 'find', text: 'Stand by a float and look up at how tall it is. Then imagine hauling it uphill on a winter night.' },
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
  mapPoint: { lat: 35.9975, lng: 139.08416667 },
  travelMode: 'walking',
  distanceMeters: 1767,
  travelMinutes: 25,
  effort: { level: 'easy', note: 'Downhill off the hill and through town' },
  stayMinutes: [20, 30],
  ...BUILD,
  detours: [festivalHall],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'The town’s shrine' },
    { text: 'Chichibu Shrine is the heart of the town. Its story is said to begin more than two thousand years ago, with the first governor of the Chichibu lands, and its main hall was rebuilt on the orders of Tokugawa Ieyasu.' },
    { kind: 'heading', text: 'The night festival' },
    { text: 'Every year on the 2nd and 3rd of December, the shrine holds the Chichibu Night Festival, when huge wooden floats hung with lanterns are hauled through the streets. It’s been going for more than 300 years, and it’s on UNESCO’s list of the world’s living heritage.' },
    { kind: 'find', text: 'Walk around the main hall and look closely at the carvings. See if you can find the dragon held in chains, and the owl.' },
    { className: 'narrationClose', text: 'Next door, there’s a museum of the festival, if you’d like a detour. Otherwise, it’s time to take the train down the valley.' },
  ],
}

const iwadatami = {
  id: 'iwadatami',
  name: 'Nagatoro Iwadatami',
  mapName: 'Iwadatami',
  photo: iwadatamiPhoto,
  photoAlt: 'Wide, flat shelves of grey rock along the still Arakawa River at Nagatoro, with hills beyond',
  memory: 'On the rocks by the river at Nagatoro.',
  mapPlace: 'Iwadatami, Nagatoro',
  mapPoint: { lat: 36.0946797, lng: 139.1157823 },
  travelMode: 'transit',
  // The Chichibu Railway from Chichibu to Nagatoro is 12.5 km. With the walk
  // to Chichibu Station (404 m) and from Nagatoro Station (397 m), which
  // aren't counted in the walking, it's about 45 minutes.
  distanceMeters: 12500,
  travelMinutes: 45,
  effort: { level: 'easy', note: 'A short walk to Chichibu Station, the train down the valley, then a short walk to the river' },
  stayMinutes: [45, 60],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'Stone tatami' },
    { text: 'You’ve come down the valley to Nagatoro. Here the Arakawa River runs past wide, flat shelves of rock, layered like stone tatami mats. That’s what Iwadatami means.' },
    { kind: 'heading', text: 'A protected valley' },
    { text: 'The Nagatoro gorge has been protected for its beauty, and as a natural monument, since 1924. Walk out across the rocks and find a spot near the water, and let the day slow right down.' },
    { kind: 'find', text: 'Watch for a boat coming down the river, and see it slip through between the rocks.' },
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
  mapPoint: { lat: 36.09322222, lng: 139.10309722 },
  travelMode: 'walking',
  distanceMeters: 1213,
  travelMinutes: 19,
  effort: { level: 'easy', note: 'A gentle climb up the road from the river' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Hodosan Ropeway',
      note: 'Up to the top of Mount Hodo, with gardens of plum and wintersweet near the summit',
      meters: 560,
      photo: ropewayPhoto,
      photoAlt: 'The station at the foot of the Hodosan Ropeway, a low building under the wooded hillside',
      mapPlace: '宝登山ロープウェイ 山麓駅',
      mapPoint: { lat: 36.091045, lng: 139.097462 },
    },
  ],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The dog and the fire' },
    { text: 'That’s the last stop. Hodosan Shrine stands at the foot of Mount Hodo. Legend says that Prince Yamato Takeru was climbing the mountain to pray when a giant dog appeared to guide him. A wildfire came at them, and the dog leapt into it and put it out. The mountain was named for the fire that stopped.' },
    { kind: 'heading', text: 'Painted carvings' },
    { text: 'Look closely at the main hall. It’s covered in carvings painted in bright colours, and they reward a slow look in the late light.' },
    { kind: 'find', text: 'Find the most colorful carving on the main hall, and see what story it tells.' },
    DINNER,
  ],
}

export default {
  id: 'chichibu',
  aiMade: true,
  name: 'Into the Chichibu Hills',
  location: 'CHICHIBU · SAITAMA, JAPAN',
  city: 'Chichibu',
  photo: iwadatamiPhoto,
  photoAlt: iwadatami.photoAlt,
  blurb: 'From a hilltop park down the valley, to flat river rocks at Nagatoro.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Nature', 'Scenic', 'Cultural', 'Hidden Gems'],
  departure: station,
  discovery: hitsujiyama,
  build: chichibuShrine,
  peak: iwadatami,
  afterglow: hodosan,
  startArea: 'Chichibu, Saitama, Japan',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Spring',
    seasonNote: 'For the moss phlox on Hitsujiyama, from early April to early May. The night festival, on December 2 and 3, is the other big day.',
    timeOfDay: 'Starting in the morning',
    timeNote: 'That leaves the afternoon for the train down the valley to Nagatoro.',
  },
  match: {
    moods: { Peaceful: 80, Adventurous: 65, Romantic: 50, Curious: 65, Playful: 45, Cultural: 70 },
    with: { Solo: 80, Couple: 75, Family: 75, 'Friends / Group': 75 },
    preferences: {
      'Pet friendly': 45, 'Avoid alcohol': 85, 'More nature': 90, 'Food stops': 40,
      Coastal: 5, 'More urban': 15, 'Hiking involved': 45, 'Budget friendly': 70,
    },
  },
  description: [
    'Chichibu is a valley town in the mountains of western Saitama, where Tokyo finally gives way to hills and rivers. Its great shrine holds a winter night festival that’s been going for more than 300 years, and further down the valley, the river has worn the rocks into flat shelves like tatami mats.',
    'This journey climbs to a hill of flowers above the town, visits the festival’s shrine, takes the little railway down the valley to the rocks at Nagatoro, and ends at a painted shrine with a legend about a dog and a fire.',
  ],
  route: [station, hitsujiyama, chichibuShrine, iwadatami, hodosan],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Chichibu, from the hilltop down to the river. Whatever you took from the day, it’s yours now.',
    summary: 'You started at Seibu-Chichibu Station, looked out over the valley from Hitsujiyama Park, found the carvings at Chichibu Shrine, sat by the river on the rocks at Nagatoro, and finished at the painted halls of Hodosan Shrine.',
  },
}
