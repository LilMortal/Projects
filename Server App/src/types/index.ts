export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  timestamp: Date;
  edited?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  type: 'text' | 'voice';
  messages: Message[];
}

export interface Server {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  channels: Channel[];
  members: User[];
}

export interface AppState {
  servers: Server[];
  currentServerId: string | null;
  currentChannelId: string | null;
  currentUser: User;
}