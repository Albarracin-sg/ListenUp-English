import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { lessonsAPI } from '../../api/lessons';
import { LEVELS } from '../../utils/constants';

interface Lesson {
  id: string;
  title: string;
  description: string;
  level: string;
  youtubeUrl: string;
  isPublished: boolean;
}

const AdminLessonsPage: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await lessonsAPI.getAll();
        // Asegurarse de que response.data es un array
        const lessonsData = Array.isArray(response.data.data) ? response.data.data : [];
        setLessons(lessonsData);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las lecciones');
        setLoading(false);
        console.error('Lessons fetch error:', err);
      }
    };

    fetchLessons();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta lección?')) {
      try {
        await lessonsAPI.delete(id);
        setLessons(lessons.filter(lesson => lesson.id !== id));
      } catch (err) {
        setError('Error al eliminar la lección');
        console.error('Lesson delete error:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando lecciones...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Lecciones</h1>
          <Link
            to="/admin/lessons/create"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Crear nueva lección
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-indigo-600 truncate">
                      {lesson.title}
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        lesson.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {lesson.isPublished ? 'Publicada' : 'Borrador'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <div className="mr-6 text-sm text-gray-500">
                        Nivel: <span className="text-gray-900">
                          {lesson.level === LEVELS.BEGINNER ? 'Principiante' :
                           lesson.level === LEVELS.INTERMEDIATE ? 'Intermedio' :
                           lesson.level === LEVELS.ADVANCED ? 'Avanzado' : lesson.level}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        {lesson.description}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500 sm:mt-0">
                      <Link
                        to={`/admin/lessons/${lesson.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(lesson.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {lessons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay lecciones creadas aún.</p>
            <Link
              to="/admin/lessons/create"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Crear primera lección
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLessonsPage;