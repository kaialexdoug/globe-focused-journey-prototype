// A test journey around Takadanobaba and Waseda (Tokyo), for trying out the
// live map near home. Every stop has its exact spot (`mapPoint`, taken from
// Wikipedia's coordinates), so the directions screens use the live map that
// follows you, the same as the Odawara journey. The AI journeys don't have
// exact spots, so they get the simpler embedded map instead.
//
// The photos are borrowed from other journeys for now, as stand-ins. The
// writing and the times are estimates, like an AI journey's. To take it out,
// remove it from ALL_JOURNEYS in journeyStops.js.

import stationPhoto from './assets/journey/yanaka/nippori.jpg'
import gardenPhoto from './assets/journey/yanaka/shinobazu.jpg'
import shrinePhoto from './assets/journey/yanaka/nezu-shrine.jpg'
import libraryPhoto from './assets/journey/yanaka/scai.jpg'
import auditoriumPhoto from './assets/journey/yanaka/yanaka-ginza.jpg'
import hosokawaPhoto from './assets/journey/yanaka/cemetery.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, TAGLINE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE,
} from './aiJourneys/parts.js'

const takadanobaba = {
  id: 'takadanobabaStation',
  name: 'Takadanobaba Station',
  photo: stationPhoto,
  photoAlt: 'A stand-in photo of a Tokyo station, borrowed from another journey',
  memory: 'Where the day began.',
  mapPlace: 'Takadanobaba Station',
  mapPoint: { lat: 35.71222222, lng: 139.70375 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  nearby: [
    { name: 'Astro Boy murals', note: 'Under the railway bridge by the station. In the story, Astro Boy was made right here', meters: 100 },
  ],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Takadanobaba.' },
    { text: 'The name goes back to the days of Edo, when there was a riding ground here for the shogun’s horsemen. Now it’s a student town, busy and a little scruffy, with Waseda University just down the road.' },
    { className: 'narrationClose', text: 'The first stop is a quiet garden, about fifteen minutes east along Waseda-dori. Follow the map, and tap “I’m Here” when you reach Kansen-en.' },
  ],
}

const kansenen = {
  id: 'kansenen',
  name: 'Kansen-en Garden',
  photo: gardenPhoto,
  photoAlt: 'A stand-in photo of a garden pond, borrowed from another journey',
  memory: 'A quiet pond just off the main road.',
  mapPlace: 'Kansen-en Park, Shinjuku',
  mapPoint: { lat: 35.7117, lng: 139.7161 },
  travelMode: 'walking',
  travelMinutes: 15,
  stayMinutes: [20, 30],
  nearby: [
    { name: 'Mizu Inari Shrine', note: 'Next door, with Takada Fuji, a little man-made Mount Fuji said to be the oldest in the city', meters: 100 },
  ],
  ...DISCOVERY,
  narration: [
    { text: 'This is Kansen-en, a small strolling garden around a pond fed by spring water. The name means something like “the garden of the sweet spring”.' },
    { text: 'Walk the path around the water slowly. It’s easy to forget the main road is only a minute away.' },
    { className: 'narrationClose', text: 'Next, a shrine a short walk south. Follow the map when you’re ready.' },
  ],
}

const murakamiLibrary = {
  id: 'murakamiLibrary',
  name: 'Haruki Murakami Library',
  photo: libraryPhoto,
  photoAlt: 'A stand-in photo of an old building, borrowed from another journey',
  memory: 'Through the wooden tunnel of books.',
  teaser: 'Waseda’s library of Haruki Murakami’s books and records, through an arch of wood. A short walk across campus.',
  mapPlace: 'Waseda International House of Literature',
  mapPoint: { lat: 35.70986566, lng: 139.71992742 },
  travelMode: 'walking',
  travelMinutes: 5,
  stayMinutes: [30, 45],
  ...DETOUR,
  narration: [
    { text: 'Haruki Murakami studied at Waseda, and this building is given over to him and to writing from around the world. Its official name is the Waseda International House of Literature.' },
    { text: 'Look for the wooden arch over the entrance and the staircase lined with shelves inside, like walking through a tunnel of books.' },
    BACK_TO_ROUTE,
  ],
}

const anahachiman = {
  id: 'anahachiman',
  name: 'Anahachiman Shrine',
  photo: shrinePhoto,
  photoAlt: 'A stand-in photo of a red shrine, borrowed from another journey',
  memory: 'Up the steps to Anahachiman.',
  mapPlace: 'Anahachiman Shrine, Shinjuku',
  mapPoint: { lat: 35.70733333, lng: 139.71722222 },
  travelMode: 'walking',
  travelMinutes: 10,
  stayMinutes: [15, 20],
  ...BUILD,
  detours: [murakamiLibrary],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { text: 'This is Anahachiman, on its hill above the crossroads by Waseda Station. Its name means “the Hachiman of the cave”, after a cave that’s said to have been found when the ground here was first cleared.' },
    { text: 'Climb up past the big red gate and look back down over the street. It’s known for a good-luck charm that people come for every winter.' },
    { text: 'From here, the university is just across the road. There’s a library on the way, if you’d like a detour. Otherwise, head for the clock tower.' },
  ],
}

const okumaAuditorium = {
  id: 'okumaAuditorium',
  name: 'Okuma Auditorium',
  photo: auditoriumPhoto,
  photoAlt: 'A stand-in photo of a Tokyo street, borrowed from another journey',
  memory: 'Under the clock tower at Waseda.',
  mapPlace: 'Okuma Auditorium, Waseda University',
  mapPoint: { lat: 35.70888889, lng: 139.72166667 },
  travelMode: 'walking',
  travelMinutes: 10,
  stayMinutes: [20, 30],
  nearby: [{ name: 'Okuma Garden', note: 'A lawn and garden right behind the auditorium', meters: 100 }],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { text: 'The Okuma Auditorium, with its tall clock tower, is the symbol of Waseda University. It’s named after Okuma Shigenobu, who founded the university and was twice prime minister of Japan.' },
    { text: 'Stand back far enough to take in the whole tower. Students have been meeting under it for close to a hundred years.' },
    PEAK_CLOSE,
  ],
}

const higoHosokawa = {
  id: 'higoHosokawa',
  name: 'Higo Hosokawa Garden',
  photo: hosokawaPhoto,
  photoAlt: 'A stand-in photo of a green path, borrowed from another journey',
  memory: 'The day settling by the pond.',
  mapPlace: 'Higo Hosokawa Garden',
  mapPoint: { lat: 35.713043, lng: 139.722625 },
  travelMode: 'walking',
  travelMinutes: 10,
  stayMinutes: [30, 45],
  nearby: [
    { name: 'Toden Waseda stop', note: 'The end of the line for the Toden Arakawa Line, the last of Tokyo’s old streetcars', meters: 350 },
    { name: 'Eisei Bunko Museum', note: 'The Hosokawa family’s art collection, just up the hill', meters: 250 },
  ],
  ...AFTERGLOW,
  narration: [
    { text: 'That’s the last stop. This garden once belonged to the Hosokawa family, the lords of Higo, and it sits at the foot of the hill by the Kanda River.' },
    { text: 'Follow the path around the pond and up the slope behind it, then find a spot to sit and let the day settle.' },
    { className: 'narrationClose', text: 'That’s the walk. Home is wherever you’re heading next.' },
  ],
}

export default {
  id: 'wasedaTest',
  name: 'Takadanobaba to Waseda (test)',
  location: 'TAKADANOBABA · TOKYO, JAPAN',
  photo: auditoriumPhoto,
  photoAlt: okumaAuditorium.photoAlt,
  blurb: 'A test walk for the live map, from the station to the clock tower and a garden.',
  tagline: TAGLINE,
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experience: 'Cultural',
  departure: takadanobaba,
  discovery: kansenen,
  build: anahachiman,
  peak: okumaAuditorium,
  afterglow: higoHosokawa,
  startArea: 'Takadanobaba, Tokyo, Japan',
  startNote: START_NOTE,
  match: {
    moods: { Peaceful: 70, Adventurous: 30, Romantic: 50, Curious: 70, Playful: 40, Cultural: 80 },
    with: { Solo: 90, Couple: 75, Family: 60, 'Friends / Group': 70 },
    preferences: { 'Pet friendly': 40, 'Avoid alcohol': 85, 'More nature': 50, 'Food stops': 40 },
  },
  why: [
    'A short walk through the student side of Tokyo, made for testing the live map: a spring-fed garden, a shrine on a hill, the clock tower at the heart of Waseda, and a lord’s old garden by the river to finish.',
  ],
  route: [takadanobaba, kansenen, anahachiman, okumaAuditorium, higoHosokawa],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Takadanobaba and Waseda, on foot. Whatever you took from the walk, it’s yours now.',
    summary: 'You started at Takadanobaba Station, walked to the pond at Kansen-en, climbed up to Anahachiman, stood under the clock tower of the Okuma Auditorium, and finished in the Higo Hosokawa Garden.',
  },
}
