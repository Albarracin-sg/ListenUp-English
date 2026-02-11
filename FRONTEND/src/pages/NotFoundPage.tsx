import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {

  return (

    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-blue-50 px-4">

      <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 text-center max-w-md w-full">

        {/* icon */}

        <div className="text-6xl mb-4">
          🚫
        </div>

        {/* 404 */}

        <h1 className="text-6xl font-bold text-indigo-600 mb-2">
          404
        </h1>

        {/* title */}

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Página no encontrada
        </h2>

        {/* description */}

        <p className="text-gray-600 mb-6">
          La página que buscas no existe o fue movida.
        </p>

        {/* button */}

        <Link
          to="/"
          className="
            inline-block
            px-6 py-3
            bg-indigo-600
            text-white
            font-semibold
            rounded-lg
            hover:bg-indigo-700
            active:scale-[0.98]
            transition
          "
        >
          Volver al inicio
        </Link>

      </div>

    </div>

  );

};

export default NotFoundPage;