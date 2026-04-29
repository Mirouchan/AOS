import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  // ✅ Initialize state from localStorage directly
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const applyTheme = (mode) => {
    const root = document.documentElement;

    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  // ✅ Apply theme on mount + when theme changes
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white shadow-md transition-all"
    >
      {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
    </button>
  );
};

export default ThemeToggle;