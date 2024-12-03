import React from 'react';
import { usePostStore } from '../../store/postStore';
import PostCard from './PostCard';
import CreatePostForm from '../post/CreatePostForm';
import { useAuthStore } from '../../store/authStore';

export default function Feed() {
  const posts = usePostStore((state) => state.posts);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="space-y-6">
      {isAuthenticated && <CreatePostForm />}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}