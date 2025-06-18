import React from 'react';
import { Book } from '../types';
import { useApp } from '../context/AppContext';
import BookCard from './BookCard';
import BookDetailModal from './BookDetailModal';

export default function BookGrid() {
  const { state, dispatch } = useApp();
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);

  const filteredBooks = React.useMemo(() => {
    let books = state.books;

    // Filter by genre
    if (state.selectedGenre !== 'All') {
      books = books.filter(book => book.genre === state.selectedGenre);
    }

    // Filter by search query
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      books = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query) ||
        book.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return books;
  }, [state.books, state.selectedGenre, state.searchQuery]);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleReadBook = (book: Book) => {
    dispatch({ type: 'SET_CURRENT_BOOK', payload: book });
    setSelectedBook(null);
  };

  if (filteredBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className={`text-6xl mb-4 ${state.theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`}>
          📚
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          No books found
        </h3>
        <p className={`text-center max-w-md ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {state.searchQuery
            ? `No books match your search "${state.searchQuery}"`
            : `No books found in the ${state.selectedGenre} category`}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onClick={handleBookClick}
          />
        ))}
      </div>

      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onRead={handleReadBook}
        />
      )}
    </>
  );
}