// From Mangroves to Neon: South Beach, Miami Beach (Florida), built the same
// way as the Waseda journey (testJourney.js). Every stop has its exact spot
// (`mapPoint`, from OpenStreetMap), so it gets the live map, and the walk to
// it from the stop before: how far (`distanceMeters`), how long
// (`travelMinutes`) and how hard (`effort`), from Google's walking routes,
// worked out once, in November 2026. Miami Beach is flat, so every walk is
// easy.
//
// The narration tells one story from stop to stop: a swamp turned into a
// resort, a hurricane, the little Art Deco hotels built after it, and the
// people who saved them. The history was checked against published sources
// (Wikipedia, the Miami Design Preservation League, the Wolfsonian, the
// National Trust) in November 2026. Stories that are only legends say so.
//
// The photos are from Wikimedia Commons, and need crediting (see Photo
// credits in the README). Nobody from Unfold has walked it yet, and the
// times at each stop are estimates. To take it out, remove it from
// ALL_JOURNEYS in journeyStops.js.

import lincolnRoadPhoto from './assets/journey/miami-beach/lincoln-road.jpg'
import espanolaWayPhoto from './assets/journey/miami-beach/espanola-way.jpg'
import welcomeCenterPhoto from './assets/journey/miami-beach/welcome-center.jpg'
import wolfsonianPhoto from './assets/journey/miami-beach/wolfsonian.jpg'
import colonyHotelPhoto from './assets/journey/miami-beach/colony-hotel.jpg'
import southPointePhoto from './assets/journey/miami-beach/south-pointe.jpg'
import newWorldCenterPhoto from './assets/journey/miami-beach/new-world-center.jpg'
import lummusParkPhoto from './assets/journey/miami-beach/lummus-park.jpg'
import casaCasuarinaPhoto from './assets/journey/miami-beach/casa-casuarina.jpg'
import parkCentralPhoto from './assets/journey/miami-beach/park-central.jpg'
import joesPhoto from './assets/journey/miami-beach/joes-stone-crab.jpg'

import {
  DEPARTURE, DISCOVERY, BUILD, DETOUR, PEAK, AFTERGLOW,
  ONE_DETOUR_NOTE, START_NOTE, PEAK_LEAD, PEAK_CLOSE, BACK_TO_ROUTE,
} from './aiJourneys/parts.js'

const lincolnRoad = {
  id: 'lincolnRoad',
  name: 'Lincoln Road',
  photo: lincolnRoadPhoto,
  photoAlt: 'One of Morris Lapidus’s white, swooping shade structures on Lincoln Road, among palms and shops',
  memory: 'Where Carl Fisher’s dream began.',
  mapPlace: 'Lincoln Road Mall, Miami Beach',
  mapPoint: { lat: 25.7908842, lng: -80.1340152 },
  travelMode: 'transit',
  travelMinutes: 0,
  stayMinutes: [10, 15],
  nearby: [
    {
      name: 'New World Center',
      note: 'Frank Gehry’s concert hall, which sometimes shows its concerts on a giant outdoor wall for the park in front',
      meters: 208,
      photo: newWorldCenterPhoto,
      photoAlt: 'The park in front of the New World Center at night, lit up in blue',
      mapPlace: 'New World Center, 500 17th Street, Miami Beach',
      mapPoint: { lat: 25.79147, lng: -80.1334394 },
    },
  ],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'You’re on Lincoln Road.' },
    { kind: 'heading', text: 'A farmer’s bridge' },
    { text: 'A little over a century ago, this was mangrove swamp. John Collins, a Quaker farmer growing avocados on the beach, was building a wooden bridge to the mainland and ran out of money. Carl Fisher, who’d made a fortune in car headlights and helped start the Indianapolis 500, lent him the rest. The bridge opened in 1913, and Fisher had the swamp cleared and sand pumped in from the bay to make dry land. He named this road after his hero, Abraham Lincoln.' },
    { kind: 'heading', text: 'Cars out, people in' },
    { text: 'By the 1950s the shoppers were drifting away, so in 1960 the architect Morris Lapidus did something bold: he banned the cars. He filled the road with gardens, fountains and odd, swooping shelters, and made it one of America’s first pedestrian malls.' },
    { kind: 'find', text: 'Find one of Lapidus’s white shade structures, curving overhead like a 1960s idea of the future.' },
    { className: 'narrationClose', text: 'Fisher’s boom was about to hit a storm. To see what came next, head a few blocks south to a little Spanish village, about seven minutes away.' },
  ],
}

const espanolaWay = {
  id: 'espanolaWay',
  name: 'Española Way',
  photo: espanolaWayPhoto,
  photoAlt: 'A cream Mediterranean-style building with balconies and striped awnings on Española Way, framed by palm trees',
  memory: 'The village built for artists.',
  mapPlace: 'Española Way, Miami Beach',
  mapPoint: { lat: 25.78686, lng: -80.13297 },
  travelMode: 'walking',
  distanceMeters: 517,
  travelMinutes: 7,
  // How hard the walk here is: 'easy', 'moderate' or 'hard', and what it's like.
  effort: { level: 'easy', note: 'Flat, a few blocks south' },
  stayMinutes: [20, 30],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'A village for artists' },
    { text: 'Fisher’s island boomed. In 1925, at the height of the Florida land rush, the developer N.B.T. Roney bought this street and set out to make it a Mediterranean village for artists, like the Left Bank in Paris or Greenwich Village in New York: stucco walls, tiled roofs and balconies over the street.' },
    { kind: 'heading', text: 'The storm, and the stories' },
    { text: 'A year later, the Great Miami Hurricane of 1926 tore through, and the boom was over. The artists never really came, but other characters did. Al Capone’s gang is said to have run gambling here, and in the 1930s, so the story goes, a young Desi Arnaz played rumba on this street, long before I Love Lucy.' },
    { kind: 'find', text: 'Find three things that say Spain rather than Florida: an arch, a wrought-iron balcony and a tiled roof. Keep them in mind, because the hotels on Ocean Drive will look nothing like this.' },
    { className: 'narrationClose', text: 'Next, the Art Deco district’s front door, on Ocean Drive, about fifteen minutes away.' },
  ],
}

const wolfsonian = {
  id: 'wolfsonian',
  name: 'The Wolfsonian–FIU',
  mapName: 'The Wolfsonian',
  photo: wolfsonianPhoto,
  photoAlt: 'The Wolfsonian, a tall, nearly windowless white building with a band of ornate decoration, on a sunny corner',
  memory: 'The warehouse full of design.',
  teaser: 'A museum of design from 1885 to 1945, in a fortress of a 1920s storage warehouse. Two blocks inland.',
  mapPlace: 'The Wolfsonian–FIU, 1001 Washington Avenue, Miami Beach',
  mapPoint: { lat: 25.7809174, lng: -80.1324633 },
  travelMode: 'walking',
  // From the Art Deco Welcome Center. On to the Colony Hotel after, it's
  // 473 m, so taking it adds about 325 m of walking (`extraMeters`).
  distanceMeters: 237,
  travelMinutes: 3,
  extraMeters: 325,
  effort: { level: 'easy', note: 'Flat, two blocks inland' },
  stayMinutes: [30, 45],
  ...DETOUR,
  narration: [
    { kind: 'heading', text: 'Where the winter people kept their things' },
    { text: 'This fortress of a building went up in 1927 as the Washington Storage Company. Wealthy winter visitors locked their furniture and valuables away here when they went back north for the summer, which is why it has hardly any windows.' },
    { kind: 'heading', text: 'A collector moves in' },
    { text: 'One of those customers was the father of Mitchell Wolfson Jr., who grew up to collect the design of 1885 to 1945, from posters to furniture. In the end his collection filled most of the warehouse, so he bought the building. It’s now a museum of how design shaped the modern world, Art Deco and all.' },
    { kind: 'find', text: 'Find the building’s ornate entrance, the one burst of carved decoration on its plain white walls.' },
    BACK_TO_ROUTE,
  ],
}

const welcomeCenter = {
  id: 'artDecoWelcomeCenter',
  name: 'Art Deco Welcome Center',
  mapName: 'Welcome Center',
  photo: welcomeCenterPhoto,
  photoAlt: 'The white Art Deco Welcome Center on Ocean Drive, under an Ocean Dr street sign and palm trees',
  memory: 'Where the fight to save it was won.',
  mapPlace: 'Art Deco Welcome Center, 1001 Ocean Drive, Miami Beach',
  mapPoint: { lat: 25.7802869, lng: -80.1303441 },
  travelMode: 'walking',
  distanceMeters: 1056,
  travelMinutes: 15,
  effort: { level: 'easy', note: 'Flat, south and across to Ocean Drive' },
  stayMinutes: [15, 20],
  nearby: [
    {
      name: 'Lummus Park',
      note: 'The beach across Ocean Drive, named after the Lummus brothers, two of Miami Beach’s first developers',
      meters: 54,
      photo: lummusParkPhoto,
      photoAlt: 'Palm trees on the lawn of Lummus Park, with Art Deco hotels behind',
      mapPlace: 'Lummus Park, Ocean Drive, Miami Beach',
      mapPoint: { lat: 25.7806133, lng: -80.1298933 },
    },
    {
      name: 'Casa Casuarina',
      note: 'Built in 1930 as a copy of a house in Santo Domingo, and later Gianni Versace’s mansion',
      meters: 246,
      photo: casaCasuarinaPhoto,
      photoAlt: 'Casa Casuarina, a white Mediterranean-style mansion behind palms and cypress trees',
      mapPlace: 'Casa Casuarina, 1116 Ocean Drive, Miami Beach',
      mapPoint: { lat: 25.782015, lng: -80.13063 },
    },
  ],
  ...BUILD,
  detours: [wolfsonian],
  detoursNote: ONE_DETOUR_NOTE,
  narration: [
    { kind: 'heading', text: 'Built for the rest of us' },
    { text: 'After the hurricane came the Depression, and Miami Beach rebuilt small and cheap. Through the 1930s, hundreds of modest hotels went up in the new Art Deco style, with clean lines, rounded corners and a touch of the tropics, for ordinary families rather than millionaires.' },
    { kind: 'heading', text: 'The woman who said no' },
    { text: 'By the 1970s those hotels were run-down and marked for demolition. In 1976 Barbara Capitman, a writer who loved design, started the Miami Design Preservation League to save them, and in 1979 this became the first urban 20th-century district on America’s National Register of Historic Places. This building is the League’s home.' },
    { kind: 'find', text: 'Find the historical marker for Barbara Capitman outside the center.' },
    { className: 'narrationClose', text: 'There’s a design museum two blocks inland, if you’d like a detour. Otherwise, the most famous neon on Ocean Drive is three blocks south.' },
  ],
}

const colonyHotel = {
  id: 'colonyHotel',
  name: 'The Colony Hotel',
  mapName: 'Colony Hotel',
  photo: colonyHotelPhoto,
  photoAlt: 'The Colony Hotel on Ocean Drive at night, its tall sign and trim glowing blue, beside the red neon of the Boulevard Hotel',
  photoPosition: '44% center',
  memory: 'Under the neon on Ocean Drive.',
  mapPlace: 'The Colony Hotel, 736 Ocean Drive, Miami Beach',
  mapPoint: { lat: 25.7774697, lng: -80.1315931 },
  travelMode: 'walking',
  distanceMeters: 385,
  travelMinutes: 5,
  effort: { level: 'easy', note: 'Flat, south along Ocean Drive' },
  stayMinutes: [20, 30],
  nearby: [
    {
      name: 'Park Central Hotel',
      note: 'Another Henry Hohauser hotel, a short way south on Ocean Drive',
      meters: 124,
      photo: parkCentralPhoto,
      photoAlt: 'The tall white-and-blue Art Deco front of the Park Central Hotel against a cloudy sky',
      mapPlace: 'Park Central Hotel, 640 Ocean Drive, Miami Beach',
      mapPoint: { lat: 25.7763719, lng: -80.1318326 },
    },
  ],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The sign everyone knows' },
    { text: 'The Colony was designed by Henry Hohauser in 1935, and it’s said to be the first streamlined building on Ocean Drive. Hohauser drew around 300 buildings in Miami Beach, but this is the one on the postcards, with its tall neon sign standing straight up from the front.' },
    { kind: 'heading', text: 'Pastels and Miami Vice' },
    { text: 'Capitman’s partner in the League, the designer Leonard Horowitz, is credited with painting the saved hotels in soft pastels. Then, in 1984, Miami Vice filmed against them, and the whole world saw a pink-and-turquoise Miami Beach. The swamp Fisher drained had become one of the most recognisable streets on earth.' },
    { kind: 'find', text: 'Find the “eyebrows”: thin concrete ledges over the windows that shade them from the sun. Almost every hotel along here has them. How many can you count on one building?' },
    PEAK_CLOSE,
  ],
}

const southPointe = {
  id: 'southPointePark',
  name: 'South Pointe Park',
  photo: southPointePhoto,
  photoAlt: 'The wide beach and Miami Beach skyline seen from South Pointe Park Pier, with a lifeguard tower on the sand',
  memory: 'Watching the ships at the end of the island.',
  mapPlace: 'South Pointe Park, Miami Beach',
  mapPoint: { lat: 25.7659229, lng: -80.1334471 },
  travelMode: 'walking',
  distanceMeters: 1308,
  travelMinutes: 18,
  effort: { level: 'easy', note: 'Flat, south to the tip of the island' },
  stayMinutes: [30, 45],
  nearby: [
    {
      name: 'Joe’s Stone Crab',
      note: 'A Miami Beach institution since 1913, the year Collins’s bridge opened, famous for its stone crab claws',
      meters: 430,
      photo: joesPhoto,
      photoAlt: 'The arched entrance of Joe’s Stone Crab, with people waiting outside',
      mapPlace: 'Joe’s Stone Crab, 11 Washington Avenue, Miami Beach',
      mapPoint: { lat: 25.7684081, lng: -80.1352398 },
    },
  ],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'Where the island ends' },
    { text: 'This is the southern tip. Between 1905 and 1911, a shipping channel called Government Cut was dug right here, slicing off the end of the beach so ships could reach Miami’s port. The land on the far side became Fisher Island, and Carl Fisher, it’s said, later traded part of it to William Vanderbilt for a yacht.' },
    { kind: 'heading', text: 'The whole story' },
    { text: 'From a swamp nobody wanted to the Art Deco capital of the world, by way of a farmer’s bridge, a hurricane, and a woman who wouldn’t let it all be knocked down. The ships still slip out through the cut, past the beach, the way they have for over a century.' },
    { kind: 'find', text: 'On the beach beside the park, find a lifeguard tower. After Hurricane Andrew wrecked the old ones in 1992, the architect William Lane designed new ones in bright colours, a little bit of Art Deco for the beach.' },
    { className: 'narrationClose', text: 'That’s the walk. Stay for the sunset, and look out for the neon on your way back.' },
  ],
}

export default {
  id: 'miamiBeach',
  name: 'From Mangroves to Neon',
  location: 'MIAMI BEACH · FLORIDA, USA',
  city: 'Miami Beach',
  photo: colonyHotelPhoto,
  photoAlt: colonyHotel.photoAlt,
  photoPosition: colonyHotel.photoPosition,
  blurb: 'A farmer’s bridge, a hurricane, and the woman who saved Ocean Drive.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experience: 'Cultural',
  departure: lincolnRoad,
  discovery: espanolaWay,
  build: welcomeCenter,
  peak: colonyHotel,
  afterglow: southPointe,
  startArea: 'Lincoln Road, Miami Beach, Florida',
  startNote: START_NOTE,
  match: {
    moods: { Peaceful: 40, Adventurous: 30, Romantic: 70, Curious: 75, Playful: 65, Cultural: 80 },
    with: { Solo: 80, Couple: 90, Family: 65, 'Friends / Group': 85 },
    preferences: {
      'Pet friendly': 50, 'Avoid alcohol': 60, 'More nature': 30, 'Food stops': 75,
      Coastal: 90, 'More urban': 80, 'Hiking involved': 5, 'Budget friendly': 50,
    },
  },
  description: [
    'A little over a century ago, South Beach was a strip of sand and mangrove swamp that nobody wanted. Then a farmer built a bridge to it, a millionaire who’d made his fortune in car headlights turned it into a playground, and a hurricane blew the whole dream apart.',
    'This walk follows what happened next: the cheerful little hotels that rose from the wreckage, the years they were left to crumble, and the woman who fought to save them. By the time you’re standing under the neon on Ocean Drive, you’ll know exactly who to thank for it.',
  ],
  route: [lincolnRoad, espanolaWay, welcomeCenter, colonyHotel, southPointe],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was South Beach, from the swamp to the neon. Whatever you took from the walk, it’s yours now.',
    summary: 'You started on Lincoln Road, wandered through Española Way, met the people who saved the Art Deco district, stood under the Colony’s sign on Ocean Drive, and finished at South Pointe, where the island ends.',
  },
}
