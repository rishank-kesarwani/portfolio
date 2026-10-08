"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const themeChangeEvent = "portfolio-theme-change";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribeToThemeChange(onStoreChange: () => void) {
  window.addEventListener(themeChangeEvent, onStoreChange);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", onStoreChange);

  return () => {
    window.removeEventListener(themeChangeEvent, onStoreChange);
    window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", onStoreChange);
  };
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

function setStoredTheme(theme: Theme) {
  window.localStorage.setItem("theme", theme);
  window.dispatchEvent(new Event(themeChangeEvent));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToThemeChange, getPreferredTheme, getServerThemeSnapshot);
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = theme;
  }, [isDark, theme]);

  return (
    <label className="inline-flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
      <span className="hidden sm:inline">{isDark ? "Dark" : "Light"}</span>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={isDark}
        onChange={(event) => setStoredTheme(event.target.checked ? "dark" : "light")}
        aria-label="Toggle dark mode"
      />
      <span className="relative h-6 w-11 rounded-full border border-slate-300 bg-slate-200 transition peer-checked:border-accent-500 peer-checked:bg-accent-600 dark:border-white/15">
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
