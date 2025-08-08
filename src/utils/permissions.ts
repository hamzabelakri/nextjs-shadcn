/**
 * Granular CRUD Permission System for Asteroidea
 * 
 * This permission system controls access to different modules and actions.
 * Each user has permissions for different modules with granular control:
 * 
 * Permission Format: "view,create,edit,delete" (comma-separated)
 * - Each position represents: [view, create, edit, delete]
 * - 1 = allowed, 0 = not allowed
 * 
 * Examples:
 * - "1,1,1,1" = Full access (view, create, edit, delete)
 * - "1,0,0,0" = View only
 * - "1,1,1,0" = Can view, create, edit but not delete
 * - "0,0,0,0" = No access
 * 
 * Usage Examples:
 * - User with roles: "1,0,0,0" → Can view roles page but no Add/Edit/Delete buttons
 * - User with roles: "1,1,1,0" → Can view, add, edit roles, but no delete button
 * - User with roles: "1,1,1,1" → Full access with all CRUD operations
 * 
 * Frontend Implementation:
 * - Sidebar items require VIEW permission to be visible
 * - Add buttons require CREATE permission to be visible
 * - Edit buttons require EDIT permission to be visible
 * - Delete buttons require DELETE permission to be visible
 */

// Action indices in the permission string
export const ACTION_INDICES = {
  VIEW: 0,
  CREATE: 1,
  EDIT: 2,
  DELETE: 3
} as const;

export type PermissionAction = 'view' | 'create' | 'edit' | 'delete';

/**
 * Parse a permission string into a boolean array
 * @param permissionStr - Permission string like "1,1,0,0"
 * @returns Array of booleans [view, create, edit, delete]
 */
function parsePermissionString(permissionStr: string): boolean[] {
  if (!permissionStr || typeof permissionStr !== 'string') {
    return [false, false, false, false];
  }
  
  const parts = permissionStr.split(',');
  if (parts.length !== 4) {
    return [false, false, false, false];
  }
  
  return parts.map(part => part.trim() === '1');
}

/**
 * Check if user has permission to perform a specific action on a module
 * @param userPermissions - User's permissions object with granular format
 * @param module - Module name (users, roles, audit, settings, dashboard)
 * @param action - Action to check (view, create, edit, delete)
 * @returns True if user has permission, false otherwise
 */
export function hasPermission(
  userPermissions: Record<string, string>,
  module: string,
  action: PermissionAction
): boolean {
  const modulePermission = userPermissions[module];
  if (!modulePermission) {
    return false;
  }
  
  const permissions = parsePermissionString(modulePermission);
  
  switch (action) {
    case 'view':
      return permissions[ACTION_INDICES.VIEW];
    case 'create':
      return permissions[ACTION_INDICES.CREATE];
    case 'edit':
      return permissions[ACTION_INDICES.EDIT];
    case 'delete':
      return permissions[ACTION_INDICES.DELETE];
    default:
      return false;
  }
}

/**
 * Check if user can view a specific module
 */
export function canView(userPermissions: Record<string, string>, module: string): boolean {
  return hasPermission(userPermissions, module, 'view');
}

/**
 * Check if user can create in a specific module
 */
export function canCreate(userPermissions: Record<string, string>, module: string): boolean {
  return hasPermission(userPermissions, module, 'create');
}

/**
 * Check if user can edit in a specific module
 */
export function canEdit(userPermissions: Record<string, string>, module: string): boolean {
  return hasPermission(userPermissions, module, 'edit');
}

/**
 * Check if user can delete in a specific module
 */
export function canDelete(userPermissions: Record<string, string>, module: string): boolean {
  return hasPermission(userPermissions, module, 'delete');
}

/**
 * Get permission label for display purposes
 * @param permissionStr - Permission string like "1,1,0,0"
 * @returns Human readable permission description
 */
export function getPermissionLabel(permissionStr: string): string {
  if (!permissionStr) return 'No Access';
  
  const permissions = parsePermissionString(permissionStr);
  const [view, create, edit, deletePermission] = permissions;
  
  if (!view) return 'No Access';
  if (view && create && edit && deletePermission) return 'Full Access';
  if (view && create && edit) return 'Read, Create & Edit';
  if (view && create) return 'Read & Create';
  if (view && edit) return 'Read & Edit';
  if (view) return 'Read Only';
  
  return 'No Access';
}

/**
 * Helper function to create a permission string
 * @param view - Can view
 * @param create - Can create
 * @param edit - Can edit
 * @param deletePermission - Can delete
 * @returns Permission string like "1,1,0,0"
 */
export function createPermissionString(
  view: boolean = false,
  create: boolean = false,
  edit: boolean = false,
  deletePermission: boolean = false
): string {
  return [
    view ? '1' : '0',
    create ? '1' : '0',
    edit ? '1' : '0',
    deletePermission ? '1' : '0'
  ].join(',');
}

// Predefined permission strings for common use cases
export const COMMON_PERMISSIONS = {
  NO_ACCESS: '0,0,0,0',
  READ_ONLY: '1,0,0,0',
  READ_CREATE: '1,1,0,0',
  READ_CREATE_EDIT: '1,1,1,0',
  FULL_ACCESS: '1,1,1,1'
} as const;
