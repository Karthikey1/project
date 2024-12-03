import { create } from 'zustand';
import type { Confession } from '../types';

interface ConfessionState {
  confessions: Confession[];
  pendingConfessions: Confession[];
  addConfession: (confession: Omit<Confession, 'id' | 'createdAt' | 'isApproved' | 'likes'>) => void;
  approveConfession: (id: string) => void;
  rejectConfession: (id: string) => void;
  likeConfession: (id: string) => void;
}

export const useConfessionStore = create<ConfessionState>((set) => ({
  confessions: [],
  pendingConfessions: [],
  addConfession: (confessionData) => {
    const newConfession: Confession = {
      id: crypto.randomUUID(),
      content: confessionData.content,
      tags: confessionData.tags,
      likes: 0,
      isApproved: false,
      createdAt: new Date(),
    };

    set((state) => ({
      pendingConfessions: [newConfession, ...state.pendingConfessions],
    }));
  },
  approveConfession: (id) =>
    set((state) => {
      const confession = state.pendingConfessions.find((c) => c.id === id);
      if (!confession) return state;

      return {
        confessions: [{ ...confession, isApproved: true }, ...state.confessions],
        pendingConfessions: state.pendingConfessions.filter((c) => c.id !== id),
      };
    }),
  rejectConfession: (id) =>
    set((state) => ({
      pendingConfessions: state.pendingConfessions.filter((c) => c.id !== id),
    })),
  likeConfession: (id) =>
    set((state) => ({
      confessions: state.confessions.map((confession) =>
        confession.id === id
          ? { ...confession, likes: confession.likes + 1 }
          : confession
      ),
    })),
}));