// The Edge of Old Edo: a test journey around Takadanobaba and Waseda (Tokyo),
// for trying out the live map near home. Every stop has its exact spot (`mapPoint`, taken from
// Wikipedia's coordinates), so the directions screens use the live map that
// follows you, the same as the Odawara journey. The AI journeys don't have
// exact spots, so they get the simpler embedded map instead.
//
// It's also where the route preview on See Your Journey is being tried out
// first (RoutePreview in App.jsx), so each stop has the walk to it from the
// stop before: how far (`distanceMeters`), how long (`travelMinutes`), and how
// hard (`effort`). The distances and times are Google's walking routes, and
// the climbs come from the heights along them (from GSI, Japan's mapping
// agency), worked out once, in November 2026. The route preview ends with
// the route on a map (RouteMap.jsx), where a long name can be shortened
// (`mapName`).
//
// It's also where the longer narration is being tried out: short sections
// under little subheadings, and something to look for at each stop (see
// Narration.jsx). The history in it was checked against published sources
// (the wards' own pages, Waseda's, and others) in November 2026.
//
// The photos are borrowed from other journeys for now, as stand-ins. The
// times at each stop are estimates, like an AI journey's. To take it out,
// remove it from ALL_JOURNEYS in journeyStops.js.

import stationPhoto from './assets/journey/yanaka/nippori.jpg'
import gardenPhoto from './assets/journey/yanaka/shinobazu.jpg'
import shrinePhoto from './assets/journey/yanaka/nezu-shrine.jpg'
import libraryPhoto from './assets/journey/yanaka/scai.jpg'
import auditoriumPhoto from './assets/journey/yanaka/yanaka-ginza.jpg'
import hosokawaPhoto from './assets/journey/yanaka/cemetery.jpg'

// The spots near the stops, which have their own photos (from Wikimedia
// Commons, credited in the README).
import mizuInariPhoto from './assets/journey/waseda/mizu-inari.jpg'
import sosekiPhoto from './assets/journey/waseda/soseki-birthplace.jpg'
import okumaGardenPhoto from './assets/journey/waseda/okuma-garden.jpg'
import bashoAnPhoto from './assets/journey/waseda/basho-an.jpg'
import eiseiBunkoPhoto from './assets/journey/waseda/eisei-bunko.jpg'
import todenWasedaPhoto from './assets/journey/waseda/toden-waseda.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE,
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
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Takadanobaba.' },
    { kind: 'heading', text: 'The shogun’s riding ground' },
    { text: 'The name means “the riding ground at Takada”. In 1636 the shogun Tokugawa Iemitsu had one laid out here so his samurai could train on horseback, out where Edo gave way to fields. The station only borrowed the name, though. The real riding ground was about a kilometre east, on your way to the first stop.' },
    { kind: 'heading', text: 'Astro Boy’s hometown' },
    { text: 'In Osamu Tezuka’s manga, Astro Boy was built right here, at the Ministry of Science in Takadanobaba, in April 2003. Tezuka’s studio is here too, so when 2003 came round for real, the station gave him a birthday present: his theme tune now sends off every Yamanote Line train.' },
    { kind: 'find', text: 'Under the railway bridge by the station, find Astro Boy in the long mural of Tezuka’s characters. Then listen for his tune as the next Yamanote Line train pulls out.' },
    { className: 'narrationClose', text: 'The first stop is a quiet garden, about twenty minutes east on foot. Follow the map, and tap “I’m Here” when you reach Kansen-en.' },
  ],
}

const kansenen = {
  id: 'kansenen',
  name: 'Kansen-en Garden',
  mapName: 'Kansen-en',
  photo: gardenPhoto,
  photoAlt: 'A stand-in photo of a garden pond, borrowed from another journey',
  memory: 'A quiet pond just off the main road.',
  mapPlace: 'Kansen-en Park, Shinjuku',
  mapPoint: { lat: 35.7117, lng: 139.7161 },
  travelMode: 'walking',
  distanceMeters: 1494,
  travelMinutes: 21,
  // How hard the walk here is: 'easy', 'moderate' or 'hard', and what it's like.
  effort: { level: 'easy', note: 'Gently downhill most of the way' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Mizu Inari Shrine',
      note: 'Next door, with Takada Fuji, a little Mount Fuji built in 1780 and said to be the oldest in Edo. It’s only open to climb two days a year, in July',
      meters: 173,
      photo: mizuInariPhoto,
      photoAlt: 'A stone path under the trees at Mizu Inari Shrine, lined with old stone monuments',
      mapPlace: 'Mizu Inari Shrine, Nishi-Waseda, Shinjuku, Tokyo',
      mapPoint: { lat: 35.7113566, lng: 139.7155545 },
    },
  ],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The sweet spring' },
    { text: 'Kansen-en means “the garden of the sweet spring”. It began as the country retreat of the Shimizu family, a branch of the Tokugawa shoguns, and the spring water here was said to be just right for making tea. Later it belonged to Waseda University, and since 1969 it’s been a park anyone can wander into.' },
    { kind: 'heading', text: 'A run to a duel' },
    { text: 'In 1694, on the riding ground close by, a young swordsman named Nakayama Yasubei came running across the city to stand beside his sworn uncle in a duel. Legend says he gulped a cup of sake on the way and cut down eighteen men. The real count was far smaller, but the story made him a hero, and as Horibe Yasubei he went on to be one of the Forty-Seven Ronin, the samurai of Japan’s most famous tale of revenge.' },
    { kind: 'find', text: 'Next door at Mizu Inari Shrine, find the stone monument to Yasubei. Its inscription starts with 堀部, Horibe, the name he took after the duel.' },
    { className: 'narrationClose', text: 'Take your time around the pond. Next, a shrine on a hill, about ten minutes south.' },
  ],
}

const murakamiLibrary = {
  id: 'murakamiLibrary',
  name: 'Haruki Murakami Library',
  mapName: 'Murakami Library',
  photo: libraryPhoto,
  photoAlt: 'A stand-in photo of an old building, borrowed from another journey',
  memory: 'Through the wooden tunnel of books.',
  teaser: 'Waseda’s library of Haruki Murakami’s books and records, through an arch of wood. A short walk across campus.',
  mapPlace: 'Waseda International House of Literature',
  mapPoint: { lat: 35.70986566, lng: 139.71992742 },
  travelMode: 'walking',
  // From Anahachiman. On to the Okuma Auditorium after, it's 251 m, so taking
  // it adds 275 m of walking to going straight there (`extraMeters`).
  distanceMeters: 663,
  travelMinutes: 9,
  extraMeters: 275,
  effort: { level: 'easy', note: 'Downhill from the shrine, then flat across campus' },
  stayMinutes: [30, 45],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'A tunnel into the stories' },
    { text: 'This is Waseda’s library for Haruki Murakami, who started studying here in 1968. The architect, Kengo Kuma, made the way in a tunnel of wood, because that’s how he pictures Murakami’s stories: ordinary people slipping out of everyday life into somewhere stranger. Downstairs, an arch of wooden shelves curves over the stairs.' },
    { kind: 'heading', text: 'The long way through' },
    { text: 'Murakami took seven years to graduate. His first home in Tokyo was a student dorm up the hill by this walk’s last stop, said to be the model for the one in Norwegian Wood. And before he finished, he had married and opened a jazz bar of his own.' },
    { kind: 'find', text: 'Find one of his books in a language you can’t read. The library has his work in around fifty languages.' },
    BACK_TO_ROUTE,
  ],
}

const anahachiman = {
  id: 'anahachiman',
  name: 'Anahachiman Shrine',
  mapName: 'Anahachiman',
  photo: shrinePhoto,
  photoAlt: 'A stand-in photo of a red shrine, borrowed from another journey',
  memory: 'Up the steps to Anahachiman.',
  mapPlace: 'Anahachiman Shrine, Shinjuku',
  mapPoint: { lat: 35.70733333, lng: 139.71722222 },
  travelMode: 'walking',
  distanceMeters: 670,
  travelMinutes: 10,
  effort: { level: 'moderate', note: 'Uphill: a climb of about 20 metres, ending at the shrine on its hill' },
  stayMinutes: [15, 20],
  nearby: [
    {
      name: 'Natsume Sōseki’s birthplace',
      note: 'A stone marks where the great novelist was born, at the foot of the slope his father named after the family: Natsume-zaka. The old sake shop beside it says it’s where Yasubei stopped for his sake on the way to the duel',
      meters: 468,
      photo: sosekiPhoto,
      photoAlt: 'The tall stone pillar marking Natsume Sōseki’s birthplace, carved with Japanese characters',
      photoPosition: 'center 30%',
      mapPlace: '夏目漱石誕生之地, 喜久井町, 新宿区, 東京都',
      // Nearly: by exit 2 of Waseda Station on the Tozai Line, where the
      // marker stands (no map has its exact spot).
      mapPoint: { lat: 35.70535, lng: 139.72115 },
    },
  ],
  ...BUILD,
  detours: [murakamiLibrary],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'The cave in the name' },
    { text: 'Anahachiman means “the Hachiman of the cave”. The shrine is said to go back to 1062, but it got its name in 1641, when workers clearing this hillside found a cave with a small gilt Buddha inside.' },
    { kind: 'heading', text: 'A charm with strict rules' },
    { text: 'Every winter, from the solstice to early February, people queue here for Ichiyō Raifuku, a paper charm for money luck. It has to go up high on a wall at exactly midnight, on one of only three nights, facing that year’s lucky direction.' },
    { kind: 'find', text: 'At the crossroads below the shrine, find the sign that says 馬場下町, Babashita-chō. It means “the town below the riding ground”. The riding ground is long gone, but the name stuck.' },
    { className: 'narrationClose', text: 'The university is just across the road. There’s a library on the way, if you’d like a detour. Otherwise, head for the clock tower.' },
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
  distanceMeters: 639,
  travelMinutes: 9,
  effort: { level: 'easy', note: 'Downhill from the shrine, then flat into the campus' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Okuma Garden',
      note: 'A lawn and garden right behind the auditorium',
      meters: 97,
      photo: okumaGardenPhoto,
      photoAlt: 'The lawn and trees of Okuma Garden, with the Okuma Auditorium’s clock tower behind',
      mapPlace: 'Okuma Garden, Waseda University, Shinjuku, Tokyo',
      mapPoint: { lat: 35.7095718, lng: 139.7220692 },
    },
  ],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: '125, for a reason' },
    { text: 'This is the Okuma Auditorium, the symbol of Waseda. Its founder, Okuma Shigenobu, believed anyone who looked after themselves could live to 125. So when the hall was finished in 1927, five years after his death, its clock tower was built 125 shaku tall, about 38 metres: one shaku for every year.' },
    { kind: 'heading', text: 'The man who kept going' },
    { text: 'Okuma founded the school in 1882. Seven years later, while he was foreign minister, a man threw a bomb at his carriage, and he lost a leg. He carried on anyway, and went on to be prime minister twice, the second time at 76.' },
    { kind: 'find', text: 'Find Okuma himself: a statue of him in his university robe, on the main campus just across the road.' },
    PEAK_CLOSE,
  ],
}

const higoHosokawa = {
  id: 'higoHosokawa',
  name: 'Higo Hosokawa Garden',
  mapName: 'Higo Hosokawa',
  photo: hosokawaPhoto,
  photoAlt: 'A stand-in photo of a green path, borrowed from another journey',
  memory: 'The day settling by the pond.',
  mapPlace: 'Higo Hosokawa Garden',
  mapPoint: { lat: 35.713043, lng: 139.722625 },
  travelMode: 'walking',
  distanceMeters: 735,
  travelMinutes: 11,
  effort: { level: 'easy', note: 'Mostly flat, with a short rise into the garden at the end' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Eisei Bunko Museum',
      note: 'The Hosokawa family’s art collection, just up the hill',
      meters: 70,
      photo: eiseiBunkoPhoto,
      photoAlt: 'The pale walls of the Eisei Bunko Museum among autumn trees',
      mapPlace: 'Eisei Bunko Museum, Mejirodai, Bunkyo, Tokyo',
      mapPoint: { lat: 35.7131093, lng: 139.7233554 },
    },
    {
      name: 'Sekiguchi Bashō-an',
      note: 'Where Bashō is said to have lived by the river, now a small, quiet garden on the slope',
      meters: 190,
      photo: bashoAnPhoto,
      photoAlt: 'The old wooden gate of Sekiguchi Bashō-an, under a tiled roof',
      mapPlace: 'Sekiguchi Basho-an, Sekiguchi, Bunkyo, Tokyo',
      mapPoint: { lat: 35.7120836, lng: 139.7236631 },
    },
    {
      name: 'Toden Waseda stop',
      note: 'The end of the line for the Toden Arakawa Line, the last of Tokyo’s old streetcars',
      meters: 577,
      photo: todenWasedaPhoto,
      photoAlt: 'A green Toden streetcar pulling in at Waseda, the end of the line',
      photoPosition: 'center 40%',
      mapPlace: 'Waseda Station, Toden Arakawa Line, Shinjuku, Tokyo',
      mapPoint: { lat: 35.71183333, lng: 139.71888889 },
    },
  ],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'A lord’s garden' },
    { text: 'Like Kansen-en, this started out as a retreat for the Shimizu branch of the Tokugawa family. Near the end of the Edo era it passed to the Hosokawa, the lords of Higo, far away in Kyushu, and it later became their main home in Tokyo. The family is still well known: one of them, Hosokawa Morihiro, became prime minister in 1993.' },
    { kind: 'heading', text: 'The poet by the river' },
    { text: 'Just outside the south gate is Bashō-an. The haiku poet Matsuo Bashō lived here from 1677 for about three years, helping with work on the Kanda aqueduct, which carried this river’s water into Edo. A few years later he wrote his most famous poem: an old pond, a frog jumping in, the sound of water.' },
    { kind: 'find', text: 'Find Shōseikaku, the old wooden house in the garden, built for the Hosokawa family about a hundred years ago. If it’s open, you can sit inside with a bowl of matcha.' },
    { className: 'narrationClose', text: 'In Bashō’s day, all this was the quiet edge of Edo. That’s the walk. Find a spot by the pond and let the day settle.' },
  ],
}

export default {
  id: 'wasedaTest',
  // Named for what it's about rather than as a test, so trying it out feels
  // like the real thing.
  name: 'The Edge of Old Edo',
  location: 'WASEDA · TOKYO, JAPAN',
  city: 'Shinjuku',
  photo: auditoriumPhoto,
  photoAlt: okumaAuditorium.photoAlt,
  blurb: 'A swordsman’s duel, a poet’s river and a clock tower, where Edo once ended.',
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
    preferences: {
      'Pet friendly': 40, 'Avoid alcohol': 85, 'More nature': 50, 'Food stops': 40,
      Coastal: 5, 'More urban': 80, 'Hiking involved': 5, 'Budget friendly': 95,
    },
  },
  description: [
    'Long before the students came, this corner of Tokyo was the edge of Edo. There was a riding ground here, and in 1694 a young swordsman ran across the city to stand beside his uncle in a duel on it, and walked away a legend. Down by the river, Bashō, the great haiku poet, is said to have spent a few years working on the city’s water supply.',
    'This walk strings those stories together: a garden fed by a spring, a shrine on a hill with a cave in its name, the clock tower of a university founded by a man who lost a leg to an assassin’s bomb and kept going, and a lord’s garden by the river to end the day. Once you know them, you’ll never walk these streets the same way again.',
  ],
  route: [takadanobaba, kansenen, anahachiman, okumaAuditorium, higoHosokawa],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Takadanobaba and Waseda, on foot. Whatever you took from the walk, it’s yours now.',
    summary: 'You started at Takadanobaba Station, walked to the pond at Kansen-en, climbed up to Anahachiman, stood under the clock tower of the Okuma Auditorium, and finished in the Higo Hosokawa Garden.',
  },
}
