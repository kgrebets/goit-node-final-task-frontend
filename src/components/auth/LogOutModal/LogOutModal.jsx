import { Modal } from "../../Modal";

export function LogOutModal({ isOpen, onClose, onConfirm }) {
  const handleCancel = () => {
    if (onClose) onClose();
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p>Are you sure you want to log out?</p>
      <div>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" onClick={handleConfirm}>
          Log out
        </button>
      </div>
    </Modal>
  );
}
