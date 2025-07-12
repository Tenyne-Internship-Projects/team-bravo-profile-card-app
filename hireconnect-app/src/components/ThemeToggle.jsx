// src/components/ThemeToggle.jsx
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import "../styles/ThemeToggle.css";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="theme-toggle-btn"
      aria-label="Toggle Theme"
    >
      {darkMode ? (
        <Sun className="theme-toggle-icon-dark" />
      ) : (
        <Moon className="theme-toggle-icon-light" />
      )}
    </button>
  );
};

export default ThemeToggle;
