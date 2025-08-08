"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle,
  Server,
  Database,
  Shield,
  Zap,
  Archive,
  GitBranch,
  Code2,
  Activity
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { FeatureCard } from "../ui/feature-card";

export function BackendSection() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
        <Server className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800 dark:text-blue-200">
          Go Backend API
        </AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          Complete RESTful API backend built with Go, Gin framework, and Bun ORM for high performance and scalability.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeatureCard
          icon={Server}
          title="Gin Web Framework"
          description="High-performance HTTP web framework with middleware support and routing"
          variant="highlight"
          features={[
            "Fast HTTP router",
            "Middleware support",
            "JSON binding & validation",
            "Error management",
            "Request logging"
          ]}
        />
        <FeatureCard
          icon={Database}
          title="Bun ORM & PostgreSQL"
          description="Modern SQL-first ORM with PostgreSQL database for data persistence"
          features={[
            "Type-safe database queries",
            "Migration support",
            "Connection pooling",
            "Transaction management",
            "Schema validation"
          ]}
        />
        <FeatureCard
          icon={Shield}
          title="Authentication & Authorization"
          description="JWT-based authentication with role-based access control (RBAC)"
          features={[
            "JWT token generation",
            "Password hashing (bcrypt)",
            "Role-based permissions",
            "Middleware protection",
            "Session management"
          ]}
        />
        <FeatureCard
          icon={Activity}
          title="Audit Logging"
          description="Comprehensive audit trail system for tracking user actions and changes"
          features={[
            "Action tracking",
            "Before/after data capture",
            "User identification",
            "Timestamp recording",
            "Searchable logs"
          ]}
        />
      </div>

      {/* API Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GitBranch className="h-5 w-5 text-green-500" />
            <span>API Architecture</span>
          </CardTitle>
          <CardDescription>RESTful API design with clean architecture patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Directory Structure</h4>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg font-mono text-sm">
                <div className="space-y-1">
                  <div>📁 backend/</div>
                  <div className="ml-4">📁 api/ <span className="text-muted-foreground"># Server setup</span></div>
                  <div className="ml-4">📁 controllers/ <span className="text-muted-foreground"># Request handlers</span></div>
                  <div className="ml-4">📁 models/ <span className="text-muted-foreground"># Data models</span></div>
                  <div className="ml-4">📁 middlewares/ <span className="text-muted-foreground"># Auth & logging</span></div>
                  <div className="ml-4">📁 routes/ <span className="text-muted-foreground"># API routing</span></div>
                  <div className="ml-4">📁 config/ <span className="text-muted-foreground"># Configuration</span></div>
                  <div className="ml-4">📁 db/ <span className="text-muted-foreground"># Database setup</span></div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Tech Stack</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Go", version: "1.21+", icon: Code2 },
                  { name: "Gin", version: "1.9", icon: Zap },
                  { name: "Bun ORM", version: "1.1", icon: Database },
                  { name: "PostgreSQL", version: "15+", icon: Database },
                  { name: "JWT-Go", version: "5.0", icon: Shield },
                  { name: "Bcrypt", version: "Latest", icon: Shield }
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

      {/* API Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Archive className="h-5 w-5" />
            <span>API Endpoints</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Authentication</h4>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900 rounded">
                  <span className="text-green-600">POST</span>
                  <span>/api/auth/login</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900 rounded">
                  <span className="text-blue-600">POST</span>
                  <span>/api/auth/register</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900 rounded">
                  <span className="text-orange-600">POST</span>
                  <span>/api/auth/refresh</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">User Management</h4>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900 rounded">
                  <span className="text-blue-600">GET</span>
                  <span>/api/users</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900 rounded">
                  <span className="text-green-600">POST</span>
                  <span>/api/users</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900 rounded">
                  <span className="text-yellow-600">PUT</span>
                  <span>/api/users/:id</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900 rounded">
                  <span className="text-red-600">DELETE</span>
                  <span>/api/users/:id</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Roles & Permissions</h4>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900 rounded">
                  <span className="text-blue-600">GET</span>
                  <span>/api/roles</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900 rounded">
                  <span className="text-green-600">POST</span>
                  <span>/api/roles</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900 rounded">
                  <span className="text-yellow-600">PUT</span>
                  <span>/api/roles/:id</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Audit Logs</h4>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900 rounded">
                  <span className="text-blue-600">GET</span>
                  <span>/api/audit</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900 rounded">
                  <span className="text-blue-600">GET</span>
                  <span>/api/audit/:id</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-900 rounded">
                  <span className="text-green-600">POST</span>
                  <span>/api/audit</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Backend Setup</CardTitle>
          <CardDescription>Quick guide to get the Go backend running</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Prerequisites</h4>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Go 1.21 or higher</li>
                <li>PostgreSQL database</li>
                <li>Environment variables configured</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Installation Steps</h4>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg font-mono text-sm space-y-2">
                <div># Navigate to backend directory</div>
                <div className="text-blue-600">cd backend</div>
                <div># Install dependencies</div>
                <div className="text-blue-600">go mod tidy</div>
                <div># Run database migrations</div>
                <div className="text-blue-600">go run config/rbac_migration.go</div>
                <div># Start the server</div>
                <div className="text-blue-600">go run main.go</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
