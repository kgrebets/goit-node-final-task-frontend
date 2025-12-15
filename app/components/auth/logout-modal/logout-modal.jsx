import Modal from '../../Modal';
import { useLogout } from '../../../features/auth/hooks.js';

export default function LogOutModal({ isOpen, onClose }) {
  const logoutMutation = useLogout();

  const handleCancel = () => {
    if (onClose) onClose();
  };

  const handleConfirm = async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      if (onClose) onClose();
      window.location.assign('/');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p>Are you sure you want to log out?</p>
      <div>
        <button
          type="button"
          onClick={handleCancel}
          disabled={logoutMutation.isPending}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? 'Logging out...' : 'Log out'}
        </button>
      </div>
    </Modal>
  );
}
