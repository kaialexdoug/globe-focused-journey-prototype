function StopConfirmation({ onConfirm, onCancel }) {
  return (
    <div className="stopConfirmation">
      <h2>END YOUR JOURNEY?</h2>
      <p>Are you sure you want to leave your current journey?</p>
      <button className="introBtn" onClick={onConfirm}>
        YES, END JOURNEY
      </button>
      <button className="introBtn" onClick={onCancel}>
        CONTINUE JOURNEY
      </button>
    </div>
  )
}

export default StopConfirmation