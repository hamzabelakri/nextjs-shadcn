"use client";

import React from 'react';
import { Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Main } from "@/components/layout/main";
import { SectionCards } from "./components/section-cards";
import { ChartBarMultiple } from "./components/overview";
import { ChartPieDonutText } from "./components/recent-sales";

export default function Dashboard() {
  return (
    <Main>
      <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Dashboard Overview</h2>
          <p className='text-muted-foreground'>
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
      
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
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
          </TabsContent>
        </Tabs>
      </div>
    </Main>
  );
}