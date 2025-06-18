import React, { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { MasonryGrid } from './components/pins/MasonryGrid';
import { PinModal } from './components/modals/PinModal';
import { AuthModal } from './components/modals/AuthModal';
import { CreatePinModal } from './components/modals/CreatePinModal';
import { useAppStore } from './store/appStore';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { mockPins } from './data/mockData';

function App() {
  const {
    theme,
    selectedPin,
    showPinModal,
    showAuthModal,
    showCreatePinModal,
    setSelectedPin,
    setShowPinModal,
    setTheme,
  } = useAppStore();

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-storage');
    if (savedTheme) {
      const parsed = JSON.parse(savedTheme);
      if (parsed.state?.theme) {
        setTheme(parsed.state.theme);
      }
    }
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme, setTheme]);

  // Mock infinite scroll
  const { items: pins, loading } = useInfiniteScroll({
    initialItems: mockPins,
    loadMore: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Return duplicated pins with new IDs for demo
      return mockPins.map((pin, index) => ({
        ...pin,
        id: `${pin.id}-${Date.now()}-${index}`,
      }));
    },
    hasMore: true,
  });

  const handlePinClick = (pin: typeof mockPins[0]) => {
    setSelectedPin(pin);
    setShowPinModal(true);
  };

  const handleCloseModal = () => {
    setShowPinModal(false);
    setSelectedPin(null);
  };

  return (
    <div className={`min-h-screen bg-white dark:bg-dark-bg transition-colors ${theme}`}>
      <Header />
      
      <main className="pt-8 pb-16">
        <MasonryGrid 
          pins={pins} 
          onPinClick={handlePinClick}
          loading={loading}
        />
      </main>

      {/* Modals */}
      {showPinModal && selectedPin && (
        <PinModal pin={selectedPin} onClose={handleCloseModal} />
      )}
      
      {showAuthModal && <AuthModal />}
      
      {showCreatePinModal && <CreatePinModal />}
    </div>
  );
}

export default App;