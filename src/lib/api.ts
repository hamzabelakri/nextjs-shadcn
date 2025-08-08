import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Define types for our API responses and requests
export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Record<string, string>; // Changed to string for granular format
  is_active: boolean;
  user_count: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone_number?: string;
  status: string;
  role_id: number;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface UserWithPermissions {
  id: number;
  username: string;
  name: string;
  email: string;
  phone_number?: string;
  status: string;
  role_id: number;
  role: string;
  permissions: Record<string, string>; // Changed to string for granular format
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  token: string;
  user: UserWithPermissions;
}

export interface RegisterRequest {
  username: string;
  name: string;
  email: string;
  password: string;
  phone_number?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  username?: string;
  name?: string;
  email?: string;
  password?: string;
  phone_number?: string;
  status?: string;
  role_id?: number;
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
  permissions: Record<string, string>; // Changed to granular format
  is_active?: boolean;
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  permissions?: Record<string, string>; // Changed to granular format
  is_active?: boolean;
}

// Audit types
export interface AuditChanges {
  before?: any;
  after?: any;
}

export interface AuditLog {
  id: number;
  userId: string;
  userEmail: string;
  userName: string;
  action: 'create' | 'update' | 'delete' | 'view' | 'login' | 'logout';
  entity: 'user' | 'role' | 'permission' | 'settings' | 'session';
  entityId: string;
  entityName: string;
  description: string;
  ipAddress: string;
  userAgent: string;
  changes?: Record<string, AuditChanges>;
  timestamp: string;
}

export interface AuditLogPaginatedResponse {
  data: AuditLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateAuditLogRequest {
  userId: string;
  userEmail: string;
  userName: string;
  action: 'create' | 'update' | 'delete' | 'view' | 'login' | 'logout';
  entity: 'user' | 'role' | 'permission' | 'settings' | 'session';
  entityId: string;
  entityName: string;
  description: string;
  ipAddress: string;
  userAgent: string;
  changes?: Record<string, AuditChanges>;
}

// Create an axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from cookies or localStorage (only in browser)
    if (typeof window !== 'undefined') {
      // Try cookies first (for middleware compatibility), then fall back to localStorage
      const token = 
        (document.cookie.match(/jwt_token=([^;]+)/) || [])[1] || 
        localStorage.getItem('jwt_token');
        
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const response = error.response;
    const originalRequest = error.config as any;
    
    // Handle 401 Unauthorized - try to refresh token first
    if (response && response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Only run this in browser environment
      if (typeof window !== 'undefined') {
        try {
          // Try to refresh the token
          const refreshResponse = await api.post('/refresh');
          const newToken = refreshResponse.data.token;
          
          // Update the token in localStorage and API defaults
          localStorage.setItem('jwt_token', newToken);
          api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          
          // Update cookie
          document.cookie = `jwt_token=${newToken}; path=/; max-age=86400; samesite=lax`;
          
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed, clear auth and redirect
          console.error('Token refresh failed:', refreshError);
          
          // Clear local storage and cookies
          localStorage.removeItem('jwt_token');
          localStorage.removeItem('user');
          document.cookie = "jwt_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          
          // Redirect to sign-in page if not already there
          if (!window.location.pathname.includes('/sign-in')) {
            window.location.href = '/sign-in';
          }
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  // Set auth token for API requests
  setAuthToken: (token: string): void => {
    localStorage.setItem('jwt_token', token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  
  // Clear auth token
  clearAuthToken: (): void => {
    localStorage.removeItem('jwt_token');
    delete api.defaults.headers.common.Authorization;
  },

  // Register a new user
  register: (userData: RegisterRequest): Promise<AxiosResponse<AuthResponse>> => {
    return api.post('/register', userData);
  },
  
  // Login user
  login: (credentials: LoginRequest): Promise<AxiosResponse<AuthResponse>> => {
    return api.post('/login', credentials);
  },
  
  // Refresh JWT token
  refresh: (): Promise<AxiosResponse<{ token: string; message: string }>> => {
    return api.post('/refresh');
  },
  
  // Get current user profile
  getProfile: (): Promise<AxiosResponse<UserWithPermissions>> => {
    return api.get('/profile');
  },
};

// User management API
export const userAPI = {
  // Get user by ID
  getUser: (id: number): Promise<AxiosResponse<User>> => {
    return api.get(`/users/${id}`);
  },
  
  // Update user
  updateUser: (id: number, userData: UpdateUserRequest): Promise<AxiosResponse<User>> => {
    return api.put(`/users/${id}`, userData);
  },
  
  // Delete user (admin only)
  deleteUser: (id: number): Promise<AxiosResponse<void>> => {
    return api.delete(`/admin/users/${id}`);
  },
  
  // Get all users (admin only)
  getAllUsers: (): Promise<AxiosResponse<User[]>> => {
    return api.get('/admin/users');
  },
  
  // Create user (admin only)
  createUser: (userData: RegisterRequest): Promise<AxiosResponse<User>> => {
    return api.post('/admin/users', userData);
  },
};

// Role management API
export const roleAPI = {
  // Get all roles (admin only)
  getAllRoles: (): Promise<AxiosResponse<Role[]>> => {
    return api.get('/admin/roles');
  },
  
  // Get role by ID (admin only)
  getRole: (id: number): Promise<AxiosResponse<Role>> => {
    return api.get(`/admin/roles/${id}`);
  },
  
  // Create role (admin only)
  createRole: (roleData: CreateRoleRequest): Promise<AxiosResponse<{ message: string; role: Role }>> => {
    return api.post('/admin/roles', roleData);
  },
  
  // Update role (admin only)
  updateRole: (id: number, roleData: UpdateRoleRequest): Promise<AxiosResponse<{ message: string; role: Role }>> => {
    return api.put(`/admin/roles/${id}`, roleData);
  },
  
  // Delete role (admin only)
  deleteRole: (id: number): Promise<AxiosResponse<void>> => {
    return api.delete(`/admin/roles/${id}`);
  },
};

// Audit management API
export const auditAPI = {
  // Get all audit logs (admin only)
  getAuditLogs: (params?: {
    page?: number;
    limit?: number;
    action?: string[];
    entity?: string[];
    userId?: string;
    entityId?: string;
    fromDate?: string;
    toDate?: string;
  }): Promise<AxiosResponse<AuditLogPaginatedResponse>> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.action?.length) searchParams.append('action', params.action.join(','));
    if (params?.entity?.length) searchParams.append('entity', params.entity.join(','));
    if (params?.userId) searchParams.append('userId', params.userId);
    if (params?.entityId) searchParams.append('entityId', params.entityId);
    if (params?.fromDate) searchParams.append('fromDate', params.fromDate);
    if (params?.toDate) searchParams.append('toDate', params.toDate);
    
    const query = searchParams.toString();
    return api.get(`/admin/audit-logs${query ? `?${query}` : ''}`);
  },
  
  // Get audit log by ID (admin only)
  getAuditLog: (id: number): Promise<AxiosResponse<AuditLog>> => {
    return api.get(`/admin/audit-logs/${id}`);
  },
  
  // Create audit log (admin only)
  createAuditLog: (auditData: CreateAuditLogRequest): Promise<AxiosResponse<AuditLog>> => {
    return api.post('/admin/audit-logs', auditData);
  },
  
  // Get audit logs for a specific user (admin only)
  getUserAuditLogs: (userId: string, params?: {
    page?: number;
    limit?: number;
    action?: string[];
    entity?: string[];
  }): Promise<AxiosResponse<AuditLogPaginatedResponse>> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.action?.length) searchParams.append('action', params.action.join(','));
    if (params?.entity?.length) searchParams.append('entity', params.entity.join(','));
    
    const query = searchParams.toString();
    return api.get(`/admin/users/${userId}/audit-logs${query ? `?${query}` : ''}`);
  },
};

export default api;
