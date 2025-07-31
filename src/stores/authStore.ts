import Cookies from 'js-cookie'
import { create } from 'zustand'

const ACCESS_TOKEN = 'asteroidea-access-token'

interface AuthUser {
  accountNo: string
  email: string
  role: string[]
  exp: number
}

interface AuthState {
  // State
  user: AuthUser | null
  accessToken: string
  isAuthenticated: boolean
  isLoading: boolean
  isHydrated: boolean
  
  // Actions
  setUser: (user: AuthUser | null) => void
  setAccessToken: (accessToken: string) => void
  login: (user: AuthUser, accessToken: string) => void
  logout: () => void
  clearAuth: () => void
  setHydrated: () => void
  
  // Utilities
  hasRole: (role: string) => boolean
  hasAnyRole: (roles: string[]) => boolean
  isTokenExpired: () => boolean
  initializeFromCookies: () => void
  
  // Reset
  reset: () => void
}

// Helper functions
const setTokenCookie = (token: string) => {
  if (typeof window !== 'undefined') {
    Cookies.set(ACCESS_TOKEN, token, { 
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
  }
}

const removeTokenCookie = () => {
  if (typeof window !== 'undefined') {
    Cookies.remove(ACCESS_TOKEN)
  }
}

const getTokenFromCookie = (): string => {
  if (typeof window !== 'undefined') {
    return Cookies.get(ACCESS_TOKEN) || ''
  }
  return ''
}

// Manual persistence helpers
const saveToLocalStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.warn(`Failed to save ${key} to localStorage:`, e)
  }
}

const loadFromLocalStorage = (key: string) => {
  if (typeof window === 'undefined') return null
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (e) {
    console.warn(`Failed to load ${key} from localStorage:`, e)
    return null
  }
}

const removeFromLocalStorage = (key: string) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.warn(`Failed to remove ${key} from localStorage:`, e)
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  accessToken: '',
  isAuthenticated: false,
  isLoading: false,
  isHydrated: false,
  
  // Actions
  setUser: (user: AuthUser | null) => {
    set({ 
      user,
      isAuthenticated: !!user 
    })
    // Manual persistence
    if (user) {
      saveToLocalStorage('auth-user', user)
      saveToLocalStorage('auth-authenticated', true)
    } else {
      removeFromLocalStorage('auth-user')
      removeFromLocalStorage('auth-authenticated')
    }
  },
  
  setAccessToken: (accessToken: string) => {
    setTokenCookie(accessToken)
    set({ 
      accessToken,
      isAuthenticated: !!accessToken && !get().isTokenExpired()
    })
  },
  
  login: (user: AuthUser, accessToken: string) => {
    setTokenCookie(accessToken)
    set({
      user,
      accessToken,
      isAuthenticated: true,
      isLoading: false
    })
    // Manual persistence
    saveToLocalStorage('auth-user', user)
    saveToLocalStorage('auth-authenticated', true)
  },
  
  logout: () => {
    removeTokenCookie()
    set({
      user: null,
      accessToken: '',
      isAuthenticated: false,
      isLoading: false
    })
    // Clear manual persistence
    removeFromLocalStorage('auth-user')
    removeFromLocalStorage('auth-authenticated')
  },
  
  clearAuth: () => {
    removeTokenCookie()
    set({
      user: null,
      accessToken: '',
      isAuthenticated: false,
      isLoading: false
    })
    // Clear manual persistence
    removeFromLocalStorage('auth-user')
    removeFromLocalStorage('auth-authenticated')
  },
  
  setHydrated: () => set({ isHydrated: true }),
  
  // Utilities
  hasRole: (role: string) => {
    const user = get().user
    return user?.role?.includes(role) ?? false
  },
  
  hasAnyRole: (roles: string[]) => {
    const user = get().user
    return roles.some(role => user?.role?.includes(role)) ?? false
  },
  
  isTokenExpired: () => {
    const user = get().user
    if (!user?.exp) return true
    return Date.now() >= user.exp * 1000
  },
  
  initializeFromCookies: () => {
    const token = getTokenFromCookie()
    if (token) {
      set({ accessToken: token })
    }
    
    // Load from localStorage on hydration
    const savedUser = loadFromLocalStorage('auth-user')
    const savedAuth = loadFromLocalStorage('auth-authenticated')
    
    if (savedUser && savedAuth) {
      set({
        user: savedUser,
        isAuthenticated: savedAuth && !get().isTokenExpired()
      })
    }
    
    set({ isHydrated: true })
  },
  
  // Reset to initial state
  reset: () => {
    removeTokenCookie()
    removeFromLocalStorage('auth-user')
    removeFromLocalStorage('auth-authenticated')
    set({
      user: null,
      accessToken: '',
      isAuthenticated: false,
      isLoading: false,
      isHydrated: false,
    })
  },
}))
