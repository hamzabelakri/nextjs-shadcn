import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from './data-table-view-options'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Search logs...'
          value={(table.getColumn('description')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('description')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('action') && (
            <Select
              value={(table.getColumn('action')?.getFilterValue() as string) || 'all'}
              onValueChange={(value) =>
                table.getColumn('action')?.setFilterValue(value === 'all' ? '' : value)
              }
            >
              <SelectTrigger className='h-8 w-[120px]'>
                <SelectValue placeholder='Action' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Actions</SelectItem>
                <SelectItem value='create'>Create</SelectItem>
                <SelectItem value='update'>Update</SelectItem>
                <SelectItem value='delete'>Delete</SelectItem>
                <SelectItem value='view'>View</SelectItem>
                <SelectItem value='login'>Login</SelectItem>
                <SelectItem value='logout'>Logout</SelectItem>
              </SelectContent>
            </Select>
          )}
          {table.getColumn('entity') && (
            <Select
              value={(table.getColumn('entity')?.getFilterValue() as string) || 'all'}
              onValueChange={(value) =>
                table.getColumn('entity')?.setFilterValue(value === 'all' ? '' : value)
              }
            >
              <SelectTrigger className='h-8 w-[120px]'>
                <SelectValue placeholder='Entity' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Entities</SelectItem>
                <SelectItem value='user'>User</SelectItem>
                <SelectItem value='role'>Role</SelectItem>
                <SelectItem value='permission'>Permission</SelectItem>
                <SelectItem value='settings'>Settings</SelectItem>
                <SelectItem value='session'>Session</SelectItem>
              </SelectContent>
            </Select>
          )}
          {isFiltered && (
            <Button
              variant='ghost'
              onClick={() => table.resetColumnFilters()}
              className='h-8 px-2 lg:px-3'
            >
              Reset
              <Cross2Icon className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>
      </div>
      <div className='flex items-center gap-2'>
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <Badge variant='secondary' className='text-xs'>
            {table.getFilteredSelectedRowModel().rows.length} selected
          </Badge>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
