import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Home, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-white hover:text-neon-cyan transition-colors duration-200"
          >
            <Sparkles className="w-8 h-8" />
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              GifHub
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-neon-cyan/20 text-neon-cyan' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-800'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/favorites"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/favorites') 
                  ? 'bg-neon-pink/20 text-neon-pink' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-800'
              }`}
            >
              <Heart className="w-5 h-5" />
              <span className="hidden sm:inline">Favorites</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;