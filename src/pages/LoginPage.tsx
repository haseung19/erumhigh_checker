// pages/LoginPage.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogoIcon } from '@/components/icons/LogoIcon';
// import { useTheme } from '@/hooks/useTheme';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const isEnabled = email.trim() !== '' && password.trim() !== '';

  // 다크 모드 상태를 확인하여 업데이트하는 함수
  const checkDarkMode = () => {
    return (
      typeof window !== 'undefined' &&
      document.documentElement.classList.contains('dark')
    );
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const stored = localStorage.getItem('theme') || 'system';
      if (stored === 'dark') {
        root.classList.add('dark');
      } else if (stored === 'light') {
        root.classList.remove('dark');
      } else {
        // system
        if (mql.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
      setIsDarkMode(checkDarkMode());
    };

    applyTheme();

    const listener = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('theme') || 'system';
      if (stored === 'system') {
        if (e.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        setIsDarkMode(checkDarkMode());
      }
    };
    mql.addEventListener('change', listener);

    return () => {
      mql.removeEventListener('change', listener);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEnabled) {
      onLogin();
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-background min-h-screen flex items-center justify-center">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <LogoIcon className="w-16 h-16 mx-auto"/>
          <CardTitle className="text-2xl text-center">ERUM HIGH</CardTitle>
          <CardDescription className="text-center">
            이룸교회 고등부 출석체크 웹 서비스입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={!isEnabled} className="">
              로그인
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
