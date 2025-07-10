"use client";

import React, { useState } from 'react';
import { 
  MapPin, 
  Car, 
  Activity, 
  Navigation,
  Zap,
  BarChart3,
  Settings,
  Search,
  Bell,
  User
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { TopNav } from "@/components/layout/top-nav";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { ThemeSwitch } from "@/components/theme-switch";
import { SectionCards } from "./components/section-cards";
import { ChartBarMultiple } from "./components/overview";
import { ChartPieDonutText } from "./components/recent-sales";

const AsteroideaHeader = () => (
  <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
    <div className="flex h-16 items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2">
            <Navigation className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Asteroidea
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Mobility & Parking Platform
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search locations, vehicles..."
            className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:bg-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
          />
        </div>
        
        <button className="relative rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
        </button>
        
        <button className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">
          <User className="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
);

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'locations', label: 'Locations', icon: MapPin, disabled: true },
    { id: 'vehicles', label: 'Vehicles', icon: Car, disabled: true },
    { id: 'analytics', label: 'Analytics', icon: Activity, disabled: true },
    { id: 'settings', label: 'Settings', icon: Settings, disabled: true },
  ];
  
  return (
    <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex space-x-8 px-6">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && setActiveTab(tab.id)}
              disabled={tab.disabled}
              className={`flex items-center gap-2 border-b-2 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : tab.disabled
                  ? 'border-transparent text-gray-400 cursor-not-allowed dark:text-gray-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <IconComponent className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
     
      
      <Main>
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Page Header */}
          <div className="mb-2 flex items-center justify-between space-y-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Dashboard Overview
              </h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Real-time insights into your mobility and parking operations
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="custom" size="default">
                <Zap className="mr-2 h-4 w-4" />
                Live View
              </Button>
            </div>
          </div>

          <Tabs
            orientation="vertical"
            defaultValue="overview"
            className="space-y-4"
          >
            <TabsContent value="overview" className="space-y-4 mt-4">
              {/* Metrics Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <SectionCards />
              </div>
              
              {/* Charts Section */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
                <ChartBarMultiple />
                <ChartPieDonutText />
              </div>

              {/* Quick Actions */}
             
            </TabsContent>
          </Tabs>
        </div>
      </Main>
    </div>
  );
}