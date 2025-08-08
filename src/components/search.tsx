"use client"

import { IconSearch } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { useSearch } from '@/context/search-context'
import { Button } from './ui/button'
import { useTranslation } from '@/hooks/useTranslation'

interface Props {
  className?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
}

export function Search({ className = '' }: Props) {
  const { setOpen } = useSearch()
  const { t, i18n, currentLanguage } = useTranslation()
  
  const searchText = t('search_placeholder');
  
  // Debug log to check if translation is working
  console.log('Search component:', {
    currentLanguage,
    searchText,
    isArabic: currentLanguage === 'ar'
  });
  
  return (
    <Button
      key={`search-${currentLanguage}`}
      variant='outline'
      className={cn(
        'bg-muted/25 text-muted-foreground hover:bg-muted/50 relative h-8 w-full flex-1 justify-start rounded-md text-sm font-normal shadow-none sm:pr-12 md:w-40 md:flex-none lg:w-56 xl:w-64',
        currentLanguage === 'ar' && 'flex-row-reverse justify-end',
        className
      )}
      onClick={() => setOpen(true)}
    >
      <IconSearch
        aria-hidden='true'
        className={cn(
          'absolute top-1/2 -translate-y-1/2',
          currentLanguage === 'ar' ? 'right-1.5' : 'left-1.5'
        )}
      />
      <span 
        className={cn(
          'truncate',
          currentLanguage === 'ar' ? 'mr-6 pr-2 text-right' : 'ml-6 pl-2'
        )}
        dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}
        key={`search-text-${currentLanguage}`}
        style={{ 
          fontFamily: currentLanguage === 'ar' ? 'Arial, "Noto Sans Arabic", sans-serif' : 'inherit',
          unicodeBidi: currentLanguage === 'ar' ? 'embed' : 'normal',
          direction: currentLanguage === 'ar' ? 'rtl' : 'ltr'
        }}
      >
        {searchText}
      </span>
      <kbd className='bg-muted pointer-events-none absolute top-[0.3rem] right-[0.3rem] hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex'>
        <span className='text-xs'>⌘</span>K
      </kbd>
    </Button>
  )
}
