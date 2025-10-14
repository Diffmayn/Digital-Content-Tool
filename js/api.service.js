/**
 * API Service
 * Handles all API calls and data management
 * Currently uses localStorage for mock data, ready to be replaced with real API calls
 */

class APIService {
    constructor() {
        this.baseURL = AppConfig.api.baseURL;
        this.timeout = AppConfig.api.timeout;
        this.storageKey = AppConfig.storage.keys.orders;
    }

    /**
     * Generic API request handler
     * @param {string} endpoint 
     * @param {Object} options 
     * @returns {Promise<any>}
     */
    async request(endpoint, options = {}) {
        // TODO: Replace with actual fetch API call
        // For now, simulate API with localStorage
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const method = options.method || 'GET';
                    const data = options.body;

                    if (AppConfig.debug.enabled) {
                        console.log(`📡 API ${method} ${endpoint}`, data);
                    }

                    // Simulate success response
                    resolve({
                        success: true,
                        data: data,
                        timestamp: new Date().toISOString()
                    });
                } catch (error) {
                    reject({
                        success: false,
                        error: error.message
                    });
                }
            }, 300); // Simulate network delay
        });
    }

    /**
     * Get all orders
     * @param {Object} filters 
     * @returns {Promise<Array>}
     */
    async getOrders(filters = {}) {
        try {
            const ordersData = localStorage.getItem(this.storageKey);
            let orders = ordersData ? JSON.parse(ordersData) : [];

            // Apply filters if provided
            if (Object.keys(filters).length > 0) {
                orders = this.applyFilters(orders, filters);
            }

            // Apply role-based filtering
            if (AppConfig.auth.enabled && authService.isAuthenticated()) {
                orders = this.applyRoleBasedFiltering(orders);
            }

            if (AppConfig.debug.enabled) {
                console.log(`✅ Retrieved ${orders.length} orders`);
            }

            return orders;
        } catch (error) {
            console.error('Failed to get orders:', error);
            return [];
        }
    }

    /**
     * Get order by ID
     * @param {string} orderId 
     * @returns {Promise<Object|null>}
     */
    async getOrderById(orderId) {
        const orders = await this.getOrders();
        return orders.find(order => order.orderNumber === orderId) || null;
    }

    /**
     * Create new order
     * @param {Object} orderData 
     * @returns {Promise<Object>}
     */
    async createOrder(orderData) {
        const orders = await this.getOrders();
        
        const newOrder = {
            ...orderData,
            orderNumber: orderData.orderNumber || `ORD-${Date.now()}`,
            createdAt: new Date().toISOString(),
            createdBy: authService.getCurrentUser()?.username || 'system',
            status: orderData.status || 'Pending'
        };

        orders.push(newOrder);
        this.saveOrders(orders);

        console.log('✅ Order created:', newOrder.orderNumber);
        return newOrder;
    }

    /**
     * Update order
     * @param {string} orderId 
     * @param {Object} updates 
     * @returns {Promise<Object>}
     */
    async updateOrder(orderId, updates) {
        const orders = await this.getOrders();
        const index = orders.findIndex(order => order.orderNumber === orderId);

        if (index === -1) {
            throw new Error(`Order ${orderId} not found`);
        }

        orders[index] = {
            ...orders[index],
            ...updates,
            updatedAt: new Date().toISOString(),
            updatedBy: authService.getCurrentUser()?.username || 'system'
        };

        this.saveOrders(orders);
        console.log('✅ Order updated:', orderId);
        return orders[index];
    }

    /**
     * Delete order
     * @param {string} orderId 
     * @returns {Promise<boolean>}
     */
    async deleteOrder(orderId) {
        const orders = await this.getOrders();
        const filtered = orders.filter(order => order.orderNumber !== orderId);

        if (filtered.length === orders.length) {
            throw new Error(`Order ${orderId} not found`);
        }

        this.saveOrders(filtered);
        console.log('✅ Order deleted:', orderId);
        return true;
    }

    /**
     * Upload image for order
     * @param {string} orderId 
     * @param {File} file 
     * @returns {Promise<Object>}
     */
    async uploadImage(orderId, file) {
        // TODO: Implement actual file upload
        return this.request(`${AppConfig.api.endpoints.uploads}/${orderId}`, {
            method: 'POST',
            body: { fileName: file.name, size: file.size }
        });
    }

    /**
     * Add comment to order
     * @param {string} orderId 
     * @param {string} comment 
     * @returns {Promise<Object>}
     */
    async addComment(orderId, comment) {
        const order = await this.getOrderById(orderId);
        if (!order) {
            throw new Error(`Order ${orderId} not found`);
        }

        if (!order.commentsList) {
            order.commentsList = [];
        }

        const newComment = {
            id: Date.now(),
            text: comment,
            author: authService.getCurrentUser()?.name || 'Anonymous',
            timestamp: new Date().toISOString()
        };

        order.commentsList.push(newComment);
        order.comments = order.commentsList.length;

        await this.updateOrder(orderId, order);
        return newComment;
    }

    /**
     * Export orders to CSV
     * @param {Array} orders 
     * @returns {string}
     */
    exportToCSV(orders) {
        const headers = AppConfig.table.columns
            .filter(col => col.visible && col.key !== 'actions')
            .map(col => col.label);

        const rows = orders.map(order => {
            return AppConfig.table.columns
                .filter(col => col.visible && col.key !== 'actions')
                .map(col => {
                    let value = order[col.key];
                    if (typeof value === 'boolean') {
                        value = value ? 'Yes' : 'No';
                    }
                    return `"${value || ''}"`;
                })
                .join(',');
        });

        const csv = [headers.join(','), ...rows].join('\n');
        return csv;
    }

    /**
     * Download CSV file
     * @param {string} csv 
     * @param {string} filename 
     */
    downloadCSV(csv, filename = 'photo_orders.csv') {
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('✅ CSV exported:', filename);
    }

    /**
     * Save orders to storage
     * @param {Array} orders 
     */
    saveOrders(orders) {
        localStorage.setItem(this.storageKey, JSON.stringify(orders));
    }

    /**
     * Apply filters to orders
     * @param {Array} orders 
     * @param {Object} filters 
     * @returns {Array}
     */
    applyFilters(orders, filters) {
        return orders.filter(order => {
            for (const [key, value] of Object.entries(filters)) {
                if (value && !String(order[key]).toLowerCase().includes(String(value).toLowerCase())) {
                    return false;
                }
            }
            return true;
        });
    }

    /**
     * Apply role-based filtering
     * @param {Array} orders 
     * @returns {Array}
     */
    applyRoleBasedFiltering(orders) {
        const userRole = authService.getUserRole();
        const roleConfig = AppConfig.roles[userRole];

        // If role has purchase group restrictions, filter orders
        if (roleConfig && roleConfig.purchaseGroups) {
            return orders.filter(order => 
                roleConfig.purchaseGroups.includes(order.purchasingGroup)
            );
        }

        return orders;
    }

    /**
     * Initialize with mock data
     * @param {Array} mockOrders 
     */
    initializeMockData(mockOrders) {
        const existing = localStorage.getItem(this.storageKey);
        if (!existing || AppConfig.debug.showMockData) {
            this.saveOrders(mockOrders);
            console.log(`🔄 Initialized with ${mockOrders.length} mock orders`);
        }
    }

    /**
     * Clear all data
     */
    clearAllData() {
        localStorage.removeItem(this.storageKey);
        console.log('🗑️ All data cleared');
    }
}

// Create singleton instance
const apiService = new APIService();

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = apiService;
}
