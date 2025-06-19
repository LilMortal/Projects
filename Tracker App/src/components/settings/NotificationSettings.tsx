import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Clock, Calendar, Target } from 'lucide-react';

export function NotificationSettings() {
  const [settings, setSettings] = React.useState({
    dailyReminders: true,
    weeklyReports: true,
    streakAlerts: true,
    goalDeadlines: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationTypes = [
    {
      key: 'dailyReminders' as const,
      title: 'Daily Reminders',
      description: 'Get reminded to log your daily habits',
      icon: Clock,
    },
    {
      key: 'weeklyReports' as const,
      title: 'Weekly Reports',
      description: 'Receive weekly progress summaries',
      icon: Calendar,
    },
    {
      key: 'streakAlerts' as const,
      title: 'Streak Alerts',
      description: 'Notifications when you reach streak milestones',
      icon: Target,
    },
    {
      key: 'goalDeadlines' as const,
      title: 'Goal Deadlines',
      description: 'Reminders for upcoming goal deadlines',
      icon: Bell,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Notifications
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage how and when you receive notifications
        </p>
      </div>

      <div className="space-y-6">
        {notificationTypes.map((notification) => (
          <motion.div
            key={notification.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <notification.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {notification.description}
                </p>
              </div>
            </div>
            
            <motion.button
              onClick={() => handleToggle(notification.key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings[notification.key]
                  ? 'bg-primary-600'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings[notification.key] ? 'translate-x-6' : 'translate-x-1'
                }`}
                layout
              />
            </motion.button>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <Bell className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-800 dark:text-amber-200">
              Browser Notifications
            </h4>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              To receive notifications, please allow notifications in your browser settings.
              This is a demo app, so notifications are simulated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}