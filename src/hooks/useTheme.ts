// /hooks/useTheme.ts
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "system";
    }
    return "system";
  });

  // 테마 로컬스토리지 저장 & 초기 적용
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("theme", theme);

    const apply = () => {
      if (theme === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("dark", isDark);
      } else {
        document.documentElement.classList.toggle("dark", theme === "dark");
      }
    };

    apply();

    // 시스템 모드일 때만 리스너 등록
    if (theme === "system") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = (e: MediaQueryListEvent) => {
        document.documentElement.classList.toggle("dark", e.matches);
      };
      mql.addEventListener("change", listener);
      return () => {
        mql.removeEventListener("change", listener);
      };
    }
  }, [theme]);

  return { theme, setTheme: setThemeState };
}
