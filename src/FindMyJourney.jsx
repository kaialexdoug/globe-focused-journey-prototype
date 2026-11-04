import Header from './Header.jsx'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FamilyIcon,
  GroupIcon,
  HeartIcon,
  SoloIcon,
} from './Icons.jsx'

import adventurousPicture from './assets/moods/adventurous.jpg'
import culturalPicture from './assets/moods/cultural.webp'
import curiousPicture from './assets/moods/curious.jpg'
import peacefulPicture from './assets/moods/peaceful.jpg'
import playfulPicture from './assets/moods/playful.jpg'
import romanticPicture from './assets/moods/romantic.jpg'

import couplePicture from './assets/companions/couple.webp'
import familyPicture from './assets/companions/family.webp'
import friendsPicture from './assets/companions/friends.webp'
import soloPicture from './assets/companions/solo.webp'

// The steps of Find My Journey after its intro. So far, the first two.

const STEP_COUNT = 3

// The top of every step: the logo in the middle, with the way back on one side
// and Skip on the other, then how far along you are.
function StepTop({ step, onBack, onSkip }) {
  return (
    <>
      <div className="stepBar">
        <button className="stepBack" onClick={onBack} aria-label="Back">
          <ArrowLeftIcon />
        </button>
        <Header />
        <button className="stepSkip" onClick={onSkip}>
          Skip
        </button>
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

const MOODS = [
  {
    name: 'Peaceful',
    about: ['SLOW DOWN', 'AND UNWIND'],
    picture: peacefulPicture,
    position: 'center 58%',
    color: 'rgb(160, 130, 225)',
  },
  {
    name: 'Adventurous',
    about: ['EXPLORE', 'SOMETHING NEW'],
    picture: adventurousPicture,
    position: 'center 36%',
    color: 'rgb(74, 111, 165)',
  },
  {
    name: 'Romantic',
    about: ['SHARED', 'MOMENTS'],
    picture: romanticPicture,
    position: 'center 100%',
    color: 'rgb(224, 96, 132)',
  },
  {
    name: 'Curious',
    about: ['DISCOVER', 'HIDDEN GEMS'],
    picture: curiousPicture,
    position: 'center 100%',
    color: 'rgb(62, 140, 84)',
  },
  {
    name: 'Playful',
    about: ['FUN FOR', 'EVERYONE'],
    picture: playfulPicture,
    position: 'center 69%',
    color: 'rgb(216, 164, 32)',
  },
  {
    name: 'Cultural',
    about: ['DEEPER', 'CONNECTIONS'],
    picture: culturalPicture,
    position: '35% center',
    color: 'rgb(44, 82, 190)',
  },
]

// Step 1. Tapping a mood chooses it and moves straight on to the next step.
export function MoodPage({ onChoose, onSkip, onBack }) {
  return (
    <div className="stepPage">
      <StepTop step={1} onBack={onBack} onSkip={onSkip} />

      <h1 className="stepTitle">
        How do you want
        <br />
        to feel today?
      </h1>
      <p className="stepText">
        Choose how you want to feel,
        <br />
        and we’ll find the perfect
        <br />
        journey for you.
      </p>

      <div className="moodCards">
        {MOODS.map((mood, index) => (
          <PictureCard
            key={mood.name}
            index={index}
            picture={mood.picture}
            position={mood.position}
            color={mood.color}
            onClick={() => onChoose(mood.name)}
          >
            <span className="moodName">{mood.name}</span>
            <span className="moodAbout">
              {mood.about[0]}
              <br />
              {mood.about[1]}
            </span>
          </PictureCard>
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

// Step 2. Tapping a card chooses it, and NEXT stays greyed out until one has
// been. `chosen` is its name. NEXT and Skip don't go anywhere yet: the next step
// is still to come.
export function CompanionPage({ chosen, onChoose, onBack }) {
  return (
    <div className="stepPage">
      <StepTop step={2} onBack={onBack} />

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

      <div className="whoCards" role="radiogroup" aria-label="Who’s joining">
        {COMPANIONS.map(({ name, about, Icon, picture, position, color }, index) => (
          <PictureCard
            key={name}
            className={chosen === name ? 'whoCard isChosen' : 'whoCard'}
            index={index}
            picture={picture}
            position={position}
            color={color}
            role="radio"
            aria-checked={chosen === name}
            onClick={() => onChoose(name)}
          >
            <Icon className="whoIcon" />
            <span className="moodName">{name}</span>
            <span className="whoAbout">{about}</span>
          </PictureCard>
        ))}
      </div>

      <button className="stepNext" disabled={!chosen}>
        Next
        <ArrowRightIcon />
      </button>
    </div>
  )
}
