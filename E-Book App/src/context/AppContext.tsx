import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, Book, User, ReadingProgress, Bookmark, Highlight, ReadingSettings } from '../types';
import { mockBooks } from '../data/mockBooks';

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_BOOKS'; payload: Book[] }
  | { type: 'SET_CURRENT_BOOK'; payload: Book | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_GENRE'; payload: string }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'UPDATE_READING_PROGRESS'; payload: ReadingProgress }
  | { type: 'ADD_BOOKMARK'; payload: Bookmark }
  | { type: 'REMOVE_BOOKMARK'; payload: string }
  | { type: 'ADD_HIGHLIGHT'; payload: Highlight }
  | { type: 'REMOVE_HIGHLIGHT'; payload: string }
  | { type: 'UPDATE_READING_SETTINGS'; payload: Partial<ReadingSettings> };

const initialState: AppState = {
  user: null,
  books: mockBooks,
  readingProgress: [],
  bookmarks: [],
  highlights: [],
  readingSettings: {
    fontSize: 16,
    lineHeight: 1.6,
    theme: 'light',
    fontFamily: 'serif',
    margin: 20
  },
  currentBook: null,
  searchQuery: '',
  selectedGenre: 'All',
  theme: 'light'
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_BOOKS':
      return { ...state, books: action.payload };
    case 'SET_CURRENT_BOOK':
      return { ...state, currentBook: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SELECTED_GENRE':
      return { ...state, selectedGenre: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'UPDATE_READING_PROGRESS':
      const updatedProgress = state.readingProgress.filter(p => p.bookId !== action.payload.bookId);
      return { ...state, readingProgress: [...updatedProgress, action.payload] };
    case 'ADD_BOOKMARK':
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };
    case 'REMOVE_BOOKMARK':
      return { ...state, bookmarks: state.bookmarks.filter(b => b.id !== action.payload) };
    case 'ADD_HIGHLIGHT':
      return { ...state, highlights: [...state.highlights, action.payload] };
    case 'REMOVE_HIGHLIGHT':
      return { ...state, highlights: state.highlights.filter(h => h.id !== action.payload) };
    case 'UPDATE_READING_SETTINGS':
      return { ...state, readingSettings: { ...state.readingSettings, ...action.payload } };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load saved data from localStorage
    const savedUser = localStorage.getItem('ebook-user');
    const savedTheme = localStorage.getItem('ebook-theme');
    const savedProgress = localStorage.getItem('ebook-progress');
    const savedBookmarks = localStorage.getItem('ebook-bookmarks');
    const savedHighlights = localStorage.getItem('ebook-highlights');
    const savedSettings = localStorage.getItem('ebook-settings');

    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) });
    }
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme as 'light' | 'dark' });
    }
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      progress.forEach((p: ReadingProgress) => {
        dispatch({ type: 'UPDATE_READING_PROGRESS', payload: p });
      });
    }
    if (savedBookmarks) {
      const bookmarks = JSON.parse(savedBookmarks);
      bookmarks.forEach((b: Bookmark) => {
        dispatch({ type: 'ADD_BOOKMARK', payload: b });
      });
    }
    if (savedHighlights) {
      const highlights = JSON.parse(savedHighlights);
      highlights.forEach((h: Highlight) => {
        dispatch({ type: 'ADD_HIGHLIGHT', payload: h });
      });
    }
    if (savedSettings) {
      dispatch({ type: 'UPDATE_READING_SETTINGS', payload: JSON.parse(savedSettings) });
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('ebook-user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('ebook-user');
    }
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem('ebook-theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem('ebook-progress', JSON.stringify(state.readingProgress));
  }, [state.readingProgress]);

  useEffect(() => {
    localStorage.setItem('ebook-bookmarks', JSON.stringify(state.bookmarks));
  }, [state.bookmarks]);

  useEffect(() => {
    localStorage.setItem('ebook-highlights', JSON.stringify(state.highlights));
  }, [state.highlights]);

  useEffect(() => {
    localStorage.setItem('ebook-settings', JSON.stringify(state.readingSettings));
  }, [state.readingSettings]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}