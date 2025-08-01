import {
  IconCheck,
  IconX,
  IconShield,
  IconShieldCheck,
  IconUsers,
  IconEye,
  IconUserPlus
} from '@tabler/icons-react'
import { useRoles } from '@/stores'

export const roleStatuses = new Map([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
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
    name: 'Audit Logs',
    key: 'audit-logs',
    permissions: ['view']
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
  'audit-logs.view',
  'settings.view',
  'settings.edit',
  'dashboard.view',
]

export const permissionColorClass: Record<string, string> = {
  create: "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200",
  view: "bg-neutral-300/40 text-neutral-800 dark:text-neutral-200 border-neutral-300",
  edit: "bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300",
  delete: "bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10",
};


export const useRoleToolbarProps = () => {
  const { setOpenRole } = useRoles();
  
  return {
    filterPlaceholder: "Filter roles...",
    buttonLabel: "Add Role",
    exportButtonLabel: "Export",
    filerButtonLabel: "Filter",
    buttonIcon: IconUserPlus,
    onAddClick: () => setOpenRole("add"),
  };
};

