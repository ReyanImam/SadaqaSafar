import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  
  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
  
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  }
}));

export default useAuthStore;