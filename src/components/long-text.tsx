"use client"

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Props {
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export default function LongText({
  children,
  className = '',
  contentClassName = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  // Start with false for both server and client
  const [isOverflown, setIsOverflown] = useState(false)
  // Add a mounted state to ensure we only show the overflow UI on the client
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Mark as mounted first
    setIsMounted(true)
    // Then check for overflow
    if (checkOverflow(ref.current)) {
      setIsOverflown(true)
      return
    }

    setIsOverflown(false)
  }, [])

  // Always return the same basic version during server rendering and initial client render
  if (!isMounted) {
    return (
      <div ref={ref} className={cn('truncate', className)}>
        {children}
      </div>
    )
  }

  // Only show overflow UI after client-side hydration is complete
  if (!isOverflown)
    return (
      <div ref={ref} className={cn('truncate', className)}>
        {children}
      </div>
    )

  return (
    <>
      <div className='hidden sm:block'>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div ref={ref} className={cn('truncate', className)}>
                {children}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className={contentClassName}>{children}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className='sm:hidden'>
        <Popover>
          <PopoverTrigger asChild>
            <div ref={ref} className={cn('truncate', className)}>
              {children}
            </div>
          </PopoverTrigger>
          <PopoverContent className={cn('w-fit', contentClassName)}>
            <p>{children}</p>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}

const checkOverflow = (textContainer: HTMLDivElement | null) => {
  if (textContainer) {
    return (
      textContainer.offsetHeight < textContainer.scrollHeight ||
      textContainer.offsetWidth < textContainer.scrollWidth
    )
  }
  return false
}
