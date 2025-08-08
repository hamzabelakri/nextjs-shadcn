import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roleAPI, Role, CreateRoleRequest, UpdateRoleRequest } from '@/lib/api';
import { AxiosResponse } from 'axios';

// Query keys for roles
export const ROLES_QUERY_KEYS = {
  all: ['roles'] as const,
  lists: () => [...ROLES_QUERY_KEYS.all, 'list'] as const,
  list: (filters: string) => [...ROLES_QUERY_KEYS.lists(), { filters }] as const,
  details: () => [...ROLES_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...ROLES_QUERY_KEYS.details(), id] as const,
};

// Hook to fetch all roles
export const useRoles = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ROLES_QUERY_KEYS.lists(),
    queryFn: async (): Promise<Role[]> => {
      try {
        const response: AxiosResponse<Role[]> = await roleAPI.getAllRoles();
        console.log('Roles API Response:', response);
        console.log('Roles data:', response.data);
        
        if (response.data && Array.isArray(response.data)) {
          console.log('Roles found:', response.data.length);
          return response.data;
        } else {
          console.warn('Unexpected roles API response structure:', response.data);
          return [];
        }
      } catch (error) {
        // Handle 403 errors gracefully (expected for unauthorized access)
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as any;
          if (axiosError?.response?.status === 403) {
            console.info('Access denied to roles module - this is expected if user lacks permission');
            return []; // Return empty array instead of throwing
          }
        }
        console.error('Roles API Error:', error);
        throw error;
      }
    },
    enabled: options?.enabled !== false, // Default to true unless explicitly disabled
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 401/403 errors (expected for unauthorized access)
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Hook to fetch a single role
export const useRole = (id: number) => {
  return useQuery({
    queryKey: ROLES_QUERY_KEYS.detail(id),
    queryFn: async (): Promise<Role> => {
      const response: AxiosResponse<Role> = await roleAPI.getRole(id);
      return response.data;
    },
    enabled: !!id, // Only run query if id is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to create a new role
export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roleData: CreateRoleRequest): Promise<Role> => {
      const response: AxiosResponse<{ message: string; role: Role }> = await roleAPI.createRole(roleData);
      return response.data.role;
    },
    onSuccess: () => {
      // Invalidate and refetch roles list
      queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEYS.lists() });
    },
    onError: (error) => {
      console.error('Failed to create role:', error);
    },
  });
};

// Hook to update a role
export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, roleData }: { id: number; roleData: UpdateRoleRequest }): Promise<Role> => {
      const response: AxiosResponse<{ message: string; role: Role }> = await roleAPI.updateRole(id, roleData);
      return response.data.role;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch roles list
      queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEYS.lists() });
      // Update the specific role in cache
      queryClient.setQueryData(ROLES_QUERY_KEYS.detail(variables.id), data);
    },
    onError: (error) => {
      console.error('Failed to update role:', error);
    },
  });
};

// Hook to delete a role
export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await roleAPI.deleteRole(id);
    },
    onSuccess: () => {
      // Invalidate and refetch roles list
      queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEYS.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete role:', error);
    },
  });
};
