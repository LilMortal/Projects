import React from 'react';
import { Search, User, Plus, Moon, Sun, Home, Heart } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';

export const Header: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { 
    theme, 
    searchQuery, 
    toggleTheme, 
    setSearchQuery, 
    setShowAuthModal, 
    setShowCreatePinModal,
    setAuthMode 
  } = useAppStore();

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-pinterest-red cursor-pointer">
              Pinterest
            </h1>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors">
                <Home size={20} />
                <span className="font-medium">Home</span>
              </button>
              {isAuthenticated && (
                <button 
                  className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
                  onClick={() => setShowCreatePinModal(true)}
                >
                  <Plus size={20} />
                  <span className="font-medium">Create</span>
                </button>
              )}
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for ideas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-dark-surface rounded-full border-none focus:outline-none focus:ring-2 focus:ring-pinterest-red focus:bg-white dark:focus:bg-dark-surface-hover transition-all"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {isAuthenticated ? (
              <>
                {/* Create Pin Button - Mobile */}
                <button 
                  className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
                  onClick={() => setShowCreatePinModal(true)}
                >
                  <Plus size={20} />
                </button>
                
                {/* Profile */}
                <div className="flex items-center space-x-3">
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors">
                    <Heart size={20} />
                  </button>
                  
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-pinterest-red text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAuthClick('login')}
                  className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-surface rounded-full transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="px-4 py-2 bg-pinterest-red text-white rounded-full hover:bg-pinterest-red-dark transition-colors"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};