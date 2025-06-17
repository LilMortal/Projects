export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieContextType {
  movies: Movie[];
  genres: Genre[];
  watchlist: Movie[];
  searchQuery: string;
  selectedGenre: number | null;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genreId: number | null) => void;
  getFilteredMovies: () => Movie[];
  getTrendingMovies: () => Movie[];
  getNowPlayingMovies: () => Movie[];
  getTopRatedMovies: () => Movie[];
  getUpcomingMovies: () => Movie[];
  getMovieById: (id: number) => Movie | undefined;
  getGenreNames: (genreIds: number[]) => string[];
}