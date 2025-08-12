import { z } from 'zod'

// Allow any string for status - API can return various status values like "active", "inactive", etc.
const userStatusSchema = z.string()
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.string(); // Accept any role string from API

const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
