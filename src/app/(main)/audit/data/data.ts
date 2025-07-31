import {
  IconActivity,
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
  IconLogin,
  IconLogout,
  IconUser,
  IconShield,
  IconKey,
  IconSettings,
  IconDeviceDesktop,
  IconUserPlus,
} from '@tabler/icons-react'
import { useAudit } from '../context/audit-context';

export const auditActionTypes = new Map([
  ['create', { color: 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200', icon: IconPlus }],
  ['update', { color: 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300', icon: IconEdit }],
  ['delete', { color: 'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10', icon: IconTrash }],
  ['view', { color: 'bg-indigo-100/30 text-indigo-900 dark:text-indigo-200 border-indigo-300', icon: IconEye }],
  ['login', { color: 'bg-neutral-300/40 border-neutral-300', icon: IconLogin }],
  ['logout', { color: 'bg-rose-100/30 text-rose-900 dark:text-rose-200 border-rose-200', icon: IconLogout }],
])

export const auditEntityTypes = new Map([
  ['user', { label: 'User', icon: IconUser }],
  ['role', { label: 'Role', icon: IconShield }],
  ['permission', { label: 'Permission', icon: IconKey }],
  ['settings', { label: 'Settings', icon: IconSettings }],
  ['session', { label: 'Session', icon: IconDeviceDesktop }],
])

export const auditFilters = [
  {
    key: 'action',
    title: 'Action',
    options: [
      { label: 'Create', value: 'create' },
      { label: 'Update', value: 'update' },
      { label: 'Delete', value: 'delete' },
      { label: 'View', value: 'view' },
      { label: 'Login', value: 'login' },
      { label: 'Logout', value: 'logout' },
    ]
  },
  {
    key: 'entity',
    title: 'Entity',
    options: [
      { label: 'User', value: 'user' },
      { label: 'Role', value: 'role' },
      { label: 'Permission', value: 'permission' },
      { label: 'Settings', value: 'settings' },
      { label: 'Session', value: 'session' },
    ]
  }
]


export const useAuditToolbarProps = () => {
  
  return {
    filterPlaceholder: "Filter audit...",
    exportButtonLabel: "Export",
    filerButtonLabel: "Filter",
    buttonIcon: IconUserPlus,
    filters: auditFilters,
  };
};