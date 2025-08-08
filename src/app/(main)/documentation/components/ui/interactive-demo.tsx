"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

export function InteractiveDemo() {
  const { t } = useTranslation();
  const [demoTheme, setDemoTheme] = useState("light");
  const [demoLanguage, setDemoLanguage] = useState("en");

  return (
    <Card className="border-2 border-dashed border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Play className="h-5 w-5 text-primary" />
          <span>{t('interactive_demo')}</span>
        </CardTitle>
        <CardDescription>{t('demo_description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`p-4 rounded-lg transition-all duration-300 ${
          demoTheme === "dark" ? "bg-slate-900 text-white" : "bg-white text-slate-900 border"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">
              {demoLanguage === "en" && "Welcome to the Demo"}
              {demoLanguage === "fr" && "Bienvenue dans la démo"}
              {demoLanguage === "ar" && "مرحباً بك في العرض التوضيحي"}
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setDemoTheme(demoTheme === "light" ? "dark" : "light")}
              >
                {demoTheme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              <select 
                value={demoLanguage} 
                onChange={(e) => setDemoLanguage(e.target.value)}
                className="px-2 py-1 rounded border text-sm"
              >
                <option value="en">🇺🇸 English</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="ar">🇸🇦 العربية</option>
              </select>
            </div>
          </div>
          <p className="text-sm opacity-80">
            {demoLanguage === "en" && "This demonstrates real-time theme and language switching using Zustand stores."}
            {demoLanguage === "fr" && "Ceci démontre le changement de thème et de langue en temps réel avec les stores Zustand."}
            {demoLanguage === "ar" && "يوضح هذا تغيير المظهر واللغة في الوقت الفعلي باستخدام متاجر Zustand."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
