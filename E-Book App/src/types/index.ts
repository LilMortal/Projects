export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  genre: string;
  tags: string[];
  publishDate: string;
  content: string;
  totalPages: number;
  isbn?: string;
  rating?: number;
  fileSize?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface ReadingProgress {
  bookId: string;
  currentPage: number;
  progress: number;
  lastReadAt: string;
}

export interface Bookmark {
  id: string;
  bookId: string;
  page: number;
  title: string;
  createdAt: string;
}

export interface Highlight {
  id: string;
  bookId: string;
  text: string;
  note?: string;
  page: number;
  position: number;
  color: string;
  createdAt: string;
}

export interface ReadingSettings {
  fontSize: number;
  lineHeight: number;
  theme: 'light' | 'sepia' | 'dark';
  fontFamily: string;
  margin: number;
}

export interface AppState {
  user: User | null;
  books: Book[];
  readingProgress: ReadingProgress[];
  bookmarks: Bookmark[];
  highlights: Highlight[];
  readingSettings: ReadingSettings;
  currentBook: Book | null;
  searchQuery: string;
  selectedGenre: string;
  theme: 'light' | 'dark';
}