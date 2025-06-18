import { create } from 'zustand';
import { ChatState, Chat, Message, User } from '../types';

interface ChatStore extends ChatState {
  setActiveChat: (chatId: string | null) => void;
  sendMessage: (chatId: string, content: string, type?: Message['type']) => void;
  markAsRead: (chatId: string) => void;
  deleteMessage: (chatId: string, messageId: string) => void;
  editMessage: (chatId: string, messageId: string, content: string) => void;
  createChat: (participant: User) => string;
  addMessage: (message: Message) => void;
  initializeDemoData: (currentUserId: string) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  activeChat: null,
  messages: {},
  isLoading: false,
  error: null,

  setActiveChat: (chatId: string | null) => {
    set({ activeChat: chatId });
    if (chatId) {
      get().markAsRead(chatId);
    }
  },

  sendMessage: (chatId: string, content: string, type: Message['type'] = 'text') => {
    const { messages, chats } = get();
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      chatId,
      senderId: 'current_user',
      content,
      type,
      timestamp: new Date(),
      status: 'sent',
    };

    const updatedMessages = {
      ...messages,
      [chatId]: [...(messages[chatId] || []), newMessage],
    };

    const updatedChats = chats.map(chat => 
      chat.id === chatId 
        ? { ...chat, lastMessage: newMessage, updatedAt: new Date() }
        : chat
    );

    set({
      messages: updatedMessages,
      chats: updatedChats,
    });

    // Simulate message status updates
    setTimeout(() => {
      const { messages } = get();
      const chatMessages = messages[chatId] || [];
      const messageIndex = chatMessages.findIndex(m => m.id === newMessage.id);
      
      if (messageIndex !== -1) {
        chatMessages[messageIndex] = { ...newMessage, status: 'delivered' };
        set({ messages: { ...messages, [chatId]: chatMessages } });
        
        setTimeout(() => {
          const { messages } = get();
          const chatMessages = messages[chatId] || [];
          const messageIndex = chatMessages.findIndex(m => m.id === newMessage.id);
          
          if (messageIndex !== -1) {
            chatMessages[messageIndex] = { ...newMessage, status: 'read' };
            set({ messages: { ...messages, [chatId]: chatMessages } });
          }
        }, 2000);
      }
    }, 1000);
  },

  markAsRead: (chatId: string) => {
    const { chats } = get();
    const updatedChats = chats.map(chat =>
      chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
    );
    set({ chats: updatedChats });
  },

  deleteMessage: (chatId: string, messageId: string) => {
    const { messages } = get();
    const chatMessages = messages[chatId] || [];
    const updatedMessages = chatMessages.map(msg =>
      msg.id === messageId ? { ...msg, deleted: true, content: 'This message was deleted' } : msg
    );
    
    set({
      messages: { ...messages, [chatId]: updatedMessages },
    });
  },

  editMessage: (chatId: string, messageId: string, content: string) => {
    const { messages } = get();
    const chatMessages = messages[chatId] || [];
    const updatedMessages = chatMessages.map(msg =>
      msg.id === messageId ? { ...msg, content, edited: true } : msg
    );
    
    set({
      messages: { ...messages, [chatId]: updatedMessages },
    });
  },

  createChat: (participant: User): string => {
    const { chats } = get();
    const chatId = `chat_${Date.now()}`;
    
    const newChat: Chat = {
      id: chatId,
      participants: ['current_user', participant.id],
      unreadCount: 0,
      isMuted: false,
      isPinned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set({
      chats: [...chats, newChat],
      messages: { ...get().messages, [chatId]: [] },
    });

    return chatId;
  },

  addMessage: (message: Message) => {
    const { messages, chats } = get();
    const chatId = message.chatId;
    
    const updatedMessages = {
      ...messages,
      [chatId]: [...(messages[chatId] || []), message],
    };

    const updatedChats = chats.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            lastMessage: message, 
            updatedAt: new Date(),
            unreadCount: message.senderId !== 'current_user' ? chat.unreadCount + 1 : chat.unreadCount
          }
        : chat
    );

    set({
      messages: updatedMessages,
      chats: updatedChats,
    });
  },

  initializeDemoData: (currentUserId: string) => {
    const demoChats: Chat[] = [
      {
        id: 'chat_1',
        participants: [currentUserId, 'user_1'],
        unreadCount: 2,
        isMuted: false,
        isPinned: true,
        createdAt: new Date(Date.now() - 86400000),
        updatedAt: new Date(Date.now() - 3600000),
      },
      {
        id: 'chat_2',
        participants: [currentUserId, 'user_2'],
        unreadCount: 0,
        isMuted: false,
        isPinned: false,
        createdAt: new Date(Date.now() - 172800000),
        updatedAt: new Date(Date.now() - 7200000),
      },
    ];

    const demoMessages: Record<string, Message[]> = {
      chat_1: [
        {
          id: 'msg_1',
          chatId: 'chat_1',
          senderId: 'user_1',
          content: 'Hey! How are you doing?',
          type: 'text',
          timestamp: new Date(Date.now() - 7200000),
          status: 'read',
        },
        {
          id: 'msg_2',
          chatId: 'chat_1',
          senderId: currentUserId,
          content: 'I\'m good, thanks! How about you?',
          type: 'text',
          timestamp: new Date(Date.now() - 7100000),
          status: 'read',
        },
        {
          id: 'msg_3',
          chatId: 'chat_1',
          senderId: 'user_1',
          content: 'Great to hear! Want to catch up later?',
          type: 'text',
          timestamp: new Date(Date.now() - 3600000),
          status: 'delivered',
        },
      ],
      chat_2: [
        {
          id: 'msg_4',
          chatId: 'chat_2',
          senderId: 'user_2',
          content: 'Thanks for the help yesterday!',
          type: 'text',
          timestamp: new Date(Date.now() - 14400000),
          status: 'read',
        },
        {
          id: 'msg_5',
          chatId: 'chat_2',
          senderId: currentUserId,
          content: 'No problem at all! 😊',
          type: 'text',
          timestamp: new Date(Date.now() - 7200000),
          status: 'read',
        },
      ],
    };

    // Update last messages
    demoChats.forEach(chat => {
      const chatMessages = demoMessages[chat.id];
      if (chatMessages && chatMessages.length > 0) {
        chat.lastMessage = chatMessages[chatMessages.length - 1];
      }
    });

    set({
      chats: demoChats,
      messages: demoMessages,
    });
  },
}));