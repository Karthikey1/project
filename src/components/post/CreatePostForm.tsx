import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image as ImageIcon, X } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostStore } from '../../store/postStore';
import { useAuthStore } from '../../store/authStore';

const postSchema = z.object({
  content: z.string().min(1, 'Post content is required'),
  category: z.string().min(1, 'Category is required'),
});

type PostFormData = z.infer<typeof postSchema>;

export default function CreatePostForm() {
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const addPost = usePostStore((state) => state.addPost);
  const user = useAuthStore((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostFormData) => {
    if (!user) return;

    const newPost: Post = {
      id: crypto.randomUUID(),
      authorId: user.id,
      content: data.content,
      mediaUrl: mediaPreview,
      tags: [], // TODO: Implement tags
      category: data.category,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addPost(newPost);
    reset();
    setMediaPreview(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <textarea
          {...register('content')}
          placeholder="Share something with the community..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows={3}
        />
        {errors.content && (
          <p className="text-red-600 text-sm">{errors.content.message}</p>
        )}

        <select
          {...register('category')}
          className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">Select Category</option>
          <option value="Events">Events</option>
          <option value="Projects">Projects</option>
          <option value="Announcements">Announcements</option>
          <option value="General">General</option>
        </select>
        {errors.category && (
          <p className="text-red-600 text-sm">{errors.category.message}</p>
        )}

        {mediaPreview ? (
          <div className="relative">
            <img
              src={mediaPreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => setMediaPreview(null)}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <label className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 cursor-pointer">
              <ImageIcon className="w-5 h-5" />
              <span>Add Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Post
        </button>
      </form>
    </div>
  );
}