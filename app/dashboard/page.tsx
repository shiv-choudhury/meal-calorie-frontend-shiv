"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Apple, Moon, Sun, LogOut } from "lucide-react";
import useThemeStore from "@/store/themeStore";

import RecentSearchesTable from "@/components/RecentSearchTable";
import ResultCard from "@/components/ResultCard";
import MealSearchForm from "@/components/MealForm";
import { getCalories } from "../api/auth";
import useAuthStore from "@/store/authStore";
import useMealStore from "@/store/mealStore";
import ThemeToggleButton from "@/components/ThemeToggleButton";

interface CalorieResult {
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  source: string;
}

interface SearchHistory extends CalorieResult {
  date: string;
}

function DashboardHeader() {
  const router = useRouter();
  const { user } = useAuthStore((state) => state);

  const handleLogout = () => {
    useAuthStore.getState().clearAuth();
    useMealStore.getState().clearSearches();
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <Apple className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                NutriTrack
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.email || "User"}
              </p>
              {user?.firstName && (
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {user?.firstName}
                </p>
              )}
            </div>

            <ThemeToggleButton />

            <button
              id="logout-btn"
              onClick={handleLogout}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              <LogOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function NutriTrackDashboard() {
  const router = useRouter();
  const { token } = useAuthStore((state) => state);
  const recentSearches = useMealStore((s) => s.searches);
  const addSearch = useMealStore((s) => s.addSearch);
  const clearSearches = useMealStore((s) => s.clearSearches);

  const [result, setResult] = useState<CalorieResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleSearch = async (dishName: string, servings: number) => {
    try {
      setLoading(true);
      const params = {
        dish_name: dishName,
        servings: servings
      };
      const response: any = await getCalories(params);

      const data = response.data;

      setResult(data);

      // Add to search history
      const newSearch: SearchHistory = {
        ...data,
        date: new Date().toLocaleString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true
        })
      };
      addSearch(newSearch);
    } catch (error: any) {
      if (error?.response?.data?.error === "Invalid token") {
        toast.error("Session expired. Please login again.");

        // clear persisted auth and searches
        useAuthStore.getState().clearAuth();
        useMealStore.getState().clearSearches();
        router.push("/login");
      } else {
        console.error("Error fetching calories:", error);
        toast.error("Error fetching calorie data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all search history?")) {
      clearSearches();
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
        <DashboardHeader />

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <MealSearchForm onSearch={handleSearch} loading={loading} />
            <ResultCard result={result} loading={loading} />
          </div>

          <RecentSearchesTable
            searches={recentSearches}
            onClearAll={handleClearAll}
          />
        </main>
      </div>
    </div>
  );
}
