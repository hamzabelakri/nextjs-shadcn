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
  ['create', { color: 'text-green-600 bg-green-50 border-green-200', icon: IconPlus }],
  ['update', { color: 'text-blue-600 bg-blue-50 border-blue-200', icon: IconEdit }],
  ['delete', { color: 'text-red-600 bg-red-50 border-red-200', icon: IconTrash }],
  ['view', { color: 'text-gray-600 bg-gray-50 border-gray-200', icon: IconEye }],
  ['login', { color: 'text-green-600 bg-green-50 border-green-200', icon: IconLogin }],
  ['logout', { color: 'text-orange-600 bg-orange-50 border-orange-200', icon: IconLogout }],
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
    label: 'Action',
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
    label: 'Entity',
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
   
  };
};