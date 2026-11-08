// How long things take on a journey, worked out from its stops' cards. Each
// stop has:
//
//   travelMinutes  about how long it takes to get there from the stop before.
//                  0 for the departure, as getting to the start is separate.
//                  For a detour, from the stop it branches off.
//   stayMinutes    the suggested time to spend there, shortest and longest:
//                  [30, 45] is "About 30–45 min".
//
// They're estimates, and only ever a guide: there to help plan the day, not
// to hurry anyone along.
//
// A journey being tried out with the route preview (see RoutePreview.jsx) has
// more about the walk to each stop: `distanceMeters`, how far it is, and for
// a detour, `extraMeters`, how much further it makes the walk.

// A walking pace, in metres a minute, for turning extra distance into time.
const METERS_A_MINUTE = 70

// The middle of a stop's suggested time.
function middle([shortest, longest]) {
  return (shortest + longest) / 2
}

// Hours with a fraction: 1.5 is "1½".
function hoursNumber(hours) {
  const whole = Math.floor(hours)
  const fraction = { 0: '', 0.25: '¼', 0.5: '½', 0.75: '¾' }[hours - whole]
  return whole === 0 && fraction ? fraction : `${whole}${fraction}`
}

// "45 min", "1 hour" or "1½ hours".
export function durationText(minutes) {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = minutes / 60
  return `${hoursNumber(hours)} ${hours === 1 ? 'hour' : 'hours'}`
}

// "30–45 min", or in hours if it's an hour or more at the short end:
// "1–1½ hours". Just the one if they're the same.
function rangeText(shortest, longest) {
  if (shortest === longest) {
    return durationText(shortest)
  }
  if (shortest < 60) {
    return `${shortest}–${longest} min`
  }
  return `${hoursNumber(shortest / 60)}–${hoursNumber(longest / 60)} hours`
}

// The suggested time to spend at a stop: "About 30–45 min".
export function stayText(stop) {
  return `About ${stayRangeText(stop)}`
}

// Just the range: "30–45 min".
export function stayRangeText(stop) {
  return rangeText(...stop.stayMinutes)
}

// A distance: "650 m", or "1.5 km".
export function metersText(meters) {
  if (meters < 1000) {
    return `${Math.round(meters / 10) * 10} m`
  }
  return `${Math.round(meters / 100) / 10} km`
}

// Whether a journey has what the route preview needs (RoutePreview.jsx): how
// far the walk to each stop is, and how hard.
export function hasRoutePreview(journey) {
  return journey.route.slice(1).every((stop) => typeof stop.distanceMeters === 'number' && stop.effort)
}

// All the walking on a journey, from stop to stop, detours left out: how far,
// and about how long, to the nearest 5 minutes.
export function walkingTotals(journey) {
  const stops = journey.route.slice(1)
  return {
    meters: stops.reduce((total, stop) => total + stop.distanceMeters, 0),
    minutes: Math.round(stops.reduce((total, stop) => total + stop.travelMinutes, 0) / 5) * 5,
  }
}

// The whole journey, in hours, to the nearest half hour: getting from stop to
// stop, and the middle of each stop's suggested time. Detours aren't counted,
// as they're optional (see detourAddsText).
export function journeyHours(journey) {
  const minutes = journey.route.reduce((total, stop) => total + stop.travelMinutes + middle(stop.stayMinutes), 0)
  return Math.round(minutes / 30) / 2
}

// The journey's time, as its card shows it: "~4½ hours".
export function hoursText(hours) {
  return `~${durationText(hours * 60)}`
}

// How much longer a detour makes the day, to the nearest quarter hour: the
// extra walking, and the middle of its suggested time. The extra walking is
// worked out from `extraMeters` if it has it, or else taken as there and back
// from the stop it branches off.
function detourMinutes(detour) {
  const walking =
    typeof detour.extraMeters === 'number' ? detour.extraMeters / METERS_A_MINUTE : 2 * detour.travelMinutes
  const minutes = walking + middle(detour.stayMinutes)
  return Math.max(15, Math.round(minutes / 15) * 15)
}

// For the detours on offer: "Adds about 45 min" for one, or for more, "Each
// adds about 45–60 min".
export function detourAddsText(detours) {
  const minutes = detours.map(detourMinutes)
  const range = rangeText(Math.min(...minutes), Math.max(...minutes))
  return detours.length === 1 ? `Adds about ${range}` : `Each adds about ${range}`
}
