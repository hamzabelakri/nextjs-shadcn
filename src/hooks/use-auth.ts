
// hooks/use-auth.ts
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, LoginPayload, LoginResponse, logout } from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth-store";



export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data);
      router.push("/dashboard");
    },
    onError: (error) => {
  
    },
  });
}


export function useLogout() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return () => {
    clearAuth();
    router.push("/sign-in");
  };
}
