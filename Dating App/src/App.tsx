import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from './stores/authStore';
import { useAppStore } from './stores/appStore';
import { AuthForm } from './components/auth/AuthForm';
import { SwipeStack } from './components/swipe/SwipeStack';
import { MatchesList } from './components/matches/MatchesList';
import { ExploreView } from './components/explore/ExploreView';
import { ProfileView } from './components/profile/ProfileView';
import { BottomNav } from './components/navigation/BottomNav';
import { LoadingSpinner } from './components/common/LoadingSpinner';

function App() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const { theme, currentView } = useAppStore();

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <AuthForm />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: theme === 'dark' ? '#374151' : '#ffffff',
              color: theme === 'dark' ? '#ffffff' : '#374151',
            },
          }}
        />
      </>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <SwipeStack />;
      case 'matches':
        return <MatchesList />;
      case 'explore':
        return <ExploreView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <SwipeStack />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex flex-col pb-20"
        >
          {renderCurrentView()}
        </motion.div>
      </AnimatePresence>

      <BottomNav />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme === 'dark' ? '#374151' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#374151',
          },
        }}
      />
    </div>
  );
}

export default App;