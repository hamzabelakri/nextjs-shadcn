"use client"

import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import LongText from '@/components/long-text'
import { roleStatuses } from '../data/data'
import { Role } from '../data/schema'
import { DataTableColumnHeader, DataTableRowActions } from '@/components/shared/react-table'
import { useRolesStore } from '@/store/roles-store'
import { useTranslation } from 'react-i18next'

export function useRoleColumns(): ColumnDef<Role>[] {
  const { t } = useTranslation();
  
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('role_name')} />
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
        <DataTableColumnHeader column={column} title={t('description')} />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-48'>{row.getValue('description')}</LongText>
      ),
    },
    {
      accessorKey: 'userCount',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('user_count')} />
      ),
      cell: ({ row }) => (
        <div className='text-center'>{row.getValue('userCount')}</div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'permissions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('permissions')} />
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
        <DataTableColumnHeader column={column} title={t('status')} />
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
        <DataTableColumnHeader column={column} title={t('actions')} className="flex justify-end mr-4"/>
      ),
      cell: ({ row }) => {
        const { setOpenRole, setCurrentRow } = useRolesStore()
    
        return (
          <DataTableRowActions
            row={row}
            className="justify-end mr-4"
            onView={(data) => {
              setCurrentRow(data as Role);
              setOpenRole("view");
            }}
            onEdit={(data) => {
              setCurrentRow(data as Role);
              setOpenRole("edit");
            }}
            onDelete={(data) => {
              setCurrentRow(data as Role);
              setOpenRole("delete");
            }}
          />
        );
      },
      enableSorting: false,
    },
  ];
}

// Export a static version for backwards compatibility
export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Role Name' />
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
  // ... other static columns would go here, but we'll use the hook version
];
