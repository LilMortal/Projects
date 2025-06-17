import React, { useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import { Avatar } from './Avatar';
import { MessageInput } from './MessageInput';
import { Hash, Trash2 } from 'lucide-react';

export const MessagePanel: React.FC = () => {
  const { getCurrentChannel, getCurrentServer, servers, currentUser, deleteMessage } = useApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const channel = getCurrentChannel();
  const server = getCurrentServer();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [channel?.messages]);

  if (!channel || !server) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <Hash className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-neutral-600 mb-2">Welcome to WaveSpace</h2>
          <p className="text-neutral-500">Select a channel to start messaging</p>
        </div>
      </div>
    );
  }

  const getUserById = (userId: string) => {
    for (const s of servers) {
      const user = s.members.find(m => m.id === userId);
      if (user) return user;
    }
    return null;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(channel.id, messageId);
  };

  // Group messages by date
  const groupedMessages = channel.messages.reduce((groups, message) => {
    const dateKey = message.timestamp.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
    return groups;
  }, {} as Record<string, typeof channel.messages>);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Channel Header */}
      <div className="h-16 border-b border-neutral-200 flex items-center px-6 bg-white shadow-soft">
        <Hash className="w-5 h-5 text-neutral-500 mr-2" />
        <div>
          <h1 className="font-semibold text-neutral-900">{channel.name}</h1>
          {channel.description && (
            <p className="text-sm text-neutral-600">{channel.description}</p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {Object.entries(groupedMessages).map(([dateKey, messages]) => (
            <div key={dateKey} className="mb-6">
              {/* Date Separator */}
              <div className="flex items-center mb-4">
                <div className="flex-1 h-px bg-neutral-200"></div>
                <div className="px-3 text-xs font-medium text-neutral-500 bg-white">
                  {formatDate(new Date(dateKey))}
                </div>
                <div className="flex-1 h-px bg-neutral-200"></div>
              </div>

              {/* Messages for this date */}
              {messages.map((message, index) => {
                const user = getUserById(message.userId);
                const prevMessage = index > 0 ? messages[index - 1] : null;
                const showAvatar = !prevMessage || prevMessage.userId !== message.userId;
                const isOwnMessage = message.userId === currentUser.id;

                return (
                  <div key={message.id} className={`group flex items-start space-x-3 py-1 hover:bg-neutral-50 px-4 rounded-lg -mx-4 ${showAvatar ? 'mt-4' : ''}`}>
                    <div className="w-10 flex-shrink-0">
                      {showAvatar && user && (
                        <Avatar user={user} size="md" showStatus />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {showAvatar && user && (
                        <div className="flex items-baseline space-x-2 mb-1">
                          <span className="font-medium text-neutral-900">
                            {user.name}
                          </span>
                          <span className="text-xs text-neutral-500">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      )}
                      <div className="text-neutral-800 leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                    {isOwnMessage && (
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-error hover:text-white text-neutral-400 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};