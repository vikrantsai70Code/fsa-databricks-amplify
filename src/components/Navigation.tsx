import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              FSA Portal
            </Link>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              {user.role === 'student' && (
                <Link to="/submit" className="hover:text-indigo-200">
                  Submit Application
                </Link>
              )}
              {user.role === 'reviewer' && (
                <Link to="/review" className="hover:text-indigo-200">
                  Review Applications
                </Link>
              )}
              {user.role === 'approver' && (
                <Link to="/approve" className="hover:text-indigo-200">
                  Approve Applications
                </Link>
              )}
              <button
                onClick={logout}
                className="flex items-center space-x-1 hover:text-indigo-200"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};