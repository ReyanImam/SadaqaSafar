import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      ngo: null,
      token: null,
      
      setUser: (user) => set({ user }),
      setNGO: (ngo) => set({ ngo }),
      setToken: (token) => set({ token }),
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null, ngo: null }),
      
      isAuthenticated: () => {
        const state = get();
        return !!state.token && !!state.user;
      }
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useAuthStore;