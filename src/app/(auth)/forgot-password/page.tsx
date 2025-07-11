"use client";

import { useState, useEffect } from "react";
import { Camera, Car, MapPin, TrendingUp, ShieldCheck, ArrowLeft } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useRouter } from "next/navigation";

// Animated gradient text component
const GradientText = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 animate-gradient-x ${className}`}>
      {children}
    </span>
  );
};

// Floating element animation component
const FloatingElement = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  return (
    <div 
      className={`animate-float ${className}`} 
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

// Animated logo component
const AnimatedLogo = () => {
  return (
    <div className="relative flex items-center justify-center group">
      {/* Logo with floating animation */}
      <div className="relative z-10 transform transition-all duration-500 group-hover:scale-105">
        <img
          src="https://www.mbdesign-tn.com/wp-content/uploads/2022/01/logo-Asteroidea.jpg"
          alt="Asteroidea"
          className="h-32 w-auto object-contain drop-shadow-lg rounded-lg"
        />
        
        {/* Animated highlight overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer rounded-lg" />
      </div>
      
      {/* Animated rings around logo */}
      <div className="absolute inset-0 -m-2 rounded-full border border-blue-400/30 animate-pulse" />
      <div className="absolute inset-0 -m-4 rounded-full border border-blue-300/20 animate-pulse animation-delay-700" />
    </div>
  );
};

// Forgot password form component
const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [formFocus, setFormFocus] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 1500);
  };

  const handleBackToSignIn = () => {
    router.push('/sign-in-2');
  };

  if (emailSent) {
    return (
      <div className="grid gap-6 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Email sent!</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We've sent a password reset link to <span className="font-medium">{email}</span>
          </p>
        </div>
        
        <button
          type="button"
          onClick={handleBackToSignIn}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label 
            htmlFor="email" 
            className={`text-sm font-medium leading-none transition-colors duration-200 ${formFocus === 'email' ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'}`}
          >
            Email
          </label>
          <div className={`relative transition-all duration-300 ${formFocus === 'email' ? 'scale-[1.02]' : ''}`}>
            <input
              id="email"
              type="email" 
              className="flex h-11 w-full rounded-md border-0 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
              placeholder="name@asteroidea.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFormFocus('email')}
              onBlur={() => setFormFocus(null)}
            />
            <div className={`absolute inset-0 rounded-md bg-blue-500/10 opacity-0 transition-opacity duration-300 pointer-events-none ${formFocus === 'email' ? 'opacity-100' : ''}`} />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="relative inline-flex h-11 items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group overflow-hidden"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          <span className="absolute inset-0 overflow-hidden rounded-md">
            <span className="absolute inset-0 rounded-md bg-[linear-gradient(40deg,transparent,transparent,transparent,#fff,transparent,transparent,transparent)] opacity-20 group-hover:animate-shine"></span>
          </span>
          {isLoading ? (
            <>
              <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="animate-pulse">Sending...</span>
            </>
          ) : (
            <span className="flex items-center">
              Send Reset Link
              <svg 
                className="ml-2 h-4 w-0 transition-all duration-300 group-hover:w-4" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          )}
        </button>
      </div>
      
      <div className="text-center">
        <button
          type="button"
          onClick={handleBackToSignIn}
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

// Animated parking illustration component (same as sign-in)
const ParkingIllustration = () => {
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [carPosition, setCarPosition] = useState({ top: 50, left: 50 });
  
  useEffect(() => {
    // Animate car movement
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCarPosition({
          top: 30 + Math.random() * 40,
          left: 30 + Math.random() * 40
        });
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Parking spots data
  const spots = [
    { id: 0, status: 'occupied' },
    { id: 1, status: 'available' },
    { id: 2, status: 'occupied' },
    { id: 3, status: 'available' },
    { id: 4, status: 'occupied' },
    { id: 5, status: 'available' },
  ];

  return (
    <div className="relative w-full max-w-lg aspect-video">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl border border-blue-500/30 overflow-hidden shadow-2xl">
        {/* Road markings */}
        <div className="absolute inset-x-0 top-1/2 h-1 bg-white/50 transform -translate-y-1/2" />
        <div className="absolute inset-y-0 left-1/2 w-1 bg-white/50 transform -translate-x-1/2" />
        
        {/* Parking lot grid */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-3 p-6">
          {spots.map((spot) => (
            <div 
              key={spot.id} 
              className={`relative rounded-md border transition-all duration-500 cursor-pointer overflow-hidden
                ${spot.status === 'available' 
                  ? 'bg-blue-400/40 border-blue-400/60 hover:bg-blue-400/60' 
                  : 'bg-blue-800/40 border-blue-700/30 hover:bg-blue-800/60'} 
                ${highlighted === spot.id ? 'scale-105 ring-2 ring-white' : ''}`}
              onMouseEnter={() => setHighlighted(spot.id)}
              onMouseLeave={() => setHighlighted(null)}
            >
              {/* Status indicator */}
              <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                spot.status === 'available' ? 'bg-green-400 animate-pulse' : 'bg-red-400'
              }`} />
              
              {/* Spot number */}
              <div className="absolute bottom-1 left-1 text-[10px] text-white/70">
                P{spot.id + 1}
              </div>
              
              {/* Car icon in occupied spots */}
              {spot.status === 'occupied' && (
                <div className="absolute inset-0 flex items-center justify-center opacity-60">
                  <Car size={16} className="text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Animated car */}
        <div 
          className="absolute w-8 h-8 transition-all duration-1000 ease-in-out"
          style={{ 
            top: `${carPosition.top}%`, 
            left: `${carPosition.left}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="p-1.5 bg-blue-500 rounded-full animate-pulse shadow-md">
            <Car size={20} className="text-white" />
          </div>
        </div>
        
        {/* Data points animation */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-blue-300 rounded-full animate-ping"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Feature card component (same as sign-in)
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative bg-gradient-to-br from-blue-800/40 to-blue-700/30 p-3 rounded-xl border border-blue-400/30 transition-all duration-300 group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background pulse effect */}
      <div className={`absolute inset-0 bg-blue-400/10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Icon with animation */}
      <div className="relative flex items-center space-x-2">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">{title}</h3>
          <p className="text-xs text-blue-100/80">{description}</p>
        </div>
      </div>
      
      {/* Decorative particle effect on hover */}
      {isHovered && (
        <div className="absolute bottom-0 right-0 w-16 h-16 opacity-30">
          <div className="absolute w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{ top: '20%', left: '30%' }} />
          <div className="absolute w-1 h-1 bg-blue-300 rounded-full animate-ping animation-delay-200" style={{ top: '50%', left: '60%' }} />
          <div className="absolute w-1 h-1 bg-blue-300 rounded-full animate-ping animation-delay-500" style={{ top: '70%', left: '40%' }} />
        </div>
      )}
    </div>
  );
};

export default function AsteroideaForgotPassword() {
  // Add some stateful effects for enhanced UI/UX
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className={`relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
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
        <div className="relative z-20 flex items-center">
          <AnimatedLogo />
        </div>
        
        {/* Center content */}
        <div className="relative z-20 flex flex-col items-center justify-center flex-1 mt-4">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white animate-gradient-x">
              <FloatingElement delay={0.5} className="inline-block">
                Reset Your Password
              </FloatingElement>
            </h2>
            
            <p className="text-blue-100 text-base leading-relaxed">
              Don't worry! Enter your email address and we'll send you a link to reset your password
            </p>
          </div>
          
          {/* Parking illustration */}
          <div className="mt-4">
            <FloatingElement delay={0.8}>
              <ParkingIllustration />
            </FloatingElement>
          </div>
          
          {/* Feature points */}
          <div className="mt-6 grid grid-cols-2 gap-4 w-full max-w-md">
            <FloatingElement delay={1}>
              <FeatureCard 
                icon={<Car className="text-white w-5 h-5" />}
                title="Real-time availability"
                description="Live parking spot tracking"
              />
            </FloatingElement>
            
            <FloatingElement delay={1.2}>
              <FeatureCard 
                icon={<Camera className="text-white w-5 h-5" />}
                title="Computer vision"
                description="AI-powered monitoring"
              />
            </FloatingElement>
            
            <FloatingElement delay={1.4}>
              <FeatureCard 
                icon={<MapPin className="text-white w-5 h-5" />}
                title="Smart navigation"
                description="Optimal route guidance"
              />
            </FloatingElement>
            
            <FloatingElement delay={1.6}>
              <FeatureCard 
                icon={<ShieldCheck className="text-white w-5 h-5" />}
                title="Secure payment"
                description="Frictionless transactions"
              />
            </FloatingElement>
          </div>
        </div>
        
        {/* Testimonial at bottom */}
        <div className="relative z-20 mt-6">
          <FloatingElement delay={2}>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 shadow-2xl">
              <div className="space-y-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-yellow-400" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-base font-medium">
                  "Asteroidea's system has reduced downtown congestion by 40% and improved our city's mobility index significantly."
                </p>
                <footer className="flex items-center mt-3 space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                    <span className="text-white font-bold text-sm">ZB</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-white text-sm">Zied Bradai</span>
                    <span className="text-blue-300 text-xs">Chief Technology Officer</span>
                  </div>
                </footer>
              </div>
            </div>
          </FloatingElement>
        </div>
      </div>
      
      {/* Right column - forgot password form */}
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[380px]">
          {/* Mobile logo - only visible on small screens */}
          <div className="lg:hidden flex justify-center mb-6">
            <AnimatedLogo />
          </div>
          
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              <AuroraText>Starterkit Template</AuroraText>
            </h1>
            
            <h2 className="text-4xl font-bold tracking-tight mb-2">
              <GradientText className="relative">
                Forgot Password
                {/* Decorative dots */}
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-ping animation-delay-700" />
              </GradientText>
            </h2>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Enter your email to receive password reset instructions
            </p>
          </div>
          
          {/* Auth form wrapper with enhanced animation */}
          <div className="relative group transform transition-all duration-300 hover:-translate-y-1">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500" />
            <div className="relative p-5 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 shadow-xl">
              <ForgotPasswordForm />
            </div>
          </div>
          
          <p className="px-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Remember your password?{" "}
            <a
              href="/sign-in-2"
              className="text-blue-500 hover:text-blue-600 underline underline-offset-4 transition-colors font-medium"
            >
              Sign in here
            </a>
          </p>
          
          {/* Support contact with animation */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-1 group">
            <span>Need help? Contact</span>
            <a href="mailto:support@asteroidea.com" className="text-blue-500 hover:text-blue-600 group-hover:underline transition-all duration-300 relative">
              support@asteroidea.com
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          </div>
        </div>
      </div>
      
      {/* CSS Animation classes (same as sign-in) */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shine {
          from {
            transform: translateX(-100%) rotate(45deg);
          }
          to {
            transform: translateX(300%) rotate(45deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-150%);
          }
          100% {
            transform: translateX(150%);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        
        .animate-shine {
          animation: shine 1.5s linear forwards;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}