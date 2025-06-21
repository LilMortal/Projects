import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import GifGrid from '../components/GifGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import { GifData, GiphyResponse } from '../types';
import { giphyApi } from '../utils/api';
import { useAppContext } from '../context/AppContext';

const Home: React.FC = () => {
  const { searchTerm, setIsLoading, setError, isLoading, error } = useAppContext();
  const [gifs, setGifs] = useState<GifData[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchGifs = useCallback(async (query: string, currentOffset: number = 0, append: boolean = false) => {
    try {
      if (!append) setIsLoading(true);
      else setLoadingMore(true);
      
      setError(null);

      const response: GiphyResponse = await giphyApi.searchGifs({
        q: query || undefined,
        limit: 25,
        offset: currentOffset,
      });

      const newGifs = response.data;
      
      if (append) {
        setGifs(prev => [...prev, ...newGifs]);
      } else {
        setGifs(newGifs);
      }

      setHasMore(newGifs.length === 25);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch GIFs');
    } finally {
      setIsLoading(false);
      setLoadingMore(false);
    }
  }, [setIsLoading, setError]);

  const handleSearch = useCallback(async (query: string) => {
    setOffset(0);
    await fetchGifs(query, 0, false);
  }, [fetchGifs]);

  const loadMore = useCallback(async () => {
    if (hasMore && !loadingMore) {
      const newOffset = offset + 25;
      setOffset(newOffset);
      await fetchGifs(searchTerm, newOffset, true);
    }
  }, [hasMore, loadingMore, offset, searchTerm, fetchGifs]);

  // Initial load - trending GIFs
  useEffect(() => {
    fetchGifs('');
  }, [fetchGifs]);

  // Scroll event listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return (
    <div className="min-h-screen bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
            Discover Amazing{' '}
            <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
              GIFs
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Search and explore millions of GIFs, save your favorites, and express yourself with the perfect animated moment.
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">
            {searchTerm ? `Search results for "${searchTerm}"` : 'Trending GIFs'}
          </h2>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-8">
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => fetchGifs(searchTerm)}
              className="mt-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        )}

        {/* GIF Grid */}
        <GifGrid gifs={gifs} loading={isLoading && gifs.length === 0} />

        {/* Load More Spinner */}
        {loadingMore && <LoadingSpinner />}

        {/* End of Results */}
        {!hasMore && gifs.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">You've reached the end! 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;