import { create } from 'zustand';

type UserRole = 'student' | 'reviewer' | 'approver';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    role: UserRole;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    // TODO: Implement actual authentication
    set({
      isAuthenticated: true,
      user: {
        id: '1',
        name: 'Test User',
        role: 'student',
      },
    });
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));