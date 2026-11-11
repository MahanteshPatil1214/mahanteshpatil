"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./portfolio.module.scss";

const THEME_KEY = "mahanteshpatil:theme";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  const getStoredTheme = useCallback((): Theme => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }, []);

  const applyTheme = useCallback((next: Theme) => {
    const root = document.documentElement;
    if (next === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem(THEME_KEY, next);
    setTheme(next);
  }, []);

  useEffect(() => {
    setMounted(true);
    const next = getStoredTheme();
    applyTheme(next);

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const handler = () => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(media.matches ? "light" : "dark");
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [applyTheme, getStoredTheme]);

  const toggle = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark");
  }, [theme, applyTheme]);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={styles.themeToggle}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      <span className={styles.themeToggleIcon} aria-hidden="true">
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
