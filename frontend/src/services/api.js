// API Service - Handles all API calls
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  Promise.reject(error);
});

// ============ AUTH SERVICES ============
export const authService = {
  signup: (data) => api.post('/auth/signup', data),
  login: (credentials) => api.post('/auth/login', credentials),
  verifyToken: () => api.get('/auth/verify'),
};

// ============ USER SERVICES ============
export const userService = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  updateNutritionGoals: (goals) => api.put('/user/nutrition-goals', goals),
};

// ============ FITNESS SERVICES ============
export const fitnessService = {
  addWorkout: (data) => api.post('/fitness/log', data),
  getWorkouts: (params) => api.get('/fitness/logs', { params }),
  getStats: (params) => api.get('/fitness/stats', { params }),
  updateWorkout: (logId, data) => api.put(`/fitness/log/${logId}`, data),
  deleteWorkout: (logId) => api.delete(`/fitness/log/${logId}`),
};

// ============ NUTRITION SERVICES ============
export const nutritionService = {
  addMeal: (data) => api.post('/nutrition/meal', data),
  getMeals: (params) => api.get('/nutrition/meals', { params }),
  getDailySummary: (date) => api.get('/nutrition/daily-summary', { params: { date } }),
  updateMeal: (logId, data) => api.put(`/nutrition/meal/${logId}`, data),
  deleteMeal: (logId) => api.delete(`/nutrition/meal/${logId}`),
};

// ============ PERIOD SERVICES ============
export const periodService = {
  addPeriod: (data) => api.post('/period/log', data),
  getPeriods: () => api.get('/period/logs'),
  getPredictions: () => api.get('/period/predictions'),
  updatePeriod: (logId, data) => api.put(`/period/log/${logId}`, data),
  deletePeriod: (logId) => api.delete(`/period/log/${logId}`),
};

// ============ CHATBOT SERVICES ============
export const chatbotService = {
  sendMessage: (content) => api.post('/chatbot/message', { content }),
  getHistory: () => api.get('/chatbot/history'),
  clearHistory: () => api.delete('/chatbot/history'),
};

// ============ SKIN ANALYSIS SERVICES ============
export const skinService = {
  analyzeSkin: (data) => api.post('/skin/analyze', data),
  getHistory: () => api.get('/skin/history'),
  getLatest: () => api.get('/skin/latest'),
  deleteAnalysis: (analysisId) => api.delete(`/skin/${analysisId}`),
};

// ============ DASHBOARD SERVICES ============
export const dashboardService = {
  getDashboardData: (params) => api.get('/dashboard/data', { params }),
  getWeeklyProgress: () => api.get('/dashboard/weekly-progress'),
  getMonthlyInsights: () => api.get('/dashboard/monthly-insights'),
};

export default api;
