// /pages/SettingsContent.tsx
import { ThemeToggle } from "@/components/ThemeToggle";

export default function SettingsContent({ onThemeChange }: { onThemeChange: () => void }) {
  return (
    <div>
      <h2 className="font-bold text-xl mb-4">테마 설정</h2>
      <ThemeToggle onThemeChange={onThemeChange} />
    </div>
  );
}