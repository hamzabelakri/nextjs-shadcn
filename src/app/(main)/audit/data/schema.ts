import { z } from 'zod'

const auditActionSchema = z.union([
  z.literal('create'),
  z.literal('update'),
  z.literal('delete'),
  z.literal('view'),
  z.literal('login'),
  z.literal('logout'),
])
export type AuditAction = z.infer<typeof auditActionSchema>

const auditEntitySchema = z.union([
  z.literal('user'),
  z.literal('role'),
  z.literal('permission'),
  z.literal('settings'),
  z.literal('session'),
])
export type AuditEntity = z.infer<typeof auditEntitySchema>

const auditLogSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userEmail: z.string(),
  userName: z.string(),
  action: auditActionSchema,
  entity: auditEntitySchema,
  entityId: z.string(),
  entityName: z.string(),
  description: z.string(),
  ipAddress: z.string(),
  userAgent: z.string(),
  changes: z.record(z.object({
    before: z.any().optional(),
    after: z.any().optional(),
  })).optional(),
  timestamp: z.string(),
})
export type AuditLog = z.infer<typeof auditLogSchema>

export const auditLogListSchema = z.array(auditLogSchema)
export type AuditLogList = z.infer<typeof auditLogListSchema>
