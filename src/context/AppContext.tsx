import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ReviewCycle, Review, User, CompetencyData } from '../types';
import { reviewCycles, reviews, users } from '../data/mockData';
import { useAuth } from './AuthContext';

interface AppContextType {
  cycles: ReviewCycle[];
  reviews: Review[];
  loading: boolean;
  activeCycleId: string | null;
  setActiveCycleId: (id: string | null) => void;
  activeReviewId: string | null;
  setActiveReviewId: (id: string | null) => void;
  getReviewsForCurrentUser: () => Review[];
  getPendingReviewsCount: () => number;
  getCompletedReviewsCount: () => number;
  getTeamMembersCount: () => number;
  getUserById: (userId: string) => User | undefined;
  getCompetenciesForCurrentUser: () => CompetencyData | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [cycles] = useState(reviewCycles);
  const [reviewsList] = useState(reviews);
  const [loading] = useState(false);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(cycles[0]?.id || null);
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);

  const getReviewsForCurrentUser = (): Review[] => {
    if (!currentUser) return [];
    return reviewsList.filter(review => 
      review.reviewerId === currentUser.id || 
      review.subjectId === currentUser.id
    );
  };

  const getPendingReviewsCount = (): number => {
    if (!currentUser) return 0;
    return reviewsList.filter(review => 
      review.reviewerId === currentUser.id && 
      (review.status === 'pending' || review.status === 'in-progress')
    ).length;
  };

  const getCompletedReviewsCount = (): number => {
    if (!currentUser) return 0;
    return reviewsList.filter(review => 
      review.reviewerId === currentUser.id && 
      review.status === 'completed'
    ).length;
  };

  const getTeamMembersCount = (): number => {
    if (!currentUser || !currentUser.relationships) return 0;
    return currentUser.relationships.length;
  };

  const getUserById = (userId: string): User | undefined => {
    return users.find(user => user.id === userId);
  };

  const getCompetenciesForCurrentUser = (): CompetencyData | null => {
      if (!currentUser || !currentUser.competencyData) return null;
      return currentUser.competencyData;
  };

  return (
    <AppContext.Provider value={{
      cycles,
      reviews: reviewsList,
      loading,
      activeCycleId,
      setActiveCycleId,
      activeReviewId,
      setActiveReviewId,
      getReviewsForCurrentUser,
      getPendingReviewsCount,
      getCompletedReviewsCount,
      getTeamMembersCount,
      getUserById,
      getCompetenciesForCurrentUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};