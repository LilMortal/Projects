import React from 'react';
import { MemoryProvider } from './contexts/MemoryContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import MemoryGrid from './components/MemoryGrid';
import CalendarView from './components/CalendarView';
import CreateMemoryModal from './components/CreateMemoryModal';
import MemoryDetailModal from './components/MemoryDetailModal';
import { useMemory } from './contexts/MemoryContext';

const AppContent: React.FC = () => {
  const { state } = useMemory();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {state.viewMode === 'grid' ? <MemoryGrid /> : <CalendarView />}
      </main>

      <CreateMemoryModal />
      <MemoryDetailModal />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <MemoryProvider>
        <AppContent />
      </MemoryProvider>
    </ThemeProvider>
  );
}

export default App;