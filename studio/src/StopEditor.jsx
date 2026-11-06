import { useEffect, useRef, useState } from 'react'
import { PencilIcon } from './Icons.jsx'
import { missingStopFields } from './journeyStore.js'
import StopFields, { MissingNote } from './StopFields.jsx'

// The Step Editor section, for the stop picked in Journey Steps: its title as
// the heading, which you click to change, and its type under that. Changes
// show on its card as you make them, and are kept when you Save, like
// everything else in the editor.
export default function StopEditor({ stop, onChange }) {
  // Its type was chosen when it was confirmed, so that can't be missing.
  const missing = missingStopFields(stop).filter((field) => field !== 'type')

  return (
    <div className="stopEditor">
      <StopTitle title={stop.title} onChange={(title) => onChange({ title })} />
      <StopFields
        idPrefix={`edit-${stop.id}`}
        fields={stop}
        onChange={onChange}
        missing={missing}
        withTitle={false}
      />
      {missing.length > 0 && <MissingNote missing={missing} lead="Don’t forget to " />}
    </div>
  )
}

// The stop's title, as the heading. Clicking it turns it into a box to type
// in, right where it is, and the title changes as you type. Enter, or clicking
// somewhere else, finishes. Escape puts it back how it was before.
function StopTitle({ title, onChange }) {
  const [editing, setEditing] = useState(false)
  // The title before this change, for Escape.
  const beforeRef = useRef(title)
  const inputRef = useRef(null)
  const shown = title.trim() || 'Untitled step'

  // With the title selected, so typing replaces it.
  useEffect(() => {
    if (editing) {
      inputRef.current.select()
    }
  }, [editing])

  if (!editing) {
    return (
      <h3 className="stopEditorTitle">
        <button
          className="stopEditorTitleButton"
          onClick={() => {
            beforeRef.current = title
            setEditing(true)
          }}
          aria-label={`${shown}, change the title`}
        >
          <span>{shown}</span>
          <PencilIcon />
        </button>
      </h3>
    )
  }

  return (
    <input
      ref={inputRef}
      className="stopEditorTitleInput"
      value={title}
      onChange={(event) => onChange(event.target.value)}
      onBlur={() => setEditing(false)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          setEditing(false)
        } else if (event.key === 'Escape') {
          onChange(beforeRef.current)
          setEditing(false)
        }
      }}
      placeholder="Untitled step"
      maxLength={80}
      autoComplete="off"
      aria-label="Step title"
      autoFocus
    />
  )
}
