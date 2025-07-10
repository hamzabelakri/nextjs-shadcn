"use client"

import { Row } from '@tanstack/react-table'
import { IconEdit, IconTrash, IconEye } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useUsers } from '../context/users-context'
import { User } from '../data/schema'
import { motion } from 'framer-motion'

interface DataTableRowActionsProps {
  row: Row<User>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useUsers()
  
  return (
    <div className='flex items-center justify-center gap-1.5 w-full'>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className='flex items-center gap-1.5'
      >
        {/* View Action */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant='ghost'
            size='sm'
            className='h-8 w-8 p-0 rounded-full hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 transition-all duration-200 border border-transparent hover:border-blue-200 dark:hover:border-blue-800'
            onClick={() => {
              console.log('View user:', row.original)
            }}
            title='View Details'
          >
            <IconEye className='h-4 w-4' />
          </Button>
        </motion.div>

        {/* Edit Action */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant='ghost'
            size='sm'
            className='h-8 w-8 p-0 rounded-full hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-950/50 dark:hover:text-amber-400 transition-all duration-200 border border-transparent hover:border-amber-200 dark:hover:border-amber-800'
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('edit')
            }}
            title='Edit User'
          >
            <IconEdit className='h-4 w-4' />
          </Button>
        </motion.div>

        {/* Delete Action */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant='ghost'
            size='sm'
            className='h-8 w-8 p-0 rounded-full hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-400 transition-all duration-200 border border-transparent hover:border-red-200 dark:hover:border-red-800'
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('delete')
            }}
            title='Delete User'
          >
            <IconTrash className='h-4 w-4' />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
