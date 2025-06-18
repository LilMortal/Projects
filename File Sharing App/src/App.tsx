import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Layout/Header';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { ForgotPasswordForm } from './components/Auth/ForgotPasswordForm';
import { FileUpload } from './components/Upload/FileUpload';
import { FileDashboard } from './components/Dashboard/FileDashboard';
import { AnalyticsDashboard } from './components/Analytics/AnalyticsDashboard';
import { SharePage } from './components/Share/SharePage';
import { useAuthStore } from './stores/authStore';
import { useThemeStore } from './stores/themeStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload } from 'lucide-react';

type AuthView = 'login' | 'register' | 'forgot-password';
type MainView = 'dashboard' | 'upload' | 'analytics';

function App() {
  const { isAuthenticated, user } = useAuthStore();
  const { theme } = useThemeStore();
  const [authView, setAuthView] = useState<AuthView>('login');
  const [mainView, setMainView] = useState<MainView>('dashboard');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const AuthPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-4">
            <Upload className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            FileShare
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Secure file sharing made simple
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <AnimatePresence mode="wait">
            {authView === 'login' && (
              <LoginForm
                key="login"
                onSwitchToRegister={() => setAuthView('register')}
                onForgotPassword={() => setAuthView('forgot-password')}
              />
            )}
            {authView === 'register' && (
              <RegisterForm
                key="register"
                onSwitchToLogin={() => setAuthView('login')}
              />
            )}
            {authView === 'forgot-password' && (
              <ForgotPasswordForm
                key="forgot-password"
                onBack={() => setAuthView('login')}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  const MainApp = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header currentView={mainView} onViewChange={setMainView} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {mainView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  My Files
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Manage and share your uploaded files
                </p>
              </div>
              <FileDashboard />
            </motion.div>
          )}
          
          {mainView === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Upload Files
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Upload and share your files securely
                </p>
              </div>
              <FileUpload />
            </motion.div>
          )}
          
          {mainView === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <AnalyticsDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/share/:shareId" element={<SharePage />} />
          <Route
            path="/*"
            element={
              isAuthenticated ? <MainApp /> : <AuthPage />
            }
          />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: theme === 'dark' ? '#374151' : '#ffffff',
              color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
              border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb',
            },
          }}
        />
      </Router>
    </ErrorBoundary>
  );
}

export default App;