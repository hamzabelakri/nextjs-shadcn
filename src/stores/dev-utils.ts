"use client"

import { useUIStore } from './ui-store'
import { useAuthStore } from './authStore'
import { useUsersStore } from './users-store'
import { useTasksStore } from './tasks-store'
import { useRolesStore } from './roles-store'
import { useAuditStore } from './audit-store'

/**
 * Development utility for resetting all stores to their initial state
 * Useful during development and testing
 */
export const useResetAllStores = () => {
  const resetUI = useUIStore((state) => state.reset)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const resetUsers = useUsersStore((state) => state.reset)
  const resetTasks = useTasksStore((state) => state.reset)
  const resetRoles = useRolesStore((state) => state.reset)
  const resetAudit = useAuditStore((state) => state.reset)
  
  return () => {
    resetUI()
    clearAuth()
    resetUsers()
    resetTasks()
    resetRoles()
    resetAudit()
    
    // Clear all localStorage (our new implementation uses different keys)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ui-theme')
      localStorage.removeItem('ui-font')
      localStorage.removeItem('ui-language')
      localStorage.removeItem('auth-user')
      localStorage.removeItem('auth-authenticated')
    }
    
    console.log('🔄 All stores have been reset to their initial state')
  }
}

/**
 * Export current state of all stores for debugging
 */
export const useExportStoreState = () => {
  return () => {
    const uiState = useUIStore.getState()
    const authState = useAuthStore.getState()
    const usersState = useUsersStore.getState()
    const tasksState = useTasksStore.getState()
    const rolesState = useRolesStore.getState()
    const auditState = useAuditStore.getState()
    
    const exportData = {
      timestamp: new Date().toISOString(),
      stores: {
        ui: uiState,
        auth: authState,
        users: usersState,
        tasks: tasksState,
        roles: rolesState,
        audit: auditState,
      }
    }
    
    console.log('📊 Current store state:', exportData)
    
    // Copy to clipboard if available
    if (navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(exportData, null, 2))
      console.log('📋 State copied to clipboard')
    }
    
    return exportData
  }
}

/**
 * Global store utilities for development
 * Available in window object in development mode
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  ;(window as any).__STORE_UTILS__ = {
    resetAll: () => {
      useUIStore.getState().reset()
      useAuthStore.getState().clearAuth()
      useUsersStore.getState().reset()
      useTasksStore.getState().reset()
      useRolesStore.getState().reset()
      useAuditStore.getState().reset()
      
      // Clear localStorage
      localStorage.removeItem('ui-theme')
      localStorage.removeItem('ui-font')
      localStorage.removeItem('ui-language')
      localStorage.removeItem('auth-user')
      localStorage.removeItem('auth-authenticated')
      
      console.log('🔄 All stores reset via window.__STORE_UTILS__.resetAll()')
    },
    getState: () => ({
      ui: useUIStore.getState(),
      auth: useAuthStore.getState(),
      users: useUsersStore.getState(),
      tasks: useTasksStore.getState(),
      roles: useRolesStore.getState(),
      audit: useAuditStore.getState(),
    }),
    ui: useUIStore,
    auth: useAuthStore,
    users: useUsersStore,
    tasks: useTasksStore,
    roles: useRolesStore,
    audit: useAuditStore,
  }
  
  console.log('🛠️ Store utilities available at window.__STORE_UTILS__')
}
