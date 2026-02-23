import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // La URL de tu backend Spring Boot
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el Token JWT a todas las peticiones
api.interceptors.request.use((config) => {
  const authStorage = JSON.parse(localStorage.getItem('auth-storage'));
  const token = authStorage?.state?.token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;