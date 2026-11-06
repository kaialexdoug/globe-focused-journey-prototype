import { useState } from 'react'
import { QUESTIONS, CATEGORIES, getMaxScores, pickRoute, rankByFit } from './quizData'
import { JOURNEYS } from './journeys'
import JourneyFlow from './JourneyFlow.jsx'

// Worked out once, when the module loads, because it never changes.
const MAX_SCORES = getMaxScores()

// How many journeys to put in front of someone after the quiz. The spec asks
// for a short list, not a feed — the Journeys tab is where all of them live.
const JOURNEYS_SHOWN = 3

// A fresh score sheet with every category on zero.
function emptyScores() {
  const scores = {}
  for (const category of CATEGORIES) {
    scores[category.id] = 0
  }
  return scores
}

function Questionnaire({ onWalkingChange }) {
  // Which question we're on. Once it passes the last question, we show results.
  const [questionIndex, setQuestionIndex] = useState(0)
  const [scores, setScores] = useState(emptyScores())

  const finished = questionIndex >= QUESTIONS.length

  function handleAnswer(answer) {
    // Add this answer's points onto the running totals.
    const updated = { ...scores }
    for (const categoryId in answer.scores) {
      updated[categoryId] += answer.scores[categoryId]
    }
    setScores(updated)
    setQuestionIndex(questionIndex + 1)
  }

  function restart() {
    setScores(emptyScores())
    setQuestionIndex(0)
  }

  return (
    <div className="testPage">
      <div className="header">
        <h1 className="title">GLOBE FOCUSED</h1>
        <p className="subtitle">JAPAN</p>
      </div>
      {finished ? (
        <Results
          scores={scores}
          onRestart={restart}
          onWalkingChange={onWalkingChange}
        />
      ) : (
        <Question
          question={QUESTIONS[questionIndex]}
          questionIndex={questionIndex}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  )
}

// The strapline with the line running through it, above a screen's content.
function SectionHeader({ text }) {
  return (
    <div className="testHeaderContainer">
      <h1 className="testHeader">{text}</h1>
      <div className="divider"></div>
    </div>
  )
}

// One question, its five answers, and the progress bar underneath.
function Question({ question, questionIndex, onAnswer }) {
  const questionNumber = questionIndex + 1
  const progress = (questionNumber / QUESTIONS.length) * 100

  return (
    <div className="questionContainer">
      <SectionHeader text="Discover your travel self." />
      <p className="questionText">{question.text}</p>
      <div className="answerBtnContainer">
        {question.answers.map((answer) => (
          <button
            key={answer.text}
            className="answerBtn"
            onClick={() => onAnswer(answer)}
          >
            <span>{answer.text}</span>
            <span>&gt;</span>
          </button>
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

// A simple results state: the recommended journey plus the trait breakdown
// behind it, so the scoring is visible while this is still a prototype.
function Results({ scores, onRestart, onWalkingChange }) {
  const route = pickRoute(scores, MAX_SCORES)
  const [showJourneys, setShowJourneys] = useState(false)

  // Everything past this point — the journeys, the map, the walk itself —
  // lives in JourneyFlow.
  if (showJourneys) {
    return (
      <JourneyFlow
        journeys={rankByFit(JOURNEYS, scores, MAX_SCORES).slice(0, JOURNEYS_SHOWN)}
        label="JOURNEYS FOR YOU"
        note="Available now in Tokyo. Ordered by how well they suit your answers."
        onBack={() => setShowJourneys(false)}
        onWalkingChange={onWalkingChange}
      />
    )
  }

  return (
    <div className="resultContainer">
      <SectionHeader text="Your travel self." />
      <p className="resultLabel">YOUR JOURNEY</p>
      <h1 className="mainHook">{route.name}</h1>
      <p className="resultTagline">{route.tagline}</p>
      <p className="resultText">{route.description}</p>
      <p className="resultExamples">{route.examples}</p>

      <div className="testTakeBtnContainer">
        <button className="introBtn" onClick={() => setShowJourneys(true)}>
          SEE YOUR JOURNEYS ➜
        </button>
      </div>

      <div className="divider"></div>

      <div className="traitList">
        {CATEGORIES.map((category) => (
          <Trait
            key={category.id}
            category={category}
            score={scores[category.id]}
          />
        ))}
      </div>

      <div className="testTakeBtnContainer">
        <button className="introBtn" onClick={onRestart}>
          TAKE THE TEST AGAIN ➜
        </button>
      </div>
    </div>
  )
}

// One trait, drawn as a small bar that fills out from the centre: left of
// centre for a negative score, right of centre for a positive one.
function Trait({ category, score }) {
  const ratio = score / MAX_SCORES[category.id] // between -1 and 1
  const width = Math.abs(ratio) * 50
  const left = ratio >= 0 ? 50 : 50 - width

  return (
    <div className="trait">
      <p className="traitName">{category.name}</p>
      <div className="traitTrack">
        <div
          className="traitFill"
          style={{ left: `${left}%`, width: `${width}%` }}
        ></div>
      </div>
      <div className="traitEnds">
        <span>{category.low}</span>
        <span>{category.high}</span>
      </div>
    </div>
  )
}

export default Questionnaire
