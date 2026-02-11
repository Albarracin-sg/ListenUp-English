import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to={isAuthenticated ? (user?.role === 'ADMIN' ? '/admin/lessons' : '/user/lessons') : '/'}
            className="flex items-center gap-2"
          >
            <div className="bg-indigo-600 text-white font-bold px-3 py-1 rounded-lg">
              LU
            </div>
            <span className="text-gray-800 font-semibold text-lg">
              ListenUp English
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">

            {isAuthenticated && user?.role === 'STUDENT' && (
              <>
                <Link
                  to="/user/lessons"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    location.pathname === '/user/lessons'
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Lessons
                </Link>

                <Link
                  to="/user/progress"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    location.pathname === '/user/progress'
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Progress
                </Link>

                <Link
                  to="/user/vocabulary"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    location.pathname === '/user/vocabulary'
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Vocabulary
                </Link>
              </>
            )}

            {isAuthenticated && user?.role === 'ADMIN' && (
              <Link
                to="/admin/lessons"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  location.pathname === '/admin/lessons'
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Admin Lessons
              </Link>
            )}

            {/* Right side */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3 ml-4">

                {/* User email */}
                <div className="bg-gray-100 px-3 py-1 rounded-lg text-sm text-gray-700">
                  {user?.email}
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Logout
                </button>

              </div>
            ) : (
              <div className="flex items-center gap-2 ml-4">

                <Link
                  to="/login"
                  className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Register
                </Link>

              </div>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
