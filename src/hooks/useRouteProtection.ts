import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserPermissions } from '@/hooks/useUserPermissions';
import { toast } from 'sonner';

// Define route-to-module mapping
const ROUTE_PERMISSIONS: Record<string, { module: string; action?: 'view' | 'create' | 'edit' | 'delete' }> = {
  '/users': { module: 'users', action: 'view' },
  '/users/create': { module: 'users', action: 'create' },
  '/users/edit': { module: 'users', action: 'edit' },
  '/roles': { module: 'roles', action: 'view' },
  '/roles/create': { module: 'roles', action: 'create' },
  '/roles/edit': { module: 'roles', action: 'edit' },
  '/audit': { module: 'audit', action: 'view' },
  '/settings': { module: 'settings', action: 'view' },
  '/settings/profile': { module: 'settings', action: 'view' },
  '/settings/account': { module: 'settings', action: 'view' },
};

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/sign-in',
  '/sign-up', 
  '/forgot-password',
  '/otp',
  '/login',
  '/' // Home page if you want it public
];

// Routes that are always accessible to authenticated users
const ALWAYS_ACCESSIBLE = [
  '/dashboard',
  '/profile',
  '/help',
  '/support'
];

/**
 * Hook to provide seamless route protection based on user permissions
 */
export function useRouteProtection() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, hasPermission } = useUserPermissions();

  useEffect(() => {
    // Skip if user is not authenticated (handled by AuthInitializer)
    if (!isAuthenticated) return;

    // Skip public routes
    if (PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route))) {
      return;
    }

    // Skip always accessible routes
    if (ALWAYS_ACCESSIBLE.some(route => pathname === route || pathname.startsWith(route))) {
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

        // Redirect to dashboard
        router.replace('/dashboard');
        return;
      }
    }
  }, [pathname, isAuthenticated, hasPermission, router]);
}

/**
 * Utility function to check if a route is accessible for the current user
 */
export function isRouteAccessible(path: string, userPermissions: ReturnType<typeof useUserPermissions>) {
  const { isAuthenticated, hasPermission } = userPermissions;

  if (!isAuthenticated) return false;

  // Public routes are always accessible
  if (PUBLIC_ROUTES.some(route => path === route || path.startsWith(route))) {
    return true;
  }

  // Always accessible routes
  if (ALWAYS_ACCESSIBLE.some(route => path === route || path.startsWith(route))) {
    return true;
  }

  // Check specific route permissions
  const routeConfig = ROUTE_PERMISSIONS[path] || 
    Object.entries(ROUTE_PERMISSIONS).find(([route]) => 
      path.startsWith(route) && route !== '/'
    )?.[1];

  if (routeConfig) {
    return hasPermission(routeConfig.module, routeConfig.action || 'view');
  }

  // Default to accessible if no specific rules
  return true;
}

export { ROUTE_PERMISSIONS, PUBLIC_ROUTES, ALWAYS_ACCESSIBLE };
