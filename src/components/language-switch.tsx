"use client";

import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import { useLanguageStore } from "@/store/language-store";

const languages = [
  { code: "en", label: "English", flag: "/flags/united-states.svg" },
  { code: "fr", label: "Frensh", flag: "/flags/france.svg" },
  { code: "ar", label: "العربية", flag: "/flags/saudi-arabia.svg" },
  
];

export function LanguageSwitch() {
  const { currentLanguage, changeLanguage } = useLanguageStore(); 

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 px-2 gap-1.5 text-xs font-medium",
            "bg-transparent hover:bg-accent/50",
            "border-input transition-all duration-200",
            "focus-visible:ring-1 focus-visible:ring-ring",
            "data-[state=open]:bg-accent/50"
          )}
        >
          <img
            src={languages.find((lang) => lang.code === currentLanguage)?.flag}
            alt={currentLanguage}
            className="w-4 h-3 rounded-sm"
          />
          <span className="uppercase tracking-wider">{currentLanguage}</span>
          <IconChevronDown className="w-3 h-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code} 
            onClick={() => changeLanguage(lang.code)} 
          >
            <img
              src={lang.flag}
              alt={lang.label}
              className="w-4 h-3 mr-2 rounded-sm"
            />
            <span>{lang.label}</span>
            <IconCheck
              size={14}
              className={cn(
                "ml-auto",
                currentLanguage !== lang.code && "hidden"
              )}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}