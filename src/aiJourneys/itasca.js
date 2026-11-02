// Where the Mississippi Begins (Itasca State Park, Minnesota)

import douglasLodgePhoto from '../assets/journey/itasca/douglas-lodge.jpg'
import preachersGrovePhoto from '../assets/journey/itasca/preachers-grove.jpg'
import headwatersCenterPhoto from '../assets/journey/itasca/headwaters-center.jpg'
import fireTowerPhoto from '../assets/journey/itasca/fire-tower.jpg'
import headwatersPhoto from '../assets/journey/itasca/headwaters.jpg'
import lakeItascaPhoto from '../assets/journey/itasca/lake-itasca.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const douglasLodge = {
  id: 'douglasLodge',
  name: 'Douglas Lodge',
  photo: douglasLodgePhoto,
  photoAlt: 'Douglas Lodge, a long log building among tall pines, with a wooden sign on the lawn in front',
  memory: 'Where the day began.',
  mapPlace: 'Douglas Lodge, Itasca State Park',
  travelMode: 'driving',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Itasca State Park.' },
    { text: 'This is Minnesota’s oldest state park, deep in the pine forests of the north, and somewhere in it, the Mississippi River begins. Douglas Lodge is an old log lodge on the shore of Lake Itasca, and a good place to start.' },
    { className: 'narrationClose', text: 'The first stop is a short walk away, along the lake.' },
  ],
}

const preachersGrove = {
  id: 'preachersGrove',
  name: 'Preacher’s Grove',
  photo: preachersGrovePhoto,
  photoAlt: 'Tall, straight red pine trunks rising from a grassy slope in Preacher’s Grove',
  memory: 'Among the old pines.',
  mapPlace: 'Preacher’s Grove, Itasca State Park',
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'Preacher’s Grove is a stand of tall old red pines on the lakeshore. Some of them have been growing here for centuries.' },
    { text: 'Walk in among them and look straight up. It’s quiet in here, apart from the wind in the tops of the trees.' },
    { className: 'narrationClose', text: 'Back to the car now. We’re heading for the north end of the lake.' },
  ],
}

const fireTower = {
  id: 'aitonHeights',
  name: 'Aiton Heights Fire Tower',
  photo: fireTowerPhoto,
  photoAlt: 'Aiton Heights Fire Tower, a tall steel lookout tower with zigzag stairs, rising above green treetops',
  memory: 'Up above the forest.',
  teaser: 'An old fire lookout tower on a ridge, with the forest spread out below. A drive and a short walk from the lake.',
  mapPlace: 'Aiton Heights Fire Tower',
  travelMode: 'driving',
  ...DETOUR,
  narration: [
    { text: 'From this tower, lookouts once watched for smoke over the forest. Now anyone can climb it.' },
    { text: 'Go as high as you’re comfortable. From the top, the forest and the lakes stretch out in every direction. If heights aren’t for you, the ridge at the bottom is lovely too.' },
    BACK_TO_ROUTE,
  ],
}

const headwatersCenter = {
  id: 'headwatersCenter',
  name: 'Mary Gibbs Headwaters Center',
  photo: headwatersCenterPhoto,
  photoAlt: 'The entrance to the Mary Gibbs Mississippi Headwaters Center, with a wooden sign and a timber gateway',
  memory: 'Getting close to the river’s start.',
  mapPlace: 'Mary Gibbs Mississippi Headwaters Center',
  travelMode: 'driving',
  ...BUILD,
  detours: [fireTower],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'The visitor center at the north end of the lake is named after Mary Gibbs, who stood up to loggers to protect this forest.' },
    { text: 'Have a look inside, and get the story of the river before you see it. The place where it starts is only a short walk away.' },
    { text: 'Out in the forest, there’s an old fire tower you can climb, if you’d like a detour. Otherwise, the river is waiting.' },
  ],
}

const headwaters = {
  id: 'mississippiHeadwaters',
  name: 'Mississippi Headwaters',
  photo: headwatersPhoto,
  photoAlt: 'A line of stepping stones across the shallow stream flowing out of Lake Itasca, with forest beyond',
  memory: 'Crossing the Mississippi on foot.',
  mapPlace: 'Mississippi Headwaters, Itasca State Park',
  travelMode: 'walking',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'Here, a small stream flows out of Lake Itasca over a line of rocks. This is the Mississippi, right at its start. From here, it runs all the way to the Gulf of Mexico.' },
    { text: 'Walk across it on the stepping stones, or take off your shoes and wade. It isn’t every day you can cross the Mississippi in a few steps.' },
    PEAK_CLOSE,
  ],
}

const lakeItasca = {
  id: 'lakeItasca',
  name: 'Lake Itasca',
  photo: lakeItascaPhoto,
  photoAlt: 'Wooden docks reaching out into the calm water of Lake Itasca under a grey evening sky',
  memory: 'Evening on the lake.',
  mapPlace: 'Lake Itasca',
  travelMode: 'driving',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. Head back down the lake, and find a dock or a quiet bit of shore.' },
    { text: 'Watch the evening come in over the water. Listen for loons. And think about how far that little stream has to go.' },
    DINNER,
  ],
}

export default {
  id: 'itasca',
  aiMade: true,
  name: 'Where the Mississippi Begins',
  location: 'ITASCA STATE PARK · MINNESOTA, USA',
  // The headwaters photo is wide, and the card crops the stones out.
  photo: preachersGrovePhoto,
  photoAlt: preachersGrove.photoAlt,
  blurb: 'Through old pine forest to the spot where the Mississippi begins, small enough to cross on stepping stones.',
  tagline: TAGLINE,
  time: '~6 hours',
  walking: 'Walk + drive',
  stops: '~5 stops',
  departure: douglasLodge,
  discovery: preachersGrove,
  build: headwatersCenter,
  peak: headwaters,
  afterglow: lakeItasca,
  startArea: 'Itasca State Park, Minnesota, USA',
  startNote: START_NOTE,
  match: { moods: ['Peaceful', 'Adventurous', 'Curious'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 6, effort: 'Easy' },
  why: [
    'One of the biggest rivers in the world starts here as a stream you can step across. This journey takes you through the pine forest that surrounds it, past trees that have stood for centuries, to the spot where it all begins, and ends the day quietly on the lake it flows from.',
  ],
  route: [douglasLodge, preachersGrove, headwatersCenter, headwaters, lakeItasca],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Itasca, and the very start of the Mississippi. Whatever you took from the day, it’s yours now.',
    summary: 'You started at Douglas Lodge, walked among the old pines of Preacher’s Grove, got the river’s story at the Headwaters Center, crossed the Mississippi on stepping stones, and finished by Lake Itasca.',
  },
}
