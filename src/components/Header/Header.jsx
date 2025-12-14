import { useAuth } from "../../features/auth/AuthProvider.jsx";
import { AuthBar } from "../auth/AuthBar";
import { UserBar } from "../auth/UserBar";
import "./Header.css";

export function Header() {
  const { token } = useAuth();
  const isAuthenticated = Boolean(token);

  return (
    <header className="app-header">
      <div className="app-header-content">
        <div className="app-header-spacer" />
        <div className="app-header-right">
          {isAuthenticated ? <UserBar /> : <AuthBar />}
        </div>
      </div>
    </header>
  );
}
