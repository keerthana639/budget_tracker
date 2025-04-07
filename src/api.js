import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Your API base URL
});
//api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
export const login = async (credentials) => {
  try {
    const response = await api.post('token/', {
      username: credentials.username,
      password: credentials.password
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export default api;
