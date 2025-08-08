import { User as BackendUser } from '@/lib/api';
import { User as FrontendUser } from '../data/schema';

// Define the actual backend user response structure to match our Go backend
interface BackendUserResponse {
  id: number;
  username: string;
  name: string;
  email: string;
  phone_number: string;
  status: string;
  role_id: number;
  role: {
    id: number;
    name: string;
    description: string;
    permissions: Record<string, string>;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
}

/**
 * Transform backend user data to frontend user format
 */
export function transformBackendUserToFrontend(backendUser: BackendUserResponse): FrontendUser {
  // Split name into firstName and lastName if available
  const nameParts = backendUser.name?.split(' ') || ['', ''];
  const firstName = nameParts[0] || backendUser.username || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Extract role name from the role object
  const roleName = backendUser.role?.name || 'user';

  return {
    id: backendUser.id.toString(),
    firstName,
    lastName,
    username: backendUser.username,
    email: backendUser.email,
    phoneNumber: backendUser.phone_number || '',
    status: mapBackendStatusToFrontend(backendUser.status),
    role: mapBackendRoleToFrontend(roleName),
    createdAt: new Date(backendUser.created_at),
    updatedAt: new Date(backendUser.updated_at),
  };
}

/**
 * Map backend status to frontend status
 */
function mapBackendStatusToFrontend(status: string): 'active' | 'inactive' | 'invited' | 'suspended' {
  switch (status.toLowerCase()) {
    case 'active':
      return 'active';
    case 'inactive':
      return 'inactive';
    case 'invited':
      return 'invited';
    case 'suspended':
      return 'suspended';
    default:
      return 'active'; // Default fallback
  }
}

/**
 * Map backend role to frontend role
 * Now allows any role name to pass through instead of forcing predefined roles
 */
function mapBackendRoleToFrontend(role: string): string {
  if (!role || typeof role !== 'string') return 'user'; // Default fallback for null/undefined/non-string
  
  // Return the role name as-is, maintaining the actual role name from the backend
  return role;
}
