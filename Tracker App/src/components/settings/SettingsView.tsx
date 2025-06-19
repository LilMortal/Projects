import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Palette, Shield, HelpCircle } from 'lucide-react';
import { ProfileSettings } from './ProfileSettings';
import { ThemeSettings } from './ThemeSettings';
import { NotificationSettings } from './NotificationSettings';

export function SettingsView() {
  const [activeSection, setActiveSection] = React.useState('profile');

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'appearance':
        return <ThemeSettings />;
      case 'privacy':
        return <div className="p-6 text-gray-500 dark:text-gray-400">Privacy settings coming soon...</div>;
      case 'help':
        return <div className="p-6 text-gray-500 dark:text-gray-400">Help section coming soon...</div>;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
        >
          Settings
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-400"
        >
          Customize your tracking experience
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-3"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            {renderSection()}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}