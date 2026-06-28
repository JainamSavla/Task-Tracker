import axios from 'axios';

const API = axios.create({ 
  baseURL: process.env.REACT_APP_API_URL || '/api' 
});

// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
  try {
    const user = JSON.parse(localStorage.getItem('ce_user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch {}
  return config;
});

// Auth
export const registerUser  = (data) => API.post('/auth/register', data);
export const loginUser     = (data) => API.post('/auth/login', data);

// Tasks
export const getTasks   = (status = '', search = '') =>
  API.get('/tasks', { params: { status, search } });
export const createTask = (data) => API.post('/tasks', data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
