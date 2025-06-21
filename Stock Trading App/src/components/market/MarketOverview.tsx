import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { StockCard } from '../common/StockCard';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const MarketOverview: React.FC = () => {
  const { stocks, searchQuery, loading } = useStore();

  const filteredStocks = useMemo(() => {
    if (!searchQuery) return stocks;
    
    return stocks.filter((stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [stocks, searchQuery]);

  const marketStats = useMemo(() => {
    const gainers = stocks.filter(stock => stock.change > 0).length;
    const losers = stocks.filter(stock => stock.change < 0).length;
    const totalVolume = stocks.reduce((sum, stock) => sum + stock.volume, 0);
    const avgChange = stocks.reduce((sum, stock) => sum + stock.changePercent, 0) / stocks.length;

    return { gainers, losers, totalVolume, avgChange };
  }, [stocks]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Market Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-dark-50 border border-gray-800 rounded-xl p-6 hover:border-neon-500/50 
                        transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-neon-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-neon-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Gainers</p>
              <p className="text-2xl font-bold text-white">{marketStats.gainers}</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-50 border border-gray-800 rounded-xl p-6 hover:border-red-500/50 
                        transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-500/20 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Decliners</p>
              <p className="text-2xl font-bold text-white">{marketStats.losers}</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-50 border border-gray-800 rounded-xl p-6 hover:border-electric-500/50 
                        transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-electric-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-electric-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Volume</p>
              <p className="text-2xl font-bold text-white">
                {(marketStats.totalVolume / 1000000).toFixed(0)}M
              </p>
            </div>
          </div>
        </div>

        <div className="bg-dark-50 border border-gray-800 rounded-xl p-6 hover:border-yellow-500/50 
                        transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Avg Change</p>
              <p className={`text-2xl font-bold ${marketStats.avgChange >= 0 ? 'text-neon-500' : 'text-red-500'}`}>
                {marketStats.avgChange >= 0 ? '+' : ''}{marketStats.avgChange.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Search Results for "{searchQuery}" ({filteredStocks.length})
          </h2>
        </div>
      )}

      {/* Stock Grid */}
      {filteredStocks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-400 mb-2">No stocks found</h3>
          <p className="text-gray-500">
            {searchQuery ? 'Try adjusting your search terms' : 'No stocks available'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      )}
    </div>
  );
};