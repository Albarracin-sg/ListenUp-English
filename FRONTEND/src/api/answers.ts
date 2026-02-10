import api from './axios';

export const answersAPI = {
  validate: (questionId: string, answer: string) => {
    return api.post('/answers/validate', { questionId, answer });
  },
};