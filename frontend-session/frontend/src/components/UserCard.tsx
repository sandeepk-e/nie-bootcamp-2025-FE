import React from 'react';
import type { User } from '../types/User';
import './UserCard.css';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  // Generate a default avatar if no image is provided
  const defaultImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=150&bold=true`;
  
  // Generate a default description if none is provided
  const defaultDescription = `Hello! I'm ${user.name}, you can reach me at ${user.username}. I'm located at ${user.address}.`;

  return (
    <div className="user-card">
      <div className="user-card-image">
        <img 
          src={user.image || defaultImage} 
          alt={`${user.name}'s profile`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImage;
          }}
        />
      </div>
      <div className="user-card-content">
        <h3 className="user-card-name">{user.name}</h3>
        <p className="user-card-username">@{user.username}</p>
        <p className="user-card-address">{user.address}</p>
        <p className="user-card-description">
          {user.description || defaultDescription}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
