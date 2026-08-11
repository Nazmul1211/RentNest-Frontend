"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex h-9 w-16 shrink-0 cursor-pointer items-center rounded-full border border-border/60 bg-muted/80 p-1 shadow-inner backdrop-blur-sm transition-colors duration-300 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {/* Background track icons for visual context */}
      <span className="flex w-full justify-between px-1 text-muted-foreground/60 transition-opacity duration-300">
        <Sun className={`size-3.5 ${!isDark ? "opacity-0" : "opacity-70"}`} />
        <Moon className={`size-3.5 ${isDark ? "opacity-0" : "opacity-70"}`} />
      </span>

      {/* Sliding knob with icons and smooth motion transform */}
      <span
        className={`absolute top-1 left-1 flex size-7 items-center justify-center rounded-full bg-background shadow-md ring-1 ring-black/5 transition-transform duration-300 ease-spring ease-out ${
          isDark ? "translate-x-7 bg-slate-900 text-amber-300" : "translate-x-0 bg-white text-amber-500"
        }`}
      >
        {isDark ? (
          <Moon className="size-4 animate-in fade-in zoom-in duration-300" />
        ) : (
          <Sun className="size-4 animate-in fade-in zoom-in duration-300" />
        )}
      </span>
    </button>
  );
}

