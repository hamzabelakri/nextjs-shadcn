"use client"

import { Row } from '@tanstack/react-table'
import { IconEdit, IconTrash, IconEye } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useRoles } from '../context/roles-context'
import { Role } from '../data/schema'

interface DataTableRowActionsProps {
  row: Row<Role>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useRoles()
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setCurrentRow(row.original)
          setOpen('view')
        }}
        className="h-8 w-8 p-0"
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
        className="h-8 w-8 p-0"
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
