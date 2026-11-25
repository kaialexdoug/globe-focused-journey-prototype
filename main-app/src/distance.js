// How far you are from each journey: from where the phone is to the
// journey's first stop (`departure.mapPoint`), as the crow flies. On the
// feed under each journey's name, and in the top corner of the journey cards
// (Journeys for You, Search and My Journeys).
//
// Where you are is looked up each time a page with journeys opens (useHere),
// so it's never far out of date, and the journeys on one page share the one
// look-up. It's worked out on the phone and never leaves it. Until it's in,
// or if the phone won't say (location turned off, or not allowed), the
// distances simply aren't shown.

import { useEffect, useState } from 'react'

import { isImperial, toMiles, toYards, YARDS_UP_TO } from './units.js'

// Where you were last found ({ lat, lng }), or null, kept for as long as the
// app's open, so a page opening shows that straight away while it looks
// again.
let here = null
let looking = false
const listeners = new Set()

function lookAgain() {
  if (looking || !('geolocation' in navigator)) {
    return
  }
  looking = true
  navigator.geolocation.getCurrentPosition(
    (position) => {
      looking = false
      here = { lat: position.coords.latitude, lng: position.coords.longitude }
      listeners.forEach((listener) => listener(here))
    },
    () => {
      looking = false
    },
    // A reading from the last minute will do; and a rough one is plenty,
    // as it's only for showing how far away a journey is.
    { maximumAge: 60000, timeout: 15000, enableHighAccuracy: false },
  )
}

// Where you are, for a page showing distances: looked up again when the page
// opens, and null until it's known.
export function useHere() {
  const [found, setFound] = useState(here)
  useEffect(() => {
    listeners.add(setFound)
    lookAgain()
    return () => {
      listeners.delete(setFound)
    }
  }, [])
  return found
}

const EARTH_RADIUS_METERS = 6371000

// The distance between two spots, in meters, over the earth's surface.
function metersBetween(a, b) {
  const radians = (degrees) => (degrees * Math.PI) / 180
  const dLat = radians(b.lat - a.lat)
  const dLng = radians(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(radians(a.lat)) * Math.cos(radians(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(h))
}

// How far a journey is from you, in meters, or null if either isn't known.
export function metersAway(here, journey) {
  const start = journey.departure?.mapPoint
  return here && start ? metersBetween(here, start) : null
}

// The distance to show, as its number and its unit, so the number can be in
// bold: { value: '5,832', unit: 'mi' }. Close by, in meters or yards; under
// ten, to a tenth; further, to the nearest whole one, with commas.
export function distanceParts(meters, units) {
  const whole = (number) => Math.round(number).toLocaleString('en-US')
  const tenth = (number) => (Math.round(number * 10) / 10).toLocaleString('en-US')
  if (isImperial(units)) {
    const yards = toYards(meters)
    if (yards < YARDS_UP_TO) {
      return { value: whole(Math.max(10, Math.round(yards / 10) * 10)), unit: 'yd' }
    }
    const miles = toMiles(meters)
    return { value: miles < 10 ? tenth(miles) : whole(miles), unit: 'mi' }
  }
  if (meters < 1000) {
    return { value: whole(Math.max(10, Math.round(meters / 10) * 10)), unit: 'm' }
  }
  const km = meters / 1000
  return { value: km < 10 ? tenth(km) : whole(km), unit: 'km' }
}
