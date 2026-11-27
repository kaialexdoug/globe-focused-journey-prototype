// The Beach They Waded For (Fort Lauderdale to Dania Beach): a cultural
// half-day for friends, made to the Journey Engine V2 handoff (Broward
// County, Florida).
//
// Its peak, chosen first: the beach at Dr. Von D. Mizell-Eula Johnson State
// Park, Broward's last undeveloped stretch of coast, which was once its
// segregated "colored beach", reachable only by boat, and is now named for
// the two civil rights leaders who fought for it. The thread is the right to
// the beach: a petition in 1946, a wade-in on 4 July 1961, a man who ferried
// people across, and a court that sided with the protesters.
//
// Primary mood: Cultural. Audience: friends. By car (about 20 minutes
// between the two beaches, then along the park road), with walks on the sand.
//
// Exact spots from OpenStreetMap and geotagged Commons photos; drives from
// Google's Routes API (November 2026). Checked in November 2026 against
// Florida State Parks' own pages for the park (its history, the new names,
// hours, fees and current closures). The boat ramp has no licensed photo
// yet, so it shows the "no image available" placeholder.

import heroPhoto from '../assets/journey/wade-ins/hero.jpg'
import lasOlasBeachPhoto from '../assets/journey/wade-ins/las-olas-beach.jpg'
import parkSignPhoto from '../assets/journey/wade-ins/park-sign.jpg'
import parkBeachPhoto from '../assets/journey/wade-ins/park-beach.jpg'
import beachSouthPhoto from '../assets/journey/wade-ins/beach-south.jpg'
import noImage from '../assets/journey/no-image.svg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const lasOlasBeach = {
  id: 'lasOlasBeach',
  name: 'Las Olas Beach',
  photo: lasOlasBeachPhoto,
  photoAlt: 'Palms along the beach road at Las Olas Beach, Fort Lauderdale',
  memory: 'Where the wade-ins began.',
  mapPlace: 'Las Olas Beach, Fort Lauderdale, FL',
  mapPoint: { lat: 26.11868, lng: -80.1059 },
  travelMode: 'driving',
  travelMinutes: 0,
  stayMinutes: [15, 20],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Today this beach is for everyone. On 4 July 1961, it wasn’t.' },
    { kind: 'heading', text: 'A beach of their own' },
    { text: 'Black families in South Florida drove from as far as Palm Beach and Miami to reach Fort Lauderdale’s beaches, and met fierce resistance. In 1946 Dr. Von D. Mizell, founding president of the Broward NAACP, petitioned the county for a public beach. In 1954 the county finally set aside a barrier island to the south, segregated, and promised to make it reachable. Years went by, and no road was built.' },
    { kind: 'heading', text: 'The wade-in' },
    { text: 'So on 4 July 1961, Dr. Mizell, NAACP chapter president Eula Johnson and a small group came here, to the whites-only beach near Las Olas Boulevard, and walked into the sea. It was the first of a series of wade-ins that made national news.' },
    { kind: 'find', text: 'Walk down to the water’s edge and stand where they stood.' },
    { className: 'narrationClose', text: 'Now drive south to the beach they were promised, about 20 minutes. Tap “I’m Here” at the park entrance.' },
  ],
}

const parkEntrance = {
  id: 'parkEntrance',
  name: 'Dr. Von D. Mizell-Eula Johnson State Park',
  mapName: 'The park entrance',
  photo: parkSignPhoto,
  photoAlt: 'The sign at the entrance to Dr. Von D. Mizell-Eula Johnson State Park',
  memory: 'The beach with no road.',
  mapPlace: 'Dr. Von D. Mizell-Eula Johnson State Park, 6503 N Ocean Dr, Dania Beach, FL',
  mapPoint: { lat: 26.05254, lng: -80.11428 },
  travelMode: 'driving',
  distanceMeters: 13924,
  travelMinutes: 20,
  effort: { level: 'easy', note: 'A drive south, past Port Everglades' },
  stayMinutes: [10, 15],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The “colored beach”' },
    { text: 'This was it. In 1951 the county attorney, John U. Lloyd, found this site for a beach for Black residents, and for decades the park carried his name. But with no road, the only way to reach it was by water.' },
    { kind: 'heading', text: 'New names' },
    { text: 'In 2016 Florida renamed the park for Dr. Mizell and Eula Johnson, and named its pavilions and boat ramp for others who fought for this coast and this county.' },
    { kind: 'find', text: 'Read the names on the park sign, and keep an eye out for the historical markers inside the park.' },
    { className: 'narrationClose', text: 'Drive north along the park road to the boat ramp, about 8 minutes. Tap “I’m Here” at the ramp.' },
  ],
}

const boatRamp = {
  id: 'gilesBoatRamp',
  name: 'Alphonso Giles Boat Ramp',
  mapName: 'The boat ramp',
  photo: noImage,
  photoAlt: 'No photo yet of the Alphonso Giles Boat Ramp',
  memory: 'The man who ferried people to the beach.',
  mapPlace: 'Boat ramp, Dr. Von D. Mizell-Eula Johnson State Park, Dania Beach, FL',
  mapPoint: { lat: 26.0813, lng: -80.11262 },
  travelMode: 'driving',
  distanceMeters: 5261,
  travelMinutes: 8,
  effort: { level: 'easy', note: 'North along the park road' },
  stayMinutes: [10, 15],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'By boat' },
    { text: 'When the road was delayed year after year, Alphonso Giles took people to the beach in his own boat. He and his boating club, the Jolly Anglers, won a dock for Black residents to use here, and he became the first Black member of Broward County’s Marine Advisory Board. This ramp is named for him.' },
    { kind: 'heading', text: 'Into the courts' },
    { text: 'In July 1962 the city of Fort Lauderdale asked a court to stop the wade-ins. The court ruled for the protesters, and their win helped launch a wider movement that soon integrated the county’s schools. Another name in this park, the lawyer W. George Allen, filed those school cases.' },
    { kind: 'find', text: 'Look across the water and imagine arriving here the only way you could: by boat.' },
    { className: 'narrationClose', text: 'Now back south to the beach, a couple of minutes by car. Use one of the open beach accesses, and tap “I’m Here” on the sand.' },
  ],
}

const parkBeach = {
  id: 'parkBeach',
  name: 'The Beach',
  photo: parkBeachPhoto,
  photoAlt: 'Sea oats and dunes above the beach at the state park in Dania Beach',
  memory: 'A beach for everyone.',
  mapPlace: 'Beach, Dr. Von D. Mizell-Eula Johnson State Park, Dania Beach, FL',
  mapPoint: { lat: 26.07, lng: -80.1085 },
  travelMode: 'driving',
  distanceMeters: 1284,
  travelMinutes: 2,
  effort: { level: 'easy', note: 'A short drive, then a walk over the dune to the sand' },
  stayMinutes: [45, 90],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The last wild beach in Broward' },
    { text: 'Because it was set aside and then forgotten, this became the last undeveloped stretch of coast in Broward County: dunes, sea oats and hardwood hammock instead of towers. A beach that was once all some people were allowed is now one everybody comes to.' },
    { kind: 'find', text: 'Walk into the water up to your knees, the way Eula Johnson and Dr. Mizell did on Las Olas Beach.' },
    PEAK_CLOSE,
  ],
}

const beachSouth = {
  id: 'beachSouth',
  name: 'Along the Shore',
  photo: beachSouthPhoto,
  photoAlt: 'The long, empty beach at the state park, looking south',
  memory: 'The barefoot mail route.',
  mapPlace: 'Beach, Dr. Von D. Mizell-Eula Johnson State Park, Dania Beach, FL',
  mapPoint: { lat: 26.06, lng: -80.1095 },
  travelMode: 'walking',
  distanceMeters: 1104,
  travelMinutes: 15,
  effort: { level: 'easy', note: 'South along the sand' },
  stayMinutes: [20, 40],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'An older walk' },
    { text: 'In the late 1800s, before any road, the mail from Palm Beach to Miami was carried on foot along this coast: 68 miles, barefoot on the hard sand at the water’s edge. This beach was part of the barefoot mailmen’s route. A shore people have always walked, and that everyone can walk now.' },
    { kind: 'find', text: 'Walk south along the water’s edge, barefoot, for as long as you like.' },
    { className: 'narrationClose', text: 'That’s the end. The park closes at sunset.' },
  ],
}

export default {
  id: 'wadeIns',
  aiMade: true,
  name: 'The Beach They Waded For',
  location: 'DANIA BEACH · FLORIDA, USA',
  city: 'Dania Beach',
  photo: heroPhoto,
  photoAlt: 'Sea oats and dunes above the beach at Dr. Von D. Mizell-Eula Johnson State Park',
  blurb: 'A wade-in on the Fourth of July, a beach you could only reach by boat, and the leaders it’s named for.',
  walking: 'Walk + drive',
  stops: '~5 stops',
  difficulty: 'Easy',
  experienceLevel: 'localDiscovery',
  experiences: ['Historical', 'Cultural', 'Nature', 'Hidden Gems'],
  departure: lasOlasBeach,
  discovery: parkEntrance,
  build: boatRamp,
  peak: parkBeach,
  afterglow: beachSouth,
  startArea: 'Fort Lauderdale, Florida, USA',
  startNote: START_NOTE,
  bestTime: {
    season: 'Any time of year',
    seasonNote: 'Cooler and drier from November to April. The Fourth of July is the wade-ins’ anniversary.',
    timeOfDay: 'From mid-morning',
    timeNote: 'With time on the park’s beach before it closes at sunset.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'A car: the two beaches are about 14 km apart.',
      'Swimsuits, towels, water and sun protection.',
      'Binoculars: the park is on the Great Florida Birding Trail.',
    ],
    costs: [
      { lead: 'The state park', text: '$6 per car (up to eight people), $4 for one person in a car, $2 on foot or by bike.' },
      'Las Olas Beach is free; parking is paid.',
    ],
    getting: [
      'Start at Las Olas Beach in Fort Lauderdale, then drive south past Port Everglades to the park entrance at 6503 North Ocean Drive, Dania Beach.',
      'Inside the park, a 2.5-mile road runs north to the inlet.',
    ],
    access: [
      'The beach is reached over the dunes on walkways; the sand is soft.',
    ],
    restrictions: [
      { lead: 'Hours', text: 'The park is open 8 AM to sunset every day.' },
      { lead: 'Closures (October 2026)', text: 'Because of erosion, beach access from Parking Lot 5 and the Jetty parking lot are closed, as are restrooms 3 and 4 and beach access from lot 3. Follow the posted signs and use the accesses that are open.' },
    ],
    tips: [
      'Look for the historical markers about the “colored beach” in the park.',
    ],
  },
  match: {
    moods: { Peaceful: 65, Adventurous: 25, Romantic: 40, Curious: 85, Playful: 35, Cultural: 95 },
    with: { Solo: 75, Couple: 75, Family: 70, 'Friends / Group': 88 },
    preferences: {
      'Pet friendly': 20, 'Avoid alcohol': 95, 'More nature': 80, 'Food stops': 5,
      Coastal: 95, 'More urban': 20, 'Hiking involved': 10, 'Budget friendly': 90,
    },
  },
  description: [
    'For years Broward County’s beaches were closed to Black residents. Their leaders petitioned for a beach of their own and were given a barrier island with no road to it. So on the Fourth of July 1961 they waded into the sea at Fort Lauderdale’s whites-only beach.',
    'This half-day follows that story from the wade-in beach to the one they were promised, now a state park named for them, with the boat ramp named for the man who ferried people across, and ends on Broward’s last wild stretch of shore.',
  ],
  whyCool: {
    discovery: 'A beach you could once reach only by boat, now named for the people who fought for it.',
    significance: 'The 1961 Fort Lauderdale wade-ins, and Florida’s park named for Dr. Von D. Mizell and Eula Johnson.',
    feeling: 'Moving and freeing: standing in the sea where people once weren’t allowed to.',
  },
  route: [lasOlasBeach, parkEntrance, boatRamp, parkBeach, beachSouth],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was the beach they waded for.',
    summary: 'You stood where the 1961 wade-in began on Las Olas Beach, drove to the beach that was promised, saw the ramp named for the man who ferried people to it, waded in on Broward’s last wild shore, and walked the barefoot mailmen’s sand.',
  },
}
