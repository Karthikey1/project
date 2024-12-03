import React from 'react';
import { Check, X } from 'lucide-react';
import { useConfessionStore } from '../../store/confessionStore';
import { useAuthStore } from '../../store/authStore';

export default function ModerateConfessions() {
  const { user } = useAuthStore();
  const { pendingConfessions, approveConfession, rejectConfession } = useConfessionStore();

  if (!user || !['admin', 'moderator'].includes(user.role)) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Pending Confessions
      </h2>
      <div className="space-y-4">
        {pendingConfessions.map((confession) => (
          <div
            key={confession.id}
            className="border border-gray-200 rounded-lg p-4 space-y-2"
          >
            <p className="text-gray-800">{confession.content}</p>
            {confession.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
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
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => rejectConfession(confession.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={() => approveConfession(confession.id)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-full"
              >
                <Check className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {pendingConfessions.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No confessions pending review
          </p>
        )}
      </div>
    </div>
  );
}