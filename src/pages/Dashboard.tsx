import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/Card';
import { ReviewCard } from '../components/dashboard/ReviewCard';
import { StatsCard } from '../components/dashboard/StatsCard';
import { CycleCard } from '../components/dashboard/CycleCard';
import { FeedbackStats } from '../components/dashboard/FeedbackStats';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { feedbackSummaries } from '../data/mockData';
import { FileCheck, Users, Clock, ChevronRight, ClipboardList } from 'lucide-react';
import CompetencyRadarChart from '../components/dashboard/CompetencyRadarChart';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const { 
    cycles, 
    reviews, 
    getPendingReviewsCount, 
    getCompletedReviewsCount,
    getTeamMembersCount,
    setActiveReviewId,
    setActiveCycleId,
    getCompetenciesForCurrentUser
  } = useAppContext();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  const pendingReviews = reviews.filter(r => 
    r.reviewerId === currentUser.id && r.status !== 'completed'
  );
  const activeCycle = cycles.find(c => c.status === 'active');
  const userFeedback = feedbackSummaries.find(fs => fs.userId === currentUser.id);

  const competencies = getCompetenciesForCurrentUser();

  const handleReviewClick = (reviewId: string) => {
    setActiveReviewId(reviewId);
    navigate(`/reviews/${reviewId}`);
  };
  
  const handleCycleClick = (cycleId: string) => {
    setActiveCycleId(cycleId);
    navigate(`/cycles/${cycleId}`);
  };

  return (
    <>
      {/* User Profile Section */}
      <Card className="mb-8">
        <CardContent className="flex items-center space-x-4 p-6">
          <Avatar 
            src={currentUser.avatar}
            name={currentUser.name}
            size="lg"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
            <div className="mt-1 space-y-1">
              <p className="text-gray-600">{currentUser.email}</p>
              <p className="text-gray-600">{currentUser.role} • {currentUser.department}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <StatsCard 
          title="Pending Reviews"
          value={getPendingReviewsCount()}
          icon={<Clock className="h-5 w-5 text-primary-600" />}
          change={-12}
          changeLabel="from last cycle"
        />
        <StatsCard 
          title="Completed Reviews"
          value={getCompletedReviewsCount()}
          icon={<FileCheck className="h-5 w-5 text-primary-600" />}
          change={20}
          changeLabel="from last cycle"
        />
        <StatsCard 
            title="Team Members"
            value={getTeamMembersCount()}
            icon={<Users className="h-5 w-5 text-primary-600" />}
            changeLabel="View team structure"
            onClick={() => navigate('/team')}
        />        
      </div>

      {/* Active Cycle */}
      {activeCycle && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-gray-900">Active Review Cycle</h2>
            <Button
              variant="ghost"
              size="sm"
              icon={<ChevronRight size={16} />}
              iconPosition="right"
            >
              View all cycles
            </Button>
          </div>
          <CycleCard 
            cycle={activeCycle}
            completedReviews={2}
            totalReviews={5}
            onClick={() => handleCycleClick(activeCycle.id)}
          />
        </div>
      )}
      
      {/* Pending Reviews */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-gray-900">Pending Reviews</h2>
          <Button
            variant="ghost"
            size="sm"
            icon={<ChevronRight size={16} />}
            iconPosition="right"
          >
            View all reviews
          </Button>
        </div>
        {pendingReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pendingReviews.map(review => (
              <ReviewCard 
                key={review.id}
                review={review}
                onClick={() => handleReviewClick(review.id)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="bg-primary-50 p-3 rounded-full">
                <ClipboardList className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No pending reviews</h3>
              <p className="mt-1 text-center text-gray-500 max-w-sm">
                You have completed all your assigned reviews for the current cycle.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Feedback Summary */}
      {userFeedback && (
        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Your Feedback</h2>
          <FeedbackStats feedbackSummary={userFeedback} />
        </div>
      )}

      {/* Competency Overview */}
      <h2 className="text-xl font-medium text-gray-900 mb-4">Competency Overview</h2>
      {competencies && (
        <Card>
          <CardContent>
            <CompetencyRadarChart 
              competencies={competencies.competencies}
              scores={competencies.scores}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
};