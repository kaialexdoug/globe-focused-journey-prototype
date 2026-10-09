import { useEffect, useState } from 'react'

import sceneryLogo from './assets/nature_icon.svg'
import exploreLogo from './assets/scenic_routes_icon.svg'
import experienceLogo from './assets/weird_and_wonderful_icon.svg'

import emaTunnel from './assets/journey/ema-tunnel.jpg'
import kawagoeStation from './assets/journey/kawagoe-station.jpg'

import Header from './Header.jsx'
import Questionnaire from './Questionnaire.jsx'
import { preloadQuizPhotos } from './quizData'
import './App.css'

// The prototype covers the start of the flow chart only:
//   Opening Screen → Find My Journey → the quiz → your traveler type.
// Journeys come after that, once they've been planned.
function App() {
  // Which screen is showing: "home", "find" or "quiz".
  const [page, setPage] = useState('home')
  const [travelerType, setTravelerType] = useState(null);

  let content
  if (page === 'departure') {
    content = <DeparturePage/>
  }
  else if (page === 'seeJourney') {
    content = (
      <SeeJourneyPage
        onHome={() => setPage('home')}
        onBeginJourney={() => setPage('departure')}
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
  } else {
    content = <HomePage onFindJourney={() => setPage('find')} />
  }

  // On a phone this is the whole screen. On a laptop it's drawn as a phone
  // in the middle of the window — see the bottom of App.css.
  return (
    <div className="phone">
      {/* Keyed by page so each screen starts scrolled to the top. */}
      <div className="screen" key={page}>
        {content}
      </div>
    </div>
  )
}

function HomePage({ onFindJourney }) {
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
        <button className="introBtn" onClick={onFindJourney}>
          FIND MY JOURNEY ➜
        </button>
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
      <div className="main">
        <Header />
        <button className="backBtn" onClick={onBack}>
          ‹ BACK
        </button>
        <h1 className="mainHook">Find My Journey</h1>
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

const journeys = {
  "The Naturalist": "Adventure in Kawagoe",
  "The Wanderer": "Adventure in Kawagoe",
  "The Collector": "Adventure in Kawagoe"
}

function SeeJourneyPage({ onHome, onBeginJourney, travelerType }) {
  return (
    <div className="journeyPage">
      <Header />

      <div className="journeyHero">
        <img src={emaTunnel} />

        <div className="journeyHeroText">
          <p>Your Journey:</p>
          <h1>{journeys[travelerType.name]}</h1>
        </div>
      </div>
      
      <div className="summaryContainer">
        <p className="msgQuote">~5 stops · ~2 hours · Flat walking</p>
        <div className="divider"></div>
        <p className="summaryTitle"><strong>Why we recommend this Journey:</strong></p>
        <p className="summary">
          Everyone who comes to Kawagoe sees the same bell tower, the same warehouse street, the same photo. This journey starts there too — but it doesn't end there.

Past the crowds, down streets most visitors never think to turn down, there's a reason the locals still call this town "Koedo," (little Edo) A gate that's marked time here for over a century. A quiet shrine tucked away from the noise, holding something most people walk straight past.

We won't tell you what it is. You'll have to go see for yourself.
        </p>

        <div className="divider"></div>

        <div className="readyBtnContainer">
          <p><strong>Are you ready to embark on this adventure?</strong></p>

          <button className="introBtn" onClick={onBeginJourney}>
            BEGIN JOURNEY ➜
          </button>
        </div>
      </div>
      
      <button className="backBtn" onClick={onHome}>
        BACK TO HOME
      </button>
    </div>
  )
}

function DeparturePage() {
  return (
    <div className="departurePage">
      <Header />
      <h1>DEPARTURE</h1>
      <div className="summaryTitle">
        <p>Your journey begins at:</p>
      </div>
      <div>
        <div className="resultHero">
          <div className="resultHeroText">
            <h2>Kawagoe Station</h2>
          </div>
          <img src={kawagoeStation} />
        </div>
        <a
          className="introBtn"
          href="https://www.google.com/maps/dir/?api=1&destination=Kawagoe%20Station&travelmode=walking"
          target="_blank"
          rel="noreferrer"
        >
        GET DIRECTIONS ➜
      </a>
      </div>
    </div>
  )
}

export default App
