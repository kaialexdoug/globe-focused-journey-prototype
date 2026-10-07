import { useEffect, useRef, useState } from 'react'
import { QUESTIONS, TRAITS, PERSONALITIES, scoreTypes, pickType } from './quizData'
import Header from './Header.jsx'

// How long the chosen picture stays highlighted before the next question
// slides in. Long enough to see what you tapped, short enough not to drag.
const PICK_DELAY = 420

function Questionnaire({ onExit, onHome, onSeeJourney }) {
  // One trait id per answered question. Its length is also which question
  // we're on, so going back is just dropping the last pick.
  const [picks, setPicks] = useState([])
  const pageRef = useRef(null)

  const finished = picks.length >= QUESTIONS.length

  // Each new question or the result starts at the top of the screen.
  useEffect(() => {
    pageRef.current.scrollIntoView({ block: 'start' })
  }, [picks.length])

  function goBack() {
    if (picks.length === 0) {
      onExit()
    } else {
      setPicks(picks.slice(0, -1))
    }
  }

  return (
    <div className="quizPage" ref={pageRef}>
      <Header />
      {finished ? (
        <Results picks={picks} onRetake={() => setPicks([])} onHome={onHome} onSeeJourney={onSeeJourney}/>
      ) : (
        <Question
          // A new key per question, so the highlighted pick doesn't carry over.
          key={picks.length}
          question={QUESTIONS[picks.length]}
          questionIndex={picks.length}
          onPick={(trait) => setPicks([...picks, trait])}
          onBack={goBack}
        />
      )}
    </div>
  )
}

// The strapline with the line running through it, above a screen's content.
function SectionHeader({ text }) {
  return (
    <div className="testHeaderContainer">
      <h2 className="testHeader">{text}</h2>
      <div className="divider"></div>
    </div>
  )
}

// One pair of pictures. Tap one and it lights up, the other fades, and then
// we move on.
function Question({ question, questionIndex, onPick, onBack }) {
  const [chosen, setChosen] = useState(null)
  const questionNumber = questionIndex + 1
  const progress = (questionNumber / QUESTIONS.length) * 100

  function choose(trait) {
    if (chosen) {
      return
    }
    setChosen(trait)
    setTimeout(() => onPick(trait), PICK_DELAY)
  }

  return (
    <div className="questionContainer">
      {/* Hidden for the moment between a pick and the next question. */}
      <button className="backBtn" onClick={onBack} disabled={chosen !== null}>
        ‹ BACK
      </button>
      <SectionHeader text="Discover your travel self." />
      <p className="questionText">{question.prompt}</p>

      <div className="photoChoices">
        {question.options.map((option, i) => (
          <PhotoChoice
            key={option.trait}
            option={option}
            state={chosen === null ? '' : chosen === option.trait ? 'isChosen' : 'isFaded'}
            showOr={i === 0}
            onChoose={() => choose(option.trait)}
          />
        ))}
      </div>

      <div className="progress">
        <p className="progressLabel">
          {questionNumber} / {QUESTIONS.length}
        </p>
        <div className="progressBar">
          <div className="progressFill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  )
}

function PhotoChoice({ option, state, showOr, onChoose }) {
  return (
    <>
      <button className={`photoChoice ${state}`} onClick={onChoose}>
        <img src={option.photo} alt="" />
        <span className="photoCaption">
          <span className="photoTrait">{TRAITS[option.trait].toUpperCase()}</span>
          <span className="photoText">{option.caption}</span>
        </span>
      </button>
      {showOr && <p className="orDivider">or</p>}
    </>
  )
}

// The traveler type the quiz landed on, and how closely each of the three
// matched — so the scoring is visible while this is still a prototype.
function Results({ picks, onRetake, onHome, onSeeJourney }) {
  const type = pickType(picks)
  const scores = scoreTypes(picks)
  const matches = scores.find((entry) => entry.personality === type).matches

  return (
    <div className="resultContainer" style={{ '--type-color': type.color }}>
      <SectionHeader text="Your travel self." />

      <div className="resultHero">
        <img src={type.photo} alt="" />
        <div className="resultHeroText">
          <p className="resultLabel">YOUR TRAVELER TYPE</p>
          <h1 className="mainHook">{type.name}</h1>
        </div>
      </div>

      {/* The type's eight traits. Ones you didn't pick are dimmed. */}
      <div className="traitChips">
        {type.traits.map((trait) => (
          <span
            key={trait}
            className={picks.includes(trait) ? 'traitChip' : 'traitChip isMissed'}
          >
            {TRAITS[trait]}
          </span>
        ))}
      </div>

      <p className="resultText">“{type.description}”</p>

      <div className="divider"></div>

      <div className="matchScore">
        <p className="matchHeadline">
          You matched <strong>{matches} of 8</strong> {type.name.replace('The ', '')} traits.
        </p>
        {PERSONALITIES.map((personality) => (
          <MatchBar
            key={personality.id}
            personality={personality}
            matches={scores.find((entry) => entry.personality === personality).matches}
            isYours={personality === type}
          />
        ))}
      </div>

      <div className="testTakeBtnContainer">
        <button className="introBtn" onClick={onSeeJourney}>
          SEE YOUR JOURNEY ➜
        </button>
        <button className="backBtn" onClick={onHome}>
          BACK TO HOME
        </button>
      </div>
    </div>
  )
}

function MatchBar({ personality, matches, isYours }) {
  return (
    <div className={isYours ? 'matchRow isYours' : 'matchRow'}>
      <div className="matchRowTop">
        <span className="matchName">{personality.name}</span>
        <span className="matchCount">{matches} / 8</span>
      </div>
      <div className="matchTrack">
        <div
          className="matchFill"
          style={{ width: `${(matches / 8) * 100}%`, backgroundColor: personality.color }}
        ></div>
      </div>
    </div>
  )
}

export default Questionnaire
