import React, { useState, useMemo } from 'react';
import { X, TrendingUp, TrendingDown, Plus, Minus } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { StockChart } from '../charts/StockChart';
import { generateHistoricalData } from '../../data/mockStocks';

export const StockDetailModal: React.FC = () => {
  const { selectedStock, setSelectedStock, buyStock, sellStock, portfolio, addToWatchlist, 
          removeFromWatchlist, watchlist } = useStore();
  const [activeAction, setActiveAction] = useState<'buy' | 'sell'>('buy');
  const [shares, setShares] = useState(1);

  const historicalData = useMemo(() => {
    if (!selectedStock) return [];
    return generateHistoricalData(selectedStock.symbol);
  }, [selectedStock]);

  const portfolioStock = useMemo(() => {
    if (!selectedStock) return null;
    return portfolio.find(p => p.symbol === selectedStock.symbol);
  }, [selectedStock, portfolio]);

  const isInWatchlist = selectedStock ? watchlist.includes(selectedStock.symbol) : false;

  if (!selectedStock) return null;

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

  const handleTransaction = () => {
    if (shares <= 0) return;

    if (activeAction === 'buy') {
      buyStock(selectedStock.symbol, shares, selectedStock.price);
    } else {
      if (!portfolioStock || portfolioStock.shares < shares) {
        alert('Insufficient shares to sell');
        return;
      }
      sellStock(selectedStock.symbol, shares, selectedStock.price);
    }
    
    setShares(1);
    setSelectedStock(null);
  };

  const maxSellShares = portfolioStock?.shares || 0;
  const totalCost = shares * selectedStock.price;
  const isPositive = selectedStock.change >= 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-50 border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] 
                      overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-dark-50 border-b border-gray-800 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-2xl font-bold text-white">{selectedStock.symbol}</h2>
              <p className="text-gray-400">{selectedStock.name}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium
                            ${isPositive 
                              ? 'bg-neon-500/20 text-neon-500 border border-neon-500/30' 
                              : 'bg-red-500/20 text-red-500 border border-red-500/30'
                            }`}>
              {selectedStock.sector}
            </div>
          </div>
          <button
            onClick={() => setSelectedStock(null)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Price Information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Current Price</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(selectedStock.price)}</p>
              <div className={`flex items-center justify-center space-x-1 mt-2 ${
                isPositive ? 'text-neon-500' : 'text-red-500'
              }`}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-medium">
                  {isPositive ? '+' : ''}{formatCurrency(selectedStock.change)} 
                  ({isPositive ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Market Cap</p>
              <p className="text-xl font-bold text-white">{formatMarketCap(selectedStock.marketCap)}</p>
            </div>

            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Volume</p>
              <p className="text-xl font-bold text-white">
                {(selectedStock.volume / 1000000).toFixed(1)}M
              </p>
            </div>

            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Day Range</p>
              <p className="text-sm text-white">
                {formatCurrency(selectedStock.low)} - {formatCurrency(selectedStock.high)}
              </p>
            </div>
          </div>

          {/* Chart */}
          <StockChart data={historicalData} symbol={selectedStock.symbol} />

          {/* Portfolio Information */}
          {portfolioStock && (
            <div className="bg-dark-100 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Your Position</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Shares Owned</p>
                  <p className="text-xl font-bold text-white">{portfolioStock.shares}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Avg Price</p>
                  <p className="text-xl font-bold text-white">{formatCurrency(portfolioStock.avgPrice)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Current Value</p>
                  <p className="text-xl font-bold text-white">{formatCurrency(portfolioStock.currentValue)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total P&L</p>
                  <p className={`text-xl font-bold ${portfolioStock.gainLoss >= 0 ? 'text-neon-500' : 'text-red-500'}`}>
                    {portfolioStock.gainLoss >= 0 ? '+' : ''}{formatCurrency(portfolioStock.gainLoss)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Trading Actions */}
          <div className="bg-dark-100 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Trade</h3>
              <button
                onClick={() => isInWatchlist ? removeFromWatchlist(selectedStock.symbol) : addToWatchlist(selectedStock.symbol)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200
                           ${isInWatchlist 
                             ? 'bg-red-500 hover:bg-red-600 text-white' 
                             : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                           }`}
              >
                {isInWatchlist ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
              </button>
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveAction('buy')}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200
                           ${activeAction === 'buy' 
                             ? 'bg-neon-500 text-white shadow-lg shadow-neon-500/25' 
                             : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                           }`}
              >
                Buy
              </button>
              <button
                onClick={() => setActiveAction('sell')}
                disabled={!portfolioStock || portfolioStock.shares === 0}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200
                           ${activeAction === 'sell' 
                             ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' 
                             : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                           } ${(!portfolioStock || portfolioStock.shares === 0) 
                             ? 'opacity-50 cursor-not-allowed' 
                             : ''
                           }`}
              >
                Sell
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Number of Shares {activeAction === 'sell' && maxSellShares > 0 && `(Max: ${maxSellShares})`}
                </label>
                <input
                  type="number"
                  min="1"
                  max={activeAction === 'sell' ? maxSellShares : undefined}
                  value={shares}
                  onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-3 bg-dark-50 border border-gray-700 rounded-lg 
                           text-white focus:outline-none focus:ring-2 focus:ring-electric-500 
                           focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between py-4 px-6 bg-dark-50 rounded-lg">
                <span className="text-gray-400">Total {activeAction === 'buy' ? 'Cost' : 'Proceeds'}:</span>
                <span className="text-xl font-bold text-white">{formatCurrency(totalCost)}</span>
              </div>

              <button
                onClick={handleTransaction}
                disabled={shares <= 0 || (activeAction === 'sell' && shares > maxSellShares)}
                className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-all duration-200
                           ${activeAction === 'buy' 
                             ? 'bg-neon-500 hover:bg-neon-600 shadow-lg shadow-neon-500/25' 
                             : 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25'
                           } disabled:opacity-50 disabled:cursor-not-allowed
                           hover:scale-105 active:scale-95`}
              >
                {activeAction === 'buy' ? 'Buy Shares' : 'Sell Shares'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};