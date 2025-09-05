document.addEventListener('DOMContentLoaded', function() {
    // Google Maps initialization for blood request location selection
    window.initRequestMap = function initRequestMap() {
        const mapContainer = document.getElementById('requestMap');
        if (!mapContainer) {
            console.warn('Map container #requestMap not found. Skipping map init.');
            return;
        }

        const defaultCenter = { lat: 28.6139, lng: 77.2090 }; // New Delhi, India
        const map = new google.maps.Map(mapContainer, {
            center: defaultCenter,
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
        });

        const draggableMarker = new google.maps.Marker({
            position: defaultCenter,
            map: map,
            draggable: true,
            title: 'Drag to set exact location',
        });

        map.addListener('click', (event) => {
            draggableMarker.setPosition(event.latLng);
        });

        draggableMarker.addListener('dragend', () => {
            const pos = draggableMarker.getPosition();
            console.log('Selected location:', pos.lat(), pos.lng());
        });
    };
    
    // Form elements
    const requestForm = document.getElementById('requestForm');
    const patientNameInput = document.getElementById('patientName');
    const requesterNameInput = document.getElementById('requesterName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const bloodTypeSelect = document.getElementById('bloodType');
    const unitsInput = document.getElementById('units');
    const urgencySelect = document.getElementById('urgency');
    const hospitalInput = document.getElementById('hospital');
    const addressTextarea = document.getElementById('address');
    const reasonTextarea = document.getElementById('reason');
    const requiredDateInput = document.getElementById('requiredDate');
    const termsCheckbox = document.getElementById('terms');
    
    requestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            handleFormSubmission();
        }
    });
    
    function validateForm() {
        let isValid = true;
        let errorMessages = [];
        
        // Patient name validation
        if (!patientNameInput.value.trim() || patientNameInput.value.trim().length < 2) {
            isValid = false;
            errorMessages.push('Patient name must be at least 2 characters long');
            highlightError(patientNameInput);
        } else {
            removeError(patientNameInput);
        }
        
        // Requester name validation
        if (!requesterNameInput.value.trim() || requesterNameInput.value.trim().length < 2) {
            isValid = false;
            errorMessages.push('Requester name must be at least 2 characters long');
            highlightError(requesterNameInput);
        } else {
            removeError(requesterNameInput);
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
            isValid = false;
            errorMessages.push('Please enter a valid email address');
            highlightError(emailInput);
        } else {
            removeError(emailInput);
        }
        
        // Phone validation
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value.replace(/\s/g, ''))) {
            isValid = false;
            errorMessages.push('Please enter a valid phone number');
            highlightError(phoneInput);
        } else {
            removeError(phoneInput);
        }
        
        // Assistance type validation
        if (!bloodTypeSelect.value) {
            isValid = false;
            errorMessages.push('Please select the assistance type');
            highlightError(bloodTypeSelect);
        } else {
            removeError(bloodTypeSelect);
        }
        
        // People needed validation
        const units = parseInt(unitsInput.value);
        if (!unitsInput.value || units < 1 || units > 10) {
            isValid = false;
            errorMessages.push('People needed must be between 1 and 10');
            highlightError(unitsInput);
        } else {
            removeError(unitsInput);
        }
        
        // Urgency validation
        if (!urgencySelect.value) {
            isValid = false;
            errorMessages.push('Please select the urgency level');
            highlightError(urgencySelect);
        } else {
            removeError(urgencySelect);
        }
        
        // Center / Hospital validation
        if (!hospitalInput.value.trim() || hospitalInput.value.trim().length < 2) {
            isValid = false;
            errorMessages.push('Location name must be at least 2 characters long');
            highlightError(hospitalInput);
        } else {
            removeError(hospitalInput);
        }
        
        // Address validation
        if (!addressTextarea.value.trim() || addressTextarea.value.trim().length < 10) {
            isValid = false;
            errorMessages.push('Please enter a complete address (minimum 10 characters)');
            highlightError(addressTextarea);
        } else {
            removeError(addressTextarea);
        }
        
        // Reason validation
        if (!reasonTextarea.value.trim() || reasonTextarea.value.trim().length < 10) {
            isValid = false;
            errorMessages.push('Please provide details of the required assistance (minimum 10 characters)');
            highlightError(reasonTextarea);
        } else {
            removeError(reasonTextarea);
        }
        
        // Date validation
        const requiredDate = new Date(requiredDateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (!requiredDateInput.value || requiredDate < today) {
            isValid = false;
            errorMessages.push('Required date must be in the future');
            highlightError(requiredDateInput);
        } else {
            removeError(requiredDateInput);
        }
        
        // Terms validation
        if (!termsCheckbox.checked) {
            isValid = false;
            errorMessages.push('You must agree to the terms and conditions');
            highlightError(termsCheckbox);
        } else {
            removeError(termsCheckbox);
        }
        
        if (!isValid) {
            showValidationErrors(errorMessages);
        }
        
        return isValid;
    }
    
    function highlightError(element) {
        element.style.borderColor = '#ff6b6b';
        element.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.1)';
        element.classList.add('error');
    }
    
    function removeError(element) {
        element.style.borderColor = '#e9ecef';
        element.style.boxShadow = 'none';
        element.classList.remove('error');
    }
    
    function showValidationErrors(messages) {
        const existingErrors = document.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
        
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-container';
        errorContainer.style.cssText = `
            background-color: #fff5f5;
            border: 2px solid #ff6b6b;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 20px;
            color: #ff6b6b;
            font-size: 14px;
            font-weight: 500;
        `;
        
        const errorTitle = document.createElement('h3');
        errorTitle.textContent = 'Please fix the following errors:';
        errorTitle.style.marginBottom = '10px';
        errorTitle.style.fontSize = '16px';
        errorTitle.style.fontWeight = '600';
        
        errorContainer.appendChild(errorTitle);
        
        const errorList = document.createElement('ul');
        errorList.style.margin = '0';
        errorList.style.paddingLeft = '20px';
        
        messages.forEach(message => {
            const listItem = document.createElement('li');
            listItem.textContent = message;
            listItem.style.marginBottom = '5px';
            errorList.appendChild(listItem);
        });
        
        errorContainer.appendChild(errorList);
        requestForm.insertBefore(errorContainer, requestForm.firstChild);
        
        setTimeout(() => {
            if (errorContainer.parentNode) {
                errorContainer.remove();
            }
        }, 5000);
    }
    
    function handleFormSubmission() {
        const submitButton = requestForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Submitting Request...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        
        setTimeout(() => {
            showSuccessMessage();
            requestForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
        }, 2000);
    }
    
    function showSuccessMessage() {
        const successContainer = document.createElement('div');
        successContainer.className = 'success-container';
        successContainer.style.cssText = `
            background-color: #f0fff4;
            border: 2px solid #28a745;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            color: #28a745;
            font-size: 16px;
            font-weight: 500;
            text-align: center;
        `;
        
        const successIcon = document.createElement('div');
        successIcon.innerHTML = '✓';
        successIcon.style.cssText = `
            font-size: 48px;
            margin-bottom: 10px;
            font-weight: bold;
        `;
        
        const successTitle = document.createElement('h3');
        successTitle.textContent = 'Assistance Request Submitted!';
        successTitle.style.marginBottom = '10px';
        successTitle.style.fontSize = '20px';
        successTitle.style.fontWeight = '600';
        
        const successMessage = document.createElement('p');
        successMessage.textContent = 'Your assistance request has been submitted successfully. We will contact you soon to coordinate support.';
        successMessage.style.margin = '0';
        successMessage.style.lineHeight = '1.5';
        
        successContainer.appendChild(successIcon);
        successContainer.appendChild(successTitle);
        successContainer.appendChild(successMessage);
        requestForm.insertBefore(successContainer, requestForm.firstChild);
        
        setTimeout(() => {
            if (successContainer.parentNode) {
                successContainer.remove();
            }
        }, 8000);
    }
    
    // Real-time validation
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value.trim() && !emailRegex.test(this.value.trim())) {
            highlightError(this);
        } else {
            removeError(this);
        }
    });
    
    phoneInput.addEventListener('blur', function() {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (this.value.trim() && !phoneRegex.test(this.value.replace(/\s/g, ''))) {
            highlightError(this);
        } else {
            removeError(this);
        }
    });
    
    unitsInput.addEventListener('blur', function() {
        const units = parseInt(this.value);
        if (this.value && (units < 1 || units > 10)) {
            highlightError(this);
        } else {
            removeError(this);
        }
    });
    
    requiredDateInput.addEventListener('blur', function() {
        if (this.value) {
            const requiredDate = new Date(this.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (requiredDate < today) {
                highlightError(this);
            } else {
                removeError(this);
            }
        }
    });
    
    // Character counters
    addressTextarea.addEventListener('input', function() {
        const minLength = 10;
        const currentLength = this.value.trim().length;
        
        const existingCounter = this.parentNode.querySelector('.char-counter');
        if (existingCounter) {
            existingCounter.remove();
        }
        
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.cssText = `
            font-size: 12px;
            color: ${currentLength >= minLength ? '#28a745' : '#ff6b6b'};
            margin-top: 5px;
            text-align: right;
        `;
        charCounter.textContent = `${currentLength}/${minLength} characters minimum`;
        this.parentNode.appendChild(charCounter);
    });
    
    reasonTextarea.addEventListener('input', function() {
        const minLength = 10;
        const currentLength = this.value.trim().length;
        
        const existingCounter = this.parentNode.querySelector('.char-counter');
        if (existingCounter) {
            existingCounter.remove();
        }
        
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.cssText = `
            font-size: 12px;
            color: ${currentLength >= minLength ? '#28a745' : '#ff6b6b'};
            margin-top: 5px;
            text-align: right;
        `;
        charCounter.textContent = `${currentLength}/${minLength} characters minimum`;
        this.parentNode.appendChild(charCounter);
    });
    
    // Form field focus effects
    const formInputs = requestForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    console.log('Assistance request script loaded successfully!');
    
    window.addEventListener('error', function(e) {
        console.error('An error occurred:', e.error);
    });
    
});
