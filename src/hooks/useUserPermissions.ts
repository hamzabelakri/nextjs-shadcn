import { useMemo } from 'react';
import { useAuthStore } from '@/store/authStore';

/**
 * Custom hook to get user permissions in a stable way to prevent infinite re-renders
 */
export function useUserPermissions() {
  const user = useAuthStore((state) => state.user);
  
  // Create a stable reference to permissions object
  const permissions = useMemo(() => {
    return user?.permissions || null;
  }, [user?.permissions]);

  // Create a stable permission checker function
  const hasPermission = useMemo(() => {
    return (module: string, action: 'view' | 'create' | 'edit' | 'delete' = 'view') => {
      if (!permissions) return false;
      
      const permissionString = permissions[module];
      if (!permissionString) return false;
      
      const permissionArray = permissionString.split(',').map(p => p.trim() === '1');
      
      switch (action) {
        case 'view':
          return permissionArray[0] || false;
        case 'create':
          return permissionArray[1] || false;
        case 'edit':
          return permissionArray[2] || false;
        case 'delete':
          return permissionArray[3] || false;
        default:
          return false;
      }
    };
  }, [permissions]);

  return {
    permissions,
    hasPermission,
    isAuthenticated: !!user,
  };
}
