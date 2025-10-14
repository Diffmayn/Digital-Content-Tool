/**
 * Application Configuration
 * Central configuration for the Photo Order Management System
 */

const AppConfig = {
    // Application Info
    app: {
        name: 'Photo Order Management System',
        version: '1.0.0',
        environment: 'development', // 'development' | 'staging' | 'production'
    },

    // API Configuration
    api: {
        baseURL: '/api', // Will be updated for production
        timeout: 30000,
        endpoints: {
            orders: '/orders',
            photographers: '/photographers',
            briefs: '/briefs',
            uploads: '/uploads',
            auth: '/auth',
            users: '/users',
            export: '/export'
        }
    },

    // Authentication
    auth: {
        enabled: false, // Set to true when authentication is implemented
        sessionTimeout: 3600000, // 1 hour in milliseconds
        loginPage: '/login.html',
        defaultRedirect: '/index.html',
        storageKey: 'photoOrderAuth'
    },

    // User Roles & Permissions
    roles: {
        ADMIN: {
            name: 'Administrator',
            permissions: ['read', 'write', 'delete', 'manage_users', 'view_all']
        },
        COORDINATOR_1: {
            name: 'Coordinator 1',
            permissions: ['read', 'write', 'view_groups'],
            purchaseGroups: ['100', '200', '300']
        },
        COORDINATOR_2: {
            name: 'Coordinator 2',
            permissions: ['read', 'write', 'view_groups'],
            purchaseGroups: ['400', '500', '600']
        },
        PHOTOGRAPHER: {
            name: 'Photographer',
            permissions: ['read', 'upload_images', 'update_status']
        },
        AGENCY: {
            name: 'Agency',
            permissions: ['read', 'manage_briefs']
        },
        MARKETING: {
            name: 'Marketing',
            permissions: ['read', 'export']
        }
    },

    // UI Configuration
    ui: {
        theme: 'efficient-pro',
        defaultPageSize: 25,
        pageSizeOptions: [10, 25, 50, 100],
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm:ss',
        enableAnimations: true,
        stickyHeader: true
    },

    // Table Configuration
    table: {
        defaultSortColumn: 'orderNumber',
        defaultSortDirection: 'desc',
        columns: [
            { key: 'orderNumber', label: 'Order #', sortable: true, visible: true },
            { key: 'page', label: 'Page', sortable: true, visible: true },
            { key: 'offerID', label: 'Offer ID', sortable: true, visible: true },
            { key: 'group', label: 'Group', sortable: true, visible: true },
            { key: 'offerName', label: 'Offer Name', sortable: true, visible: true },
            { key: 'type', label: 'Type', sortable: true, visible: true },
            { key: 'photoReference', label: 'Photo Ref', sortable: true, visible: true },
            { key: 'fileReference', label: 'File Ref', sortable: true, visible: true },
            { key: 'photographer', label: 'Photographer', sortable: true, visible: true },
            { key: 'principle', label: 'Principle', sortable: true, visible: true },
            { key: 'preview', label: 'Preview', sortable: false, visible: true },
            { key: 'comments', label: 'Dialog', sortable: true, visible: true },
            { key: 'alert', label: 'Alert', sortable: true, visible: true },
            { key: 'pmLink', label: 'PM Link', sortable: true, visible: true },
            { key: 'status', label: 'Status', sortable: true, visible: true },
            { key: 'costCenter', label: 'Cost Center', sortable: true, visible: true },
            { key: 'articleNo', label: 'Article #', sortable: true, visible: true },
            { key: 'articleName', label: 'Article Name', sortable: true, visible: true },
            { key: 'purchasingGroup', label: 'Purchase Group', sortable: true, visible: true },
            { key: 'contentType', label: 'Content Type', sortable: true, visible: true },
            { key: 'samShotType', label: 'SAM Shot Type', sortable: true, visible: true },
            { key: 'activity', label: 'Activity', sortable: true, visible: true },
            { key: 'combinedPhoto', label: 'Combined', sortable: true, visible: true },
            { key: 'briefing', label: 'Briefing', sortable: false, visible: true },
            { key: 'sampleDelivery', label: 'Sample Delivery', sortable: true, visible: true },
            { key: 'deadline', label: 'Deadline', sortable: true, visible: true },
            { key: 'actions', label: 'Actions', sortable: false, visible: true }
        ]
    },

    // Data Storage
    storage: {
        type: 'localStorage', // 'localStorage' | 'sessionStorage' | 'api'
        keys: {
            orders: 'photoOrders',
            filters: 'photoOrderFilters',
            preferences: 'photoOrderPreferences',
            session: 'photoOrderSession'
        }
    },

    // Features
    features: {
        enableExport: true,
        enableImport: false,
        enableBriefing: true,
        enableUploads: true,
        enableComments: true,
        enableNotifications: false,
        enableRealTimeUpdates: false
    },

    // Validation Rules
    validation: {
        orderNumber: {
            pattern: /^ORD-\d+$/,
            required: true
        },
        offerID: {
            pattern: /^\d{7}$/,
            min: 1500000,
            max: 9999999
        },
        page: {
            type: 'number',
            min: 1,
            max: 999
        },
        articleNo: {
            pattern: /^\d{8}$/,
            required: true
        },
        purchaseGroup: {
            pattern: /^\d{3}$/,
            required: true
        },
        activity: {
            pattern: /^A\d{7}$/
        },
        fileName: {
            pattern: /^ENV_\d{8}$/
        }
    },

    // Development
    debug: {
        enabled: true, // Set to false in production
        logLevel: 'info', // 'error' | 'warn' | 'info' | 'debug'
        showMockData: true
    }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppConfig;
}
