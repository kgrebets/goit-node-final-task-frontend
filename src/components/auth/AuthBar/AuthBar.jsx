import "./AuthBar.css";

export function AuthBar({ onOpenSignIn, onOpenSignUp }) {
  const handleSignIn = () => {
    if (onOpenSignIn) onOpenSignIn();
  };

  const handleSignUp = () => {
    if (onOpenSignUp) onOpenSignUp();
  };

  return (
    <div className="auth-bar">
      <button type="button" onClick={handleSignIn}>
        Sign in
      </button>
      <button type="button" onClick={handleSignUp}>
        Sign up
      </button>
    </div>
  );
}
