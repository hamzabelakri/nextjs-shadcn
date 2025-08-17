export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Record<string, string>; // Changed to string for granular format
  is_active: boolean;
  user_count: number;
  created_at: string;
  updated_at: string;
}

export type UserStatus = "active" | "inactive" | "invited" | "suspended";

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone_number?: string;
  status: UserStatus;
  role_id: number;
  role: Role;
  created_at: string;
  updated_at: string;
}

export enum UserRole {
  SUPER_ADMIN = "superadmin",
  ADMIN = "admin",
  MANAGER = "manager",
  CASHIER = "cashier",
}

export enum UserStatusTypes {
  ACTIVE = "active",
  INACTIVE = "inactive",
  INVITED = "invited",
  SUSPENDED = "suspended",
}


