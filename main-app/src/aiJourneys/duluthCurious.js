// Where Bob Dylan Began (Duluth, Minnesota): a curious walk for two along
// Bob Dylan Way, made to the Journey Engine V2 handoff (Duluth, couples
// only: the Curious one of three). Its places aren't in the first Duluth
// journey (duluth.js), except that it ends in Leif Erikson Park, at the Rose
// Garden rather than the Lakewalk.
//
// Its peak, chosen first: the old Duluth Armory, where a 17-year-old Robert
// Zimmerman stood near the stage as Buddy Holly played, three nights before
// Holly died, a night Dylan went back to in his Nobel lecture. The Armory is
// being restored (it's due to reopen in 2027), so the peak is from the
// street. The thread is the city that made him: the railway town his family
// arrived in, a crime his father lived through as a boy and the son later
// sang about, the duplex he was born into, and the night that set him going.
//
// Primary mood: Curious. Audience: a couple. On foot, about 4 km, with a
// steep climb up the hillside.
//
// Exact spots from OpenStreetMap; walks from Google's Routes API (November
// 2026). Checked in November 2026 against the Minnesota Historical
// Society's MNopedia and its Duluth lynchings site, the Equal Justice
// Initiative, Minnesota's Attorney General on the 2020 pardon, Wikipedia and
// Zenith City on the Depot, the Current, MPR News and the Star Tribune on
// Bob Dylan Way and Dylan's Duluth, the Duluth Armory's own site on its
// restoration, and reporting on the 1959 concert.

import heroPhoto from '../assets/journey/duluth-curious/hero.jpg'
import depotPhoto from '../assets/journey/duluth-curious/depot.jpg'
import memorialPhoto from '../assets/journey/duluth-curious/memorial.jpg'
import homePhoto from '../assets/journey/duluth-curious/dylan-home.jpg'
import armoryPhoto from '../assets/journey/duluth-curious/armory.jpg'
import roseGardenPhoto from '../assets/journey/duluth-curious/rose-garden.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const depot = {
  id: 'duluthDepot',
  name: 'The Depot',
  photo: depotPhoto,
  photoAlt: 'The Duluth Union Depot, a turreted stone station from 1892',
  memory: 'Where Bob Dylan Way begins.',
  mapPlace: 'The St. Louis County Depot, 506 W Michigan St, Duluth, MN',
  mapPoint: { lat: 46.78137, lng: -92.10404 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [15, 30],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re at the start of Bob Dylan Way.' },
    { kind: 'heading', text: 'A station for seven railways' },
    { text: 'The Union Depot opened in 1892, designed by Peabody and Stearns of Boston in a French Norman style that’s rare in America. At its busiest, seven railways ran through it, with some 5,000 passengers a day on fifty trains. Today it’s full of museums, and the old tracks behind it are lined with locomotives.' },
    { kind: 'heading', text: 'Bob Dylan Way' },
    { text: 'In 2006 the city named a 1.8-mile route through downtown Bob Dylan Way, linking the places that mattered, from here to the old Armory. Robert Zimmerman was born in this city in 1941 and lived here until he was six. You’re going to walk his way, and find out what Duluth gave him.' },
    { kind: 'find', text: 'Find one of Bob Dylan Way’s street signs, and keep an eye out along the route for its manhole covers, designed by local artists from his songs.' },
    { className: 'narrationClose', text: 'Next, a memorial a few blocks east, to something Duluth spent eighty years not talking about. Tap “I’m Here” at First Street and Second Avenue East.' },
  ],
}

const memorial = {
  id: 'claytonJacksonMcGhie',
  name: 'Clayton Jackson McGhie Memorial',
  mapName: 'The Memorial',
  photo: memorialPhoto,
  photoAlt: 'The Clayton Jackson McGhie Memorial in downtown Duluth',
  memory: 'Remembering Elias Clayton, Elmer Jackson and Isaac McGhie.',
  mapPlace: 'Clayton Jackson McGhie Memorial, E 1st St and 2nd Ave E, Duluth, MN',
  mapPoint: { lat: 46.78932, lng: -92.09684 },
  travelMode: 'walking',
  distanceMeters: 1190,
  travelMinutes: 17,
  effort: { level: 'easy', note: 'Through downtown, gently uphill' },
  stayMinutes: [15, 20],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'June 15, 1920' },
    { text: 'A travelling circus came to Duluth for a parade and a single show. Afterwards, six of its Black workers were accused of attacking a young white couple. That night, a mob of thousands broke into the jail, took three of them, Elias Clayton, Elmer Jackson and Isaac McGhie, and lynched them across the street from where you’re standing.' },
    { kind: 'heading', text: 'What came after' },
    { text: 'Another of the workers, Max Mason, was convicted and imprisoned. In 2020, a century on, Minnesota granted him the first posthumous pardon in its history. This memorial went up in 2003. Dylan’s father is said to have been a boy living a couple of blocks away at the time, and the opening of Dylan’s 1965 song “Desolation Row” is widely taken to be about that night, and the postcards of it that were sold afterwards.' },
    { kind: 'find', text: 'Find the three men’s names on the memorial, and read the words alongside them.' },
    { className: 'narrationClose', text: 'Now up the hill, a steep few blocks, to the house where Dylan spent his first years. Tap “I’m Here” on North Third Avenue East.' },
  ],
}

const dylanHome = {
  id: 'dylanFirstHome',
  name: 'Bob Dylan’s First Home',
  mapName: 'First home',
  photo: homePhoto,
  photoAlt: 'The yellow duplex on North Third Avenue East where Bob Dylan lived as a small child',
  memory: 'The yellow duplex on the hill.',
  mapPlace: '519 N 3rd Ave E, Duluth, MN',
  mapPoint: { lat: 46.79326, lng: -92.10026 },
  travelMode: 'walking',
  distanceMeters: 633,
  travelMinutes: 12,
  effort: { level: 'hard', note: 'Steeply uphill: a climb of about 45 m in a few blocks' },
  stayMinutes: [10, 15],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'Upstairs in a yellow duplex' },
    { text: 'Robert Zimmerman was born in May 1941 at St. Mary’s Hospital, a few blocks from here, and his family lived upstairs in this yellow duplex until he was six. When his father caught polio, they moved to his mother’s home town of Hibbing, on the Iron Range, and that’s where he grew up.' },
    { kind: 'heading', text: 'A view of the lake' },
    { text: 'From up here, the whole of Duluth slopes away to Lake Superior. It’s the first world he knew: a steep railway and shipping town on a cold, enormous lake.' },
    { kind: 'find', text: 'Turn round and find the lake from the house’s doorstep, the view a small boy would have had. (People live here: look from the street.)' },
    { className: 'narrationClose', text: 'Now east across the hillside to the Armory, about half an hour, mostly level or downhill. Tap “I’m Here” at its front.' },
  ],
}

const armory = {
  id: 'duluthArmory',
  name: 'The Duluth Armory',
  mapName: 'The Armory',
  photo: armoryPhoto,
  photoAlt: 'The old brick Duluth Armory on London Road',
  memory: 'Where Dylan saw Buddy Holly.',
  mapPlace: 'Duluth Armory, 1305 London Rd, Duluth, MN',
  mapPoint: { lat: 46.79901, lng: -92.08064 },
  travelMode: 'walking',
  distanceMeters: 2083,
  travelMinutes: 28,
  effort: { level: 'easy', note: 'Across the hillside and down toward the lake' },
  stayMinutes: [15, 25],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'January 31, 1959' },
    { text: 'The National Guard built this Armory in 1915, and for decades it was Duluth’s big hall. On the last night of January 1959, Buddy Holly played here on his Winter Dance Party tour. Robert Zimmerman, seventeen, came down from Hibbing and got close to the stage. Three days later, Holly was killed in a plane crash in Iowa.' },
    { kind: 'heading', text: 'He looked at me' },
    { text: 'Accepting a Grammy in 1998, Dylan said he’d been just a few feet from Holly that night, and that Holly had looked right at him. When he gave his Nobel Prize lecture in 2017, it was where he began. The Armory is now being restored, to be a music hall again.' },
    { kind: 'find', text: 'Find the Bob Dylan Way sign by the Armory: the end of the road you started at the Depot.' },
    PEAK_CLOSE,
  ],
}

const roseGarden = {
  id: 'duluthRoseGarden',
  name: 'The Rose Garden',
  photo: roseGardenPhoto,
  photoAlt: 'The Rose Garden in Leif Erikson Park, above Lake Superior',
  memory: 'The lake at the end of Bob Dylan Way.',
  mapPlace: 'Duluth Rose Garden, Leif Erikson Park, Duluth, MN',
  mapPoint: { lat: 46.79789, lng: -92.08065 },
  travelMode: 'walking',
  distanceMeters: 235,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'Just across London Road' },
  stayMinutes: [15, 30],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'A garden on a lid' },
    { text: 'Across the road from the Armory, the Rose Garden sits on top of the Interstate 35 tunnel. The first garden here was dug up for the freeway, and this one was rebuilt on the tunnel’s roof, under several feet of soil, in 1994. In summer, thousands of rose bushes bloom above the traffic.' },
    { kind: 'heading', text: 'The end of the way' },
    { text: 'You’ve walked from the station his family knew, past a crime his father lived through, up to the house he was born into, to the place a song first got hold of him. Below you is the lake he started out beside.' },
    { kind: 'find', text: 'Find a bench facing the lake, and put on a Dylan song you both like.' },
    { className: 'narrationClose', text: 'That’s Bob Dylan Way. Take your time here.' },
  ],
}

export default {
  id: 'duluthCurious',
  aiMade: true,
  name: 'Where Bob Dylan Began',
  location: 'DULUTH · MINNESOTA, USA',
  city: 'Duluth',
  photo: heroPhoto,
  photoAlt: 'The old brick Duluth Armory on London Road',
  blurb: 'A railway station, a hard truth, a yellow duplex, and the hall where a teenage Dylan saw Buddy Holly.',
  walking: 'Moderate walking',
  stops: '~5 stops',
  difficulty: 'Moderate',
  experienceLevel: 'localDiscovery',
  experiences: ['Historical', 'Cultural', 'Hidden Gems'],
  departure: depot,
  discovery: memorial,
  build: dylanHome,
  peak: armory,
  afterglow: roseGarden,
  startArea: 'Downtown Duluth, Minnesota, USA',
  startNote: START_NOTE,
  bestTime: {
    season: 'Late May to September',
    seasonNote: 'For the roses at the end, and for Duluth Dylan Fest, around his birthday on 24 May.',
    timeOfDay: 'Late morning or afternoon',
    timeNote: 'With time to look round the Depot’s museums first, if you like.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Comfortable shoes: about 4 km, with a steep climb up the hillside.',
      'Headphones, or a speaker for the bench at the end, for a Dylan song.',
      'A layer: it’s often cooler by the lake.',
    ],
    costs: [
      'The walk is free.',
      { lead: 'The Depot', text: 'Its museums, including the Lake Superior Railroad Museum, charge admission: check its own site for prices and hours.' },
    ],
    getting: [
      'The Depot is at 506 West Michigan Street, downtown, with parking nearby.',
      'It’s one-way, ending by the lake on London Road, about 2.5 km east of the Depot: walk back along the Lakewalk, or take a bus or taxi.',
    ],
    access: [
      'The climb from First Street up North Third Avenue East is very steep. To skip it, walk along Superior Street to the Armory instead, and see the house another time.',
      'The Rose Garden’s paths are smooth.',
    ],
    restrictions: [
      { lead: 'Bob Dylan’s first home', text: 'It’s a private house that people live in: look from the street only. Sources differ on its house number (519 is the most common).' },
      { lead: 'The Duluth Armory', text: 'Closed for restoration, due to reopen in 2027: see it from the street.' },
    ],
    tips: [
      'Duluth Dylan Fest is held every year around his birthday, 24 May, with music all over town.',
      'Before you go, listen to “Desolation Row” and Buddy Holly’s “That’ll Be the Day”.',
      'The memorial is a place to be quiet for a moment, and many people leave flowers.',
    ],
  },
  match: {
    moods: { Peaceful: 40, Adventurous: 30, Romantic: 50, Curious: 95, Playful: 30, Cultural: 85 },
    with: { Solo: 80, Couple: 90, Family: 45, 'Friends / Group': 80 },
    preferences: {
      'Pet friendly': 60, 'Avoid alcohol': 90, 'More nature': 20, 'Food stops': 40,
      Coastal: 40, 'More urban': 85, 'Hiking involved': 15, 'Budget friendly': 90,
    },
  },
  description: [
    'Bob Dylan grew up in Hibbing, but he was born in Duluth, and the city left marks on him: a railway town on a cold lake, a terrible night his father lived through as a boy, and the evening a teenager stood near the stage while Buddy Holly played.',
    'This walk follows Bob Dylan Way from the old Union Depot, past the memorial to three men Duluth tried to forget, up to the yellow duplex he was born into, to the Armory where he saw Holly three nights before Holly died, and ends at the lake.',
  ],
  whyCool: {
    discovery: 'The city that made Bob Dylan, before he was Bob Dylan.',
    significance: 'A 1920 lynching remembered at last, and the night a teenager saw Buddy Holly three days before the music died.',
    feeling: 'Curious and moving: a walk you’ll keep thinking about, and talking about, long after.',
  },
  route: [depot, memorial, dylanHome, armory, roseGarden],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Bob Dylan Way, from the Depot to the lake.',
    summary: 'You set off from the old Union Depot, stood at the memorial to Elias Clayton, Elmer Jackson and Isaac McGhie, climbed to the yellow duplex Dylan was born into, stood outside the Armory where he saw Buddy Holly, and ended in the Rose Garden above the lake.',
  },
}
