import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { motion } from 'framer-motion'
import { IconSortAscending, IconSortDescending, IconSelector, IconEyeOff } from '@tabler/icons-react'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div className={cn('font-semibold text-muted-foreground', className)}>
        {title}
      </div>
    )
  }

  const sortDirection = column.getIsSorted()

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant='ghost'
              size='sm'
              className='data-[state=open]:bg-muted/50 -ml-3 h-9 px-3 font-semibold text-foreground hover:bg-gradient-to-r hover:from-muted/30 hover:to-muted/10 transition-all duration-200 group'
            >
              <span className='group-hover:text-primary transition-colors duration-200'>
                {title}
              </span>
              <motion.div
                className='ml-2'
                animate={{ 
                  rotate: sortDirection ? (sortDirection === 'asc' ? 0 : 180) : 0,
                  scale: sortDirection ? 1.1 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                {sortDirection === 'desc' ? (
                  <IconSortDescending className='h-4 w-4 text-primary' />
                ) : sortDirection === 'asc' ? (
                  <IconSortAscending className='h-4 w-4 text-primary' />
                ) : (
                  <IconSelector className='h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-200' />
                )}
              </motion.div>
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          align='start' 
          className='bg-background/95 backdrop-blur-sm border-border/50 shadow-xl'
        >
          <DropdownMenuItem 
            onClick={() => column.toggleSorting(false)}
            className='hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 dark:hover:from-green-950/50 dark:hover:to-green-900/50 transition-all duration-200 cursor-pointer'
          >
            <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 mr-3'>
              <IconSortAscending className='h-4 w-4 text-green-600 dark:text-green-400' />
            </div>
            <span className='font-medium'>Sort Ascending</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => column.toggleSorting(true)}
            className='hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-950/50 dark:hover:to-blue-900/50 transition-all duration-200 cursor-pointer'
          >
            <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 mr-3'>
              <IconSortDescending className='h-4 w-4 text-blue-600 dark:text-blue-400' />
            </div>
            <span className='font-medium'>Sort Descending</span>
          </DropdownMenuItem>
          
          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator className='bg-border/50' />
              <DropdownMenuItem 
                onClick={() => column.toggleVisibility(false)}
                className='hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-950/50 dark:hover:to-gray-900/50 transition-all duration-200 cursor-pointer'
              >
                <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900/30 dark:to-gray-800/30 mr-3'>
                  <IconEyeOff className='h-4 w-4 text-gray-600 dark:text-gray-400' />
                </div>
                <span className='font-medium'>Hide Column</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
