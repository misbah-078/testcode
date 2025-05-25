import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { ReviewCycle } from '../../types';
import { formatDate, getStatusColor, calculateProgress } from '../../utils/formatters';
import { Calendar, Users, ChevronRight } from 'lucide-react';

interface CycleCardProps {
  cycle: ReviewCycle;
  completedReviews: number;
  totalReviews: number;
  onClick: () => void;
}

export const CycleCard: React.FC<CycleCardProps> = ({ 
  cycle, 
  completedReviews, 
  totalReviews, 
  onClick 
}) => {
  const progress = calculateProgress(completedReviews, totalReviews);
  
  return (
    <Card hoverable className="h-full flex flex-col">
      <CardContent className="flex-grow">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium text-gray-900">{cycle.title}</h3>
          <Badge 
            text={cycle.status.charAt(0).toUpperCase() + cycle.status.slice(1)} 
            className={getStatusColor(cycle.status)}
          />
        </div>
        
        <p className="mt-2 text-sm text-gray-500">{cycle.description}</p>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-1.5" />
            <span className="text-sm text-gray-500">
              {formatDate(cycle.startDate)} - {formatDate(cycle.endDate)}
            </span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 text-gray-400 mr-1.5" />
            <span className="text-sm text-gray-500">
              {completedReviews} of {totalReviews} reviews completed
            </span>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-500">{progress}%</span>
            </div>
            <Progress 
              value={progress} 
              color={progress === 100 ? 'success' : 'primary'} 
            />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-200 bg-gray-50">
        <Button 
          onClick={onClick}
          variant="outline"
          fullWidth
          icon={<ChevronRight size={16} />}
          iconPosition="right"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};