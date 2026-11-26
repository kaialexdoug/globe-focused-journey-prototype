// The Pink Shore and the Sunset Side (Harbour Island, the Bahamas): an
// afternoon into evening for a couple, made to the Journey Engine V2 handoff
// (the Bahamas: one of two, chosen for a couple and a romantic mood).
//
// Its peak, chosen first: sunset over the harbour, from a dock on the
// island's quiet west side, after an afternoon on three miles of pink sand on
// its Atlantic side. The thread is the island's two shores: the harbour side,
// where the boats and the town are, and the ocean side, where the sand is
// pink, crossed and crossed back in a day.
//
// Primary mood: Romantic. Audience: a couple. On foot, about 4.7 km in all,
// on flat lanes and sand.
//
// Exact spots from OpenStreetMap and geotagged Commons photos; walks from
// Google's Routes API (November 2026). Checked in November 2026 against The
// Bahamas' tourism site (Dunmore Town, Bay Street and the golf carts, Pink
// Sand Beach's length and width, St John's Anglican Church), Wikipedia (the
// town's name and Lord Dunmore, the pink foraminifera, the population and
// the water taxi). Dunmore Town's lanes have no licensed photo yet, so that
// stop shows the "no image available" placeholder.

import heroPhoto from '../assets/journey/harbour-island/hero.jpg'
import harbourPhoto from '../assets/journey/harbour-island/harbour.jpg'
import pinkSandsPhoto from '../assets/journey/harbour-island/pink-sands.jpg'
import sunsetDockPhoto from '../assets/journey/harbour-island/sunset-dock.jpg'
import bayStreetPhoto from '../assets/journey/harbour-island/bay-street.jpg'
import noImage from '../assets/journey/no-image.svg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE, DINNER } from './parts.js'

const harbourFront = {
  id: 'harbourFront',
  name: 'The Harbour',
  photo: harbourPhoto,
  photoAlt: 'A wooden dock and gazebo on the calm harbour of Harbour Island',
  memory: 'The quiet side, where the boats come in.',
  mapPlace: 'Bay Street waterfront, Dunmore Town, Harbour Island',
  mapPoint: { lat: 25.50326, lng: -76.63944 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [10, 15],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Welcome to Briland, as the people who live here call Harbour Island.' },
    { kind: 'heading', text: 'An island with two shores' },
    { text: 'Harbour Island is small enough to drive round in twenty minutes in a golf cart, which is how most people get about. This side faces west, across a calm harbour to Eleuthera: it’s where the boats come in and where the only town is. The other side faces the open Atlantic, and its sand is pink.' },
    { kind: 'heading', text: 'Today' },
    { text: 'You’re going to cross the island to the pink shore for the afternoon, then come back to this side as the sun goes down over the harbour.' },
    { kind: 'find', text: 'Look along the waterfront and each choose the boat you’d sail away in together.' },
    { className: 'narrationClose', text: 'Walk up into Dunmore Town to St John’s Anglican Church, about 10 minutes. Tap “I’m Here” at its gate.' },
  ],
}

const dunmoreTown = {
  id: 'dunmoreTown',
  name: 'Dunmore Town',
  photo: noImage,
  photoAlt: 'No photo yet of Dunmore Town',
  memory: 'A governor’s summer town.',
  mapPlace: 'St John’s Anglican Church, Dunmore Town, Harbour Island',
  mapPoint: { lat: 25.50009, lng: -76.63589 },
  travelMode: 'walking',
  distanceMeters: 592,
  travelMinutes: 9,
  effort: { level: 'easy', note: 'Flat, up from the waterfront into the lanes' },
  stayMinutes: [20, 30],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'A governor’s summer town' },
    { text: 'Dunmore Town is named for Lord Dunmore, governor of the Bahamas at the end of the 1700s, who kept a summer house on Harbour Island. Its narrow lanes of clapboard cottages and picket fences look more like New England than the Caribbean. Fewer than two thousand people live on the whole island.' },
    { kind: 'heading', text: 'St John’s' },
    { text: 'The Bahamas’ tourism office calls St John’s Anglican Church the oldest religious foundation in the Bahamas, dating back to 1768. The church you see has been rebuilt since, but there’s been a church of St John here for more than 250 years.' },
    { kind: 'find', text: 'Wander the lanes behind Bay Street and choose the cottage you’d live in together.' },
    { className: 'narrationClose', text: 'Now cross the island to the Atlantic side, about 10 minutes. Tap “I’m Here” on the pink sand.' },
  ],
}

const pinkSands = {
  id: 'pinkSands',
  name: 'Pink Sands Beach',
  photo: pinkSandsPhoto,
  photoAlt: 'A thatched shade and soft pale-pink sand on Pink Sands Beach',
  memory: 'The pink shore.',
  mapPlace: 'Pink Sands Beach, Harbour Island',
  mapPoint: { lat: 25.49808, lng: -76.63169 },
  travelMode: 'walking',
  distanceMeters: 643,
  travelMinutes: 9,
  effort: { level: 'easy', note: 'Flat, across the island' },
  stayMinutes: [60, 150],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'Three miles of pink' },
    { text: 'Pink Sands Beach runs for more than three miles down the island’s Atlantic side, 50 to 100 feet wide. It isn’t a trick of the light. The colour comes from foraminifera, tiny sea creatures with reddish-pink shells that live on the reef. The waves break their shells into fragments and mix them into the white sand.' },
    { kind: 'heading', text: 'The afternoon' },
    { text: 'There’s nothing to do here but walk, swim and lie in the sun. Take your time: the sunset is on the other side of the island, so you’ve got all afternoon.' },
    { kind: 'find', text: 'At the water’s edge, scoop up a handful of wet sand and look closely for the tiny pink pieces.' },
    { className: 'narrationClose', text: 'In the late afternoon, walk back across the island and south along the harbour, about 15 minutes. Tap “I’m Here” at the dock.' },
  ],
}

const sunsetDock = {
  id: 'sunsetDock',
  name: 'The Sunset Side',
  photo: sunsetDockPhoto,
  photoAlt: 'The sun setting over the harbour beyond a wooden dock on Harbour Island',
  memory: 'Sunset over the harbour.',
  mapPlace: 'Waterfront near Romora Bay, Dunmore Town, Harbour Island',
  mapPoint: { lat: 25.49233, lng: -76.63582 },
  travelMode: 'walking',
  distanceMeters: 1116,
  travelMinutes: 15,
  effort: { level: 'easy', note: 'Flat, back across the island and along the harbour' },
  stayMinutes: [30, 45],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The quiet side' },
    { text: 'You spent the afternoon facing the ocean. Now you’re back on the harbour side, facing west, and the sun goes down across the water toward Eleuthera. This is the side the island saves for the evening.' },
    { kind: 'find', text: 'Put your phones away and watch for the moment the sun touches the water. Don’t look away until it’s gone.' },
    PEAK_CLOSE,
  ],
}

const bayStreet = {
  id: 'bayStreet',
  name: 'Bay Street',
  photo: bayStreetPhoto,
  photoAlt: 'Small boats resting on the shallow bay off Bay Street',
  memory: 'Back along the water, after dark.',
  mapPlace: 'Bay Street, Dunmore Town, Harbour Island',
  mapPoint: { lat: 25.50443, lng: -76.63962 },
  travelMode: 'walking',
  distanceMeters: 1773,
  travelMinutes: 24,
  effort: { level: 'easy', note: 'Flat, north along the harbour' },
  stayMinutes: [60, 120],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Back along the water' },
    { text: 'Bay Street runs along the harbour, past the dock where you began. In the evening the golf carts slow down, the water goes dark, and the lights come on along the front.' },
    { kind: 'heading', text: 'Two shores in a day' },
    { text: 'You crossed the island and crossed back: the quiet harbour, the town, the pink shore, and the sunset side. Now there’s just dinner, and the walk home.' },
    { kind: 'find', text: 'Find a table where you can see the harbour.' },
    DINNER,
  ],
}

export default {
  id: 'harbourIsland',
  aiMade: true,
  name: 'The Pink Shore and the Sunset Side',
  location: 'DUNMORE TOWN · HARBOUR ISLAND, THE BAHAMAS',
  city: 'Dunmore Town',
  photo: heroPhoto,
  photoAlt: 'The sun setting over the harbour beyond a wooden dock on Harbour Island',
  blurb: 'A governor’s summer town, an afternoon on three miles of pink sand, and sunset over the harbour.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Scenic', 'Nature', 'Historical', 'Hidden Gems'],
  departure: harbourFront,
  discovery: dunmoreTown,
  build: pinkSands,
  peak: sunsetDock,
  afterglow: bayStreet,
  startArea: 'Harbour Island, The Bahamas',
  startNote: START_NOTE,
  bestTime: {
    season: 'The cooler months, roughly November to May',
    seasonNote: 'Summer and early autumn are hotter, and are the Atlantic hurricane season.',
    timeOfDay: 'From early afternoon until after sunset',
    timeNote: 'The afternoon on the pink sand, and the harbour side for sunset.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Swimsuits, towels and plenty of sun protection.',
      'Sandals or bare feet: it’s sand and quiet lanes all the way.',
      'Cash for the water taxi.',
      'A light layer for the evening breeze.',
    ],
    costs: [
      'The beach, the town and the harbour are free.',
      { lead: 'Water taxi', text: 'A few dollars each way from North Eleuthera (a fare of about $5 has been reported): check on the day.' },
      { lead: 'Golf carts', text: 'For hire in Dunmore Town, if you’d rather ride than walk.' },
    ],
    getting: [
      'Fly to North Eleuthera, take a short taxi ride to the dock, then a water taxi across to Harbour Island, about 10 minutes. It lands at the Government Dock on Bay Street, a few minutes south of the start.',
      'It ends back on Bay Street, close to where you began.',
    ],
    access: [
      'Flat all the way, on lanes, a little road and soft sand.',
    ],
    restrictions: [
      'People live in Dunmore Town’s cottages: enjoy them from the lane.',
    ],
    tips: [
      'The pink shows best at the water’s edge, where the sand is wet, and in soft light.',
      'If you stay the night, walk back across to Pink Sands at sunrise: it faces east.',
    ],
  },
  match: {
    moods: { Peaceful: 80, Adventurous: 20, Romantic: 96, Curious: 45, Playful: 45, Cultural: 40 },
    with: { Solo: 50, Couple: 98, Family: 55, 'Friends / Group': 65 },
    preferences: {
      'Pet friendly': 40, 'Avoid alcohol': 60, 'More nature': 70, 'Food stops': 60,
      Coastal: 98, 'More urban': 25, 'Hiking involved': 5, 'Budget friendly': 40,
    },
  },
  description: [
    'Harbour Island has two shores. On one, a calm harbour where the boats come in and a little town of clapboard cottages named for an old governor. On the other, the open Atlantic and more than three miles of sand that really is pink.',
    'This is a day for two that crosses the island and comes back: an afternoon on the pink shore, then the harbour side again as the sun goes down over the water.',
  ],
  whyCool: {
    discovery: 'A beach that’s truly pink, from the shells of tiny sea creatures.',
    significance: 'Dunmore Town, a governor’s summer town, and a church foundation from 1768.',
    feeling: 'Slow and golden: sand, sea and a sunset, just the two of you.',
  },
  route: [harbourFront, dunmoreTown, pinkSands, sunsetDock, bayStreet],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Harbour Island, both of its shores.',
    summary: 'You started on the harbour, walked Dunmore Town’s lanes to St John’s, spent the afternoon on Pink Sands Beach, watched the sun set over the harbour, and walked back along Bay Street for dinner.',
  },
}
