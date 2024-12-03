import React from 'react';
import { Heart } from 'lucide-react';
import type { Confession } from '../../types';
import { useConfessionStore } from '../../store/confessionStore';

interface ConfessionCardProps {
  confession: Confession;
}

export default function ConfessionCard({ confession }: ConfessionCardProps) {
  const likeConfession = useConfessionStore((state) => state.likeConfession);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <p className="text-gray-800 mb-4">{confession.content}</p>

      {confession.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {confession.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500">
        <button
          onClick={() => likeConfession(confession.id)}
          className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600"
        >
          <Heart className="w-4 h-4" />
          <span>{confession.likes}</span>
        </button>
        <span>{new Date(confession.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}