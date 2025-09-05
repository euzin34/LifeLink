// -------------------------------
// Global variables
// -------------------------------
let allSafeHouses = [];
let filteredSafeHouses = [];
let currentFilter = 'all';

// -------------------------------
// Enhanced data with more details
// -------------------------------
const enhancedSafeHousesData = [
  {
    id: 1,
    name: "Hope Community Center",
    location: "Downtown District",
    address: "123 Main Street, Downtown",
    accessibility: ["Wheelchair Ramp", "Braille Signs", "Elevator Access", "Wide Doorways"],
    contact: "123-456-7890",
    email: "hope@community.org",
    hours: "24/7",
    status: "Open",
    description: "A welcoming space with full accessibility features and trained staff available around the clock.",
    features: ["wheelchair", "visual", "hearing", "cognitive"],
    rating: 4.8,
    capacity: 50
  },
  {
    id: 2,
    name: "Care & Support Hub",
    location: "City Mall Complex",
    address: "456 Mall Road, City Center",
    accessibility: ["Quiet Rooms", "Accessible Restroom", "Sensory-Friendly Lighting", "Assistive Technology"],
    contact: "987-654-3210",
    email: "care@support.org",
    hours: "6 AM - 10 PM",
    status: "Open",
    description: "Specialized support center with sensory-friendly environments and assistive technology resources.",
    features: ["sensory", "quiet", "cognitive", "mobility"],
    rating: 4.6,
    capacity: 30
  },
  {
    id: 3,
    name: "Unity Safe Space",
    location: "Residential Area",
    address: "789 Peace Lane, Suburbia",
    accessibility: ["Ramp Access", "Audio Announcements", "Large Print Materials", "Trained Staff"],
    contact: "555-123-4567",
    email: "unity@safespace.org",
    hours: "8 AM - 8 PM",
    status: "Open",
    description: "Community-focused safe space with comprehensive accessibility support and family-friendly environment.",
    features: ["wheelchair", "hearing", "visual", "family"],
    rating: 4.9,
    capacity: 25
  },
  {
    id: 4,
    name: "Empowerment Center",
    location: "Business District",
    address: "321 Corporate Plaza, Business Center",
    accessibility: ["Full ADA Compliance", "Sign Language Support", "Cognitive Assistance", "Emergency Support"],
    contact: "444-789-0123",
    email: "empower@center.org",
    hours: "24/7",
    status: "Open",
    description: "Comprehensive support center with full ADA compliance and emergency response capabilities.",
    features: ["wheelchair", "hearing", "visual", "cognitive", "emergency"],
    rating: 4.7,
    capacity: 75
  },
  {
    id: 5,
    name: "Tranquil Haven",
    location: "Park District",
    address: "654 Green Park Avenue, Nature Area",
    accessibility: ["Nature Access", "Quiet Gardens", "Sensory Paths", "Meditation Spaces"],
    contact: "333-456-7890",
    email: "tranquil@haven.org",
    hours: "7 AM - 9 PM",
    status: "Open",
    description: "Peaceful retreat space with nature-based therapy and quiet contemplation areas.",
    features: ["sensory", "quiet", "nature", "mental-health"],
    rating: 4.5,
    capacity: 20
  }
];

// -------------------------------
// Fetch data from API with fallback
// -------------------------------
async function fetchSafeHouses() {
  try {
    const apiUrl = (window.SAFEHOUSE_API && window.SAFEHOUSE_API.URL) || "http://localhost:8080/api/safehouses";
    const response = await fetch(apiUrl, { headers: { "Content-Type": "application/json" } });
    if (!response.ok) {
      throw new Error("Failed to fetch Safe Houses");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    console.log("Using enhanced fallback data");
    return enhancedSafeHousesData;
  }
}

// -------------------------------
// Render safe house cards
// -------------------------------
function renderSafeHouses(safehouses) {
  const grid = document.getElementById('safehousesGrid');
  const loadingState = document.getElementById('loadingState');
  const emptyState = document.getElementById('emptyState');
  
  // Hide loading state
  if (loadingState) {
    loadingState.style.display = 'none';
  }
  
  // Clear existing cards
  grid.innerHTML = '';
  
  if (safehouses.length === 0) {
    emptyState.style.display = 'flex';
    return;
  }
  
  emptyState.style.display = 'none';
  
  safehouses.forEach((safehouse, index) => {
    const card = createSafeHouseCard(safehouse, index);
    grid.appendChild(card);
  });
  
  // Update total count
  updateTotalCount(safehouses.length);
}

// -------------------------------
// Create individual safe house card
// -------------------------------
function createSafeHouseCard(safehouse, index) {
  const card = document.createElement('div');
  card.className = 'safehouse-card';
  card.setAttribute('role', 'article');
  card.setAttribute('aria-labelledby', `card-title-${safehouse.id}`);
  card.setAttribute('tabindex', '0');
  card.setAttribute('data-index', index);
  
  // Create feature tags
  const featureTags = safehouse.accessibility.map(feature => 
    `<span class="feature-tag" aria-label="Accessibility feature: ${feature}">${feature}</span>`
  ).join('');
  
  card.innerHTML = `
    <div class="card-header">
      <div>
        <h3 class="card-title" id="card-title-${safehouse.id}">${safehouse.name}</h3>
        <div class="card-location">
          <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
          <span>${safehouse.location}</span>
        </div>
      </div>
      <div class="card-status" aria-label="Status: ${safehouse.status}">${safehouse.status}</div>
    </div>
    
    <div class="card-features">
      <div class="features-title">Accessibility Features</div>
      <div class="features-list" role="list" aria-label="Accessibility features">
        ${featureTags}
      </div>
    </div>
    
    <div class="card-contact">
      <i class="fas fa-phone contact-icon" aria-hidden="true"></i>
      <div class="contact-text">${safehouse.contact}</div>
    </div>
    
    <div class="card-actions">
      <button class="action-btn" onclick="viewDetails(${safehouse.id})" aria-label="View details for ${safehouse.name}">
        <i class="fas fa-info-circle" aria-hidden="true"></i>
        View Details
      </button>
      <button class="action-btn primary" onclick="contactSafeHouse(${safehouse.id})" aria-label="Contact ${safehouse.name}">
        <i class="fas fa-phone" aria-hidden="true"></i>
        Contact
      </button>
    </div>
  `;
  
  // Add keyboard navigation
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      viewDetails(safehouse.id);
    }
  });
  
  return card;
}

// -------------------------------
// Filter safe houses based on search and filter criteria
// -------------------------------
function filterSafeHouses() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const filterType = currentFilter;
  
  filteredSafeHouses = allSafeHouses.filter(safehouse => {
    const matchesSearch = safehouse.name.toLowerCase().includes(searchTerm) ||
                         safehouse.location.toLowerCase().includes(searchTerm) ||
                         safehouse.address.toLowerCase().includes(searchTerm);
    
    const matchesFilter = filterType === 'all' || 
                         safehouse.features.includes(filterType);
    
    return matchesSearch && matchesFilter;
  });
  
  renderSafeHouses(filteredSafeHouses);
}

// -------------------------------
// Search functionality
// -------------------------------
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  
  if (searchInput) {
    // Real-time search with debouncing
    let searchTimeout;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        filterSafeHouses();
      }, 300);
    });
  }
}

// -------------------------------
// Filter functionality
// -------------------------------
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      
      // Update current filter
      currentFilter = button.getAttribute('data-filter');
      
      // Apply filter
      filterSafeHouses();
    });
  });
}

// -------------------------------
// View details function
// -------------------------------
function viewDetails(safehouseId) {
  const safehouse = allSafeHouses.find(sh => sh.id === safehouseId);
  if (!safehouse) return;
  
  // Create modal or detailed view
  const modal = createDetailsModal(safehouse);
  document.body.appendChild(modal);
  
  // Focus on modal
  const firstFocusable = modal.querySelector('button, input, [tabindex]');
  if (firstFocusable) {
    firstFocusable.focus();
  }
}

// -------------------------------
// Create details modal
// -------------------------------
function createDetailsModal(safehouse) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'modal-title');
  modal.setAttribute('aria-modal', 'true');
  
  const featureTags = safehouse.accessibility.map(feature => 
    `<span class="feature-tag">${feature}</span>`
  ).join('');
  
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="modal-title">${safehouse.name}</h2>
        <button class="modal-close" onclick="closeModal()" aria-label="Close modal">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="modal-body">
        <div class="modal-section">
          <h3>Location & Contact</h3>
          <p><strong>Address:</strong> ${safehouse.address}</p>
          <p><strong>Phone:</strong> ${safehouse.contact}</p>
          <p><strong>Email:</strong> ${safehouse.email}</p>
          <p><strong>Hours:</strong> ${safehouse.hours}</p>
        </div>
        
        <div class="modal-section">
          <h3>Description</h3>
          <p>${safehouse.description}</p>
        </div>
        
        <div class="modal-section">
          <h3>Accessibility Features</h3>
          <div class="features-list">
            ${featureTags}
          </div>
        </div>
        
        <div class="modal-section">
          <h3>Additional Information</h3>
          <p><strong>Capacity:</strong> ${safehouse.capacity} people</p>
          <p><strong>Rating:</strong> ${safehouse.rating}/5.0</p>
          <p><strong>Status:</strong> ${safehouse.status}</p>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="action-btn" onclick="closeModal()">Close</button>
        <button class="action-btn primary" onclick="contactSafeHouse(${safehouse.id})">
          <i class="fas fa-phone"></i>
          Contact Now
        </button>
      </div>
    </div>
  `;
  
  // Add keyboard navigation
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  
  // Focus trap
  const focusableElements = modal.querySelectorAll('button, input, [tabindex]');
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
  
  return modal;
}

// -------------------------------
// Close modal function
// -------------------------------
function closeModal() {
  const modal = document.querySelector('.modal-overlay');
  if (modal) {
    modal.remove();
  }
}

// -------------------------------
// Contact safe house function
// -------------------------------
function contactSafeHouse(safehouseId) {
  const safehouse = allSafeHouses.find(sh => sh.id === safehouseId);
  if (!safehouse) return;
  
  // Create contact options
  const contactOptions = [];
  
  if (safehouse.contact) {
    contactOptions.push(`Phone: ${safehouse.contact}`);
  }
  
  if (safehouse.email) {
    contactOptions.push(`Email: ${safehouse.email}`);
  }
  
  const message = `Contact ${safehouse.name}:\n\n${contactOptions.join('\n')}\n\nAddress: ${safehouse.address}`;
  
  // Show contact information
  alert(message);
  
  // In a real application, you might:
  // - Open a contact form
  // - Initiate a phone call
  // - Open email client
  // - Show a contact modal
}

// -------------------------------
// Update total count
// -------------------------------
function updateTotalCount(count) {
  const totalElement = document.getElementById('totalSafeHouses');
  if (totalElement) {
    totalElement.textContent = count;
  }
}

// -------------------------------
// Setup accessibility features
// -------------------------------
function setupAccessibility() {
  // Add skip link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main content ID
  const mainContent = document.querySelector('.safehouses-section');
  if (mainContent) {
    mainContent.id = 'main-content';
  }
  
  // Announce changes to screen readers
  const announce = (message) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };
  
  // Announce filter changes
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterName = button.textContent.trim();
      announce(`Filter changed to ${filterName}. ${filteredSafeHouses.length} safe houses found.`);
    });
  });
}

// -------------------------------
// Initialize App
// -------------------------------
async function init() {
  try {
    // Show loading state
    const loadingState = document.getElementById('loadingState');
    if (loadingState) {
      loadingState.style.display = 'flex';
    }
    
    // Fetch data
    allSafeHouses = await fetchSafeHouses();
    filteredSafeHouses = [...allSafeHouses];
    
    // Render initial data
    renderSafeHouses(filteredSafeHouses);
    
    // Setup interactions
    setupSearch();
    setupFilters();
    setupAccessibility();
    
    // Announce page load
    setTimeout(() => {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = `Safe house directory loaded. ${allSafeHouses.length} safe houses available.`;
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 2000);
    }, 500);
    
  } catch (error) {
    console.error('Error initializing app:', error);
    
    // Show error state
    const grid = document.getElementById('safehousesGrid');
    if (grid) {
      grid.innerHTML = `
        <div class="error-state">
          <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
          <h3>Unable to load safe houses</h3>
          <p>Please try refreshing the page or contact support if the problem persists.</p>
          <button class="action-btn primary" onclick="location.reload()">
            <i class="fas fa-refresh"></i>
            Refresh Page
          </button>
        </div>
      `;
    }
  }
}

// -------------------------------
// Run on page load
// -------------------------------
document.addEventListener('DOMContentLoaded', init);

// -------------------------------
// Add CSS for modal and additional features
// -------------------------------
const additionalStyles = `
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 20px;
  }
  
  .modal-content {
    background: white;
    border-radius: 20px;
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 30px 20px;
    border-bottom: 1px solid #e9ecef;
  }
  
  .modal-header h2 {
    font-family: "Neuton", serif;
    font-size: 28px;
    font-weight: 700;
    color: #333333;
    margin: 0;
  }
  
  .modal-close {
    background: none;
    border: none;
    font-size: 24px;
    color: #666666;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: background-color 0.3s ease;
  }
  
  .modal-close:hover {
    background-color: #f8f9fa;
  }
  
  .modal-body {
    padding: 30px;
  }
  
  .modal-section {
    margin-bottom: 30px;
  }
  
  .modal-section h3 {
    font-family: "Inter", sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 15px;
  }
  
  .modal-section p {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    color: #666666;
    line-height: 1.6;
    margin-bottom: 10px;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    padding: 20px 30px 30px;
    border-top: 1px solid #e9ecef;
  }
  
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    text-align: center;
    grid-column: 1 / -1;
  }
  
  .error-state i {
    font-size: 64px;
    color: #ff6b6b;
    margin-bottom: 20px;
  }
  
  .error-state h3 {
    font-family: "Inter", sans-serif;
    font-size: 24px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 10px;
  }
  
  .error-state p {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    color: #666666;
    margin-bottom: 30px;
    max-width: 400px;
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

