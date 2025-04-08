// src/api.js
import axios from 'axios';


const BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem('refresh');
      try {
        const res = await axios.post(`${BASE_URL}/api/token/refresh/`, { refresh });
        const newAccess = res.data.access;
        localStorage.setItem('access', newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (username, password) => {
  const res = await axios.post(`${BASE_URL}/api/login/`, {
    username,
    password,
  });

  const accessToken = res.data.access;
  const refreshToken = res.data.refresh;

  localStorage.setItem('access', accessToken);
  localStorage.setItem('refresh', refreshToken);

  return res.data;
};

export const logout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};

export default api;
