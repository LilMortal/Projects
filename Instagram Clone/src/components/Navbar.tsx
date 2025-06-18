import React, { useState } from 'react';
import { Home, Search, PlusCircle, Heart, User, Moon, Sun, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/appStore';
import { CreatePostModal } from './modals/CreatePostModal';

export function Navbar() {
  const { profile, signOut } = useAuthStore();
  const { darkMode, toggleDarkMode } = useAppStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                InstaClone
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
                <Home className="w-6 h-6 text-gray-700 dark:text-dark-200" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
                <Search className="w-6 h-6 text-gray-700 dark:text-dark-200" />
              </button>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              >
                <PlusCircle className="w-6 h-6 text-gray-700 dark:text-dark-200" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
                <Heart className="w-6 h-6 text-gray-700 dark:text-dark-200" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                >
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.username}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-700 dark:text-dark-200" />
                  )}
                </button>

                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-600 py-2">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-600">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        @{profile?.username}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-dark-400">
                        {profile?.email}
                      </p>
                    </div>
                    <button
                      onClick={toggleDarkMode}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-700"
                    >
                      {darkMode ? (
                        <>
                          <Sun className="w-4 h-4 mr-2" />
                          Light Mode
                        </>
                      ) : (
                        <>
                          <Moon className="w-4 h-4 mr-2" />
                          Dark Mode
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-dark-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-700 dark:text-dark-200" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-dark-200" />
                )}
              </button>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.username}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-gray-700 dark:text-dark-200" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-around py-2">
            <button className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
              <Home className="w-6 h-6 text-gray-700 dark:text-dark-200" />
            </button>
            <button className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
              <Search className="w-6 h-6 text-gray-700 dark:text-dark-200" />
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            >
              <PlusCircle className="w-6 h-6 text-gray-700 dark:text-dark-200" />
            </button>
            <button className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
              <Heart className="w-6 h-6 text-gray-700 dark:text-dark-200" />
            </button>
          </div>
        </div>
      </nav>

      <CreatePostModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </>
  );
}