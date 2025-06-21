import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActivityStore } from './store/activityStore';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ActivityList } from './components/Activities/ActivityList';
import { ActivityForm } from './components/ActivityForm/ActivityForm';

type View = 'dashboard' | 'activities' | 'add';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const { theme, currentActivity } = useActivityStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Switch to add/edit view when currentActivity is set
  useEffect(() => {
    if (currentActivity) {
      setCurrentView('add');
    }
  }, [currentActivity]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'activities':
        return <ActivityList />;
      case 'add':
        return <ActivityForm />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-500">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-primary-200/20 to-secondary-200/20 dark:from-primary-800/10 dark:to-secondary-800/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-accent-200/20 to-success-200/20 dark:from-accent-800/10 dark:to-success-800/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

export default App;