import React from 'react';
import { useApp } from '../context/AppContext';
import Navigation from './Navigation';
import { Sun, Moon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { state, dispatch } = useApp();

  const toggleTheme = () => {
    dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="flex flex-col min-h-screen">
        <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          state.theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-indigo-600 bg-clip-text text-transparent">
                  BookVault
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    state.theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  aria-label="Toggle theme"
                >
                  {state.theme === 'light' ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                </button>
                
                {state.user ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {state.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden sm:block text-sm font-medium">{state.user.name}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      // Mock login for demo
                      dispatch({ 
                        type: 'SET_USER', 
                        payload: { 
                          id: '1', 
                          email: 'demo@example.com', 
                          name: 'Demo User' 
                        } 
                      });
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-lg hover:from-emerald-600 hover:to-indigo-700 transition-all duration-200 font-medium"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}