import api from './axios';

export const progressAPI = {
  createOrUpdate: (lessonId: string, score: number) => {
    return api.post('/progress', { lessonId, score });
  },

  getUserProgress: () => {
    return api.get('/progress/me');
  },

  getLessonProgress: (lessonId: string) => {
    return api.get(`/progress/lesson/${lessonId}`);
  },
};