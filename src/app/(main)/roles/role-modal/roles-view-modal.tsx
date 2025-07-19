'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Role } from '../data/schema'
import { roleStatuses } from '../data/data'
import { cn } from '@/lib/utils'

interface RolesViewDialogProps {
  currentRow: Role
  open: boolean
  onOpenChange: () => void
}

export function RolesViewModal({
  currentRow,
  open,
  onOpenChange,
}: RolesViewDialogProps) {
  const statusColor = roleStatuses.get(currentRow.status)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Role Details</DialogTitle>
          <DialogDescription>
            View role information and permissions
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Role Name
            </label>
            <div className="mt-1 text-sm font-medium">{currentRow.name}</div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Description
            </label>
            <div className="mt-1 text-sm">{currentRow.description}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Status
              </label>
              <div className="mt-1">
                <Badge variant="outline" className={cn('capitalize', statusColor)}>
                  {currentRow.status}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Users with this role
              </label>
              <div className="mt-1 text-sm">{currentRow.userCount}</div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Permissions
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {currentRow.permissions.map((permission) => (
                <Badge key={permission} variant="secondary" className="text-xs">
                  {permission.replace('.', ':')}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div>
              <label className="font-medium">Created</label>
              <div>{currentRow.createdAt.toLocaleDateString()}</div>
            </div>
            <div>
              <label className="font-medium">Last Updated</label>
              <div>{currentRow.updatedAt.toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
