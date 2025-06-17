import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Send, Plus } from 'lucide-react';

export const MessageInput: React.FC = () => {
  const { getCurrentChannel, addMessage } = useApp();
  const [message, setMessage] = useState('');
  
  const channel = getCurrentChannel();

  const handleSend = () => {
    if (message.trim() && channel) {
      addMessage(channel.id, message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!channel) return null;

  return (
    <div className="p-4 border-t border-neutral-200 bg-white">
      <div className="flex items-end space-x-3">
        <button className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 transition-colors">
          <Plus className="w-5 h-5" />
        </button>
        
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message #${channel.name}`}
            className="
              w-full px-4 py-3 pr-12
              bg-neutral-100 
              border border-transparent 
              rounded-2xl 
              resize-none 
              focus:outline-none 
              focus:ring-2 
              focus:ring-primary-500 
              focus:bg-white 
              focus:border-neutral-300
              transition-all
              max-h-32
            "
            onKeyPress={handleKeyPress}
            rows={1}
            style={{
              minHeight: '48px',
              height: Math.min(Math.max(48, message.split('\n').length * 24), 128)
            }}
          />
          
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`
              absolute right-2 bottom-2 
              p-2 rounded-full 
              transition-all
              ${message.trim()
                ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-soft hover:shadow-medium'
                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              }
            `}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};