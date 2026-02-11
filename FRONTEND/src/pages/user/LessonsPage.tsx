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

    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-white py-10">
  
  ```
  <div className="max-w-7xl mx-auto px-4">
  
    {/* Header */}
    <div className="text-center mb-10">
      <h1 className="text-4xl font-bold text-indigo-600">
        📚 Lecciones de Inglés
      </h1>
      <p className="mt-2 text-gray-600 text-lg">
        Mejora tu inglés paso a paso
      </p>
    </div>
  
    {/* Filter */}
    <div className="flex justify-center mb-10">
      <div className="bg-white p-4 rounded-xl shadow-md">
        <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">
          Filtrar por nivel
        </label>
  
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          {levels.map(level => (
            <option key={level} value={level}>
              {level === 'all'
                ? 'Todos los niveles'
                : level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  
    {/* Lessons Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  
      {filteredLessons.map((lesson) => (
  
        <Link
          key={lesson.id}
          to={`/user/lessons/${lesson.id}`}
          className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
        >
  
          {/* Top color bar */}
          <div className={`
            h-2
            ${lesson.level === 'beginner' ? 'bg-green-400' : ''}
            ${lesson.level === 'intermediate' ? 'bg-yellow-400' : ''}
            ${lesson.level === 'advanced' ? 'bg-red-400' : ''}
          `} />
  
          {/* Content */}
          <div className="p-6">
  
            {/* Icon */}
            <div className="text-3xl mb-3">
              🎧
            </div>
  
            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition">
              {lesson.title}
            </h3>
  
            {/* Description */}
            <p className="mt-2 text-gray-500 text-sm">
              {lesson.description}
            </p>
  
            {/* Level Badge */}
            <div className="mt-4 flex justify-between items-center">
  
              <span className={`
                px-3 py-1 rounded-full text-xs font-semibold
                ${lesson.level === 'beginner'
                  ? 'bg-green-100 text-green-700'
                  : ''}
                ${lesson.level === 'intermediate'
                  ? 'bg-yellow-100 text-yellow-700'
                  : ''}
                ${lesson.level === 'advanced'
                  ? 'bg-red-100 text-red-700'
                  : ''}
              `}>
                {lesson.level.toUpperCase()}
              </span>
  
              <span className="text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                Ver lección →
              </span>
  
            </div>
  
          </div>
  
        </Link>
  
      ))}
  
    </div>
  
    {/* Empty state */}
    {filteredLessons.length === 0 && (
      <div className="text-center mt-16">
        <div className="text-6xl mb-4">
          📭
        </div>
        <p className="text-gray-500 text-lg">
          No hay lecciones disponibles en este nivel
        </p>
      </div>
    )}
  
  </div>
  ```
  
    </div>
  );
};

export default LessonsPage;