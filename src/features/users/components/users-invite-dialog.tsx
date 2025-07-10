"use client"

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconMailPlus, IconSend, IconUser, IconUserCheck, IconSparkles } from '@tabler/icons-react'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { userTypes } from '../data/data'
import { motion } from 'framer-motion'

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Email is invalid.' }),
  role: z.string().min(1, { message: 'Role is required.' }),
  desc: z.string().optional(),
})
type UserInviteForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsersInviteDialog({ open, onOpenChange }: Props) {
  const form = useForm<UserInviteForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', role: '', desc: '' },
  })

  const onSubmit = (values: UserInviteForm) => {
    form.reset()
    showSubmittedData(values)
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          form.reset()
        }
        onOpenChange(isOpen)
      }}
    >
      <DialogContent className='sm:max-w-lg max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] bg-gradient-to-br from-background/95 via-background/90 to-muted/10 border-border/30 shadow-2xl backdrop-blur-xl overflow-hidden relative data-[state=open]:duration-300 data-[state=closed]:duration-200'>
        {/* Subtle background pattern */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.01] pointer-events-none' />
        <div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent' />
        
        <div className='relative z-10 space-y-6'>          <DialogHeader className='text-left space-y-3 pb-6'>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <DialogTitle className='flex items-center gap-3 text-xl'>
                <div className='flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/5'>
                  <IconMailPlus className='h-5 w-5 text-primary' />
                </div>
                Invite Team Member
                <motion.div
                  animate={{ 
                    rotate: [0, 15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <IconSparkles className='h-4 w-4 text-primary/60' />
                </motion.div>
              </DialogTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <DialogDescription className='text-muted-foreground leading-relaxed'>
                Send a personalized invitation to expand your team. Choose their role to define access permissions and add a welcoming message.
              </DialogDescription>
            </motion.div>
          </DialogHeader>
                    <Form {...form}>
            <motion.form
              id='user-invite-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6'
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem className='space-y-2'>
                        <FormLabel className='text-sm font-semibold flex items-center gap-2'>
                          <IconUser className='h-4 w-4 text-primary' />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <motion.div 
                            className='relative'
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input
                              type='email'
                              placeholder='colleague@company.com'
                              {...field}
                              className='pl-12 h-12 bg-gradient-to-r from-background/60 via-background/50 to-background/60 border-border/50 hover:border-primary/30 focus:border-primary/50 focus:bg-background transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm'
                            />
                            <motion.div
                              className='absolute left-4 top-1/2 transform -translate-y-1/2'
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <IconMailPlus className='h-4 w-4 text-primary/70' />
                            </motion.div>
                          </motion.div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name='role'
                    render={({ field }) => (
                      <FormItem className='space-y-2'>
                        <FormLabel className='text-sm font-semibold flex items-center gap-2'>
                          <IconUserCheck className='h-4 w-4 text-primary' />
                          Role & Permissions
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className='h-12 bg-gradient-to-r from-background/60 via-background/50 to-background/60 border-border/50 hover:border-primary/30 focus:border-primary/50 focus:bg-background transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm'>
                              <SelectValue placeholder='Choose the perfect role for your new team member' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className='bg-background/98 backdrop-blur-xl border-border/50 shadow-2xl max-h-[320px] overflow-hidden'>
                            <div className='p-2 space-y-1'>
                              {userTypes.map(({ label, value, icon: Icon }, index) => (
                                <motion.div
                                  key={value}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.2, delay: index * 0.05 }}
                                >
                                  <SelectItem 
                                    value={value}
                                    className='group hover:bg-gradient-to-r hover:from-primary/8 hover:via-primary/5 hover:to-primary/8 focus:bg-gradient-to-r focus:from-primary/10 focus:via-primary/8 focus:to-primary/10 transition-all duration-300 cursor-pointer px-4 py-4 my-1 rounded-lg border border-transparent hover:border-primary/10 hover:shadow-lg backdrop-blur-sm relative overflow-hidden'
                                  >
                                    <div className='flex items-center gap-4 w-full relative z-10'>
                                      <motion.div 
                                        className='flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300'
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                      >
                                        <Icon className='h-5 w-5 text-primary group-hover:text-primary/80 transition-colors duration-300' />
                                      </motion.div>
                                      <div className='flex flex-col flex-1 min-w-0'>
                                        <span className='font-semibold text-sm text-foreground group-hover:text-primary/90 transition-colors duration-300'>{label}</span>
                                        <span className='text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300 leading-relaxed'>
                                          {value === 'superadmin' ? 'Complete system control & global configuration' :
                                           value === 'admin' ? 'Full administrative access & user management' :
                                           value === 'manager' ? 'Team oversight & advanced reporting tools' :
                                           'Sales operations & customer transaction handling'}
                                        </span>
                                      </div>
                                      <motion.div 
                                        className='flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-muted/30 to-muted/10 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300'
                                        whileHover={{ scale: 1.1, x: 2 }}
                                      >
                                        <svg className='w-3.5 h-3.5 text-muted-foreground group-hover:text-primary/70 transition-colors duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M9 5l7 7-7 7' />
                                        </svg>
                                      </motion.div>
                                    </div>
                                    
                                    {/* Subtle background effect */}
                                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                                  </SelectItem>
                                </motion.div>
                              ))}
                            </div>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name='desc'
                    render={({ field }) => (
                      <FormItem className='space-y-2'>
                        <FormLabel className='text-sm font-semibold'>
                          Personal Message (Optional)
                        </FormLabel>
                        <FormControl>
                          <motion.div
                            whileHover={{ scale: 1.005 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Textarea
                              className='resize-none min-h-[110px] bg-gradient-to-br from-background/60 via-background/50 to-background/60 border-border/50 hover:border-primary/30 focus:border-primary/50 focus:bg-background transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm'
                              placeholder='Welcome to our team! We&#39;re excited to have you join us and look forward to working together. Your expertise will be a great addition to our organization...'
                              {...field}
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.form>
              </Form>
                    <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <DialogFooter className='gap-3 pt-8'>
                  <DialogClose asChild>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        variant='outline'
                        className='h-12 px-8 bg-background/60 border-border/50 hover:bg-muted/50 hover:border-border/70 transition-all duration-300 backdrop-blur-sm font-medium'
                      >
                        Cancel
                      </Button>
                    </motion.div>
                  </DialogClose>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type='submit' 
                      form='user-invite-form'
                      className='h-12 px-8 bg-gradient-to-r from-primary via-primary/95 to-primary/90 hover:from-primary/95 hover:via-primary/90 hover:to-primary/85 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 group font-semibold relative overflow-hidden'
                    >
                      {/* Subtle shine effect */}
                      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out' />
                      
                      <span className='relative z-10'>Send Invitation</span>
                      <motion.div
                        className='ml-2 relative z-10'
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <IconSend className='h-4 w-4' />
                      </motion.div>
                    </Button>
                  </motion.div>
                </DialogFooter>
              </motion.div>
            </div>
          </DialogContent>
        </Dialog>
  )
}

