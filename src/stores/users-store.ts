"use client"

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { User } from '@/app/(main)/users/data/schema'

type UsersDialogType = 'invite' | 'add' | 'edit' | 'delete' | 'view'

interface UsersState {
  // Dialog state
  open: UsersDialogType | null
  setOpen: (open: UsersDialogType | null) => void
  
  // Current row
  currentRow: User | null
  setCurrentRow: (user: User | null) => void
  
  // Reset
  reset: () => void
  
  // SSR hydration flag
  _hasHydrated: boolean
  _setHasHydrated: (hasHydrated: boolean) => void
}

export const useUsersStore = create<UsersState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    open: null,
    currentRow: null,
    _hasHydrated: false,
    
    // Actions
    setOpen: (open: UsersDialogType | null) => {
      if (get()._hasHydrated) {
        set({ open })
      }
    },
    setCurrentRow: (currentRow: User | null) => {
      if (get()._hasHydrated) {
        set({ currentRow })
      }
    },
    
    // Reset to initial state
    reset: () => {
      if (get()._hasHydrated) {
        set({
          open: null,
          currentRow: null,
        })
      }
    },
    
    // Hydration control
    _setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
  }))
)

// SSR-safe hook
export const useUsers = () => {
  const store = useUsersStore()
  
  // Handle hydration
  React.useEffect(() => {
    useUsersStore.getState()._setHasHydrated(true)
  }, [])
  
  // Return stable reference during SSR
  return React.useMemo(() => ({
    open: store._hasHydrated ? store.open : null,
    setOpen: store.setOpen,
    currentRow: store._hasHydrated ? store.currentRow : null,
    setCurrentRow: store.setCurrentRow,
  }), [store.open, store.currentRow, store._hasHydrated, store.setOpen, store.setCurrentRow])
}

// Alternative: Create a completely SSR-safe version
import React from 'react'

export const useUsersSSR = () => {
  const [mounted, setMounted] = React.useState(false)
  const store = useUsersStore()
  
  React.useEffect(() => {
    setMounted(true)
    useUsersStore.getState()._setHasHydrated(true)
  }, [])
  
  if (!mounted) {
    return {
      open: null,
      setOpen: () => {},
      currentRow: null,
      setCurrentRow: () => {},
    }
  }
  
  return {
    open: store.open,
    setOpen: store.setOpen,
    currentRow: store.currentRow,
    setCurrentRow: store.setCurrentRow,
  }
}