/**
 * Authentication Service
 * Handles user authentication, session management, and role-based access control
 */

class AuthService {
    constructor() {
        this.currentUser = null;
        this.sessionKey = 'photoOrderSession';
        this.init();
    }

    /**
     * Initialize authentication service
     */
    init() {
        // Check if authentication is enabled
        if (!AppConfig.auth.enabled) {
            console.log('%c🔓 Authentication is disabled', 'color: #f39c12');
            return;
        }

        // Restore session if exists
        this.restoreSession();

        // Set up session timeout
        this.setupSessionTimeout();
    }

    /**
     * Login user
     * @param {string} username 
     * @param {string} password 
     * @returns {Promise<Object>}
     */
    async login(username, password) {
        return new Promise((resolve, reject) => {
            // TODO: Replace with actual API call
            // For now, validate against mock users
            
            setTimeout(() => {
                // Mock validation
                if (username && password) {
                    const user = {
                        id: Date.now(),
                        username: username,
                        role: 'ADMIN', // This will come from API
                        name: 'Test User',
                        email: `${username}@example.com`,
                        loginTime: new Date().toISOString()
                    };

                    this.currentUser = user;
                    this.saveSession(user);
                    
                    resolve({
                        success: true,
                        user: user,
                        message: 'Login successful'
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Invalid credentials'
                    });
                }
            }, 500);
        });
    }

    /**
     * Logout user
     */
    logout() {
        this.currentUser = null;
        localStorage.removeItem(this.sessionKey);
        sessionStorage.clear();
        
        if (AppConfig.auth.enabled) {
            window.location.href = AppConfig.auth.loginPage;
        }
    }

    /**
     * Check if user is authenticated
     * @returns {boolean}
     */
    isAuthenticated() {
        if (!AppConfig.auth.enabled) return true;
        return this.currentUser !== null;
    }

    /**
     * Get current user
     * @returns {Object|null}
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Get user role
     * @returns {string|null}
     */
    getUserRole() {
        return this.currentUser ? this.currentUser.role : null;
    }

    /**
     * Check if user has permission
     * @param {string} permission 
     * @returns {boolean}
     */
    hasPermission(permission) {
        if (!AppConfig.auth.enabled) return true;
        if (!this.currentUser) return false;

        const role = AppConfig.roles[this.currentUser.role];
        return role && role.permissions.includes(permission);
    }

    /**
     * Check if user can access purchase group
     * @param {string} purchaseGroup 
     * @returns {boolean}
     */
    canAccessPurchaseGroup(purchaseGroup) {
        if (!AppConfig.auth.enabled) return true;
        if (!this.currentUser) return false;

        const role = AppConfig.roles[this.currentUser.role];
        
        // Admin can access all groups
        if (this.currentUser.role === 'ADMIN') return true;

        // Check if role has purchase group restrictions
        if (role.purchaseGroups) {
            return role.purchaseGroups.includes(purchaseGroup);
        }

        // If no restrictions, allow access
        return true;
    }

    /**
     * Save session to storage
     * @param {Object} user 
     */
    saveSession(user) {
        const session = {
            user: user,
            timestamp: Date.now(),
            expiresAt: Date.now() + AppConfig.auth.sessionTimeout
        };
        
        localStorage.setItem(this.sessionKey, JSON.stringify(session));
    }

    /**
     * Restore session from storage
     */
    restoreSession() {
        try {
            const sessionData = localStorage.getItem(this.sessionKey);
            if (!sessionData) return;

            const session = JSON.parse(sessionData);
            
            // Check if session is expired
            if (Date.now() > session.expiresAt) {
                this.logout();
                return;
            }

            this.currentUser = session.user;
            console.log('%c✅ Session restored', 'color: #2ecc71');
        } catch (error) {
            console.error('Failed to restore session:', error);
            this.logout();
        }
    }

    /**
     * Setup session timeout
     */
    setupSessionTimeout() {
        setInterval(() => {
            const sessionData = localStorage.getItem(this.sessionKey);
            if (sessionData) {
                const session = JSON.parse(sessionData);
                if (Date.now() > session.expiresAt) {
                    alert('Your session has expired. Please login again.');
                    this.logout();
                }
            }
        }, 60000); // Check every minute
    }

    /**
     * Require authentication
     * Redirects to login if not authenticated
     */
    requireAuth() {
        if (AppConfig.auth.enabled && !this.isAuthenticated()) {
            window.location.href = AppConfig.auth.loginPage;
        }
    }
}

// Create singleton instance
const authService = new AuthService();

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = authService;
}
