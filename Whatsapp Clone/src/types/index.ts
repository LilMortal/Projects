export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  about: string;
  isOnline: boolean;
  lastSeen: Date;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'document' | 'voice';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  replyTo?: string;
  edited?: boolean;
  deleted?: boolean;
  mediaUrl?: string;
  mediaName?: string;
  mediaSize?: number;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  isMuted: boolean;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  isBlocked: boolean;
  addedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ChatState {
  chats: Chat[];
  activeChat: string | null;
  messages: Record<string, Message[]>;
  isLoading: boolean;
  error: string | null;
}

export interface UIState {
  isDarkMode: boolean;
  sidebarOpen: boolean;
  activeView: 'chats' | 'contacts' | 'settings' | 'profile';
  showEmojiPicker: boolean;
  searchQuery: string;
  notifications: boolean;
}