import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface SearchHistory {
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  source: string;
  date: string;
}

interface MealState {
  searches: SearchHistory[];
  addSearch: (s: SearchHistory) => void;
  setSearches: (s: SearchHistory[]) => void;
  clearSearches: () => void;
}

const storage =
  typeof window !== "undefined"
    ? createJSONStorage(() => localStorage)
    : createJSONStorage(() => ({
        getItem: (_: string) => null,
        setItem: (_: string, __: string) => {},
        removeItem: (_: string) => {}
      }));

const useMealStore = create<MealState>()(
  persist(
    (set) => ({
      searches: [],
      addSearch: (s) => set((state) => ({ searches: [s, ...state.searches] })),
      setSearches: (s) => set({ searches: s }),
      clearSearches: () => set({ searches: [] })
    }),
    {
      name: "meal-storage",
      storage
    }
  )
);

export default useMealStore;
