import { Modal } from "../../Modal";

export function SignInModal({ isOpen, onClose, onSwitchToSignUp }) {
  const handleSubmit = (event) => {
    event.preventDefault();
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
        <button type="submit">Sign in</button>
      </form>
      <button type="button" onClick={handleSwitch}>
        Create an account
      </button>
    </Modal>
  );
}
