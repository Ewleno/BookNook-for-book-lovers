import axios from 'axios';

// API base URL - change this to your deployed backend URL for production
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with credentials for session management
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API calls
export const authAPI = {
  register: async (username, email, password) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },

  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  checkAuth: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Books API calls
export const booksAPI = {
  getAll: async () => {
    const response = await api.get('/books');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  create: async (bookData) => {
    const response = await api.post('/books', bookData);
    return response.data;
  },

  update: async (id, bookData) => {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },
};

export default api;

