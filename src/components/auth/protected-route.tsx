'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { fetchUserProfile } from '@/utils/auth-helpers';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  adminOnly = false 
}: ProtectedRouteProps) {
  const { token, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        // Set a shorter timeout to prevent long spinner wait
        const timeout = setTimeout(() => {
          setIsLoading(false);
        }, 500); // Reduced from 3000ms to 1500ms for faster display
        
        // If we have a token, we can show the page right away and fetch profile in background
        if (token) {
          setIsLoading(false);
          
          // Try to fetch the profile if we have a token but no user data (in background)
          if (!user) {
            fetchUserProfile().catch(console.error);
          }
          
          // Only check admin permission if required
          if (adminOnly && user?.role !== 'admin') {
            router.replace('/dashboard');
          }
          
          clearTimeout(timeout);
          return;
        }
        
        // If no token, redirect to login
        if (!token) {
          router.replace(`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`);
          return;
        }
        
        // Clear the timeout as we've handled all cases
        clearTimeout(timeout);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        router.replace(`/sign-in?callbackUrl=${encodeURIComponent(pathname)}`);
      }
    }

    checkAuth();
  }, [token, user?.id, user?.role, router, pathname, adminOnly]); // Use specific values instead of entire auth object

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center flex-col gap-3">
        <Spinner size="lg" />
        <p className="text-muted-foreground animate-pulse">Loading your content...</p>
      </div>
    );
  }

  // We've already handled authentication checks in the effect
  // If we get here, we should show the content
  return <>{children}</>;
}
