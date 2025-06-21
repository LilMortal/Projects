import React from 'react';
import { BarChart3, Briefcase, Heart, History } from 'lucide-react';
import { useStore } from '../../store/useStore';

const navItems = [
  { id: 'market', label: 'Market', icon: BarChart3 },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'watchlist', label: 'Watchlist', icon: Heart },
  { id: 'history', label: 'History', icon: History },
] as const;

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab } = useStore();

  return (
    <nav className="bg-dark-100 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm 
                         transition-all duration-200 hover:text-electric-400
                         ${activeTab === id
                           ? 'border-electric-500 text-electric-500'
                           : 'border-transparent text-gray-400 hover:border-gray-600'
                         }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};