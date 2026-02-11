import api from './axios';

export const vocabularyAPI = {
  getAll: (params?: { search?: string; lessonId?: string }) => {
    return api.get('/vocabulary', { params });
  },

  create: (data: { word: string; meaning: string; example?: string; lessonId?: string }) => {
    return api.post('/vocabulary', data);
  },

  update: (id: string, data: { word?: string; meaning?: string; example?: string; lessonId?: string }) => {
    return api.put(`/vocabulary/${id}`, data);
  },

  remove: (id: string) => {
    return api.delete(`/vocabulary/${id}`);
  },

  getQuiz: (limit = 5) => {
    return api.get('/vocabulary/quiz', { params: { limit } });
  },
};
