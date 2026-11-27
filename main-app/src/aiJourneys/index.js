// Journeys put together with AI, to fill out the app until there are more
// checked ones, one to a file. Each is built the same way as the journeys
// in journeyStops.js, around real places, with two differences:
//
//   aiMade: true  shows the AI GENERATED tag on its card on Home. (The
//                 Waseda, Miami Beach and Nassau journeys have it too.)
//
// Like those three, every stop has its exact spot (`mapPoint`) and the walk
// to it, and its history has been checked against published sources (see
// each file's opening comment). The writing sticks to what each place is
// like and what to do there, with no opening times or prices.
//
// `bestTime` is when to go, for Weather & Best Time to Go on See Your
// Journey (see BestTime.jsx). Every journey has it.
//
// `beforeYouGo` is what to know before setting off, for Before You Go on
// See Your Journey (see BeforeYouGo.jsx for its shape): what to bring,
// costs, getting there, access, hours and tips. Unlike the writing, it does
// give opening times and prices, checked against each place's own pages (or
// visitor guides, where a place has none), and says when. Every journey has
// it.
//
// Once a journey has been walked and checked, it can move to journeyStops.js
// with `verified: true` in place of `aiMade`.
//
// `experiences` is the kinds of experience it is (see experienceIcons.js),
// as many as fit it, its main one first, which is the one shown with it.
//
// `city` is the city or municipality the journey is in (one of Tokyo's wards
// counts), for Cities Visited on Profile, or null if it isn't in one, like
// a state park. The journeys in journeyStops.js and the others have it too.
//
// `match` is for Find My Journey (journeyMatch.js): how well it suits each
// answer, out of 100. These are estimates from what's on the journey, not
// checked facts.
//
// Each stop's `travelMinutes` and `stayMinutes` are estimates too: about how
// long it takes to get there from the stop before, and the suggested time to
// spend there (see journeyTimes.js). The journey's time, and its hours for
// matching, are worked out from them. The distances to the spots in a stop's
// `nearby`, if it has any, are rough estimates as well, and it lists only
// spots that are really worth it.
//
// `photoPosition` is optional: which part of a wide photo to keep when it's
// cropped to fill a tall screen, if the middle would miss what it's a photo of.
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
// The Cumberland test (Dad's handoff): one journey for each kind of
// experience the town could honestly support, each its own journey.
import cumberlandHistory from './cumberlandHistory.js'
import cumberlandCulture from './cumberlandCulture.js'
import cumberlandScenic from './cumberlandScenic.js'
import cumberlandNature from './cumberlandNature.js'
// Made to the Journey Engine V2 handoff (peak first, checked sources, and
// photos with Unfold's mood treatment: see photo-originals/), starting with
// its gold-standard journey.
import marunouchi from './marunouchi.js'
import duluthRomantic from './duluthRomantic.js'
import duluthAdventurous from './duluthAdventurous.js'
import duluthCurious from './duluthCurious.js'
import edenPrairie from './edenPrairie.js'
import ohara from './ohara.js'
import nara from './nara.js'
import miyajima from './miyajima.js'
import kanazawa from './kanazawa.js'
import grandBahama from './grandBahama.js'
import harbourIsland from './harbourIsland.js'
import castawayCay from './castawayCay.js'
import fortLauderdaleRiver from './fortLauderdaleRiver.js'
import bonnetHouse from './bonnetHouse.js'
import wadeIns from './wadeIns.js'
import barefootMailman from './barefootMailman.js'
import hollywoodBeach from './hollywoodBeach.js'
import boraBora from './boraBora.js'
import montSaintMichel from './montSaintMichel.js'
import florence from './florence.js'
import chefchaouen from './chefchaouen.js'
import newYork from './newYork.js'
import sanFrancisco from './sanFrancisco.js'
import laJolla from './laJolla.js'
import banff from './banff.js'
import varanasi from './varanasi.js'
import chiangMai from './chiangMai.js'
import capeTown from './capeTown.js'
// Miami, for families (28 Nov 2026): Key Biscayne, downtown, Little Havana,
// and the Miccosukee airboats out on the Tamiami Trail.
import keyBiscayne from './keyBiscayne.js'
import miamiDowntown from './miamiDowntown.js'
import littleHavana from './littleHavana.js'
import miccosukee from './miccosukee.js'

// The Kanto ones first, then Minnesota, then Cumberland, Wisconsin, then the
// ones made to the V2 handoff.
export const AI_JOURNEYS = [
  kamakura, hakone, yokohama, yanaka, takao, nikko, narita, chichibu, kusatsu, fujiyoshida,
  duluth, northShore, minneapolis, stPaul, stillwater, minnehaha, redWing, taylorsFalls, itasca, grandMarais,
  cumberlandHistory, cumberlandCulture, cumberlandScenic, cumberlandNature,
  marunouchi, duluthRomantic, duluthAdventurous, duluthCurious, edenPrairie,
  ohara, nara, miyajima, kanazawa,
  grandBahama, harbourIsland, castawayCay,
  fortLauderdaleRiver, bonnetHouse, wadeIns, barefootMailman, hollywoodBeach,
  boraBora, montSaintMichel, florence, chefchaouen, newYork, sanFrancisco,
  laJolla, banff, varanasi, chiangMai, capeTown,
  keyBiscayne, miamiDowntown, littleHavana, miccosukee,
]
