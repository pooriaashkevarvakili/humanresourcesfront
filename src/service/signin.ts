
import api from '../api/axios';

export const signin = async (data:any) => {
  const response = await api.post('/auth/signin', data);
  return response;
};