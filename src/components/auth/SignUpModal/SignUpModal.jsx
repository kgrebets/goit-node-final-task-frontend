import { Modal } from "../../Modal";

export function SignUpModal({ isOpen, onClose, onSwitchToSignIn }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleSwitch = () => {
    if (onSwitchToSignIn) onSwitchToSignIn();
  };

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
        <button type="submit">Create</button>
      </form>
      <button type="button" onClick={handleSwitch}>
        Sign in
      </button>
    </Modal>
  );
}
