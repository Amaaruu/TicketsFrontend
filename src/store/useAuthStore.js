import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuth: false,

      setToken: (token) => set({ token, isAuth: !!token }),
      setUser: (user) => set({ user }),
      
      logout: () => {
        set({ token: null, user: null, isAuth: false });
        localStorage.removeItem('auth-storage');
      },
    }),
    {
      name: 'auth-storage', // Nombre de la clave en LocalStorage
    }
  )
);