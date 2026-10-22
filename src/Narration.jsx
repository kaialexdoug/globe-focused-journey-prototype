import { Fragment, useEffect, useMemo, useRef, useState } from 'react'

// Reads a stop's narration aloud with the browser's own voice, lighting up
// each word as it's said.
//
// The browser's own pause() and resume() aren't used: Android Chrome ignores
// pause(), and desktop Chrome can cut a long utterance off after about 15
// seconds. Instead each paragraph is spoken on its own, pausing stops the
// voice and remembers the word it was on, and playing again speaks from that
// word.

const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window

// Every word in a paragraph, with where it starts in the paragraph's text, so
// the voice's position can be turned back into a word to light up.
function splitWords(text) {
  const words = []
  const pattern = /\S+/g
  let match
  while ((match = pattern.exec(text))) {
    words.push({ text: match[0], start: match.index })
  }
  return words
}

// The device's usual English voice if it has one, otherwise one that runs on
// the device itself. Online voices (like Chrome's "Google" ones) often don't
// say which word they're on, so they come last.
function pickVoice(voices) {
  const lang = (voice) => voice.lang.replace('_', '-')
  const english = voices.filter((voice) => lang(voice).startsWith('en'))
  return (
    english.find((voice) => voice.default) ||
    english.find((voice) => lang(voice) === 'en-US' && voice.localService) ||
    english.find((voice) => voice.localService) ||
    english.find((voice) => lang(voice) === 'en-US') ||
    english[0] ||
    null
  )
}

const START = { paragraph: 0, word: 0 }

// What scrolls the narration: the pull-up panel it's in on a journey stop
// (BottomSheet.jsx), or otherwise the page, which scrolls inside .screen
// (see App.jsx) rather than the window.
function scrollerAround(element) {
  return element.closest('.sheetBody') ?? element.closest('.screen')
}

function Narration({ paragraphs }) {
  const words = useMemo(() => paragraphs.map((paragraph) => splitWords(paragraph.text)), [paragraphs])

  // "stopped" (not started, or finished), "playing" or "paused".
  const [status, setStatus] = useState('stopped')
  // The word being said, or the one to carry on from after a pause.
  const [spot, setSpot] = useState(START)
  // Whether the voice says which word it's on: null until we know. If it
  // doesn't, the whole paragraph being read is lit instead.
  const [hasWordEvents, setHasWordEvents] = useState(null)

  // Bumped every time the voice is stopped, so anything an old, cancelled
  // utterance still reports afterwards is ignored.
  const runRef = useRef(0)
  const voiceRef = useRef(null)
  // Held on to while it's speaking. Chrome can otherwise throw it away early
  // and never say that it finished.
  const utteranceRef = useRef(null)
  const textRef = useRef(null)
  // Whether the page is scrolling along with the voice. It stops if you
  // scroll away yourself, and starts again once the lit word is back in view.
  const followRef = useRef(true)

  // Chrome loads its list of voices a moment after the page does.
  useEffect(() => {
    if (!canSpeak) {
      return
    }
    const synth = window.speechSynthesis
    function chooseVoice() {
      voiceRef.current = pickVoice(synth.getVoices())
    }
    chooseVoice()
    synth.addEventListener('voiceschanged', chooseVoice)
    return () => synth.removeEventListener('voiceschanged', chooseVoice)
  }, [])

  // Nothing keeps talking once you've left the screen.
  useEffect(() => {
    if (!canSpeak) {
      return
    }
    const runs = runRef
    window.speechSynthesis.cancel()
    return () => {
      runs.current++
      window.speechSynthesis.cancel()
    }
  }, [])

  function stopVoice() {
    runRef.current++
    window.speechSynthesis.cancel()
  }

  function speakFrom(paragraph, word) {
    const run = runRef.current
    const offset = words[paragraph][word].start
    const utterance = new SpeechSynthesisUtterance(paragraphs[paragraph].text.slice(offset))
    utterance.lang = 'en-US'
    if (voiceRef.current) {
      utterance.voice = voiceRef.current
    }
    let heardWord = false

    utterance.onstart = () => {
      // Give the voice a moment to report its first word before deciding
      // it never will.
      setTimeout(() => {
        if (run === runRef.current && !heardWord) {
          setHasWordEvents((known) => known ?? false)
        }
      }, 1200)
    }

    utterance.onboundary = (event) => {
      if (run !== runRef.current || event.name !== 'word') {
        return
      }
      heardWord = true
      setHasWordEvents(true)
      const at = offset + event.charIndex
      const list = words[paragraph]
      let index = list.length - 1
      while (index > 0 && list[index].start > at) {
        index--
      }
      setSpot({ paragraph, word: index })
    }

    utterance.onend = () => {
      if (run !== runRef.current) {
        return
      }
      if (paragraph + 1 < paragraphs.length) {
        setSpot({ paragraph: paragraph + 1, word: 0 })
        speakFrom(paragraph + 1, 0)
      } else {
        runRef.current++
        setStatus('stopped')
        setSpot(START)
      }
    }

    utterance.onerror = (event) => {
      // Cancelling (pause, restart, leaving) also lands here.
      if (run !== runRef.current || event.error === 'interrupted' || event.error === 'canceled') {
        return
      }
      runRef.current++
      setStatus('paused')
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  function playFrom(from) {
    stopVoice()
    followRef.current = true
    setSpot(from)
    setStatus('playing')
    speakFrom(from.paragraph, from.word)
  }

  function pause() {
    stopVoice()
    setStatus('paused')
  }

  // Keeps the lit word on screen. When it's about to go off the bottom, the
  // page scrolls so it sits about a third of the way down.
  useEffect(() => {
    if (status !== 'playing') {
      return
    }
    const lit = textRef.current.querySelector('.isSpoken')
    const screen = lit && scrollerAround(lit)
    if (!screen) {
      return
    }
    const word = lit.getBoundingClientRect()
    const view = screen.getBoundingClientRect()
    if (word.top >= view.top && word.bottom <= view.bottom - 48) {
      followRef.current = true
      return
    }
    if (!followRef.current) {
      return
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    screen.scrollBy({
      top: word.top - view.top - view.height / 3,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [spot, status, hasWordEvents])

  // Scrolling by hand while it plays means you want to look elsewhere.
  useEffect(() => {
    if (status !== 'playing') {
      return
    }
    const screen = scrollerAround(textRef.current)
    if (!screen) {
      return
    }
    function stopFollowing() {
      followRef.current = false
    }
    screen.addEventListener('wheel', stopFollowing, { passive: true })
    screen.addEventListener('touchmove', stopFollowing, { passive: true })
    return () => {
      screen.removeEventListener('wheel', stopFollowing)
      screen.removeEventListener('touchmove', stopFollowing)
    }
  }, [status])

  const isPlaying = status === 'playing'
  const lightParagraph = isPlaying && hasWordEvents === false
  const lightWord = isPlaying && hasWordEvents !== false

  return (
    <>
      {canSpeak && (
        <div className="narrationControls">
          <button
            className={isPlaying ? 'narrationPlay isPlaying' : 'narrationPlay'}
            onClick={isPlaying ? pause : () => playFrom(spot)}
            aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {isPlaying ? (
                <>
                  <rect x="7" y="5.5" width="3.5" height="13" rx="1" />
                  <rect x="13.5" y="5.5" width="3.5" height="13" rx="1" />
                </>
              ) : (
                <path d="M8.5 5.5 L19 12 L8.5 18.5 Z" />
              )}
            </svg>
          </button>
          <button
            className="narrationRestart"
            onClick={() => playFrom(START)}
            aria-label="Restart narration"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12a7 7 0 1 0 2.05-4.95" />
              <path d="M7 3v4h4" />
            </svg>
          </button>
        </div>
      )}

      <div className="bodyText narration" ref={textRef}>
        {paragraphs.map((paragraph, p) => {
          const classes = [paragraph.className]
          if (lightParagraph && spot.paragraph === p) {
            classes.push('isSpoken')
          }
          return (
            <p key={p} className={classes.filter(Boolean).join(' ')}>
              {words[p].map((word, w) => (
                <Fragment key={w}>
                  <span
                    className={
                      lightWord && spot.paragraph === p && spot.word === w ? 'isSpoken' : undefined
                    }
                  >
                    {word.text}
                  </span>{' '}
                </Fragment>
              ))}
            </p>
          )
        })}
      </div>
    </>
  )
}

export default Narration
