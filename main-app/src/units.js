// Metric or imperial, for every distance and temperature in the app. It's
// picked in Settings and kept on your profile (or on this device, without
// one: see App.jsx). App puts it in UnitsContext around every page, and any
// page reads it with useUnits(), rather than it being handed down through
// every component in between.
//
// Underneath, everything is still in meters and Celsius; only what's shown
// changes. The words for each are where they're shown: metersText in
// journeyTimes.js, temperatureText in weather.js.

import { createContext, useContext } from 'react'

// The choices, in the order Settings shows them, and what each one means.
export const UNIT_CHOICES = [
  { value: 'metric', label: 'Metric', means: 'Kilometers, meters, °C' },
  { value: 'imperial', label: 'Imperial', means: 'Miles, yards, °F' },
]

export const UnitsContext = createContext('metric')

export function useUnits() {
  return useContext(UnitsContext)
}

export const isImperial = (units) => units === 'imperial'

export const toYards = (meters) => meters / 0.9144
export const toMiles = (meters) => meters / 1609.344
export const toFahrenheit = (celsius) => (celsius * 9) / 5 + 32

// Under a quarter of a mile, a distance is in yards rather than miles.
export const YARDS_UP_TO = 440
