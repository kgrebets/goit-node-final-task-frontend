import { useState } from 'react';
import { useAuth } from '../../features/auth/AuthProvider.jsx';
import { useCurrentUser } from '../../features/auth/hooks.js';
import AuthBar from '../auth/auth-bar';
import UserBar from '../auth/user-bar';
import SignInModal from '../auth/signin-modal';
import SignUpModal from '../auth/signup-modal';
import LogOutModal from '../auth/logout-modal';

export default function Header() {
  const { token } = useAuth();
  const isAuthenticated = Boolean(token);

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  useCurrentUser();

  return (
    <>
      <header className="sticky top-0 left-0 right-0 w-full bg-white">
        <div className="flex items-center justify-end px-4 py-2 box-border">
          <div className="flex-1" />
          <div>
            {isAuthenticated ? (
              <UserBar onOpenLogout={() => setIsLogoutOpen(true)} />
            ) : (
              <AuthBar
                onOpenSignIn={() => setIsSignInOpen(true)}
                onOpenSignUp={() => setIsSignUpOpen(true)}
              />
            )}
          </div>
        </div>
      </header>

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSwitchToSignUp={() => {
          setIsSignInOpen(false);
          setIsSignUpOpen(true);
        }}
      />

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToSignIn={() => {
          setIsSignUpOpen(false);
          setIsSignInOpen(true);
        }}
      />

      <LogOutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      />
    </>
  );
}
