import AreYouSureDialog from './AreYouSureDialog.jsx'
import Dialog from './Dialog.jsx'

// What Exit asks when there are changes that haven't been saved. First: save
// and exit, or exit without saving (or keep editing). Exit without saving then
// asks again, since everything since the last save will be lost.
//
// `step` is 'ask' for the first question and 'warn' for the second.
export default function ExitDialog({ step, onSaveAndExit, onExitWithoutSaving, onLoseChanges, onKeepEditing }) {
  if (step === 'warn') {
    return (
      <AreYouSureDialog
        title="Exit without saving?"
        confirmLabel="Exit without saving"
        cancelLabel="Keep editing"
        onConfirm={onLoseChanges}
        onCancel={onKeepEditing}
      >
        Everything you’ve changed since this journey was last saved will be lost. This can’t be undone.
      </AreYouSureDialog>
    )
  }

  return (
    <Dialog titleId="exitTitle" onClose={onKeepEditing} wide>
      <div className="dialogBox">
        <h2 className="dialogTitle" id="exitTitle">
          Save before you exit?
        </h2>
        <p className="dialogText">You’ve changed this journey since it was last saved.</p>
        <div className="dialogButtons">
          <button className="dialogQuiet" onClick={onKeepEditing}>
            Keep editing
          </button>
          <button className="dialogPlain" onClick={onExitWithoutSaving}>
            Exit without saving
          </button>
          <button className="dialogMain" onClick={onSaveAndExit}>
            Save and exit
          </button>
        </div>
      </div>
    </Dialog>
  )
}
