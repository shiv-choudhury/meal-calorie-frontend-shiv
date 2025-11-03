import { Trash2 } from "lucide-react";

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

interface RecentSearchesTableProps {
  searches: SearchHistory[];
  onClearAll: () => void;
}

export default function RecentSearchesTable({
  searches,
  onClearAll
}: RecentSearchesTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Recent Searches
        </h2>
        {searches.length > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {searches.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No search history yet
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  DISH
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  SERVINGS
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  CALS/SERVING
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  TOTAL CALORIES
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {searches.map((search, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="py-4 px-4 text-gray-900 dark:text-white capitalize">
                    {search.dish_name}
                  </td>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                    {search.servings}
                  </td>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                    {search.calories_per_serving}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {search.total_calories}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-400 text-sm">
                    {search.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
