import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Home, Search, User } from 'lucide-react';
import { useChirpContext } from '../context/ChirpContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useChirpContext();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-sky-500 to-violet-500 p-2 rounded-xl group-hover:scale-105 transition-transform duration-200">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
              Chirp
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive('/')
                  ? 'bg-sky-100 text-sky-700'
                  : 'text-gray-600 hover:text-sky-600 hover:bg-sky-50'
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/explore"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive('/explore')
                  ? 'bg-violet-100 text-violet-700'
                  : 'text-gray-600 hover:text-violet-600 hover:bg-violet-50'
              }`}
            >
              <Search className="h-5 w-5" />
              <span>Explore</span>
            </Link>

            <Link
              to={`/profile/${currentUser.id}`}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                location.pathname.includes('/profile')
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.displayName}
                className="h-5 w-5 rounded-full"
              />
              <span>Profile</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;