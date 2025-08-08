import { useAuthStore } from '@/store/authStore';
import { hasPermission } from '@/utils/permissions';

/**
 * Hook to get user permissions for specific modules
 */
export function usePermissions() {
  const auth = useAuthStore(state => state);
  const userPermissions = auth.user?.permissions || {};

  /**
   * Get permissions for a specific module
   */
  const getModulePermissions = (module: string) => {
    const permissionString = userPermissions[module];
    if (!permissionString) {
      return {
        canView: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false,
        // Backward compatibility
        canRead: false,
        canEdit: false,
      };
    }

    return {
      canView: hasPermission(userPermissions, module, 'view'),
      canCreate: hasPermission(userPermissions, module, 'create'),
      canUpdate: hasPermission(userPermissions, module, 'edit'),
      canDelete: hasPermission(userPermissions, module, 'delete'),
      // Backward compatibility
      canRead: hasPermission(userPermissions, module, 'view'),
      canEdit: hasPermission(userPermissions, module, 'edit'),
    };
  };

  /**
   * Get permissions for multiple modules
   */
  const getMultipleModulePermissions = (modules: string[]) => {
    return modules.reduce((acc, module) => {
      acc[module] = getModulePermissions(module);
      return acc;
    }, {} as Record<string, ReturnType<typeof getModulePermissions>>);
  };

  /**
   * Check if user has specific permission for a module
   */
  const checkPermission = (module: string, action: 'view' | 'create' | 'edit' | 'delete') => {
    return hasPermission(userPermissions, module, action);
  };

  return {
    userPermissions,
    getModulePermissions,
    getMultipleModulePermissions,
    checkPermission,
    // Quick access to common modules
    roles: getModulePermissions('roles'),
    users: getModulePermissions('users'),
    dashboard: getModulePermissions('dashboard'),
    audit: getModulePermissions('audit'),
    settings: getModulePermissions('settings'),
  };
}
