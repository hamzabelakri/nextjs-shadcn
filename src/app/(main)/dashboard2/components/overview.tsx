"use client";

import { useState, useEffect } from "react";
import { TrendingUp, BarChart3, Monitor, Smartphone } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartBarMultiple() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    // Initial check
    checkDarkMode();
    
    // Set up a mutation observer to detect theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  const totalDesktop = chartData.reduce((acc, curr) => acc + curr.desktop, 0);
  const totalMobile = chartData.reduce((acc, curr) => acc + curr.mobile, 0);
  const totalVisitors = totalDesktop + totalMobile;

  const desktopPercentage = Math.round((totalDesktop / totalVisitors) * 100);
  const mobilePercentage = Math.round((totalMobile / totalVisitors) * 100);

  const topMonth = chartData.reduce((prev, current) => 
    (prev.desktop + prev.mobile) > (current.desktop + current.mobile) ? prev : current
  );

  return (
    <div
      className={`
        col-span-1 lg:col-span-3 relative overflow-hidden rounded-2xl 
        bg-white dark:bg-gray-800 shadow border border-gray-200/50 dark:border-gray-700/50
        transform transition-all duration-500 ease-out cursor-pointer group
        ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        ${isHovered ? 'scale-[1.02] shadow-2xl shadow-gray-300/30 dark:shadow-gray-900/30' : 'hover:shadow-xl'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark"></div>
      </div>
      
      {/* Gradient Overlay */}
      <div className={`
        absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 
        dark:from-cyan-950/30 dark:via-blue-950/30 dark:to-indigo-950/30 opacity-0 
        transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}
      `}></div>

      {/* Floating Elements */}
      <div className={`
        absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-cyan-500 to-blue-600 
        dark:from-cyan-400 dark:to-blue-500 rounded-full
        transition-all duration-300 ${isHovered ? 'scale-150 opacity-70' : 'opacity-30'}
      `}></div>
      <div className={`
        absolute bottom-4 left-4 w-1.5 h-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 
        dark:from-blue-400 dark:to-indigo-500 rounded-full
        transition-all duration-300 ${isHovered ? 'scale-[2] opacity-50' : 'opacity-20'}
      `}></div>

      {/* Card Header */}
      <div className="px-5 pt-4 pb-2 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className={`
              p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 transition-all duration-300
              ${isHovered ? 'scale-110 rotate-3' : ''}
            `}>
              <BarChart3 className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Visitor Analytics
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                January - June 2024
              </p>
            </div>
          </div>
          
          <div className={`
            flex items-center px-2 py-1 rounded-full text-xs font-medium
            bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 
            transition-all duration-300 ${isHovered ? 'scale-105' : ''}
          `}>
            <TrendingUp className="w-3 h-3 mr-1" />
            Peak: {topMonth.month}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className={`
            p-3 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 
            dark:from-blue-900/20 dark:to-cyan-900/20 
            border border-blue-100 dark:border-blue-800/30
            transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            ${isHovered ? 'shadow-md' : ''}
          `}
          style={{ transitionDelay: '100ms' }}>
            <div className="flex items-center gap-2 mb-1">
              <Monitor className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-medium text-blue-700 dark:text-blue-400">Desktop</span>
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">1,224</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">59% of total</div>
          </div>
          
          <div className={`
            p-3 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 
            dark:from-indigo-900/20 dark:to-purple-900/20 
            border border-indigo-100 dark:border-indigo-800/30
            transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            ${isHovered ? 'shadow-md' : ''}
          `}
          style={{ transitionDelay: '150ms' }}>
            <div className="flex items-center gap-2 mb-1">
              <Smartphone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-medium text-indigo-700 dark:text-indigo-400">Mobile</span>
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">860</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">41% of total</div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="px-4 mt-1 relative z-10">
        <div className={`
          h-[180px] transition-all duration-700 
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
        style={{ transitionDelay: '200ms' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData}
              margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
              barSize={12}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke={isDarkMode ? "#334155" : "#e2e8f0"}
                opacity={0.5}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 10 }}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Bar 
                dataKey="desktop" 
                fill={isDarkMode ? "url(#desktopGradientDark)" : "url(#desktopGradient)"} 
                radius={[3, 3, 0, 0]}
                className="transition-all duration-300 hover:opacity-80"
              />
              <Bar 
                dataKey="mobile" 
                fill={isDarkMode ? "url(#mobileGradientDark)" : "url(#mobileGradient)"} 
                radius={[3, 3, 0, 0]}
                className="transition-all duration-300 hover:opacity-80"
              />
              <defs>
                <linearGradient id="desktopGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="mobileGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#4338ca" />
                </linearGradient>
                {/* Dark mode gradients */}
                <linearGradient id="desktopGradientDark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="mobileGradientDark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 text-xs relative z-10">
        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 mb-1">
          <TrendingUp className="h-3 w-3" />
          <span className="font-medium">Trending up by 5.2% this month</span>
        </div>
        
        {/* Progress indicators */}
        <div className="mt-2 space-y-2">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Desktop Usage</span>
            <span>{desktopPercentage}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 dark:from-blue-400 dark:to-cyan-500 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: isLoaded ? `${desktopPercentage}%` : '0%',
                transitionDelay: '300ms'
              }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Mobile Usage</span>
            <span>{mobilePercentage}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: isLoaded ? `${mobilePercentage}%` : '0%',
                transitionDelay: '400ms'
              }}
            ></div>
          </div>
        </div>
        
        <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          Showing total visitors for the last 6 months
        </div>
      </div>

      {/* Shimmer Effect */}
      <div className={`
        absolute inset-0 opacity-0 transition-opacity duration-300 z-[5]
        ${isHovered ? 'opacity-20' : ''}
      `}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white dark:via-gray-300 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e2e8f0 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .bg-grid-pattern-dark {
          background-image: radial-gradient(circle, #334155 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}