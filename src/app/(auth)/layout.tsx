"use client";

import { UserAuthForm } from "./sign-in/components/user-auth-form";
import FloatingElement from "./sign-in/components/floating-element";
import Logo from "./sign-in/components/logo";
import { useEffect, useState } from "react";
import { AuroraText } from "@/components/magicui/aurora-text";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden transition-opacity duration-700 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Left column - branding and visuals */}
      <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r overflow-hidden">
        {/* Dynamic gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
          {/* Subtle animated gradient orbs */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-400/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-300/5 rounded-full blur-3xl animate-float animation-delay-1000" />
        </div>

        {/* Animated pattern overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-30" />
        </div>

        {/* Header with logo */}
        <Logo />

        {/* Center content */}
        <div className="relative z-20 flex flex-col items-center justify-center flex-1 mt-4">
          <div className="max-w-md space-y-4">
            <p className="text-blue-100 text-base leading-relaxed">
              Transforming urban mobility with intelligent technology and
              data-driven insights for the modern city
            </p>
          </div>

          <FloatingElement />
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight">
              <AuroraText>Starter-Kit-Template</AuroraText>
            </h1>
          </div>
          {children}
          <section>
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
          </section>
        </div>
      </div>
    </div>
  );
}
