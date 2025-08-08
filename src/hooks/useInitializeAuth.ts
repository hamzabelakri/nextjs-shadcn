import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

// Initialize auth state when app loads
export const useInitializeAuth = () => {
  const { user, fetchProfile } = useAuthStore();
  
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    
    // If we have a token but no user, fetch profile
    if (token && !user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);
  
  return null;
};
