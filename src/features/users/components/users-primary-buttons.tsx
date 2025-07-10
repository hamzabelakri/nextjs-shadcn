"use client"

import { IconMailPlus, IconUserPlus, IconSparkles } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useUsers } from '../context/users-context'
import { motion } from 'framer-motion'

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers()
  
  return (
    <motion.div 
      className='flex gap-3'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button
          variant='outline'
          className='relative group space-x-2 h-11 px-6 bg-gradient-to-r from-background via-background to-muted/20 border-border/50 hover:border-primary/30 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 transition-all duration-300 shadow-sm hover:shadow-md'
          onClick={() => setOpen('invite')}
        >
          <span className='relative z-10 font-medium'>Invite User</span>
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 15 }}
            transition={{ duration: 0.2 }}
          >
            <IconMailPlus size={18} className='text-primary group-hover:text-primary/80 transition-colors duration-200' />
          </motion.div>
          <div className='absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        </Button>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button 
          className='relative group space-x-2 h-11 px-6 bg-gradient-to-r from-primary via-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 border-0'
          onClick={() => setOpen('add')}
        >
          <motion.div
            className='absolute inset-0 rounded-md bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          />
          <span className='relative z-10 font-semibold'>Add User</span>
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 15 }}
            transition={{ duration: 0.2 }}
            className='relative z-10'
          >
            <IconUserPlus size={18} />
          </motion.div>
          
          {/* Sparkle animation */}
          <motion.div
            className='absolute top-1 right-1'
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180]
            }}
            transition={{ 
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <IconSparkles size={12} className='text-primary-foreground/60' />
          </motion.div>
        </Button>
      </motion.div>
    </motion.div>
  )
}
