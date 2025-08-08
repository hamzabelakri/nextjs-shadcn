import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { auditAPI, AuditLog, AuditLogPaginatedResponse, CreateAuditLogRequest } from '@/lib/api';
import { AxiosResponse } from 'axios';

// Query keys for audit logs
export const AUDIT_QUERY_KEYS = {
  all: ['audit-logs'] as const,
  lists: () => [...AUDIT_QUERY_KEYS.all, 'list'] as const,
  list: (filters: any) => [...AUDIT_QUERY_KEYS.lists(), { filters }] as const,
  details: () => [...AUDIT_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...AUDIT_QUERY_KEYS.details(), id] as const,
  userLogs: (userId: string) => [...AUDIT_QUERY_KEYS.all, 'user', userId] as const,
};

// Hook to fetch audit logs with pagination and filtering
export const useAuditLogs = (params?: {
  page?: number;
  limit?: number;
  action?: string[];
  entity?: string[];
  userId?: string;
  entityId?: string;
  fromDate?: string;
  toDate?: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: AUDIT_QUERY_KEYS.list(params),
    queryFn: async (): Promise<AuditLogPaginatedResponse> => {
      try {
        const response: AxiosResponse<any> = await auditAPI.getAuditLogs(params);
        
        // Handle the backend response structure: {message: 'Success', data: {data: [...], pagination: {...}}}
        if (response.data && response.data.data && typeof response.data.data === 'object') {
          const actualData = response.data.data;
          
          // Validate the extracted data structure
          if (actualData.data && Array.isArray(actualData.data)) {
            return actualData;
          }
        }
        
        // If the response structure doesn't match, throw an error
        throw new Error('Invalid API response structure');
      } catch (error) {
        // Handle 403 errors gracefully (expected for unauthorized access)
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as any;
          if (axiosError?.response?.status === 403) {
            console.info('Access denied to audit module - this is expected if user lacks permission');
            return { data: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } }; // Return empty response
          }
        }
        console.error('Audit logs API Error:', error);
        throw error;
      }
    },
    enabled: params?.enabled !== false, // Default to true unless explicitly disabled
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

// Hook to fetch a single audit log
export const useAuditLog = (id: number) => {
  return useQuery({
    queryKey: AUDIT_QUERY_KEYS.detail(id),
    queryFn: async (): Promise<AuditLog> => {
      const response: AxiosResponse<any> = await auditAPI.getAuditLog(id);
      
      // Handle the backend response structure: {message: 'Success', data: {...}}
      if (response.data && response.data.data) {
        return response.data.data;
      }
      
      // Fallback to direct response
      return response.data;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes (audit logs don't change)
  });
};

// Hook to fetch audit logs for a specific user
export const useUserAuditLogs = (userId: string, params?: {
  page?: number;
  limit?: number;
  action?: string[];
  entity?: string[];
}) => {
  return useQuery({
    queryKey: AUDIT_QUERY_KEYS.userLogs(userId),
    queryFn: async (): Promise<AuditLogPaginatedResponse> => {
      try {
        const response: AxiosResponse<any> = await auditAPI.getUserAuditLogs(userId, params);
        
        // Handle the backend response structure: {message: 'Success', data: {data: [...], pagination: {...}}}
        if (response.data && response.data.data && typeof response.data.data === 'object') {
          const actualData = response.data.data;
          
          // Validate the extracted data structure
          if (actualData.data && Array.isArray(actualData.data)) {
            return actualData;
          }
        }
        
        // If the response structure doesn't match, throw an error
        throw new Error('Invalid API response structure');
      } catch (error) {
        console.error('User audit logs API Error:', error);
        throw error;
      }
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 401/403 errors
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Hook to create audit log
export const useCreateAuditLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (auditData: CreateAuditLogRequest): Promise<AuditLog> => {
      try {
        console.log('Creating audit log:', auditData);
        const response: AxiosResponse<AuditLog> = await auditAPI.createAuditLog(auditData);
        console.log('Create audit log response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Create audit log error:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('Audit log created successfully:', data);
      // Invalidate and refetch audit logs
      queryClient.invalidateQueries({ queryKey: AUDIT_QUERY_KEYS.lists() });
    },
    onError: (error: any) => {
      console.error('Failed to create audit log:', error);
    },
  });
};
