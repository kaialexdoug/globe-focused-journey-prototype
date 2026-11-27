// Seals, Sea Lions and a Sea Cave (La Jolla, San Diego): a playful
// afternoon for a couple, made to the Journey Engine V2 handoff (flagship
// destinations: San Diego).
//
// Its peak, chosen first: Sunny Jim Cave, a sea cave reached by climbing
// down 145 steps through a tunnel dug by hand in 1902–03, which comes out
// in a window over the ocean. Why La Jolla is San Diego's exceptional
// experience: a short stretch of cliff-top coast where wild harbor seals
// and sea lions haul out right beside the path. The thread is who the
// coast was made for: a beach built for children that seals took over,
// rocks the sea lions own, and a tunnel dug for people to reach the sea.
//
// Primary mood: Playful. Audience: a couple. On foot, about 1.6 km, flat
// along the cliffs, plus the cave's steps.
//
// Exact spots from OpenStreetMap; walks from Google's Routes API (November
// 2026). Checked in November 2026 against reporting and the Coastal
// Commission on the Children's Pool and its pupping-season closure, the
// National Park Service's page on La Jolla's tide pools and the Children's
// Pool, and visitor listings and histories of Sunny Jim Cave.

import heroPhoto from '../assets/journey/la-jolla/hero.jpg'
import poolPhoto from '../assets/journey/la-jolla/pool.jpg'
import sealPhoto from '../assets/journey/la-jolla/seal.jpg'
import seaLionsPhoto from '../assets/journey/la-jolla/sea-lions.jpg'
import cavePhoto from '../assets/journey/la-jolla/cave.jpg'
import napPhoto from '../assets/journey/la-jolla/nap.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE, DINNER } from './parts.js'

const pool = {
  id: 'childrensPool',
  name: 'The Children’s Pool',
  photo: poolPhoto,
  photoAlt: 'The curving sea wall and sheltered beach of the Children’s Pool in La Jolla',
  memory: 'A beach built for children.',
  mapPlace: 'Children’s Pool, 850 Coast Blvd, La Jolla, San Diego',
  mapPoint: { lat: 32.84755, lng: -117.2786 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [10, 15],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Along this little stretch of coast, the wildlife doesn’t keep its distance. Today, you play by their rules.' },
    { kind: 'heading', text: 'A pool for children' },
    { text: 'In 1931 a curving concrete sea wall was built here to make a calm, safe pool where children could learn to swim, paid for, by most accounts, by the philanthropist Ellen Browning Scripps. It opened in 1932, and for years it was full of children.' },
    { kind: 'find', text: 'Follow the sea wall with your eyes and find where the calm water inside meets the waves outside.' },
    { className: 'narrationClose', text: 'Now look down at the sand. Tap “I’m Here” at the railing above the beach.' },
  ],
}

const seals = {
  id: 'harborSeals',
  name: 'The Harbor Seals',
  photo: sealPhoto,
  photoAlt: 'A spotted harbor seal resting on the rocks at the Children’s Pool',
  memory: 'The seals moved in.',
  mapPlace: 'Children’s Pool Beach, La Jolla, San Diego',
  mapPoint: { lat: 32.8473, lng: -117.2788 },
  travelMode: 'walking',
  distanceMeters: 40,
  travelMinutes: 1,
  effort: { level: 'easy', note: 'A few steps to the railing' },
  stayMinutes: [20, 30],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Taken over' },
    { text: 'Over the years, harbor seals found the sheltered sand as useful as the children had, and now it’s theirs. In winter and spring they have their pups here, and from 15 December to 15 May the beach is closed to people so the mothers and pups aren’t disturbed.' },
    { kind: 'find', text: 'Find a seal lying like a banana, head and tail both up. It’s a harbor seal’s favourite pose.' },
    { className: 'narrationClose', text: 'Now walk north along the cliff-top path past Scripps Park to La Jolla Cove, about 10 minutes. Tap “I’m Here” above the rocks at the cove.' },
  ],
}

const cove = {
  id: 'laJollaCove',
  name: 'La Jolla Cove',
  photo: seaLionsPhoto,
  photoAlt: 'California sea lions sprawled on the rocks at La Jolla Cove',
  memory: 'The sea lions’ rocks.',
  mapPlace: 'La Jolla Cove, San Diego',
  mapPoint: { lat: 32.85045, lng: -117.27299 },
  travelMode: 'walking',
  distanceMeters: 779,
  travelMinutes: 11,
  effort: { level: 'easy', note: 'Flat, along the cliff-top path' },
  stayMinutes: [20, 30],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'Louder neighbours' },
    { text: 'Harbor seals are quiet and shy. The animals on these rocks are California sea lions: bigger, browner, and noisy, barking, shuffling about on their front flippers and flopping in and out of the sea. Unlike seals, they have little ear flaps.' },
    { kind: 'find', text: 'Spot the difference: find a sea lion’s ear flaps, and watch one walk on its front flippers.' },
    { className: 'narrationClose', text: 'Now along Coast Boulevard to The Cave Store, a few minutes. Tap “I’m Here” at its door: the cave is through the shop.' },
  ],
}

const cave = {
  id: 'sunnyJimCave',
  name: 'Sunny Jim Cave',
  photo: cavePhoto,
  photoAlt: 'Inside Sunny Jim Cave, looking out through its opening to the ocean',
  memory: 'Down the tunnel to the sea.',
  mapPlace: 'The Cave Store, 1325 Coast Blvd, La Jolla, San Diego',
  mapPoint: { lat: 32.84917, lng: -117.27015 },
  travelMode: 'walking',
  distanceMeters: 371,
  travelMinutes: 6,
  effort: { level: 'moderate', note: 'Along Coast Boulevard, then about 145 steps down through the tunnel and back up' },
  stayMinutes: [20, 30],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'A tunnel dug by hand' },
    { text: 'In 1902 a local man, Gustav Shultz, hired two workers to dig a tunnel down through the sandstone cliff into a sea cave below. They dug it with picks and shovels. Today you go down roughly 145 wooden steps, inside the rock, and come out on a platform over the waves.' },
    { kind: 'heading', text: 'Sunny Jim' },
    { text: 'From inside, the cave’s mouth has the shape of a face. It’s said the Oz author L. Frank Baum thought it looked like Sunny Jim, a cartoon mascot of a breakfast cereal of the time, and the name stuck.' },
    { kind: 'find', text: 'At the bottom, look back at the cave’s opening against the bright sea and find Sunny Jim’s profile.' },
    PEAK_CLOSE,
  ],
}

const coveSunset = {
  id: 'coveSunset',
  name: 'Sunset at the Cove',
  photo: napPhoto,
  photoAlt: 'A California sea lion napping on a rock at La Jolla Cove',
  memory: 'Sunset with the sea lions.',
  mapPlace: 'La Jolla Cove and Ellen Browning Scripps Park, San Diego',
  mapPoint: { lat: 32.8505, lng: -117.2735 },
  travelMode: 'walking',
  distanceMeters: 371,
  travelMinutes: 6,
  effort: { level: 'easy', note: 'Back along Coast Boulevard' },
  stayMinutes: [30, 60],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Everyone settles down' },
    { text: 'Back on the cliffs above the cove, the sea lions are settling in for the night, and the sun goes down over the Pacific. A beach built for children, rocks that belong to the sea lions, a tunnel dug for people: everyone found their place on this coast.' },
    { kind: 'find', text: 'Find a spot on the grass of Scripps Park facing west, and watch the sun touch the sea.' },
    DINNER,
  ],
}

export default {
  id: 'laJolla',
  aiMade: true,
  name: 'Seals, Sea Lions and a Sea Cave',
  location: 'LA JOLLA · CALIFORNIA, USA',
  city: 'San Diego',
  photo: heroPhoto,
  photoAlt: 'The ocean seen through the dark opening of Sunny Jim Cave in La Jolla',
  blurb: 'A beach built for children that seals took over, noisy sea lions, and 145 steps down a hand-dug tunnel to a sea cave.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experienceLevel: 'richExperience',
  experiences: ['Nature', 'Interactive', 'Scenic', 'Hidden Gems'],
  departure: pool,
  discovery: seals,
  build: cove,
  peak: cave,
  afterglow: coveSunset,
  startArea: 'La Jolla, San Diego, California, USA',
  startNote: START_NOTE,
  bestTime: {
    season: 'Any time of year',
    seasonNote: 'Seal pups are born in winter and spring, when the Children’s Pool beach is closed to people (you can still watch from above).',
    timeOfDay: 'Mid-afternoon until sunset',
    timeNote: 'The cave in the afternoon, and the cove at sunset.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Shoes with grip for the cave steps, which can be damp.',
      'A layer for the evening breeze off the ocean.',
    ],
    costs: [
      { lead: 'Sunny Jim Cave', text: 'Tickets at The Cave Store, about $10–13 for adults by recent listings: check on the day.' },
      'The coast path, the Children’s Pool and the cove are free.',
    ],
    getting: [
      'Start at the Children’s Pool on Coast Boulevard in La Jolla. Parking nearby is limited; come early or use a car park in the village.',
    ],
    access: [
      'The coast path is mostly flat and paved. The cave has about 145 steps down a narrow tunnel, and the same back up.',
    ],
    restrictions: [
      { lead: 'Children’s Pool', text: 'The beach is closed to people from 15 December to 15 May for seal pupping season.' },
      { lead: 'Seals and sea lions', text: 'They’re wild and protected: keep your distance, never touch or feed them, and give them room on the rocks.' },
    ],
    tips: [
      'The cave is darker and narrower than you might expect: take it slowly.',
    ],
  },
  match: {
    moods: { Peaceful: 55, Adventurous: 55, Romantic: 75, Curious: 75, Playful: 95, Cultural: 25 },
    with: { Solo: 65, Couple: 92, Family: 90, 'Friends / Group': 80 },
    preferences: {
      'Pet friendly': 5, 'Avoid alcohol': 85, 'More nature': 85, 'Food stops': 40,
      Coastal: 98, 'More urban': 30, 'Hiking involved': 10, 'Budget friendly': 85,
    },
  },
  description: [
    'On a short stretch of cliffs in La Jolla, wild harbor seals and sea lions haul out right beside the path. There’s a beach built for children that the seals took over, rocks the sea lions own, and a tunnel dug by hand down to a sea cave.',
    'This afternoon for two walks from the Children’s Pool and its seals to the noisy sea lions of La Jolla Cove, climbs down 145 steps into Sunny Jim Cave, and ends on the cliffs at sunset.',
  ],
  whyCool: {
    discovery: 'A sea cave you reach through a tunnel dug by hand in 1902.',
    significance: 'A beach built for children in 1931 that harbor seals took over.',
    feeling: 'Playful and wild: seals, sea lions and the Pacific, all within a mile.',
  },
  route: [pool, seals, cove, cave, coveSunset],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was La Jolla’s coast, shared with the seals and sea lions.',
    summary: 'You started at the Children’s Pool, watched the harbor seals that took it over, found the sea lions of La Jolla Cove, climbed down into Sunny Jim Cave, and watched the sun set over the cove.',
  },
}
