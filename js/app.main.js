/**
 * Photo Order Management System - Main Application
 * Production-ready version with modular architecture
 */

class PhotoOrderApp {
    constructor() {
        this.orders = [];
        this.filteredOrders = [];
        this.currentPage = 1;
        this.pageSize = AppConfig.ui.defaultPageSize;
        this.sortColumn = AppConfig.table.defaultSortColumn;
        this.sortDirection = AppConfig.table.defaultSortDirection;
        this.filters = {};
    }

    /**
     * Initialize application
     */
    async init() {
        console.log(`%c📸 ${AppConfig.app.name} v${AppConfig.app.version}`, 
                    'font-size: 16px; font-weight: bold; color: #3498db;');
        console.log(`%c🌍 Environment: ${AppConfig.app.environment}`, 'color: #2ecc71;');

        // Check authentication if enabled
        if (AppConfig.auth.enabled) {
            authService.requireAuth();
        }

        // Load orders
        await this.loadOrders();

        // Setup UI
        this.setupEventListeners();
        this.updateMetrics();
        this.renderTable();
        this.updateUserInfo();

        console.log(`%c✅ Application initialized with ${this.orders.length} orders`, 'color: #2ecc71;');
    }

    /**
     * Load orders from API/storage
     */
    async loadOrders() {
        try {
            // Check if we need to initialize with mock data
            const existingData = localStorage.getItem(AppConfig.storage.keys.orders);
            
            if (!existingData || AppConfig.debug.showMockData) {
                const mockOrders = this.generateMockOrders(50);
                apiService.initializeMockData(mockOrders);
            }

            // Load orders
            this.orders = await apiService.getOrders();
            this.filteredOrders = [...this.orders];
        } catch (error) {
            console.error('Failed to load orders:', error);
            this.orders = [];
            this.filteredOrders = [];
        }
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Search
        const searchInput = document.getElementById('globalSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Filters
        const applyFiltersBtn = document.getElementById('applyFiltersBtn');
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', () => this.applyAdvancedFilters());
        }

        const clearFiltersBtn = document.getElementById('clearFiltersBtn');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => this.clearFilters());
        }

        // Sorting - attach to sortable headers
        document.querySelectorAll('.sortable').forEach(th => {
            th.addEventListener('click', (e) => {
                const column = th.getAttribute('data-sort');
                this.handleSort(column);
            });
        });

        // Pagination
        const prevBtn = document.getElementById('prevPage');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousPage());
        }

        const nextBtn = document.getElementById('nextPage');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextPage());
        }

        const pageSizeSelect = document.getElementById('pageSize');
        if (pageSizeSelect) {
            pageSizeSelect.addEventListener('change', (e) => {
                this.pageSize = parseInt(e.target.value);
                this.currentPage = 1;
                this.renderTable();
            });
        }

        // Toolbar buttons
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.refresh());
        }

        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportData());
        }

        const newOrderBtn = document.getElementById('newOrderBtn');
        if (newOrderBtn) {
            newOrderBtn.addEventListener('click', () => this.createNewOrder());
        }

        // Logout button (if auth is enabled)
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn && AppConfig.auth.enabled) {
            logoutBtn.addEventListener('click', () => authService.logout());
        }
    }

    /**
     * Update user info display
     */
    updateUserInfo() {
        if (!AppConfig.auth.enabled) return;

        const user = authService.getCurrentUser();
        if (user) {
            const userInfo = document.getElementById('userInfo');
            if (userInfo) {
                const role = AppConfig.roles[user.role];
                userInfo.innerHTML = `
                    <span class="user-name">${user.name}</span>
                    <span class="user-role">${role.name}</span>
                `;
            }
        }
    }

    /**
     * Update metrics dashboard
     */
    updateMetrics() {
        const total = this.filteredOrders.length;
        const pending = this.filteredOrders.filter(o => o.status === 'Pending').length;
        const inProgress = this.filteredOrders.filter(o => o.status === 'In Progress').length;
        const completed = this.filteredOrders.filter(o => o.status === 'Completed').length;

        this.updateMetricElement('totalOrders', total);
        this.updateMetricElement('pendingOrders', pending);
        this.updateMetricElement('inProgressOrders', inProgress);
        this.updateMetricElement('completedOrders', completed);
    }

    /**
     * Update single metric element
     */
    updateMetricElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    /**
     * Render table with current data
     */
    renderTable() {
        const tbody = document.getElementById('ordersTableBody');
        if (!tbody) return;

        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const ordersToShow = this.filteredOrders.slice(start, end);

        if (ordersToShow.length === 0) {
            tbody.innerHTML = '<tr><td colspan="27" style="text-align: center; padding: 40px; color: #7f8c8d;">No orders found</td></tr>';
            this.updatePagination();
            return;
        }

        tbody.innerHTML = ordersToShow.map(order => this.renderOrderRow(order)).join('');
        this.updatePagination();
    }

    /**
     * Render single order row
     */
    renderOrderRow(order) {
        const alertClass = order.alert !== 'none' ? `alert-${order.alert}` : '';
        
        return `
            <tr class="${alertClass}" data-order-id="${order.orderNumber}">
                <td><a href="#" class="order-link" onclick="app.viewOrderDetails('${order.orderNumber}'); return false;">${order.orderNumber}</a></td>
                <td>${order.page || ''}</td>
                <td>${order.offerID || ''}</td>
                <td><span class="badge">${order.group || ''}</span></td>
                <td>${order.offerName || ''}</td>
                <td><span class="type-badge">${order.type || ''}</span></td>
                <td><code class="ref-code">${order.photoReference || ''}</code></td>
                <td>${order.fileReference ? `<a href="#" class="file-link">📁 View</a>` : ''}</td>
                <td><span class="photographer-badge">${order.photographer || ''}</span></td>
                <td>${order.principle || ''}</td>
                <td>${order.preview ? `<img src="${order.preview}" alt="Preview" class="preview-thumb" onclick="app.viewImage('${order.preview}')">` : ''}</td>
                <td><button class="comment-btn" onclick="app.viewComments('${order.orderNumber}')" title="${order.comments || 0} comments">💬 ${order.comments || 0}</button></td>
                <td class="alert-cell">${this.getAlertIcon(order.alert)}</td>
                <td>${order.pmLink || ''}</td>
                <td><span class="status-badge status-${(order.status || 'pending').toLowerCase().replace(' ', '-')}">${order.status || 'Pending'}</span></td>
                <td>${order.costCenter || ''}</td>
                <td><code>${order.articleNo || ''}</code></td>
                <td><strong>${order.articleName || ''}</strong></td>
                <td><span class="purchase-group-badge">${order.purchasingGroup || ''}</span></td>
                <td>${order.contentType || ''}</td>
                <td>${order.samShotType || ''}</td>
                <td><code class="activity-code">${order.activity || ''}</code></td>
                <td>${order.combinedPhoto ? '<span class="yes-badge">Yes</span>' : '<span class="no-badge">No</span>'}</td>
                <td><button class="briefing-btn" onclick="app.viewBriefing('${order.orderNumber}')">📄 View</button></td>
                <td>${order.sampleDelivery || ''}</td>
                <td class="${this.getDeadlineClass(order.deadline)}">${order.deadline || ''}</td>
                <td>
                    <div class="action-cell">
                        ${this.renderActions(order)}
                    </div>
                </td>
            </tr>
        `;
    }

    /**
     * Render action buttons based on permissions
     */
    renderActions(order) {
        let actions = '';

        if (!AppConfig.auth.enabled || authService.hasPermission('read')) {
            actions += `<button class="action-btn view" onclick="app.viewOrderDetails('${order.orderNumber}')" title="View">👁️</button>`;
        }

        if (!AppConfig.auth.enabled || authService.hasPermission('write')) {
            actions += `<button class="action-btn edit" onclick="app.editOrder('${order.orderNumber}')" title="Edit">✏️</button>`;
        }

        if (!AppConfig.auth.enabled || authService.hasPermission('delete')) {
            actions += `<button class="action-btn cancel" onclick="app.cancelOrder('${order.orderNumber}')" title="Cancel">❌</button>`;
        }

        return actions;
    }

    /**
     * Get alert icon
     */
    getAlertIcon(alert) {
        if (alert === 'high') return '🔴';
        if (alert === 'low') return '🟡';
        return '🟢';
    }

    /**
     * Get deadline CSS class
     */
    getDeadlineClass(deadline) {
        if (!deadline) return '';
        
        const days = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
        if (days < 0) return 'deadline-overdue';
        if (days < 3) return 'deadline-urgent';
        if (days < 7) return 'deadline-warning';
        return '';
    }

    /**
     * Handle search
     */
    handleSearch(query) {
        if (!query) {
            this.filteredOrders = [...this.orders];
        } else {
            const lowerQuery = query.toLowerCase();
            this.filteredOrders = this.orders.filter(order => {
                return Object.values(order).some(value => 
                    String(value).toLowerCase().includes(lowerQuery)
                );
            });
        }

        this.currentPage = 1;
        this.updateMetrics();
        this.renderTable();
    }

    /**
     * Apply advanced filters
     */
    applyAdvancedFilters() {
        // Collect filter values from UI
        this.filters = {};
        
        document.querySelectorAll('[data-filter]').forEach(input => {
            const filterKey = input.getAttribute('data-filter');
            if (input.value) {
                this.filters[filterKey] = input.value;
            }
        });

        // Apply filters
        this.filteredOrders = this.orders.filter(order => {
            for (const [key, value] of Object.entries(this.filters)) {
                if (value && !String(order[key] || '').toLowerCase().includes(String(value).toLowerCase())) {
                    return false;
                }
            }
            return true;
        });

        this.currentPage = 1;
        this.updateMetrics();
        this.renderTable();
    }

    /**
     * Clear all filters
     */
    clearFilters() {
        this.filters = {};
        document.querySelectorAll('[data-filter]').forEach(input => {
            input.value = '';
        });

        this.filteredOrders = [...this.orders];
        this.currentPage = 1;
        this.updateMetrics();
        this.renderTable();
    }

    /**
     * Handle column sorting
     */
    handleSort(column) {
        if (this.sortColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDirection = 'asc';
        }

        this.filteredOrders.sort((a, b) => {
            let aVal = a[column];
            let bVal = b[column];

            // Handle different data types
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return this.sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
            }

            // String comparison
            aVal = String(aVal || '').toLowerCase();
            bVal = String(bVal || '').toLowerCase();

            if (this.sortDirection === 'asc') {
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
            activeHeader.classList.add(this.sortDirection);
        }

        this.renderTable();
    }

    /**
     * Update pagination controls
     */
    updatePagination() {
        const total = this.filteredOrders.length;
        const totalPages = Math.ceil(total / this.pageSize);
        const start = (this.currentPage - 1) * this.pageSize + 1;
        const end = Math.min(this.currentPage * this.pageSize, total);

        this.updateMetricElement('showingStart', total > 0 ? start : 0);
        this.updateMetricElement('showingEnd', end);
        this.updateMetricElement('totalFiltered', total);

        // Update prev/next buttons
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        
        if (prevBtn) prevBtn.disabled = this.currentPage === 1;
        if (nextBtn) nextBtn.disabled = this.currentPage === totalPages || totalPages === 0;
    }

    /**
     * Go to previous page
     */
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderTable();
        }
    }

    /**
     * Go to next page
     */
    nextPage() {
        const totalPages = Math.ceil(this.filteredOrders.length / this.pageSize);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.renderTable();
        }
    }

    /**
     * View order details
     */
    async viewOrderDetails(orderNumber) {
        const order = await apiService.getOrderById(orderNumber);
        if (!order) {
            alert('Order not found');
            return;
        }

        // TODO: Show order details in modal
        alert(`Order Details: ${orderNumber}\n\nFeature coming soon!`);
        console.log('Order details:', order);
    }

    /**
     * View comments
     */
    viewComments(orderNumber) {
        // TODO: Show comments modal
        alert(`Comments for ${orderNumber}\n\nFeature coming soon!`);
    }

    /**
     * View briefing
     */
    async viewBriefing(orderNumber) {
        const order = await apiService.getOrderById(orderNumber);
        if (order && order.briefing) {
            alert(`Briefing for ${orderNumber}:\n\n${order.briefing}`);
        }
    }

    /**
     * View image in new tab
     */
    viewImage(url) {
        window.open(url, '_blank');
    }

    /**
     * Edit order
     */
    editOrder(orderNumber) {
        if (!authService.hasPermission('write')) {
            alert('You do not have permission to edit orders');
            return;
        }

        // TODO: Show edit modal
        alert(`Edit order ${orderNumber}\n\nFeature coming soon!`);
    }

    /**
     * Cancel order
     */
    async cancelOrder(orderNumber) {
        if (!authService.hasPermission('delete')) {
            alert('You do not have permission to cancel orders');
            return;
        }

        if (confirm(`Are you sure you want to cancel order ${orderNumber}?`)) {
            try {
                await apiService.updateOrder(orderNumber, { status: 'Cancelled' });
                await this.refresh();
                alert('Order cancelled successfully');
            } catch (error) {
                alert('Failed to cancel order: ' + error.message);
            }
        }
    }

    /**
     * Create new order
     */
    createNewOrder() {
        if (!authService.hasPermission('write')) {
            alert('You do not have permission to create orders');
            return;
        }

        // TODO: Show create order modal
        alert('Create New Order\n\nFeature coming soon!');
    }

    /**
     * Export data to CSV
     */
    exportData() {
        if (!AppConfig.features.enableExport) {
            alert('Export feature is disabled');
            return;
        }

        if (AppConfig.auth.enabled && !authService.hasPermission('export')) {
            alert('You do not have permission to export data');
            return;
        }

        const csv = apiService.exportToCSV(this.filteredOrders);
        const filename = `photo_orders_${new Date().toISOString().split('T')[0]}.csv`;
        apiService.downloadCSV(csv, filename);
    }

    /**
     * Refresh data
     */
    async refresh() {
        await this.loadOrders();
        this.currentPage = 1;
        this.updateMetrics();
        this.renderTable();
        console.log('✅ Data refreshed');
    }

    /**
     * Generate mock orders (keeping existing logic)
     */
    generateMockOrders(count) {
        // Import from efficient-pro.js mock data generation
        // This keeps the same data structure
        return window.generateMockOrdersForApp ? window.generateMockOrdersForApp(count) : [];
    }
}

// Create global app instance
let app;

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    app = new PhotoOrderApp();
    app.init();
});

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhotoOrderApp;
}
