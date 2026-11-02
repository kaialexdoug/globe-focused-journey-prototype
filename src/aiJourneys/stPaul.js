// Up on Summit Avenue (St. Paul, Minnesota)

import grandAvenuePhoto from '../assets/journey/st-paul/grand-avenue.jpg'
import summitAvenuePhoto from '../assets/journey/st-paul/summit-avenue.jpg'
import hillHousePhoto from '../assets/journey/st-paul/hill-house.jpg'
import capitolPhoto from '../assets/journey/st-paul/capitol.jpg'
import cathedralPhoto from '../assets/journey/st-paul/cathedral.jpg'
import riceParkPhoto from '../assets/journey/st-paul/rice-park.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const grandAvenue = {
  id: 'grandAvenue',
  name: 'Grand Avenue',
  photo: grandAvenuePhoto,
  photoAlt: 'A bakery on Grand Avenue with a dark blue awning, and someone stopping to read the sign outside',
  memory: 'Where the day began.',
  mapPlace: 'Grand Avenue, St. Paul, MN',
  travelMode: 'transit',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in St. Paul.' },
    { text: 'Grand Avenue is a long, easygoing street of shops, cafés and restaurants, many of them in old houses and storefronts. It’s a good place to start a slow day.' },
    { className: 'narrationClose', text: 'Wander a few blocks, get a coffee, then head one street north. The first stop is right there.' },
  ],
}

const summitAvenue = {
  id: 'summitAvenue',
  name: 'Summit Avenue',
  photo: summitAvenuePhoto,
  photoAlt: 'A grand limestone mansion on Summit Avenue, with a long path leading up to its arched front door',
  memory: 'Walking past the mansions on Summit Avenue.',
  mapPlace: 'Summit Avenue, St. Paul, MN',
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'Summit Avenue is lined with grand old houses, mile after mile of them. It’s said to be the longest avenue of Victorian homes in the country.' },
    { text: 'Walk east along it, toward the cathedral dome in the distance. F. Scott Fitzgerald lived on this street as a young man. See if you can guess which houses have the best stories.' },
    { className: 'narrationClose', text: 'Near the end of the avenue is the grandest house of them all.' },
  ],
}

const capitol = {
  id: 'stateCapitol',
  name: 'Minnesota State Capitol',
  photo: capitolPhoto,
  photoAlt: 'The Minnesota State Capitol, a white marble building with a great dome and golden horses over the entrance, under a deep blue sky',
  memory: 'Under the Capitol dome.',
  teaser: 'The white marble Capitol, with golden horses over its door. A short walk from the cathedral.',
  mapPlace: 'Minnesota State Capitol',
  travelMode: 'walking',
  ...DETOUR,
  narration: [
    { text: 'The Minnesota State Capitol sits under a great white marble dome, with a team of golden horses over the front steps.' },
    { text: 'Walk up the steps and turn around. The view runs straight back toward downtown and the cathedral on its hill.' },
    BACK_TO_ROUTE,
  ],
}

const hillHouse = {
  id: 'jamesJHillHouse',
  name: 'James J. Hill House',
  photo: hillHousePhoto,
  photoAlt: 'The James J. Hill House, a huge red sandstone mansion with steep slate roofs, on a green lawn',
  memory: 'The railroad builder’s mansion.',
  mapPlace: 'James J. Hill House',
  travelMode: 'walking',
  ...BUILD,
  detours: [capitol],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'This is the house of James J. Hill, the man who built the railroad across the northern states to the Pacific. It’s enormous, built of dark red stone, and it was made to impress.' },
    { text: 'Walk all the way around it. Out the back, the land drops away, and you can see over the river valley below.' },
    { text: 'The State Capitol is a short walk away, if you’d like a detour. Otherwise, the cathedral is right next door.' },
  ],
}

const cathedral = {
  id: 'cathedralOfSaintPaul',
  name: 'Cathedral of Saint Paul',
  photo: cathedralPhoto,
  photoAlt: 'The Cathedral of Saint Paul, a huge pale granite church with a great copper dome, against a clear blue sky',
  memory: 'Under the great dome.',
  mapPlace: 'Cathedral of Saint Paul',
  travelMode: 'walking',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'The Cathedral of Saint Paul crowns the hill at the end of Summit Avenue. You’ve been walking toward its dome all day.' },
    { text: 'Climb the steps and go inside, if the doors are open. Stand under the dome and look up. It’s much bigger in here than it looks from the street.' },
    PEAK_CLOSE,
  ],
}

const ricePark = {
  id: 'ricePark',
  name: 'Rice Park',
  photo: riceParkPhoto,
  photoAlt: 'Rice Park, a paved square with a fountain, in front of the Landmark Center’s turrets and clock tower',
  memory: 'The evening in Rice Park.',
  mapPlace: 'Rice Park, St. Paul, MN',
  travelMode: 'walking',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. Head down the hill into downtown, to Rice Park, a small square ringed by grand old buildings.' },
    { text: 'The castle-like one with the clock tower is the Landmark Center. Sit by the fountain and watch the square as the evening comes in.' },
    DINNER,
  ],
}

export default {
  id: 'stPaul',
  aiMade: true,
  name: 'Up on Summit Avenue',
  location: 'ST. PAUL · MINNESOTA, USA',
  photo: cathedralPhoto,
  photoAlt: cathedral.photoAlt,
  blurb: 'Along an avenue of grand old mansions, past the railroad builder’s house, to the great cathedral on the hill.',
  tagline: TAGLINE,
  time: '~4 hours',
  walking: 'Easy walking',
  stops: '~5 stops',
  departure: grandAvenue,
  discovery: summitAvenue,
  build: hillHouse,
  peak: cathedral,
  afterglow: ricePark,
  startArea: 'St. Paul, Minnesota, USA',
  startNote: START_NOTE,
  match: { moods: ['Cultural', 'Curious', 'Romantic'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 4, effort: 'Easy' },
  why: [
    'St. Paul is the older, quieter of the Twin Cities, and Summit Avenue is where it shows off. This journey is a long, easy walk past one grand house after another, all the way to the biggest of them, and to the cathedral that’s been in view the whole time.',
  ],
  route: [grandAvenue, summitAvenue, hillHouse, cathedral, ricePark],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was St. Paul, from the shops on Grand to the dome on the hill. Whatever you took from the day, it’s yours now.',
    summary: 'You started on Grand Avenue, walked past the mansions of Summit Avenue, circled the James J. Hill House, stood under the dome of the Cathedral of Saint Paul, and finished in Rice Park.',
  },
}
