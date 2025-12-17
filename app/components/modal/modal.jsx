import { useEffect } from 'react';
import clsx from 'clsx';
import CloseIcon from '../icons/close.jsx';

export default function Modal({ isOpen, onClose, children, className }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 px-4"
      onClick={handleBackdropClick}
    >
      <div
        className={clsx(
          'relative w-full max-w-[420px] max-h-[90vh] overflow-auto rounded-2xl bg-white px-6 py-7 box-border shadow-xl',
          className
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center border-0 bg-transparent p-0 text-base leading-none text-gray-500 hover:text-gray-900"
        >
          <CloseIcon width={20} height={20} />
        </button>

        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
