'use client';

import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

export default function DashboardAuthCheck() {
  const { user, token } = useAuthStore();
  const isAuthenticated = !!token;
  
  useEffect(() => {
    // Log auth status on dashboard load
    console.log('Dashboard loaded - Auth Status:');
    console.log('Is authenticated:', isAuthenticated);
    console.log('Current user:', user);
    console.log('Token exists:', !!token);
  }, [isAuthenticated, user, token]);
  
  return null; // Invisible component
}
