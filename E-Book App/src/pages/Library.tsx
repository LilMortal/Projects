import React from 'react';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import BookGrid from '../components/BookGrid';
import FeaturedBooks from '../components/FeaturedBooks';
import { TrendingUp, BookOpen, Users, Star } from 'lucide-react';

export default function Library() {
  const { state } = useApp();

  const stats = [
    {
      icon: BookOpen,
      label: 'Total Books',
      value: state.books.length.toString(),
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: TrendingUp,
      label: 'Reading Progress',
      value: `${state.readingProgress.length}`,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Star,
      label: 'Bookmarks',
      value: state.bookmarks.length.toString(),
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      label: 'Highlights',
      value: state.highlights.length.toString(),
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-indigo-600 bg-clip-text text-transparent">
              BookVault
            </span>
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${
            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover, read, and organize your digital library with our beautiful, modern eBook reader
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300`}
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

      {/* Featured Books */}
      <FeaturedBooks />

      {/* Search and Filters */}
      <div className="mb-8 space-y-6">
        <SearchBar />
        <div>
          <h2 className="text-xl font-semibold mb-4">Browse by Genre</h2>
          <GenreFilter />
        </div>
      </div>

      {/* Results Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {state.searchQuery 
              ? `Search Results for "${state.searchQuery}"` 
              : state.selectedGenre === 'All' 
                ? 'All Books' 
                : `${state.selectedGenre} Books`
            }
          </h2>
          <div className={`text-sm ${state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {state.books.filter(book => 
              (state.selectedGenre === 'All' || book.genre === state.selectedGenre) &&
              (!state.searchQuery || 
                book.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                book.author.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                book.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                book.tags.some(tag => tag.toLowerCase().includes(state.searchQuery.toLowerCase()))
              )
            ).length} books found
          </div>
        </div>
      </div>

      {/* Book Grid */}
      <BookGrid />
    </div>
  );
}