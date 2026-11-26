// The Monk's Trail (Chiang Mai, Thailand): a peaceful morning walk for one,
// made to the Journey Engine V2 handoff (flagship destinations: anywhere in
// Thailand).
//
// Why Chiang Mai, not Bangkok: the handoff asks for the strongest real
// experience, and for a peaceful one there's little to match the old
// forest path monks have walked up Doi Suthep, to a quiet temple of moss-
// covered stone beside a stream. Its peak, chosen first: Wat Pha Lat, the
// "sloping rock monastery", with Chiang Mai spread out below. The thread is
// the climb itself: an old pilgrims' path, once the way up the mountain.
//
// Primary mood: Peaceful. Audience: one person. On foot, about 1.5 km up a
// forest trail, steep and rough in places.
//
// Spots from OpenStreetMap and geotagged Commons photos (the trail stops
// are approximate); distances measured along the trail's line, since it
// isn't fully mapped for walking directions. Checked in November 2026
// against Time Out, Lonely Planet and hiking guides (Hiking Project) on the
// trail and the temple. See JOURNEY_ENGINE_LOG.md.

import heroPhoto from '../assets/journey/chiang-mai/hero.jpg'
import trail1Photo from '../assets/journey/chiang-mai/trail-1.jpg'
import trail3Photo from '../assets/journey/chiang-mai/trail-3.jpg'
import trail2Photo from '../assets/journey/chiang-mai/trail-2.jpg'
import phaLatPhoto from '../assets/journey/chiang-mai/pha-lat.jpg'
import terracePhoto from '../assets/journey/chiang-mai/terrace.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const trailhead = {
  id: 'monksTrailhead',
  name: 'The Trailhead',
  photo: trail1Photo,
  photoAlt: 'The start of the Monk’s Trail, a dirt path into the forest on Doi Suthep',
  memory: 'Into the forest.',
  mapPlace: 'Monk’s Trail trailhead, end of Suthep Road, Chiang Mai',
  mapPoint: { lat: 18.7962, lng: 98.9445 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Leave the city behind. From here it’s just you, the forest and the path.' },
    { kind: 'heading', text: 'The mountain above the city' },
    { text: 'Doi Suthep rises straight up behind Chiang Mai, with one of northern Thailand’s most sacred temples near its top. Before there was a road, people climbed to it on foot, and monks still use this path through the forest.' },
    { kind: 'find', text: 'Before you start, stand still and listen to the forest for a minute.' },
    { className: 'narrationClose', text: 'Follow the trail up into the trees. Tap “I’m Here” when the city noise has gone.' },
  ],
}

const forest = {
  id: 'monksForest',
  name: 'The Forest Path',
  photo: trail3Photo,
  photoAlt: 'A narrow trail winding uphill through dense green forest',
  memory: 'Saffron in the trees.',
  mapPlace: 'Monk’s Trail, Doi Suthep, Chiang Mai',
  mapPoint: { lat: 18.7975, lng: 98.9405 },
  travelMode: 'walking',
  distanceMeters: 550,
  travelMinutes: 12,
  effort: { level: 'moderate', note: 'Uphill on a rough dirt path, with roots and rocks' },
  stayMinutes: [5, 10],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'A path of robes' },
    { text: 'For years, strips of saffron monks’ robes were tied around trees along this trail to mark the way and bless the forest. Some visitors say fewer are left now. Look for them as you climb.' },
    { kind: 'find', text: 'Watch the trees for a band of orange cloth tied around a trunk.' },
    { className: 'narrationClose', text: 'Keep climbing. Tap “I’m Here” when you hear running water.' },
  ],
}

const climb = {
  id: 'monksClimb',
  name: 'The Climb',
  photo: trail2Photo,
  photoAlt: 'The forest trail climbing between tall trees on Doi Suthep',
  memory: 'One step at a time.',
  mapPlace: 'Monk’s Trail, Doi Suthep, Chiang Mai',
  mapPoint: { lat: 18.7985, lng: 98.9365 },
  travelMode: 'walking',
  distanceMeters: 500,
  travelMinutes: 12,
  effort: { level: 'moderate', note: 'Steadily uphill, steep in places' },
  stayMinutes: [5, 10],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'Walking as practice' },
    { text: 'In Buddhist practice, walking slowly and attentively is a form of meditation in itself. You don’t need to hurry. Match your breath to your steps, and let the climb take as long as it takes.' },
    { kind: 'find', text: 'Walk the next twenty steps slowly, noticing each foot as it touches the ground.' },
    { className: 'narrationClose', text: 'The temple is just ahead, by the stream. Tap “I’m Here” at its gate.' },
  ],
}

const phaLat = {
  id: 'watPhaLat',
  name: 'Wat Pha Lat',
  photo: phaLatPhoto,
  photoAlt: 'A small temple of carved wood and stone among the trees at Wat Pha Lat',
  memory: 'The sloping rock monastery.',
  mapPlace: 'Wat Pha Lat, Doi Suthep, Chiang Mai',
  mapPoint: { lat: 18.79923, lng: 98.934 },
  travelMode: 'walking',
  distanceMeters: 350,
  travelMinutes: 8,
  effort: { level: 'moderate', note: 'The last steep stretch to the temple' },
  stayMinutes: [40, 60],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'A resting place on the way up' },
    { text: 'Wat Pha Lat, the “sloping rock monastery”, was the main resting place on the old walk up to Doi Suthep. Its buildings stand among the trees on great slabs of rock, with a stream sliding down over them, statues softened by moss, and very few people.' },
    { kind: 'find', text: 'Find a place to sit by the water, where you can hear it running over the rock.' },
    PEAK_CLOSE,
  ],
}

const terrace = {
  id: 'phaLatTerrace',
  name: 'The View Over the City',
  photo: terracePhoto,
  photoAlt: 'Temple buildings at Wat Pha Lat with the forest around them',
  memory: 'The city, far below and quiet.',
  mapPlace: 'Wat Pha Lat, Doi Suthep, Chiang Mai',
  mapPoint: { lat: 18.7996, lng: 98.9338 },
  travelMode: 'walking',
  distanceMeters: 50,
  travelMinutes: 1,
  effort: { level: 'easy', note: 'A few steps across the temple grounds' },
  stayMinutes: [15, 30],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Looking back' },
    { text: 'From the edge of the temple grounds, through the trees, Chiang Mai spreads out across the plain below. From up here it’s silent. You walked up out of all of that.' },
    { kind: 'find', text: 'Find a gap in the trees with a view of the city, and stay until you’re ready to go down.' },
    { className: 'narrationClose', text: 'Go back down the way you came, slowly: the path is easier to slip on going down.' },
  ],
}

export default {
  id: 'chiangMai',
  aiMade: true,
  name: 'The Monk’s Trail',
  location: 'CHIANG MAI · CHIANG MAI, THAILAND',
  city: 'Chiang Mai',
  photo: heroPhoto,
  photoAlt: 'Wat Pha Lat’s temple buildings among the forest on Doi Suthep',
  blurb: 'An old forest path up the mountain behind Chiang Mai to a quiet temple of moss and stone beside a stream.',
  walking: 'Some climbing',
  stops: '~5 stops',
  difficulty: 'Moderate',
  experiences: ['Nature', 'Cultural', 'Hidden Gems', 'Adventure'],
  departure: trailhead,
  discovery: forest,
  build: climb,
  peak: phaLat,
  afterglow: terrace,
  startArea: 'Chiang Mai, Thailand',
  startNote: START_NOTE,
  bestTime: {
    season: 'November to February',
    seasonNote: 'The cool, dry season. The trail is slippery in the rainy season, and the air can be smoky in March and April.',
    timeOfDay: 'Early morning',
    timeNote: 'Cooler for the climb, and the temple at its quietest.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Shoes with good grip: the path is rough and can be muddy.',
      'Water, and insect repellent.',
      'Clothes that cover your shoulders and knees for the temple.',
    ],
    costs: [
      'The trail and Wat Pha Lat are free; donations to the temple are welcome.',
    ],
    getting: [
      'The trail starts at the end of Suthep Road, west of Chiang Mai University. A red songthaew or a taxi can drop you there.',
      'Guides give about 30 minutes’ climb to Wat Pha Lat; the trail continues further up to Doi Suthep if you want more.',
    ],
    access: [
      'A rough, steep forest path with roots and rocks. Not suitable for strollers or wheelchairs.',
    ],
    restrictions: [
      'Wat Pha Lat is a working temple: take off your shoes where you see others do, speak quietly, and don’t touch the monks.',
    ],
    tips: [
      'Walk slowly: this is a trail for meditation as much as for exercise.',
    ],
  },
  match: {
    moods: { Peaceful: 97, Adventurous: 60, Romantic: 50, Curious: 55, Playful: 15, Cultural: 70 },
    with: { Solo: 97, Couple: 80, Family: 45, 'Friends / Group': 55 },
    preferences: {
      'Pet friendly': 5, 'Avoid alcohol': 98, 'More nature': 95, 'Food stops': 0,
      Coastal: 0, 'More urban': 5, 'Hiking involved': 85, 'Budget friendly': 98,
    },
  },
  description: [
    'Behind Chiang Mai, the forested mountain of Doi Suthep rises steeply to one of northern Thailand’s most sacred temples. Before there was a road, people climbed to it on foot, and the monks still walk an old path through the trees.',
    'This quiet morning follows that Monk’s Trail up through the forest to Wat Pha Lat, a temple of moss-covered stone beside a stream that was once the resting place on the way up, with the city spread out below.',
  ],
  whyCool: {
    discovery: 'A forest temple beside a stream, a short climb from the city but a world away.',
    significance: 'The old pilgrims’ route up Doi Suthep, still walked by monks.',
    feeling: 'Still and calm: birdsong, running water, and the city silent far below.',
  },
  route: [trailhead, forest, climb, phaLat, terrace],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was the Monk’s Trail, at a monk’s pace.',
    summary: 'You set off from the foot of Doi Suthep, climbed the forest path past trees once wrapped in monks’ robes, slowed your steps, reached the quiet of Wat Pha Lat by its stream, and looked back over Chiang Mai.',
  },
}
