import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Library, 
  BookOpen, 
  Search, 
  Bookmark, 
  Settings, 
  User,
  Home
} from 'lucide-react';

export default function Navigation() {
  const { state } = useApp();
  const [currentPage, setCurrentPage] = React.useState('library');

  React.useEffect(() => {
    // Update current page based on URL
    const path = window.location.pathname;
    if (path === '/' || path === '/library') setCurrentPage('library');
    else if (path === '/continue') setCurrentPage('continue');
    else if (path === '/search') setCurrentPage('search');
    else if (path === '/bookmarks') setCurrentPage('bookmarks');
    else if (path === '/profile') setCurrentPage('profile');
    else if (path === '/settings') setCurrentPage('settings');
  }, []);

  const navItems = [
    { id: 'library', label: 'Library', icon: Library, path: '/library' },
    { id: 'continue', label: 'Continue Reading', icon: BookOpen, path: '/continue' },
    { id: 'search', label: 'Search', icon: Search, path: '/search' },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, path: '/bookmarks' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleNavigation = (item: any) => {
    setCurrentPage(item.id);
    window.history.pushState({}, '', item.path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <nav className={`w-64 border-r transition-colors duration-300 ${
      state.theme === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    } hidden md:block`}>
      <div className="p-6">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-md'
                    : state.theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}