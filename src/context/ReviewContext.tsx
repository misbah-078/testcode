import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Review, ReviewCycle, User, Question, Response } from '../types';
import { reviews, reviewCycles, users } from '../data/mockData';
import { useAuth } from './AuthContext';

interface ReviewContextType {
  reviews: Review[];
  reviewCycles: ReviewCycle[];
  users: User[];
  getReviewsForUser: (userId: string) => Review[];
  getReviewsToComplete: (userId: string) => Review[];
  getReviewById: (reviewId: string) => Review | undefined;
  getCycleById: (cycleId: string) => ReviewCycle | undefined;
  submitReview: (reviewId: string, responses: Response[]) => void;
  getQuestionsForCycle: (cycleId: string) => Question[];
  getActiveReviewCycle: () => ReviewCycle | undefined;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>(reviews);
  const [reviewCycles] = useState<ReviewCycle[]>(reviewCycles);
  const [users] = useState<User[]>(users);
  const { currentUser } = useAuth();

  // Load data from localStorage if available
  useEffect(() => {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Save reviews to localStorage when they change
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const getReviewsForUser = (userId: string): Review[] => {
    return reviews.filter(review => review.revieweeId === userId);
  };

  const getReviewsToComplete = (userId: string): Review[] => {
    return reviews.filter(review => review.reviewerId === userId && review.status === 'pending');
  };

  const getReviewById = (reviewId: string): Review | undefined => {
    return reviews.find(review => review.id === reviewId);
  };

  const getCycleById = (cycleId: string): ReviewCycle | undefined => {
    return reviewCycles.find(cycle => cycle.id === cycleId);
  };

  const getQuestionsForCycle = (cycleId: string): Question[] => {
    const cycle = getCycleById(cycleId);
    return cycle ? cycle.questions : [];
  };

  const getActiveReviewCycle = (): ReviewCycle | undefined => {
    return reviewCycles.find(cycle => cycle.status === 'active') || 
           reviewCycles.find(cycle => cycle.status === 'upcoming');
  };

  const submitReview = (reviewId: string, responses: Response[]): void => {
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === reviewId 
          ? { 
              ...review, 
              status: 'completed', 
              submittedAt: new Date().toISOString(),
              responses 
            } 
          : review
      )
    );
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      reviewCycles,
      users,
      getReviewsForUser,
      getReviewsToComplete,
      getReviewById,
      getCycleById,
      submitReview,
      getQuestionsForCycle,
      getActiveReviewCycle
    }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = (): ReviewContextType => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};