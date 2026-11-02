// Cliffs Over the St. Croix (Taylors Falls, Minnesota)

import angelHillPhoto from '../assets/journey/taylors-falls/angel-hill.jpg'
import benchStreetPhoto from '../assets/journey/taylors-falls/bench-street.jpg'
import potholesPhoto from '../assets/journey/taylors-falls/potholes.jpg'
import riverboatPhoto from '../assets/journey/taylors-falls/riverboat.jpg'
import dallesPhoto from '../assets/journey/taylors-falls/dalles.jpg'
import franconiaPhoto from '../assets/journey/taylors-falls/franconia.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const angelHill = {
  id: 'angelHill',
  name: 'Angel Hill',
  photo: angelHillPhoto,
  photoAlt: 'A white wooden church with a square bell tower and a picket fence on Angel Hill, under a blue sky',
  memory: 'Where the day began.',
  mapPlace: 'Angel Hill, Taylors Falls, MN',
  travelMode: 'driving',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Taylors Falls.' },
    { text: 'This little town sits on the St. Croix River, right on the border with Wisconsin. Up here on Angel Hill, the white wooden houses and church look like a village in New England.' },
    { className: 'narrationClose', text: 'Have a slow look around, then head down the hill into town.' },
  ],
}

const benchStreet = {
  id: 'benchStreet',
  name: 'Bench Street',
  photo: benchStreetPhoto,
  photoAlt: 'The main street of Taylors Falls in autumn, with shops along one side and a wooded bluff behind',
  memory: 'Down the main street.',
  mapPlace: 'Bench Street, Taylors Falls, MN',
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'The town’s main street runs along the foot of the bluff, down toward the river.' },
    { text: 'It’s a short street, so take your time. Look in a shop or two, and get something to eat for later.' },
    { className: 'narrationClose', text: 'At the bottom of the street is the river, and the park that makes this place famous.' },
  ],
}

const riverboat = {
  id: 'stCroixRiverboat',
  name: 'A Boat on the St. Croix',
  photo: riverboatPhoto,
  photoAlt: 'A white riverboat on the dark St. Croix River, between wooded banks under a sky of white clouds',
  memory: 'Out on the river.',
  teaser: 'A boat ride up the river through the cliffs, if the boats are running. Right by the park.',
  mapPlace: 'Taylors Falls Scenic Boat Tour',
  travelMode: 'walking',
  ...DETOUR,
  narration: [
    { text: 'If the boats are running, take a ride. From the water, you see the cliffs the way the river sees them, rising straight up on either side.' },
    { text: 'Sit back and watch the rock go by. It’s a different river from down here.' },
    BACK_TO_ROUTE,
  ],
}

const potholes = {
  id: 'glacialPotholes',
  name: 'Glacial Potholes',
  photo: potholesPhoto,
  photoAlt: 'A deep, smooth, round hole worn into dark rock, with ferns growing around its rim',
  memory: 'Peering into the potholes.',
  mapPlace: 'Interstate State Park, Taylors Falls, MN',
  travelMode: 'walking',
  ...BUILD,
  detours: [riverboat],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'In Interstate State Park, the rock is full of deep, round holes. They were drilled out at the end of the last ice age, by rushing meltwater spinning stones around and around.' },
    { text: 'Follow the trail between them and peer down inside. Some are big enough to stand in.' },
    { text: 'There’s a boat ride on the river, if you’d like a detour. Otherwise, the cliffs are next.' },
  ],
}

const dalles = {
  id: 'dallesOfTheStCroix',
  name: 'The Dalles of the St. Croix',
  photo: dallesPhoto,
  photoAlt: 'Looking down from the cliffs at the St. Croix River winding through a rocky gorge, among autumn trees',
  memory: 'High above the river.',
  mapPlace: 'Dalles of the St. Croix, Interstate State Park',
  travelMode: 'walking',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'Here, the St. Croix squeezes between sheer cliffs of dark volcanic rock. These are the Dalles, and they’re why people come.' },
    { text: 'Follow the trail along the top and look down at the river rushing through. You might spot climbers on the rock. Watch your step near the edges.' },
    PEAK_CLOSE,
  ],
}

const franconia = {
  id: 'franconia',
  name: 'Franconia Sculpture Park',
  photo: franconiaPhoto,
  photoAlt: 'A road sign in a meadow at Franconia Sculpture Park that reads “I saw that worrying came to nothing”',
  memory: 'Wandering among the sculptures.',
  mapPlace: 'Franconia Sculpture Park',
  travelMode: 'driving',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. A short drive from the river, Franconia is a big open meadow full of sculptures, some huge, some strange, some funny.' },
    { text: 'Wander among them as the light gets low. Some of the signs dotted around aren’t giving directions at all. Stop and read them.' },
    DINNER,
  ],
}

export default {
  id: 'taylorsFalls',
  aiMade: true,
  name: 'Cliffs Over the St. Croix',
  location: 'TAYLORS FALLS · MINNESOTA, USA',
  photo: dallesPhoto,
  photoAlt: dalles.photoAlt,
  blurb: 'From a little river town to holes drilled by the ice age and cliffs over the St. Croix, ending in a meadow of sculptures.',
  tagline: TAGLINE,
  time: '~5 hours',
  walking: 'Walk + drive',
  stops: '~5 stops',
  departure: angelHill,
  discovery: benchStreet,
  build: potholes,
  peak: dalles,
  afterglow: franconia,
  startArea: 'Taylors Falls, Minnesota, USA',
  startNote: START_NOTE,
  match: { moods: ['Adventurous', 'Curious', 'Playful'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 5, effort: 'Easy' },
  why: [
    'Taylors Falls is small, but the river beside it has carved out something huge: a gorge of dark cliffs, and rock full of holes left by the ice age. This journey starts in the quiet old town, takes you down to the river and up onto the cliffs, and ends somewhere completely different, in a meadow full of art.',
  ],
  route: [angelHill, benchStreet, potholes, dalles, franconia],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Taylors Falls, from the old town to the cliffs and out into the fields. Whatever you took from the day, it’s yours now.',
    summary: 'You started on Angel Hill, walked down Bench Street, peered into the glacial potholes, looked down over the Dalles of the St. Croix, and finished among the sculptures at Franconia.',
  },
}
