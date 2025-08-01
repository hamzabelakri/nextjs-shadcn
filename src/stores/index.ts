// ===== CORE STORES =====
export { useUIStore } from './ui-store'
export { useAuthStore } from './authStore'

// ===== FEATURE STORES =====
export { useUsersStore, useUsers } from './users-store'
export { useTasksStore, useTasks } from './tasks-store'
export { useRolesStore, useRoles } from './roles-store'
export { useAuditStore, useAudit } from './audit-store'

// ===== UI HOOKS (WITH EFFECTS) =====
export { 
  useTheme,
  useFont, 
  useLanguage,
  useSearch,
  useIsHydrated
} from './ui-hooks'

// ===== AUTH HOOKS (WITH EFFECTS) =====
export {
  useAuth,
  useAuthUser,
  useIsAuthenticated, 
  useAuthToken,
  useIsAuthHydrated
} from './auth-hooks'

// ===== EFFECTS =====
export { useUIEffects } from './ui-effects'
export { useAuthEffects } from './auth-effects'

// ===== PROVIDER =====
export { StoreProvider } from './store-provider'

// ===== DEVELOPMENT UTILITIES =====
export { 
  useResetAllStores,
  useExportStoreState 
} from './dev-utils'
