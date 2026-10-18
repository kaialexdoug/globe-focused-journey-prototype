import { useEffect } from 'react'

// Asks before leaving a journey that's under way. Carrying on is the big
// button and ending is the quiet one, so it's hard to end one by accident.
// Tapping outside the box, or pressing Escape, also carries on.
function StopConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') {
        onCancel()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onCancel])

  return (
    <div className="modalScrim" onClick={onCancel}>
      <div
        className="stopConfirmation"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="stopTitle"
        aria-describedby="stopText"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="stopTitle" className="mainHook">End your journey?</h2>
        <p id="stopText">Are you sure you want to leave your current journey?</p>
        <button className="introBtn" onClick={onCancel} autoFocus>
          CONTINUE JOURNEY
        </button>
        <button className="backBtn" onClick={onConfirm}>
          YES, END JOURNEY
        </button>
      </div>
    </div>
  )
}

export default StopConfirmation
