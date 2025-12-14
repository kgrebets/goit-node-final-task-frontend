import { useAuth } from "../../../features/auth/AuthProvider.jsx";
import "./UserBar.css";

export function UserBar() {
  const { user } = useAuth();

  const displayName = user?.username || user?.email || "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="user-bar">
      <div className="user-avatar">
        {user?.avatar ? (
          <img src={user.avatar} alt={displayName} />
        ) : (
          <span>{initial}</span>
        )}
      </div>
      <span className="user-name">{displayName}</span>
    </div>
  );
}
