import { useState, useEffect } from 'react';
import { Theme } from '../types';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('note-app-theme') as Theme;
    return saved || 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      applyTheme(theme === 'dark');
    }
  }, [theme]);

  const setAndSaveTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('note-app-theme', newTheme);
  };

  return { theme, setTheme: setAndSaveTheme };
}