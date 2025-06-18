import React from 'react';
import { Book, ReadingProgress } from '../types';
import { useApp } from '../context/AppContext';
import { Clock, Star, BookOpen } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
}

export default function BookCard({ book, onClick }: BookCardProps) {
  const { state } = useApp();
  
  const progress = state.readingProgress.find(p => p.bookId === book.id);
  const progressPercentage = progress ? Math.round(progress.progress * 100) : 0;

  return (
    <div
      onClick={() => onClick(book)}
      className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        state.theme === 'dark' 
          ? 'bg-gray-800 shadow-lg' 
          : 'bg-white shadow-md'
      }`}
    >
      <div className="relative">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {progressPercentage > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-indigo-600"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200">
          {book.title}
        </h3>
        <p className={`text-sm mb-2 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          by {book.author}
        </p>
        <p className={`text-sm mb-3 line-clamp-2 ${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          {book.description}
        </p>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            {book.rating && (
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span>{book.rating}</span>
              </div>
            )}
            <span className={`px-2 py-1 rounded ${
              state.theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}>
              {book.genre}
            </span>
          </div>
          
          {progressPercentage > 0 && (
            <div className="flex items-center space-x-1 text-emerald-600">
              <Clock className="w-3 h-3" />
              <span>{progressPercentage}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}