import {
  IconCheck,
  IconX,
  IconShield,
  IconShieldCheck,
  IconUsers,
  IconEye,
} from '@tabler/icons-react'

export const roleStatuses = new Map([
  ['active', 'text-green-600 bg-green-50 border-green-200'],
  ['inactive', 'text-red-600 bg-red-50 border-red-200'],
])

export const roleTypes = [
  {
    value: 'superadmin',
    label: 'Super Admin',
    icon: IconShieldCheck,
  },
  {
    value: 'admin',
    label: 'Admin',
    icon: IconShield,
  },
  {
    value: 'manager',
    label: 'Manager',
    icon: IconUsers,
  },
  {
    value: 'cashier',
    label: 'Cashier',
    icon: IconEye,
  },
]

export const permissionModules = [
  {
    name: 'Users',
    key: 'users',
    permissions: ['view', 'create', 'edit', 'delete']
  },
  {
    name: 'Roles',
    key: 'roles', 
    permissions: ['view', 'create', 'edit', 'delete']
  },
  {
    name: 'Settings',
    key: 'settings',
    permissions: ['view', 'edit']
  },
  {
    name: 'Dashboard',
    key: 'dashboard',
    permissions: ['view']
  }
]

export const permissionsList = [
  'users.view',
  'users.create', 
  'users.edit',
  'users.delete',
  'roles.view',
  'roles.create',
  'roles.edit', 
  'roles.delete',
  'settings.view',
  'settings.edit',
  'dashboard.view',
]
