// Mock data for frontend-only Instagram clone
export interface MockUser {
  id: string;
  email: string;
  username: string;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  followers_count: number;
  following_count: number;
  posts_count: number;
  created_at: string;
}

export interface MockPost {
  id: string;
  author_id: string;
  caption: string | null;
  image_url: string;
  location: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  author: {
    username: string;
    avatar_url: string | null;
    full_name: string | null;
  };
  user_liked: boolean;
}

export interface MockComment {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: string;
  user: {
    username: string;
    avatar_url: string | null;
  };
}

// Mock users
export const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'john@example.com',
    username: 'john_doe',
    full_name: 'John Doe',
    bio: 'Photography enthusiast 📸 | Travel lover ✈️',
    avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    followers_count: 1250,
    following_count: 890,
    posts_count: 42,
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    email: 'sarah@example.com',
    username: 'sarah_wilson',
    full_name: 'Sarah Wilson',
    bio: 'Artist & Designer 🎨 | Coffee addict ☕',
    avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    followers_count: 2100,
    following_count: 456,
    posts_count: 67,
    created_at: '2024-02-20T14:30:00Z',
  },
  {
    id: '3',
    email: 'mike@example.com',
    username: 'mike_adventures',
    full_name: 'Mike Johnson',
    bio: 'Adventure seeker 🏔️ | Fitness enthusiast 💪',
    avatar_url: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    followers_count: 3400,
    following_count: 1200,
    posts_count: 89,
    created_at: '2024-03-10T09:15:00Z',
  },
];

// Mock posts
export const mockPosts: MockPost[] = [
  {
    id: '1',
    author_id: '1',
    caption: 'Beautiful sunset at the beach 🌅 Perfect end to a perfect day!',
    image_url: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    location: 'Malibu Beach, CA',
    likes_count: 234,
    comments_count: 18,
    created_at: '2024-06-18T18:30:00Z',
    author: {
      username: 'john_doe',
      avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      full_name: 'John Doe',
    },
    user_liked: false,
  },
  {
    id: '2',
    author_id: '2',
    caption: 'New artwork in progress! 🎨 What do you think?',
    image_url: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    location: 'Art Studio, NYC',
    likes_count: 156,
    comments_count: 24,
    created_at: '2024-06-18T15:45:00Z',
    author: {
      username: 'sarah_wilson',
      avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      full_name: 'Sarah Wilson',
    },
    user_liked: true,
  },
  {
    id: '3',
    author_id: '3',
    caption: 'Morning hike to the summit! The view was absolutely worth it 🏔️',
    image_url: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    location: 'Rocky Mountain National Park',
    likes_count: 389,
    comments_count: 31,
    created_at: '2024-06-18T08:20:00Z',
    author: {
      username: 'mike_adventures',
      avatar_url: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      full_name: 'Mike Johnson',
    },
    user_liked: false,
  },
  {
    id: '4',
    author_id: '1',
    caption: 'Street photography session in downtown. Love the urban vibes! 📷',
    image_url: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    location: 'Downtown LA',
    likes_count: 198,
    comments_count: 12,
    created_at: '2024-06-17T20:15:00Z',
    author: {
      username: 'john_doe',
      avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      full_name: 'John Doe',
    },
    user_liked: true,
  },
  {
    id: '5',
    author_id: '2',
    caption: 'Coffee and creativity ☕ Starting the day right!',
    image_url: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    location: 'Local Coffee Shop',
    likes_count: 87,
    comments_count: 9,
    created_at: '2024-06-17T09:30:00Z',
    author: {
      username: 'sarah_wilson',
      avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      full_name: 'Sarah Wilson',
    },
    user_liked: false,
  },
];

// Mock comments
export const mockComments: { [postId: string]: MockComment[] } = {
  '1': [
    {
      id: '1',
      user_id: '2',
      post_id: '1',
      content: 'Absolutely stunning! 😍',
      created_at: '2024-06-18T19:00:00Z',
      user: {
        username: 'sarah_wilson',
        avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      },
    },
    {
      id: '2',
      user_id: '3',
      post_id: '1',
      content: 'Great shot! What camera did you use?',
      created_at: '2024-06-18T19:15:00Z',
      user: {
        username: 'mike_adventures',
        avatar_url: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      },
    },
  ],
  '2': [
    {
      id: '3',
      user_id: '1',
      post_id: '2',
      content: 'Love the colors! 🎨',
      created_at: '2024-06-18T16:00:00Z',
      user: {
        username: 'john_doe',
        avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      },
    },
  ],
  '3': [
    {
      id: '4',
      user_id: '2',
      post_id: '3',
      content: 'This looks amazing! I need to go hiking more often',
      created_at: '2024-06-18T08:45:00Z',
      user: {
        username: 'sarah_wilson',
        avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      },
    },
  ],
};

// Current user (for demo purposes)
export const currentUser: MockUser = {
  id: 'current',
  email: 'demo@example.com',
  username: 'demo_user',
  full_name: 'Demo User',
  bio: 'Welcome to InstaClone! 👋',
  avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  followers_count: 0,
  following_count: 0,
  posts_count: 0,
  created_at: '2024-06-18T12:00:00Z',
};