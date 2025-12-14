import { useState } from "react";
import { Modal } from "../../Modal";
import { useLogin, useRegister } from "../../../features/auth/hooks.js";

export function SignUpModal({ isOpen, onClose, onSwitchToSignIn }) {
  const [localError, setLocalError] = useState("");
  const registerMutation = useRegister();
  const loginMutation = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!username || !email || !password) {
      setLocalError("Name, email, and password are required.");
      return;
    }

    try {
      await registerMutation.mutateAsync({ username, email, password });
      await loginMutation.mutateAsync({ email, password });
      if (onClose) onClose();
    } catch (error) {
      setLocalError(error?.message || "Failed to sign up.");
    }
  };

  const handleSwitch = () => {
    if (onSwitchToSignIn) onSwitchToSignIn();
  };

  const isSubmitting = registerMutation.isPending || loginMutation.isPending;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name
            <input name="name" type="text" />
          </label>
        </div>
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </form>
      <button type="button" onClick={handleSwitch}>
        Sign in
      </button>
    </Modal>
  );
}
