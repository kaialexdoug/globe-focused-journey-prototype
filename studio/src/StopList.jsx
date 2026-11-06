import { useRef, useState } from 'react'
import AreYouSureDialog from './AreYouSureDialog.jsx'
import { CheckIcon, PlusIcon, TrashIcon } from './Icons.jsx'
import { missingStopFields, newStop, typeLabel } from './journeyStore.js'
import StopFields, { MissingNote } from './StopFields.jsx'

// The Journey Steps section of the editor: a card for each of the journey's
// stops, in order, and Add new step under them.
//
// Add new step makes a temporary card, asking what type of stop it is and
// what it's called. Confirm makes it an official stop, with those details,
// and picks it so it's open in the Step Editor. Cancel throws the temporary
// card away.
//
// An official stop's card shows its details, with Delete, which asks if
// you're sure. Clicking the card picks it, and its details can be changed in
// the Step Editor (`selectedId` is the one picked, and `onSelect` picks one).
//
// The official stops are the editor's (`stops`), and `onStopsChange` changes
// them. They're not saved until the editor's Save. The temporary cards are
// this list's own, and aren't saved at all until they're confirmed.
export default function StopList({ stops, onStopsChange, selectedId, onSelect }) {
  // The temporary cards, after the official ones. `fields` is what's been
  // chosen and typed in, and `showMissing` is whether Confirm was pressed with
  // something not filled in, so it says what.
  const [drafts, setDrafts] = useState([])
  // The stop whose Delete was pressed, while the box asks if you're sure.
  const [deleting, setDeleting] = useState(null)
  const addRef = useRef(null)

  function addStop() {
    const { id, ...fields } = newStop()
    setDrafts([...drafts, { id, fields, showMissing: false }])
  }

  function changeDraft(id, changes) {
    setDrafts(drafts.map((draft) => (draft.id === id ? { ...draft, ...changes } : draft)))
  }

  function confirm(draft) {
    const missing = missingStopFields(draft.fields)
    if (missing.length > 0) {
      changeDraft(draft.id, { showMissing: true })
      document.getElementById(`${draft.id}-${missing[0]}`)?.focus()
      return
    }
    const { type, otherType, title } = draft.fields
    const stop = { id: draft.id, type, otherType: type === 'other' ? otherType.trim() : '', title: title.trim() }
    onStopsChange([...stops, stop])
    setDrafts(drafts.filter((each) => each.id !== draft.id))
    onSelect(stop.id)
    addRef.current.focus()
  }

  function cancel(draft) {
    setDrafts(drafts.filter((each) => each.id !== draft.id))
    addRef.current.focus()
  }

  // Once the are-you-sure box has gone, so the browser doesn't try to put you
  // back on the Delete button that was pressed, which has gone too.
  function remove(stop) {
    onStopsChange(stops.filter((each) => each.id !== stop.id))
    if (selectedId === stop.id) {
      onSelect(null)
    }
    setDeleting(null)
    setTimeout(() => addRef.current?.focus(), 0)
  }

  return (
    <>
      <ol className="stopList">
        {stops.map((stop) => (
          <StopCard
            key={stop.id}
            stop={stop}
            selected={stop.id === selectedId}
            onSelect={() => onSelect(stop.id)}
            onDelete={() => setDeleting(stop)}
          />
        ))}
        {drafts.map((draft) => (
          <NewStopCard
            key={draft.id}
            draft={draft}
            onChange={(changes) => changeDraft(draft.id, { fields: { ...draft.fields, ...changes } })}
            onConfirm={() => confirm(draft)}
            onCancel={() => cancel(draft)}
          />
        ))}
      </ol>
      <button ref={addRef} className="stopAdd" onClick={addStop}>
        <PlusIcon />
        Add new step
      </button>

      {deleting && (
        <AreYouSureDialog
          title="Delete this step?"
          confirmLabel="Delete step"
          onConfirm={() => remove(deleting)}
          onCancel={() => setDeleting(null)}
        >
          “{deleting.title.trim() || 'Untitled step'}” will be taken out of this journey for good. This can’t be
          undone.
        </AreYouSureDialog>
      )}
    </>
  )
}

// A new stop's temporary card: its fields, Cancel, and Confirm. Pressing
// Enter in a field confirms it too. Its type is where you are when it opens.
function NewStopCard({ draft, onChange, onConfirm, onCancel }) {
  const missing = draft.showMissing ? missingStopFields(draft.fields) : []

  return (
    <li className="stopCard isNew">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onConfirm()
        }}
        noValidate
      >
        <div className="stopCardHead">
          <span className="stopCardNumber">New step</span>
          <button type="button" className="stopSmallButton" onClick={onCancel}>
            Cancel
          </button>
        </div>
        <StopFields idPrefix={draft.id} fields={draft.fields} onChange={onChange} missing={missing} autoFocus />
        {missing.length > 0 && <MissingNote missing={missing} lead="To confirm, " />}
        <button type="submit" className="stopConfirm">
          <CheckIcon />
          Confirm
        </button>
      </form>
    </li>
  )
}

// An official stop: its title as the card's heading, with Delete beside it,
// and its type under it. Clicking anywhere else on the card picks it for the
// Step Editor (the button on its title is stretched over the whole card).
function StopCard({ stop, selected, onSelect, onDelete }) {
  const title = stop.title.trim() || 'Untitled step'

  return (
    <li className={selected ? 'stopCard isPickable isPicked' : 'stopCard isPickable'}>
      <div className="stopCardHead">
        <h3 className="stopCardTitle">
          <button className="stopCardPick" onClick={onSelect} aria-pressed={selected}>
            {title}
          </button>
        </h3>
        <button className="stopSmallButton isDelete" onClick={onDelete} aria-label={`Delete ${title}`}>
          <TrashIcon />
          Delete
        </button>
      </div>
      <span className={stop.type === 'peak' ? 'stopTypeTag isPeak' : 'stopTypeTag'}>{typeLabel(stop)}</span>
    </li>
  )
}
