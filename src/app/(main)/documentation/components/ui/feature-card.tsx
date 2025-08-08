"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FeatureCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  features: string[];
  variant?: "default" | "highlight";
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  variant = "default" 
}: FeatureCardProps) {
  const { t } = useTranslation();

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${
      variant === "highlight" ? "border-primary/50 bg-gradient-to-br from-primary/5 to-transparent" : ""
    }`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Icon className={`h-5 w-5 ${
            variant === "highlight" ? "text-primary" : "text-muted-foreground"
          }`} />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
