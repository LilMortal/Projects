export interface GifData {
  id: string;
  title: string;
  url: string;
  images: {
    fixed_height: {
      url: string;
      width: string;
      height: string;
    };
    fixed_height_still: {
      url: string;
      width: string;
      height: string;
    };
    original: {
      url: string;
      width: string;
      height: string;
    };
  };
  user?: {
    display_name: string;
    username: string;
  };
  source_tld?: string;
}

export interface GiphyResponse {
  data: GifData[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
}

export interface AppState {
  favorites: GifData[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
}

export interface AppContextType extends AppState {
  addToFavorites: (gif: GifData) => void;
  removeFromFavorites: (gifId: string) => void;
  isFavorite: (gifId: string) => boolean;
  setSearchTerm: (term: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}