import React, { useEffect, useMemo, useState } from 'react';
import { vocabularyAPI } from '../../api/vocabulary';
import type { VocabularyEntry } from '../../types/vocabulary.types';

type TabKey = 'list' | 'flashcards' | 'quiz';

const VocabularyPage: React.FC = () => {
  const [entries, setEntries] = useState<VocabularyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<TabKey>('list');

  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [example, setExample] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingWord, setEditingWord] = useState('');
  const [editingMeaning, setEditingMeaning] = useState('');
  const [editingExample, setEditingExample] = useState('');

  const [flashIndex, setFlashIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  const [quizItems, setQuizItems] = useState<VocabularyEntry[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizResult, setQuizResult] = useState<{ total: number; correct: number } | null>(null);
  const [quizLimit, setQuizLimit] = useState(5);

  const loadEntries = async (query?: string) => {
    try {
      setLoading(true);
      const response = await vocabularyAPI.getAll(query ? { search: query } : undefined);
      const data = Array.isArray(response.data.data) ? response.data.data : [];
      setEntries(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar el vocabulario');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const filteredEntries = useMemo(() => {
    if (!search.trim()) return entries;
    const q = search.toLowerCase();
    return entries.filter((entry) =>
      entry.word.toLowerCase().includes(q) ||
      entry.meaning.toLowerCase().includes(q) ||
      (entry.example || '').toLowerCase().includes(q)
    );
  }, [entries, search]);

  const handleAdd = async () => {
    if (!word.trim() || !meaning.trim()) {
      setError('Palabra y significado son obligatorios');
      return;
    }

    try {
      setIsSaving(true);
      await vocabularyAPI.create({
        word: word.trim(),
        meaning: meaning.trim(),
        example: example.trim() || undefined,
      });
      setWord('');
      setMeaning('');
      setExample('');
      await loadEntries();
    } catch (err) {
      setError('No se pudo guardar la palabra');
    } finally {
      setIsSaving(false);
    }
  };

  const startEdit = (entry: VocabularyEntry) => {
    setEditingId(entry.id);
    setEditingWord(entry.word);
    setEditingMeaning(entry.meaning);
    setEditingExample(entry.example || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingWord('');
    setEditingMeaning('');
    setEditingExample('');
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    if (!editingWord.trim() || !editingMeaning.trim()) {
      setError('Palabra y significado son obligatorios');
      return;
    }

    try {
      await vocabularyAPI.update(editingId, {
        word: editingWord.trim(),
        meaning: editingMeaning.trim(),
        example: editingExample.trim() || undefined,
      });
      cancelEdit();
      await loadEntries();
    } catch (err) {
      setError('No se pudo actualizar la palabra');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await vocabularyAPI.remove(id);
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    } catch (err) {
      setError('No se pudo eliminar la palabra');
    }
  };

  const handleFlashNext = () => {
    if (filteredEntries.length === 0) return;
    setFlashIndex((prev) => (prev + 1) % filteredEntries.length);
    setShowBack(false);
  };

  const handleFlashPrev = () => {
    if (filteredEntries.length === 0) return;
    setFlashIndex((prev) => (prev - 1 + filteredEntries.length) % filteredEntries.length);
    setShowBack(false);
  };

  const startQuiz = async () => {
    try {
      setQuizResult(null);
      const response = await vocabularyAPI.getQuiz(quizLimit);
      const data = Array.isArray(response.data.data) ? response.data.data : [];
      setQuizItems(data);
      setQuizAnswers({});
    } catch (err) {
      setError('No se pudo iniciar el quiz');
    }
  };

  const submitQuiz = () => {
    let correct = 0;
    quizItems.forEach((item) => {
      const answer = (quizAnswers[item.id] || '').trim().toLowerCase();
      const target = item.meaning.trim().toLowerCase();
      if (answer && answer === target) {
        correct += 1;
      }
    });
    setQuizResult({ total: quizItems.length, correct });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando vocabulario...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-white py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600">Vocabulario personal</h1>
            <p className="text-gray-600 mt-1">Guarda palabras, repasalas y practica con quiz rapido.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTab('list')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                tab === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setTab('flashcards')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                tab === 'flashcards' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              Flashcards
            </button>
            <button
              onClick={() => setTab('quiz')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                tab === 'quiz' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              Quiz rapido
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {tab === 'list' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Agregar palabra</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  placeholder="Word"
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <input
                  value={meaning}
                  onChange={(e) => setMeaning(e.target.value)}
                  placeholder="Meaning"
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <input
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                  placeholder="Example (optional)"
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleAdd}
                  disabled={isSaving}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  {isSaving ? 'Guardando...' : 'Guardar palabra'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Tus palabras</h2>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar palabra o significado"
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {filteredEntries.length === 0 ? (
                <div className="text-center text-gray-500 py-10">No tienes palabras guardadas</div>
              ) : (
                <div className="space-y-3">
                  {filteredEntries.map((entry) => (
                    <div key={entry.id} className="border border-gray-200 rounded-xl p-4">
                      {editingId === entry.id ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              value={editingWord}
                              onChange={(e) => setEditingWord(e.target.value)}
                              className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <input
                              value={editingMeaning}
                              onChange={(e) => setEditingMeaning(e.target.value)}
                              className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <input
                              value={editingExample}
                              onChange={(e) => setEditingExample(e.target.value)}
                              className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                          </div>
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={cancelEdit}
                              className="px-3 py-2 rounded-lg text-sm border border-gray-300 text-gray-600"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={handleUpdate}
                              className="px-3 py-2 rounded-lg text-sm bg-indigo-600 text-white"
                            >
                              Guardar cambios
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div>
                            <div className="text-lg font-semibold text-gray-800">{entry.word}</div>
                            <div className="text-gray-600">{entry.meaning}</div>
                            {entry.example && (
                              <div className="text-sm text-gray-500 mt-1">{entry.example}</div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(entry)}
                              className="px-3 py-2 rounded-lg text-sm border border-gray-300 text-gray-600"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(entry.id)}
                              className="px-3 py-2 rounded-lg text-sm bg-red-50 text-red-600 border border-red-200"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'flashcards' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            {filteredEntries.length === 0 ? (
              <div className="text-center text-gray-500 py-10">No hay palabras para repasar</div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-full max-w-xl h-56 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-center p-6 cursor-pointer"
                  onClick={() => setShowBack((prev) => !prev)}
                >
                  {showBack ? (
                    <div>
                      <div className="text-xl font-semibold text-gray-800">{filteredEntries[flashIndex].meaning}</div>
                      {filteredEntries[flashIndex].example && (
                        <div className="text-sm text-gray-600 mt-2">{filteredEntries[flashIndex].example}</div>
                      )}
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-indigo-700">{filteredEntries[flashIndex].word}</div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleFlashPrev}
                    className="px-4 py-2 rounded-lg text-sm border border-gray-300 text-gray-600"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setShowBack((prev) => !prev)}
                    className="px-4 py-2 rounded-lg text-sm bg-indigo-600 text-white"
                  >
                    Voltear
                  </button>
                  <button
                    onClick={handleFlashNext}
                    className="px-4 py-2 rounded-lg text-sm border border-gray-300 text-gray-600"
                  >
                    Siguiente
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {flashIndex + 1} / {filteredEntries.length}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'quiz' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Quiz rapido</h2>
                <p className="text-sm text-gray-500">Escribe el significado exacto de cada palabra.</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={quizLimit}
                  onChange={(e) => setQuizLimit(Number(e.target.value))}
                  className="w-24 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  onClick={startQuiz}
                  className="px-4 py-2 rounded-lg text-sm bg-indigo-600 text-white"
                >
                  Iniciar
                </button>
              </div>
            </div>

            {quizItems.length === 0 ? (
              <div className="text-center text-gray-500 py-10">Aun no hay palabras para el quiz</div>
            ) : (
              <div className="space-y-4">
                {quizItems.map((item, index) => (
                  <div key={item.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="text-sm text-gray-500 mb-1">#{index + 1}</div>
                    <div className="text-lg font-semibold text-indigo-700 mb-2">{item.word}</div>
                    <input
                      value={quizAnswers[item.id] || ''}
                      onChange={(e) =>
                        setQuizAnswers((prev) => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }))
                      }
                      placeholder="Escribe el significado"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <button
                    onClick={submitQuiz}
                    className="px-4 py-2 rounded-lg text-sm bg-indigo-600 text-white"
                  >
                    Ver resultados
                  </button>
                  {quizResult && (
                    <div className="text-sm font-semibold text-gray-700">
                      Resultado: {quizResult.correct} / {quizResult.total}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VocabularyPage;
