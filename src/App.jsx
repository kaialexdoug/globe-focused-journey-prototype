import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import chureitoImg from './assets/chureito-pagoda-sunset.jpeg'
import './App.css'

function App() {
  const [page, setPage] = useState("home")

  if (page === "discover") {
    return (
      <div className="discoverPage">
        <h1>Discover Your Journey</h1>
        <p>Every traveler experiences Japan differently.</p>
        <p>
          Answer a few simple questions, and we'll find the kind of journey that fits you.
        </p>
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
