// pages/LoginPage.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogoIcon } from '@/components/icons/LogoIcon';
import { useTheme } from '@/hooks/useTheme';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEnabled = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEnabled) return;
    localStorage.setItem('sidebar-section', 'dashboard');
    onLogin();
  };

  return (
    <div className="w-screen min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-sm">
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <LogoIcon className="w-16 h-16 mx-auto" />
            <CardTitle className="text-2xl text-center text-foreground">
              ERUM HIGH
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
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
              <Button
                type="submit"
                disabled={!isEnabled}
                className={`w-full bg-foreground text-background hover:bg-muted-foreground ${isEnabled ? '' : 'cursor-not-allowed'}`}
              >
                로그인
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
