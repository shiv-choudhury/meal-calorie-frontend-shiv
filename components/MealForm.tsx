import { Search } from "lucide-react";
import { useState } from "react";

interface MealSearchFormProps {
  onSearch: (dishName: string, servings: number) => void;
  loading: boolean;
}

export default function MealSearchForm({
  onSearch,
  loading
}: MealSearchFormProps) {
  const [dishName, setDishName] = useState<string>("");
  const [servings, setServings] = useState<string>("");

  const handleSubmit = () => {
    if (dishName && servings) {
      onSearch(dishName, parseInt(servings));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Find a Meal
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Dish Name
          </label>
          <input
            name="dishname"
            disabled={loading}
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            placeholder="pasta alfredo"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 text-gray-900 dark:text-white placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Servings
          </label>
          <input
            name="servings"
            disabled={loading}
            type="number"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            placeholder="03"
            min="1"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 text-gray-900 dark:text-white placeholder-gray-500"
          />
        </div>

        <button
          id="search-btn"
          onClick={handleSubmit}
          disabled={loading || !dishName || !servings}
          className="w-full py-3 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          {loading ? "Loading..." : "Get Calories"}
        </button>
      </div>
    </div>
  );
}
