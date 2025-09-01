import React from 'react';
import UserCard from './UserCard';
import type { User } from '../types/User';
import './UserList.css';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  if (users.length === 0) {
    return (
      <div className="user-list-empty">
        <div className="empty-state">
          <h3>No users found</h3>
          <p>There are currently no users to display.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>Users ({users.length})</h2>
        <p>Browse through our community members</p>
      </div>
      <div className="user-list">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
