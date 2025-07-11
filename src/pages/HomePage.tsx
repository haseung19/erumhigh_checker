// /pages/HomePage.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DashboardContent from "@/pages/modules/DashboardContent";
import CheckContent from "@/pages/modules/CheckContent";
import UserContent from "@/pages/modules/UserContent";
import SettingsContent from "@/pages/modules/SettingsContent";
import { useTheme } from "@/hooks/useTheme";

import { LogoIcon } from "@/components/icons/LogoIcon";
import { DashboardIcon } from "@/components/icons/DashboardIcon";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { UserIcon } from "@/components/icons/UserIcon";
import { SettingIcon } from "@/components/icons/Settingicon";
import { LogoutIcon } from "@/components/icons/LogoutIcon";

type DashboardProps = {
  onLogout: () => void;
};

type Section = "dashboard" | "Check" | "user" | "settings";

export default function HomePage({ onLogout }: DashboardProps) {
  useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hideLines, setHideLines] = useState(true);
  const [animating, setAnimating] = useState(false);

  const [showBackdrop, setShowBackdrop] = useState(false);
  const [backdropVisible, setBackdropVisible] = useState(false);

  const [section, setSection] = useState<Section>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("sidebar-section") as Section) || "dashboard";
    }
    return "dashboard";
  });

  const toggleSidebar = () => {
    if (sidebarOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };

  const openSidebar = () => {
    setShowBackdrop(true);
    setSidebarOpen(true);
    setHideLines(false);
    requestAnimationFrame(() => {
      setBackdropVisible(true);
    });
  };

  const closeSidebar = () => {
    setAnimating(true);
    setSidebarOpen(false);
    setHideLines(true);
    setBackdropVisible(false);

    setTimeout(() => {
      setAnimating(false);
      setShowBackdrop(false);
    }, 400);
  };

  useEffect(() => {
    localStorage.setItem("sidebar-section", section);
  }, [section]);

  return (
    <div className="relative min-h-screen bg-background text-foreground text-xl">
      {/* 햄버거 버튼 */}
      <Button
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-transparent hover:bg-muted-foreground/30 shadow-none"
        aria-label="Toggle Sidebar"
      >
        <span className="block relative w-6 h-5.5">
          <span
            className={cn(
              "absolute left-0 w-full h-0.5 origin-center rounded-full bg-foreground",
              sidebarOpen
                ? `transition-all duration-300 top-2.5 ${animating ? "delay-300" : "delay-0"}`
                : `transition-all duration-300 top-0.5 ${animating ? "delay-300" : "delay-0"}`,
              !sidebarOpen && hideLines ? "opacity-100" : "opacity-0"
            )}
          />
          <span
            className={cn(
              "absolute left-0 w-full h-0.5 origin-center top-2.5 rounded-full bg-foreground",
              sidebarOpen
                ? "transition-all duration-300 delay-300 rotate-45"
                : "transition-all duration-300 delay-0 rotate-0"
            )}
          />
          <span
            className={cn(
              "absolute left-0 w-full h-0.5 origin-center top-2.5 rounded-full bg-foreground",
              sidebarOpen
                ? "transition-all duration-300 delay-300 -rotate-45"
                : "transition-all duration-300 delay-0 rotate-0"
            )}
          />
          <span
            className={cn(
              "absolute left-0 w-full h-0.5 origin-center rounded-full bg-foreground",
              sidebarOpen
                ? `transition-all duration-300 top-2.5 ${animating ? "delay-300" : "delay-0"}`
                : `transition-all duration-300 top-4.5 ${animating ? "delay-300" : "delay-0"}`,
              !sidebarOpen && hideLines ? "opacity-100" : "opacity-0"
            )}
          />
        </span>
      </Button>

      {/* 사이드바 */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-sidebar border-r overflow-hidden z-40 flex flex-col transition-transform duration-400",
          sidebarOpen ? "translate-x-0 w-[220px]" : "-translate-x-full w-[220px]"
        )}
        style={{ paddingTop: "3rem" }}
      >
        <nav className="flex flex-col gap-4 mt-4 px-4 flex-grow">
          <Button
            className={cn(
              "group justify-start text-xl font-normal bg-sidebar shadow-none transition-colors duration-400 hover:text-foreground hover:bg-muted-foreground/30",
              section === "dashboard" ? "text-foreground" : "text-foreground/50"
            )}
            onClick={() => {
              setSection("dashboard");
              closeSidebar();
            }}
          >
            <DashboardIcon className="min-w-6 min-h-6" />
            대시보드
          </Button>

          <Button
            className={cn(
              "group justify-start text-xl font-normal bg-sidebar shadow-none transition-colors duration-400 hover:text-foreground hover:bg-muted-foreground/30",
              section === "Check" ? "text-foreground" : "text-foreground/50"
            )}
            onClick={() => {
              setSection("Check");
              closeSidebar();
            }}
          >
            <CheckIcon className="min-w-6 min-h-6" />
            출석체크
          </Button>

          <Button
            className={cn(
              "group justify-start text-xl font-normal bg-sidebar shadow-none transition-colors duration-400 hover:text-foreground hover:bg-muted-foreground/30",
              section === "user" ? "text-foreground" : "text-foreground/50"
            )}
            onClick={() => {
              setSection("user");
              closeSidebar();
            }}
          >
            <UserIcon className="min-w-6 min-h-6" />
            인원관리
          </Button>

          <Button
            className={cn(
              "group justify-start text-xl font-normal bg-sidebar shadow-none transition-colors duration-400 hover:text-foreground hover:bg-muted-foreground/30",
              section === "settings" ? "text-foreground" : "text-foreground/50"
            )}
            onClick={() => {
              setSection("settings");
              closeSidebar();
            }}
          >
            <SettingIcon className="min-w-6 min-h-6" />
            설정
          </Button>

          <Button
            className="justify-start text-xl mt-auto text-foreground mb-4 px-4 font-normal bg-sidebar hover:bg-muted-foreground/30 shadow-none transition-colors duration-400"
            onClick={onLogout}
          >
            <LogoutIcon className="min-w-6 min-h-6" />
            로그아웃
          </Button>
        </nav>
      </aside>

      {/* 어두운 배경 - 페이드 인/아웃 */}
      {showBackdrop && (
        <div
          className={cn(
            "fixed inset-0 bg-black z-30 transition-opacity duration-400",
            backdropVisible ? "opacity-50" : "opacity-0"
          )}
          onClick={closeSidebar}
        />
      )}

      {/* 메인 콘텐츠 */}
      <main className="relative z-10 flex flex-col h-screen xl:max-w-7xl mx-auto">
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full xl:max-w-7xl h-16 flex items-center justify-center px-4 bg-background z-40">
          <LogoIcon className="w-8 h-8" />
          <span className="text-3xl font-extralight ml-2">ERUM HIGH</span>
        </div>
        <div className="mt-16 flex-1 min-h-0 overflow-y-auto px-4 pb-30 sm:pb-4 scroll-container">
          <div className="min-h-full">
            {section === "dashboard" && <DashboardContent />}
            {section === "Check" && <CheckContent />}
            {section === "user" && <UserContent />}
            {section === "settings" && <SettingsContent />}
          </div>
        </div>
      </main>
    </div>
  );
}