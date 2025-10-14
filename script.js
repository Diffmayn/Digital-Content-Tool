// Mock Data
const mockOrders = [
    {
        id: 1001,
        title: "Summer Fashion Campaign",
        client: "Fashion Brand Co.",
        type: "External Photographer",
        assignedTo: "Sarah Johnson",
        status: "pending",
        priority: "high",
        images: 45,
        deadline: "2024-10-15",
        createdDate: "2024-10-01"
    },
    {
        id: 1002,
        title: "Product Catalog Shoot",
        client: "Tech Innovations Ltd.",
        type: "Internal Studio",
        assignedTo: "Studio A",
        status: "progress",
        priority: "medium",
        images: 120,
        deadline: "2024-10-20",
        createdDate: "2024-09-28"
    },
    {
        id: 1003,
        title: "Corporate Headshots",
        client: "Business Solutions Inc.",
        type: "External Photographer",
        assignedTo: "Mike Chen",
        status: "completed",
        priority: "low",
        images: 30,
        deadline: "2024-10-05",
        createdDate: "2024-09-20"
    },
    {
        id: 1004,
        title: "Holiday Marketing Materials",
        client: "Retail Giant Corp.",
        type: "Internal Studio",
        assignedTo: "Studio B",
        status: "progress",
        priority: "high",
        images: 85,
        deadline: "2024-10-25",
        createdDate: "2024-10-02"
    },
    {
        id: 1005,
        title: "Real Estate Property Photos",
        client: "Luxury Homes Agency",
        type: "External Photographer",
        assignedTo: "Emma Davis",
        status: "pending",
        priority: "medium",
        images: 60,
        deadline: "2024-10-18",
        createdDate: "2024-10-03"
    },
    {
        id: 1006,
        title: "Food Menu Photography",
        client: "Restaurant Chain",
        type: "Internal Studio",
        assignedTo: "Studio A",
        status: "completed",
        priority: "medium",
        images: 40,
        deadline: "2024-10-08",
        createdDate: "2024-09-25"
    },
    {
        id: 1007,
        title: "E-commerce Product Images",
        client: "Online Marketplace",
        type: "External Photographer",
        assignedTo: "Alex Rodriguez",
        status: "progress",
        priority: "high",
        images: 200,
        deadline: "2024-10-30",
        createdDate: "2024-10-04"
    },
    {
        id: 1008,
        title: "Automotive Showcase",
        client: "Premium Auto Dealer",
        type: "Internal Studio",
        assignedTo: "Studio C",
        status: "pending",
        priority: "high",
        images: 75,
        deadline: "2024-10-22",
        createdDate: "2024-10-05"
    }
];

// Theme Switcher Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const themeContents = document.querySelectorAll('.theme-content');
    const app = document.getElementById('app');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Update active button
            themeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected theme content
            themeContents.forEach(content => {
                if (content.getAttribute('data-theme') === theme) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });

            if (app) {
                app.className = `app-container theme-${theme}`;
            }
        });
    });
    
    // Initialize all themes with data
    renderMinimalisticTheme();
    renderModernTheme();
    renderEfficientTheme();
    renderComplexTheme();
    renderCreativeTheme();
    renderDataTheme();
    renderDarkTheme();
    renderKanbanTheme();
});

// Render Minimalistic Theme
function renderMinimalisticTheme() {
    const container = document.getElementById('orders-minimalistic');
    if (!container) return;
    
    container.innerHTML = mockOrders.map(order => `
        <div class="order-item">
            <div class="order-info">
                <h3>Order #${order.id} - ${order.title}</h3>
                <div class="order-meta">${order.client} • ${order.assignedTo} • ${order.images} images</div>
            </div>
            <div class="order-status status-${order.status}">
                ${getStatusLabel(order.status)}
            </div>
        </div>
    `).join('');
}

// Render Modern Theme
function renderModernTheme() {
    const container = document.getElementById('orders-modern');
    if (!container) return;
    
    container.innerHTML = mockOrders.map(order => `
        <div class="order-card">
            <div class="order-card-info">
                <h4>${order.title}</h4>
                <div class="order-card-meta">
                    Order #${order.id} • ${order.client} • ${order.assignedTo} • ${order.images} images • Due: ${formatDate(order.deadline)}
                </div>
            </div>
            <div class="order-card-status status-${order.status}">
                ${getStatusLabel(order.status)}
            </div>
        </div>
    `).join('');
}

// Render Efficient Theme
function renderEfficientTheme() {
    const container = document.getElementById('orders-efficient');
    if (!container) return;
    
    const tableHTML = `
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Title</th>
                <th>Client</th>
                <th>Type</th>
                <th>Assigned To</th>
                <th>Images</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${mockOrders.map(order => `
                <tr>
                    <td><strong>#${order.id}</strong></td>
                    <td>${order.title}</td>
                    <td>${order.client}</td>
                    <td>${order.type}</td>
                    <td>${order.assignedTo}</td>
                    <td>${order.images}</td>
                    <td>${formatDate(order.deadline)}</td>
                    <td><span class="table-status ${order.status}">${getStatusLabel(order.status)}</span></td>
                    <td class="table-actions">
                        <span class="action-icon" title="View">👁️</span>
                        <span class="action-icon" title="Edit">✏️</span>
                        <span class="action-icon" title="Delete">🗑️</span>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    container.innerHTML = tableHTML;
}

// Render Complex Theme
function renderComplexTheme() {
    const container = document.getElementById('orders-complex');
    if (!container) return;
    
    container.innerHTML = mockOrders.map(order => {
        const priorityIcon = order.priority === 'high' ? '🔴' : order.priority === 'medium' ? '🟡' : '🟢';
        
        return `
            <div class="order-item-complex">
                <div class="order-item-info">
                    <h4>${priorityIcon} Order #${order.id} - ${order.title}</h4>
                    <div class="order-item-details">
                        <strong>Client:</strong> ${order.client} | <strong>Type:</strong> ${order.type}
                    </div>
                    <div class="order-item-details">
                        <strong>Assigned To:</strong> ${order.assignedTo} | <strong>Images:</strong> ${order.images} | <strong>Deadline:</strong> ${formatDate(order.deadline)}
                    </div>
                    <div class="order-item-details">
                        <strong>Created:</strong> ${formatDate(order.createdDate)} | <strong>Priority:</strong> ${order.priority.toUpperCase()}
                    </div>
                </div>
                <div>
                    <div class="order-item-status status-${order.status}">
                        ${getStatusLabel(order.status)}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Render Creative Theme
function renderCreativeTheme() {
    const container = document.getElementById('orders-creative');
    if (!container) return;
    
    container.innerHTML = mockOrders.map(order => {
        const icon = order.type.includes('External') ? '📸' : '🏢';
        
        return `
            <div class="order-creative-card">
                <div class="order-creative-info">
                    <h4>${icon} ${order.title}</h4>
                    <div class="order-creative-meta">
                        #${order.id} • ${order.client} • ${order.assignedTo} • ${order.images} images • ${formatDate(order.deadline)}
                    </div>
                </div>
                <div class="order-creative-status status-${order.status}">
                    ${getStatusLabel(order.status)}
                </div>
            </div>
        `;
    }).join('');
}

// Render Data-Driven Theme
function renderDataTheme() {
    const container = document.getElementById('orders-data');
    if (!container) return;

    container.innerHTML = mockOrders.map(order => `
        <div class="data-tile">
            <h4>${order.title}</h4>
            <p>#${order.id} • ${order.client}</p>
            <p>${order.assignedTo} • ${order.images} images</p>
            <span class="status">${getStatusLabel(order.status)}</span>
        </div>
    `).join('');
}

// Render Dark Mode Theme
function renderDarkTheme() {
    const statsContainer = document.getElementById('dark-stats');
    const ordersContainer = document.getElementById('orders-dark');
    const feedContainer = document.getElementById('dark-feed');
    const capacityContainer = document.getElementById('dark-capacity');

    if (statsContainer) {
        const stats = [
            { label: 'Total Orders', value: 24 },
            { label: 'Live Shoots', value: 5 },
            { label: 'Turnaround', value: '3.2d' },
            { label: 'SLA Success', value: '94%' }
        ];
        statsContainer.innerHTML = stats.map(stat => `
            <div class="dark-stat-card">
                <h4>${stat.label}</h4>
                <div class="value">${stat.value}</div>
            </div>
        `).join('');
    }

    if (ordersContainer) {
        const topOrders = mockOrders.slice(0, 5);
        ordersContainer.innerHTML = topOrders.map(order => `
            <div class="dark-order-card">
                <h4>${order.title}</h4>
                <div class="meta">#${order.id} • ${order.client} • ${order.assignedTo}</div>
                <div class="badge">${getStatusLabel(order.status)}</div>
            </div>
        `).join('');
    }

    if (feedContainer) {
        const feedItems = [
            { text: 'Upload complete for Order #1002 by Studio A', time: '2m ago' },
            { text: 'SLA breach risk detected on Order #1005', time: '18m ago' },
            { text: 'New asset batch synced from photographer network', time: '45m ago' },
            { text: 'Automation rule applied: auto-assign high priority', time: '1h ago' }
        ];
        feedContainer.innerHTML = feedItems.map(item => `
            <div class="dark-feed-card">
                ${item.text}
                <span>${item.time}</span>
            </div>
        `).join('');
    }

    if (capacityContainer) {
        const capacity = [
            { label: 'Photographers', className: 'photographers', load: '70%' },
            { label: 'Studios', className: 'studios', load: '55%' },
            { label: 'Editors', className: 'editors', load: '82%' }
        ];
        capacityContainer.innerHTML = capacity.map(item => `
            <div class="dark-capacity-item">
                <span>${item.label}</span>
                <div class="dark-capacity-bar">
                    <span class="${item.className}"></span>
                </div>
                <span>${item.load}</span>
            </div>
        `).join('');
    }
}

// Render Kanban Theme
function renderKanbanTheme() {
    const board = document.getElementById('kanban-board');
    if (!board) return;

    const columns = board.querySelectorAll('.kanban-column');
    columns.forEach(column => {
        const status = column.getAttribute('data-status');
        const body = column.querySelector('.kanban-column-body');
        const count = column.querySelector('.count');
        const filtered = mockOrders.filter(order => order.status === status);

        if (body) {
            body.innerHTML = filtered.map(order => `
                <div class="kanban-card">
                    <h4>${order.title}</h4>
                    <div class="meta">#${order.id} • ${order.client}</div>
                    <div class="tags">
                        <span class="kanban-tag">${order.assignedTo}</span>
                        <span class="kanban-tag">${order.images} imgs</span>
                        <span class="kanban-tag">Due ${formatDate(order.deadline)}</span>
                    </div>
                </div>
            `).join('');
        }

        if (count) {
            count.textContent = filtered.length;
        }
    });
}
// Helper Functions
function getStatusLabel(status) {
    const labels = {
        'pending': 'Pending',
        'progress': 'In Progress',
        'completed': 'Completed'
    };
    return labels[status] || status;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Add some interactivity
document.addEventListener('click', function(e) {
    // Button clicks
    if (e.target.matches('.btn-primary, .btn-modern, .btn-complex.primary, .btn-creative.primary, .tool-btn.primary, .data-btn, .kanban-btn')) {
        alert('New Order button clicked! In a real application, this would open a form to create a new order.');
    }
    
    // Order item clicks
    if (e.target.closest('.order-item, .order-card, .order-item-complex, .order-creative-card, .dark-order-card, .kanban-card, .data-tile')) {
        const orderElement = e.target.closest('.order-item, .order-card, .order-item-complex, .order-creative-card, .dark-order-card, .kanban-card, .data-tile');
        console.log('Order clicked:', orderElement);
        // You could add a modal or navigation here
    }
    
    // Action icon clicks
    if (e.target.matches('.action-icon')) {
        const action = e.target.getAttribute('title');
        alert(`${action} action clicked! This would perform the ${action.toLowerCase()} operation.`);
    }
    
    // Nav item clicks
    if (e.target.closest('.nav-item, .nav-link, .nav-item-complex, .nav-item-creative, .nav-icon')) {
        e.preventDefault();
        console.log('Navigation clicked');
        // You could add navigation logic here
    }
    
    // Filter pills
    if (e.target.matches('.pill')) {
        const pills = e.target.parentElement.querySelectorAll('.pill');
        pills.forEach(pill => pill.classList.remove('active'));
        e.target.classList.add('active');
        console.log('Filter changed:', e.target.textContent);
    }
    
    // Tabs
    if (e.target.matches('.tab')) {
        const tabs = e.target.parentElement.querySelectorAll('.tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
        console.log('Tab changed:', e.target.textContent);
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 1-5 to switch themes quickly
    const themeMap = {
        '1': 'minimalistic',
        '2': 'modern',
        '3': 'efficient',
        '4': 'complex',
        '5': 'creative',
        '6': 'data',
        '7': 'dark',
        '8': 'kanban'
    };
    
    if (themeMap[e.key]) {
        const button = document.querySelector(`[data-theme="${themeMap[e.key]}"]`);
        if (button) button.click();
    }
});

// Add some console info
console.log('%c🎨 Content Order Management - UI Showcase', 'font-size: 20px; font-weight: bold; color: #4A90E2;');
console.log('%cPress 1-5 on your keyboard to quickly switch between themes!', 'font-size: 14px; color: #666;');
console.log('%c5 Different UI Approaches:', 'font-size: 16px; font-weight: bold; color: #333; margin-top: 10px;');
console.log('1️⃣ Minimalistic - Clean and simple');
console.log('2️⃣ Modern - Gradient cards and smooth animations');
console.log('3️⃣ Efficient - Compact table view for data-heavy tasks');
console.log('4️⃣ Complex & Detailed - Full-featured enterprise interface');
console.log('5️⃣ Creative & Bold - Colorful and engaging design');
console.log('6️⃣ Data-Driven - Analytics-forward operations console');
console.log('7️⃣ Dark Mode Pro - Night-friendly control surface');
console.log('8️⃣ Workflow Kanban - Drag-and-drop pipeline management');
console.log('\n📊 Mock Data Loaded:', mockOrders.length, 'orders');
