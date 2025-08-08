"use client";

import { Card, CardContent } from "@/components/ui/card";
import { 
  Zap, 
  Layout, 
  Palette, 
  Globe,
  Languages,
  Layers,
  ShieldCheck,
  Smartphone
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function QuickStats() {
  const { t } = useTranslation();

  const stats = [
    { 
      icon: Zap, 
      title: "Zustand", 
      desc: t('state_management'), 
      color: "text-yellow-500", 
      bg: "bg-yellow-500/10" 
    },
    { 
      icon: Layout, 
      title: "Next.js 15", 
      desc: t('react_framework'), 
      color: "text-blue-500", 
      bg: "bg-blue-500/10" 
    },
    { 
      icon: Palette, 
      title: "Shadcn/UI", 
      desc: t('ui_components'), 
      color: "text-purple-500", 
      bg: "bg-purple-500/10" 
    },
    { 
      icon: Globe, 
      title: "i18next", 
      desc: t('internationalization'), 
      color: "text-green-500", 
      bg: "bg-green-500/10" 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <div className={`inline-flex p-3 rounded-xl ${item.bg} mb-3 group-hover:scale-110 transition-transform duration-300`}>
              <item.icon className={`h-8 w-8 ${item.color}`} />
            </div>
            <div className="text-2xl font-bold">{item.title}</div>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
