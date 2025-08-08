'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { authAPI } from '@/lib/api';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const pathname = usePathname();
  const [isInitialized, setIsInitialized] = useState(false);

  // Define public routes that don't require authentication - memoized for stability
  const isPublicRoute = useMemo(() => {
    const publicRoutes = ['/sign-in', '/sign-up', '/forgot-password', '/otp', '/login'];
    return publicRoutes.some(route => pathname.startsWith(route));
  }, [pathname]);

  // Stable auth initialization function
  const initAuth = useCallback(async () => {
    try {
      // Get store methods directly
      const store = useAuthStore.getState();
      
      // Initialize auth store from localStorage first
      if (store.initializeFromStorage && typeof store.initializeFromStorage === 'function') {
        store.initializeFromStorage();
      }

      // Check if we have a token stored (check both localStorage and cookies for compatibility)
      const storedToken = Cookies.get('jwt_token') || localStorage.getItem('jwt_token');
      const currentUser = store.user;
      
      if (storedToken) {
        // Set the token in the API
        authAPI.setAuthToken(storedToken);
        
        if (!currentUser) {
          // If we have a token but no user data, try to fetch the user profile
          try {
            await store.fetchProfile();
            // Start auto-refresh after successful profile fetch
            store.startAutoRefresh();
          } catch (error) {
            console.error('Failed to restore authentication:', error);
            // Clear invalid tokens
            store.logout();
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('user');
            Cookies.remove('jwt_token');
            
            // Redirect to sign-in if we're on a protected route
            if (!isPublicRoute) {
              router.push('/sign-in');
              return;
            }
          }
        } else {
          // User data already exists, just start auto-refresh
          store.startAutoRefresh();
        }
      } else if (!isPublicRoute) {
        // No token and trying to access protected route
        console.log('No token found, redirecting to sign-in');
        router.push('/sign-in');
        return;
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      if (!isPublicRoute) {
        router.push('/sign-in');
        return;
      }
    } finally {
      setIsInitialized(true);
    }
  }, [isPublicRoute, router]);

  useEffect(() => {
    // Only run initialization once
    if (!isInitialized) {
      initAuth();
    }
  }, [isInitialized, initAuth]); // Remove user and token from dependencies

  // Check authentication on route changes - using a stable callback
  const checkAuthOnRouteChange = useCallback(() => {
    if (!isInitialized) return;
    
    const storedToken = Cookies.get('jwt_token') || localStorage.getItem('jwt_token');
    const currentUser = useAuthStore.getState().user;
    
    if (!isPublicRoute && !storedToken && !currentUser) {
      console.log('Route change: No authentication, redirecting to sign-in');
      router.push('/sign-in');
    } else if (isPublicRoute && storedToken && currentUser) {
      // User is authenticated but trying to access auth pages, redirect to dashboard
      console.log('User already authenticated, redirecting to dashboard');
      router.push('/dashboard');
    }
  }, [isInitialized, isPublicRoute, router]);

  useEffect(() => {
    checkAuthOnRouteChange();
  }, [pathname, checkAuthOnRouteChange]); // Use pathname instead of user/token

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // For protected routes, ensure user is authenticated
  if (!isPublicRoute && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
}
