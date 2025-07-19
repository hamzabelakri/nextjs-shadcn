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
import { CodeComparison } from '@/components/magicui/code-comparison'
import { AuditLog } from '../data/schema'

interface AuditLogComparisonDialogProps {
  currentRow: AuditLog 
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuditLogComparisonDialog({
  currentRow,
  open,
  onOpenChange,
}: AuditLogComparisonDialogProps) {
  if (!currentRow || !currentRow.changes) return null

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-100 text-green-800'
      case 'update':
        return 'bg-blue-100 text-blue-800'
      case 'delete':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const beforeCode = currentRow.changes.before 
    ? JSON.stringify(currentRow.changes.before, null, 2)
    : '// No previous state'

  const afterCode = currentRow.changes.after 
    ? JSON.stringify(currentRow.changes.after, null, 2)
    : '// No new state'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-6xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            Change Comparison
            <Badge className={getActionColor(currentRow.action)}>
              {currentRow.action}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Compare the before and after states of the {currentRow.entity} changes
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='text-sm text-gray-600'>
            <span className='font-medium'>User:</span> {currentRow.userName} ({currentRow.userEmail})
            <span className='mx-2'>•</span>
            <span className='font-medium'>Entity:</span> {currentRow.entity}
            <span className='mx-2'>•</span>
            <span className='font-medium'>Action:</span> {currentRow.action}
          </div>

          <div className='border rounded-lg overflow-hidden'>
            <CodeComparison
              beforeCode={beforeCode}
              afterCode={afterCode}
              language='json'
              filename={`${currentRow.entity}-${currentRow.action}.json`}
              lightTheme='github-light'
              darkTheme='github-dark'
            />
          </div>

          <div className='text-xs text-gray-500 bg-gray-50 p-3 rounded-md'>
            <strong>Description:</strong> {currentRow.description}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
