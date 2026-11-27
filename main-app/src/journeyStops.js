// Every journey, and every stop on them, one card each. The stop screens in
// StopPages.jsx are the same for every stop and fill themselves in from
// these, so adding a stop is mostly writing its card.
//
// Each stop has two screens:
//   directions: the photo, then a map from wherever you are to the stop,
//               and I'M HERE once you've got there.
//   arrived:    the photo again, then the narration to listen to or read.
// And a line on the Memory page's timeline, at the end of the journey.
//
// Every journey has the same five parts: Departure, Discovery, Build (with
// its optional detours), Peak and Afterglow. Its card says which stop is
// which (see kawagoeJourney, below).

import { AI_JOURNEYS } from './aiJourneys/index.js'
import wasedaTestJourney from './testJourney.js'
import miamiJourney from './miamiJourney.js'
import nassauJourney from './nassauJourney.js'
import { hoursText, journeyHours } from './journeyTimes.js'

import emaTunnelPhoto from './assets/journey/ema-tunnel.jpg'
import kawagoeStationPhoto from './assets/journey/kawagoe-station.jpg'
import imofukudoPhoto from './assets/journey/imofukudo.jpg'
import tokiNoKanePhoto from './assets/journey/tokinokane.jpg'
import kawagoeMuseumPhoto from './assets/journey/kawagoemuseum.jpg'
import kawagoeCastlePhoto from './assets/journey/kawagoecastle.jpg'
import hikawaShrinePhoto from './assets/journey/hikawa.jpg'
import maruyaPhoto from './assets/journey/maruya.jpg'

// The spots near Kawagoe's stops.
import kashiyaYokochoPhoto from './assets/journey/kawagoe/kashiya-yokocho.jpg'
import miyoshinoShrinePhoto from './assets/journey/kawagoe/miyoshino-shrine.jpg'

// The "-new" photos are from Wikimedia Commons, and need crediting (see
// Photo credits in the README).
import odawaraStationPhoto from './assets/journey/odawarastation-new.jpg'
import kamabokoDoriPhoto from './assets/journey/kamabokodori.jpg'
import cultureMuseumPhoto from './assets/journey/culturemuseum-new.jpg'
import ninjaMuseumPhoto from './assets/journey/ninjacenter.jpg'
import odawaraCastlePhoto from './assets/journey/odawaracastle-new.jpg'
import miyukinohamaPhoto from './assets/journey/miyukinohama.jpg'

// The spots near Odawara's stops.
import sounStatuePhoto from './assets/journey/odawara/soun-statue.jpg'
import nariwaiPhoto from './assets/journey/odawara/nariwai.jpg'
import hotokuNinomiyaPhoto from './assets/journey/odawara/hotoku-ninomiya.jpg'
import uiroPhoto from './assets/journey/odawara/uiro.jpg'

// --- Adventure in Kawagoe ---
//
// Built the same way as the Waseda journey (testJourney.js). Every stop has
// its exact spot (`mapPoint`, from Wikipedia, OpenStreetMap and Google Maps),
// so it gets the live map, and the walk to it from the stop before: how far
// (`distanceMeters`), how long (`travelMinutes`) and how hard (`effort`),
// from Google's walking routes and the heights along them (Open-Meteo),
// worked out once, in November 2026. The times at each stop are from walking
// it.
//
// The narration tells one story from stop to stop: "little Edo", the castle
// town that fed and guarded the capital, burned in 1893 and rebuilt itself
// in clay-walled storehouses, around a shrine older than all of it. The
// history was checked against published sources (Wikipedia, in English and
// Japanese) in November 2026.

export const kawagoeStation = {
  // A short name the app uses to tell the stops apart.
  id: 'kawagoeStation',
  name: 'Kawagoe Station',
  photo: kawagoeStationPhoto,
  photoAlt: 'Kawagoe Station and its rail lines, seen from above',
  // Its line on the Memory page's timeline.
  memory: 'Where the day began.',

  // What the map looks for, and how you'll get there: "transit" (train),
  // "walking", "driving" or "bicycling".
  mapPlace: 'Kawagoe Station',
  // Its exact spot, for the live map that follows you as you go (LiveMap.jsx).
  mapPoint: { lat: 35.90694444, lng: 139.48277778 },
  travelMode: 'transit',
  // About how many minutes it takes to get here from the stop before (0 for
  // the departure), and the suggested time to spend here, shortest and
  // longest, shown after the narration. The journey's total time is worked
  // out from these (journeyTimes.js). Only ever a guide. A stop after the
  // first also has how far the walk is (`distanceMeters`) and how hard
  // (`effort`), for the route preview (RoutePreview.jsx).
  travelMinutes: 0,
  stayMinutes: [5, 10],
  // Optional: interesting spots close by, each with what it is and about how
  // far it is from here, listed after the suggested time. Only ones that are
  // really worth it, so most stops have none. With a `photo` (and
  // `photoAlt`), and its `mapPlace` and exact `mapPoint`, like a stop, each
  // is shown as a card with directions to it (NearbyCard in StopPages.jsx),
  // as at Toki no Kane, below.

  // On each screen's photo: the red heading, then the small label above the
  // name.
  directionsHeading: 'Departure',
  directionsLabel: 'Your journey begins at',
  arrivedHeading: 'Arrival',
  arrivedLabel: "You’ve arrived",

  // One entry per paragraph. className "narrationLead" makes it the big
  // opening line, and "narrationClose" the italic last line. An entry can
  // also be a little subheading, { kind: 'heading', text }, or something to
  // look for there, { kind: 'find', text }, shown in a box headed CAN YOU
  // FIND IT? (see Narration.jsx).
  narration: [
    { className: 'narrationLead', text: "You've made it." },
    { kind: 'heading', text: 'Here on purpose' },
    { text: "Step off, and take a second before you start walking. This is Kawagoe Station. Unassuming, a little worn at the edges, nothing like what's waiting a few minutes from here. Most people who come through are heading somewhere else. You're here on purpose." },
    { kind: 'heading', text: 'Little Edo' },
    { text: 'Kawagoe was a castle town that lived alongside Edo, the old name for Tokyo. Goods went back and forth between the two by boat, on the Shingashi River, and thanks to all its old buildings, people still call the town Koedo: little Edo.' },
    { kind: 'find', text: 'On your way into town, find the name Koedo on a sign or a shop. Once you start looking, you’ll see it everywhere.' },
    { className: 'narrationClose', text: "From here, it's a short walk into the old part of town. No need to rush. Just follow the path, and we'll take it from there." },
  ],
}

export const imofukudo = {
  id: 'imofukudo',
  name: 'Imofukudo',
  photo: imofukudoPhoto,
  photoAlt: 'A torched grilled sweet potato on a patterned plate, with bowls of sweet potato chips',
  memory: 'A sweet potato, torched right in front of you.',
  // The photo is tall and the space for it is wide, so keep the sweet potato
  // in view rather than the middle of the picture.
  photoPosition: 'center 62%',

  mapPlace: 'Koedo Imoya Imofukudo, Kawagoe',
  mapPoint: { lat: 35.919505, lng: 139.4832066 },
  travelMode: 'walking',
  distanceMeters: 1568,
  travelMinutes: 22,
  effort: { level: 'easy', note: 'Flat, straight up through town' },
  stayMinutes: [20, 30],

  directionsHeading: 'Discovery',
  directionsLabel: 'Your next stop',
  arrivedHeading: 'Discovery',
  arrivedLabel: "You’ve arrived",

  narration: [
    { kind: 'heading', text: 'Better than chestnuts' },
    { text: 'Kawagoe’s been known for its sweet potatoes since the days of Edo. A lord of Kawagoe gave some to the shogun, who named them Kawagoe imo, and the roast potato sellers of Edo advertised them with a pun: “tastier than chestnuts, thirteen ri.” Kuri, chestnut, sounds like nine ri, and yori, than, like four. Together they make thirteen, and Kawagoe was thirteen ri from Edo.' },
    { kind: 'heading', text: 'Torched in front of you' },
    { text: 'Imofukudo’s one of the places locals actually go for it, not just tourists passing through. Their torched grilled sweet potato is the one to watch for. They heat it right in front of you, so don’t be surprised if you end up just standing there watching before you even taste it. If that’s not your thing, they’ve got plenty of other potato snacks worth a look too.' },
    { kind: 'find', text: 'Watch them torch your sweet potato, and catch the moment the top starts to caramelize.' },
    { className: 'narrationClose', text: 'No rush. Taste it, look around, then when you’re ready, we’ll keep moving.' },
  ],
}

// --- Detours ---
// A detour is a stop like any other, with a `teaser` for the Detours page,
// saying what it's about without giving the narration away. A stop lists its
// detours in `detours` (see Toki no Kane, below). On foot, `extraMeters` is
// how much further it makes the day's walk.

export const kawagoeMuseum = {
  id: 'kawagoeMuseum',
  name: 'Kawagoe City Museum',
  mapName: 'City Museum',
  photo: kawagoeMuseumPhoto,
  photoAlt: 'Inside the museum: a recreated merchant street, an old sweet potato cart and a model of the town',
  memory: 'The town’s story, told up close.',
  teaser: 'Step inside the story of the town you’ve been walking through. A quiet stop that most visitors walk straight past.',

  // The Japanese name, because "Kawagoe City Museum" finds the art museum
  // next door first.
  mapPlace: '川越市立博物館',
  mapPoint: { lat: 35.9258523, lng: 139.491508 },
  travelMode: 'walking',
  // From Toki no Kane, then on to Hikawa Shrine from here.
  distanceMeters: 885,
  travelMinutes: 12,
  extraMeters: 432,
  effort: { level: 'easy', note: 'Flat, east through town' },
  stayMinutes: [30, 45],

  directionsHeading: 'Detour',
  directionsLabel: 'Your detour',
  arrivedHeading: 'Detour',
  arrivedLabel: "You’ve arrived",

  narration: [
    { kind: 'heading', text: 'The town’s own story' },
    { text: 'You’re here. Most people walk right past this one on their way to the famous streets, which is a little unfair to it. Inside, it tells the story of the town you’ve been walking through: who lived here, what they made, and how the old merchant streets came to look the way they do.' },
    { kind: 'heading', text: 'How the street was built' },
    { text: 'The museum stands on what was part of Kawagoe Castle. Inside, life-size models show the craftsmen at work on a kura, step by step, the way they rebuilt the town after the fire of 1893. You don’t need to read every label. Wander until something catches you, then stay with that one for a bit.' },
    { kind: 'find', text: 'Find the model of the kura being built, and see how thick its clay walls really are.' },
    { className: 'narrationClose', text: 'Whenever you’re done, we’ll head back to the route.' },
  ],
}

export const kawagoeCastle = {
  id: 'kawagoeCastle',
  name: 'Kawagoe Castle',
  photo: kawagoeCastlePhoto,
  photoAlt: 'The tiled roof and wooden entrance of the old palace hall at Kawagoe Castle',
  memory: 'The palace hall that survived.',
  teaser: 'What’s left of Kawagoe’s castle isn’t what you’d picture. A rare survivor, and quieter than you’d expect.',

  // The palace hall itself (Honmaru Goten), rather than the castle grounds.
  mapPlace: '川越城本丸御殿',
  mapPoint: { lat: 35.9245029, lng: 139.4914968 },
  travelMode: 'walking',
  // From Toki no Kane, then on to Hikawa Shrine from here.
  distanceMeters: 989,
  travelMinutes: 14,
  extraMeters: 618,
  effort: { level: 'easy', note: 'Flat, east through town' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Miyoshino Shrine',
      note: 'Said to be where the old children’s song “Tōryanse” comes from',
      meters: 90,
      photo: miyoshinoShrinePhoto,
      photoAlt: 'A stone torii and a straight path leading to the red hall of Miyoshino Shrine',
      mapPlace: '三芳野神社, 川越',
      mapPoint: { lat: 35.9242257, lng: 139.4924551 },
    },
  ],

  directionsHeading: 'Detour',
  directionsLabel: 'Your detour',
  arrivedHeading: 'Detour',
  arrivedLabel: "You’ve arrived",

  narration: [
    { kind: 'heading', text: 'The palace that survived' },
    { text: 'This is it. Yes, it really is just a quiet wooden building. The towers and walls are long gone, and what’s left is part of the palace hall, built in 1848, where the lord actually lived and worked. Only one other castle in Japan, Kōchi, still has a great hall like it.' },
    { kind: 'heading', text: 'Easy going, scary coming back' },
    { text: 'Next door is Miyoshino Shrine. It once stood inside the castle, so ordinary people could only visit at set times, and were searched on the way out in case they were spies. That’s said to be where the old children’s song “Tōryanse” comes from: going in is easy, coming back is scary.' },
    { kind: 'find', text: 'Step inside and look at the rooms. Then find the narrow path to Miyoshino Shrine, the one from the song.' },
    { className: 'narrationClose', text: 'Take your time here. When you’re ready, we’ll get back on the route.' },
  ],
}

export const tokiNoKane = {
  id: 'tokiNoKane',
  name: 'Toki no Kane',
  photo: tokiNoKanePhoto,
  photoAlt: 'The wooden Toki no Kane bell tower rising above an old street of shops in Kawagoe',
  memory: 'Four centuries of ringing out the hours.',

  mapPlace: 'Toki no Kane, Kawagoe',
  mapPoint: { lat: 35.9234837, lng: 139.4833395 },
  travelMode: 'walking',
  distanceMeters: 513,
  travelMinutes: 7,
  effort: { level: 'easy', note: 'Flat, up the old merchant street' },
  stayMinutes: [10, 20],
  nearby: [
    {
      name: 'Kashiya Yokocho',
      note: 'A little stone-paved alley of old-fashioned sweet and snack shops, going since 1796',
      meters: 300,
      photo: kashiyaYokochoPhoto,
      photoAlt: 'A narrow stone-paved lane of old wooden sweet shops, with a blue banner reading 菓子屋横丁',
      mapPlace: '菓子屋横丁, 川越',
      mapPoint: { lat: 35.9252, lng: 139.4808 },
    },
  ],

  directionsHeading: 'Build',
  directionsLabel: 'Your next stop',
  arrivedHeading: 'Build',
  arrivedLabel: "You’ve arrived",

  // This stop has optional detours, as many as are listed here. On its
  // narration screen, detoursNote sits above SEE DETOURS, with CONTINUE
  // underneath for skipping them.
  detours: [kawagoeMuseum, kawagoeCastle],
  detoursNote: 'This part of the journey comes with two detours: short side trips worth taking if you’re curious. They’re entirely up to you.',

  narration: [
    { kind: 'heading', text: 'The bell over the town' },
    { text: 'Walk a little further down the main street and you’ll see it, a wooden bell tower rising sixteen meters above the rooftops. A bell has rung out the hours over Kawagoe here for about four centuries, and it still rings four times a day: at six in the morning, at noon, and at three and six in the afternoon.' },
    { kind: 'heading', text: 'After the great fire' },
    { text: 'In 1893, a fire swept through the town. Kawagoe rebuilt in the kura style, with thick clay walls made to stand up to fire, and that’s the street around you. The tower went back up the next year, paid for by the town’s merchants, with help from as far away as the Emperor. In 1996, its bell was named one of Japan’s hundred best soundscapes.' },
    { kind: 'find', text: 'Walk through the bottom of the tower to the little shrine behind it, said to help with troubles of the eyes.' },
    { className: 'narrationClose', text: 'From here, the day opens up. If you feel like wandering, the museum and the old castle are close by, and either is worth a detour. If you’d rather keep going, that works too. Either way, the best part of the day is still ahead of you.' },
  ],
}

export const hikawaShrine = {
  id: 'hikawaShrine',
  name: 'Hikawa Shrine',
  photo: hikawaShrinePhoto,
  photoAlt: 'The main hall of Kawagoe Hikawa Shrine, under a wide green roof among tall trees',
  memory: 'Fifteen hundred years of wishes, overhead.',

  mapPlace: 'Kawagoe Hikawa Shrine',
  mapPoint: { lat: 35.92782, lng: 139.48865 },
  travelMode: 'walking',
  distanceMeters: 926,
  travelMinutes: 13,
  effort: { level: 'easy', note: 'Flat, through quieter streets' },
  stayMinutes: [30, 45],

  directionsHeading: 'Peak',
  directionsLabel: 'Your next stop',
  arrivedHeading: 'Peak',
  arrivedLabel: "You’ve arrived",

  narration: [
    { className: 'narrationLead', text: 'You made it. This is what the day was building toward.' },
    { kind: 'heading', text: 'Older than all of it' },
    { text: 'Hikawa Shrine is said to have stood here since the year 541, long before the sweet potatoes, the bell, or the merchant streets. Ōta Dōkan, who built Kawagoe Castle, came to pray here in 1457 and left a poem behind.' },
    { kind: 'heading', text: 'A shrine for good matches' },
    { text: 'Two married couples of gods are honored here, so for a very long time people have come to ask for love and good matches. Look up at the long tunnel of ema, the wooden wishes hung overhead, each one left by someone who stood where you’re standing.' },
    { kind: 'find', text: 'Walk through the tunnel of ema. Then, just behind the shrine, find the Shingashi River, the old waterway that carried Kawagoe’s goods to Edo.' },
    { className: 'narrationClose', text: 'The crowds stayed back on the main street. You took the quieter way here.' },
  ],
}

export const maruya = {
  id: 'maruya',
  name: 'MARUYA',
  photo: maruyaPhoto,
  photoAlt: 'A lacquered bowl of oyakodon topped with charcoal-grilled chicken and an egg yolk',
  memory: 'Charcoal-grilled oyakodon, eaten slowly.',

  // The shop's own name on the map, so it finds this MARUYA.
  mapPlace: '炭焼き親子丼 MARUYA 川越',
  mapPoint: { lat: 35.92411958, lng: 139.48283714 },
  travelMode: 'walking',
  distanceMeters: 901,
  travelMinutes: 13,
  effort: { level: 'easy', note: 'Flat, back toward the old merchant street' },
  stayMinutes: [45, 60],

  directionsHeading: 'Afterglow',
  directionsLabel: 'Your last stop',
  arrivedHeading: 'Afterglow',
  arrivedLabel: "You’ve arrived",

  narration: [
    { kind: 'heading', text: 'Let it settle' },
    { text: 'That’s the last stop. The best part of the day is behind you, and it’s fine to just let it settle. You’re back near the bell tower, where the town’s hours have been rung for four centuries.' },
    { kind: 'heading', text: 'Charcoal and chicken' },
    { text: 'If you’re hungry, MARUYA is worth the walk. It’s a small place known for oyakodon made with charcoal-grilled chicken, which is simple and warm and exactly what the moment calls for. It’s a lunchtime place, so check the hours if the day has run late.' },
    { kind: 'find', text: 'Find the egg yolk sitting on top of your bowl, and break it over the rice.' },
    { className: 'narrationClose', text: 'Sit down, eat slowly, and take your time. You’ve earned it.' },
  ],
}

// The journey as a whole, for Home, See Your Journey and the Memory page at
// the end.
export const kawagoeJourney = {
  // A short name the app uses for it, like a stop's id.
  id: 'kawagoe',
  // Walked and checked, so its cards say UNFOLD VERIFIED.
  verified: true,
  name: 'Adventure in Kawagoe',
  location: 'KAWAGOE · SAITAMA, JAPAN',
  city: 'Kawagoe',
  photo: emaTunnelPhoto,
  photoAlt: 'A tunnel of wooden prayer plaques at a shrine in Kawagoe',

  // The line under its name on Home, short enough to fit on two.
  blurb: 'Explore the historic streets of Kawagoe.',
  // The first line under the photo on See Your Journey.

  // The three quick facts under it, along with its time, which is worked out
  // from its stops (see ALL_JOURNEYS, below).
  walking: 'Flat walking',
  stops: '~5 stops',

  // For its tags on Home. How hard it is: 'Easy', 'Moderate' or 'Active'. What
  // it's mostly about: 'Scenic', 'Foodie' or 'Cultural' (each has its own symbol).
  difficulty: 'Easy',
  experienceLevel: 'richExperience',
  experiences: ['Historical', 'Cultural', 'Culinary'],

  // Its stops, part by part. "Already at the starting point?" skips straight
  // past the departure to the discovery. The build is the stop with the
  // detours.
  departure: kawagoeStation,
  discovery: imofukudo,
  build: tokiNoKane,
  peak: hikawaShrine,
  afterglow: maruya,

  // Under the first stop, in the Route tab on See Your Journey (JourneyPage.jsx).
  startArea: 'Kawagoe, Saitama, Japan',
  startNote: 'Travel to the start is separate from journey time.',

  // For matching it to your answers on Find My Journey (journeyMatch.js): how
  // well it suits each answer, out of 100, and how many hours it takes, which
  // is worked out from its stops. These are estimates from what's on the
  // journey, not checked facts.
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Spring or fall',
    seasonNote: 'For the cherry trees along the Shingashi River in early April, or the Kawagoe Festival’s floats on the third weekend of October.',
    timeOfDay: 'From mid-morning, on a weekday',
    timeNote: 'MARUYA is open at lunchtime, and the old streets are much calmer on weekdays.',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against Kawagoe City's pages for the
  // museum and the castle palace.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Comfortable shoes. It’s flat all the way, but you’ll be on your feet for a few hours.',
      'Cash for the snacks and sweet shops along the way: small shops often only take cash.',
      'A Suica or PASMO card (or one on your phone) for the train.',
      'A bag for your rubbish: Japan has very few public bins.',
      'An umbrella in the rainy season (June to mid-July), and a hat and water in summer.',
    ],
    costs: [
      'The streets, Toki no Kane and Hikawa Shrine are free.',
      { lead: 'Kawagoe Castle Honmaru Goten', text: '¥100, or ¥50 for high school and university students.' },
      { lead: 'Kawagoe City Museum', text: '¥200, or ¥100 for high school and university students. Free up to junior high school age.' },
      'A shared ticket for the museum, the palace and the city art museum costs ¥370.',
      'Budget for lunch at MARUYA and snacks along the old streets.',
    ],
    getting: [
      'Start at Kawagoe Station, on the Tobu Tojo Line from Ikebukuro and the JR Kawagoe Line.',
      'The walk ends at MARUYA, about 2 km from Kawagoe Station but only about 10 minutes on foot from Hon-Kawagoe Station, on the Seibu Shinjuku Line.',
      'Parking in the old town is limited and fills up at weekends. If you drive, use a paid lot near the station.',
    ],
    access: [
      'Flat the whole way, on streets and sidewalks.',
      'The old merchant street’s sidewalks are narrow and crowded at weekends, which is slow going with a stroller or wheelchair.',
      'The Honmaru Goten is an old wooden palace: you take your shoes off inside.',
    ],
    restrictions: [
      { lead: 'City Museum and Honmaru Goten', text: '9 AM–5 PM, last entry 4:30 PM. Closed on Mondays (or the next day, after a holiday Monday), on the fourth Friday of the month (unless it’s a holiday) and December 29–January 3.' },
      { lead: 'MARUYA', text: 'Open at lunchtime. Check its hours before you go, and expect a queue at weekends.' },
    ],
    tips: [
      'Toki no Kane, the bell tower, rings four times a day: at 6 AM, noon, 3 PM and 6 PM.',
      'Come on a weekday if you can: the old streets are much calmer.',
      'At Hikawa Shrine, a handful of en-musubi-dama, good-luck charms for finding love made from the shrine’s pebbles, are given out free each morning from 8 AM. They go fast.',
      'In summer, Hikawa Shrine hangs thousands of wind chimes for its En-musubi Furin festival.',
    ],
  },
  match: {
    moods: { Peaceful: 55, Adventurous: 35, Romantic: 65, Curious: 75, Playful: 50, Cultural: 95 },
    with: { Solo: 85, Couple: 85, Family: 75, 'Friends / Group': 80 },
    preferences: {
      'Pet friendly': 20, 'Avoid alcohol': 90, 'More nature': 20, 'Food stops': 90,
      Coastal: 5, 'More urban': 45, 'Hiking involved': 5, 'Budget friendly': 80,
    },
  },

  // What the journey is, in Why It's Cool on See Your Journey (JourneyPage.jsx):
  // the hook, to get you excited about it. One entry per paragraph.
  description: [
    'Everyone who comes to Kawagoe sees the same bell tower, the same warehouse street, the same photo. This journey starts there too — but it doesn’t end there.',
    'Past the crowds, down streets most visitors never think to turn down, there’s a reason the locals still call this town “Koedo” (little Edo). A gate that’s marked time here for over a century. A quiet shrine tucked away from the noise, holding something most people walk straight past.',
    'We won’t tell you what it is. You’ll have to go see for yourself.',
  ],
  // Why It's Cool on the journey's page (JourneyPage.jsx): what you'll
  // discover, why it matters, and what it feels like, a sentence each.
  whyCool: {
    discovery: 'The “Little Edo” past the crowds: a bell tower, sweet potatoes, and a quiet shrine most visitors walk straight past.',
    significance: 'A castle town that lived alongside Edo, rebuilt after the great fire of 1893, around a shrine said to date from 541.',
    feeling: 'Lively, then peaceful: sweet potato snacks on old merchant streets, a quiet shrine, and charcoal-grilled chicken to finish.',
  },

  // --- The Memory page ---

  // Every stop, in order, for the timeline. A stop's detours branch off it.
  // The peak is made the most of, on the timeline and in the story.
  route: [kawagoeStation, imofukudo, tokiNoKane, hikawaShrine, maruya],

  // The day told as a story, a paragraph for each part of it: the opening
  // (Departure and Discovery), the build, the peak, and the ending
  // (Afterglow). The build's paragraph ends with a line about the detours,
  // depending on which you took.
  story: {
    opening: 'It began quietly at Kawagoe Station, and a few streets on, the town eased you in with a torched sweet potato at Imofukudo.',
    build: 'At Toki no Kane, the day started to build.',
    detours: {
      none: 'You kept going, saving yourself for what came next.',
      kawagoeMuseum: 'You took a detour to the Kawagoe City Museum, where the town told its own story.',
      kawagoeCastle: 'You took a detour to Kawagoe Castle’s old palace hall.',
      all: 'You took both detours, the museum and the castle, and the day only grew from there.',
    },
    peak: 'Then, the peak: Hikawa Shrine. Fifteen centuries of people asking for good things, and a tunnel of wooden wishes overhead. You stood where they stood.',
    ending: 'And you let it all settle over charcoal-grilled oyakodon at MARUYA.',
  },
}

// --- Where the Old Road Meets the Sea (Odawara) ---
//
// Built the same way as the Waseda journey (testJourney.js). Every stop has
// its exact spot (`mapPoint`, from its Google Maps link), so it gets the live
// map, and the walk to it from the stop before: how far (`distanceMeters`),
// how long (`travelMinutes`) and how hard (`effort`), from Google's walking
// routes and the heights along them (Open-Meteo), worked out once, in
// November 2026. The times at each stop are from walking it.
//
// The narration tells one story from stop to stop: the Hōjō, who took the
// castle with a trick and held it for a century, the Tokaido travelers who
// stopped here to eat and buy medicine, the siege that ended it all, and the
// sea at the end of the day. The history was checked against published
// sources (Wikipedia, in English and Japanese) in November 2026.

export const odawaraStation = {
  id: 'odawaraStation',
  name: 'Odawara Station',
  photo: odawaraStationPhoto,
  photoAlt: 'The concourse at Odawara Station, under a giant paper lantern reading 小田原',
  memory: 'Where the day began.',

  mapPlace: 'Odawara Station',
  mapPoint: { lat: 35.2564449, lng: 139.1553932 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  nearby: [
    {
      name: 'Hōjō Sōun statue',
      note: 'The founder of the Hōjō, on horseback, with the oxen of the legend charging beside him',
      meters: 100,
      photo: sounStatuePhoto,
      photoAlt: 'A bronze statue of Hōjō Sōun on horseback, with oxen charging around him, on a stone base',
      mapPlace: '北条早雲公像, 小田原',
      mapPoint: { lat: 35.2568714, lng: 139.1544611 },
    },
  ],

  directionsHeading: 'Departure',
  directionsLabel: 'Your journey begins at',
  arrivedHeading: 'Arrival',
  arrivedLabel: "You’ve arrived",

  narration: [
    { className: 'narrationLead', text: 'You’re in Odawara.' },
    { kind: 'heading', text: 'A thousand oxen' },
    { text: 'Outside the west exit, a bronze samurai rides with a herd of oxen charging beside him. That’s Hōjō Sōun, who took Odawara Castle around 1495. The legend goes that he asked the castle’s lord for leave to hunt deer in the hills, then came back at night with torches tied to the horns of a thousand oxen. The castle thought a huge army was coming, and fled. How much of it is true, nobody knows.' },
    { kind: 'heading', text: 'A castle town on the road' },
    { text: 'Sōun’s family, the Hōjō, ruled from Odawara for nearly a century. Later, it was a stop on the Tokaido, the great road between Edo and Kyoto, and the first castle town travelers came to after leaving Edo.' },
    { kind: 'find', text: 'Find the statue of Hōjō Sōun outside the west exit, and count the oxen charging beside him.' },
    { className: 'narrationClose', text: 'The first stop is Kamaboko-dori, on the old Tokaido road, about twenty minutes on foot toward the sea.' },
  ],
}

export const kamabokoDori = {
  id: 'kamabokoDori',
  name: 'Kamaboko-dori',
  photo: kamabokoDoriPhoto,
  photoAlt: 'Kamaboko-dori, a quiet paved street of old shops, with its tall wooden street sign',
  memory: 'Hot kamaboko, eaten on the old Tokaido road.',
  // The photo is wide and the screen is tall, so keep the street's sign, on
  // the right, in view.
  photoPosition: '92% center',

  // Cafe & Restaurant Yamajo, just behind the street, which the narration
  // suggests for lunch.
  mapPlace: 'Cafe & Restaurant Yamajo',
  mapPoint: { lat: 35.2511529, lng: 139.1660913 },
  travelMode: 'walking',
  distanceMeters: 1398,
  travelMinutes: 20,
  effort: { level: 'easy', note: 'Gently downhill through town toward the sea' },
  stayMinutes: [30, 60],
  nearby: [
    {
      name: 'Nariwai Kōryūkan',
      note: 'A fishing-net merchant’s building from the early Shōwa years, now a rest stop and meeting place on the old Tokaido',
      meters: 640,
      photo: nariwaiPhoto,
      photoAlt: 'The Nariwai Kōryūkan, a dark two-storey wooden merchant’s building with a tiled roof, beside a willow',
      mapPlace: '小田原宿なりわい交流館',
      mapPoint: { lat: 35.2483002, lng: 139.1599528 },
    },
  ],

  directionsHeading: 'Discovery',
  directionsLabel: 'Your next stop',
  arrivedHeading: 'Discovery',
  arrivedLabel: "You’ve arrived",

  narration: [
    { kind: 'heading', text: 'Food for the road' },
    { text: 'Travelers on the Tokaido stopped in Odawara to eat, and the shops along this street have been making kamaboko, a fish cake, for generations, first from fish caught in the bay. In 2022, Japan’s Agency for Cultural Affairs named Odawara kamaboko one of its hundred-year foods. Grab something hot and fried to eat as you walk, and stop at whichever shops catch your eye.' },
    { kind: 'heading', text: 'Lunch with a view' },
    { text: 'If you’d rather sit down, Cafe & Restaurant Yamajo is just behind the street, upstairs in a kamaboko factory with a view over the bay. It’s run by a maker with more than a century of history, and lunch there is built around their kamaboko.' },
    { kind: 'find', text: 'Find the tall wooden street sign for Kamaboko-dori. Then find the hottest, freshest thing you can eat on the spot.' },
    { className: 'narrationClose', text: 'Either way, there’s no rush. When you’re ready, we’ll turn back toward the castle.' },
  ],
}

export const ninjaMuseum = {
  id: 'ninjaMuseum',
  name: 'Odawara Castle NINJA Museum',
  mapName: 'NINJA Museum',
  photo: ninjaMuseumPhoto,
  photoAlt: 'Visitors in a dimly lit hall with a recreated wooden house, a pond of stepping stones and ninja figures',
  memory: 'A playful corner of the castle grounds.',
  teaser: 'Odawara’s lords once kept a band of ninja of their own. A playful, hands-on corner of the castle grounds.',

  mapPlace: 'Odawara Castle NINJA Museum',
  mapPoint: { lat: 35.250641, lng: 139.155743 },
  travelMode: 'walking',
  // From the Local Culture Museum. It's on the way up to the castle, so the
  // extra walking is small.
  distanceMeters: 127,
  travelMinutes: 2,
  extraMeters: 161,
  effort: { level: 'easy', note: 'A few steps through the castle grounds' },
  stayMinutes: [30, 45],

  directionsHeading: 'Detour',
  directionsLabel: 'Your detour',
  arrivedHeading: 'Detour',
  arrivedLabel: "You’ve arrived",

  narration: [
    { kind: 'heading', text: 'The Hōjō’s ninja' },
    { text: 'The Hōjō kept a band of ninja of their own, the Fūma, led by a chief who took the name Fūma Kotarō. An old chronicle tells of a night raid in 1581, when Fūma and 200 of his band crept into an enemy camp.' },
    { kind: 'heading', text: 'A legend grows' },
    { text: 'The same chronicle says the enemy’s soldiers swore he was over seven feet tall, with fangs. He’s been a favorite of stories ever since. This is a playful corner of the castle grounds, and a few minutes here is plenty.' },
    { kind: 'find', text: 'Find the pond of stepping stones, and imagine crossing it without a sound.' },
    { className: 'narrationClose', text: 'When you’re ready, we’ll head back to the route.' },
  ],
}

export const cultureMuseum = {
  id: 'cultureMuseum',
  name: 'Odawara Local Culture Museum',
  mapName: 'Culture Museum',
  photo: cultureMuseumPhoto,
  photoAlt: 'Stone steps up through the trees to the museum, beside its signpost',
  memory: 'The town’s history, in small pieces.',

  mapPlace: 'Odawara Local Culture Museum',
  mapPoint: { lat: 35.249716, lng: 139.154941 },
  travelMode: 'walking',
  distanceMeters: 1212,
  travelMinutes: 17,
  effort: { level: 'easy', note: 'Back inland, with a gentle climb at the end into the castle grounds' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Hōtoku Ninomiya Shrine',
      note: 'A shrine to Ninomiya Sontoku, the farmer’s son from Odawara who rebuilt hundreds of villages',
      meters: 180,
      photo: hotokuNinomiyaPhoto,
      photoAlt: 'A tall bronze torii over a stone path, leading to the shrine’s hall among green trees',
      mapPlace: '報徳二宮神社',
      mapPoint: { lat: 35.2498519, lng: 139.1529655 },
    },
  ],

  directionsHeading: 'Build',
  directionsLabel: 'Your next stop',
  arrivedHeading: 'Build',
  arrivedLabel: "You’ve arrived",

  detours: [ninjaMuseum],
  detoursNote: 'This part of the journey comes with a detour: a short side trip worth taking if you’re curious. It’s entirely up to you.',

  narration: [
    { kind: 'heading', text: 'Into the castle grounds' },
    { text: 'Now you’re back inland, in the grounds around the castle. You’re close, and the best part of the day is still ahead. This little museum holds the town’s history in small pieces, in a wooden building from 1945 that was never meant to be a museum at all.' },
    { kind: 'heading', text: 'The boy with the firewood' },
    { text: 'Just along the path is a shrine to Ninomiya Sontoku, born near here in 1787 to a poor farming family. He grew up to rebuild about 600 villages, and statues of him as a boy, reading a book as he carries firewood on his back, once stood outside schools all over Japan.' },
    { kind: 'find', text: 'Look at whatever catches your eye in the museum. Then find the shrine’s tall bronze torii, just along the path.' },
    { className: 'narrationClose', text: 'There’s a ninja museum in the castle grounds, if you’d like a detour. Otherwise, the castle is just up the hill.' },
  ],
}

export const odawaraCastle = {
  id: 'odawaraCastle',
  name: 'Odawara Castle',
  photo: odawaraCastlePhoto,
  photoAlt: 'The white keep of Odawara Castle above its stone walls, under a blue summer sky',
  // The photo is tall: in a wide space, keep the keep in view rather than the
  // ground below it.
  photoPosition: 'center 30%',
  memory: 'The top of the keep, looking out to the bay.',

  // Finds the keep itself.
  mapPlace: 'Odawara Castle',
  mapPoint: { lat: 35.2509493, lng: 139.1535136 },
  travelMode: 'walking',
  distanceMeters: 311,
  travelMinutes: 5,
  effort: { level: 'easy', note: 'Up through the castle grounds, with some steps' },
  stayMinutes: [45, 60],

  directionsHeading: 'Peak',
  directionsLabel: 'Your next stop',
  arrivedHeading: 'Peak',
  arrivedLabel: "You’ve arrived",

  narration: [
    { className: 'narrationLead', text: 'You made it. This is what the day was building toward.' },
    { kind: 'heading', text: 'Five generations' },
    { text: 'For five generations, the Hōjō built up this castle as the heart of lands that covered most of the Kantō. Then, in 1590, Toyotomi Hideyoshi, who had just brought the whole country under his rule, surrounded it with a huge army.' },
    { kind: 'heading', text: 'The castle that appeared overnight' },
    { text: 'There was hardly any fighting. After three months, a castle of Hideyoshi’s seemed to appear overnight on a hill nearby, and the Hōjō lost heart and surrendered. The keep you’re standing in was rebuilt in 1960, on the stone base of the old one, which was pulled down in the 1870s.' },
    { kind: 'find', text: 'Climb to the top deck and look out toward the bay. Then look for the hills to the southwest, where Hideyoshi’s overnight castle stood.' },
    { className: 'narrationClose', text: 'Take as long as you like.' },
  ],
}

export const miyukinohama = {
  id: 'miyukinohama',
  name: 'Miyuki-no-Hama',
  photo: miyukinohamaPhoto,
  photoAlt: 'The sun setting over the sea from a pebble beach, with waves rolling in',
  memory: 'The end of the day, by the sea.',

  mapPlace: 'Miyukinohama Beach',
  mapPoint: { lat: 35.2451164, lng: 139.1593045 },
  travelMode: 'walking',
  distanceMeters: 1105,
  travelMinutes: 15,
  effort: { level: 'easy', note: 'Downhill through town to the sea' },
  stayMinutes: [30, 60],
  nearby: [
    {
      name: 'Uirō',
      note: 'A shop that has sold uirō, a family medicine and a soft sweet, on the same spot on the Tokaido for over 500 years, in a building like a small castle',
      meters: 390,
      photo: uiroPhoto,
      photoAlt: 'The Uirō shop, a white building with layered tiled roofs like a small castle, and banners along its front',
      mapPlace: 'ういろう, 小田原',
      mapPoint: { lat: 35.2474685, lng: 139.1560632 },
    },
  ],

  directionsHeading: 'Afterglow',
  directionsLabel: 'Your last stop',
  arrivedHeading: 'Afterglow',
  arrivedLabel: "You’ve arrived",

  narration: [
    { kind: 'heading', text: 'An emperor on the beach' },
    { text: 'That’s the last stop. The beach takes its name from an imperial visit: the story told here is that in 1873, the Emperor Meiji and the Empress stopped on their way back from Hakone to watch the fishermen haul in their nets.' },
    { kind: 'heading', text: 'Back to the sea' },
    { text: 'It’s the bay the old kamaboko makers fished, and the same water you looked out over from the top of the keep. There’s no destination now, only the sound of the waves.' },
    { kind: 'find', text: 'Find the sign by the beach that tells the story of its name. Then pick a spot on the pebbles, and listen to the sea.' },
    { className: 'narrationClose', text: 'If you’re hungry, dinner is up to you. You’ve earned it.' },
  ],
}

export const odawaraJourney = {
  id: 'odawara',
  verified: true,
  name: 'Where the Old Road Meets the Sea',
  location: 'ODAWARA · KANAGAWA, JAPAN',
  city: 'Odawara',
  photo: odawaraCastlePhoto,
  photoAlt: 'The white keep of Odawara Castle above its stone walls, under a blue summer sky',

  blurb: 'From the old Tokaido road to the castle, and down to the sea.',

  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experienceLevel: 'richExperience',
  experiences: ['Historical', 'Culinary', 'Cultural', 'Scenic'],

  departure: odawaraStation,
  discovery: kamabokoDori,
  build: cultureMuseum,
  peak: odawaraCastle,
  afterglow: miyukinohama,

  startArea: 'Odawara, Kanagawa, Japan',
  startNote: 'Travel to the start is separate from journey time.',

  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Spring',
    seasonNote: 'For the 300 or so cherry trees around Odawara Castle, at their best in late March and early April, and mild days by the sea.',
    timeOfDay: 'From late morning',
    timeNote: 'So you finish at Miyuki-no-Hama as the sun goes down.',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against Odawara Castle's own site
  // and Odawara City's page for the Local Culture Museum.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Comfortable shoes, for the walk and the stairs inside the castle keep.',
      'A Suica or PASMO card (or one on your phone) for the train, and some cash for the small shops on Kamaboko-dori.',
      'Water, and a hat and sunscreen in summer: the walk ends on an open beach.',
      'A bag for your rubbish: Japan has very few public bins.',
    ],
    costs: [
      { lead: 'Odawara Castle keep', text: '¥1,000, or ¥300 for elementary and junior high school students (younger children free). The ticket gets you into the SAMURAI-kan too. These are new prices from March 2026.' },
      { lead: 'NINJA-kan', text: '¥500, or ¥200 for elementary and junior high school students.' },
      'The castle park, the Local Culture Museum, Hōtoku Ninomiya Shrine and the beach are free.',
    ],
    getting: [
      'Start at Odawara Station, on the Odakyu Line from Shinjuku, the JR Tokaido Line and the Tokaido Shinkansen.',
      'The walk ends at Miyuki-no-Hama, about 1.5 km from the station: about 20 minutes back on foot.',
      'There’s no public parking at the castle park, so come by train if you can. If you drive, use one of the paid lots around the station.',
      'There’s a small lot in the castle park for cars with disabled visitors (and tour buses and motorbikes), run by the Odawara tourist association.',
    ],
    access: [
      'Mostly gentle streets, with some steps and a gentle climb into the castle grounds.',
      'The castle keep has several floors of stairs inside.',
      'Visitors with a disability certificate get into the keep and the NINJA-kan free, with one companion.',
      'Miyuki-no-Hama is a pebbly beach, hard going in a wheelchair or with a stroller.',
    ],
    restrictions: [
      { lead: 'Castle keep', text: '9 AM–5 PM, last entry 4:30 PM. Closed on the second Wednesday of December, and December 31–January 1.' },
      { lead: 'NINJA-kan', text: '9 AM–5 PM, last entry 4:30 PM. Closed December 31–January 1.' },
      { lead: 'Local Culture Museum', text: '9 AM–5 PM, last entry 4:30 PM. Closed December 28–January 3, and sometimes between exhibitions.' },
    ],
    tips: [
      'Do the castle before 4:30 PM, then take your time on the way down to the sea for the sunset.',
      'From the top of the keep you can see across Sagami Bay on a clear day.',
      'In late March and early April, the castle park’s cherry trees are in bloom, and it gets busy.',
      'Kamaboko-dori is named for the fish cakes Odawara is famous for, and its old shops still make them.',
    ],
  },
  match: {
    moods: { Peaceful: 60, Adventurous: 50, Romantic: 65, Curious: 75, Playful: 55, Cultural: 90 },
    with: { Solo: 85, Couple: 85, Family: 80, 'Friends / Group': 80 },
    preferences: {
      'Pet friendly': 25, 'Avoid alcohol': 90, 'More nature': 40, 'Food stops': 85,
      Coastal: 75, 'More urban': 40, 'Hiking involved': 10, 'Budget friendly': 70,
    },
  },

  description: [
    'For centuries, travelers on the road between Edo and Kyoto stopped here to rest, eat, and look at the water. The town hasn’t changed that much: fish from the bay, shops that have been open longer than anyone can remember, and a quiet stretch of coast waiting at the end of the day. We’ll walk you through it, and somewhere along the way there’s one moment that makes the whole trip worth it.',
  ],
  // Why It's Cool on the journey's page (JourneyPage.jsx): what you'll
  // discover, why it matters, and what it feels like, a sentence each.
  whyCool: {
    discovery: 'A castle town on the old Tokaido road, where travelers have stopped to eat and look out at the sea for centuries.',
    significance: 'The Hōjō, who ruled most of the Kantō from Odawara Castle for five generations, and the old road that brought travelers through.',
    feeling: 'Easygoing and coastal: fish cakes on the way, a view from the castle, and a quiet beach at the end of the day.',
  },

  // --- The Memory page ---

  route: [odawaraStation, kamabokoDori, cultureMuseum, odawaraCastle, miyukinohama],

  // Instead of a story told part by part (like Kawagoe's): a heading, a few
  // words to close the day, and the day in short.
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Odawara, from the old Tokaido road to the water. Whatever you took from the day, it’s yours now.',
    summary: 'You walked from the station to Kamaboko-dori, ate your way through the old shops, turned back toward the castle, climbed to the top of the keep, and finished at the sea.',
  },
}

// A journey's `location`, kept in capitals ("KAMAKURA · KANAGAWA, JAPAN"),
// in normal capitalisation to show: "Kamakura · Kanagawa, Japan". Every word
// starts with a capital, including ones that begin with an accented letter
// ("ŌHARA" as "Ōhara"), but not after an apostrophe ("St. John's").
function titleCase(text) {
  return text
    .toLowerCase()
    .replace(/(^|[^\p{L}\p{M}'’])(\p{Ll})/gu, (_, before, letter) => before + letter.toUpperCase())
    .replace('Usa', 'USA')
}

// All of it: "Kamakura · Kanagawa, Japan".
export function fullPlaceName(location) {
  return titleCase(location)
}

// Without the town: "Kanagawa, Japan".
export function placeName(location) {
  return titleCase(location.split(' · ')[1])
}

// The town and the country, without the region: "Kamakura, Japan", or
// "Nassau, The Bahamas".
export function townAndCountry(location) {
  const [town, rest] = location.split(' · ')
  return titleCase(`${town}, ${rest.split(', ').at(-1)}`)
}

// Every journey, the featured one first: it's the first on Home. The AI-made
// ones (aiJourneys/) come after the checked ones.
// Last of all, the test journey for the live map and the route preview, The
// Edge of Old Edo (testJourney.js), and the two built the same way for Miami
// Beach and Nassau (miamiJourney.js, nassauJourney.js).
export const ALL_JOURNEYS = [
  odawaraJourney,
  kawagoeJourney,
  ...AI_JOURNEYS,
  wasedaTestJourney,
  miamiJourney,
  nassauJourney,
]

// Each journey's time, "~4 hours" on its card and 4 for matching, is worked
// out from its stops' times (journeyTimes.js) rather than written in, so the
// two always agree.
for (const journey of ALL_JOURNEYS) {
  const hours = journeyHours(journey)
  journey.time = hoursText(hours)
  journey.match.hours = hours
}
