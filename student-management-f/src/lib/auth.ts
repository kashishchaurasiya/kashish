import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresAt?: string; // Token expiration timestamp
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class AuthService {
  private token: string | null = null;
  private tokenExpiry: number | null = null;
  private apiClient: any;

  constructor() {
    // Create axios instance with base configuration
    this.apiClient = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000, // 10 second timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Initialize token from storage
    if (typeof window !== 'undefined') {
      this.token = sessionStorage?.getItem('auth_token');
      const expiryStr = sessionStorage?.getItem('auth_token_expiry');
      this.tokenExpiry = expiryStr ? parseInt(expiryStr, 10) : null;
      
      // Check if token has expired
      if (this.tokenExpiry && Date.now() > this.tokenExpiry) {
        this.clearSession();
      }
    }

    // Setup request interceptor to add auth token
    this.apiClient.interceptors.request.use(
      (config: any) => {
        if (this.token && this.isTokenValid()) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // Setup response interceptor for error handling
    this.apiClient.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: any) => {
        // If we get a 401, clear the session
        if (error.response?.status === 401) {
          this.clearSession();
        }
        
        // Extract error message from response
        const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           error.message || 
                           'An error occurred';
        
        return Promise.reject(new Error(errorMessage));
      }
    );
  }

  private setCookie(name: string, value: string, days: number = 7) {
    if (typeof window !== 'undefined' && document?.cookie !== undefined) {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
    }
  }

  private removeCookie(name: string) {
    if (typeof window !== 'undefined' && document?.cookie !== undefined) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }
  }

  private clearSession(): void {
    this.token = null;
    this.tokenExpiry = null;
    if (typeof window !== 'undefined') {
      sessionStorage?.removeItem('auth_token');
      sessionStorage?.removeItem('auth_token_expiry');
      sessionStorage?.removeItem('user');
      this.removeCookie('auth_token');
    }
  }

  private setSessionData(token: string, user: User, expiresAt?: string): void {
    this.token = token;
    
    // Set token expiry (default to 24 hours if not provided)
    const expiryTime = expiresAt ? new Date(expiresAt).getTime() : Date.now() + (24 * 60 * 60 * 1000);
    this.tokenExpiry = expiryTime;
    
    if (typeof window !== 'undefined') {
      sessionStorage?.setItem('auth_token', token);
      sessionStorage?.setItem('auth_token_expiry', expiryTime.toString());
      sessionStorage?.setItem('user', JSON.stringify(user));
      this.setCookie('auth_token', token);
    }
  }

  private isTokenValid(): boolean {
    if (!this.token || !this.tokenExpiry) {
      return false;
    }
    return Date.now() < this.tokenExpiry;
  }

  async healthCheck(): Promise<ApiResponse<any>> {
    try {
      const response = await this.apiClient.get('/health');
      return response?.data;
    } catch (error) {
      throw new Error('Health check failed');
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.apiClient.post('/auth/login', credentials);
      
      if (response?.data?.data) {
        this.setSessionData(response.data.data?.token, response.data.data?.user, response.data.data?.expiresAt);
      }

      return response?.data?.data!;
    } catch (error) {
      throw error;
    }
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await this.apiClient.post('/auth/register', userData);
      
      if (response?.data?.data) {
        this.setSessionData(response.data.data?.token, response.data.data?.user, response.data.data?.expiresAt);
      }

      return response?.data?.data!;
    } catch (error) {
      throw error;
    }
  }

  async getProfile(): Promise<User> {
    try {
      const response = await this.apiClient.get('/auth/profile');
      return response?.data?.data!;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      // Optional: Call logout endpoint to invalidate token on server
      await this.apiClient.post('/auth/logout');
    } catch (error) {
      // Continue with client-side logout even if server logout fails
      console.warn('Server logout failed:', error);
    } finally {
      this.clearSession();
    }
  }

  getToken(): string | null {
    return this.isTokenValid() ? this.token : null;
  }

  isAuthenticated(): boolean {
    return this.isTokenValid();
  }

  getUser(): User | null {
    if (typeof window !== 'undefined' && this.isAuthenticated()) {
      const userStr = sessionStorage?.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  // Get remaining time until token expires (in milliseconds)
  getTokenTimeRemaining(): number {
    if (!this.tokenExpiry) return 0;
    return Math.max(0, this.tokenExpiry - Date.now());
  }

  // Check if token will expire soon (within 5 minutes)
  isTokenExpiringSoon(): boolean {
    const timeRemaining = this.getTokenTimeRemaining();
    return timeRemaining > 0 && timeRemaining < 5 * 60 * 1000; // 5 minutes
  }

  // Method to refresh token (if your backend supports it)
  async refreshToken(): Promise<void> {
    try {
      const response = await this.apiClient.post('/auth/refresh');
      if (response?.data?.data) {
        this.setSessionData(response.data.data?.token, response.data.data?.user, response.data.data?.expiresAt);
      }
    } catch (error) {
      // If refresh fails, clear session
      this.clearSession();
      throw error;
    }
  }

  // Cancel all pending requests
  cancelPendingRequests(): void {
    // Create a new axios instance to cancel all previous requests
    this.apiClient = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export const authService = new AuthService(); 