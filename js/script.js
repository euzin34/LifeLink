// Wait for the DOM to be fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Get references to important DOM elements for manipulation
    const registerButton = document.querySelector('.register-button'); // Get the register button element
    const navigationLinks = document.querySelectorAll('.main-nav a'); // Get all navigation links
    const heartGraphic = document.querySelector('.heart-graphic'); // Get the heart graphic element
    const bloodBagGraphic = document.querySelector('.blood-bag-graphic'); // Get the blood bag graphic element
    
    // Add click event listener to the register button
    registerButton.addEventListener('click', function() {
        // Redirect to volunteer registration page
        window.location.href = 'volunteer.html';
    });
    
    // Add click event listeners to all navigation links for smooth scrolling
    navigationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the href attribute
            const href = this.getAttribute('href');
            
            // Check if it's an internal link (starts with #)
            if (href.startsWith('#')) {
                e.preventDefault(); // Prevent default link behavior (page jump)
                
                // Get the target section ID from the href attribute
                const targetId = href.substring(1); // Remove the '#' from href
                
                // Check if the target section exists on the page
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // If target section exists, scroll to it smoothly
                    targetSection.scrollIntoView({
                        behavior: 'smooth', // Enable smooth scrolling animation
                        block: 'start' // Align to the top of the viewport
                    });
                }
            }
            // For external links (like volunteer.html, request.html, admin-login.html), let them work normally
        });
    });
    
    // Add hover effects to the heart graphic for interactive feedback
    heartGraphic.addEventListener('mouseenter', function() {
        // When mouse enters the heart, make it pulse faster
        this.style.animationDuration = '0.5s'; // Speed up the heartbeat animation
        this.style.transform = 'rotate(-45deg) scale(1.1)'; // Make it slightly larger
    });
    
    // Reset heart animation when mouse leaves
    heartGraphic.addEventListener('mouseleave', function() {
        // When mouse leaves the heart, restore normal animation
        this.style.animationDuration = '2s'; // Restore normal heartbeat speed
        this.style.transform = 'rotate(-45deg) scale(1)'; // Restore normal size
    });
    
    // Add hover effects to the blood bag graphic
    bloodBagGraphic.addEventListener('mouseenter', function() {
        // When mouse enters the blood bag, add a glow effect
        this.style.boxShadow = '0 15px 40px rgba(255, 107, 107, 0.4)'; // Add red glow shadow
        this.style.transform = 'translateY(-50%) scale(1.05)'; // Make it slightly larger
    });
    
    // Reset blood bag when mouse leaves
    bloodBagGraphic.addEventListener('mouseleave', function() {
        // When mouse leaves the blood bag, restore normal appearance
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)'; // Restore original shadow
        this.style.transform = 'translateY(-50%) scale(1)'; // Restore normal size
    });
    
    // Add scroll event listener for header background effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.page-header'); // Get the header element
        const scrollPosition = window.scrollY; // Get current scroll position
        
        // Change header background opacity based on scroll position
        if (scrollPosition > 50) {
            // When scrolled down, make header more opaque
            header.style.backgroundColor = 'rgba(135, 206, 235, 0.98)'; // More opaque background
            header.style.backdropFilter = 'blur(15px)'; // Increase blur effect
        } else {
            // When at top, keep header semi-transparent
            header.style.backgroundColor = 'rgba(135, 206, 235, 0.95)'; // Semi-transparent background
            header.style.backdropFilter = 'blur(10px)'; // Normal blur effect
        }
    });
    
    // Add keyboard navigation support for accessibility
    document.addEventListener('keydown', function(e) {
        // Check if the pressed key is Enter or Space
        if (e.key === 'Enter' || e.key === ' ') {
            // Get the currently focused element
            const focusedElement = document.activeElement;
            
            // If the focused element is the register button, trigger click
            if (focusedElement === registerButton) {
                e.preventDefault(); // Prevent default space key behavior
                registerButton.click(); // Trigger the button click
            }
        }
    });
    
    // Add loading animation when page loads
    window.addEventListener('load', function() {
        // Get all elements that should animate in
        const animatedElements = document.querySelectorAll('.hero-content, .hero-graphics');
        
        // Add fade-in animation to each element
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0'; // Start with zero opacity
            element.style.transform = 'translateY(30px)'; // Start slightly below final position
            
            // Animate each element with a slight delay
            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease'; // Add smooth transition
                element.style.opacity = '1'; // Fade in to full opacity
                element.style.transform = 'translateY(0)'; // Move to final position
            }, index * 200); // Delay each element by 200ms
        });
    });
    
    // Add touch support for mobile devices
    let touchStartY = 0; // Variable to store touch start position
    let touchEndY = 0; // Variable to store touch end position
    
    // Listen for touch start events
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY; // Store the Y position when touch starts
    });
    
    // Listen for touch end events
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY; // Store the Y position when touch ends
        
        // Calculate the distance of the swipe
        const swipeDistance = touchStartY - touchEndY; // Calculate swipe distance
        
        // If it's a significant upward swipe, trigger register button
        if (swipeDistance > 100) {
            registerButton.click(); // Trigger register button click
        }
    });
    
    // Add console log to confirm script is loaded
    console.log('BLOOD BUDDY website script loaded successfully!'); // Log success message
    
    // Add error handling for any potential issues
    window.addEventListener('error', function(e) {
        console.error('An error occurred:', e.error); // Log any errors that occur
    });
    
});
