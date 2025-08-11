'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { ForgotPasswordForm } from './components/forgot-password-form'
import AuthLayout from '../layout'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const page = () => {
  const { t } = useTranslation()
  
  return (
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>
            {t('forgot_password')}
          </CardTitle>
          <CardDescription>
            {t('enter_registered_email_reset')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground px-8 text-center text-sm'>
            {t('dont_have_account')}{' '}
            <Link
              href='/sign-up'
              className='hover:text-primary underline underline-offset-4'
            >
              {t('sign_up')}
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
  )
}

export default page
