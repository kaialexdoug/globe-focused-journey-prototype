import { useEffect, useRef, useState } from 'react'
import Dialog from './Dialog.jsx'
import { uniqueName } from './journeyStore.js'

// The box for a journey's name: Create new journey's, and renaming one from
// the editor. It starts with `startName` selected, so typing replaces it, and
// left blank it's `blankName`. If another journey's already called that, it
// says what this one will be called instead, like "Untitled journey (1)".
// When renaming, `renamingId` is the journey's id, so its own name doesn't
// count as taken.
export default function JourneyNameDialog({
  title,
  startName,
  blankName,
  renamingId = null,
  confirmLabel,
  onConfirm,
  onCancel,
}) {
  const inputRef = useRef(null)
  const [name, setName] = useState(startName)

  useEffect(() => {
    inputRef.current.select()
  }, [])

  const wanted = name.trim() || blankName
  const willBeCalled = uniqueName(wanted, renamingId)

  function confirm(event) {
    event.preventDefault()
    onConfirm(willBeCalled)
  }

  return (
    <Dialog titleId="journeyNameTitle" onClose={onCancel}>
      <form className="dialogBox" onSubmit={confirm}>
        <h2 className="dialogTitle" id="journeyNameTitle">
          {title}
        </h2>
        <label className="newJourneyLabel" htmlFor="journeyNameInput">
          Journey name
        </label>
        <input
          ref={inputRef}
          id="journeyNameInput"
          className="newJourneyInput"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={blankName}
          maxLength={80}
          autoComplete="off"
        />
        {willBeCalled !== wanted && (
          <p className="newJourneyNote">
            There’s already a journey called “{wanted}”, so this one will be called “{willBeCalled}”.
          </p>
        )}
        <div className="dialogButtons">
          <button type="button" className="dialogPlain" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="dialogMain">
            {confirmLabel}
          </button>
        </div>
      </form>
    </Dialog>
  )
}
