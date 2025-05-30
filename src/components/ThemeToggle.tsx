import * as React from "react";

export function ThemeToggle({ onThemeChange }: { onThemeChange?: () => void }) {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system";
    }
    return "system";
  });

  const handleSetTheme = (value: string) => {
    setTheme(value);
    if (onThemeChange) onThemeChange(); // 테마 바꿀 때 콜백 호출!
  };

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "system");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  return (
    <div className="flex gap-2">
      <button
        className={`
      p-2 rounded
      ${theme === "light"
            ? "bg-primary text-[#fafafa] dark:text-[#242424] pointer-events-none cursor-default transition-none"
            : "transition-colors duration-500 hover:bg-[#cacaca] dark:hover:bg-[#444444]"}
    `}
        onClick={() => handleSetTheme("light")}
        tabIndex={theme === "light" ? -1 : 0}
      >
        라이트
      </button>
      <button
        className={`
      p-2 rounded
      ${theme === "dark"
            ? "bg-primary text-[#fafafa] dark:text-[#242424] pointer-events-none cursor-default transition-none"
            : "transition-colors duration-500 hover:bg-[#cacaca] dark:hover:bg-[#444444]"}
    `}
        onClick={() => handleSetTheme("dark")}
        tabIndex={theme === "dark" ? -1 : 0}
      >
        다크
      </button>
      <button
        className={`
      p-2 rounded
      ${theme === "system"
            ? "bg-primary text-[#fafafa] dark:text-[#242424] pointer-events-none cursor-default transition-none"
            : "transition-colors duration-500 hover:bg-[#cacaca] dark:hover:bg-[#444444]"}
    `}
        onClick={() => handleSetTheme("system")}
        tabIndex={theme === "system" ? -1 : 0}
      >
        시스템 설정
      </button>
    </div>
  );
}