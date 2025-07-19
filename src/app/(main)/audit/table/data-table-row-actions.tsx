'use client'

import { useState } from 'react'
import { Row } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { IconEye, IconGitCompare } from '@tabler/icons-react'
import { AuditLog } from '../data/schema'
import { AuditLogViewDialog } from './audit-log-view-dialog'
import { AuditLogComparisonDialog } from './audit-log-comparison-dialog'

interface DataTableRowActionsProps {
  row: Row<AuditLog>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [comparisonDialogOpen, setComparisonDialogOpen] = useState(false)
  const auditLog = row.original

  return (
    <>
      <div className='flex items-center gap-1'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setViewDialogOpen(true)}
          className='h-8 w-8 p-0 text-blue-500 hover:text-blue-600 hover:border-blue-300'
        >
          <IconEye className='h-4 w-4' />
          <span className='sr-only'>View audit log</span>
        </Button>
        
        {auditLog.changes && (
          <Button
            variant='outline'
            size='sm'
            onClick={() => setComparisonDialogOpen(true)}
            className='h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:border-green-300'
          >
            <IconGitCompare className='h-4 w-4' />
            <span className='sr-only'>Compare changes</span>
          </Button>
        )}
      </div>

      
    </>
  )
}
