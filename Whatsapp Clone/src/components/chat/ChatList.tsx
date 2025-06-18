import React, { useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Pin, Volume2, VolumeX } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { useUsers } from '../../hooks/useUsers';
import { useUIStore } from '../../store/uiStore';
import { useAuthStore } from '../../store/authStore';

export const ChatList: React.FC = () => {
  const { chats, activeChat, setActiveChat } = useChatStore();
  const { getUserById } = useUsers();
  const { searchQuery } = useUIStore();
  const { user: currentUser } = useAuthStore();

  const filteredChats = useMemo(() => {
    let filtered = chats;

    if (searchQuery.trim()) {
      filtered = chats.filter(chat => {
        const otherUserId = chat.participants.find(id => id !== currentUser?.id);
        const otherUser = otherUserId ? getUserById(otherUserId) : null;
        
        return (
          otherUser?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chat.lastMessage?.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // Sort by pinned first, then by last message time
    return filtered.sort((a, b) => {
      if (a.isPinned !== b.isPinned) {
        return a.isPinned ? -1 : 1;
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [chats, searchQuery, currentUser, getUserById]);

  const handleChatClick = (chatId: string) => {
    setActiveChat(chatId);
  };

  if (chats.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No conversations yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Start a new conversation to begin chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {filteredChats.map((chat) => {
        const otherUserId = chat.participants.find(id => id !== currentUser?.id);
        const otherUser = otherUserId ? getUserById(otherUserId) : null;
        
        if (!otherUser) return null;

        return (
          <div
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
            className={`flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
              activeChat === chat.id ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
          >
            <div className="relative">
              <img
                src={otherUser.avatar || `https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=60&h=60&fit=crop`}
                alt={otherUser.name}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser.name)}&background=25D366&color=fff`;
                }}
              />
              {otherUser.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              )}
            </div>

            <div className="flex-1 ml-3 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">
                    {otherUser.name}
                  </h3>
                  {chat.isPinned && (
                    <Pin className="w-4 h-4 text-gray-400 ml-1 flex-shrink-0" />
                  )}
                  {chat.isMuted && (
                    <VolumeX className="w-4 h-4 text-gray-400 ml-1 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {chat.lastMessage && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(new Date(chat.lastMessage.timestamp), { addSuffix: false })}
                    </span>
                  )}
                  {chat.unreadCount > 0 && (
                    <span className="bg-whatsapp-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center mt-1">
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  {chat.lastMessage ? (
                    <>
                      {chat.lastMessage.senderId === currentUser?.id && '✓ '}
                      {chat.lastMessage.deleted ? (
                        <span className="italic">This message was deleted</span>
                      ) : (
                        chat.lastMessage.content
                      )}
                    </>
                  ) : (
                    'No messages yet'
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};