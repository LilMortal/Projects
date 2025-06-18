import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  initialItems: any[];
  loadMore: () => Promise<any[]>;
  hasMore: boolean;
}

export const useInfiniteScroll = ({ 
  initialItems, 
  loadMore, 
  hasMore 
}: UseInfiniteScrollOptions) => {
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const newItems = await loadMore();
      setItems(prev => [...prev, ...newItems]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more items');
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, loadMore]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleLoadMore]);

  return {
    items,
    loading,
    error,
    loadMore: handleLoadMore,
  };
};