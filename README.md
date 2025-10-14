# 📸 Digital Content Tool - Photo Order Management System

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Diffmayn/Digital-Content-Tool)
[![Status](https://img.shields.io/badge/status-production--ready-success.svg)](https://github.com/Diffmayn/Digital-Content-Tool)

A professional, production-ready photo order management system with enterprise-grade architecture, authentication framework, and role-based access control.

## 🎯 Overview

This application provides a comprehensive solution for managing photo orders in professional photography studios, e-commerce operations, and marketing departments. Built with modern web technologies and a modular architecture, it's ready for immediate deployment and easy to extend.

## ✨ Key Features

### Core Functionality
- 📊 **Advanced Dashboard** - Real-time metrics and order statistics
- 🔍 **Powerful Search & Filter** - Multi-field search with advanced filtering
- 📈 **Data Export** - Export to CSV with all data fields
- 🎨 **Clean UI** - Professional, efficient table-based interface
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Optimized for large datasets with pagination

### Enterprise Features
- 🔐 **Authentication Framework** - Complete login system ready to enable
- 👥 **Role-Based Access Control** - 6 pre-configured user roles
- 🔒 **Permission System** - Granular permission controls
- 📦 **Modular Architecture** - Separated services for easy maintenance
- ⚙️ **Configuration-Driven** - Centralized settings management
- 🔄 **API-Ready** - Easy integration with backend services

### User Roles
1. **Administrator** - Full system access and user management
2. **Coordinator 1** - Purchase groups 100, 200, 300
3. **Coordinator 2** - Purchase groups 400, 500, 600
4. **Photographer** - Image upload and status updates
5. **Agency** - Brief management and content planning
6. **Marketing** - Read-only access with export capability

## 🚀 Quick Start

### Option 1: Direct Launch (Easiest)
1. Open `START.html` in your browser
2. Click "Open Application"
3. Start managing photo orders!

### Option 2: Local Server (Recommended for Development)
```bash
# Clone the repository
git clone https://github.com/Diffmayn/Digital-Content-Tool.git
cd Digital-Content-Tool

# Start a local server
python -m http.server 8000

# Open in browser
http://localhost:8000/app-production.html
```

### Option 3: Live Deployment
Deploy to any static hosting service:
- **Netlify**: Drag and drop the folder
- **Vercel**: `vercel --prod`
- **GitHub Pages**: Enable in repository settings
- **Azure Static Web Apps**: Follow deployment guide

## 📂 Project Structure

```
Digital-Content-Tool/
├── config/
│   └── app.config.js          # Central configuration
├── css/
│   └── main.css               # Main stylesheet
├── js/
│   ├── auth.service.js        # Authentication & RBAC
│   ├── api.service.js         # Data management & API
│   └── app.main.js            # Main application logic
├── app-production.html         # Main production application
├── START.html                  # Interactive quick start guide
├── login.html                  # Authentication page
├── comprehensive.html          # 30-column comprehensive view
├── efficient-pro.html          # Original efficient UI
├── README-PRODUCTION.md        # Detailed documentation
├── DEPLOYMENT.md               # Deployment guide
└── PRODUCTION-SUMMARY.md       # Feature summary
```

## 🔧 Configuration

### Enable Authentication
Edit `config/app.config.js`:
```javascript
auth: {
    enabled: true,  // Enable authentication
    sessionTimeout: 3600000,  // 1 hour
    loginPage: '/login.html',
}
```

### Configure API Integration
```javascript
api: {
    baseURL: 'https://your-api.com/api',
    endpoints: {
        orders: '/orders',
        photographers: '/photographers',
        // ... more endpoints
    }
}
```

### Switch Environments
```javascript
app: {
    environment: 'production',  // 'development' | 'staging' | 'production'
}
```

## 📊 Data Management

### Current Setup
- **Storage**: localStorage (for testing)
- **Mock Data**: 50 sample orders
- **Ready for**: REST API integration

### Data Fields (27 Columns)
Order #, Page, Offer ID, Group, Offer Name, Type, Photo Reference, File Reference, Photographer, Principle, Preview, Comments/Dialog, Alert, PM Link, Status, Cost Center, Article #, Article Name, Purchase Group, Content Type, SAM Shot Type, Activity, Combined Photo, Briefing, Sample Delivery, Deadline, Actions

## 🛠️ Development

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)
- Git (for version control)

### Browser Console Commands
```javascript
app.refresh()              // Reload data
app.exportData()           // Export to CSV
apiService.clearAllData()  // Clear all data
console.log(AppConfig)     // View configuration
console.log(app.orders)    // View loaded orders
```

## 📚 Documentation

- **[README-PRODUCTION.md](README-PRODUCTION.md)** - Complete features & configuration guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Comprehensive deployment instructions
- **[PRODUCTION-SUMMARY.md](PRODUCTION-SUMMARY.md)** - Project overview & highlights
- **[START.html](START.html)** - Interactive quick start guide

## 🚢 Deployment

### Quick Deploy Options

**Netlify**:
```bash
netlify deploy --prod
```

**Vercel**:
```bash
vercel --prod
```

**Docker**:
```bash
docker build -t photo-order-app .
docker run -p 80:80 photo-order-app
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🗺️ Roadmap

### Phase 1: Core Features ✅ (COMPLETED)
- [x] Clean table UI
- [x] Search & filter
- [x] Pagination
- [x] Export to CSV
- [x] Modular architecture
- [x] Authentication framework

### Phase 2: Enhanced Features (Planned)
- [ ] Order creation modal
- [ ] Order edit modal
- [ ] Comments/discussion system
- [ ] Brief management interface
- [ ] Image upload with preview

### Phase 3: Backend Integration (Planned)
- [ ] REST API integration
- [ ] Real authentication backend
- [ ] File upload to cloud storage
- [ ] Real-time updates (WebSocket)
- [ ] Email notifications

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Salling Group Digital Content Team**

- GitHub: [@Diffmayn](https://github.com/Diffmayn)
- Repository: [Digital-Content-Tool](https://github.com/Diffmayn/Digital-Content-Tool)

## 📞 Support

For support, please:
1. Check the [documentation](README-PRODUCTION.md)
2. Review the [deployment guide](DEPLOYMENT.md)
3. Open an issue on GitHub
4. Check browser console for errors

---

**⭐ Star this repo if you find it useful!**

Made with ❤️ by the Salling Group Digital Content Team

---

**Version**: 1.0.0  
**Status**: Production Ready  
**Last Updated**: October 2025
