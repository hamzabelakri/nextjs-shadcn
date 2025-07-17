"use client";

import { useState, useEffect } from "react";
import { Camera, Car, MapPin, TrendingUp, ShieldCheck } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useRouter } from "next/navigation";
import { UserAuthForm } from "../sign-in/components/user-auth-form";
import FloatingElement from "./components/floating-element";
import Logo from "./components/logo";
import AuthLayout from "../layout";

export default function AsteroideaSignIn() {
  // Add some stateful effects for enhanced UI/UX
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <p className="text-muted-foreground text-sm">
        Enter your email and password below <br />
        to log into your account
      </p>

      <UserAuthForm />
      <p className="text-muted-foreground px-8 text-center text-sm">
        By clicking login, you agree to our{" "}
        <a
          href="/terms"
          className="hover:text-primary underline underline-offset-4"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="/privacy"
          className="hover:text-primary underline underline-offset-4"
        >
          Privacy Policy
        </a>
        .
      </p>
    </>
  );
}
