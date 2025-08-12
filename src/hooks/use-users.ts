import { useQuery } from "@tanstack/react-query";
import { getUsers, User } from "@/lib/api/users";
import { AxiosError } from "axios";

interface UsersError {
  message: string;
  status?: number;
  code?: string;
}

interface ApiErrorResponse {
  message?: string;
  code?: string;
  errors?: Record<string, string[]>;
}

interface UseUsersOptions {
  onSuccess?: (data: User[]) => void;
  onError?: (error: UsersError) => void;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
}

export function useUsers(options?: UseUsersOptions) {
  const processError = (error: AxiosError<ApiErrorResponse>): UsersError => {
    console.error("Failed to load users:", error);
    
    // Process error into a user-friendly format
    const processedError: UsersError = {
      message: "Failed to load users",
      status: error.response?.status,
    };

    // Handle different error scenarios
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          processedError.message = "Authentication required. Please log in again.";
          processedError.code = "UNAUTHORIZED";
          break;
        case 403:
          processedError.message = "You don't have permission to view users.";
          processedError.code = "FORBIDDEN";
          break;
        case 404:
          processedError.message = "Users endpoint not found.";
          processedError.code = "NOT_FOUND";
          break;
        case 429:
          processedError.message = "Too many requests. Please try again later.";
          processedError.code = "RATE_LIMITED";
          break;
        case 500:
          processedError.message = "Server error. Please try again later.";
          processedError.code = "SERVER_ERROR";
          break;
        default:
          processedError.message = data?.message || "Failed to load users";
          processedError.code = data?.code || "UNKNOWN_ERROR";
      }
    } else if (error.request) {
      // Network error
      processedError.message = "Network error. Please check your connection.";
      processedError.code = "NETWORK_ERROR";
    } else {
      // Other error
      processedError.message = error.message || "An unexpected error occurred";
      processedError.code = "UNEXPECTED_ERROR";
    }

    return processedError;
  };

  const query = useQuery<User[], AxiosError<ApiErrorResponse>>({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes - prevents unnecessary refetches
    retry: (failureCount, error) => {
      // Don't retry on authentication errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: options?.enabled !== false,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? true,
    select: (data) => {
      // Optional data transformation
      const transformedData = data?.map(user => ({
        ...user,
        // Ensure consistent date formatting or any other transformations
        created_at: user.created_at,
        updated_at: user.updated_at,
      })) || [];
      
      // Call success callback when data is successfully transformed
      if (data && options?.onSuccess) {
        console.log("Users loaded successfully:", transformedData.length, "users");
        options.onSuccess(transformedData);
      }
      
      return transformedData;
    },
    throwOnError: (error) => {
      const processedError = processError(error);
      options?.onError?.(processedError);
      return false; // Don't throw, handle gracefully
    },
  });

  // Return enhanced query object with processed error
  return {
    ...query,
    processedError: query.error ? processError(query.error) : null,
  };
}
