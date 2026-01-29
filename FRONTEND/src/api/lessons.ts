import api from './axios';

export const lessonsAPI = {
  getAll: (level?: string) => {
    const params = level ? { level } : {};
    return api.get('/lessons', { params });
  },

  getById: (id: string) => {
    return api.get(`/lessons/${id}`);
  },

  create: (data: {
    title: string;
    description: string;
    level: string;
    youtubeUrl: string;
    isPublished: boolean;
  }) => {
    return api.post('/lessons', data);
  },

  update: (id: string, data: {
    title?: string;
    description?: string;
    level?: string;
    youtubeUrl?: string;
    isPublished?: boolean;
  }) => {
    return api.put(`/lessons/${id}`, data);
  },

  delete: (id: string) => {
    return api.delete(`/lessons/${id}`);
  },
};