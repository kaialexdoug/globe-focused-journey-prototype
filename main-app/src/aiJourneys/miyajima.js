// Sea to Summit on the Sacred Island (Miyajima, Hiroshima): a day's climb
// for a group of friends, made to the Journey Engine V2 handoff (Japan,
// outside Tokyo: one of four, chosen for friends and an adventurous mood).
//
// Its peak, chosen first: the summit of Mount Misen, 535 m up, reached on
// foot from the shrine at sea level by the old pilgrims' path of stone
// steps, with the islands of the Seto Inland Sea all round. The thread is
// what lasts: a shrine said to date from 593 standing over the sea, a path
// a prime minister paid to repair, a fire said to have burned since 806
// (carried out of its burning hall in May 2026 and still kept alight), and a
// gate in the sea that stands up by its own weight.
//
// Primary mood: Adventurous. Audience: friends. On foot, about 3.5 km up
// (about 500 m of climbing, mostly stone steps), then the ropeway down and
// a walk back to the shore.
//
// Exact spots from OpenStreetMap and geotagged Commons photos (Kuguri-iwa's
// is approximate); walks from Google's Routes API (November 2026); heights
// from GSI. Checked in November 2026 against the Miyajima Tourist
// Association's own pages (the island, Itsukushima Shrine, the Great Torii,
// Daishō-in, Mount Misen and its seven wonders, the three climbing routes,
// and its 21 May 2026 notice that the mountain had reopened), Itsukushima
// Shrine's admission page, news reports and a guide checked in October 2026
// on the Reikadō fire and the ropeway's hours and fares, and reports on the
// visitor tax and ferry fares. See JOURNEY_ENGINE_LOG.md for what's
// uncertain.

import heroPhoto from '../assets/journey/miyajima/hero.jpg'
import shrinePhoto from '../assets/journey/miyajima/shrine.jpg'
import daishoInPhoto from '../assets/journey/miyajima/daisho-in.jpg'
import kuguriIwaPhoto from '../assets/journey/miyajima/kuguri-iwa.jpg'
import summitPhoto from '../assets/journey/miyajima/summit.jpg'
import toriiPhoto from '../assets/journey/miyajima/torii.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE, DINNER } from './parts.js'

const shrine = {
  id: 'itsukushimaShrine',
  name: 'Itsukushima Shrine',
  photo: shrinePhoto,
  photoAlt: 'The vermilion corridors of Itsukushima Shrine, standing over the water',
  memory: 'Sea level: where the climb begins.',
  mapPlace: 'Itsukushima Shrine, Miyajima, Hatsukaichi, Hiroshima',
  mapPoint: { lat: 34.2963, lng: 132.3203 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [30, 45],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re at sea level. By lunchtime you’ll be 535 metres above it, on your own feet.' },
    { kind: 'heading', text: 'An island that is a god' },
    { text: 'Since ancient times, people have worshipped Miyajima itself, the whole island, as goddesses. The shrine is said to have been founded in 593, and it’s built out over the tidal flat on posts, so at high tide it seems to float. Its floorboards have small gaps between them, to let the pressure of the sea through.' },
    { kind: 'heading', text: 'The mountain behind' },
    { text: 'Look up behind the shrine: that’s Mount Misen, today’s summit. Its ancient forest is part of the same World Heritage Site as the shrine. You start from zero metres, and the island’s own tourist association warns visitors not to underestimate it.' },
    { kind: 'find', text: 'Find the great red torii out in the sea, and fix it in your mind. You’ll be looking down on it from the top in a few hours.' },
    { className: 'narrationClose', text: 'Walk on past the shrine and up the lane to Daishō-in, about 10 minutes. Tap “I’m Here” at its gate.' },
  ],
}

const daishoIn = {
  id: 'daishoIn',
  name: 'Daishō-in',
  photo: daishoInPhoto,
  photoAlt: 'Rows of small stone Buddhist disciples lining a stairway at Daishō-in',
  memory: 'Hundreds of stone faces at the foot of the mountain.',
  mapPlace: 'Daisho-in Temple, Miyajima, Hatsukaichi, Hiroshima',
  mapPoint: { lat: 34.29173, lng: 132.31858 },
  travelMode: 'walking',
  distanceMeters: 527,
  travelMinutes: 9,
  effort: { level: 'easy', note: 'Gently uphill through the town' },
  stayMinutes: [20, 30],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The temple at the foot of the mountain' },
    { text: 'Daishō-in is one of the most important temples of Shingon Buddhism in western Japan. An emperor founded his prayer hall here in the 1100s, the warlord Toyotomi Hideyoshi prayed here for safety at sea and victory in battle, and the Emperor Meiji stayed here in 1885.' },
    { kind: 'heading', text: 'Five hundred faces' },
    { text: 'Hundreds of small stone figures of the Buddha’s disciples line one of the temple’s stairways, each with a face of its own: some laughing, some lost in thought, some looking as if they’ve just climbed a mountain.' },
    { kind: 'find', text: 'Each of you find the stone disciple that looks most like someone else in your group. Show them.' },
    { className: 'narrationClose', text: 'The Daishōin trail starts here, on the left just before the bridge in front of the temple’s Niōmon gate. It’s about 2.6 km and 500 m up, mostly stone steps: allow an hour and a half to two hours. Tap “I’m Here” when you reach the temple halls near the top.' },
  ],
}

const kuguriIwa = {
  id: 'kuguriIwa',
  name: 'The Halls and Kuguri-iwa',
  mapName: 'Kuguri-iwa',
  photo: kuguriIwaPhoto,
  photoAlt: 'Stone steps leading under huge granite boulders at Kuguri-iwa, near the top of Mount Misen',
  memory: 'Kūkai’s fire, and a tunnel through the rocks.',
  mapPlace: 'Kuguri-iwa, Mount Misen, Miyajima',
  mapPoint: { lat: 34.2788, lng: 132.3196 },
  travelMode: 'walking',
  distanceMeters: 2426,
  travelMinutes: 100,
  effort: { level: 'hard', note: 'About 2.5 km of stone steps, climbing nearly 500 m' },
  stayMinutes: [20, 30],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'Counting stones' },
    { text: 'On the way up you passed small guide stones, one every chō, an old measure of 109 metres: 24 of them from the bottom to the top. The path is old, too. Japan’s first prime minister, Itō Hirobumi, was devoted to this mountain and paid for it to be repaired in 1906. His monument stands at the start.' },
    { kind: 'heading', text: 'Kūkai’s fire' },
    { text: 'The monk Kūkai opened Misen as a place of training in 806, and a fire he’s said to have lit has been kept burning ever since, for more than 1,200 years. In 1964 it was used to light the Flame of Peace in Hiroshima’s Peace Memorial Park. On 20 May 2026 the hall that held it, the Reikadō, burned down. Daishō-in says the flame itself was carried out safely and is still kept alight, and the hall is to be rebuilt by November 2027. Until then you won’t see it: ask at the temple.' },
    { kind: 'heading', text: 'Through the rock' },
    { text: 'The top of Misen is a jumble of enormous granite boulders. Here the path goes straight underneath them, through a natural tunnel called Kuguri-iwa, “the rock you pass through”.' },
    { kind: 'find', text: 'One of Misen’s seven wonders is Kanman-iwa, a rock up here that’s said to ebb and flow with the tide, more than 500 metres above the sea. See if your group can find it.' },
    { className: 'narrationClose', text: 'Pass through the rock and climb the last few minutes to the summit. Tap “I’m Here” at the observatory.' },
  ],
}

const summit = {
  id: 'misenSummit',
  name: 'The Summit of Misen',
  mapName: 'Misen summit',
  photo: summitPhoto,
  photoAlt: 'The summit observatory of Mount Misen on its granite rocks, with the sea beyond',
  memory: '535 metres up, from zero.',
  mapPlace: 'Mt. Misen summit observatory, Miyajima',
  mapPoint: { lat: 34.27978, lng: 132.31966 },
  travelMode: 'walking',
  distanceMeters: 202,
  travelMinutes: 5,
  effort: { level: 'moderate', note: 'A last steep climb over rock steps' },
  stayMinutes: [30, 45],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: '535 metres, from zero' },
    { text: 'This is the highest point on Miyajima, and you walked all of it, from the shrine at the water’s edge. The island is about 9 km long and 4 km wide. It became an island around 6,000 years ago, when the sea rose and cut it off from the mainland.' },
    { kind: 'heading', text: 'The whole Inland Sea' },
    { text: 'All around you are the islands of the Seto Inland Sea. Across the water to the north-east is Hiroshima, where the flame from this mountain still burns in the Peace Memorial Park.' },
    { kind: 'find', text: 'Find the red torii you looked at this morning, far below. Then find Hiroshima.' },
    PEAK_CLOSE,
  ],
}

const otorii = {
  id: 'otorii',
  name: 'The Great Torii',
  photo: toriiPhoto,
  photoAlt: 'The Great Torii of Itsukushima Shrine standing in the sea at sunset',
  memory: 'Sunset behind the gate in the sea.',
  mapPlace: 'Great Torii of Itsukushima Shrine, Miyajima',
  mapPoint: { lat: 34.298, lng: 132.3195 },
  travelMode: 'walking',
  distanceMeters: 1907,
  travelMinutes: 55,
  effort: { level: 'easy', note: 'About 20 minutes down to the ropeway, the ropeway down, then a walk through Momijidani Park to the shore' },
  stayMinutes: [30, 60],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'A gate that stands by itself' },
    { text: 'The Great Torii is about 16.8 metres tall, and its two main pillars are about 13 metres tall and nearly 10 metres round. It isn’t buried in the seabed at all: it stands up by its own weight. This one, the ninth, has stood here since 1875.' },
    { kind: 'heading', text: 'Back where you started' },
    { text: 'This morning you looked at it from the shrine. At midday it was a red speck from the top of the mountain. Now you’re beside it again, with 535 metres in your legs. If you’re lucky, the sun goes down right behind it.' },
    { kind: 'find', text: 'At low tide you can walk out across the sand to the torii’s feet. If the water’s out, go and put a hand on a pillar that has stood on its own since 1875.' },
    DINNER,
  ],
}

export default {
  id: 'miyajima',
  aiMade: true,
  name: 'Sea to Summit on the Sacred Island',
  location: 'MIYAJIMA · HIROSHIMA, JAPAN',
  city: 'Hatsukaichi',
  photo: heroPhoto,
  photoAlt: 'The view from the top of Mount Misen over forest and the islands of the Seto Inland Sea',
  blurb: 'From a shrine at sea level, up 500 metres of stone steps to the summit, and back down for sunset at the gate in the sea.',
  walking: 'Some climbing',
  stops: '~5 stops',
  difficulty: 'Active',
  experiences: ['Adventure', 'Nature', 'Scenic', 'Cultural'],
  departure: shrine,
  discovery: daishoIn,
  build: kuguriIwa,
  peak: summit,
  afterglow: otorii,
  startArea: 'Miyajima, Hatsukaichi, Hiroshima, Japan',
  startNote: START_NOTE,
  bestTime: {
    season: 'October to May',
    seasonNote: 'The climb is hot and humid in summer. Autumn brings the maples of Momijidani Park, and spring the cherry blossom.',
    timeOfDay: 'Start by about 9:30 in the morning',
    timeNote: 'To be on top by lunchtime, and down before the ropeway’s last car at 4:30 PM.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Hiking shoes with grip: most of the climb is stone steps.',
      'At least a litre of water each, and snacks: there are no toilets along the trails, and water can’t be counted on at the top.',
      'A layer for the summit, and a towel.',
      'The tide table and sunset time for the day, for the torii at the end.',
    ],
    costs: [
      { lead: 'Miyajima visitor tax', text: '¥100 per person, paid with your ferry fare (since October 2023).' },
      { lead: 'Ferry', text: 'About ¥200 each way from Miyajimaguchi.' },
      { lead: 'Itsukushima Shrine', text: '¥300 for adults.' },
      { lead: 'Ropeway down', text: '¥1,100 one way for adults.' },
    ],
    getting: [
      'Take the ferry from Miyajimaguchi, about 10 minutes, then walk along the shore to the shrine, about 15 minutes.',
      'It ends at the shore by the shrine, about 15 minutes’ walk back to the ferry pier.',
    ],
    access: [
      'The Daishōin trail is a long, steep climb, mostly on stone steps. It’s not suitable for strollers or wheelchairs.',
      'The island’s tourist association warns of hornets and vipers on the mountain: stay on the path.',
    ],
    restrictions: [
      { lead: 'The ropeway', text: 'Up 9 AM–4 PM, down 9:20 AM–4:30 PM. On some busy days it needs booking online: check its website. If you miss the last car, it’s another 1 to 1½ hours down on foot.' },
      { lead: 'The Reikadō', text: 'The hall of the eternal flame burned down on 20 May 2026 and is being rebuilt. The rest of the mountain reopened the next day.' },
      { lead: 'Itsukushima Shrine', text: 'From 6:30 AM; it closes between 5 and 6:30 PM, depending on the time of year.' },
    ],
    tips: [
      'Of the three trails up, the Daishōin route is the one the island’s tourist association describes as having very good views on the way.',
      'If anyone in the group doesn’t want to climb, they can ride the ropeway up and meet you at the top.',
      'Ferries back to the mainland run into the evening: check the last one before you settle in for the sunset.',
    ],
  },
  match: {
    moods: { Peaceful: 40, Adventurous: 95, Romantic: 55, Curious: 65, Playful: 50, Cultural: 60 },
    with: { Solo: 75, Couple: 80, Family: 35, 'Friends / Group': 95 },
    preferences: {
      'Pet friendly': 15, 'Avoid alcohol': 85, 'More nature': 90, 'Food stops': 30,
      Coastal: 85, 'More urban': 5, 'Hiking involved': 98, 'Budget friendly': 70,
    },
  },
  description: [
    'Miyajima is an island people have worshipped as a goddess for as long as anyone knows, with a shrine standing in the sea and a sacred mountain rising straight up behind it.',
    'This day starts at sea level and goes all the way up on foot: past a temple of five hundred stone faces, up the old pilgrims’ steps to the fire a monk is said to have lit in 806, through a tunnel of rock to the summit, then back down to watch the sun set behind the gate in the sea.',
  ],
  whyCool: {
    discovery: 'A climb from a shrine in the sea to a summit 535 metres up, all on your own feet.',
    significance: 'A World Heritage island, and the mountain whose fire lit Hiroshima’s Flame of Peace.',
    feeling: 'Breathless and triumphant: a real climb with friends, and a sunset you’ve earned.',
  },
  route: [shrine, daishoIn, kuguriIwa, summit, otorii],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Miyajima, from the sea to the summit and back.',
    summary: 'You started at the shrine in the sea, found your faces among Daishō-in’s stone disciples, climbed the old pilgrims’ steps to Kūkai’s mountain, squeezed through Kuguri-iwa to the summit, and came back down to the Great Torii for sunset.',
  },
}
