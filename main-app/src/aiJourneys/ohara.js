// The Valley That Listens (Ōhara, Kyoto): a peaceful morning alone in the
// hills north of Kyoto, made to the Journey Engine V2 handoff (Japan, outside
// Tokyo: one of four, chosen for a solo traveller and a peaceful mood).
//
// Its peak, chosen first: sitting on the tatami at Hōsen-in with a bowl of
// tea, looking at a pine about 700 years old through the hall's pillars as
// if it were a painting, with water music playing under the veranda. The
// thread is sound and silence: a valley named for Buddhist chant, whose two
// streams are named for its tempos, a training hall for chanting, a
// waterfall that's said to have gone quiet to listen, the water music, and
// at the end the temple bell of The Tale of the Heike.
//
// Primary mood: Peaceful. Audience: one person, alone. On foot, about 4.7 km
// in all, on lanes and temple paths, gently uphill and back.
//
// Exact spots from OpenStreetMap; walks from Google's Routes API (November
// 2026); heights from GSI. Checked in November 2026 against the Japan
// Tourism Agency's multilingual descriptions written with the Ōhara Project
// (Sanzen-in, Raigō-in and Otonashi Falls, shōmyō and the two rivers,
// Hōsen-in's garden, water music and ceiling, and Jakkō-in, its bell, pine
// and pond), Sanzen-in's own guide (fees and hours), and Kyoto's tourism
// office and the temples' listings (Hōsen-in's and Jakkō-in's fees and
// hours, the bus). See JOURNEY_ENGINE_LOG.md for what's uncertain.

import heroPhoto from '../assets/journey/ohara/hero.jpg'
import approachPhoto from '../assets/journey/ohara/approach.jpg'
import sanzenInPhoto from '../assets/journey/ohara/sanzen-in.jpg'
import raigoInPhoto from '../assets/journey/ohara/raigo-in.jpg'
import hosenInPhoto from '../assets/journey/ohara/hosen-in.jpg'
import jakkoInPhoto from '../assets/journey/ohara/jakko-in.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const approach = {
  id: 'oharaApproach',
  name: 'The Ōhara Valley',
  photo: approachPhoto,
  photoAlt: 'The quiet lane of shops and trees leading up to Sanzen-in in Ōhara',
  memory: 'A valley named for chanting.',
  mapPlace: 'Ohara bus stop, Sakyo-ku, Kyoto',
  mapPoint: { lat: 35.11974, lng: 135.82906 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’ve come an hour north of Kyoto, into the hills. This morning is yours.' },
    { kind: 'heading', text: 'A valley named for chanting' },
    { text: 'Ōhara is where a kind of Buddhist chanting called shōmyō took root, and the valley is still named for it. It’s sometimes called Gyozan, after the place in China where the chant flourished, and its two streams are named for chant itself: the quick Ritsu, north of Sanzen-in, for the quick Japanese style, and the slower Ro, to its south, for the slower Chinese one.' },
    { kind: 'heading', text: 'Firewood for the capital' },
    { text: 'For centuries this valley kept Kyoto warm. Its women, the Ōharame, walked into the city with bundles of firewood on their heads, as heavy as 60 kilograms, to trade for things the valley couldn’t grow, like fresh fish. They did it for some five hundred years, until gas came to the city in the Meiji era.' },
    { kind: 'find', text: 'As you walk up, listen. Count how many different sounds of water you can hear before you reach the temple gate.' },
    { className: 'narrationClose', text: 'Walk up the lane to Sanzen-in, about 10 minutes, gently uphill. Tap “I’m Here” at its gate.' },
  ],
}

const sanzenIn = {
  id: 'sanzenIn',
  name: 'Sanzen-in',
  photo: sanzenInPhoto,
  photoAlt: 'The moss garden and tall cedars at Sanzen-in in autumn',
  memory: 'A garden for sitting, and a ceiling full of music.',
  mapPlace: 'Sanzen-in Temple, Ohara, Sakyo-ku, Kyoto',
  mapPoint: { lat: 35.11969, lng: 135.83489 },
  travelMode: 'walking',
  distanceMeters: 668,
  travelMinutes: 13,
  effort: { level: 'easy', note: 'Gently uphill along a lane of small shops' },
  stayMinutes: [40, 60],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'A garden for sitting' },
    { text: 'Sanzen-in’s Shuheki-en, “the garden that gathers green”, is made to be seen sitting down, from the tatami at the back of the guest hall, where the old abbots lived. From there the veranda frames it: the pond, the little islands, the stone lanterns, and beyond them, the valley itself. A tea master reshaped it in the 1600s, and you can still sit there with a bowl of green tea.' },
    { kind: 'heading', text: 'A hall shaped like a boat' },
    { text: 'Out in the moss stands Ōjō-gokuraku-in, a small hall whose roof looks like an upturned boat, shaped to fit the tall Buddha and two attendants inside. It’s believed to have been built in 986 by a monk and his sister in memory of their parents. Its ceiling, darkened by centuries of candle smoke, was painted with bodhisattvas and heavenly maidens, ten of them playing instruments. Even the ceiling here is full of music.' },
    { kind: 'find', text: 'Sit at the back of the guest hall, on the tatami, and let the veranda frame the garden. Count the stone lanterns you can see from there, then just stay a while.' },
    { className: 'narrationClose', text: 'Next, on up the valley to Raigō-in, where the chanting began, about 10 minutes. Tap “I’m Here” at its gate.' },
  ],
}

const raigoIn = {
  id: 'raigoIn',
  name: 'Raigō-in and the Silent Waterfall',
  mapName: 'Raigō-in',
  photo: raigoInPhoto,
  photoAlt: 'The main hall of Raigō-in among cedars and clipped bushes',
  memory: 'The waterfall that went quiet.',
  mapPlace: 'Raigo-in Temple, Ohara, Sakyo-ku, Kyoto',
  mapPoint: { lat: 35.11861, lng: 135.83767 },
  travelMode: 'walking',
  distanceMeters: 526,
  travelMinutes: 11,
  effort: { level: 'easy', note: 'Gently uphill, past Sanzen-in' },
  stayMinutes: [30, 45],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'A hall for learning to chant' },
    { text: 'The monk Ennin spent nine years in China from 838, and came home to teach his followers shōmyō. He built Raigō-in as a hall for training in it. In 1109 another monk, Ryōnin, who is said to have mastered every kind of Buddhist chant, restored it and brought its styles together. The hall in front of you was built in the 1500s, after a fire.' },
    { kind: 'heading', text: 'The silent waterfall' },
    { text: 'A short walk up the stream beyond the temple is Otonashi Falls. The story goes that when Ennin chanted here, the water drowned him out. He kept chanting, and slowly his voice and the water found a harmony, and the waterfall went quiet. Otonashi means “soundless”.' },
    { kind: 'find', text: 'Walk a few minutes up the path beside the stream to Otonashi Falls. Stand still, close your eyes, and listen. Is it silent for you?' },
    { className: 'narrationClose', text: 'Then come back down and round to Hōsen-in, about 10 minutes. Tap “I’m Here” at its gate.' },
  ],
}

const hosenIn = {
  id: 'hosenIn',
  name: 'Hōsen-in',
  photo: hosenInPhoto,
  photoAlt: 'An ancient pine framed by the pillars and red carpet of Hōsen-in’s hall',
  memory: 'Tea, a 700-year-old pine, and water music.',
  mapPlace: 'Hosen-in Temple, Ohara, Sakyo-ku, Kyoto',
  mapPoint: { lat: 35.12135, lng: 135.834 },
  travelMode: 'walking',
  distanceMeters: 675,
  travelMinutes: 11,
  effort: { level: 'easy', note: 'Back down the path and along the lane' },
  stayMinutes: [45, 60],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'A garden in a frame' },
    { text: 'Hōsen-in began around 1200 as lodgings for the monks of the temple next door. Sit down in its hall and the pillars and beams turn the garden into a painting, with tall bamboo behind and, at the centre, a Japanese white pine believed to be about 700 years old. A bowl of green tea and a sweet come with your ticket. Take your time with it.' },
    { kind: 'heading', text: 'Water music' },
    { text: 'At the back of the hall, on a bamboo deck, is a suikinkutsu: a pot buried upside down in the ground, with water dripping into it. The drops echo up through bamboo tubes, and the sound has been compared to a koto, the Japanese harp, and to shōmyō itself. It’s the valley’s last voice, and the quietest.' },
    { kind: 'heading', text: 'Look up' },
    { text: 'The ceiling boards came from Fushimi Castle, where in 1600 a few hundred samurai loyal to Tokugawa Ieyasu held out for two weeks against a huge army, then died rather than surrender. The boards they died on were shared among temples so that prayers could be said for them. Some of the marks are still there.' },
    { kind: 'find', text: 'Find the bamboo tubes at the back of the hall, put your ear to one, and listen for the water music.' },
    PEAK_CLOSE,
  ],
}

const jakkoIn = {
  id: 'jakkoIn',
  name: 'Jakkō-in',
  photo: jakkoInPhoto,
  photoAlt: 'The rebuilt main hall of Jakkō-in, among autumn maples',
  memory: 'Where The Tale of the Heike ends.',
  mapPlace: 'Jakko-in Temple, Ohara, Sakyo-ku, Kyoto',
  mapPoint: { lat: 35.12406, lng: 135.82082 },
  travelMode: 'walking',
  distanceMeters: 1720,
  travelMinutes: 26,
  effort: { level: 'easy', note: 'Down through the village and across the valley, with a gentle climb at the end' },
  stayMinutes: [30, 45],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Where the story ends' },
    { text: 'In 1185 the Taira clan was destroyed in a sea battle at Dan-no-ura. The Empress Dowager, Taira no Tokuko, lived, though her six-year-old son, the emperor, did not. That autumn she came to this temple, aged 29, became a nun called Kenreimon-in, and spent the rest of her life here praying for him and for her family. The Tale of the Heike, Japan’s great war story, ends here with her.' },
    { kind: 'heading', text: 'Things that grow back' },
    { text: 'In 2000 a fire destroyed the main hall and the pine by the pond, said to be a thousand years old and mentioned in the Tale itself. The hall was rebuilt five years later. The pine couldn’t be saved, but its stump is still there, wrapped in sacred rope, and about a metre away a young pine is growing, very likely its offspring.' },
    { kind: 'find', text: 'Find the old pine’s stump by the pond, and the young pine beside it.' },
    { className: 'narrationClose', text: 'In the Tale, a bell here rings as the old emperor who came to visit her takes his leave. Today’s bell, cast in 1752, is rung ten times every day at five o’clock: if you’re still nearby, listen for it. Then walk back to the bus stop, about 15 minutes.' },
  ],
}

export default {
  id: 'ohara',
  aiMade: true,
  name: 'The Valley That Listens',
  location: 'ŌHARA · KYOTO, JAPAN',
  city: 'Kyoto',
  photo: heroPhoto,
  photoAlt: 'An ancient pine framed by the pillars of Hōsen-in’s hall in Ōhara',
  blurb: 'A valley named for chanting, a waterfall that fell silent, and tea in front of a 700-year-old pine.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experienceLevel: 'richExperience',
  experiences: ['Cultural', 'Historical', 'Nature', 'Scenic'],
  departure: approach,
  discovery: sanzenIn,
  build: raigoIn,
  peak: hosenIn,
  afterglow: jakkoIn,
  startArea: 'Ōhara, Kyoto, Japan',
  startNote: START_NOTE,
  bestTime: {
    season: 'Any season, on a weekday',
    seasonNote: 'Green moss in June, maples in November (busy at weekends), and snow some winter mornings. Ōhara is cooler than the city.',
    timeOfDay: 'From Sanzen-in’s opening, around 8:30 or 9:00',
    timeNote: 'The mornings are the quietest, and the whole walk takes most of a morning.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Socks: you’ll take your shoes off in the temple halls.',
      'Comfortable shoes for stone paths and gentle slopes.',
      'A warm layer: Ōhara is in the hills and cooler than Kyoto.',
      'Cash or an IC card for the bus.',
    ],
    costs: [
      { lead: 'Sanzen-in', text: '¥700 for adults.' },
      { lead: 'Hōsen-in', text: '¥900 for adults, with green tea and a sweet included (since April 2024).' },
      { lead: 'Jakkō-in', text: '¥600 for adults.' },
      { lead: 'Raigō-in', text: 'About ¥400, if you go inside.' },
      { lead: 'The bus', text: 'About ¥630 each way from Kyoto Station. Ōhara is outside the city’s flat-fare area, so bus day passes don’t cover it.' },
    ],
    getting: [
      'Take Kyoto Bus 17 from Kyoto Station (stop C3, in front of the station) to Ōhara, about an hour. Buses can be an hour apart: check the timetable.',
      'It starts and ends at the Ōhara bus stop, so it’s easy to get back.',
    ],
    access: [
      'Lanes and temple paths, with some stone steps and gentle slopes. The temple halls are entered in socks.',
      'Not suited to wheelchairs; strollers would be hard work.',
    ],
    restrictions: [
      { lead: 'Sanzen-in', text: '8:30 AM–5 PM, March to early December; 9 AM–4:30 PM in winter. Some listings give slightly different November hours: check its site.' },
      { lead: 'Hōsen-in', text: '9 AM–5 PM, last entry 4:30.' },
      { lead: 'Jakkō-in', text: '9 AM–5 PM (to 4:30, December to February).' },
      'These are working temples: keep your voice low in the halls.',
    ],
    tips: [
      'Go on a weekday. November weekends, at the height of the maples, are very busy.',
      'Ōhara is known for red shiso pickles, shibazuke, coloured by the shiso grown in the valley: you’ll find them in the village.',
      'In spring, women dressed as Ōharame walk from Jakkō-in to Sanzen-in during the Ōharame Festival.',
    ],
  },
  match: {
    moods: { Peaceful: 98, Adventurous: 20, Romantic: 45, Curious: 60, Playful: 15, Cultural: 75 },
    with: { Solo: 98, Couple: 70, Family: 30, 'Friends / Group': 40 },
    preferences: {
      'Pet friendly': 10, 'Avoid alcohol': 95, 'More nature': 80, 'Food stops': 40,
      Coastal: 0, 'More urban': 5, 'Hiking involved': 25, 'Budget friendly': 45,
    },
  },
  description: [
    'An hour north of Kyoto, there’s a valley named for chanting. Its two streams are named for the chant’s tempos, a monk is said to have once silenced a waterfall with his voice, and a temple plays water music under its veranda.',
    'This is a morning to spend alone, listening: through a garden made for sitting, up to the hall where the chanting began and the waterfall that went quiet, to tea before a 700-year-old pine, and to the temple where Japan’s great war story ends.',
  ],
  whyCool: {
    discovery: 'A valley whose streams are named after the tempos of Buddhist chant.',
    significance: 'The home of Tendai chanting, and the temple where The Tale of the Heike ends.',
    feeling: 'Still and unhurried: a morning with nothing to do but look and listen.',
  },
  route: [approach, sanzenIn, raigoIn, hosenIn, jakkoIn],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Ōhara, a valley that listens.',
    summary: 'You walked up a valley named for chanting, sat with Sanzen-in’s garden, went to the hall where the chanting began and the waterfall that went quiet, had tea before Hōsen-in’s old pine, and ended where The Tale of the Heike ends.',
  },
}
