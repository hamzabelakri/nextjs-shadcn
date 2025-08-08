'use client';

import { useAuthStore } from '@/store/authStore';
import { authAPI, userAPI } from '@/lib/api';

/**
 * Utility function to fetch user profile data.
 * This works as a fallback method when authStore's fetchProfile is not available.
 */
export async function fetchUserProfile() {
  const authStore = useAuthStore.getState();
  
  try {
    console.log('Fetching user profile...');
    console.log('Auth state:', {
      hasToken: !!authStore.token,
      hasUser: !!authStore.user,
      hasFetchProfile: typeof authStore.fetchProfile === 'function'
    });
    
    // First try to use the built-in fetchProfile method if available
    if (typeof authStore.fetchProfile === 'function') {
      console.log('Using built-in fetchProfile method');
      return await authStore.fetchProfile();
    }
    
    // Fallback: If there's a token but no fetchProfile method
    if (authStore.token) {
      console.log('Using fallback API call to fetch profile');
      // Ensure token is set for the API call
      authAPI.setAuthToken(authStore.token);
      
      // Try to get dummy user data for development
      // You can change this to test different permission levels:
      
      // Admin user with full permissions (granular format)
      const dummyAdminUser = {
        id: 1,
        username: 'admin',
        name: 'Admin User',
        email: 'admin@asteroidea.com',
        phone_number: '+1234567890',
        status: 'active',
        role: 'admin',
        role_id: 1,
        permissions: {
          dashboard: "1,1,1,1",  // Full access: view, create, edit, delete
          users: "1,1,1,1",      // Full access  
          roles: "1,1,1,1",      // Full access
          audit: "1,0,0,0",      // View only
          settings: "1,1,1,0"    // View, create, edit but no delete
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Manager user with limited permissions (granular format)
      const dummyManagerUser = {
        id: 2,
        username: 'manager',
        name: 'Manager User',
        email: 'manager@asteroidea.com',
        phone_number: '+1234567891',
        status: 'active',
        role: 'manager',
        role_id: 2,
        permissions: {
          dashboard: "1,0,0,0",  // View only
          users: "1,1,1,0",      // View, create, edit but no delete
          roles: "1,0,0,0",      // View only - can view but not edit/delete
          audit: "1,0,0,0",      // View only
          settings: "1,0,0,0"    // View only
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Use admin user by default, change to dummyManagerUser to test limited permissions
      const dummyUser = dummyAdminUser; // Use admin user for full access
      
      // Update the user in store using setUser method
      if (typeof authStore.setUser === 'function') {
        console.log('Setting user in store with dummy data');
        authStore.setUser(dummyUser);
        return dummyUser;
      }
      
      // First try to get profile from API (commented out for now, use in production)
      // try {
      //   console.log('Fetching user profile from API');
      //   const { data } = await authAPI.getProfile();
      //   
      //   // Update the user in store if setUser method is available
      //   if (typeof authStore.setUser === 'function') {
      //     authStore.setUser(data);
      //   }
      //   
      //   return data;
      // } catch (error) {
      //   console.error('Error fetching profile:', error);
      //   
      //   // If we have user data with ID, try to get specific user
      //   if (authStore.user?.id) {
      //     const { data } = await userAPI.getUser(authStore.user.id);
      //     
      //     // Update the user in store if setUser method is available
      //     if (typeof authStore.setUser === 'function') {
      //       authStore.setUser(data);
      //     }
      //     
      //     return data;
      //   }
      // }
    }
    
    return null;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
}
