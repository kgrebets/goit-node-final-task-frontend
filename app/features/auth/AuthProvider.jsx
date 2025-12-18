import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import ApiClient from '../../api-client/src/ApiClient';

const AUTH_STORAGE_KEY = 'auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        if (parsed.token) setToken(parsed.token);
        if (parsed.user) setUser(parsed.user);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      ApiClient.instance.authentications.bearerAuth.accessToken = null;
      return;
    }

    const payload = JSON.stringify({ token, user });
    localStorage.setItem(AUTH_STORAGE_KEY, payload);
    ApiClient.instance.authentications.bearerAuth.accessToken = token;
  }, [token, user]);

  const value = useMemo(
    () => ({
      user,
      token,
      setCredentials: ({ user: nextUser, token: nextToken }) => {
        setUser(nextUser || null);
        setToken(nextToken || null);
      },
      clearCredentials: () => {
        setUser(null);
        setToken(null);
      },
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
