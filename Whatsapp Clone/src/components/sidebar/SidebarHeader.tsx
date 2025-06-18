import React from 'react';
import { MessageCircle, Users, Settings, User, Moon, Sun, Menu } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';

export const SidebarHeader: React.FC = () => {
  const { activeView, setActiveView, isDarkMode, setDarkMode, toggleSidebar } = useUIStore();
  const { user } = useAuthStore();

  const menuItems = [
    { id: 'chats' as const, icon: MessageCircle, label: 'Chats' },
    { id: 'contacts' as const, icon: Users, label: 'Contacts' },
    { id: 'profile' as const, icon: User, label: 'Profile' },
    { id: 'settings' as const, icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="bg-whatsapp-secondary text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="lg:hidden mr-3 p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=25D366&color=fff`}
            alt={user?.name || 'User'}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=25D366&color=fff`;
            }}
          />
          <div className="ml-3">
            <h2 className="font-medium">{user?.name || 'User'}</h2>
            <p className="text-sm opacity-75">Online</p>
          </div>
        </div>
        
        <button
          onClick={() => setDarkMode(!isDarkMode)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
      
      <div className="flex space-x-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex-1 flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
              activeView === item.id
                ? 'bg-white/20'
                : 'hover:bg-white/10'
            }`}
            title={item.label}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};