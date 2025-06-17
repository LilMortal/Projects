export interface User {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  followers: string[];
  following: string[];
  joinedDate: string;
  verified: boolean;
}

export interface Chirp {
  id: string;
  userId: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: string[];
  rechirps: string[];
  comments: Comment[];
  isReply?: boolean;
  replyTo?: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  likes: string[];
}

export interface ChirpContextType {
  currentUser: User;
  users: User[];
  chirps: Chirp[];
  addChirp: (content: string, image?: string) => void;
  likeChirp: (chirpId: string) => void;
  rechirp: (chirpId: string) => void;
  addComment: (chirpId: string, content: string) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  getUserById: (userId: string) => User | undefined;
  getChirpsByUserId: (userId: string) => Chirp[];
  getTrendingChirps: () => Chirp[];
}