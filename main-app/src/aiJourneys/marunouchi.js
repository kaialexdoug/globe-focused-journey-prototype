// The Carriage Road at Dusk (Marunouchi, Tokyo): a romantic evening walk for
// two, and the first journey made to the Journey Engine V2 handoff (the
// "gold standard" it asks for before the rest of its 33 test journeys).
//
// Its peak was chosen first: Tokyo Station's red-brick Marunouchi building,
// lit up at dusk, from the free rooftop garden of KITTE, the old Tokyo
// Central Post Office. The route was built back from it, along the road the
// ambassadors' horse-drawn carriages take to the palace, walked the other
// way. The thread through it is letters and promises kept: a ginkgo saved by
// one, an ambassador's letter of credence, fountains built for two royal
// weddings, and a letter for the two of you to write in the old
// postmaster's room.
//
// Primary mood: Romantic (the hero photo's treatment, in
// photo-originals/manifest.json). Audience: a couple.
//
// Every stop has its exact spot (`mapPoint`, from OpenStreetMap). The walks
// between them are Google's walking routes (Routes API) and their heights
// GSI's (all between 3 and 5 m: flat), worked out in November 2026; the walk
// to KITTE is along Gyōkō-dōri, as the carriages go. The history was checked
// in November 2026 against the Ministry of the Environment's pages for Kokyo
// Gaien (Nijūbashi, the black pines, Wadakura Fountain Park), the Tokyo
// Metropolitan Park Association's for Hibiya Park, KITTE's own, the Ministry
// of Foreign Affairs' Diplomatic Bluebook (2005) on the carriages, and
// published reporting on the carriage procession and the station's
// restoration. What couldn't be confirmed was left out, or is marked as
// approximate in Before You Go.
//
// The photos are from Wikimedia Commons (credited in the README), put
// through Unfold's base look and the Romantic mood treatment
// (scripts/process-photos.mjs).

import heroPhoto from '../assets/journey/marunouchi/hero.jpg'
import ginkgoPhoto from '../assets/journey/marunouchi/ginkgo.jpg'
import craneFountainPhoto from '../assets/journey/marunouchi/crane-fountain.jpg'
import matsumotoroPhoto from '../assets/journey/marunouchi/matsumotoro.jpg'
import nijubashiPhoto from '../assets/journey/marunouchi/nijubashi.jpg'
import wadakuraPhoto from '../assets/journey/marunouchi/wadakura.jpg'
import kitteGardenPhoto from '../assets/journey/marunouchi/kitte-garden.jpg'
import intermediathequePhoto from '../assets/journey/marunouchi/intermediatheque.jpg'
import stationDomePhoto from '../assets/journey/marunouchi/station-dome.jpg'
import nakadoriPhoto from '../assets/journey/marunouchi/nakadori.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const hibiyaPark = {
  id: 'hibiyaGinkgo',
  name: 'Hibiya Park',
  photo: ginkgoPhoto,
  photoAlt: 'The great ginkgo in Hibiya Park, gold with autumn leaves',
  memory: 'Under the ginkgo saved by a promise.',
  mapPlace: 'Kubikake Ginkgo, Hibiya Park, Tokyo',
  mapPoint: { lat: 35.67376, lng: 139.75573 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [15, 25],
  nearby: [
    {
      name: 'The Crane Fountain',
      note: 'A bronze crane spouting water into the Cloud-Shaped Pond, the park’s symbol since its first years. Lovely in autumn colour',
      meters: 100,
      photo: craneFountainPhoto,
      photoAlt: 'The bronze crane fountain in Hibiya Park, among autumn leaves',
      mapPlace: 'Crane Fountain, Hibiya Park, Tokyo',
      mapPoint: { lat: 35.67337, lng: 139.75483 },
    },
    {
      name: 'Hibiya Matsumoto-rō',
      note: 'The Western-style restaurant right beside the ginkgo, there since the park’s earliest days. Known for its curry',
      meters: 20,
      photo: matsumotoroPhoto,
      photoAlt: 'The great ginkgo with Matsumoto-rō, a white restaurant, behind it',
      mapPlace: 'Hibiya Matsumotoro, Hibiya Park, Tokyo',
      mapPoint: { lat: 35.67379, lng: 139.75581 },
    },
  ],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Hibiya Park.' },
    { kind: 'heading', text: 'A promise kept' },
    { text: 'When Hibiya Park opened in 1903, it was Japan’s first Western-style park, laid out by a forestry professor named Honda Seiroku on an old army parade ground. The year before, the great ginkgo in front of you was about to be cut down to widen the road at Hibiya crossing. Honda said he’d stake his own neck on moving it instead. It took 25 days to bring it the 450 metres to here, and it lived. People still call it the Kubikake Ichō: the ginkgo he bet his neck on.' },
    { kind: 'heading', text: 'Tonight’s road' },
    { text: 'Every year, about forty new ambassadors arrive in Tokyo, each carrying a letter from their own head of state to the Emperor. Most choose to deliver it the old way, in a horse-drawn carriage, from Tokyo Station down a wide avenue to the palace gate. This walk follows that road the other way, as the evening comes in, and ends where the carriages set off.' },
    { kind: 'find', text: 'Walk all the way round the ginkgo. Its trunk is about seven metres around, and it’s somewhere between 400 and 500 years old.' },
    { className: 'narrationClose', text: 'The palace gate is about fifteen minutes north. Leave the park toward the moat, and tap “I’m Here” at the bridges in front of the Imperial Palace.' },
  ],
}

const nijubashi = {
  id: 'nijubashi',
  name: 'Nijūbashi',
  photo: nijubashiPhoto,
  photoAlt: 'The stone bridge at the Imperial Palace’s main gate, with the white Fushimi-yagura watchtower above it',
  memory: 'The bridges at the palace gate.',
  mapPlace: 'Nijubashi, Imperial Palace, Tokyo',
  mapPoint: { lat: 35.67967, lng: 139.75553 },
  travelMode: 'walking',
  distanceMeters: 914,
  travelMinutes: 14,
  effort: { level: 'easy', note: 'Flat, out of the park and across the road to the palace plaza' },
  stayMinutes: [10, 15],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'The double bridge' },
    { text: 'Across the moat are two bridges, one behind the other. The stone one in front, with its two arches, is the Main Gate Stone Bridge. The one behind it is the real Nijūbashi, the “double bridge”, named for the wooden bridge that once stood there, built in two tiers. Today’s, in steel, dates from 1964.' },
    { kind: 'heading', text: 'Where the carriages go in' },
    { text: 'This is the palace’s main gate, and it only opens for formal occasions: state guests, ceremonies, the days the public is invited in to greet the Emperor, and the new ambassadors. Their carriages cross the stone bridge and pass through this gate, carrying their letters inside.' },
    { kind: 'heading', text: 'An old shoreline' },
    { text: 'Look back at the plaza behind you. Before Edo Castle was built, all this was an inlet of Tokyo Bay, with pines along its shore. Today about 2,000 black pines stand on the gravel, the first of them planted in 1888.' },
    { kind: 'find', text: 'Find Fushimi-yagura, the white watchtower on the wall above the far bridge, peeking out from the trees.' },
    { className: 'narrationClose', text: 'Next, fountains built for two royal weddings, about ten minutes along the moat. Tap “I’m Here” at Wadakura Fountain Park.' },
  ],
}

const wadakura = {
  id: 'wadakuraFountains',
  name: 'Wadakura Fountain Park',
  mapName: 'Wadakura Fountains',
  photo: wadakuraPhoto,
  photoAlt: 'The fountains of Wadakura Fountain Park, with Marunouchi’s towers behind',
  memory: 'The wedding fountains as the lights came on.',
  mapPlace: 'Wadakura Fountain Park, Tokyo',
  mapPoint: { lat: 35.68323, lng: 139.76094 },
  travelMode: 'walking',
  distanceMeters: 826,
  travelMinutes: 12,
  effort: { level: 'easy', note: 'Flat, along the moat on wide gravel and paved paths' },
  stayMinutes: [15, 25],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'Built for a wedding' },
    { text: 'In 1957, Crown Prince Akihito met Shōda Michiko on a tennis court in the mountain resort of Karuizawa. They married in April 1959, and she became the first commoner to marry into the imperial family. This park was built in 1961 to celebrate their wedding.' },
    { kind: 'heading', text: 'And for another' },
    { text: 'In 1993 their son, now the Emperor, married Owada Masako, and in 1995 the park was renewed for that wedding too. The old design was kept, and a glass bridge and a waterfall fountain were added. The main fountain, three jets together, is shaped like a chrysanthemum and its buds, the flower of the imperial crest, and after sunset it’s lit in champagne gold.' },
    { kind: 'find', text: 'Stand on the glass bridge and look across the moat for Tatsumi-yagura, the old corner watchtower of Edo Castle.' },
    { className: 'narrationClose', text: 'Now the carriage road itself. Cross at the Wadakuramon crossing and walk Gyōkō-dōri, the wide avenue running straight to the red-brick station. KITTE is the white building to the right of it, at the end. Tap “I’m Here” at its entrance.' },
  ],
}

const kitte = {
  id: 'kitteGarden',
  name: 'KITTE Garden',
  mapName: 'KITTE',
  photo: kitteGardenPhoto,
  photoAlt: 'KITTE Garden, the rooftop garden of the old Tokyo Central Post Office, at night',
  memory: 'The station lit up below us.',
  mapPlace: 'KITTE Marunouchi, Tokyo',
  mapPoint: { lat: 35.67986, lng: 139.76478 },
  travelMode: 'walking',
  distanceMeters: 790,
  travelMinutes: 12,
  effort: { level: 'easy', note: 'Flat, all the way down Gyōkō-dōri to the station' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Intermediatheque',
      note: 'A free museum of the University of Tokyo’s collections, on the 2nd and 3rd floors of the same building. It closes earlier than the garden',
      meters: 0,
      photo: intermediathequePhoto,
      photoAlt: 'Old glass cases of specimens in the Intermediatheque',
      mapPlace: 'Intermediatheque, KITTE Marunouchi, Tokyo',
      mapPoint: { lat: 35.67986, lng: 139.76478 },
    },
  ],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The carriage road' },
    { text: 'The avenue you just walked is Gyōkō-dōri, the “imperial procession road”. Its middle is kept for people on foot, except when the carriages come. Then a red carpet is laid at the station, the station master sees the ambassador off in white, and the carriage, one built in 1913, sets off at a walk with mounted police alongside, straight to the palace gate.' },
    { kind: 'heading', text: 'A house of letters' },
    { text: 'KITTE is built around the old Tokyo Central Post Office, and its name means “stamp”, and “come here”, at the same time. Up on the fourth floor, the old postmaster’s room has been kept, with its window onto the station, as a quiet place to write to someone you’re thinking of.' },
    { kind: 'heading', text: 'The view' },
    { text: 'From the sixth-floor garden, the whole of Tokyo Station is laid out below you. It opened in 1914, designed by Tatsuno Kingo. In May 1945 an air raid burned out its domes and top floor, and for more than sixty years it stood shortened, under plain angular roofs. In 2012 it was restored to how it first looked, domes and all.' },
    { kind: 'find', text: 'Before you go up, find the old postmaster’s room on the fourth floor, and write each other a few lines there: just something about tonight. Post them on the way out, and let them find you a few days from now.' },
    PEAK_CLOSE,
  ],
}

const stationDome = {
  id: 'tokyoStationDome',
  name: 'Tokyo Station',
  mapName: 'Station dome',
  photo: stationDomePhoto,
  photoAlt: 'Inside the restored dome at Tokyo Station’s Marunouchi entrance, looking up',
  memory: 'Under the dome, where the carriages set off.',
  mapPlace: 'Tokyo Station Marunouchi South Exit, Tokyo',
  mapPoint: { lat: 35.6805, lng: 139.76582 },
  travelMode: 'walking',
  distanceMeters: 77,
  travelMinutes: 1,
  effort: { level: 'easy', note: 'A few steps across to the station' },
  stayMinutes: [10, 20],
  nearby: [
    {
      name: 'Naka-dōri',
      note: 'One block west, the trees are lit up in champagne gold from mid-November to mid-February. A slow way to end the evening',
      meters: 250,
      photo: nakadoriPhoto,
      photoAlt: 'Marunouchi Naka-dōri at night, its trees lit up in gold',
      mapPlace: 'Marunouchi Naka-dori, Tokyo',
      mapPoint: { lat: 35.681, lng: 139.7637 },
    },
  ],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Under the dome' },
    { text: 'Step inside the south entrance and look up. When the station was restored, only one drawing of these domes survived, so their ceilings were rebuilt from old black-and-white photographs: eagles, and animals of the zodiac, each pointing a different way.' },
    { kind: 'heading', text: 'Where the carriages set off' },
    { text: 'Just along from here is the station’s central entrance, where the carriages leave for the palace. You’ve walked their road backwards tonight, from the gate to the door, with a ginkgo and two weddings along the way.' },
    { kind: 'find', text: 'Find your zodiac animals in the dome. There are only eight of the twelve up there, so one of you might be out of luck.' },
    { className: 'narrationClose', text: 'That’s the walk. The trains home leave from right here, so there’s no hurry. Stay as long as you like.' },
  ],
}

export default {
  id: 'marunouchi',
  // Made with AI to the V2 handoff, checked against published sources, but
  // not yet walked.
  aiMade: true,
  name: 'The Carriage Road at Dusk',
  location: 'MARUNOUCHI · TOKYO, JAPAN',
  city: 'Chiyoda',
  photo: heroPhoto,
  photoAlt: 'Tokyo Station’s red-brick Marunouchi building lit up at dusk, seen from KITTE Garden',
  blurb: 'A ginkgo saved by a promise, fountains built for two royal weddings, and the station lit up at dusk.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experienceLevel: 'richExperience',
  experiences: ['Scenic', 'Historical', 'Cultural', 'Interactive'],
  departure: hibiyaPark,
  discovery: nijubashi,
  build: wadakura,
  peak: kitte,
  afterglow: stationDome,
  startArea: 'Hibiya, Tokyo, Japan',
  startNote: START_NOTE,
  bestTime: {
    season: 'Late November to December',
    seasonNote: 'For the golden ginkgos, and the winter lights along Naka-dōri.',
    timeOfDay: 'An hour before sunset',
    timeNote: 'So you reach the fountains as their lights come on, and the station once it’s lit up.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Comfortable shoes. It’s about 2.6 km, all flat, but the palace plaza’s paths are gravel.',
      'A pen, and a postcard or some paper, for the letter at KITTE.',
      'A warm layer: it can be breezy by the moat once the sun’s down.',
      'A Suica or PASMO card (or one on your phone) for the trains.',
      'A bag for your rubbish: there are very few public bins.',
    ],
    costs: [
      'The walk itself is free: Hibiya Park, the palace plaza, Wadakura Fountain Park, KITTE Garden, the postmaster’s room and the Intermediatheque all cost nothing.',
      { lead: 'Postage', text: 'A postcard within Japan is ¥85, and a letter ¥110 (Japan Post’s rates since October 2024).' },
      'Food and drink are up to you: Matsumoto-rō is at the start, and there are plenty of places around Tokyo Station at the end.',
    ],
    getting: [
      'Start at Hibiya Park. Hibiya Station (Hibiya, Chiyoda and Mita lines) is at the edge of the park, and JR Yūrakuchō Station is a short walk.',
      'It’s one-way, ending at Tokyo Station, about 1.2 km from where you started, with JR lines, the Shinkansen and the Marunouchi Line right there.',
      'There’s no parking at the palace plaza or Wadakura Fountain Park, so come by train.',
    ],
    access: [
      'Flat the whole way. The palace plaza is mostly gravel, which is bumpy with a stroller or wheelchair; wheelchairs can be borrowed there.',
      'KITTE has lifts to the 4th and 6th floors, and restrooms.',
      { lead: 'Restrooms', text: 'Most of the public toilets around the palace plaza are locked at night. Wadakura Fountain Park’s are open 9 AM–4 PM. Use the ones in Hibiya Park, KITTE or the station.' },
    ],
    restrictions: [
      { lead: 'Wadakura Fountain Park', text: 'The fountains run 10 AM–8:45 PM: twice an hour on weekdays (on the hour and half past), and every 15 minutes at weekends and on holidays. They’re lit from sunset until 8:45 PM, and switched off in rain or strong wind.' },
      { lead: 'KITTE Garden', text: '11 AM–11 PM on weekdays, and 11 AM–10 PM at weekends and on holidays. It can close in bad weather.' },
      { lead: 'The postmaster’s room', text: '11 AM–8 PM, on KITTE’s 4th floor.' },
      { lead: 'Intermediatheque', text: '11 AM–6 PM, or to 8 PM on Fridays and Saturdays. Closed on Mondays (or the Tuesday, after a holiday Monday) and over New Year.' },
      { lead: 'Imperial Palace plaza', text: 'Open around the clock, but it can be closed off for state occasions. No smoking anywhere, and no drones.' },
      { lead: 'Hibiya Park', text: 'Being rebuilt in stages until about 2033, so some areas are fenced off, including the big fountain by Hibiya Station.' },
      'The station is lit up from sunset until about 9 PM, by most accounts. Its official hours couldn’t be confirmed.',
    ],
    tips: [
      'Set off about an hour before sunset: the palace in the last of the daylight, the fountains as their lights come on, and the station lit up for the peak.',
      'In late November and early December, the ginkgos in Hibiya Park and along Gyōkō-dōri turn gold.',
      'Marunouchi Illumination lights Naka-dōri’s trees from 12 November 2026 to 14 February 2027. It’s free. Its hours weren’t out yet when this was checked: last year it was 4 PM–11 PM.',
      'If the road in front of the station is suddenly closed on a weekday, wait a minute: it may be a carriage on its way to the palace. No flash photography.',
      'Weekend fountains run every 15 minutes, so you won’t wait long to see them.',
    ],
  },
  match: {
    moods: { Peaceful: 60, Adventurous: 10, Romantic: 95, Curious: 65, Playful: 25, Cultural: 75 },
    with: { Solo: 55, Couple: 95, Family: 45, 'Friends / Group': 50 },
    preferences: {
      'Pet friendly': 25, 'Avoid alcohol': 90, 'More nature': 30, 'Food stops': 35,
      Coastal: 0, 'More urban': 90, 'Hiking involved': 0, 'Budget friendly': 95,
    },
  },
  description: [
    'Every year, about forty new ambassadors arrive in Tokyo, each carrying a letter from their own head of state to the Emperor. Most choose to deliver it the old way: in a horse-drawn carriage, down a wide avenue from Tokyo Station to the palace gate.',
    'This walk follows that road the other way as the evening comes in: from a ginkgo saved by a promise, past the double bridge and fountains built for two royal weddings, to the rooftop of an old post office, where the red-brick station lights up below you. And on the way, there’s a letter for the two of you to write.',
  ],
  whyCool: {
    discovery: 'The road Tokyo keeps for letters of trust, where the ambassadors’ carriages still run.',
    significance: 'Japan’s first Western-style park, fountains built for two royal weddings, and a station restored to its 1914 self.',
    feeling: 'Slow and golden: a walk into the evening, ending side by side above the lit-up station.',
  },
  route: [hibiyaPark, nijubashi, wadakura, kitte, stationDome],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was the carriage road, walked the other way, from a promise in Hibiya Park to the station lit up gold.',
    summary: 'You started under the great ginkgo in Hibiya Park, crossed to the double bridge at the palace gate, watched the wedding fountains at Wadakura, walked the carriage road to the old post office, and finished under the dome at Tokyo Station.',
  },
}
