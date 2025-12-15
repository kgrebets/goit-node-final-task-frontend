import { useState } from "react";
import { useAuth } from "../../features/auth/AuthProvider.jsx";
import { useCurrentUser } from "../../features/auth/hooks.js";
import { AuthBar } from "../auth/AuthBar";
import { UserBar } from "../auth/UserBar";
import { SignInModal } from "../auth/SignInModal";
import { SignUpModal } from "../auth/SignUpModal";
import { LogOutModal } from "../auth/LogOutModal";
import "./Header.css";

export function Header() {
  const { token } = useAuth();
  const isAuthenticated = Boolean(token);

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  useCurrentUser();

  return (
    <>
      <header className="app-header">
        <div className="app-header-content">
          <div className="app-header-spacer" />
          <div className="app-header-right">
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
