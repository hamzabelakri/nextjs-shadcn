'use client'

import { useState } from 'react'
import { IconAlertTriangle, IconTrash, IconExclamationMark, IconUser } from '@tabler/icons-react'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { User } from '../data/schema'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

// Helper function to generate avatar fallback
const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')
  const isValid = value.trim() === currentRow.username

  const handleDelete = () => {
    if (!isValid) return

    onOpenChange(false)
    showSubmittedData(currentRow, 'The following user has been deleted:')
    setValue('')
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setValue('')
    }
    onOpenChange(newOpen)
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={handleOpenChange}
      handleConfirm={handleDelete}
      disabled={!isValid}
      title={
        <motion.div 
          className='flex items-center gap-3 text-red-600 dark:text-red-400'
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30'>
            <IconTrash className='h-5 w-5 text-red-600 dark:text-red-400' />
          </div>
          <span className='text-xl font-semibold'>Delete User</span>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <IconExclamationMark className='h-5 w-5 text-red-500' />
          </motion.div>
        </motion.div>
      }
      desc={
        <motion.div 
          className='space-y-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* User Info Card */}
          <div className='p-4 rounded-lg bg-gradient-to-r from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/20 border border-red-200 dark:border-red-800/30'>
            <div className='flex items-center gap-4'>
              <Avatar className='h-12 w-12 ring-2 ring-red-200 dark:ring-red-800'>
                <AvatarImage src={`https://avatar.vercel.sh/${currentRow.username}`} alt={`${currentRow.firstName} ${currentRow.lastName}`} />
                <AvatarFallback className='bg-gradient-to-br from-red-200 to-red-300 dark:from-red-800 dark:to-red-700 text-red-700 dark:text-red-200 font-semibold'>
                  {getInitials(currentRow.firstName, currentRow.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1 space-y-1'>
                <div className='flex items-center gap-2'>
                  <h3 className='font-semibold text-foreground'>{currentRow.firstName} {currentRow.lastName}</h3>
                  <Badge variant="outline" className='text-xs bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300'>
                    @{currentRow.username}
                  </Badge>
                </div>
                <p className='text-sm text-muted-foreground'>{currentRow.email}</p>
                <div className='flex items-center gap-2'>
                  <IconUser className='h-3 w-3 text-muted-foreground' />
                  <span className='text-xs font-medium capitalize text-muted-foreground'>{currentRow.role}</span>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <p className='text-sm leading-relaxed text-muted-foreground'>
              You are about to permanently delete{' '}
              <span className='font-semibold text-foreground'>{currentRow.firstName} {currentRow.lastName}</span>{' '}
              from the system. This action will remove all associated data and{' '}
              <span className='font-semibold text-red-600 dark:text-red-400'>cannot be undone</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className='space-y-2'
          >
            <Label className='text-sm font-semibold flex items-center gap-2'>
              <IconAlertTriangle className='h-4 w-4 text-amber-500' />
              Confirm deletion by typing the username:
            </Label>
            <div className='relative'>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={currentRow.username}
                className={`transition-all duration-200 ${
                  value && !isValid 
                    ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20 focus:border-red-400 dark:focus:border-red-600' 
                    : value && isValid 
                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/20 focus:border-green-400 dark:focus:border-green-600'
                    : 'border-border'
                }`}
              />
              <AnimatePresence>
                {value && (
                  <motion.div
                    className='absolute right-2 top-1/2 transform -translate-y-1/2'
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    {isValid ? (
                      <div className='w-5 h-5 rounded-full bg-green-500 flex items-center justify-center'>
                        <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                        </svg>
                      </div>
                    ) : (
                      <div className='w-5 h-5 rounded-full bg-red-500 flex items-center justify-center'>
                        <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Alert variant='destructive' className='border-red-200 dark:border-red-800/50 bg-gradient-to-r from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/20'>
              <IconAlertTriangle className='h-4 w-4' />
              <AlertTitle className='font-semibold'>Danger Zone</AlertTitle>
              <AlertDescription className='text-sm'>
                This operation cannot be rolled back. All user data, permissions, and associated records will be permanently removed.
              </AlertDescription>
            </Alert>
          </motion.div>
        </motion.div>
      }
      confirmText='Delete User'
      destructive
    />
  )
}
