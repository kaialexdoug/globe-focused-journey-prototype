// The City That Spent Its Gold on Beauty (Kanazawa, Ishikawa): an afternoon
// into dusk for a couple, made to the Journey Engine V2 handoff (Japan,
// outside Tokyo: one of four, chosen for a couple and a cultural mood).
//
// Its peak, chosen first: Higashi Chaya, the old teahouse district, as the
// shops close and the lanterns come on along its latticed street, after an
// hour inside a geiko teahouse from 1820. The thread is the Maeda lords'
// wealth and what they did with it: the richest domain in Japan, which
// chose to spend on beauty rather than arms, so as not to worry the shogun.
// Their samurai's streets, a shrine to the first lord and his wife, their
// garden (and the legend of the "marsh of gold" the city is named for),
// the teahouses their merchants paid for, and the hill those merchants
// climbed at dusk.
//
// Primary mood: Cultural. Audience: a couple. On foot, about 3.7 km, mostly
// flat, with a gentle climb to Kenroku-en.
//
// Exact spots from OpenStreetMap; walks from Google's Routes API (November
// 2026); heights from GSI. Checked in November 2026 against the Japan
// Tourism Agency's multilingual descriptions (the Maeda family, Nagamachi,
// Oyama Shrine, Kenroku-en, Higashi Chaya, Kazuemachi, and Ishikawa's crafts
// and gold leaf), Ishikawa Prefecture's Kenroku-en page (hours, fees and
// early-morning entry), Kanazawa's tourism site (Shima's hours) and listings
// for the Nomura house and Shima's fees. See JOURNEY_ENGINE_LOG.md for
// what's uncertain.

import heroPhoto from '../assets/journey/kanazawa/hero.jpg'
import nagamachiPhoto from '../assets/journey/kanazawa/nagamachi.jpg'
import oyamaPhoto from '../assets/journey/kanazawa/oyama.jpg'
import kenrokuenPhoto from '../assets/journey/kanazawa/kenroku-en.jpg'
import higashiChayaPhoto from '../assets/journey/kanazawa/higashi-chaya.jpg'
import kazuemachiPhoto from '../assets/journey/kanazawa/kazuemachi.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE, DINNER } from './parts.js'

const nagamachi = {
  id: 'nagamachi',
  name: 'Nagamachi',
  photo: nagamachiPhoto,
  photoAlt: 'A canal beside the stone-based earthen walls of the Nagamachi samurai district',
  memory: 'The samurai’s streets.',
  mapPlace: 'Nagamachi Samurai District, Kanazawa',
  mapPoint: { lat: 36.56399, lng: 136.64991 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [30, 45],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Welcome to Kanazawa, the city of the Maeda lords.' },
    { kind: 'heading', text: 'A million koku' },
    { text: 'From 1583 to 1869 the Maeda family ruled Kaga, the richest domain in Japan. Its official harvest was a million koku of rice, more than any other, and Kanazawa still says “hyakumangoku”, a million koku, with pride. The Maedas made all their samurai live here, and their houses took up nearly 70 percent of the city.' },
    { kind: 'heading', text: 'Earthen walls' },
    { text: 'Nagamachi is one of the few samurai quarters left: cobbled lanes, canals, and tiled earthen walls. Even samurai of middling rank could build fine houses here. When the domains ended in 1869 they lost their incomes, and most of the houses were sold or abandoned. The Nomura family’s house is open, with a small, much-praised garden.' },
    { kind: 'find', text: 'Stand on a bridge over the canal and look along the earthen walls. Nearly all of Kanazawa once looked like this.' },
    { className: 'narrationClose', text: 'Next, a shrine to the first Maeda lord and his wife, about 10 minutes east. Tap “I’m Here” at its gate.' },
  ],
}

const oyamaShrine = {
  id: 'oyamaShrine',
  name: 'Oyama Shrine',
  photo: oyamaPhoto,
  photoAlt: 'The three-storey gate of Oyama Shrine, with its arched base and glass-windowed top',
  memory: 'A lord and his wife, and stained glass on a shrine gate.',
  mapPlace: 'Oyama Shrine, Kanazawa',
  mapPoint: { lat: 36.56597, lng: 136.65548 },
  travelMode: 'walking',
  distanceMeters: 761,
  travelMinutes: 11,
  effort: { level: 'easy', note: 'Flat, through the city centre' },
  stayMinutes: [15, 20],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'A lord and his wife' },
    { text: 'Oyama Shrine honours Maeda Toshiie, the first lord of Kaga, and his wife Matsu. It was built in 1873, shortly after the law stopped forbidding shrines to anyone but the shogun.' },
    { kind: 'heading', text: 'A gate with stained glass' },
    { text: 'Its three-storey gate, finished in 1875, mixes Japanese and Chinese building with Western touches, like stained glass. It was a statement that Kanazawa still mattered, even after the lords were gone.' },
    { kind: 'find', text: 'Look up at the top of the gate and find the stained glass.' },
    { className: 'narrationClose', text: 'Now through the castle park to Kenroku-en, about 15 minutes, gently uphill. Tap “I’m Here” by the lantern at the big pond.' },
  ],
}

const kenrokuen = {
  id: 'kenrokuen',
  name: 'Kenroku-en',
  photo: kenrokuenPhoto,
  photoAlt: 'The two-legged Kotoji lantern standing at the edge of the pond in Kenroku-en',
  memory: 'The garden of six qualities, and the marsh of gold.',
  mapPlace: 'Kotoji Lantern, Kenrokuen Garden, Kanazawa',
  mapPoint: { lat: 36.56324, lng: 136.66278 },
  travelMode: 'walking',
  distanceMeters: 1019,
  travelMinutes: 15,
  effort: { level: 'easy', note: 'Through the castle park, gently uphill' },
  stayMinutes: [45, 75],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'A garden of six qualities' },
    { text: 'Kenroku-en means “the garden that combines six”. An old Chinese text said a perfect garden has six qualities that are hard to have together: space and seclusion, human art and age, water and views. The Maeda lords spent some two hundred years building it up from the castle’s outer garden, and it opened to the public in 1874.' },
    { kind: 'heading', text: 'The marsh of gold' },
    { text: 'Legend has it that long ago a farmer called Imohori Tōgorō, Tōgorō the potato-digger, washed his potatoes in a spring here and found them glittering with gold dust. The place became known as the marsh of gold: Kanazawa. The spring, Kinjō Reitaku, is still there, beside Kanazawa Shrine at the south edge of the garden.' },
    { kind: 'find', text: 'Find the lantern by the pond that stands on two legs of different lengths. It’s the Kotoji lantern, named for the bridge of a koto, the Japanese harp, and it’s become the garden’s symbol.' },
    { className: 'narrationClose', text: 'Then down the hill and across the Asano River to Higashi Chaya, about 20 minutes. Try to be there by mid-afternoon, to see inside a teahouse before it closes. Tap “I’m Here” on the main street.' },
  ],
}

const higashiChaya = {
  id: 'higashiChaya',
  name: 'Higashi Chaya',
  photo: higashiChayaPhoto,
  photoAlt: 'The wooden teahouses of Higashi Chaya lit up at night',
  memory: 'The teahouse street at dusk.',
  mapPlace: 'Higashi Chaya District, Kanazawa',
  mapPoint: { lat: 36.57256, lng: 136.66687 },
  travelMode: 'walking',
  distanceMeters: 1511,
  travelMinutes: 21,
  effort: { level: 'easy', note: 'Downhill, then across the river' },
  stayMinutes: [60, 90],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'Since 1820' },
    { text: 'Higashi Chaya, the largest of Kanazawa’s three old teahouse districts, was set up in 1820 for geiko, as geisha are called here, to entertain wealthy merchants with music, dance and games. The wooden houses with their fine lattice windows have kept the feel of those two hundred years. Most are now cafés and craft shops, but a few are still working teahouses, open only by introduction.' },
    { kind: 'heading', text: 'Inside Shima' },
    { text: 'Ochaya Shima, built in 1820, is one of the original teahouses, kept now as a museum. You can see the rooms where the geiko entertained, their red walls and tatami, the little courtyard garden, and the combs, instruments and tableware of an evening here.' },
    { kind: 'heading', text: 'Gold thinner than light' },
    { text: 'More than 99 percent of Japan’s gold leaf is made in Kanazawa, beaten until it’s a ten-thousandth of a millimetre thick. It goes back to the Maedas, who chose to spend their riches on crafts and the arts rather than give the shogun any reason to fear them. All down this street you’ll find shops selling it, and some where you can try laying a sheet of gold yourselves.' },
    { kind: 'find', text: 'As the shops close and the lanterns come on, walk the main street from end to end together, and find a teahouse with its lamp lit.' },
    PEAK_CLOSE,
  ],
}

const kazuemachi = {
  id: 'kazuemachi',
  name: 'Kazuemachi',
  photo: kazuemachiPhoto,
  photoAlt: 'Red lanterns and wooden teahouses along the Asano River in Kazuemachi',
  memory: 'Dusk Hill by the river.',
  mapPlace: 'Kazuemachi Chaya District, Kanazawa',
  mapPoint: { lat: 36.57228, lng: 136.66374 },
  travelMode: 'walking',
  distanceMeters: 420,
  travelMinutes: 6,
  effort: { level: 'easy', note: 'Back across the Asano River' },
  stayMinutes: [20, 40],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The quieter quarter' },
    { text: 'Across the river, Kazuemachi is a smaller teahouse district from the early Meiji era, with wooden houses along the water and cherry trees on the bank. Most of its teahouses still take guests only by introduction.' },
    { kind: 'heading', text: 'Dusk Hill' },
    { text: 'Behind it, a flight of stone steps called Kuragari-zaka, literally “Dusk Hill”, climbs to a small shrine. Wealthy merchants used it to slip into the teahouses quietly in the evenings, unseen.' },
    { kind: 'find', text: 'Walk up Kuragari-zaka together as the light goes, the way the merchants did.' },
    DINNER,
  ],
}

export default {
  id: 'kanazawa',
  aiMade: true,
  name: 'The City That Spent Its Gold on Beauty',
  location: 'KANAZAWA · ISHIKAWA, JAPAN',
  city: 'Kanazawa',
  photo: heroPhoto,
  photoAlt: 'The lantern-lit wooden teahouses of Higashi Chaya at night',
  blurb: 'Samurai lanes, the garden of six qualities, gold beaten thinner than light, and the teahouse street at dusk.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Cultural', 'Historical', 'Scenic', 'Hidden Gems'],
  departure: nagamachi,
  discovery: oyamaShrine,
  build: kenrokuen,
  peak: higashiChaya,
  afterglow: kazuemachi,
  startArea: 'Kanazawa, Ishikawa, Japan',
  startNote: START_NOTE,
  bestTime: {
    season: 'Any season',
    seasonNote: 'From November to March, Kenroku-en’s trees are tied up with ropes against the snow, and spring brings cherry blossom along the river.',
    timeOfDay: 'From about 1 PM into dusk',
    timeNote: 'So you reach Higashi Chaya in time to see inside Shima, and stay as the lanterns come on.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Comfortable shoes: about 4 km, mostly flat, with stone steps on Kuragari-zaka.',
      'Socks, for taking your shoes off inside Shima.',
      'An umbrella: Kanazawa is famous for its rain.',
    ],
    costs: [
      { lead: 'Kenroku-en', text: '¥320 for adults, ¥100 for ages 6 to 17.' },
      { lead: 'Ochaya Shima', text: '¥500 for adults.' },
      { lead: 'The Nomura house', text: '¥550 for adults, if you go in (cash only).' },
      'Oyama Shrine and the streets are free. Gold-leaf workshops in Higashi Chaya vary in price.',
    ],
    getting: [
      'Start in Nagamachi: take a bus from Kanazawa Station to Kōrinbō, then walk about 5 minutes.',
      'It ends in Kazuemachi, about 25 minutes’ walk or a short bus ride from Kanazawa Station.',
    ],
    access: [
      'Mostly flat streets. Kenroku-en has gravel paths and gentle slopes, and Kuragari-zaka is stone steps.',
    ],
    restrictions: [
      { lead: 'Kenroku-en', text: '7 AM–6 PM; 8 AM–5 PM from 16 October to the end of February.' },
      { lead: 'Ochaya Shima', text: '9:30 AM–5:30 PM (to 5 PM, December to February). Listings differ slightly: check before you go.' },
      'Some of the houses are private homes and working teahouses: don’t go in uninvited, and ask before photographing anyone.',
    ],
    tips: [
      'Kenroku-en lets people in free early in the morning, from as early as 4 AM in summer (6 AM in winter), if you’d like it almost to yourselves on another day.',
      'Look out for soft-serve ice cream wrapped in gold leaf in Higashi Chaya.',
      'Kaikarō, a working teahouse with a room of gold-leaf tatami, opens to visitors during the day, and some evenings holds geiko performances you can book.',
    ],
  },
  match: {
    moods: { Peaceful: 55, Adventurous: 15, Romantic: 85, Curious: 75, Playful: 30, Cultural: 98 },
    with: { Solo: 75, Couple: 95, Family: 40, 'Friends / Group': 65 },
    preferences: {
      'Pet friendly': 30, 'Avoid alcohol': 70, 'More nature': 40, 'Food stops': 60,
      Coastal: 0, 'More urban': 75, 'Hiking involved': 5, 'Budget friendly': 70,
    },
  },
  description: [
    'For almost three hundred years, Kanazawa belonged to the richest lords in Japan. Rather than give the shogun reason to fear them, the Maedas spent their wealth on gardens, crafts and the arts, and the city still shines with it, down to the gold leaf.',
    'This afternoon walks from the samurai’s earthen walls to a shrine to the first lord and his wife, through one of Japan’s great gardens, and into the old teahouse district just as its lanterns come on, ending on the steps the merchants climbed at dusk.',
  ],
  whyCool: {
    discovery: 'A city named for a marsh of gold, that still makes nearly all of Japan’s gold leaf.',
    significance: 'Kenroku-en, one of Japan’s most famous gardens, and a teahouse district from 1820.',
    feeling: 'Refined and close: an afternoon of beautiful things that becomes an evening for two.',
  },
  route: [nagamachi, oyamaShrine, kenrokuen, higashiChaya, kazuemachi],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Kanazawa, the city that spent its gold on beauty.',
    summary: 'You walked the samurai’s lanes in Nagamachi, found the stained glass on Oyama Shrine’s gate, saw Kenroku-en and the lantern on the pond, went inside a geiko teahouse from 1820 as Higashi Chaya lit up, and climbed Dusk Hill in Kazuemachi.',
  },
}
