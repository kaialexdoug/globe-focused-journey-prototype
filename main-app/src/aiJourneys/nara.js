// Follow the Deer to the Great Buddha (Nara): an afternoon for a family with
// children, made to the Journey Engine V2 handoff (Japan, outside Tokyo: one
// of four, chosen for a family and a playful mood).
//
// Its peak, chosen first: the Great Buddha of Tōdai-ji, in the biggest
// wooden building in the world, and the pillar behind him with a hole as big
// as his nostril, which children (and brave grown-ups) crawl through. The
// thread is that big things take everyone: the monk who gathered a whole
// country's help to build the Buddha, the god who rode in on a deer, two
// giant guardians carved by a team in 69 days, and a Buddha who lost his
// head, twice lost his hall, and was put back together every time.
//
// Primary mood: Playful. Audience: a family with children. On foot, about
// 2.2 km to the end and 1.9 km back, through Nara Park.
//
// Exact spots from OpenStreetMap; walks from Google's Routes API (November
// 2026); heights from GSI. Checked in November 2026 against Tōdai-ji's own
// site (its history, the Great Buddha, the Great South Gate and its
// guardians, Nigatsu-dō, hours and fees, and the pillar's reopening in June
// 2023) and the Japan Tourism Agency's multilingual descriptions for Nara
// Park (the deer and Kasuga Taisha). See JOURNEY_ENGINE_LOG.md for what's
// uncertain.

import heroPhoto from '../assets/journey/nara/hero.jpg'
import gyokiPhoto from '../assets/journey/nara/gyoki.jpg'
import deerPhoto from '../assets/journey/nara/deer.jpg'
import nandaimonPhoto from '../assets/journey/nara/nandaimon.jpg'
import daibutsuPhoto from '../assets/journey/nara/daibutsu.jpg'
import nigatsudoPhoto from '../assets/journey/nara/nigatsudo.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const gyoki = {
  id: 'gyokiStatue',
  name: 'Gyōki’s Statue',
  photo: gyokiPhoto,
  photoAlt: 'The bronze statue of the monk Gyōki at Kintetsu Nara Station',
  memory: 'The monk who gathered everyone’s help.',
  mapPlace: 'Gyoki statue, Kintetsu Nara Station, Nara',
  mapPoint: { lat: 34.68409, lng: 135.82862 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Welcome to Nara. Thirteen hundred years ago, this was the capital of Japan.' },
    { kind: 'heading', text: 'The monk on the fountain' },
    { text: 'The man in bronze is Gyōki, a monk who lived from 668 to 749. When the emperor decided to build a giant Buddha, it was far too big a job for one person, or even for the court. Gyōki went out and gathered the help, and the gifts, of ordinary people all over the country. Without them, there’d be no Great Buddha.' },
    { kind: 'heading', text: 'Today’s mission' },
    { text: 'Up the hill there are deer that bow, two giants guarding a gate, and the Buddha Gyōki helped to build, sitting in a hall so big you’ll hardly believe it’s made of wood. And somewhere behind him is a hole only the cleverest can crawl through.' },
    { kind: 'find', text: 'Start counting deer. Who’ll see the first one?' },
    { className: 'narrationClose', text: 'Walk east up Noboriōji, the wide road up the hill, into Nara Park, about 15 minutes. Tap “I’m Here” where the path to Tōdai-ji turns off to the left.' },
  ],
}

const deer = {
  id: 'naraDeer',
  name: 'The Deer of Nara Park',
  mapName: 'The deer',
  photo: deerPhoto,
  photoAlt: 'A stag with antlers resting on the stone path near Tōdai-ji',
  memory: 'Deer that bow.',
  mapPlace: 'Todaiji approach, Nara Park, Nara',
  mapPoint: { lat: 34.68367, lng: 135.83997 },
  travelMode: 'walking',
  distanceMeters: 1081,
  travelMinutes: 16,
  effort: { level: 'easy', note: 'Gently uphill along a wide road' },
  stayMinutes: [20, 30],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Messengers of a god' },
    { text: 'About 1,300 wild deer live in Nara Park. They’re treated as messengers of Takemikazuchi, the god of thunder, who is said to have arrived on the mountain behind the park riding a white deer, about 1,300 years ago. Since then they’ve been looked after so well that they’re hardly afraid of people at all.' },
    { kind: 'heading', text: 'Deer that bow' },
    { text: 'Many of them have learned a trick: they bow, hoping for one of the special crackers sold in the park. In June and July there are spotted fawns, too, following their mothers around.' },
    { kind: 'find', text: 'Buy a pack of deer crackers at a stall. Bow to a deer, and see if it bows back before you give it one. When they’re all gone, show the deer your empty hands.' },
    { className: 'narrationClose', text: 'Now turn up the path toward Tōdai-ji. The giants are waiting in the gate ahead. Tap “I’m Here” at the Great South Gate.' },
  ],
}

const nandaimon = {
  id: 'nandaimon',
  name: 'The Great South Gate',
  photo: nandaimonPhoto,
  photoAlt: 'One of the giant wooden guardians inside Tōdai-ji’s Great South Gate',
  memory: 'Two giants, carved in 69 days.',
  mapPlace: 'Nandaimon, Todaiji, Nara',
  mapPoint: { lat: 34.6858, lng: 135.83987 },
  travelMode: 'walking',
  distanceMeters: 238,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'A short, level walk up the approach' },
  stayMinutes: [10, 15],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'The biggest temple gate in Japan' },
    { text: 'The Great South Gate is 25 metres tall, held up by 18 giant pillars, and it’s the largest temple gate in Japan. The first one blew down in a typhoon. This one was finished in 1203, one of the last pieces of the great rebuilding of Tōdai-ji after a war burned most of it in 1180.' },
    { kind: 'heading', text: 'Two giants in 69 days' },
    { text: 'On each side stands a wooden guardian more than 8.4 metres tall, about as high as three floors of a house. They’re said to have been carved in just 69 days by a team led by the sculptors Unkei and Kaikei. When they were repaired in the 1990s, papers were found hidden inside them, with the names of the people who made them.' },
    { kind: 'find', text: 'One guardian has his mouth open, and the other has it shut tight. Find which is which, then pull both faces yourselves.' },
    { className: 'narrationClose', text: 'Walk on to the Great Buddha Hall. Tickets are at the entrance to the cloister. Tap “I’m Here” in front of the hall.' },
  ],
}

const daibutsuden = {
  id: 'daibutsuden',
  name: 'The Great Buddha Hall',
  photo: daibutsuPhoto,
  photoAlt: 'The Great Buddha of Tōdai-ji, seated inside its vast wooden hall',
  memory: 'The Buddha who lost his head, and the hole the size of his nostril.',
  mapPlace: 'Daibutsuden, Todaiji, Nara',
  mapPoint: { lat: 34.68907, lng: 135.83987 },
  travelMode: 'walking',
  distanceMeters: 319,
  travelMinutes: 4,
  effort: { level: 'easy', note: 'Level, through the gate and the cloister' },
  stayMinutes: [40, 60],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'A Buddha for everyone' },
    { text: 'In the 740s Japan was having a terrible time, with smallpox, rebellions and quarrels at court. Emperor Shōmu decided to build a giant Buddha, wishing peace for everyone, “even animals and plants”. The bronze was cast in eight stages over three years, and the Buddha was finished in 749. Gyōki, the monk from the fountain, died that same year.' },
    { kind: 'heading', text: 'The Buddha who lost his head' },
    { text: 'In 855 an earthquake knocked his head off, and it was put back. In 1180 the hall burned in a war and was rebuilt. In 1567 it burned again, and the Buddha sat out in the rain for almost a hundred years, until a monk called Kōkei went round the whole country collecting money, just as Gyōki had. The Buddha got a new head and was blessed again in 1692, and this hall was finished in 1709. It’s smaller than the first, but it’s still the biggest wooden building in the world.' },
    { kind: 'heading', text: 'Through the nostril' },
    { text: 'Behind the Buddha stands a wooden pillar with a hole at the bottom, said to be the same size as one of his nostrils. People say that if you can crawl through it, you’re clever.' },
    { kind: 'find', text: 'Find the pillar with the hole, behind the Buddha. Who in your family can squeeze through? (Grown-ups: it’s a tight fit.)' },
    PEAK_CLOSE,
  ],
}

const nigatsudo = {
  id: 'nigatsudo',
  name: 'Nigatsu-dō',
  photo: nigatsudoPhoto,
  photoAlt: 'The wooden balcony of Nigatsu-dō, looking out over Nara',
  memory: 'The whole city from the balcony.',
  mapPlace: 'Nigatsudo, Todaiji, Nara',
  mapPoint: { lat: 34.68927, lng: 135.84427 },
  travelMode: 'walking',
  distanceMeters: 580,
  travelMinutes: 8,
  effort: { level: 'moderate', note: 'Uphill, with stone steps at the end' },
  stayMinutes: [20, 40],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The hall of the second month' },
    { text: 'Nigatsu-dō means “second-month hall”, after a ceremony held here every year in the second month of the old calendar. The hall burned in the middle of that ceremony in 1667 and was rebuilt two years later. Its balcony faces west, out over the whole city, and it’s open all the time, for free.' },
    { kind: 'heading', text: 'Look back' },
    { text: 'Below you is the great roof you were just under, and beyond it the city that Gyōki and Kōkei asked for help, again and again, to build it and rebuild it. Somewhere down there the deer are still bowing.' },
    { kind: 'find', text: 'Find the Great Buddha Hall’s roof below, and the two golden ornaments at each end of its ridge.' },
    { className: 'narrationClose', text: 'That’s the end of the mission. Stay for the sunset if you can, then walk back down through the park to Kintetsu Nara Station, about 25 minutes, saying goodbye to the deer.' },
  ],
}

export default {
  id: 'nara',
  aiMade: true,
  name: 'Follow the Deer to the Great Buddha',
  location: 'NARA · NARA, JAPAN',
  city: 'Nara',
  photo: heroPhoto,
  photoAlt: 'A deer standing in front of Tōdai-ji’s Great South Gate',
  blurb: 'Bowing deer, two giant guardians, a Buddha who lost his head, and a hole the size of his nostril.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Interactive', 'Historical', 'Cultural', 'Nature'],
  departure: gyoki,
  discovery: deer,
  build: nandaimon,
  peak: daibutsuden,
  afterglow: nigatsudo,
  startArea: 'Nara, Japan',
  startNote: START_NOTE,
  bestTime: {
    season: 'Any time of year',
    seasonNote: 'June and July bring spotted fawns. In early March, during the Omizutori ceremony, monks carry huge torches along Nigatsu-dō’s balcony in the evenings: check the dates.',
    timeOfDay: 'Early afternoon',
    timeNote: 'So you’re in the Great Buddha Hall well before it closes, and on Nigatsu-dō’s balcony toward sunset.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Coins for deer crackers.',
      'Comfortable shoes: about 4 km in all, with steps up to Nigatsu-dō.',
      'Wet wipes, for after feeding the deer.',
    ],
    costs: [
      { lead: 'The Great Buddha Hall', text: '¥800 for adults and anyone 13 or over; ¥400 for children 6 to 12.' },
      'The park, the Great South Gate and Nigatsu-dō are free.',
      { lead: 'Deer crackers', text: 'Sold at stalls in the park, about ¥200 a pack.' },
    ],
    getting: [
      'Start at Gyōki’s statue, on the fountain by Kintetsu Nara Station. From JR Nara Station, it’s about 15 minutes’ walk east.',
      'It ends at Nigatsu-dō, on the hill above Tōdai-ji, about 25 minutes’ walk back to Kintetsu Nara Station.',
    ],
    access: [
      'The way to the Great Buddha Hall is on wide, paved and gravel paths, mostly fine with a stroller.',
      'The climb to Nigatsu-dō is uphill with stone steps.',
    ],
    restrictions: [
      { lead: 'The Great Buddha Hall', text: '7:30 AM–5:30 PM, April to October; 8 AM–5 PM, November to March.' },
      { lead: 'The deer', text: 'They’re wild animals and can butt, nip or kick, especially mothers in early summer and stags in autumn. Don’t tease them, and only feed them the crackers sold in the park.' },
      'Photos are fine inside the Great Buddha Hall, but not tripods. No photos inside Nigatsu-dō itself.',
    ],
    tips: [
      'Children always want to crawl through the pillar: there can be a queue, so let them go first and save the rest of the hall for after.',
      'The two guardians in the gate are behind wire mesh: stand back a little to see them whole.',
      'Tōdai-ji asks that photos of the temple aren’t used for advertising or other commercial purposes.',
    ],
  },
  match: {
    moods: { Peaceful: 45, Adventurous: 35, Romantic: 30, Curious: 80, Playful: 95, Cultural: 75 },
    with: { Solo: 50, Couple: 60, Family: 98, 'Friends / Group': 70 },
    preferences: {
      'Pet friendly': 15, 'Avoid alcohol': 95, 'More nature': 55, 'Food stops': 30,
      Coastal: 0, 'More urban': 40, 'Hiking involved': 10, 'Budget friendly': 80,
    },
  },
  description: [
    'Long ago an emperor decided to build a Buddha so big that a whole country had to help. A monk went out and gathered everyone’s gifts, a god was said to ride in on a white deer, and the Buddha lost his head in an earthquake and was put back together, more than once.',
    'This family afternoon follows the deer up through Nara Park to two giant guardians in a gate, the Great Buddha in the world’s biggest wooden building, and a pillar with a hole the size of his nostril, then up to a balcony over the whole city.',
  ],
  whyCool: {
    discovery: 'Wild deer that bow to you, in a park where they’ve been protected for over a thousand years.',
    significance: 'The Great Buddha of Tōdai-ji, cast in 749, in the largest wooden building in the world.',
    feeling: 'Playful and amazed: bowing deer, giants and a squeeze through a nostril.',
  },
  route: [gyoki, deer, nandaimon, daibutsuden, nigatsudo],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Nara, from the deer to the Great Buddha.',
    summary: 'You met the monk who gathered a country’s help, bowed to the deer, faced the two giants in the Great South Gate, saw the Great Buddha and tried the hole in the pillar, and finished on Nigatsu-dō’s balcony above the city.',
  },
}
