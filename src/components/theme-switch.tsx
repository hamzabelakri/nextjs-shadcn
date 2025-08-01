"use client"

import { useEffect } from 'react'
import { IconCheck, IconMoon, IconSun } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/stores/ui-hooks'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  /* Update theme-color meta tag
   * when theme is updated */
  useEffect(() => {
    const themeColor = theme === 'dark' ? '#020817' : '#fff'
    const metaThemeColor = document.querySelector("meta[name='theme-color']")
    if (metaThemeColor) metaThemeColor.setAttribute('content', themeColor)
  }, [theme])

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant='ghost' 
          size='sm' 
          className={cn(
            'h-9 w-9 rounded-md transition-all duration-200',
            'bg-background/50 backdrop-blur-sm',
            'border border-border/50 shadow-sm',
            'hover:bg-accent hover:text-accent-foreground hover:border-border/80',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground'
          )}
        >
          <IconSun className='size-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
          <IconMoon className='absolute size-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align='end'
        className={cn(
          'min-w-[160px] p-1',
          'bg-background/95 backdrop-blur-md',
          'border border-border/50 shadow-lg',
          'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'
        )}
      >
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          className={cn(
            'group flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer',
            'transition-all duration-200',
            'hover:bg-accent/80 hover:text-accent-foreground',
            'focus:bg-accent focus:text-accent-foreground',
            theme === 'light' && 'bg-accent/50 text-accent-foreground'
          )}
        >
          <IconSun size={16} />
          <span className='flex-1 text-sm font-medium'>Light</span>
          <IconCheck
            size={14}
            className={cn('text-primary transition-opacity', theme !== 'light' && 'opacity-0')}
          />
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className={cn(
            'group flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer',
            'transition-all duration-200',
            'hover:bg-accent/80 hover:text-accent-foreground',
            'focus:bg-accent focus:text-accent-foreground',
            theme === 'dark' && 'bg-accent/50 text-accent-foreground'
          )}
        >
          <IconMoon size={16} />
          <span className='flex-1 text-sm font-medium'>Dark</span>
          <IconCheck
            size={14}
            className={cn('text-primary transition-opacity', theme !== 'dark' && 'opacity-0')}
          />
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          className={cn(
            'group flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer',
            'transition-all duration-200',
            'hover:bg-accent/80 hover:text-accent-foreground',
            'focus:bg-accent focus:text-accent-foreground',
            theme === 'system' && 'bg-accent/50 text-accent-foreground'
          )}
        >
          <IconSun size={16} className='dark:hidden' />
          <IconMoon size={16} className='hidden dark:block' />
          <span className='flex-1 text-sm font-medium'>System</span>
          <IconCheck
            size={14}
            className={cn('text-primary transition-opacity', theme !== 'system' && 'opacity-0')}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
