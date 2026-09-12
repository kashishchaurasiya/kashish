// Central API service configuration
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance with auth support
export const createApiClient = () => {
  const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add auth token
  apiClient.interceptors.request.use(
    (config) => {
      // Get auth token from session storage
      if (typeof window !== 'undefined') {
        const token = sessionStorage?.getItem('auth_token');
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      // If we get a 401, clear the session
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          sessionStorage?.removeItem('auth_token');
          sessionStorage?.removeItem('auth_token_expiry');
          sessionStorage?.removeItem('user');
        }
      }
      
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         error.message || 
                         'An error occurred';
      
      return Promise.reject(new Error(errorMessage));
    }
  );

  return apiClient;
};

// Common API response interface
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
