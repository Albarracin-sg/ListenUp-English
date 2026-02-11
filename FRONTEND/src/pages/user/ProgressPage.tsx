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
        const data = Array.isArray(response.data.data) ? response.data.data : [];
        setProgress(data);
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
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-blue-50">
        <div className="text-lg font-semibold text-gray-700 animate-pulse">
          Cargando progreso...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-orange-50">
        <div className="bg-white px-8 py-6 rounded-xl shadow-lg text-red-500 font-medium">
          {error}
        </div>
      </div>
    );
  }

  const totalLessons = progress.length;
  const completedLessons = progress.filter(item => item.score >= 70).length;
  const averageScore =
    totalLessons > 0
      ? Math.round(progress.reduce((sum, item) => sum + item.score, 0) / totalLessons)
      : 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 py-10">
      <div className="max-w-5xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Tu progreso 📈
          </h1>
          <p className="text-gray-600 text-lg">
            Sigue mejorando tu inglés cada día
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* total */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100">
            <div className="text-4xl font-bold text-indigo-600 mb-2">
              {totalLessons}
            </div>
            <div className="text-gray-600 font-medium">
              Lecciones completadas
            </div>
          </div>

          {/* completed */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {completedLessons}
            </div>
            <div className="text-gray-600 font-medium">
              Aprobadas
            </div>
          </div>

          {/* average */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {averageScore}%
            </div>
            <div className="text-gray-600 font-medium">
              Promedio
            </div>
          </div>

        </div>

        {/* LIST */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">

          <div className="px-6 py-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-700">
              Historial de lecciones
            </h3>
          </div>

          {progress.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No has completado lecciones todavía.
            </div>
          ) : (
            <div className="divide-y">
              {progress.map((item) => {

                const approved = item.score >= 70;

                return (
                  <div
                    key={item.id}
                    className="p-6 hover:bg-gray-50 transition flex justify-between items-center"
                  >

                    <div>
                      <div className="font-semibold text-gray-800">
                        {item.lessonTitle}
                      </div>

                      <div className="text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div
                      className={`px-4 py-1 rounded-full font-semibold text-sm ${
                        approved
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {item.score}%
                    </div>

                  </div>
                );

              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ProgressPage;