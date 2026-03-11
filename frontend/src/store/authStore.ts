import { create } from 'zustand';

interface User {
    _id: string;
    phoneNumber: string;
    name?: string;
    email?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoginModalOpen: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
    openLoginModal: () => void;
    closeLoginModal: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoginModalOpen: false,

    login: (user, token) => {
        localStorage.setItem('token', token);
        set({ user, token, isAuthenticated: true, isLoginModalOpen: false });
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
    },

    openLoginModal: () => set({ isLoginModalOpen: true }),
    closeLoginModal: () => set({ isLoginModalOpen: false }),
}));
