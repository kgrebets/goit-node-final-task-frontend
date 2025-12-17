import { useState } from 'react';
import Modal from '../../modal';
import { useLogout } from '../../../features/auth/hooks.js';

export default function LogOutModal({ isOpen, onClose }) {
  const logoutMutation = useLogout();
  const [localError, setLocalError] = useState('');

  const handleCancel = () => {
    onClose?.();
  };

  const handleConfirm = async () => {
    setLocalError('');
    try {
      await logoutMutation.mutateAsync();
      onClose?.();
      window.location.assign('/');
    } catch (error) {
      setLocalError(error?.message || 'Failed to log out.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-full max-w-[400px] flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-5">
          <h2 className="w-full text-center text-[32px] leading-[40px] font-extrabold uppercase tracking-[-0.02em] text-[#050505]">
            Are you logging out?
          </h2>
          <p className="w-full text-center text-[16px] leading-[24px] font-medium tracking-[-0.02em] text-[#1A1A1A]">
            You can always log back in at my time.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-5">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={logoutMutation.isPending}
            className="flex h-14 w-full flex-row items-center justify-center rounded-[30px] bg-[#050505] text-[16px] font-bold uppercase tracking-[-0.02em] text-white disabled:opacity-70"
          >
            {logoutMutation.isPending ? 'Logging out...' : 'Log out'}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={logoutMutation.isPending}
            className="flex h-14 w-full flex-row items-center justify-center rounded-[30px] border border-[#1A1A1A] bg-transparent text-[16px] font-bold uppercase tracking-[-0.02em] text-[#050505] disabled:opacity-70"
          >
            Cancel
          </button>

          {localError && (
            <p className="text-xs text-red-500 text-center">{localError}</p>
          )}
        </div>
      </div>
    </Modal>
  );
}
