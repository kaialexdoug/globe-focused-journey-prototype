// All of the quiz's data lives here, so Questionnaire.jsx only has to deal
// with showing it. Everything comes straight off the flow chart: eight
// "this vs. that" picture pairs, and three traveler types built out of them.
//
// Photos are from Unsplash — see assets/quiz/CREDITS.md.

import hiddenPhoto from './assets/quiz/hidden.jpg'
import famousPhoto from './assets/quiz/famous.jpg'
import naturePhoto from './assets/quiz/nature.jpg'
import cityPhoto from './assets/quiz/city.jpg'
import relaxedPhoto from './assets/quiz/relaxed.jpg'
import adventurousPhoto from './assets/quiz/adventurous.jpg'
import foodPhoto from './assets/quiz/food.jpg'
import historyPhoto from './assets/quiz/history.jpg'
import beautifulPhoto from './assets/quiz/beautiful.jpg'
import weirdPhoto from './assets/quiz/weird.jpg'
import planPhoto from './assets/quiz/plan.jpg'
import surprisePhoto from './assets/quiz/surprise.jpg'
import dayPhoto from './assets/quiz/day.jpg'
import nightPhoto from './assets/quiz/night.jpg'
import socialPhoto from './assets/quiz/social.jpg'
import soloPhoto from './assets/quiz/solo.jpg'

// The sixteen traits, two per question. These are the words used on the flow
// chart, so the two can be read side by side.
export const TRAITS = {
  hidden: 'Hidden',
  famous: 'Famous',
  nature: 'Nature',
  city: 'City',
  relaxed: 'Relaxed',
  adventurous: 'Adventurous',
  food: 'Food',
  history: 'History',
  beautiful: 'Beautiful',
  weird: 'Weird',
  plan: 'Know the Plan',
  surprise: 'Surprise Me',
  day: 'Daytime',
  night: 'Nighttime',
  social: 'Social',
  solo: 'Solo',
}

// One question per pair. The order, and which side goes on top, are mixed up
// on purpose so that no one type is always "the top picture".
export const QUESTIONS = [
  {
    prompt: 'Where would you rather spend the afternoon?',
    options: [
      { trait: 'nature', caption: 'A forest path', photo: naturePhoto },
      { trait: 'city', caption: 'A neon skyline', photo: cityPhoto },
    ],
  },
  {
    prompt: 'Which would you rather stumble into?',
    options: [
      { trait: 'famous', caption: 'An iconic landmark', photo: famousPhoto },
      { trait: 'hidden', caption: 'A quiet, unmarked alley', photo: hiddenPhoto },
    ],
  },
  {
    prompt: 'What pulls you in first?',
    options: [
      { trait: 'food', caption: 'A bowl of street food', photo: foodPhoto },
      { trait: 'history', caption: 'An old temple gate', photo: historyPhoto },
    ],
  },
  {
    prompt: 'Pick your pace for the day.',
    options: [
      { trait: 'adventurous', caption: 'Climbing a steep trail', photo: adventurousPhoto },
      { trait: 'relaxed', caption: 'Sitting by a calm river', photo: relaxedPhoto },
    ],
  },
  {
    prompt: 'Which would you stop to photograph?',
    options: [
      { trait: 'weird', caption: 'Something wonderfully odd', photo: weirdPhoto },
      { trait: 'beautiful', caption: 'A scenic view', photo: beautifulPhoto },
    ],
  },
  {
    prompt: 'When would you rather wander?',
    options: [
      { trait: 'day', caption: 'A bright, bustling street', photo: dayPhoto },
      { trait: 'night', caption: 'A quiet street, lit up at night', photo: nightPhoto },
    ],
  },
  {
    prompt: 'How do you like to set off?',
    options: [
      { trait: 'plan', caption: 'With the route mapped out', photo: planPhoto },
      { trait: 'surprise', caption: 'Into the fog. Surprise me.', photo: surprisePhoto },
    ],
  },
  {
    prompt: "Who's there with you?",
    options: [
      { trait: 'solo', caption: 'Just me and the view', photo: soloPhoto },
      { trait: 'social', caption: 'A group, laughing together', photo: socialPhoto },
    ],
  },
]

// The three traveler types. `traits` is the type's line on the flow chart —
// one side of every pair. `color` is the colour of its box there, softened a
// little to sit on the dark background.
export const PERSONALITIES = [
  {
    id: 'naturalist',
    name: 'The Naturalist',
    color: 'rgb(116, 191, 63)',
    photo: naturePhoto,
    traits: ['hidden', 'nature', 'adventurous', 'history', 'beautiful', 'surprise', 'day', 'social'],
    description:
      "You'd rather earn a view than be driven to it. Give you a trail, a hill, or a quiet stretch of nature most people skip, and you're in your element — especially if there's a story behind it, an old shrine tucked into the trees or a path that's older than it looks. You don't need to know exactly where you're headed, just that it's beautiful when you get there, and you're happiest when there's someone beside you to see it too.",
  },
  {
    id: 'collector',
    name: 'The Collector',
    color: 'rgb(240, 182, 58)',
    photo: famousPhoto,
    traits: ['famous', 'city', 'adventurous', 'history', 'beautiful', 'plan', 'day', 'social'],
    description:
      "You want to see the things worth seeing, and you want to actually understand them. The famous landmark, the well-known historic site — you're not too cool for it, you just want to experience it properly, with enough of a plan that you're not wasting daylight figuring out where to go next. A full day covering real ground with people you like is exactly your kind of day.",
  },
  {
    id: 'wanderer',
    name: 'The Wanderer',
    color: 'rgb(151, 102, 255)',
    photo: nightPhoto,
    traits: ['hidden', 'nature', 'relaxed', 'food', 'weird', 'surprise', 'night', 'solo'],
    description:
      "You like the city best when it's quiet and a little strange. A back alley nobody photographs, a late-night bowl of something simple, a shop with no sign — that's more interesting to you than anywhere in a guidebook. You don't need a plan, and you'd honestly rather go alone, following whatever catches your eye until something surprising finds you.",
  },
]

// Every quiz photo, so the screen before the quiz can start loading them and
// the pictures are ready by the time each question appears.
export function preloadQuizPhotos() {
  for (const question of QUESTIONS) {
    for (const option of question.options) {
      const image = new Image()
      image.src = option.photo
    }
  }
}

// How many of each type's eight traits the picks share, highest first.
// `picks` is the list of trait ids the person chose, one per question.
export function scoreTypes(picks) {
  const scored = PERSONALITIES.map((personality) => ({
    personality,
    matches: personality.traits.filter((trait) => picks.includes(trait)).length,
  }))
  scored.sort((a, b) => b.matches - a.matches)
  return scored
}

// The single type the quiz lands on: whichever shares the most traits.
//
// The Naturalist can never tie for first, but the Collector and the Wanderer
// can (they are exact opposites, so their scores always add up to 8). When
// they do, Hidden vs. Famous decides it — the flow chart calls that pair the
// core "off the beaten path" signal.
export function pickType(picks) {
  const scored = scoreTypes(picks)
  const tied = scored.filter((entry) => entry.matches === scored[0].matches)

  if (tied.length > 1) {
    const decider = picks.includes('hidden') ? 'hidden' : 'famous'
    const winner = tied.find((entry) => entry.personality.traits.includes(decider))
    if (winner) {
      return winner.personality
    }
  }

  return scored[0].personality
}
