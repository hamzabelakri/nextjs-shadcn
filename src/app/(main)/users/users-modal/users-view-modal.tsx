'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { User } from '../data/schema'
import { userTypes, callTypes } from '../data/data'
import { cn } from '@/lib/utils'

interface UsersViewModalProps {
  currentRow: User
  open: boolean
  onOpenChange: () => void
}

export function UsersViewModal({
  currentRow,
  open,
  onOpenChange,
}: UsersViewModalProps) {
  const userType = userTypes.find(({ value }) => value === currentRow.role)
  const statusColor = callTypes.get(currentRow.status)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            View user information and details
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                First Name
              </label>
              <div className="mt-1 text-sm">{currentRow.firstName}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Last Name
              </label>
              <div className="mt-1 text-sm">{currentRow.lastName}</div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Username
            </label>
            <div className="mt-1 text-sm">{currentRow.username}</div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <div className="mt-1 text-sm">{currentRow.email}</div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Phone Number
            </label>
            <div className="mt-1 text-sm">{currentRow.phoneNumber}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Role
              </label>
              <div className="mt-1 flex items-center gap-2">
                {userType?.icon && (
                  <userType.icon size={16} className="text-muted-foreground" />
                )}
                <span className="text-sm capitalize">{currentRow.role}</span>
              </div>
            </div>
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
