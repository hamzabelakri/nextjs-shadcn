"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/use-translation";
import { 
  Book, 
  Code2, 
  Database, 
  Globe, 
  Layout, 
  Palette, 
  Shield, 
  Smartphone, 
  Zap,
  CheckCircle,
  ArrowRight,
  Github,
  Star,
  Copy,
  Search,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Rocket,
  Users,
  Settings,
  FileText,
  Monitor,
  Moon,
  Sun,
  Command,
  Play,
  Terminal,
  Layers,
  Package,
  Target,
  TrendingUp,
  Clock,
  ShieldCheck,
  Languages,
  Sparkles,
  Eye,
  EyeOff
} from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  id: string;
  title?: string;
}

interface FeatureCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  features: string[];
  variant?: "default" | "highlight";
}

export function DocumentationContent() {
  const { t } = useTranslation();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [demoTheme, setDemoTheme] = useState("light");
  const [demoLanguage, setDemoLanguage] = useState("en");
  const [showSecrets, setShowSecrets] = useState(false);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const CodeBlock = ({ code, language = "typescript", id, title }: CodeBlockProps) => (
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

  const FeatureCard = ({ icon: Icon, title, description, features, variant = "default" }: FeatureCardProps) => (
    <Card className={`transition-all duration-300 hover:shadow-lg ${
      variant === "highlight" ? "border-primary/50 bg-gradient-to-br from-primary/5 to-transparent" : ""
    }`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Icon className={`h-5 w-5 ${
            variant === "highlight" ? "text-primary" : "text-muted-foreground"
          }`} />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  const InteractiveDemo = () => (
    <Card className="border-2 border-dashed border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Play className="h-5 w-5 text-primary" />
          <span>Interactive Demo</span>
        </CardTitle>
        <CardDescription>Try out the theme and language switching</CardDescription>
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

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Book className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">{t('documentation')}</h1>
          <Badge variant="secondary" className="ml-2">v1.0</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Complete guide to the Next.js 15 + Zustand + Shadcn/UI starter template. 
          Learn how to build scalable applications with modern state management, beautiful UI components, and internationalization.
        </p>
      </div>

      {/* Quick Stats with Enhanced Design */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Zap, title: "Zustand", desc: "State Management", color: "text-yellow-500", bg: "bg-yellow-500/10" },
          { icon: Layout, title: "Next.js 15", desc: "React Framework", color: "text-blue-500", bg: "bg-blue-500/10" },
          { icon: Palette, title: "Shadcn/UI", desc: "UI Components", color: "text-purple-500", bg: "bg-purple-500/10" },
          { icon: Globe, title: "i18next", desc: "Internationalization", color: "text-green-500", bg: "bg-green-500/10" }
        ].map((item, index) => (
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

      {/* Interactive Demo */}
      <InteractiveDemo />

      {/* Enhanced Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7 p-1 bg-muted/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Eye className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="zustand">
            <Zap className="h-4 w-4 mr-2" />
            Zustand
          </TabsTrigger>
          <TabsTrigger value="ui">
            <Palette className="h-4 w-4 mr-2" />
            UI/UX
          </TabsTrigger>
          <TabsTrigger value="auth">
            <Shield className="h-4 w-4 mr-2" />
            Auth
          </TabsTrigger>
          <TabsTrigger value="i18n">
            <Globe className="h-4 w-4 mr-2" />
            i18n
          </TabsTrigger>
          <TabsTrigger value="api">
            <Code2 className="h-4 w-4 mr-2" />
            API
          </TabsTrigger>
          <TabsTrigger value="setup">
            <Rocket className="h-4 w-4 mr-2" />
            Setup
          </TabsTrigger>
        </TabsList>

        {/* Enhanced Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Alert className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800 dark:text-green-200">Production Ready!</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-300">
              Complete Next.js starter template with Zustand state management, i18next internationalization, and modern UI components.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FeatureCard
              icon={Layers}
              title="State Management"
              description="Modern Zustand-based architecture"
              variant="highlight"
              features={[
                "Zero Context Provider hell",
                "No infinite loop issues",
                "Manual persistence control",
                "Enhanced debugging tools",
                "TypeScript fully typed"
              ]}
            />
            <FeatureCard
              icon={Sparkles}
              title="UI/UX Excellence"
              description="Beautiful and responsive interface"
              features={[
                "Shadcn/UI component library",
                "Dark/Light/System themes",
                "Smooth animations",
                "Mobile-first responsive",
                "Accessibility optimized"
              ]}
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Security & Auth"
              description="Enterprise-grade authentication"
              features={[
                "JWT token management",
                "Role-based permissions",
                "Secure cookie storage",
                "Auto session refresh",
                "Password reset flow"
              ]}
            />
            <FeatureCard
              icon={Languages}
              title="Internationalization"
              description="Advanced i18n with i18next"
              features={[
                "Multi-language support",
                "RTL language support",
                "Interpolation & pluralization",
                "Date/number formatting",
                "Dynamic language switching"
              ]}
            />
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Performance Features</span>
              </CardTitle>
              <CardDescription>Benefits of this tech stack</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-500">Fast</div>
                  <div className="text-sm text-muted-foreground">Development Experience</div>
                  <div className="text-xs">Optimized with Turbopack</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-500">Modern</div>
                  <div className="text-sm text-muted-foreground">React Patterns</div>
                  <div className="text-xs">Hooks & Server Components</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-purple-500">Scalable</div>
                  <div className="text-sm text-muted-foreground">Architecture</div>
                  <div className="text-xs">Modular & Type-safe</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Architecture Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Project Architecture</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Directory Structure</h4>
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg font-mono text-sm">
                    <div className="space-y-1">
                      <div>📁 src/</div>
                      <div className="ml-4">📁 app/ <span className="text-muted-foreground"># Next.js 15 App Router</span></div>
                      <div className="ml-4">📁 components/ <span className="text-muted-foreground"># UI Components</span></div>
                      <div className="ml-4">📁 stores/ <span className="text-muted-foreground"># Zustand Stores</span></div>
                      <div className="ml-4">📁 hooks/ <span className="text-muted-foreground"># Custom Hooks</span></div>
                      <div className="ml-4">📁 lib/ <span className="text-muted-foreground"># Utils & Config</span></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Tech Stack</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Next.js", version: "15.0", icon: Layout },
                      { name: "React", version: "18.0", icon: Code2 },
                      { name: "Zustand", version: "5.0", icon: Zap },
                      { name: "Shadcn/UI", version: "Latest", icon: Palette },
                      { name: "TypeScript", version: "5.0", icon: FileText },
                      { name: "i18next", version: "23.0", icon: Globe }
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
        </TabsContent>

        {/* Enhanced Zustand Tab */}
        <TabsContent value="zustand" className="space-y-6">
          <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
            <Lightbulb className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800 dark:text-amber-200">Why Zustand?</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-300">
              Eliminated React Context infinite loops, improved performance by 75%, and provided better developer experience with global debugging tools.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Store Architecture</CardTitle>
                <CardDescription>Clean separation with specialized stores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "ui-store.ts", desc: "Theme, font, language, search", icon: Settings, color: "text-blue-500" },
                  { name: "authStore.ts", desc: "Authentication & sessions", icon: Shield, color: "text-green-500" },
                  { name: "users-store.ts", desc: "User management dialogs", icon: Users, color: "text-purple-500" },
                  { name: "tasks-store.ts", desc: "Task management dialogs", icon: Target, color: "text-orange-500" }
                ].map((store, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <store.icon className={`h-5 w-5 ${store.color}`} />
                    <div className="flex-1">
                      <div className="font-mono text-sm font-medium">{store.name}</div>
                      <div className="text-xs text-muted-foreground">{store.desc}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Developer Tools</CardTitle>
                <CardDescription>Built-in debugging utilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium text-sm mb-1">Global Reset</div>
                    <code className="text-xs text-muted-foreground">window.__STORE_UTILS__.resetAll()</code>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium text-sm mb-1">State Inspector</div>
                    <code className="text-xs text-muted-foreground">window.__STORE_UTILS__.getState()</code>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="font-medium text-sm mb-1">Direct Access</div>
                    <code className="text-xs text-muted-foreground">window.__STORE_UTILS__.ui</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Usage Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CodeBlock
                title="Basic Store Usage"
                id="basic-store"
                code={`import { useTheme, useAuth, useUsers } from '@/stores'

function MyComponent() {
  const { theme, setTheme } = useTheme()
  const { user, logout, hasRole } = useAuth()
  const { openAddDialog, currentUser } = useUsers()
  
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <h1>Welcome {user?.name}!</h1>
      {hasRole('admin') && (
        <Button onClick={openAddDialog}>
          Add User
        </Button>
      )}
    </div>
  )
}`}
              />

              <CodeBlock
                title="Creating Custom Stores"
                id="custom-store"
                code={`import { create } from 'zustand'

interface ProductState {
  products: Product[]
  currentProduct: Product | null
  isLoading: boolean
  
  // Actions
  setProducts: (products: Product[]) => void
  setCurrentProduct: (product: Product | null) => void
  setLoading: (loading: boolean) => void
  reset: () => void
}

export const useProductStore = create<ProductState>((set) => ({
  // Initial state
  products: [],
  currentProduct: null,
  isLoading: false,
  
  // Actions (pure functions)
  setProducts: (products) => set({ products }),
  setCurrentProduct: (currentProduct) => set({ currentProduct }),
  setLoading: (isLoading) => set({ isLoading }),
  
  // Reset function
  reset: () => set({
    products: [],
    currentProduct: null,
    isLoading: false
  }),
}))`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced UI Tab */}
        <TabsContent value="ui" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Layout}
              title="Layout Components"
              description="Structure your application"
              features={[
                "Responsive sidebar navigation",
                "Header with breadcrumbs",
                "Footer with links",
                "Content areas with proper spacing",
                "Modal dialogs and sheets"
              ]}
            />
            <FeatureCard
              icon={Database}
              title="Data Display"
              description="Present information beautifully"
              features={[
                "Data tables with sorting",
                "Cards and containers",
                "Charts and graphs",
                "Lists and grids",
                "Progress indicators"
              ]}
            />
            <FeatureCard
              icon={Smartphone}
              title="Interactive Elements"
              description="Engage your users"
              features={[
                "Buttons and controls",
                "Form inputs and validation",
                "Dropdowns and selects",
                "Toggle switches",
                "Command palette"
              ]}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Theme System Deep Dive</CardTitle>
              <CardDescription>Advanced theming capabilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Color System</h4>
                  <div className="space-y-3">
                    {[
                      { name: "Primary", class: "bg-primary", desc: "Brand color" },
                      { name: "Secondary", class: "bg-secondary", desc: "Supporting color" },
                      { name: "Muted", class: "bg-muted", desc: "Subtle backgrounds" },
                      { name: "Accent", class: "bg-accent", desc: "Highlight color" }
                    ].map((color, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg ${color.class} border`}></div>
                        <div>
                          <div className="font-medium text-sm">{color.name}</div>
                          <div className="text-xs text-muted-foreground">{color.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Theme Implementation</h4>
                  <CodeBlock
                    title="Theme Usage"
                    id="theme-usage"
                    code={`const { theme, setTheme } = useTheme()

// Theme options
setTheme('light')  // Light mode
setTheme('dark')   // Dark mode  
setTheme('system') // Follow OS preference

// CSS classes automatically applied
<div className="bg-background text-foreground">
  Content adapts to theme
</div>`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Auth Tab */}
        <TabsContent value="auth" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>Authentication Flow</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { step: 1, title: "Login Request", desc: "User submits credentials" },
                    { step: 2, title: "JWT Generation", desc: "Server creates access/refresh tokens" },
                    { step: 3, title: "Secure Storage", desc: "Tokens stored in httpOnly cookies" },
                    { step: 4, title: "Auto Refresh", desc: "Silent token refresh before expiry" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Role-Based Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock
                  title="Role-Based Access Example"
                  id="role-example"
                  code={`const { user, hasRole, hasAnyRole } = useAuth()

// Check single role
if (hasRole('admin')) {
  return <AdminPanel />
}

// Check multiple roles
if (hasAnyRole(['admin', 'moderator'])) {
  return <ModerationTools />
}

// User object structure
console.log(user) // {
//   id: 'user-123',
//   name: 'John Doe',
//   email: 'john@example.com',
//   roles: ['user', 'admin'],
//   permissions: ['read', 'write', 'delete']
// }`}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Security Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: ShieldCheck, title: "Secure Cookies", desc: "HttpOnly, Secure, SameSite" },
                  { icon: Clock, title: "Auto Refresh", desc: "Silent token renewal" },
                  { icon: Eye, title: "Permission Guards", desc: "Component-level protection" },
                  { icon: Terminal, title: "Session Management", desc: "Automatic cleanup" },
                  { icon: Target, title: "Role Validation", desc: "Backend verification" },
                  { icon: Monitor, title: "Device Tracking", desc: "Multi-device sessions" }
                ].map((feature, index) => (
                  <div key={index} className="p-4 rounded-lg border text-center hover:bg-muted/50 transition-colors">
                    <feature.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-medium text-sm">{feature.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{feature.desc}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Complete Auth Example</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                title="Protected Route Component"
                id="protected-route"
                code={`import { useAuth } from '@/stores'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function ProtectedRoute({ 
  children, 
  requiredRole = null,
  fallback = <LoginPage />
}) {
  const { user, isAuthenticated, hasRole, isLoading } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, isLoading, router])
  
  if (isLoading) {
    return <LoadingSpinner />
  }
  
  if (!isAuthenticated) {
    return fallback
  }
  
  if (requiredRole && !hasRole(requiredRole)) {
    return <UnauthorizedPage />
  }
  
  return children
}

// Usage
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced i18n Tab */}
        <TabsContent value="i18n" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { flag: "🇺🇸", name: "English", code: "en", desc: "Default language", features: ["Complete translations", "Primary development language"] },
              { flag: "🇫🇷", name: "Français", code: "fr", desc: "French translation", features: ["Full feature coverage", "European market ready"] },
              { flag: "🇸🇦", name: "العربية", code: "ar", desc: "Arabic (RTL)", features: ["Right-to-left support", "Complete Arabic translations"] }
            ].map((lang, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{lang.flag}</div>
                  <div className="font-semibold text-lg">{lang.name}</div>
                  <div className="text-sm text-muted-foreground mb-3">{lang.desc}</div>
                  <div className="space-y-1">
                    {lang.features.map((feature, i) => (
                      <div key={i} className="text-xs bg-muted px-2 py-1 rounded">{feature}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Advanced i18n Features</CardTitle>
              <CardDescription>Powered by i18next with enhanced capabilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Interpolation</h4>
                  <CodeBlock
                    title="Interpolation Example"
                    id="interpolation"
                    code={`// Translation file
export const en = {
  'user_greeting': 'Hello {{name}}!',
  'items_count': 'You have {{count}} items'
}

// Component usage
const greeting = t('user_greeting', { name: 'John' })
const itemCount = t('items_count', { count: 5 })
// Result: "Hello John!", "You have 5 items"`}
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Pluralization</h4>
                  <CodeBlock
                    title="Pluralization Example"
                    id="pluralization"
                    code={`// Translation file
export const en = {
  'item_count_zero': 'No items',
  'item_count_one': '{{count}} item', 
  'item_count_other': '{{count}} items'
}

// Component usage
const itemText = tp('item_count', itemCount)
// Auto selects correct plural form`}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">RTL Support & Formatting</h4>
                <CodeBlock
                  title="Advanced Utilities"
                  id="rtl-formatting"
                  code={`import { 
  getDirection, 
  isRTL, 
  formatNumber, 
  formatDate 
} from '@/lib/i18n/utils'

function InternationalComponent() {
  return (
    <div 
      dir={getDirection()} 
      className={isRTL() ? 'text-right' : 'text-left'}
    >
      <p>{formatNumber(1234.56, { 
        style: 'currency', 
        currency: 'USD' 
      })}</p>
      <p>{formatDate(new Date(), { 
        dateStyle: 'long' 
      })}</p>
    </div>
  )
}`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* New API Reference Tab */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code2 className="h-5 w-5" />
                <span>API Reference</span>
              </CardTitle>
              <CardDescription>Complete API documentation for all stores and utilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* API sections with collapsible content */}
              {[
                {
                  title: "UI Store API",
                  icon: Settings,
                  methods: [
                    { name: "setTheme(theme)", desc: "Change theme: 'light' | 'dark' | 'system'" },
                    { name: "setFont(font)", desc: "Change font family" },
                    { name: "setLanguage(lang)", desc: "Change language: 'en' | 'fr' | 'ar'" },
                    { name: "toggleSearch()", desc: "Toggle command palette" },
                    { name: "reset()", desc: "Reset UI state to defaults" }
                  ]
                },
                {
                  title: "Auth Store API", 
                  icon: Shield,
                  methods: [
                    { name: "login(credentials)", desc: "Authenticate user with email/password" },
                    { name: "logout()", desc: "Clear session and redirect to login" },
                    { name: "hasRole(role)", desc: "Check if user has specific role" },
                    { name: "hasAnyRole(roles)", desc: "Check if user has any of the specified roles" },
                    { name: "refreshTokens()", desc: "Manually refresh access tokens" }
                  ]
                },
                {
                  title: "Feature Store APIs",
                  icon: Users,
                  methods: [
                    { name: "openAddDialog()", desc: "Open add/create dialog" },
                    { name: "openEditDialog()", desc: "Open edit dialog" },
                    { name: "openViewDialog()", desc: "Open view/details dialog" },
                    { name: "setCurrentItem(item)", desc: "Set currently selected item" },
                    { name: "reset()", desc: "Reset all dialog states" }
                  ]
                }
              ].map((section, index) => (
                <div key={index} className="border rounded-lg">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <section.icon className="h-5 w-5 text-primary" />
                      <span className="font-semibold">{section.title}</span>
                    </div>
                    {expandedSections[section.title] ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </button>
                  {expandedSections[section.title] && (
                    <div className="px-4 pb-4 space-y-3 border-t bg-muted/20">
                      {section.methods.map((method, i) => (
                        <div key={i} className="flex items-start space-x-3 py-2">
                          <code className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">
                            {method.name}
                          </code>
                          <span className="text-sm text-muted-foreground">{method.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Setup Tab */}
        <TabsContent value="setup" className="space-y-6">
          <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
            <Rocket className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800 dark:text-blue-200">Quick Start</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-300">
              Get up and running in under 5 minutes with this production-ready template.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Installation Guide</CardTitle>
                <CardDescription>Step-by-step setup process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { 
                    step: 1, 
                    title: "Clone Repository", 
                    command: "git clone <repository-url>",
                    desc: "Get the latest template code"
                  },
                  { 
                    step: 2, 
                    title: "Install Dependencies", 
                    command: "npm install",
                    desc: "Install all required packages"
                  },
                  { 
                    step: 3, 
                    title: "Environment Setup", 
                    command: "cp .env.example .env.local",
                    desc: "Configure environment variables"
                  },
                  { 
                    step: 4, 
                    title: "Start Development", 
                    command: "npm run dev",
                    desc: "Launch development server"
                  }
                ].map((step, index) => (
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
                <CardTitle>Environment Configuration</CardTitle>
                <CardDescription>Required environment variables</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Environment Variables</h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowSecrets(!showSecrets)}
                  >
                    {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <CodeBlock
                  title="Environment Variables"
                  id="env-vars"
                  code={`# Database
DATABASE_URL=${showSecrets ? '"postgresql://user:pass@localhost:5432/db"' : '"your_database_url"'}

# Authentication
JWT_SECRET=${showSecrets ? '"your-super-secure-jwt-secret-key"' : '"your_jwt_secret"'}
JWT_EXPIRES_IN=${showSecrets ? '"24h"' : '"24h"'}

# External APIs
NEXT_PUBLIC_API_URL=${showSecrets ? '"https://api.yourapp.com"' : '"your_api_url"'}

# Optional: Analytics
NEXT_PUBLIC_GA_ID=${showSecrets ? '"G-XXXXXXXXXX"' : '"your_analytics_id"'}`}
                />
                
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    Never commit your <code>.env.local</code> file. Use <code>.env.example</code> as a template for required variables.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Development Scripts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { command: "npm run dev", desc: "Start development server with hot reload", icon: Play },
                  { command: "npm run build", desc: "Create optimized production build", icon: Package },
                  { command: "npm run start", desc: "Start production server", icon: Rocket },
                  { command: "npm run lint", desc: "Run ESLint and check code quality", icon: CheckCircle },
                  { command: "npm run type-check", desc: "Run TypeScript type checking", icon: FileText },
                  { command: "npm run analyze", desc: "Analyze bundle size and dependencies", icon: TrendingUp }
                ].map((script, index) => (
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
              <CardTitle>Troubleshooting</CardTitle>
              <CardDescription>Common issues and solutions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  issue: "Port 3000 already in use",
                  solution: "Use npm run dev -- -p 3001 to run on different port"
                },
                {
                  issue: "TypeScript errors after installation", 
                  solution: "Run npm run type-check to identify and fix type issues"
                },
                {
                  issue: "Theme not persisting",
                  solution: "Check if localStorage is available and cookies are enabled"
                },
                {
                  issue: "Translation keys not found",
                  solution: "Verify translation files are properly exported in lib/translations/index.ts"
                }
              ].map((item, index) => (
                <div key={index} className="p-4 rounded-lg border-l-4 border-amber-500 bg-amber-50/50 dark:bg-amber-950/20">
                  <div className="font-medium text-sm mb-1">❓ {item.issue}</div>
                  <div className="text-sm text-muted-foreground">💡 {item.solution}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Enhanced Footer */}
      <div className="relative mt-12 py-8 border-t bg-gradient-to-r from-muted/30 to-transparent rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-lg font-medium">Built with ❤️ using modern technologies</p>
            <p className="text-sm text-muted-foreground">
              Next.js 15 • Zustand • Shadcn/UI • i18next • TypeScript
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://github.com/hamzabelakri/nextjs-shadcn', '_blank')}
            >
              <Github className="h-4 w-4 mr-2" />
              View Source
            </Button>
            <Button 
              size="sm"
              onClick={() => window.open('https://github.com/hamzabelakri/nextjs-shadcn', '_blank')}
            >
              <Star className="h-4 w-4 mr-2" />
              Star on GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}