"use client"

import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import LongText from '@/components/long-text'
import { getPermissionLabel } from '@/utils/permissions'
import { Role } from '@/lib/api'
import { DataTableColumnHeader, DataTableRowActions } from '@/components/shared/react-table'
import { useRolesStore } from '@/store/roles-store'
import { useTranslation } from 'react-i18next'
import { usePermissions } from '@/hooks/use-permissions'

export const useRolesColumns = (): ColumnDef<Role>[] => {
  const { t } = useTranslation();
  const { roles: rolesPermissions } = usePermissions();
  
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
      accessorKey: 'user_count',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Users" />
      ),
      cell: ({ row }) => (
        <div className='text-center'>{row.getValue('user_count')}</div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'permissions',
      header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('permissions')} />
    ),
      cell: ({ row }) => {
        const permissions = row.original.permissions || {};
        
        // Convert permissions object to array of permission labels
        const permissionEntries = Object.entries(permissions).map(([module, permissionStr]) => ({
          module,
          label: getPermissionLabel(permissionStr as string)
        }));
        
        return (
          <div className='flex flex-wrap gap-1'>
            {permissionEntries.slice(0, 2).map(({ module, label }) => (
              <Badge key={module} variant='secondary' className='text-xs'>
                {`${module}: ${label}`}
              </Badge>
            ))}
            {permissionEntries.length > 2 && (
              <Badge variant='outline' className='text-xs'>
                +{permissionEntries.length - 2} more
              </Badge>
            )}
          </div>
        )
      },
      enableSorting: false,
    },
    {
      accessorKey: 'is_active',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('status')} />
      ),
      cell: ({ row }) => {
        const isActive = row.getValue('is_active') as boolean
        const statusText = isActive ? 'active' : 'inactive'
        const badgeColor = isActive ? 'text-green-600' : 'text-red-600'
        return (
          <div className='flex space-x-2'>
            <Badge variant='outline' className={cn('capitalize', badgeColor)}>
              {statusText}
            </Badge>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        const isActive = row.getValue(id) as boolean
        const statusText = isActive ? 'active' : 'inactive'
        return value.includes(statusText)
      },
      enableHiding: true,
      enableSorting: true,
    },
    {
      id: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" className="flex justify-end mr-4"/>
      ),
      cell: ({ row }) => {
        const { setOpenRole, setCurrentRow } = useRolesStore()
      
        return (
          <DataTableRowActions
            row={row}
            className="justify-end mr-4"
            hideView={!rolesPermissions.canRead}
            hideEdit={!rolesPermissions.canUpdate}
            hideDelete={!rolesPermissions.canDelete}
            onView={rolesPermissions.canRead ? (data) => {
              setCurrentRow(data);
              setOpenRole("view");
            } : undefined}
            onEdit={rolesPermissions.canUpdate ? (data) => {
              setCurrentRow(data);
              setOpenRole("edit");
            } : undefined}
            onDelete={rolesPermissions.canDelete ? (data) => {
              setCurrentRow(data);
              setOpenRole("delete");
            } : undefined}
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
};
