"use client"

import { create } from 'zustand'
import { Task } from '@/app/(main)/tasks/data/schema'

type TasksDialogType = 'create' | 'update' | 'delete' | 'import'

interface TasksState {
  // Dialog state
  open: TasksDialogType | null
  setOpen: (open: TasksDialogType | null) => void
  
  // Current row
  currentRow: Task | null
  setCurrentRow: (task: Task | null) => void
  
  // Reset
  reset: () => void
}

export const useTasksStore = create<TasksState>((set) => ({
  // Initial state
  open: null,
  currentRow: null,
  
  // Actions
  setOpen: (open: TasksDialogType | null) => set({ open }),
  setCurrentRow: (currentRow: Task | null) => set({ currentRow }),
  
  // Reset to initial state
  reset: () => set({
    open: null,
    currentRow: null,
  }),
}))

// Hook for easy usage
export const useTasks = () => {
  return useTasksStore((state) => ({
    open: state.open,
    setOpen: state.setOpen,
    currentRow: state.currentRow,
    setCurrentRow: state.setCurrentRow,
  }))
}
