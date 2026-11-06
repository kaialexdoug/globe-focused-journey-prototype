import { useEffect, useRef, useState } from 'react'
import ExitDialog from './ExitDialog.jsx'
import { ExitIcon, PencilIcon, SaveIcon } from './Icons.jsx'
import JourneyNameDialog from './JourneyNameDialog.jsx'
import { madeInStudio, saveJourney } from './journeyStore.js'
import StopEditor from './StopEditor.jsx'
import StopList from './StopList.jsx'
import StudioBrand from './StudioBrand.jsx'

// Where a journey gets edited.
//
// Along the top: Exit, the journey's name (click it to rename the journey),
// and Save, with when it was last saved. Changes to the name and the stops
// aren't kept until Save. Exit asks whether to save first, if there's anything
// to save, and so does going Back (`registerGuard` lets the rest of the studio
// ask). Closing or refreshing the tab with unsaved changes gets the browser's
// own "leave site?" warning.
//
// Under that, three sections side by side, with a faint line between each, and
// each one's name in a faint strip across its top. On the left, a fifth of the
// width, the journey's stops: click one to pick it. In the middle, the Stop
// Editor, with the picked stop's type and title to change. On the right, a
// live view of it as it'll look in the app, which is empty for now.
//
// Only a journey made in the studio can be changed. The app's own journeys are
// its files, so for now it says so instead.
export default function JourneyEditor({ journey, onExit, onSaved, registerGuard }) {
  const canChange = madeInStudio(journey)
  const [name, setName] = useState(journey.name)
  const [stops, setStops] = useState(journey.stops ?? [])
  // As it was last saved, to tell whether anything's changed since.
  const [saved, setSaved] = useState({ name: journey.name, stops: journey.stops ?? [], at: journey.savedAt })
  // The stop picked in Journey Steps, open in the Step Editor.
  const [selectedId, setSelectedId] = useState(null)
  const [renaming, setRenaming] = useState(false)
  // Which question Exit is asking: 'ask' or 'warn' (see ExitDialog.jsx).
  const [exitStep, setExitStep] = useState(null)

  const selectedStop = stops.find((stop) => stop.id === selectedId) ?? null

  function changeStop(id, changes) {
    setStops(stops.map((stop) => (stop.id === id ? { ...stop, ...changes } : stop)))
  }

  const hasUnsaved = canChange && (name !== saved.name || JSON.stringify(stops) !== JSON.stringify(saved.stops))

  // So going Back asks about unsaved changes, the same as Exit.
  const hasUnsavedRef = useRef(hasUnsaved)
  useEffect(() => {
    hasUnsavedRef.current = hasUnsaved
  })
  useEffect(() => {
    registerGuard({ hasUnsaved: () => hasUnsavedRef.current, askToExit: () => setExitStep('ask') })
    return () => registerGuard(null)
  }, [registerGuard])

  // Closing or refreshing the tab.
  useEffect(() => {
    if (!hasUnsaved) {
      return
    }
    const warn = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [hasUnsaved])

  function save() {
    const result = saveJourney(journey.id, { name, stops })
    setName(result.name)
    setStops(result.stops)
    setSaved({ name: result.name, stops: result.stops, at: result.savedAt })
    onSaved()
  }

  function exit() {
    if (hasUnsaved) {
      setExitStep('ask')
    } else {
      onExit()
    }
  }

  return (
    <>
      <header className="studioHeader">
        <StudioBrand />
        <button className="studioExit" onClick={exit}>
          <ExitIcon />
          Exit
        </button>
        {/* After Exit, like the next step along: "Exit / Untitled journey". */}
        <div className="studioCrumb">
          {canChange ? (
            <button
              className="studioJourneyName isEditable"
              onClick={() => setRenaming(true)}
              aria-label={`${name}, rename this journey`}
            >
              <span className="studioJourneyNameText">{name}</span>
              <PencilIcon />
            </button>
          ) : (
            <span className="studioJourneyName">{name}</span>
          )}
        </div>

        <div className="editorSaveArea">
          {canChange ? (
            <>
              <p className="editorSavedAt" aria-live="polite">
                {hasUnsaved && <span className="editorUnsaved">Unsaved changes</span>}
                {lastSaved(saved.at)}
              </p>
              <button className="editorSave" onClick={save}>
                <SaveIcon />
                Save
              </button>
            </>
          ) : (
            <p className="editorSavedAt">From the app’s own files, so it can’t be changed here yet</p>
          )}
        </div>
      </header>

      <main className="editor">
        <EditorSection title="Journey Steps">
          {canChange ? (
            <StopList stops={stops} onStopsChange={setStops} selectedId={selectedId} onSelect={setSelectedId} />
          ) : (
            <p className="editorNote">
              This journey’s steps are in the app’s own files, so they can’t be changed here yet.
            </p>
          )}
        </EditorSection>
        <EditorSection title="Step Editor">
          {canChange &&
            (selectedStop ? (
              <StopEditor
                key={selectedStop.id}
                stop={selectedStop}
                onChange={(changes) => changeStop(selectedStop.id, changes)}
              />
            ) : (
              <p className="editorNote">
                {stops.length > 0
                  ? 'Click a step in Journey Steps to change it here.'
                  : 'Add a step in Journey Steps, then click it to change it here.'}
              </p>
            ))}
        </EditorSection>
        <EditorSection title="Live View" />
      </main>

      {renaming && (
        <JourneyNameDialog
          title="Rename journey"
          startName={name}
          blankName={name}
          renamingId={journey.id}
          confirmLabel="Confirm"
          onConfirm={(newName) => {
            setName(newName)
            setRenaming(false)
          }}
          onCancel={() => setRenaming(false)}
        />
      )}

      {exitStep && (
        <ExitDialog
          step={exitStep}
          onSaveAndExit={() => {
            save()
            onExit()
          }}
          onExitWithoutSaving={() => setExitStep('warn')}
          onLoseChanges={onExit}
          onKeepEditing={() => setExitStep(null)}
        />
      )}
    </>
  )
}

// "Last saved at 3:42 PM" today, or "Last saved Nov 5 at 3:42 PM" before.
function lastSaved(when) {
  if (!when) {
    return 'Not saved yet'
  }
  const date = new Date(when)
  const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  if (date.toDateString() === new Date().toDateString()) {
    return `Last saved at ${time}`
  }
  return `Last saved ${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} at ${time}`
}

// A section's name in its strip, with what's in it under that, which scrolls
// on its own if it's too long for the window.
function EditorSection({ title, children }) {
  return (
    <section className="editorSection" aria-label={title}>
      <h2 className="editorSectionTitle">{title}</h2>
      <div className="editorSectionBody">{children}</div>
    </section>
  )
}
