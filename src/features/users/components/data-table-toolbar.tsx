import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { IconSearch, IconFilter, IconRefresh, IconSettings } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { userTypes } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'
import { motion } from 'framer-motion'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <motion.div 
      className='flex items-center justify-between p-6 bg-gradient-to-r from-background via-background to-muted/20 rounded-xl border border-border/50 shadow-sm backdrop-blur-sm'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='flex flex-1 flex-col-reverse items-start gap-y-4 sm:flex-row sm:items-center sm:space-x-4'>
        {/* Search Input */}
        <motion.div 
          className='relative flex-1 max-w-sm'
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className='absolute left-3 top-1/2 transform -translate-y-1/2'>
            <IconSearch className='h-4 w-4 text-muted-foreground' />
          </div>
          <Input
            placeholder='Search users by name, email, or username...'
            value={
              (table.getColumn('user')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('user')?.setFilterValue(event.target.value)
            }
            className='pl-10 h-10 bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-200 shadow-sm'
          />
        </motion.div>
        
        {/* Filters */}
        <motion.div 
          className='flex gap-x-2 items-center'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className='flex items-center gap-2 text-sm text-muted-foreground font-medium'>
            <IconFilter className='h-4 w-4' />
            <span className='hidden sm:inline'>Filters:</span>
          </div>
          
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title='Status'
              options={[
                { 
                  label: 'Active', 
                  value: 'active',
                  icon: () => <div className='w-2 h-2 rounded-full bg-green-500' />
                },
                { 
                  label: 'Inactive', 
                  value: 'inactive',
                  icon: () => <div className='w-2 h-2 rounded-full bg-gray-400' />
                },
                { 
                  label: 'Invited', 
                  value: 'invited',
                  icon: () => <div className='w-2 h-2 rounded-full bg-blue-500' />
                },
                { 
                  label: 'Suspended', 
                  value: 'suspended',
                  icon: () => <div className='w-2 h-2 rounded-full bg-red-500' />
                },
              ]}
            />
          )}
          
          {table.getColumn('role') && (
            <DataTableFacetedFilter
              column={table.getColumn('role')}
              title='Role'
              options={userTypes.map((t) => ({ ...t }))}
            />
          )}
          
          {isFiltered && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant='ghost'
                onClick={() => table.resetColumnFilters()}
                className='h-9 px-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200'
              >
                <IconRefresh className='mr-2 h-4 w-4' />
                Reset
                <Cross2Icon className='ml-2 h-4 w-4' />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* View Options */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='h-9 border-border/50 hover:bg-muted/50 transition-all duration-200'
          >
            <IconRefresh className='h-4 w-4 mr-2' />
            <span className='hidden sm:inline'>Refresh</span>
          </Button>
          <DataTableViewOptions table={table} />
        </div>
      </motion.div>
    </motion.div>
  )
}
