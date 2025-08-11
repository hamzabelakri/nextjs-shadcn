import { z } from 'zod'

const roleStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
])
export type RoleStatus = z.infer<typeof roleStatusSchema>

const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  permissions: z.array(z.string()),
  status: roleStatusSchema,
  userCount: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Role = z.infer<typeof roleSchema>

export const roleListSchema = z.array(roleSchema)
export type RoleList = z.infer<typeof roleListSchema>
