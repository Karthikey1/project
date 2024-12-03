import { create } from 'zustand';
import type { Post, Comment } from '../types';

interface PostState {
  posts: Post[];
  comments: Record<string, Comment[]>;
  addPost: (post: Post) => void;
  addComment: (comment: Comment) => void;
  likePost: (postId: string) => void;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  comments: {},
  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),
  addComment: (comment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [comment.postId]: [
          ...(state.comments[comment.postId] || []),
          comment,
        ],
      },
    })),
  likePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      ),
    })),
}));