"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Rocket,
  CheckCircle,
  Copy,
  Play,
  Package,
  FileText,
  TrendingUp,
  Lightbulb,
  Eye,
  EyeOff
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { CodeBlock } from "../ui/code-block";

export function SetupSection() {
  const { t } = useTranslation();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showSecrets, setShowSecrets] = useState(false);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const installationSteps = [
    { 
      step: 1, 
      title: t('clone_repository'), 
      command: "git clone <repository-url>",
      desc: t('get_latest_template')
    },
    { 
      step: 2, 
      title: t('install_dependencies'), 
      command: "npm install",
      desc: t('install_required_packages')
    },
    { 
      step: 3, 
      title: t('environment_setup'), 
      command: "cp .env.example .env.local",
      desc: t('configure_env_variables')
    },
    { 
      step: 4, 
      title: t('start_development'), 
      command: "npm run dev",
      desc: t('launch_dev_server')
    }
  ];

  const developmentScripts = [
    { command: "npm run dev", desc: t('start_dev_server_turbopack'), icon: Play },
    { command: "npm run build", desc: t('create_production_build'), icon: Package },
    { command: "npm run start", desc: t('start_production_server'), icon: Rocket },
    { command: "npm run lint", desc: t('run_eslint_check'), icon: CheckCircle },
    { command: "npm run type-check", desc: t('run_typescript_check'), icon: FileText },
    { command: "npm run analyze", desc: t('analyze_bundle_size'), icon: TrendingUp }
  ];

  const troubleshootingItems = [
    {
      issue: t('port_already_in_use'),
      solution: t('use_different_port')
    },
    {
      issue: t('typescript_errors_after_install'), 
      solution: t('run_type_check_fix')
    },
    {
      issue: t('theme_not_persisting'),
      solution: t('check_localstorage_cookies')
    },
    {
      issue: t('translation_keys_not_found'),
      solution: t('verify_translation_exports')
    }
  ];

  const envVarsCode = `# Database
DATABASE_URL=${showSecrets ? '"postgresql://user:pass@localhost:5432/db"' : '"your_database_url"'}

# Authentication
JWT_SECRET=${showSecrets ? '"your-super-secure-jwt-secret-key"' : '"your_jwt_secret"'}
JWT_EXPIRES_IN=${showSecrets ? '"24h"' : '"24h"'}

# External APIs
NEXT_PUBLIC_API_URL=${showSecrets ? '"https://api.yourapp.com"' : '"your_api_url"'}

# Optional: Analytics
NEXT_PUBLIC_GA_ID=${showSecrets ? '"G-XXXXXXXXXX"' : '"your_analytics_id"'}`;

  return (
    <div className="space-y-6">
      <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
        <Rocket className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800 dark:text-blue-200">
          {t('quick_start')}
        </AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          {t('quick_start_desc')}
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('installation_guide')}</CardTitle>
            <CardDescription>{t('step_by_step_setup')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {installationSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="font-medium">{step.title}</div>
                  <div className="bg-slate-900 text-slate-100 p-2 rounded font-mono text-sm">
                    {step.command}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="ml-2 h-6 w-6 p-0 text-slate-400 hover:text-slate-100"
                      onClick={() => copyCode(step.command, `step-${step.step}`)}
                    >
                      {copiedCode === `step-${step.step}` ? 
                        <CheckCircle className="h-3 w-3" /> : 
                        <Copy className="h-3 w-3" />
                      }
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">{step.desc}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('environment_configuration')}</CardTitle>
            <CardDescription>{t('required_env_variables')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">{t('environment_variables')}</h4>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowSecrets(!showSecrets)}
              >
                {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <CodeBlock
              title={t('environment_variables')}
              id="env-vars"
              code={envVarsCode}
            />
            
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertDescription>
                {t('env_security_warning')}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('development_scripts')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {developmentScripts.map((script, index) => (
              <div key={index} className="p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                <div className="flex items-center space-x-2 mb-2">
                  <script.icon className="h-4 w-4 text-primary" />
                  <code className="font-mono text-sm font-semibold">{script.command}</code>
                </div>
                <p className="text-xs text-muted-foreground">{script.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('troubleshooting')}</CardTitle>
          <CardDescription>{t('common_issues_solutions')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {troubleshootingItems.map((item, index) => (
            <div key={index} className="p-4 rounded-lg border-l-4 border-amber-500 bg-amber-50/50 dark:bg-amber-950/20">
              <div className="font-medium text-sm mb-1">❓ {item.issue}</div>
              <div className="text-sm text-muted-foreground">💡 {item.solution}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
