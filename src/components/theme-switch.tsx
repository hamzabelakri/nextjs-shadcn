"use client"

import { useEffect } from 'react'
import { IconCheck, IconMoon, IconSun } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/context/theme-context'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeSwitch() {
  const { t } = useTranslation();
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
        <Button variant='ghost' size='icon' className='scale-95 rounded-full'>
          <IconSun className='size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
          <IconMoon className='absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          <span className='sr-only'>{t('toggle_theme')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className="rtl:text-right">
        <DropdownMenuItem onClick={() => setTheme('light')} className="rtl:flex-row-reverse">
          {t('light')}{' '}
          <IconCheck
            size={14}
            className={cn('ml-auto rtl:ml-0 rtl:mr-auto', theme !== 'light' && 'hidden')}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className="rtl:flex-row-reverse">
          {t('dark')}
          <IconCheck
            size={14}
            className={cn('ml-auto rtl:ml-0 rtl:mr-auto', theme !== 'dark' && 'hidden')}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className="rtl:flex-row-reverse">
          {t('system')}
          <IconCheck
            size={14}
            className={cn('ml-auto rtl:ml-0 rtl:mr-auto', theme !== 'system' && 'hidden')}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
