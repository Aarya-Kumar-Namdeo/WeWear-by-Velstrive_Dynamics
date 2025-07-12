// Firebase Config (use your own credentials from Firebase Console)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Google Sign-Up Handler
document.querySelector(".google-btn").addEventListener("click", () => {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      alert(`Welcome, ${user.displayName}`);
      console.log("Google user signed up:", user);
      // You can now send user.email or user.uid to your backend
    })
    .catch((error) => {
      console.error("Google Sign-Up Error", error);
      alert("Google sign-up failed.");
    });
});
