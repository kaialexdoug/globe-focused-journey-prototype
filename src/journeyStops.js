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

import emaTunnelPhoto from './assets/journey/ema-tunnel.jpg'
import kawagoeStationPhoto from './assets/journey/kawagoe-station.jpg'
import imofukudoPhoto from './assets/journey/imofukudo.jpg'
import tokiNoKanePhoto from './assets/journey/tokinokane.jpg'
import kawagoeMuseumPhoto from './assets/journey/kawagoemuseum.jpg'
import kawagoeCastlePhoto from './assets/journey/kawagoecastle.jpg'
import hikawaShrinePhoto from './assets/journey/hikawa.jpg'
import maruyaPhoto from './assets/journey/maruya.jpg'

import odawaraStationPhoto from './assets/journey/odawarastation.jpeg'
import kamabokoDoriPhoto from './assets/journey/kamabokodori.jpg'
import cultureMuseumPhoto from './assets/journey/culturemuseum.jpg'
import ninjaMuseumPhoto from './assets/journey/ninjacenter.jpg'
import odawaraCastlePhoto from './assets/journey/odawaracastle.jpg'
import miyukinohamaPhoto from './assets/journey/miyukinohama.jpg'

// --- Adventure in Kawagoe ---

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
  travelMode: 'transit',

  // On each screen's photo: the red heading, then the small label above the
  // name.
  directionsHeading: 'Departure',
  directionsLabel: 'YOUR JOURNEY BEGINS AT',
  arrivedHeading: 'Arrival',
  arrivedLabel: "YOU'VE ARRIVED",

  // One entry per paragraph. className "narrationLead" makes it the big
  // opening line, and "narrationClose" the italic last line.
  narration: [
    {
      className: 'narrationLead',
      text: "You've made it.",
    },
    {
      text: "Step off, and take a second before you start walking. This is Kawagoe Station. Unassuming, a little worn at the edges, nothing like what's waiting a few minutes from here.",
    },
    {
      text: "Most people who come through this station are heading somewhere else. Commuters, students, people just passing through to the bigger stops down the line. You're not. You're here on purpose.",
    },
    {
      text: "From here, it's a short walk into the old part of town. No need to rush, the first stop isn't going anywhere, and neither is the day. Just follow the path, and we'll take it from there.",
    },
    {
      className: 'narrationClose',
      text: "Ready? Let's go.",
    },
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
  travelMode: 'walking',

  directionsHeading: 'Discovery',
  directionsLabel: 'YOUR NEXT STOP',
  arrivedHeading: 'Discovery',
  arrivedLabel: "YOU'VE ARRIVED",

  narration: [
    {
      text: 'Kawagoe’s been known for its sweet potatoes for centuries, the soil here just happens to be perfect for them, and the town never let anyone forget it.',
    },
    {
      text: 'Imofukudo’s one of the places locals actually go for it, not just tourists passing through. Their torched grilled sweet potato is the one to watch for, they heat it right in front of you, so don’t be surprised if you end up just standing there watching before you even taste it. If that’s not your thing, they’ve got plenty of other potato-flavored snacks and soft-serve worth a look too.',
    },
    {
      className: 'narrationClose',
      text: 'No rush. Taste it, look around, then when you’re ready, we’ll keep moving.',
    },
  ],
}

// --- Detours ---
// A detour is a stop like any other, with a `teaser` for the Detours page,
// saying what it's about without giving the narration away. A stop lists its
// detours in `detours` (see Toki no Kane, below).

export const kawagoeMuseum = {
  id: 'kawagoeMuseum',
  name: 'Kawagoe City Museum',
  photo: kawagoeMuseumPhoto,
  photoAlt: 'Inside the museum: a recreated merchant street, an old sweet potato cart and a model of the town',
  memory: 'The town’s story, told up close.',
  teaser: 'Step inside the story of the town you’ve been walking through. A quiet stop that most visitors walk straight past.',

  // The Japanese name, because "Kawagoe City Museum" finds the art museum
  // next door first.
  mapPlace: '川越市立博物館',
  travelMode: 'walking',

  directionsHeading: 'Detour',
  directionsLabel: 'YOUR DETOUR',
  arrivedHeading: 'Detour',
  arrivedLabel: "YOU'VE ARRIVED",

  narration: [
    {
      text: 'You’re here. Most people walk right past this one on their way to the famous streets, which is a little unfair to it.',
    },
    {
      text: 'Inside, it tells the story of the town you’ve been walking through: who lived here, what they made, and how the old merchant streets came to look the way they do. You don’t need to read every label. Wander until something catches you, then stay with that one for a bit.',
    },
    {
      className: 'narrationClose',
      text: 'Whenever you’re done, we’ll head back to the route.',
    },
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
  travelMode: 'walking',

  directionsHeading: 'Detour',
  directionsLabel: 'YOUR DETOUR',
  arrivedHeading: 'Detour',
  arrivedLabel: "YOU'VE ARRIVED",

  narration: [
    {
      text: 'This is it. Yes, it really is just a quiet wooden building. The towers and walls are long gone, and what’s left is the old palace hall, the part where the lord actually lived and worked.',
    },
    {
      text: 'Step inside and look at the rooms. It feels more like visiting an old house than a fortress, and that’s the point. It’s one of the few buildings of its kind that survived.',
    },
    {
      className: 'narrationClose',
      text: 'Take your time here. When you’re ready, we’ll get back on the route.',
    },
  ],
}

export const tokiNoKane = {
  id: 'tokiNoKane',
  name: 'Toki no Kane',
  photo: tokiNoKanePhoto,
  photoAlt: 'The wooden Toki no Kane bell tower rising above an old street of shops in Kawagoe',
  memory: 'Four centuries of ringing out the hours.',

  mapPlace: 'Toki no Kane, Kawagoe',
  travelMode: 'walking',

  directionsHeading: 'Build',
  directionsLabel: 'YOUR NEXT STOP',
  arrivedHeading: 'Build',
  arrivedLabel: "YOU'VE ARRIVED",

  // This stop has optional detours, as many as are listed here. On its
  // narration screen, detoursNote sits above SEE DETOURS, with CONTINUE
  // underneath for skipping them.
  detours: [kawagoeMuseum, kawagoeCastle],
  detoursNote: 'This part of the journey comes with two detours: short side trips worth taking if you’re curious. They’re entirely up to you.',

  narration: [
    {
      text: 'Walk a little further down the main street and you’ll see it, a wooden bell tower rising above the rooftops. Toki no Kane has been ringing out the hours over Kawagoe for about four centuries. The current tower is a bit younger, rebuilt after a big fire in the 1890s, and the town kept it going anyway.',
    },
    {
      text: 'It’s the one everyone photographs, so you’ll probably have company. Take your photo, then stay a minute. If you happen to be here when the bell rings, it still sounds the way it always has.',
    },
    {
      text: 'From here, the day opens up. If you feel like wandering, the museum and the old castle remains are close by, and either is worth a detour. If you’d rather keep going, that works too. Either way, the best part of the day is still ahead of you. We’ll get there.',
    },
  ],
}

export const hikawaShrine = {
  id: 'hikawaShrine',
  name: 'Hikawa Shrine',
  photo: hikawaShrinePhoto,
  photoAlt: 'The main hall of Kawagoe Hikawa Shrine, under a wide green roof among tall trees',
  memory: 'Fifteen hundred years of wishes, overhead.',

  mapPlace: 'Kawagoe Hikawa Shrine',
  travelMode: 'walking',

  directionsHeading: 'Peak',
  directionsLabel: 'YOUR NEXT STOP',
  arrivedHeading: 'Peak',
  arrivedLabel: "YOU'VE ARRIVED",

  narration: [
    {
      className: 'narrationLead',
      text: 'You made it. This is what the day was building toward.',
    },
    {
      text: 'Hikawa Shrine has stood here for roughly fifteen hundred years, long before the sweet potatoes, the bell, or the merchant streets. People have been coming to this spot to ask for good things for a very long time. Look up at the long tunnel of ema, the wooden wishes hung overhead, each one left by someone who stood where you’re standing.',
    },
    {
      className: 'narrationClose',
      text: 'The crowds stayed back on the main street. You took the quieter way here.',
    },
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
  travelMode: 'walking',

  directionsHeading: 'Afterglow',
  directionsLabel: 'YOUR LAST STOP',
  arrivedHeading: 'Afterglow',
  arrivedLabel: "YOU'VE ARRIVED",

  narration: [
    {
      text: 'That’s the last stop. The best part of the day is behind you, and it’s fine to just let it settle.',
    },
    {
      text: 'If you’re hungry, MARUYA is worth the walk. It’s a small place known for oyakodon made with charcoal-grilled chicken, which is simple and warm and exactly what the moment calls for.',
    },
    {
      className: 'narrationClose',
      text: 'Sit down, eat slowly, and take your time. You’ve earned it.',
    },
  ],
}

// The journey as a whole, for Browse Journeys, See Your Journey and the
// Memory page at the end.
export const kawagoeJourney = {
  // A short name the app uses for it, like a stop's id.
  id: 'kawagoe',
  name: 'Adventure in Kawagoe',
  location: 'KAWAGOE · SAITAMA, JAPAN',
  photo: emaTunnelPhoto,
  photoAlt: 'A tunnel of wooden prayer plaques at a shrine in Kawagoe',

  // Under the name on the Browse Journeys card.
  blurb: 'Explore the historic streets of Kawagoe.',
  // The first line under the photo on See Your Journey.
  tagline: 'Yours to explore, whenever you’re ready.',

  // The three quick facts under it.
  time: '~2 hours',
  walking: 'Flat walking',
  stops: '~5 stops',

  // Its stops, part by part. "Already at the starting point?" skips straight
  // past the departure to the discovery. The build is the stop with the
  // detours.
  departure: kawagoeStation,
  discovery: imofukudo,
  build: tokiNoKane,
  peak: hikawaShrine,
  afterglow: maruya,

  // Under START HERE on See Your Journey.
  startArea: 'Kawagoe, Saitama, Japan',
  startNote: 'Travel to the start is separate from journey time.',

  // Why it's been picked for you, by traveler type. Only shown once you've
  // taken the quiz.
  reasons: {
    'The Naturalist': 'For your love of hidden history',
    'The Collector': 'For your love of the classic sights',
    'The Wanderer': 'For your love of side streets and street food',
  },

  // "Why we recommend this journey", one entry per paragraph.
  why: [
    'Everyone who comes to Kawagoe sees the same bell tower, the same warehouse street, the same photo. This journey starts there too — but it doesn’t end there.',
    'Past the crowds, down streets most visitors never think to turn down, there’s a reason the locals still call this town “Koedo” (little Edo). A gate that’s marked time here for over a century. A quiet shrine tucked away from the noise, holding something most people walk straight past.',
    'We won’t tell you what it is. You’ll have to go see for yourself.',
  ],

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

export const odawaraStation = {
  id: 'odawaraStation',
  name: 'Odawara Station',
  photo: odawaraStationPhoto,
  photoAlt: 'An old-style wooden shopping street hung with red lanterns, outside Odawara Station',
  memory: 'Where the day began.',

  mapPlace: 'Odawara Station',
  // Its exact spot (from its Google Maps link), for the live map that
  // follows you as you go (LiveMap.jsx). Stops without one, like Kawagoe's,
  // get the simpler embedded map.
  mapPoint: { lat: 35.2564449, lng: 139.1553932 },
  travelMode: 'transit',

  directionsHeading: 'Departure',
  directionsLabel: 'YOUR JOURNEY BEGINS AT',
  arrivedHeading: 'Arrival',
  arrivedLabel: "YOU'VE ARRIVED",

  narration: [
    {
      className: 'narrationLead',
      text: 'You’re in Odawara.',
    },
    {
      text: 'The first stop is a street on the old Tokaido road, about fifteen minutes on foot toward the sea.',
    },
    {
      className: 'narrationClose',
      text: 'Follow the map, and tap “I’m Here” when you reach Kamaboko-dori.',
    },
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

  directionsHeading: 'Discovery',
  directionsLabel: 'YOUR NEXT STOP',
  arrivedHeading: 'Discovery',
  arrivedLabel: "YOU'VE ARRIVED",

  narration: [
    {
      text: 'This street was part of the old Tokaido road, and the shops along it have been making kamaboko for generations. Grab something hot and fried to eat as you walk, and stop at whichever shops catch your eye.',
    },
    {
      text: 'If you’d rather sit down, Cafe & Restaurant Yamajo is just behind the street, upstairs in a kamaboko factory with a view over the bay. It’s run by a maker with more than a century of history, and lunch there is built around their kamaboko.',
    },
    {
      className: 'narrationClose',
      text: 'Either way, there’s no rush. When you’re ready, we’ll turn back toward the castle.',
    },
  ],
}

export const ninjaMuseum = {
  id: 'ninjaMuseum',
  name: 'Odawara Castle NINJA Museum',
  photo: ninjaMuseumPhoto,
  photoAlt: 'Visitors in a dimly lit hall with a recreated wooden house, a pond of stepping stones and ninja figures',
  memory: 'A playful corner of the castle grounds.',
  teaser: 'Odawara’s lords once kept a band of ninja of their own. A playful, hands-on corner of the castle grounds.',

  mapPlace: 'Odawara Castle NINJA Museum',
  mapPoint: { lat: 35.250641, lng: 139.155743 },
  travelMode: 'walking',

  directionsHeading: 'Detour',
  directionsLabel: 'YOUR DETOUR',
  arrivedHeading: 'Detour',
  arrivedLabel: "YOU'VE ARRIVED",

  narration: [
    {
      text: 'You’ve found the side trip. It’s a playful corner of the castle grounds, and a few minutes here is plenty.',
    },
    {
      className: 'narrationClose',
      text: 'When you’re ready, we’ll head back to the route.',
    },
  ],
}

export const cultureMuseum = {
  id: 'cultureMuseum',
  name: 'Odawara Local Culture Museum',
  photo: cultureMuseumPhoto,
  photoAlt: 'Glass cases of ancient pottery and tools in the museum',
  memory: 'The town’s history, in small pieces.',

  mapPlace: 'Odawara Local Culture Museum',
  mapPoint: { lat: 35.249716, lng: 139.154941 },
  travelMode: 'walking',

  directionsHeading: 'Build',
  directionsLabel: 'YOUR NEXT STOP',
  arrivedHeading: 'Build',
  arrivedLabel: "YOU'VE ARRIVED",

  detours: [ninjaMuseum],
  detoursNote: 'This part of the journey comes with a detour: a short side trip worth taking if you’re curious. It’s entirely up to you.',

  narration: [
    {
      text: 'Now we head back inland, toward the castle. You’re close, and the best part of the day is still ahead.',
    },
    {
      text: 'The grounds around the castle hold the town’s history in small pieces, and this museum is a good place to pick up a few.',
    },
    {
      className: 'narrationClose',
      text: 'Look at whatever catches your eye. You don’t need to see it all.',
    },
  ],
}

export const odawaraCastle = {
  id: 'odawaraCastle',
  name: 'Odawara Castle',
  photo: odawaraCastlePhoto,
  photoAlt: 'The white keep of Odawara Castle on its stone walls, among cherry blossoms',
  memory: 'The top of the keep, looking out to the bay.',

  // Finds the keep itself.
  mapPlace: 'Odawara Castle',
  mapPoint: { lat: 35.2509493, lng: 139.1535136 },
  travelMode: 'walking',

  directionsHeading: 'Peak',
  directionsLabel: 'YOUR NEXT STOP',
  arrivedHeading: 'Peak',
  arrivedLabel: "YOU'VE ARRIVED",

  narration: [
    {
      className: 'narrationLead',
      text: 'You made it. This is what the day was building toward.',
    },
    {
      text: 'The keep you’re standing in was rebuilt in 1960, but the hill it sits on once held out against some of the most powerful warlords in Japan, until a siege in 1590 finally ended it. Climb to the top deck and look out toward the bay.',
    },
    {
      className: 'narrationClose',
      text: 'Take as long as you like.',
    },
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

  directionsHeading: 'Afterglow',
  directionsLabel: 'YOUR LAST STOP',
  arrivedHeading: 'Afterglow',
  arrivedLabel: "YOU'VE ARRIVED",

  narration: [
    {
      text: 'That’s the last stop. Take the long way down to Miyuki-no-Hama and let the day settle. There’s no destination now, only the sound of the sea.',
    },
    {
      className: 'narrationClose',
      text: 'If you’re hungry, dinner is up to you. You’ve earned it.',
    },
  ],
}

export const odawaraJourney = {
  id: 'odawara',
  name: 'Where the Old Road Meets the Sea',
  location: 'ODAWARA · KANAGAWA, JAPAN',
  photo: odawaraCastlePhoto,
  photoAlt: 'The white keep of Odawara Castle on its stone walls, among cherry blossoms',

  blurb: 'From the old Tokaido road to the castle, and down to the sea.',
  tagline: 'Yours to explore, whenever you’re ready.',

  time: '~4 hours',
  walking: 'Easy walking',
  stops: '~5 stops',

  departure: odawaraStation,
  discovery: kamabokoDori,
  build: cultureMuseum,
  peak: odawaraCastle,
  afterglow: miyukinohama,

  startArea: 'Odawara, Kanagawa, Japan',
  startNote: 'Travel to the start is separate from journey time.',

  reasons: {
    'The Naturalist': 'For your love of the sea and a quiet coast',
    'The Collector': 'For your love of castles and old shops',
    'The Wanderer': 'For your love of old roads and street food',
  },

  why: [
    'For centuries, travelers on the road between Edo and Kyoto stopped here to rest, eat, and look at the water. The town hasn’t changed that much: fish from the bay, shops that have been open longer than anyone can remember, and a quiet stretch of coast waiting at the end of the day. We’ll walk you through it, and somewhere along the way there’s one moment that makes the whole trip worth it.',
  ],

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

// Every journey, the featured one first: it's the one the quiz picks, and
// the first on Browse Journeys.
export const ALL_JOURNEYS = [odawaraJourney, kawagoeJourney]
