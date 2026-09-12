'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getSessionInfo, formatTimeRemaining, extendSession, shouldShowSessionWarning } from '@/lib/sessionUtils';
import { AlertTriangle } from 'lucide-react';

export default function SessionManager() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [showExpiryWarning, setShowExpiryWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) return;

    const checkSessionExpiry = () => {
      const sessionInfo = getSessionInfo();
      
      if (sessionInfo.isExpiringSoon && sessionInfo.timeRemaining > 0) {
        setShowExpiryWarning(true);
        setTimeRemaining(sessionInfo.timeRemaining);
      } else if (sessionInfo.timeRemaining <= 0) {
        // Token has expired, logout immediately
        logout();
        router.push('/login?message=session_expired');
      } else {
        setShowExpiryWarning(false);
      }
    };

    // Check immediately
    checkSessionExpiry();

    // Check every 30 seconds
    const interval = setInterval(checkSessionExpiry, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated, logout, router]);

  const handleExtendSession = async () => {
    try {
      const success = await extendSession();
      if (success) {
        setShowExpiryWarning(false);
      } else {
        // If refresh fails, logout
        logout();
        router.push('/login?message=session_expired');
      }
    } catch (error) {
      // If refresh fails, logout
      logout();
      router.push('/login?message=session_expired');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!showExpiryWarning) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-yellow-800">
              Session Expiring Soon
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              Your session will expire in{' '}
              <span className="font-mono font-semibold">
                {formatTimeRemaining(timeRemaining)}
              </span>
            </p>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={handleExtendSession}
                className="bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-700 transition-colors"
              >
                Extend Session
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
              >
                Logout Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 