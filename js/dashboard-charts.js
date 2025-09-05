// Dashboard Charts Module
// Handles all chart-related functionality for the admin dashboard

/**
 * Initialize all dashboard charts
 * Called when the dashboard section is shown
 */
function initializeCharts() {
    initializeBloodTypeChart();
}

/**
 * Create blood type distribution pie chart
 * Shows current available blood by type
 */
function initializeBloodTypeChart() {
    const ctx = document.getElementById('bloodTypeChart');
    if (!ctx) {
        console.warn('Blood type chart canvas not found');
        return;
    }

    // Destroy existing chart if it exists
    if (window.bloodTypeChart) {
        window.bloodTypeChart.destroy();
    }

    // Sample data for blood type distribution
    const bloodTypeData = {
        labels: ['Mobility', 'Visual', 'Hearing', 'Sensory', 'Transport', 'Cognitive'],
        datasets: [{
            data: [120, 80, 60, 45, 90, 30],
            backgroundColor: [
                '#ff6b6b', '#4ecdc4', '#45b7aa', '#96ceb4',
                '#feca57', '#9b59b6'
            ],
            borderWidth: 2,
            borderColor: '#ffffff'
        }]
    };

    window.bloodTypeChart = new Chart(ctx, {
        type: 'doughnut',
        data: bloodTypeData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12,
                            family: 'Inter, sans-serif'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#ff6b6b',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '60%',
            animation: {
                animateRotate: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

/**
 * Create monthly donations trend line chart
 * Shows donation statistics over the last 6 months
 */
// Monthly chart intentionally removed per request
