import React from 'react';
import { Scan, Clock, QrCode } from 'lucide-react';
import { ViewMode } from '../types';

interface NavigationProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  historyCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onViewChange,
  historyCount,
}) => {
  const navItems = [
    { view: 'scanner' as ViewMode, icon: Scan, label: 'Scanner' },
    { view: 'history' as ViewMode, icon: Clock, label: 'History' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 safe-area-inset-bottom">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map(({ view, icon: Icon, label }) => (
          <button
            key={view}
            onClick={() => onViewChange(view)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 relative ${
              currentView === view
                ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs font-medium mt-1">{label}</span>
            {view === 'history' && historyCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {historyCount > 99 ? '99+' : historyCount}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};