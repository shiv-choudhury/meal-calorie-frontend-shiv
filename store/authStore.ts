import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: any;
};

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
}

const storage =
  typeof window !== "undefined"
    ? createJSONStorage(() => localStorage)
    : createJSONStorage(() => ({
        getItem: (_: string) => null,
        setItem: (_: string, __: string) => {},
        removeItem: (_: string) => {}
      }));

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      clearAuth: () => set({ token: null, user: null })
    }),
    {
      name: "auth-storage",
      storage
    }
  )
);

export default useAuthStore;
