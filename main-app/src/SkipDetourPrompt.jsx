import PromptBox from './PromptBox.jsx'

// Skipping a detour on the way to it: try one of the others instead, or
// carry on with the journey. With no other detour left, carrying on is the
// only way forward. Tapping outside the box, or pressing Escape, stays put.
function SkipDetourPrompt({ hasOtherDetours, onSeeOtherDetours, onContinueJourney, onStay }) {
  return (
    <PromptBox
      title="Skip this detour?"
      text={
        hasOtherDetours
          ? 'You can try another detour instead, or carry on with the journey.'
          : 'You can carry on with the journey from here.'
      }
      onDismiss={onStay}
    >
      {hasOtherDetours && (
        <button className="introBtn" onClick={onSeeOtherDetours} autoFocus>
          SEE OTHER DETOURS
        </button>
      )}
      <button
        className={hasOtherDetours ? 'introBtn isGhost' : 'introBtn'}
        onClick={onContinueJourney}
        autoFocus={!hasOtherDetours}
      >
        CONTINUE THE JOURNEY
      </button>
      <button className="backBtn" onClick={onStay}>
        STAY HERE
      </button>
    </PromptBox>
  )
}

export default SkipDetourPrompt
