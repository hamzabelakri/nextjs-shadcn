"use client";

import { useState, useEffect } from "react";
import { Camera, Car, MapPin, TrendingUp, ShieldCheck } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useRouter } from "next/navigation";
import { UserAuthForm } from "./components/user-auth-form";
import FloatingElement from "./components/floating-element";
import Logo from "./components/logo";
import AuthLayout from "../layout";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function SignIn2() {
  const { t } = useTranslation();

  return (
    <>
      <p className="text-muted-foreground text-sm">
        {t('enter_email_password')} <br />
        {t('dont_have_account')}
        <Link
          href="/sign-up"
          className="hover:text-primary underline underline-offset-4"
        >
          {t('sign_up')}
        </Link>
      </p>

      <UserAuthForm />
     
    </>
  );
}
