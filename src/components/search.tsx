"use client"

import { IconSearch } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { useSearch } from '@/context/search-context'
import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'
import { useLanguageStore } from '@/store/language-store'

interface Props {
  className?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
}

export function Search({ className = '' }: Props) {
  const { t } = useTranslation();
  const { setOpen } = useSearch()
  const { currentLanguage } = useLanguageStore()
  const isRTL = currentLanguage === 'ar'
  
  return (
    <Button
      variant='outline'
      data-search="true"
      className={cn(
        'bg-muted/25 text-muted-foreground hover:bg-muted/50 relative h-8 w-full flex-1 justify-start rounded-md text-sm font-normal shadow-none',
        'sm:pr-12 md:w-44 md:flex-none lg:w-60 xl:w-72',
        isRTL && 'sm:pl-12 sm:pr-2',
        className
      )}
      onClick={() => setOpen(true)}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <IconSearch
        aria-hidden='true'
        className={cn(
          'absolute top-1/2 -translate-y-1/2 w-4 h-4',
          isRTL ? 'right-1.5' : 'left-1.5'
        )}
      />
      <span className={cn(
        'flex-1 overflow-hidden whitespace-nowrap',
        isRTL ? 'mr-3 text-right' : 'ml-3 text-left'
      )}>
        {t('search_placeholder')}
      </span>
    </Button>
  )
}