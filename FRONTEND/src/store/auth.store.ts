import { create } from 'zustand';

interface AuthState {
  user: { id: string; email: string; role: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: { id: string; email: string; role: string }, token: string) => void;
  logout: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
  setToken: (token) => {
    set({ token });
  },
}));