import { Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { PostDetail } from './pages/PostDetail';
import { AdminLogin } from './pages/AdminLogin';
import { AdminPostEditor } from './pages/AdminPostEditor';
import { isLoggedIn } from './auth';
import type { JSX } from 'react';

function RequireAuth({ children }: { children: JSX.Element }): JSX.Element {
  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export function App(): JSX.Element {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:slug" element={<PostDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/new"
          element={
            <RequireAuth>
              <AdminPostEditor />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/edit/:slug"
          element={
            <RequireAuth>
              <AdminPostEditor />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
