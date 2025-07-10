"use client"

import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'

export function TableLoadingState() {
  return (
    <div className='space-y-6'>
      {/* Toolbar Loading */}
      <motion.div 
        className='flex items-center justify-between p-6 bg-gradient-to-r from-background via-background to-muted/20 rounded-xl border border-border/50 shadow-sm backdrop-blur-sm'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className='flex flex-1 flex-col-reverse items-start gap-y-4 sm:flex-row sm:items-center sm:space-x-4'>
          <Skeleton className='h-10 w-[300px] rounded-lg' />
          <div className='flex gap-x-2'>
            <Skeleton className='h-9 w-[120px] rounded-lg' />
            <Skeleton className='h-9 w-[100px] rounded-lg' />
          </div>
        </div>
        <Skeleton className='h-9 w-[100px] rounded-lg' />
      </motion.div>

      {/* Table Loading */}
      <motion.div 
        className='rounded-xl border border-border/50 bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-sm shadow-lg overflow-hidden'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Header */}
        <div className='border-b border-border/30 bg-gradient-to-r from-muted/5 to-muted/10 p-4'>
          <div className='flex items-center space-x-4'>
            <Skeleton className='h-6 w-6 rounded' />
            <Skeleton className='h-6 w-[200px]' />
            <Skeleton className='h-6 w-[120px]' />
            <Skeleton className='h-6 w-[100px]' />
            <Skeleton className='h-6 w-[80px]' />
            <Skeleton className='h-6 w-[100px]' />
            <Skeleton className='h-6 w-[140px]' />
          </div>
        </div>

        {/* Rows */}
        <div className='p-4 space-y-3'>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className='flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/5 transition-colors'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Skeleton className='h-5 w-5 rounded' />
              <div className='flex items-center space-x-3'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-[180px]' />
                  <Skeleton className='h-3 w-[140px]' />
                </div>
              </div>
              <Skeleton className='h-8 w-[100px] rounded-full' />
              <Skeleton className='h-6 w-[80px]' />
              <Skeleton className='h-6 w-[90px]' />
              <Skeleton className='h-6 w-[80px]' />
              <div className='flex items-center space-x-1'>
                <Skeleton className='h-8 w-8 rounded' />
                <Skeleton className='h-8 w-8 rounded' />
                <Skeleton className='h-8 w-8 rounded' />
                <Skeleton className='h-8 w-8 rounded' />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pagination Loading */}
      <motion.div
        className='flex items-center justify-between p-4 bg-gradient-to-r from-background via-background to-muted/20 rounded-xl border border-border/50 shadow-sm backdrop-blur-sm'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className='flex items-center gap-2'>
          <Skeleton className='h-8 w-8 rounded-full' />
          <Skeleton className='h-4 w-[120px]' />
        </div>
        <div className='flex items-center space-x-6'>
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-4 w-[80px]' />
            <Skeleton className='h-9 w-[75px] rounded' />
          </div>
          <Skeleton className='h-4 w-[100px]' />
          <div className='flex items-center space-x-1'>
            <Skeleton className='h-9 w-9 rounded' />
            <Skeleton className='h-9 w-9 rounded' />
            <Skeleton className='h-9 w-9 rounded' />
            <Skeleton className='h-9 w-9 rounded' />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function TableEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center justify-center py-20 px-4'
    >
      <motion.div
        className='w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center mb-6 shadow-lg'
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg
          className='w-12 h-12 text-primary'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
            d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
          />
        </svg>
      </motion.div>
      
      <motion.div
        className='text-center space-y-4 max-w-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className='text-xl font-semibold text-foreground'>No users found</h3>
        <p className='text-muted-foreground leading-relaxed'>
          It looks like there are no users matching your current filters. Try adjusting your search criteria or add some new team members to get started.
        </p>
        
        <motion.div
          className='flex flex-wrap justify-center gap-2 pt-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.span 
            className='px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-sm font-medium'
            whileHover={{ scale: 1.05 }}
          >
            Clear filters
          </motion.span>
          <motion.span 
            className='px-3 py-1 rounded-full bg-gradient-to-r from-muted/20 to-muted/10 text-muted-foreground text-sm font-medium'
            whileHover={{ scale: 1.05 }}
          >
            Add users
          </motion.span>
          <motion.span 
            className='px-3 py-1 rounded-full bg-gradient-to-r from-muted/20 to-muted/10 text-muted-foreground text-sm font-medium'
            whileHover={{ scale: 1.05 }}
          >
            Import data
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
