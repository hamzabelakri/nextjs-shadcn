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

export default function SignIn2() {

  return (
    <>
      <p className="text-muted-foreground text-sm">
        Enter your email and password below to log into your account. <br />
        Don't have an account?
        <Link
          href="/sign-up"
          className="hover:text-primary underline underline-offset-4"
        >
          Sign Up
        </Link>
      </p>

      <UserAuthForm />
     
    </>
  );
}
