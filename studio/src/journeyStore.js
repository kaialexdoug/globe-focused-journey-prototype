// Where the studio gets its journeys from, and where new ones are kept.
// Everything in the studio that reads or makes journeys goes through this
// file, so when the database is set up, this is the one file that changes.
//
// For now there are two kinds:
//
// - Three from the app, read straight from its journey files in main-app/src,
//   to keep things manageable while the studio takes shape: the two
//   walked-and-checked journeys and one made with AI. They can't be changed
//   or deleted here, since they're the app's own files.
// - New ones made with Create new journey, and their stops. Until there's a
//   database these are only kept in this browser (localStorage), so they don't
//   show up on another computer, and clearing the browser's data loses them.
//
// On screen the studio calls a journey's stops its "steps" (Journey Steps, the
// Step Editor, Step type). The code still calls them stops, the same as the
// app's journey files do.

import { kawagoeJourney, odawaraJourney } from '../../main-app/src/journeyStops.js'
import kamakuraJourney from '../../main-app/src/aiJourneys/kamakura.js'

const APP_JOURNEYS = [odawaraJourney, kawagoeJourney, kamakuraJourney]

export const DEFAULT_NAME = 'Untitled journey'

// What a stop can be, in the order they're offered. "Other" is for anything
// else, with its own name typed in (`otherType` on the stop).
export const STOP_TYPES = [
  { value: 'hook', label: 'Hook' },
  { value: 'departure', label: 'Departure' },
  { value: 'discovery', label: 'Discovery' },
  { value: 'build', label: 'Build' },
  { value: 'peak', label: 'Peak' },
  { value: 'afterglow', label: 'Afterglow' },
  { value: 'memory', label: 'Memory' },
  { value: 'other', label: 'Other' },
]

const STORAGE_KEY = 'unfold-studio.newJourneys'

function makeId(kind) {
  return `${kind}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
}

function loadNewJourneys() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    // Ones made before stops could be added have none, and ones made before
    // there was a Save button were last saved when they were made.
    return Array.isArray(saved)
      ? saved.map((journey) => ({ stops: [], savedAt: journey.createdAt, ...journey }))
      : []
  } catch {
    return []
  }
}

// Kept here as well as in the browser, so a new journey still works until
// the page is closed even if the browser won't save it.
let newJourneys = loadNewJourneys()

function saveNewJourneys() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newJourneys))
  } catch {
    // Not saved in the browser, so the change is gone when the page is closed.
  }
}

// The newest first, then the app's.
export function listJourneys() {
  return [...newJourneys, ...APP_JOURNEYS]
}

export function getJourney(id) {
  return listJourneys().find((journey) => journey.id === id) ?? null
}

// Whether a journey was made here, so it can be changed and deleted here. The
// app's are its own files, so for now they can only be changed there.
export function madeInStudio(journey) {
  return newJourneys.some((made) => made.id === journey.id)
}

// The name a journey would get: the one asked for, or with " (1)" after it if
// a journey's already called that, " (2)" if that's taken too, and so on.
// Capitals don't count, so "untitled journey" is taken by "Untitled journey".
// Left blank, it's "Untitled journey". When renaming one, `renamingId` is its
// id, so its own name doesn't count as taken.
export function uniqueName(name, renamingId = null) {
  const wanted = name.trim() || DEFAULT_NAME
  const others = listJourneys().filter((journey) => journey.id !== renamingId)
  const taken = new Set(others.map((journey) => journey.name.trim().toLowerCase()))
  if (!taken.has(wanted.toLowerCase())) {
    return wanted
  }
  let number = 1
  while (taken.has(`${wanted} (${number})`.toLowerCase())) {
    number += 1
  }
  return `${wanted} (${number})`
}

// A new, empty journey with just a name, which is saved straight away.
export function createJourney(name) {
  const now = new Date().toISOString()
  const journey = {
    id: makeId('new'),
    name: uniqueName(name),
    // Not in the app yet. The Library labels it DRAFT.
    draft: true,
    createdAt: now,
    savedAt: now,
    stops: [],
  }
  newJourneys = [journey, ...newJourneys]
  saveNewJourneys()
  return journey
}

// Save in the editor: a journey made here, with its name and its stops as they
// are now. Its name is kept apart from the others' names the same way as a new
// journey's. Gives back the name it was saved with, and when.
// Each stop is tidied on the way: spaces trimmed off its title, and a type
// name kept only on an Other. Gives back the name it was saved with, its stops
// as they were saved, and when.
export function saveJourney(id, { name, stops }) {
  const savedName = uniqueName(name, id)
  const savedStops = stops.map((stop) => ({
    ...stop,
    title: stop.title.trim(),
    otherType: stop.type === 'other' ? (stop.otherType ?? '').trim() : '',
  }))
  const savedAt = new Date().toISOString()
  newJourneys = newJourneys.map((journey) =>
    journey.id === id ? { ...journey, name: savedName, stops: savedStops, savedAt } : journey,
  )
  saveNewJourneys()
  return { name: savedName, stops: savedStops, savedAt }
}

export function deleteJourney(id) {
  newJourneys = newJourneys.filter((journey) => journey.id !== id)
  saveNewJourneys()
}

// A new stop, with nothing chosen or typed in yet.
export function newStop() {
  return { id: makeId('stop'), type: '', otherType: '', title: '' }
}

// What a stop still needs filled in, in the order its fields come: its type,
// the type's name for Other, and its title. A new stop can't be confirmed
// until there's nothing.
export function missingStopFields(stop) {
  const missing = []
  if (!stop.type) {
    missing.push('type')
  }
  if (stop.type === 'other' && !(stop.otherType ?? '').trim()) {
    missing.push('otherType')
  }
  if (!stop.title.trim()) {
    missing.push('title')
  }
  return missing
}

// What a stop's type is called: "Peak", say, or for Other, the name typed in.
export function typeLabel(stop) {
  if (stop.type === 'other') {
    return stop.otherType || 'Other'
  }
  return STOP_TYPES.find((type) => type.value === stop.type)?.label ?? 'No type'
}

// The parts of one of the app's journeys, in order, each with one stop.
const PARTS = ['departure', 'discovery', 'build', 'peak', 'afterglow']

// A journey's stops, for the Library: the main ones in order, each with the
// part of the journey it's for ('departure', 'peak' and so on), and the
// detours, which are side trips off one of them. A journey made here has its
// stops in a list of its own, with no detours yet.
export function stopsOf(journey) {
  if (Array.isArray(journey.stops)) {
    const main = journey.stops.map((stop) => ({
      stop: { id: stop.id, name: stop.title.trim() || 'Untitled step' },
      part: stop.type,
    }))
    return { main, detours: [] }
  }
  const main = journey.route.map((stop) => ({
    stop,
    part: PARTS.find((part) => journey[part] === stop),
  }))
  const detours = journey.route.flatMap((stop) => (stop.detours ?? []).map((detour) => ({ stop: detour, from: stop })))
  return { main, detours }
}
