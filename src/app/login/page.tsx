'use client';

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginRedirectComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Preserve any callbackUrl in the redirect
    const callbackUrl = searchParams.get('callbackUrl');
    const redirectUrl = callbackUrl 
      ? `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`
      : '/sign-in';
    
    router.replace(redirectUrl);
  }, [router, searchParams]);
  
  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to sign-in page...</p>
    </div>
  );
}

export default function LoginRedirect() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    }>
      <LoginRedirectComponent />
    </Suspense>
  );
}
