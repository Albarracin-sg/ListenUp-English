import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-6 mx-auto max-w-md text-center">
        <h1 className="text-9xl font-bold text-gray-400">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Página no encontrada</h2>
        <p className="mt-4 text-gray-600">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;