import React, { useState } from 'react';
import './Login.css';

interface LoginProps {
  onLogin: (name: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('이름과 이메일을 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onLogin(name.trim());
      } else {
        setError(data.message || '로그인에 실패했습니다.');
      }
    } catch {
      setError('서버에 연결할 수 없습니다. 백엔드 서버를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">Career AI</h2>
        <p className="login-subtitle">이름과 이메일을 입력하고 시작하세요</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            className="login-input"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="email"
            className="login-input"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? '처리 중...' : '시작하기'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
