import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { LoginPage } from './pages/LoginPage';
import { SubmitApplication } from './pages/SubmitApplication';
import { ReviewApplications } from './pages/ReviewApplications';
import { ApproveApplications } from './pages/ApproveApplications';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 px-4">
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to={
                    user?.role === 'student'
                      ? '/submit'
                      : user?.role === 'reviewer'
                      ? '/review'
                      : '/approve'
                  }
                />
              }
            />
            <Route
              path="/submit"
              element={
                user?.role === 'student' ? (
                  <SubmitApplication />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/review"
              element={
                user?.role === 'reviewer' ? (
                  <ReviewApplications />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/approve"
              element={
                user?.role === 'approver' ? (
                  <ApproveApplications />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;