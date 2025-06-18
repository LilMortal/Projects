export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  createdAt: string;
}

export interface Pin {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  destinationUrl?: string;
  userId: string;
  user: User;
  boardId?: string;
  board?: Board;
  likes: number;
  saves: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
  tags: string[];
  createdAt: string;
}

export interface Board {
  id: string;
  name: string;
  description?: string;
  userId: string;
  user: User;
  pins: Pin[];
  pinCount: number;
  isPrivate: boolean;
  coverImageUrl?: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  user: User;
  pinId: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AppState {
  theme: 'light' | 'dark';
  searchQuery: string;
  selectedPin: Pin | null;
  showPinModal: boolean;
  showCreatePinModal: boolean;
  showAuthModal: boolean;
  authMode: 'login' | 'signup';
}