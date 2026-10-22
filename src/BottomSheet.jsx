import { useRef, useState } from 'react'

import { ChevronUpIcon } from './Icons.jsx'

// A panel that pulls up from the bottom of the screen over a photo, like on
// Instagram. Closed, only its handle shows, with `label` on it ("SEE
// DIRECTIONS"). Tap the handle or drag it up to open; tap it or drag it
// down to close. Open, it covers most of the photo, which is dimmed above
// it, and tapping that strip closes it too. Its content scrolls inside it.

// How far the handle has to be dragged to open or close the panel.
const DRAG_TO_SWITCH = 40

function BottomSheet({ label, children }) {
  const [open, setOpen] = useState(false)
  // While the handle is being dragged: how far, in pixels (up is negative).
  const [drag, setDrag] = useState(null)
  const dragStart = useRef(null)
  // A drag ends with a click too, which mustn't also toggle the panel.
  const justDragged = useRef(false)
  const sheetRef = useRef(null)

  function handlePointerDown(event) {
    dragStart.current = {
      y: event.clientY,
      moved: false,
      // How far a closed panel can be pulled up before it's fully open.
      room: sheetRef.current.offsetHeight - event.currentTarget.offsetHeight,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event) {
    const start = dragStart.current
    if (!start) {
      return
    }
    const moved = event.clientY - start.y
    if (Math.abs(moved) > 4) {
      start.moved = true
    }
    if (start.moved) {
      // It follows your finger, but no further than open or closed.
      setDrag(open ? Math.max(0, moved) : Math.max(-start.room, Math.min(0, moved)))
    }
  }

  function handlePointerUp(event) {
    const start = dragStart.current
    dragStart.current = null
    setDrag(null)
    if (!start || !start.moved) {
      return
    }
    justDragged.current = true
    const moved = event.clientY - start.y
    if (moved < -DRAG_TO_SWITCH) {
      setOpen(true)
    } else if (moved > DRAG_TO_SWITCH) {
      setOpen(false)
    }
  }

  // A tap, or Enter or Space from the keyboard.
  function handleClick() {
    if (justDragged.current) {
      justDragged.current = false
      return
    }
    setOpen(!open)
  }

  const resting = open ? '0px' : 'calc(100% - var(--sheet-peek))'
  const style = drag === null
    ? { transform: `translateY(${resting})` }
    : { transform: `translateY(calc(${resting} + ${drag}px))`, transition: 'none' }

  return (
    <>
      <div
        className={open ? 'sheetBackdrop isShown' : 'sheetBackdrop'}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      ></div>

      <div className={open ? 'sheet isOpen' : 'sheet'} ref={sheetRef} style={style}>
        <button
          className="sheetHandle"
          aria-expanded={open}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClick={handleClick}
        >
          <span className="sheetGrip" aria-hidden="true"></span>
          <span className="sheetLabel">
            {label}
            <ChevronUpIcon className="sheetChevron" />
          </span>
        </button>

        {/* Out of reach of the keyboard and screen readers while closed. */}
        <div className="sheetBody" inert={!open}>
          {children}
        </div>
      </div>
    </>
  )
}

export default BottomSheet
