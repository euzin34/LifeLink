// Wait for the DOM to be fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Get reference to the admin login form
    const adminLoginForm = document.getElementById('adminLoginForm'); // Get the form element by ID
    
    // Get references to form input elements
    const adminIdInput = document.getElementById('adminId'); // Get admin ID input
    const passwordInput = document.getElementById('password'); // Get password input
    const passwordToggle = document.getElementById('passwordToggle'); // Get password toggle button
    const rememberMeCheckbox = document.getElementById('rememberMe'); // Get remember me checkbox
    
    // We will authenticate using Firebase Auth (email/password)
    // The field `adminId` will be treated as an email address.
    
    // Add form submission event listener
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission behavior
        
        // Validate the form before submission
        if (validateForm()) {
            // If validation passes, handle login
            handleLogin(); // Call function to handle login
        }
    });
    
    // Function to validate the login form
    function validateForm() {
        let isValid = true; // Initialize validation flag as true
        let errorMessages = []; // Array to store error messages
        
        // Validate admin ID (required)
        if (!adminIdInput.value.trim()) {
            isValid = false; // Set validation flag to false
            errorMessages.push('Please enter your Admin ID'); // Add error message
            highlightError(adminIdInput); // Highlight the input field as error
        } else {
            removeError(adminIdInput); // Remove error highlighting if valid
        }
        
        // Validate password (required)
        if (!passwordInput.value.trim()) {
            isValid = false; // Set validation flag to false
            errorMessages.push('Please enter your password'); // Add error message
            highlightError(passwordInput); // Highlight the input field as error
        } else {
            removeError(passwordInput); // Remove error highlighting if valid
        }
        
        // If there are validation errors, show them to the user
        if (!isValid) {
            showValidationErrors(errorMessages); // Display error messages
        }
        
        return isValid; // Return validation result
    }
    
    // Function to highlight input field as error
    function highlightError(element) {
        element.style.borderColor = '#e74c3c'; // Set red border color
        element.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)'; // Add red glow
        element.classList.add('error'); // Add error class for additional styling
    }
    
    // Function to remove error highlighting from input field
    function removeError(element) {
        element.style.borderColor = '#e9ecef'; // Reset to default border color
        element.style.boxShadow = 'none'; // Remove glow effect
        element.classList.remove('error'); // Remove error class
    }
    
    // Function to show validation error messages
    function showValidationErrors(messages) {
        // Remove any existing error messages
        const existingErrors = document.querySelectorAll('.error-message'); // Get all existing error messages
        existingErrors.forEach(error => error.remove()); // Remove each error message
        
        // Create error message container
        const errorContainer = document.createElement('div'); // Create new div element
        errorContainer.className = 'error-container'; // Add CSS class
        errorContainer.style.cssText = `
            background-color: #fff5f5; /* Light red background */
            border: 2px solid #e74c3c; /* Red border */
            border-radius: 10px; /* Rounded corners */
            padding: 15px; /* Add padding */
            margin-bottom: 20px; /* Add bottom margin */
            color: #e74c3c; /* Red text color */
            font-size: 14px; /* Font size */
            font-weight: 500; /* Font weight */
        `;
        
        // Create error message title
        const errorTitle = document.createElement('h3'); // Create heading element
        errorTitle.textContent = 'Please fix the following errors:'; // Set title text
        errorTitle.style.marginBottom = '10px'; // Add bottom margin
        errorTitle.style.fontSize = '16px'; // Set font size
        errorTitle.style.fontWeight = '600'; // Set font weight
        
        // Add title to container
        errorContainer.appendChild(errorTitle); // Append title to container
        
        // Create unordered list for error messages
        const errorList = document.createElement('ul'); // Create ul element
        errorList.style.margin = '0'; // Remove default margin
        errorList.style.paddingLeft = '20px'; // Add left padding for list bullets
        
        // Add each error message to the list
        messages.forEach(message => {
            const listItem = document.createElement('li'); // Create li element
            listItem.textContent = message; // Set message text
            listItem.style.marginBottom = '5px'; // Add bottom margin
            errorList.appendChild(listItem); // Append list item to list
        });
        
        // Add list to container
        errorContainer.appendChild(errorList); // Append list to container
        
        // Insert error container at the top of the form
        adminLoginForm.insertBefore(errorContainer, adminLoginForm.firstChild); // Insert before first form element
        
        // Auto-remove error messages after 5 seconds
        setTimeout(() => {
            if (errorContainer.parentNode) {
                errorContainer.remove(); // Remove error container
            }
        }, 5000); // Wait 5 seconds before removing
    }
    
    // Function to handle login process
    function handleLogin() {
        // Get login button
        const loginButton = adminLoginForm.querySelector('.login-button'); // Get login button element
        const originalText = loginButton.textContent; // Store original button text
        
        // Show loading state
        loginButton.textContent = 'Authenticating...'; // Change button text
        loginButton.disabled = true; // Disable button to prevent multiple submissions
        loginButton.style.opacity = '0.7'; // Reduce opacity to show disabled state

        // Read credentials from inputs
        const enteredId = adminIdInput.value.trim(); // May be an email or the default admin ID
        const password = passwordInput.value.trim(); // Get password value

        // Support a default admin credential pair as requested.
        // If the user enters the special ID and password, map it to a fixed
        // backend email account. If that account does not exist yet in
        // Firebase, we'll auto-provision it during login.
        const DEFAULT_ID = 'Admin@123';
        const DEFAULT_PASSWORD = 'Random@123';
        const DEFAULT_EMAIL_FOR_AUTH = 'admin@raktakosh.com';

        const isDefaultAdmin = enteredId === DEFAULT_ID && password === DEFAULT_PASSWORD;
        const email = isDefaultAdmin ? DEFAULT_EMAIL_FOR_AUTH : enteredId; // Use mapping for default admin

        // Ensure Firebase Auth is available
        if (!window.firebaseAuth) {
            console.error('Firebase Auth not initialized. Did firebase-init.js load?');
            showLoginError();
            loginButton.textContent = originalText;
            loginButton.disabled = false;
            loginButton.style.opacity = '1';
            return;
        }

        // Attempt Firebase sign-in with email/password
        window.firebaseAuth.signInWithEmailAndPassword(email, password)
            .then(function() {
                // Successful login
                showSuccessMessage();

                // Remember me preference
                if (rememberMeCheckbox.checked) {
                    localStorage.setItem('adminRememberMe', 'true');
                    localStorage.setItem('adminId', email);
                } else {
                    localStorage.removeItem('adminRememberMe');
                    localStorage.removeItem('adminId');
                }

                // Redirect to admin dashboard after 1.5 seconds
                setTimeout(function() {
                    window.location.href = 'admin-dashboard.html';
                }, 1500);
            })
            .catch(function(error) {
                // If default admin requested and the user does not exist yet,
                // automatically create it, then proceed as logged in.
                if (isDefaultAdmin && error && error.code === 'auth/user-not-found') {
                    window.firebaseAuth.createUserWithEmailAndPassword(email, password)
                        .then(function() {
                            // Newly created default admin; treat as success
                            showSuccessMessage();
                            if (rememberMeCheckbox.checked) {
                                localStorage.setItem('adminRememberMe', 'true');
                                localStorage.setItem('adminId', email);
                            } else {
                                localStorage.removeItem('adminRememberMe');
                                localStorage.removeItem('adminId');
                            }
                            setTimeout(function() {
                                window.location.href = 'admin-dashboard.html';
                            }, 1500);
                        })
                        .catch(function(createErr) {
                            console.error('Default admin creation failed:', createErr && createErr.message);
                            showLoginError(createErr && createErr.message);
                            loginButton.textContent = originalText;
                            loginButton.disabled = false;
                            loginButton.style.opacity = '1';
                        });
                    return;
                }

                // Other failures
                console.error('Login failed:', error && error.message);
                showLoginError(error && error.message);
                loginButton.textContent = originalText;
                loginButton.disabled = false;
                loginButton.style.opacity = '1';
            });
    }
    
    // Function to show success message
    function showSuccessMessage() {
        // Create success message container
        const successContainer = document.createElement('div'); // Create new div element
        successContainer.className = 'success-container'; // Add CSS class
        successContainer.style.cssText = `
            background-color: #f0fff4; /* Light green background */
            border: 2px solid #28a745; /* Green border */
            border-radius: 10px; /* Rounded corners */
            padding: 20px; /* Add padding */
            margin-bottom: 20px; /* Add bottom margin */
            color: #28a745; /* Green text color */
            font-size: 16px; /* Font size */
            font-weight: 500; /* Font weight */
            text-align: center; /* Center text */
        `;
        
        // Create success icon
        const successIcon = document.createElement('div'); // Create div for icon
        successIcon.innerHTML = '✓'; // Add checkmark symbol
        successIcon.style.cssText = `
            font-size: 48px; /* Large font size */
            margin-bottom: 10px; /* Add bottom margin */
            font-weight: bold; /* Bold font weight */
        `;
        
        // Create success title
        const successTitle = document.createElement('h3'); // Create heading element
        successTitle.textContent = 'Login Successful!'; // Set title text
        successTitle.style.marginBottom = '10px'; // Add bottom margin
        successTitle.style.fontSize = '20px'; // Set font size
        successTitle.style.fontWeight = '600'; // Set font weight
        
        // Create success message
        const successMessage = document.createElement('p'); // Create paragraph element
        successMessage.textContent = 'Redirecting to Admin Dashboard...'; // Set message text
        successMessage.style.margin = '0'; // Remove default margin
        successMessage.style.lineHeight = '1.5'; // Set line height
        
        // Add elements to container
        successContainer.appendChild(successIcon); // Add icon to container
        successContainer.appendChild(successTitle); // Add title to container
        successContainer.appendChild(successMessage); // Add message to container
        
        // Insert success container at the top of the form
        adminLoginForm.insertBefore(successContainer, adminLoginForm.firstChild); // Insert before first form element
    }
    
    // Function to show login error message
    function showLoginError(detailMessage) {
        // Create error message container
        const errorContainer = document.createElement('div'); // Create new div element
        errorContainer.className = 'login-error-container'; // Add CSS class
        errorContainer.style.cssText = `
            background-color: #fff5f5; /* Light red background */
            border: 2px solid #e74c3c; /* Red border */
            border-radius: 10px; /* Rounded corners */
            padding: 20px; /* Add padding */
            margin-bottom: 20px; /* Add bottom margin */
            color: #e74c3c; /* Red text color */
            font-size: 16px; /* Font size */
            font-weight: 500; /* Font weight */
            text-align: center; /* Center text */
        `;
        
        // Create error icon
        const errorIcon = document.createElement('div'); // Create div for icon
        errorIcon.innerHTML = '✗'; // Add X symbol
        errorIcon.style.cssText = `
            font-size: 48px; /* Large font size */
            margin-bottom: 10px; /* Add bottom margin */
            font-weight: bold; /* Bold font weight */
        `;
        
        // Create error title
        const errorTitle = document.createElement('h3'); // Create heading element
        errorTitle.textContent = 'Login Failed!'; // Set title text
        errorTitle.style.marginBottom = '10px'; // Add bottom margin
        errorTitle.style.fontSize = '20px'; // Set font size
        errorTitle.style.fontWeight = '600'; // Set font weight
        
        // Create error message
        const errorMessage = document.createElement('p'); // Create paragraph element
        errorMessage.textContent = 'Invalid Admin ID or Password. Please try again.'; // Set message text
        errorMessage.style.margin = '0'; // Remove default margin
        errorMessage.style.lineHeight = '1.5'; // Set line height
        
        // Add elements to container
        errorContainer.appendChild(errorIcon); // Add icon to container
        errorContainer.appendChild(errorTitle); // Add title to container
        errorContainer.appendChild(errorMessage); // Add message to container

        // If we have a detailed error (e.g., from Firebase), show a subtle hint below
        if (detailMessage) {
            const hint = document.createElement('div');
            hint.style.marginTop = '8px';
            hint.style.fontSize = '12px';
            hint.style.color = '#c0392b';
            hint.textContent = detailMessage;
            errorContainer.appendChild(hint);
        }
        
        // Insert error container at the top of the form
        adminLoginForm.insertBefore(errorContainer, adminLoginForm.firstChild); // Insert before first form element
        
        // Auto-remove error message after 5 seconds
        setTimeout(() => {
            if (errorContainer.parentNode) {
                errorContainer.remove(); // Remove error container
            }
        }, 5000); // Wait 5 seconds before removing
    }
    
    // Add password visibility toggle functionality
    passwordToggle.addEventListener('click', function() {
        // Toggle password visibility
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text'; // Show password
            this.querySelector('.eye-icon').textContent = '🙈'; // Change to closed eye
        } else {
            passwordInput.type = 'password'; // Hide password
            this.querySelector('.eye-icon').textContent = '👁️'; // Change to open eye
        }
    });
    
    // Check for remembered login credentials
    function checkRememberedCredentials() {
        const rememberMe = localStorage.getItem('adminRememberMe'); // Get remember me preference
        const savedAdminId = localStorage.getItem('adminId'); // Get saved admin ID
        
        if (rememberMe === 'true' && savedAdminId) {
            adminIdInput.value = savedAdminId; // Fill admin ID field
            rememberMeCheckbox.checked = true; // Check remember me checkbox
        }
    }
    
    // Add real-time validation for admin ID field
    adminIdInput.addEventListener('blur', function() {
        if (!this.value.trim()) {
            highlightError(this); // Highlight as error
        } else {
            removeError(this); // Remove error highlighting
        }
    });
    
    // Add real-time validation for password field
    passwordInput.addEventListener('blur', function() {
        if (!this.value.trim()) {
            highlightError(this); // Highlight as error
        } else {
            removeError(this); // Remove error highlighting
        }
    });
    
    // Add form field focus effects
    const formInputs = adminLoginForm.querySelectorAll('input'); // Get all form inputs
    
    formInputs.forEach(input => {
        // Add focus event listener
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)'; // Slightly scale up on focus
            this.style.transition = 'transform 0.2s ease'; // Add smooth transition
        });
        
        // Add blur event listener
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)'; // Return to normal size on blur
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Check if the pressed key is Enter
        if (e.key === 'Enter') {
            // Get the currently focused element
            const focusedElement = document.activeElement;
            
            // If the focused element is the login button, trigger click
            if (focusedElement === adminLoginForm.querySelector('.login-button')) {
                e.preventDefault(); // Prevent default enter key behavior
                adminLoginForm.dispatchEvent(new Event('submit')); // Trigger form submission
            }
        }
    });
    
    // Initialize remembered credentials
    checkRememberedCredentials(); // Check for saved credentials on page load
    
    // Add console log to confirm script is loaded
    console.log('Admin login script loaded successfully!'); // Log success message
    
    // Add error handling for any potential issues
    window.addEventListener('error', function(e) {
        console.error('An error occurred:', e.error); // Log any errors that occur
    });
    
});
