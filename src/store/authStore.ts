import Cookies from 'js-cookie'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, UserWithPermissions, authAPI, LoginRequest, RegisterRequest } from '../lib/api'

// Use consistent token name across the application
const ACCESS_TOKEN = 'jwt_token'

interface AuthState {
  // Persistent data
  user: UserWithPermissions | null
  token: string | null
  
  // Non-persistent state
  isLoading: boolean
  error: string | null
  
  // Methods
  hasPermission: (module: string, action?: 'view' | 'create' | 'edit' | 'delete') => boolean
  setUser: (user: UserWithPermissions | null) => void
  setToken: (token: string | null) => void
  login: (credentials: LoginRequest) => Promise<void>
  register: (userData: RegisterRequest) => Promise<void>
  logout: () => void
  fetchProfile: () => Promise<void>
  refreshToken: () => Promise<void>
  startAutoRefresh: () => void
  stopAutoRefresh: () => void
  clearError: () => void
  initializeFromStorage: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Persistent data
      user: null,
      token: null,
      
      // Non-persistent state
      isLoading: false,
      error: null,
      
      hasPermission: (module: string, action: 'view' | 'create' | 'edit' | 'delete' = 'view') => {
        const user = get().user;
        if (!user || !user.permissions) return false;
        
        const permissionString = user.permissions[module];
        if (!permissionString) return false;
        
        // Parse the granular permission string "1,1,1,1"
        const permissions = permissionString.split(',').map((p: string) => p.trim() === '1');
        
        switch (action) {
          case 'view':
            return permissions[0] || false;
          case 'create':
            return permissions[1] || false;
          case 'edit':
            return permissions[2] || false;
          case 'delete':
            return permissions[3] || false;
          default:
            return false;
        }
      },
      
      setUser: (user: UserWithPermissions | null) => {
        set({ user });
      },
      
      setToken: (token: string | null) => {
        set({ token });
      },
      
      initializeFromStorage: () => {
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('user');
          const storedToken = localStorage.getItem('jwt_token');
          
          if (storedUser && storedToken) {
            try {
              const parsedUser = JSON.parse(storedUser);
              set({
                user: parsedUser,
                token: storedToken,
                isLoading: false,
                error: null
              });
              console.log('Auth store initialized from localStorage');
            } catch (error) {
              console.error('Failed to initialize auth store from localStorage:', error);
            }
          }
        }
      },
      
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const { data } = await authAPI.login(credentials);
          
          // Set auth token for API requests
          authAPI.setAuthToken(data.token);
          
          // Update store state
          set({
            user: data.user,
            token: data.token,
            isLoading: false
          });
          
          // Store token in cookie for persistence (accessible from both client and middleware)
          Cookies.set(ACCESS_TOKEN, data.token, { path: '/' });
          
          // Start auto-refresh
          get().startAutoRefresh();
        } catch (error) {
          console.error('Login failed:', error);
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false 
          });
          throw error;
        }
      },
      
      register: async (userData: RegisterRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const { data } = await authAPI.register(userData);
          
          // Set auth token for API requests
          authAPI.setAuthToken(data.token);
          
          // Update store state
          set({
            user: data.user,
            token: data.token,
            isLoading: false
          });
          
          // Store token in cookie for persistence (accessible from both client and middleware)
          Cookies.set(ACCESS_TOKEN, data.token, { path: '/' });
          
          // Start auto-refresh
          get().startAutoRefresh();
        } catch (error) {
          console.error('Registration failed:', error);
          set({
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false 
          });
          throw error;
        }
      },
      
      logout: () => {
        // Clear auth token from API
        authAPI.clearAuthToken();
        
        // Stop auto-refresh
        get().stopAutoRefresh();
        
        // Clear cookie
        Cookies.remove(ACCESS_TOKEN, { path: '/' });
        
        // Reset state
        set({
          user: null,
          token: null,
          error: null
        });
      },
      
      fetchProfile: async () => {
        const token = get().token;
        if (!token) return;
        
        set({ isLoading: true });
        
        try {
          // Set the token for this request
          authAPI.setAuthToken(token);
          
          const { data } = await authAPI.getProfile();
          set({
            user: data,
            isLoading: false
          });
        } catch (error) {
          console.error('Fetching profile failed:', error);
          // If unauthorized, logout
          if (error instanceof Error && error.message.includes('401')) {
            get().logout();
          }
          
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch profile',
            isLoading: false 
          });
        }
      },
      
      clearError: () => {
        set({ error: null });
      },

      refreshToken: async () => {
        const token = get().token;
        if (!token) return;

        try {
          const { data } = await authAPI.refresh();
          
          // Update token in API
          authAPI.setAuthToken(data.token);
          
          // Update store state
          set({
            token: data.token,
            error: null
          });
          
          // Store token in cookie for persistence
          Cookies.set(ACCESS_TOKEN, data.token, { path: '/' });
          
          console.log('Token refreshed successfully');
        } catch (error) {
          console.error('Token refresh failed:', error);
          // If refresh fails, logout the user
          get().logout();
          throw error;
        }
      },

      startAutoRefresh: () => {
        // Clear any existing intervals
        get().stopAutoRefresh();
        
        // Set up auto-refresh every 20 hours (4 hours before expiry)
        const refreshInterval = setInterval(async () => {
          const token = get().token;
          if (token) {
            try {
              await get().refreshToken();
            } catch (error) {
              console.error('Auto-refresh failed:', error);
              get().stopAutoRefresh();
            }
          } else {
            get().stopAutoRefresh();
          }
        }, 20 * 60 * 60 * 1000); // 20 hours in milliseconds
        
        // Store interval ID for cleanup
        if (typeof window !== 'undefined') {
          (window as any).__authRefreshInterval = refreshInterval;
        }
      },

      stopAutoRefresh: () => {
        if (typeof window !== 'undefined') {
          const intervalId = (window as any).__authRefreshInterval;
          if (intervalId) {
            clearInterval(intervalId);
            delete (window as any).__authRefreshInterval;
          }
        }
      }
    }),
    {
      name: 'auth-storage', // unique name for localStorage
      partialize: (state) => ({ 
        user: state.user,
        token: state.token
      })
    }
  )
)

// export const useAuth = () => useAuthStore((state) => state.auth)
