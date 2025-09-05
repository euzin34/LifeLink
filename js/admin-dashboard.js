// Wait for the DOM to be fully loaded before executing any JavaScript
document.addEventListener("DOMContentLoaded", function () {
  console.log("Admin Dashboard loaded successfully"); // Log successful loading

  // Initialize all dashboard components
  initializeDashboard(); // Call the main initialization function
});

// Main initialization function that sets up all dashboard components
function initializeDashboard() {
  try {
    console.log("Initializing dashboard components...");
    showDashboardSection();
    setupEventListeners();
    console.log("Dashboard initialization completed");
  } catch (e) {
    console.error("Initialization error:", e && e.message);
  }
}

// Function to populate the statistics cards with sample data
function populateStatistics() {
  console.log("Populating statistics...");

  // Sample statistics data
  const statsData = {
    totalDonations: {
      number: 1247,
      change: "+12%",
      isPositive: true,
    },
    pendingRequests: {
      number: 89,
      change: "+5%",
      isPositive: true,
    },
    availableBlood: {
      number: 312, // Available resources count
      change: "+4%",
      isPositive: true,
    },
    emergencyRequests: {
      number: 23,
      change: "+8%",
      isPositive: true,
    },
  };

  // Update each stat card with the data
  updateStatCard("totalDonations", statsData.totalDonations); // Update total donations
  updateStatCard("pendingRequests", statsData.pendingRequests); // Update pending requests
  updateStatCard("availableBlood", statsData.availableBlood); // Update available blood
  updateStatCard("emergencyRequests", statsData.emergencyRequests); // Update emergency requests

  console.log("Statistics populated successfully"); // Log successful population
}

// Function to update individual stat cards
function updateStatCard(statId, data) {
  // Find the stat card element by ID
  const numberElement = document.getElementById(statId); // Get the number element by ID

  if (numberElement) {
    // Check if the element exists
    // Update the number
    numberElement.textContent = data.number.toLocaleString(); // Format and set the number

    // Find the change element within the same stat card
    const statCard = numberElement.closest(".stat-card"); // Get the parent stat card
    if (statCard) {
      // Check if stat card exists
      const changeElement = statCard.querySelector(".stat-change"); // Get the change element

      if (changeElement) {
        // Check if change element exists
        changeElement.textContent = data.change; // Set the change text
        changeElement.className = `stat-change ${
          data.isPositive ? "positive" : "negative"
        }`; // Set the appropriate class
      }
    }
  }
}

// Function to initialize charts using Chart.js
function initializeCharts() {
  if (!window.Chart) {
    console.warn("Chart.js not available; skipping charts");
    return;
  }
  try {
    console.log("Initializing charts...");
    initializeAssistanceCategoryChart();
    console.log("Charts initialized successfully");
  } catch (e) {
    console.error("Chart init failed:", e && e.message);
  }
}

// Function to create the blood type distribution chart
function initializeAssistanceCategoryChart() {
  const ctx = document.getElementById("bloodTypeChart");

  if (!ctx) {
    // Check if canvas element exists
    console.error("Blood type chart canvas not found"); // Log error if not found
    return; // Exit function
  }

  const bloodTypeData = {
    labels: [
      "Mobility",
      "Visual",
      "Hearing",
      "Sensory",
      "Transport",
      "Cognitive",
    ],
    datasets: [
      {
        label: "Requests",
        data: [120, 80, 60, 45, 90, 30],
        backgroundColor: [
          "#ff6b6b",
          "#4ecdc4",
          "#45b7aa",
          "#96ceb4",
          "#feca57",
          "#9b59b6",
        ],
        borderColor: [
          "#e55a5a",
          "#3fb5ad",
          "#389d94",
          "#7fb3a3",
          "#f3b63d",
          "#8e44ad",
        ],
        borderWidth: 2, // Border width
        borderRadius: 8, // Rounded corners for bars
        borderSkipped: false, // Don't skip borders
      },
    ],
  };

  // Chart configuration options
  const config = {
    type: "bar", // Chart type
    data: bloodTypeData, // Chart data
    options: {
      responsive: true, // Make chart responsive
      maintainAspectRatio: false, // Don't maintain aspect ratio
      plugins: {
        legend: {
          display: false, // Hide legend
        },
        title: {
          display: true, // Show title
          text: "Assistance by Category", // Title text
          font: {
            size: 16, // Title font size
            weight: "bold", // Bold font weight
          },
          color: "#2c3e50", // Title color
        },
      },
      scales: {
        y: {
          beginAtZero: true, // Start y-axis at zero
          grid: {
            color: "#ecf0f1", // Grid color
          },
          ticks: {
            color: "#7f8c8d", // Tick color
            font: {
              size: 12, // Tick font size
            },
          },
        },
        x: {
          grid: {
            display: false, // Hide x-axis grid
          },
          ticks: {
            color: "#7f8c8d", // Tick color
            font: {
              size: 12, // Tick font size
            },
          },
        },
      },
    },
  };

  // Create the chart
  new Chart(ctx, config); // Initialize the chart with configuration

  console.log("Blood type chart created successfully"); // Log successful creation
}

// Function to create the monthly donations trend chart
function initializeMonthlyDonationsChart() {
  const ctx = document.getElementById("monthlyDonationsChart");

  if (!ctx) {
    // Check if canvas element exists
    console.error("Monthly donations chart canvas not found"); // Log error if not found
    return; // Exit function
  }

  const monthlyData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // Month labels
    datasets: [
      {
        label: "Supports",
        data: [70, 85, 92, 108, 95, 117, 139, 128, 116, 104, 115, 127],
        borderColor: "#3498db", // Line color
        backgroundColor: "rgba(52, 152, 219, 0.1)", // Fill color with transparency
        borderWidth: 3, // Line width
        fill: true, // Fill area under the line
        tension: 0.4, // Smooth line curves
        pointBackgroundColor: "#3498db", // Point background color
        pointBorderColor: "#ffffff", // Point border color
        pointBorderWidth: 2, // Point border width
        pointRadius: 6, // Point radius
        pointHoverRadius: 8, // Point radius on hover
      },
    ],
  };

  // Chart configuration options
  const config = {
    type: "line", // Chart type
    data: monthlyData, // Chart data
    options: {
      responsive: true, // Make chart responsive
      maintainAspectRatio: false, // Don't maintain aspect ratio
      plugins: {
        legend: {
          display: false, // Hide legend
        },
        title: {
          display: true, // Show title
          text: "Monthly Support Trend", // Title text
          font: {
            size: 16, // Title font size
            weight: "bold", // Bold font weight
          },
          color: "#2c3e50", // Title color
        },
      },
      scales: {
        y: {
          beginAtZero: true, // Start y-axis at zero
          grid: {
            color: "#ecf0f1", // Grid color
          },
          ticks: {
            color: "#7f8c8d", // Tick color
            font: {
              size: 12, // Tick font size
            },
          },
        },
        x: {
          grid: {
            color: "#ecf0f1", // Grid color
          },
          ticks: {
            color: "#7f8c8d", // Tick color
            font: {
              size: 12, // Tick font size
            },
          },
        },
      },
    },
  };

  // Create the chart
  new Chart(ctx, config); // Initialize the chart with configuration

  console.log("Monthly support chart created successfully");
}

// Function to populate the inventory table with sample data
function populateInventoryTable() {
  console.log("Populating inventory table..."); // Log table population

  // Get the table body element
  const tableBody = document.getElementById("inventoryTableBody"); // Get the table body by ID

  if (!tableBody) {
    // Check if table body exists
    console.error("Inventory table body not found"); // Log error if not found
    return; // Exit function
  }

  // Sample inventory data
  const inventoryData = [
    {
      resource: "Wheelchairs",
      available: 45,
      requested: 12,
      pending: 5,
      status: "available",
    },
    {
      resource: "Walking Aids",
      available: 23,
      requested: 8,
      pending: 3,
      status: "low",
    },
    {
      resource: "Sign Language Support",
      available: 38,
      requested: 15,
      pending: 7,
      status: "available",
    },
    {
      resource: "Transport Vans",
      available: 15,
      requested: 12,
      pending: 4,
      status: "low",
    },
    {
      resource: "Sensory Kits",
      available: 12,
      requested: 6,
      pending: 2,
      status: "low",
    },
    {
      resource: "Care Volunteers",
      available: 8,
      requested: 4,
      pending: 1,
      status: "critical",
    },
    {
      resource: "Counselors",
      available: 28,
      requested: 9,
      pending: 3,
      status: "available",
    },
    {
      resource: "Ramps",
      available: 19,
      requested: 6,
      pending: 2,
      status: "low",
    },
  ];

  // Clear existing table content
  tableBody.innerHTML = ""; // Clear the table body

  // Add each inventory item to the table
  inventoryData.forEach((item) => {
    // Loop through each item
    const row = createInventoryRow(item); // Create a table row
    tableBody.appendChild(row); // Add the row to the table
  });

  console.log("Inventory table populated successfully"); // Log successful population
}

// Function to create a table row for inventory data
function createInventoryRow(item) {
  // Create a new table row element
  const row = document.createElement("tr"); // Create table row

  // Create table cells for each data point
  const bloodTypeCell = document.createElement("td");
  bloodTypeCell.textContent = item.resource;

  const availableCell = document.createElement("td"); // Create available cell
  availableCell.textContent = item.available; // Set available units text

  const requestedCell = document.createElement("td"); // Create requested cell
  requestedCell.textContent = item.requested; // Set requested units text

  const pendingCell = document.createElement("td"); // Create pending cell
  pendingCell.textContent = item.pending; // Set pending units text

  const statusCell = document.createElement("td"); // Create status cell
  const statusBadge = document.createElement("span"); // Create status badge
  statusBadge.className = `status-badge status-${item.status}`; // Set badge classes
  statusBadge.textContent =
    item.status.charAt(0).toUpperCase() + item.status.slice(1); // Capitalize status text
  statusCell.appendChild(statusBadge); // Add badge to status cell

  const actionsCell = document.createElement("td"); // Create actions cell
  const approveButton = document.createElement("button"); // Create approve button
  approveButton.className = "action-button"; // Set button class
  approveButton.textContent = "Approve"; // Set button text
  approveButton.onclick = () => approveRequest(item.bloodType); // Add click handler
  actionsCell.appendChild(approveButton); // Add button to actions cell

  // Add all cells to the row
  row.appendChild(bloodTypeCell); // Add blood type cell
  row.appendChild(availableCell); // Add available cell
  row.appendChild(requestedCell); // Add requested cell
  row.appendChild(pendingCell); // Add pending cell
  row.appendChild(statusCell); // Add status cell
  row.appendChild(actionsCell); // Add actions cell

  return row; // Return the completed row
}

// Function to populate the activity feed with sample data
function populateActivityFeed() {
  console.log("Populating activity feed..."); // Log activity feed population

  // Get the activity list element
  const activityList = document.getElementById("activityList"); // Get the activity list by ID

  if (!activityList) {
    // Check if activity list exists
    console.error("Activity list not found"); // Log error if not found
    return; // Exit function
  }

  // Sample activity data
  const activityData = [
    {
      icon: "🤝",
      title: "New support volunteer joined",
      time: "2 minutes ago",
      color: "#3498db",
    },
    {
      icon: "📋",
      title: "Assistance request approved",
      time: "15 minutes ago",
      color: "#27ae60",
    },
    {
      icon: "⚠️",
      title: "Low resources alert: Sensory Kits",
      time: "1 hour ago",
      color: "#f39c12",
    },
    {
      icon: "🚐",
      title: "Transport scheduled for beneficiary",
      time: "2 hours ago",
      color: "#9b59b6",
    },
    {
      icon: "✅",
      title: "Monthly accessibility audit completed",
      time: "3 hours ago",
      color: "#27ae60",
    },
  ];

  // Clear existing activity content
  activityList.innerHTML = ""; // Clear the activity list

  // Add each activity item to the list
  activityData.forEach((activity) => {
    // Loop through each activity
    const activityItem = createActivityItem(activity); // Create activity item
    activityList.appendChild(activityItem); // Add item to the list
  });

  console.log("Activity feed populated successfully"); // Log successful population
}

// Function to create an activity item
function createActivityItem(activity) {
  // Create activity item container
  const item = document.createElement("div"); // Create activity item
  item.className = "activity-item"; // Set item class

  // Create activity icon
  const icon = document.createElement("div"); // Create icon container
  icon.className = "activity-icon"; // Set icon class
  icon.textContent = activity.icon; // Set icon text
  icon.style.backgroundColor = activity.color; // Set icon background color
  icon.style.color = "#ffffff"; // Set icon text color

  // Create activity content container
  const content = document.createElement("div"); // Create content container
  content.className = "activity-content"; // Set content class

  // Create activity title
  const title = document.createElement("div"); // Create title element
  title.className = "activity-title"; // Set title class
  title.textContent = activity.title; // Set title text

  // Create activity time
  const time = document.createElement("div"); // Create time element
  time.className = "activity-time"; // Set time class
  time.textContent = activity.time; // Set time text

  // Assemble the activity item
  content.appendChild(title); // Add title to content
  content.appendChild(time); // Add time to content
  item.appendChild(icon); // Add icon to item
  item.appendChild(content); // Add content to item

  return item; // Return the completed activity item
}

// Function to set up event listeners for interactive elements
function setupEventListeners() {
  console.log("Setting up event listeners..."); // Log event listener setup

  // Logout button event listener
  const logoutButton = document.getElementById("logoutButton"); // Get logout button
  if (logoutButton) {
    // Check if logout button exists
    logoutButton.addEventListener("click", handleLogout); // Add click handler
  }

  // Refresh button event listener
  const refreshButton = document.getElementById("refreshButton"); // Get refresh button by ID
  if (refreshButton) {
    // Check if refresh button exists
    refreshButton.addEventListener("click", handleRefresh); // Add click handler
  }

  // View all button event listener
  const viewAllButton = document.querySelector(".view-all-button"); // Get view all button
  if (viewAllButton) {
    // Check if view all button exists
    viewAllButton.addEventListener("click", handleViewAll); // Add click handler
  }

  console.log("Event listeners set up successfully"); // Log successful setup

  // Set up sidebar navigation
  setupSidebarNavigation(); // Set up sidebar navigation

  // Set up dynamic button listeners
  setupDynamicButtonListeners(); // Set up listeners for dynamically added buttons
}

// Function to set up dynamic button listeners
function setupDynamicButtonListeners() {
  // Use event delegation to handle dynamically added buttons
  document.addEventListener("click", function (event) {
    const target = event.target; // Get the clicked element

    // Add-button and export-button handlers removed (buttons no longer exist)

    // Handle action buttons
    if (target.classList.contains("action-btn")) {
      handleActionButton(target); // Handle action button click
    }

    // Handle refresh buttons
    if (target.classList.contains("refresh-button")) {
      handleRefresh(); // Handle refresh button click
    }

    // Handle view all buttons
    if (target.classList.contains("view-all-button")) {
      handleViewAll(); // Handle view all button click
    }
  });
}

// Removed add/export button helpers – not used after UI simplification

// Function to handle action button clicks
function handleActionButton(button) {
  const buttonText = button.textContent.toLowerCase(); // Get button text
  const buttonClasses = button.className; // Get button classes

  if (buttonText.includes("view")) {
    showNotification("Viewing details...", "info"); // Show notification
    setTimeout(() => {
      showNotification("Details displayed in modal", "success"); // Show success
    }, 1000); // 1 second delay
  } else if (buttonText.includes("edit")) {
    showNotification("Edit form would open here", "info"); // Show notification
  } else if (buttonText.includes("approve")) {
    button.textContent = "Approving..."; // Show loading text
    button.disabled = true; // Disable button
    setTimeout(() => {
      button.textContent = "Approved"; // Show approved text
      button.style.background =
        "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)"; // Change to green
      showNotification("Request approved successfully!", "success"); // Show success
    }, 1500); // 1.5 second delay
  } else if (buttonText.includes("reject")) {
    button.textContent = "Rejecting..."; // Show loading text
    button.disabled = true; // Disable button
    setTimeout(() => {
      button.textContent = "Rejected"; // Show rejected text
      button.style.background =
        "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)"; // Change to red
      showNotification("Request rejected", "info"); // Show notification
    }, 1500); // 1.5 second delay
  } else if (buttonText.includes("process")) {
    button.textContent = "Processing..."; // Show loading text
    button.disabled = true; // Disable button
    setTimeout(() => {
      button.textContent = "Processed"; // Show processed text
      button.style.background =
        "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)"; // Change to orange
      showNotification("Request processed successfully!", "success"); // Show success
    }, 1500); // 1.5 second delay
  } else if (buttonText.includes("certificate")) {
    showNotification("Generating certificate...", "info"); // Show notification
    setTimeout(() => {
      showNotification("Certificate downloaded!", "success"); // Show success
    }, 2000); // 2 second delay
  } else if (buttonText.includes("update")) {
    showNotification("Update form would open here", "info"); // Show notification
  } else if (buttonText.includes("report")) {
    showNotification("Generating report...", "info"); // Show notification
    setTimeout(() => {
      showNotification("Report generated!", "success"); // Show success
    }, 2000); // 2 second delay
  } else if (buttonText.includes("download")) {
    showNotification("Downloading...", "info"); // Show notification
    setTimeout(() => {
      showNotification("File downloaded successfully!", "success"); // Show success
    }, 2000); // 2 second delay
  } else {
    showNotification("Action completed", "info"); // Show generic notification
  }
}

// Function to set up sidebar navigation
function setupSidebarNavigation() {
  console.log("Setting up sidebar navigation..."); // Log sidebar setup

  // Remove any existing listeners to prevent duplication
  const sidebar = document.querySelector(".sidebar-nav") || document;
  sidebar.addEventListener(
    "click",
    function (e) {
      const link = e.target.closest && e.target.closest(".nav-link");
      if (!link) return;
      e.preventDefault();
      document
        .querySelectorAll(".nav-item")
        .forEach((item) => item.classList.remove("active"));
      const item = link.closest(".nav-item");
      if (item) item.classList.add("active");
      const navTextEl = link.querySelector(".nav-text");
      const navText = (
        navTextEl ? navTextEl.textContent : link.textContent
      ).trim();
      handleNavigation(navText);
    },
    { passive: false }
  );

  console.log("Sidebar navigation set up successfully"); // Log successful setup

  // Safety net: event delegation so clicks always work even if DOM changes
  document.addEventListener("click", function (evt) {
    const link =
      evt.target && evt.target.closest && evt.target.closest(".nav-link");
    if (!link) return;
    evt.preventDefault();
    document
      .querySelectorAll(".nav-item")
      .forEach((item) => item.classList.remove("active"));
    const item = link.closest(".nav-item");
    if (item) item.classList.add("active");
    const textEl = link.querySelector(".nav-text");
    const navText = textEl ? textEl.textContent : link.textContent;
    handleNavigation(navText || "");
  });
}

// Function to handle navigation
function handleNavigation(navText) {
  console.log(`Handling navigation for: ${navText}`); // Log navigation handling

  // Hide all content sections first
  hideAllSections(); // Hide all sections

  // Show the appropriate section based on navigation
  const key = navText.toLowerCase().trim();
  switch (key) {
    case "supporters":
      showDonorsSection(); // Show donors section
      break;
    case "beneficiaries":
      showPatientsSection(); // Show patients section
      break;
    case "supports":
      showDonationsSection(); // Show donations section
      break;
    case "requests":
      showRequestsSection(); // Show requests section
      break;
    case "resources":
      showResourcesSection();
      break;
    case "support guide":
      showSupportGuideSection();
      break;
    case "admin dashboard":
      showDashboardSection(); // Show dashboard section
      break;
    default:
      showDashboardSection(); // Default to dashboard
  }
}

// Function to hide all content sections
function hideAllSections() {
  // Get all content sections
  const sections = document.querySelectorAll(".content-section"); // Get all content sections

  // Hide each section
  sections.forEach((section) => {
    // Loop through each section
    section.style.display = "none"; // Hide section
  });
}

// Events section has been removed per requirements.

// Function to show donors section
function showDonorsSection() {
  const dashboardContent = document.querySelector(".dashboard-content"); // Get dashboard content
  dashboardContent.innerHTML = `
        <div class="content-section" id="donorsSection">
            <div class="section-header">
                <h1 class="section-title">Supporters Management</h1>
                
            </div>
            
            <div class="stats-overview">
                <div class="stat-item">
                    <span class="stat-number">1,247</span>
                    <span class="stat-label">Total Supporters</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">89</span>
                    <span class="stat-label">New This Month</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">456</span>
                    <span class="stat-label">Active Supporters</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">23</span>
                    <span class="stat-label">Available Today</span>
                </div>
            </div>
            
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Supporter ID</th>
                            <th>Name</th>
                            <th>Role/Skill</th>
                            <th>Last Activity</th>
                            <th>Total Supports</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>S001</td>
                            <td>John Smith</td>
                            <td>Mobility Assistance</td>
                            <td>Nov 15, 2024</td>
                            <td>12</td>
                            <td><span class="status-badge eligible">Active</span></td>
                            <td>
                                <button class="action-btn small">View</button>
                                <button class="action-btn small">Edit</button>
                            </td>
                        </tr>
                        <tr>
                            <td>S002</td>
                            <td>Sarah Johnson</td>
                            <td>Sign Language</td>
                            <td>Dec 5, 2024</td>
                            <td>8</td>
                            <td><span class="status-badge ineligible">Inactive</span></td>
                            <td>
                                <button class="action-btn small">View</button>
                                <button class="action-btn small">Edit</button>
                            </td>
                        </tr>
                        <tr>
                            <td>S003</td>
                            <td>Mike Wilson</td>
                            <td>Transport</td>
                            <td>Oct 20, 2024</td>
                            <td>15</td>
                            <td><span class="status-badge eligible">Active</span></td>
                            <td>
                                <button class="action-btn small">View</button>
                                <button class="action-btn small">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Function to show patients section
function showPatientsSection() {
  const dashboardContent = document.querySelector(".dashboard-content"); // Get dashboard content
  dashboardContent.innerHTML = `
        <div class="content-section" id="patientsSection">
            <div class="section-header">
                <h1 class="section-title">Beneficiary Management</h1>
                
            </div>
            
            <div class="stats-overview">
                <div class="stat-item">
                    <span class="stat-number">234</span>
                    <span class="stat-label">Total Beneficiaries</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">45</span>
                    <span class="stat-label">Active Requests</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">12</span>
                    <span class="stat-label">Urgent Cases</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">89</span>
                    <span class="stat-label">Supports Received</span>
                </div>
            </div>
            
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Beneficiary ID</th>
                            <th>Name</th>
                            <th>Assistance Needed</th>
                            <th>People Needed</th>
                            <th>Urgency</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>B001</td>
                            <td>Emma Davis</td>
                            <td>Mobility</td>
                            <td>2</td>
                            <td><span class="urgency-badge high">High</span></td>
                            <td><span class="status-badge pending">Pending</span></td>
                            <td>
                                <button class="action-btn small">View</button>
                                <button class="action-btn small">Approve</button>
                            </td>
                        </tr>
                        <tr>
                            <td>B002</td>
                            <td>Robert Brown</td>
                            <td>Transport</td>
                            <td>1</td>
                            <td><span class="urgency-badge emergency">Emergency</span></td>
                            <td><span class="status-badge approved">Approved</span></td>
                            <td>
                                <button class="action-btn small">View</button>
                                <button class="action-btn small">Process</button>
                            </td>
                        </tr>
                        <tr>
                            <td>B003</td>
                            <td>Lisa Anderson</td>
                            <td>Sensory</td>
                            <td>3</td>
                            <td><span class="urgency-badge medium">Medium</span></td>
                            <td><span class="status-badge completed">Completed</span></td>
                            <td>
                                <button class="action-btn small">View</button>
                                <button class="action-btn small">Report</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Function to show donations section
function showDonationsSection() {
  const dashboardContent = document.querySelector(".dashboard-content"); // Get dashboard content
  dashboardContent.innerHTML = `
        <div class="content-section" id="donationsSection">
            <div class="section-header">
                <h1 class="section-title">Support Activities</h1>
                
            </div>
            
            <div class="stats-overview">
                <div class="stat-item">
                    <span class="stat-number">1,247</span>
                    <span class="stat-label">Total Supports</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">45</span>
                    <span class="stat-label">This Month</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">12</span>
                    <span class="stat-label">Today</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">98.5%</span>
                    <span class="stat-label">Success Rate</span>
                </div>
            </div>
            
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Support ID</th>
                            <th>Supporter Name</th>
                            <th>Assistance Type</th>
                            <th>Date</th>
                            <th>Hours/Items</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>SP001</td>
                            <td>John Smith</td>
                            <td>Mobility</td>
                            <td>September 2, 2025</td>
                            <td>3 hours</td>
                            <td><span class="status-badge completed">Completed</span></td>
                            <td>
                                <button class="action-btn small">View</button>
                                <button class="action-btn small">Certificate</button>
                            </td>
                        </tr>
                        <tr>
                            <td>SP002</td>
                            <td>Sarah Johnson</td>
                            <td>Sign Language</td>
                            <td>September 2, 2025</td>
                            <td>2 hours</td>
                            <td><span class="status-badge processing">Processing</span></td>
                            <td>
                                <button class="action-btn small">View</button>
                                <button class="action-btn small">Update</button>
                            </td>
                        </tr>
                        <tr>
                            <td>SP003</td>
                            <td>Mike Wilson</td>
                            <td>Transport</td>
                            <td>September 2, 2025</td>
                            <td>1 trip</td>
                            <td><span class="status-badge completed">Completed</span></td>
                            <td>
                                <button class="action-btn small">View</button>
                                <button class="action-btn small">Certificate</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Function to show requests section
function showRequestsSection() {
  const dashboardContent = document.querySelector(".dashboard-content"); // Get dashboard content
  dashboardContent.innerHTML = `
        <div class="content-section" id="requestsSection">
            <div class="section-header">
                <h1 class="section-title">Assistance Requests</h1>
                
            </div>
            
            <div class="stats-overview">
                <div class="stat-item">
                    <span class="stat-number">89</span>
                    <span class="stat-label">Total Requests</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">23</span>
                    <span class="stat-label">Pending</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">45</span>
                    <span class="stat-label">Approved</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">21</span>
                    <span class="stat-label">Completed</span>
                </div>
            </div>
            
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Beneficiary Name</th>
                            <th>Assistance Type</th>
                            <th>People</th>
                            <th>Urgency</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>R001</td>
                            <td>Emma Davis</td>
                            <td>Mobility</td>
                            <td>2</td>
                            <td><span class="urgency-badge high">High</span></td>
                            <td>September 2, 2025</td>
                            <td><span class="status-badge pending">Pending</span></td>
                            <td>
                                <button class="action-btn small">View</button>
                                <button class="action-btn small approve">Approve</button>
                                <button class="action-btn small reject">Reject</button>
                            </td>
                        </tr>
                        <tr>
                            <td>R002</td>
                            <td>Robert Brown</td>
                            <td>Transport</td>
                            <td>1</td>
                            <td><span class="urgency-badge emergency">Emergency</span></td>
                            <td>September 2, 2025</td>
                            <td><span class="status-badge approved">Approved</span></td>
                            <td>
                                <button class="action-btn small">View</button>
                                <button class="action-btn small process">Process</button>
                            </td>
                        </tr>
                        <tr>
                            <td>R003</td>
                            <td>Lisa Anderson</td>
                            <td>Sensory</td>
                            <td>3</td>
                            <td><span class="urgency-badge medium">Medium</span></td>
                            <td>September 2, 2025</td>
                            <td><span class="status-badge completed">Completed</span></td>
                            <td>
                                <button class="action-btn small">View</button>
                                <button class="action-btn small">Report</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Function to show inventory section
function showInventorySection() {
  const dashboardContent = document.querySelector(".dashboard-content"); // Get dashboard content
  dashboardContent.innerHTML = `
        <div class="content-section" id="inventorySection">
            <div class="section-header">
                <h1 class="section-title">Resource Inventory</h1>
                
            </div>
            
            <div class="inventory-overview">
                <div class="blood-type-grid">
                    <div class="blood-type-card">
                        <div class="blood-type-header">
                            <h3>Wheelchairs</h3>
                        </div>
                        <div class="blood-stats">
                            <div class="stat"><span class="number">45</span><span class="label">Available</span></div>
                            <div class="stat"><span class="number">12</span><span class="label">In Use</span></div>
                        </div>
                        <div class="status-indicator available"></div>
                    </div>
                    <div class="blood-type-card">
                        <div class="blood-type-header"><h3>Communication Devices</h3></div>
                        <div class="blood-stats">
                            <div class="stat"><span class="number">32</span><span class="label">Available</span></div>
                            <div class="stat"><span class="number">10</span><span class="label">In Use</span></div>
                        </div>
                        <div class="status-indicator available"></div>
                    </div>
                    <div class="blood-type-card">
                        <div class="blood-type-header"><h3>Sign Language Support</h3></div>
                        <div class="blood-stats">
                            <div class="stat"><span class="number">38</span><span class="label">Available</span></div>
                            <div class="stat"><span class="number">15</span><span class="label">In Use</span></div>
                        </div>
                        <div class="status-indicator available"></div>
                    </div>
                    <div class="blood-type-card">
                        <div class="blood-type-header"><h3>Sensory Kits</h3></div>
                        <div class="blood-stats">
                            <div class="stat"><span class="number">18</span><span class="label">Available</span></div>
                            <div class="stat"><span class="number">7</span><span class="label">In Use</span></div>
                        </div>
                        <div class="status-indicator low"></div>
                    </div>
                    <div class="blood-type-card">
                        <div class="blood-type-header"><h3>Care Volunteers</h3></div>
                        <div class="blood-stats">
                            <div class="stat"><span class="number">26</span><span class="label">Available</span></div>
                            <div class="stat"><span class="number">14</span><span class="label">On Duty</span></div>
                        </div>
                        <div class="status-indicator available"></div>
                    </div>
                    <div class="blood-type-card">
                        <div class="blood-type-header"><h3>Counselors</h3></div>
                        <div class="blood-stats">
                            <div class="stat"><span class="number">22</span><span class="label">Available</span></div>
                            <div class="stat"><span class="number">6</span><span class="label">In Session</span></div>
                        </div>
                        <div class="status-indicator available"></div>
                    </div>
                    <div class="blood-type-card">
                        <div class="blood-type-header"><h3>Ramps</h3></div>
                        <div class="blood-stats">
                            <div class="stat"><span class="number">12</span><span class="label">Available</span></div>
                            <div class="stat"><span class="number">3</span><span class="label">Installed Today</span></div>
                        </div>
                        <div class="status-indicator low"></div>
                    </div>
                    <div class="blood-type-card">
                        <div class="blood-type-header"><h3>Transport Vans</h3></div>
                        <div class="blood-stats">
                            <div class="stat"><span class="number">15</span><span class="label">Available</span></div>
                            <div class="stat"><span class="number">12</span><span class="label">In Use</span></div>
                        </div>
                        <div class="status-indicator low"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Aliases to match new sidebar labels
function showResourcesSection() {
  // Render the resources view using inventory implementation
  return showInventorySection();
}

function showSupportGuideSection() {
  // Render support guide using blood menu implementation (renamed content)
  return showBloodMenuSection();
}

// Function to show blood menu section
function showBloodMenuSection() {
  const dashboardContent = document.querySelector(".dashboard-content"); // Get dashboard content
  dashboardContent.innerHTML = `
        <div class="content-section" id="bloodMenuSection">
            <div class="section-header">
                <h1 class="section-title">Support Guide & Compatibility</h1>
                
            </div>
            
            <div class="blood-compatibility-grid">
                <div class="compatibility-card">
                    <div class="blood-type-header"><h3>Mobility Support</h3></div>
                    <div class="compatibility-info">
                        <h4>Works Well With:</h4>
                        <ul>
                            <li>Wheelchairs</li>
                            <li>Walking Aids</li>
                        </ul>
                        <h4>Often Paired With:</h4>
                        <ul>
                            <li>Transport Assistance</li>
                            <li>Care Volunteers</li>
                        </ul>
                    </div>
                    <div class="blood-stats">
                        <span class="stat">Demand: High</span>
                        <span class="stat">Coverage: City-wide</span>
                    </div>
                </div>
                <div class="compatibility-card">
                    <div class="blood-type-header"><h3>Communication Aid</h3></div>
                    <div class="compatibility-info">
                        <h4>Works Well With:</h4>
                        <ul>
                            <li>Sign Language</li>
                            <li>Assistive Devices</li>
                        </ul>
                        <h4>Often Paired With:</h4>
                        <ul>
                            <li>Therapy Sessions</li>
                            <li>Care Volunteers</li>
                        </ul>
                    </div>
                    <div class="blood-stats">
                        <span class="stat">Demand: Medium</span>
                        <span class="stat">Coverage: City-wide</span>
                    </div>
                </div>
                <div class="compatibility-card">
                    <div class="blood-type-header"><h3>Sensory Support</h3></div>
                    <div class="compatibility-info">
                        <h4>Works Well With:</h4>
                        <ul>
                            <li>Sensory Kits</li>
                            <li>Quiet Rooms</li>
                        </ul>
                        <h4>Often Paired With:</h4>
                        <ul>
                            <li>Trained Staff</li>
                            <li>Therapy Sessions</li>
                        </ul>
                    </div>
                    <div class="blood-stats">
                        <span class="stat">Demand: Medium</span>
                        <span class="stat">Coverage: Expanding</span>
                    </div>
                </div>
                <div class="compatibility-card">
                    <div class="blood-type-header"><h3>Transportation</h3></div>
                    <div class="compatibility-info">
                        <h4>Works Well With:</h4>
                        <ul>
                            <li>Transport Vans</li>
                            <li>Wheelchair Access</li>
                        </ul>
                        <h4>Often Paired With:</h4>
                        <ul>
                            <li>Care Volunteers</li>
                            <li>Hospital Coordination</li>
                        </ul>
                    </div>
                    <div class="blood-stats">
                        <span class="stat">Demand: High</span>
                        <span class="stat">Coverage: City-wide</span>
                    </div>
                </div>
                <div class="compatibility-card">
                    <div class="blood-type-header"><h3>Daily Living</h3></div>
                    <div class="compatibility-info">
                        <h4>Works Well With:</h4>
                        <ul>
                            <li>Care Volunteers</li>
                            <li>Assistive Devices</li>
                        </ul>
                        <h4>Often Paired With:</h4>
                        <ul>
                            <li>Counselors</li>
                            <li>Community Centers</li>
                        </ul>
                    </div>
                    <div class="blood-stats">
                        <span class="stat">Demand: Steady</span>
                        <span class="stat">Coverage: Community</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to show dashboard section (original content)
function showDashboardSection() {
  const dashboardContent = document.querySelector(".dashboard-content"); // Get dashboard content
  dashboardContent.innerHTML = `
        <div class="content-section" id="dashboardSection">
            <!-- Dashboard header -->
            <div class="dashboard-header">
                <h1 class="dashboard-title">Accessibility Support Dashboard</h1>
                <p class="dashboard-subtitle">Monitor supports provided, requests, and resource statistics</p>
            </div>
            
            <!-- Statistics cards -->
            <div class="stats-grid">
                <!-- Total Donations Card -->
                <div class="stat-card" data-stat="totalDonations">
                    <div class="stat-icon donation-icon">🤝</div>
                    <div class="stat-content">
                        <h3 class="stat-title">Total Supports</h3>
                        <p class="stat-number" id="totalDonations">1,247</p>
                        <p class="stat-change positive">+12% from last month</p>
                    </div>
                </div>
                
                <!-- Pending Requests Card -->
                <div class="stat-card" data-stat="pendingRequests">
                    <div class="stat-icon request-icon">📋</div>
                    <div class="stat-content">
                        <h3 class="stat-title">Open Requests</h3>
                        <p class="stat-number" id="pendingRequests">23</p>
                        <p class="stat-change negative">+5 from yesterday</p>
                    </div>
                </div>
                
                <!-- Available Blood Card -->
                <div class="stat-card" data-stat="availableBlood">
                    <div class="stat-icon available-icon">🦽</div>
                    <div class="stat-content">
                        <h3 class="stat-title">Available Resources</h3>
                        <p class="stat-number" id="availableBlood">456</p>
                        <p class="stat-change positive">+8% from last week</p>
                    </div>
                </div>
                
                <!-- Emergency Requests Card -->
                <div class="stat-card" data-stat="emergencyRequests">
                    <div class="stat-icon emergency-icon">🚨</div>
                    <div class="stat-content">
                        <h3 class="stat-title">Urgent Requests</h3>
                        <p class="stat-number" id="emergencyRequests">7</p>
                        <p class="stat-change negative">+2 from today</p>
                    </div>
                </div>
            </div>
            
            <!-- Charts section (single chart only) -->
            <div class="charts-section">
                <div class="chart-container">
                    <div class="chart-header">
                        <h2 class="chart-title">Assistance Categories</h2>
                        <p class="chart-subtitle">Distribution by support type</p>
                    </div>
                    <div class="chart-wrapper">
                        <canvas id="bloodTypeChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;

  // Reinitialize the dashboard functionality
  populateStatistics(); // Populate statistics
  initializeCharts(); // Initialize charts
}

// Function to handle logout
function handleLogout() {
  console.log("Logout requested"); // Log logout request

  // Show confirmation dialog
  if (confirm("Are you sure you want to logout?")) {
    // Show confirmation dialog
    // Clear any stored admin session data
    localStorage.removeItem("adminLoggedIn"); // Remove admin login status
    localStorage.removeItem("adminId"); // Remove stored admin ID

    // Redirect to admin login page
    window.location.href = "admin-login.html"; // Redirect to login page
  }
}

// Function to handle refresh button click
function handleRefresh() {
  console.log("Refresh requested"); // Log refresh request

  // Show loading state
  const refreshButton = document.getElementById("refreshButton"); // Get refresh button by ID
  if (refreshButton) {
    // Check if button exists
    const originalText = refreshButton.textContent; // Store original text
    refreshButton.textContent = "Refreshing..."; // Show loading text
    refreshButton.disabled = true; // Disable button

    // Simulate refresh delay
    setTimeout(() => {
      // Wait for 2 seconds
      // Refresh the data
      populateStatistics(); // Refresh statistics
      populateInventoryTable(); // Refresh inventory table
      populateActivityFeed(); // Refresh activity feed

      // Restore button state
      refreshButton.textContent = originalText; // Restore original text
      refreshButton.disabled = false; // Re-enable button

      console.log("Data refreshed successfully"); // Log successful refresh
    }, 2000); // 2 second delay
  }
}

// Function to handle view all button click
function handleViewAll() {
  console.log("View all activities requested"); // Log view all request

  // Show alert for now (in a real app, this would navigate to a detailed view)
  alert("This would navigate to a detailed activity view page."); // Show alert
}

// Function to handle approve request button click
function approveRequest(bloodType) {
  console.log(`Approving request for ${bloodType}`); // Log approval request

  // Show confirmation dialog
  if (
    confirm(`Are you sure you want to approve the request for ${bloodType}?`)
  ) {
    // Show confirmation
    // Simulate approval process
    const approveButton = event.target; // Get the clicked button
    const originalText = approveButton.textContent; // Store original text
    approveButton.textContent = "Approving..."; // Show loading text
    approveButton.disabled = true; // Disable button

    // Simulate approval delay
    setTimeout(() => {
      // Wait for 1.5 seconds
      // Update button state
      approveButton.textContent = "Approved"; // Show approved text
      approveButton.style.backgroundColor = "#27ae60"; // Change to green
      approveButton.style.cursor = "default"; // Change cursor

      console.log(`Request for ${bloodType} approved successfully`); // Log successful approval

      // Show success message
      showNotification(
        `Request for ${bloodType} approved successfully!`,
        "success"
      ); // Show success notification
    }, 1500); // 1.5 second delay
  }
}

// Function to show notifications
function showNotification(message, type = "info") {
  console.log(`Showing ${type} notification: ${message}`); // Log notification

  // Create notification element
  const notification = document.createElement("div"); // Create notification element
  notification.className = `notification notification-${type}`; // Set notification class
  notification.textContent = message; // Set notification text

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${
          type === "success"
            ? "background-color: #27ae60;"
            : "background-color: #3498db;"
        }
    `;

  // Add notification to page
  document.body.appendChild(notification); // Add notification to body

  // Animate notification in
  setTimeout(() => {
    // Wait for next frame
    notification.style.transform = "translateX(0)"; // Slide in from right
  }, 100);

  // Remove notification after 3 seconds
  setTimeout(() => {
    // Wait for 3 seconds
    notification.style.transform = "translateX(100%)"; // Slide out to right
    setTimeout(() => {
      // Wait for animation
      document.body.removeChild(notification); // Remove notification
    }, 300); // Animation duration
  }, 3000); // Display duration
}

// Error handling for the entire dashboard
window.addEventListener("error", function (event) {
  // Keep errors in console for debugging, avoid spamming the UI
  console.error("Dashboard error:", event && (event.error || event.message));
});

// Handle page visibility changes
document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    // Check if page becomes visible
    console.log("Dashboard page became visible"); // Log visibility change
    // Optionally refresh data when page becomes visible
    // handleRefresh();
  }
});

// Handle keyboard shortcuts
document.addEventListener("keydown", function (event) {
  // Ctrl/Cmd + R to refresh
  if ((event.ctrlKey || event.metaKey) && event.key === "r") {
    // Check for refresh shortcut
    event.preventDefault(); // Prevent default refresh
    handleRefresh(); // Call refresh function
  }

  // Escape key to close any open modals (if any)
  if (event.key === "Escape") {
    // Check for escape key
    console.log("Escape key pressed"); // Log escape key press
    // Add any modal closing logic here
  }
});

console.log("Admin Dashboard JavaScript loaded and ready"); // Log successful loading
