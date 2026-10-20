import { useEffect, useState } from 'react'

import sceneryLogo from './assets/nature_icon.svg'
import exploreLogo from './assets/scenic_routes_icon.svg'
import experienceLogo from './assets/weird_and_wonderful_icon.svg'

import Header, { PhotoHero } from './Header.jsx'
import StopConfirmation from './StopConfirmation.jsx'
import SkipDetourPrompt from './SkipDetourPrompt.jsx'
import Questionnaire from './Questionnaire.jsx'
import { DirectionsPage, ArrivedPage, DetoursPage } from './StopPages.jsx'
import MemoryPage from './MemoryPage.jsx'
import SurveyPage from './SurveyPage.jsx'
import { ClockIcon, NavigateIcon, PinIcon, RouteIcon, WalkIcon } from './Icons.jsx'
import { kawagoeStation, imofukudo, tokiNoKane, hikawaShrine, maruya, kawagoeJourney } from './journeyStops'
import { preloadQuizPhotos } from './quizData'
import './App.css'

// The prototype follows the flow chart:
//   Opening Screen → Find My Journey → the quiz → your traveler type
//   → your journey → Departure (Kawagoe Station) → Discovery (Imofukudo)
//   → Build (Toki no Kane), with optional detours from there (Kawagoe City
//   Museum, Kawagoe Castle) → Peak (Hikawa Shrine) → Afterglow (MARUYA)
//   → Memory, looking back on the day → the survey.
// Browse Journeys is the shortcut from the opening screen straight to a journey.
function App() {
  // Which screen is showing: "home", "find", "quiz", "browse", "seeJourney",
  // "departure", "departureInfo", "discovery", "discoveryInfo", "build",
  // "buildInfo", "detours", "detour", "detourInfo", "peak", "peakInfo",
  // "afterglow", "afterglowInfo", "memory" or "survey".
  const [page, setPage] = useState('home')
  const [travelerType, setTravelerType] = useState(null);
  const [showStopConfirmation, setShowStopConfirmation] = useState(false);

  // The detour you're on (its card from journeyStops.js), and the ids of the
  // ones you've taken. A detour counts as taken once you press I'M HERE.
  const [detour, setDetour] = useState(null)
  const [detoursTaken, setDetoursTaken] = useState([])
  const [showSkipDetour, setShowSkipDetour] = useState(false)

  const stopJourney = () => setShowStopConfirmation(true)

  // Every run of the journey starts with no detours taken.
  function beginJourney(firstPage) {
    setDetour(null)
    setDetoursTaken([])
    setPage(firstPage)
  }

  // Toki no Kane's detours you haven't taken yet, and of those, the ones
  // other than the detour you're on.
  const detoursLeft = tokiNoKane.detours.filter((each) => !detoursTaken.includes(each.id))
  const otherDetoursLeft = detoursLeft.filter((each) => each !== detour)

  let content

  if (page === 'survey') {
    content = (
      <SurveyPage
        journey={kawagoeJourney}
        travelerType={travelerType}
        detoursTaken={detoursTaken}
        onBack={() => setPage('memory')}
        onHome={() => setPage('home')}
      />
    )
  } else if (page === 'memory') {
    content = (
      <MemoryPage
        journey={kawagoeJourney}
        detoursTaken={detoursTaken}
        onSurvey={() => setPage('survey')}
        onHome={() => setPage('home')}
      />
    )
  } else if (page === 'afterglowInfo') {
    content = (
      <ArrivedPage
        stop={maruya}
        continueLabel="FINISH JOURNEY ➜"
        onContinue={() => setPage('memory')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'afterglow') {
    content = (
      <DirectionsPage
        stop={maruya}
        onImHere={() => setPage('afterglowInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'peakInfo') {
    content = (
      <ArrivedPage
        stop={hikawaShrine}
        onContinue={() => setPage('afterglow')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'peak') {
    content = (
      <DirectionsPage
        stop={hikawaShrine}
        onImHere={() => setPage('peakInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'detourInfo') {
    content = (
      <ArrivedPage
        stop={detour}
        detoursLeft={detoursLeft}
        detoursFrom={tokiNoKane}
        onSeeDetours={() => setPage('detours')}
        onContinue={() => setPage('peak')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'detour') {
    content = (
      <DirectionsPage
        stop={detour}
        onImHere={() => {
          setDetoursTaken([...detoursTaken, detour.id])
          setPage('detourInfo')
        }}
        onSkip={() => setShowSkipDetour(true)}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'detours') {
    content = (
      <DetoursPage
        from={tokiNoKane}
        done={detoursTaken}
        onTakeDetour={(chosen) => {
          setDetour(chosen)
          setPage('detour')
        }}
        onContinue={() => setPage('peak')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'buildInfo') {
    content = (
      <ArrivedPage
        stop={tokiNoKane}
        detoursLeft={detoursLeft}
        onSeeDetours={() => setPage('detours')}
        // Skipping the detours.
        onContinue={() => setPage('peak')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'build') {
    content = (
      <DirectionsPage
        stop={tokiNoKane}
        onImHere={() => setPage('buildInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'discoveryInfo') {
    content = (
      <ArrivedPage
        stop={imofukudo}
        onContinue={() => setPage('build')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'discovery') {
    content = (
      <DirectionsPage
        stop={imofukudo}
        onImHere={() => setPage('discoveryInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'departureInfo') {
    content = (
      <ArrivedPage
        stop={kawagoeStation}
        onContinue={() => setPage('discovery')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'departure') {
    content = (
      <DirectionsPage
        stop={kawagoeStation}
        onImHere={() => setPage('departureInfo')}
        onStopJourney={stopJourney}
      />
    )
  } else if (page === 'seeJourney') {
    content = (
      <SeeJourneyPage
        onHome={() => setPage('home')}
        onBeginJourney={() => beginJourney('departure')}
        // Already at the start: skip Kawagoe Station and head for the first stop.
        onSkipToFirstStop={() => beginJourney('discovery')}
        travelerType={travelerType}
      />
    )
  } else if (page === 'quiz') {
    content = (
      <Questionnaire
        onExit={() => setPage('find')}
        onHome={() => setPage('home')}
        onSeeJourney={() => setPage('seeJourney')}
        onSetTravelerType={setTravelerType}
      />
    )
  } else if (page === 'find') {
    content = (
      <FindJourneyPage
        onStart={() => setPage('quiz')}
        onBack={() => setPage('home')}
      />
    )
  } else if (page === 'browse') {
    content = (
      <BrowseJourneyPage
        onBack={() => setPage('home')}
        onSelect={() => setPage('seeJourney')}
        travelerType={travelerType}
      />
    )
  } else {
    content = (
      <HomePage
        onFindJourney={() => setPage('find')}
        onBrowseJourney={() => setPage('browse')}
      />
    )
  }

  // On a phone this is the whole screen. On a laptop it's drawn as a phone
  // in the middle of the window — see the bottom of App.css.

  return (
    <div className="phone">
      {/* Keyed by page so each screen starts scrolled to the top. Inert while
          a box is up over it, so nothing behind can be tapped or tabbed to. */}
      <div className="screen" key={page} inert={showStopConfirmation || showSkipDetour}>
        {content}
      </div>

      {showSkipDetour && (
        <SkipDetourPrompt
          hasOtherDetours={otherDetoursLeft.length > 0}
          onSeeOtherDetours={() => {
            setShowSkipDetour(false)
            setPage('detours')
          }}
          onContinueJourney={() => {
            setShowSkipDetour(false)
            setPage('peak')
          }}
          onStay={() => setShowSkipDetour(false)}
        />
      )}

      {showStopConfirmation && (
        <StopConfirmation
          onConfirm={() => {
            setPage('home')
            setShowStopConfirmation(false)
          }}
          onCancel={() => {
            setShowStopConfirmation(false)
          }}
        />
      )}
    </div>
  )
}

function HomePage({ onFindJourney, onBrowseJourney }) {
  return (
    <div className="homePage">
      <div className="homeBackdrop" aria-hidden="true"></div>
      <Header />
      <div className="homeHook">
        <h1 className="mainHook">
          Unforgettable experiences <br />
          in Japan
        </h1>
        <p className="subHook">Curated. Authentic. Unforgettable.</p>
        <div className="introBtnContainer">
          <button className="introBtn" onClick={onFindJourney}>
            FIND MY JOURNEY ➜
          </button>
          <button className="introBtn isGhost" onClick={onBrowseJourney}>
            BROWSE JOURNEYS ➜
          </button>
        </div>
      </div>
    </div>
  )
}

function BrowseJourneyPage({ onBack, onSelect, travelerType }) {
  const journey = kawagoeJourney
  // Once you've taken the quiz, it's been picked for you, and says why.
  const reason = travelerType ? journey.reasons[travelerType.name] : null

  return (
    <div className="browseJourneyPage">
      <Header />
      <button className="backBtn pageBack" onClick={onBack}>
        ‹ BACK
      </button>

      <div className="pageBody">
        {/* The whole card opens the journey. Its button is there to make that
            obvious, and for the keyboard; its click reaches the card too. */}
        <div className="featureCard" onClick={onSelect}>
          <img src={journey.photo} alt="" />
          <p className="featureCardTag">{travelerType ? 'CHOSEN FOR YOU' : 'FEATURED JOURNEY'}</p>
          <div className="featureCardText">
            <p className="heroLabel">{journey.location}</p>
            <h1 className="heroTitle">{journey.name}</h1>
            <p className="featureCardBlurb">{journey.blurb}</p>
            {reason && <p className="featureCardReason">{reason}</p>}
            <button className="introBtn">EXPLORE THIS JOURNEY ➜</button>
          </div>
        </div>

        <div className="comingSoonCard">
          <p className="comingSoonTitle">More journeys coming soon</p>
          <p>New routes across Japan are on their way.</p>
        </div>
      </div>
    </div>
  )
}

// Explains what the quiz is before anyone starts it.
function FindJourneyPage({ onStart, onBack }) {
  // The quiz is next, so start fetching its pictures now.
  useEffect(() => {
    preloadQuizPhotos()
  }, [])

  return (
    <div className="findPage">
      <div className="pageTop">
        <Header />
        <button className="backBtn pageBack" onClick={onBack}>
          ‹ BACK
        </button>
        <h1 className="mainHook pageTitle">Find My Journey</h1>
        <p className="msg msgQuote">“Every traveler experiences Japan differently.”</p>
        <p className="msg">
          Answer eight quick questions and we'll tell you what kind of traveler you
          are. Then we'll match you with journeys that fit.
        </p>
        <div className="icons">
          <div className="iconContainer">
            <img src={sceneryLogo} alt="" />
            <p>What kind of scenery?</p>
          </div>
          <div className="iconContainer">
            <img src={exploreLogo} alt="" />
            <p>How do you like to explore?</p>
          </div>
          <div className="iconContainer">
            <img src={experienceLogo} alt="" />
            <p>What kind of experience?</p>
          </div>
        </div>
        <div className="divider"></div>
      </div>

      <ol className="howSteps">
        <li>
          <span className="howNum">1</span>
          <span>
            <strong>Pick a picture.</strong> Each question shows two places. Tap the
            one that pulls you in.
          </span>
        </li>
        <li>
          <span className="howNum">2</span>
          <span>
            <strong>Go with your gut.</strong> There are no wrong answers, and it
            takes about a minute.
          </span>
        </li>
        <li>
          <span className="howNum">3</span>
          <span>
            <strong>Meet your traveler type.</strong> The Naturalist, the Collector
            or the Wanderer.
          </span>
        </li>
      </ol>

      <div className="testTakeBtnContainer">
        <h2 className="mainHook">Ready to discover yours?</h2>
        <button className="introBtn" onClick={onStart}>
          START QUIZ ➜
        </button>
      </div>
    </div>
  )
}

// Which journey each traveler type is matched with.
const journeys = {
  "The Naturalist": kawagoeJourney,
  "The Wanderer": kawagoeJourney,
  "The Collector": kawagoeJourney
}

function SeeJourneyPage({ onHome, onBeginJourney, onSkipToFirstStop, travelerType }) {
  const journey = travelerType ? journeys[travelerType.name] : kawagoeJourney

  return (
    <div className="journeyPage">
      <PhotoHero
        photo={journey.photo}
        photoAlt={journey.photoAlt}
        kicker="Your journey"
        label={journey.location}
        title={journey.name}
        size="isTall"
      />

      <div className="pageBody">
        <p className="heroTagline">{journey.tagline}</p>

        <div className="factsRow">
          <span className="fact">
            <ClockIcon />
            {journey.time}
          </span>
          <span className="fact">
            <WalkIcon />
            {journey.walking}
          </span>
          <span className="fact">
            <RouteIcon />
            {journey.stops}
          </span>
        </div>

        <div className="startCard">
          <p className="startCardLabel">START HERE</p>
          <div className="startCardRow">
            <PinIcon />
            <div>
              <p className="startCardName">{journey.start.name}</p>
              <p className="startCardArea">{journey.startArea}</p>
              <p className="startCardNote">{journey.startNote}</p>
            </div>
          </div>
        </div>

        <h2 className="sectionTitle">Why we recommend this journey</h2>
        <div className="bodyText">
          {journey.why.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="divider sectionBreak"></div>

        <div className="testTakeBtnContainer">
          <h2 className="mainHook">Are you ready to embark on this adventure?</h2>
          <button className="introBtn hasIcon" onClick={onBeginJourney}>
            <NavigateIcon />
            GET DIRECTIONS TO THE START
          </button>
          <div className="alreadyThere">
            <p>Already at the starting point?</p>
            <button className="textLink" onClick={onSkipToFirstStop}>
              BEGIN JOURNEY ➜
            </button>
          </div>
          <button className="backBtn" onClick={onHome}>
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
