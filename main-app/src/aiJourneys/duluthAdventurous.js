// Through the Peak, Over the Rapids (Duluth, Minnesota): an adventurous day
// for two on Duluth's wild west edge, made to the Journey Engine V2 handoff
// (Duluth, couples only: the Adventurous one of three). Nothing here is in
// the first Duluth journey (duluth.js) or the romantic one.
//
// Its peak, chosen first: the swinging bridge in Jay Cooke State Park, 200
// feet of planks swaying over the St. Louis River's rapids, among slabs of
// slate tilted on end. The way there: a hike through an old railway tunnel
// and up Ely's Peak, then the drive down the river. The thread is old
// routes through hard country: the railway that tunnelled through the peak,
// the canoe route that had to be carried around these rapids, and the
// bridge the river keeps taking back.
//
// Primary mood: Adventurous. Audience: a couple. A hike of about 2–3 km
// with a short, steep climb, then a 20-minute drive.
//
// Exact spots from Trailforks (the trailhead), Wikipedia (Ely's Peak) and
// OpenStreetMap; the tunnel's west end is approximate. Drives from Google's
// Routes API (November 2026). Checked in November 2026 against Wikipedia's
// articles on Ely's Peak and Jay Cooke State Park (its history, the bridge
// and the geology), MPR News and the Star Tribune on the bridge's floods
// and rebuilding, the Superior Hiking Trail Association's directions, and
// Minnesota's state park permit fees.

import heroPhoto from '../assets/journey/duluth-adventurous/hero.jpg'
import trailheadPhoto from '../assets/journey/duluth-adventurous/trailhead.jpg'
import tunnelPhoto from '../assets/journey/duluth-adventurous/tunnel.jpg'
import summitPhoto from '../assets/journey/duluth-adventurous/summit.jpg'
import bridgePhoto from '../assets/journey/duluth-adventurous/swinging-bridge.jpg'
import oldenburgPhoto from '../assets/journey/duluth-adventurous/oldenburg-point.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const trailhead = {
  id: 'elysPeakTrailhead',
  name: 'Ely’s Peak Trailhead',
  mapName: 'Trailhead',
  photo: trailheadPhoto,
  photoAlt: 'The trail toward Ely’s Peak through the woods above Duluth',
  memory: 'Lacing up at the foot of Ely’s Peak.',
  mapPlace: '123rd Avenue West Trailhead, Superior Hiking Trail, Duluth, MN',
  mapPoint: { lat: 46.67928, lng: -92.25735 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re at the foot of Ely’s Peak.' },
    { kind: 'heading', text: 'A missionary’s hill' },
    { text: 'The rocky knob above you is named for Edmund Ely, a missionary who came to teach at Fond du Lac, just up the river, in 1834, and who helped found Oneota, the settlement that became West Duluth. Its top is 1,133 feet above sea level, and climbers know its cliffs for their eighteen routes.' },
    { kind: 'heading', text: 'Hard country' },
    { text: 'Everything today is about getting through this country the hard way: a railway that went straight through the mountain instead of around it, and a river that canoes couldn’t run. You’ll go through one and over the other.' },
    { kind: 'find', text: 'Find the Superior Hiking Trail’s sign at the trailhead, and check you’ve both got a light for the tunnel.' },
    { className: 'narrationClose', text: 'Follow the trail to the old railway tunnel under the peak, a short walk from the lot. Tap “I’m Here” at its mouth.' },
  ],
}

const tunnel = {
  id: 'dwpTunnel',
  name: 'The Railway Tunnel',
  mapName: 'Tunnel',
  photo: tunnelPhoto,
  photoAlt: 'The old Duluth, Winnipeg and Pacific railway tunnel under Ely’s Peak',
  memory: 'Through the mountain in the dark.',
  mapPlace: 'Duluth, Winnipeg and Pacific tunnel, Ely’s Peak, Duluth, MN',
  mapPoint: { lat: 46.68129, lng: -92.25854 },
  travelMode: 'walking',
  distanceMeters: 751,
  travelMinutes: 11,
  effort: { level: 'easy', note: 'A short walk along the trail' },
  stayMinutes: [10, 15],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Straight through' },
    { text: 'In August 1910, the Duluth, Winnipeg and Pacific Railway started blasting a tunnel through Ely’s Peak. Going over the peak or around it would have meant long climbs and curves, so they went through: about 500 feet of rock. The trains are long gone, and now it’s yours to walk.' },
    { kind: 'heading', text: 'In the dark' },
    { text: 'Inside, the light from the far end is all there is. It’s cool even in summer, it can drip, and in winter there can be ice. Go slowly, and listen to how your voices carry.' },
    { kind: 'find', text: 'Halfway through, switch off your lights for a moment and find the far end’s glow. Then say something, and listen for the echo.' },
    { className: 'narrationClose', text: 'Back out, take the Superior Hiking Trail’s short spur up to the top of the peak. It’s steep and rocky, but only about 300 feet. Tap “I’m Here” at the top.' },
  ],
}

const summit = {
  id: 'elysPeakSummit',
  name: 'Ely’s Peak',
  photo: summitPhoto,
  photoAlt: 'The view over the St. Louis River valley from Ely’s Peak',
  memory: 'On top of Ely’s Peak, with the river below.',
  mapPlace: 'Ely’s Peak summit, Duluth, MN',
  mapPoint: { lat: 46.68167, lng: -92.25389 },
  travelMode: 'walking',
  distanceMeters: 771,
  travelMinutes: 13,
  effort: { level: 'moderate', note: 'A climb of about 80 m, steep and rocky on the summit spur' },
  stayMinutes: [15, 25],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'The whole valley' },
    { text: 'From the top, the view goes all the way round: the St. Louis River winding out to the harbour, West Duluth below you, and the hills going on into Wisconsin. Down there, the river is calm and wide. Upstream, where you’re going next, it’s anything but.' },
    { kind: 'heading', text: 'The river’s gorge' },
    { text: 'Upriver, the St. Louis cuts a rocky gorge 13 miles long. For Native Americans travelling by canoe, and for the Europeans who came after them, it was a wall: canoes couldn’t run it, so everything had to be carried around on a long, hard trail called the Grand Portage of the St. Louis.' },
    { kind: 'find', text: 'Find the river, and follow it upstream with your eyes, to the south-west, toward the gorge.' },
    { className: 'narrationClose', text: 'Back down to the car, then drive about 20 minutes to Jay Cooke State Park, and park by the River Inn, the stone visitor centre. Tap “I’m Here” at the swinging bridge.' },
  ],
}

const swingingBridge = {
  id: 'jayCookeSwingingBridge',
  name: 'The Swinging Bridge',
  mapName: 'Swinging Bridge',
  photo: bridgePhoto,
  photoAlt: 'The swinging bridge at Jay Cooke State Park, over the St. Louis River',
  memory: 'Swaying over the rapids together.',
  mapPlace: 'Swinging Bridge, Jay Cooke State Park, Carlton, MN',
  mapPoint: { lat: 46.65369, lng: -92.37045 },
  travelMode: 'driving',
  distanceMeters: 16550,
  travelMinutes: 32,
  effort: { level: 'easy', note: 'Back down to the car (about 15 minutes), then a drive up the river' },
  stayMinutes: [30, 45],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The bridge the river keeps taking back' },
    { text: 'There’s been a bridge here since 1924. The Civilian Conservation Corps rebuilt it in the 1930s on stone towers, and floods tore it down in 1950 and again in June 2012, when the river rose to the deck. This one opened in November 2013. It’s 200 feet long, 126 of them over the water, and yes, it moves.' },
    { kind: 'heading', text: 'Rock older than life' },
    { text: 'Look down at the slabs tilted on end in the river. They started as mud on the floor of a deep sea 1.9 billion years ago, before there was any complex life on Earth, and you can still find ripple marks in them. Then they were crushed into slate and turned on their edges, and 1.1 billion years ago molten rock forced its way through the cracks.' },
    { kind: 'find', text: 'Stop together in the middle of the bridge, and find where the river is loudest.' },
    PEAK_CLOSE,
  ],
}

const oldenburgPoint = {
  id: 'oldenburgPoint',
  name: 'Oldenburg Point',
  photo: oldenburgPhoto,
  photoAlt: 'Oldenburg Point in Jay Cooke State Park',
  memory: 'Catching our breath at Oldenburg Point.',
  mapPlace: 'Oldenburg Point Picnic Area, Jay Cooke State Park, MN',
  mapPoint: { lat: 46.65549, lng: -92.35262 },
  travelMode: 'driving',
  distanceMeters: 1852,
  travelMinutes: 4,
  effort: { level: 'easy', note: 'A short drive along the park road' },
  stayMinutes: [20, 30],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Built by hand' },
    { text: 'The picnic grounds here were built by the Civilian Conservation Corps in the 1930s, in the same rustic style as the River Inn and the bridge’s towers: dark local stone and heavy timber. The shelter, the water tower and even the drinking fountain are on the National Register of Historic Places.' },
    { kind: 'heading', text: 'Through and over' },
    { text: 'You went through a mountain and over a river today, two of the oldest problems in this country, solved the hard way. The river’s still down there, doing what it does.' },
    { kind: 'find', text: 'Find the old stone water tower, and a spot where you can sit and look out over the valley.' },
    { className: 'narrationClose', text: 'That’s the day. Stay as long as the light lasts.' },
  ],
}

export default {
  id: 'duluthAdventurous',
  aiMade: true,
  name: 'Through the Peak, Over the Rapids',
  location: 'DULUTH · MINNESOTA, USA',
  city: 'Duluth',
  photo: heroPhoto,
  photoAlt: 'The swinging bridge at Jay Cooke State Park, over the St. Louis River',
  blurb: 'A railway tunnel through a mountain, a summit above the river, and a bridge that sways over the rapids.',
  walking: 'Moderate walking',
  stops: '~5 stops',
  difficulty: 'Moderate',
  experiences: ['Adventure', 'Nature', 'Scenic', 'Historical'],
  departure: trailhead,
  discovery: tunnel,
  build: summit,
  peak: swingingBridge,
  afterglow: oldenburgPoint,
  startArea: 'West Duluth, Minnesota, USA',
  startNote: START_NOTE,
  bestTime: {
    season: 'Late May to mid-October',
    seasonNote: 'For dry trails and open roads, with the best colour in late September and early October.',
    timeOfDay: 'Morning to mid-afternoon',
    timeNote: 'So you’re off the peak and across the bridge with plenty of daylight left.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Hiking shoes with grip: the summit spur is steep and rocky.',
      'A headlamp or torch each, for the tunnel.',
      'Water and a snack, and a layer for the summit, where it’s windy.',
      'A car: the trailhead and Jay Cooke State Park are about 20 minutes apart.',
    ],
    costs: [
      { lead: 'Minnesota state park permit', text: 'Needed for your car in Jay Cooke State Park: $7 for a day or $35 for a year (2025 fees, the latest found).' },
      'Ely’s Peak and the Superior Hiking Trail are free.',
    ],
    getting: [
      'The trailhead is the Superior Hiking Trail’s 123rd Avenue West lot: from Grand Avenue, go south on Becks Road for 1.8 miles, then right on 123rd Avenue West to the lot.',
      'Park on the public side of the lot.',
      'Jay Cooke State Park is about 20 minutes’ drive south-west, on Highway 210. Park by the River Inn for the bridge.',
    ],
    access: [
      'The summit spur is short but steep, rocky and uneven; the tunnel is dark, and can be wet or icy.',
      'The swinging bridge moves underfoot, and the rocks below it are slippery.',
      'Restrooms are at Jay Cooke State Park, not at the trailhead.',
    ],
    restrictions: [
      { lead: 'The swinging bridge', text: 'It closes when the river is high, after heavy rain or snowmelt.' },
      { lead: 'The river', text: 'Stay off the rocks below the bridge in high water: the current is fast and strong.' },
      'There’s no camping on the Superior Hiking Trail within Duluth.',
    ],
    tips: [
      'In the tunnel, switch your lights off for a moment together.',
      'Late September and early October bring the gorge’s best colour.',
      'If the bridge is closed, the view of the rapids from the River Inn side is still worth it.',
    ],
  },
  match: {
    moods: { Peaceful: 30, Adventurous: 95, Romantic: 55, Curious: 60, Playful: 45, Cultural: 25 },
    with: { Solo: 70, Couple: 90, Family: 45, 'Friends / Group': 85 },
    preferences: {
      'Pet friendly': 55, 'Avoid alcohol': 95, 'More nature': 95, 'Food stops': 5,
      Coastal: 10, 'More urban': 5, 'Hiking involved': 90, 'Budget friendly': 85,
    },
  },
  description: [
    'West of Duluth, the land gets hard. A railway once blasted straight through a mountain rather than go around it, and upriver the St. Louis tears through a gorge so rocky that canoes had to be carried round it for miles.',
    'This journey takes both on: through the old tunnel under Ely’s Peak with your lights on, up a short scramble to the summit, then down the river to a swinging bridge over the rapids, built and rebuilt as the floods take it.',
  ],
  whyCool: {
    discovery: 'A railway tunnel through a mountain, and a bridge that sways over the rapids.',
    significance: 'The old canoe route around the gorge, and rock from a seafloor 1.9 billion years old.',
    feeling: 'Breathless and alive: the dark of the tunnel, the wind on the peak, the roar under the bridge.',
  },
  route: [trailhead, tunnel, summit, swingingBridge, oldenburgPoint],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was through the mountain and over the river, the hard way, together.',
    summary: 'You set off below Ely’s Peak, walked through the old railway tunnel, scrambled to the summit, drove up the river to the swinging bridge over the rapids, and ended at Oldenburg Point.',
  },
}
