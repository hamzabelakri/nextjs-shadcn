import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, LoginPayload, LoginResponse } from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth-store";
import { AxiosError } from "axios";

interface LoginError {
  message: string;
  status?: number;
  field?: string;
}

interface ApiErrorResponse {
  message?: string;
  field?: string;
  errors?: Record<string, string[]>;
}

interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: LoginError) => void;
}

export function useLogin(options?: UseLoginOptions) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<LoginResponse, AxiosError<ApiErrorResponse>, LoginPayload>({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login success:", data);
      setAuth(data);
      router.push("/dashboard");
      
      // Call custom onSuccess callback if provided
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
      
      // Process error into a user-friendly format
      const processedError: LoginError = {
        message: "Login failed",
        status: error.response?.status,
      };

      // Handle different error scenarios
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;
        
        switch (status) {
          case 401:
            processedError.message = "Invalid email or password";
            break;
          case 422:
            processedError.message = data?.message || "Invalid input data";
            processedError.field = data?.field;
            break;
          case 429:
            processedError.message = "Too many login attempts. Please try again later";
            break;
          case 500:
            processedError.message = "Server error. Please try again later";
            break;
          default:
            processedError.message = data?.message || "Login failed";
        }
      } else if (error.request) {
        // Network error
        processedError.message = "Network error. Please check your connection";
      } else {
        // Other error
        processedError.message = error.message || "An unexpected error occurred";
      }

      // Call custom onError callback if provided
      options?.onError?.(processedError);
    },
  });
}

// Additional auth hooks can be added here
export function useLogout() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return () => {
    clearAuth();
    router.push("/sign-in");
  };
}
