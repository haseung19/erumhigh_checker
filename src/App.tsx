// App.tsx
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import HomePage from '@/pages/HomePage';
import { useTheme } from '@/hooks/useTheme';

export default function App() {
  useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // localStorage에서 로그인 상태를 불러오기
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    // 로그인 상태가 바뀔 때 localStorage에 저장
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // 상태 제거
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn
              ? <Navigate to="/home" replace />
              : <LoginPage onLogin={handleLogin} />
          }
        />
        <Route
          path="/home"
          element={
            isLoggedIn
              ? <HomePage onLogout={handleLogout} />
              : <Navigate to="/" replace />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
