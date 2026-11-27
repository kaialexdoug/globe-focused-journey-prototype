// In the Shadow of Fuji (Fujiyoshida, Yamanashi), built the same way as the
// Waseda journey (testJourney.js). Every stop has its exact spot
// (`mapPoint`, from Wikipedia and OpenStreetMap), so it gets the live map,
// and the way to it from the stop before: how far (`distanceMeters`), how
// long (`travelMinutes`) and how hard (`effort`), worked out once, in
// November 2026. The walks are from Google's walking routes and the heights
// along them (Open-Meteo). Google has no train routes in Japan, so the ride
// to Kawaguchiko is its length on the Fujikyu line (Wikipedia), and its time
// is an estimate.
//
// The narration tells one story from stop to stop: a town at the foot of a
// mountain that people have worshipped and climbed as pilgrims for
// centuries, from the street that frames it to the shrine where the
// pilgrims set out, the pagoda in the photo the world knows, and the lake
// below it. The history was checked against published sources (Wikipedia,
// in English and Japanese) in November 2026.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates.

import stationPhoto from '../assets/journey/fujiyoshida/station.jpg'
import honchoDoriPhoto from '../assets/journey/fujiyoshida/honcho-dori.jpg'
import arakuraShrinePhoto from '../assets/journey/fujiyoshida/arakura-shrine.jpg'
import kitaguchiHonguPhoto from '../assets/journey/fujiyoshida/kitaguchi-hongu.jpg'
import chureitoPhoto from '../assets/journey/fujiyoshida/chureito.jpg'
import lakeKawaguchiPhoto from '../assets/journey/fujiyoshida/lake-kawaguchi.jpg'

// The spots near the stops.
import ropewayPhoto from '../assets/journey/fujiyoshida/panoramic-ropeway.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE, DINNER,
} from './parts.js'

const station = {
  id: 'shimoyoshida',
  name: 'Shimoyoshida Station',
  photo: stationPhoto,
  photoAlt: 'Shimoyoshida Station, a small cream-coloured station building with a red canopy, before green hills',
  memory: 'Where the day began.',
  mapPlace: 'Shimoyoshida Station',
  mapPoint: { lat: 35.49777778, lng: 138.80333333 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [5, 10],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re in Fujiyoshida.' },
    { kind: 'heading', text: 'At the foot of the mountain' },
    { text: 'This town sits right at the foot of Mount Fuji, built on the mountain’s old lava flows. On a clear day, Fuji fills the sky above the rooftops, and it follows you everywhere you go.' },
    { kind: 'heading', text: 'A mountain of pilgrims' },
    { text: 'For centuries, people came to Fujiyoshida to climb Fuji as pilgrims, setting out from the shrine at the foot of its trail. In 2013, the mountain was made a World Heritage Site, as a place of worship and a source of art.' },
    { kind: 'find', text: 'Look up from the station for Fuji. If it’s out, you won’t be able to miss it.' },
    { className: 'narrationClose', text: 'Head out from the station toward the old main street. The first stop is a short walk away.' },
  ],
}

const honchoDori = {
  id: 'honchoDori',
  name: 'Honcho-dori',
  photo: honchoDoriPhoto,
  photoAlt: 'Honcho-dori, a long straight street lined with old-fashioned lamps, with Mount Fuji half hidden in cloud at the far end',
  memory: 'Fuji at the end of the street.',
  // Where the famous view of Fuji at the end of the street is.
  mapPlace: 'Honcho-dori, Fujiyoshida',
  mapPoint: { lat: 35.492672, lng: 138.803907 },
  travelMode: 'walking',
  distanceMeters: 584,
  travelMinutes: 8,
  effort: { level: 'easy', note: 'Flat, along the old main street' },
  stayMinutes: [15, 30],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Fuji at the end of the road' },
    { text: 'Honcho-dori is the old main street, and it runs straight toward the mountain. On a clear day, Fuji sits right at the end of the road, framed by the shops on either side.' },
    { kind: 'heading', text: 'A real street' },
    { text: 'It’s a real street, with real traffic and a town going about its day, so take your photo from the pavement.' },
    { kind: 'find', text: 'Find the spot where Fuji sits right in the middle of the road, between the shops on either side.' },
    { className: 'narrationClose', text: 'When you’re ready, head for the shrine at the foot of the hill.' },
  ],
}

const kitaguchiHongu = {
  id: 'kitaguchiHongu',
  name: 'Kitaguchi Hongu Fuji Sengen Shrine',
  mapName: 'Kitaguchi Hongu',
  photo: kitaguchiHonguPhoto,
  photoAlt: 'A huge red wooden torii at Kitaguchi Hongu Fuji Sengen Shrine, with the shrine hall beyond it among tall trees',
  memory: 'Where the pilgrims set out for Fuji.',
  teaser: 'The old starting point for pilgrims climbing Fuji, in a forest of giant cedars. A short ride across town.',
  mapPlace: 'Kitaguchi Hongu Fuji Sengen Jinja',
  mapPoint: { lat: 35.47075, lng: 138.79241667 },
  travelMode: 'transit',
  // From Arakura, about 4.2 km by road. By bus or taxi, it's about 20
  // minutes each way, so the time it adds is there and back.
  distanceMeters: 4195,
  travelMinutes: 20,
  effort: { level: 'easy', note: 'A short ride across town, by bus or taxi' },
  stayMinutes: [30, 45],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'Where the pilgrims set out' },
    { text: 'For centuries, pilgrims climbing Mount Fuji set out from here, at the start of the Yoshida Trail. Legend says Prince Yamato Takeru stopped here long ago, and declared that the sacred mountain should be climbed from the north.' },
    { kind: 'heading', text: 'The fire festival' },
    { text: 'The shrine stands in a forest of giant cedars, and its great wooden torii is one of the biggest you’ll see. Every year on the 26th and 27th of August, the town lights huge torches along its streets for the Yoshida Fire Festival.' },
    { kind: 'find', text: 'Walk the avenue of cedars up to the halls, and imagine setting off from here for the summit.' },
    BACK_TO_ROUTE,
  ],
}

const arakuraShrine = {
  id: 'arakuraShrine',
  name: 'Arakura Fuji Sengen Shrine',
  mapName: 'Arakura Shrine',
  photo: arakuraShrinePhoto,
  photoAlt: 'A red torii at the top of stone steps at Arakura Fuji Sengen Shrine, with stone lanterns and autumn leaves',
  memory: 'At the foot of the long stairs.',
  mapPlace: 'Arakura Fuji Sengen Shrine',
  mapPoint: { lat: 35.5003121, lng: 138.8001336 },
  travelMode: 'walking',
  distanceMeters: 1118,
  travelMinutes: 17,
  effort: { level: 'easy', note: 'Back past the station and gently uphill to the shrine' },
  stayMinutes: [15, 20],
  ...BUILD,
  detours: [kitaguchiHongu],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'The shrine on the hill' },
    { text: 'This is Arakura Fuji Sengen Shrine, at the foot of Mount Arakura. Behind it, a long flight of almost 400 steps climbs up through the trees, to the pagoda above.' },
    { kind: 'heading', text: 'Before the climb' },
    { text: 'Stop at the shrine before you go up. It’s quieter down here, and the climb ahead is a good one.' },
    { kind: 'find', text: 'Find the red torii at the top of the first stone steps, with its stone lanterns.' },
    { className: 'narrationClose', text: 'Across town, there’s an older shrine where pilgrims once set out for Fuji, if you’d like a detour. Otherwise, start climbing.' },
  ],
}

const chureito = {
  id: 'chureito',
  name: 'Chureito Pagoda',
  photo: chureitoPhoto,
  photoAlt: 'The red five-storey Chureito Pagoda, with snow-capped Mount Fuji rising behind it',
  memory: 'The pagoda and the mountain.',
  mapPlace: 'Chureito Pagoda',
  mapPoint: { lat: 35.5012871, lng: 138.8013556 },
  travelMode: 'walking',
  distanceMeters: 678,
  travelMinutes: 14,
  effort: { level: 'moderate', note: 'Up almost 400 steps to the pagoda' },
  stayMinutes: [30, 45],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The view the world knows' },
    { text: 'You might recognise this one. Climb past the pagoda to the viewing deck above it, and there it is: the red pagoda, the town below, and Fuji rising behind them all. The view has been on magazine covers and in schoolbooks around the world.' },
    { kind: 'heading', text: 'A memorial' },
    { text: 'It looks like a temple pagoda, but it’s a memorial to the people of the town who died in war, among some 650 cherry trees. If the mountain is hiding in cloud, wait a while. It has a way of coming out when you least expect it.' },
    { kind: 'find', text: 'From the deck, find the pagoda, the town and Fuji all in one view, and take the photo.' },
    PEAK_CLOSE,
  ],
}

const lakeKawaguchi = {
  id: 'lakeKawaguchi',
  name: 'Lake Kawaguchi',
  photo: lakeKawaguchiPhoto,
  photoAlt: 'Mount Fuji across the blue water of Lake Kawaguchi, with a bare tree and golden grass on the shore',
  memory: 'Fuji over the lake at the end of the day.',
  // The shore nearest Kawaguchiko Station.
  mapPlace: 'Lake Kawaguchi',
  mapPoint: { lat: 35.503768, lng: 138.769307 },
  travelMode: 'transit',
  // The Fujikyu line from Shimoyoshida to Kawaguchiko is 5.5 km. With the
  // walk back down to Shimoyoshida Station (1,116 m) and from Kawaguchiko
  // Station to the lake (847 m), which aren't counted in the walking, it's
  // about 50 minutes.
  distanceMeters: 5500,
  travelMinutes: 50,
  effort: { level: 'easy', note: 'Down the hill to Shimoyoshida Station, the train to Kawaguchiko, then down to the lake' },
  stayMinutes: [45, 60],
  nearby: [
    {
      name: 'Mt. Fuji Panoramic Ropeway',
      note: 'A short ride up Mount Tenjo, for a view over the lake to Fuji',
      meters: 460,
      photo: ropewayPhoto,
      photoAlt: 'The view from inside a ropeway cabin, looking down over Lake Kawaguchi and the town on its shore',
      mapPlace: '河口湖 富士山パノラマロープウェイ',
      mapPoint: { lat: 35.50378, lng: 138.7744071 },
    },
  ],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'The lake below the mountain' },
    { text: 'That’s the last stop. Lake Kawaguchi is the second largest of the five lakes around the foot of Fuji, the lowest of them, and the one with the longest shore.' },
    { kind: 'heading', text: 'Fuji in the water' },
    { text: 'Find a spot by the water and look across for the mountain you’ve had in view all day. On a still evening, Fuji is reflected right there in the lake.' },
    { kind: 'find', text: 'Find Fuji across the water, and look for its reflection if the lake is still.' },
    DINNER,
  ],
}

export default {
  id: 'fujiyoshida',
  aiMade: true,
  name: 'In the Shadow of Fuji',
  location: 'FUJIYOSHIDA · YAMANASHI, JAPAN',
  city: 'Fujiyoshida',
  photo: chureitoPhoto,
  photoAlt: chureito.photoAlt,
  photoPosition: '10% center',
  blurb: 'Through the town at the foot of Mount Fuji, up the steps to its most famous view.',
  walking: 'Some climbing',
  stops: '~5 stops',
  difficulty: 'Moderate',
  experienceLevel: 'standoutJourney',
  experiences: ['Scenic', 'Cultural', 'Historical'],
  departure: station,
  discovery: honchoDori,
  build: arakuraShrine,
  peak: chureito,
  afterglow: lakeKawaguchi,
  startArea: 'Fujiyoshida, Yamanashi, Japan',
  startNote: START_NOTE,
  // When to go (Weather & Best Time to Go, BestTime.jsx).
  bestTime: {
    season: 'Mid-spring',
    seasonNote: 'For the cherry blossoms around the pagoda in mid-April. From late fall to winter, Fuji is clearest, and capped with snow.',
    timeOfDay: 'Early in the morning',
    timeNote: 'Fuji is most often clear of cloud in the morning.',
  },
  // For Before You Go on See Your Journey (BeforeYouGo.jsx, which explains
  // the shape). Checked in November 2026 against Yamanashi's and
  // Fujiyoshida's tourist information and the Mt. Fuji Panoramic Ropeway's
  // published fares.
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'Comfortable shoes, for almost 400 steps up to the Chureito Pagoda.',
      'Warm layers: Fujiyoshida is about 800 metres up, and much colder than Tokyo, especially in the morning.',
      'Water, and some cash for snacks and train tickets.',
      'A bag for your rubbish: Japan has very few public bins.',
    ],
    costs: [
      'Honcho-dori, the shrines and the Chureito Pagoda are free.',
      { lead: 'Mt. Fuji Panoramic Ropeway', text: '¥1,000 return (¥500 for children), or ¥600 one way. Half price for disabled visitors.' },
      'The train from Shimoyoshida to Kawaguchiko is a short ride on the Fujikyu Railway.',
    ],
    getting: [
      'Start at Shimoyoshida Station, on the Fujikyu Railway, which connects with the JR Chuo Line at Otsuki.',
      'The walk ends at Lake Kawaguchi, a few minutes’ walk from Kawaguchiko Station at the end of the line.',
      'Cars are discouraged around the Chureito Pagoda: walk up from Shimoyoshida Station.',
    ],
    access: [
      'Flat along Honcho-dori, then almost 400 steps up to the Chureito Pagoda: not possible with a wheelchair or stroller.',
      'Kitaguchi Hongu Fuji Sengen Shrine is a bus or taxi ride across town, with gravel paths under the cedars.',
    ],
    restrictions: [
      { lead: 'Honcho-dori', text: 'A working street with traffic. Take your photos from the sidewalk, not the road.' },
      { lead: 'Mt. Fuji Panoramic Ropeway', text: 'Usually 8:30 AM–5 PM (later in summer). It stops in strong wind.' },
      'In the cherry blossom season, photography on the pagoda’s viewing deck may be restricted to keep the crowds moving.',
    ],
    tips: [
      'Mount Fuji is clearest early in the morning and in winter. By midday it’s often behind cloud.',
      'The cherry blossoms around the pagoda peak in early to mid April, and the autumn leaves from late October to mid November. Both bring big crowds.',
      'Go early on a weekday to beat the crowds on the viewing deck.',
    ],
  },
  match: {
    moods: { Peaceful: 70, Adventurous: 70, Romantic: 80, Curious: 60, Playful: 35, Cultural: 70 },
    with: { Solo: 80, Couple: 90, Family: 65, 'Friends / Group': 80 },
    preferences: {
      'Pet friendly': 30, 'Avoid alcohol': 90, 'More nature': 85, 'Food stops': 55,
      Coastal: 15, 'More urban': 25, 'Hiking involved': 55, 'Budget friendly': 80,
    },
  },
  description: [
    'Fujiyoshida sits right at the foot of Mount Fuji, a mountain people have worshipped and climbed as pilgrims for centuries. On a clear day it fills the sky above the town, at the end of the main street and behind a red pagoda in a photo known all over the world.',
    'This journey walks from the old main street to the shrine at the foot of the hill, up almost 400 steps to the pagoda and its view, and on to Lake Kawaguchi to watch the mountain in the water as the day ends.',
  ],
  // Why It's Cool on the journey's page (JourneyPage.jsx): what you'll
  // discover, why it matters, and what it feels like, a sentence each.
  whyCool: {
    discovery: 'The town at the foot of Mount Fuji, with the mountain at the end of its main street and behind a famous red pagoda.',
    significance: 'Centuries of pilgrims who set out from here to climb Fuji, and a pagoda that remembers the town’s war dead.',
    feeling: 'Breathtaking and rewarding: almost 400 steps up for the view, then a calm lakeside as the day ends.',
  },
  route: [station, honchoDori, arakuraShrine, chureito, lakeKawaguchi],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was Fujiyoshida, a whole day in the shadow of the mountain. Whatever you took from the day, it’s yours now.',
    summary: 'You started at Shimoyoshida Station, found Fuji at the end of Honcho-dori, stopped at Arakura Fuji Sengen Shrine, climbed to the Chureito Pagoda, and finished by Lake Kawaguchi.',
  },
}
