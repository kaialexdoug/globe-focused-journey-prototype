// The phone's compass, for which way you're facing on the live map
// (LiveMap.jsx). An iPhone only lets the app use it once you've said yes,
// and only asks you straight after a tap, so the app asks when you start or
// pick up a journey (askForCompass, from App.jsx). By the time a map shows,
// it has its answer. Elsewhere the compass is there straight away.

const NEEDS_ASKING =
  typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function'

// "allowed", "unasked", "asking" or "refused". The answer lasts until the app's
// closed or reloaded.
let state = NEEDS_ASKING ? 'unasked' : 'allowed'
const listeners = new Set()

export function compassState() {
  return state
}

// Asks, if it hasn't been asked yet. It has to be called straight from a tap,
// before anything else waits, or the phone won't ask.
export function askForCompass() {
  if (state !== 'unasked') {
    return
  }
  state = 'asking'
  DeviceOrientationEvent.requestPermission()
    .then((answer) => {
      state = answer === 'granted' ? 'allowed' : 'refused'
    })
    .catch((error) => {
      // It wasn't straight from a tap, say: the next tap can try again.
      console.warn('No compass yet:', error)
      state = 'unasked'
    })
    .finally(() => listeners.forEach((listener) => listener(state)))
}

// Calls `listener` with the new state when an answer comes. Gives back a
// function that stops it.
export function onCompassAnswer(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
