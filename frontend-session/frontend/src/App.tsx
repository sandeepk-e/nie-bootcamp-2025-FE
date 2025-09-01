import { useState, useEffect } from "react";
import UserList from "./components/UserList";
import Spinner from "./components/Spinner";
import type { User } from "./types/User";
import { UserService } from "./services/userService";
import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedUsers = await UserService.getAllUsers();
        
        // Add 2 second delay to explicitly show spinner
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setUsers(fetchedUsers);
      } catch (err) {
        // Also add delay for error handling
        await new Promise(resolve => setTimeout(resolve, 2000));
        setError(err instanceof Error ? err.message : 'An error occurred while fetching users');
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRetry = async () => {
    setError(null);
    setLoading(true);
    
    try {
      const fetchedUsers = await UserService.getAllUsers();
      
      // Add 2 second delay to explicitly show spinner
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUsers(fetchedUsers);
    } catch (err) {
      // Also add delay for error handling
      await new Promise(resolve => setTimeout(resolve, 2000));
      setError(err instanceof Error ? err.message : 'An error occurred while fetching users');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner message="Loading users..." />;
  }

  if (error) {
    return (
      <div>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button onClick={handleRetry}>Try Again</button>
      </div>
    );
  }

  return <UserList users={users} />;
}

export default App;