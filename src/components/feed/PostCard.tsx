import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import type { Post } from '../../types';
import { usePostStore } from '../../store/postStore';
import CommentSection from '../post/CommentSection';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const likePost = usePostStore((state) => state.likePost);

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      {post.mediaUrl && (
        <img
          src={post.mediaUrl}
          alt="Post media"
          className="w-full h-64 object-cover"
        />
      )}
      
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div>
            <h3 className="font-semibold">Author Name</h3>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <p className="text-gray-800 mb-4">{post.content}</p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-4 text-gray-500">
          <button
            onClick={() => likePost(post.id)}
            className="flex items-center space-x-1 hover:text-indigo-600"
          >
            <Heart className="w-5 h-5" />
            <span>{post.likes}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1 hover:text-indigo-600"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Comment</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-indigo-600">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>

        {showComments && <CommentSection postId={post.id} />}
      </div>
    </article>
  );
}