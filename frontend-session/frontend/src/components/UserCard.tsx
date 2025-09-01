import React from 'react';
import type { User } from '../types/User';
import './UserCard.css';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=150&bold=true`;
  };

  return (
    <div className="user-card">
      <img 
        src={getAvatarUrl(user.name)} 
        alt={user.name}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=150&bold=true`;
        }}
      />
      <h3>{user.name}</h3>
      <p><strong>Address:</strong> {user.address}</p>
      <p><em>{!user.description ? 'Description not found' : user.description}</em></p>
    </div>
  );
};

export default UserCard;
