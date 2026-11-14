// The Town That Steams (Kusatsu, Gunma), built the same way as the Waseda
// journey (testJourney.js). Every stop has its exact spot (`mapPoint`, from
// Wikipedia and OpenStreetMap), so it gets the live map, and the walk to it
// from the stop before: how far (`distanceMeters`), how long
// (`travelMinutes`) and how hard (`effort`), from Google's walking routes
// and the heights along them (Open-Meteo), worked out once, in November
// 2026.
//
// The narration tells one story from stop to stop: a mountain town named
// for the smell of its water, where more hot water comes up than anywhere
// else in Japan, praised for five hundred years, carried to a shogun's
// castle, and cooled by hand, before you finally get in it. The history was
// checked against published sources (Wikipedia, in English and Japanese) in
// November 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import busTerminalPhoto from '../assets/journey/kusatsu/bus-terminal.jpg'
import sainokawaraDoriPhoto from '../assets/journey/kusatsu/sainokawara-dori.jpg'
import sainokawaraParkPhoto from '../assets/journey/kusatsu/sainokawara-park.jpg'
import netsunoyuPhoto from '../assets/journey/kusatsu/netsunoyu.jpg'
import yubatakePhoto from '../assets/journey/kusatsu/yubatake.jpg'
import otakinoyuPhoto from '../assets/journey/kusatsu/otakinoyu.jpg'

// The spots near the stops.
import rotenburoPhoto from '../assets/journey/kusatsu/sainokawara-rotenburo.jpg'
import kosenjiPhoto from '../assets/journey/kusatsu/kosenji.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const busTerminal = {
  id: 'kusatsuBusTerminal',
  name: 'Kusatsu Onsen Bus Terminal',
  mapName: 'Bus terminal',
  photo: busTerminalPhoto,
  photoAlt: 'The front of the Kusatsu Onsen Bus Terminal, a wooden-fronted building with tall windows, with the road wet from rain',
  memory: 'Where the day began.',
  mapPlace: 'Kusatsu Onsen Bus Terminal',
  mapPoint: { lat: 36.6209339, lng: 138.5963926 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Kusatsu.' },
    { kind: 'heading', text: 'The smell of the water' },
    { text: 'High in the mountains of Gunma, 1,200 meters up, this is one of the most famous hot-spring towns in Japan. You’ll probably smell the sulphur before you see anything: the name Kusatsu is thought to come from kusamizu, “smelly water.”' },
    { kind: 'heading', text: 'More than anywhere else' },
    { text: 'Hot water bubbles up all over town, more than 32,000 liters a minute, the most of any hot spring in Japan, and the whole place is built around it. Five hundred years ago, it was already counted among Japan’s three great hot springs.' },
    { kind: 'find', text: 'As you walk down into town, look for your first sight of the steam rising from the middle of it.' },
    { className: 'narrationClose', text: 'Walk down into the town centre. You’ll pass the big steaming pool in the middle. Save it for later: we’re coming back.' },
  ],
}

const sainokawaraDori = {
  id: 'sainokawaraDori',
  name: 'Sainokawara-dori',
  photo: sainokawaraDoriPhoto,
  photoAlt: 'Sainokawara-dori, a narrow sloping street of small shops hung with red lanterns',
  memory: 'Snacks on Sainokawara-dori.',
  mapPlace: 'Sainokawara-dori, Kusatsu',
  mapPoint: { lat: 36.6235141, lng: 138.5937706 },
  travelMode: 'walking',
  distanceMeters: 497,
  travelMinutes: 7,
  effort: { level: 'easy', note: 'Through the town centre, a little up and down' },
  stayMinutes: [20, 30],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The street to the park' },
    { text: 'Sainokawara-dori runs from the middle of town out to the park, and it’s lined with little shops selling snacks, sweets and souvenirs.' },
    { kind: 'heading', text: 'Onsen manju' },
    { text: 'Try an onsen manju, a soft steamed bun filled with sweet bean paste, warm from the steamer. It’s the snack of hot-spring towns all over Japan.' },
    { kind: 'find', text: 'Find a shop steaming its manju out front, and buy one while it’s still warm.' },
    { className: 'narrationClose', text: 'Follow the street to the end, and you’ll come out at the park.' },
  ],
}

const netsunoyu = {
  id: 'netsunoyu',
  name: 'Netsunoyu',
  photo: netsunoyuPhoto,
  photoAlt: 'Long wooden paddles laid across a steaming bath of hot spring water at Netsunoyu',
  memory: 'Watching the water being stirred.',
  teaser: 'Where the hot water is cooled the old way, by stirring it with long wooden boards. Right by the steaming pool in the middle of town.',
  mapPlace: 'Netsunoyu, Kusatsu',
  mapPoint: { lat: 36.6227061, lng: 138.5963224 },
  travelMode: 'walking',
  // From the park. It's right beside the Yubatake, so it adds almost no
  // walking.
  distanceMeters: 752,
  travelMinutes: 9,
  extraMeters: 73,
  effort: { level: 'easy', note: 'Back down into the town centre' },
  stayMinutes: [20, 30],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'Too hot to bathe in' },
    { text: 'The spring water here comes out too hot to bathe in. The old way to cool it, without adding cold water, is yumomi: stirring it with long wooden boards, often to a song.' },
    { kind: 'heading', text: 'The show' },
    { text: 'If there’s a show on, go in and watch. It’s louder and more fun than you’d expect.' },
    { kind: 'find', text: 'Find the long wooden boards, and count how many people stir the water at once.' },
    BACK_TO_ROUTE,
  ],
}

const sainokawaraPark = {
  id: 'sainokawaraPark',
  name: 'Sainokawara Park',
  photo: sainokawaraParkPhoto,
  photoAlt: 'Steaming streams running between rocks and pine trees in Sainokawara Park, under a clear sky',
  memory: 'Steam rising in Sainokawara Park.',
  mapPlace: 'Sainokawara Park',
  mapPoint: { lat: 36.6243024, lng: 138.5894948 },
  travelMode: 'walking',
  distanceMeters: 449,
  travelMinutes: 7,
  effort: { level: 'easy', note: 'Gently uphill along the street to the park' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Sainokawara Rotenburo',
      note: 'A big outdoor hot-spring bath at the top of the park',
      meters: 110,
      photo: rotenburoPhoto,
      photoAlt: 'The wooden fence and buildings of the Sainokawara outdoor bath, deep in snow',
      mapPlace: '西の河原露天風呂',
      mapPoint: { lat: 36.6242517, lng: 138.5883188 },
    },
  ],
  ...BUILD,
  detours: [netsunoyu],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'Hot streams' },
    { text: 'In Sainokawara Park, hot water bubbles up among the rocks and runs down the valley in warm, steaming streams.' },
    { kind: 'heading', text: 'The colours of the water' },
    { text: 'Follow the path up the valley and watch the colours in the water and on the stones. The water here is strongly acidic, so look, but don’t touch: some of it is very hot.' },
    { kind: 'find', text: 'Find a spot where the water comes up out of the ground, bubbling among the rocks.' },
    { className: 'narrationClose', text: 'Back in town, you can watch the hot water being stirred by hand, if you’d like a detour. Otherwise, it’s time for the big pool.' },
  ],
}

const yubatake = {
  id: 'yubatake',
  name: 'Yubatake',
  photo: yubatakePhoto,
  photoAlt: 'The Yubatake, a pool of milky turquoise spring water at the end of long wooden channels, in the middle of Kusatsu',
  memory: 'The steam over the Yubatake.',
  mapPlace: 'Yubatake, Kusatsu',
  mapPoint: { lat: 36.6229392, lng: 138.5967297 },
  travelMode: 'walking',
  distanceMeters: 726,
  travelMinutes: 9,
  effort: { level: 'easy', note: 'Back down into the town centre' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Kosenji',
      note: 'A small temple at the top of a flight of steps, looking down over the Yubatake',
      meters: 180,
      photo: kosenjiPhoto,
      photoAlt: 'A stone flight of steps up to the red gate of Kosenji, beside a tall stone pillar carved with its name',
      mapPlace: '光泉寺, 草津',
      mapPoint: { lat: 36.6217872, lng: 138.5952984 },
    },
  ],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The hot water field' },
    { text: 'This is the Yubatake, the “hot water field,” right in the heart of town. The spring water pours down long wooden channels to cool, steaming all the way, into a milky blue-green pool.' },
    { kind: 'heading', text: 'Water for a shogun' },
    { text: 'Its water has been famous for centuries. The eighth shogun, Tokugawa Yoshimune, had water from here carried all the way to his castle in Edo to bathe in. And from 1876, a German doctor, Erwin Bälz, physician to the Emperor, told the world about it.' },
    { kind: 'find', text: 'Walk all the way around the Yubatake. If you can, stay until dusk, when the lights come on and the steam glows.' },
    PEAK_CLOSE,
  ],
}

const otakinoyu = {
  id: 'otakinoyu',
  name: 'Otakinoyu',
  photo: otakinoyuPhoto,
  photoAlt: 'The entrance to Otakinoyu bath house, hung with a green noren curtain, under a bright blue sky',
  memory: 'A long soak at the end of the day.',
  mapPlace: 'Otakinoyu, Kusatsu',
  mapPoint: { lat: 36.622958, lng: 138.6018763 },
  travelMode: 'walking',
  distanceMeters: 550,
  travelMinutes: 7,
  effort: { level: 'easy', note: 'A short walk east, a little downhill' },
  stayMinutes: [60, 90],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Time to get in' },
    { text: 'That’s the last stop. You’ve spent the whole day looking at Kusatsu’s water. Now it’s time to get in it.' },
    { kind: 'heading', text: 'Hot, hotter, hottest' },
    { text: 'Otakinoyu is a big public bath house, with baths at different temperatures. Start with a cooler one, work your way up, and let the day soak out of you.' },
    { kind: 'find', text: 'Find the coolest bath first, then see how hot you can go.' },
    DINNER,
  ],
}

export default {
  id: 'kusatsu',
  aiMade: true,
  name: 'The Town That Steams',
  location: 'KUSATSU · GUNMA, JAPAN',
  city: 'Kusatsu',
  photo: yubatakePhoto,
  photoAlt: yubatake.photoAlt,
  blurb: 'Through a mountain hot-spring town, from steaming streams into a bath.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Interactive', 'Cultural', 'Scenic'],
  departure: busTerminal,
  discovery: sainokawaraDori,
  build: sainokawaraPark,
  peak: yubatake,
  afterglow: otakinoyu,
  startArea: 'Kusatsu, Gunma, Japan',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Winter',
    seasonNote: 'When there’s snow on the roofs, and the steam rises thickest in the cold air.',
    timeOfDay: 'In the late afternoon and evening',
    timeNote: 'The Yubatake glows after dark, and a hot bath is best at the end of the day.',
  },
  match: {
    moods: { Peaceful: 85, Adventurous: 30, Romantic: 75, Curious: 60, Playful: 60, Cultural: 65 },
    with: { Solo: 75, Couple: 90, Family: 75, 'Friends / Group': 80 },
    preferences: {
      'Pet friendly': 15, 'Avoid alcohol': 85, 'More nature': 55, 'Food stops': 65,
      Coastal: 5, 'More urban': 20, 'Hiking involved': 15, 'Budget friendly': 50,
    },
  },
  description: [
    'High in the mountains of Gunma, more hot water comes out of the ground at Kusatsu than anywhere else in Japan, and you can smell it before you see it. It’s been one of the country’s great hot springs for five hundred years, and a shogun once had its water carried all the way to his castle in Edo.',
    'This journey walks you through the steaming town, from a street of warm snacks to a park where hot streams run between the rocks, to the great steaming pool in the middle of town, and ends where it should: in the water.',
  ],
  route: [busTerminal, sainokawaraDori, sainokawaraPark, yubatake, otakinoyu],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Kusatsu, from the steam in the park to the steam in the bath. Whatever you took from the day, it’s yours now.',
    summary: 'You started at the bus terminal, snacked your way down Sainokawara-dori, followed the warm streams through Sainokawara Park, watched the Yubatake steam at dusk, and finished with a long soak at Otakinoyu.',
  },
}
