import { useAuthStore } from '../store/authStore'

/**
 * Hook to check user permissions for modules (legacy - use use-permissions.ts instead)
 * @param module - The module name (e.g., 'dashboard', 'users', 'roles', etc.)
 * @param action - The action ('view', 'create', 'edit', 'delete')
 * @returns boolean indicating if user has the required permission
 */
export const usePermission = (module: string, action: 'view' | 'create' | 'edit' | 'delete' = 'view'): boolean => {
  const user = useAuthStore((state) => state.user)
  
  if (!user || !user.permissions) return false;
  
  const permissionString = user.permissions[module];
  if (!permissionString) return false;
  
  // Parse granular permission string "1,1,1,1"
  const permissions = permissionString.split(',').map(p => p.trim() === '1');
  
  switch (action) {
    case 'view':
      return permissions[0] || false;
    case 'create':
      return permissions[1] || false;
    case 'edit':
      return permissions[2] || false;
    case 'delete':
      return permissions[3] || false;
    default:
      return false;
  }
}

/**
 * Hook to get all user permissions (legacy - use use-permissions.ts instead)
 * @returns object with all permissions or null if not authenticated
 */
export const usePermissions = (): Record<string, string> | null => {
  const user = useAuthStore((state) => state.user)
  return user?.permissions || null
}

/**
 * Hook to check if user is admin
 * @returns boolean indicating if user has admin role
 */
export const useIsAdmin = (): boolean => {
  const user = useAuthStore((state) => state.user)
  return user?.role === 'admin'
}

/**
 * Hook to check if user is authenticated
 * @returns boolean indicating if user is logged in
 */
export const useIsAuthenticated = (): boolean => {
  const token = useAuthStore((state) => state.token)
  return !!token
}

/**
 * Higher-order component to conditionally render based on permissions
 */
interface PermissionGateProps {
  module: string
  action?: 'view' | 'create' | 'edit' | 'delete'
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  module,
  action = 'view',
  children,
  fallback = null,
}) => {
  const hasPermission = usePermission(module, action)
  
  return hasPermission ? <>{children}</> : <>{fallback}</>
}

/**
 * Component to conditionally render for admin users only
 */
interface AdminGateProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const AdminGate: React.FC<AdminGateProps> = ({ children, fallback = null }) => {
  const isAdmin = useIsAdmin()
  
  return isAdmin ? <>{children}</> : <>{fallback}</>
}
