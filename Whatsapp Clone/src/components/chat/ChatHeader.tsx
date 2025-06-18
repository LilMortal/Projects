import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';
import { User } from '../../types';
import { useUIStore } from '../../store/uiStore';
import { useChatStore } from '../../store/chatStore';

interface ChatHeaderProps {
  user?: User | null;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ user }) => {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { setActiveChat } = useChatStore();

  const handleBackClick = () => {
    if (!sidebarOpen) {
      toggleSidebar();
    }
    setActiveChat(null);
  };

  if (!user) return null;

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={handleBackClick}
            className="lg:hidden mr-3 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          
          <div className="relative">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=25D366&color=fff`}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=25D366&color=fff`;
              }}
            />
            {user.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            )}
          </div>
          
          <div className="ml-3">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {user.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.isOnline ? (
                'Online'
              ) : (
                `Last seen ${formatDistanceToNow(new Date(user.lastSeen), { addSuffix: true })}`
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Phone className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Video className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
};