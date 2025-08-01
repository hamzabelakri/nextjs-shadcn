"use client"

import { useAuthStore } from './authStore'
import { useAuthEffects } from './auth-effects'

/**
 * Enhanced auth hook with automatic effects
 * Drop-in replacement that includes hydration effects
 */
export const useAuth = () => {
  useAuthEffects() // Ensure effects are active
  
  return useAuthStore((state) => ({
    user: state.user,
    accessToken: state.accessToken,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    isHydrated: state.isHydrated,
    login: state.login,
    logout: state.logout,
    hasRole: state.hasRole,
    hasAnyRole: state.hasAnyRole,
    isTokenExpired: state.isTokenExpired,
  }))
}

/**
 * Individual auth hooks (with effects)
 */
export const useAuthUser = () => {
  useAuthEffects()
  return useAuthStore((state) => state.user)
}

export const useIsAuthenticated = () => {
  useAuthEffects()
  return useAuthStore((state) => state.isAuthenticated)
}

export const useAuthToken = () => {
  useAuthEffects()
  return useAuthStore((state) => state.accessToken)
}

export const useIsAuthHydrated = () => useAuthStore((state) => state.isHydrated)
