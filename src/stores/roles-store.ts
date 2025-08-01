"use client"

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import React from 'react'
import { Role } from '@/app/(main)/roles/data/schema'

type RolesDialogType = 'add' | 'edit' | 'delete' | 'view'

interface RolesState {
  // Dialog state
  openRole: RolesDialogType | null
  setOpenRole: (open: RolesDialogType | null) => void
  
  // Current row
  currentRow: Role | null
  setCurrentRow: (role: Role | null) => void
  
  // Reset
  reset: () => void
  
  // SSR hydration flag
  _hasHydrated: boolean
  _setHasHydrated: (hasHydrated: boolean) => void
}

export const useRolesStore = create<RolesState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    openRole: null,
    currentRow: null,
    _hasHydrated: false,
    
    // Actions
    setOpenRole: (openRole: RolesDialogType | null) => {
      if (get()._hasHydrated) {
        set({ openRole })
      }
    },
    setCurrentRow: (currentRow: Role | null) => {
      if (get()._hasHydrated) {
        set({ currentRow })
      }
    },
    
    // Reset to initial state
    reset: () => {
      if (get()._hasHydrated) {
        set({
          openRole: null,
          currentRow: null,
        })
      }
    },
    
    // Hydration control
    _setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
  }))
)

// Hook for easy usage
export const useRoles = () => {
  const store = useRolesStore()
  
  // Handle hydration
  React.useEffect(() => {
    useRolesStore.getState()._setHasHydrated(true)
  }, [])
  
  // Return stable reference during SSR
  return React.useMemo(() => ({
    openRole: store._hasHydrated ? store.openRole : null,
    setOpenRole: store.setOpenRole,
    currentRow: store._hasHydrated ? store.currentRow : null,
    setCurrentRow: store.setCurrentRow,
  }), [store.openRole, store.currentRow, store._hasHydrated, store.setOpenRole, store.setCurrentRow])
}

// SSR-safe version
export const useRolesSSR = () => {
  const [mounted, setMounted] = React.useState(false)
  const store = useRolesStore()
  
  React.useEffect(() => {
    setMounted(true)
    useRolesStore.getState()._setHasHydrated(true)
  }, [])
  
  if (!mounted) {
    return {
      openRole: null,
      setOpenRole: () => {},
      currentRow: null,
      setCurrentRow: () => {},
    }
  }
  
  return {
    openRole: store.openRole,
    setOpenRole: store.setOpenRole,
    currentRow: store.currentRow,
    setCurrentRow: store.setCurrentRow,
  }
}