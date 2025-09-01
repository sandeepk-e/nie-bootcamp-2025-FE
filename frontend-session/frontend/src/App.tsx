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
        setUsers(fetchedUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching users');
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Re-trigger the fetch by calling it directly
    UserService.getAllUsers()
      .then(setUsers)
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching users');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Example App</h1>
        <p>Community Platform</p>
      </header>

      <main className="app-main">
        {loading && (
          <Spinner size="large" message="Loading users..." />
        )}

        {error && (
          <div className="error-container">
            <div className="error-message">
              <h3>Oops! Something went wrong</h3>
              <p>{error}</p>
              <button onClick={handleRetry} className="retry-button">
                Try Again
              </button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <UserList users={users} />
        )}
      </main>
    </div>
  );
}

export default App;