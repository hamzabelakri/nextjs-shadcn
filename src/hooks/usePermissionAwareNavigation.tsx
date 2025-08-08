'use client';

import { useUserPermissions } from '@/hooks/useUserPermissions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

/**
 * Hook to provide permission-aware navigation functions
 */
export function usePermissionAwareNavigation() {
  const { hasPermission } = useUserPermissions();
  const router = useRouter();

  /**
   * Navigate to a route only if user has required permissions
   * Shows toast and redirects to fallback if permission denied
   */
  const navigateWithPermission = (
    path: string,
    module: string,
    action: 'view' | 'create' | 'edit' | 'delete' = 'view',
    fallbackPath: string = '/dashboard'
  ) => {
    if (hasPermission(module, action)) {
      router.push(path);
    } else {
      toast.error('Access Denied', {
        description: `You don't have ${action} permission for ${module} module.`,
        duration: 3000,
      });
      router.push(fallbackPath);
    }
  };

  /**
   * Check if user can navigate to a specific route
   */
  const canNavigateTo = (module: string, action: 'view' | 'create' | 'edit' | 'delete' = 'view') => {
    return hasPermission(module, action);
  };

  /**
   * Generate permission-aware href or return null if no permission
   */
  const getPermissionAwareHref = (
    path: string,
    module: string,
    action: 'view' | 'create' | 'edit' | 'delete' = 'view'
  ) => {
    return hasPermission(module, action) ? path : null;
  };

  return {
    navigateWithPermission,
    canNavigateTo,
    getPermissionAwareHref,
  };
}

/**
 * Higher-order component to wrap buttons/links with permission checks
 */
interface PermissionAwareLinkProps {
  children: React.ReactNode;
  module: string;
  action?: 'view' | 'create' | 'edit' | 'delete';
  href?: string;
  onClick?: () => void;
  fallbackContent?: React.ReactNode;
  showTooltip?: boolean;
  className?: string;
}

export function PermissionAwareLink({
  children,
  module,
  action = 'view',
  href,
  onClick,
  fallbackContent = null,
  showTooltip = true,
  className
}: PermissionAwareLinkProps) {
  const { hasPermission } = useUserPermissions();
  const { navigateWithPermission } = usePermissionAwareNavigation();

  const userHasPermission = hasPermission(module, action);

  if (!userHasPermission) {
    if (fallbackContent) {
      return <>{fallbackContent}</>;
    }
    
    if (showTooltip) {
      return (
        <div 
          className={`opacity-50 cursor-not-allowed ${className || ''}`}
          title={`Requires ${action} permission for ${module} module`}
        >
          {children}
        </div>
      );
    }
    
    return null;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      navigateWithPermission(href, module, action);
    }
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
}
