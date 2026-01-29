import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonsAPI } from '../../api/lessons';
import { questionsAPI } from '../../api/questions';
import { progressAPI } from '../../api/progress';
import { useAuthStore } from '../../store/auth.store';
import { LEVELS } from '../../utils/constants';
import type { Lesson, Question } from '../../types/lesson.types';
import QuestionRenderer from './components/QuestionRenderer';

const LessonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchLessonAndQuestions = async () => {
      try {
        if (!id) return;

        const lessonResponse = await lessonsAPI.getById(id);
        setLesson(lessonResponse.data.data);

        const questionsResponse = await questionsAPI.getByLessonId(id);
        setQuestions(questionsResponse.data.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar la lección o preguntas');
        setLoading(false);
        console.error('Lesson detail fetch error:', err);
      }
    };

    fetchLessonAndQuestions();
  }, [id]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    if (!user || !id) return;
    
    setIsSubmitting(true);
    
    // Calcular puntaje
    let correctCount = 0;
    questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    setScore(calculatedScore);
    
    try {
      // Guardar progreso
      await progressAPI.createOrUpdate(id, calculatedScore);
      setShowResults(true);
    } catch (err) {
      console.error('Error saving progress:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando lección...</div>
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

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-lg">Lección no encontrada</div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Resultados de la Lección</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Has completado la lección "{lesson.title}"</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Título</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{lesson.title}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Nivel</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {lesson.level === LEVELS.BEGINNER ? 'Principiante' :
                     lesson.level === LEVELS.INTERMEDIATE ? 'Intermedio' :
                     lesson.level === LEVELS.ADVANCED ? 'Avanzado' : lesson.level}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Puntaje</dt>
                  <dd className={`mt-1 text-sm sm:mt-0 sm:col-span-2 ${
                    score && score >= 70 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'
                  }`}>
                    {score}%
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Estado</dt>
                  <dd className={`mt-1 text-sm sm:mt-0 sm:col-span-2 ${
                    score && score >= 70 ? 'text-green-600 font-medium' : 'text-yellow-600 font-medium'
                  }`}>
                    {score && score >= 70 ? '¡Aprobado!' : 'Necesitas mejorar'}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end">
              <button
                onClick={() => navigate('/user/lessons')}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Ver más lecciones
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{lesson.title}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{lesson.description}</p>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-0">
              {/* Video de YouTube */}
              <div className="py-5 px-4 sm:px-6 border-b border-gray-200">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Video de la Lección</h4>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${lesson.youtubeUrl.split('v=')[1]?.split('&')[0]}`}
                    title={lesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-96 rounded-lg"
                  ></iframe>
                </div>
              </div>

              {/* Preguntas */}
              <div className="py-5 px-4 sm:px-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Preguntas</h4>
                
                {questions.length === 0 ? (
                  <p className="text-gray-500">Esta lección aún no tiene preguntas.</p>
                ) : (
                  <div className="space-y-6">
                    {questions.map((question, _) => (
                      <QuestionRenderer
                        key={question.id}
                        question={question}
                        answer={userAnswers[question.id]}
                        onAnswerChange={(answer) => handleAnswerChange(question.id, answer)}
                      />
                    ))}

                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || Object.keys(userAnswers).length < questions.length}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                          Object.keys(userAnswers).length < questions.length
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar respuestas'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailPage;