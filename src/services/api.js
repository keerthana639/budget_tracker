// src/services/api.js
import axios from 'axios';

const getCategories = () => {
  const token = localStorage.getItem('authToken');
  return axios.get('http://127.0.0.1:8000/api/categories/', {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

const api = {
  getCategories,
};

export default api;
