import { ComponentType } from 'react';
import { useUserPermissions } from '@/hooks/useUserPermissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface WithPermissionOptions {
  module: string;
  action?: 'view' | 'create' | 'edit' | 'delete';
  fallbackRoute?: string;
}

/**
 * Higher-order component that adds permission checking to any page component
 * This prevents the component from rendering at all if permission is denied
 */
export function withPermission<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithPermissionOptions
) {
  const WithPermissionComponent = (props: P) => {
    const { isAuthenticated, hasPermission } = useUserPermissions();
    const router = useRouter();
    
    const {
      module,
      action = 'view',
      fallbackRoute = '/dashboard'
    } = options;

    useEffect(() => {
      if (isAuthenticated) {
        const userHasPermission = hasPermission(module, action);
        
        if (!userHasPermission) {
          toast.error('Access Denied', {
            description: `You don't have permission to access this page. Required: ${action} access to ${module} module.`,
            duration: 4000,
          });
          
          router.replace(fallbackRoute);
          return;
        }
      }
    }, [isAuthenticated, hasPermission, module, action, fallbackRoute, router]);

    // Don't render if not authenticated or no permission
    if (!isAuthenticated || !hasPermission(module, action)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  WithPermissionComponent.displayName = `withPermission(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return WithPermissionComponent;
}

/**
 * Utility function to create a permission-protected page component
 */
export const createProtectedPage = <P extends object>(
  component: ComponentType<P>,
  module: string,
  action: 'view' | 'create' | 'edit' | 'delete' = 'view'
) => {
  return withPermission(component, { module, action });
};
