"use client"

import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import LongText from '@/components/long-text'
import { roleStatuses } from '../data/data'
import { Role } from '../data/schema'
import { useRoles } from '../context/roles-context'
import { DataTableColumnHeader, DataTableRowActions } from '@/components/shared/react-table'

export const columns: ColumnDef<Role>[] = [
   {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='name' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-36'>{row.getValue('name')}</LongText>
      ),
      meta: {
        className: cn(
          'sticky left-4 md:table-cell'
        ),
      },
      enableHiding: false,
    },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-48'>{row.getValue('description')}</LongText>
    ),
  },
  {
    accessorKey: 'userCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Users' />
    ),
    cell: ({ row }) => (
      <div className='text-center'>{row.getValue('userCount')}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'permissions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Permissions' />
    ),
    cell: ({ row }) => {
      const permissions = row.getValue('permissions') as string[]
      return (
        <div className='flex flex-wrap gap-1'>
          {permissions.slice(0, 2).map((permission) => (
            <Badge key={permission} variant='secondary' className='text-xs'>
              {permission.replace('.', ':')}
            </Badge>
          ))}
          {permissions.length > 2 && (
            <Badge variant='outline' className='text-xs'>
              +{permissions.length - 2} more
            </Badge>
          )}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const { status } = row.original
      const badgeColor = roleStatuses.get(status)
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.getValue('status')}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Actions' className="flex justify-end mr-4"/>
    ),
    cell: ({ row }) => {
  const { setOpenRole, setCurrentRow } = useRoles()
    
          return (
            <DataTableRowActions
              row={row}
              className="justify-end mr-4"
              onView={(data) => {
                setCurrentRow(data);
                setOpenRole("view");
              }}
              onEdit={(data) => {
                setCurrentRow(data);
                setOpenRole("edit");
              }}
              onDelete={(data) => {
                setCurrentRow(data);
                setOpenRole("delete");
              }}
            />
          );
        },
    enableSorting: false,
    enableHiding: false,
  },
]
