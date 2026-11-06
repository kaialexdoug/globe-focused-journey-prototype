import { useCallback, useEffect, useRef, useState } from 'react'
import JourneyEditor from './JourneyEditor.jsx'
import JourneyLibrary from './JourneyLibrary.jsx'
import { createJourney, deleteJourney, getJourney, listJourneys } from './journeyStore.js'
import StudioBrand from './StudioBrand.jsx'
import './App.css'

// Which screen to show comes from the address: the Journey Library on its
// own, or a journey's editor with "#/journey/" and its id on the end. So
// refreshing keeps you where you were, and Back and Forward work. (After a
// "#" rather than as its own path, since GitHub Pages only has the one page.)
function readScreen() {
  const match = window.location.hash.match(/^#\/journey\/(.+)$/)
  return match ? { journeyId: decodeURIComponent(match[1]) } : { journeyId: null }
}

// Unfold Studio, where the Unfold team makes and edits journeys. It's made for
// a laptop.
export default function App() {
  const [journeys, setJourneys] = useState(listJourneys)
  const [screen, setScreen] = useState(readScreen)
  // While the editor's open: whether it has unsaved changes, and how to ask
  // about them (from JourneyEditor.jsx).
  const editorGuardRef = useRef(null)
  // The address of the screen being shown, to come back to if Back has to ask
  // about unsaved changes first.
  const shownHashRef = useRef(window.location.hash)

  const registerGuard = useCallback((guard) => {
    editorGuardRef.current = guard
  }, [])

  // Each time the screen changes, the journeys are read again, so the Library
  // shows what was just saved in the editor.
  const show = useCallback(() => {
    shownHashRef.current = window.location.hash
    setScreen(readScreen())
    setJourneys(listJourneys())
  }, [])

  useEffect(() => {
    const onBackOrForward = () => {
      const guard = editorGuardRef.current
      if (guard?.hasUnsaved()) {
        // Back to the editor, and ask first, the same as its Exit.
        window.history.pushState(null, '', `${window.location.pathname}${shownHashRef.current}`)
        guard.askToExit()
        return
      }
      show()
    }
    window.addEventListener('popstate', onBackOrForward)
    return () => window.removeEventListener('popstate', onBackOrForward)
  }, [show])

  function goTo(hash) {
    window.history.pushState(null, '', `${window.location.pathname}${hash}`)
    show()
    window.scrollTo(0, 0)
  }

  const openJourney = (id) => goTo(`#/journey/${encodeURIComponent(id)}`)
  const goHome = () => goTo('')

  // An id that isn't there any more, like a new journey from another browser,
  // shows the Library.
  const journey = screen.journeyId ? getJourney(screen.journeyId) : null

  // The editor exactly fills the window, so each of its sections scrolls on its
  // own, and it has its own bar across the top. The Library scrolls as one page.
  if (journey) {
    return (
      <div className="studio isEditing">
        <JourneyEditor
          key={journey.id}
          journey={journey}
          onExit={goHome}
          onSaved={() => setJourneys(listJourneys())}
          registerGuard={registerGuard}
        />
      </div>
    )
  }

  return (
    <div className="studio">
      <header className="studioHeader">
        <StudioBrand />
      </header>
      <JourneyLibrary
        journeys={journeys}
        onOpen={openJourney}
        onCreate={(name) => {
          const created = createJourney(name)
          setJourneys(listJourneys())
          openJourney(created.id)
        }}
        onDelete={(id) => {
          deleteJourney(id)
          setJourneys(listJourneys())
        }}
      />
    </div>
  )
}
