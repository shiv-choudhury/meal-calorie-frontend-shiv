import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ThemeState {
  mode: "dark" | "light";
  setMode: (mode: "dark" | "light") => void;
  toggle: () => void;
}

const storage =
  typeof window !== "undefined"
    ? createJSONStorage(() => localStorage)
    : createJSONStorage(() => ({
        getItem: (_: string) => null,
        setItem: (_: string, __: string) => {},
        removeItem: (_: string) => {}
      }));

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "dark",
      setMode: (mode) => set({ mode }),
      toggle: () => set((s) => ({ mode: s.mode === "dark" ? "light" : "dark" }))
    }),
    {
      name: "theme-storage",
      storage
    }
  )
);

export default useThemeStore;
