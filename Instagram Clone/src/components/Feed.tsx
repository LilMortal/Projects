import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePostsStore } from '../store/postsStore';
import { PostCard } from './posts/PostCard';
import { PostModal } from './modals/PostModal';
import { LoadingSpinner } from './ui/LoadingSpinner';

export function Feed() {
  const { posts, loading, hasMore, fetchPosts, setSelectedPost } = usePostsStore();
  const { ref, inView } = useInView();

  useEffect(() => {
    fetchPosts(true);
  }, [fetchPosts]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchPosts();
    }
  }, [inView, hasMore, loading, fetchPosts]);

  const handleOpenComments = (post: any) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onOpenComments={() => handleOpenComments(post)}
          />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {hasMore && !loading && (
        <div ref={ref} className="h-10" />
      )}

      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-dark-400">
            You've seen all posts
          </p>
        </div>
      )}

      {posts.length === 0 && !loading && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Welcome to InstaClone!
          </h3>
          <p className="text-gray-500 dark:text-dark-400 mb-4">
            Start following people to see their posts in your feed
          </p>
        </div>
      )}

      <PostModal isOpen={!!usePostsStore.getState().selectedPost} onClose={handleCloseModal} />
    </div>
  );
}