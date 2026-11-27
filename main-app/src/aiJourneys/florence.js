// Up the Hill to Vespers (Florence, Italy): a cultural late afternoon for a
// couple, made to the Journey Engine V2 handoff (flagship destinations:
// anywhere in Italy).
//
// Why Florence: of all Italy's cities, it's the one where a single walk can
// take you from the Renaissance's greatest dome, across its oldest bridge,
// up through a rose garden to a thousand-year-old church where monks still
// sing at dusk. Its peak, chosen first: Gregorian chant at vespers in San
// Miniato al Monte, above the city. The thread is the city seen from ever
// higher, and the oldest things in it still being used.
//
// Primary mood: Cultural. Audience: a couple. On foot, about 3.4 km, the
// last part uphill.
//
// Exact spots from OpenStreetMap; walks from Google's Routes API (November
// 2026). Checked in November 2026 against visitor guides to San Miniato al
// Monte (free entry, the monks, the chant's varying times) and well-
// documented history of the cathedral, the Ponte Vecchio and the Piazzale.
// See JOURNEY_ENGINE_LOG.md.

import heroPhoto from '../assets/journey/florence/hero.jpg'
import duomoPhoto from '../assets/journey/florence/duomo.jpg'
import pontePhoto from '../assets/journey/florence/ponte-vecchio.jpg'
import rosesPhoto from '../assets/journey/florence/roses.jpg'
import sanMiniatoPhoto from '../assets/journey/florence/san-miniato.jpg'
import piazzalePhoto from '../assets/journey/florence/piazzale.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE, DINNER } from './parts.js'

const duomo = {
  id: 'duomo',
  name: 'The Duomo',
  photo: duomoPhoto,
  photoAlt: 'Brunelleschi’s red-tiled dome rising over the rooftops of Florence',
  memory: 'The dome that began a new age.',
  mapPlace: 'Cattedrale di Santa Maria del Fiore, Piazza del Duomo, Florence',
  mapPoint: { lat: 43.7731, lng: 11.25657 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [20, 30],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Start by looking up. Then, this afternoon, you’ll keep climbing until you’re looking down on it.' },
    { kind: 'heading', text: 'A dome nobody knew how to build' },
    { text: 'For decades the cathedral stood with a hole where its dome should be, because no one knew how to span it. Filippo Brunelleschi found a way, building it without the usual wooden scaffolding, and it was finished in the 1430s. It became a symbol of the Renaissance itself.' },
    { kind: 'find', text: 'Walk round to see the dome from a few sides, and find the small lantern at its very top.' },
    { className: 'narrationClose', text: 'Now south through the old centre, past Piazza della Signoria, to the river, about 10 minutes. Tap “I’m Here” on the Ponte Vecchio.' },
  ],
}

const ponteVecchio = {
  id: 'ponteVecchio',
  name: 'Ponte Vecchio',
  photo: pontePhoto,
  photoAlt: 'The Ponte Vecchio lit up at dusk, its shops reflected in the Arno',
  memory: 'The bridge that was spared.',
  mapPlace: 'Ponte Vecchio, Florence',
  mapPoint: { lat: 43.76803, lng: 11.25316 },
  travelMode: 'walking',
  distanceMeters: 728,
  travelMinutes: 10,
  effort: { level: 'easy', note: 'Flat, through the old centre' },
  stayMinutes: [15, 25],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Gold instead of meat' },
    { text: 'The “old bridge” has carried shops for centuries. They were once butchers’; in 1593 Grand Duke Ferdinando I moved them out and let goldsmiths in, and jewellers line it still. Above the shops runs the Vasari Corridor, built so the Medici could cross the river without mixing with the crowd.' },
    { kind: 'heading', text: 'The one they didn’t blow up' },
    { text: 'In 1944 retreating German forces destroyed Florence’s other bridges over the Arno. The Ponte Vecchio was the one they spared.' },
    { kind: 'find', text: 'Find the gap in the middle of the bridge where the shops open onto the river, and look both ways along the Arno.' },
    { className: 'narrationClose', text: 'Cross to the Oltrarno and climb to the Rose Garden, about 20 minutes, uphill at the end. Tap “I’m Here” at its gate.' },
  ],
}

const roses = {
  id: 'roseGarden',
  name: 'The Rose Garden',
  photo: rosesPhoto,
  photoAlt: 'A view over Florence’s rooftops and the dome from the terraces of the Rose Garden',
  memory: 'The city at your feet.',
  mapPlace: 'Giardino delle Rose, Viale Giuseppe Poggi, Florence',
  mapPoint: { lat: 43.76299, lng: 11.26295 },
  travelMode: 'walking',
  distanceMeters: 1299,
  travelMinutes: 19,
  effort: { level: 'moderate', note: 'Across the river, then uphill' },
  stayMinutes: [20, 30],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'A quiet garden on the hill' },
    { text: 'The Rose Garden climbs the slope below Piazzale Michelangelo in terraces, with hundreds of kinds of roses and a view straight across the rooftops to the dome you stood under an hour ago. It’s free, and much quieter than the square above it.' },
    { kind: 'find', text: 'Find a bench that looks straight at the dome, and sit for a while.' },
    { className: 'narrationClose', text: 'Now the last climb, up the steps past the Piazzale to San Miniato, about 15 minutes. Tap “I’m Here” at the top of the church steps.' },
  ],
}

const sanMiniato = {
  id: 'sanMiniato',
  name: 'San Miniato al Monte',
  photo: sanMiniatoPhoto,
  photoAlt: 'The green and white marble facade of San Miniato al Monte',
  memory: 'Monks singing at dusk.',
  mapPlace: 'Basilica di San Miniato al Monte, Florence',
  mapPoint: { lat: 43.75943, lng: 11.26514 },
  travelMode: 'walking',
  distanceMeters: 691,
  travelMinutes: 13,
  effort: { level: 'moderate', note: 'Uphill, with steps' },
  stayMinutes: [45, 60],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'A thousand years on the hill' },
    { text: 'San Miniato al Monte, begun in the early 1000s, is one of the finest Romanesque churches in Italy, its facade striped in green and white marble. It was here long before the dome you started under.' },
    { kind: 'heading', text: 'Vespers' },
    { text: 'The monks who live here still sing the evening office of vespers in Gregorian chant, most evenings, around 5:30 or 6 PM. Entry is free. Sit at the back, and let it wash over you.' },
    { kind: 'find', text: 'Before the chant begins, step outside onto the church steps and find the dome again, far below now.' },
    PEAK_CLOSE,
  ],
}

const piazzale = {
  id: 'piazzale',
  name: 'Piazzale Michelangelo',
  photo: piazzalePhoto,
  photoAlt: 'Florence and the Ponte Vecchio at sunset from Piazzale Michelangelo',
  memory: 'The lights of Florence.',
  mapPlace: 'Piazzale Michelangelo, Florence',
  mapPoint: { lat: 43.76283, lng: 11.26499 },
  travelMode: 'walking',
  distanceMeters: 667,
  travelMinutes: 10,
  effort: { level: 'easy', note: 'Back down the steps' },
  stayMinutes: [30, 45],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The whole city' },
    { text: 'From the great terrace below San Miniato, all of Florence lies across the river: the dome, the bell towers, and the Ponte Vecchio you crossed this afternoon. As the lights come on, you can trace the whole walk.' },
    { kind: 'find', text: 'Find the Ponte Vecchio, then the dome, and trace your way between them.' },
    DINNER,
  ],
}

export default {
  id: 'florence',
  aiMade: true,
  name: 'Up the Hill to Vespers',
  location: 'FLORENCE · TUSCANY, ITALY',
  city: 'Florence',
  photo: heroPhoto,
  photoAlt: 'Florence Cathedral and its dome seen across the city from Piazzale Michelangelo',
  blurb: 'Brunelleschi’s dome, the bridge that was spared, a rose garden, and monks singing at dusk above the city.',
  walking: 'Some climbing',
  stops: '~5 stops',
  difficulty: 'Moderate',
  experienceLevel: 'standoutJourney',
  experiences: ['Cultural', 'Historical', 'Scenic'],
  departure: duomo,
  discovery: ponteVecchio,
  build: roses,
  peak: sanMiniato,
  afterglow: piazzale,
  startArea: 'Florence, Tuscany, Italy',
  startNote: START_NOTE,
  bestTime: {
    season: 'April to October',
    seasonNote: 'The Rose Garden is at its best in May.',
    timeOfDay: 'Late afternoon',
    timeNote: 'Time it to reach San Miniato for vespers, then the Piazzale as the lights come on.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Comfortable shoes for the climb.',
      'Shoulders and knees covered for the churches.',
      'Water: it’s a steep last stretch.',
    ],
    costs: [
      'The walk, the Rose Garden, San Miniato and the Piazzale are all free.',
      'Climbing the cathedral dome or going into its museums needs a ticket.',
    ],
    getting: [
      'Start in Piazza del Duomo. It ends at Piazzale Michelangelo, a walk of about 20 minutes back down to the river, or take the bus.',
    ],
    access: [
      'Flat in the centre, then a steep climb with steps from the river to San Miniato.',
    ],
    restrictions: [
      { lead: 'Vespers', text: 'The chant’s time varies by season and day (sources give 5:30 to 6:30 PM): check at the church.' },
      'San Miniato is a working monastery church: keep quiet during services.',
      'The Rose Garden’s opening hours change with the season, and it closes in the evening: check before you go.',
    ],
    tips: [
      'If you want to see the dome from inside, book a ticket for the climb well ahead.',
    ],
  },
  match: {
    moods: { Peaceful: 70, Adventurous: 30, Romantic: 90, Curious: 70, Playful: 20, Cultural: 98 },
    with: { Solo: 80, Couple: 95, Family: 45, 'Friends / Group': 60 },
    preferences: {
      'Pet friendly': 20, 'Avoid alcohol': 80, 'More nature': 40, 'Food stops': 40,
      Coastal: 0, 'More urban': 75, 'Hiking involved': 30, 'Budget friendly': 95,
    },
  },
  description: [
    'Florence is where the Renaissance began, and it’s small enough to see whole from the hill across the river. This walk climbs toward that view, through some of the oldest and most beautiful things in the city.',
    'It starts under Brunelleschi’s dome, crosses the Ponte Vecchio, climbs through the Rose Garden to San Miniato al Monte to hear the monks sing vespers, and ends on Piazzale Michelangelo as the city lights up.',
  ],
  whyCool: {
    discovery: 'Monks singing Gregorian chant at dusk in a thousand-year-old church, for free.',
    significance: 'The Renaissance’s greatest dome, and the only Florentine bridge spared in 1944.',
    feeling: 'Quiet and moving: the city slowly falling away below you as the bells and the chant begin.',
  },
  route: [duomo, ponteVecchio, roses, sanMiniato, piazzale],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Florence, from under the dome to above it.',
    summary: 'You started beneath Brunelleschi’s dome, crossed the Ponte Vecchio, climbed through the Rose Garden, heard the monks of San Miniato sing vespers, and watched the city light up from Piazzale Michelangelo.',
  },
}
