import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Bookmark, Settings, ChevronLeft, ChevronRight, Highlighter as Highlight, MessageCircle, BookmarkCheck } from 'lucide-react';
import ReadingSettings from './ReadingSettings';

export default function BookReader() {
  const { state, dispatch } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);

  const book = state.currentBook;
  
  useEffect(() => {
    if (book) {
      const progress = state.readingProgress.find(p => p.bookId === book.id);
      if (progress) {
        setCurrentPage(progress.currentPage);
      }
    }
  }, [book, state.readingProgress]);

  useEffect(() => {
    if (book) {
      const progress = currentPage / book.totalPages;
      dispatch({
        type: 'UPDATE_READING_PROGRESS',
        payload: {
          bookId: book.id,
          currentPage,
          progress,
          lastReadAt: new Date().toISOString()
        }
      });
    }
  }, [currentPage, book, dispatch]);

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">No book selected</p>
      </div>
    );
  }

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString());
      setShowHighlightMenu(true);
    }
  };

  const addHighlight = (color: string) => {
    if (selectedText) {
      const highlight = {
        id: Date.now().toString(),
        bookId: book.id,
        text: selectedText,
        page: currentPage,
        position: 0,
        color,
        createdAt: new Date().toISOString()
      };
      dispatch({ type: 'ADD_HIGHLIGHT', payload: highlight });
      setShowHighlightMenu(false);
      setSelectedText('');
    }
  };

  const addBookmark = () => {
    const bookmark = {
      id: Date.now().toString(),
      bookId: book.id,
      page: currentPage,
      title: `Page ${currentPage}`,
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_BOOKMARK', payload: bookmark });
  };

  const isBookmarked = state.bookmarks.some(b => b.bookId === book.id && b.page === currentPage);

  const nextPage = () => {
    if (currentPage < book.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const readerStyles = {
    fontSize: `${state.readingSettings.fontSize}px`,
    lineHeight: state.readingSettings.lineHeight,
    fontFamily: state.readingSettings.fontFamily === 'serif' ? 'Georgia, serif' : 'Arial, sans-serif',
    margin: `0 ${state.readingSettings.margin}px`,
  };

  const getThemeClasses = () => {
    switch (state.readingSettings.theme) {
      case 'dark':
        return 'bg-gray-900 text-gray-100';
      case 'sepia':
        return 'bg-yellow-50 text-yellow-900';
      default:
        return 'bg-white text-gray-900';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeClasses()}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 border-b backdrop-blur-sm ${
        state.readingSettings.theme === 'dark' ? 'bg-gray-900/90 border-gray-700' :
        state.readingSettings.theme === 'sepia' ? 'bg-yellow-50/90 border-yellow-200' :
        'bg-white/90 border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => dispatch({ type: 'SET_CURRENT_BOOK', payload: null })}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-semibold text-lg">{book.title}</h1>
                <p className="text-sm opacity-70">by {book.author}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={addBookmark}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked ? 'text-emerald-600' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Page {currentPage} of {book.totalPages}</span>
              <span>{Math.round((currentPage / book.totalPages) * 100)}%</span>
            </div>
            <div className={`w-full h-1 rounded-full ${
              state.readingSettings.theme === 'dark' ? 'bg-gray-700' :
              state.readingSettings.theme === 'sepia' ? 'bg-yellow-200' :
              'bg-gray-200'
            }`}>
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${(currentPage / book.totalPages) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reading Settings Panel */}
      {showSettings && (
        <ReadingSettings onClose={() => setShowSettings(false)} />
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div 
          className="prose max-w-none"
          style={readerStyles}
          onMouseUp={handleTextSelection}
        >
          <p className="whitespace-pre-wrap leading-relaxed">
            {book.content}
          </p>
          
          {/* Simulated content for demo */}
          <div className="mt-8 space-y-6">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className={`flex items-center space-x-4 px-6 py-3 rounded-full shadow-lg ${
          state.readingSettings.theme === 'dark' ? 'bg-gray-800 border border-gray-700' :
          state.readingSettings.theme === 'sepia' ? 'bg-yellow-100 border border-yellow-200' :
          'bg-white border border-gray-200'
        }`}>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-full transition-colors ${
              currentPage === 1 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-sm font-medium px-4">
            {currentPage} / {book.totalPages}
          </span>
          
          <button
            onClick={nextPage}
            disabled={currentPage === book.totalPages}
            className={`p-2 rounded-full transition-colors ${
              currentPage === book.totalPages 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Highlight Menu */}
      {showHighlightMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-xl ${
            state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-xl`}>
            <h3 className="font-semibold mb-4">Highlight Text</h3>
            <div className="flex space-x-2 mb-4">
              {['#fef08a', '#fde68a', '#fed7aa', '#fecaca', '#d8b4fe', '#a7f3d0'].map((color) => (
                <button
                  key={color}
                  onClick={() => addHighlight(color)}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowHighlightMenu(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}