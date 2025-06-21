import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const useStockUpdates = () => {
  const { stocks, setStocks, updatePortfolio } = useStore();

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedStocks = stocks.map(stock => {
        // Simulate small price changes
        const volatility = 0.005; // 0.5% max change per update
        const randomChange = (Math.random() - 0.5) * 2 * volatility;
        const newPrice = Math.max(0.01, stock.price * (1 + randomChange));
        const change = newPrice - stock.previousClose;
        const changePercent = (change / stock.previousClose) * 100;

        return {
          ...stock,
          price: Math.round(newPrice * 100) / 100,
          change: Math.round(change * 100) / 100,
          changePercent: Math.round(changePercent * 100) / 100,
          high: Math.max(stock.high, newPrice),
          low: Math.min(stock.low, newPrice),
        };
      });

      setStocks(updatedStocks);
      updatePortfolio();
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [stocks, setStocks, updatePortfolio]);
};