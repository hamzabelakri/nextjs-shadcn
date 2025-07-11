import { AuditLog } from './schema'

export const auditLogs: AuditLog[] = [
  {
    id: '1',
    userId: 'user_1',
    userEmail: 'admin@example.com',
    userName: 'John Admin',
    action: 'create',
    entity: 'user',
    entityId: 'user_5',
    entityName: 'jane.doe@example.com',
    description: 'Created new user account',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    changes: {
      email: { after: 'jane.doe@example.com' },
      role: { after: 'manager' },
      status: { after: 'active' }
    },
    timestamp: new Date('2024-01-20T10:30:00Z'),
  },
  {
    id: '2',
    userId: 'user_1',
    userEmail: 'admin@example.com',
    userName: 'John Admin',
    action: 'update',
    entity: 'role',
    entityId: 'role_2',
    entityName: 'Manager',
    description: 'Updated role permissions',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    changes: {
      permissions: {
        before: ['users.view', 'users.edit'],
        after: ['users.view', 'users.edit', 'users.create']
      }
    },
    timestamp: new Date('2024-01-20T09:15:00Z'),
  },
  {
    id: '3',
    userId: 'user_2',
    userEmail: 'manager@example.com',
    userName: 'Sarah Manager',
    action: 'update',
    entity: 'user',
    entityId: 'user_3',
    entityName: 'bob.smith@example.com',
    description: 'Updated user profile information',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    changes: {
      firstName: { before: 'Robert', after: 'Bob' },
      phoneNumber: { before: '+1234567890', after: '+1987654321' }
    },
    timestamp: new Date('2024-01-20T08:45:00Z'),
  },
  {
    id: '4',
    userId: 'user_3',
    userEmail: 'bob.smith@example.com',
    userName: 'Bob Smith',
    action: 'login',
    entity: 'session',
    entityId: 'session_123',
    entityName: 'User Login',
    description: 'User logged into the system',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: new Date('2024-01-20T07:30:00Z'),
  },
  {
    id: '5',
    userId: 'user_1',
    userEmail: 'admin@example.com',
    userName: 'John Admin',
    action: 'delete',
    entity: 'user',
    entityId: 'user_old',
    entityName: 'old.user@example.com',
    description: 'Deleted inactive user account',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    changes: {
      status: { before: 'inactive' },
      email: { before: 'old.user@example.com' },
      role: { before: 'viewer' }
    },
    timestamp: new Date('2024-01-19T16:20:00Z'),
  },
  {
    id: '6',
    userId: 'user_1',
    userEmail: 'admin@example.com',
    userName: 'John Admin',
    action: 'update',
    entity: 'settings',
    entityId: 'settings_1',
    entityName: 'System Settings',
    description: 'Updated application settings',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    changes: {
      sessionTimeout: { before: '30', after: '60' },
      maxLoginAttempts: { before: '3', after: '5' }
    },
    timestamp: new Date('2024-01-19T14:10:00Z'),
  }
]
