// Where the City Began (the Minneapolis riverfront, Minnesota)

import stadiumPhoto from '../assets/journey/minneapolis/stadium.jpg'
import goldMedalParkPhoto from '../assets/journey/minneapolis/gold-medal-park.jpg'
import millCityPhoto from '../assets/journey/minneapolis/mill-city.jpg'
import guthriePhoto from '../assets/journey/minneapolis/guthrie.jpg'
import stoneArchBridgePhoto from '../assets/journey/minneapolis/stone-arch-bridge.jpg'
import stAnthonyMainPhoto from '../assets/journey/minneapolis/st-anthony-main.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const stadium = {
  id: 'usBankStadium',
  name: 'U.S. Bank Stadium',
  photo: stadiumPhoto,
  photoAlt: 'U.S. Bank Stadium, a huge angular building of dark panels and glass, behind a wide green lawn',
  memory: 'Where the day began.',
  mapPlace: 'U.S. Bank Stadium Station',
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Minneapolis.' },
    { text: 'The city was born a few blocks from here, at St. Anthony Falls, the great waterfall on the Mississippi. Mills grew up around it, and for a while they made this the flour-milling capital of the world.' },
    { className: 'narrationClose', text: 'The giant glass building beside you is the football stadium. Walk past it toward the river. The first stop is on the way.' },
  ],
}

const goldMedalPark = {
  id: 'goldMedalPark',
  name: 'Gold Medal Park',
  photo: goldMedalParkPhoto,
  photoAlt: 'The grassy spiral hill in Gold Medal Park, with the dark blue Guthrie Theater rising behind it',
  memory: 'Up the spiral hill.',
  mapPlace: 'Gold Medal Park, Minneapolis',
  travelMode: 'walking',
  travelMinutes: 10,
  stayMinutes: [15, 30],
  ...DISCOVERY,
  narration: [
    { text: 'Gold Medal Park is built around a grassy hill with a path that spirals up to the top.' },
    { text: 'Walk it round and round to the bench at the summit. From up here you get your first look at the riverfront: the old mills, the theater, and the river beyond.' },
    { className: 'narrationClose', text: 'Head down toward the mills. That’s where the story starts.' },
  ],
}

const guthrie = {
  id: 'guthrieTheater',
  name: 'The Guthrie’s Endless Bridge',
  photo: guthriePhoto,
  photoAlt: 'The Guthrie Theater’s Endless Bridge, a long blue walkway reaching out from the side of the building into the sky',
  memory: 'Out on the Endless Bridge.',
  teaser: 'A walkway that reaches out from the side of a theater toward the river. Right next door.',
  mapPlace: 'Guthrie Theater, Minneapolis',
  travelMode: 'walking',
  travelMinutes: 5,
  stayMinutes: [15, 20],
  ...DETOUR,
  narration: [
    { text: 'The Guthrie is one of the country’s best-known theaters, and its building is as dramatic as anything on its stages.' },
    { text: 'Find your way to the Endless Bridge, which reaches far out from the side of the building toward the river. Step out onto it, if it’s open, and look out toward the falls.' },
    BACK_TO_ROUTE,
  ],
}

const millCity = {
  id: 'millCityMuseum',
  name: 'Mill City Museum',
  photo: millCityPhoto,
  photoAlt: 'Mill City Museum, a modern glass building set inside the tall stone ruins of an old flour mill',
  memory: 'Inside the ruins of the old mill.',
  mapPlace: 'Mill City Museum',
  travelMode: 'walking',
  travelMinutes: 5,
  stayMinutes: [45, 60],
  nearby: [
    { name: 'Mill Ruins Park', note: 'The old mill canals and walls, dug out beside the river', meters: 200 },
  ],
  ...BUILD,
  detours: [guthrie],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'Mill City Museum is built inside the ruined walls of an old flour mill, once one of the biggest in the world.' },
    { text: 'Walk into the open courtyard among the broken stone walls, and imagine the noise and the flour dust when it was running.' },
    { text: 'Next door, a theater has a walkway that reaches out over the street, if you’d like a detour. Otherwise, the bridge is waiting.' },
  ],
}

const stoneArchBridge = {
  id: 'stoneArchBridge',
  name: 'Stone Arch Bridge',
  photo: stoneArchBridgePhoto,
  photoAlt: 'The long Stone Arch Bridge curving across the blue Mississippi, with the Minneapolis skyline beyond',
  memory: 'Across the river on the Stone Arch Bridge.',
  mapPlace: 'Stone Arch Bridge',
  travelMode: 'walking',
  travelMinutes: 5,
  stayMinutes: [20, 30],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'The Stone Arch Bridge was built for trains, and curves across the river on a long line of stone arches. The trains are long gone. Now it’s for walking.' },
    { text: 'Stop halfway across and look upriver at St. Anthony Falls, the waterfall the whole city grew up around. Then turn the other way for the skyline.' },
    PEAK_CLOSE,
  ],
}

const stAnthonyMain = {
  id: 'stAnthonyMain',
  name: 'St. Anthony Main',
  photo: stAnthonyMainPhoto,
  photoAlt: 'An old brick building lit up at night on St. Anthony Main, with a glowing neon sign beyond',
  memory: 'The evening on the old riverfront.',
  mapPlace: 'St. Anthony Main, Minneapolis',
  travelMode: 'walking',
  travelMinutes: 10,
  stayMinutes: [30, 60],
  nearby: [
    { name: 'Nicollet Island', note: 'A small island in the river, with old houses and a pavilion', meters: 500 },
  ],
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. On the far side of the bridge is St. Anthony Main, an old cobbled street on the river.' },
    { text: 'Find a spot by the water and watch the lights come on across the river, in the city that grew up around the falls.' },
    DINNER,
  ],
}

export default {
  id: 'minneapolis',
  aiMade: true,
  name: 'Where the City Began',
  location: 'MINNEAPOLIS · MINNESOTA, USA',
  city: 'Minneapolis',
  photo: millCityPhoto,
  photoAlt: millCity.photoAlt,
  photoPosition: '24% center',
  blurb: 'Through the ruins of the old flour mills, and across a bridge of stone arches.',
  tagline: TAGLINE,
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experience: 'Cultural',
  departure: stadium,
  discovery: goldMedalPark,
  build: millCity,
  peak: stoneArchBridge,
  afterglow: stAnthonyMain,
  startArea: 'Minneapolis, Minnesota, USA',
  startNote: START_NOTE,
  match: {
    moods: { Peaceful: 40, Adventurous: 35, Romantic: 70, Curious: 90, Playful: 45, Cultural: 80 },
    with: { Solo: 85, Couple: 85, Family: 65, 'Friends / Group': 75 },
    preferences: {
      'Pet friendly': 40, 'Avoid alcohol': 65, 'More nature': 30, 'Food stops': 50,
      Coastal: 10, 'More urban': 95, 'Hiking involved': 5, 'Budget friendly': 75,
    },
  },
  description: [
    'Most people see Minneapolis as a city of towers and skyways, but it started down by the river, at a waterfall and a row of mills. This journey goes back to the beginning, through the ruins of the mills, across the river on an old stone bridge, and out to the street where the city first began.',
  ],
  route: [stadium, goldMedalPark, millCity, stoneArchBridge, stAnthonyMain],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Minneapolis, back where it all began. Whatever you took from the day, it’s yours now.',
    summary: 'You started by the stadium, climbed the spiral hill in Gold Medal Park, walked among the ruins at Mill City Museum, crossed the Stone Arch Bridge, and finished on St. Anthony Main.',
  },
}
