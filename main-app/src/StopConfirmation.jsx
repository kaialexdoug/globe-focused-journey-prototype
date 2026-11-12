import PromptBox from './PromptBox.jsx'

// Asks before ending a journey with ✕. Ending clears where you were, so
// keeping going is the big button and ending is the quiet one, so it's hard to
// end one by accident. Tapping outside the box, or pressing Escape, also keeps
// going. (Going elsewhere with the navbar never ends a journey: it waits to be
// picked up again.)
function StopConfirmation({ onConfirm, onCancel }) {
  return (
    <PromptBox
      title="End your journey?"
      text="Your progress on this journey will be cleared."
      onDismiss={onCancel}
    >
      <button className="introBtn" onClick={onCancel} autoFocus>
        KEEP GOING
      </button>
      <button className="backBtn" onClick={onConfirm}>
        END JOURNEY
      </button>
    </PromptBox>
  )
}

export default StopConfirmation
