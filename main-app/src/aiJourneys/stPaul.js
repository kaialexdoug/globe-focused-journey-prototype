// Up on Summit Avenue (St. Paul, Minnesota), built the same way as the
// Waseda journey (testJourney.js). Every stop has its exact spot (`mapPoint`,
// from Wikipedia and OpenStreetMap), so it gets the live map, and the walk to
// it from the stop before: how far (`distanceMeters`), how long
// (`travelMinutes`) and how hard (`effort`), from Google's walking routes and
// the heights along them (Open-Meteo), worked out once, in November 2026.
//
// The narration tells one story from stop to stop: a river town called Pig's
// Eye that took the name of a log chapel instead, the young novelist and the
// railroad baron who lived on its grandest street, and the great cathedral
// that carries the chapel's name. The history was checked against published
// sources (Wikipedia) in November 2026. Stories that are only legends say so.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import grandAvenuePhoto from '../assets/journey/st-paul/grand-avenue.jpg'
import summitAvenuePhoto from '../assets/journey/st-paul/summit-avenue.jpg'
import hillHousePhoto from '../assets/journey/st-paul/hill-house.jpg'
import capitolPhoto from '../assets/journey/st-paul/capitol.jpg'
import cathedralPhoto from '../assets/journey/st-paul/cathedral.jpg'
import riceParkPhoto from '../assets/journey/st-paul/rice-park.jpg'

// The spots near the stops.
import landmarkCenterPhoto from '../assets/journey/st-paul/landmark-center.jpg'
import mickeysDinerPhoto from '../assets/journey/st-paul/mickeys-diner.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const grandAvenue = {
  id: 'grandAvenue',
  name: 'Grand Avenue',
  photo: grandAvenuePhoto,
  photoAlt: 'A bakery on Grand Avenue with a dark blue awning, and someone stopping to read the sign outside',
  memory: 'Where the day began.',
  mapPlace: 'Grand Avenue and Victoria Street, St. Paul, MN',
  mapPoint: { lat: 44.93997, lng: -93.13647 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [30, 45],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in St. Paul.' },
    { kind: 'heading', text: 'Pig’s Eye' },
    { text: 'In the early 1840s, the little settlement down on the river went by the name of Pig’s Eye, after the tavern of Pierre “Pig’s Eye” Parrant, a fur trader turned bootlegger.' },
    { kind: 'heading', text: 'A chapel’s name' },
    { text: 'Then, in 1841, a Catholic missionary, Father Lucien Galtier, built a small log chapel nearby and named it for St. Paul. The name caught on, first for the chapel and then for the whole town. At the end of this walk, you’ll meet that little chapel’s grandest successor.' },
    { kind: 'find', text: 'Grand Avenue is mostly shops in old houses. Find one with a front porch that’s now somewhere to sit with a coffee.' },
    { className: 'narrationClose', text: 'Get that coffee, then head one block north to Summit Avenue. The first stop is a row house near the corner of Dale Street, about fifteen minutes on foot.' },
  ],
}

const summitAvenue = {
  id: 'summitAvenue',
  name: 'Summit Avenue',
  photo: summitAvenuePhoto,
  photoAlt: 'A grand limestone mansion on Summit Avenue, with a long path leading up to its arched front door',
  memory: 'Walking past the mansions on Summit Avenue.',
  // Where the walk along it starts: F. Scott Fitzgerald's house.
  mapPlace: '599 Summit Avenue, St. Paul, MN',
  mapPoint: { lat: 44.9414288, lng: -93.1253322 },
  travelMode: 'walking',
  distanceMeters: 1029,
  travelMinutes: 14,
  effort: { level: 'easy', note: 'Flat, along Grand Avenue and up a side street' },
  stayMinutes: [30, 45],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The young novelist' },
    { text: 'F. Scott Fitzgerald was born in St. Paul in 1896. His parents moved into this row house, 599 Summit Avenue, in 1918, and in July and August 1919 he rewrote the manuscript that became his first novel here: This Side of Paradise. Its success made his name, and won him Zelda.' },
    { kind: 'heading', text: 'The grandest street' },
    { text: 'Summit Avenue is where St. Paul’s richest families built their houses, along the top of the bluff. Walk east, and keep an eye on them: the biggest of all is waiting at the end.' },
    { kind: 'find', text: 'Count the front doors: this is a whole row of houses joined together, and 599 is just one of them.' },
    { className: 'narrationClose', text: 'Walk east along Summit, about twenty minutes, toward the dome in the distance.' },
  ],
}

const capitol = {
  id: 'stateCapitol',
  name: 'Minnesota State Capitol',
  mapName: 'State Capitol',
  photo: capitolPhoto,
  photoAlt: 'The Minnesota State Capitol, a white marble building with a great dome and golden horses over the entrance, under a deep blue sky',
  memory: 'Under the Capitol dome.',
  teaser: 'The white marble Capitol, with golden horses over its door. A walk from the Hill House.',
  mapPlace: 'Minnesota State Capitol',
  mapPoint: { lat: 44.95527778, lng: -93.10222222 },
  travelMode: 'walking',
  // From the Hill House. On to the cathedral after, it's 1,604 m, so taking
  // it adds 3,090 m of walking to going straight there.
  distanceMeters: 1748,
  travelMinutes: 24,
  extraMeters: 3090,
  effort: { level: 'easy', note: 'Downhill off the bluff, then flat to the Capitol' },
  stayMinutes: [30, 45],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'Forty-one other designs' },
    { text: 'The architect Cass Gilbert won the job over 41 other designs. Work began in 1896, the cornerstone was laid in 1898, and the Capitol was finished in 1905.' },
    { kind: 'heading', text: 'Progress of the State' },
    { text: 'The golden horses over the entrance pull a chariot called Progress of the State. Gilbert had seen one like it at the 1893 World’s Fair in Chicago, by the sculptors Daniel Chester French and Edward Clark Potter, and had them make one for Minnesota.' },
    { kind: 'find', text: 'Climb the steps and turn around. The view runs straight back toward downtown and the cathedral on its hill.' },
    BACK_TO_ROUTE,
  ],
}

const hillHouse = {
  id: 'jamesJHillHouse',
  name: 'James J. Hill House',
  mapName: 'Hill House',
  photo: hillHousePhoto,
  photoAlt: 'The James J. Hill House, a huge red sandstone mansion with steep slate roofs, on a green lawn',
  memory: 'The railroad builder’s mansion.',
  mapPlace: 'James J. Hill House',
  mapPoint: { lat: 44.945, lng: -93.10888889 },
  travelMode: 'walking',
  distanceMeters: 1461,
  travelMinutes: 20,
  effort: { level: 'easy', note: 'Flat, all the way along Summit Avenue' },
  stayMinutes: [45, 60],
  ...BUILD,
  detours: [capitol],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'The Empire Builder' },
    { text: 'James J. Hill was born in 1838 in what’s now Ontario, in Canada. He built the Great Northern Railway all the way from here to the Pacific, and people called him the Empire Builder. When he died in 1916, he was worth about $63 million.' },
    { kind: 'heading', text: 'A house to match' },
    { text: 'The house was finished in 1891, with 36,000 square feet of living space and rooms for the Hills’ five daughters. It even has a pipe organ, put in after someone pointed out to Hill that other rich men had them in their homes.' },
    { kind: 'find', text: 'Walk around to the back, where the land drops away, and look out over the river valley his railroads ran through.' },
    { className: 'narrationClose', text: 'The State Capitol is a walk away, if you’d like a detour. Otherwise, the cathedral is right next door.' },
  ],
}

const cathedral = {
  id: 'cathedralOfSaintPaul',
  name: 'Cathedral of Saint Paul',
  mapName: 'Cathedral',
  photo: cathedralPhoto,
  photoAlt: 'The Cathedral of Saint Paul, a huge pale granite church with a great copper dome, against a clear blue sky',
  memory: 'Under the great dome.',
  mapPlace: 'Cathedral of Saint Paul',
  mapPoint: { lat: 44.94694444, lng: -93.10888889 },
  travelMode: 'walking',
  distanceMeters: 262,
  travelMinutes: 4,
  effort: { level: 'easy', note: 'Next door, across the end of Summit Avenue' },
  stayMinutes: [30, 45],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The chapel, grown up' },
    { text: 'This is the fourth cathedral to carry the name of Father Galtier’s little log chapel. It opened in 1915, with its first Mass on Palm Sunday, and it’s the third-largest Catholic cathedral in the United States.' },
    { kind: 'heading', text: 'A World’s Fair architect' },
    { text: 'Archbishop John Ireland chose Emmanuel Masqueray, a French architect who had been chief architect of the 1904 World’s Fair in St. Louis. You’ve been walking toward his copper dome since Summit Avenue.' },
    { kind: 'find', text: 'Step inside, if the doors are open, stand under the dome and look straight up. It’s much bigger in here than it looks from the street.' },
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
  mapPoint: { lat: 44.94472222, lng: -93.09722222 },
  travelMode: 'walking',
  distanceMeters: 1237,
  travelMinutes: 19,
  effort: { level: 'easy', note: 'Downhill off Cathedral Hill into downtown' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Landmark Center',
      note: 'The old federal courthouse on the park, saved from demolition in the 1970s, now open to the public',
      meters: 104,
      photo: landmarkCenterPhoto,
      photoAlt: 'The Landmark Center’s turrets and clock tower, with the cathedral’s dome on the hill behind',
      mapPlace: 'Landmark Center, St. Paul, MN',
      mapPoint: { lat: 44.9456587, lng: -93.0971312 },
    },
    {
      name: 'Mickey’s Diner',
      note: 'A little diner made to look like a railroad dining car, built in 1937 and shipped here by train',
      meters: 311,
      photo: mickeysDinerPhoto,
      photoAlt: 'Mickey’s Diner, a long, narrow red and yellow diner like a railroad dining car',
      mapPlace: 'Mickey’s Diner, St. Paul, MN',
      mapPoint: { lat: 44.94744444, lng: -93.09813889 },
    },
  ],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'A gift from 1849' },
    { text: 'The park is named after Henry Mower Rice, a territorial senator who gave the land to the town in 1849, when St. Paul was still young. Around it stand the Landmark Center from 1902, the Saint Paul Hotel from 1910, the library from 1917, and the Ordway theater.' },
    { kind: 'heading', text: 'Gangsters on trial' },
    { text: 'The Landmark Center, with the turrets and clock tower, was once the federal courthouse. Members of the Barker-Karpis gang were tried there, and so was John Dillinger’s girlfriend, Evelyn Frechette. In the 1970s, local people saved it from being torn down.' },
    { kind: 'find', text: 'Find Snoopy and Charlie Brown among the Peanuts statues in the park. Their creator, Charles Schulz, grew up in St. Paul.' },
    DINNER,
  ],
}

export default {
  id: 'stPaul',
  aiMade: true,
  name: 'Up on Summit Avenue',
  location: 'ST. PAUL · MINNESOTA, USA',
  city: 'St. Paul',
  photo: cathedralPhoto,
  photoAlt: cathedral.photoAlt,
  blurb: 'Along an avenue of grand old mansions, to the great cathedral on the hill.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Historical', 'Cultural'],
  departure: grandAvenue,
  discovery: summitAvenue,
  build: hillHouse,
  peak: cathedral,
  afterglow: ricePark,
  startArea: 'St. Paul, Minnesota, USA',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Fall',
    seasonNote: 'For the fall colors under the old trees on Summit Avenue, in early to mid-October.',
    timeOfDay: 'During daylight hours',
  },
  match: {
    moods: { Peaceful: 55, Adventurous: 25, Romantic: 65, Curious: 80, Playful: 25, Cultural: 90 },
    with: { Solo: 85, Couple: 80, Family: 45, 'Friends / Group': 55 },
    preferences: {
      'Pet friendly': 35, 'Avoid alcohol': 75, 'More nature': 15, 'Food stops': 45,
      Coastal: 5, 'More urban': 85, 'Hiking involved': 5, 'Budget friendly': 80,
    },
  },
  description: [
    'St. Paul started out as a river landing nicknamed Pig’s Eye, after a bootlegger’s tavern, and took its name from a little log chapel instead. Up on the bluff above, the city’s richest built a street of mansions, and a young F. Scott Fitzgerald wrote his first novel in a row house along it.',
    'This journey walks the whole of Summit Avenue, from Fitzgerald’s door to the house of the railroad baron who built a line to the Pacific, and up to the great cathedral that carries the chapel’s name. Then it’s down the hill to a square where gangsters once stood trial.',
  ],
  route: [grandAvenue, summitAvenue, hillHouse, cathedral, ricePark],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was St. Paul, from the shops on Grand to the dome on the hill. Whatever you took from the day, it’s yours now.',
    summary: 'You started on Grand Avenue, walked past the mansions of Summit Avenue, circled the James J. Hill House, stood under the dome of the Cathedral of Saint Paul, and finished in Rice Park.',
  },
}
