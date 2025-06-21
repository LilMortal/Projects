import React, { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { MarketOverview } from './components/market/MarketOverview';
import { Portfolio } from './components/portfolio/Portfolio';
import { Watchlist } from './components/watchlist/Watchlist';
import { TransactionHistory } from './components/history/TransactionHistory';
import { StockDetailModal } from './components/modals/StockDetailModal';
import { useStore } from './store/useStore';
import { useStockUpdates } from './hooks/useStockUpdates';

function App() {
  const { activeTab, updatePortfolio } = useStore();
  
  // Initialize portfolio calculations
  useEffect(() => {
    updatePortfolio();
  }, [updatePortfolio]);

  // Enable real-time price updates
  useStockUpdates();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'market':
        return <MarketOverview />;
      case 'portfolio':
        return <Portfolio />;
      case 'watchlist':
        return <Watchlist />;
      case 'history':
        return <TransactionHistory />;
      default:
        return <MarketOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-200 font-inter">
      <Header />
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </main>

      <StockDetailModal />
    </div>
  );
}

export default App;