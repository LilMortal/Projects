import { Book } from '../types';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Digital Revolution',
    author: 'Sarah Johnson',
    description: 'An in-depth exploration of how digital technology has transformed our world and continues to shape our future.',
    cover: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Technology',
    tags: ['digital', 'innovation', 'future', 'technology'],
    publishDate: '2024-01-15',
    content: 'Chapter 1: The Dawn of Digital Age\n\nThe digital revolution began in the mid-20th century and has fundamentally changed how we live, work, and communicate. From the first computers to today\'s artificial intelligence, this transformation continues to accelerate...',
    totalPages: 324,
    isbn: '978-0-123456-78-9',
    rating: 4.8,
    fileSize: '2.4 MB'
  },
  {
    id: '2',
    title: 'Mindful Living',
    author: 'Dr. Emily Chen',
    description: 'A comprehensive guide to incorporating mindfulness into your daily routine for better mental health and life satisfaction.',
    cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Self-Help',
    tags: ['mindfulness', 'meditation', 'wellness', 'psychology'],
    publishDate: '2023-11-20',
    content: 'Introduction: The Power of Present Moment\n\nMindfulness is not just a buzzword—it\'s a transformative practice that can revolutionize your relationship with thoughts, emotions, and the world around you...',
    totalPages: 256,
    isbn: '978-0-987654-32-1',
    rating: 4.6,
    fileSize: '1.8 MB'
  },
  {
    id: '3',
    title: 'The Quantum Universe',
    author: 'Prof. Michael Wright',
    description: 'Journey through the fascinating world of quantum physics and discover how the smallest particles govern the largest structures in the universe.',
    cover: 'https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Science',
    tags: ['physics', 'quantum', 'universe', 'science'],
    publishDate: '2024-02-10',
    content: 'Prologue: Welcome to the Quantum Realm\n\nQuantum physics challenges our understanding of reality itself. In this strange realm, particles can exist in multiple states simultaneously, and observation itself changes the nature of what we observe...',
    totalPages: 428,
    isbn: '978-0-555666-77-8',
    rating: 4.9,
    fileSize: '3.2 MB'
  },
  {
    id: '4',
    title: 'Echoes of Tomorrow',
    author: 'Alex Rivera',
    description: 'A thrilling science fiction novel about humanity\'s first contact with an alien civilization and the profound changes that follow.',
    cover: 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Fiction',
    tags: ['sci-fi', 'aliens', 'future', 'adventure'],
    publishDate: '2024-03-05',
    content: 'Chapter 1: The Signal\n\nDr. Maya Chen had been monitoring deep space communications for over a decade, but nothing could have prepared her for what appeared on her screens that fateful Tuesday morning...',
    totalPages: 378,
    isbn: '978-0-111222-33-4',
    rating: 4.7,
    fileSize: '2.9 MB'
  },
  {
    id: '5',
    title: 'The Art of Code',
    author: 'Lisa Park',
    description: 'Master the principles of clean, efficient programming and learn how to write code that is both beautiful and functional.',
    cover: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Technology',
    tags: ['programming', 'software', 'development', 'coding'],
    publishDate: '2023-12-01',
    content: 'Introduction: Code as Art\n\nProgramming is more than just writing instructions for computers—it\'s a creative endeavor that combines logic, elegance, and problem-solving in ways that can be truly beautiful...',
    totalPages: 445,
    isbn: '978-0-777888-99-0',
    rating: 4.5,
    fileSize: '2.7 MB'
  },
  {
    id: '6',
    title: 'Culinary Adventures',
    author: 'Chef Antonio Rossi',
    description: 'Explore the world through its flavors with authentic recipes and stories from kitchens around the globe.',
    cover: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Cooking',
    tags: ['cooking', 'recipes', 'international', 'food'],
    publishDate: '2024-01-30',
    content: 'Foreword: A Journey Through Taste\n\nFood is the universal language that connects us all. Every dish tells a story, every recipe carries the wisdom of generations, and every meal is an opportunity to explore new cultures...',
    totalPages: 312,
    isbn: '978-0-333444-55-6',
    rating: 4.4,
    fileSize: '4.1 MB'
  }
];

export const genres = [
  'All',
  'Fiction',
  'Technology',
  'Self-Help',
  'Science',
  'Cooking',
  'Biography',
  'History',
  'Philosophy',
  'Art'
];