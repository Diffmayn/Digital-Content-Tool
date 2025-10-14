// ===== AUTHENTICATION & USER MANAGEMENT SYSTEM =====

// User Database
const USERS = {
    admin: {
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        name: 'System Administrator',
        email: 'admin@company.com',
        permissions: ['read', 'write', 'delete', 'manage_users', 'manage_orders', 'manage_settings'],
        purchaseGroups: [] // Admin sees everything
    },
    coord1: {
        username: 'coord1',
        password: 'coord123',
        role: 'promo_coordinator',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        permissions: ['read', 'write', 'manage_orders'],
        purchaseGroups: ['100', '200', '300']
    },
    coord2: {
        username: 'coord2',
        password: 'coord123',
        role: 'promo_coordinator',
        name: 'Michael Chen',
        email: 'michael.chen@company.com',
        permissions: ['read', 'write', 'manage_orders'],
        purchaseGroups: ['400', '500', '600']
    },
    photographer: {
        username: 'photographer',
        password: 'photo123',
        role: 'photographer',
        name: 'M&B Photography Studio',
        email: 'contact@mbphoto.com',
        permissions: ['read', 'upload_images', 'update_status'],
        photographerCode: 'M&B',
        purchaseGroups: []
    },
    agency: {
        username: 'agency',
        password: 'agency123',
        role: 'agency',
        name: 'Creative Agency Team',
        email: 'agency@company.com',
        permissions: ['read', 'write_briefs', 'manage_briefs'],
        purchaseGroups: []
    },
    marketing: {
        username: 'marketing',
        password: 'market123',
        role: 'marketing',
        name: 'Marketing Department',
        email: 'marketing@company.com',
        permissions: ['read'],
        purchaseGroups: []
    }
};

// Role Definitions
const ROLES = {
    admin: {
        displayName: 'Administrator',
        color: '#e74c3c',
        icon: '👤',
        description: 'Full system access with user management'
    },
    promo_coordinator: {
        displayName: 'Promo Coordinator',
        color: '#3498db',
        icon: '📋',
        description: 'Manage orders for assigned purchase groups'
    },
    photographer: {
        displayName: 'Photographer',
        color: '#9b59b6',
        icon: '📷',
        description: 'View assigned orders and upload images'
    },
    agency: {
        displayName: 'Agency User',
        color: '#e67e22',
        icon: '🎨',
        description: 'Create and manage briefs for orders'
    },
    marketing: {
        displayName: 'Marketing User',
        color: '#2ecc71',
        icon: '📢',
        description: 'Read-only access to all orders'
    }
};

// Session Management
class AuthService {
    constructor() {
        this.currentUser = null;
        this.sessionKey = 'coms_session';
        this.loadSession();
    }

    // Authenticate user
    login(username, password) {
        const user = USERS[username];
        
        if (!user) {
            return { success: false, error: 'User not found' };
        }
        
        if (user.password !== password) {
            return { success: false, error: 'Invalid password' };
        }
        
        // Create session
        const sessionData = {
            username: user.username,
            role: user.role,
            name: user.name,
            email: user.email,
            permissions: user.permissions,
            purchaseGroups: user.purchaseGroups,
            photographerCode: user.photographerCode || null,
            loginTime: new Date().toISOString(),
            sessionId: this.generateSessionId()
        };
        
        this.currentUser = sessionData;
        this.saveSession(sessionData);
        
        return { success: true, user: sessionData };
    }

    // Logout
    logout() {
        this.currentUser = null;
        localStorage.removeItem(this.sessionKey);
        window.location.href = 'login.html';
    }

    // Save session to localStorage
    saveSession(sessionData) {
        localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
    }

    // Load session from localStorage
    loadSession() {
        const sessionData = localStorage.getItem(this.sessionKey);
        if (sessionData) {
            try {
                this.currentUser = JSON.parse(sessionData);
            } catch (e) {
                console.error('Failed to parse session data:', e);
                localStorage.removeItem(this.sessionKey);
            }
        }
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check permission
    hasPermission(permission) {
        if (!this.currentUser) return false;
        return this.currentUser.permissions.includes(permission);
    }

    // Check if user can see order based on purchase group
    canViewOrder(order) {
        if (!this.currentUser) return false;

        const role = this.currentUser.role;

        // Admin, Agency, and Marketing can see all orders
        if (role === 'admin' || role === 'agency' || role === 'marketing') {
            return true;
        }

        // Promo Coordinators can only see their purchase groups
        if (role === 'promo_coordinator') {
            return this.currentUser.purchaseGroups.includes(order.purchasingGroup);
        }

        // Photographers can only see orders assigned to them
        if (role === 'photographer') {
            return order.photographer === this.currentUser.photographerCode;
        }

        return false;
    }

    // Check if user can edit order
    canEditOrder(order) {
        if (!this.currentUser) return false;

        const role = this.currentUser.role;

        // Admin can edit everything
        if (role === 'admin') return true;

        // Promo Coordinators can edit their purchase group orders
        if (role === 'promo_coordinator') {
            return this.currentUser.purchaseGroups.includes(order.purchasingGroup) &&
                   this.hasPermission('write');
        }

        // Photographers can update status and upload images
        if (role === 'photographer') {
            return order.photographer === this.currentUser.photographerCode &&
                   this.hasPermission('update_status');
        }

        return false;
    }

    // Generate session ID
    generateSessionId() {
        return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    // Get role info
    getRoleInfo(role) {
        return ROLES[role] || null;
    }

    // Require authentication (call on protected pages)
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    // Require specific permission
    requirePermission(permission) {
        if (!this.hasPermission(permission)) {
            alert('You do not have permission to perform this action');
            return false;
        }
        return true;
    }
}

// Initialize auth service
const authService = new AuthService();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { authService, USERS, ROLES };
}
