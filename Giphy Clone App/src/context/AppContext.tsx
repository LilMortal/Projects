import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { AppState, AppContextType, GifData } from '../types';

const initialState: AppState = {
  favorites: JSON.parse(localStorage.getItem('giphy-favorites') || '[]'),
  searchTerm: '',
  isLoading: false,
  error: null,
};

type AppAction =
  | { type: 'ADD_TO_FAVORITES'; payload: GifData }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES': {
      const newFavorites = [...state.favorites, action.payload];
      localStorage.setItem('giphy-favorites', JSON.stringify(newFavorites));
      return { ...state, favorites: newFavorites };
    }
    case 'REMOVE_FROM_FAVORITES': {
      const newFavorites = state.favorites.filter(gif => gif.id !== action.payload);
      localStorage.setItem('giphy-favorites', JSON.stringify(newFavorites));
      return { ...state, favorites: newFavorites };
    }
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addToFavorites = useCallback((gif: GifData) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: gif });
  }, []);

  const removeFromFavorites = useCallback((gifId: string) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: gifId });
  }, []);

  const isFavorite = useCallback((gifId: string) => {
    return state.favorites.some(gif => gif.id === gifId);
  }, [state.favorites]);

  const setSearchTerm = useCallback((term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  }, []);

  const setIsLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const value: AppContextType = {
    ...state,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    setSearchTerm,
    setIsLoading,
    setError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};