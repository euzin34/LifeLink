// Lightweight Auth Guard for admin pages
// Ensures only authenticated users can access admin dashboard.
// Requires firebase-init.js to have initialized `window.firebaseAuth`.

(function attachAuthGuard() {
  // Wait until document ready to attach listeners
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startGuard);
  } else {
    startGuard();
  }

  function startGuard() {
    // Safety: verify Firebase Auth is ready
    if (!window.firebaseAuth || !window.firebaseAuth.onAuthStateChanged) {
      console.warn('Auth guard: firebaseAuth not ready. Page may not be protected.');
      return;
    }

    // Protect the page: redirect to login if not signed in
    window.firebaseAuth.onAuthStateChanged(function(user) {
      if (!user) {
        // Not authenticated → send to login page
        window.location.href = 'admin-login.html';
      }
    });

    // Wire up logout button if present
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.addEventListener('click', function() {
        window.firebaseAuth.signOut().then(function() {
          window.location.href = 'admin-login.html';
        }).catch(function(err) {
          console.error('Sign out failed:', err && err.message);
          alert('Failed to sign out. Please try again.');
        });
      });
    }
  }
})();


