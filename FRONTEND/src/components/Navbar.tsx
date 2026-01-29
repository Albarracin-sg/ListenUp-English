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
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="shrink-0">
              <Link to={isAuthenticated ? (user?.role === 'ADMIN' ? '/admin/lessons' : '/user/lessons') : '/'} className="text-white text-xl font-bold">
                ListenUp English
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {isAuthenticated && user?.role === 'ADMIN' && (
                  <>
                    <Link
                      to="/admin/lessons"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        location.pathname === '/admin/lessons'
                          ? 'bg-indigo-700 text-white'
                          : 'text-white hover:bg-indigo-500'
                      }`}
                    >
                      Lecciones
                    </Link>
                  </>
                )}
                {isAuthenticated && user?.role === 'STUDENT' && (
                  <>
                    <Link
                      to="/user/lessons"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        location.pathname === '/user/lessons'
                          ? 'bg-indigo-700 text-white'
                          : 'text-white hover:bg-indigo-500'
                      }`}
                    >
                      Mis Lecciones
                    </Link>
                    <Link
                      to="/user/progress"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        location.pathname === '/user/progress'
                          ? 'bg-indigo-700 text-white'
                          : 'text-white hover:bg-indigo-500'
                      }`}
                    >
                      Mi Progreso
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <div className="flex items-center">
                  <span className="text-white mr-4 text-sm hidden md:inline">
                    {user?.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-white px-3 py-2 rounded-md text-sm font-medium bg-indigo-700 hover:bg-indigo-800"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Link
                    to="/login"
                    className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/register"
                    className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
