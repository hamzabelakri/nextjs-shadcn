"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Eye,
  Code2, 
  Globe, 
  Layout, 
  Palette, 
  Shield, 
  Zap,
  Rocket,
  Github,
  Star,
  Server
} from "lucide-react";
import { useTranslation } from "react-i18next";

// Import modular components
import { DocumentationHeader } from "./ui/documentation-header";
import { QuickStats } from "./ui/quick-stats";
import { InteractiveDemo } from "./ui/interactive-demo";
import { OverviewSection } from "./sections/overview-section";
import { ZustandSection } from "./sections/zustand-section";
import { AuthSection } from "./sections/auth-section";
import { I18nSection } from "./sections/i18n-section";
import { SetupSection } from "./sections/setup-section";
import { BackendSection } from "./sections/backend-section";

export function DocumentationContent() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Header */}
      <DocumentationHeader />

      {/* Quick Stats */}
      <QuickStats />

      {/* Interactive Demo */}
      <InteractiveDemo />

      {/* Enhanced Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 p-1 bg-muted/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Eye className="h-4 w-4 mr-2" />
            {t('overview')}
          </TabsTrigger>
          <TabsTrigger value="backend">
            <Server className="h-4 w-4 mr-2" />
            Backend
          </TabsTrigger>
          <TabsTrigger value="zustand">
            <Zap className="h-4 w-4 mr-2" />
            Zustand
          </TabsTrigger>
          <TabsTrigger value="auth">
            <Shield className="h-4 w-4 mr-2" />
            Auth
          </TabsTrigger>
          <TabsTrigger value="i18n">
            <Globe className="h-4 w-4 mr-2" />
            i18n
          </TabsTrigger>
          <TabsTrigger value="setup">
            <Rocket className="h-4 w-4 mr-2" />
            Setup
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents */}
        <TabsContent value="overview" className="space-y-6">
          <OverviewSection />
        </TabsContent>

        <TabsContent value="backend" className="space-y-6">
          <BackendSection />
        </TabsContent>

        <TabsContent value="zustand" className="space-y-6">
          <ZustandSection />
        </TabsContent>

        <TabsContent value="auth" className="space-y-6">
          <AuthSection />
        </TabsContent>

        <TabsContent value="i18n" className="space-y-6">
          <I18nSection />
        </TabsContent>

        <TabsContent value="setup" className="space-y-6">
          <SetupSection />
        </TabsContent>
      </Tabs>

      {/* Enhanced Footer */}
      <div className="relative mt-12 py-8 border-t bg-gradient-to-r from-muted/30 to-transparent rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-lg font-medium">{t('built_with_love')}</p>
            <p className="text-sm text-muted-foreground">
              Next.js 15 • Go • Gin • Bun ORM • PostgreSQL • Zustand • Shadcn/UI • i18next • TypeScript
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://github.com/hamzabelakri/nextjs-shadcn', '_blank')}
            >
              <Github className="h-4 w-4 mr-2" />
              {t('view_source')}
            </Button>
            <Button 
              size="sm"
              onClick={() => window.open('https://github.com/hamzabelakri/nextjs-shadcn', '_blank')}
            >
              <Star className="h-4 w-4 mr-2" />
              {t('star_on_github')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}