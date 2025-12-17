export default function AuthBar({ onOpenSignIn, onOpenSignUp }) {
  const handleSignIn = () => {
    if (onOpenSignIn) onOpenSignIn();
  };

  const handleSignUp = () => {
    if (onOpenSignUp) onOpenSignUp();
  };

  return (
    <div className="flex gap-2">
      <button type="button" onClick={handleSignIn}>
        Sign in
      </button>
      <button type="button" onClick={handleSignUp}>
        Sign up
      </button>
    </div>
  );
}
