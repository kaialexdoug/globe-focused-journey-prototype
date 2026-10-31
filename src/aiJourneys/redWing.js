// The River Town Under the Bluff (Red Wing, Minnesota)

import depotPhoto from '../assets/journey/red-wing/depot.jpg'
import shoeStorePhoto from '../assets/journey/red-wing/shoe-store.jpg'
import mainStreetPhoto from '../assets/journey/red-wing/main-street.jpg'
import potteryPlacePhoto from '../assets/journey/red-wing/pottery-place.jpg'
import barnBluffPhoto from '../assets/journey/red-wing/barn-bluff.jpg'
import riverfrontPhoto from '../assets/journey/red-wing/riverfront.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const depot = {
  id: 'redWingDepot',
  name: 'Red Wing Depot',
  photo: depotPhoto,
  photoAlt: 'The Red Wing train depot, a long brick and stone station with a steep roof, in the evening sun',
  memory: 'Where the day began.',
  mapPlace: 'Red Wing Amtrak Station',
  travelMode: 'driving',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Red Wing.' },
    { text: 'This river town on the Mississippi is known around the world for two things it makes: boots and pottery. It sits right under a great bluff, and by the end of the day, you’ll be on top of it.' },
    { className: 'narrationClose', text: 'Start by the old depot, then walk up into town. The first stop is a few blocks away.' },
  ],
}

const shoeStore = {
  id: 'redWingShoeStore',
  name: 'Red Wing Shoe Store',
  photo: shoeStorePhoto,
  photoAlt: 'Glass display cases of old work boots, posters and shoe boxes in the Red Wing Shoe museum',
  memory: 'Boots, and one very big boot.',
  mapPlace: 'Red Wing Shoe Store, Main Street, Red Wing, MN',
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'Red Wing boots have been made in this town for generations, and the store on Main Street is part shop, part museum.' },
    { text: 'Have a look at the old boots and the stories behind them. And go and find the giant boot. You won’t miss it.' },
    { className: 'narrationClose', text: 'Back outside, the rest of downtown is waiting.' },
  ],
}

const potteryPlace = {
  id: 'potteryPlace',
  name: 'Pottery Place',
  photo: potteryPlacePhoto,
  photoAlt: 'Pottery Place, a brick former factory building with its name over the entrance, under green trees',
  memory: 'At the old pottery works.',
  teaser: 'The old stoneware factory, now shops and a pottery museum. A short drive across town.',
  mapPlace: 'Pottery Place, Red Wing, MN',
  travelMode: 'driving',
  ...DETOUR,
  narration: [
    { text: 'This was where Red Wing’s famous stoneware was made: crocks, jugs and pots that ended up in kitchens all over the country.' },
    { text: 'The old factory now holds shops and a pottery museum. Look closely at the old pieces, and you’ll see why people collect them.' },
    BACK_TO_ROUTE,
  ],
}

const mainStreet = {
  id: 'redWingMainStreet',
  name: 'Downtown Red Wing',
  photo: mainStreetPhoto,
  photoAlt: 'A street of old brick buildings in downtown Red Wing at dusk, with lit shop windows under a sky of clouds',
  memory: 'Wandering downtown.',
  mapPlace: 'Downtown Red Wing, MN',
  travelMode: 'walking',
  ...BUILD,
  detours: [potteryPlace],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'Downtown Red Wing is full of handsome old brick buildings from the town’s busy river days.' },
    { text: 'Wander the streets, look up at the old fronts and cornices, and keep an eye on the bluff rising at the end of town. That’s where we’re going.' },
    { text: 'Across town, the old pottery works make a good detour. Otherwise, it’s time to climb.' },
  ],
}

const barnBluff = {
  id: 'barnBluff',
  name: 'Barn Bluff',
  photo: barnBluffPhoto,
  photoAlt: 'The view from the top of Barn Bluff over the rooftops of downtown Red Wing, with wooded hills beyond',
  memory: 'On top of Barn Bluff.',
  mapPlace: 'Barn Bluff, Red Wing, MN',
  travelMode: 'walking',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'Barn Bluff rises straight up from the edge of downtown. The trail to the top is steep in places, so take it slowly.' },
    { text: 'At the top, the whole town lies below you, with the Mississippi curving away past it. Even Henry David Thoreau climbed up here for the view.' },
    PEAK_CLOSE,
  ],
}

const riverfront = {
  id: 'redWingRiverfront',
  name: 'The Riverfront',
  photo: riverfrontPhoto,
  photoAlt: 'The wide Mississippi at Red Wing under a big evening sky, with rocks along the shore and a bare tree',
  memory: 'Watching the Mississippi go by.',
  mapPlace: 'Levee Park, Red Wing, MN',
  travelMode: 'walking',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. Come back down to the river you were looking at from the top.' },
    { text: 'Find a spot by the water and watch the Mississippi go by. If you’re lucky, a long line of barges will slide past.' },
    DINNER,
  ],
}

export default {
  id: 'redWing',
  aiMade: true,
  name: 'The River Town Under the Bluff',
  location: 'RED WING · MINNESOTA, USA',
  photo: depotPhoto,
  photoAlt: depot.photoAlt,
  blurb: 'Through a Mississippi river town famous for its boots, up the bluff that towers over it, and back down to the water.',
  tagline: TAGLINE,
  time: '~5 hours',
  walking: 'Some climbing',
  stops: '~5 stops',
  departure: depot,
  discovery: shoeStore,
  build: mainStreet,
  peak: barnBluff,
  afterglow: riverfront,
  startArea: 'Red Wing, Minnesota, USA',
  startNote: START_NOTE,
  match: { moods: ['Curious', 'Adventurous', 'Peaceful'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 5, effort: 'Moderate' },
  why: [
    'Red Wing is a river town with a lot to be proud of: boots and pottery known all over the world, streets of old brick buildings, and a great bluff standing right over the middle of it. This journey takes you through the town first, then up the bluff to see it all at once, and back down to the river.',
  ],
  route: [depot, shoeStore, mainStreet, barnBluff, riverfront],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Red Wing, from the depot to the top of the bluff and back to the river. Whatever you took from the day, it’s yours now.',
    summary: 'You started at the old depot, found the giant boot at the Red Wing Shoe Store, wandered downtown, climbed Barn Bluff for the view, and finished by the Mississippi.',
  },
}
