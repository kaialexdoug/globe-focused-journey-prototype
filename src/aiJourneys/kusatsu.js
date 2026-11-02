// The Town That Steams (Kusatsu, Gunma)

import busTerminalPhoto from '../assets/journey/kusatsu/bus-terminal.jpg'
import sainokawaraDoriPhoto from '../assets/journey/kusatsu/sainokawara-dori.jpg'
import sainokawaraParkPhoto from '../assets/journey/kusatsu/sainokawara-park.jpg'
import netsunoyuPhoto from '../assets/journey/kusatsu/netsunoyu.jpg'
import yubatakePhoto from '../assets/journey/kusatsu/yubatake.jpg'
import otakinoyuPhoto from '../assets/journey/kusatsu/otakinoyu.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const busTerminal = {
  id: 'kusatsuBusTerminal',
  name: 'Kusatsu Onsen Bus Terminal',
  photo: busTerminalPhoto,
  photoAlt: 'The front of the Kusatsu Onsen Bus Terminal, a wooden-fronted building with tall windows, with the road wet from rain',
  memory: 'Where the day began.',
  mapPlace: 'Kusatsu Onsen Bus Terminal',
  travelMode: 'transit',
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Kusatsu.' },
    { text: 'High in the mountains of Gunma, this is one of the most famous hot-spring towns in Japan. You’ll probably smell the sulphur before you see anything. Hot water bubbles up all over town, and the whole place is built around it.' },
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
  travelMode: 'walking',
  ...DISCOVERY,
  narration: [
    { text: 'Sainokawara-dori runs from the middle of town out to the park, and it’s lined with little shops selling snacks, sweets and souvenirs.' },
    { text: 'Try an onsen manju, a soft steamed bun filled with sweet bean paste, warm from the steamer.' },
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
  travelMode: 'walking',
  ...DETOUR,
  narration: [
    { text: 'The spring water here comes out too hot to bathe in. The old way to cool it is yumomi: stirring it with long wooden boards, often to a song.' },
    { text: 'If there’s a show on, go in and watch. It’s louder and more fun than you’d expect.' },
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
  travelMode: 'walking',
  ...BUILD,
  detours: [netsunoyu],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'In Sainokawara Park, hot water bubbles up among the rocks and runs down the valley in warm, steaming streams.' },
    { text: 'Follow the path up the valley and watch the colours in the water and on the stones. Look, but don’t touch: some of it is very hot.' },
    { text: 'Back in town, you can watch the hot water being stirred by hand, if you’d like a detour. Otherwise, it’s time for the big pool.' },
  ],
}

const yubatake = {
  id: 'yubatake',
  name: 'Yubatake',
  photo: yubatakePhoto,
  photoAlt: 'The Yubatake, a pool of milky turquoise spring water at the end of long wooden channels, in the middle of Kusatsu',
  memory: 'The steam over the Yubatake.',
  mapPlace: 'Yubatake, Kusatsu',
  travelMode: 'walking',
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'This is the Yubatake, the “hot water field”, right in the heart of town. The spring water pours down long wooden channels to cool, steaming all the way, into a milky blue-green pool.' },
    { text: 'Walk all the way around it. If you can, stay until dusk, when the lights come on and the steam glows.' },
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
  travelMode: 'walking',
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. You’ve spent the whole day looking at Kusatsu’s water. Now it’s time to get in it.' },
    { text: 'Otakinoyu is a big public bath house, with baths at different temperatures. Start with a cooler one, work your way up, and let the day soak out of you.' },
    DINNER,
  ],
}

export default {
  id: 'kusatsu',
  aiMade: true,
  name: 'The Town That Steams',
  location: 'KUSATSU · GUNMA, JAPAN',
  photo: yubatakePhoto,
  photoAlt: yubatake.photoAlt,
  blurb: 'Through a mountain hot-spring town, from a valley of steaming streams to the great pool in the middle of town, and into a bath.',
  tagline: TAGLINE,
  time: '~4 hours',
  walking: 'Easy walking',
  stops: '~5 stops',
  departure: busTerminal,
  discovery: sainokawaraDori,
  build: sainokawaraPark,
  peak: yubatake,
  afterglow: otakinoyu,
  startArea: 'Kusatsu, Gunma, Japan',
  startNote: START_NOTE,
  match: { moods: ['Peaceful', 'Romantic', 'Playful'], with: ['Solo', 'Couple', 'Family', 'Friends / Group'], hours: 4, effort: 'Easy' },
  why: [
    'In Kusatsu, the hot water is everywhere: running down streams in the park, steaming in channels in the middle of town, and filling baths on every street. This journey follows it around the town, saves the famous pool for the evening, and ends the only way a day in Kusatsu should: in a hot bath.',
  ],
  route: [busTerminal, sainokawaraDori, sainokawaraPark, yubatake, otakinoyu],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Kusatsu, from the steam in the park to the steam in the bath. Whatever you took from the day, it’s yours now.',
    summary: 'You started at the bus terminal, snacked your way down Sainokawara-dori, followed the warm streams through Sainokawara Park, watched the Yubatake steam at dusk, and finished with a long soak at Otakinoyu.',
  },
}
