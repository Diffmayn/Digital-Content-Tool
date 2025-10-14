// ===== LOGIN PAGE LOGIC =====

document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    if (authService.isAuthenticated()) {
        redirectToApp();
        return;
    }

    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const errorMessage = document.getElementById('errorMessage');
    const demoAccounts = document.querySelectorAll('.demo-account');

    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });

    // Handle demo account clicks
    demoAccounts.forEach(account => {
        account.addEventListener('click', function() {
            const username = this.getAttribute('data-username');
            const password = this.getAttribute('data-password');
            
            usernameInput.value = username;
            passwordInput.value = password;
            
            // Visual feedback
            this.style.background = '#e8f4f8';
            setTimeout(() => {
                this.style.background = 'white';
            }, 200);
        });
    });

    // Login handler
    function handleLogin() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username || !password) {
            showError('Please enter both username and password');
            return;
        }

        // Show loading state
        setLoading(true);
        hideError();

        // Simulate network delay
        setTimeout(() => {
            const result = authService.login(username, password);

            if (result.success) {
                showSuccess('Login successful! Redirecting...');
                
                // Redirect after short delay
                setTimeout(() => {
                    redirectToApp();
                }, 1000);
            } else {
                setLoading(false);
                showError(result.error);
            }
        }, 800);
    }

    // Redirect based on user role
    function redirectToApp() {
        const user = authService.getCurrentUser();
        
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        // All users go to main app (efficient-pro.html)
        // The app will adapt based on role
        window.location.href = 'app.html';
    }

    // UI Helper functions
    function setLoading(loading) {
        loginBtn.disabled = loading;
        const btnText = loginBtn.querySelector('.btn-text');
        const btnLoader = loginBtn.querySelector('.btn-loader');
        
        if (loading) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline';
        } else {
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    }

    function showError(message) {
        errorMessage.textContent = '❌ ' + message;
        errorMessage.className = 'error-message show';
        errorMessage.style.background = '#fee';
        errorMessage.style.color = '#c33';
    }

    function showSuccess(message) {
        errorMessage.textContent = '✅ ' + message;
        errorMessage.className = 'error-message show';
        errorMessage.style.background = '#efe';
        errorMessage.style.color = '#2a2';
    }

    function hideError() {
        errorMessage.classList.remove('show');
    }

    // Focus username on load
    usernameInput.focus();
});
