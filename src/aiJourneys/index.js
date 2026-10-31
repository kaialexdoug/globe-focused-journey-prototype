// Journeys put together with AI, to fill out the app until there are more
// checked ones, one to a file. Each is built the same way as the journeys
// in journeyStops.js, around real places, with two differences:
//
//   aiMade: true  shows the AI badge, and a note before you begin saying
//                 nothing on it has been checked yet.
//   no mapPoint   no exact spot for the live map, since an AI guess could
//                 be wrong. Every stop gets the embedded map, which finds
//                 it by name.
//
// The writing sticks to what each place is like and what to do there, with
// no opening times, prices or dates. Once a journey has been walked and
// checked, it can move to journeyStops.js without `aiMade`.
//
// `match` is for Find My Journey: the moods it suits (from the six on its
// first screen), who it suits, roughly how many hours it takes, and how
// much effort it is ('Easy' or 'Moderate').
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README).

import kamakura from './kamakura.js'
import hakone from './hakone.js'
import yokohama from './yokohama.js'
import yanaka from './yanaka.js'
import takao from './takao.js'
import nikko from './nikko.js'
import narita from './narita.js'
import chichibu from './chichibu.js'
import kusatsu from './kusatsu.js'
import fujiyoshida from './fujiyoshida.js'
import duluth from './duluth.js'
import northShore from './northShore.js'
import minneapolis from './minneapolis.js'
import stPaul from './stPaul.js'
import stillwater from './stillwater.js'
import minnehaha from './minnehaha.js'
import redWing from './redWing.js'
import taylorsFalls from './taylorsFalls.js'
import itasca from './itasca.js'
import grandMarais from './grandMarais.js'

// The Kanto ones first, then Minnesota.
export const AI_JOURNEYS = [
  kamakura, hakone, yokohama, yanaka, takao, nikko, narita, chichibu, kusatsu, fujiyoshida,
  duluth, northShore, minneapolis, stPaul, stillwater, minnehaha, redWing, taylorsFalls, itasca, grandMarais,
]
