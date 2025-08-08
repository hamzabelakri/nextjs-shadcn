import { useRouter } from "next/router";
import { useAuthStore } from "../store/authStore";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

// Component for protecting routes that require authentication
export const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const router = useRouter();
  const auth = useAuthStore(state => state);
  
  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!auth.isLoading && !auth.token) {
      router.push('/login');
    }
    
    // If authenticated but not admin and trying to access admin route
    if (!auth.isLoading && auth.token && adminOnly && auth.user?.role !== 'admin') {
      router.push('/dashboard'); // Redirect to general dashboard
    }
  }, [auth.isLoading, auth.token, auth.user?.role, adminOnly, router]);
  
  // Show nothing while loading or redirecting
  if (auth.isLoading || !auth.token || (adminOnly && auth.user?.role !== 'admin')) {
    return null;
  }
  
  return <>{children}</>;
};
