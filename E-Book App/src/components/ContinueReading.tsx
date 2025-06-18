import React from 'react';
import { useApp } from '../context/AppContext';
import { Clock, BookOpen } from 'lucide-react';

export default function ContinueReading() {
  const { state, dispatch } = useApp();

  const booksWithProgress = state.readingProgress
    .map(progress => {
      const book = state.books.find(b => b.id === progress.bookId);
      return book ? { book, progress } : null;
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b!.progress.lastReadAt).getTime() - new Date(a!.progress.lastReadAt).getTime());

  if (booksWithProgress.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center py-16">
          <div className={`text-6xl mb-4 ${state.theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`}>
            📖
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            No books in progress
          </h3>
          <p className={`text-center max-w-md ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Start reading a book to see your progress here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Continue Reading</h1>
        <p className={`text-lg ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Pick up where you left off
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booksWithProgress.map(({ book, progress }) => (
          <div
            key={book!.id}
            onClick={() => dispatch({ type: 'SET_CURRENT_BOOK', payload: book })}
            className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              state.theme === 'dark' 
                ? 'bg-gray-800 shadow-lg' 
                : 'bg-white shadow-md'
            }`}
          >
            <div className="relative">
              <img
                src={book!.cover}
                alt={book!.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-indigo-600"
                  style={{ width: `${Math.round(progress!.progress * 100)}%` }}
                />
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200">
                {book!.title}
              </h3>
              <p className={`text-sm mb-2 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                by {book!.author}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-emerald-600">
                  <Clock className="w-4 h-4" />
                  <span>{Math.round(progress!.progress * 100)}% complete</span>
                </div>
                <span className={`text-xs ${state.theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  Page {progress!.currentPage} of {book!.totalPages}
                </span>
              </div>
              
              <div className="mt-2 text-xs text-gray-500">
                Last read: {new Date(progress!.lastReadAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}