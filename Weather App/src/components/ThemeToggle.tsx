import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../types/weather';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  theme, 
  onToggle,
  className = '' 
}) => {
  return (
    <button
      onClick={onToggle}
      className={`p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 text-white ${className}`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </button>
  );
};

export default ThemeToggle;