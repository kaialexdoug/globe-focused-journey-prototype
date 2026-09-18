// All of the questionnaire's data lives here, so Questionnaire.jsx only has to
// deal with showing it. Nothing in this file is React-specific.

// The seven traits we are measuring. `low` and `high` are the two ends of each
// axis: a negative score leans towards `low`, a positive score towards `high`.
export const CATEGORIES = [
  { id: 'extraversion', name: 'Extraversion', low: 'solitary', high: 'social' },
  { id: 'openness', name: 'Openness', low: 'familiar', high: 'novel' },
  { id: 'discovery', name: 'Sense of Discovery', low: 'iconic', high: 'hidden' },
  { id: 'walking', name: 'Walking Tolerance', low: 'short', high: 'long' },
  { id: 'environment', name: 'Environment', low: 'urban', high: 'nature' },
  { id: 'food', name: 'Food & Comfort', low: 'simple', high: 'indulgent' },
  { id: 'pace', name: 'Pace & Structure', low: 'spontaneous', high: 'planned' },
]

// Each answer carries a small `scores` object. Categories an answer says
// nothing about are simply left out. Values are always between -2 and +2.
export const QUESTIONS = [
  {
    text: 'Would you consider yourself a "people person?"',
    answers: [
      { text: 'Yes, absolutely!', scores: { extraversion: 2 } },
      { text: 'Mostly, yeah.', scores: { extraversion: 1 } },
      { text: "I don't really mind either way.", scores: { extraversion: 0 } },
      { text: 'Not really.', scores: { extraversion: -1 } },
      { text: 'Definitely not.', scores: { extraversion: -2 } },
    ],
  },
  {
    text: "You're exploring a small town and come across a local festival you've never heard of. How would you react?",
    answers: [
      { text: "I'd love to check it out!", scores: { openness: 2, extraversion: 1, discovery: 1 } },
      { text: "I'd probably give it a try.", scores: { openness: 1, extraversion: 1 } },
      { text: "I'd be happy either way.", scores: { openness: 0 } },
      { text: "I'd probably keep to my original plans.", scores: { openness: -1, extraversion: -1 } },
      { text: "I'd rather stick with what I know.", scores: { openness: -2, extraversion: -1, discovery: -1 } },
    ],
  },
  {
    text: 'How would you feel about walking 15 km during a journey?',
    answers: [
      { text: 'That sounds like a great day!', scores: { walking: 2 } },
      { text: "I'd be pretty comfortable with that.", scores: { walking: 1 } },
      { text: "I don't really mind.", scores: { walking: 0 } },
      { text: "I'd prefer something shorter.", scores: { walking: -1 } },
      { text: "That's way too much walking for me.", scores: { walking: -2 } },
    ],
  },
  {
    text: 'Which sounds more appealing for a day of exploring?',
    answers: [
      { text: 'A quiet coastal town', scores: { environment: 2, extraversion: -1 } },
      { text: 'Somewhere with a mix of nature and town', scores: { environment: 1 } },
      { text: 'Either sounds good to me', scores: { environment: 0 } },
      { text: 'A quieter urban neighborhood', scores: { environment: -1 } },
      { text: 'A lively city center', scores: { environment: -2, extraversion: 1 } },
    ],
  },
  {
    text: "Imagine you're visiting a new city. Which experience would excite you more?",
    answers: [
      { text: 'Seeing something truly spectacular and famous', scores: { discovery: -2, openness: -1 } },
      { text: 'Visiting a famous place, then exploring nearby', scores: { discovery: -1 } },
      { text: 'Either sounds great', scores: { discovery: 0 } },
      { text: 'Finding a small place most visitors overlook', scores: { discovery: 1 } },
      { text: 'Discovering somewhere almost nobody seems to know about', scores: { discovery: 2, openness: 1 } },
    ],
  },
  {
    text: 'After a long day of exploring, what kind of meal would you prefer?',
    answers: [
      { text: 'Something cheap, simple, and local', scores: { food: -2 } },
      { text: 'A casual local restaurant', scores: { food: -1 } },
      { text: 'Either is fine', scores: { food: 0 } },
      { text: 'Somewhere a little nicer', scores: { food: 1 } },
      { text: "I'd like to treat myself to something special", scores: { food: 2 } },
    ],
  },
  {
    text: "You've got a full day ahead of you in a place you've never visited. Which sounds more like your ideal day?",
    answers: [
      { text: "No plan at all — I'll see where the day takes me.", scores: { pace: -2, openness: 1, discovery: 1 } },
      { text: "A rough idea of what I'd like to see, but lots of freedom.", scores: { pace: -1, openness: 1 } },
      { text: 'Somewhere in between.', scores: { pace: 0 } },
      { text: "I'd like a fairly clear plan.", scores: { pace: 1 } },
      { text: "I want to know exactly where I'm going and what I'll be doing.", scores: { pace: 2, openness: -1, discovery: -1 } },
    ],
  },
]

// The journeys we can recommend. `ideal` describes the traveller each journey
// suits best, on a -1 (low end of the axis) to +1 (high end) scale.
export const ROUTES = [
  {
    name: 'The Quiet Coast',
    tagline: 'Sea air, small harbours, and time to think.',
    description:
      'Slow days along the water, where the loudest thing is the tide. Fishing towns, ferry rides and long empty beaches, with very few other travellers around.',
    examples: 'Noto Peninsula · the Setouchi islands · the Izu coast',
    ideal: { extraversion: -0.8, openness: 0.3, discovery: 0.6, walking: 0.3, environment: 0.9, food: -0.2, pace: -0.4 },
  },
  {
    name: 'The Neon Current',
    tagline: 'The city at full volume, and you in the middle of it.',
    description:
      'Crowded crossings, rooftop views and late-night streets that never quite switch off. The famous sights, done properly, with people around you the whole way.',
    examples: 'Shinjuku & Shibuya · Dotonbori · Fukuoka after dark',
    ideal: { extraversion: 0.9, openness: 0.2, discovery: -0.7, walking: 0.2, environment: -0.9, food: 0.5, pace: 0.2 },
  },
  {
    name: 'The Long Trail',
    tagline: 'Distance on foot, and a view that earns it.',
    description:
      'Old post roads, forest paths and mountain passes walked end to end. The kind of journey where the walking is the point, and the towns are what you find in between.',
    examples: 'The Nakasendo · Kumano Kodo · the Japan Alps',
    ideal: { extraversion: -0.4, openness: 0.5, discovery: 0.4, walking: 0.9, environment: 0.7, food: -0.3, pace: 0.3 },
  },
  {
    name: 'The Backstreet Drift',
    tagline: 'No plan, no map, just whichever alley looks interesting.',
    description:
      'Wandering the parts of the city that never make the guidebooks. Standing bars, tiny shrines between apartment blocks, and whatever the day happens to turn up.',
    examples: 'Shitamachi Tokyo · Osaka backstreets · Nakazakicho',
    ideal: { extraversion: 0.2, openness: 0.8, discovery: 0.9, walking: 0.4, environment: -0.6, food: -0.6, pace: -0.9 },
  },
  {
    name: 'The Grand Circuit',
    tagline: 'The landmarks you came for, in the right order.',
    description:
      'A clear, well-paced route through the places Japan is famous for. Everything booked, nothing rushed, and a comfortable meal waiting at the end of each day.',
    examples: 'Kyoto · Nara · Hakone · Mount Fuji',
    ideal: { extraversion: 0.4, openness: -0.5, discovery: -0.9, walking: -0.4, environment: 0, food: 0.6, pace: 0.9 },
  },
  {
    name: 'The Slow Table',
    tagline: 'A journey measured in meals rather than kilometres.',
    description:
      'Short distances, long dinners. Morning markets, sake breweries and ryokan kitchens, with the rest of the day left deliberately open.',
    examples: 'Kanazawa · Takayama · Kyushu onsen towns',
    ideal: { extraversion: 0.1, openness: 0.4, discovery: 0.3, walking: -0.6, environment: 0.2, food: 0.9, pace: -0.2 },
  },
]

// The biggest score each category can reach, used to turn a raw score into a
// -1 to +1 value. Worked out from the questions above, so it stays correct if
// you add, remove or re-weight a question.
export function getMaxScores() {
  const max = {}

  for (const category of CATEGORIES) {
    max[category.id] = 0
    for (const question of QUESTIONS) {
      let biggest = 0
      for (const answer of question.answers) {
        biggest = Math.max(biggest, Math.abs(answer.scores[category.id] || 0))
      }
      max[category.id] += biggest
    }
  }

  return max
}

// Prototype recommendation: normalise the scores, then pick whichever journey
// sits closest to them. No backend, no clever algorithm — just a nearest match.
export function pickRoute(scores, maxScores) {
  let best = ROUTES[0]
  let bestDistance = Infinity

  for (const route of ROUTES) {
    let distance = 0
    for (const category of CATEGORIES) {
      const normalised = scores[category.id] / maxScores[category.id]
      distance += Math.abs(normalised - route.ideal[category.id])
    }
    if (distance < bestDistance) {
      bestDistance = distance
      best = route
    }
  }

  return best
}
