import React from 'react';
import { Heart, TrendingUp } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { StockCard } from '../common/StockCard';

export const Watchlist: React.FC = () => {
  const { stocks, watchlist } = useStore();
  
  const watchlistStocks = stocks.filter(stock => watchlist.includes(stock.symbol));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Your Watchlist ({watchlistStocks.length})
        </h2>
      </div>

      {watchlistStocks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-400 mb-2">Your watchlist is empty</h3>
          <p className="text-gray-500 mb-4">
            Add stocks to your watchlist to keep track of your favorites
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <TrendingUp className="w-4 h-4" />
            <span>Browse stocks in the Market tab to get started</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlistStocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      )}
    </div>
  );
};