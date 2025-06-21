import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Percent, Plus } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { PortfolioStock } from './PortfolioStock';

export const Portfolio: React.FC = () => {
  const { portfolio } = useStore();

  const portfolioStats = useMemo(() => {
    const totalValue = portfolio.reduce((sum, stock) => sum + stock.currentValue, 0);
    const totalInvested = portfolio.reduce((sum, stock) => sum + stock.totalInvested, 0);
    const totalGainLoss = totalValue - totalInvested;
    const totalGainLossPercent = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

    return {
      totalValue,
      totalInvested,
      totalGainLoss,
      totalGainLossPercent,
      stockCount: portfolio.length
    };
  }, [portfolio]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-dark-50 border border-gray-800 rounded-xl p-6 hover:border-electric-500/50 
                        transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-electric-500/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-electric-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Value</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(portfolioStats.totalValue)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-dark-50 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 
                        transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Invested</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(portfolioStats.totalInvested)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-dark-50 border border-gray-800 rounded-xl p-6 hover:border-neon-500/50 
                        transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${portfolioStats.totalGainLoss >= 0 ? 'bg-neon-500/20' : 'bg-red-500/20'}`}>
              {portfolioStats.totalGainLoss >= 0 ? (
                <TrendingUp className="w-6 h-6 text-neon-500" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-500" />
              )}
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total P&L</p>
              <p className={`text-2xl font-bold ${portfolioStats.totalGainLoss >= 0 ? 'text-neon-500' : 'text-red-500'}`}>
                {portfolioStats.totalGainLoss >= 0 ? '+' : ''}{formatCurrency(portfolioStats.totalGainLoss)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-dark-50 border border-gray-800 rounded-xl p-6 hover:border-yellow-500/50 
                        transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${portfolioStats.totalGainLossPercent >= 0 ? 'bg-neon-500/20' : 'bg-red-500/20'}`}>
              <Percent className={`w-6 h-6 ${portfolioStats.totalGainLossPercent >= 0 ? 'text-neon-500' : 'text-red-500'}`} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Return %</p>
              <p className={`text-2xl font-bold ${portfolioStats.totalGainLossPercent >= 0 ? 'text-neon-500' : 'text-red-500'}`}>
                {portfolioStats.totalGainLossPercent >= 0 ? '+' : ''}{portfolioStats.totalGainLossPercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Holdings */}
      <div className="bg-dark-50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Holdings ({portfolioStats.stockCount})
          </h2>
        </div>

        {portfolio.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-400 mb-2">No holdings yet</h3>
            <p className="text-gray-500 mb-4">
              Start building your portfolio by buying stocks from the market
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {portfolio.map((stock) => (
              <PortfolioStock key={stock.symbol} stock={stock} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};