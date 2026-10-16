'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // layout.js ka inline script pehle hi data-theme laga chuka hota hai —
  // yahan sirf usse React state mein padh lete hain (hydration mismatch se bachne ke liye)
  useEffect(() => {
    const current =
      document.documentElement.getAttribute('data-theme') ||
      localStorage.getItem('theme') ||
      'light';
    setTheme(current);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
