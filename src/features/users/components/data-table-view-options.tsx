import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { motion } from 'framer-motion'
import { IconSettings, IconColumns, IconEye, IconEyeOff } from '@tabler/icons-react'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const hiddenColumnsCount = table.getAllColumns().filter(col => !col.getIsVisible() && col.getCanHide()).length
  
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant='outline'
            size='sm'
            className='ml-auto hidden h-9 lg:flex gap-2 bg-background/50 border-border/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:border-primary/30 transition-all duration-200 relative'
          >
            <div className='flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-primary/10 to-primary/5'>
              <IconSettings className='h-3 w-3 text-primary' />
            </div>
            <span className='font-medium'>View</span>
            {hiddenColumnsCount > 0 && (
              <motion.div 
                className='absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className='text-xs font-bold text-primary-foreground'>{hiddenColumnsCount}</span>
              </motion.div>
            )}
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align='end' 
        className='w-[220px] bg-background/95 backdrop-blur-sm border-border/50 shadow-xl'
      >
        <DropdownMenuLabel className='flex items-center gap-2 text-sm font-semibold py-3'>
          <div className='flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-primary/10 to-primary/5'>
            <IconColumns className='h-3 w-3 text-primary' />
          </div>
          Column Visibility
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className='bg-border/50' />
        
        <div className='max-h-[300px] overflow-y-auto'>
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== 'undefined' && column.getCanHide()
            )
            .map((column) => {
              const isVisible = column.getIsVisible()
              const columnName = column.id === 'user' ? 'User Details' : 
                               column.id === 'fullName' ? 'Full Name' :
                               column.id === 'phoneNumber' ? 'Phone Number' :
                               column.id === 'createdAt' ? 'Date Joined' :
                               column.id.charAt(0).toUpperCase() + column.id.slice(1)
              
              return (
                <motion.div
                  key={column.id}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.1 }}
                >
                  <DropdownMenuCheckboxItem
                    className='capitalize px-3 py-2.5 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 transition-all duration-200 cursor-pointer'
                    checked={isVisible}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    <div className='flex items-center gap-3 w-full'>
                      <div className='flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-muted/50 to-muted/30'>
                        {isVisible ? (
                          <IconEye className='h-3 w-3 text-green-600 dark:text-green-400' />
                        ) : (
                          <IconEyeOff className='h-3 w-3 text-gray-400' />
                        )}
                      </div>
                      <span className='font-medium text-sm'>{columnName}</span>
                    </div>
                  </DropdownMenuCheckboxItem>
                </motion.div>
              )
            })}
        </div>
        
        {hiddenColumnsCount > 0 && (
          <>
            <DropdownMenuSeparator className='bg-border/50' />
            <div className='px-3 py-2 text-xs text-muted-foreground bg-gradient-to-r from-muted/20 to-transparent'>
              {hiddenColumnsCount} column{hiddenColumnsCount > 1 ? 's' : ''} hidden
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
