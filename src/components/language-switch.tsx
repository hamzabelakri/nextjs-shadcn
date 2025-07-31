"use client"

import { IconCheck, IconChevronDown } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/language-context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// USA Flag Component
const USAFlag = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 16" fill="none">
    <rect width="24" height="16" fill="#B22234"/>
    <rect width="24" height="1.23" fill="white" y="1.23"/>
    <rect width="24" height="1.23" fill="white" y="3.69"/>
    <rect width="24" height="1.23" fill="white" y="6.15"/>
    <rect width="24" height="1.23" fill="white" y="8.62"/>
    <rect width="24" height="1.23" fill="white" y="11.08"/>
    <rect width="24" height="1.23" fill="white" y="13.54"/>
    <rect width="9.6" height="8.62" fill="#3C3B6E"/>
    <g fill="white">
      <circle cx="1.2" cy="1.08" r="0.3"/>
      <circle cx="2.4" cy="1.08" r="0.3"/>
      <circle cx="3.6" cy="1.08" r="0.3"/>
      <circle cx="4.8" cy="1.08" r="0.3"/>
      <circle cx="6" cy="1.08" r="0.3"/>
      <circle cx="7.2" cy="1.08" r="0.3"/>
      <circle cx="8.4" cy="1.08" r="0.3"/>
      <circle cx="1.8" cy="2.15" r="0.3"/>
      <circle cx="3" cy="2.15" r="0.3"/>
      <circle cx="4.2" cy="2.15" r="0.3"/>
      <circle cx="5.4" cy="2.15" r="0.3"/>
      <circle cx="6.6" cy="2.15" r="0.3"/>
      <circle cx="7.8" cy="2.15" r="0.3"/>
    </g>
  </svg>
)

// France Flag Component
const FranceFlag = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 16" fill="none">
    <rect width="8" height="16" fill="#002654"/>
    <rect x="8" width="8" height="16" fill="white"/>
    <rect x="16" width="8" height="16" fill="#CE1126"/>
  </svg>
)

// Saudi Arabia Flag Component
const SaudiFlag = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 16" fill="none">
    <rect width="24" height="16" fill="#006C35"/>
    <g fill="white">
      <text x="12" y="10" textAnchor="middle" fontSize="4" fontFamily="serif">لا إله إلا الله محمد رسول الله</text>
      <path d="M4 12h16v1H4z"/>
    </g>
  </svg>
)

const languages = [
  { code: 'en', name: 'English', flagComponent: USAFlag, nativeName: 'English' },
  { code: 'fr', name: 'Français', flagComponent: FranceFlag, nativeName: 'Français' },
  { code: 'ar', name: 'العربية', flagComponent: SaudiFlag, nativeName: 'العربية' },
] as const

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant='outline' 
          size='sm' 
          className={cn(
            'h-8 px-2 gap-1.5 text-xs font-medium',
            'bg-transparent hover:bg-accent/50',
            'border-input transition-all duration-200',
            'focus-visible:ring-1 focus-visible:ring-ring',
            'data-[state=open]:bg-accent/50'
          )}
        >
          {currentLanguage?.flagComponent && (
            <currentLanguage.flagComponent className='w-4 h-3 rounded-sm border border-gray-200' />
          )}
          <span className='uppercase tracking-wider'>{currentLanguage?.code}</span>
          <IconChevronDown className='w-3 h-3 opacity-50' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align='end' 
        className='w-48 p-1'
        sideOffset={4}
      >
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code} 
            onClick={() => setLanguage(lang.code as any)}
            className={cn(
              'flex items-center justify-between px-2 py-1.5 text-sm',
              'rounded-sm cursor-pointer',
              language === lang.code && 'bg-accent'
            )}
          >
            <div className='flex items-center gap-2'>
              <lang.flagComponent className='w-5 h-4 rounded-sm border border-gray-200' />
              <span>{lang.nativeName}</span>
            </div>
            {language === lang.code && (
              <IconCheck className='w-4 h-4 text-primary' />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}