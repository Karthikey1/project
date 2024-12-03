import React from 'react';
import { useConfessionStore } from '../../store/confessionStore';
import ConfessionCard from './ConfessionCard';
import ConfessionForm from './ConfessionForm';

export default function ConfessionFeed() {
  const confessions = useConfessionStore((state) => state.confessions);

  return (
    <div className="space-y-6">
      <ConfessionForm />
      {confessions.map((confession) => (
        <ConfessionCard key={confession.id} confession={confession} />
      ))}
      {confessions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No confessions yet. Be the first to share!
        </div>
      )}
    </div>
  );
}