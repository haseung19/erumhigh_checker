// pages/HomePage.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DashboardContent from "@/pages/modules/DashboardContent";
import AttendanceContent from "@/pages/modules/CheckContent";
import UserContent from "@/pages/modules/UserContent";
import SettingsContent from "@/pages/modules/SettingsContent";

import { LogoIcon } from "@/components/icons/LogoIcon";
import { DashboardIcon } from "@/components/icons/DashboardIcon";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { UserIcon } from "@/components/icons/UserIcon";
import { SettingIcon } from "@/components/icons/Settingicon";
import { LogoutIcon } from "@/components/icons/LogoutIcon";

type DashboardProps = {
  onLogout: () => void;
};

type Section = "dashboard" | "attendance" | "user" | "settings";

export default function HomePage({ onLogout }: DashboardProps) {
  const [themeChanging, setThemeChanging] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hideLines, setHideLines] = useState(true);
  const [section, setSection] = useState<Section>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sidebar-section") as Section) || "dashboard";
    }
    return "dashboard";
  });

  // 시스템 테마 변경 시 클래스 업데이트
  useEffect(() => {
    const root = window.document.documentElement;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const stored = localStorage.getItem("theme") || "system";
      if (stored === "dark") {
        root.classList.add("dark");
      } else if (stored === "light") {
        root.classList.remove("dark");
      } else {
        // system
        if (mql.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };

    applyTheme();

    const listener = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem("theme") || "system";
      if (stored === "system") {
        if (e.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };
    mql.addEventListener("change", listener);

    return () => {
      mql.removeEventListener("change", listener);
    };
  }, []);

  const handleThemeChange = () => {
    setThemeChanging(true);
    setTimeout(() => setThemeChanging(false), 500);
  };

  const toggleSidebar = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
      setHideLines(true);
    } else {
      setSidebarOpen(true);
      setHideLines(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("sidebar-section", section);
  }, [section]);

  return (
    <div className="relative min-h-screen bg-background text-foreground text-xl transition-colors duration-500 ease-in-out">
      {/* 메뉴 버튼: 항상 왼쪽 상단 고정 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 transition-transform duration-500 ease-in-out"
        aria-label="Toggle Sidebar"
      >
        {/* 애니메이션 아이콘 */}
        <span className="block relative w-6 h-5.5">
          <span
            className={cn(
              "absolute left-0 w-full h-0.5 origin-center rounded-full",
              "bg-foreground",
              themeChanging
                ? sidebarOpen
                  ? "transition-all duration-500 delay-0 top-2.5"
                  : "transition-all duration-500 delay-0 top-0.5"
                : sidebarOpen
                ? "transition-all duration-300 top-2.5"
                : "transition-all duration-300 top-0.5 delay-300",
              !sidebarOpen && hideLines ? "opacity-100" : "opacity-0"
            )}
          />
          <span
            className={cn(
              "absolute left-0 w-full h-0.5 origin-center top-2.5 rounded-full",
              "bg-foreground",
              themeChanging
                ? "transition-all duration-500 delay-0 rotate-0"
                : sidebarOpen
                ? "transition-all duration-300 delay-300 rotate-45"
                : "transition-all duration-300 delay-0 rotate-0"
            )}
          />
          <span
            className={cn(
              "absolute left-0 w-full h-0.5 origin-center top-2.5 rounded-full",
              "bg-foreground",
              themeChanging
                ? "transition-all duration-500 delay-0 rotate-0"
                : sidebarOpen
                ? "transition-all duration-300 delay-300 -rotate-45"
                : "transition-all duration-300 delay-0 rotate-0"
            )}
          />
          <span
            className={cn(
              "absolute left-0 w-full h-0.5 origin-center rounded-full",
              "bg-foreground",
              themeChanging
                ? sidebarOpen
                  ? "transition-all duration-500 delay-0 top-2.5"
                  : "transition-all duration-500 delay-0 top-4.5"
                : sidebarOpen
                ? "transition-all duration-300 top-2.5"
                : "transition-all duration-300 top-4.5 delay-300",
              !sidebarOpen && hideLines ? "opacity-100" : "opacity-0"
            )}
          />
        </span>
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-sidebar border-r overflow-hidden z-40 transition-transform duration-500 ease-in-out flex flex-col",
          sidebarOpen ? "translate-x-0 w-[220px]" : "-translate-x-full w-[220px]"
        )}
        style={{ paddingTop: "3rem" }}
      >
        <nav className="flex flex-col gap-4 mt-4 px-4 flex-grow">
          <Button
            variant="ghost"
            className={cn(
              "justify-start text-xl font-normal",
              section === "dashboard" ? "text-foreground" : "text-[#979797]"
            )}
            onClick={() => {
              setSection("dashboard");
              setSidebarOpen(false);
              setHideLines(true);
            }}
          >
            <DashboardIcon className="min-w-6 min-h-6" />
            대시보드
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "justify-start text-xl font-normal",
              section === "attendance" ? "text-foreground" : "text-[#979797]"
            )}
            onClick={() => {
              setSection("attendance");
              setSidebarOpen(false);
              setHideLines(true);
            }}
          >
            <CheckIcon className="min-w-6 min-h-6" />
            출석체크
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "justify-start text-xl font-normal",
              section === "user" ? "text-foreground" : "text-[#979797]"
            )}
            onClick={() => {
              setSection("user");
              setSidebarOpen(false);
              setHideLines(true);
            }}
          >
            <UserIcon className="min-w-6 min-h-6" />
            인원관리
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "justify-start text-xl font-normal",
              section === "settings" ? "text-foreground" : "text-[#979797]"
            )}
            onClick={() => {
              setSection("settings");
              setSidebarOpen(false);
              setHideLines(true);
            }}
          >
            <SettingIcon className="min-w-6 min-h-6" />
            설정
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-xl mt-auto mb-4 px-4"
            onClick={onLogout}
          >
            <LogoutIcon className="min-w-6 min-h-6" />
            로그아웃
          </Button>
        </nav>
      </aside>

      {/* Backdrop overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-all duration-500"
          onClick={() => {
            setSidebarOpen(false);
            setHideLines(true);
          }}
        />
      )}

      {/* Main content */}
      {/* 
        - lg 이하: 좌우 padding = px-8 
        - lg 초과: padding = clamp(2rem, (100vw - 64rem) / 2, 16rem)
          여기서 64rem = max-w-5xl (1024px), 16rem = px-64 (256px)
      */}
      <main className="relative z-10 min-h-screen min-w-screen flex flex-col px-8 xl:px-[clamp(2rem,calc((100vw-64rem)/2),16rem)] max-w-5xl mx-auto">
        <div className="h-[10vh] sm:h-[8vh] flex items-center justify-center px-4">
          <LogoIcon className="w-8 h-8" />
          <span className="text-3xl font-extralight ml-2">ERUM HIGH</span>
        </div>
        <div className="h-[90vh] overflow-y-auto px-4 pb-4 scrollbar-none">
          {section === "dashboard" && <DashboardContent />}
          {section === "attendance" && <AttendanceContent />}
          {section === "user" && <UserContent />}
          {section === "settings" && (
            <SettingsContent onThemeChange={handleThemeChange} />
          )}
        </div>
      </main>
    </div>
  );
}
