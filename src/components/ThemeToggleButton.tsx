"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "@/components/Icons/Icons";

export function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="squircle-sm inline-flex h-10 w-10 items-center justify-center border border-shadow-grey-200 bg-white text-shadow-grey-900 opacity-50 dark:border-shadow-grey-800 dark:bg-shadow-grey-950 dark:text-shadow-grey-50"
        aria-hidden="true"
      >
        <span className="sr-only">Loading theme toggle</span>
      </button>
    );
  }

  const currentTheme =
    resolvedTheme === "dark" || resolvedTheme === "light" ? resolvedTheme : null;

  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  const label = nextTheme === "dark" ? "Dark" : "Light";
  const isNextDark = nextTheme === "dark";

  return (
    <button
      type="button"
      className={[
        "squircle-sm inline-flex h-10 w-10 items-center justify-center border text-sm font-medium transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-camel-400)] focus-visible:outline-offset-2",
        isNextDark
          ? "border-shadow-grey-800 bg-shadow-grey-950/70 text-shadow-grey-50 hover:bg-shadow-grey-900"
          : "border-shadow-grey-200 bg-white/70 text-shadow-grey-900 hover:bg-shadow-grey-100",
      ].join(" ")}
      data-ui="theme-toggle"
      aria-label={`Switch to ${label} theme`}
      onClick={() => {
        setTheme(nextTheme);
      }}
    >
      {isNextDark ? <Moon size={18} weight="bold" /> : <Sun size={18} weight="bold" />}
    </button>
  );
}
