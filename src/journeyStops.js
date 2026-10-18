// Every stop on the journey, one card each. The stop screens in
// StopPages.jsx are the same for every stop and fill themselves in from
// these, so adding a stop is mostly writing its card.
//
// Each stop has two screens:
//   directions: the photo, then a map from wherever you are to the stop,
//               and I'M HERE once you've got there.
//   arrived:    the photo again, then the narration to listen to or read.

import emaTunnelPhoto from './assets/journey/ema-tunnel.jpg'
import kawagoeStationPhoto from './assets/journey/kawagoe-station.jpg'
import imofukudoPhoto from './assets/journey/imofukudo.jpg'

export const kawagoeStation = {
  name: 'Kawagoe Station',
  photo: kawagoeStationPhoto,
  photoAlt: 'Kawagoe Station and its rail lines, seen from above',

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
  name: 'Imofukudo',
  photo: imofukudoPhoto,
  photoAlt: 'A torched grilled sweet potato on a patterned plate, with bowls of sweet potato chips',
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

// The journey as a whole, for Browse Journeys and See Your Journey.
export const kawagoeJourney = {
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

  // Where it starts. "Already at the starting point?" skips straight past it
  // to firstStop.
  start: kawagoeStation,
  startArea: 'Kawagoe, Saitama, Japan',
  startNote: 'Travel to the start is separate from journey time.',
  firstStop: imofukudo,

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
}
