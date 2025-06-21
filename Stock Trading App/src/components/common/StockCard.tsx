import React from 'react';
import { TrendingUp, TrendingDown, Plus, Minus, Eye } from 'lucide-react';
import { Stock } from '../../types';
import { useStore } from '../../store/useStore';

interface StockCardProps {
  stock: Stock;
  showActions?: boolean;
}

export const StockCard: React.FC<StockCardProps> = ({ stock, showActions = true }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist, setSelectedStock } = useStore();
  const isInWatchlist = watchlist.includes(stock.symbol);
  const isPositive = stock.change >= 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return formatCurrency(value);
  };

  return (
    <div className="bg-dark-50 border border-gray-800 rounded-xl p-6 hover:border-electric-500/50 
                    transition-all duration-300 hover:shadow-lg hover:shadow-electric-500/10 
                    group cursor-pointer animate-fade-in"
         onClick={() => setSelectedStock(stock)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-electric-400 
                         transition-colors duration-200">
            {stock.symbol}
          </h3>
          <p className="text-sm text-gray-400 truncate max-w-48">{stock.name}</p>
          <p className="text-xs text-gray-500 mt-1">{stock.sector}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {isPositive ? (
            <TrendingUp className="w-5 h-5 text-neon-500" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-500" />
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline space-x-3">
          <span className="text-2xl font-bold text-white">
            {formatCurrency(stock.price)}
          </span>
          <span className={`text-sm font-medium flex items-center space-x-1
                           ${isPositive ? 'text-neon-500' : 'text-red-500'}`}>
            <span>{isPositive ? '+' : ''}{formatCurrency(stock.change)}</span>
            <span>({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Volume</p>
            <p className="text-white font-medium">
              {(stock.volume / 1000000).toFixed(1)}M
            </p>
          </div>
          <div>
            <p className="text-gray-400">Market Cap</p>
            <p className="text-white font-medium">
              {formatMarketCap(stock.marketCap)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-gray-500">
            <span>H: {formatCurrency(stock.high)}</span>
            <span className="mx-2">•</span>
            <span>L: {formatCurrency(stock.low)}</span>
          </div>
          
          {showActions && (
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 
                           transition-opacity duration-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStock(stock);
                }}
                className="p-1.5 bg-electric-500 hover:bg-electric-600 text-white 
                         rounded-lg transition-colors duration-200"
                title="View Details"
              >
                <Eye className="w-3 h-3" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  isInWatchlist ? removeFromWatchlist(stock.symbol) : addToWatchlist(stock.symbol);
                }}
                className={`p-1.5 rounded-lg transition-colors duration-200
                           ${isInWatchlist 
                             ? 'bg-red-500 hover:bg-red-600 text-white' 
                             : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                           }`}
                title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              >
                {isInWatchlist ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};