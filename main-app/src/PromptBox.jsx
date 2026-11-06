import { useEffect } from 'react'

// A question in a box in the middle of the screen, with everything behind it
// dimmed. Its buttons go inside. Tapping outside the box, or pressing Escape,
// calls onDismiss, which should always be the safe choice.
function PromptBox({ title, text, onDismiss, children }) {
  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') {
        onDismiss()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onDismiss])

  return (
    <div className="modalScrim" onClick={onDismiss}>
      <div
        className="promptBox"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="promptTitle"
        aria-describedby="promptText"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="promptTitle" className="mainHook">{title}</h2>
        <p id="promptText">{text}</p>
        {children}
      </div>
    </div>
  )
}

export default PromptBox
