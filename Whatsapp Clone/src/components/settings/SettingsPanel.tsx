import React from 'react';
import { Bell, Moon, Sun, Volume2, Shield, HelpCircle, LogOut } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';

export const SettingsPanel: React.FC = () => {
  const { isDarkMode, setDarkMode, notifications, setNotifications } = useUIStore();
  const { logout } = useAuthStore();

  const settingsItems = [
    {
      icon: Bell,
      label: 'Notifications',
      action: (
        <button
          onClick={() => setNotifications(!notifications)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            notifications ? 'bg-whatsapp-primary' : 'bg-gray-200 dark:bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              notifications ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      ),
    },
    {
      icon: isDarkMode ? Sun : Moon,
      label: 'Dark Mode',
      action: (
        <button
          onClick={() => setDarkMode(!isDarkMode)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isDarkMode ? 'bg-whatsapp-primary' : 'bg-gray-200 dark:bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isDarkMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      ),
    },
    {
      icon: Volume2,
      label: 'Sound',
      action: (
        <span className="text-sm text-gray-500 dark:text-gray-400">On</span>
      ),
    },
    {
      icon: Shield,
      label: 'Privacy',
      action: (
        <span className="text-sm text-gray-500 dark:text-gray-400">{">"}</span>
      ),
    },
    {
      icon: HelpCircle,
      label: 'Help',
      action: (
        <span className="text-sm text-gray-500 dark:text-gray-400">{">"}</span>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Settings
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1 p-4">
          {settingsItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex items-center">
                <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-3" />
                <span className="text-gray-900 dark:text-white">{item.label}</span>
              </div>
              {item.action}
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <button
            onClick={logout}
            className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};