"use client"

import { useEffect } from 'react'
import { useAuthStore } from './authStore'

/**
 * Auth hydration effect
 * Initializes auth state from cookies and localStorage on client side
 */
export const useAuthHydration = () => {
  const isHydrated = useAuthStore((state) => state.isHydrated)
  const initializeFromCookies = useAuthStore((state) => state.initializeFromCookies)

  useEffect(() => {
    if (!isHydrated) {
      initializeFromCookies()
    }
  }, [isHydrated, initializeFromCookies])
}

/**
 * Combined auth effects
 * Use this hook to initialize all auth-related side effects
 */
export const useAuthEffects = () => {
  useAuthHydration()
}
