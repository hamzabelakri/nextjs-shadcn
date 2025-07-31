"use client"

import { create } from 'zustand'
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
}

export const useAuditStore = create<AuditState>((set) => ({
  // Initial state
  openAudit: null,
  currentRow: null,
  
  // Actions
  setOpenAudit: (openAudit: AuditLogsDialogType | null) => set({ openAudit }),
  setCurrentRow: (currentRow: AuditLog | null) => set({ currentRow }),
  
  // Reset to initial state
  reset: () => set({
    openAudit: null,
    currentRow: null,
  }),
}))

// Hook for easy usage
export const useAudit = () => {
  return useAuditStore((state) => ({
    openAudit: state.openAudit,
    setOpenAudit: state.setOpenAudit,
    currentRow: state.currentRow,
    setCurrentRow: state.setCurrentRow,
  }))
}
