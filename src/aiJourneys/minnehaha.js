// The Falls in the City (Minnehaha Park, Minneapolis, Minnesota)

import parkPhoto from '../assets/journey/minnehaha/park.jpg'
import depotPhoto from '../assets/journey/minnehaha/depot.jpg'
import longfellowHousePhoto from '../assets/journey/minnehaha/longfellow-house.jpg'
import statuePhoto from '../assets/journey/minnehaha/statue.jpg'
import fallsPhoto from '../assets/journey/minnehaha/falls.jpg'
import glenPhoto from '../assets/journey/minnehaha/glen.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const park = {
  id: 'minnehahaPark',
  name: 'Minnehaha Park',
  photo: parkPhoto,
  photoAlt: 'The words Minnehaha Park on the white wall of a park building, with autumn leaves on the path',
  memory: 'Where the day began.',
  mapPlace: '50th Street/Minnehaha Park Station',
  travelMode: 'transit',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re at Minnehaha Park.' },
    { text: 'This is one of the best-loved parks in Minneapolis, and it’s built around a waterfall. The falls became famous through a poem, Longfellow’s The Song of Hiawatha, though Longfellow himself never came to see them.' },
    { className: 'narrationClose', text: 'Before the falls, a little detour into the park’s past. The first stop is just by the station.' },
  ],
}

const depot = {
  id: 'minnehahaDepot',
  name: 'Minnehaha Depot',
  photo: depotPhoto,
  photoAlt: 'The historical marker for the Minnehaha Depot, telling the story of the little station called “the Princess”',
  memory: 'The little station called the Princess.',
  mapPlace: 'Minnehaha Depot',
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'This little wooden station was nicknamed “the Princess” for its fancy trim. Crowds of picnickers and sightseers used to arrive here by train to see the falls.' },
    { text: 'Read the marker, look at the gingerbread details along the roof, and imagine the platform full of people in their Sunday best.' },
    { className: 'narrationClose', text: 'Next, a house with a story of its own.' },
  ],
}

const statue = {
  id: 'hiawathaStatue',
  name: 'Hiawatha and Minnehaha',
  photo: statuePhoto,
  photoAlt: 'A bronze statue of Hiawatha carrying Minnehaha, beside the creek among red and gold autumn trees',
  memory: 'The statue by the creek.',
  teaser: 'A statue of the poem’s two lovers, by the creek just above the falls. A short walk upstream.',
  mapPlace: 'Hiawatha and Minnehaha Statue, Minneapolis',
  travelMode: 'walking',
  ...DETOUR,
  narration: [
    { text: 'In Longfellow’s poem, Hiawatha carries Minnehaha across a stream. Here they are, in bronze, by the creek.' },
    { text: 'It’s a quiet spot, a little away from the crowds at the falls. Sit by the water for a moment.' },
    BACK_TO_ROUTE,
  ],
}

const longfellowHouse = {
  id: 'longfellowHouse',
  name: 'Longfellow House',
  photo: longfellowHousePhoto,
  photoAlt: 'The Longfellow House, a yellow two-storey house with a white picket fence and tall evergreens either side',
  memory: 'A copy of the poet’s house.',
  mapPlace: 'Longfellow House, Minnehaha Park, Minneapolis',
  travelMode: 'walking',
  ...BUILD,
  detours: [statue],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'This yellow house is a smaller copy of Longfellow’s own home in Massachusetts, built here long ago by an admirer of the poem.' },
    { text: 'It’s a strange, sweet thing to find in a city park: a tribute to a poet who made this place famous without ever seeing it.' },
    { text: 'Up the creek, there’s a statue from the poem, if you’d like a detour. Otherwise, follow the sound of the water.' },
  ],
}

const falls = {
  id: 'minnehahaFalls',
  name: 'Minnehaha Falls',
  photo: fallsPhoto,
  photoAlt: 'Minnehaha Falls pouring over a limestone ledge into a green glen, with people on the path beside it',
  memory: 'At the foot of the falls.',
  mapPlace: 'Minnehaha Falls',
  travelMode: 'walking',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'Here, Minnehaha Creek pours over a limestone ledge and drops into the glen below.' },
    { text: 'Look at it from the top first. Then take the stairs down to the bottom, stand in the cool air, and look up.' },
    PEAK_CLOSE,
  ],
}

const glen = {
  id: 'minnehahaGlen',
  name: 'Minnehaha Glen',
  photo: glenPhoto,
  photoAlt: 'Minnehaha Creek running through a wooded glen under an old stone bridge, among autumn trees',
  memory: 'Down the glen toward the river.',
  mapPlace: 'Minnehaha Regional Park, Minneapolis',
  travelMode: 'walking',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. Follow the creek downstream from the falls, into the glen.' },
    { text: 'The path winds along the water under old stone bridges, on its way to the Mississippi. Walk as far as you like, and let the sound of the falls fade behind you.' },
    DINNER,
  ],
}

export default {
  id: 'minnehaha',
  aiMade: true,
  name: 'The Falls in the City',
  location: 'MINNEHAHA FALLS · MINNEAPOLIS, USA',
  photo: fallsPhoto,
  photoAlt: falls.photoAlt,
  blurb: 'A waterfall in the middle of the city, a poem that made it famous, and a quiet walk down the glen toward the Mississippi.',
  tagline: TAGLINE,
  time: '~3 hours',
  walking: 'Easy walking',
  stops: '~5 stops',
  departure: park,
  discovery: depot,
  build: longfellowHouse,
  peak: falls,
  afterglow: glen,
  startArea: 'Minneapolis, Minnesota, USA',
  startNote: START_NOTE,
  match: { moods: ['Peaceful', 'Playful', 'Romantic'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 3, effort: 'Easy' },
  why: [
    'It’s not every city that has a waterfall in it. Minnehaha Falls is a short train ride from downtown Minneapolis, and it comes with a story: a famous poem, a poet who never visited, and a park full of the traces it left behind. This is a short journey, easy enough for a whole family, with the falls right at its heart.',
  ],
  route: [park, depot, longfellowHouse, falls, glen],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Minnehaha, a waterfall and a poem in the middle of the city. Whatever you took from the day, it’s yours now.',
    summary: 'You started at Minnehaha Park, found the little depot called the Princess, visited the Longfellow House, stood at the foot of Minnehaha Falls, and finished walking down the glen.',
  },
}
