"use client";


import React from 'react'



import { useState, useEffect } from "react";
import { Camera, Car, MapPin, TrendingUp, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

const FloatingElement1 = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  return (
    <div
      className={`animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-gradient-to-br from-blue-800/40 to-blue-700/30 p-3 rounded-xl border border-blue-400/30 transition-all duration-300 group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background pulse effect */}
      <div
        className={`absolute inset-0 bg-blue-400/10 transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Icon with animation */}
      <div className="relative flex items-center space-x-2">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs text-blue-100/80">{description}</p>
        </div>
      </div>

      {/* Decorative particle effect on hover */}
      {isHovered && (
        <div className="absolute bottom-0 right-0 w-16 h-16 opacity-30">
          <div
            className="absolute w-1 h-1 bg-blue-300 rounded-full animate-ping"
            style={{ top: "20%", left: "30%" }}
          />
          <div
            className="absolute w-1 h-1 bg-blue-300 rounded-full animate-ping animation-delay-200"
            style={{ top: "50%", left: "60%" }}
          />
          <div
            className="absolute w-1 h-1 bg-blue-300 rounded-full animate-ping animation-delay-500"
            style={{ top: "70%", left: "40%" }}
          />
        </div>
      )}
    </div>
  );
};

const ParkingIllustration = () => {
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [carPosition, setCarPosition] = useState({ top: 50, left: 50 });
  const [dataPoints, setDataPoints] = useState<Array<{top: number, left: number, delay: number, duration: number}>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Initialize data points for animation
    const points = Array.from({ length: 8 }, (_, i) => ({
      top: 20 + Math.random() * 60,
      left: 20 + Math.random() * 60,
      delay: i * 0.5,
      duration: 2 + Math.random() * 3,
    }));
    setDataPoints(points);

    // Animate car movement
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCarPosition({
          top: 30 + Math.random() * 40,
          left: 30 + Math.random() * 40,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Parking spots data
  const spots = [
    { id: 0, status: "occupied" },
    { id: 1, status: "available" },
    { id: 2, status: "occupied" },
    { id: 3, status: "available" },
    { id: 4, status: "occupied" },
    { id: 5, status: "available" },
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
                ${
                  spot.status === "available"
                    ? "bg-blue-400/40 border-blue-400/60 hover:bg-blue-400/60"
                    : "bg-blue-800/40 border-blue-700/30 hover:bg-blue-800/60"
                } 
                ${
                  highlighted === spot.id ? "scale-105 ring-2 ring-white" : ""
                }`}
              onMouseEnter={() => setHighlighted(spot.id)}
              onMouseLeave={() => setHighlighted(null)}
            >
              {/* Status indicator */}
              <div
                className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                  spot.status === "available"
                    ? "bg-green-400 animate-pulse"
                    : "bg-red-400"
                }`}
              />

              {/* Spot number */}
              <div className="absolute bottom-1 left-1 text-[10px] text-white/70">
                P{spot.id + 1}
              </div>

              {/* Car icon in occupied spots */}
              {spot.status === "occupied" && (
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
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="p-1.5 bg-blue-500 rounded-full animate-pulse shadow-md">
            <Car size={20} className="text-white" />
          </div>
        </div>

        {/* Data points animation */}
        {mounted && (
          <div className="absolute inset-0">
            {dataPoints.map((point, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-300 rounded-full animate-ping"
                style={{
                  top: `${point.top}%`,
                  left: `${point.left}%`,
                  animationDelay: `${point.delay}s`,
                  animationDuration: `${point.duration}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
const FloatingElement = () => {
  const { t } = useTranslation();
  
  return (
    <>
<div className="mt-4">
            <FloatingElement1 delay={0.8}>
              <ParkingIllustration />
            </FloatingElement1>
          </div>

         
          <div className="mt-6 grid grid-cols-2 gap-4 w-full max-w-md">
            <FloatingElement1 delay={1}>
              <FeatureCard
                icon={<Car className="text-white w-5 h-5" />}
                title={t('real_time_availability')}
                description={t('live_parking_spot_tracking')}
              />
            </FloatingElement1>

            <FloatingElement1 delay={1.2}>
              <FeatureCard
                icon={<Camera className="text-white w-5 h-5" />}
                title={t('computer_vision')}
                description={t('ai_powered_monitoring')}
              />
            </FloatingElement1>

            <FloatingElement1 delay={1.4}>
              <FeatureCard
                icon={<MapPin className="text-white w-5 h-5" />}
                title={t('smart_navigation')}
                description={t('optimal_route_guidance')}
              />
            </FloatingElement1>

            <FloatingElement1 delay={1.6}>
              <FeatureCard
                icon={<ShieldCheck className="text-white w-5 h-5" />}
                title={t('secure_payment')}
                description={t('frictionless_transactions')}
              />
            </FloatingElement1>
          </div> </>
  )
}

export default FloatingElement
