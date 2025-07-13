"use client"

import { Row } from '@tanstack/react-table'
import { IconEdit, IconTrash, IconEye } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useUsers } from '../context/users-context'
import { User } from '../data/schema'

interface DataTableRowActionsProps {
  row: Row<User>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useUsers()
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setCurrentRow(row.original)
          setOpen('view')
        }}
        className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600 hover:border-blue-300"
      >
        <IconEye size={16} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setCurrentRow(row.original)
          setOpen('edit')
        }}
        className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:border-green-300"
      >
        <IconEdit size={16} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setCurrentRow(row.original)
          setOpen('delete')
        }}
        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:border-red-300"
      >
        <IconTrash size={16} />
      </Button>
    </div>
  )
}
