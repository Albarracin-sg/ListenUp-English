import api from './axios';

export const questionsAPI = {
  getByLessonId: (lessonId: string) => {
    return api.get(`/questions/lesson/${lessonId}`);
  },

  create: (data: {
    lessonId: string;
    type: string;
    question: string;
    optionsForMultipleChoice?: string[];
    optionsForFillBlank?: string[];
    correctAnswer: string;
  }) => {
    return api.post('/questions', data);
  },

  update: (id: string, data: {
    lessonId?: string;
    type?: string;
    question?: string;
    optionsForMultipleChoice?: string[];
    optionsForFillBlank?: string[];
    correctAnswer?: string;
  }) => {
    return api.put(`/questions/${id}`, data);
  },

  delete: (id: string) => {
    return api.delete(`/questions/${id}`);
  },
};