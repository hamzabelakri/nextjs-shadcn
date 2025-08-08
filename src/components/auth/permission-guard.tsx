'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useUserPermissions } from '@/hooks/useUserPermissions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

interface PermissionGuardProps {
  children: React.ReactNode;
  module: string; // e.g., 'users', 'roles', 'settings', etc.
  action?: 'view' | 'create' | 'edit' | 'delete';
  fallbackRoute?: string; // Route to redirect to if permission denied
  showAccessDenied?: boolean; // Show access denied message instead of redirect
  loading?: React.ReactNode; // Custom loading component
}

export default function PermissionGuard({ 
  children, 
  module, 
  action = 'view',
  fallbackRoute = '/dashboard',
  showAccessDenied = false,
  loading
}: PermissionGuardProps) {
  const { isAuthenticated, hasPermission } = useUserPermissions();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkPermissions = () => {
      // If user is not authenticated, let auth guard handle it
      if (!isAuthenticated) {
        setIsChecking(false);
        setHasAccess(false);
        return;
      }

      // Check if user has the required permission
      const userHasPermission = hasPermission(module, action);

      if (userHasPermission) {
        setHasAccess(true);
      } else {
        setHasAccess(false);
        
        if (!showAccessDenied) {
          // Redirect to fallback route immediately
          console.log(`Access denied to ${module}. Redirecting to ${fallbackRoute}`);
          router.replace(fallbackRoute);
          return;
        }
      }
      
      setIsChecking(false);
    };

    // Check permissions once auth is initialized
    if (isAuthenticated !== undefined) {
      checkPermissions();
    }
  }, [isAuthenticated, hasPermission, module, action, router, fallbackRoute, showAccessDenied]);

  // Show loading while checking permissions
  if (isChecking || isAuthenticated === undefined) {
    if (loading) {
      return <>{loading}</>;
    }
    
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show access denied message if configured to do so
  if (!hasAccess && showAccessDenied && isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <ShieldAlert className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access this page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              This page requires <strong>{action}</strong> permission for the <strong>{module}</strong> module. 
              Contact your administrator if you believe this is an error.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={() => router.back()}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              <Button 
                onClick={() => router.push('/dashboard')}
                className="flex-1"
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If access is denied and not showing access denied message, don't render anything
  // (redirect will happen in useEffect)
  if (!hasAccess) {
    return null;
  }

  // Render children if user has access
  return <>{children}</>;
}
