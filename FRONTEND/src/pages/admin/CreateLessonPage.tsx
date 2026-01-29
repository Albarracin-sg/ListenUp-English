import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lessonsAPI } from '../../api/lessons';
import { LEVELS } from '../../utils/constants';

const CreateLessonPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState(LEVELS.BEGINNER);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await lessonsAPI.create({
        title,
        description,
        level,
        youtubeUrl,
        isPublished
      });

      navigate('/admin/lessons');
    } catch (err) {
      setError('Error al crear la lección');
      console.error('Lesson creation error:', err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Crear Nueva Lección</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              {error && (
                <div className="px-4 py-5 bg-red-50 sm:px-6">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}
              
              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Título
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>

              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Descripción
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>

              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Nivel
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="level"
                    name="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md p-2"
                  >
                    <option value={LEVELS.BEGINNER}>Principiante</option>
                    <option value={LEVELS.INTERMEDIATE}>Intermedio</option>
                    <option value={LEVELS.ADVANCED}>Avanzado</option>
                  </select>
                </div>
              </div>

              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  URL de YouTube
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="url"
                    name="youtubeUrl"
                    id="youtubeUrl"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    required
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>

              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <label htmlFor="isPublished" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Publicada
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="checkbox"
                    name="isPublished"
                    id="isPublished"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-500">Marcar como publicada</span>
                </div>
              </div>

              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="sm:mt-0 sm:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {loading ? 'Creando...' : 'Crear Lección'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/lessons')}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLessonPage;