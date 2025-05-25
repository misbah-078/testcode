import React from 'react';
import { User } from '../../types';
import { UserCard } from '../ui/UserCard';
import './TeamTree.css';

interface TeamTreeProps {
  currentUser: User;
  manager: User;
  peers: User[];
  subordinates: User[];
}

export const TeamTree: React.FC<TeamTreeProps> = ({ currentUser, manager, peers, subordinates }) => {    
  return (
    <div className="team-tree-container">
      {/* Manager Row */}
      {manager && (
        <div className="team-tree-row">
          <div className="team-tree-node">
            <UserCard
              name={manager.name}
              role={manager.role}
              avatar={manager.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}
              department={manager.department}
            />
          </div>
        </div>
      )}

      {/* Peers and Current User Row */}
      <div className="team-tree-row">
        {peers.map((peer) => (
          <div key={peer.id} className="team-tree-node">
            <UserCard
              name={peer.name}
              role={peer.role}
              avatar={peer.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}
              department={peer.department}
            />
          </div>
        ))}

        <div className="team-tree-node">
          <UserCard
            name={currentUser.name}
            role={currentUser.role}
            avatar={currentUser.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}
            department={currentUser.department}
            className="highlighted"
          />
        </div>
      </div>

      {/* Subordinates Row */}
      {subordinates.length > 0 && (
        <div className="team-tree-row">
          {subordinates.map((subordinate) => (
            <div key={subordinate.id} className="team-tree-node">
              <UserCard
                name={subordinate.name}
                role={subordinate.role}
                avatar={subordinate.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}
                department={subordinate.department}
              />
            </div>
          ))}
        </div>
      )}      
    </div>
  );
};