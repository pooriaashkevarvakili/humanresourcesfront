
import api from '../api/axios';

export const signup = async (data:any) => {
  const response = await api.post('/auth/signup', data);
  return response;
};