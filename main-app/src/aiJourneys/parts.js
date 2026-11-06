// What's the same on every AI journey's cards: the heading and label on
// each part's two screens, and a few lines of wording. A stop takes its
// part's with `...DISCOVERY`, say.

export const DEPARTURE = {
  directionsHeading: 'Departure',
  directionsLabel: 'YOUR JOURNEY BEGINS AT',
  arrivedHeading: 'Arrival',
  arrivedLabel: "YOU'VE ARRIVED",
}

export const DISCOVERY = {
  directionsHeading: 'Discovery',
  directionsLabel: 'YOUR NEXT STOP',
  arrivedHeading: 'Discovery',
  arrivedLabel: "YOU'VE ARRIVED",
}

export const BUILD = {
  directionsHeading: 'Build',
  directionsLabel: 'YOUR NEXT STOP',
  arrivedHeading: 'Build',
  arrivedLabel: "YOU'VE ARRIVED",
}

export const DETOUR = {
  directionsHeading: 'Detour',
  directionsLabel: 'YOUR DETOUR',
  arrivedHeading: 'Detour',
  arrivedLabel: "YOU'VE ARRIVED",
}

export const PEAK = {
  directionsHeading: 'Peak',
  directionsLabel: 'YOUR NEXT STOP',
  arrivedHeading: 'Peak',
  arrivedLabel: "YOU'VE ARRIVED",
}

export const AFTERGLOW = {
  directionsHeading: 'Afterglow',
  directionsLabel: 'YOUR LAST STOP',
  arrivedHeading: 'Afterglow',
  arrivedLabel: "YOU'VE ARRIVED",
}

// Above SEE DETOUR, on a build stop with one detour.
export const ONE_DETOUR_NOTE =
  'This part of the journey comes with a detour: a short side trip worth taking if you’re curious. It’s entirely up to you.'

// The first line under the photo on See Your Journey, and the note under
// START HERE.
export const TAGLINE = 'Yours to explore, whenever you’re ready.'
export const START_NOTE = 'Travel to the start is separate from journey time.'

// The opening and closing lines of the peak's narration.
export const PEAK_LEAD = { className: 'narrationLead', text: 'You made it. This is what the day was building toward.' }
export const PEAK_CLOSE = { className: 'narrationClose', text: 'Take as long as you like.' }

// The last lines of a detour's narration, and of the afterglow's.
export const BACK_TO_ROUTE = { className: 'narrationClose', text: 'When you’re ready, we’ll head back to the route.' }
export const DINNER = { className: 'narrationClose', text: 'Dinner is up to you. You’ve earned it.' }
