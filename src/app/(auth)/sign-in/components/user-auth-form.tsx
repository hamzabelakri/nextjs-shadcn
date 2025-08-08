"use client"

import { HTMLAttributes, useState, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/store/authStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { fetchUserProfile } from '@/utils/auth-helpers'


type UserAuthFormProps = HTMLAttributes<HTMLFormElement>

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
})

// Import API functions directly as a fallback
import { authAPI } from '@/lib/api'

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setUser, setToken } = useAuthStore() // Get the auth methods

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'admin@asteroidea.com',
      password: 'admin123',
    },
  })

  const router = useRouter();
  const searchParams = useSearchParams();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)
    
    try {
      // Use direct API call for login
      const response = await authAPI.login({
        email: data.email,
        password: data.password
      });
      
      // Store token in local storage and cookie for immediate access
      localStorage.setItem('jwt_token', response.data.token);
      document.cookie = `jwt_token=${response.data.token}; path=/; max-age=86400; samesite=lax`;
      
      // Since we might not get real user data from the API, create a dummy user if needed
      // In a real app with a working backend, you'd use response.data.user directly
      const userData = response.data.user || {
        id: 1,
        username: data.email.split('@')[0],
        name: data.email.split('@')[0].charAt(0).toUpperCase() + data.email.split('@')[0].slice(1),
        email: data.email,
        status: 'active',
        role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Store user data in localStorage for backup
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Update the auth store with both token and user data
      console.log('Auth store structure check:', {
        hasSetUser: typeof setUser === 'function',
        hasSetToken: typeof setToken === 'function',
        methods: 'setUser and setToken available'
      });
      
      // Use the auth store methods to update data
      if (setUser && setToken) {
        setUser(userData);
        setToken(response.data.token);
        console.log('User and token set in store via methods:', userData);
      } else {
        // Fallback to direct state update
        const storeState = useAuthStore.getState();
        useAuthStore.setState({
          user: userData,
          token: response.data.token,
          isLoading: false,
          error: null
        });
        console.log('Store updated directly (fallback method)');
      }
      
      console.log('Store state after update:', useAuthStore.getState());
      
      // Get the callbackUrl from search params or default to dashboard
      const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
      
      // Reset loading before navigating
      setIsLoading(false);
      
      // Use router for navigation
      router.push(callbackUrl);
    } catch (err: any) {
      console.error('Login failed:', err);
      // Extract error message from different possible sources
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error ||
                          err.message ||
                          'Login failed. Please check your credentials.';
      
      setError(errorMessage);
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
              <Link
                href='/forgot-password'
                className='text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75'
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />
        {error && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
            {error}
          </div>
        )}
        
        <Button className='mt-2' disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        <div className='relative my-2'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background text-muted-foreground px-2'>
              Or continue with
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <Button variant='outline' type='button' disabled={isLoading}>
            <IconBrandGithub className='h-4 w-4' /> GitHub
          </Button>
          <Button variant='outline' type='button' disabled={isLoading}>
            <IconBrandFacebook className='h-4 w-4' /> Facebook
          </Button>
        </div>
      </form>
    </Form>
  )
}
