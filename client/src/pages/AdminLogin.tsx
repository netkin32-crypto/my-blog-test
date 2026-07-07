import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../api';
import { setToken } from '../auth';

export function AdminLogin(): JSX.Element {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    setError('');
    try {
      const { token } = await api.login(username, password);
      setToken(token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败');
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: 16 }}>管理员登录</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-field">
        <label htmlFor="username">用户名</label>
        <input
          id="username"
          type="text"
          value={username}
          autoComplete="username"
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="password">密码</label>
        <input
          id="password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="button">登录</button>
      </div>
    </form>
  );
}
