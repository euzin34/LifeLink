// Dashboard Sections Module
// Handles all section display and navigation functionality

/**
 * Hide all content sections
 * Called when switching between different sections
 */
function hideAllSections() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
}

/**
 * Show the donors section
 * Displays donor management interface
 */
function showDonorsSection() {
    hideAllSections();
    
    const donorsSection = document.getElementById('donorsSection');
    if (donorsSection) {
        donorsSection.style.display = 'block';
        populateDonorsTable();
    }
}

/**
 * Show the patients section
 * Displays patient management interface
 */
function showPatientsSection() {
    hideAllSections();
    
    const patientsSection = document.getElementById('patientsSection');
    if (patientsSection) {
        patientsSection.style.display = 'block';
        populatePatientsTable();
    }
}

/**
 * Show the donations section
 * Displays donation management interface
 */
function showDonationsSection() {
    hideAllSections();
    
    const donationsSection = document.getElementById('donationsSection');
    if (donationsSection) {
        donationsSection.style.display = 'block';
        populateDonationsTable();
    }
}

/**
 * Show the requests section
 * Displays assistance request management interface
 */
function showRequestsSection() {
    hideAllSections();
    
    const requestsSection = document.getElementById('requestsSection');
    if (requestsSection) {
        requestsSection.style.display = 'block';
        populateRequestsTable();
    }
}

/**
 * Show the inventory section
 * Displays resource inventory management interface
 */
function showInventorySection() {
    hideAllSections();
    
    const inventorySection = document.getElementById('inventorySection');
    if (inventorySection) {
        inventorySection.style.display = 'block';
        populateInventoryTable();
    }
}

/**
 * Show the support guide section
 * Displays support type management interface
 */
function showBloodMenuSection() {
    hideAllSections();
    
    const bloodMenuSection = document.getElementById('bloodMenuSection');
    if (bloodMenuSection) {
        bloodMenuSection.style.display = 'block';
        populateBloodMenuData();
    }
}

/**
 * Show the main dashboard section
 * Displays overview statistics and charts
 */
function showDashboardSection() {
    hideAllSections();
    
    const dashboardSection = document.getElementById('dashboardSection');
    if (dashboardSection) {
        dashboardSection.style.display = 'block';
        initializeCharts();
        populateActivityFeed();
    }
}

/**
 * Populate donors table with sample data
 */
function populateDonorsTable() {
    const tableBody = document.querySelector('#donorsTable tbody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    
    const donors = [
        { name: 'John Doe', email: 'john@example.com', role: 'Mobility Assistance', status: 'eligible', lastActive: '2025-08-20' },
        { name: 'Jane Smith', email: 'jane@example.com', role: 'Sign Language Support', status: 'eligible', lastActive: '2025-08-12' },
        { name: 'Mike Johnson', email: 'mike@example.com', role: 'Transport Assistance', status: 'ineligible', lastActive: '2025-07-28' }
    ];

    donors.forEach(donor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${donor.name}</td>
            <td>${donor.email}</td>
            <td>${donor.role}</td>
            <td><span class="status-badge ${donor.status === 'eligible' ? 'eligible' : 'ineligible'}">${donor.status === 'eligible' ? 'active' : 'inactive'}</span></td>
            <td>${donor.lastActive}</td>
            <td><button class="action-btn view">View</button></td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * Populate patients table with sample data
 */
function populatePatientsTable() {
    const tableBody = document.querySelector('#patientsTable tbody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    
    const patients = [
        { name: 'Alice Brown', center: 'Community Center', assistance: 'Mobility', urgency: 'high', date: '2025-09-02' },
        { name: 'Bob Wilson', center: 'Care Hub', assistance: 'Transport', urgency: 'emergency', date: '2025-09-01' }
    ];

    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.name}</td>
            <td>${patient.center}</td>
            <td>${patient.assistance}</td>
            <td><span class="urgency-badge ${patient.urgency}">${patient.urgency}</span></td>
            <td>${patient.date}</td>
            <td><button class="action-btn process">Process</button></td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * Populate donations table with sample data
 */
function populateDonationsTable() {
    const tableBody = document.querySelector('#donationsTable tbody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    
    const donations = [
        { supporter: 'John Doe', category: 'Mobility', hours: 3, date: '2025-09-02', status: 'completed' },
        { supporter: 'Jane Smith', category: 'Sign Language', hours: 2, date: '2025-09-02', status: 'processing' }
    ];

    donations.forEach(donation => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${donation.supporter}</td>
            <td>${donation.category}</td>
            <td>${donation.hours}</td>
            <td>${donation.date}</td>
            <td><span class="status-badge ${donation.status}">${donation.status}</span></td>
            <td><button class="action-btn view">View</button></td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * Populate requests table with sample data
 */
function populateRequestsTable() {
    const tableBody = document.querySelector('#requestsTable tbody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    
    const requests = [
        { patient: 'Alice Brown', assistance: 'Mobility', people: 2, urgency: 'high', date: '2025-09-02', status: 'pending' },
        { patient: 'Bob Wilson', assistance: 'Transport', people: 1, urgency: 'emergency', date: '2025-09-01', status: 'approved' }
    ];

    requests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${request.patient}</td>
            <td>${request.assistance}</td>
            <td>${request.people}</td>
            <td><span class="urgency-badge ${request.urgency}">${request.urgency}</span></td>
            <td>${request.date}</td>
            <td><span class="status-badge ${request.status}">${request.status}</span></td>
            <td><button class="action-btn approve">Approve</button></td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * Populate blood menu data
 */
function populateBloodMenuData() {
    // This would populate support guide data
    console.log('Populating support guide data...');
}
