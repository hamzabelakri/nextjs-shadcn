"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const hasHydrated = useAuthStore?.persist?.hasHydrated();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && hasHydrated && !token) {
      router.replace("/sign-in");
    }
  }, [isClient, hasHydrated, token, router]);

  if (!isClient || !hasHydrated) {
    return null;
  }

  return <>{children}</>;
}