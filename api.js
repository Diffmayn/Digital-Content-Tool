// ===== API SIMULATION LAYER =====
// Simulates REST API endpoints using localStorage for persistence

class API {
    constructor() {
        this.ordersKey = 'coms_orders';
        this.briefsKey = 'coms_briefs';
        this.uploadsKey = 'coms_uploads';
        this.initializeData();
    }

    // Initialize default data if not exists
    initializeData() {
        if (!localStorage.getItem(this.ordersKey)) {
            const orders = this.generateMockOrders();
            localStorage.setItem(this.ordersKey, JSON.stringify(orders));
        }
        
        if (!localStorage.getItem(this.briefsKey)) {
            localStorage.setItem(this.briefsKey, JSON.stringify({}));
        }
        
        if (!localStorage.getItem(this.uploadsKey)) {
            localStorage.setItem(this.uploadsKey, JSON.stringify({}));
        }
    }

    // Generate mock orders
    generateMockOrders() {
        const orders = [];
        const statuses = ['Pending', 'In Progress', 'Review', 'Approved', 'Completed', 'Cancelled'];
        const priorities = ['High', 'Medium', 'Low'];
        const photographers = ['M&B', 'Lightbox', 'Focal Point'];
        const studios = ['Studio A', 'Studio B', 'Studio C', 'External'];
        const departments = ['Mens', 'Womens', 'Kids', 'Home', 'Electronics', 'Sports'];
        const purchaseGroups = ['100', '200', '300', '400', '500', '600'];
        
        const articles = [
            { number: 12345678, name: 'Nike Air Max 270' },
            { number: 23456789, name: 'Samsung 55" QLED TV' },
            { number: 34567890, name: 'Adidas Running Shoes' },
            { number: 45678901, name: 'Sony WH-1000XM4 Headphones' },
            { number: 56789012, name: 'Levi\'s 501 Jeans' },
            { number: 67890123, name: 'Apple Watch Series 8' },
            { number: 78901234, name: 'KitchenAid Stand Mixer' },
            { number: 89012345, name: 'North Face Winter Jacket' },
            { number: 90123456, name: 'Canon EOS R6' },
            { number: 11223344, name: 'IKEA KALLAX Shelf' }
        ];

        const sampleStatuses = [
            'Pending Shipment',
            'Article Sent',
            'In Transit',
            'Article Scanned',
            'In Quality Check',
            'Article Sent Back',
            'Delivered',
            'Not Required'
        ];

        for (let i = 1; i <= 50; i++) {
            const article = articles[Math.floor(Math.random() * articles.length)];
            const orderDate = new Date(2025, 8, Math.floor(Math.random() * 30) + 1);
            const shootDate = new Date(orderDate.getTime() + (Math.random() * 14 + 7) * 24 * 60 * 60 * 1000);
            const deadline = new Date(shootDate.getTime() + (Math.random() * 7 + 3) * 24 * 60 * 60 * 1000);
            const daysRemaining = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));
            
            const photographer = photographers[Math.floor(Math.random() * photographers.length)];
            const purchaseGroup = purchaseGroups[Math.floor(Math.random() * purchaseGroups.length)];
            
            orders.push({
                id: `order_${i}`,
                orderNumber: `ORD-${String(i).padStart(4, '0')}`,
                offerID: String(1500000 + i),
                articleNumber: article.number,
                articleName: article.name,
                purchasingGroup: purchaseGroup,
                department: departments[Math.floor(Math.random() * departments.length)],
                photographer: photographer,
                studio: studios[Math.floor(Math.random() * studios.length)],
                page: Math.floor(Math.random() * 999) + 1,
                priority: priorities[Math.floor(Math.random() * priorities.length)],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                orderDate: orderDate.toISOString(),
                shootDate: shootDate.toISOString(),
                deadline: deadline.toISOString(),
                daysRemaining: daysRemaining,
                cost: (Math.random() * 4000 + 500).toFixed(2),
                contactPerson: `Contact ${i}`,
                contactDetails: `contact${i}@company.com`,
                activityCode: `A${Math.floor(Math.random() * 9000000) + 1000000}`,
                sampleReceived: sampleStatuses[Math.floor(Math.random() * sampleStatuses.length)],
                envFile: `ENV_${String(90000 + i).padStart(8, '0')}`,
                notes: i % 5 === 0 ? 'Rush order - Priority handling required' : '',
                alert: daysRemaining < 3 ? '🔴' : daysRemaining < 7 ? '🟡' : '🟢',
                hasImages: false,
                imageCount: 0,
                createdBy: 'System',
                createdAt: orderDate.toISOString(),
                updatedAt: new Date().toISOString()
            });
        }

        return orders;
    }

    // Get all orders
    async getOrders() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const orders = JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
                resolve(orders);
            }, 100);
        });
    }

    // Get order by ID
    async getOrder(orderId) {
        const orders = JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
        return orders.find(o => o.id === orderId || o.orderNumber === orderId);
    }

    // Create order
    async createOrder(orderData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const orders = JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
                const newOrder = {
                    id: `order_${Date.now()}`,
                    ...orderData,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                orders.push(newOrder);
                localStorage.setItem(this.ordersKey, JSON.stringify(orders));
                resolve(newOrder);
            }, 200);
        });
    }

    // Update order
    async updateOrder(orderId, updates) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const orders = JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
                const index = orders.findIndex(o => o.id === orderId || o.orderNumber === orderId);
                
                if (index !== -1) {
                    orders[index] = {
                        ...orders[index],
                        ...updates,
                        updatedAt: new Date().toISOString()
                    };
                    localStorage.setItem(this.ordersKey, JSON.stringify(orders));
                    resolve(orders[index]);
                } else {
                    resolve(null);
                }
            }, 200);
        });
    }

    // Delete order
    async deleteOrder(orderId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let orders = JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
                orders = orders.filter(o => o.id !== orderId && o.orderNumber !== orderId);
                localStorage.setItem(this.ordersKey, JSON.stringify(orders));
                resolve(true);
            }, 200);
        });
    }

    // Get briefs for order
    async getBriefs(orderId) {
        const briefs = JSON.parse(localStorage.getItem(this.briefsKey) || '{}');
        return briefs[orderId] || [];
    }

    // Add brief to order
    async addBrief(orderId, briefData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const briefs = JSON.parse(localStorage.getItem(this.briefsKey) || '{}');
                
                if (!briefs[orderId]) {
                    briefs[orderId] = [];
                }
                
                const newBrief = {
                    id: `brief_${Date.now()}`,
                    ...briefData,
                    createdBy: authService.getCurrentUser().name,
                    createdAt: new Date().toISOString()
                };
                
                briefs[orderId].push(newBrief);
                localStorage.setItem(this.briefsKey, JSON.stringify(briefs));
                resolve(newBrief);
            }, 200);
        });
    }

    // Get uploads for order
    async getUploads(orderId) {
        const uploads = JSON.parse(localStorage.getItem(this.uploadsKey) || '{}');
        return uploads[orderId] || [];
    }

    // Add upload to order
    async addUpload(orderId, uploadData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const uploads = JSON.parse(localStorage.getItem(this.uploadsKey) || '{}');
                
                if (!uploads[orderId]) {
                    uploads[orderId] = [];
                }
                
                const newUpload = {
                    id: `upload_${Date.now()}`,
                    ...uploadData,
                    uploadedBy: authService.getCurrentUser().name,
                    uploadedAt: new Date().toISOString()
                };
                
                uploads[orderId].push(newUpload);
                localStorage.setItem(this.uploadsKey, JSON.stringify(uploads));
                
                // Update order image count
                this.updateOrder(orderId, {
                    hasImages: true,
                    imageCount: uploads[orderId].length
                });
                
                resolve(newUpload);
            }, 500);
        });
    }

    // Export orders to CSV
    exportToCSV(orders) {
        const headers = [
            'Order Number', 'Offer ID', 'Article Number', 'Article Name', 'Purchase Group',
            'Department', 'Photographer', 'Studio', 'Page', 'Priority', 'Status',
            'Order Date', 'Shoot Date', 'Deadline', 'Days Remaining', 'Cost',
            'Contact Person', 'Contact Details', 'Activity Code', 'Sample Status',
            'ENV File', 'Notes'
        ];

        const rows = orders.map(order => [
            order.orderNumber,
            order.offerID,
            order.articleNumber,
            order.articleName,
            order.purchasingGroup,
            order.department,
            order.photographer,
            order.studio,
            order.page,
            order.priority,
            order.status,
            new Date(order.orderDate).toLocaleDateString(),
            new Date(order.shootDate).toLocaleDateString(),
            new Date(order.deadline).toLocaleDateString(),
            order.daysRemaining,
            order.cost,
            order.contactPerson,
            order.contactDetails,
            order.activityCode,
            order.sampleReceived,
            order.envFile,
            order.notes
        ].map(value => `"${value}"`).join(','));

        return [headers.join(','), ...rows].join('\n');
    }
}

// Initialize API
const api = new API();
