import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, User } from 'lucide-react';
import { useChirpContext } from '../context/ChirpContext';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useChirpContext();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2">
        <Link
          to="/"
          className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all duration-200 ${
            isActive('/')
              ? 'text-sky-600'
              : 'text-gray-500 hover:text-sky-600'
          }`}
        >
          <Home className={`h-6 w-6 ${isActive('/') ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium">Home</span>
        </Link>

        <Link
          to="/explore"
          className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all duration-200 ${
            isActive('/explore')
              ? 'text-violet-600'
              : 'text-gray-500 hover:text-violet-600'
          }`}
        >
          <Search className={`h-6 w-6 ${isActive('/explore') ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium">Explore</span>
        </Link>

        <Link
          to={`/profile/${currentUser.id}`}
          className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all duration-200 ${
            location.pathname.includes('/profile')
              ? 'text-emerald-600'
              : 'text-gray-500 hover:text-emerald-600'
          }`}
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.displayName}
            className="h-6 w-6 rounded-full"
          />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;