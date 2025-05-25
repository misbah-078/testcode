import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { TeamTree } from '../components/dashboard/TeamTree';

export const Team: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { getUserById } = useAppContext();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  const manager = currentUser.managerId 
    ? getUserById(currentUser.managerId) ?? null 
    : null;
  const peers = currentUser.relationships
    ?.filter(rel => rel.relationshipType === 'peer')
    .map(rel => getUserById(rel.userId))
    .filter((user): user is NonNullable<typeof user> => user !== undefined) || [];
  const subordinates = currentUser.relationships
    ?.filter(rel => rel.relationshipType === 'subordinate')
    .map(rel => getUserById(rel.userId))
    .filter((user): user is NonNullable<typeof user> => user !== undefined) || [];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Team Structure</h1>
      <TeamTree
        currentUser={currentUser}
        manager={manager}
        peers={peers}
        subordinates={subordinates}
      />
    </div>
  );
};