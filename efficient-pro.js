// ===== COMPREHENSIVE MOCK DATA =====
const photographersMethods = [
    'Sarah Johnson', 'Mike Chen', 'Emma Davis', 'Alex Rodriguez', 
    'Photo Box', 'Generative AI', 'Post-Processing', 'John Smith', 
    'Maria Garcia', 'Studio A', 'Studio B', 'Studio C'
];

const pages = [
    'Homepage', 'Product Catalog', 'Campaign Landing', 'Blog', 
    'About Us', 'Social Media', 'Newsletter', 'Print Brochure',
    'E-commerce Listing', 'Mobile App'
];

const groups = ['Marketing', 'Product', 'Event', 'Editorial', 'Social'];
const types = ['Portrait', 'Product', 'Landscape', 'Macro', 'Studio', 'Lifestyle', 'Action'];
const contentTypes = ['Marketing', 'Editorial', 'E-commerce', 'Social Media', 'Print'];
const samShotTypes = ['Studio', 'On-location', 'Macro', 'Lifestyle', 'Environmental', '360°'];
const activities = ['A5252052', 'A5252053', 'A5252054', 'A5252055', 'A5252056', 'A5252057', 'A5252058', 'A5252059'];
const costCenters = ['CC-001 Marketing', 'CC-002 Product', 'CC-003 Digital', 'CC-004 Events', 'CC-005 Editorial'];
const purchasingGroups = ['112', '234', '345', '456', '567', '678', '789', '890', '901', '123'];
const principles = ['Product Focus', 'Lifestyle Context', 'Brand Story', 'Technical Detail', 'Emotional Appeal'];
const statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
const sampleStatuses = ['Article Sent', 'Article Scanned', 'Article Sent Back', 'In Quality Check', 'Awaiting Pickup', 'In Transit', 'Delivered', 'Processing'];

// Generate comprehensive mock data
function generateMockOrders(count = 50) {
    const orders = [];
    const today = new Date();
    
    for (let i = 1; i <= count; i++) {
        const orderNum = 2000 + i;
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const hasAlert = Math.random() > 0.7;
        const alertLevel = hasAlert ? (Math.random() > 0.5 ? 'high' : 'low') : 'none';
        const isCombined = Math.random() > 0.8;
        const sampleReceived = Math.random() > 0.4;
        
        // Generate random dates
        const createdDaysAgo = Math.floor(Math.random() * 60);
        const createdDate = new Date(today);
        createdDate.setDate(createdDate.getDate() - createdDaysAgo);
        
        const deadlineDaysAhead = Math.floor(Math.random() * 30) - 10;
        const deadline = new Date(today);
        deadline.setDate(deadline.getDate() + deadlineDaysAhead);
        
        const uploadDaysAgo = Math.floor(Math.random() * createdDaysAgo);
        const uploadTime = new Date(today);
        uploadTime.setDate(uploadTime.getDate() - uploadDaysAgo);
        
        const photographer = photographersMethods[Math.floor(Math.random() * photographersMethods.length)];
        const group = groups[Math.floor(Math.random() * groups.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        
        const order = {
            orderNumber: `ORD-${orderNum}`,
            alert: alertLevel,
            status: status,
            page: Math.floor(Math.random() * 999) + 1, // Integer value 1-999
            offerID: String(1500000 + Math.floor(Math.random() * 500000)), // 7-digit number starting from 1500000
            offerName: generateOfferName(),
            group: group,
            type: type,
            photoReference: `PREF-${orderNum}-${Math.floor(Math.random() * 999)}`,
            fileReference: `files/photo_${orderNum}_${Math.floor(Math.random() * 9999)}.jpg`,
            photographer: photographer,
            principle: principles[Math.floor(Math.random() * principles.length)],
            preview: `https://picsum.photos/seed/${orderNum}/200/200`,
            costCenter: costCenters[Math.floor(Math.random() * costCenters.length)],
            articleNo: String(10000000 + Math.floor(Math.random() * 90000000)), // 8-digit integer
            articleName: generateArticleName(type),
            purchasingGroup: purchasingGroups[Math.floor(Math.random() * purchasingGroups.length)],
            contentType: contentTypes[Math.floor(Math.random() * contentTypes.length)],
            samShotType: samShotTypes[Math.floor(Math.random() * samShotTypes.length)],
            activity: activities[Math.floor(Math.random() * activities.length)],
            combinedPhoto: isCombined,
            briefing: generateBriefing(type, group),
            sampleDelivery: formatDate(new Date(deadline.getTime() - 7 * 24 * 60 * 60 * 1000)),
            deadline: formatDate(deadline),
            sampleReceived: sampleStatuses[Math.floor(Math.random() * sampleStatuses.length)],
            fileName: `ENV_${String(90000 + Math.floor(Math.random() * 10000)).padStart(8, '0')}`, // Format: ENV_00090449
            uploadTime: formatDateTime(uploadTime),
            pmLink: `PM-${Math.floor(Math.random() * 50) + 1}`,
            pmName: `Project Manager ${Math.floor(Math.random() * 10) + 1}`,
            comments: Math.floor(Math.random() * 10),
            createdDate: formatDate(createdDate),
            cost: `$${(Math.random() * 2000 + 500).toFixed(2)}`
        };
        
        orders.push(order);
    }
    
    return orders;
}

function generateOfferName() {
    const prefixes = ['Summer', 'Winter', 'Spring', 'Fall', 'Holiday', 'Black Friday', 'New Year', 'Back to School'];
    const types = ['Sale', 'Collection', 'Campaign', 'Launch', 'Promotion', 'Special', 'Edition', 'Showcase'];
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${types[Math.floor(Math.random() * types.length)]} 2024`;
}

function generateArticleName(type) {
    const products = [
        // Electronics
        'Sony TV 55" 4K', 'Samsung Galaxy S24', 'Apple iPhone 15 Pro', 'Dell XPS Laptop',
        'Canon EOS Camera', 'Bose Headphones', 'LG OLED TV', 'Microsoft Surface Pro',
        // Fashion & Shoes
        'Nike Air Max Sneakers', 'Adidas Running Shoes', 'Puma Tracksuit', 'Under Armour Jacket',
        'New Balance 990', 'Reebok Classic', 'Converse Chuck Taylor', 'Vans Sk8-Hi',
        // Food & Groceries
        'Green Grapes', 'Red Apples', 'Fresh Salmon', 'Organic Chicken Breast',
        'Whole Grain Bread', 'Extra Virgin Olive Oil', 'Aged Cheddar Cheese', 'Fresh Strawberries',
        // Home & Kitchen
        'KitchenAid Mixer', 'Dyson Vacuum Cleaner', 'Nespresso Coffee Machine', 'Le Creuset Dutch Oven',
        // Beauty & Personal Care
        'L\'Oreal Shampoo', 'Nivea Face Cream', 'Gillette Razor', 'Colgate Toothpaste',
        // Sports & Outdoors
        'Wilson Tennis Racket', 'Spalding Basketball', 'Coleman Camping Tent', 'The North Face Backpack',
        // Furniture
        'IKEA Kallax Shelf', 'Herman Miller Office Chair', 'Ashley Sofa Set', 'Pottery Barn Table',
        // Toys & Games
        'LEGO Star Wars Set', 'PlayStation 5 Console', 'Nintendo Switch OLED', 'Barbie Dreamhouse'
    ];
    
    return products[Math.floor(Math.random() * products.length)];
}

function generateBriefing(type, group) {
    const briefings = [
        `${type} photography required for ${group} campaign. Focus on clean composition and brand consistency.`,
        `Capture ${type.toLowerCase()} images with emphasis on quality and detail. Target audience: ${group.toLowerCase()} segment.`,
        `${group} department needs ${type.toLowerCase()} photos. Ensure alignment with brand guidelines and seasonal themes.`,
        `High-resolution ${type.toLowerCase()} shots needed. Style: modern, clean, professional. Purpose: ${group.toLowerCase()} materials.`
    ];
    return briefings[Math.floor(Math.random() * briefings.length)];
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function formatDateTime(date) {
    return date.toISOString().replace('T', ' ').substring(0, 19);
}

// ===== APPLICATION STATE =====
let allOrders = [];
let filteredOrders = [];
let currentPage = 1;
let pageSize = 25;
let sortColumn = 'orderNumber';
let sortDirection = 'asc';
let filters = {};

// Sample Management State
let scanHistory = [];
let scannedToday = 0;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Generate mock data
    allOrders = generateMockOrders(50);
    filteredOrders = [...allOrders];
    
    // Initialize UI
    initializeEventListeners();
    updateMetrics();
    renderTable();
    
    console.log('✅ Efficient Pro loaded with', allOrders.length, 'orders');
});

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
    // Search
    document.getElementById('globalSearch').addEventListener('input', handleSearch);
    
    // Filters
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
    document.getElementById('toggleFilters').addEventListener('click', toggleFilters);
    
    // Toolbar buttons
    document.getElementById('newOrderBtn').addEventListener('click', () => alert('Create New Order functionality'));
    document.getElementById('exportBtn').addEventListener('click', exportData);
    document.getElementById('refreshBtn').addEventListener('click', refreshData);
    document.getElementById('scanManagementBtn').addEventListener('click', openScanManagement);
    
    // Pagination
    document.getElementById('firstPage').addEventListener('click', () => goToPage(1));
    document.getElementById('prevPage').addEventListener('click', () => goToPage(currentPage - 1));
    document.getElementById('nextPage').addEventListener('click', () => goToPage(currentPage + 1));
    document.getElementById('lastPage').addEventListener('click', () => goToPage(getTotalPages()));
    document.getElementById('pageSize').addEventListener('change', handlePageSizeChange);
    
    // Select all
    document.getElementById('selectAll').addEventListener('change', handleSelectAll);
    
    // Table sorting
    document.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', () => handleSort(th.dataset.column));
    });
    
    // Modal
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalSave').addEventListener('click', () => {
        alert('Save functionality would be implemented here');
        closeModal();
    });
    
    // Scan Modal
    document.getElementById('closeScanModal').addEventListener('click', closeScanModal);
    document.getElementById('closeScanModalBtn').addEventListener('click', closeScanModal);
    document.getElementById('scanForm').addEventListener('submit', handleScan);
    document.getElementById('clearScanHistory').addEventListener('click', clearScanHistory);
    document.getElementById('exportScanHistory').addEventListener('click', exportScanHistory);
}

// ===== SEARCH FUNCTIONALITY =====
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm === '') {
        filteredOrders = [...allOrders];
    } else {
        filteredOrders = allOrders.filter(order => {
            return Object.values(order).some(value => 
                String(value).toLowerCase().includes(searchTerm)
            );
        });
    }
    
    currentPage = 1;
    updateMetrics();
    renderTable();
}

// ===== FILTER FUNCTIONALITY =====
function applyFilters() {
    filters = {
        status: Array.from(document.getElementById('filterStatus').selectedOptions).map(o => o.value).filter(v => v),
        group: document.getElementById('filterGroup').value,
        type: document.getElementById('filterType').value,
        photographer: document.getElementById('filterPhotographer').value,
        contentType: document.getElementById('filterContentType').value,
        dateFrom: document.getElementById('filterDateFrom').value,
        dateTo: document.getElementById('filterDateTo').value,
        alertsOnly: document.getElementById('filterAlerts').checked
    };
    
    filteredOrders = allOrders.filter(order => {
        if (filters.status.length > 0 && !filters.status.includes(order.status)) return false;
        if (filters.group && order.group !== filters.group) return false;
        if (filters.type && order.type !== filters.type) return false;
        if (filters.photographer && order.photographer !== filters.photographer) return false;
        if (filters.contentType && order.contentType !== filters.contentType) return false;
        if (filters.dateFrom && order.deadline < filters.dateFrom) return false;
        if (filters.dateTo && order.deadline > filters.dateTo) return false;
        if (filters.alertsOnly && order.alert === 'none') return false;
        
        return true;
    });
    
    currentPage = 1;
    updateMetrics();
    renderTable();
}

function clearFilters() {
    document.getElementById('filterStatus').selectedIndex = 0;
    document.getElementById('filterGroup').selectedIndex = 0;
    document.getElementById('filterType').selectedIndex = 0;
    document.getElementById('filterPhotographer').selectedIndex = 0;
    document.getElementById('filterContentType').selectedIndex = 0;
    document.getElementById('filterDateFrom').value = '';
    document.getElementById('filterDateTo').value = '';
    document.getElementById('filterAlerts').checked = false;
    
    filters = {};
    filteredOrders = [...allOrders];
    currentPage = 1;
    updateMetrics();
    renderTable();
}

function toggleFilters() {
    const filterContent = document.getElementById('filterContent');
    const toggleBtn = document.getElementById('toggleFilters');
    
    if (filterContent.classList.contains('collapsed')) {
        filterContent.classList.remove('collapsed');
        toggleBtn.textContent = '▼';
    } else {
        filterContent.classList.add('collapsed');
        toggleBtn.textContent = '▶';
    }
}

// ===== SORTING FUNCTIONALITY =====
function handleSort(column) {
    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'asc';
    }
    
    filteredOrders.sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];
        
        // Handle different data types
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
    
    // Update sort indicators
    document.querySelectorAll('.sortable').forEach(th => {
        th.classList.remove('asc', 'desc');
    });
    document.querySelector(`[data-column="${column}"]`).classList.add(sortDirection);
    
    renderTable();
}

// ===== PAGINATION =====
function getTotalPages() {
    return Math.ceil(filteredOrders.length / pageSize);
}

function goToPage(page) {
    const totalPages = getTotalPages();
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderTable();
}

function handlePageSizeChange(e) {
    pageSize = parseInt(e.target.value);
    currentPage = 1;
    renderTable();
}

// ===== SELECT ALL =====
function handleSelectAll(e) {
    const checkboxes = document.querySelectorAll('.table-body input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = e.target.checked);
}

// ===== RENDER TABLE =====
function renderTable() {
    const tbody = document.getElementById('tableBody');
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageOrders = filteredOrders.slice(start, end);
    
    if (pageOrders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="27" class="loading">No orders found matching your criteria</td></tr>';
        updatePaginationInfo();
        return;
    }
    
    tbody.innerHTML = pageOrders.map(order => `
        <tr>
            <td><input type="checkbox" class="row-checkbox"></td>
            <td><a href="#" class="order-link" data-order="${order.orderNumber}">${order.orderNumber}</a></td>
            <td>${order.page}</td>
            <td>${order.offerID}</td>
            <td>${order.offerName}</td>
            <td>${order.group}</td>
            <td>${order.type}</td>
            <td>${order.photoReference}</td>
            <td>${order.photographer}</td>
            <td>${order.principle}</td>
            <td>${order.costCenter}</td>
            <td>${order.articleNo}</td>
            <td>${order.articleName}</td>
            <td>${order.purchasingGroup}</td>
            <td>${order.contentType}</td>
            <td>${order.samShotType}</td>
            <td>${order.activity}</td>
            <td><span class="yes-no-badge ${order.combinedPhoto ? 'yes-badge' : 'no-badge'}">${order.combinedPhoto ? 'Yes' : 'No'}</span></td>
            <td>${order.deadline}</td>
            <td><span class="status-badge" style="background: #e3f2fd; color: #1565c0;">${order.sampleReceived}</span></td>
            <td>${order.fileName}</td>
            <td>${order.uploadTime}</td>
            <td><a href="#" class="pm-link" data-pm="${order.pmLink}">${order.pmName}</a></td>
            <td><img src="${order.preview}" class="preview-thumb" alt="Preview"></td>
            <td><span class="alert-icon alert-${order.alert}" title="${getAlertMessage(order.alert)}">${getAlertIcon(order.alert)}</span></td>
            <td><span class="status-badge status-${order.status.toLowerCase().replace(' ', '')}">${order.status}</span></td>
            <td>
                <div class="action-cell">
                    <button class="action-btn view" data-order="${order.orderNumber}">View</button>
                    <button class="action-btn edit" data-order="${order.orderNumber}">Edit</button>
                    <button class="action-btn comment" data-order="${order.orderNumber}">💬</button>
                    <button class="action-btn cancel" data-order="${order.orderNumber}">Cancel</button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Add event listeners to action buttons
    tbody.querySelectorAll('.action-btn.view, .order-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const orderNum = btn.dataset.order || btn.textContent;
            viewOrderDetails(orderNum);
        });
    });
    
    tbody.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', () => {
            alert(`Edit order ${btn.dataset.order}`);
        });
    });
    
    tbody.querySelectorAll('.action-btn.comment').forEach(btn => {
        btn.addEventListener('click', () => {
            alert(`Open comments for order ${btn.dataset.order}`);
        });
    });
    
    tbody.querySelectorAll('.action-btn.cancel').forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm(`Are you sure you want to cancel order ${btn.dataset.order}?`)) {
                alert(`Order ${btn.dataset.order} cancelled`);
            }
        });
    });
    
    updatePaginationInfo();
}

function getAlertIcon(alertLevel) {
    switch(alertLevel) {
        case 'high': return '🔴';
        case 'low': return '🟡';
        default: return '⚪';
    }
}

function getAlertMessage(alertLevel) {
    switch(alertLevel) {
        case 'high': return 'High Priority Alert - Immediate attention required';
        case 'low': return 'Low Priority Alert - Review when possible';
        default: return 'No alerts';
    }
}

// ===== UPDATE METRICS =====
function updateMetrics() {
    const pending = filteredOrders.filter(o => o.status === 'Pending').length;
    const progress = filteredOrders.filter(o => o.status === 'In Progress').length;
    const completed = filteredOrders.filter(o => o.status === 'Completed').length;
    const alerts = filteredOrders.filter(o => o.alert !== 'none').length;
    
    document.getElementById('totalOrders').textContent = filteredOrders.length;
    document.getElementById('pendingOrders').textContent = pending;
    document.getElementById('progressOrders').textContent = progress;
    document.getElementById('completedOrders').textContent = completed;
    document.getElementById('alertOrders').textContent = alerts;
}

// ===== UPDATE PAGINATION INFO =====
function updatePaginationInfo() {
    const totalPages = getTotalPages();
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, filteredOrders.length);
    
    document.getElementById('showingFrom').textContent = filteredOrders.length > 0 ? start : 0;
    document.getElementById('showingTo').textContent = end;
    document.getElementById('totalRecords').textContent = filteredOrders.length;
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('totalPages').textContent = totalPages;
    
    // Update button states
    document.getElementById('firstPage').disabled = currentPage === 1;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
    document.getElementById('lastPage').disabled = currentPage === totalPages;
}

// ===== VIEW ORDER DETAILS =====
function viewOrderDetails(orderNum) {
    const order = allOrders.find(o => o.orderNumber === orderNum);
    if (!order) return;
    
    const modal = document.getElementById('orderModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `Order Details: ${orderNum}`;
    
    modalBody.innerHTML = `
        <div class="detail-grid">
            <div class="detail-field">
                <label>Order Number</label>
                <div class="value">${order.orderNumber}</div>
            </div>
            <div class="detail-field">
                <label>Status</label>
                <div class="value"><span class="status-badge status-${order.status.toLowerCase().replace(' ', '')}">${order.status}</span></div>
            </div>
            <div class="detail-field">
                <label>Alert Level</label>
                <div class="value">${getAlertIcon(order.alert)} ${order.alert.toUpperCase()}</div>
            </div>
            <div class="detail-field">
                <label>Page</label>
                <div class="value">${order.page}</div>
            </div>
            <div class="detail-field">
                <label>Offer ID</label>
                <div class="value">${order.offerID}</div>
            </div>
            <div class="detail-field">
                <label>Offer Name</label>
                <div class="value">${order.offerName}</div>
            </div>
            <div class="detail-field">
                <label>Group</label>
                <div class="value">${order.group}</div>
            </div>
            <div class="detail-field">
                <label>Type</label>
                <div class="value">${order.type}</div>
            </div>
            <div class="detail-field">
                <label>Photo Reference</label>
                <div class="value">${order.photoReference}</div>
            </div>
            <div class="detail-field">
                <label>File Reference</label>
                <div class="value">${order.fileReference}</div>
            </div>
            <div class="detail-field">
                <label>Photographer/Method</label>
                <div class="value">${order.photographer}</div>
            </div>
            <div class="detail-field">
                <label>Principle</label>
                <div class="value">${order.principle}</div>
            </div>
            <div class="detail-field">
                <label>Cost Center</label>
                <div class="value">${order.costCenter}</div>
            </div>
            <div class="detail-field">
                <label>Article Number</label>
                <div class="value">${order.articleNo}</div>
            </div>
            <div class="detail-field">
                <label>Article Name</label>
                <div class="value">${order.articleName}</div>
            </div>
            <div class="detail-field">
                <label>Purchasing Group</label>
                <div class="value">${order.purchasingGroup}</div>
            </div>
            <div class="detail-field">
                <label>Content Type</label>
                <div class="value">${order.contentType}</div>
            </div>
            <div class="detail-field">
                <label>SAM Shot Type</label>
                <div class="value">${order.samShotType}</div>
            </div>
            <div class="detail-field">
                <label>Activity</label>
                <div class="value">${order.activity}</div>
            </div>
            <div class="detail-field">
                <label>Combined Photo</label>
                <div class="value">${order.combinedPhoto ? 'Yes' : 'No'}</div>
            </div>
            <div class="detail-field">
                <label>Sample Delivery</label>
                <div class="value">${order.sampleDelivery}</div>
            </div>
            <div class="detail-field">
                <label>Deadline</label>
                <div class="value">${order.deadline}</div>
            </div>
            <div class="detail-field">
                <label>Sample Received Status</label>
                <div class="value">${order.sampleReceived}</div>
            </div>
            <div class="detail-field">
                <label>File Name</label>
                <div class="value">${order.fileName}</div>
            </div>
            <div class="detail-field">
                <label>Upload Time</label>
                <div class="value">${order.uploadTime}</div>
            </div>
            <div class="detail-field">
                <label>PM Link</label>
                <div class="value">${order.pmName} (${order.pmLink})</div>
            </div>
            <div class="detail-field">
                <label>Cost</label>
                <div class="value">${order.cost}</div>
            </div>
            <div class="detail-field" style="grid-column: 1 / -1;">
                <label>Briefing</label>
                <textarea readonly>${order.briefing}</textarea>
            </div>
            <div class="detail-field" style="grid-column: 1 / -1;">
                <label>Preview Image</label>
                <img src="${order.preview}" style="max-width: 100%; border-radius: 8px;">
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('orderModal').classList.remove('active');
}

// ===== EXPORT DATA =====
function exportData() {
    const csvContent = generateCSV(filteredOrders);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

function generateCSV(data) {
    const headers = [
        'Order Number', 'Page', 'Offer ID', 'Offer Name', 'Group', 'Type',
        'Photo Reference', 'Photographer', 'Principle', 'Cost Center', 'Article No', 'Article Name',
        'Purchasing Group', 'Content Type', 'SAM Shot Type', 'Activity', 'Combined Photo',
        'Deadline', 'Sample Status', 'File Name', 'Upload Time', 'PM Link', 'Alert', 'Status', 'Cost'
    ];
    
    const rows = data.map(order => [
        order.orderNumber, order.page, order.offerID, order.offerName,
        order.group, order.type, order.photoReference, order.photographer, order.principle,
        order.costCenter, order.articleNo, order.articleName, order.purchasingGroup,
        order.contentType, order.samShotType, order.activity, order.combinedPhoto ? 'Yes' : 'No',
        order.deadline, order.sampleReceived, order.fileName, order.uploadTime,
        order.pmLink, order.alert, order.status, order.cost
    ].map(value => `"${value}"`).join(','));
    
    return [headers.join(','), ...rows].join('\n');
}

// ===== REFRESH DATA =====
function refreshData() {
    const btn = document.getElementById('refreshBtn');
    btn.textContent = '🔄 Refreshing...';
    btn.disabled = true;
    
    setTimeout(() => {
        allOrders = generateMockOrders(50);
        filteredOrders = [...allOrders];
        currentPage = 1;
        updateMetrics();
        renderTable();
        btn.textContent = '🔄 Refresh';
        btn.disabled = false;
    }, 500);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('globalSearch').focus();
    }
    
    // Ctrl/Cmd + N for new order
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        document.getElementById('newOrderBtn').click();
    }
    
    // Ctrl/Cmd + M for sample management
    if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        document.getElementById('scanManagementBtn').click();
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
        closeScanModal();
    }
});

// ===== SAMPLE MANAGEMENT FUNCTIONS =====

function openScanManagement() {
    const modal = document.getElementById('scanModal');
    modal.classList.add('active');
    
    // Focus on scan input
    setTimeout(() => {
        document.getElementById('scanInput').focus();
    }, 100);
    
    // Update stats
    updateScanStats();
    renderScanHistory();
}

function closeScanModal() {
    document.getElementById('scanModal').classList.remove('active');
    document.getElementById('scanInput').value = '';
    hideScanFeedback();
}

function handleScan(e) {
    e.preventDefault();
    
    const scanInput = document.getElementById('scanInput');
    const orderNumber = scanInput.value.trim().toUpperCase();
    
    if (!orderNumber) {
        showScanFeedback('Please enter or scan an order number', 'error');
        return;
    }
    
    // Find the order
    const order = allOrders.find(o => o.orderNumber === orderNumber);
    
    if (!order) {
        showScanFeedback(`Order ${orderNumber} not found in the system`, 'error');
        scanInput.value = '';
        scanInput.focus();
        return;
    }
    
    // Check current sample status
    const currentStatus = order.sampleReceived;
    let newStatus = '';
    let location = '';
    let action = '';
    
    // Determine next status based on current status
    if (currentStatus === 'Article Sent' || currentStatus === 'In Transit') {
        newStatus = 'Article Scanned';
        location = 'With Photographer';
        action = 'received by photographer';
    } else if (currentStatus === 'Article Scanned' || currentStatus === 'In Quality Check') {
        newStatus = 'Article Sent Back';
        location = 'In Transit to HQ';
        action = 'shipped back to HQ';
    } else if (currentStatus === 'Article Sent Back') {
        newStatus = 'Delivered';
        location = 'At HQ';
        action = 'delivered to HQ';
    } else {
        newStatus = 'Article Scanned';
        location = 'With Photographer';
        action = 'scanned and received';
    }
    
    // Update order
    order.sampleReceived = newStatus;
    
    // Add to scan history
    const scanRecord = {
        orderNumber: order.orderNumber,
        article: order.articleName,
        previousStatus: currentStatus,
        newStatus: newStatus,
        location: location,
        timestamp: new Date(),
        scannedBy: 'Admin User'
    };
    
    scanHistory.unshift(scanRecord);
    scannedToday++;
    
    // Show success feedback
    showScanFeedback(
        `✅ ${order.articleName} (${orderNumber}) ${action}. Status: ${newStatus}`,
        'success'
    );
    
    // Clear input and refocus
    scanInput.value = '';
    scanInput.focus();
    
    // Update UI
    updateScanStats();
    renderScanHistory();
    renderTable(); // Update main table if visible
}

function showScanFeedback(message, type = 'info') {
    const feedback = document.getElementById('scanFeedback');
    feedback.textContent = message;
    feedback.className = `scan-feedback show ${type}`;
    
    // Auto-hide after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            hideScanFeedback();
        }, 5000);
    }
}

function hideScanFeedback() {
    const feedback = document.getElementById('scanFeedback');
    feedback.classList.remove('show');
}

function updateScanStats() {
    const withPhotographer = allOrders.filter(o => 
        o.sampleReceived === 'Article Scanned' || 
        o.sampleReceived === 'In Quality Check'
    ).length;
    
    const returnedToHQ = allOrders.filter(o => 
        o.sampleReceived === 'Article Sent Back' || 
        o.sampleReceived === 'Delivered'
    ).length;
    
    document.getElementById('totalScanned').textContent = scannedToday;
    document.getElementById('withPhotographer').textContent = withPhotographer;
    document.getElementById('returnedToHQ').textContent = returnedToHQ;
}

function renderScanHistory() {
    const tbody = document.getElementById('scanTableBody');
    
    if (scanHistory.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 30px; color: #7f8c8d;">No scans recorded yet. Start scanning to track articles.</td></tr>';
        return;
    }
    
    tbody.innerHTML = scanHistory.map(record => {
        const statusClass = getStatusClass(record.newStatus);
        const locationBadgeClass = getLocationBadgeClass(record.location);
        
        return `
            <tr class="${statusClass}">
                <td><strong>${record.orderNumber}</strong></td>
                <td>${record.article}</td>
                <td>${record.newStatus}</td>
                <td>${record.timestamp.toLocaleString()}</td>
                <td>${record.previousStatus === record.newStatus ? '-' : record.timestamp.toLocaleString()}</td>
                <td><span class="location-badge ${locationBadgeClass}">${record.location}</span></td>
            </tr>
        `;
    }).join('');
}

function getStatusClass(status) {
    if (status === 'Article Sent' || status === 'In Transit') return 'status-sent';
    if (status === 'Article Scanned' || status === 'In Quality Check') return 'status-received';
    if (status === 'Article Sent Back' || status === 'Delivered') return 'status-returned';
    return '';
}

function getLocationBadgeClass(location) {
    if (location.includes('HQ')) return 'location-hq';
    if (location.includes('Photographer')) return 'location-photographer';
    if (location.includes('Transit')) return 'location-transit';
    return '';
}

function clearScanHistory() {
    if (confirm('Are you sure you want to clear all scan history? This cannot be undone.')) {
        scanHistory = [];
        scannedToday = 0;
        updateScanStats();
        renderScanHistory();
        showScanFeedback('Scan history cleared', 'info');
    }
}

function exportScanHistory() {
    if (scanHistory.length === 0) {
        alert('No scan history to export');
        return;
    }
    
    const csvContent = generateScanHistoryCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scan_history_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showScanFeedback('Scan history exported successfully', 'success');
}

function generateScanHistoryCSV() {
    const headers = ['Order Number', 'Article', 'Previous Status', 'New Status', 'Location', 'Timestamp', 'Scanned By'];
    
    const rows = scanHistory.map(record => [
        record.orderNumber,
        record.article,
        record.previousStatus,
        record.newStatus,
        record.location,
        record.timestamp.toISOString(),
        record.scannedBy
    ].map(value => `"${value}"`).join(','));
    
    return [headers.join(','), ...rows].join('\n');
}

console.log('%c📊 Efficient Pro - Photo Order Management System', 'font-size: 16px; font-weight: bold; color: #3498db;');
console.log('%cKeyboard Shortcuts:', 'font-weight: bold;');
console.log('Ctrl/Cmd + K: Focus search');
console.log('Ctrl/Cmd + N: New order');
console.log('Ctrl/Cmd + M: Sample management');
console.log('Escape: Close modal');
