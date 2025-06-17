import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie, Genre, MovieContextType } from '../types/movie';
import { movies, genres } from '../data/movies';
import { useLocalStorage } from '../hooks/useLocalStorage';

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [watchlist, setWatchlist] = useLocalStorage<Movie[]>('cinescope-watchlist', []);

  const addToWatchlist = (movie: Movie) => {
    setWatchlist(prev => [...prev, movie]);
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isInWatchlist = (movieId: number): boolean => {
    return watchlist.some(movie => movie.id === movieId);
  };

  const getFilteredMovies = (): Movie[] => {
    let filtered = movies;

    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.overview.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter(movie =>
        movie.genre_ids.includes(selectedGenre)
      );
    }

    return filtered;
  };

  const getTrendingMovies = (): Movie[] => {
    return movies
      .filter(movie => movie.popularity > 90)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10);
  };

  const getNowPlayingMovies = (): Movie[] => {
    const currentYear = new Date().getFullYear();
    return movies
      .filter(movie => {
        const releaseYear = new Date(movie.release_date).getFullYear();
        return releaseYear >= currentYear - 1;
      })
      .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
      .slice(0, 10);
  };

  const getTopRatedMovies = (): Movie[] => {
    return movies
      .filter(movie => movie.vote_average >= 8.5)
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, 10);
  };

  const getUpcomingMovies = (): Movie[] => {
    const currentDate = new Date();
    return movies
      .filter(movie => new Date(movie.release_date) > currentDate)
      .sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime())
      .slice(0, 10);
  };

  const getMovieById = (id: number): Movie | undefined => {
    return movies.find(movie => movie.id === id);
  };

  const getGenreNames = (genreIds: number[]): string[] => {
    return genreIds
      .map(id => genres.find(genre => genre.id === id)?.name)
      .filter(Boolean) as string[];
  };

  const value: MovieContextType = {
    movies,
    genres,
    watchlist,
    searchQuery,
    selectedGenre,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    setSearchQuery,
    setSelectedGenre,
    getFilteredMovies,
    getTrendingMovies,
    getNowPlayingMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getMovieById,
    getGenreNames,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};