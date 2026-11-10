import { useLayoutEffect, useRef } from 'react'

import { EXPERIENCE_ICONS } from './experienceIcons.js'
import Header from './Header.jsx'
import { rankJourneys } from './journeyMatch.js'
import {
  ActivePaceIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BurgerIcon,
  ClockIcon,
  EasyPaceIcon,
  FamilyIcon,
  GroupIcon,
  HeartIcon,
  LeafIcon,
  ModeratePaceIcon,
  NoAlcoholIcon,
  PawIcon,
  PinIcon,
  SoloIcon,
  ThreeStarsIcon,
  WalkIcon,
} from './Icons.jsx'

import adventurousPicture from './assets/moods/adventurous.jpg'
import culturalPicture from './assets/moods/cultural.jpg'
import curiousPicture from './assets/moods/curious.jpg'
import peacefulPicture from './assets/moods/peaceful.jpg'
import playfulPicture from './assets/moods/playful.jpg'
import romanticPicture from './assets/moods/romantic.jpg'

import couplePicture from './assets/companions/couple.webp'
import familyPicture from './assets/companions/family.webp'
import friendsPicture from './assets/companions/friends.webp'
import soloPicture from './assets/companions/solo.webp'

// The steps of Find My Journey after its intro, and the journeys they lead to.

const STEP_COUNT = 3

// The top of every step: the logo in the middle, with the way back on one side
// and Skip on the other (on a step that has it), then how far along you are.
function StepTop({ step, onBack, onSkip }) {
  return (
    <>
      <div className="stepBar">
        <button className="stepBack" onClick={onBack} aria-label="Back">
          <ArrowLeftIcon />
        </button>
        <Header />
        {onSkip && (
          <button className="stepSkip" onClick={onSkip}>
            Skip
          </button>
        )}
      </div>
      <p className="stepCount">
        STEP {step} OF {STEP_COUNT}
      </p>
      <div className="stepProgress">
        {Array.from({ length: STEP_COUNT }, (_, index) => (
          <span key={index} className={index < step ? 'isDone' : undefined}></span>
        ))}
      </div>
    </>
  )
}

// A card to tap: its picture fades away into the white of the card, with the
// words (`children`) and an arrow on the white. `index` is its place in the
// order the cards fade in. `position` says which part of the picture to keep,
// and `color` is the arrow, picked from the picture.
function PictureCard({ className, index, picture, position, color, children, ...button }) {
  return (
    <button
      className={className ? `moodCard ${className}` : 'moodCard'}
      style={{ '--i': index }}
      {...button}
    >
      <img src={picture} alt="" style={{ objectPosition: position }} />
      {children}
      <span className="moodArrow" style={{ backgroundColor: color }}>
        <ArrowRightIcon />
      </span>
    </button>
  )
}

// The moods, each with its origami picture (a crane, a bird, a heart, a fox, a
// frog and a ballerina), and the colour of its arrow, picked from the figure.
const MOODS = [
  { name: 'Peaceful', about: 'Slow down and unwind', picture: peacefulPicture, color: 'rgb(74, 128, 186)' },
  { name: 'Adventurous', about: 'Explore something new', picture: adventurousPicture, color: 'rgb(232, 122, 38)' },
  { name: 'Romantic', about: 'Shared moments', picture: romanticPicture, color: 'rgb(222, 118, 100)' },
  { name: 'Curious', about: 'Discover hidden gems', picture: curiousPicture, color: 'rgb(112, 150, 82)' },
  { name: 'Playful', about: 'Fun for everyone', picture: playfulPicture, color: 'rgb(222, 166, 32)' },
  { name: 'Cultural', about: 'Deeper connections', picture: culturalPicture, color: 'rgb(70, 140, 205)' },
]

// A mood to pick: its picture across the top, fading into the white of the
// card, with its name and an arrow beside it, and what it's like underneath.
// `index` is its place in the order the cards fade in.
function MoodChoice({ mood, index, onChoose }) {
  return (
    <button className="moodChoice" style={{ '--i': index }} onClick={onChoose}>
      <img src={mood.picture} alt="" />
      <span className="moodChoiceName">{mood.name}</span>
      <span className="moodChoiceAbout">{mood.about}</span>
      <span className="moodChoiceArrow" style={{ backgroundColor: mood.color }} aria-hidden="true">
        <ArrowRightIcon />
      </span>
    </button>
  )
}

// Step 1, after its mockup. Tapping a mood chooses it and moves straight on to
// the next step; Skip moves on without one.
export function MoodPage({ onChoose, onSkip, onBack }) {
  return (
    <div className="stepPage moodPage">
      <StepTop step={1} onBack={onBack} onSkip={onSkip} />

      <h1 className="stepTitle">
        How do you want to
        <br />
        feel today?
      </h1>
      <p className="stepText">Find a journey that fits your mood.</p>

      <div className="moodChoices">
        {MOODS.map((mood, index) => (
          <MoodChoice key={mood.name} mood={mood} index={index} onChoose={() => onChoose(mood.name)} />
        ))}
      </div>
    </div>
  )
}

const COMPANIONS = [
  {
    name: 'Solo',
    about: 'Just me',
    Icon: SoloIcon,
    picture: soloPicture,
    position: 'center bottom',
    color: 'rgb(135, 115, 215)',
  },
  {
    name: 'Couple',
    about: 'Two people',
    Icon: HeartIcon,
    picture: couplePicture,
    position: 'center bottom',
    color: 'rgb(232, 108, 118)',
  },
  {
    name: 'Family',
    about: 'With kids',
    Icon: FamilyIcon,
    picture: familyPicture,
    position: 'center bottom',
    color: 'rgb(216, 164, 32)',
  },
  {
    name: 'Friends / Group',
    about: '2+ people',
    Icon: GroupIcon,
    picture: friendsPicture,
    position: '14% center',
    color: 'rgb(58, 100, 210)',
  },
]

// Step 2. Tapping a card chooses it and moves straight on to the next step, as
// on step 1.
export function CompanionPage({ onChoose, onSkip, onBack }) {
  return (
    <div className="stepPage">
      <StepTop step={2} onBack={onBack} onSkip={onSkip} />

      <h1 className="stepTitle">
        Who’s joining
        <br />
        your adventure?
      </h1>
      <p className="stepText">
        This helps us find journeys
        <br />
        that fit your group.
      </p>

      <div className="whoCards">
        {COMPANIONS.map(({ name, about, Icon, picture, position, color }, index) => (
          <PictureCard
            key={name}
            className="whoCard"
            index={index}
            picture={picture}
            position={position}
            color={color}
            onClick={() => onChoose(name)}
          >
            <Icon className="whoIcon" />
            <span className="moodName">{name}</span>
            <span className="whoAbout">{about}</span>
          </PictureCard>
        ))}
      </div>
    </div>
  )
}

const TIMES = [
  { name: '1–2 hrs', Icon: ClockIcon },
  { name: '2–4 hrs', Icon: ClockIcon },
  { name: '4+ hrs', Icon: ClockIcon },
]

const PACES = [
  { name: 'Easy', about: 'Relaxed', Icon: EasyPaceIcon },
  { name: 'Moderate', about: 'Some walking', Icon: ModeratePaceIcon },
  { name: 'Active', about: 'More intense', Icon: ActivePaceIcon },
]

const PREFERENCES = [
  { name: 'Pet friendly', Icon: PawIcon },
  { name: 'Avoid alcohol', Icon: NoAlcoholIcon },
  { name: 'More nature', Icon: LeafIcon },
  { name: 'Food stops', Icon: BurgerIcon },
]

// A small card to pick, filled forest green once it's chosen. `index` is its
// place in the order the cards fade in.
function DetailCard({ option: { name, about, Icon }, chosen, index, ...button }) {
  return (
    <button
      className={chosen ? 'detailCard isChosen' : 'detailCard'}
      style={{ '--i': index }}
      {...button}
    >
      <Icon className="detailIcon" />
      <span className="detailName">{name}</span>
      {about && <span className="detailAbout">{about}</span>}
    </button>
  )
}

// A question with one answer, as a row of cards. `firstIndex` is where its cards
// come in the order they fade in.
function OneAnswer({ question, options, firstIndex, chosen, onChoose }) {
  return (
    <section className="detailQuestion">
      <h2 id={question}>{question}</h2>
      <div className="detailCards" role="radiogroup" aria-labelledby={question}>
        {options.map((option, index) => (
          <DetailCard
            key={option.name}
            option={option}
            chosen={chosen === option.name}
            index={firstIndex + index}
            role="radio"
            aria-checked={chosen === option.name}
            onClick={() => onChoose(option.name)}
          />
        ))}
      </div>
    </section>
  )
}

// Step 3: how long and how fast, each with one answer, and any preferences,
// which you can tap on and off. `answers` is what's been picked so far, and
// `onAnswer` gets whichever of them has changed.
export function DetailsPage({ answers, onAnswer, onFind, onSkip, onBack }) {
  function togglePreference(name) {
    const { preferences } = answers
    onAnswer({
      preferences: preferences.includes(name)
        ? preferences.filter((each) => each !== name)
        : [...preferences, name],
    })
  }

  return (
    <div className="stepPage">
      <StepTop step={3} onBack={onBack} onSkip={onSkip} />

      <h1 className="stepTitle">A few quick details</h1>
      <p className="stepText">
        This helps us find the best
        <br />
        match for your day.
      </p>

      <OneAnswer
        question="How much time do you have?"
        options={TIMES}
        firstIndex={0}
        chosen={answers.time}
        onChoose={(time) => onAnswer({ time })}
      />
      <OneAnswer
        question="What’s your pace?"
        options={PACES}
        firstIndex={TIMES.length}
        chosen={answers.pace}
        onChoose={(pace) => onAnswer({ pace })}
      />

      <section className="detailQuestion">
        <h2>
          Any preferences? <span className="detailOptional">(Optional)</span>
        </h2>
        <div className="detailCards isFour">
          {PREFERENCES.map((option, index) => (
            <DetailCard
              key={option.name}
              option={option}
              chosen={answers.preferences.includes(option.name)}
              index={TIMES.length + PACES.length + index}
              aria-pressed={answers.preferences.includes(option.name)}
              onClick={() => togglePreference(option.name)}
            />
          ))}
        </div>
      </section>

      <button className="stepFind" onClick={onFind}>
        Find My Journeys
        <ArrowRightIcon />
      </button>
    </div>
  )
}

// One journey on Journeys for You, and on Search. Tapping it opens the
// journey, and the heart likes it. If there's nothing to base a match on
// (`percent` is null, because every step was skipped, or on Search), the
// match is left off. On Search, `found` is the names of the stops it was found
// by, if any, and the first goes where the match would be.
export function MatchCard({ journey, percent = null, found = [], index, liked, onSelect, onToggleLike }) {
  const ExperienceIcon = EXPERIENCE_ICONS[journey.experience]

  return (
    // Only the first few take turns to fade in: the rest are off the screen.
    <div className="matchCard" style={{ '--i': Math.min(index, 3) }}>
      <button className="matchOpen" onClick={() => onSelect(journey)}>
        <img
          src={journey.photo}
          alt={journey.photoAlt}
          style={{ objectPosition: journey.photoPosition }}
          // Fetched as you get near it, so opening the page doesn't download them all.
          loading={index < 3 ? 'eager' : 'lazy'}
        />
        {percent !== null && (
          <span className="matchPercent">
            <ThreeStarsIcon />
            {percent}% match
          </span>
        )}
        {found.length > 0 && (
          <span className="matchPercent matchFound">
            <PinIcon />
            <span className="matchFoundName">{found[0]}</span>
            {found.length > 1 && <span>+{found.length - 1}</span>}
          </span>
        )}
        <span className="matchTitle">{journey.name}</span>
        <span className="matchFacts">
          <span>
            <ClockIcon />
            {journey.time.replace('hours', 'hrs')}
          </span>
          <span>
            <WalkIcon />
            {journey.difficulty}
          </span>
          <span>
            <PinIcon />
            {journey.route.length} stops
          </span>
          <span>
            <ExperienceIcon />
            {journey.experience}
          </span>
        </span>
      </button>
      {/* Beside the rest rather than in it, as a button can't hold a button. */}
      <button
        className={liked ? 'matchHeart isLiked' : 'matchHeart'}
        onClick={() => onToggleLike(journey.id)}
        aria-pressed={liked}
        aria-label={`Like ${journey.name}`}
      >
        <HeartIcon />
      </button>
    </div>
  )
}

// Journeys for You: every journey, from the best match for your `answers` to
// the worst. `positionRef` remembers how far down you were, so you come back to
// the same place after opening one.
export function MatchesPage({ journeys, answers, likes, positionRef, onSelect, onToggleLike, onBack }) {
  const pageRef = useRef(null)

  // Before it's drawn, so the top of the list doesn't flash up on the way.
  useLayoutEffect(() => {
    const screen = pageRef.current.closest('.screen')
    screen.scrollTop = positionRef.current

    function rememberPosition() {
      positionRef.current = screen.scrollTop
    }
    screen.addEventListener('scroll', rememberPosition, { passive: true })
    return () => screen.removeEventListener('scroll', rememberPosition)
  }, [positionRef])

  return (
    <div className="stepPage" ref={pageRef}>
      <div className="stepBar">
        <button className="stepBack" onClick={onBack} aria-label="Back">
          <ArrowLeftIcon />
        </button>
        <Header />
      </div>

      <h1 className="stepTitle">Journeys for you</h1>
      <p className="stepText">
        Here are some journeys that match
        <br />
        your mood, group, and preferences.
      </p>

      <div className="matchCards">
        {rankJourneys(journeys, answers).map(({ journey, percent }, index) => (
          <MatchCard
            key={journey.id}
            journey={journey}
            percent={percent}
            index={index}
            liked={likes.includes(journey.id)}
            onSelect={onSelect}
            onToggleLike={onToggleLike}
          />
        ))}
      </div>
    </div>
  )
}
