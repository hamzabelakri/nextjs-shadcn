"use client";

import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Users, 
  CreditCard, 
  Activity
} from 'lucide-react';

export function SectionCards() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
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

  const cardData = [
    {
      id: 'revenue',
      title: 'Revenue',
      value: '$45.2K',
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-600',
      darkGradient: 'from-emerald-400 to-teal-500',
      lightGradient: 'from-emerald-50 to-teal-50',
      darkLightGradient: 'from-emerald-900/20 to-teal-900/20',
      accentColor: 'text-emerald-600',
      darkAccentColor: 'text-emerald-400',
      bgAccent: 'bg-emerald-100',
      darkBgAccent: 'bg-emerald-900/50'
    },
    {
      id: 'users',
      title: 'Users',
      value: '2.4K',
      icon: Users,
      gradient: 'from-blue-500 to-indigo-600',
      darkGradient: 'from-blue-400 to-indigo-500',
      lightGradient: 'from-blue-50 to-indigo-50',
      darkLightGradient: 'from-blue-900/20 to-indigo-900/20',
      accentColor: 'text-blue-600',
      darkAccentColor: 'text-blue-400',
      bgAccent: 'bg-blue-100',
      darkBgAccent: 'bg-blue-900/50'
    },
    {
      id: 'sales',
      title: 'Sales',
      value: '1.2K',
      icon: CreditCard,
      gradient: 'from-purple-500 to-pink-600',
      darkGradient: 'from-purple-400 to-pink-500',
      lightGradient: 'from-purple-50 to-pink-50',
      darkLightGradient: 'from-purple-900/20 to-pink-900/20',
      accentColor: 'text-purple-600',
      darkAccentColor: 'text-purple-400',
      bgAccent: 'bg-purple-100',
      darkBgAccent: 'bg-purple-900/50'
    },
    {
      id: 'active',
      title: 'Active',
      value: '573',
      icon: Activity,
      gradient: 'from-orange-500 to-red-600',
      darkGradient: 'from-orange-400 to-red-500',
      lightGradient: 'from-orange-50 to-red-50',
      darkLightGradient: 'from-orange-900/20 to-red-900/20',
      accentColor: 'text-orange-600',
      darkAccentColor: 'text-orange-400',
      bgAccent: 'bg-orange-100',
      darkBgAccent: 'bg-orange-900/50'
    }
  ];

  const cards = cardData.map((card, index) => {
    const Icon = card.icon;
    const isHovered = hoveredCard === card.id;
    
    return (
      <div
        key={card.id}
        className={`
          relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 
          shadow-lg border border-gray-200/50 dark:border-gray-700/50
          transform transition-all duration-500 ease-out cursor-pointer group
          ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          ${isHovered ? 'scale-105 shadow-2xl shadow-gray-300/30 dark:shadow-gray-900/30' : 'hover:scale-[1.02] hover:shadow-xl'}
        `}
        style={{
          transitionDelay: `${index * 150}ms`
        }}
        onMouseEnter={() => setHoveredCard(card.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark"></div>
        </div>
        
        {/* Gradient Overlay */}
        <div className={`
          absolute inset-0 bg-gradient-to-br ${card.lightGradient} 
          dark:${card.darkLightGradient} opacity-0 
          transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}
        `}></div>
        
        {/* Header */}
        <div className="relative p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className={`
              p-3 rounded-xl ${card.bgAccent} dark:${card.darkBgAccent} transition-all duration-300
              ${isHovered ? 'scale-110 rotate-3' : ''}
            `}>
              <Icon className={`w-5 h-5 ${card.accentColor} dark:${card.darkAccentColor}`} />
            </div>
          </div>
          
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            {card.title}
          </h3>
          
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {card.value}
          </div>
        </div>
        
        {/* Shimmer Effect */}
        <div className={`
          absolute inset-0 opacity-0 transition-opacity duration-300
          ${isHovered ? 'opacity-20' : ''}
        `}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white dark:via-gray-300 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
        
        {/* Floating Elements */}
        <div className={`
          absolute top-4 right-4 w-2 h-2 bg-gradient-to-br ${card.gradient} dark:${card.darkGradient} rounded-full
          transition-all duration-300 ${isHovered ? 'scale-150 opacity-70' : 'opacity-30'}
        `}></div>
       
      </div>
    );
  });

  return (
    <>
      {cards}
      
    
    </>
  );
}