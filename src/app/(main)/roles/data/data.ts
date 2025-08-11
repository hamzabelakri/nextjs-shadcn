import {
  IconCheck,
  IconX,
  IconShield,
  IconShieldCheck,
  IconUsers,
  IconEye,
  IconUserPlus
} from '@tabler/icons-react'
import { useRolesStore } from '@/store/roles-store'
import { useTranslation } from 'react-i18next'

export const roleStatuses = new Map([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
])

export const usePermissionModules = () => {
  const { t } = useTranslation();
  
  return [
    {
      name: t('users'),
      key: 'users',
      permissions: ['view', 'create', 'edit', 'delete']
    },
    {
      name: t('roles'),
      key: 'roles', 
      permissions: ['view', 'create', 'edit', 'delete']
    },
    {
      name: t('audit'),
      key: 'audit-logs',
      permissions: ['view']
    },
    {
      name: t('settings'),
      key: 'settings',
      permissions: ['view', 'edit']
    },
    {
      name: t('dashboard'),
      key: 'dashboard',
      permissions: ['view']
    }
  ];
};

export const useRoleToolbarProps = () => {
  const { t } = useTranslation();
  const setOpenRole = useRolesStore((state) => state.setOpenRole);
  const permissionModules = usePermissionModules();

  const roleTypes = [
    {
      value: 'superadmin',
      label: t('super_admin'),
      icon: IconShieldCheck,
    },
    {
      value: 'admin',
      label: t('admin'),
      icon: IconShield,
    },
    {
      value: 'manager',
      label: t('manager'),
      icon: IconUsers,
    },
    {
      value: 'cashier',
      label: t('cashier'),
      icon: IconEye,
    },
  ];

  return {
    filterPlaceholder: t('filter_roles'),
    buttonLabel: t('add_role'),
    exportButtonLabel: t('export'),
    filerButtonLabel: t('filter'),
    buttonIcon: IconUserPlus,
    onAddClick: () => setOpenRole("add"),
    roleTypes,
    permissionModules,
  };
};

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

