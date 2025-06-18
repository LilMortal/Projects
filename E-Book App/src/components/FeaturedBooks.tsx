import React from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Star, Clock } from 'lucide-react';

export default function FeaturedBooks() {
  const { state, dispatch } = useApp();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Get featured books (highest rated or most recent)
  const featuredBooks = state.books
    .filter(book => book.rating && book.rating >= 4.5)
    .slice(0, 5);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredBooks.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length);
  };

  if (featuredBooks.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Featured Books</h2>
        <div className="flex space-x-2">
          <button
            onClick={prevSlide}
            className={`p-2 rounded-full ${
              state.theme === 'dark' 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className={`p-2 rounded-full ${
              state.theme === 'dark' 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {featuredBooks.map((book) => {
            const progress = state.readingProgress.find(p => p.bookId === book.id);
            const progressPercentage = progress ? Math.round(progress.progress * 100) : 0;

            return (
              <div key={book.id} className="w-full flex-shrink-0">
                <div
                  className={`relative h-80 rounded-2xl overflow-hidden cursor-pointer group ${
                    state.theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-emerald-50 to-indigo-50'
                  }`}
                  onClick={() => dispatch({ type: 'SET_CURRENT_BOOK', payload: book })}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="absolute right-0 top-0 h-full w-1/2 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="relative z-20 p-8 flex flex-col justify-between h-full text-white">
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="px-3 py-1 bg-emerald-500 rounded-full text-xs font-medium">
                          Featured
                        </span>
                        {book.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{book.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-3xl font-bold mb-2 leading-tight">{book.title}</h3>
                      <p className="text-lg opacity-90 mb-4">by {book.author}</p>
                      <p className="text-sm opacity-80 line-clamp-3 max-w-md">
                        {book.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch({ type: 'SET_CURRENT_BOOK', payload: book });
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-lg hover:from-emerald-600 hover:to-indigo-700 transition-all duration-200 font-medium"
                      >
                        {progressPercentage > 0 ? 'Continue Reading' : 'Start Reading'}
                      </button>
                      
                      {progressPercentage > 0 && (
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{progressPercentage}% complete</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {featuredBooks.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-emerald-500 w-8'
                : state.theme === 'dark'
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}