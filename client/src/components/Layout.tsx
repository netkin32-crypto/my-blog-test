import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { isLoggedIn, clearToken } from '../auth';
import type { JSX } from 'react';

export function Layout({ children }: { children: ReactNode }): JSX.Element {
  const loggedIn = isLoggedIn();

  function handleLogout(): void {
    clearToken();
    window.location.href = '/';
  }

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav-brand">My Blog Test</Link>
        <div className="nav-links">
          {loggedIn ? (
            <>
              <Link to="/admin/new" className="button-link">写新文章</Link>
              <button type="button" className="button-link" onClick={handleLogout}>退出登录</button>
            </>
          ) : (
            <Link to="/admin/login" className="button-link">管理员登录</Link>
          )}
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
}
