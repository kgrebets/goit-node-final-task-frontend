import { useState } from "react";
import { Modal } from "../../Modal";
import { useLogin } from "../../../features/auth/hooks.js";

export function SignInModal({ isOpen, onClose, onSwitchToSignUp }) {
  const [localError, setLocalError] = useState("");
  const loginMutation = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setLocalError("Email and password are required.");
      return;
    }

    try {
      await loginMutation.mutateAsync({ email, password });
      if (onClose) onClose();
    } catch (error) {
      setLocalError(error?.message || "Failed to sign in.");
    }
  };

  const handleSwitch = () => {
    if (onSwitchToSignUp) onSwitchToSignUp();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email
            <input name="email" type="email" />
          </label>
        </div>
        <div>
          <label>
            Password
            <input name="password" type="password" />
          </label>
        </div>
        {localError && <p>{localError}</p>}
        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <button type="button" onClick={handleSwitch}>
        Create an account
      </button>
    </Modal>
  );
}
