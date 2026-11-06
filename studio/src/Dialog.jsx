import { useEffect, useRef } from 'react'

// A box over the dimmed page, for something that needs answering before going
// on, like a new journey's name or whether to really delete one. It's open
// for as long as it's shown, so to close it, stop showing it. Escape, or a
// click on the dimmed page around it, calls `onClose`, and so should its own
// Cancel button. `titleId` is the id of its heading, which names it for screen
// readers.
//
// Whatever's inside goes in a "dialogBox", which has the padding, so a click
// anywhere in the box doesn't count as outside it. `wide` makes room for a
// third button.
export default function Dialog({ titleId, onClose, wide = false, children }) {
  const dialogRef = useRef(null)
  // Whether a click started on the dimmed page, so selecting some text and
  // letting go outside the box doesn't close it.
  const pressedOutsideRef = useRef(false)

  // Opened over everything else. The browser puts you in its first field or
  // button.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog.open) {
      dialog.showModal()
    }
    return () => {
      if (dialog.open) {
        dialog.close()
      }
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className={wide ? 'dialog isWide' : 'dialog'}
      aria-labelledby={titleId}
      // Escape. Closed by taking the box away, not by the browser.
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      // A click on the dimmed page around the box lands on the dialog itself.
      onMouseDown={(event) => {
        pressedOutsideRef.current = event.target === dialogRef.current
      }}
      onClick={(event) => {
        if (pressedOutsideRef.current && event.target === dialogRef.current) {
          onClose()
        }
      }}
    >
      {children}
    </dialog>
  )
}
