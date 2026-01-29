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

const LessonsPage: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const levels = ['all', LEVELS.BEGINNER, LEVELS.INTERMEDIATE, LEVELS.ADVANCED];

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await lessonsAPI.getAll();
        // Asegurarse de que response.data.data es un array (debido al interceptor del backend)
        const lessonsData = Array.isArray(response.data.data) ? response.data.data : [];
        setLessons(lessonsData);
        setFilteredLessons(lessonsData);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las lecciones');
        setLoading(false);
        console.error('Lessons fetch error:', err);
      }
    };

    fetchLessons();
  }, []);

  useEffect(() => {
    if (selectedLevel === 'all') {
      setFilteredLessons(lessons);
    } else {
      setFilteredLessons(lessons.filter(lesson => lesson.level === selectedLevel));
    }
  }, [selectedLevel, lessons]);

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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lecciones de Inglés</h1>
          <p className="mt-2 text-gray-600">Selecciona una lección para comenzar a aprender</p>
        </div>

        <div className="mb-6">
          <label htmlFor="level-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por nivel:
          </label>
          <select
            id="level-filter"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="block w-full max-w-xs mx-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {levels.map(level => (
              <option key={level} value={level}>
                {level === 'all' ? 'Todos los niveles' : level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/user/lessons/${lesson.id}`}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{lesson.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{lesson.description}</p>
                    <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron lecciones para el nivel seleccionado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonsPage;