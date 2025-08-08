"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Check, Globe, Loader2 } from 'lucide-react';
import { useLanguageStore, type SupportedLanguage } from '@/store/language-store';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  variant?: 'button' | 'minimal';
  showLabel?: boolean;
  className?: string;
}

export function LanguageSwitcher({ 
  variant = 'button', 
  showLabel = true, 
  className 
}: LanguageSwitcherProps) {
  const { 
    currentLanguage, 
    isChanging, 
    supportedLanguages, 
    changeLanguage, 
    getCurrentLanguageConfig 
  } = useLanguageStore();

  const currentConfig = getCurrentLanguageConfig();

  const handleLanguageChange = (language: SupportedLanguage) => {
    if (language !== currentLanguage && !isChanging) {
      changeLanguage(language);
    }
  };

  if (variant === 'minimal') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0",
              isChanging && "cursor-not-allowed opacity-50",
              className
            )}
            disabled={isChanging}
          >
            {isChanging ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span className="text-sm">{currentConfig.flag}</span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {supportedLanguages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className="flex items-center justify-between cursor-pointer"
              disabled={isChanging}
            >
              <div className="flex items-center space-x-2">
                <span>{language.flag}</span>
                <span>{language.nativeName}</span>
              </div>
              {currentLanguage === language.code && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "flex items-center space-x-2",
            isChanging && "cursor-not-allowed opacity-50",
            className
          )}
          disabled={isChanging}
        >
          {isChanging ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Globe className="h-4 w-4" />
              <span className="text-sm">{currentConfig.flag}</span>
              {showLabel && (
                <span className="text-sm font-medium">
                  {currentConfig.nativeName}
                </span>
              )}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {supportedLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center justify-between cursor-pointer"
            disabled={isChanging}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{language.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{language.name}</span>
                <span className="text-xs text-muted-foreground">
                  {language.nativeName}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {language.dir === 'rtl' && (
                <Badge variant="secondary" className="text-xs">
                  RTL
                </Badge>
              )}
              {currentLanguage === language.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
