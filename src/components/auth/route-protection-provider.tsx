'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserPermissions } from '@/hooks/useUserPermissions';
import { toast } from 'sonner';
import { ROUTE_PERMISSIONS, PUBLIC_ROUTES, ALWAYS_ACCESSIBLE } from '@/hooks/useRouteProtection';

/**
 * Component to wrap your app with route protection
 */
export function RouteProtectionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, hasPermission } = useUserPermissions();
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAccess = () => {
      setIsChecking(true);
      
      // Skip if user is not authenticated (handled by AuthInitializer)
      if (!isAuthenticated) {
        setIsAccessGranted(true);
        setIsChecking(false);
        return;
      }

      // Skip public routes
      if (PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route))) {
        setIsAccessGranted(true);
        setIsChecking(false);
        return;
      }

      // Skip always accessible routes
      if (ALWAYS_ACCESSIBLE.some(route => pathname === route || pathname.startsWith(route))) {
        setIsAccessGranted(true);
        setIsChecking(false);
        return;
      }

      // Check if current route requires specific permissions
      const routeConfig = ROUTE_PERMISSIONS[pathname] || 
        // Try to find a parent route match
        Object.entries(ROUTE_PERMISSIONS).find(([route]) => 
          pathname.startsWith(route) && route !== '/'
        )?.[1];

      if (routeConfig) {
        const userHasPermission = hasPermission(routeConfig.module, routeConfig.action || 'view');
        
        if (!userHasPermission) {
          // Show toast notification
          toast.error('Access Denied', {
            description: `You don't have permission to access this page. Required: ${routeConfig.action || 'view'} access to ${routeConfig.module} module.`,
            duration: 4000,
          });

          // Redirect to dashboard and block rendering
          setIsAccessGranted(false);
          setIsChecking(false);
          
          // Use a slight delay to ensure toast is shown before redirect
          setTimeout(() => {
            router.replace('/dashboard');
          }, 100);
          return;
        }
      }

      // Access granted
      setIsAccessGranted(true);
      setIsChecking(false);
    };

    // Add a small delay to ensure auth state is properly initialized
    const timer = setTimeout(checkAccess, 100);
    return () => clearTimeout(timer);
  }, [pathname, isAuthenticated, hasPermission, router]);

  // Show loading while checking permissions
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Block rendering if access is denied
  if (!isAccessGranted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
