// The Garden, the Lodge and the Painted Hill (Cape Town, South Africa): a
// curious afternoon for a family, made to the Journey Engine V2 handoff
// (flagship destinations: Cape Town).
//
// Its peak, chosen first: Bo-Kaap's brightly painted streets and the Auwal
// Masjid, South Africa's first mosque, built in 1794 on land given by a
// freed slave. Why Cape Town is exceptional: within a short walk of each
// other are the garden where the colonial city began, the building where
// enslaved people were held, and the neighbourhood their descendants made
// their own, all under Table Mountain. The thread is who built Cape Town,
// and how their story is told.
//
// Primary mood: Curious. Audience: a family. On foot, about 1.4 km, then a
// short drive up Signal Hill for sunset.
//
// Exact spots from OpenStreetMap; walks and the drive from Google's Routes
// API (November 2026). Checked in November 2026 against the City of Cape
// Town (the Company's Garden and its hours, Bo-Kaap), Iziko Museums (the
// Slave Lodge's hours) and South African History Online (the Auwal Masjid).

import heroPhoto from '../assets/journey/cape-town/hero.jpg'
import gardenPhoto from '../assets/journey/cape-town/garden.jpg'
import slaveLodgePhoto from '../assets/journey/cape-town/slave-lodge.jpg'
import waleStreetPhoto from '../assets/journey/cape-town/wale-street.jpg'
import dorpStreetPhoto from '../assets/journey/cape-town/dorp-street.jpg'
import signalHillPhoto from '../assets/journey/cape-town/signal-hill.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const garden = {
  id: 'companysGarden',
  name: 'The Company’s Garden',
  photo: gardenPhoto,
  photoAlt: 'Paths and green lawns in the Company’s Garden, Cape Town',
  memory: 'A vegetable garden for ships.',
  mapPlace: 'Company’s Garden, Queen Victoria Street, Cape Town',
  mapPoint: { lat: -33.92722, lng: 18.41733 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [20, 30],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Cape Town began right here, with a vegetable patch.' },
    { kind: 'heading', text: 'Food for the ships' },
    { text: 'In 1652 the Dutch East India Company set up a station at the Cape to supply its ships sailing between Europe and Asia, and started this garden to grow fresh food for their crews. The city grew up around it. Today it’s a shady public park.' },
    { kind: 'heading', text: 'Who did the work?' },
    { text: 'The Company brought enslaved people to the Cape from places like Indonesia, India, Madagascar and East Africa to do much of the labour. Their story is the next stop.' },
    { kind: 'find', text: 'Find the oldest-looking tree you can in the garden, and guess how long it’s been here.' },
    { className: 'narrationClose', text: 'Walk to the bottom of the garden and across to the Slave Lodge, about 6 minutes. Tap “I’m Here” at its entrance.' },
  ],
}

const slaveLodge = {
  id: 'slaveLodge',
  name: 'The Slave Lodge',
  photo: slaveLodgePhoto,
  photoAlt: 'The long white facade of the Iziko Slave Lodge in Cape Town',
  memory: 'Where the city’s builders were held.',
  mapPlace: 'Iziko Slave Lodge, corner of Adderley and Wale Streets, Cape Town',
  mapPoint: { lat: -33.92517, lng: 18.42077 },
  travelMode: 'walking',
  distanceMeters: 461,
  travelMinutes: 6,
  effort: { level: 'easy', note: 'Through the garden and across the road' },
  stayMinutes: [45, 60],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'A building with a hard past' },
    { text: 'From 1679 until 1811, this building held hundreds of people enslaved by the Company, men, women and children, who worked in the garden, the harbour and the town. Today it’s a museum that tells their story.' },
    { kind: 'find', text: 'Inside, look for the names of enslaved people and where they came from. Pick one name to remember.' },
    { className: 'narrationClose', text: 'Now walk up Wale Street toward the slopes of Signal Hill, into Bo-Kaap, about 12 minutes. Tap “I’m Here” at the Bo-Kaap Museum.' },
  ],
}

const waleStreet = {
  id: 'waleStreet',
  name: 'Wale Street, Bo-Kaap',
  photo: waleStreetPhoto,
  photoAlt: 'Brightly painted houses in pink, green and yellow along Wale Street in Bo-Kaap',
  memory: 'A neighbourhood of their own.',
  mapPlace: 'Bo-Kaap Museum, 71 Wale Street, Cape Town',
  mapPoint: { lat: -33.92142, lng: 18.41491 },
  travelMode: 'walking',
  distanceMeters: 720,
  travelMinutes: 12,
  effort: { level: 'moderate', note: 'Uphill along Wale Street' },
  stayMinutes: [20, 30],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'After slavery' },
    { text: 'After slavery ended at the Cape in the 1830s, many freed people and their descendants, a large number of them Muslim, made their homes on this hillside. Bo-Kaap became the heart of the Cape Malay community, and the Bo-Kaap Museum tells its story in one of the old houses.' },
    { kind: 'heading', text: 'Every colour' },
    { text: 'The houses are painted in bright pinks, greens, yellows and blues. People say the colours celebrate freedom, or festivals like Eid; families repaint them with pride.' },
    { kind: 'find', text: 'Each of you pick a favourite house colour, then find a house painted that colour.' },
    { className: 'narrationClose', text: 'Walk round the corner to Dorp Street, a few minutes. Tap “I’m Here” at the Auwal Masjid.' },
  ],
}

const dorpStreet = {
  id: 'dorpStreet',
  name: 'Dorp Street and the Auwal Masjid',
  mapName: 'The Auwal Masjid',
  photo: dorpStreetPhoto,
  photoAlt: 'Painted houses climbing Dorp Street in Bo-Kaap, with the mountain behind',
  memory: 'South Africa’s first mosque.',
  mapPlace: 'Auwal Masjid, 39 Dorp Street, Bo-Kaap, Cape Town',
  mapPoint: { lat: -33.92233, lng: 18.41495 },
  travelMode: 'walking',
  distanceMeters: 178,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'Round the corner' },
  stayMinutes: [15, 25],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The first mosque' },
    { text: 'The Auwal Masjid, completed in 1794, is South Africa’s first mosque. Its land came from a freed slave, Coridon of Ceylon, and its first imam was Tuan Guru, a scholar exiled to the Cape who is said to have written out the whole Quran from memory while he was imprisoned.' },
    { kind: 'heading', text: 'Built by those who were held' },
    { text: 'You started where the Company’s ships took on food, saw where the people who worked for it were held, and now you’re standing at a place of worship they built for themselves, in a neighbourhood they made their own.' },
    { kind: 'find', text: 'Look up the street to Signal Hill above the houses. That’s where you’ll watch the sun go down.' },
    PEAK_CLOSE,
  ],
}

const signalHill = {
  id: 'signalHill',
  name: 'Signal Hill',
  photo: signalHillPhoto,
  photoAlt: 'The sun setting over the Atlantic from Signal Hill, Cape Town',
  memory: 'The whole city at sunset.',
  mapPlace: 'Signal Hill viewpoint, Cape Town',
  mapPoint: { lat: -33.917, lng: 18.4039 },
  travelMode: 'driving',
  distanceMeters: 6517,
  travelMinutes: 12,
  effort: { level: 'easy', note: 'A short drive up the hill' },
  stayMinutes: [30, 60],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The view of it all' },
    { text: 'From Signal Hill you can see the city bowl below: the garden, the old centre, the painted roofs of Bo-Kaap, the harbour the ships came into, and Table Mountain behind. Out to sea, the sun goes down over the Atlantic.' },
    { kind: 'find', text: 'Find Bo-Kaap’s colours on the slope below you, and Table Mountain’s flat top behind the city.' },
    { className: 'narrationClose', text: 'That’s Cape Town’s story, from the garden to the hill. Head down before it gets fully dark.' },
  ],
}

export default {
  id: 'capeTown',
  aiMade: true,
  name: 'The Garden, the Lodge and the Painted Hill',
  location: 'CAPE TOWN · WESTERN CAPE, SOUTH AFRICA',
  city: 'Cape Town',
  photo: heroPhoto,
  photoAlt: 'Brightly painted houses on Wale Street in Bo-Kaap, with Lion’s Head behind',
  blurb: 'The garden where Cape Town began, the lodge where enslaved people were held, and the painted streets their descendants made home.',
  walking: 'Walk + drive',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Historical', 'Cultural', 'Scenic'],
  departure: garden,
  discovery: slaveLodge,
  build: waleStreet,
  peak: dorpStreet,
  afterglow: signalHill,
  startArea: 'Cape Town city centre, Western Cape, South Africa',
  startNote: START_NOTE,
  bestTime: {
    season: 'October to April',
    seasonNote: 'Summer brings long, dry, sunny days, though it can be windy.',
    timeOfDay: 'From early afternoon until sunset',
    timeNote: 'The Slave Lodge closes at 5 PM, and Signal Hill is best at sunset.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Sun protection and a windproof layer: the Cape wind can be strong.',
      'Modest clothing if you’d like to look into the mosque.',
    ],
    costs: [
      'The Company’s Garden and Bo-Kaap’s streets are free.',
      { lead: 'Iziko Slave Lodge', text: 'Admission is charged: check Iziko’s website.' },
      { lead: 'Bo-Kaap Museum', text: 'Admission is charged: check its opening days.' },
    ],
    getting: [
      'Start in the Company’s Garden in the city centre. It ends at the Signal Hill viewpoint, a short drive or taxi ride from Bo-Kaap.',
    ],
    access: [
      'The garden and the city centre are flat; Bo-Kaap’s streets are steep and cobbled in places.',
    ],
    restrictions: [
      { lead: 'Company’s Garden', text: 'Open daily, 7 AM–7 PM from September to March, and 7 AM–6 PM from April to August.' },
      { lead: 'Iziko Slave Lodge', text: 'Monday to Saturday, 9 AM–5 PM; closed on Sundays.' },
      'Bo-Kaap is a living neighbourhood: be respectful when taking photos of people’s homes, and dress modestly near the mosques.',
    ],
    tips: [
      'Try Cape Malay food in Bo-Kaap, like a samoosa or a koesister.',
    ],
  },
  match: {
    moods: { Peaceful: 40, Adventurous: 30, Romantic: 50, Curious: 95, Playful: 50, Cultural: 92 },
    with: { Solo: 75, Couple: 80, Family: 90, 'Friends / Group': 80 },
    preferences: {
      'Pet friendly': 20, 'Avoid alcohol': 95, 'More nature': 25, 'Food stops': 55,
      Coastal: 40, 'More urban': 85, 'Hiking involved': 10, 'Budget friendly': 85,
    },
  },
  description: [
    'Cape Town began in 1652 as a garden to feed passing ships, and much of it was built by enslaved people brought from across Asia and Africa. Within a short walk are the garden, the lodge where they were held, and the painted hillside neighbourhood their descendants made their own.',
    'This afternoon walks from the Company’s Garden to the Slave Lodge, up into Bo-Kaap’s colourful streets to South Africa’s first mosque, and ends on Signal Hill as the sun goes down over the city and the sea.',
  ],
  whyCool: {
    discovery: 'South Africa’s first mosque, on land given by a freed slave in 1794.',
    significance: 'The garden where Cape Town began, and the Slave Lodge that tells the story of the people who built it.',
    feeling: 'Curious and colourful: a hard history told honestly, and a neighbourhood full of pride and colour.',
  },
  route: [garden, slaveLodge, waleStreet, dorpStreet, signalHill],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Cape Town, from the garden to the hill.',
    summary: 'You started in the Company’s Garden, learned at the Slave Lodge about the people who built the city, walked up into Bo-Kaap’s painted streets to the Auwal Masjid, and watched the sun set from Signal Hill.',
  },
}
