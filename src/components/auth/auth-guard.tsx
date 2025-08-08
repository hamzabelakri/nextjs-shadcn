'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean; // true for protected routes, false for auth routes
}

export default function AuthGuard({ 
  children, 
  redirectTo = '/dashboard', 
  requireAuth = false 
}: AuthGuardProps) {
  const auth = useAuthStore(state => state);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = Cookies.get('jwt_token') || localStorage.getItem('jwt_token');
      const hasToken = !!storedToken;
      const hasUser = !!auth.user;
      const isAuthenticated = hasToken && hasUser;

      if (requireAuth) {
        // For protected routes - redirect to sign-in if not authenticated
        if (!isAuthenticated) {
          router.push('/sign-in');
        }
      } else {
        // For auth routes - redirect to dashboard if already authenticated
        if (isAuthenticated) {
          router.push(redirectTo);
        }
      }
    };

    // Small delay to ensure auth store is hydrated
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [auth.user, auth.token, router, redirectTo, requireAuth]);

  return <>{children}</>;
}
