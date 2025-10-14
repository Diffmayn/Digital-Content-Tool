# Enterprise Content Order Management System

## 🎯 Overview

A comprehensive web-based application for managing photography orders, assignments, and content delivery for enterprise organizations. The system supports multiple user roles with specific permissions and workflows.

## 🚀 Features

### Multi-Role Authentication System
- **Admin** - Full system access with user and order management
- **Promo Coordinator** - Manage orders for specific purchase groups
- **Photographer (M&B)** - View assigned orders and upload images
- **Agency User** - Create and manage creative briefs
- **Marketing User** - Read-only access to all orders

### Core Functionality

#### For All Users
- Dashboard with real-time metrics
- Advanced search across all fields
- Multi-column filtering (status, photographer, priority, date range)
- Sortable data tables with pagination
- Export functionality (CSV)
- Responsive design

#### For Administrators
- Full CRUD operations on all orders
- User management capabilities
- Access to all purchase groups
- System-wide analytics

#### For Promo Coordinators
- View and manage orders for assigned purchase groups only
- Sample management and tracking
- Order creation and editing
- Barcode scanning for physical samples
- Purchase group filtering (100, 200, 300 OR 400, 500, 600)

#### For Photographers (M&B Studio)
- View orders assigned to M&B photographer
- Upload images for orders
- Update delivery status
- Add delivery notes
- Track completed work

#### For Agency Users
- View all orders (read-only)
- Create and attach creative briefs to orders
- Specify photography requirements
- Add styling and post-production notes
- Set brief priority levels

#### For Marketing Users
- Read-only access to all orders
- View order details and status
- Export reports

### Sample Management System
- Barcode scanning for physical article tracking
- Automatic workflow progression:
  - Sent to Photographer → Received → Returned to HQ
- Real-time location tracking
- Scan history with export capability
- Daily statistics dashboard

## 📁 File Structure

```
Testing Front ends/
├── login.html              # Authentication page
├── login.css               # Login page styling
├── login.js                # Login logic
├── auth.js                 # Authentication service & user management
├── app.html                # Main application interface
├── app.css                 # Enterprise app specific styles
├── app.js                  # Main application logic
├── api.js                  # API simulation layer (localStorage)
├── efficient-pro.css       # Base component styles
├── index.html              # Original theme comparison (legacy)
├── efficient-pro.html      # Original single-page app (legacy)
├── efficient-pro.js        # Original app logic (legacy)
└── README.md               # This file
```

## 🔑 Demo Accounts

### Administrator
- **Username:** `admin`
- **Password:** `admin123`
- **Access:** Full system control, all purchase groups

### Promo Coordinator 1
- **Username:** `coord1`
- **Password:** `coord123`
- **Access:** Purchase Groups 100, 200, 300

### Promo Coordinator 2
- **Username:** `coord2`
- **Password:** `coord123`
- **Access:** Purchase Groups 400, 500, 600

### Photographer (M&B)
- **Username:** `photographer`
- **Password:** `photo123`
- **Access:** Orders assigned to M&B photographer

### Agency User
- **Username:** `agency`
- **Password:** `agency123`
- **Access:** All orders (read) + brief management

### Marketing User
- **Username:** `marketing`
- **Password:** `market123`
- **Access:** All orders (read-only)

## 🛠️ Installation & Setup

1. **Clone or download the files** to your local machine

2. **Open with Live Server:**
   - Right-click `login.html` in VS Code
   - Select "Open with Live Server"
   - Or click the "Go Live" button in the status bar

3. **Login:**
   - The application will open to `login.html`
   - Use any of the demo accounts above
   - Click on a demo account card to auto-fill credentials

## 💻 Technical Architecture

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox/grid
- **Vanilla JavaScript** - No framework dependencies
- **ES6+** - Modern JavaScript features

### Data Persistence
- **localStorage** - Browser-based data storage
- Simulated REST API with async/await
- Session management
- Persistent login state

### Security Features
- Role-based access control (RBAC)
- Permission-based UI rendering
- Session validation
- Secure password handling (demo purposes only)

## 📊 Data Model

### User Object
```javascript
{
  username: string,
  password: string,
  role: string,
  name: string,
  email: string,
  permissions: string[],
  purchaseGroups: string[],
  photographerCode?: string
}
```

### Order Object (27 fields)
```javascript
{
  id: string,
  orderNumber: string,
  offerID: string,
  articleNumber: number,
  articleName: string,
  purchasingGroup: string,
  department: string,
  photographer: string,
  studio: string,
  page: number,
  priority: string,
  status: string,
  orderDate: ISO date,
  shootDate: ISO date,
  deadline: ISO date,
  daysRemaining: number,
  cost: number,
  contactPerson: string,
  contactDetails: string,
  activityCode: string,
  sampleReceived: string,
  envFile: string,
  notes: string,
  alert: string,
  hasImages: boolean,
  imageCount: number,
  createdBy: string,
  createdAt: ISO date,
  updatedAt: ISO date
}
```

## 🎨 UI/UX Features

### Responsive Design
- Works on desktop, tablet, and mobile
- Adaptive layouts
- Touch-friendly controls

### Visual Feedback
- Color-coded status badges
- Alert indicators (🔴🟡🟢)
- Loading states
- Success/error messages
- Hover effects

### Keyboard Shortcuts
- `Ctrl/Cmd + K` - Focus search
- `Ctrl/Cmd + M` - Open sample management
- `Escape` - Close modals

## 🔒 Permission System

### Permission Types
- `read` - View orders and data
- `write` - Create and edit orders
- `delete` - Remove orders
- `manage_users` - User administration
- `manage_orders` - Full order management
- `manage_settings` - System configuration
- `upload_images` - Upload photography
- `update_status` - Modify order status
- `write_briefs` - Create briefs
- `manage_briefs` - Edit/delete briefs

## 📈 Future Enhancements

### Phase 2 (Planned)
- Real backend API integration
- Database persistence (PostgreSQL/MongoDB)
- Image upload with cloud storage (AWS S3/Azure Blob)
- Real-time notifications (WebSocket)
- Email notifications
- Advanced analytics dashboard
- Audit logs
- Batch operations
- Calendar integration
- Mobile app (React Native)

### Phase 3 (Planned)
- AI-powered image analysis
- Automated quality checks
- Workflow automation
- Integration with DAM systems
- Advanced reporting
- Multi-language support
- Dark mode
- Accessibility enhancements (WCAG 2.1 AA)

## 🐛 Known Issues

1. **Inline styles** - Some inline styles used for dynamic content (non-critical)
2. **Form labels** - Some form elements need ARIA labels for accessibility
3. **localStorage limits** - Browser storage limits apply (5-10MB)
4. **Image previews** - Currently using placeholder service
5. **File uploads** - Simulated, not actual file handling

## 📝 Development Notes

### Adding New Roles
1. Add role definition to `ROLES` object in `auth.js`
2. Create user entry in `USERS` object
3. Add role-specific CSS classes in `app.css`
4. Update permission checks in `app.js`
5. Add role-specific UI elements in `app.html`

### Adding New Permissions
1. Add permission to user object in `auth.js`
2. Add permission check in `authService.hasPermission()`
3. Add `data-permission` attribute to UI elements
4. Implement permission logic in relevant functions

### Customizing Purchase Groups
- Update `purchaseGroups` array in user definitions
- Modify coordinator assignments
- Update filter dropdown options

## 🤝 Contributing

This is an enterprise application built for internal use. For modifications:
1. Test all role-based scenarios
2. Maintain permission consistency
3. Update README for any new features
4. Preserve backward compatibility

## 📄 License

Proprietary - Internal Use Only

## 👥 Support

For questions or issues:
- Contact: IT Support Team
- Email: support@company.com
- Internal Wiki: [Link to documentation]

---

**Version:** 1.0.0  
**Last Updated:** October 14, 2025  
**Built with:** ❤️ for efficient content management
