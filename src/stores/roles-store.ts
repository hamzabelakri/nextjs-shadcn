"use client"

import { create } from 'zustand'
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
}

export const useRolesStore = create<RolesState>((set) => ({
  // Initial state
  openRole: null,
  currentRow: null,
  
  // Actions
  setOpenRole: (openRole: RolesDialogType | null) => set({ openRole }),
  setCurrentRow: (currentRow: Role | null) => set({ currentRow }),
  
  // Reset to initial state
  reset: () => set({
    openRole: null,
    currentRow: null,
  }),
}))

// Hook for easy usage
export const useRoles = () => {
  return useRolesStore((state) => ({
    openRole: state.openRole,
    setOpenRole: state.setOpenRole,
    currentRow: state.currentRow,
    setCurrentRow: state.setCurrentRow,
  }))
}
