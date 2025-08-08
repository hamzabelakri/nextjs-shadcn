/**
 * Utility functions for handling API errors gracefully in React Query hooks
 */

/**
 * Standard error handler for API calls that gracefully handles 403 errors
 * @param error - The error object from the API call
 * @param moduleName - Name of the module for logging purposes
 * @param emptyResponse - The empty response to return for 403 errors
 * @returns The empty response for 403 errors, otherwise re-throws the error
 */
export function handleAPIError<T>(
  error: unknown,
  moduleName: string,
  emptyResponse: T
): T {
  // Handle 403 errors gracefully (expected for unauthorized access)
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as any;
    if (axiosError?.response?.status === 403) {
      console.info(`Access denied to ${moduleName} module - this is expected if user lacks permission`);
      return emptyResponse;
    }
  }
  
  console.error(`${moduleName} API Error:`, error);
  throw error;
}

/**
 * Standard retry function for React Query that doesn't retry on auth errors
 * @param failureCount - Number of previous failures
 * @param error - The error object
 * @returns Whether to retry the request
 */
export function shouldRetryAPICall(failureCount: number, error: any): boolean {
  // Don't retry on 401/403 errors (expected for unauthorized access)
  if (error?.response?.status === 401 || error?.response?.status === 403) {
    return false;
  }
  return failureCount < 3;
}

/**
 * Standard React Query options for API calls with permission handling
 */
export const getStandardQueryOptions = (enabled: boolean = true) => ({
  enabled,
  staleTime: 5 * 60 * 1000, // 5 minutes
  retry: shouldRetryAPICall,
});
