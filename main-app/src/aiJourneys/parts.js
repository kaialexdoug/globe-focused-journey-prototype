// What's the same on every AI journey's cards: the heading and label on
// each part's two screens, and a few lines of wording. A stop takes its
// part's with `...DISCOVERY`, say.

export const DEPARTURE = {
  directionsHeading: 'Departure',
  directionsLabel: 'Your journey begins at',
  arrivedHeading: 'Arrival',
  arrivedLabel: "You’ve arrived",
}

export const DISCOVERY = {
  directionsHeading: 'Discovery',
  directionsLabel: 'Your next stop',
  arrivedHeading: 'Discovery',
  arrivedLabel: "You’ve arrived",
}

export const BUILD = {
  directionsHeading: 'Build',
  directionsLabel: 'Your next stop',
  arrivedHeading: 'Build',
  arrivedLabel: "You’ve arrived",
}

export const DETOUR = {
  directionsHeading: 'Detour',
  directionsLabel: 'Your detour',
  arrivedHeading: 'Detour',
  arrivedLabel: "You’ve arrived",
}

export const PEAK = {
  directionsHeading: 'Peak',
  directionsLabel: 'Your next stop',
  arrivedHeading: 'Peak',
  arrivedLabel: "You’ve arrived",
}

export const AFTERGLOW = {
  directionsHeading: 'Afterglow',
  directionsLabel: 'Your last stop',
  arrivedHeading: 'Afterglow',
  arrivedLabel: "You’ve arrived",
}

// Above SEE DETOUR, on a build stop with one detour.
export const ONE_DETOUR_NOTE =
  'This part of the journey comes with a detour: a short side trip worth taking if you’re curious. It’s entirely up to you.'

// The note under START HERE.
export const START_NOTE = 'Travel to the start is separate from journey time.'

// The opening and closing lines of the peak's narration.
export const PEAK_LEAD = { className: 'narrationLead', text: 'You made it. This is what the day was building toward.' }
export const PEAK_CLOSE = { className: 'narrationClose', text: 'Take as long as you like.' }

// The last lines of a detour's narration, and of the afterglow's.
export const BACK_TO_ROUTE = { className: 'narrationClose', text: 'When you’re ready, we’ll head back to the route.' }
export const DINNER = { className: 'narrationClose', text: 'Dinner is up to you. You’ve earned it.' }
