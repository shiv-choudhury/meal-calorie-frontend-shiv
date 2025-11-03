import Spinner from "@/components/Spinner";

interface CalorieResult {
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  source: string;
}

interface ResultCardProps {
  result: CalorieResult | null;
  loading: boolean;
}

export default function ResultCard({ result, loading }: ResultCardProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center min-h-[400px]">
        <div role="status" className="flex flex-col items-center gap-4">
          <Spinner size={48} className="text-emerald-600" />
          <p className="text-gray-600 dark:text-gray-300">Loading results…</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 dark:text-gray-400">
          Search for a meal to see results
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Result
      </h2>

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 capitalize">
          {result.dish_name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Source: {result.source}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-center">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            SERVINGS
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {result.servings}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-center">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            CALS / SERVING
          </p>
          <p
            id="calories_per_serving"
            className="text-3xl font-bold text-gray-900 dark:text-white"
          >
            {result.calories_per_serving}
          </p>
        </div>
      </div>

      <div className="bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 rounded-xl p-6 text-center border border-emerald-200 dark:border-emerald-800">
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
          TOTAL CALORIES
        </p>
        <p
          id="total_calories"
          className="text-5xl font-bold text-emerald-600 dark:text-emerald-400"
        >
          {result.total_calories}
        </p>
      </div>
    </div>
  );
}
