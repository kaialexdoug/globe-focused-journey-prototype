// Seven Bridges to the Ridge (Duluth, Minnesota): a romantic drive for two
// along Duluth's east side, made to the Journey Engine V2 handoff (Duluth,
// couples only: the Romantic one of three). It keeps clear of the places the
// first Duluth journey (duluth.js) already covers: Canal Park, the Lift
// Bridge, the Lakewalk at Leif Erikson Park, Glensheen, Enger Tower and Park
// Point.
//
// Its peak, chosen first: the whole North Shore from Hawk Ridge at golden
// hour, 550 feet above the lake. The route climbs to it the way Samuel
// Snively did: up the narrow road of stone bridges he built along Amity
// Creek, partly to get home. The thread is that road home: the lake's edge,
// the river it follows, the bridges, the ridge, and back down to the lake.
// (The Pickwick was first drafted as the last stop, for dinner, but no
// licensed photo of it could be found, so it's a tip in Before You Go.)
//
// Primary mood: Romantic. Audience: a couple. By car (the drives add up
// to about 12 km), with short walks at each.
//
// Exact spots from OpenStreetMap and the Minnesota Department of
// Transportation; drives from Google's Routes API (November 2026). Checked
// in November 2026 against the City of Duluth's parks pages (Skyline
// Parkway's history, Brighton Beach, Lester Park), MnDOT's historic bridge
// records, the Hawk Ridge Bird Observatory's own pages, and published
// histories of the Pickwick, and Wikipedia on the Lester River. See
// JOURNEY_ENGINE_LOG.md for what's uncertain.

import heroPhoto from '../assets/journey/duluth-romantic/hero.jpg'
import mouthPhoto from '../assets/journey/duluth-romantic/lester-river.jpg'
import brightonPhoto from '../assets/journey/duluth-romantic/brighton-beach.jpg'
import lesterPhoto from '../assets/journey/duluth-romantic/lester-park.jpg'
import bridgesPhoto from '../assets/journey/duluth-romantic/seven-bridges.jpg'
import hawkRidgePhoto from '../assets/journey/duluth-romantic/hawk-ridge.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const lesterMouth = {
  id: 'lesterRiverMouth',
  name: 'The Lester River',
  photo: mouthPhoto,
  photoAlt: 'The stone arch bridge over the Lester River, just above its mouth on Lake Superior',
  memory: 'Where the rocky river meets the big lake.',
  mapPlace: 'Lester River Bridge, London Road, Duluth, MN',
  mapPoint: { lat: 46.83667, lng: -92.00611 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [15, 20],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re where the river meets the big lake.' },
    { kind: 'heading', text: 'The rocky canyon river' },
    { text: 'In Ojibwe, the Lester River is Basaabikaa-ziibi, the rocky canyon river, and it has earned it: it cuts a canyon through the rock on its way down from Lester Park to here, where it pours into Lake Superior. The low stone building by the shore is an old fish hatchery, built in 1882.' },
    { kind: 'heading', text: 'The long way home' },
    { text: 'Today you’ll follow this water up into the hills, the way one man built a road to get home more than a century ago, to a ridge high above the lake. Then back down to the shore as the light goes.' },
    { kind: 'find', text: 'Find the line where the river’s water meets the lake’s. On a calm day you can see the colours change.' },
    { className: 'narrationClose', text: 'Lester Park is just upriver. Tap “I’m Here” at the park.' },
  ],
}

const lesterPark = {
  id: 'lesterPark',
  name: 'Lester Park',
  photo: lesterPhoto,
  photoAlt: 'The Lester River tumbling over rocks in Lester Park',
  memory: 'The sound of the falls in Lester Park.',
  mapPlace: 'Lester Park, Duluth, MN',
  mapPoint: { lat: 46.85227, lng: -92.00963 },
  travelMode: 'driving',
  distanceMeters: 2151,
  travelMinutes: 5,
  effort: { level: 'easy', note: 'A short drive upriver' },
  stayMinutes: [20, 30],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The river first' },
    { text: 'Long before Duluth had a park system, people came out to the Lester River to fish and picnic. When the land around it was laid out, it took the river’s name. Today more than nine miles of trails wind through the woods between the Lester River and Amity Creek.' },
    { kind: 'heading', text: 'Two waters' },
    { text: 'Amity Creek comes down from the hills and joins the Lester River here, just before they reach the lake. “Amity” means friendship. Keep it in mind: the road you’ll take next follows that creek all the way up.' },
    { kind: 'find', text: 'Follow the river up from the road until you hear the falls, and find a rock where the two of you can sit and watch the water.' },
    { className: 'narrationClose', text: 'Next, the road up Amity Creek. Drive to the Lester-Amity Chalet, at the bottom of Seven Bridges Road, and tap “I’m Here” there.' },
  ],
}

const sevenBridges = {
  id: 'sevenBridgesRoad',
  name: 'Seven Bridges Road',
  mapName: 'Seven Bridges',
  photo: bridgesPhoto,
  photoAlt: 'One of the stone arch bridges on Seven Bridges Road over Amity Creek',
  memory: 'The stone bridges over Amity Creek.',
  mapPlace: 'Lester-Amity Chalet, Seven Bridges Road, Duluth, MN',
  mapPoint: { lat: 46.85539, lng: -92.01262 },
  travelMode: 'driving',
  distanceMeters: 415,
  travelMinutes: 1,
  effort: { level: 'easy', note: 'A minute or two up the road' },
  stayMinutes: [15, 20],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'A road home' },
    { text: 'In 1899, Samuel Snively started building a narrow, winding road up Amity Creek. He wanted an easier way to his home in the hills, and work for people who needed it. It was finished in 1901 for $12,000, and he paid about half of it himself. Later he gave it to the city, and nearly twenty years on he became Duluth’s longest-serving mayor.' },
    { kind: 'heading', text: 'The stone bridges' },
    { text: 'Around 1912 the road was rebuilt with eight stone-faced arch bridges, designed by Morrell and Nichols of Minneapolis, with heavy stone caps on their railings. Four of the originals are still standing, still carrying the road back and forth across the creek.' },
    { kind: 'find', text: 'Find the nearest of the old bridges and look for the heavy stone caps on its railings. Then count the bridges as you drive up.' },
    { className: 'narrationClose', text: 'Drive on up Seven Bridges Road to Skyline Parkway, and turn along it to Hawk Ridge. Go slowly: the road is narrow and winding. Tap “I’m Here” at the main overlook.' },
  ],
}

const hawkRidge = {
  id: 'hawkRidge',
  name: 'Hawk Ridge',
  photo: hawkRidgePhoto,
  photoAlt: 'Lake Superior and the North Shore from Hawk Ridge',
  memory: 'The whole shore at golden hour.',
  mapPlace: 'Hawk Ridge Nature Reserve, Duluth, MN',
  mapPoint: { lat: 46.8472, lng: -92.03169 },
  travelMode: 'driving',
  distanceMeters: 2886,
  travelMinutes: 6,
  effort: { level: 'easy', note: 'Up Seven Bridges Road and along Skyline Parkway' },
  stayMinutes: [30, 45],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'An old shoreline' },
    { text: 'The road along this ridge follows an ancient gravel shoreline: the edge of a glacial lake, an ancestor of Lake Superior, when the water stood far higher than today. The main overlook is a mile from the lake and about 550 feet above it, with the whole North Shore laid out below.' },
    { kind: 'heading', text: 'Snively’s ridge' },
    { text: 'Hawk Ridge opened in 1939, under Snively’s watchful eye. Every autumn, hawks, eagles and falcons heading south reach Lake Superior and won’t cross it, so they follow the shore, and this ridge is where they pour past. On average, more than 60,000 birds of prey are counted here each fall.' },
    { kind: 'find', text: 'Find a hawk riding the wind along the ridge (from mid-September to late October, there can be hundreds). Out of season, find the far end of the shore, where the lake meets the sky.' },
    PEAK_CLOSE,
  ],
}

const brightonBeach = {
  id: 'brightonBeach',
  name: 'Brighton Beach',
  photo: brightonPhoto,
  photoAlt: 'The rocky shore of Brighton Beach on Lake Superior',
  memory: 'The lake going pink at Brighton Beach.',
  mapPlace: 'Brighton Beach, Kitchi Gammi Park, Duluth, MN',
  mapPoint: { lat: 46.84145, lng: -91.99547 },
  travelMode: 'driving',
  distanceMeters: 6199,
  travelMinutes: 10,
  effort: { level: 'easy', note: 'Back down the hill to the shore' },
  stayMinutes: [20, 40],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Where the Lakewalk ends' },
    { text: 'This is Brighton Beach, where Duluth’s Lakewalk runs out and the open lake begins. In 1922 the city opened its first tourist camp here, and a few years later its parks superintendent started calling this whole stretch of shore Kitchi Gammi Park. Nobody wrote down why. Storms have torn at it again and again; it was rebuilt to stand up to them, and reopened in October 2024.' },
    { kind: 'heading', text: 'The lake at dusk' },
    { text: 'The sun sets behind the hills, not over the water, so the show here is the other way: as the light goes, the lake and the sky over it turn pink and blue. You went up the long way; this is the way home.' },
    { kind: 'find', text: 'Find two flat stones and skip them together. Then watch the far horizon for a ship’s lights.' },
    { className: 'narrationClose', text: 'That’s the long way round. Stay until the light’s gone.' },
  ],
}

export default {
  id: 'duluthRomantic',
  aiMade: true,
  name: 'Seven Bridges to the Ridge',
  location: 'DULUTH · MINNESOTA, USA',
  city: 'Duluth',
  photo: heroPhoto,
  photoAlt: 'Lake Superior and the North Shore from Hawk Ridge',
  blurb: 'The edge of the big lake, a mayor’s road of stone bridges, and the whole shore at golden hour.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experienceLevel: 'simpleEscape',
  experiences: ['Scenic', 'Nature', 'Historical', 'Hidden Gems'],
  departure: lesterMouth,
  discovery: lesterPark,
  build: sevenBridges,
  peak: hawkRidge,
  afterglow: brightonBeach,
  startArea: 'Lakeside, Duluth, Minnesota, USA',
  startNote: START_NOTE,
  bestTime: {
    season: 'Late August to October',
    seasonNote: 'For the autumn colour along Amity Creek, and the hawks on the ridge.',
    timeOfDay: 'The last two hours before sunset',
    timeNote: 'So you reach Hawk Ridge at golden hour, and the lake as the light goes.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'A car: the drives between the stops add up to about 12 km.',
      'Shoes for rocks and trails: Brighton Beach is all stones, and Lester Park’s trails are uneven.',
      'A warm layer, even in summer: it’s cooler by the lake and windy on the ridge.',
      'Binoculars, if you have them, for the hawks and the ships.',
    ],
    costs: [
      'Brighton Beach, Lester Park, Seven Bridges Road and Hawk Ridge’s main overlook are public, with no admission listed.',
    ],
    getting: [
      'It starts at the Lester River Bridge on London Road (Highway 61), on the north-east edge of Duluth, about 15 minutes’ drive from downtown.',
      'Seven Bridges Road is narrow and winding, with tight bridges: take it slowly.',
      'There’s parking at Brighton Beach and Lester Park, a small area by the Lester-Amity Chalet, and pull-offs along Skyline Parkway at Hawk Ridge.',
      'It ends back at the lake, at Brighton Beach, a couple of minutes from where it started.',
    ],
    access: [
      'Brighton Beach is rocky, and Lester Park’s trails have roots, rocks and steps.',
      'Hawk Ridge’s main overlook is right by the road.',
    ],
    restrictions: [
      { lead: 'East Skyline Parkway', text: 'Closed to cars at Hawk Ridge from 1 December to 1 May. The reserve is open all year, but in winter you’d have to walk in.' },
      { lead: 'Hawk Ridge', text: 'The bird count runs every day from 15 August to 30 November, weather allowing, with staff at the main overlook.' },
    ],
    tips: [
      'The hawks are best from mid-September to late October, around the middle of the day, on days with a westerly wind. Come then for the birds, or at golden hour for the light.',
      'There’s almost no migration on days with an easterly wind or rain.',
      'Count the stone bridges on the way up Seven Bridges Road, and see if you agree with the name.',
      'For dinner afterwards, the Pickwick on East Superior Street has been at its address since 1914, and was named one of “America’s Classics” by the James Beard Foundation in 2007. Book ahead at weekends.',
    ],
  },
  match: {
    moods: { Peaceful: 70, Adventurous: 35, Romantic: 90, Curious: 55, Playful: 25, Cultural: 30 },
    with: { Solo: 50, Couple: 95, Family: 50, 'Friends / Group': 55 },
    preferences: {
      'Pet friendly': 60, 'Avoid alcohol': 60, 'More nature': 85, 'Food stops': 50,
      Coastal: 80, 'More urban': 15, 'Hiking involved': 30, 'Budget friendly': 70,
    },
  },
  description: [
    'In 1899, a man who would become Duluth’s longest-serving mayor started building a winding road up Amity Creek, partly just to get home. He paid half of it himself, gave it to the city, and later saw it lined with stone bridges.',
    'This journey takes his long way round: from the mouth of the Lester River, up to its falls, up the road of stone bridges, to a ridge 550 feet above the lake where the whole North Shore turns gold. Then back down to the shore as the lake turns pink.',
  ],
  whyCool: {
    discovery: 'A mayor’s road of stone bridges, climbing a creek named for friendship.',
    significance: 'The old shoreline of a glacial lake, and the ridge where tens of thousands of hawks pass every fall.',
    feeling: 'Unhurried and golden: the lake, the woods, and the two of you above it all.',
  },
  route: [lesterMouth, lesterPark, sevenBridges, hawkRidge, brightonBeach],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was the long way home, up Snively’s road to the ridge and back to the lake.',
    summary: 'You started where the Lester River meets the lake, followed it up to its falls, drove up the road of stone bridges along Amity Creek, watched the shore turn gold from Hawk Ridge, and ended on the rocks of Brighton Beach as the light went.',
  },
}
