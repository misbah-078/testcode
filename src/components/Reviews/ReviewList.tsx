import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, User } from 'lucide-react';
import { Review } from '../../types';
import { useReviews } from '../../context/ReviewContext';
import { useAppContext } from '../../context/AppContext';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { formatDate, formatRelativeTime, getDueDateStatus, getStatusColor } from '../../utils/formatters';

interface ReviewListProps {
  reviews: Review[];
  type: 'to-complete' | 'received';
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, type }) => {
  const { getCycleById } = useReviews();
  const { getUserById } = useAppContext();
  const navigate = useNavigate();

  if (reviews.length === 0) {
    return (
      <Card>
        <div className="p-6 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <User className="h-full w-full" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Reviews</h3>
          <p className="mt-1 text-sm text-gray-500">
            {type === 'to-complete' 
              ? "You don't have any reviews to complete at this time." 
              : "No reviews have been assigned for you yet."}
          </p>
        </div>
      </Card>
    );
  }

  const getReviewTypeLabel = (reviewType: string) => {
    const types = {
      self: 'Self Review',
      peer: 'Peer Review',
      manager: 'Manager Review',
      'direct-report': 'Direct Report Review'
    };
    return types[reviewType as keyof typeof types] || reviewType;
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const person = getUserById(review.revieweeId);
        const cycle = getCycleById(review.cycleId);
        const dueDateStatus = getDueDateStatus(review.dueDate);
        
        if (!person || !cycle) return null;

        return (
          <Card
            key={review.id}
            hoverable
            onClick={() => navigate(`/reviews/${review.id}`)}
            className="cursor-pointer"
          >
            <div className="p-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0 space-x-4">
                  <Avatar src={person.avatar} name={person.name} size="lg" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-primary-600 truncate">
                      {person.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {person.role} • {person.department}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge 
                        text={getReviewTypeLabel(review.relationship)} 
                        variant={review.relationship === 'self' ? 'info' : 'default'} 
                      />
                      <Badge 
                        text={cycle.name} 
                        variant="default" 
                      />
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  {review.status === 'completed' ? (
                    <div className="flex items-center text-emerald-500">
                      <CheckCircle className="h-5 w-5 mr-1" />
                      <span className="text-sm">Completed</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-amber-500">
                        <Clock className="h-5 w-5 mr-1" />
                        <span className="text-sm">Due {formatRelativeTime(review.dueDate)}</span>
                      </div>
                      <span className={`text-xs mt-1 ${getStatusColor(dueDateStatus)}`}>
                        {formatDate(review.dueDate)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ReviewList;