import { create } from 'zustand';
import { mockPosts, mockComments, MockPost, MockComment } from '../lib/mockData';
import toast from 'react-hot-toast';

interface PostsState {
  posts: MockPost[];
  loading: boolean;
  hasMore: boolean;
  selectedPost: MockPost | null;
  comments: MockComment[];
  commentsLoading: boolean;
  fetchPosts: (reset?: boolean) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  createPost: (data: { caption?: string; location?: string; image: File }) => Promise<boolean>;
  setSelectedPost: (post: MockPost | null) => void;
  fetchComments: (postId: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<boolean>;
  deletePost: (postId: string) => Promise<boolean>;
}

// Local storage for posts
let localPosts = [...mockPosts];
let localComments = { ...mockComments };

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  loading: false,
  hasMore: true,
  selectedPost: null,
  comments: [],
  commentsLoading: false,

  fetchPosts: async (reset = false) => {
    try {
      const { posts: currentPosts, loading } = get();
      if (loading) return;

      set({ loading: true });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const offset = reset ? 0 : currentPosts.length;
      const limit = 10;
      
      const newPosts = localPosts.slice(offset, offset + limit);

      set({
        posts: reset ? newPosts : [...currentPosts, ...newPosts],
        hasMore: offset + limit < localPosts.length,
      });
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      set({ loading: false });
    }
  },

  likePost: async (postId: string) => {
    try {
      const { posts } = get();
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      // Optimistic update
      const updatedPosts = posts.map(p => 
        p.id === postId 
          ? { 
              ...p, 
              user_liked: !p.user_liked,
              likes_count: p.user_liked ? p.likes_count - 1 : p.likes_count + 1
            }
          : p
      );
      set({ posts: updatedPosts });

      // Update local data
      const postIndex = localPosts.findIndex(p => p.id === postId);
      if (postIndex !== -1) {
        localPosts[postIndex] = {
          ...localPosts[postIndex],
          user_liked: !localPosts[postIndex].user_liked,
          likes_count: localPosts[postIndex].user_liked 
            ? localPosts[postIndex].likes_count - 1 
            : localPosts[postIndex].likes_count + 1
        };
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      toast.error('Error updating like');
      // Revert optimistic update on error
      get().fetchPosts(true);
    }
  },

  createPost: async (data) => {
    try {
      set({ loading: true });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create image URL from file
      const imageUrl = URL.createObjectURL(data.image);

      const newPost: MockPost = {
        id: Date.now().toString(),
        author_id: 'current',
        caption: data.caption || null,
        location: data.location || null,
        image_url: imageUrl,
        likes_count: 0,
        comments_count: 0,
        created_at: new Date().toISOString(),
        author: {
          username: 'demo_user',
          avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          full_name: 'Demo User',
        },
        user_liked: false,
      };

      // Add to local data
      localPosts.unshift(newPost);

      toast.success('Post created successfully!');
      get().fetchPosts(true);
      return true;
    } catch (error) {
      toast.error('Something went wrong');
      return false;
    } finally {
      set({ loading: false });
    }
  },

  setSelectedPost: (post) => set({ selectedPost: post }),

  fetchComments: async (postId: string) => {
    try {
      set({ commentsLoading: true });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const postComments = localComments[postId] || [];
      set({ comments: postComments });
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      set({ commentsLoading: false });
    }
  },

  addComment: async (postId: string, content: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const newComment: MockComment = {
        id: Date.now().toString(),
        user_id: 'current',
        post_id: postId,
        content,
        created_at: new Date().toISOString(),
        user: {
          username: 'demo_user',
          avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        },
      };

      // Add to local data
      if (!localComments[postId]) {
        localComments[postId] = [];
      }
      localComments[postId].push(newComment);

      // Update comments count
      const postIndex = localPosts.findIndex(p => p.id === postId);
      if (postIndex !== -1) {
        localPosts[postIndex].comments_count += 1;
      }

      // Refresh comments
      get().fetchComments(postId);
      
      return true;
    } catch (error) {
      toast.error('Something went wrong');
      return false;
    }
  },

  deletePost: async (postId: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove from local data
      localPosts = localPosts.filter(p => p.id !== postId);
      delete localComments[postId];

      const { posts } = get();
      set({ posts: posts.filter(p => p.id !== postId) });
      toast.success('Post deleted successfully');
      return true;
    } catch (error) {
      toast.error('Something went wrong');
      return false;
    }
  },
}));