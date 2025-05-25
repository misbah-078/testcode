import React from 'react';
import { getInitials } from '../../utils/formatters';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  name, 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };
  
  const initials = getInitials(name);
  
  return (
    <div 
      className={`relative inline-flex items-center justify-center rounded-full bg-primary-100 text-primary-800 font-medium ${sizeClasses[size]} ${className}`}
    >
      {src ? (
        <img 
          src={src}
          alt={name}
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '';
            e.currentTarget.alt = initials;
            e.currentTarget.className = `${e.currentTarget.className} bg-primary-100`;
          }}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};