'use client'

import { useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { User } from '../data/schema'
import { useDeleteUser } from '@/hooks/use-users'
import { useToast } from '@/components/ui/use-toast'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UsersDeleteModal({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')
  const deleteUserMutation = useDeleteUser()
  const { toast } = useToast()

  const handleDelete = async () => {
    if (value.trim() !== currentRow.username) return

    try {
      await deleteUserMutation.mutateAsync(parseInt(currentRow.id))
      
      toast({
        title: "Success",
        description: `User ${currentRow.username} has been deleted successfully`,
      })
      
      onOpenChange(false)
      setValue('') // Reset the input
    } catch (error: any) {
      console.error('Failed to delete user:', error)
      toast({
        title: "Error",
        description: error?.response?.data?.message || error?.message || "Failed to delete user",
        variant: "destructive",
      })
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.username}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='stroke-destructive mr-1 inline-block'
            size={18}
          />{' '}
          Delete User
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.username}</span>?
            <br />
            This action will permanently remove the user with the role of{' '}
            <span className='font-bold'>
              {(currentRow.role || 'USER').toUpperCase()}
            </span>{' '}
            from the system. This cannot be undone.
          </p>

          <Label className='my-2'>
            Username:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter username to confirm deletion.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
