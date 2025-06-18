import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useUsers } from '../../hooks/useUsers';
import { useChatStore } from '../../store/chatStore';
import { useUIStore } from '../../store/uiStore';
import { User } from '../../types';

export const ContactList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { users, searchUsers } = useUsers();
  const { createChat, setActiveChat } = useChatStore();
  const { setActiveView } = useUIStore();

  const filteredUsers = searchUsers(searchQuery);

  const handleContactClick = (user: User) => {
    const chatId = createChat(user);
    setActiveChat(chatId);
    setActiveView('chats');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Contacts
          </h2>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Plus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contacts..."
            className="w-full pl-10 pr-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full focus:ring-2 focus:ring-whatsapp-primary focus:bg-white dark:focus:bg-gray-600 transition-colors dark:text-white"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => handleContactClick(user)}
            className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <div className="relative">
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=25D366&color=fff`}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=25D366&color=fff`;
                }}
              />
              {user.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              )}
            </div>
            
            <div className="flex-1 ml-3">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {user.about}
              </p>
            </div>
          </div>
        ))}
        
        {filteredUsers.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery ? 'No contacts found' : 'No contacts yet'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};