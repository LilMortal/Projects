import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAppStore } from './store/appStore';
import { useAuthStore } from './store/authStore';
import { Layout } from './components/Layout';
import { Feed } from './components/Feed';

function App() {
  const { darkMode, setDarkMode } = useAppStore();
  const { initialize } = useAuthStore();

  useEffect(() => {
    // Initialize auth on app start
    initialize();

    // Set initial dark mode based on system preference if not set
    if (darkMode === undefined) {
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(systemDarkMode);
    }
  }, [initialize, darkMode, setDarkMode]);

  return (
    <>
      <Layout>
        <Feed />
      </Layout>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: darkMode ? '#27272a' : '#fff',
            color: darkMode ? '#f4f4f5' : '#111827',
            border: darkMode ? '1px solid #3f3f46' : '1px solid #e5e7eb',
          },
        }}
      />
    </>
  );
}

export default App;