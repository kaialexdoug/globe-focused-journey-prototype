// The Secrets of 42nd Street (New York City): a curious hour or two for a
// group of friends, made to the Journey Engine V2 handoff (flagship
// destinations: New York City).
//
// Its peak, chosen first: the Whispering Gallery under Grand Central
// Terminal, where a whisper into one corner of a tiled arch can be heard
// clearly in the far corner. Why it's exceptional: in the busiest square
// mile in America, a short walk turns up a library built on a lost
// reservoir, a ceiling of stars painted backwards, a patch of grime left
// on purpose, and an arch that carries secrets. The thread is things hiding
// in plain sight.
//
// Primary mood: Curious. Audience: friends. On foot, about 1.2 km, flat.
//
// Exact spots from OpenStreetMap; walks from Google's Routes API (November
// 2026). Checked in November 2026 against Grand Central's own site, MTA Away,
// History.com, Atlas Obscura and Time Out on the terminal's secrets, and
// well-documented history of the library and the Chrysler Building.

import heroPhoto from '../assets/journey/new-york/hero.jpg'
import lionsPhoto from '../assets/journey/new-york/lions.jpg'
import bryantPhoto from '../assets/journey/new-york/bryant-park.jpg'
import ceilingPhoto from '../assets/journey/new-york/ceiling.jpg'
import galleryPhoto from '../assets/journey/new-york/whispering-gallery.jpg'
import chryslerPhoto from '../assets/journey/new-york/chrysler.jpg'

import { DEPARTURE, DISCOVERY, BUILD, PEAK, AFTERGLOW, START_NOTE, PEAK_LEAD, PEAK_CLOSE } from './parts.js'

const lions = {
  id: 'libraryLions',
  name: 'The Library Lions',
  photo: lionsPhoto,
  photoAlt: 'A marble lion guarding the steps of the New York Public Library on Fifth Avenue',
  memory: 'Patience and Fortitude.',
  mapPlace: 'New York Public Library, Stephen A. Schwarzman Building, Fifth Avenue at 42nd Street',
  mapPoint: { lat: 40.75334, lng: -73.98215 },
  travelMode: 'walking',
  travelMinutes: 0,
  stayMinutes: [15, 30],
  ...DEPARTURE,
  narration: [
    { className: 'narrationLead', text: 'Midtown hides more than it shows. Today, look closer than everyone rushing past.' },
    { kind: 'heading', text: 'Two lions' },
    { text: 'The marble lions on the library steps have names: Patience and Fortitude. Mayor Fiorello La Guardia gave them those names in the 1930s, for the qualities he said New Yorkers would need to get through the Depression.' },
    { kind: 'heading', text: 'A lake under the books' },
    { text: 'The library, opened in 1911, stands where a huge walled reservoir once held the city’s drinking water, brought down from the Croton River. People used to stroll along the top of its walls.' },
    { kind: 'find', text: 'Find out which lion is which: Patience sits on the south side, Fortitude on the north.' },
    { className: 'narrationClose', text: 'Walk round behind the library into Bryant Park, a couple of minutes. Tap “I’m Here” on the lawn.' },
  ],
}

const bryant = {
  id: 'bryantPark',
  name: 'Bryant Park',
  photo: bryantPhoto,
  photoAlt: 'The lawn and trees of Bryant Park behind the New York Public Library',
  memory: 'A park on the roof of the books.',
  mapPlace: 'Bryant Park, Midtown Manhattan',
  mapPoint: { lat: 40.75375, lng: -73.98354 },
  travelMode: 'walking',
  distanceMeters: 131,
  travelMinutes: 2,
  effort: { level: 'easy', note: 'Round behind the library' },
  stayMinutes: [10, 20],
  ...DISCOVERY,
  narration: [
    { kind: 'heading', text: 'Under your feet' },
    { text: 'The library’s collection doesn’t all fit inside the building. Underneath this lawn are extra stacks of books, shelved out of sight while people picnic on top.' },
    { kind: 'find', text: 'Pick a spot on the lawn and imagine the shelves of books under you. Then find a free green chair: they’re there for anyone to move around.' },
    { className: 'narrationClose', text: 'Now east along 42nd Street to Grand Central Terminal, about 10 minutes. Tap “I’m Here” in the Main Concourse.' },
  ],
}

const concourse = {
  id: 'mainConcourse',
  name: 'Grand Central’s Ceiling',
  photo: ceilingPhoto,
  photoAlt: 'The green-blue ceiling of Grand Central’s Main Concourse, painted with gold constellations',
  memory: 'Stars painted backwards.',
  mapPlace: 'Main Concourse, Grand Central Terminal, 89 E 42nd St, New York',
  mapPoint: { lat: 40.75269, lng: -73.97725 },
  travelMode: 'walking',
  distanceMeters: 608,
  travelMinutes: 9,
  effort: { level: 'easy', note: 'Flat, east along 42nd Street' },
  stayMinutes: [20, 30],
  ...BUILD,
  narration: [
    { kind: 'heading', text: 'A backwards sky' },
    { text: 'Look up. The constellations on the ceiling are painted the wrong way round, as if seen from outside the sky looking in. One story says the artist, Paul Helleu, meant it as a God’s-eye view; another says it was a mistake. Nobody knows for sure.' },
    { kind: 'heading', text: 'The dirty patch' },
    { text: 'When the ceiling was cleaned in a restoration completed in 1998, the restorers left one small patch dark on purpose, to show how much grime, much of it from tobacco smoke, had built up over the years.' },
    { kind: 'find', text: 'Find the one dark rectangle on the ceiling, near the corner by the crab of Cancer. Then find the famous opal-faced clock on the information booth below.' },
    { className: 'narrationClose', text: 'Now down the ramp toward the Oyster Bar, a couple of minutes. Tap “I’m Here” under the tiled arches outside it.' },
  ],
}

const gallery = {
  id: 'whisperingGallery',
  name: 'The Whispering Gallery',
  photo: galleryPhoto,
  photoAlt: 'The low tiled arches of the Whispering Gallery outside Grand Central’s Oyster Bar',
  memory: 'A whisper across the arch.',
  mapPlace: 'Whispering Gallery, outside the Oyster Bar, Grand Central Terminal, New York',
  mapPoint: { lat: 40.75242, lng: -73.97734 },
  travelMode: 'walking',
  distanceMeters: 201,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'Down the ramp below the concourse' },
  stayMinutes: [15, 20],
  ...PEAK,
  narration: [
    PEAK_LEAD,
    { kind: 'heading', text: 'The arch that carries secrets' },
    { text: 'Outside the Oyster Bar, open since 1913, the ceiling is a low vault of curved tiles. Stand facing into one corner, have a friend stand in the corner diagonally opposite, and whisper. The curve of the arch carries your voice over the heads of everyone walking through, and your friend hears you as if you were next to them.' },
    { kind: 'find', text: 'Split up into opposite corners and whisper a secret into the wall. Did it arrive?' },
    PEAK_CLOSE,
  ],
}

const chrysler = {
  id: 'chryslerView',
  name: 'The Chrysler Building',
  photo: chryslerPhoto,
  photoAlt: 'The Chrysler Building’s steel crown rising above 42nd Street',
  memory: 'A spire raised in secret.',
  mapPlace: 'Chrysler Building, 405 Lexington Avenue at 42nd Street, New York',
  mapPoint: { lat: 40.7516, lng: -73.97534 },
  travelMode: 'walking',
  distanceMeters: 205,
  travelMinutes: 3,
  effort: { level: 'easy', note: 'Out to Lexington Avenue' },
  stayMinutes: [10, 20],
  ...AFTERGLOW,
  narration: [
    { kind: 'heading', text: 'One last secret' },
    { text: 'Finished in 1930, the Chrysler Building was briefly the tallest building in the world. Its spire was assembled inside the top of the tower and then raised into place, to beat a rival skyscraper to the record. Within a year, the Empire State Building took the title.' },
    { kind: 'find', text: 'Stand on Lexington and look up at the crown’s steel arches. Find the eagles near the top of the tower.' },
    { className: 'narrationClose', text: 'That’s 42nd Street’s secrets. Go and find a few more of your own.' },
  ],
}

export default {
  id: 'newYork',
  aiMade: true,
  name: 'The Secrets of 42nd Street',
  location: 'MANHATTAN · NEW YORK, USA',
  city: 'New York',
  photo: heroPhoto,
  photoAlt: 'The tiled arches of the Whispering Gallery in Grand Central Terminal',
  blurb: 'Lions with names, a lawn over the library’s books, stars painted backwards, and an arch that carries whispers.',
  walking: 'Easy walking',
  stops: '~5 stops',
  difficulty: 'Easy',
  experiences: ['Hidden Gems', 'Historical', 'Interactive', 'Cultural'],
  departure: lions,
  discovery: bryant,
  build: concourse,
  peak: gallery,
  afterglow: chrysler,
  startArea: 'Midtown Manhattan, New York, USA',
  startNote: START_NOTE,
  bestTime: {
    season: 'Any time of year',
    seasonNote: 'It’s mostly indoors or a short walk between, so it works in any weather.',
    timeOfDay: 'Mid-morning or mid-afternoon on a weekday',
    timeNote: 'Avoid the rush hours, when Grand Central is packed and the Whispering Gallery is loud.',
  },
  beforeYouGo: {
    checked: 'November 2026',
    bring: [
      'At least one friend, for the Whispering Gallery.',
    ],
    costs: [
      'Everything on this walk is free.',
    ],
    getting: [
      'Start at the New York Public Library on Fifth Avenue at 42nd Street. Grand Central is three avenues east.',
    ],
    access: [
      'Flat and step-free throughout, with ramps down to the Oyster Bar level at Grand Central.',
    ],
    restrictions: [
      'Grand Central is a working station: keep out of the way of commuters, especially at rush hour.',
    ],
    tips: [
      'The library’s Rose Main Reading Room is worth a look if it’s open when you pass.',
    ],
  },
  match: {
    moods: { Peaceful: 30, Adventurous: 30, Romantic: 50, Curious: 98, Playful: 75, Cultural: 70 },
    with: { Solo: 70, Couple: 85, Family: 80, 'Friends / Group': 95 },
    preferences: {
      'Pet friendly': 30, 'Avoid alcohol': 90, 'More nature': 10, 'Food stops': 40,
      Coastal: 0, 'More urban': 98, 'Hiking involved': 5, 'Budget friendly': 98,
    },
  },
  description: [
    'Midtown Manhattan is the busiest place in America, and most people rush straight through it. But along one short stretch of 42nd Street there are secrets hiding in plain sight, if you know where to look.',
    'This walk starts with two lions who have names, crosses a park laid over the library’s hidden books, stops under a ceiling of stars painted backwards, and ends with a whisper carried across an arch, and a skyscraper’s secret spire.',
  ],
  whyCool: {
    discovery: 'A whisper into a corner, heard clearly in the corner opposite.',
    significance: 'Grand Central Terminal of 1913, and the library built where a reservoir once stood.',
    feeling: 'Curious and fun: the city you thought you knew, full of things hiding in plain sight.',
  },
  route: [lions, bryant, concourse, gallery, chrysler],
  wrapUp: {
    heading: 'You made it.',
    message: 'That was 42nd Street, and its secrets.',
    summary: 'You met Patience and Fortitude, sat on the lawn over the library’s hidden stacks, found the backwards stars and the dark patch on Grand Central’s ceiling, whispered across the Whispering Gallery, and looked up at the Chrysler Building’s secret spire.',
  },
}
