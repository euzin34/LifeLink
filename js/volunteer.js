// Wait for the DOM to be fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Get reference to the volunteer registration form
    const volunteerForm = document.getElementById('volunteerForm'); // Get the form element by ID
    
    // Get references to form input elements for validation
    const fullNameInput = document.getElementById('fullName'); // Get full name input
    const emailInput = document.getElementById('email'); // Get email input
    const passwordInput = document.getElementById('password'); // Get password input (Firebase sign up)
    const confirmPasswordInput = document.getElementById('confirmPassword'); // Confirm password input
    const phoneInput = document.getElementById('phone'); // Get phone input
    const bloodTypeSelect = document.getElementById('skills') || document.getElementById('bloodType'); // Use skills/role
    const ageInput = document.getElementById('age'); // Get age input
    const genderSelect = document.getElementById('gender'); // Get gender select
    const addressTextarea = document.getElementById('address'); // Get address textarea
    const termsCheckbox = document.getElementById('terms'); // Get terms checkbox
    
    // Add form submission event listener
    volunteerForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission behavior
        
        // Validate the form before submission
        if (validateForm()) {
            // If validation passes, handle form submission
            handleFormSubmission(); // Call function to handle submission
        }
    });
    
    // Function to validate the entire form
    function validateForm() {
        let isValid = true; // Initialize validation flag as true
        let errorMessages = []; // Array to store error messages
        
        // Validate full name (required, minimum 2 characters)
        if (!fullNameInput.value.trim() || fullNameInput.value.trim().length < 2) {
            isValid = false; // Set validation flag to false
            errorMessages.push('Full name must be at least 2 characters long'); // Add error message
            highlightError(fullNameInput); // Highlight the input field as error
        } else {
            removeError(fullNameInput); // Remove error highlighting if valid
        }
        
        // Validate email (required, must be valid email format)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex pattern
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
            isValid = false; // Set validation flag to false
            errorMessages.push('Please enter a valid email address'); // Add error message
            highlightError(emailInput); // Highlight the input field as error
        } else {
            removeError(emailInput); // Remove error highlighting if valid
        }
        
        // Validate password (min 8 chars) and match
        if (!passwordInput.value || passwordInput.value.length < 8) {
            isValid = false;
            errorMessages.push('Password must be at least 8 characters long');
            highlightError(passwordInput);
        } else {
            removeError(passwordInput);
        }

        if (confirmPasswordInput.value !== passwordInput.value) {
            isValid = false;
            errorMessages.push('Confirm password must match the password');
            highlightError(confirmPasswordInput);
        } else {
            removeError(confirmPasswordInput);
        }

        // Validate phone number (required, must be valid phone format)
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/; // Phone validation regex pattern
        if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value.replace(/\s/g, ''))) {
            isValid = false; // Set validation flag to false
            errorMessages.push('Please enter a valid phone number'); // Add error message
            highlightError(phoneInput); // Highlight the input field as error
        } else {
            removeError(phoneInput); // Remove error highlighting if valid
        }
        
        // Validate skills/role (required)
        if (!bloodTypeSelect.value) {
            isValid = false;
            errorMessages.push('Please select how you can help');
            highlightError(bloodTypeSelect);
        } else {
            removeError(bloodTypeSelect);
        }
        
        // Validate age (required, must be between 18 and 65)
        const age = parseInt(ageInput.value); // Convert age input to integer
        if (!ageInput.value || age < 18 || age > 65) {
            isValid = false; // Set validation flag to false
            errorMessages.push('Age must be between 18 and 65 years'); // Add error message
            highlightError(ageInput); // Highlight the input field as error
        } else {
            removeError(ageInput); // Remove error highlighting if valid
        }
        
        // Validate gender (required)
        if (!genderSelect.value) {
            isValid = false; // Set validation flag to false
            errorMessages.push('Please select your gender'); // Add error message
            highlightError(genderSelect); // Highlight the select field as error
        } else {
            removeError(genderSelect); // Remove error highlighting if valid
        }
        
        // Validate address (required, minimum 10 characters)
        if (!addressTextarea.value.trim() || addressTextarea.value.trim().length < 10) {
            isValid = false; // Set validation flag to false
            errorMessages.push('Please enter a complete address (minimum 10 characters)'); // Add error message
            highlightError(addressTextarea); // Highlight the textarea as error
        } else {
            removeError(addressTextarea); // Remove error highlighting if valid
        }
        
        // Validate terms and conditions (required)
        if (!termsCheckbox.checked) {
            isValid = false; // Set validation flag to false
            errorMessages.push('You must agree to the terms and conditions'); // Add error message
            highlightError(termsCheckbox); // Highlight the checkbox as error
        } else {
            removeError(termsCheckbox); // Remove error highlighting if valid
        }
        
        // If there are validation errors, show them to the user
        if (!isValid) {
            showValidationErrors(errorMessages); // Display error messages
        }
        
        return isValid; // Return validation result
    }
    
    // Function to highlight input field as error
    function highlightError(element) {
        element.style.borderColor = '#ff6b6b'; // Set red border color
        element.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)'; // Add red glow
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
            border: 2px solid #ff6b6b; /* Red border */
            border-radius: 10px; /* Rounded corners */
            padding: 15px; /* Add padding */
            margin-bottom: 20px; /* Add bottom margin */
            color: #ff6b6b; /* Red text color */
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
        volunteerForm.insertBefore(errorContainer, volunteerForm.firstChild); // Insert before first form element
        
        // Auto-remove error messages after 5 seconds
        setTimeout(() => {
            if (errorContainer.parentNode) {
                errorContainer.remove(); // Remove error container
            }
        }, 5000); // Wait 5 seconds before removing
    }
    
    // Function to handle form submission
    function handleFormSubmission() {
        // Get submit button
        const submitButton = volunteerForm.querySelector('.submit-button'); // Get submit button element
        const originalText = submitButton.textContent; // Store original button text
        
        // Show loading state
        submitButton.textContent = 'Joining...';
        submitButton.disabled = true; // Disable button to prevent multiple submissions
        submitButton.style.opacity = '0.7'; // Reduce opacity to show disabled state
        
        // Ensure Firebase Auth is available
        if (!window.firebaseAuth) {
            console.error('Firebase Auth not initialized. Did firebase-init.js load?');
            showValidationErrors(['Unable to register at the moment. Please try again later.']);
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            return;
        }

        // Collect required data
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const fullName = fullNameInput.value.trim();

        // Create the Firebase user account
        window.firebaseAuth.createUserWithEmailAndPassword(email, password)
            .then(function(credential) {
                // Update the display name with the volunteer's full name
                return credential.user.updateProfile({ displayName: fullName });
            })
            .then(function() {
                // Registration succeeded
                showSuccessMessage();
                volunteerForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            })
            .catch(function(error) {
                console.error('Volunteer signup failed:', error && error.message);
                showValidationErrors([error && error.message ? error.message : 'Registration failed.']);
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
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
        successTitle.textContent = 'Registration Successful!'; // Set title text
        successTitle.style.marginBottom = '10px'; // Add bottom margin
        successTitle.style.fontSize = '20px'; // Set font size
        successTitle.style.fontWeight = '600'; // Set font weight
        
        // Create success message
        const successMessage = document.createElement('p'); // Create paragraph element
        successMessage.textContent = 'Thank you for joining as a supporter. We will contact you soon with next steps.';
        successMessage.style.margin = '0'; // Remove default margin
        successMessage.style.lineHeight = '1.5'; // Set line height
        
        // Add elements to container
        successContainer.appendChild(successIcon); // Add icon to container
        successContainer.appendChild(successTitle); // Add title to container
        successContainer.appendChild(successMessage); // Add message to container
        
        // Insert success container at the top of the form
        volunteerForm.insertBefore(successContainer, volunteerForm.firstChild); // Insert before first form element
        
        // Auto-remove success message after 8 seconds
        setTimeout(() => {
            if (successContainer.parentNode) {
                successContainer.remove(); // Remove success container
            }
        }, 8000); // Wait 8 seconds before removing
    }
    
    // Add real-time validation for email field
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
        if (this.value.trim() && !emailRegex.test(this.value.trim())) {
            highlightError(this); // Highlight as error
        } else {
            removeError(this); // Remove error highlighting
        }
    });
    
    // Add real-time validation for phone field
    phoneInput.addEventListener('blur', function() {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/; // Phone validation regex
        if (this.value.trim() && !phoneRegex.test(this.value.replace(/\s/g, ''))) {
            highlightError(this); // Highlight as error
        } else {
            removeError(this); // Remove error highlighting
        }
    });
    
    // Add real-time validation for age field
    ageInput.addEventListener('blur', function() {
        const age = parseInt(this.value); // Convert to integer
        if (this.value && (age < 18 || age > 65)) {
            highlightError(this); // Highlight as error
        } else {
            removeError(this); // Remove error highlighting
        }
    });
    
    // Add character counter for address field
    addressTextarea.addEventListener('input', function() {
        const minLength = 10; // Minimum required length
        const currentLength = this.value.trim().length; // Current text length
        
        // Remove existing character counter
        const existingCounter = this.parentNode.querySelector('.char-counter'); // Get existing counter
        if (existingCounter) {
            existingCounter.remove(); // Remove existing counter
        }
        
        // Create character counter
        const charCounter = document.createElement('div'); // Create counter element
        charCounter.className = 'char-counter'; // Add CSS class
        charCounter.style.cssText = `
            font-size: 12px; /* Small font size */
            color: ${currentLength >= minLength ? '#28a745' : '#ff6b6b'}; /* Green if valid, red if invalid */
            margin-top: 5px; /* Add top margin */
            text-align: right; /* Right align text */
        `;
        charCounter.textContent = `${currentLength}/${minLength} characters minimum`; // Set counter text
        
        // Add counter after textarea
        this.parentNode.appendChild(charCounter); // Append counter to parent
    });
    
    // Add form field focus effects
    const formInputs = volunteerForm.querySelectorAll('input, select, textarea'); // Get all form inputs
    
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
    
    // Add console log to confirm script is loaded
    console.log('Volunteer registration script loaded successfully!'); // Log success message
    
    // Add error handling for any potential issues
    window.addEventListener('error', function(e) {
        console.error('An error occurred:', e.error); // Log any errors that occur
    });
    
});
