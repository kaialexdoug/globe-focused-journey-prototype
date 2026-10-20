import { useState } from 'react'

import Header, { SectionHeader } from './Header.jsx'

// The survey at the end of a journey: the person's name, then three
// questions, one at a time. ← PREVIOUS goes back a step with the answers
// kept, and NEXT → stays greyed out until there's an answer. FINISH SURVEY
// sends it all, with which traveler type and detours they had, to a Google
// Sheet.

// Where the answers go: a small Google Apps Script web app attached to the
// sheet, which adds each survey as a row. Its code is in
// google-apps-script/survey.gs.
const SURVEY_URL =
  'https://script.google.com/macros/s/AKfycbzSH98EjBgXxcfZ13B5ruOcEZkJ56cR4moBZIMTF14QqAjrmSFqwtercNYgjBiHFICbOQ/exec'

// `type` is "text" for a typed answer, or "choice" to pick one of `options`.
const QUESTIONS = [
  {
    id: 'standout',
    prompt: 'What stood out most to you today?',
    type: 'text',
  },
  {
    id: 'anotherJourney',
    prompt: 'Would you want to do another journey like this?',
    type: 'choice',
    options: ['Yes', 'Maybe', 'No'],
  },
  {
    id: 'wouldBuy',
    prompt:
      'If this journey had cost $5 (¥500), would you have bought it instead of planning the day yourself? Why or why not?',
    type: 'text',
  },
]

// With a profile (`profileName`), it already knows the name, so it starts
// straight at the first question.
function SurveyPage({ journey, travelerType, detoursTaken, profileName, onBack, onHome }) {
  // 0 is the name; 1 onwards are the questions.
  const firstStep = profileName ? 1 : 0
  const [step, setStep] = useState(firstStep)
  const [name, setName] = useState(profileName ?? '')
  const [answers, setAnswers] = useState({})
  // "ready", "sending", "failed" (try again) or "sent".
  const [status, setStatus] = useState('ready')

  const question = step > 0 ? QUESTIONS[step - 1] : null
  const isLast = step === QUESTIONS.length
  const answer = question ? (answers[question.id] ?? '') : name
  const answered = answer.trim() !== ''

  function setAnswer(value) {
    if (question) {
      setAnswers({ ...answers, [question.id]: value })
    } else {
      setName(value)
    }
  }

  function goBack() {
    setStatus('ready')
    if (step === firstStep) {
      onBack()
    } else {
      setStep(step - 1)
    }
  }

  async function finish() {
    setStatus('sending')
    const detours = journey.route
      .flatMap((stop) => stop.detours ?? [])
      .filter((detour) => detoursTaken.includes(detour.id))
      .map((detour) => detour.name)

    try {
      const response = await fetch(SURVEY_URL, {
        method: 'POST',
        // Sent as plain text, not JSON: Apps Script can't answer the extra
        // check a browser makes first for JSON, and reads it the same anyway.
        body: JSON.stringify({
          name: name.trim(),
          standout: (answers.standout ?? '').trim(),
          anotherJourney: answers.anotherJourney ?? '',
          wouldBuy: (answers.wouldBuy ?? '').trim(),
          travelerType: travelerType ? travelerType.name : 'Didn’t take the quiz',
          detoursTaken: detours.length > 0 ? detours.join(', ') : 'None',
          journey: journey.name,
        }),
      })
      // Anything but the script's {"ok": true} (like Google's error page, if
      // the script isn't deployed) means it wasn't saved.
      const reply = await response.text()
      let saved = false
      try {
        saved = JSON.parse(reply).ok === true
      } catch {
        saved = false
      }
      if (!saved) {
        throw new Error(`The survey wasn’t saved. The web app replied: ${reply.slice(0, 200)}`)
      }
      setStatus('sent')
    } catch (error) {
      // The real reason, for whoever's looking in the browser's console.
      console.error('Survey not sent:', error)
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div className="surveyPage">
        <Header />
        <div className="pageBody">
          <SectionHeader text="Survey" />
          <div className="surveyDone">
            <h1 className="mainHook">Thanks, {name.trim()}!</h1>
            <p>Your answers have been saved.</p>
            <button className="introBtn" onClick={onHome}>
              BACK TO HOME
            </button>
          </div>
        </div>
      </div>
    )
  }

  let nextLabel = 'NEXT →'
  if (isLast) {
    nextLabel = { ready: 'FINISH SURVEY', sending: 'SENDING…', failed: 'TRY AGAIN' }[status]
  }

  return (
    <div className="surveyPage">
      <Header />

      <div className="pageBody">
        <SectionHeader text="Survey" />

        {/* Keyed by step, so each one slides in. */}
        <div className="surveyStep" key={step}>
          {question ? (
            <>
              <p className="surveyLabel">
                QUESTION {step} OF {QUESTIONS.length}
              </p>
              <div className="progressBar">
                <div className="progressFill" style={{ width: `${(step / QUESTIONS.length) * 100}%` }}></div>
              </div>
            </>
          ) : (
            <p className="surveyLabel">BEFORE WE START</p>
          )}

          <label className="surveyPrompt" id="surveyPrompt" htmlFor="surveyAnswer">
            {question ? question.prompt : 'What’s your name?'}
          </label>

          {!question && (
            <input
              id="surveyAnswer"
              className="surveyInput"
              type="text"
              autoComplete="given-name"
              maxLength={80}
              placeholder="Your name"
              value={name}
              onChange={(event) => setAnswer(event.target.value)}
              // Enter is the same as NEXT.
              onKeyDown={(event) => {
                if (event.key === 'Enter' && answered) {
                  setStep(1)
                }
              }}
            />
          )}

          {question?.type === 'text' && (
            <textarea
              id="surveyAnswer"
              className="surveyInput surveyTextarea"
              maxLength={2000}
              placeholder="Type your answer…"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
            ></textarea>
          )}

          {question?.type === 'choice' && (
            <div className="surveyChoices" role="radiogroup" aria-labelledby="surveyPrompt">
              {question.options.map((option) => (
                <button
                  key={option}
                  className={answer === option ? 'surveyChoice isChosen' : 'surveyChoice'}
                  role="radio"
                  aria-checked={answer === option}
                  onClick={() => setAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {status === 'failed' && (
            <p className="surveyError" role="alert">
              We couldn’t save your answers just now. Please try again in a moment. Nothing
              you’ve written has been lost.
            </p>
          )}

          {/* From the first step, ← PREVIOUS goes back to the Memory page. */}
          <div className="surveyNav">
            <button className="introBtn isGhost" onClick={goBack} disabled={status === 'sending'}>
              ← PREVIOUS
            </button>
            <button
              className="introBtn"
              disabled={!answered || status === 'sending'}
              onClick={isLast ? finish : () => setStep(step + 1)}
            >
              {nextLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SurveyPage
