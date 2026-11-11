import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { EXPERIENCE_ICONS } from './experienceIcons.js'
import Header from './Header.jsx'
import { placeOfAnswers, rankJourneys } from './journeyMatch.js'
import { catalogPlaces, suggestPlaces } from './journeyPlaces.js'
import {
  ActivePaceIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BeachIcon,
  BurgerIcon,
  CalendarIcon,
  CheckIcon,
  ChevronRightIcon,
  CityIcon,
  ClockIcon,
  CloseIcon,
  CoupleIcon,
  DollarIcon,
  EasyPaceIcon,
  FamilyIcon,
  GroupIcon,
  HeartIcon,
  HikingIcon,
  LeafIcon,
  ModeratePaceIcon,
  NoAlcoholIcon,
  PawIcon,
  PinIcon,
  SearchIcon,
  SlidersIcon,
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

import whoPicture from './assets/companions/who-hero.webp'

import detailsPicture from './assets/details/pagoda-hero.webp'

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
      {/* The steps before this one in teal, and this one in orange. */}
      <div className="stepProgress">
        {Array.from({ length: STEP_COUNT }, (_, index) => (
          <span
            key={index}
            className={index < step - 1 ? 'isDone' : index === step - 1 ? 'isCurrent' : undefined}
          ></span>
        ))}
      </div>
    </>
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
  { name: 'Solo', about: 'Just me', Icon: SoloIcon },
  { name: 'Couple', about: 'Two people', Icon: CoupleIcon },
  { name: 'Family', about: 'With kids', Icon: FamilyIcon },
  { name: 'Friends / Group', about: '2+ people', Icon: GroupIcon },
]

// Step 2, after its mockup. The origami family looking out over the hills sits
// behind the right of the heading. Each choice is a white card with its
// symbol, its name and who it means, and an arrow in the corner, as on step 1.
// Tapping one chooses it and moves straight on to the next step.
export function CompanionPage({ onChoose, onSkip, onBack }) {
  return (
    <div className="stepPage whoPage">
      <StepTop step={2} onBack={onBack} onSkip={onSkip} />

      <div className="whoHero">
        <img className="whoHeroArt" src={whoPicture} alt="" />
        <h1 className="stepTitle">
          Who’s joining
          <br />
          your journey?
        </h1>
        <p className="stepText">
          This helps us find journeys
          <br />
          that fit your group.
        </p>
      </div>

      <div className="whoChoices">
        {COMPANIONS.map(({ name, about, Icon }, index) => (
          <button key={name} className="whoChoice" style={{ '--i': index }} onClick={() => onChoose(name)}>
            <Icon className="whoFigure" />
            <span className="whoChoiceName">{name}</span>
            <span className="whoChoiceAbout">{about}</span>
            <span className="whoChoiceArrow" aria-hidden="true">
              <ArrowRightIcon />
            </span>
          </button>
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

// How active you want to be. Their names are the paces journeyMatch.js
// knows; what's under each breaks where the mockup does.
const PACES = [
  { name: 'Easy', about: 'Relaxed, minimal\nwalking', Icon: EasyPaceIcon },
  { name: 'Moderate', about: 'Some walking\nand exploration', Icon: ModeratePaceIcon },
  { name: 'Active', about: 'More movement\nand discovery', Icon: ActivePaceIcon },
]

// The preferences on Anything else?, each rated on every journey (in
// `match.preferences` on its card).
const PREFERENCES = [
  { name: 'Pet friendly', Icon: PawIcon },
  { name: 'Avoid alcohol', Icon: NoAlcoholIcon },
  { name: 'More nature', Icon: LeafIcon },
  { name: 'Food stops', Icon: BurgerIcon },
  { name: 'Coastal', Icon: BeachIcon },
  { name: 'More urban', Icon: CityIcon },
  { name: 'Hiking involved', Icon: HikingIcon },
  { name: 'Budget friendly', Icon: DollarIcon },
]

// A small card to pick: white, then a soft peach with an orange edge and a
// tick in its corner once it's picked. `index` is its place in the order the
// cards fade in.
function DetailCard({ option: { name, about, Icon }, chosen, index, ...button }) {
  return (
    <button
      className={chosen ? 'detailCard isChosen' : 'detailCard'}
      style={{ '--i': index }}
      {...button}
    >
      {chosen && (
        <span className="detailCheck">
          <CheckIcon />
        </span>
      )}
      <Icon className="detailIcon" />
      <span className="detailName">{name}</span>
      {about && <span className="detailAbout">{about}</span>}
    </button>
  )
}

// A question with one answer, with its symbol beside it, over a row of
// cards. `firstIndex` is where its cards come in the order they fade in.
function OneAnswer({ question, Icon, options, firstIndex, chosen, onChoose }) {
  const id = useId()
  return (
    <section className="detailQuestion">
      <h2 id={id}>
        <Icon className="detailQuestionIcon" />
        {question}
      </h2>
      <div className="detailCards" role="radiogroup" aria-labelledby={id}>
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

// Where to?: a box to type a city, region or country in, with places that
// have journeys suggested underneath as you type (or, before you've typed
// anything, the ones with the most). Picking one fills it in. `value` is
// what's in the box, and `onChange` gets it whenever it changes.
function PlaceField({ journeys, value, onChange }) {
  const places = useMemo(() => catalogPlaces(journeys), [journeys])
  const [open, setOpen] = useState(false)
  // The suggestion picked out with the arrow keys, if any.
  const [active, setActive] = useState(-1)
  const inputRef = useRef(null)
  const listId = useId()

  const suggestions = open ? suggestPlaces(places, value) : []
  const nowhere = open && value.trim() !== '' && suggestions.length === 0

  function choose(place) {
    onChange(place.label)
    setOpen(false)
    inputRef.current.blur()
  }

  function handleKey(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setActive(Math.min(active + 1, suggestions.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive(Math.max(active - 1, -1))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (suggestions[active]) {
        choose(suggestions[active])
      } else {
        inputRef.current.blur()
      }
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className="placeField">
      <label className="detailBar placeBar">
        <PinIcon className="detailBarIcon" />
        <input
          ref={inputRef}
          className="placeInput"
          type="text"
          value={value}
          placeholder="Where to? (City, region or country)"
          aria-label="Where to?"
          role="combobox"
          aria-expanded={suggestions.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={suggestions[active] ? `${listId}-${active}` : undefined}
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="done"
          onFocus={() => setOpen(true)}
          onBlur={() => {
            setOpen(false)
            setActive(-1)
          }}
          onChange={(event) => {
            onChange(event.target.value)
            setOpen(true)
            setActive(-1)
          }}
          onKeyDown={handleKey}
        />
        {value ? (
          // In place of the magnifying glass once there's something to clear.
          // Pressing it doesn't take the cursor out of the box.
          <button
            type="button"
            className="placeClear"
            aria-label="Clear where to"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              onChange('')
              inputRef.current.focus()
            }}
          >
            <CloseIcon />
          </button>
        ) : (
          <SearchIcon className="detailBarIcon placeSearchIcon" />
        )}
      </label>

      {(suggestions.length > 0 || nowhere) && (
        // Pressing in the list doesn't take the cursor out of the box, which
        // would close it before the tap lands.
        <ul
          className="placeSuggestions"
          id={listId}
          role="listbox"
          aria-label="Places with journeys"
          onMouseDown={(event) => event.preventDefault()}
        >
          {suggestions.map((place, index) => (
            <li
              key={place.key}
              id={`${listId}-${index}`}
              className={index === active ? 'placeSuggestion isActive' : 'placeSuggestion'}
              role="option"
              aria-selected={index === active}
              onClick={() => choose(place)}
            >
              <PinIcon className="placeSuggestionIcon" />
              <span className="placeSuggestionWords">
                <span className="placeSuggestionName">{place.name}</span>
                {place.within && <span className="placeSuggestionWithin">{place.within}</span>}
              </span>
              <span className="placeSuggestionCount">
                {place.count} {place.count === 1 ? 'journey' : 'journeys'}
              </span>
            </li>
          ))}
          {nowhere && <li className="placeNowhere">No journeys there yet, so this won’t change your matches.</li>}
        </ul>
      )}
    </div>
  )
}

// A day as "2026-11-14", in the phone's own time zone.
function dayKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function dayFromKey(key) {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// "Sat, Nov 14".
function dayName(key) {
  return dayFromKey(key).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// How far ahead the calendar goes.
const MONTHS_AHEAD = 12

// The calendar for When are you going?, in a box over everything: a month at a
// time, starting with this one. Days gone by are greyed out and can't be
// picked, and today says "Now". `date` is the day picked already, or null for
// now; `onChoose` gets the day picked, or null for today. Tapping outside the
// box, the ✕ or Escape closes it without changing anything.
function CalendarBox({ today, date, onChoose, onDismiss }) {
  const boxRef = useRef(null)
  const [shown, setShown] = useState(() => {
    const first = dayFromKey(date ?? today)
    return { year: first.getFullYear(), month: first.getMonth() }
  })

  useEffect(() => {
    boxRef.current.focus()
    function handleKey(event) {
      if (event.key === 'Escape') {
        onDismiss()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onDismiss])

  const thisMonth = dayFromKey(today)
  const monthsOn = (shown.year - thisMonth.getFullYear()) * 12 + shown.month - thisMonth.getMonth()
  const blanks = new Date(shown.year, shown.month, 1).getDay()
  const dayCount = new Date(shown.year, shown.month + 1, 0).getDate()
  const days = Array.from({ length: dayCount }, (_, index) => dayKey(new Date(shown.year, shown.month, index + 1)))
  const picked = date ?? today

  function showMonth(step) {
    const next = new Date(shown.year, shown.month + step, 1)
    setShown({ year: next.getFullYear(), month: next.getMonth() })
  }

  return (
    <div className="modalScrim" onClick={onDismiss}>
      <div
        ref={boxRef}
        className="calendarBox"
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendarTitle"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="calendarTop">
          <h2 id="calendarTitle" className="calendarTitle">
            When are you going?
          </h2>
          <button className="calendarClose" onClick={onDismiss} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <div className="calendarMonth">
          <button
            className="calendarStep"
            onClick={() => showMonth(-1)}
            disabled={monthsOn <= 0}
            aria-label="Month before"
          >
            <ChevronRightIcon className="isBack" />
          </button>
          <p aria-live="polite">
            {new Date(shown.year, shown.month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
          <button
            className="calendarStep"
            onClick={() => showMonth(1)}
            disabled={monthsOn >= MONTHS_AHEAD}
            aria-label="Month after"
          >
            <ChevronRightIcon />
          </button>
        </div>

        <div className="calendarDays">
          {WEEKDAYS.map((weekday) => (
            <abbr key={weekday} className="calendarWeekday" title={weekday}>
              {weekday[0]}
            </abbr>
          ))}
          {days.map((key, index) => {
            const isToday = key === today
            const classes = ['calendarDay', isToday && 'isToday', key === picked && 'isPicked'].filter(Boolean)
            return (
              <button
                key={key}
                className={classes.join(' ')}
                // The 1st under its weekday; the rest follow on.
                style={index === 0 ? { gridColumnStart: blanks + 1 } : undefined}
                disabled={key < today}
                aria-pressed={key === picked}
                aria-label={isToday ? `Now, ${dayName(key)}` : dayName(key)}
                onClick={() => onChoose(isToday ? null : key)}
              >
                {index + 1}
                {isToday && <span className="calendarNow">Now</span>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// When are you going?: "Now", or the day picked, and the calendar to pick
// one from. The calendar goes over the whole phone, like the app's other
// boxes, rather than inside the page.
function WhenField({ date, onChange }) {
  const [calendarHost, setCalendarHost] = useState(null)
  const close = useCallback(() => setCalendarHost(null), [])
  // Today, as of when the page opened.
  const [today] = useState(() => dayKey(new Date()))

  // A day that's gone by (the page left open overnight) is now.
  const day = date && date > today ? date : null

  return (
    <>
      <button
        className="detailBar whenBar"
        aria-haspopup="dialog"
        onClick={(event) => setCalendarHost(event.currentTarget.closest('.phone') ?? document.body)}
      >
        <CalendarIcon className="detailBarIcon" />
        <span className="whenLabel">When are you going?</span>
        <span className="whenValue">{day ? dayName(day) : 'Now'}</span>
        <ChevronRightIcon className="whenChevron" />
      </button>
      {calendarHost &&
        createPortal(
          <CalendarBox
            today={today}
            date={day}
            onChoose={(chosen) => {
              onChange(chosen)
              close()
            }}
            onDismiss={close}
          />,
          calendarHost,
        )}
    </>
  )
}

// Step 3, Make it yours: where you're going and when, how long you have and
// how active you want to be (each with one answer), and a way into Anything
// else?, the preferences. `answers` is what's been picked so far, and
// `onAnswer` gets whichever of them has changed. When you're going doesn't
// change the matches yet.
export function DetailsPage({ journeys, answers, onAnswer, onMore, onFind, onSkip, onBack }) {
  const { preferences } = answers

  return (
    <div className="stepPage detailsPage">
      <StepTop step={3} onBack={onBack} onSkip={onSkip} />

      <div className="detailsHero">
        <img className="detailsHeroArt" src={detailsPicture} alt="" />
        <h1 className="stepTitle">Make it yours.</h1>
        <p className="stepText">
          A few quick details to find the best
          <br />
          journeys for your day.
        </p>
      </div>

      <div className="detailBars">
        <PlaceField journeys={journeys} value={answers.place} onChange={(place) => onAnswer({ place })} />
        <WhenField date={answers.date} onChange={(date) => onAnswer({ date })} />
      </div>

      <OneAnswer
        question="How much time do you have?"
        Icon={ClockIcon}
        options={TIMES}
        firstIndex={0}
        chosen={answers.time}
        onChoose={(time) => onAnswer({ time })}
      />
      <OneAnswer
        question="How active do you want to be?"
        Icon={ModeratePaceIcon}
        options={PACES}
        firstIndex={TIMES.length}
        chosen={answers.pace}
        onChoose={(pace) => onAnswer({ pace })}
      />

      {/* What's picked shows in place of the examples, once there's anything. */}
      <button className="detailBar moreBar" onClick={onMore}>
        <SlidersIcon className="moreIcon" />
        <span className="moreWords">
          <span className="moreTitle">
            Anything else? <span className="moreOptional">(Optional)</span>
          </span>
          {preferences.length > 0 ? (
            <span className="moreAbout isPicked">{preferences.join(', ')}</span>
          ) : (
            <span className="moreAbout">Dietary needs, pet friendly, accessibility, and more</span>
          )}
        </span>
        <ChevronRightIcon className="moreChevron" />
      </button>

      <button className="stepFind" onClick={onFind}>
        Find My Journeys
        <ArrowRightIcon />
      </button>
    </div>
  )
}

// Anything else?, from step 3: the preferences, as cards to tap on and off,
// as many as you like. `chosen` is the names of those picked, and `onToggle`
// gets the one tapped. Done (or back) goes back to step 3.
export function PreferencesPage({ chosen, onToggle, onDone, onBack }) {
  return (
    <div className="stepPage detailsPage preferencesPage">
      <div className="stepBar">
        <button className="stepBack" onClick={onBack} aria-label="Back">
          <ArrowLeftIcon />
        </button>
        <Header />
      </div>

      <h1 className="stepTitle">Anything else?</h1>
      <p className="stepText">Pick as many as you like, or none at all.</p>

      <div className="preferenceCards">
        {PREFERENCES.map((option, index) => (
          <DetailCard
            key={option.name}
            option={option}
            chosen={chosen.includes(option.name)}
            index={index}
            aria-pressed={chosen.includes(option.name)}
            onClick={() => onToggle(option.name)}
          />
        ))}
      </div>

      <button className="stepFind" onClick={onDone}>
        Done
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
// the same place after opening one. If where you're going has no journeys,
// it says so, as it isn't part of the match.
export function MatchesPage({ journeys, answers, likes, positionRef, onSelect, onToggleLike, onBack }) {
  const pageRef = useRef(null)
  const typedPlace = answers.place.trim()
  const unknownPlace = typedPlace !== '' && !placeOfAnswers(journeys, answers)

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
      {unknownPlace && (
        <p className="matchesNote">
          There aren’t any journeys in {typedPlace} yet, so these are matched on everything else.
        </p>
      )}

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
