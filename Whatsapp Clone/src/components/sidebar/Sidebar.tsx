import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { SidebarHeader } from './SidebarHeader';
import { SearchBar } from './SearchBar';
import { ChatList } from '../chat/ChatList';
import { ContactList } from '../contacts/ContactList';
import { SettingsPanel } from '../settings/SettingsPanel';
import { ProfilePanel } from '../profile/ProfilePanel';

export const Sidebar: React.FC = () => {
  const { sidebarOpen, activeView } = useUIStore();

  const renderContent = () => {
    switch (activeView) {
      case 'contacts':
        return <ContactList />;
      case 'settings':
        return <SettingsPanel />;
      case 'profile':
        return <ProfilePanel />;
      default:
        return <ChatList />;
    }
  };

  return (
    <div className={`
      bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col
      ${sidebarOpen ? 'w-full lg:w-80' : 'w-0 lg:w-80'}
      transition-all duration-300 ease-in-out overflow-hidden
    `}>
      <SidebarHeader />
      {activeView === 'chats' && <SearchBar />}
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
};