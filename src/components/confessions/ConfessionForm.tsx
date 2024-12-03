import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ReCAPTCHA from 'react-google-recaptcha';
import { useConfessionStore } from '../../store/confessionStore';
import { Tag, AlertCircle } from 'lucide-react';

const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Test key

const confessionSchema = z.object({
  content: z.string()
    .min(1, 'Confession cannot be empty')
    .max(500, 'Confession must be less than 500 characters'),
  tags: z.string().optional(),
  captcha: z.string({
    required_error: 'Please complete the captcha verification',
  }),
});

type ConfessionFormData = z.infer<typeof confessionSchema>;

export default function ConfessionForm() {
  const [charCount, setCharCount] = useState(0);
  const addConfession = useConfessionStore((state) => state.addConfession);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConfessionFormData>({
    resolver: zodResolver(confessionSchema),
  });

  const content = watch('content', '');

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setCharCount(value.length);
      setValue('content', value);
    }
  };

  const onCaptchaChange = (value: string | null) => {
    setValue('captcha', value || '');
  };

  const onSubmit = async (data: ConfessionFormData) => {
    try {
      const tags = data.tags
        ? data.tags.split(',').map((tag) => tag.trim())
        : [];

      addConfession({
        content: data.content,
        tags,
      });

      reset();
      setCharCount(0);
    } catch (error) {
      console.error('Error submitting confession:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Share Your Confession</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="relative">
            <textarea
              {...register('content')}
              onChange={handleContentChange}
              placeholder="Share your thoughts anonymously..."
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={4}
            />
            {errors.content && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-start pt-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            {500 - charCount} characters remaining
          </p>
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <input
              {...register('tags')}
              type="text"
              placeholder="Add tags (comma-separated)"
              className={`flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.tags ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Example: personal, academic, friendship
          </p>
        </div>

        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={onCaptchaChange}
          />
        </div>
        {errors.captcha && (
          <p className="text-sm text-red-600 text-center">{errors.captcha.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !content}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Confession'}
        </button>

        <p className="text-sm text-gray-500 text-center">
          All confessions are reviewed by moderators before being published.
        </p>
      </form>
    </div>
  );
}