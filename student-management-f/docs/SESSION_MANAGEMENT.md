# Session Management Implementation

## Overview

This application implements a secure session management system using `sessionStorage` for token storage, ensuring that user sessions are automatically cleared when the browser tab is closed. This provides enhanced security compared to `localStorage` which persists across browser sessions.

## Key Features

### 1. SessionStorage-Based Token Storage
- **Security**: Tokens are stored in `sessionStorage` instead of `localStorage`
- **Automatic Cleanup**: Sessions are automatically cleared when the browser tab is closed
- **No Persistence**: Tokens don't persist across browser sessions, requiring re-authentication

### 2. Token Expiration Management
- **Automatic Expiry**: Tokens have a configurable expiration time (default: 24 hours)
- **Real-time Validation**: Token validity is checked on every API request
- **Graceful Handling**: Expired tokens trigger automatic logout and redirect to login

### 3. Session Monitoring
- **Periodic Checks**: Token validity is checked every minute
- **Expiry Warnings**: Users are notified 5 minutes before session expiration
- **Automatic Refresh**: Sessions can be extended by making fresh API calls

### 4. Cross-Tab Synchronization
- **Storage Events**: Changes in one tab are reflected across all open tabs
- **Consistent State**: All tabs maintain synchronized authentication state
- **Automatic Logout**: Logging out in one tab logs out all tabs

## Implementation Details

### Authentication Service (`src/lib/auth.ts`)

```typescript
class AuthService {
  private token: string | null = null;
  private tokenExpiry: number | null = null;

  // Token storage in sessionStorage
  private setSessionData(token: string, user: User, expiresAt?: string): void {
    sessionStorage.setItem('auth_token', token);
    sessionStorage.setItem('auth_token_expiry', expiryTime.toString());
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  // Token validation
  private isTokenValid(): boolean {
    if (!this.token || !this.tokenExpiry) {
      return false;
    }
    return Date.now() < this.tokenExpiry;
  }
}
```

### Authentication Context (`src/contexts/AuthContext.tsx`)

```typescript
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Periodic token validation
  useEffect(() => {
    const tokenCheckInterval = setInterval(() => {
      if (authService.isAuthenticated()) {
        if (authService.isTokenExpiringSoon()) {
          refreshToken();
        }
      } else {
        setUser(null);
      }
    }, 60000); // Check every minute

    // Cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token' || e.key === 'user') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
  }, []);
}
```

### Session Manager Component (`src/components/auth/SessionManager.tsx`)

```typescript
export default function SessionManager() {
  // Session expiry monitoring
  useEffect(() => {
    const checkSessionExpiry = () => {
      const sessionInfo = getSessionInfo();
      
      if (sessionInfo.isExpiringSoon && sessionInfo.timeRemaining > 0) {
        setShowExpiryWarning(true);
      } else if (sessionInfo.timeRemaining <= 0) {
        logout();
        router.push('/login?message=session_expired');
      }
    };

    const interval = setInterval(checkSessionExpiry, 30000);
    return () => clearInterval(interval);
  }, []);
}
```

## Security Benefits

### 1. Enhanced Security
- **No Persistent Storage**: Tokens are not stored permanently
- **Tab Isolation**: Each tab has its own session context
- **Automatic Cleanup**: Sessions are cleared when tabs are closed

### 2. Token Expiration
- **Time-based Expiry**: Tokens expire after a configurable time period
- **Automatic Validation**: Every API request validates token expiration
- **Graceful Degradation**: Expired tokens trigger automatic logout

### 3. Cross-Site Scripting (XSS) Protection
- **SessionStorage Scope**: Tokens are isolated to the current origin
- **No Cross-Tab Access**: Malicious scripts cannot access tokens from other tabs
- **Automatic Cleanup**: Closing tabs removes all session data

## User Experience

### 1. Seamless Authentication
- **Automatic Login**: Users stay logged in while using the application
- **Session Extension**: Users can extend sessions before expiration
- **Graceful Logout**: Automatic logout with clear messaging

### 2. Session Expiry Notifications
- **Warning Notifications**: Users are notified 5 minutes before expiration
- **Countdown Timer**: Real-time countdown showing remaining time
- **Extension Options**: Users can extend sessions or logout immediately

### 3. Cross-Tab Consistency
- **Synchronized State**: All tabs maintain consistent authentication state
- **Automatic Updates**: Changes in one tab reflect across all tabs
- **Unified Logout**: Logging out in one tab logs out all tabs

## Configuration

### Token Expiration Settings

```typescript
// Default token expiration (24 hours)
const DEFAULT_TOKEN_EXPIRY = 24 * 60 * 60 * 1000;

// Warning threshold (5 minutes before expiry)
const SESSION_WARNING_THRESHOLD = 5 * 60 * 1000;
```

### API Endpoints

The system expects the following API endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile (used for token refresh)
- `POST /api/auth/logout` - User logout

## Best Practices

### 1. Token Management
- Always validate tokens before making API requests
- Implement automatic token refresh mechanisms
- Clear tokens immediately upon logout

### 2. Security Headers
- Use HTTPS for all API communications
- Implement proper CORS policies
- Set secure cookie attributes

### 3. Error Handling
- Handle 401 responses by clearing session data
- Provide clear error messages for authentication failures
- Implement graceful fallbacks for network issues

## Troubleshooting

### Common Issues

1. **Session Expiring Too Quickly**
   - Check token expiration settings
   - Verify server-side token validation
   - Ensure proper time synchronization

2. **Cross-Tab Synchronization Issues**
   - Verify storage event listeners are properly set up
   - Check browser compatibility for storage events
   - Ensure consistent domain and protocol

3. **Token Refresh Failures**
   - Verify API endpoint availability
   - Check network connectivity
   - Ensure proper error handling

### Debugging

Enable debug logging by setting the following environment variable:

```bash
NEXT_PUBLIC_DEBUG_SESSION=true
```

This will log session-related events to the browser console for debugging purposes. 