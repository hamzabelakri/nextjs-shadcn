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
import { useDeleteRole } from '@/hooks/use-roles'
import { Role } from '@/lib/api'
import { cn } from '@/lib/utils'

interface RolesDeleteModalProps {
  currentRow: Role
  open: boolean
  onOpenChange: () => void
}

export function RolesDeleteModal({
  currentRow,
  open,
  onOpenChange,
}: RolesDeleteModalProps) {
  // API Role uses is_active (boolean) instead of status (string)
  const statusColor = currentRow.is_active ? 'text-green-600' : 'text-red-600'
  const deleteRoleMutation = useDeleteRole()

  const handleDelete = async () => {
    try {
      // currentRow is now directly the API Role type
      const roleId = Number(currentRow.id);
      
      await deleteRoleMutation.mutateAsync(roleId);
      onOpenChange();
    } catch (error: any) {
      console.error('Failed to delete role:', error);
      // The error will be handled by the mutation's onError callback
      // which is already set up in the useDeleteRole hook
    }
  }

  // Convert permissions object to array for display
  const permissionsArray = Object.keys(currentRow.permissions || {})

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
                {currentRow.is_active ? 'active' : 'inactive'}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">{currentRow.description}</div>
            <div className="text-sm text-muted-foreground">
              <strong>{currentRow.user_count}</strong> user(s) currently have this role
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {permissionsArray.slice(0, 3).map((permission) => (
                <Badge key={permission} variant='secondary' className='text-xs'>
                  {permission.replace('.', ':')}
                </Badge>
              ))}
              {permissionsArray.length > 3 && (
                <Badge variant='outline' className='text-xs'>
                  +{permissionsArray.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          
          {currentRow.user_count > 0 && (
            <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
              <div className="flex items-center gap-2 font-medium">
                ⚠️ Warning
              </div>
              <div className="mt-1">
                This role is currently assigned to <strong>{currentRow.user_count}</strong> user(s). 
                Deleting this role will remove it from all assigned users and may affect their access permissions.
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onOpenChange} disabled={deleteRoleMutation.isPending}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={deleteRoleMutation.isPending}
            >
              {deleteRoleMutation.isPending ? 'Deleting...' : 'Delete Role'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
