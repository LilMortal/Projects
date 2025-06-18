import React from 'react';
import { useApp } from '../context/AppContext';
import { Bookmark, Calendar, BookOpen, Trash2 } from 'lucide-react';

export default function BookmarksPage() {
  const { state, dispatch } = useApp();

  const bookmarksWithBooks = state.bookmarks
    .map(bookmark => {
      const book = state.books.find(b => b.id === bookmark.bookId);
      return book ? { bookmark, book } : null;
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b!.bookmark.createdAt).getTime() - new Date(a!.bookmark.createdAt).getTime());

  const handleRemoveBookmark = (bookmarkId: string) => {
    dispatch({ type: 'REMOVE_BOOKMARK', payload: bookmarkId });
  };

  const handleGoToBookmark = (book: any, page: number) => {
    dispatch({ type: 'SET_CURRENT_BOOK', payload: book });
    // The BookReader component will handle setting the correct page
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
            <Bookmark className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">My Bookmarks</h1>
            <p className={`text-lg ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Quick access to your saved pages
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={`mb-8 p-6 rounded-xl ${
        state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } shadow-lg border border-gray-200 dark:border-gray-700`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {state.bookmarks.length}
            </div>
            <div className={`text-sm ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Bookmarks
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">
              {new Set(state.bookmarks.map(b => b.bookId)).size}
            </div>
            <div className={`text-sm ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Books Bookmarked
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-1">
              {state.bookmarks.filter(b => 
                new Date(b.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              ).length}
            </div>
            <div className={`text-sm ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              This Week
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarks List */}
      {bookmarksWithBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className={`text-6xl mb-4 ${state.theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`}>
            🔖
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            No bookmarks yet
          </h3>
          <p className={`text-center max-w-md mb-6 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Start reading and bookmark your favorite pages to find them easily later
          </p>
          <button
            onClick={() => window.location.href = '/library'}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-lg hover:from-emerald-600 hover:to-indigo-700 transition-all duration-200 font-medium"
          >
            Browse Library
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarksWithBooks.map(({ bookmark, book }) => (
            <div
              key={bookmark!.id}
              className={`p-6 rounded-xl ${
                state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={book!.cover}
                  alt={book!.title}
                  className="w-16 h-20 object-cover rounded-lg shadow-md"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{book!.title}</h3>
                      <p className={`text-sm mb-2 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        by {book!.author}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4 text-purple-500" />
                          <span>Page {bookmark!.page}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className={state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                            {new Date(bookmark!.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleGoToBookmark(book, bookmark!.page)}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-lg hover:from-emerald-600 hover:to-indigo-700 transition-all duration-200 font-medium text-sm"
                      >
                        Go to Page
                      </button>
                      <button
                        onClick={() => handleRemoveBookmark(bookmark!.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          state.theme === 'dark'
                            ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400'
                            : 'hover:bg-gray-100 text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}