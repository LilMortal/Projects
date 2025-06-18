import React from 'react';
import { useApp } from '../context/AppContext';
import { User, BookOpen, Clock, Star, Calendar, Settings, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { state, dispatch } = useApp();

  const handleSignOut = () => {
    dispatch({ type: 'SET_USER', payload: null });
  };

  const totalPagesRead = state.readingProgress.reduce((total, progress) => {
    const book = state.books.find(b => b.id === progress.bookId);
    return total + (book ? Math.floor(book.totalPages * progress.progress) : 0);
  }, 0);

  const averageRating = state.books
    .filter(book => book.rating)
    .reduce((sum, book) => sum + (book.rating || 0), 0) / 
    state.books.filter(book => book.rating).length;

  const readingStats = [
    {
      icon: BookOpen,
      label: 'Books Started',
      value: state.readingProgress.length.toString(),
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Clock,
      label: 'Pages Read',
      value: totalPagesRead.toString(),
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Star,
      label: 'Bookmarks',
      value: state.bookmarks.length.toString(),
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Settings,
      label: 'Highlights',
      value: state.highlights.length.toString(),
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-emerald-500 to-indigo-600 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className={`text-lg ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Your reading journey
            </p>
          </div>
        </div>
      </div>

      {state.user ? (
        <>
          {/* Profile Card */}
          <div className={`mb-8 p-8 rounded-xl ${
            state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-lg border border-gray-200 dark:border-gray-700`}>
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {state.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">{state.user.name}</h2>
                <p className={`text-lg mb-2 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {state.user.email}
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className={state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Member since {new Date().getFullYear()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => window.location.href = '/settings'}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  state.theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Reading Stats */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Reading Statistics</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {readingStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-xl ${
                      state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } shadow-lg border border-gray-200 dark:border-gray-700`}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className={`text-sm ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recently Read */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Recently Read</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.readingProgress
                .sort((a, b) => new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime())
                .slice(0, 4)
                .map(progress => {
                  const book = state.books.find(b => b.id === progress.bookId);
                  if (!book) return null;

                  return (
                    <div
                      key={progress.bookId}
                      className={`p-4 rounded-xl ${
                        state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                      } shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer`}
                      onClick={() => dispatch({ type: 'SET_CURRENT_BOOK', payload: book })}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{book.title}</h4>
                          <p className={`text-sm mb-2 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            by {book.author}
                          </p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-emerald-600">
                              {Math.round(progress.progress * 100)}% complete
                            </span>
                            <span className={state.theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>
                              {new Date(progress.lastReadAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Favorite Genres */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Reading Preferences</h3>
            <div className={`p-6 rounded-xl ${
              state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow-lg border border-gray-200 dark:border-gray-700`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Favorite Genres</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Technology', 'Fiction', 'Science', 'Self-Help'].map((genre) => (
                      <span
                        key={genre}
                        className={`px-3 py-1 rounded-full text-sm ${
                          state.theme === 'dark'
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Reading Goal</h4>
                  <div className="flex items-center space-x-2">
                    <div className={`flex-1 h-2 rounded-full ${
                      state.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-full"
                        style={{ width: `${Math.min((state.readingProgress.length / 12) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {state.readingProgress.length}/12 books
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Annual reading goal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <div className={`text-6xl mb-4 ${state.theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`}>
            👤
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Sign in to view your profile
          </h3>
          <p className={`text-center max-w-md mb-6 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Create an account to track your reading progress, save bookmarks, and personalize your experience
          </p>
          <button
            onClick={() => {
              dispatch({ 
                type: 'SET_USER', 
                payload: { 
                  id: '1', 
                  email: 'demo@example.com', 
                  name: 'Demo User' 
                } 
              });
            }}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-lg hover:from-emerald-600 hover:to-indigo-700 transition-all duration-200 font-medium"
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}