import React, { useState, useCallback, useEffect } from 'react';
import { QrCode } from 'lucide-react';
import { ViewMode, ScanResult } from './types';
import { useTheme } from './hooks/useTheme';
import { detectQRType } from './utils/qrUtils';
import { saveToHistory, getHistory, clearHistory, removeFromHistory } from './utils/storage';
import { Scanner } from './components/Scanner';
import { Result } from './components/Result';
import { History } from './components/History';
import { Navigation } from './components/Navigation';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('scanner');
  const [currentResult, setCurrentResult] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState<ScanResult[]>(() => getHistory());
  const { theme } = useTheme();

  // Ensure theme is applied on mount
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleScanResult = useCallback((content: string) => {
    const result: ScanResult = {
      id: Date.now().toString(),
      content,
      type: detectQRType(content),
      timestamp: Date.now(),
      date: new Date().toLocaleString(),
    };

    setCurrentResult(result);
    setCurrentView('result');
    
    // Save to history
    saveToHistory(result);
    setHistory(getHistory());
  }, []);

  const handleBackToScanner = useCallback(() => {
    setCurrentResult(null);
    setCurrentView('scanner');
  }, []);

  const handleClearHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  const handleRemoveFromHistory = useCallback((id: string) => {
    removeFromHistory(id);
    setHistory(getHistory());
  }, []);

  const handleSelectFromHistory = useCallback((result: ScanResult) => {
    setCurrentResult(result);
    setCurrentView('result');
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'scanner':
        return <Scanner onScanResult={handleScanResult} />;
      case 'result':
        return currentResult ? (
          <Result result={currentResult} onBack={handleBackToScanner} />
        ) : null;
      case 'history':
        return (
          <History
            history={history}
            onClearHistory={handleClearHistory}
            onRemoveItem={handleRemoveFromHistory}
            onSelectResult={handleSelectFromHistory}
          />
        );
      default:
        return <Scanner onScanResult={handleScanResult} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-xl">
              <QrCode className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              QR Scanner
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col" style={{ height: 'calc(100vh - 140px)' }}>
        {renderCurrentView()}
      </main>

      {/* Navigation */}
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        historyCount={history.length}
      />
    </div>
  );
}

export default App;