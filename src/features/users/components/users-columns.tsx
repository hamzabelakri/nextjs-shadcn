"use client"

import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import LongText from '@/components/long-text'
import { callTypes, userTypes } from '../data/data'
import { User } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { motion } from 'framer-motion'
import { IconMail, IconPhone, IconCalendar } from '@tabler/icons-react'

// Helper function to generate avatar fallback
const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

// Helper function to generate gradient avatar colors
const getAvatarColor = (name: string) => {
  const colors = [
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600', 
    'from-green-400 to-green-600',
    'from-orange-400 to-orange-600',
    'from-pink-400 to-pink-600',
    'from-indigo-400 to-indigo-600',
    'from-red-400 to-red-600',
    'from-teal-400 to-teal-600'
  ]
  const hash = name.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  return colors[Math.abs(hash) % colors.length]
}

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
          className='translate-y-[2px] data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-primary/80'
        />
      </motion.div>
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 w-[50px]',
        'bg-background/95 backdrop-blur-sm transition-colors duration-200 group-hover/row:bg-muted/30 group-data-[state=selected]/row:bg-primary/5'
      ),
    },
    cell: ({ row }) => (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.1 }}
      >
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
          className='translate-y-[2px] data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-primary/80'
        />
      </motion.div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'user',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='User' />
    ),
    cell: ({ row }) => {
      const { firstName, lastName, username, email } = row.original
      const initials = getInitials(firstName, lastName)
      const avatarColor = getAvatarColor(firstName + lastName)
      
      return (
        <motion.div 
          className='flex items-center space-x-3 py-1'
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar className='h-10 w-10 ring-2 ring-background shadow-md'>
              <AvatarImage src={`https://avatar.vercel.sh/${username}`} alt={`${firstName} ${lastName}`} />
              <AvatarFallback className={`bg-gradient-to-br ${avatarColor} text-white font-semibold text-sm`}>
                {initials}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <div className='flex flex-col space-y-1 min-w-0'>
            <div className='flex items-center space-x-2'>
              <p className='font-semibold text-sm leading-none truncate'>
                {firstName} {lastName}
              </p>
              <Badge variant="secondary" className='text-xs px-2 py-0.5 bg-muted/50 text-muted-foreground'>
                @{username}
              </Badge>
            </div>
            <div className='flex items-center space-x-1 text-xs text-muted-foreground'>
              <IconMail className='h-3 w-3' />
              <span className='truncate'>{email}</span>
            </div>
          </div>
        </motion.div>
      )
    },
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background/95 backdrop-blur-sm transition-colors duration-200 group-hover/row:bg-muted/30 group-data-[state=selected]/row:bg-primary/5',
        'sticky left-[50px] md:table-cell min-w-[280px]'
      ),
    },
    filterFn: (row, id, value) => {
      const { firstName, lastName, username, email } = row.original
      const searchValue = value.toLowerCase()
      return (
        firstName.toLowerCase().includes(searchValue) ||
        lastName.toLowerCase().includes(searchValue) ||
        username.toLowerCase().includes(searchValue) ||
        email.toLowerCase().includes(searchValue) ||
        `${firstName} ${lastName}`.toLowerCase().includes(searchValue)
      )
    },
    enableHiding: false,
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const nameA = `${rowA.original.firstName} ${rowA.original.lastName}`.toLowerCase()
      const nameB = `${rowB.original.firstName} ${rowB.original.lastName}`.toLowerCase()
      return nameA.localeCompare(nameB)
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Contact' />
    ),
    cell: ({ row }) => (
      <motion.div 
        className='flex items-center space-x-2'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30'>
          <IconPhone className='h-4 w-4 text-green-600 dark:text-green-400' />
        </div>
        <span className='font-mono text-sm'>{row.getValue('phoneNumber')}</span>
      </motion.div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const { status } = row.original
      const badgeColor = callTypes.get(status)
      
      return (
        <motion.div 
          className='flex space-x-2'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <Badge 
            variant='outline' 
            className={cn(
              'capitalize font-medium px-3 py-1 rounded-full shadow-sm border-2 transition-all duration-200',
              badgeColor,
              status === 'active' && 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700 dark:from-green-950/50 dark:to-emerald-950/50 dark:border-green-800 dark:text-green-300',
              status === 'inactive' && 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 text-gray-700 dark:from-gray-950/50 dark:to-slate-950/50 dark:border-gray-800 dark:text-gray-300',
              status === 'invited' && 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 text-blue-700 dark:from-blue-950/50 dark:to-cyan-950/50 dark:border-blue-800 dark:text-blue-300',
              status === 'suspended' && 'bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-700 dark:from-red-950/50 dark:to-rose-950/50 dark:border-red-800 dark:text-red-300'
            )}
          >
            <div className={cn(
              'w-2 h-2 rounded-full mr-2',
              status === 'active' && 'bg-green-500 animate-pulse',
              status === 'inactive' && 'bg-gray-400',
              status === 'invited' && 'bg-blue-500 animate-pulse',
              status === 'suspended' && 'bg-red-500'
            )} />
            {status}
          </Badge>
        </motion.div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: true,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Role' />
    ),
    cell: ({ row }) => {
      const { role } = row.original
      const userType = userTypes.find(({ value }) => value === role)

      if (!userType) {
        return null
      }

      return (
        <motion.div 
          className='flex items-center gap-x-3 p-2 rounded-lg bg-gradient-to-r from-muted/30 to-transparent hover:from-muted/50 hover:to-muted/20 transition-all duration-200'
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          {userType.icon && (
            <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary/10 to-primary/5'>
              <userType.icon size={16} className='text-primary' />
            </div>
          )}
          <span className='text-sm font-medium capitalize'>{role}</span>
        </motion.div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Joined' />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
      
      return (
        <motion.div 
          className='flex items-center space-x-2 text-sm text-muted-foreground'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30'>
            <IconCalendar className='h-4 w-4 text-blue-600 dark:text-blue-400' />
          </div>
          <span className='font-medium'>{formattedDate}</span>
        </motion.div>
      )
    },
    enableSorting: true,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Actions' />
    ),
    cell: DataTableRowActions,
    meta: {
      className: 'w-[140px] text-right pr-6'
    },
    enableHiding: false,
    enableSorting: false,
  },
]
