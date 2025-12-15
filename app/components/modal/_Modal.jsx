import { useEffect } from "react";
import clsx from "clsx";

export default function Modal({ isOpen, onClose, children, className }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40"
      onClick={handleBackdropClick}
    >
      <div
        className={clsx(
          "relative w-full max-w-[480px] max-h-screen overflow-auto bg-white p-4 box-border",
          className
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-2 top-2 text-xl leading-none text-gray-500 hover:text-gray-900"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}
