"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { TrendingUp, PieChart, Target } from "lucide-react";
import { Label, Pie, PieChart as RechartsPieChart } from "recharts";

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

export const description = "Parking Zone Usage";

export function ChartPieDonutText() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
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

  const chartData = React.useMemo(() => [
    { zone: "Downtown", usage: 275, fill: isDarkMode ? "#60a5fa" : "#3b82f6" },
    { zone: "Airport", usage: 200, fill: isDarkMode ? "#22d3ee" : "#06b6d4" },
    { zone: "Shopping", usage: 287, fill: isDarkMode ? "#818cf8" : "#6366f1" },
    { zone: "Residential", usage: 173, fill: isDarkMode ? "#c084fc" : "#a855f7" },
    { zone: "Event", usage: 190, fill: isDarkMode ? "#f472b6" : "#ec4899" },
  ], [isDarkMode]);

  const totalUsage = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.usage, 0);
  }, [chartData]);

  const topZone = React.useMemo(() => {
    return chartData.reduce((prev, current) => 
      prev.usage > current.usage ? prev : current
    );
  }, [chartData]);

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
        absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 
        dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 opacity-0 
        transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}
      `}></div>

      {/* Floating Elements */}
      <div className={`
        absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-blue-500 to-purple-600 
        dark:from-blue-400 dark:to-purple-500 rounded-full
        transition-all duration-300 ${isHovered ? 'scale-150 opacity-70' : 'opacity-30'}
      `}></div>
      <div className={`
        absolute bottom-4 left-4 w-1.5 h-1.5 bg-gradient-to-br from-indigo-500 to-pink-600 
        dark:from-indigo-400 dark:to-pink-500 rounded-full
        transition-all duration-300 ${isHovered ? 'scale-[2] opacity-50' : 'opacity-20'}
      `}></div>

      {/* Card Header */}
      <div className="px-5 pt-4 pb-2 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className={`
              p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 transition-all duration-300
              ${isHovered ? 'scale-110 rotate-3' : ''}
            `}>
              <PieChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Parking Zone Usage
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
            <Target className="w-3 h-3 mr-1" />
            Top: {topZone.zone}
          </div>
        </div>
      </div>

      {/* Chart and Legend in Flex Layout */}
      <div className="px-4 flex flex-col sm:flex-row items-center justify-between relative z-10">
        {/* Chart Section */}
        <div className="w-full sm:w-1/2">
          <div className={`
            h-[180px] mx-auto transition-all duration-700
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            ${isHovered ? 'transform scale-105' : ''}
          `}
          style={{ transitionDelay: '200ms' }}>
            <RechartsPieChart width={180} height={180}>
              <Pie
                data={chartData}
                dataKey="usage"
                nameKey="zone"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                stroke={isDarkMode ? "#1e293b" : "#ffffff"}
                strokeWidth={2}
                className="transition-opacity duration-300 hover:opacity-90"
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className={isDarkMode ? "fill-white text-base font-bold" : "fill-gray-900 text-base font-bold"}
                          >
                            {totalUsage.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 16}
                            className={isDarkMode ? "fill-gray-400 text-xs" : "fill-gray-500 text-xs"}
                          >
                            Total
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </RechartsPieChart>
          </div>
        </div>
        
        {/* Legend Section */}
        <div className="w-full sm:w-1/2 grid grid-cols-2 gap-2 mt-3 sm:mt-0 pb-2">
          {chartData.map((item, index) => (
            <div 
              key={item.zone}
              className={`
                flex items-center gap-2 px-2 py-1.5 rounded-md transition-all duration-300
                ${isHovered ? 'bg-white/60 dark:bg-gray-700/60' : 'hover:bg-gray-50/70 dark:hover:bg-gray-700/40'} 
                ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
              `}
              style={{ transitionDelay: `${index * 50 + 250}ms` }}
              onMouseEnter={() => setHoveredSegment(item.zone)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div 
                className={`
                  w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-200
                  ${hoveredSegment === item.zone ? 'scale-125' : ''}
                `}
                style={{ backgroundColor: item.fill }}
              ></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                {item.zone}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                {item.usage}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 text-xs border-t border-gray-100 dark:border-gray-700 relative z-10">
        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 mb-1">
          <TrendingUp className="h-3 w-3" />
          <span className="font-medium">Trending up by 8.3% this month</span>
        </div>
        
        {/* Progress indicator */}
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden mt-2">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: isLoaded ? '85%' : '0%',
              transitionDelay: '500ms'
            }}
          ></div>
        </div>
        
        <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          Showing parking usage distribution across zones
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