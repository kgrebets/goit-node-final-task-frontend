import { useAuth } from "../../../features/auth/AuthProvider.jsx";
import "./UserBar.css";

export function UserBar({ onOpenLogout }) {
  const { user } = useAuth();

  const displayName = user?.username || user?.email || "User";
  const initial = displayName.charAt(0).toUpperCase();

  const handleClick = () => {
    if (onOpenLogout) onOpenLogout();
  };

  return (
    <button type="button" className="user-bar" onClick={handleClick}>
      <div className="user-avatar">
        {user?.avatar ? (
          <img src={user.avatar} alt={displayName} />
        ) : (
          <span>{initial}</span>
        )}
      </div>
      <span className="user-name">{displayName}</span>
    </button>
  );
}
