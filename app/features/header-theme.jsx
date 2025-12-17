import { createContext, useContext, useMemo, useState } from 'react';

const HeaderThemeContext = createContext(null);

export function HeaderThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <HeaderThemeContext.Provider value={value}>
      {children}
    </HeaderThemeContext.Provider>
  );
}

export function useHeaderTheme() {
  const ctx = useContext(HeaderThemeContext);
  if (!ctx) {
    throw new Error('useHeaderTheme must be used within a HeaderThemeProvider');
  }
  return ctx;
}
