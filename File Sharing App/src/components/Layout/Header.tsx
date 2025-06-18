import React from 'react';
import { Moon, Sun, Upload, LogOut, User, BarChart3 } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';
import { useAuthStore } from '../../stores/authStore';
import { motion } from 'framer-motion';

interface HeaderProps {
  currentView: 'dashboard' | 'upload' | 'analytics';
  onViewChange: (view: 'dashboard' | 'upload' | 'analytics') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const { theme, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Upload className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                FileShare
              </span>
            </div>
            
            <nav className="hidden md:flex space-x-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: User },
                { id: 'upload', label: 'Upload', icon: Upload },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => onViewChange(id as any)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                    currentView === id
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {user?.name}
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};