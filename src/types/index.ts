export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'user';
  createdAt: Date;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  mediaUrl?: string;
  tags: string[];
  category: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'mention' | 'announcement';
  content: string;
  read: boolean;
  createdAt: Date;
}

export interface Confession {
  id: string;
  content: string;
  tags: string[];
  likes: number;
  isApproved: boolean;
  createdAt: Date;
}