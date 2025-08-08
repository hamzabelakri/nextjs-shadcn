import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userAPI, User, RegisterRequest, UpdateUserRequest } from '@/lib/api';
import { AxiosResponse } from 'axios';

// Define the backend API response structure to match our Go backend
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

interface GetAllUsersResponse {
  users: BackendUserResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// Query keys for users
export const USERS_QUERY_KEYS = {
  all: ['users'] as const,
  lists: () => [...USERS_QUERY_KEYS.all, 'list'] as const,
  list: (filters: string) => [...USERS_QUERY_KEYS.lists(), { filters }] as const,
  details: () => [...USERS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...USERS_QUERY_KEYS.details(), id] as const,
};

// Hook to fetch all users
export const useUsers = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: USERS_QUERY_KEYS.lists(),
    queryFn: async (): Promise<BackendUserResponse[]> => {
      try {
        const response: AxiosResponse<any> = await userAPI.getAllUsers();
        console.log('Full API Response:', response);
        console.log('Response data:', response.data);
        console.log('Response status:', response.status);
        
        // Check if response.data is directly an array (our current backend structure)
        if (Array.isArray(response.data)) {
          console.log('Users found (direct array):', response.data.length);
          return response.data;
        }
        // Check if response.data has users property (paginated structure)
        else if (response.data && response.data.users && Array.isArray(response.data.users)) {
          console.log('Users found (paginated):', response.data.users.length);
          return response.data.users;
        } 
        // Check for debug response with data property
        else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          console.log('Users found (debug structure):', response.data.data.length);
          return response.data.data;
        }
        else {
          console.warn('Unexpected API response structure:', response.data);
          return [];
        }
      } catch (error) {
        // Handle 403 errors gracefully (expected for unauthorized access)
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as any;
          if (axiosError?.response?.status === 403) {
            console.info('Access denied to users module - this is expected if user lacks permission');
            return []; // Return empty array instead of throwing
          }
        }
        console.error('Users API Error:', error);
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

// Hook to fetch a single user
export const useUser = (id: number) => {
  return useQuery({
    queryKey: USERS_QUERY_KEYS.detail(id),
    queryFn: async (): Promise<User> => {
      const response: AxiosResponse<User> = await userAPI.getUser(id);
      return response.data;
    },
    enabled: !!id, // Only run query if id is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to create a new user
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: RegisterRequest): Promise<User> => {
      const response: AxiosResponse<User> = await userAPI.createUser(userData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.lists() });
    },
    onError: (error) => {
      console.error('Failed to create user:', error);
    },
  });
};

// Hook to update a user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, userData }: { id: number; userData: UpdateUserRequest }): Promise<User> => {
      const response: AxiosResponse<User> = await userAPI.updateUser(id, userData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.lists() });
      // Update the specific user in cache
      queryClient.setQueryData(USERS_QUERY_KEYS.detail(variables.id), data);
    },
    onError: (error) => {
      console.error('Failed to update user:', error);
    },
  });
};

// Hook to delete a user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await userAPI.deleteUser(id);
    },
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete user:', error);
    },
  });
};
