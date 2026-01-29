import api from './axios';

export const authAPI = {
  register: (email: string, password: string) => {
    return api.post('/auth/register', { email, password });
  },

  login: (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
  },

  getProfile: () => {
    return api.get('/auth/profile');
  },
};