// The Tokyo That Stayed (Yanaka, Tokyo), built the same way as the Waseda
// journey (testJourney.js). Every stop has its exact spot (`mapPoint`, from
// Wikipedia and OpenStreetMap), so it gets the live map, and the walk to it
// from the stop before: how far (`distanceMeters`), how long
// (`travelMinutes`) and how hard (`effort`), from Google's walking routes
// and the heights along them (Open-Meteo), worked out once, in November
// 2026.
//
// The narration tells one story from stop to stop: the old temple town that
// came through the 1923 earthquake and the war, and the Tokugawa shoguns
// whose traces run all through it, from the grave of the last of them to the
// shrine one of them moved and the pond their temple built. The history was
// checked against published sources (Wikipedia, in English and Japanese, and
// guides to SCAI The Bathhouse) in November 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import nipporiPhoto from '../assets/journey/yanaka/nippori.jpg'
import cemeteryPhoto from '../assets/journey/yanaka/cemetery.jpg'
import yanakaGinzaPhoto from '../assets/journey/yanaka/yanaka-ginza.jpg'
import scaiPhoto from '../assets/journey/yanaka/scai.jpg'
import nezuShrinePhoto from '../assets/journey/yanaka/nezu-shrine.jpg'
import shinobazuPhoto from '../assets/journey/yanaka/shinobazu.jpg'

// The spots near the stops.
import tennojiPhoto from '../assets/journey/yanaka/tennoji.jpg'
import asakuraPhoto from '../assets/journey/yanaka/asakura-museum.jpg'
import kiyomizuPhoto from '../assets/journey/yanaka/kiyomizu-kannon-do.jpg'
import ameyokoPhoto from '../assets/journey/yanaka/ameyoko.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const nippori = {
  id: 'nippori',
  name: 'Nippori Station',
  photo: nipporiPhoto,
  photoAlt: 'Nippori Station from above, with trains passing below and tall apartment towers behind',
  memory: 'Where the day began.',
  mapPlace: 'Nippori Station',
  mapPoint: { lat: 35.727588, lng: 139.770781 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Yanaka.' },
    { kind: 'heading', text: 'The Tokyo that stayed' },
    { text: 'Yanaka is an old temple town. It came through the great earthquake of 1923 and the bombing of the war with little damage, so much of what was lost elsewhere in Tokyo is still here: wooden houses, narrow lanes, and temples on nearly every corner.' },
    { kind: 'heading', text: 'The shoguns’ town' },
    { text: 'Today’s walk keeps crossing paths with the Tokugawa shoguns, who ruled Japan from Edo, the old name for Tokyo: the grave of the very last of them, a shrine one of them moved, and a pond their temple built.' },
    { kind: 'find', text: 'On your way up the slope, count the temple gates you pass. They start almost straight away.' },
    { className: 'narrationClose', text: 'Leave the station by the west exit and head up the slope. The first stop is only a few minutes away.' },
  ],
}

const cemetery = {
  id: 'yanakaCemetery',
  name: 'Yanaka Cemetery',
  photo: cemeteryPhoto,
  photoAlt: 'People walking down the wide avenue through Yanaka Cemetery, under cherry trees in full blossom',
  memory: 'A slow walk through Yanaka Cemetery.',
  mapPlace: 'Yanaka Cemetery',
  mapPoint: { lat: 35.72527778, lng: 139.77055556 },
  travelMode: 'walking',
  distanceMeters: 279,
  travelMinutes: 4,
  effort: { level: 'easy', note: 'A short way up the slope' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Tennoji',
      note: 'The temple the cemetery once belonged to, with a big seated bronze Buddha',
      meters: 160,
      photo: tennojiPhoto,
      photoAlt: 'The gate of Tennoji, between tall stone posts, with the temple’s hall beyond',
      mapPlace: '天王寺, 谷中',
      mapPoint: { lat: 35.72658333, lng: 139.77136111 },
    },
  ],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'A temple’s grounds' },
    { text: 'A cemetery might seem like a strange place to start, but Yanaka’s feels more like a park: wide, quiet paths, old trees, and the odd cat asleep in the sun. It was once part of the grounds of Tennoji, the temple next door, and its main avenue was the way in. In spring, its cherry trees turn it into a tunnel of blossom.' },
    { kind: 'heading', text: 'The last shogun' },
    { text: 'Tokugawa Yoshinobu, the last shogun, is buried here. Halfway down the avenue are the remains of a five-storied pagoda, which stood here until it burned one summer night in 1957.' },
    { kind: 'find', text: 'Find the stone base where the pagoda stood, about halfway down the main avenue.' },
    { className: 'narrationClose', text: 'Keep going, and the lanes will lead you down toward the old shopping street.' },
  ],
}

const scai = {
  id: 'scaiTheBathhouse',
  name: 'SCAI The Bathhouse',
  mapName: 'SCAI',
  photo: scaiPhoto,
  photoAlt: 'SCAI The Bathhouse, an old public bathhouse with a curved tiled roof, now an art gallery',
  memory: 'Art in an old bathhouse.',
  teaser: 'An old neighbourhood bathhouse turned into a contemporary art gallery. A walk back past the cemetery.',
  mapPlace: 'SCAI THE BATHHOUSE',
  mapPoint: { lat: 35.7217514, lng: 139.7705016 },
  travelMode: 'walking',
  // From Yanaka Ginza, then on to Nezu Shrine from here.
  distanceMeters: 986,
  travelMinutes: 14,
  extraMeters: 1021,
  effort: { level: 'easy', note: 'Back up the slope and through the temple lanes' },
  stayMinutes: [20, 30],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'The old bathhouse' },
    { text: 'This was Kashiwayu, a public bathhouse that opened in 1787, where the neighbourhood came to wash. In 1993 it became a contemporary art gallery, with the old tiled roof still on top.' },
    { kind: 'heading', text: 'What’s on' },
    { text: 'It has shown artists from Anish Kapoor to Louise Bourgeois, and the shows change, so you never quite know what you’ll find inside. That’s half the fun.' },
    { kind: 'find', text: 'Find the old wooden lockers by the entrance, where bathers once left their shoes.' },
    BACK_TO_ROUTE,
  ],
}

const yanakaGinza = {
  id: 'yanakaGinza',
  name: 'Yanaka Ginza',
  photo: yanakaGinzaPhoto,
  photoAlt: 'Looking down the Yuyake Dandan steps toward the busy Yanaka Ginza shopping street',
  memory: 'Down the sunset steps to Yanaka Ginza.',
  mapPlace: 'Yanaka Ginza',
  mapPoint: { lat: 35.7276689, lng: 139.7653174 },
  travelMode: 'walking',
  distanceMeters: 730,
  travelMinutes: 10,
  effort: { level: 'easy', note: 'Through the lanes, then down a short flight of steps' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Asakura Museum of Sculpture',
      note: 'The home and studio of Fumio Asakura, the father of modern Japanese sculpture, with a garden on the roof',
      meters: 300,
      photo: asakuraPhoto,
      photoAlt: 'The dark modern front of the Asakura Museum of Sculpture, with a statue on its roof and pine trees by the gate',
      mapPlace: '台東区立朝倉彫塑館',
      mapPoint: { lat: 35.7268258, lng: 139.7685379 },
    },
  ],
  ...BUILD,
  detours: [scai],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'The sunset steps' },
    { text: 'You come into Yanaka Ginza down Yuyake Dandan, the “sunset steps”: thirty-six gentle stone steps, named in 1990 by a local writer for the view at the end of the day.' },
    { kind: 'heading', text: 'Since the fifties' },
    { text: 'Below is a shopping street that’s been going since the 1950s, with around sixty family-run shops: croquettes, crackers, sweets and pickles. Pick something up and eat it as you walk.' },
    { kind: 'find', text: 'Count the sunset steps on your way down. There should be thirty-six.' },
    { className: 'narrationClose', text: 'There’s an old bathhouse turned art gallery nearby, if you’d like a detour. Otherwise, the shrine is next.' },
  ],
}

const nezuShrine = {
  id: 'nezuShrine',
  name: 'Nezu Shrine',
  photo: nezuShrinePhoto,
  photoAlt: 'A stone torii at Nezu Shrine, with a path of small red torii gates leading away behind it among green shrubs',
  memory: 'Through the red gates at Nezu.',
  mapPlace: 'Nezu Shrine',
  mapPoint: { lat: 35.7199731, lng: 139.7606625 },
  travelMode: 'walking',
  distanceMeters: 1138,
  travelMinutes: 16,
  effort: { level: 'easy', note: 'South through the old streets of Sendagi and Nezu' },
  stayMinutes: [30, 45],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'A shogun’s shrine' },
    { text: 'Legend says Nezu Shrine was founded nearly two thousand years ago. In 1705, the shogun Tokugawa Tsunayoshi moved it here when he chose his heir, and the heir made it his own guardian shrine.' },
    { kind: 'heading', text: 'Gates and azaleas' },
    { text: 'Beside the main halls, a path of small red torii gates winds up the slope like a tunnel. Each spring, the hillside beside it bursts into flower for the Azalea Festival, from early April into May.' },
    { kind: 'find', text: 'Walk through the tunnel of red gates slowly, then look back down over the shrine from the top.' },
    PEAK_CLOSE,
  ],
}

const shinobazu = {
  id: 'shinobazuPond',
  name: 'Shinobazu Pond',
  photo: shinobazuPhoto,
  photoAlt: 'Shinobazu Pond covered in green lotus leaves, with a small temple hall and city towers beyond',
  memory: 'The end of the day by the lotus pond.',
  // The temple hall on the island in the middle.
  mapPlace: 'Shinobazu Pond',
  mapPoint: { lat: 35.7121395, lng: 139.7711539 },
  travelMode: 'walking',
  distanceMeters: 1540,
  travelMinutes: 21,
  effort: { level: 'easy', note: 'Gently downhill to the pond' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Kiyomizu Kannon-do',
      note: 'A temple hall on the hill above the pond, with a pine branch trained into a circle',
      meters: 220,
      photo: kiyomizuPhoto,
      photoAlt: 'The red Kiyomizu Kannon-do hall on the hillside, above shrubs and a pine trained into a ring',
      mapPlace: '清水観音堂, 上野公園',
      mapPoint: { lat: 35.7127287, lng: 139.7735302 },
    },
    {
      name: 'Ameyoko',
      note: 'A loud, busy market street beside the railway, named, some say, for the candy shops that lined it after the war',
      meters: 390,
      photo: ameyokoPhoto,
      photoAlt: 'The busy entrance to Ameyoko under its sign, beside the elevated railway with a train passing',
      mapPlace: 'アメヤ横丁, 上野',
      mapPoint: { lat: 35.7100241, lng: 139.7745414 },
    },
  ],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The shoguns’ pond' },
    { text: 'That’s the last stop. Shinobazu Pond sits at the edge of Ueno Park, on land that belonged to Kan’ei-ji, the temple the shoguns built here in 1625 to guard their castle. Its founder had the island in the middle made to look like one on Lake Biwa, near Kyoto, and built a hall to the goddess Benten on it.' },
    { kind: 'heading', text: 'Lotus leaves' },
    { text: 'In summer, the pond is covered in lotus leaves. Walk out along the causeway to the island, or find a bench by the water. The city is right there, but it feels a long way off.' },
    { kind: 'find', text: 'Look up at the hill above the pond for Kiyomizu Kannon-do, and the pine in front of it trained into a circle.' },
    DINNER,
  ],
}

export default {
  id: 'yanaka',
  aiMade: true,
  name: 'The Tokyo That Stayed',
  location: 'YANAKA · TOKYO, JAPAN',
  city: 'Taito',
  photo: nezuShrinePhoto,
  photoAlt: nezuShrine.photoAlt,
  blurb: 'Old lanes, the sunset steps, and a tunnel of red gates to a lotus pond.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Hidden Gems', 'Cultural', 'Historical', 'Culinary'],
  departure: nippori,
  discovery: cemetery,
  build: yanakaGinza,
  peak: nezuShrine,
  afterglow: shinobazu,
  startArea: 'Yanaka, Tokyo, Japan',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Spring',
    seasonNote: 'For the cherry blossom avenue in Yanaka Cemetery in early April, and the azaleas at Nezu Shrine from April into May.',
    timeOfDay: 'During daylight hours',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against the Asakura Museum's and
  // SCAI The Bathhouse's published fees and hours.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Comfortable shoes that slip off easily, and socks: you take your shoes off in the Asakura Museum, and socks are required.',
      'Cash for Yanaka Ginza’s snacks and little shops.',
      'A Suica or PASMO card (or one on your phone) for the trains.',
      'A bag for your rubbish: Japan has very few public bins.',
    ],
    costs: [
      'Yanaka Cemetery, Tennoji, Yanaka Ginza, Nezu Shrine and Shinobazu Pond are all free.',
      { lead: 'Asakura Museum of Sculpture', text: '¥500, or ¥250 for school students.' },
      { lead: 'SCAI The Bathhouse', text: 'Free.' },
      { lead: 'Nezu Shrine’s azalea garden', text: 'Usually about ¥500, and only open in April.' },
    ],
    getting: [
      'Start at Nippori Station, on the JR Yamanote Line and the Keisei Line (the Skyliner from Narita Airport stops here).',
      'The walk ends at Shinobazu Pond in Ueno Park, about 1.7 km from Nippori. Ueno Station is about 10 minutes away on foot.',
      'The old lanes are narrow and parking is scarce: come by train.',
    ],
    access: [
      'Mostly gentle, with a short slope up to the cemetery and a short flight of steps, the Yūyake Dandan, down into Yanaka Ginza.',
      'The lanes are narrow, and Yanaka Ginza is crowded at weekends.',
      'The Asakura Museum is an old house, with stairs between its floors.',
    ],
    restrictions: [
      { lead: 'Asakura Museum', text: '9:30 AM–4:30 PM, last entry 4 PM. Closed on Mondays and Thursdays, December 29–January 3 and between exhibitions.' },
      { lead: 'SCAI The Bathhouse', text: 'Noon–6 PM, Tuesday to Saturday. Closed on Sundays, Mondays and holidays, and between exhibitions.' },
      { lead: 'Nezu Shrine’s azalea garden', text: 'Only open in the azalea season, in April, from 9:30 AM.' },
    ],
    tips: [
      'Yūyake Dandan means “sunset steps”: stand at the top in the late afternoon for the view down Yanaka Ginza.',
      'Go on a weekday to avoid the crowds, and avoid Mondays, when the Asakura Museum and SCAI are both closed.',
      'In spring, the cherry trees along the cemetery’s main path make a tunnel of blossom.',
      'In July and August, Shinobazu Pond is covered in lotus flowers.',
    ],
  },
  match: {
    moods: { Peaceful: 85, Adventurous: 25, Romantic: 60, Curious: 85, Playful: 40, Cultural: 85 },
    with: { Solo: 95, Couple: 80, Family: 55, 'Friends / Group': 65 },
    preferences: {
      'Pet friendly': 40, 'Avoid alcohol': 85, 'More nature': 35, 'Food stops': 70,
      Coastal: 5, 'More urban': 75, 'Hiking involved': 5, 'Budget friendly': 95,
    },
  },
  description: [
    'Yanaka came through the great earthquake of 1923 and the bombing of the war with little damage, so the old Tokyo that was lost elsewhere is still here: a temple town of wooden houses and narrow lanes, with traces of the shoguns all through it.',
    'This journey walks from a cemetery that feels like a park, down the sunset steps to an old shopping street, to a shrine with a tunnel of red gates, and finishes by the lotus pond at the edge of Ueno Park.',
  ],
  // Why It's Cool on the journey's page (JourneyPage.jsx): what you'll
  // discover, why it matters, and what it feels like, a sentence each.
  whyCool: {
    discovery: 'A corner of old Tokyo that came through the 1923 earthquake and the war, its wooden houses and narrow lanes still standing.',
    significance: 'Traces of the Tokugawa shoguns all along the way, from the grave of the very last one to a pond their temple built.',
    feeling: 'Slow and nostalgic: quiet lanes, family-run shops, the sunset steps, and lotus leaves by the pond.',
  },
  route: [nippori, cemetery, yanakaGinza, nezuShrine, shinobazu],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Yanaka, the old Tokyo, at walking pace. Whatever you took from the day, it’s yours now.',
    summary: 'You started at Nippori, walked the avenue through Yanaka Cemetery, came down the sunset steps to Yanaka Ginza, passed through the red gates of Nezu Shrine, and finished by the lotus leaves on Shinobazu Pond.',
  },
}
