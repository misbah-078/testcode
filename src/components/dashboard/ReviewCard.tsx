import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { Review } from '../../types';
import { formatDate, formatRelativeTime, getDueDateStatus, getStatusColor } from '../../utils/formatters';
import { useAppContext } from '../../context/AppContext';
import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
  onClick: () => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, onClick }) => {
  const { getUserById } = useAppContext();
  const subject = getUserById(review.subjectId);
  const dueDateStatus = getDueDateStatus(review.dueDate);

  if (!subject) return null;

  const getCompletionPercent = (): number => {
    if (review.status === 'completed') return 100;
    if (review.status === 'pending') return 0;
    
    // For in-progress, calculate based on filled responses
    const possibleResponses = 6; // This would be dynamic in a real app
    const filledResponses = review.responses.length;
    return Math.round((filledResponses / possibleResponses) * 100);
  };
  
  const getRelationshipText = (relationship: string): string => {
    switch (relationship) {
      case 'self':
        return 'Self Review';
      case 'peer':
        return 'Peer Review';
      case 'manager':
        return 'Manager Review';
      case 'direct-report':
        return 'Direct Report Review';
      default:
        return 'Review';
    }
  };
  
  return (
    <Card hoverable className="h-full flex flex-col">
      <CardContent className="flex-grow">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <Avatar src={subject.avatar} name={subject.name} />
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">{subject.name}</h3>
              <p className="text-sm text-gray-500">{subject.role}</p>
            </div>
          </div>
          <Badge 
            text={getRelationshipText(review.relationship)} 
            variant={review.relationship === 'self' ? 'info' : 'default'} 
          />
        </div>
        
        <div className="mt-4 space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Status</span>
              <Badge 
                text={review.status.charAt(0).toUpperCase() + review.status.slice(1)} 
                className={getStatusColor(review.status)}
              />
            </div>
            <Progress value={getCompletionPercent()} showValue />
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-400 mr-1.5" />
            <span className="text-sm text-gray-500">
              Due {formatDate(review.dueDate)} ({formatRelativeTime(review.dueDate)})
            </span>
          </div>
          
          {review.status === 'completed' && review.submittedDate && (
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-1.5" />
              <span className="text-sm text-gray-500">
                Completed {formatRelativeTime(review.submittedDate)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-200 bg-gray-50">
        <Button 
          onClick={onClick}
          variant={review.status === 'completed' ? 'secondary' : 'primary'}
          fullWidth
          icon={<ArrowRight size={16} />}
          iconPosition="right"
        >
          {review.status === 'completed' ? 'View Review' : review.status === 'in-progress' ? 'Continue Review' : 'Start Review'}
        </Button>
      </CardFooter>
    </Card>
  );
};