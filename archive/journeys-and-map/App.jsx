import { useState } from 'react'
import sceneryLogo from './assets/nature_icon.svg';
import exploreLogo from './assets/scenic_routes_icon.svg';
import experienceLogo from './assets/weird_and_wonderful_icon.svg';
import Questionnaire from './Questionnaire.jsx'
import JourneyFlow from './JourneyFlow.jsx'
import CityMap from './CityMap.jsx'
import NavBar from './NavBar.jsx'
import { JOURNEYS } from './journeys'
import './App.css'

function App() {
  // Which tab in the bar along the bottom is showing.
  const [tab, setTab] = useState("home")
  // Where we are inside the Home tab: the landing page, the discover page, or
  // the quiz. This is the page state the app already had.
  const [page, setPage] = useState("home")
  // True only while someone is mid-walk. The nav bar steps out of the way, so
  // the journey screen can stay as quiet as it is meant to be.
  const [walking, setWalking] = useState(false)

  function selectTab(next) {
    setTab(next)
    // Tapping Home always means the landing page, not wherever you left off.
    if (next === "home") {
      setPage("home")
    }
  }

  let content
  if (tab === "map") {
    content = <CityMap />
  } else if (tab === "journeys") {
    content = (
      <JourneyFlow
        journeys={JOURNEYS}
        label="EXPLORE JOURNEYS"
        note="Every journey currently walkable in Tokyo."
        onWalkingChange={setWalking}
      />
    )
  } else if (page === "test") {
    content = <Questionnaire onWalkingChange={setWalking} />
  } else if (page === "discover") {
    content = <DiscoverPage onTakeTest={() => setPage("test")} />
  } else {
    content = <HomePage onDiscover={() => setPage("discover")} />
  }

  return (
    <>
      {content}
      {!walking && <NavBar tab={tab} onSelect={selectTab} />}
    </>
  )
}

function DiscoverPage({ onTakeTest }) {
  return (
    <div className="discoverPage">
      <div className="main">
        <div className="header">
          <h1 className="title">GLOBE FOCUSED</h1>
          <p className="subtitle">JAPAN</p>
        </div>
        <h1 className="mainHook">Discover Your Journey</h1>
        <p className="msg">"Every traveler experiences Japan differently."</p>
        <p className="msg">
          Answer a few simple questions, and we'll find the kind of journey that fits you.
        </p>
        <div className="icons">
          <div className="iconContainer">
            <img src={sceneryLogo}></img>
            <p>What kind of scenery?</p>
          </div>
          <div className="iconContainer">
            <img src={exploreLogo}></img>
            <p>How do you like to explore?</p>
          </div>
          <div className="iconContainer">
            <img src={experienceLogo}></img>
            <p>What kind of experience?</p>
          </div>
        </div>
        <div className="divider"></div>
      </div>
      <div className="testTakeBtnContainer">
        <h1 className="mainHook">Ready to discover yours?</h1>
        <button
        className="introBtn"
        onClick={onTakeTest}
        >
          TAKE THE TEST ➜
        </button>
      </div>
    </div>
  )
}

function HomePage({ onDiscover }) {
  return (
    <div className="homePage">
      <div className="top">
        <div className="header">
          <h1 className="title">GLOBE FOCUSED</h1>
          <p className="subtitle">JAPAN</p>
        </div>
        <div className="topMain">
          <h1 className="mainHook">Unforgettable experiences <br/>in Japan</h1>
          <p className="subHook">Curated. Authentic. Unforgettable.</p>
          <div className="introBtnContainer">
            <button
            className="introBtn"
            onClick={onDiscover}
            >
              DISCOVER ROUTES FOR YOU ➜
            </button>
          </div>
        </div>
      </div>
      <div className="body">

      </div>
      <div className="bottom">

      </div>
    </div>
  )
}

export default App
