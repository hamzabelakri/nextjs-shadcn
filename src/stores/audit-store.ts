"use client"

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import React from 'react'
import { AuditLog } from '@/app/(main)/audit/data/schema'

type AuditLogsDialogType = 'view' | 'compare'

interface AuditState {
  // Dialog state
  openAudit: AuditLogsDialogType | null
  setOpenAudit: (open: AuditLogsDialogType | null) => void
  
  // Current row
  currentRow: AuditLog | null
  setCurrentRow: (auditLog: AuditLog | null) => void
  
  // Reset
  reset: () => void
  
  // SSR hydration flag
  _hasHydrated: boolean
  _setHasHydrated: (hasHydrated: boolean) => void
}

export const useAuditStore = create<AuditState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    openAudit: null,
    currentRow: null,
    _hasHydrated: false,
    
    // Actions
    setOpenAudit: (openAudit: AuditLogsDialogType | null) => {
      if (get()._hasHydrated) {
        set({ openAudit })
      }
    },
    setCurrentRow: (currentRow: AuditLog | null) => {
      if (get()._hasHydrated) {
        set({ currentRow })
      }
    },
    
    // Reset to initial state
    reset: () => {
      if (get()._hasHydrated) {
        set({
          openAudit: null,
          currentRow: null,
        })
      }
    },
    
    // Hydration control
    _setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
  }))
)

// Hook for easy usage
export const useAudit = () => {
  const store = useAuditStore()
  
  // Handle hydration
  React.useEffect(() => {
    useAuditStore.getState()._setHasHydrated(true)
  }, [])
  
  // Return stable reference during SSR
  return React.useMemo(() => ({
    openAudit: store._hasHydrated ? store.openAudit : null,
    setOpenAudit: store.setOpenAudit,
    currentRow: store._hasHydrated ? store.currentRow : null,
    setCurrentRow: store.setCurrentRow,
  }), [store.openAudit, store.currentRow, store._hasHydrated, store.setOpenAudit, store.setCurrentRow])
}

// SSR-safe version
export const useAuditSSR = () => {
  const [mounted, setMounted] = React.useState(false)
  const store = useAuditStore()
  
  React.useEffect(() => {
    setMounted(true)
    useAuditStore.getState()._setHasHydrated(true)
  }, [])
  
  if (!mounted) {
    return {
      openAudit: null,
      setOpenAudit: () => {},
      currentRow: null,
      setCurrentRow: () => {},
    }
  }
  
  return {
    openAudit: store.openAudit,
    setOpenAudit: store.setOpenAudit,
    currentRow: store.currentRow,
    setCurrentRow: store.setCurrentRow,
  }
}