import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { users } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  competencies?: {
    competencies: string[];
    scores: number[];
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const mockCompetencies = {
    competencies: ['Communication', 'Teamwork', 'Problem Solving', 'Leadership'],
    scores: [80, 90, 70, 85],
  };

  useEffect(() => {
    localStorage.setItem('currentUser', currentUser ? JSON.stringify(currentUser) : '');
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [currentUser, isAuthenticated]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const user = users.find((u: User) => u.email.toLowerCase() === email.toLowerCase());
      
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated, competencies: mockCompetencies }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};