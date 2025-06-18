import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { useChatStore } from './store/chatStore';
import { useUIStore } from './store/uiStore';
import { useNotifications } from './hooks/useNotifications';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoginForm } from './components/auth/LoginForm';
import { Sidebar } from './components/sidebar/Sidebar';
import { ChatWindow } from './components/chat/ChatWindow';

function App() {
  const { isAuthenticated, user } = useAuthStore();
  const { initializeDemoData } = useChatStore();
  const { isDarkMode } = useUIStore();
  const { updateBadge } = useNotifications();

  // Initialize dark mode on app start
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Initialize demo data when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      initializeDemoData(user.id);
    }
  }, [isAuthenticated, user, initializeDemoData]);

  // Update badge count
  useEffect(() => {
    updateBadge();
  }, [updateBadge]);

  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <LoginForm />
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: isDarkMode ? '#374151' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#000000',
            },
          }}
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <ChatWindow />
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: isDarkMode ? '#374151' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#000000',
            },
          }}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;