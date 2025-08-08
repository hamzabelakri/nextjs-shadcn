'use client';

import { useEffect, useState, useMemo } from 'react';
import { useAuthStore } from '@/store/authStore';
import ProtectedRoute from '@/components/auth/protected-route';
import { Main } from '@/components/layout/main';
import { fetchUserProfile } from '@/utils/auth-helpers';
import { IconEdit, IconDeviceFloppy, IconUser } from '@tabler/icons-react';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { userAPI, UpdateUserRequest } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

export default function ProfilePage() {
  const { user, fetchProfile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  // Create a stable user object to prevent re-renders
  const stableUser = useMemo(() => user, [user?.id, user?.username, user?.name, user?.email, user?.phone_number, user?.role, user?.status, user?.created_at, user?.updated_at]);
  
  const [formData, setFormData] = useState<{
    username: string;
    name: string;
    email: string;
    phone_number: string;
    password: string;
    confirmPassword: string;
  }>({
    username: '',
    name: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (profileLoaded) return; // Prevent multiple loads
      
      try {
        // Use the helper function to fetch user profile
        await fetchUserProfile();
        setIsLoading(false);
        setProfileLoaded(true);
        
        // Populate form data with current user data
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
          setFormData({
            username: currentUser.username || '',
            name: currentUser.name || '',
            email: currentUser.email || '',
            phone_number: currentUser.phone_number || '',
            password: '',
            confirmPassword: ''
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setIsLoading(false);
        toast({
          title: "Failed to load profile",
          description: "Couldn't retrieve your profile information. Please try again later.",
          variant: "destructive"
        });
      }
    };

    // Only load profile if we don't have user data and haven't loaded yet
    if (!stableUser && !profileLoaded) {
      loadProfile();
    } else if (stableUser && !profileLoaded) {
      // User data exists, just populate form
      setFormData({
        username: stableUser.username || '',
        name: stableUser.name || '',
        email: stableUser.email || '',
        phone_number: stableUser.phone_number || '',
        password: '',
        confirmPassword: ''
      });
      setIsLoading(false);
      setProfileLoaded(true);
    }
  }, [profileLoaded, toast, stableUser?.id]); // Use stable reference

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const currentUser = useAuthStore.getState().user;
    if (!currentUser?.id) return;
    
    // Validate password if provided
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Only include fields that have changed
      const updateData: UpdateUserRequest = {};
      if (formData.username !== currentUser.username) updateData.username = formData.username;
      if (formData.name !== currentUser.name) updateData.name = formData.name;
      if (formData.email !== currentUser.email) updateData.email = formData.email;
      if (formData.phone_number !== currentUser.phone_number) updateData.phone_number = formData.phone_number;
      if (formData.password) updateData.password = formData.password;
      
      // Only send request if there are changes
      if (Object.keys(updateData).length > 0) {
        await userAPI.updateUser(currentUser.id, updateData);
        
        // Refresh profile data
        await fetchProfile();
        
        toast({
          title: t('profile_updated_successfully'),
          description: t('profile_updated_desc'),
        });
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: t('failed_to_update_profile'),
        description: t('failed_update_desc'),
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <Main>
        <div className="mb-6 flex items-center space-x-2">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <IconUser className="size-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{t('profile_page_title')}</h1>
          {!isLoading && (
            <Button 
              variant={isEditing ? "default" : "outline"} 
              size="sm" 
              className="ml-auto"
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              disabled={isSaving}
            >
              {isEditing ? (
                <>
                  {isSaving ? <Spinner className="mr-2 h-4 w-4" /> : <IconDeviceFloppy className="mr-2 h-4 w-4" />}
                  {t('save_changes')}
                </>
              ) : (
                <>
                  <IconEdit className="mr-2 h-4 w-4" />
                  {t('edit_profile')}
                </>
              )}
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('user_information')}</CardTitle>
                <CardDescription>{t('profile_view_edit_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="username">{t('username')}</label>
                    {isEditing ? (
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="rounded-md border px-3 py-2">{stableUser?.username || 'N/A'}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="name">{t('name')}</label>
                    {isEditing ? (
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="rounded-md border px-3 py-2">{stableUser?.name || 'N/A'}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="email">{t('email')}</label>
                    {isEditing ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="rounded-md border px-3 py-2">{stableUser?.email || 'N/A'}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="phone_number">{t('phone_number')}</label>
                    {isEditing ? (
                      <Input
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="rounded-md border px-3 py-2">{stableUser?.phone_number || 'N/A'}</p>
                    )}
                  </div>
                  
                  {isEditing && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="password">{t('password_leave_blank')}</label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="confirmPassword">{t('confirm_password')}</label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}
                </div>
                
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium mb-1">{t('role')}</p>
                    <p className={`inline-block rounded px-3 py-1 text-sm ${stableUser?.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}>
                      {stableUser?.role || 'N/A'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">{t('status')}</p>
                    <p className={`inline-block rounded px-3 py-1 text-sm ${stableUser?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {stableUser?.status || 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>{t('account_created_on')}: {stableUser?.created_at ? new Date(stableUser.created_at).toLocaleDateString() : 'N/A'}</p>
                  <p>{t('last_updated')}: {stableUser?.updated_at ? new Date(stableUser.updated_at).toLocaleDateString() : 'N/A'}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Main>
    </ProtectedRoute>
  );
}
