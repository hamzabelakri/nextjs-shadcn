import * as React from 'react'
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { motion, AnimatePresence } from 'framer-motion'
import { IconCheck, IconX } from '@tabler/icons-react'

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string | React.ReactNode
    value: string
    icon?: React.ComponentType<{ className?: string }> | (() => React.ReactNode)
  }[]
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant='outline' 
            size='sm' 
            className='h-9 border-dashed border-border/50 bg-background/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:border-primary/30 transition-all duration-200 relative'
          >
            <PlusCircledIcon className='h-4 w-4 text-primary' />
            <span className='font-medium'>{title}</span>
            
            <AnimatePresence>
              {selectedValues?.size > 0 && (
                <motion.div
                  className='flex items-center'
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Separator orientation='vertical' className='mx-2 h-4 bg-border/50' />
                  <Badge
                    variant='secondary'
                    className='rounded-full px-2 py-0.5 font-medium text-xs bg-gradient-to-r from-primary/10 to-primary/5 text-primary lg:hidden'
                  >
                    {selectedValues.size}
                  </Badge>
                  <div className='hidden space-x-1 lg:flex'>
                    {selectedValues.size > 2 ? (
                      <Badge
                        variant='secondary'
                        className='rounded-full px-2 py-0.5 font-medium text-xs bg-gradient-to-r from-primary/10 to-primary/5 text-primary'
                      >
                        {selectedValues.size} selected
                      </Badge>
                    ) : (
                      options
                        .filter((option) => selectedValues.has(option.value))
                        .map((option) => (
                          <motion.div
                            key={option.value}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.1 }}
                          >
                            <Badge
                              variant='secondary'
                              className='rounded-full px-2 py-0.5 font-medium text-xs bg-gradient-to-r from-primary/10 to-primary/5 text-primary'
                            >
                              {typeof option.label === 'string' ? option.label : option.value}
                            </Badge>
                          </motion.div>
                        ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </PopoverTrigger>
      
      <PopoverContent 
        className='w-[220px] p-0 bg-background/95 backdrop-blur-sm border-border/50 shadow-xl' 
        align='start'
      >
        <Command className='bg-transparent'>
          <CommandInput 
            placeholder={`Search ${title?.toLowerCase()}...`}
            className='border-0 focus:ring-0'
          />
          <CommandList>
            <CommandEmpty className='py-6 text-center text-sm text-muted-foreground'>
              No results found.
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <motion.div
                    key={option.value}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.1 }}
                  >
                    <CommandItem
                      onSelect={() => {
                        if (isSelected) {
                          selectedValues.delete(option.value)
                        } else {
                          selectedValues.add(option.value)
                        }
                        const filterValues = Array.from(selectedValues)
                        column?.setFilterValue(
                          filterValues.length ? filterValues : undefined
                        )
                      }}
                      className='px-3 py-2.5 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 transition-all duration-200 cursor-pointer'
                    >
                      <div
                        className={cn(
                          'flex h-5 w-5 items-center justify-center rounded-md border-2 mr-3 transition-all duration-200',
                          isSelected
                            ? 'bg-gradient-to-r from-primary to-primary/80 border-primary text-primary-foreground shadow-sm'
                            : 'border-muted-foreground/30 hover:border-primary/50'
                        )}
                      >
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ duration: 0.1 }}
                            >
                              <IconCheck className='h-3 w-3' />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div className='flex items-center gap-2 flex-1'>
                        {option.icon && (
                          <div className='flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-muted/50 to-muted/30'>
                            {React.isValidElement(option.icon) ? 
                              option.icon : 
                              typeof option.icon === 'function' ? 
                                React.createElement(option.icon as React.ComponentType<{ className?: string }>, { className: 'h-3 w-3 text-muted-foreground' }) :
                                null
                            }
                          </div>
                        )}
                        <span className='font-medium text-sm flex-1'>
                          {typeof option.label === 'string' ? option.label : option.label}
                        </span>
                      </div>
                      
                      {facets?.get(option.value) && (
                        <Badge 
                          variant="outline" 
                          className='ml-auto h-5 px-1.5 text-xs font-mono bg-muted/30 border-muted-foreground/20'
                        >
                          {facets.get(option.value)}
                        </Badge>
                      )}
                    </CommandItem>
                  </motion.div>
                )
              })}
            </CommandGroup>
            
            <AnimatePresence>
              {selectedValues.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CommandSeparator className='bg-border/50' />
                  <CommandGroup>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.1 }}
                    >
                      <CommandItem
                        onSelect={() => column?.setFilterValue(undefined)}
                        className='justify-center text-center py-2.5 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 dark:hover:from-red-950/50 dark:hover:to-red-900/50 transition-all duration-200 cursor-pointer text-red-600 dark:text-red-400 font-medium'
                      >
                        <IconX className='h-4 w-4 mr-2' />
                        Clear filters
                      </CommandItem>
                    </motion.div>
                  </CommandGroup>
                </motion.div>
              )}
            </AnimatePresence>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
