import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { IconUsers, IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()
  const selectedRows = table.getFilteredSelectedRowModel().rows.length
  const totalRows = table.getFilteredRowModel().rows.length
  
  return (
    <motion.div
      className='flex items-center justify-between p-4 bg-gradient-to-r from-background via-background to-muted/20 rounded-xl border border-border/50 shadow-sm backdrop-blur-sm'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Selection Info */}
      <motion.div 
        className='flex items-center gap-2 text-sm text-muted-foreground'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary/10 to-primary/5'>
          <IconUsers className='h-4 w-4 text-primary' />
        </div>
        <span className='hidden sm:inline font-medium'>
          {selectedRows > 0 ? (
            <span>
              <span className='text-primary font-semibold'>{selectedRows}</span> of{' '}
              <span className='font-semibold'>{totalRows}</span> users selected
            </span>
          ) : (
            <span>
              <span className='font-semibold'>{totalRows}</span> users total
            </span>
          )}
        </span>
      </motion.div>

      <div className='flex items-center space-x-6'>
        {/* Rows per page */}
        <div 
          className='flex items-center space-x-2'
        >
          <p className='hidden text-sm font-medium text-muted-foreground sm:block'>
            Rows per page
          </p>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
            className='h-8 w-[70px] bg-background/50 border border-border/50 rounded-md px-2 text-sm hover:bg-background transition-all duration-200 focus:border-primary/50 focus:outline-none'
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        {/* Page info */}
        <motion.div 
          className='flex items-center justify-center min-w-[140px] text-sm font-medium'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className='flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-muted/30 to-muted/10'>
            <span className='text-muted-foreground'>Page</span>
            <span className='text-primary font-semibold'>{currentPage}</span>
            <span className='text-muted-foreground'>of</span>
            <span className='font-semibold'>{totalPages}</span>
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <motion.div 
          className='flex items-center space-x-1'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant='outline'
              className='hidden h-9 w-9 p-0 lg:flex bg-background/50 border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>Go to first page</span>
              <IconChevronsLeft className='h-4 w-4' />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant='outline'
              className='h-9 w-9 p-0 bg-background/50 border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>Go to previous page</span>
              <IconChevronLeft className='h-4 w-4' />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant='outline'
              className='h-9 w-9 p-0 bg-background/50 border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>Go to next page</span>
              <IconChevronRight className='h-4 w-4' />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant='outline'
              className='hidden h-9 w-9 p-0 lg:flex bg-background/50 border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>Go to last page</span>
              <IconChevronsRight className='h-4 w-4' />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
