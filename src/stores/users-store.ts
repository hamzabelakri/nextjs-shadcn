"use client"

import { create } from 'zustand'
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
}

export const useUsersStore = create<UsersState>((set) => ({
  // Initial state
  open: null,
  currentRow: null,
  
  // Actions
  setOpen: (open: UsersDialogType | null) => set({ open }),
  setCurrentRow: (currentRow: User | null) => set({ currentRow }),
  
  // Reset to initial state
  reset: () => set({
    open: null,
    currentRow: null,
  }),
}))

// Hook for easy usage
export const useUsers = () => {
  return useUsersStore((state) => ({
    open: state.open,
    setOpen: state.setOpen,
    currentRow: state.currentRow,
    setCurrentRow: state.setCurrentRow,
  }))
}
