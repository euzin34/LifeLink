// Firebase initialization for the project (loaded on pages that need auth)
// IMPORTANT: Replace the placeholder values below with your actual Firebase
// project configuration from the Firebase Console (Project settings > General).
// This file exposes a global `firebaseAuth` you can use elsewhere.

(function initializeFirebase() {
  // Guard: ensure Firebase SDKs are present
  if (typeof firebase === 'undefined') {
    console.error('Firebase SDK not loaded. Check CDN script tags in HTML.');
    return;
  }

  // Your web app's Firebase configuration
  // Replace all placeholder strings with real values
  const firebaseConfig = {
    apiKey: 'AIzaSyC8C-vVb17JoWayGtZT7QQEk1uqsm04v6Q',
    authDomain: 'blood-bank-auth.firebaseapp.com',
    projectId: 'blood-bank-auth',
    storageBucket: 'blood-bank-auth.firebasestorage.app',
    messagingSenderId: '909421800976',
    appId: '1:909421800976:web:b8982860af8b24d24c6495',
  };

  // Initialize Firebase App (singleton)
  try {
    const app = firebase.apps && firebase.apps.length
      ? firebase.app()
      : firebase.initializeApp(firebaseConfig);

    // Initialize Auth and expose globally for convenience
    window.firebaseAuth = firebase.auth();

    // Optional: set persistence to local (remembers login across tabs and reloads)
    window.firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function(err) {
      console.warn('Auth persistence setup warning:', err && err.message);
    });

    console.log('Firebase initialized:', app && app.name);
  } catch (err) {
    console.error('Failed to initialize Firebase:', err && err.message);
  }
})();


