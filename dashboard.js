// DOM Elements
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const paymentMethods = document.querySelectorAll('.payment-method');
const paymentContents = document.querySelectorAll('.payment-content');
const paymentForm = document.getElementById('payment-form');
const usernameElements = document.querySelectorAll('#username, #dashboard-username');

// User data (in a real app, this would come from a database)
let userData = {
    name: "John Doe",
    profileImage: "/api/placeholder/100/100",
    balance: 3245.75,
    transactions: [
        { date: "15 May 2025", description: "Coffee Shop", amount: -4.50, status: "completed" },
        { date: "14 May 2025", description: "Salary", amount: 2500.00, status: "completed" },
        { date: "12 May 2025", description: "Grocery Store", amount: -76.25, status: "completed" },
        { date: "10 May 2025", description: "Gas Station", amount: -45.00, status: "completed" },
        { date: "08 May 2025", description: "Phone Bill", amount: -65.99, status: "completed" },
        { date: "05 May 2025", description: "Online Transfer to Jane", amount: -120.00, status: "completed" },
        { date: "03 May 2025", description: "Restaurant", amount: -58.75, status: "completed" },
        { date: "01 May 2025", description: "Freelance Payment", amount: 450.00, status: "completed" },
    ]
};

// Initialize the application
function initApp() {
    // Set username
    usernameElements.forEach(el => {
        el.textContent = userData.name;
    });

    // Initialize tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Initialize payment methods
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            // Remove active class from all methods and contents
            paymentMethods.forEach(m => m.classList.remove('active'));
            paymentContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked method and corresponding content
            method.classList.add('active');
            const methodId = method.getAttribute('data-method');
            document.getElementById(`${methodId}-payment`).classList.add('active');
        });
    });

    // Payment form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Payment submitted successfully!');
            paymentForm.reset();
        });
    }

    // Initialize transaction graph
    initTransactionGraph();
}

// Initialize transaction graph using Chart.js
function initTransactionGraph() {
    const ctx = document.getElementById('transaction-graph').getContext('2d');
    
    // Extract data from transactions
    const labels = userData.transactions.map(t => t.date).reverse();
    const data = userData.transactions.map(t => t.amount).reverse();
    
    // Calculate cumulative balance
    let balance = userData.balance;
    const balanceData = [];
    for (let i = data.length - 1; i >= 0; i--) {
        balance -= data[i];
        balanceData.unshift(balance);
    }
    
    // Create the chart
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Balance',
                data: balanceData,
                backgroundColor: 'rgba(74, 108, 247, 0.1)',
                borderColor: 'rgba(74, 108, 247, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Add functionality for profile image upload
function setupProfileImageUpload() {
    const profileImg = document.getElementById('profile-img');
    
    if (profileImg) {
        profileImg.addEventListener('click', () => {
            // Create a hidden file input
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            
            // Handle file selection
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    // In a real app, you would upload this file to a server
                    // For now, just create a local URL and display it
                    const imageUrl = URL.createObjectURL(file);
                    profileImg.src = imageUrl;
                    
                    // In a real app, update the user data on the server
                    userData.profileImage = imageUrl;
                }
            });
            
            // Trigger file selection dialog
            fileInput.click();
        });
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupProfileImageUpload();
});