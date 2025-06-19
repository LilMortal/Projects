import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  BarChart3, 
  Settings, 
  Plus, 
  Menu, 
  X, 
  LogOut,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

interface NavigationProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
}

export function Navigation({ currentView = 'dashboard', onViewChange }: NavigationProps) {
  const { user, signOut } = useAuth();
  const { theme, setTheme, isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'history', label: 'History', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  };

  const ThemeIcon = themeIcons[theme];

  const cycleTheme = () => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-primary-600 dark:text-primary-400"
          >
            Aesthetic Tracker
          </motion.div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onViewChange?.(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentView === item.id
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <motion.button
            onClick={cycleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={`Current theme: ${theme}`}
          >
            <ThemeIcon className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={() => onViewChange?.('create')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Tracker</span>
          </motion.button>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.full_name || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
            <motion.button
              onClick={signOut}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
            Aesthetic Tracker
          </div>
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    onViewChange?.(item.id);
                    setIsMenuOpen(false);
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-colors ${
                    currentView === item.id
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
              
              <motion.button
                onClick={() => {
                  onViewChange?.('create');
                  setIsMenuOpen(false);
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 w-full px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">New Tracker</span>
              </motion.button>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.full_name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={cycleTheme}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <ThemeIcon className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={signOut}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
}