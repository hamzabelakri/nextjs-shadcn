"use client";

import { cn } from '@/lib/utils';
import '@/styles/spinner.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'spinner',
          `spinner-${size}`,
          'border-primary border-r-transparent border-b-transparent',
          className
        )}
      />
    </div>
  );
}
