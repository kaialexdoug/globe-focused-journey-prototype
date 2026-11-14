// The River Town Under the Bluff (Red Wing, Minnesota), built the same way
// as the Waseda journey (testJourney.js). Every stop has its exact spot
// (`mapPoint`, from Wikipedia and OpenStreetMap), so it gets the live map,
// and the way to it from the stop before: how far (`distanceMeters`), how
// long (`travelMinutes`) and how hard (`effort`), from Google's walking and
// driving routes and the heights along them (Open-Meteo), worked out once,
// in November 2026. Google doesn't know the trails on Barn Bluff, so the
// walk up and down it adds the trail from OpenStreetMap: from the East 5th
// Street trailhead along the South Trail, up the Kiwanis stairs and across
// to the overlook above downtown, about 1,070 m each way.
//
// The narration tells one story from stop to stop: a wheat town on the
// river that went on to make things the world knows by its name, boots and
// stoneware, all under the bluff that explorers steered by and the town was
// partly built from. The history was checked against published sources
// (Wikipedia, the Red Wing Shoe Company and the Red Wing Collectors Society)
// in November 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import depotPhoto from '../assets/journey/red-wing/depot.jpg'
import shoeStorePhoto from '../assets/journey/red-wing/shoe-store.jpg'
import mainStreetPhoto from '../assets/journey/red-wing/main-street.jpg'
import potteryPlacePhoto from '../assets/journey/red-wing/pottery-place.jpg'
import barnBluffPhoto from '../assets/journey/red-wing/barn-bluff.jpg'
import riverfrontPhoto from '../assets/journey/red-wing/riverfront.jpg'

// The spots near the stops.
import stJamesPhoto from '../assets/journey/red-wing/st-james-hotel.jpg'
import sheldonPhoto from '../assets/journey/red-wing/sheldon-theatre.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const depot = {
  id: 'redWingDepot',
  name: 'Red Wing Depot',
  photo: depotPhoto,
  photoAlt: 'The Red Wing train depot, a long brick and stone station with a steep roof, in the evening sun',
  memory: 'Where the day began.',
  mapPlace: 'Red Wing Amtrak Station',
  mapPoint: { lat: 44.56638889, lng: -92.53722222 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Red Wing.' },
    { kind: 'heading', text: 'Wheat town' },
    { text: 'In the 1870s, Red Wing was one of the great wheat towns of America. In 1873 it led the whole country in wheat sold by farmers, and its warehouses on the river could hold more than a million bushels, waiting for the steamboats.' },
    { kind: 'heading', text: 'A depot and a park' },
    { text: 'This depot came later. Work on it began in 1904, after a deal with the town: Red Wing gave the railroad room for its tracks, and the railroad built the station and put money toward a park on the levee. You’ll finish the day in that park.' },
    { kind: 'find', text: 'Look east and find Barn Bluff, the great rock standing over the end of town. By the end of the day, you’ll be on top of it.' },
    { className: 'narrationClose', text: 'The first stop is a few minutes’ walk up, on Main Street.' },
  ],
}

const shoeStore = {
  id: 'redWingShoeStore',
  name: 'Red Wing Shoe Store',
  photo: shoeStorePhoto,
  photoAlt: 'Glass display cases of old work boots, posters and shoe boxes in the Red Wing Shoe museum',
  memory: 'Boots, and one very big boot.',
  mapPlace: 'Red Wing Shoe Store, 315 Main Street, Red Wing, MN',
  mapPoint: { lat: 44.5661976, lng: -92.5345982 },
  travelMode: 'walking',
  distanceMeters: 246,
  travelMinutes: 4,
  effort: { level: 'easy', note: 'A gentle walk up from the river to Main Street' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'St. James Hotel',
      note: 'Built with wheat money and opened with a grand ball on Thanksgiving Day, 1875. The shoe company has owned it since 1977',
      meters: 110,
      photo: stJamesPhoto,
      photoAlt: 'The St. James Hotel, a four-storey red brick building with white trim, on a corner of Main Street',
      mapPlace: 'St. James Hotel, Red Wing, MN',
      mapPoint: { lat: 44.56527778, lng: -92.53416667 },
    },
  ],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Boots with the town’s name' },
    { text: 'When the railroads came and the wheat trade moved on to the flour mills of Minneapolis, Red Wing kept on making things. Charles Beckman founded the Red Wing Shoe Company here in 1905, and its boots have carried the town’s name around the world ever since.' },
    { kind: 'heading', text: 'The giant boot' },
    { text: 'This is the company’s flagship store, with a museum of old boots and the stories behind them. For its hundredth birthday, in 2005, the company made a boot in size 638½, and it’s here too.' },
    { kind: 'find', text: 'Find the giant boot, and stand beside it to see how small your own feet are.' },
    { className: 'narrationClose', text: 'Across the corner, the St. James Hotel ties the two stories together: built with wheat money in 1875, and owned by the shoe company since 1977. Next, the heart of the old town.' },
  ],
}

const potteryPlace = {
  id: 'potteryPlace',
  name: 'Pottery Place',
  photo: potteryPlacePhoto,
  photoAlt: 'Pottery Place, a brick former factory building with its name over the entrance, under green trees',
  memory: 'At the old pottery works.',
  teaser: 'The old stoneware factory, now shops, with a pottery museum next door. A short drive across town.',
  mapPlace: 'Pottery Place, 2000 Old West Main Street, Red Wing, MN',
  mapPoint: { lat: 44.5642642, lng: -92.5598311 },
  travelMode: 'driving',
  // From Central Park. Driven, so the time it adds is there and back.
  distanceMeters: 2261,
  travelMinutes: 4,
  effort: { level: 'easy', note: 'A short drive across town on Main Street' },
  stayMinutes: [30, 45],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'Clay from the valley' },
    { text: 'Red Wing’s other famous name is stoneware. A German potter, John Paul, was making it near here by 1861, from the local clay, and from 1877 the Red Wing Stoneware Company was mass-producing crocks, jugs and pots for kitchens all over the country.' },
    { kind: 'heading', text: 'The old works' },
    { text: 'This building went up as a pottery factory in 1900, after a fire burned the old wooden one, and it became part of Red Wing Potteries. The works closed in 1967, during a strike. Now the factory is full of shops, and the pottery museum is right next door.' },
    { kind: 'find', text: 'In the museum, find the oldest-looking crock you can, and look for the maker’s mark stamped on its side.' },
    BACK_TO_ROUTE,
  ],
}

const mainStreet = {
  id: 'redWingMainStreet',
  name: 'Downtown Red Wing',
  mapName: 'Central Park',
  photo: mainStreetPhoto,
  photoAlt: 'A street of old brick buildings in downtown Red Wing at dusk, with lit shop windows under a sky of clouds',
  memory: 'Wandering downtown.',
  mapPlace: 'Central Park, Red Wing, MN',
  mapPoint: { lat: 44.5627077, lng: -92.5347187 },
  travelMode: 'walking',
  distanceMeters: 515,
  travelMinutes: 7,
  effort: { level: 'easy', note: 'Through downtown, a little up and down' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Sheldon Theatre',
      note: 'Built in 1904 with money left in T. B. Sheldon’s will, and said to be the first city-owned theater in the country',
      meters: 130,
      photo: sheldonPhoto,
      photoAlt: 'The Sheldon Theatre, a pale stone building with three tall arched windows over three red doors',
      mapPlace: 'Sheldon Theatre, Red Wing, MN',
      mapPoint: { lat: 44.56388889, lng: -92.535 },
    },
  ],
  ...BUILD,
  detours: [potteryPlace],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'Saved from the start' },
    { text: 'When Red Wing was laid out in 1853, these middle blocks were set aside for a courthouse, a school and a church. Hamline University, the first in Minnesota to hold classes, had its home here until 1869, and then the town made its block into Central Park.' },
    { kind: 'heading', text: 'A theater in a will' },
    { text: 'The town’s wealth built the streets around you. T. B. Sheldon made his money in grain, banks, railroads and stoneware, and when he died in 1900, his will left half his estate for something public in Red Wing. The result was the Sheldon Theatre, in 1904, said to be the first city-owned theater in the country.' },
    { kind: 'find', text: 'Some of this town was built with stone quarried from Barn Bluff. Find a building of pale stone, then find the bluff above the rooftops.' },
    { className: 'narrationClose', text: 'Across town, the old pottery works make a good detour, a short drive away. Otherwise, it’s time to climb.' },
  ],
}

const barnBluff = {
  id: 'barnBluff',
  name: 'Barn Bluff',
  photo: barnBluffPhoto,
  photoAlt: 'The view from the top of Barn Bluff over the rooftops of downtown Red Wing, with wooded hills beyond',
  memory: 'On top of Barn Bluff.',
  // The overlook at the west end of the bluff, above downtown.
  mapPlace: 'Barn Bluff, Red Wing, MN',
  mapPoint: { lat: 44.5694141, lng: -92.5316052 },
  travelMode: 'walking',
  // Through town to the East 5th Street trailhead (1,459 m, 20 minutes),
  // then up the trail and the stairs (about 1,070 m, 20 minutes).
  distanceMeters: 2533,
  travelMinutes: 40,
  effort: { level: 'hard', note: 'Through town to the trailhead, then a steep climb on trails and the long Kiwanis stairs' },
  stayMinutes: [60, 90],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The barn on the river' },
    { text: 'To the Dakota, this bluff is Ȟemníčhaŋ, a sacred place with many burial mounds. French explorers called it La Grange, the barn, for the way it stands alone above the river, and travelers on the Mississippi steered by it from miles away.' },
    { kind: 'heading', text: 'Worth the climb' },
    { text: 'The explorer Stephen Long climbed it in 1819 and wrote that few views in the world could match it. Henry David Thoreau came up in June 1861 to read his mail. For about forty years the bluff was quarried for stone, until the people of Red Wing protested and the quarrying stopped in 1908.' },
    { kind: 'find', text: 'Find the depot where you started, down by the river, and the park on the levee beside it, where you’ll finish.' },
    PEAK_CLOSE,
  ],
}

const riverfront = {
  id: 'redWingRiverfront',
  name: 'Levee Park',
  photo: riverfrontPhoto,
  photoAlt: 'The wide Mississippi at Red Wing under a big evening sky, with rocks along the shore and a bare tree',
  memory: 'Watching the Mississippi go by.',
  mapPlace: 'Levee Park, Red Wing, MN',
  mapPoint: { lat: 44.5671297, lng: -92.5371103 },
  travelMode: 'walking',
  // Back down the trail and the stairs (about 1,070 m), then through town
  // to the river (2,008 m, 27 minutes).
  distanceMeters: 3082,
  travelMinutes: 40,
  effort: { level: 'moderate', note: 'Back down the trail and the stairs, then through town to the river' },
  stayMinutes: [20, 45],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The park the railroad paid for' },
    { text: 'This is the park the railroad helped pay for when it built the depot. Long before that, this riverbank was Red Wing’s port, where the steamboats came in and the wheat went out.' },
    { kind: 'heading', text: 'Under the bluff' },
    { text: 'Look back along the river, and there’s Barn Bluff, standing over the town the way it did for the explorers and the steamboats. A little while ago, you were up there looking down at this spot.' },
    { kind: 'find', text: 'Watch the river for a towboat pushing a long line of barges. Then find the top of the bluff, and trace the way you came down.' },
    DINNER,
  ],
}

export default {
  id: 'redWing',
  aiMade: true,
  name: 'The River Town Under the Bluff',
  location: 'RED WING · MINNESOTA, USA',
  city: 'Red Wing',
  photo: depotPhoto,
  photoAlt: depot.photoAlt,
  photoPosition: '38% center',
  blurb: 'A river town famous for its boots, and the great bluff that towers over it.',
  walking: 'Some climbing',
  stops: '~5 stops',
  difficulty: 'Moderate',
  experiences: ['Hidden Gems', 'Historical', 'Adventure', 'Scenic'],
  departure: depot,
  discovery: shoeStore,
  build: mainStreet,
  peak: barnBluff,
  afterglow: riverfront,
  startArea: 'Red Wing, Minnesota, USA',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Fall',
    seasonNote: 'For the fall colors along the river valley, seen from the top of Barn Bluff, in early to mid-October.',
    timeOfDay: 'From late morning',
    timeNote: 'That leaves good light for the climb up Barn Bluff, and the evening by the river.',
  },
  match: {
    moods: { Peaceful: 55, Adventurous: 65, Romantic: 40, Curious: 90, Playful: 45, Cultural: 70 },
    with: { Solo: 85, Couple: 70, Family: 60, 'Friends / Group': 70 },
    preferences: {
      'Pet friendly': 50, 'Avoid alcohol': 80, 'More nature': 50, 'Food stops': 40,
      Coastal: 10, 'More urban': 35, 'Hiking involved': 70, 'Budget friendly': 85,
    },
  },
  description: [
    'Red Wing got rich on wheat in the steamboat days, then went on to make things the world knows by the town’s name: boots and stoneware. Over all of it stands Barn Bluff, a sacred place to the Dakota, a landmark for explorers, and the quarry that helped build the town.',
    'This journey walks from the old depot up through the town, past the giant boot and the streets the wheat money built, then climbs the bluff to see it all at once, and comes back down to the river.',
  ],
  route: [depot, shoeStore, mainStreet, barnBluff, riverfront],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Red Wing, from the depot to the top of the bluff and back to the river. Whatever you took from the day, it’s yours now.',
    summary: 'You started at the old depot, found the giant boot at the Red Wing Shoe Store, wandered downtown, climbed Barn Bluff for the view, and finished by the Mississippi.',
  },
}
