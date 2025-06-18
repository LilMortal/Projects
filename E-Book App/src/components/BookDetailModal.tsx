import React from 'react';
import { Book } from '../types';
import { useApp } from '../context/AppContext';
import { X, Calendar, FileText, Hash, Star, Download, Play } from 'lucide-react';

interface BookDetailModalProps {
  book: Book;
  onClose: () => void;
  onRead: (book: Book) => void;
}

export default function BookDetailModal({ book, onClose, onRead }: BookDetailModalProps) {
  const { state } = useApp();
  const progress = state.readingProgress.find(p => p.bookId === book.id);
  const progressPercentage = progress ? Math.round(progress.progress * 100) : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl ${
        state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-inherit">
          <h2 className="text-xl font-bold">Book Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={book.cover}
                alt={book.title}
                className="w-48 h-64 object-cover rounded-lg shadow-lg mx-auto md:mx-0"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
              <p className={`text-lg mb-4 ${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                by {book.author}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Published: {new Date(book.publishDate).getFullYear()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span>{book.totalPages} pages</span>
                </div>
                {book.rating && (
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{book.rating}/5</span>
                  </div>
                )}
                {book.fileSize && (
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-gray-500" />
                    <span>{book.fileSize}</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  state.theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  {book.genre}
                </span>
              </div>

              {progressPercentage > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Reading Progress</span>
                    <span className="text-sm text-emerald-600">{progressPercentage}%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${state.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => onRead(book)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-lg hover:from-emerald-600 hover:to-indigo-700 transition-all duration-200 font-medium"
                >
                  <Play className="w-5 h-5" />
                  <span>{progressPercentage > 0 ? 'Continue Reading' : 'Start Reading'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className={`text-sm leading-relaxed ${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {book.description}
            </p>
          </div>

          {book.tags && book.tags.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded text-xs ${
                      state.theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}