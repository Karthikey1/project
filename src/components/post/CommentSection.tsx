import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostStore } from '../../store/postStore';
import { useAuthStore } from '../../store/authStore';
import type { Comment } from '../../types';

const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty'),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const comments = usePostStore((state) => state.comments[postId] || []);
  const addComment = usePostStore((state) => state.addComment);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = (data: CommentFormData) => {
    if (!user) return;

    const newComment: Comment = {
      id: crypto.randomUUID(),
      postId,
      authorId: user.id,
      content: data.content,
      createdAt: new Date(),
    };

    addComment(newComment);
    reset();
  };

  return (
    <div className="mt-4 space-y-4">
      {isAuthenticated ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <textarea
            {...register('content')}
            placeholder="Write a comment..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={2}
          />
          {errors.content && (
            <p className="text-red-600 text-sm">{errors.content.message}</p>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Comment
          </button>
        </form>
      ) : (
        <p className="text-gray-600 text-sm">Please sign in to comment</p>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
            </div>
            <div className="flex-grow">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-sm">User Name</p>
                <p className="text-gray-800">{comment.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}