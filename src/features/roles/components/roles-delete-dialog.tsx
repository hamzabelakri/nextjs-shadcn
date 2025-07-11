'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Role } from '../data/schema'
import { roleStatuses } from '../data/data'
import { cn } from '@/lib/utils'

interface RolesDeleteDialogProps {
  currentRow: Role
  open: boolean
  onOpenChange: () => void
}

export function RolesDeleteDialog({
  currentRow,
  open,
  onOpenChange,
}: RolesDeleteDialogProps) {
  const statusColor = roleStatuses.get(currentRow.status)

  const handleDelete = () => {
    // Show what would be deleted (for demo purposes)
    showSubmittedData({
      action: 'delete',
      roleId: currentRow.id,
      roleName: currentRow.name,
      affectedUsers: currentRow.userCount,
    })
    onOpenChange()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Role</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this role? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">{currentRow.name}</div>
              <Badge variant="outline" className={cn('capitalize', statusColor)}>
                {currentRow.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">{currentRow.description}</div>
            <div className="text-sm text-muted-foreground">
              <strong>{currentRow.userCount}</strong> user(s) currently have this role
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {currentRow.permissions.slice(0, 3).map((permission) => (
                <Badge key={permission} variant='secondary' className='text-xs'>
                  {permission.replace('.', ':')}
                </Badge>
              ))}
              {currentRow.permissions.length > 3 && (
                <Badge variant='outline' className='text-xs'>
                  +{currentRow.permissions.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          
          {currentRow.userCount > 0 && (
            <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
              <div className="flex items-center gap-2 font-medium">
                ⚠️ Warning
              </div>
              <div className="mt-1">
                This role is currently assigned to <strong>{currentRow.userCount}</strong> user(s). 
                Deleting this role will remove it from all assigned users and may affect their access permissions.
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onOpenChange}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Role
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
