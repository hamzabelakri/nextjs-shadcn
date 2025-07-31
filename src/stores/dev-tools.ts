"use client"

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

// Advanced store features for development and debugging

interface DevToolsState {
  // History for undo/redo functionality
  history: unknown[]
  historyIndex: number
  
  // Debug information
  actionLog: Array<{ action: string; timestamp: number; state: unknown }>
  
  // Actions
  undo: () => void
  redo: () => void
  clearHistory: () => void
  logAction: (action: string, state: unknown) => void
}

export const useDevToolsStore = create<DevToolsState>()(
  subscribeWithSelector((set, get) => ({
    history: [],
    historyIndex: -1,
    actionLog: [],
    
    undo: () => {
      const { history, historyIndex } = get()
      if (historyIndex > 0) {
        const previousState = history[historyIndex - 1]
        set({ historyIndex: historyIndex - 1 })
        // Apply previous state to main stores
        // Implementation would depend on specific needs
      }
    },
    
    redo: () => {
      const { history, historyIndex } = get()
      if (historyIndex < history.length - 1) {
        const nextState = history[historyIndex + 1]
        set({ historyIndex: historyIndex + 1 })
        // Apply next state to main stores
      }
    },
    
    clearHistory: () => {
      set({ 
        history: [], 
        historyIndex: -1, 
        actionLog: [] 
      })
    },
    
    logAction: (action: string, state: unknown) => {
      const { actionLog } = get()
      const newLog = {
        action,
        timestamp: Date.now(),
        state: JSON.parse(JSON.stringify(state)) // Deep clone
      }
      
      set({
        actionLog: [...actionLog.slice(-49), newLog] // Keep last 50 actions
      })
    }
  }))
)

// Hook for debugging store state
export const useStoreDebugger = () => {
  const devTools = useDevToolsStore()
  
  return {
    ...devTools,
    isEnabled: process.env.NODE_ENV === 'development'
  }
}

// Performance monitoring for stores
export const useStorePerformance = () => {
  const startTime = performance.now()
  
  return {
    measure: (label: string) => {
      const endTime = performance.now()
      console.log(`[Store Performance] ${label}: ${endTime - startTime}ms`)
    }
  }
}
