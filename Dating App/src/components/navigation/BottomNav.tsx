import React from 'react';
import { motion } from 'framer-motion';
import { Home, MessageCircle, Compass, User } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { useSwipeStore } from '../../stores/swipeStore';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView } = useAppStore();
  const { matches } = useSwipeStore();

  const navItems = [
    { id: 'home', icon: Home, label: 'Discover' },
    { id: 'matches', icon: MessageCircle, label: 'Matches', badge: matches.length },
    { id: 'explore', icon: Compass, label: 'Explore' },
    { id: 'profile', icon: User, label: 'Profile' },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-dark-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView(item.id)}
              className={`relative flex flex-col items-center py-2 px-4 rounded-xl transition-colors ${
                isActive
                  ? 'text-primary-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className="w-6 h-6" />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};