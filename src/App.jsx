import { useState } from 'react'
import chureitoImg from './assets/chureito-pagoda-sunset.jpeg'
import sceneryLogo from './assets/nature_icon.svg';
import exploreLogo from './assets/scenic_routes_icon.svg';
import experienceLogo from './assets/weird_and_wonderful_icon.svg';
import './App.css'

function App() {
  const [page, setPage] = useState("home")
  
  if (page === "test") {
    return (
      <div className="testPage">
        <div className="header">
          <h1 className="title">GLOBE FOCUSED</h1>    
          <p className="subtitle">JAPAN</p>
        </div>
        <div className="testHeaderContainer">
          <h1 className="testHeader">Discover your travel self.</h1>
          <div className="divider"></div>
        </div>
        <div className="questionContainer">
          <p className="questionText">Would you consider yourself a "people person?"</p>          
          <div className="answerBtnContainer">
            <button className="answerBtn">
              <span>Yes, absolutely!</span>
              <span>&gt;</span>
            </button>
            <button className="answerBtn">
              <span>Mostly, yeah.</span>
              <span>&gt;</span>
            </button>
            <button className="answerBtn">
              <span>Somewhere in between.</span>
              <span>&gt;</span>
            </button>
            <button className="answerBtn">
              <span>Not really.</span>
              <span>&gt;</span>
            </button>
            <button className="answerBtn">
              <span>Definitely not.</span>
              <span>&gt;</span>
            </button>
          </div>
          <div className="progressBar">

          </div>
        </div>
      </div>
    )
  }

  if (page === "discover") {
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
          onClick={() => setPage("test")}
          >
            TAKE THE TEST ➜
          </button>
        </div>
      </div>
    )
  }

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
            onClick={() => setPage("discover")}
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
