"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';

export function ProfileDropdown() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, token, logout } = useAuthStore();
  
  // Add state to force re-render when user data changes
  const [userDisplayData, setUserDisplayData] = useState({
    username: 'User',
    email: 'user@example.com'
  });
  
  // Initialize data from localStorage on component mount
  useEffect(() => {
    console.log('ProfileDropdown: Auth store state:', {
      hasUser: !!user,
      user: user,
      hasToken: !!token
    });
    
    if (user) {
      console.log('Using data from auth store');
      setUserDisplayData({
        username: user.username || user.name || 'User',
        email: user.email || 'user@example.com'
      });
    } else {
      console.log('Auth store has no user, checking localStorage');
      // Fallback: check localStorage for user data
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('jwt_token');
      
      if (storedUser && storedToken) {
        try {
          const parsed = JSON.parse(storedUser);
          console.log('Found user in localStorage:', parsed);
          setUserDisplayData({
            username: parsed.username || parsed.name || 'User',
            email: parsed.email || 'user@example.com'
          });
        } catch (e) {
          console.error('Failed to parse stored user:', e);
        }
      }
    }
  }, [user, token]); // React to auth store changes
  
  const handleLogout = () => {
    // Access the logout function directly
    if (typeof logout === 'function') {
      logout();
    } else {
      // Fallback manual logout if the function is not available
      localStorage.removeItem('jwt_token');
      document.cookie = "jwt_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    router.push('/sign-in');
  }
  
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarFallback>
              <IconUser size={16} />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>{userDisplayData.username}</p>
            <p className='text-muted-foreground text-xs leading-none'>
              {userDisplayData.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href='/profile'>
              {t('profile')}
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/settings'>
              {t('settings')}
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive' onClick={handleLogout}>
          {t('logout')}
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
