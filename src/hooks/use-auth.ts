
// hooks/use-auth.ts
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, LoginPayload, LoginResponse, logout } from "@/api/auth";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";



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
      console.error("Login failed: ", error?.message)
      toast.error(error?.message)

    },
  });
}


export function useLogout() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation<void, Error, void>({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      router.push("/login");
    },
    onError: (error) => {
       console.error("Logout failed: ", error?.message)
      toast.error(error?.message)
    },
  });
}


