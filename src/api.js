import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // Your API base URL
});

export const login = async (credentials) => {
  try {
    const response = await api.post('login/', credentials);
    return response.data; // Assuming the response contains the token or user data
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Throwing error so that we can handle it in the Login component
  }
};
