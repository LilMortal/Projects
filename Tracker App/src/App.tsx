import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import { AuthForm } from './components/auth/AuthForm';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/dashboard/Dashboard';
import { CreateTrackerForm } from './components/tracker/CreateTrackerForm';
import { HistoryView } from './components/history/HistoryView';
import { SettingsView } from './components/settings/SettingsView';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onCreateTracker={() => setCurrentView('create')} />;
      case 'create':
        return (
          <CreateTrackerForm
            onBack={() => setCurrentView('dashboard')}
            onSuccess={() => setCurrentView('dashboard')}
          />
        );
      case 'history':
        return <HistoryView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard onCreateTracker={() => setCurrentView('create')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="container mx-auto px-4 py-8">
        {renderView()}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1F2937',
              color: '#F9FAFB',
              border: '1px solid #374151',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#F9FAFB',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#F9FAFB',
              },
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;