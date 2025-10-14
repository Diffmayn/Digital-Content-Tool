# 🚀 Deployment Guide - Photo Order Management System

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Development Deployment](#development-deployment)
3. [Staging Deployment](#staging-deployment)
4. [Production Deployment](#production-deployment)
5. [Configuration Management](#configuration-management)
6. [Security Considerations](#security-considerations)

---

## Pre-Deployment Checklist

### ✅ Before Deploying

- [ ] All backups created (efficient-pro-BACKUP.*)
- [ ] Configuration reviewed (`config/app.config.js`)
- [ ] Authentication settings configured
- [ ] API endpoints configured (if using real API)
- [ ] Browser compatibility tested
- [ ] Security headers reviewed
- [ ] Error handling tested
- [ ] Performance tested with large datasets

---

## Development Deployment

### Local Testing Environment

#### Option 1: Direct File Access
```powershell
# Simply open in browser
Start-Process "c:\Users\248075\.vscode\cli\Testing Front ends\app-production.html"
```

**Best for**: Quick testing, UI development

#### Option 2: Python HTTP Server
```powershell
cd "c:\Users\248075\.vscode\cli\Testing Front ends"
python -m http.server 8000

# Access at: http://localhost:8000/app-production.html
```

**Best for**: Testing with CORS, simulating web server

#### Option 3: Node.js HTTP Server
```powershell
# Install http-server globally
npm install -g http-server

# Run server
cd "c:\Users\248075\.vscode\cli\Testing Front ends"
http-server -p 8000

# Access at: http://localhost:8000/app-production.html
```

**Best for**: Professional local development

#### Option 4: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `app-production.html`
3. Select "Open with Live Server"

**Best for**: Auto-reload during development

### Development Configuration

Edit `config/app.config.js`:

```javascript
const AppConfig = {
    app: {
        environment: 'development',  // <-- Development mode
    },
    auth: {
        enabled: false,  // Disabled for easier testing
    },
    debug: {
        enabled: true,   // Show console logs
        logLevel: 'debug',
        showMockData: true
    }
};
```

---

## Staging Deployment

### Staging Environment Setup

Staging should mirror production but with test data.

### 1. Prepare Files

```powershell
# Create staging folder
New-Item -ItemType Directory -Path "c:\Staging\PhotoOrderSystem"

# Copy production files
Copy-Item "c:\Users\248075\.vscode\cli\Testing Front ends\*" -Destination "c:\Staging\PhotoOrderSystem" -Recurse -Exclude "*.BACKUP.*"
```

### 2. Configure for Staging

Edit `config/app.config.js`:

```javascript
const AppConfig = {
    app: {
        environment: 'staging',  // <-- Staging mode
    },
    api: {
        baseURL: 'https://staging-api.yourcompany.com/api',  // Staging API
        // ...
    },
    auth: {
        enabled: true,  // Enable auth in staging
        loginPage: '/login.html',
    },
    debug: {
        enabled: true,   // Keep debugging on
        logLevel: 'info',
        showMockData: false  // Use real staging data
    }
};
```

### 3. Deploy to Staging Server

#### Option A: IIS (Windows Server)

```powershell
# Copy to IIS wwwroot
Copy-Item "c:\Staging\PhotoOrderSystem\*" -Destination "C:\inetpub\wwwroot\photo-orders" -Recurse

# Configure IIS Application
New-WebApplication -Name "PhotoOrders" -Site "Default Web Site" -PhysicalPath "C:\inetpub\wwwroot\photo-orders"
```

#### Option B: Apache/Nginx

```bash
# Copy files to web root
sudo cp -r /path/to/PhotoOrderSystem /var/www/html/photo-orders

# Configure permissions
sudo chown -R www-data:www-data /var/www/html/photo-orders
sudo chmod -R 755 /var/www/html/photo-orders
```

#### Option C: Cloud Hosting (Azure, AWS, etc.)

See [Cloud Deployment](#cloud-deployment) section below.

### 4. Test Staging

- [ ] Access staging URL
- [ ] Test authentication flow
- [ ] Test all CRUD operations
- [ ] Test with different user roles
- [ ] Test export functionality
- [ ] Check error handling
- [ ] Verify API integration
- [ ] Load test with production-size data

---

## Production Deployment

### Production-Ready Configuration

#### 1. Update Configuration

Edit `config/app.config.js`:

```javascript
const AppConfig = {
    app: {
        name: 'Photo Order Management System',
        version: '1.0.0',
        environment: 'production',  // <-- PRODUCTION
    },

    api: {
        baseURL: 'https://api.yourcompany.com/api',  // Production API
        timeout: 30000,
        // ... endpoints
    },

    auth: {
        enabled: true,  // MUST be enabled in production
        sessionTimeout: 3600000,  // 1 hour
        loginPage: '/login.html',
        defaultRedirect: '/app-production.html',
    },

    debug: {
        enabled: false,  // DISABLE in production
        logLevel: 'error',  // Only log errors
        showMockData: false  // NO mock data
    }
};
```

#### 2. Security Hardening

**Remove unnecessary files:**

```powershell
# Remove backup files from production package
Remove-Item -Path ".\*-BACKUP.*"
Remove-Item -Path ".\comprehensive.*"
Remove-Item -Path ".\efficient-pro.html"
Remove-Item -Path ".\index.html" -ErrorAction SilentlyContinue
```

**Keep only:**
- `app-production.html` (rename to `index.html`)
- `login.html`
- `config/` folder
- `css/` folder
- `js/` folder
- `README-PRODUCTION.md`

#### 3. Minify Assets (Optional)

```javascript
// Use a build tool to minify
// Example with npm packages:

npm install -g minify

minify js/auth.service.js > js/auth.service.min.js
minify js/api.service.js > js/api.service.min.js
minify js/app.main.js > js/app.main.min.js
minify css/main.css > css/main.min.css

// Update references in HTML to use .min.js/.min.css files
```

### Production Deployment Options

#### Option 1: Traditional Web Server

**IIS (Windows)**:
```powershell
# Copy to production server
Copy-Item ".\Production\*" -Destination "\\prod-server\c$\inetpub\wwwroot\photo-orders" -Recurse

# Configure SSL certificate
# Configure URL rewrite rules
# Set up authentication
```

**Apache**:
```bash
# Copy files
sudo cp -r ./Production/* /var/www/html/photo-orders/

# Configure .htaccess
sudo nano /var/www/html/photo-orders/.htaccess

# Add:
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Enable SSL
sudo a2enmod ssl
sudo a2ensite default-ssl
```

#### Option 2: Cloud Deployment

**Azure Static Web Apps**:

```bash
# Install Azure CLI
az login

# Create resource group
az group create --name PhotoOrderRG --location eastus

# Create static web app
az staticwebapp create \
    --name PhotoOrderApp \
    --resource-group PhotoOrderRG \
    --location eastus \
    --source ./Production

# Configure custom domain
az staticwebapp hostname set \
    --name PhotoOrderApp \
    --hostname orders.yourcompany.com
```

**AWS S3 + CloudFront**:

```bash
# Create S3 bucket
aws s3 mb s3://photo-orders-app

# Upload files
aws s3 sync ./Production s3://photo-orders-app --acl public-read

# Configure static website hosting
aws s3 website s3://photo-orders-app/ --index-document index.html

# Create CloudFront distribution for HTTPS
aws cloudfront create-distribution --origin-domain-name photo-orders-app.s3.amazonaws.com
```

**Netlify**:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd Production
netlify deploy --prod

# Or use drag-and-drop at https://app.netlify.com/drop
```

**Vercel**:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd Production
vercel --prod
```

#### Option 3: Docker Container

**Dockerfile**:

```dockerfile
FROM nginx:alpine

# Copy application files
COPY ./Production /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

**Build and run**:

```bash
# Build image
docker build -t photo-order-app .

# Run container
docker run -d -p 80:80 photo-order-app

# Or push to registry
docker tag photo-order-app your-registry/photo-order-app:1.0.0
docker push your-registry/photo-order-app:1.0.0
```

---

## Configuration Management

### Environment-Specific Configs

Create separate config files for each environment:

**Structure**:
```
config/
  ├── app.config.js              # Base config
  ├── app.config.dev.js          # Development overrides
  ├── app.config.staging.js      # Staging overrides
  └── app.config.production.js   # Production overrides
```

**app.config.dev.js**:
```javascript
const AppConfig = {
    ...AppConfig,
    app: { ...AppConfig.app, environment: 'development' },
    debug: { enabled: true, logLevel: 'debug', showMockData: true }
};
```

**app.config.production.js**:
```javascript
const AppConfig = {
    ...AppConfig,
    app: { ...AppConfig.app, environment: 'production' },
    api: { ...AppConfig.api, baseURL: 'https://api.prod.com/api' },
    debug: { enabled: false, logLevel: 'error', showMockData: false }
};
```

**Load appropriate config in HTML**:
```html
<!-- Development -->
<script src="config/app.config.dev.js"></script>

<!-- Production -->
<script src="config/app.config.production.js"></script>
```

---

## Security Considerations

### 1. HTTPS Only

**Force HTTPS redirect**:

```javascript
// Add to top of app.main.js
if (AppConfig.app.environment === 'production' && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
```

### 2. Content Security Policy

Add to HTML `<head>`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               connect-src 'self' https://api.yourcompany.com;">
```

### 3. Authentication Token Storage

**Use secure storage**:

```javascript
// In auth.service.js
// Instead of localStorage, use secure httpOnly cookies
// Or encrypt tokens before storing
```

### 4. API Security

**Add request signing**:

```javascript
// In api.service.js
async request(endpoint, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`,
        'X-Requested-With': 'XMLHttpRequest',  // CSRF protection
        'X-Client-Version': AppConfig.app.version
    };
    
    // ... rest of request
}
```

### 5. Input Validation

Already implemented in `AppConfig.validation`:

```javascript
validation: {
    orderNumber: { pattern: /^ORD-\d+$/, required: true },
    offerID: { pattern: /^\d{7}$/, min: 1500000, max: 9999999 },
    // ... etc
}
```

### 6. Rate Limiting

Implement on API side:

```javascript
// Example Express.js middleware
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## Post-Deployment Checklist

### Immediately After Deployment

- [ ] Verify app loads correctly
- [ ] Test login flow (if auth enabled)
- [ ] Test all major features
- [ ] Check browser console for errors
- [ ] Verify API connectivity
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Verify SSL certificate
- [ ] Check CSP headers
- [ ] Monitor server logs
- [ ] Set up error tracking (Sentry, Rollbar, etc.)
- [ ] Configure backups
- [ ] Document deployed version

### Within 24 Hours

- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Gather user feedback
- [ ] Fix any critical issues
- [ ] Optimize as needed

### Within 1 Week

- [ ] Review analytics
- [ ] Plan feature updates
- [ ] Address user feedback
- [ ] Performance optimization
- [ ] Security audit

---

## Rollback Plan

If issues arise after deployment:

### Quick Rollback

1. **Restore previous version**:
```powershell
# Copy backup to production
Copy-Item ".\Backups\v0.9.9\*" -Destination "C:\Production\PhotoOrders" -Recurse -Force
```

2. **Clear cache**:
```javascript
// Ask users to clear cache or force refresh
// Ctrl+Shift+R (Windows/Linux)
// Cmd+Shift+R (Mac)
```

3. **Revert configuration**:
```javascript
// Restore previous app.config.js
```

### Data Rollback

If using database:
```sql
-- Restore from backup
RESTORE DATABASE PhotoOrders FROM DISK = 'backup_file.bak';
```

---

## Monitoring & Maintenance

### Set Up Monitoring

1. **Google Analytics** (optional):
```html
<!-- Add to app-production.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

2. **Error Tracking** (Sentry example):
```html
<script src="https://js.sentry.io/bundle.js"></script>
<script>
  if (AppConfig.app.environment === 'production') {
    Sentry.init({ dsn: 'your-sentry-dsn' });
  }
</script>
```

3. **Performance Monitoring**:
```javascript
// Add to app.main.js
if (AppConfig.app.environment === 'production') {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime, 'ms');
        // Send to analytics
    });
}
```

### Regular Maintenance

- **Weekly**: Review error logs
- **Monthly**: Security updates, performance review
- **Quarterly**: Feature updates, user feedback implementation
- **Annually**: Major version updates, technology stack review

---

## Support & Troubleshooting

### Common Deployment Issues

**Issue**: White screen after deployment
- **Solution**: Check browser console, verify all file paths, check CSP headers

**Issue**: API calls failing
- **Solution**: Verify CORS settings, check API endpoint configuration, verify SSL certificates

**Issue**: Authentication not working
- **Solution**: Check session storage, verify auth.enabled setting, check cookie settings

**Issue**: Slow performance
- **Solution**: Enable caching, minify assets, use CDN for static files, optimize images

---

## 🎉 Deployment Complete!

Your Photo Order Management System is now deployed and ready for use!

**Next Steps**:
1. Monitor initial usage
2. Gather user feedback
3. Plan feature enhancements
4. Regular security updates

**Need Help?**
- Review `README-PRODUCTION.md`
- Check browser console
- Review server logs
- Contact development team

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Deployment Status**: ✅ Production Ready
