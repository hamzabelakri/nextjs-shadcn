"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CodeBlockProps {
  code: string;
  language?: string;
  id: string;
  title?: string;
}

export function CodeBlock({ code, language = "typescript", id, title }: CodeBlockProps) {
  const { t } = useTranslation();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="relative group">
      {title && (
        <div className="flex items-center justify-between bg-muted/50 px-4 py-2 rounded-t-lg border-b">
          <span className="text-sm font-medium">{title}</span>
          <Badge variant="outline" className="text-xs">{language}</Badge>
        </div>
      )}
      <div className="bg-slate-950 dark:bg-slate-900 text-slate-50 p-4 rounded-b-lg relative overflow-x-auto">
        <pre className="text-sm">
          <code>{code}</code>
        </pre>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => copyCode(code, id)}
        >
          {copiedCode === id ? (
            <CheckCircle className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
