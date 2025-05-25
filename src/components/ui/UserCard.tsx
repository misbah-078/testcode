import React from 'react';
import { Avatar } from './Avatar';
import { Card } from './Card';

interface UserCardProps {
  name: string;
  role: string;
  avatar: string;
  department?: string;
  className?: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  name,
  role,
  avatar,
  department,
  className = ''
}) => {
  return (
    <div className={`w-60 ${className}`}>
      <Card>
        <div className="p-3 text-center">
          <Avatar src={avatar} name={name} size="lg" className="mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          <p className="text-sm text-gray-600 truncate mt-0.5">{role}</p>
          {department && (
            <p className="text-sm text-gray-500 truncate mt-0.5">{department}</p>
          )}
        </div>
      </Card>
    </div>
  );
};