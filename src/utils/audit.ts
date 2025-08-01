import { auditLogs } from "@/app/(main)/audit/data/audit"

type AuditAction = 'create' | 'update' | 'delete' | 'view' | 'login' | 'logout'
type AuditEntity = 'user' | 'role' | 'permission' | 'settings' | 'session'

interface AuditLogEntry {
  userId: string
  userEmail: string
  userName: string
  action: AuditAction
  entity: AuditEntity
  entityId: string
  entityName: string
  description: string
  ipAddress?: string
  userAgent?: string
  changes?: {
    before?: Record<string, any>
    after?: Record<string, any>
  }
}

// Simulated current user (in a real app this would come from auth context)
const getCurrentUser = () => ({
  id: 'user_1',
  email: 'admin@example.com',
  name: 'John Admin',
})

// Simulated IP and user agent (in a real app this would come from request)
const getClientInfo = () => ({
  ipAddress: '192.168.1.100',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
})

export function logAuditEntry(entry: AuditLogEntry) {
  const user = getCurrentUser()
  const clientInfo = getClientInfo()
  
  const auditLog = {
    id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId: entry.userId || user.id,
    userEmail: entry.userEmail || user.email,
    userName: entry.userName || user.name,
    action: entry.action,
    entity: entry.entity,
    entityId: entry.entityId,
    entityName: entry.entityName,
    description: entry.description,
    ipAddress: entry.ipAddress || clientInfo.ipAddress,
    userAgent: entry.userAgent || clientInfo.userAgent,
    changes: entry.changes,
    timestamp: new Date().toISOString(),
  }
  
  // In a real application, this would make an API call to persist the audit log
  // For demo purposes, we'll add it to the in-memory array
  auditLogs.unshift(auditLog)
  
  console.log('Audit log created:', auditLog)
  return auditLog
}

// Helper functions for common audit scenarios
export const auditHelpers = {
  roleCreated: (role: any) => 
    logAuditEntry({
      userId: '',
      userEmail: '',
      userName: '',
      action: 'create',
      entity: 'role',
      entityId: role.id,
      entityName: role.name,
      description: `Created role "${role.name}"`,
      changes: {
        after: {
          name: role.name,
          description: role.description,
          permissions: role.permissions,
          status: role.status,
        },
      },
    }),

  roleUpdated: (before: any, after: any) =>
    logAuditEntry({
      userId: '',
      userEmail: '',
      userName: '',
      action: 'update',
      entity: 'role',
      entityId: after.id,
      entityName: after.name,
      description: `Updated role "${after.name}"`,
      changes: {
        before: {
          name: before.name,
          description: before.description,
          permissions: before.permissions,
          status: before.status,
        },
        after: {
          name: after.name,
          description: after.description,
          permissions: after.permissions,
          status: after.status,
        },
      },
    }),

  roleDeleted: (role: any) =>
    logAuditEntry({
      userId: '',
      userEmail: '',
      userName: '',
      action: 'delete',
      entity: 'role',
      entityId: role.id,
      entityName: role.name,
      description: `Deleted role "${role.name}"`,
      changes: {
        before: {
          name: role.name,
          description: role.description,
          permissions: role.permissions,
          status: role.status,
        },
      },
    }),
}
