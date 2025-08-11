"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthLayout from "../layout";
import { SignUpForm } from "./components/sign-up-form";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function SignUp() {
  const { t } = useTranslation();
  
  return (
    <>
      <p className="text-muted-foreground text-sm">
        {t('enter_email_password_create')} {t('already_have_account')}
        <Link
          href="/sign-in"
          className="hover:text-primary underline underline-offset-4"
        >
          {t('sign_in')}
        </Link>
      </p>
      <SignUpForm />
     
    </>
  );
}
