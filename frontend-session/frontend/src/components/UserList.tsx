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
        <h3>No users found</h3>
        <p>There are currently no users to display.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>User List</h2>
      <div className="user-list">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
