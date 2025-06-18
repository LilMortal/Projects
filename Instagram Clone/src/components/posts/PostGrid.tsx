import React from 'react';

interface PostGridProps {
  posts: Array<{
    id: string;
    image_url: string;
    likes_count: number;
    comments_count: number;
  }>;
  onPostClick: (postId: string) => void;
}

export function PostGrid({ posts, onPostClick }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-dark-400">No posts yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 md:gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="aspect-square relative cursor-pointer group"
          onClick={() => onPostClick(post.id)}
        >
          <img
            src={post.image_url}
            alt="Post"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex items-center space-x-4 text-white">
              <span className="flex items-center space-x-1">
                <span>❤️</span>
                <span>{post.likes_count}</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>💬</span>
                <span>{post.comments_count}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}