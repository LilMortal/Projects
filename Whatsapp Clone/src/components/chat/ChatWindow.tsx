import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Check, CheckCheck, Edit3, Trash2 } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { useUsers } from '../../hooks/useUsers';
import { useAuthStore } from '../../store/authStore';
import { MessageInput } from './MessageInput';
import { ChatHeader } from './ChatHeader';

export const ChatWindow: React.FC = () => {
  const { activeChat, messages } = useChatStore();
  const { getUserById } = useUsers();
  const { user: currentUser } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChat]);

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-whatsapp-chat-bg dark:bg-whatsapp-dark-chat-bg">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
            WhatsApp Clone
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Send and receive messages without keeping your phone online. Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
          </p>
        </div>
      </div>
    );
  }

  const chatMessages = messages[activeChat] || [];
  const chat = useChatStore.getState().chats.find(c => c.id === activeChat);
  const otherUserId = chat?.participants.find(id => id !== currentUser?.id);
  const otherUser = otherUserId ? getUserById(otherUserId) : null;

  return (
    <div className="flex-1 flex flex-col bg-whatsapp-chat-bg dark:bg-whatsapp-dark-chat-bg">
      <ChatHeader user={otherUser} />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chatMessages.map((message) => {
          const isOwn = message.senderId === currentUser?.id;
          const sender = getUserById(message.senderId);
          
          return (
            <div
              key={message.id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative group ${
                  isOwn
                    ? 'bg-whatsapp-message-out text-white'
                    : 'bg-whatsapp-message-in dark:bg-whatsapp-dark-message-in text-gray-900 dark:text-white'
                } ${
                  message.deleted ? 'italic opacity-75' : ''
                }`}
              >
                {message.replyTo && (
                  <div className="bg-black bg-opacity-10 rounded p-2 mb-2 text-sm">
                    <div className="font-medium">Replying to</div>
                    <div className="opacity-75">Original message...</div>
                  </div>
                )}
                
                <div className="break-words">
                  {message.deleted ? (
                    <span className="text-sm">This message was deleted</span>
                  ) : (
                    message.content
                  )}
                  {message.edited && !message.deleted && (
                    <span className="text-xs opacity-75 ml-1">(edited)</span>
                  )}
                </div>
                
                <div className="flex items-center justify-end mt-1 space-x-1">
                  <span className="text-xs opacity-75">
                    {format(new Date(message.timestamp), 'h:mm a')}
                  </span>
                  {isOwn && !message.deleted && (
                    <div className="flex">
                      {message.status === 'sent' && (
                        <Check className="w-3 h-3 opacity-75" />
                      )}
                      {message.status === 'delivered' && (
                        <CheckCheck className="w-3 h-3 opacity-75" />
                      )}
                      {message.status === 'read' && (
                        <CheckCheck className="w-3 h-3 text-blue-400" />
                      )}
                    </div>
                  )}
                </div>

                {/* Message actions */}
                {isOwn && !message.deleted && (
                  <div className="absolute right-0 top-0 transform translate-x-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow-lg ml-2">
                      <button
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg"
                        title="Edit message"
                      >
                        <Edit3 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg"
                        title="Delete message"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput />
    </div>
  );
};