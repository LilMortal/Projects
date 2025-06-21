import React from 'react';
import { TrendingUp, TrendingDown, Minus, Plus } from 'lucide-react';
import { PortfolioStock as PortfolioStockType } from '../../types';
import { useStore } from '../../store/useStore';

interface PortfolioStockProps {
  stock: PortfolioStockType;
}

export const PortfolioStock: React.FC<PortfolioStockProps> = ({ stock }) => {
  const { stocks, setSelectedStock } = useStore();
  const currentStock = stocks.find(s => s.symbol === stock.symbol);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  if (!currentStock) return null;

  return (
    <div className="bg-dark-100 border border-gray-700 rounded-lg p-4 hover:border-electric-500/50 
                    transition-all duration-300 hover:shadow-lg hover:shadow-electric-500/10 
                    group cursor-pointer"
         onClick={() => setSelectedStock(currentStock)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-electric-400 
                           transition-colors duration-200">
              {stock.symbol}
            </h3>
            <p className="text-sm text-gray-400">{currentStock.name}</p>
          </div>

          <div className="text-sm text-gray-400">
            <p>{stock.shares} shares @ {formatCurrency(stock.avgPrice)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-right">
            <p className="text-sm text-gray-400">Current Value</p>
            <p className="text-lg font-bold text-white">
              {formatCurrency(stock.currentValue)}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-400">Total P&L</p>
            <div className={`flex items-center space-x-1 ${stock.gainLoss >= 0 ? 'text-neon-500' : 'text-red-500'}`}>
              {stock.gainLoss >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-bold">
                {stock.gainLoss >= 0 ? '+' : ''}{formatCurrency(stock.gainLoss)}
              </span>
              <span className="text-sm">
                ({stock.gainLoss >= 0 ? '+' : ''}{stock.gainLossPercent.toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-400">Current Price</p>
            <p className="text-lg font-bold text-white">
              {formatCurrency(currentStock.price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};