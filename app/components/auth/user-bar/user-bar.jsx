import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../../features/auth/AuthProvider.jsx';
import { useHeaderTheme } from '../../../features/header-theme.jsx';
import ChevronDown from '../../icons/chevron-down.jsx';
import ArrowUpRight from '../../icons/arrow-up-right.jsx';
import clsx from 'clsx';

export default function UserBar({ onOpenLogout, className }) {
  const { user } = useAuth();
  const { theme } = useHeaderTheme();
  const isDark = theme === 'dark';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);

  const displayName = user?.username || user?.email || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const wrapperClasses = clsx(
    'flex h-10 items-center gap-2 rounded-full border-0 py-0 pl-0 pr-3 focus:outline-none hover:opacity-90',
    isDark ? 'bg-white text-black' : 'bg-black text-white'
  );

  const dropdownClasses =
    'absolute right-0 top-[calc(100%+8px)] w-40 rounded-2xl border border-white bg-black px-4 py-3 text-[10px] leading-[16px] font-semibold tracking-[-0.02em] uppercase text-white';

  return (
    <div ref={containerRef} className={clsx('relative inline-flex', className)}>
      <button
        type="button"
        onClick={handleToggleMenu}
        className={wrapperClasses}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={displayName}
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{initial}</span>
          )}
        </div>

        <span className="max-w-[120px] truncate text-[12px] leading-[18px] font-bold tracking-[-0.02em] uppercase">
          {displayName}
        </span>

        <ChevronDown width={14} height={14} className="flex-none" />
      </button>

      {isMenuOpen && (
        <div className={dropdownClasses}>
          <button
            type="button"
            className="flex w-full items-center gap-1 border-0 bg-transparent px-0 py-0 text-white hover:text-white/80"
            onClick={() => {
              setIsMenuOpen(false);
              // TODO: navigate to profile page when it exists
            }}
          >
            <span>Profile</span>
          </button>
          <button
            type="button"
            className="mt-2 flex w-full items-center gap-1 border-0 bg-transparent px-0 py-0 text-white hover:text-white/80"
            onClick={() => {
              setIsMenuOpen(false);
              onOpenLogout?.();
            }}
          >
            <span>Log out</span>
            <ArrowUpRight width={12} height={12} />
          </button>
        </div>
      )}
    </div>
  );
}
