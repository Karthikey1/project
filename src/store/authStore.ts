import create from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'), // Load user from localStorage if available
  token: localStorage.getItem('token'), // Load token from localStorage if available
  login: (user: User, token: string) => {
    localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
    localStorage.setItem('token', token); // Save token to localStorage
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('user'); // Remove user from localStorage
    localStorage.removeItem('token'); // Remove token from localStorage
    set({ user: null, token: null });
  },
}));
