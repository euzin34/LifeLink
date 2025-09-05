// Dashboard Tables Module
// Handles all table-related functionality for the admin dashboard

/**
 * Populate the inventory table with sample data
 * Called when the inventory section is shown
 */
function populateInventoryTable() {
    const tableBody = document.querySelector('#inventoryTable tbody');
    if (!tableBody) {
        console.warn('Inventory table body not found');
        return;
    }

    // Clear existing rows
    tableBody.innerHTML = '';

    // Sample inventory data
    const inventoryData = [
        { type: 'Wheelchairs', units: 45, status: 'available', lastUpdated: '2025-09-01' },
        { type: 'Walking Aids', units: 12, status: 'low', lastUpdated: '2025-09-01' },
        { type: 'Sign Language Support', units: 38, status: 'available', lastUpdated: '2025-09-02' },
        { type: 'Transport Vans', units: 8, status: 'critical', lastUpdated: '2025-09-02' },
        { type: 'Sensory Kits', units: 15, status: 'available', lastUpdated: '2025-09-02' },
        { type: 'Care Volunteers', units: 5, status: 'critical', lastUpdated: '2025-09-02' },
        { type: 'Counselors', units: 22, status: 'available', lastUpdated: '2025-09-02' },
        { type: 'Ramps', units: 10, status: 'low', lastUpdated: '2025-09-02' }
    ];

    // Add rows to table
    inventoryData.forEach(item => {
        const row = createInventoryRow(item);
        tableBody.appendChild(row);
    });
}

/**
 * Create a table row for inventory data
 * @param {Object} item - Inventory item data
 * @returns {HTMLElement} Table row element
 */
function createInventoryRow(item) {
    const row = document.createElement('tr');
    
    // Status badge class based on status
    let statusClass = 'status-available';
    if (item.status === 'low') statusClass = 'status-low';
    if (item.status === 'critical') statusClass = 'status-critical';

    row.innerHTML = `
        <td>${item.type}</td>
        <td>${item.units}</td>
        <td><span class="status-badge ${statusClass}">${item.status}</span></td>
        <td>${item.lastUpdated}</td>
        <td>
            <button class="action-button" onclick="handleInventoryAction('${item.type}')">
                Manage
            </button>
        </td>
    `;

    return row;
}

/**
 * Handle inventory action button clicks
 * @param {string} bloodType - Blood type being managed
 */
function handleInventoryAction(bloodType) {
    console.log(`Managing inventory for blood type: ${bloodType}`);
    // TODO: Implement inventory management modal or page
    alert(`Managing inventory for blood type: ${bloodType}`);
}

/**
 * Populate the activity feed with sample data
 * Called when the dashboard section is shown
 */
function populateActivityFeed() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) {
        console.warn('Activity list not found');
        return;
    }

    // Clear existing activities
    activityList.innerHTML = '';

    // Sample activity data
    const activities = [
        {
            icon: '🩸',
            title: 'New blood donation received',
            description: 'A+ blood type from John Doe',
            time: '2 hours ago',
            type: 'donation'
        },
        {
            icon: '📋',
            title: 'Blood request approved',
            description: 'Emergency request for O- blood',
            time: '4 hours ago',
            type: 'request'
        },
        {
            icon: '⚠️',
            title: 'Low inventory alert',
            description: 'B- blood type running low',
            time: '6 hours ago',
            type: 'alert'
        },
        {
            icon: '✅',
            title: 'Inventory updated',
            description: 'AB+ blood stock replenished',
            time: '1 day ago',
            type: 'update'
        },
        {
            icon: '👥',
            title: 'New volunteer registered',
            description: 'Sarah Johnson joined as donor',
            time: '2 days ago',
            type: 'volunteer'
        }
    ];

    // Add activities to list
    activities.forEach(activity => {
        const activityItem = createActivityItem(activity);
        activityList.appendChild(activityItem);
    });
}

/**
 * Create an activity item element
 * @param {Object} activity - Activity data
 * @returns {HTMLElement} Activity item element
 */
function createActivityItem(activity) {
    const item = document.createElement('div');
    item.className = 'activity-item';
    
    item.innerHTML = `
        <div class="activity-icon">${activity.icon}</div>
        <div class="activity-content">
            <h4 class="activity-title">${activity.title}</h4>
            <p class="activity-description">${activity.description}</p>
            <span class="activity-time">${activity.time}</span>
        </div>
    `;

    return item;
}
