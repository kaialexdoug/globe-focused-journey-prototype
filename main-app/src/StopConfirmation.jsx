import PromptBox from './PromptBox.jsx'

// Asks before leaving a journey that's under way. Carrying on is the big
// button and ending is the quiet one, so it's hard to end one by accident.
// Tapping outside the box, or pressing Escape, also carries on.
function StopConfirmation({ onConfirm, onCancel }) {
  return (
    <PromptBox
      title="End your journey?"
      text="Are you sure you want to leave your current journey?"
      onDismiss={onCancel}
    >
      <button className="introBtn" onClick={onCancel} autoFocus>
        CONTINUE JOURNEY
      </button>
      <button className="backBtn" onClick={onConfirm}>
        YES, END JOURNEY
      </button>
    </PromptBox>
  )
}

export default StopConfirmation
