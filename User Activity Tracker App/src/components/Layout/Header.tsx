import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Moon, Sun, BarChart3 } from 'lucide-react';
import { useActivityStore } from '../../store/activityStore';

interface HeaderProps {
  currentView: 'dashboard' | 'activities' | 'add';
  onViewChange: (view: 'dashboard' | 'activities' | 'add') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const { theme, toggleTheme } = useActivityStore();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <div className="p-2 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                ActivityFlow
              </h1>
            </motion.div>
          </div>

          <nav className="flex items-center space-x-1">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { key: 'activities', label: 'Activities', icon: Activity },
              { key: 'add', label: 'Add New', icon: null },
            ].map(({ key, label, icon: Icon }) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewChange(key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  currentView === key
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span>{label}</span>
              </motion.button>
            ))}
          </nav>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};