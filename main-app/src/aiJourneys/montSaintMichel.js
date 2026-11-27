// Barefoot to the Mount (Mont-Saint-Michel, France): an adventurous day for
// a family, made to the Journey Engine V2 handoff (flagship destinations:
// anywhere in France).
//
// Why Mont-Saint-Michel, not Paris: the handoff asks for the strongest real
// experience, and few things in France match walking barefoot across the
// sands of the bay, with a guide, to an abbey on a rock in the sea. Its
// peak, chosen first: arriving at the Mount on foot, as pilgrims have for
// centuries. The thread is the tide: the sea that goes out for miles and
// comes back fast, and the people who learned to cross between.
//
// Primary mood: Adventurous. Audience: a family (children old enough for a
// long walk). On foot across the sand with a certified guide, about 6 km to
// the Mount; there are no paths, so the distances are straight lines.
//
// Spots from OpenStreetMap and geotagged Commons photos. Checked in November
// 2026 against the Mont-Saint-Michel tourist office and Brittany and
// Normandy tourism (the guided crossings), World History Encyclopedia (the
// legend of 708 and the 1979 World Heritage listing, and the tides).

import heroPhoto from '../assets/journey/mont-saint-michel/hero.jpg'
import becPhoto from '../assets/journey/mont-saint-michel/bec-dandaine.jpg'
import sandsPhoto from '../assets/journey/mont-saint-michel/sands.jpg'
import tombelainePhoto from '../assets/journey/mont-saint-michel/tombelaine.jpg'
import grandeRuePhoto from '../assets/journey/mont-saint-michel/grande-rue.jpg'
import terracePhoto from '../assets/journey/mont-saint-michel/terrace.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const bec = {
  id: 'becDAndaine',
  name: 'The Bec d’Andaine',
  photo: becPhoto,
  photoAlt: 'Mont-Saint-Michel and the islet of Tombelaine far across the bay from the Bec d’Andaine',
  memory: 'Shoes off at the edge of the bay.',
  mapPlace: 'Bec d’Andaine, Genêts, France',
  mapPoint: { lat: 48.68836, lng: -1.49748 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [15, 20],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Look across the bay. That’s where you’re walking to, barefoot.' },
    { kind: 'heading', text: 'A sea that leaves' },
    { text: 'The tides in this bay are among the most dramatic in Europe: the sea can rise and fall by as much as 15 metres, and at low tide it draws back for miles, leaving a vast plain of sand, mud and channels between you and the Mount. When it comes back, it comes back fast.' },
    { kind: 'heading', text: 'With a guide' },
    { text: 'That’s why you cross only with a guide certified for the bay, who knows the tide tables, the channels and the quicksand. Guided walks leave from here, at Genêts.' },
    { kind: 'find', text: 'Find the Mount on the horizon, and the smaller island to its left. You’ll pass that one on the way.' },
    { className: 'narrationClose', text: 'Follow your guide out onto the sand. Tap “I’m Here” when the shore is behind you.' },
  ],
}

const sands = {
  id: 'baySands',
  name: 'Out on the Sands',
  photo: sandsPhoto,
  photoAlt: 'A small group of walkers far out on the wide, wet sands of the bay',
  memory: 'The ground that moves.',
  mapPlace: 'Bay of Mont-Saint-Michel',
  mapPoint: { lat: 48.6755, lng: -1.5035 },
  travelMode: 'walking',
  distanceMeters: 1497,
  travelMinutes: 30,
  effort: { level: 'moderate', note: 'Barefoot across wet sand and shallow channels, with your guide' },
  stayMinutes: [10, 20],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Quicksand' },
    { text: 'Out here, some of the sand is solid and some, where water is trapped beneath it, turns soft and gives way. Your guide will show you how it feels, and how to get out of it: stay calm and keep moving. It’s one of the reasons nobody crosses alone.' },
    { kind: 'find', text: 'When your guide finds a soft patch, stand on it and feel the sand wobble under your feet like jelly.' },
    { className: 'narrationClose', text: 'Keep going toward the little island. Tap “I’m Here” when you’re beside it.' },
  ],
}

const tombelaine = {
  id: 'tombelaine',
  name: 'Tombelaine',
  photo: tombelainePhoto,
  photoAlt: 'The rocky islet of Tombelaine with Mont-Saint-Michel beyond, across the sands',
  memory: 'The little island.',
  mapPlace: 'Tombelaine, Genêts, France',
  mapPoint: { lat: 48.66025, lng: -1.5132 },
  travelMode: 'walking',
  distanceMeters: 1839,
  travelMinutes: 40,
  effort: { level: 'moderate', note: 'On across the sands, with your guide' },
  stayMinutes: [10, 15],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'The other island' },
    { text: 'Tombelaine is the Mount’s small, wild neighbour, a granite islet in the bay that is now left to the seabirds. Some walks visit it in its own right. For you it’s the halfway mark: from here the Mount grows bigger with every step.' },
    { kind: 'find', text: 'Turn round and look back at Genêts. How far have you come?' },
    { className: 'narrationClose', text: 'Now the last stretch to the Mount itself. Tap “I’m Here” when you reach its walls.' },
  ],
}

const arrival = {
  id: 'grandeRue',
  name: 'Mont-Saint-Michel',
  photo: grandeRuePhoto,
  photoAlt: 'The Grande Rue of Mont-Saint-Michel, a narrow street of old houses climbing the rock',
  memory: 'Arriving on foot.',
  mapPlace: 'Grande Rue, Le Mont-Saint-Michel, France',
  mapPoint: { lat: 48.6352, lng: -1.5101 },
  travelMode: 'walking',
  distanceMeters: 2795,
  travelMinutes: 60,
  effort: { level: 'moderate', note: 'The last stretch across the sands, then up into the town' },
  stayMinutes: [45, 75],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The archangel’s rock' },
    { text: 'The legend says that in 708 the archangel Michael appeared to Aubert, bishop of Avranches, and told him to build a church on this rock. Historians note that the story was written down centuries later, but pilgrims have been crossing these sands to reach it ever since, just as you have.' },
    { kind: 'heading', text: 'A town on a rock' },
    { text: 'Up the Grande Rue, the one narrow main street, houses cling to the granite under the abbey. The Mount and its bay have been a World Heritage Site since 1979.' },
    { kind: 'find', text: 'Before you put your shoes back on, look at your feet. They crossed the bay.' },
    PEAK_CLOSE,
  ],
}

const terrace = {
  id: 'abbeyTerrace',
  name: 'The Abbey Terrace',
  photo: terracePhoto,
  photoAlt: 'The wide bay and the islet of Tombelaine seen from high on Mont-Saint-Michel',
  memory: 'Looking back across the bay.',
  mapPlace: 'Abbaye du Mont-Saint-Michel, West Terrace, France',
  mapPoint: { lat: 48.636, lng: -1.5115 },
  travelMode: 'walking',
  distanceMeters: 136,
  travelMinutes: 15,
  effort: { level: 'moderate', note: 'Up many steps to the abbey' },
  stayMinutes: [30, 60],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The view back' },
    { text: 'From the terrace in front of the abbey church, the whole bay lies below you: the sands you walked, Tombelaine, and the far shore where you began. Before long, the tide will cover your footprints.' },
    { kind: 'find', text: 'Find Tombelaine below, then trace your route back to the shore with your finger.' },
    { className: 'narrationClose', text: 'That’s the crossing. Your guide will tell you how you’re getting back: on foot with the tide, or by shuttle from the mainland.' },
  ],
}

export default {
  id: 'montSaintMichel',
  aiMade: true,
  name: 'Barefoot to the Mount',
  location: 'MONT-SAINT-MICHEL · NORMANDY, FRANCE',
  city: 'Le Mont-Saint-Michel',
  photo: heroPhoto,
  photoAlt: 'Walkers crossing the sands of the bay toward Mont-Saint-Michel',
  blurb: 'Walk barefoot across the bay with a guide, past quicksand and a wild islet, to an abbey on a rock in the sea.',
  walking: 'Some climbing',
  stops: '~5 stops',
  difficulty: 'Active',
  experienceLevel: 'standoutJourney',
  experiences: ['Adventure', 'Historical', 'Scenic', 'Nature'],
  departure: bec,
  discovery: sands,
  build: tombelaine,
  peak: arrival,
  afterglow: terrace,
  startArea: 'Genêts, Normandy, France',
  startNote: START_NOTE,
  bestTime: {
    season: 'May to September',
    seasonNote: 'Warmer sand and water underfoot. Crossings run when the tides allow, so dates and times vary.',
    timeOfDay: 'Whenever your guided crossing leaves',
    timeNote: 'Times are set by the tide table, so book first and plan the day around it.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Shorts or trousers you can roll up: you’ll wade through channels.',
      'Bare feet are best (some guides allow flip-flops); bring a towel and shoes for after.',
      'Water, snacks, sun protection and a windproof layer.',
      'A bag to carry your shoes.',
    ],
    costs: [
      { lead: 'Guided crossing', text: 'Roughly €15–22 per person, depending on the operator and the route.' },
      'The abbey charges admission; the town and its streets are free.',
    ],
    getting: [
      'Walks start from the Bec d’Andaine at Genêts. Your guide will confirm the meeting point and time, usually the day before.',
      'Crossings vary: some go one way to the Mount (about 6–7 km), others go there and back (up to about 14 km, around 6 hours).',
    ],
    access: [
      'Long and barefoot on sand and mud, with channels to wade. Not suitable for small children, strollers or wheelchairs.',
      'The abbey is at the top of many steps.',
    ],
    restrictions: [
      { lead: 'Never cross alone', text: 'The tide comes in very fast and there is quicksand. Only cross with a guide certified for the bay.' },
    ],
    tips: [
      'Book your crossing well ahead in summer, and check the tide times when you do.',
    ],
  },
  match: {
    moods: { Peaceful: 40, Adventurous: 96, Romantic: 60, Curious: 75, Playful: 65, Cultural: 70 },
    with: { Solo: 70, Couple: 85, Family: 90, 'Friends / Group': 90 },
    preferences: {
      'Pet friendly': 5, 'Avoid alcohol': 95, 'More nature': 90, 'Food stops': 20,
      Coastal: 95, 'More urban': 10, 'Hiking involved': 85, 'Budget friendly': 75,
    },
  },
  description: [
    'Twice a day the sea in this bay draws back for miles, leaving a plain of sand, mud and channels around a rock crowned by an abbey. For centuries, pilgrims walked across it, and with a guide who knows the tides, you can too.',
    'This day starts on the shore at Genêts, crosses the sands barefoot, past patches of quicksand and the wild islet of Tombelaine, to arrive at Mont-Saint-Michel on foot, and ends high on the abbey terrace looking back over the bay.',
  ],
  whyCool: {
    discovery: 'Quicksand underfoot, and a sea that leaves for miles and comes back fast.',
    significance: 'Mont-Saint-Michel and its bay, a World Heritage Site and a pilgrimage place since the Middle Ages.',
    feeling: 'Wild and thrilling: mud between your toes and the Mount growing bigger with every step.',
  },
  route: [bec, sands, tombelaine, arrival, terrace],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was the bay, crossed barefoot, the way pilgrims did.',
    summary: 'You set off from the Bec d’Andaine, crossed the sands past quicksand and the islet of Tombelaine, arrived at Mont-Saint-Michel on foot, and looked back over the whole bay from the abbey terrace.',
  },
}
