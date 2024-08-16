import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Substitua pelo URL do seu back-end
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/', userData); // Substitua pela rota correta
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
