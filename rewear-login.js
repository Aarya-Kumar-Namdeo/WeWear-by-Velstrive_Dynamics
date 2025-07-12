// 🔐 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqyqf_QIi6qeS0-k91y9QE3wH8ubBtX9Q",
  authDomain: "rewear-1e4c0.firebaseapp.com",
  projectId: "rewear-1e4c0",
  appId: "1:833497649831:web:682f824492f06e7e048182",
};

// 🔧 Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// ✉️ Handle Custom Backend Email/Password Login
document.getElementById('loginForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      alert('Login successful!');
      console.log('User:', data);
      localStorage.setItem('userName', data.name || email);  // Store user info
      window.location.href = 'dashboard.html';  // Redirect
    } else {
      alert(data.error || 'Invalid credentials');
    }
  } catch (error) {
    alert('Error connecting to server.');
    console.error('Login error:', error);
  }
});

// 🟢 Handle Firebase Google Sign-In
document.querySelector('.google-btn')?.addEventListener('click', () => {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      alert(`Welcome, ${user.displayName}`);
      localStorage.setItem('userName', user.displayName);
      window.location.href = 'dashboard.html';  // Redirect after Google login
    })
    .catch((error) => {
      console.error("Google Sign-In Error:", error);
      alert("Google sign-in failed.");
    });
});
