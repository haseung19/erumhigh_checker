// /pages/SettingsContent.tsx
import * as React from "react";
import { useTheme } from "@/hooks/useTheme";

export default function SettingsContent() {
  const { theme, setTheme } = useTheme();
  const [_, setResolvedTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setResolvedTheme(media.matches ? "dark" : "light");
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const selectedBtnClass = "px-3 py-2 rounded-xl bg-primary text-primary-foreground";
  const unselectedBtnClass = "px-3 py-2 rounded-xl text-muted-foreground hover:bg-muted-foreground/30 hover:text-foreground";

  return (
    <div className="px-4 py-2">
      <h2 className="font-semibold text-2xl mb-2">테마 설정</h2>
      <div className="flex gap-2 -ml-3">
        <button
          onClick={() => setTheme("light")}
          tabIndex={theme === "light" ? -1 : 0}
          className={theme === "light" ? selectedBtnClass : unselectedBtnClass}
        >
          라이트
        </button>

        <button
          onClick={() => setTheme("dark")}
          tabIndex={theme === "dark" ? -1 : 0}
          className={theme === "dark" ? selectedBtnClass : unselectedBtnClass}
        >
          다크
        </button>

        <button
          onClick={() => setTheme("system")}
          tabIndex={theme === "system" ? -1 : 0}
          className={theme === "system" ? selectedBtnClass : unselectedBtnClass}
        >
          시스템 설정
        </button>
      </div>
    </div>
  );
}