"use client";

import { Badge } from "@/components/ui/badge";
import { Book } from "lucide-react";
import { useTranslation } from "react-i18next";

export function DocumentationHeader() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Book className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold">{t('documentation')}</h1>
        <Badge variant="secondary" className="ml-2">v2.0</Badge>
      </div>
      <p className="text-xl text-muted-foreground max-w-3xl">
        {t('doc_main_description')}
      </p>
    </div>
  );
}
