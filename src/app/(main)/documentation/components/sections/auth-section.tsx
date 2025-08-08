"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield,
  ShieldCheck,
  Clock,
  Eye,
  Terminal,
  Target,
  Monitor
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { CodeBlock } from "../ui/code-block";

export function AuthSection() {
  const { t } = useTranslation();

  const authFlow = [
    { step: 1, title: t('login_request'), desc: t('user_submits_credentials') },
    { step: 2, title: t('jwt_generation'), desc: 'Server creates JWT token (24h expiry)' },
    { step: 3, title: t('secure_storage'), desc: t('tokens_stored_cookies') },
    { step: 4, title: t('auto_refresh'), desc: 'Automatic token refresh every 20 hours' }
  ];

  const securityFeatures = [
    { icon: ShieldCheck, title: t('secure_cookies'), desc: "HttpOnly, Secure, SameSite" },
    { icon: Clock, title: t('auto_refresh'), desc: 'Auto-refresh 4h before expiry' },
    { icon: Eye, title: t('permission_guards'), desc: t('component_level_protection') },
    { icon: Terminal, title: t('session_management'), desc: t('automatic_cleanup') },
    { icon: Target, title: t('role_validation'), desc: t('backend_verification') },
    { icon: Monitor, title: t('device_tracking'), desc: t('multi_device_sessions') }
  ];

  const roleExampleCode = `const { auth, hasRole, hasAnyRole } = useAuthStore()

// Check single role
if (hasRole('admin')) {
  return <AdminPanel />
}

// Check multiple roles
if (hasAnyRole(['admin', 'moderator'])) {
  return <ModerationTools />
}

// User object structure
console.log(auth.user) // {
//   accountNo: 'ACC-123',
//   email: 'john@example.com',
//   role: ['user', 'admin'],
//   exp: 1640995200
// }`;

  const protectedRouteCode = `import { useAuthStore } from '@/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function ProtectedRoute({ 
  children, 
  requiredRole = null,
  fallback = <LoginPage />
}) {
  const { auth, hasRole, isLoading } = useAuthStore()
  const router = useRouter()
  
  useEffect(() => {
    if (!isLoading && !auth.user) {
      router.push('/auth/login')
    }
  }, [auth.user, isLoading, router])
  
  if (isLoading) {
    return <LoadingSpinner />
  }
  
  if (!auth.user) {
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
</ProtectedRoute>`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span>{t('authentication_flow')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {authFlow.map((item, index) => (
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
            <CardTitle>{t('role_based_access')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock
              title={t('role_based_access_example')}
              id="role-example"
              code={roleExampleCode}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('security_features')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityFeatures.map((feature, index) => (
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
          <CardTitle>Token Refresh Management</CardTitle>
          <CardDescription>
            Automatic token refresh keeps users logged in seamlessly. Tokens are refreshed 4 hours before expiry.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock
            title="Manual Token Refresh"
            id="token-refresh"
            code={`// Manual token refresh
import { useAuthStore } from '@/store/authStore'

const auth = useAuthStore(state => state.auth)

// Refresh token manually
try {
  await auth.refreshToken()
  console.log('Token refreshed successfully')
} catch (error) {
  console.error('Refresh failed:', error)
  // User will be logged out automatically
}

// Start/stop auto-refresh
auth.startAutoRefresh()  // Starts 20-hour interval
auth.stopAutoRefresh()   // Stops auto-refresh

// Auto-refresh is handled automatically:
// - Started after login/register
// - Started when restoring session
// - Stopped on logout
// - API interceptor handles 401 responses`}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('complete_auth_example')}</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock
            title={t('protected_route_component')}
            id="protected-route"
            code={protectedRouteCode}
          />
        </CardContent>
      </Card>
    </div>
  );
}
