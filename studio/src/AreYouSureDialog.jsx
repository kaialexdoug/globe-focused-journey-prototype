import Dialog from './Dialog.jsx'

// Are you sure? Asked before anything that can't be undone: deleting a
// journey or a stop, or exiting the editor without saving. The button that
// goes ahead is red. The one that doesn't ("Cancel", unless `cancelLabel` says
// otherwise) comes first, so it's where the browser puts you, and pressing
// Enter straight away doesn't do anything you can't get back.
export default function AreYouSureDialog({ title, children, confirmLabel, cancelLabel = 'Cancel', onConfirm, onCancel }) {
  return (
    <Dialog titleId="areYouSureTitle" onClose={onCancel}>
      <div className="dialogBox">
        <h2 className="dialogTitle" id="areYouSureTitle">
          {title}
        </h2>
        <p className="dialogText">{children}</p>
        <div className="dialogButtons">
          <button className="dialogPlain" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className="dialogDanger" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </Dialog>
  )
}
