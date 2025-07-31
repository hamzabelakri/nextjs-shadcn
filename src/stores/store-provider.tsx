"use client"

import { useEffect } from 'react'
import { useUIStore } from './ui-store'
import { useUIEffects } from './ui-effects'
import { useAuthEffects } from './auth-effects'

interface StoreProviderProps {
  children: React.ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
  // Handle all UI state and effects
  useUIEffects()
  
  // Handle all auth state and effects
  useAuthEffects()

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Setup global keyboard shortcut for search
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        useUIStore.getState().toggleSearch()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return <>{children}</>
}
