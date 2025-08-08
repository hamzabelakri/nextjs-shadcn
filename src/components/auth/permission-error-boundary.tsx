'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface PermissionErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  isPermissionError: boolean;
}

interface PermissionErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

export class PermissionErrorBoundary extends React.Component<
  PermissionErrorBoundaryProps,
  PermissionErrorBoundaryState
> {
  constructor(props: PermissionErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isPermissionError: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<PermissionErrorBoundaryState> {
    const isPermissionError = 
      error.message.includes('permission') ||
      error.message.includes('unauthorized') ||
      error.message.includes('access denied') ||
      error.message.includes('403');

    return {
      hasError: true,
      error,
      isPermissionError,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log permission errors to monitoring service
    console.error('Permission Error Boundary caught an error:', error, errorInfo);
  }

  retry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      isPermissionError: false,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} retry={this.retry} />;
      }

      if (this.state.isPermissionError) {
        return (
          <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[400px]">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl font-bold">Permission Error</CardTitle>
                <CardDescription>
                  There was an issue with your permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  {this.state.error?.message || 'An unexpected permission error occurred.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    onClick={this.retry}
                    className="flex-1"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/dashboard'}
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

      // General error fallback
      return (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Something went wrong</CardTitle>
              <CardDescription>
                An unexpected error occurred
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                {this.state.error?.message || 'Please try again or contact support if the problem persists.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  onClick={this.retry}
                  className="flex-1"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button 
                  onClick={() => window.location.href = '/dashboard'}
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

    return this.props.children;
  }
}
