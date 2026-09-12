'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authService, User, LoginCredentials, RegisterData } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      if (authService.isAuthenticated()) {
        const userData = authService.getUser();
        if (userData) {
          setUser(userData);
        } else {
          // Try to get fresh user data from API
          const profile = await authService.getProfile();
          setUser(profile);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      if (authService.isAuthenticated() && authService.isTokenExpiringSoon()) {
        // Attempt to refresh the token by calling the profile endpoint
        // This will trigger a new token if the backend supports it
        const profile = await authService.getProfile();
        setUser(profile);
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      // If refresh fails, logout the user
      authService.logout();
      setUser(null);
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      setUser(response.user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      setUser(response.user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Set up periodic token validation and refresh
  useEffect(() => {
    checkAuth();

    // Check token validity every minute
    const tokenCheckInterval = setInterval(() => {
      if (authService.isAuthenticated()) {
        if (authService.isTokenExpiringSoon()) {
          refreshToken();
        }
      } else {
        setUser(null);
      }
    }, 60000); // Check every minute

    // Listen for storage events (when sessionStorage changes in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token' || e.key === 'user') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Listen for page visibility changes to refresh token when tab becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden && authService.isAuthenticated()) {
        checkAuth();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(tokenCheckInterval);
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [checkAuth, refreshToken]);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    checkAuth,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 