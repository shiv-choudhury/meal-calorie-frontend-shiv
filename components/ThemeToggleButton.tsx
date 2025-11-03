import useThemeStore from "@/store/themeStore";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggleButton() {
  const toggleTheme = useThemeStore((s) => s.toggle);
  const darkMode = useThemeStore((s) => s.mode);

  return (
    <button
      id="theme-toggle"
      onClick={() => toggleTheme()}
      className="p-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all shadow-lg"
    >
      {darkMode === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-black dark:text-white" />
      )}
    </button>
  );
}
