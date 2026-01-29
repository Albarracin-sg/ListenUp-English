import React, { useState, useEffect } from 'react';
import { progressAPI } from '../../api/progress';

interface ProgressItem {
  id: string;
  lessonId: string;
  lessonTitle: string;
  score: number;
  createdAt: string;
}

const ProgressPage: React.FC = () => {
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await progressAPI.getUserProgress();
        setProgress(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el progreso');
        setLoading(false);
        console.error('Progress fetch error:', err);
      }
    };

    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando progreso...</div>
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

  // Calcular estadísticas
  const totalLessons = progress.length;
  const completedLessons = progress.filter(item => item.score >= 70).length;
  const averageScore = totalLessons > 0 
    ? Math.round(progress.reduce((sum, item) => sum + item.score, 0) / totalLessons) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Progreso</h1>
          <p className="mt-2 text-gray-600">Seguimiento de tus lecciones completadas</p>
        </div>

        {/* Estadísticas generales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-indigo-600">{totalLessons}</div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Lecciones totales</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-green-600">{completedLessons}</div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Completadas</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-blue-600">{averageScore}%</div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Promedio</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detalle de progreso */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Detalle de Lecciones</h3>
          </div>
          <div className="border-t border-gray-200">
            {progress.length === 0 ? (
              <div className="px-4 py-5 sm:p-6 text-center">
                <p className="text-gray-500">Aún no has completado ninguna lección.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {progress.map((item) => (
                  <li key={item.id} className="px-4 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{item.lessonTitle}</h4>
                        <p className="text-sm text-gray-500">
                          Completado el {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          item.score >= 70 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.score}%
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;