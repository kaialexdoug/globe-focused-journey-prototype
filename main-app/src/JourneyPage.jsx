import { useRef, useState } from 'react'

import BeforeYouGo from './BeforeYouGo.jsx'
import BestTime from './BestTime.jsx'
import Header from './Header.jsx'
import JourneyFacts from './JourneyFacts.jsx'
import RouteDetails from './RoutePreview.jsx'
import {
  ArrowRightIcon,
  BinocularsIcon,
  BookmarkIcon,
  ChecklistIcon,
  ChevronLeftIcon,
  ExpectationsIcon,
  HeartIcon,
  LayersIcon,
  PinIcon,
  SparkleIcon,
  WeatherIcon,
} from './Icons.jsx'
import { experienceLevel } from './experienceLevels.js'
import { hasRoutePreview } from './journeyTimes.js'
import { fullPlaceName } from './journeyStops'

// See Your Journey: a journey's page, after its mockup, opened from Home,
// Search, Find My Journey or My Journeys:
//
// - Its photo across the top, with back (to wherever it was opened from) on
//   the left, the logo, and save on the right, and its name in the serif
//   with where it is under it, on the photo's shaded bottom edge.
// - Three tabs: Overview (its facts, then Why It's Cool: what it's about,
//   and The Discovery, The Significance and The Feeling, then Expectations:
//   what kind of experience it is, experienceLevels.js), Route (each stop
//   and the walk between them, then the map: RoutePreview.jsx), and Details
//   (the weather and the best time to go: BestTime.jsx, then Before You Go:
//   BeforeYouGo.jsx).
// - Whichever tab it's on, BEGIN JOURNEY at the end (JourneyButtons).
//
// The photo and the tabs stay put; what's under them scrolls.
//
// `whyCool` is { discovery, significance, feeling }, a sentence each: what
// you'll discover, why it matters, and what it feels like. Every journey has
// it, but one without it (a new one, say) just shows its description. One
// without the walk to every stop gets where to start in the Route tab, and
// one without `bestTime` or `beforeYouGo` leaves that part of Details out.

const TABS = [
  { key: 'overview', name: 'Overview' },
  { key: 'route', name: 'Route' },
  { key: 'details', name: 'Details' },
]

const WHY_COOL = [
  { key: 'discovery', title: 'The Discovery', Icon: BinocularsIcon },
  { key: 'significance', title: 'The Significance', Icon: LayersIcon },
  { key: 'feeling', title: 'The Feeling', Icon: HeartIcon },
]

function JourneyPage({ journey, saved, onToggleSaved, onClose, ...buttons }) {
  const [tab, setTab] = useState('overview')
  // Each tab stays once it's been opened, just hidden while another's
  // showing, so the route's map only loads the once.
  const [opened, setOpened] = useState(['overview'])
  const bodyRef = useRef(null)
  const tabRefs = useRef({})
  const current = TABS.findIndex((each) => each.key === tab)

  function showTab(key) {
    bodyRef.current?.scrollTo(0, 0)
    setTab(key)
    setOpened((keys) => (keys.includes(key) ? keys : [...keys, key]))
  }

  // The arrow keys go along the tabs, as they do in any set of tabs.
  function moveAlong(event) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
    if (!step) {
      return
    }
    event.preventDefault()
    const next = TABS[(current + step + TABS.length) % TABS.length].key
    showTab(next)
    tabRefs.current[next]?.focus()
  }

  // A tab's part of the page, once it's been opened.
  function panel(key, content) {
    if (!opened.includes(key)) {
      return null
    }
    return (
      <div role="tabpanel" id={`journeyPanel-${key}`} aria-labelledby={`journeyTab-${key}`} hidden={tab !== key}>
        {content}
      </div>
    )
  }

  return (
    <div className="journeyTabsPage">
      <div className="journeyHero">
        <img
          className="journeyHeroImg"
          src={journey.photo}
          alt={journey.photoAlt}
          style={{ objectPosition: journey.photoPosition }}
        />
        <Header />
        <button className="journeyHeroButton journeyBack" onClick={onClose} aria-label="Back">
          <ChevronLeftIcon />
        </button>
        <button
          className={saved ? 'journeyHeroButton journeySave isSaved' : 'journeyHeroButton journeySave'}
          onClick={onToggleSaved}
          aria-pressed={saved}
          aria-label={`Save ${journey.name}`}
        >
          <BookmarkIcon />
        </button>
        <div className="journeyHeroText">
          <h1 className="journeyName">{journey.name}</h1>
          <p className="journeyPlace">{fullPlaceName(journey.location)}</p>
        </div>
      </div>

      <div className="journeyTabs" role="tablist" aria-label="About this journey">
        {TABS.map(({ key, name }) => (
          <button
            key={key}
            ref={(element) => {
              tabRefs.current[key] = element
            }}
            className={tab === key ? 'journeyTab isCurrent' : 'journeyTab'}
            role="tab"
            id={`journeyTab-${key}`}
            aria-selected={tab === key}
            aria-controls={`journeyPanel-${key}`}
            tabIndex={tab === key ? 0 : -1}
            onClick={() => showTab(key)}
            onKeyDown={moveAlong}
          >
            {name}
          </button>
        ))}
        {/* The orange bar under the tab you're on, sliding along to the next. */}
        <span className="journeyTabBar" style={{ '--tab': current }} aria-hidden="true" />
      </div>

      <div className="journeyBody" ref={bodyRef}>
        {panel('overview', <Overview journey={journey} />)}
        {panel('route', hasRoutePreview(journey) ? <RouteDetails journey={journey} /> : <StartHere journey={journey} />)}
        {panel(
          'details',
          <>
            {journey.bestTime && (
              <section className="journeySection" aria-labelledby="journeyWeatherTitle">
                <h2 className="journeySectionTitle" id="journeyWeatherTitle">
                  <WeatherIcon />
                  Weather &amp; Best Time to Go
                </h2>
                <BestTime journey={journey} />
              </section>
            )}
            {journey.beforeYouGo && (
              <section className="journeySection" aria-labelledby="journeyBeforeTitle">
                <h2 className="journeySectionTitle" id="journeyBeforeTitle">
                  <ChecklistIcon />
                  Before You Go
                </h2>
                <BeforeYouGo journey={journey} />
              </section>
            )}
          </>
        )}

        <JourneyButtons {...buttons} />
      </div>
    </div>
  )
}

// Its facts, then Why It's Cool: what the journey's about (its description),
// then The Discovery, The Significance and The Feeling in a panel, then
// Expectations in a panel of its own.
function Overview({ journey }) {
  const level = experienceLevel(journey)
  return (
    <>
      <JourneyFacts journey={journey} withStops />
      <section className="whyCool" aria-labelledby="whyCoolTitle">
        <h2 className="whyCoolTitle" id="whyCoolTitle">
          <SparkleIcon className="whyCoolSparkle" />
          Why It’s Cool
        </h2>
        <div className="whyCoolText">
          {journey.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        {journey.whyCool && (
          <ul className="whyCoolList">
            {WHY_COOL.map(({ key, title, Icon }) => (
              <li key={key} className="whyCoolItem">
                <Icon className="whyCoolIcon" />
                <div>
                  <h3 className="whyCoolItemTitle">{title}</h3>
                  <p className="whyCoolItemText">{journey.whyCool[key]}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="expectations" aria-labelledby="expectationsTitle">
        <ExpectationsIcon className="expectationsCompass" />
        <div className="expectationsHead">
          <h2 className="expectationsTitle" id="expectationsTitle">
            Expectations
          </h2>
          <p className="expectationsLevel">
            <level.Icon />
            {level.label}
          </p>
        </div>
        <p className="expectationsText">{level.text}</p>
      </section>
    </>
  )
}

// Where to start, for the Route tab on a journey without the walk to every
// stop.
function StartHere({ journey }) {
  return (
    <div className="startCard">
      <p className="startCardLabel">Start here</p>
      <div className="startCardRow">
        <PinIcon />
        <div>
          <p className="startCardName">{journey.departure.name}</p>
          <p className="startCardArea">{journey.startArea}</p>
          <p className="startCardNote">{journey.startNote}</p>
        </div>
      </div>
    </div>
  )
}

// The buttons at the end of each tab. Just the one, BEGIN JOURNEY, whether or not you're at the start already: it
// begins with Get Ready (today's conditions), which asks whether you're there
// yet. After a finished run, a quiet way back to its memory too. On a journey
// left partway (`underWay`, where you left it), RESUME JOURNEY instead, or
// start over.
function JourneyButtons({ onBeginJourney, onResume, onViewMemory, completed, underWay }) {
  return (
    <div className="testTakeBtnContainer">
      {underWay ? (
        <>
          <p className="inProgressTag">In progress</p>
          <h2 className="mainHook">Pick up where you left off?</h2>
          <p className="seeJourneyWhere">{underWay.text}</p>
          <button className="introBtn" onClick={onResume}>
            Resume Journey
            <ArrowRightIcon />
          </button>
          <div className="alreadyThere">
            <p>Rather start again from the beginning?</p>
            <button className="textLink" onClick={onBeginJourney}>
              Start Over ➜
            </button>
          </div>
        </>
      ) : (
        <>
          {completed && <p className="completedNote">✓ You’ve completed this journey</p>}
          <button className="introBtn" onClick={onBeginJourney}>
            Begin Journey
            <ArrowRightIcon />
          </button>
          {completed && (
            <button className="textLink viewMemoryLink" onClick={onViewMemory}>
              View Memory
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default JourneyPage
