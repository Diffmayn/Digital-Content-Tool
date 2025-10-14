// ===== COMPREHENSIVE MOCK DATA GENERATION =====

const photographers = [
    'Sarah Johnson', 'Mike Chen', 'Emma Davis', 'Alex Rodriguez', 
    'Photo Box', 'Generative AI', 'Post-Processing', 'John Smith', 
    'Maria Garcia', 'Studio A', 'Studio B', 'Studio C'
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

const articleNames = [
    'Nike Air Max 270', 'Samsung 55" QLED TV', 'Adidas Running Shoes', 
    'Sony WH-1000XM4 Headphones', 'Levi\'s 501 Jeans', 'Apple Watch Series 8',
    'KitchenAid Stand Mixer', 'North Face Winter Jacket', 'Canon EOS R6',
    'IKEA KALLAX Shelf', 'Green Grapes', 'Organic Bananas', 
    'Dell XPS 15 Laptop', 'Dyson V15 Vacuum', 'Patagonia Fleece',
    'Red Wine Cabernet', 'Fresh Salmon Fillet', 'Whole Wheat Bread',
    'Protein Powder Vanilla', 'Yoga Mat Premium'
];

const offerNames = [
    'Summer Sale 2024', 'Winter Collection', 'Spring Launch Campaign',
    'Fall Fashion Week', 'Holiday Special', 'Black Friday Deals',
    'New Year Promotion', 'Back to School', 'Easter Campaign',
    'Valentine\'s Day Special', 'Mother\'s Day Collection', 'Father\'s Day Gifts',
    'Labor Day Sale', 'Independence Day', 'Memorial Day Weekend'
];

const briefingTemplates = [
    'Clean white background, centered product shot with soft shadows',
    'Lifestyle context showing product in use, natural lighting',
    'Studio shot with gradient background, highlight key features',
    'Action shot capturing movement, dynamic composition',
    'Flat lay arrangement with complementary props',
    'Close-up macro shot showing texture and details',
    'Environmental portrait with shallow depth of field',
    '360-degree product rotation for interactive display'
];

// Generate comprehensive mock orders
function generateMockOrders(count = 50) {
    const orders = [];
    const today = new Date();
    
    for (let i = 1; i <= count; i++) {
        const orderNum = 2000 + i;
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const hasAlert = Math.random() > 0.7;
        const alertLevel = hasAlert ? (Math.random() > 0.5 ? 'high' : 'low') : 'none';
        const isCombined = Math.random() > 0.8;
        
        // Generate random dates
        const createdDaysAgo = Math.floor(Math.random() * 60);
        const createdDate = new Date(today);
        createdDate.setDate(createdDate.getDate() - createdDaysAgo);
        
        const deadlineDaysAhead = Math.floor(Math.random() * 30) - 10;
        const deadline = new Date(today);
        deadline.setDate(deadline.getDate() + deadlineDaysAhead);
        
        const sampleDeliveryDaysAhead = deadlineDaysAhead - 7;
        const sampleDelivery = new Date(today);
        sampleDelivery.setDate(sampleDelivery.getDate() + sampleDeliveryDaysAhead);
        
        const uploadDaysAgo = Math.floor(Math.random() * createdDaysAgo);
        const uploadTime = new Date(today);
        uploadTime.setDate(uploadTime.getDate() - uploadDaysAgo);
        
        const photographer = photographers[Math.floor(Math.random() * photographers.length)];
        const group = groups[Math.floor(Math.random() * groups.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        const articleName = articleNames[Math.floor(Math.random() * articleNames.length)];
        const offerName = offerNames[Math.floor(Math.random() * offerNames.length)];
        
        const order = {
            orderNumber: `ORD-${orderNum}`,
            page: Math.floor(Math.random() * 999) + 1, // Integer 1-999
            offerID: String(1500000 + Math.floor(Math.random() * 500000)), // 7-digit starting from 1500000
            group: group,
            offerName: offerName,
            type: type,
            photoReference: `PREF-${orderNum}-${Math.floor(Math.random() * 999)}`,
            fileReference: `files/photo_${orderNum}_${Math.floor(Math.random() * 9999)}.jpg`,
            photographer: photographer,
            principle: principles[Math.floor(Math.random() * principles.length)],
            preview: `https://picsum.photos/seed/${orderNum}/200/200`,
            comments: Math.floor(Math.random() * 10),
            alert: alertLevel,
            pmLink: `PM-${Math.floor(Math.random() * 50) + 1}`,
            pmName: `Project Manager ${Math.floor(Math.random() * 10) + 1}`,
            status: status,
            costCenter: costCenters[Math.floor(Math.random() * costCenters.length)],
            articleNo: String(10000000 + Math.floor(Math.random() * 90000000)), // 8-digit integer
            articleName: articleName,
            purchasingGroup: purchasingGroups[Math.floor(Math.random() * purchasingGroups.length)], // 3-digit
            contentType: contentTypes[Math.floor(Math.random() * contentTypes.length)],
            samShotType: samShotTypes[Math.floor(Math.random() * samShotTypes.length)],
            activity: activities[Math.floor(Math.random() * activities.length)], // A5252052 format
            combinedPhoto: isCombined,
            briefing: briefingTemplates[Math.floor(Math.random() * briefingTemplates.length)],
            sampleDelivery: formatDate(sampleDelivery),
            deadline: formatDate(deadline),
            sampleReceived: sampleStatuses[Math.floor(Math.random() * sampleStatuses.length)], // Not yes/no
            fileName: `ENV_${String(90000 + Math.floor(Math.random() * 10000)).padStart(8, '0')}`, // ENV_00090449 format
            uploadTime: formatDateTime(uploadTime),
            createdDate: formatDate(createdDate),
            cost: `$${(Math.random() * 2000 + 500).toFixed(2)}`
        };
        
        orders.push(order);
    }
    
    return orders;
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function formatDateTime(date) {
    return date.toISOString().replace('T', ' ').split('.')[0];
}

// ===== APPLICATION STATE =====
let allOrders = [];
let filteredOrders = [];
let currentPage = 1;
let pageSize = 25;
let sortColumn = 'orderNumber';
let sortDirection = 'asc';

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    allOrders = generateMockOrders(50);
    filteredOrders = [...allOrders];
    
    setupEventListeners();
    updateMetrics();
    renderTable();
    
    console.log('%c📊 Comprehensive Photo Order Management System', 'font-size: 16px; font-weight: bold; color: #3498db;');
    console.log(`%c${allOrders.length} orders loaded with all fields populated`, 'color: #2ecc71;');
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Search
    document.getElementById('globalSearch').addEventListener('input', handleSearch);
    
    // Filters
    document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);
    document.getElementById('clearFiltersBtn').addEventListener('click', clearFilters);
    document.getElementById('toggleFiltersBtn').addEventListener('click', toggleFilters);
    
    // Sorting
    document.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', function() {
            const column = this.getAttribute('data-sort');
            handleSort(column);
        });
    });
    
    // Pagination
    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });
    
    document.getElementById('nextPage').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredOrders.length / pageSize);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });
    
    document.getElementById('pageSize').addEventListener('change', function() {
        pageSize = parseInt(this.value);
        currentPage = 1;
        renderTable();
    });
    
    // Toolbar buttons
    document.getElementById('refreshBtn').addEventListener('click', refreshData);
    document.getElementById('exportBtn').addEventListener('click', exportToCSV);
    document.getElementById('newOrderBtn').addEventListener('click', () => {
        alert('New Order Creation - Feature Coming Soon');
    });
}

// ===== UPDATE METRICS =====
function updateMetrics() {
    const total = filteredOrders.length;
    const pending = filteredOrders.filter(o => o.status === 'Pending').length;
    const inProgress = filteredOrders.filter(o => o.status === 'In Progress').length;
    const completed = filteredOrders.filter(o => o.status === 'Completed').length;
    
    const totalCost = filteredOrders.reduce((sum, order) => {
        return sum + parseFloat(order.cost.replace('$', ''));
    }, 0);
    
    document.getElementById('totalOrders').textContent = total;
    document.getElementById('pendingOrders').textContent = pending;
    document.getElementById('inProgressOrders').textContent = inProgress;
    document.getElementById('completedOrders').textContent = completed;
    document.getElementById('totalCost').textContent = `$${totalCost.toFixed(2)}`;
}

// ===== RENDER TABLE =====
function renderTable() {
    const tbody = document.getElementById('ordersTableBody');
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const ordersToShow = filteredOrders.slice(start, end);
    
    if (ordersToShow.length === 0) {
        tbody.innerHTML = '<tr><td colspan="30" style="text-align: center; padding: 40px; color: #7f8c8d;">No orders found</td></tr>';
        updatePagination();
        return;
    }
    
    tbody.innerHTML = ordersToShow.map(order => `
        <tr class="${order.alert !== 'none' ? 'alert-' + order.alert : ''}">
            <td><a href="#" class="order-link" onclick="viewOrderDetails('${order.orderNumber}'); return false;">${order.orderNumber}</a></td>
            <td>${order.page}</td>
            <td>${order.offerID}</td>
            <td><span class="badge">${order.group}</span></td>
            <td>${order.offerName}</td>
            <td><span class="type-badge">${order.type}</span></td>
            <td><code class="ref-code">${order.photoReference}</code></td>
            <td><a href="#" class="file-link" onclick="alert('File: ${order.fileReference}'); return false;">📁 View</a></td>
            <td><span class="photographer-badge">${order.photographer}</span></td>
            <td>${order.principle}</td>
            <td><button class="comment-btn" onclick="viewComments('${order.orderNumber}')" title="${order.comments} comments">💬 ${order.comments}</button></td>
            <td><a href="#" class="pm-link" onclick="alert('PM: ${order.pmName}'); return false;">${order.pmLink}</a></td>
            <td><span class="cost-center-badge">${order.costCenter}</span></td>
            <td><code>${order.articleNo}</code></td>
            <td><strong>${order.articleName}</strong></td>
            <td><span class="purchase-group-badge">${order.purchasingGroup}</span></td>
            <td>${order.contentType}</td>
            <td>${order.samShotType}</td>
            <td><code class="activity-code">${order.activity}</code></td>
            <td>${order.combinedPhoto ? '<span class="yes-badge">Yes</span>' : '<span class="no-badge">No</span>'}</td>
            <td><button class="briefing-btn" onclick="viewBriefing('${order.orderNumber}')" title="View full briefing">📄 View</button></td>
            <td>${order.sampleDelivery}</td>
            <td class="${getDeadlineClass(order.deadline)}">${order.deadline}</td>
            <td><span class="sample-status-badge">${order.sampleReceived}</span></td>
            <td><code class="file-name">${order.fileName}</code></td>
            <td class="upload-time">${order.uploadTime}</td>
            <td><img src="${order.preview}" alt="Preview" class="preview-thumb" onclick="viewImage('${order.preview}')"></td>
            <td class="alert-cell">${getAlertIcon(order.alert)}</td>
            <td><span class="status-badge status-${order.status.toLowerCase().replace(' ', '-')}">${order.status}</span></td>
            <td>
                <div class="action-cell">
                    <button class="action-btn view" onclick="viewOrderDetails('${order.orderNumber}')" title="View Details">👁️</button>
                    <button class="action-btn edit" onclick="editOrder('${order.orderNumber}')" title="Edit">✏️</button>
                    <button class="action-btn cancel" onclick="cancelOrder('${order.orderNumber}')" title="Cancel">❌</button>
                </div>
            </td>
        </tr>
    `).join('');
    
    updatePagination();
}

// ===== HELPER FUNCTIONS =====
function getAlertIcon(alert) {
    if (alert === 'high') return '🔴';
    if (alert === 'low') return '🟡';
    return '🟢';
}

function getDeadlineClass(deadline) {
    const days = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
    if (days < 0) return 'deadline-overdue';
    if (days < 3) return 'deadline-urgent';
    if (days < 7) return 'deadline-warning';
    return '';
}

// ===== SEARCH FUNCTION =====
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    if (!query) {
        filteredOrders = [...allOrders];
    } else {
        filteredOrders = allOrders.filter(order => {
            return Object.values(order).some(value => 
                String(value).toLowerCase().includes(query)
            );
        });
    }
    
    currentPage = 1;
    updateMetrics();
    renderTable();
}

// ===== ADVANCED FILTERS =====
function applyFilters() {
    filteredOrders = allOrders.filter(order => {
        // Apply all filter conditions
        if (document.getElementById('filterOrderNumber').value && 
            !order.orderNumber.includes(document.getElementById('filterOrderNumber').value)) return false;
            
        if (document.getElementById('filterPage').value && 
            order.page !== parseInt(document.getElementById('filterPage').value)) return false;
            
        if (document.getElementById('filterOfferID').value && 
            !order.offerID.includes(document.getElementById('filterOfferID').value)) return false;
            
        if (document.getElementById('filterGroup').value && 
            order.group !== document.getElementById('filterGroup').value) return false;
            
        if (document.getElementById('filterOfferName').value && 
            !order.offerName.toLowerCase().includes(document.getElementById('filterOfferName').value.toLowerCase())) return false;
            
        if (document.getElementById('filterType').value && 
            order.type !== document.getElementById('filterType').value) return false;
            
        if (document.getElementById('filterPhotographer').value && 
            order.photographer !== document.getElementById('filterPhotographer').value) return false;
            
        if (document.getElementById('filterPrinciple').value && 
            order.principle !== document.getElementById('filterPrinciple').value) return false;
            
        if (document.getElementById('filterCostCenter').value && 
            order.costCenter !== document.getElementById('filterCostCenter').value) return false;
            
        if (document.getElementById('filterArticleNo').value && 
            !order.articleNo.includes(document.getElementById('filterArticleNo').value)) return false;
            
        if (document.getElementById('filterArticleName').value && 
            !order.articleName.toLowerCase().includes(document.getElementById('filterArticleName').value.toLowerCase())) return false;
            
        if (document.getElementById('filterPurchaseGroup').value && 
            order.purchasingGroup !== document.getElementById('filterPurchaseGroup').value) return false;
            
        if (document.getElementById('filterContentType').value && 
            order.contentType !== document.getElementById('filterContentType').value) return false;
            
        if (document.getElementById('filterSAMShot').value && 
            order.samShotType !== document.getElementById('filterSAMShot').value) return false;
            
        if (document.getElementById('filterActivity').value && 
            !order.activity.includes(document.getElementById('filterActivity').value)) return false;
            
        if (document.getElementById('filterCombined').value) {
            const filterValue = document.getElementById('filterCombined').value === 'true';
            if (order.combinedPhoto !== filterValue) return false;
        }
        
        if (document.getElementById('filterSampleStatus').value && 
            order.sampleReceived !== document.getElementById('filterSampleStatus').value) return false;
            
        if (document.getElementById('filterStatus').value && 
            order.status !== document.getElementById('filterStatus').value) return false;
            
        if (document.getElementById('filterDeadlineFrom').value && 
            order.deadline < document.getElementById('filterDeadlineFrom').value) return false;
            
        if (document.getElementById('filterDeadlineTo').value && 
            order.deadline > document.getElementById('filterDeadlineTo').value) return false;
        
        return true;
    });
    
    currentPage = 1;
    updateMetrics();
    renderTable();
}

function clearFilters() {
    // Clear all filter inputs
    document.querySelectorAll('.filter-grid input, .filter-grid select').forEach(input => {
        input.value = '';
    });
    
    filteredOrders = [...allOrders];
    currentPage = 1;
    updateMetrics();
    renderTable();
}

function toggleFilters() {
    const content = document.getElementById('filterContent');
    const btn = document.getElementById('toggleFiltersBtn');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        btn.textContent = '▼';
    } else {
        content.style.display = 'none';
        btn.textContent = '▶';
    }
}

// ===== SORTING =====
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
        if (column === 'page' || column === 'articleNo') {
            aVal = parseInt(aVal);
            bVal = parseInt(bVal);
        } else if (column === 'offerID') {
            aVal = parseInt(aVal);
            bVal = parseInt(bVal);
        } else if (column === 'deadline' || column === 'sampleDelivery' || column === 'uploadTime') {
            aVal = new Date(aVal);
            bVal = new Date(bVal);
        }
        
        if (sortDirection === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
    
    // Update sort indicators
    document.querySelectorAll('.sortable').forEach(th => {
        th.classList.remove('asc', 'desc');
    });
    
    const activeHeader = document.querySelector(`[data-sort="${column}"]`);
    if (activeHeader) {
        activeHeader.classList.add(sortDirection);
    }
    
    renderTable();
}

// ===== PAGINATION =====
function updatePagination() {
    const total = filteredOrders.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, total);
    
    document.getElementById('showingStart').textContent = total > 0 ? start : 0;
    document.getElementById('showingEnd').textContent = end;
    document.getElementById('totalFiltered').textContent = total;
    
    // Page numbers
    const pageNumbers = document.getElementById('pageNumbers');
    let html = '';
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<button class="page-num ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="page-dots">...</span>';
        }
    }
    
    pageNumbers.innerHTML = html;
    
    // Enable/disable prev/next
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages || totalPages === 0;
}

function goToPage(page) {
    currentPage = page;
    renderTable();
}

// ===== MODAL FUNCTIONS =====
function viewOrderDetails(orderNumber) {
    const order = allOrders.find(o => o.orderNumber === orderNumber);
    if (!order) return;
    
    const modal = document.getElementById('orderModal');
    const body = document.getElementById('orderDetailsBody');
    
    body.innerHTML = `
        <div class="details-grid">
            <div class="detail-section">
                <h3>Order Information</h3>
                <div class="detail-item"><strong>Order Number:</strong> ${order.orderNumber}</div>
                <div class="detail-item"><strong>Status:</strong> <span class="status-badge status-${order.status.toLowerCase().replace(' ', '-')}">${order.status}</span></div>
                <div class="detail-item"><strong>Alert:</strong> ${getAlertIcon(order.alert)}</div>
                <div class="detail-item"><strong>Page:</strong> ${order.page}</div>
            </div>
            
            <div class="detail-section">
                <h3>Offer Details</h3>
                <div class="detail-item"><strong>Offer ID:</strong> ${order.offerID}</div>
                <div class="detail-item"><strong>Offer Name:</strong> ${order.offerName}</div>
                <div class="detail-item"><strong>Group:</strong> ${order.group}</div>
                <div class="detail-item"><strong>Type:</strong> ${order.type}</div>
            </div>
            
            <div class="detail-section">
                <h3>Photo Details</h3>
                <div class="detail-item"><strong>Photo Reference:</strong> ${order.photoReference}</div>
                <div class="detail-item"><strong>File Reference:</strong> ${order.fileReference}</div>
                <div class="detail-item"><strong>Photographer:</strong> ${order.photographer}</div>
                <div class="detail-item"><strong>Principle:</strong> ${order.principle}</div>
            </div>
            
            <div class="detail-section">
                <h3>Article Information</h3>
                <div class="detail-item"><strong>Article Number:</strong> ${order.articleNo}</div>
                <div class="detail-item"><strong>Article Name:</strong> ${order.articleName}</div>
                <div class="detail-item"><strong>Purchase Group:</strong> ${order.purchasingGroup}</div>
                <div class="detail-item"><strong>Cost Center:</strong> ${order.costCenter}</div>
            </div>
            
            <div class="detail-section">
                <h3>Production Details</h3>
                <div class="detail-item"><strong>Content Type:</strong> ${order.contentType}</div>
                <div class="detail-item"><strong>SAM Shot Type:</strong> ${order.samShotType}</div>
                <div class="detail-item"><strong>Activity:</strong> ${order.activity}</div>
                <div class="detail-item"><strong>Combined Photo:</strong> ${order.combinedPhoto ? 'Yes' : 'No'}</div>
            </div>
            
            <div class="detail-section">
                <h3>Timeline</h3>
                <div class="detail-item"><strong>Sample Delivery:</strong> ${order.sampleDelivery}</div>
                <div class="detail-item"><strong>Deadline:</strong> ${order.deadline}</div>
                <div class="detail-item"><strong>Upload Time:</strong> ${order.uploadTime}</div>
                <div class="detail-item"><strong>Sample Status:</strong> ${order.sampleReceived}</div>
            </div>
            
            <div class="detail-section full-width">
                <h3>Briefing</h3>
                <div class="briefing-content">${order.briefing}</div>
            </div>
            
            <div class="detail-section full-width">
                <h3>Files</h3>
                <div class="detail-item"><strong>File Name:</strong> ${order.fileName}</div>
                <div class="detail-item"><strong>PM Link:</strong> ${order.pmLink} (${order.pmName})</div>
            </div>
            
            <div class="detail-section full-width">
                <h3>Preview</h3>
                <img src="${order.preview}" alt="Order Preview" style="max-width: 400px; border-radius: 8px;">
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('orderModal').classList.remove('active');
}

function viewComments(orderNumber) {
    const modal = document.getElementById('commentsModal');
    const section = document.getElementById('commentsSection');
    
    section.innerHTML = `
        <div class="comment-item">
            <strong>John Smith</strong> <span class="comment-time">2 hours ago</span>
            <p>Please ensure the lighting matches the previous campaign photos.</p>
        </div>
        <div class="comment-item">
            <strong>Sarah Johnson</strong> <span class="comment-time">1 day ago</span>
            <p>Received the briefing, will start work tomorrow.</p>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeCommentsModal() {
    document.getElementById('commentsModal').classList.remove('active');
}

function addComment() {
    const textarea = document.getElementById('newComment');
    if (textarea.value.trim()) {
        alert('Comment added: ' + textarea.value);
        textarea.value = '';
        closeCommentsModal();
    }
}

function viewBriefing(orderNumber) {
    const order = allOrders.find(o => o.orderNumber === orderNumber);
    if (order) {
        alert(`Briefing for ${orderNumber}:\n\n${order.briefing}`);
    }
}

function viewImage(url) {
    window.open(url, '_blank');
}

function editOrder(orderNumber) {
    alert(`Edit order ${orderNumber} - Feature coming soon`);
}

function cancelOrder(orderNumber) {
    if (confirm(`Are you sure you want to cancel order ${orderNumber}?`)) {
        const order = allOrders.find(o => o.orderNumber === orderNumber);
        if (order) {
            order.status = 'Cancelled';
            renderTable();
            updateMetrics();
        }
    }
}

// ===== EXPORT TO CSV =====
function exportToCSV() {
    const headers = [
        'Order Number', 'Page', 'Offer ID', 'Group', 'Offer Name', 'Type', 
        'Photo Reference', 'File Reference', 'Photographer', 'Principle',
        'Comments', 'PM Link', 'Cost Center', 'Article Number', 'Article Name',
        'Purchase Group', 'Content Type', 'SAM Shot Type', 'Activity',
        'Combined Photo', 'Briefing', 'Sample Delivery', 'Deadline',
        'Sample Status', 'File Name', 'Upload Time', 'Alert', 'Status', 'Cost'
    ];
    
    const rows = filteredOrders.map(order => [
        order.orderNumber, order.page, order.offerID, order.group, order.offerName,
        order.type, order.photoReference, order.fileReference, order.photographer,
        order.principle, order.comments, order.pmLink, order.costCenter,
        order.articleNo, order.articleName, order.purchasingGroup, order.contentType,
        order.samShotType, order.activity, order.combinedPhoto, order.briefing,
        order.sampleDelivery, order.deadline, order.sampleReceived, order.fileName,
        order.uploadTime, order.alert, order.status, order.cost
    ].map(value => `"${value}"`).join(','));
    
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `photo_orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

function refreshData() {
    allOrders = generateMockOrders(50);
    filteredOrders = [...allOrders];
    currentPage = 1;
    updateMetrics();
    renderTable();
    alert('Data refreshed!');
}

console.log('%c✅ Comprehensive View Ready!', 'font-size: 14px; color: #2ecc71; font-weight: bold;');
console.log('%cAll 30 columns available with full filtering', 'color: #3498db;');
