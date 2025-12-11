import "./ConfirmDialog.css";

export default function ConfirmDialog({
  open,
  title,
  message,
  acceptLabel,
  rejectLabel,
  onAccept,
  onReject,
}) {
  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("confirm-dialog__backdrop")) {
      onReject();
    }
  };

  return (
    <div className="confirm-dialog__backdrop" onClick={handleBackdropClick}>
      <div className="confirm-dialog__container">
        <h2 className="confirm-dialog__title">{title}</h2>

        <p className="confirm-dialog__message">{message}</p>

        <div className="confirm-dialog__actions">
          <button
            className="confirm-dialog__btn confirm-dialog__btn--cancel"
            onClick={onReject}
          >
            {rejectLabel}
          </button>
          <button
            className="confirm-dialog__btn confirm-dialog__btn--accept"
            onClick={onAccept}
          >
            {acceptLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
