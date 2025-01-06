// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('token', data.token); // Store the token
        // Redirect based on role
        if (data.role === 'student') {
          window.location.href = 'student-dashboard.html';
        } else if (data.role === 'teacher') {
          window.location.href = 'teacher-dashboard.html';
        } else if (data.role === 'controller') {
          window.location.href = 'controller-dashboard.html';
        }
      } else {
        alert('Invalid credentials or user not found');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred during login. Please try again.');
    });
});

// Handle create account form submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('signupRole').value;

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, role })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Account created successfully! Please login.');
        window.location.href = 'login.html';
      } else {
        alert('Error creating account: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred during account creation. Please try again.');
    });
});
// Show Signup Form
document.getElementById('showSignup').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent the default anchor behavior
  document.getElementById('loginForm').classList.add('hidden'); // Hide login form
  document.getElementById('signupForm').classList.remove('hidden'); // Show signup form
});

// Show Login Form
document.getElementById('showLogin').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent the default anchor behavior
  document.getElementById('signupForm').classList.add('hidden'); // Hide signup form
  document.getElementById('loginForm').classList.remove('hidden'); // Show login form
});
