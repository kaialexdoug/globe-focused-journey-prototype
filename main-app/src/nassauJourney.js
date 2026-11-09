// Forward, Upward, Onward: downtown Nassau (The Bahamas), built the same way
// as the Waseda journey (testJourney.js). Every stop has its exact spot
// (`mapPoint`, from OpenStreetMap and Wikipedia), so it gets the live map,
// and the walk to it from the stop before: how far (`distanceMeters`), how
// long (`travelMinutes`) and how hard (`effort`), from Google's walking
// routes, with the climbs from the heights along them (from Open-Meteo),
// worked out once, in November 2026. It's the longest of these walks, with
// one real climb, up the Queen's Staircase, so it's marked Moderate.
//
// The narration tells one story from stop to stop: the pirates, the motto
// the colony was given when they were thrown out, the forts and the people
// made to build them, and the new motto the country chose for itself in
// 1973, which the last stop pays off. The history was checked against
// published sources (Wikipedia, the Bahamas tourism board, and others) in
// November 2026. Stories that are only legends say so.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates. To take it out, remove it from
// ALL_JOURNEYS in journeyStops.js.

import parliamentPhoto from './assets/journey/nassau/parliament-square.jpg'
import staircasePhoto from './assets/journey/nassau/queens-staircase.jpg'
import governmentHousePhoto from './assets/journey/nassau/government-house.jpg'
import watlingsPhoto from './assets/journey/nassau/watlings.jpg'
import fortCharlottePhoto from './assets/journey/nassau/fort-charlotte.jpg'
import fishFryPhoto from './assets/journey/nassau/fish-fry.jpg'
import strawMarketPhoto from './assets/journey/nassau/straw-market.jpg'
import fortFincastlePhoto from './assets/journey/nassau/fort-fincastle.jpg'
import graycliffPhoto from './assets/journey/nassau/graycliff.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE,
} from './aiJourneys/parts.js'

const parliamentSquare = {
  id: 'parliamentSquare',
  name: 'Parliament Square',
  photo: parliamentPhoto,
  photoAlt: 'The pink Senate building on Parliament Square in Nassau, with a white statue of Queen Victoria in front',
  memory: 'Where the pirates’ story began.',
  mapPlace: 'Parliament Square, Nassau',
  mapPoint: { lat: 25.0778403, lng: -77.3404736 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [10, 15],
  nearby: [
    {
      name: 'Nassau Straw Market',
      note: 'Handwoven straw work and crafts, a Bahamian tradition, on Bay Street by the harbour',
      meters: 311,
      photo: strawMarketPhoto,
      photoAlt: 'The bright orange, green and yellow front of the Straw Market in Nassau',
      mapPlace: 'Straw Market, Bay Street, Nassau, Bahamas',
      mapPoint: { lat: 25.0785926, lng: -77.343368 },
    },
  ],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Parliament Square.' },
    { kind: 'heading', text: 'A republic of pirates' },
    { text: 'Three hundred years ago, Nassau was the pirate capital of the Caribbean. Blackbeard, Calico Jack and Anne Bonny all sailed from the harbour just behind you. Then in 1718 a new governor, Woodes Rogers, arrived, offered the pirates a pardon, and hanged the ones who wouldn’t take it. The colony’s motto became “Expulsis piratis, restituta commercia”: pirates expelled, commerce restored.' },
    { kind: 'heading', text: 'Pink for a parliament' },
    { text: 'These pink buildings went up in 1815, built by Loyalists who had left the new United States. The Bahamas has been governed from here ever since, and when it became independent in 1973, it left the pirates’ motto behind for a new one. Hold on to that: you’ll hear it at the end.' },
    { kind: 'find', text: 'Find Queen Victoria, seated on her throne in white stone in the middle of the square. She’s been there since 1905.' },
    { className: 'narrationClose', text: 'Now for the climb. The Queen’s Staircase is about fifteen minutes away, and at the top of it is a fort.' },
  ],
}

const queensStaircase = {
  id: 'queensStaircase',
  name: 'The Queen’s Staircase',
  mapName: 'Queen’s Staircase',
  photo: staircasePhoto,
  photoAlt: 'The Queen’s Staircase in Nassau, a long flight of steps climbing between high walls of cut limestone',
  memory: 'Up the steps cut from the rock.',
  mapPlace: 'Queen’s Staircase, Nassau',
  mapPoint: { lat: 25.0732, lng: -77.33755 },
  travelMode: 'walking',
  distanceMeters: 1026,
  travelMinutes: 16,
  // How hard the walk here is: 'easy', 'moderate' or 'hard', and what it's like.
  effort: { level: 'moderate', note: 'Flat at first, then uphill: the staircase itself climbs about 30 metres' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Fort Fincastle',
      note: 'Lord Dunmore’s little fort at the top of the steps, built in the shape of a paddle steamer, with views over the harbour',
      // Straight up the steps. (Google's walking route goes round by the
      // road, about 500 m.)
      meters: 100,
      photo: fortFincastlePhoto,
      photoAlt: 'Fort Fincastle seen from above, its walls shaped like the bow of a paddle steamer',
      mapPlace: 'Fort Fincastle, Nassau, Bahamas',
      mapPoint: { lat: 25.0736162, lng: -77.3385291 },
    },
  ],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Cut by hand' },
    { text: 'In 1793 and 1794, about 600 enslaved people cut this staircase out of solid limestone, a deep passage climbing about 30 metres, so soldiers could get quickly between the town and the new fort at the top. It was only named for Queen Victoria decades later. Locals still call it the 66 Steps.' },
    { kind: 'heading', text: 'The governor who fled a revolution' },
    { text: 'The fort at the top, Fort Fincastle, was built by Lord Dunmore, the last royal governor of Virginia, until the American Revolution chased him out. In 1775 he had promised freedom to enslaved people who would fight for the King. Here, he built his forts with enslaved labour. You’ll meet him again at the peak.' },
    { kind: 'find', text: 'Count the steps as you climb. There are 65 now: the 66th is said to be buried under the road at the bottom.' },
    { className: 'narrationClose', text: 'Once you’ve seen the fort, head back down and west across town to Government House, about twenty minutes away.' },
  ],
}

const watlingsDistillery = {
  id: 'watlingsDistillery',
  name: 'John Watling’s Distillery',
  mapName: 'Watling’s Distillery',
  photo: watlingsPhoto,
  photoAlt: 'The red-and-white Buena Vista estate house of John Watling’s Distillery, with flags and palm trees on the lawn',
  memory: 'Rum, in a house from 1789.',
  teaser: 'A rum distillery in a 1789 estate house, named after a pirate. A short walk west.',
  mapPlace: 'John Watling’s Distillery, Nassau',
  mapPoint: { lat: 25.074376, lng: -77.3489749 },
  travelMode: 'walking',
  // From Government House. On to Fort Charlotte after, it's 1731 m, so
  // taking it adds about 194 m of walking (`extraMeters`).
  distanceMeters: 608,
  travelMinutes: 8,
  extraMeters: 194,
  effort: { level: 'easy', note: 'Mostly flat, west along the hilltop' },
  stayMinutes: [30, 45],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'A pirate’s name' },
    { text: 'Remember the pirates? This distillery is named after one of them, John Watling, a 17th-century buccaneer who, legend says, kept the Sabbath and banned gambling on board. An island was named after him too: Watling’s Island, until 1925, when it was renamed San Salvador, the name Columbus gave to his first landfall in the Americas.' },
    { kind: 'heading', text: 'A house from Dunmore’s day' },
    { text: 'The house, the Buena Vista estate, dates back to 1789, the same years Dunmore was building his forts. It opened as a distillery in 2013, and you can wander through and see how the rum is made.' },
    { kind: 'find', text: 'Find the old well, carved out of the limestone more than 200 years ago.' },
    BACK_TO_ROUTE,
  ],
}

const governmentHouse = {
  id: 'governmentHouse',
  name: 'Government House',
  photo: governmentHousePhoto,
  photoAlt: 'Government House in Nassau, a pink mansion on a hill at the top of a grand white stairway between stone gateposts',
  memory: 'Columbus on the steps.',
  mapPlace: 'Government House, Duke Street, Nassau',
  mapPoint: { lat: 25.0756345, lng: -77.3448779 },
  travelMode: 'walking',
  distanceMeters: 1393,
  travelMinutes: 19,
  effort: { level: 'moderate', note: 'Back down the hill, then a short, steep climb up to Government House' },
  stayMinutes: [15, 20],
  nearby: [
    {
      name: 'Graycliff',
      note: 'An 18th-century house turned hotel, known for its huge wine cellar, its chocolatier and its cigar makers',
      meters: 237,
      photo: graycliffPhoto,
      photoAlt: 'The red wall and white gateway of Graycliff, with a history board beside the door',
      mapPlace: 'Graycliff, West Hill Street, Nassau, Bahamas',
      mapPoint: { lat: 25.0754689, lng: -77.3464028 },
    },
  ],
  ...BUILD,
  detours: [watlingsDistillery],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'Columbus, or a pirate?' },
    { text: 'This pink mansion on Mount Fitzwilliam was finished in 1806, and the Bahamas’ governors have lived here ever since. On its stairway stands Christopher Columbus, who first landed in the Americas here in the Bahamas in 1492, among the Lucayan people. One visitor thought the statue looked less like an explorer than a swaggering pirate, slouch hat and all.' },
    { kind: 'heading', text: 'A king in exile' },
    { text: 'In 1940, Britain needed somewhere to send Edward, the king who had given up his throne to marry Wallis Simpson. It made him governor of the Bahamas, and for five years the Duke and Duchess of Windsor lived in this house. Wallis had it redecorated, at well over the budget.' },
    { kind: 'find', text: 'Find Columbus on the stairway, and decide for yourself: explorer, or pirate?' },
    { className: 'narrationClose', text: 'Next, the peak: Fort Charlotte, Dunmore’s biggest fort, about half an hour west. There’s a rum distillery on the way, if you’d like a detour.' },
  ],
}

const fortCharlotte = {
  id: 'fortCharlotte',
  name: 'Fort Charlotte',
  photo: fortCharlottePhoto,
  photoAlt: 'The thick white walls of Fort Charlotte in Nassau, with a grassy rampart and steps beside them',
  memory: 'On the walls of the fort that never fired.',
  mapPlace: 'Fort Charlotte, West Bay Street, Nassau',
  mapPoint: { lat: 25.07777778, lng: -77.35861111 },
  travelMode: 'walking',
  distanceMeters: 2145,
  travelMinutes: 29,
  effort: { level: 'easy', note: 'Downhill to the harbour, then flat along West Bay Street, with a short rise up to the fort' },
  stayMinutes: [30, 45],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'Dunmore’s biggest fort' },
    { text: 'Fort Charlotte is Lord Dunmore’s grandest work, begun in 1787 and named after Queen Charlotte, the wife of King George III. It has a moat, dungeons, passages cut into the rock and dozens of cannons, and it’s said its cost helped get Dunmore called back to London.' },
    { kind: 'heading', text: 'The forts that never fired' },
    { text: 'For all that, no enemy ever came. Neither this fort nor Fort Fincastle has ever fired a shot in battle. Dunmore spent a fortune guarding Nassau from invasions that never happened, with the labour of people who weren’t free. Up on the walls, it’s worth holding both of those thoughts at once.' },
    { kind: 'find', text: 'From the walls, look down toward the sea and find the low, colourful buildings by the water. That’s the Fish Fry, and it’s where you’re going next.' },
    PEAK_CLOSE,
  ],
}

const fishFry = {
  id: 'arawakCayFishFry',
  name: 'Arawak Cay Fish Fry',
  mapName: 'Fish Fry',
  photo: fishFryPhoto,
  photoAlt: 'Two bowls of fresh conch salad with orange and lime on a counter, as a cook works behind them',
  photoPosition: '35% center',
  memory: 'Conch salad by the sea.',
  mapPlace: 'Fish Fry at Arawak Cay, West Bay Street, Nassau',
  mapPoint: { lat: 25.0795935, lng: -77.3588046 },
  travelMode: 'walking',
  distanceMeters: 797,
  travelMinutes: 11,
  effort: { level: 'easy', note: 'Down from the fort, then along West Bay Street to the water' },
  stayMinutes: [45, 60],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'An island made from the harbour' },
    { text: 'Arawak Cay didn’t exist until 1969, when the harbour was dredged and the sand was piled up here to make new land. It’s named for the Arawak, or Lucayan, people Columbus met in 1492: the first Bahamians of all. Today it’s where Nassau comes to eat.' },
    { kind: 'heading', text: 'Forward, upward, onward, together' },
    { text: 'Remember the motto in Parliament Square? When the Bahamas became independent in 1973, it left “pirates expelled, commerce restored” behind for four words of its own: forward, upward, onward, together. You’ve done the first three today, up the staircase and across the town. Together is this: Bahamians and visitors at the same tables by the sea.' },
    { kind: 'find', text: 'Find a stall making conch salad to order, and watch it being made: fresh conch, onion, tomato and pepper, chopped in front of you and finished with citrus.' },
    { className: 'narrationClose', text: 'That’s the walk. Pull up a chair, and stay for the sunset.' },
  ],
}

export default {
  id: 'nassau',
  name: 'Forward, Upward, Onward',
  location: 'NASSAU · THE BAHAMAS',
  photo: parliamentPhoto,
  photoAlt: parliamentSquare.photoAlt,
  blurb: 'A pirate harbour, a staircase cut by hand and forts that never fired, to a fish fry by the sea.',
  tagline: TAGLINE,
  walking: 'Some climbing',
  stops: '~5 stops',
  difficulty: 'Moderate',
  experience: 'Cultural',
  departure: parliamentSquare,
  discovery: queensStaircase,
  build: governmentHouse,
  peak: fortCharlotte,
  afterglow: fishFry,
  startArea: 'Bay Street, Nassau, The Bahamas',
  startNote: START_NOTE,
  match: {
    moods: { Peaceful: 40, Adventurous: 60, Romantic: 50, Curious: 85, Playful: 50, Cultural: 90 },
    with: { Solo: 80, Couple: 80, Family: 60, 'Friends / Group': 80 },
    preferences: { 'Pet friendly': 30, 'Avoid alcohol': 50, 'More nature': 30, 'Food stops': 80 },
  },
  description: [
    'Three hundred years ago, Nassau was a pirates’ republic. Blackbeard sailed from its harbour, and the town answered to no one, until a British governor sailed in to clean it up and gave the colony a motto: pirates expelled, commerce restored.',
    'This walk climbs through what came after: a staircase cut from solid rock by enslaved hands, forts built by a governor who had fled one revolution, the house where a king who gave up his throne was sent, and the day the old motto was finally replaced. It ends where Nassau eats, with conch salad by the sea.',
  ],
  route: [parliamentSquare, queensStaircase, governmentHouse, fortCharlotte, fishFry],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Nassau, from the pirates’ harbour to the Fish Fry. Whatever you took from the walk, it’s yours now.',
    summary: 'You started in Parliament Square, climbed the Queen’s Staircase to Fort Fincastle, met Columbus at Government House, stood on the walls of Fort Charlotte, and finished with conch salad at Arawak Cay.',
  },
}
