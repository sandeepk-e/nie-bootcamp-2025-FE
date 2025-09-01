const app = document.getElementById("app");

let isLoading = true;
let error = null;

function showSpinner(message = "Loading users...") {
  app.innerHTML = `<p>${message}</p>`;
}

function showError(errorMessage) {
  app.innerHTML = `
    <div class="error-container">
      <h3>Oops! Something went wrong</h3>
      <p>${errorMessage}</p>
      <button onclick="handleRetry()">Try Again</button>
    </div>
  `;
}

function showUserList(users) {
  if (users.length === 0) {
    app.innerHTML = `
      <div class="user-list-empty">
        <h3>No users found</h3>
        <p>There are currently no users to display.</p>
      </div>
    `;
    return;
  }

  let html = "<h2>User List</h2><div class='user-list'>";
  users.forEach(user => {
    html += `
      <div class="user-card">
        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=150&bold=true" alt="${user.name}" 
             onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=150&bold=true'" />
        <h3>${user.name}</h3>
        <p><strong>Address:</strong> ${user.address}</p>
        <p><em>${!user.description ? 'Description not found' : user.description}</em></p>
      </div>
    `;
  });
  html += "</div>";
  app.innerHTML = html;
}

function fetchUsers() {
  isLoading = true;
  error = null;
  showSpinner("Loading users...");

  fetch("http://localhost:8004/api/users")
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(users => {
      // Add 2 second delay to explicitly show spinner
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(users);
        }, 2000);
      });
    })
    .then(users => {
      isLoading = false;
      showUserList(users);
    })
    .catch(err => {
      // Also add delay for error handling
      setTimeout(() => {
        isLoading = false;
        error = err.message || 'An error occurred while fetching users';
        console.error('Failed to fetch users:', err);
        showError(error);
      }, 2000);
    });
}

function handleRetry() {
  fetchUsers();
}

// Initial load
fetchUsers();
