import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import clsx from 'clsx';
import { useAuth } from '../../features/auth/AuthProvider.jsx';
import { useCurrentUser } from '../../features/auth/hooks.js';
import { useHeaderTheme } from '../../features/header-theme.jsx';
import AuthBar from '../auth/auth-bar';
import UserBar from '../auth/user-bar';
import SignInModal from '../auth/signin-modal';
import SignUpModal from '../auth/signup-modal';
import LogOutModal from '../auth/logout-modal';
import Hamburger from '../icons/hamburger.jsx';

export default function Header() {
  const {
    token,
    isSignInOpen,
    isSignUpOpen,
    isLogoutOpen,
    openSignIn,
    closeSignIn,
    openSignUp,
    closeSignUp,
    openLogout,
    closeLogout,
  } = useAuth();
  const isAuthenticated = Boolean(token);
  const { theme } = useHeaderTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useCurrentUser();

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const closeAllModals = () => {
    closeSignIn();
    closeSignUp();
    closeLogout();
  };

  const handleOpenSignIn = () => {
    closeAllModals();
    openSignIn();
  };

  const handleOpenSignUp = () => {
    closeAllModals();
    openSignUp();
  };

  const handleOpenLogout = () => {
    closeAllModals();
    openLogout();
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    handleCloseMobileMenu();
  };

  const handleAddClick = (event) => {
    if (!isAuthenticated) {
      event.preventDefault();
      handleOpenSignIn();
    }
  };

  const handleMobileAddClick = (event) => {
    if (!isAuthenticated) {
      event.preventDefault();
      handleOpenSignIn();
      handleCloseMobileMenu();
      return;
    }
    handleNavClick();
  };

  const isDark = theme === 'dark';

  const desktopNavLinkClass = () =>
    clsx(
      'inline-flex items-center justify-center rounded-full border border-transparent px-3 py-1 text-[12px] leading-[18px] font-bold tracking-[-0.02em] uppercase transition-colors',
      isDark
        ? 'text-white hover:text-white/80'
        : 'text-gray-900 hover:text-gray-700'
    );

  const mobileNavLinkClass = () =>
    clsx(
      'inline-flex items-center justify-center rounded-full border border-current px-4 py-3 text-[12px] leading-[18px] font-bold tracking-[-0.02em] uppercase',
      'text-white hover:text-white/80'
    );

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 left-0 right-0 z-40 w-full border-b border-black/5 backdrop-blur',
          isDark ? 'bg-black/90 text-white' : 'bg-white/95 text-gray-900'
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-5 lg:px-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center rounded-md text-xl font-extrabold lowercase tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            foodies
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-3">
            <NavLink to="/" className={desktopNavLinkClass} end>
              Home
            </NavLink>
            <NavLink
              to="/add"
              className={desktopNavLinkClass}
              onClick={handleAddClick}
            >
              Add recipe
            </NavLink>
          </nav>

          {/* Right side: auth controls / burger */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <UserBar onOpenLogout={handleOpenLogout} />
            ) : (
              <AuthBar
                onOpenSignIn={handleOpenSignIn}
                onOpenSignUp={handleOpenSignUp}
              />
            )}

            {/* Mobile burger */}
            <button
              type="button"
              className={clsx(
                'flex h-8 w-8 items-center justify-center border-0 bg-transparent p-0 md:hidden',
                isDark ? 'text-white' : 'text-black'
              )}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation"
            >
              <Hamburger width={24} height={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          onClick={handleCloseMobileMenu}
        >
          <div
            className="absolute inset-x-0 top-0 h-1/2 flex flex-col bg-zinc-950 px-4 py-4 text-white"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="flex items-center text-xl font-extrabold lowercase tracking-tight"
                onClick={handleNavClick}
              >
                foodies
              </Link>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center border-0 bg-transparent p-0 text-2xl leading-none text-white/70 hover:text-white"
                onClick={handleCloseMobileMenu}
                aria-label="Close navigation"
              >
                ×
              </button>
            </div>

            <nav className="mt-auto mb-4 flex flex-col items-center gap-3">
              <NavLink
                to="/"
                className={mobileNavLinkClass}
                end
                onClick={handleNavClick}
              >
                Home
              </NavLink>
              <NavLink
                to="/add"
                className={mobileNavLinkClass}
                onClick={handleMobileAddClick}
              >
                Add recipe
              </NavLink>
            </nav>
          </div>
        </div>
      )}

      {/* Auth modals */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={closeSignIn}
        onSwitchToSignUp={() => {
          closeSignIn();
          openSignUp();
        }}
      />

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={closeSignUp}
        onSwitchToSignIn={() => {
          closeSignUp();
          openSignIn();
        }}
      />

      <LogOutModal isOpen={isLogoutOpen} onClose={closeLogout} />
    </>
  );
}
