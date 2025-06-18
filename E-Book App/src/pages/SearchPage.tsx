import React from 'react';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import BookGrid from '../components/BookGrid';
import GenreFilter from '../components/GenreFilter';
import { Search, BookOpen, Filter } from 'lucide-react';

export default function SearchPage() {
  const { state } = useApp();
  const [showFilters, setShowFilters] = React.useState(false);

  const filteredBooks = React.useMemo(() => {
    let books = state.books;

    if (state.selectedGenre !== 'All') {
      books = books.filter(book => book.genre === state.selectedGenre);
    }

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-emerald-500 to-indigo-600 flex items-center justify-center">
            <Search className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Search Library</h1>
            <p className={`text-lg ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Find your next great read
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar />
      </div>

      {/* Filters Toggle */}
      <div className="mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            state.theme === 'dark'
              ? 'bg-gray-800 hover:bg-gray-700'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className={`mb-8 p-6 rounded-xl ${
          state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-lg border border-gray-200 dark:border-gray-700`}>
          <h3 className="text-lg font-semibold mb-4">Filter by Genre</h3>
          <GenreFilter />
        </div>
      )}

      {/* Results */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {state.searchQuery 
              ? `Results for "${state.searchQuery}"` 
              : 'All Books'
            }
          </h2>
          <div className={`text-sm ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && state.searchQuery && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className={`text-6xl mb-4 ${state.theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`}>
            🔍
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            No results found
          </h3>
          <p className={`text-center max-w-md mb-6 ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            We couldn't find any books matching "{state.searchQuery}". Try different keywords or browse by genre.
          </p>
          <button
            onClick={() => {
              // Clear search
              window.location.href = '/search';
            }}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-lg hover:from-emerald-600 hover:to-indigo-700 transition-all duration-200 font-medium"
          >
            Browse All Books
          </button>
        </div>
      )}

      {/* Book Grid */}
      {filteredBooks.length > 0 && <BookGrid />}

      {/* Quick Search Suggestions */}
      {!state.searchQuery && (
        <div className={`mt-12 p-6 rounded-xl ${
          state.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <h3 className="text-lg font-semibold mb-4">Popular Searches</h3>
          <div className="flex flex-wrap gap-2">
            {['Technology', 'Self-Help', 'Fiction', 'Science', 'Cooking'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  // Set search query
                  const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (searchInput) {
                    searchInput.value = term;
                    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                  }
                }}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  state.theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                } border border-gray-300 dark:border-gray-600`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}