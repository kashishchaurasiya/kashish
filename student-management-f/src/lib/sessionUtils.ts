import { authService } from './auth';

export interface SessionInfo {
  isAuthenticated: boolean;
  timeRemaining: number;
  isExpiringSoon: boolean;
  user: any;
}

/**
 * Get current session information
 */
export function getSessionInfo(): SessionInfo {
  const isAuthenticated = authService.isAuthenticated();
  const timeRemaining = authService.getTokenTimeRemaining();
  const isExpiringSoon = authService.isTokenExpiringSoon();
  const user = authService.getUser();

  return {
    isAuthenticated,
    timeRemaining,
    isExpiringSoon,
    user,
  };
}

/**
 * Format time remaining in a human-readable format
 */
export function formatTimeRemaining(ms: number): string {
  if (ms <= 0) return 'Expired';
  
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Check if the current session is valid and not expired
 */
export function isSessionValid(): boolean {
  return authService.isAuthenticated();
}

/**
 * Force logout and clear all session data
 */
export function forceLogout(): void {
  authService.logout();
  
  // Clear any additional session data
  if (typeof window !== 'undefined') {
    // Clear any other session-related data
    sessionStorage.clear();
    
    // Clear cookies
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
  }
}

/**
 * Extend session by making a fresh API call
 */
export async function extendSession(): Promise<boolean> {
  try {
    await authService.getProfile();
    return true;
  } catch (error) {
    console.error('Failed to extend session:', error);
    return false;
  }
}

/**
 * Get session expiry warning threshold (in milliseconds)
 * Default: 5 minutes
 */
export const SESSION_WARNING_THRESHOLD = 5 * 60 * 1000;

/**
 * Check if session should show warning
 */
export function shouldShowSessionWarning(): boolean {
  return authService.isTokenExpiringSoon();
}

/**
 * Get session status for display
 */
export function getSessionStatus(): 'active' | 'expiring_soon' | 'expired' {
  if (!authService.isAuthenticated()) {
    return 'expired';
  }
  
  if (authService.isTokenExpiringSoon()) {
    return 'expiring_soon';
  }
  
  return 'active';
} 