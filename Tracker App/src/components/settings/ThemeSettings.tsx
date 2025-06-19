import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      id: 'light',
      name: 'Light',
      description: 'Clean and bright interface',
      icon: Sun,
    },
    {
      id: 'dark',
      name: 'Dark',
      description: 'Easy on the eyes in low light',
      icon: Moon,
    },
    {
      id: 'system',
      name: 'System',
      description: 'Follows your system preference',
      icon: Monitor,
    },
  ] as const;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Appearance
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose how the app looks and feels
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Theme
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((themeOption) => (
            <motion.label
              key={themeOption.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                theme === themeOption.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <input
                type="radio"
                name="theme"
                value={themeOption.id}
                checked={theme === themeOption.id}
                onChange={(e) => setTheme(e.target.value as any)}
                className="sr-only"
              />
              
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  theme === themeOption.id
                    ? 'bg-primary-100 dark:bg-primary-800'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <themeOption.icon className={`w-5 h-5 ${
                    theme === themeOption.id
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`} />
                </div>
                
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {themeOption.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {themeOption.description}
                  </div>
                </div>
              </div>
              
              {theme === themeOption.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-3 h-3 bg-primary-600 rounded-full"
                />
              )}
            </motion.label>
          ))}
        </div>
      </div>
    </div>
  );
}