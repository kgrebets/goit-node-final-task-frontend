import { useState } from "react";
import { useAuth } from "../../features/auth/AuthProvider.jsx";
import { AuthBar } from "../auth/AuthBar";
import { UserBar } from "../auth/UserBar";
import { SignInModal } from "../auth/SignInModal";
import { SignUpModal } from "../auth/SignUpModal";
import "./Header.css";

export function Header() {
  const { token } = useAuth();
  const isAuthenticated = Boolean(token);

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <>
      <header className="app-header">
        <div className="app-header-content">
          <div className="app-header-spacer" />
          <div className="app-header-right">
            {isAuthenticated ? (
              <UserBar />
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
    </>
  );
}
