import "./AuthBar.css";

export function AuthBar() {
  const handleSignIn = () => {};

  const handleSignUp = () => {};

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
