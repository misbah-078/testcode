import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changeLabel?: string;
  className?: string;
  onClick?: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  changeLabel,
  className = '',
  onClick,
}) => {
  const isPositiveChange = change !== undefined && change >= 0;
  
  return (
    <Card className={className} onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="p-2 bg-primary-50 rounded-md">
            {icon}
          </div>
        </div>
        
        <div className="mt-2">
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
          
          {change !== undefined && (
            <p className="mt-2 flex items-center text-sm">
              <span
                className={`mr-1 ${
                  isPositiveChange ? 'text-emerald-500' : 'text-red-500'
                }`}
              >
                {isPositiveChange ? (
                  <ArrowUpRight className="inline h-4 w-4" />
                ) : (
                  <ArrowDownRight className="inline h-4 w-4" />
                )}
              </span>
              <span
                className={`font-medium ${
                  isPositiveChange ? 'text-emerald-500' : 'text-red-500'
                }`}
              >
                {isPositiveChange ? '+' : ''}{change}%
              </span>
              {changeLabel && (
                <span className="text-gray-500 ml-1">{changeLabel}</span>
              )}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};