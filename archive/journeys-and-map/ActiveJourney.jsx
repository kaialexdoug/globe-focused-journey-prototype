import { useEffect, useState } from 'react'

// How long a 'light' cue stays on screen before it gets out of the way.
const LIGHT_CUE_MS = 7000

// Canned replies for the adaptive controls. There is no rerouting logic in the
// prototype — these exist to show what the moment would feel like.
const ASIDES = {
  hungry:
    'There is a place two streets back that does one thing well. Take as long as you like; the journey will still be here.',
  skip: 'Skipped. Keep walking — the next one is not far.',
  stay: 'Staying here. Nothing moves until you say so.',
}

// Screen 3: the journey itself. The screen is quiet by default — a few dots,
// a faint word, and nothing else. It only speaks at a beat.
function ActiveJourney({ journey, onFinish, onLeave }) {
  // Which beat we are walking towards, and whether we have arrived at it.
  const [beatIndex, setBeatIndex] = useState(0)
  const [phase, setPhase] = useState('walking') // 'walking' | 'beat'
  const [seen, setSeen] = useState(0)

  // The guidance cue is worked out rather than stored: `peeked` is the walker
  // tapping the corner button, `cueTimedOut` is a 'light' cue getting out of
  // the way again on its own.
  const [peeked, setPeeked] = useState(false)
  const [cueTimedOut, setCueTimedOut] = useState(false)
  const [aside, setAside] = useState(null)
  const [staying, setStaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [audioNote, setAudioNote] = useState(false)

  const beat = journey.beats[beatIndex]
  const lastBeat = beatIndex === journey.beats.length - 1

  // How much the app says on its own while walking towards this beat. The
  // level is set by hand per beat — see the note at the top of journeys.js.
  //
  //   directive — leave the direction up, this bit is easy to get wrong
  //   light     — show it, then let it fade back out
  //   silent    — say nothing at all unless they ask
  const autoCue =
    beat.guidance_intensity === 'directive' ||
    (beat.guidance_intensity === 'light' && !cueTimedOut)

  const showCue = phase === 'walking' && (autoCue || peeked)

  // The only timer in here: a 'light' cue stepping back after a few seconds.
  useEffect(() => {
    if (phase !== 'walking' || beat.guidance_intensity !== 'light') {
      return
    }
    const timer = setTimeout(() => setCueTimedOut(true), LIGHT_CUE_MS)
    return () => clearTimeout(timer)
  }, [phase, beat])

  // Everything a new beat resets.
  function moveTo(index) {
    setBeatIndex(index)
    setPhase('walking')
    setPeeked(false)
    setCueTimedOut(false)
    setAudioNote(false)
  }

  function arrive() {
    setPhase('beat')
    setPeeked(false)
    setAside(null)
    setAudioNote(false)
    setSeen(seen + 1)
  }

  function carryOn() {
    if (lastBeat) {
      onFinish(seen)
      return
    }
    moveTo(beatIndex + 1)
  }

  function skip() {
    if (lastBeat) {
      onFinish(seen)
      return
    }
    setAside(ASIDES.skip)
    moveTo(beatIndex + 1)
  }

  if (paused) {
    return (
      <div className="activeScreen isPaused">
        <p className="pausedLabel">JOURNEY PAUSED</p>
        <p className="pausedText">{journey.title}</p>
        <button className="introBtn" onClick={() => setPaused(false)}>
          RESUME JOURNEY ➜
        </button>
        {/* The nav bar is hidden during a walk, so this is the way back out. */}
        <button className="backBtn" onClick={onLeave}>
          LEAVE JOURNEY
        </button>
      </div>
    )
  }

  return (
    <div className="activeScreen">
      {/* The only thing on screen the whole way through: how far along we are. */}
      <div className="beatDots">
        {journey.beats.map((item, index) => (
          <span
            key={item.id}
            className={
              index < beatIndex || (index === beatIndex && phase === 'beat')
                ? 'beatDot isDone'
                : 'beatDot'
            }
          ></span>
        ))}
      </div>

      {phase === 'beat' ? (
        <div className="beatPanel">
          <p className="beatWhere">{beat.location_label}</p>
          <p className="beatLine">{beat.text_line}</p>

          {/* Narration is stubbed for the prototype — no audio recorded yet. */}
          <button className="audioBtn" onClick={() => setAudioNote(!audioNote)}>
            ♪ LISTEN
          </button>
          {audioNote && (
            <p className="audioNote">No narration recorded for this one yet.</p>
          )}

          <button className="introBtn" onClick={carryOn}>
            {lastBeat ? 'FINISH JOURNEY ➜' : 'CARRY ON ➜'}
          </button>
        </div>
      ) : (
        <div className="walkingPanel">
          <p className="walkingWord">{staying ? 'staying' : 'walking'}</p>

          {showCue && <p className="cueLine">{beat.guidance_cue}</p>}

          {!staying && (
            <button className="arriveBtn" onClick={arrive}>
              I&apos;M THERE
            </button>
          )}
        </div>
      )}

      {aside && <p className="asideLine">{aside}</p>}

      {/* Always here, never in the way. */}
      <div className="journeyControls">
        <button
          className="controlBtn"
          onClick={() => {
            setStaying(!staying)
            setAside(staying ? null : ASIDES.stay)
          }}
        >
          {staying ? 'CARRY ON' : 'STAY HERE'}
        </button>
        <button className="controlBtn" onClick={() => setAside(ASIDES.hungry)}>
          I&apos;M HUNGRY
        </button>
        <button className="controlBtn" onClick={skip}>
          SKIP THIS
        </button>
        <button className="controlBtn" onClick={() => setPaused(true)}>
          PAUSE
        </button>
      </div>

      {/* The peek. One corner button, no map — just the next direction. */}
      {phase === 'walking' && (
        <button
          className="peekBtn"
          onClick={() => setPeeked(!peeked)}
          aria-label="Which way?"
        >
          ◎
        </button>
      )}
    </div>
  )
}

export default ActiveJourney
