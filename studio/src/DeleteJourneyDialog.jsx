import AreYouSureDialog from './AreYouSureDialog.jsx'
import Dialog from './Dialog.jsx'

// The box a journey's Delete opens: are you sure?
//
// The app's own journeys are its files, so they can't be deleted here: for
// those, it says why instead (`canDelete` is false).
export default function DeleteJourneyDialog({ journey, canDelete, onDelete, onCancel }) {
  if (!canDelete) {
    return (
      <Dialog titleId="deleteJourneyTitle" onClose={onCancel}>
        <div className="dialogBox">
          <h2 className="dialogTitle" id="deleteJourneyTitle">
            This one can’t be deleted yet
          </h2>
          <p className="dialogText">
            “{journey.name}” comes from the app’s own journey files, so for now it can only be taken out there. Once
            journeys are kept in the database, you’ll be able to delete it here.
          </p>
          <div className="dialogButtons">
            <button className="dialogMain" onClick={onCancel}>
              OK
            </button>
          </div>
        </div>
      </Dialog>
    )
  }

  return (
    <AreYouSureDialog title="Delete this journey?" confirmLabel="Delete journey" onConfirm={onDelete} onCancel={onCancel}>
      “{journey.name}” will be deleted for good. This can’t be undone.
    </AreYouSureDialog>
  )
}
