"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle,
  Layers,
  Sparkles,
  ShieldCheck,
  Languages,
  TrendingUp,
  Package,
  Server
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { FeatureCard } from "../ui/feature-card";

export function OverviewSection() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Alert className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800 dark:text-green-200">
          Full-Stack Application Ready
        </AlertTitle>
        <AlertDescription className="text-green-700 dark:text-green-300">
          Complete full-stack solution with Go backend API and React frontend, production-ready with authentication, audit logging, and role-based permissions.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeatureCard
          icon={Server}
          title="Go Backend API"
          description="High-performance RESTful API built with Go, Gin framework, and Bun ORM"
          variant="highlight"
          features={[
            "RESTful API endpoints",
            "JWT authentication",
            "Role-based permissions",
            "Audit logging system",
            "PostgreSQL database"
          ]}
        />
        <FeatureCard
          icon={Layers}
          title={t('state_management')}
          description={t('modern_zustand_architecture')}
          features={[
            t('no_context_provider_hell'),
            t('no_infinite_loop_issues'),
            t('manual_persistence_control'),
            t('enhanced_debugging_tools'),
            t('typescript_fully_typed')
          ]}
        />
        <FeatureCard
          icon={Sparkles}
          title={t('ui_ux_excellence')}
          description={t('beautiful_responsive_interface')}
          features={[
            t('shadcn_ui_components'),
            t('dark_light_themes'),
            t('smooth_animations'),
            t('mobile_first_responsive'),
            t('accessibility_optimized')
          ]}
        />
        <FeatureCard
          icon={ShieldCheck}
          title={t('security_auth')}
          description="Enterprise-grade authentication with backend integration"
          features={[
            t('jwt_token_management'),
            t('role_based_permissions'),
            "Backend session validation",
            "Password encryption (bcrypt)",
            "API route protection"
          ]}
        />
        <FeatureCard
          icon={Languages}
          title={t('internationalization')}
          description={t('advanced_i18n')}
          features={[
            t('multi_language_support'),
            t('rtl_language_support'),
            t('interpolation_pluralization'),
            t('date_number_formatting'),
            t('dynamic_language_switching')
          ]}
        />
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span>{t('performance_features')}</span>
          </CardTitle>
          <CardDescription>{t('tech_stack_benefits')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-500">{t('fast')}</div>
              <div className="text-sm text-muted-foreground">{t('development_experience')}</div>
              <div className="text-xs">{t('optimized_turbopack')}</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-500">{t('modern')}</div>
              <div className="text-sm text-muted-foreground">{t('react_patterns')}</div>
              <div className="text-xs">{t('hooks_server_components')}</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-purple-500">{t('scalable')}</div>
              <div className="text-sm text-muted-foreground">{t('architecture')}</div>
              <div className="text-xs">{t('modular_type_safe')}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Architecture Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>{t('project_architecture')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Project Structure</h4>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg font-mono text-sm">
                <div className="space-y-1">
                  <div>📁 frontend/</div>
                  <div className="ml-4">📁 src/app/ <span className="text-muted-foreground"># {t('nextjs_app_router')}</span></div>
                  <div className="ml-4">📁 src/components/ <span className="text-muted-foreground"># {t('ui_components')}</span></div>
                  <div className="ml-4">📁 src/store/ <span className="text-muted-foreground"># {t('zustand_stores')}</span></div>
                  <div className="ml-4">📁 src/hooks/ <span className="text-muted-foreground"># {t('custom_hooks')}</span></div>
                  <div>📁 backend/</div>
                  <div className="ml-4">📁 controllers/ <span className="text-muted-foreground"># API handlers</span></div>
                  <div className="ml-4">📁 models/ <span className="text-muted-foreground"># Data models</span></div>
                  <div className="ml-4">📁 middlewares/ <span className="text-muted-foreground"># Auth & logging</span></div>
                  <div className="ml-4">📁 routes/ <span className="text-muted-foreground"># API routing</span></div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Full-Stack Technologies</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Go", version: "1.21+", icon: Package },
                  { name: "Gin Framework", version: "1.9", icon: Package },
                  { name: "Bun ORM", version: "1.1", icon: Package },
                  { name: "PostgreSQL", version: "15+", icon: Package },
                  { name: "Next.js", version: "15.3", icon: Package },
                  { name: "React", version: "19.0", icon: Package },
                  { name: "Zustand", version: "5.0", icon: Package },
                  { name: "TypeScript", version: "5.0", icon: Package }
                ].map((tech, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 rounded border">
                    <tech.icon className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium text-sm">{tech.name}</div>
                      <div className="text-xs text-muted-foreground">{tech.version}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
