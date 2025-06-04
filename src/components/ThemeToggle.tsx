// /components/ThemeToggles.tsx
import * as React from "react";

export function ThemeToggle({ onThemeChange }: { onThemeChange?: () => void }) {
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark" | "system") || "system";
    }
    return "system";
  });

  const handleSetTheme = (value: "light" | "dark" | "system") => {
    setTheme(value);
    if (onThemeChange) onThemeChange();
  };

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (theme !== "system") return;
      if (e.matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      mq.removeEventListener("change", handleMediaChange);
      return;
    } 
    
    if (theme === "light") {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      mq.removeEventListener("change", handleMediaChange);
      return;
    }

    localStorage.setItem("theme", "system");

    if (mq.matches) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    mq.addEventListener("change", handleMediaChange);

    return () => {
      mq.removeEventListener("change", handleMediaChange);
    };
  }, [theme]);

  return (
    <div className="flex gap-2">
      <button
        className={`
          p-2 rounded-xl transition-colors duration-500 text-[#ffffff]
          ${theme === "light" ? "bg-primary" : "hover:bg-muted/50"}
        `}
        onClick={() => handleSetTheme("light")}
        tabIndex={theme === "light" ? -1 : 0}
      >
        라이트
      </button>
      <button
        className={`
          p-2 rounded-xl transition-colors duration-500 text-[#0a0a0a]
          ${theme === "dark" ? "bg-primary" : "hover:bg-muted/50"}
        `}
        onClick={() => handleSetTheme("dark")}
        tabIndex={theme === "dark" ? -1 : 0}
      >
        다크
      </button>
      <button
        className={`
          p-2 rounded-xl transition-colors duration-500 text-[#0a0a0a] dark:text-[#ffffff]
          ${theme === "system" ? "bg-primary" : "hover:bg-muted/50"}
        `}
        onClick={() => handleSetTheme("system")}
        tabIndex={theme === "system" ? -1 : 0}
      >
        시스템 설정
      </button>
    </div>
  );
}
