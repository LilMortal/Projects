import React, { useState, useRef } from 'react';
import { Send, Paperclip, Smile, Mic } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { useUIStore } from '../../store/uiStore';

export const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { activeChat, sendMessage } = useChatStore();
  const { showEmojiPicker, setShowEmojiPicker } = useUIStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeChat) return;

    sendMessage(activeChat, message.trim());
    setMessage('');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeChat) return;

    // Simulate file upload
    const fileName = file.name;
    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    sendMessage(activeChat, `📎 ${fileName} (${fileSize} MB)`, 'document');
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording && activeChat) {
      // Simulate voice message
      setTimeout(() => {
        sendMessage(activeChat, '🎤 Voice message (0:05)', 'voice');
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*,video/*,.pdf,.doc,.docx"
          className="hidden"
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows={1}
            className="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-whatsapp-primary focus:border-transparent dark:bg-gray-700 dark:text-white resize-none max-h-24"
            style={{ minHeight: '40px' }}
          />
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="absolute right-3 top-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
          >
            <Smile className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        
        {message.trim() ? (
          <button
            type="submit"
            className="p-2 bg-whatsapp-primary hover:bg-green-600 text-white rounded-full transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={toggleRecording}
            className={`p-2 rounded-full transition-colors ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Mic className={`w-5 h-5 ${isRecording ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
          </button>
        )}
      </form>
      
      {showEmojiPicker && (
        <div className="absolute bottom-20 right-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="grid grid-cols-8 gap-2">
              {['😀', '😂', '😍', '😊', '😎', '😢', '😡', '👍', '👎', '❤️', '💔', '🔥', '💯', '🎉', '😴', '🤔'].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    setMessage(prev => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-xl"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};