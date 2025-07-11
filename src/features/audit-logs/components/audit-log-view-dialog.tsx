'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AuditLog } from '../data/schema'
import { format } from 'date-fns'

interface AuditLogViewDialogProps {
  auditLog: AuditLog | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuditLogViewDialog({
  auditLog,
  open,
  onOpenChange,
}: AuditLogViewDialogProps) {
  if (!auditLog) return null

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-100 text-green-800'
      case 'update':
        return 'bg-blue-100 text-blue-800'
      case 'delete':
        return 'bg-red-100 text-red-800'
      case 'view':
        return 'bg-gray-100 text-gray-800'
      case 'login':
        return 'bg-purple-100 text-purple-800'
      case 'logout':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEntityColor = (entity: string) => {
    switch (entity) {
      case 'user':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'role':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'permission':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'settings':
        return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'session':
        return 'bg-gray-50 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            Audit Log Details
            <Badge className={getActionColor(auditLog.action)}>
              {auditLog.action}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            View detailed information about this audit log entry
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h4 className='text-sm font-medium text-gray-500 mb-1'>Timestamp</h4>
              <p className='text-sm'>
                {format(new Date(auditLog.timestamp), 'PPpp')}
              </p>
            </div>
            <div>
              <h4 className='text-sm font-medium text-gray-500 mb-1'>User</h4>
              <p className='text-sm'>{auditLog.userName} ({auditLog.userEmail})</p>
            </div>
            <div>
              <h4 className='text-sm font-medium text-gray-500 mb-1'>Action</h4>
              <Badge className={getActionColor(auditLog.action)}>
                {auditLog.action}
              </Badge>
            </div>
            <div>
              <h4 className='text-sm font-medium text-gray-500 mb-1'>Entity</h4>
              <Badge variant='outline' className={getEntityColor(auditLog.entity)}>
                {auditLog.entity}
              </Badge>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-medium text-gray-500 mb-2'>Description</h4>
            <p className='text-sm bg-gray-50 p-3 rounded-md'>
              {auditLog.description}
            </p>
          </div>

          <div>
            <h4 className='text-sm font-medium text-gray-500 mb-2'>IP Address</h4>
            <p className='text-sm font-mono'>{auditLog.ipAddress}</p>
          </div>

          <div>
            <h4 className='text-sm font-medium text-gray-500 mb-2'>User Agent</h4>
            <p className='text-sm text-gray-600 break-all'>{auditLog.userAgent}</p>
          </div>

          {auditLog.changes && (
            <>
              <Separator />
              <div>
                <h4 className='text-sm font-medium text-gray-500 mb-3'>Changes</h4>
                <div className='space-y-4'>
                  {auditLog.changes.before && (
                    <div>
                      <h5 className='text-xs font-medium text-red-600 mb-2'>Before</h5>
                      <pre className='text-xs bg-red-50 p-3 rounded-md overflow-x-auto'>
                        {JSON.stringify(auditLog.changes.before, null, 2)}
                      </pre>
                    </div>
                  )}
                  {auditLog.changes.after && (
                    <div>
                      <h5 className='text-xs font-medium text-green-600 mb-2'>After</h5>
                      <pre className='text-xs bg-green-50 p-3 rounded-md overflow-x-auto'>
                        {JSON.stringify(auditLog.changes.after, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
