import { useEffect } from 'react'
import { createPortal } from 'react-dom'

// A question in a box in the middle of the screen, with everything behind it
// dimmed, and `text` under it if there's more to say. Its buttons go inside. Tapping outside the box, or pressing Escape,
// calls onDismiss, which should always be the safe choice.
//
// It's always put over the whole phone, navbar and all, even when a page opens
// it (like Save your changes? on Settings): inside the page, the page's
// fade-in would keep it to the page, with the navbar left bright, and
// tappable, underneath.
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

  const box = (
    <div className="modalScrim" onClick={onDismiss}>
      <div
        className="promptBox"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="promptTitle"
        aria-describedby={text ? 'promptText' : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="promptTitle" className="mainHook">{title}</h2>
        {text && <p id="promptText">{text}</p>}
        {children}
      </div>
    </div>
  )

  const phone = document.querySelector('.phone')
  return phone ? createPortal(box, phone) : box
}

export default PromptBox
