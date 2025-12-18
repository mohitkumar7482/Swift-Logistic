# Swift Logistics Courier Management System
## Complete Project Documentation

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Installation & Setup](#installation--setup)
5. [Database Schema](#database-schema)
6. [Authentication & Security](#authentication--security)
7. [Frontend Architecture](#frontend-architecture)
8. [API Documentation](#api-documentation)
9. [Component Reference](#component-reference)
10. [User Workflows](#user-workflows)
11. [Development Guide](#development-guide)
12. [Deployment](#deployment)
13. [Performance Optimization](#performance-optimization)
14. [Security Best Practices](#security-best-practices)
15. [Testing & Quality Assurance](#testing--quality-assurance)
16. [Troubleshooting](#troubleshooting)
17. [Configuration](#configuration)
18. [API Integration](#api-integration)
19. [Maintenance & Monitoring](#maintenance--monitoring)
20. [References & Resources](#references--resources)

---

## 1. Project Overview

### 1.1 Introduction

Swift Logistics is a comprehensive courier management system designed to streamline shipment tracking, customer management, and delivery coordination. The application provides a complete solution for customers to manage their shipments, track deliveries in real-time, and access detailed shipping information.

### 1.2 Core Features

- **Shipment Management**: Create, track, and manage shipments with real-time status updates
- **User Authentication**: Secure email/password authentication with JWT token management
- **Real-time Tracking**: Public tracking without authentication for shipment visibility
- **Customer Dashboard**: Comprehensive dashboard for viewing shipment history and statistics
- **Contact Management**: Customer inquiry system for support requests
- **Courier Management**: Backend support for courier assignment and management
- **Responsive Design**: Mobile-first responsive UI with Tailwind CSS

### 1.3 Target Users

- **Customers**: Individual users sending and tracking parcels
- **Couriers**: Delivery personnel managing assigned shipments
- **Administrators**: System administrators managing overall operations

### 1.4 Success Criteria

- Fast load times and responsive performance
- Secure authentication and data protection
- Intuitive user interface requiring minimal training
- Scalable architecture supporting growth
- 99.9% system uptime
- Support for concurrent users

---

## 2. System Architecture

### 2.1 High-Level Architecture

The Swift Logistics system follows a three-tier architecture:

```
Presentation Layer (React)
    |
API Gateway (Supabase)
    |
Data Layer (PostgreSQL)
```

### 2.2 Architecture Components

#### Frontend (Presentation Layer)
- React 18.3 with TypeScript
- Vite build tool for rapid development
- Tailwind CSS for styling
- Lucide React for icons
- Client-side routing and state management

#### API Layer
- Supabase JavaScript client (@supabase/supabase-js)
- RESTful API through Supabase
- Real-time subscriptions (if enabled)
- Authentication middleware

#### Backend (Data Layer)
- PostgreSQL database hosted on Supabase
- Row Level Security (RLS) policies
- Stored procedures and functions
- Automatic backups and recovery

### 2.3 Architecture Diagram

```
┌─────────────────────────────────────┐
│      User Interface (React)         │
│  Components & Pages & Navigation    │
└────────────────┬────────────────────┘
                 │
┌────────────────┴────────────────────┐
│    Supabase Client Library          │
│  Authentication | Queries | Updates │
└────────────────┬────────────────────┘
                 │
┌────────────────┴────────────────────┐
│    Supabase Backend                 │
│  RLS | Auth | API | Database        │
└────────────────┬────────────────────┘
                 │
┌────────────────┴────────────────────┐
│    PostgreSQL Database              │
│  Tables | Indexes | Triggers        │
└─────────────────────────────────────┘
```

### 2.4 Data Flow

1. User interacts with React component
2. Component dispatches action (form submission, button click)
3. Supabase client prepares request with authentication
4. Request sent to Supabase API
5. RLS policies evaluate access rights
6. Database operation executed
7. Results returned to client
8. Component state updated
9. UI re-renders with new data

---

## 3. Technology Stack

### 3.1 Frontend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3.1 | UI library and component framework |
| TypeScript | 5.5.3 | Type safety and development experience |
| Vite | 5.4.2 | Build tool and dev server |
| Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| Lucide React | 0.344.0 | Icon library |

### 3.2 Backend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| Supabase | 2.57.4 | Backend-as-a-Service platform |
| PostgreSQL | Latest | Relational database |
| JWT | Built-in | Token-based authentication |

### 3.3 Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code quality and linting |
| TypeScript Compiler | Type checking |
| Node.js | Runtime environment |
| npm | Package management |

### 3.4 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 4. Installation & Setup

### 4.1 Prerequisites

Before starting, ensure you have:
- Node.js version 16 or higher
- npm version 7 or higher
- Git for version control
- Supabase account (free tier available)
- Code editor (VS Code recommended)

### 4.2 Supabase Setup

1. Go to https://supabase.com
2. Create a new project
3. Wait for project initialization
4. Navigate to Project Settings > API
5. Copy your project URL and anon key
6. Note your service role key for backend operations

### 4.3 Local Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd project

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Add Supabase credentials to .env.local
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# 5. Start development server
npm run dev

# 6. Open browser to http://localhost:5173
```

### 4.4 Environment Variables

```
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_ANON_KEY=[anon-key-from-supabase]
```

These variables are:
- **VITE_SUPABASE_URL**: Your Supabase project endpoint
- **VITE_SUPABASE_ANON_KEY**: Public key for unauthenticated requests

### 4.5 Database Migration

The database schema is automatically initialized through the migration file. To manually verify:

1. Go to Supabase dashboard
2. Navigate to SQL Editor
3. Run the migration from `supabase/migrations/20251104180048_create_courier_management_schema.sql`

---

## 5. Database Schema

### 5.1 Tables Overview

The database consists of 5 main tables:

1. **customers** - Customer information linked to auth users
2. **couriers** - Delivery personnel profiles
3. **shipments** - Shipment tracking and details
4. **tracking_events** - Historical tracking updates
5. **contact_messages** - Customer support inquiries

### 5.2 Customers Table

```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**Purpose**: Stores customer information and links to authentication users

**Columns**:
- `id`: Unique customer identifier
- `user_id`: Reference to Supabase auth user
- `full_name`: Customer's full name
- `email`: Contact email address
- `phone`: Contact phone number
- `address`: Customer's physical address
- `created_at`: Account creation timestamp

### 5.3 Couriers Table

```sql
CREATE TABLE couriers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  license_number TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**Purpose**: Manages delivery personnel and their assignments

**Columns**:
- `id`: Unique courier identifier
- `user_id`: Reference to authentication user
- `full_name`: Courier's full name
- `email`: Work email
- `phone`: Contact number
- `vehicle_type`: Type of delivery vehicle
- `license_number`: Vehicle/driver license
- `status`: Current status (active, inactive, on_delivery)
- `created_at`: Record creation date

### 5.4 Shipments Table

```sql
CREATE TABLE shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id),
  courier_id UUID REFERENCES couriers(id),
  sender_name TEXT NOT NULL,
  sender_phone TEXT NOT NULL,
  sender_address TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  recipient_phone TEXT NOT NULL,
  recipient_address TEXT NOT NULL,
  package_weight NUMERIC NOT NULL,
  package_dimensions TEXT NOT NULL,
  service_type TEXT DEFAULT 'standard',
  status TEXT DEFAULT 'pending',
  estimated_delivery TIMESTAMPTZ,
  actual_delivery TIMESTAMPTZ,
  price NUMERIC NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

**Purpose**: Core shipment tracking and management

**Service Types**:
- `standard`: Regular delivery (5 days, $10)
- `express`: Fast delivery (1 day, $25)
- `overnight`: Same-day delivery (same day, $40)

**Status Values**:
- `pending`: Awaiting pickup
- `in_transit`: On the way
- `out_for_delivery`: Out for delivery today
- `delivered`: Successfully delivered

### 5.5 Tracking Events Table

```sql
CREATE TABLE tracking_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID REFERENCES shipments(id),
  status TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**Purpose**: Maintains detailed tracking history for each shipment

### 5.6 Contact Messages Table

```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**Purpose**: Stores customer inquiries and support requests

### 5.7 Database Indexes

Performance indexes are created on frequently queried columns:

```sql
CREATE INDEX idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX idx_shipments_customer_id ON shipments(customer_id);
CREATE INDEX idx_shipments_courier_id ON shipments(courier_id);
CREATE INDEX idx_shipments_status ON shipments(status);
CREATE INDEX idx_tracking_events_shipment_id ON tracking_events(shipment_id);
CREATE INDEX idx_customers_user_id ON customers(user_id);
CREATE INDEX idx_couriers_user_id ON couriers(user_id);
```

---

## 6. Authentication & Security

### 6.1 Authentication System

Swift Logistics uses Supabase's email/password authentication system:

- **Method**: Email and password credentials
- **Token Type**: JWT (JSON Web Tokens)
- **Session Storage**: Browser localStorage
- **Token Expiry**: 60 minutes (auto-refresh available)

### 6.2 Authentication Flow

#### User Registration

```
1. User visits app
2. Clicks "Sign Up" button
3. Enters email and password
4. Form validation (client-side)
5. POST request to Supabase Auth
6. Supabase validates email format
7. Checks email uniqueness
8. Hashes password with bcrypt
9. Creates auth.users record
10. Returns JWT token
11. Token stored in localStorage
12. User redirected to Dashboard
13. Customer profile auto-created
```

#### User Login

```
1. User enters email and password
2. Client-side form validation
3. POST request to Supabase Auth
4. Credentials validated against auth.users
5. Password hash verified
6. JWT token generated and returned
7. Token stored in localStorage
8. Auth state updated in React Context
9. User redirected to Dashboard
```

#### Protected Operations

```
1. User takes action (create shipment, etc.)
2. React component includes JWT in request
3. Supabase API receives request with token
4. Token signature validated
5. User ID extracted from token
6. RLS policies evaluated
7. Database operation executed (if allowed)
8. Results returned to client
```

### 6.3 Row Level Security (RLS)

RLS policies enforce data access at the database level:

#### Customers Policies

```sql
-- Customers can view their own profile
CREATE POLICY "Users can view own customer profile"
  ON customers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Customers can update their own profile
CREATE POLICY "Users can update own customer profile"
  ON customers FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

#### Shipments Policies

```sql
-- Customers see only their own shipments
CREATE POLICY "Customers can view own shipments"
  ON shipments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM customers
      WHERE customers.id = shipments.customer_id
      AND customers.user_id = auth.uid()
    )
  );

-- Public can track by tracking number
CREATE POLICY "Public can track shipments by tracking number"
  ON shipments FOR SELECT
  TO anon
  USING (tracking_number IS NOT NULL);
```

### 6.4 Security Best Practices

1. **Environment Variables**: Never commit secrets to repository
2. **HTTPS**: Always use HTTPS in production
3. **Password Requirements**: Enforce strong passwords (minimum 8 characters)
4. **Session Management**: Automatic logout on token expiry
5. **Input Validation**: Validate on both client and server
6. **SQL Injection Prevention**: Use parameterized queries (Supabase handles this)
7. **XSS Prevention**: React automatically escapes content
8. **CORS**: Properly configured for Supabase requests

### 6.5 Data Protection

- All passwords hashed with bcrypt before storage
- Data encrypted in transit (HTTPS/TLS)
- Data at rest encrypted by Supabase
- Regular backups (automatic via Supabase)
- RLS prevents unauthorized data access
- Audit logs for sensitive operations

---

## 7. Frontend Architecture

### 7.1 Project Structure

```
src/
├── App.tsx                    # Root component and routing
├── main.tsx                   # Application entry point
├── index.css                  # Global styles
├── components/
│   └── Layout.tsx             # Header, footer, navigation
├── contexts/
│   └── AuthContext.tsx        # Global auth state management
├── lib/
│   └── supabase.ts            # Supabase client initialization
└── pages/
    ├── Home.tsx               # Landing page
    ├── Login.tsx              # Authentication page
    ├── Dashboard.tsx          # Protected shipment dashboard
    ├── Track.tsx              # Public tracking page
    ├── Services.tsx           # Services information
    └── Contact.tsx            # Contact form page
```

### 7.2 React Components

#### App.tsx - Root Component

```typescript
// Entry point for the application
// Handles main routing and page switching
// Manages authentication state loading
```

**Key Responsibilities**:
- Provides AuthContext to entire app
- Routes between pages based on user state
- Handles loading states
- Manages page transitions

#### Layout.tsx - Main Layout

```typescript
// Wraps all pages with navigation and footer
// Provides consistent header across pages
```

**Key Responsibilities**:
- Renders navigation header
- Renders footer
- Manages navigation state
- Responsive menu for mobile

#### AuthContext.tsx - Authentication Management

```typescript
// Global context for authentication state
// Handles user session management
```

**Key Responsibilities**:
- Stores user session data
- Manages auth state changes
- Provides login/logout functions
- Handles token refresh

#### Page Components

**Home.tsx**: Landing page with features and CTA
**Login.tsx**: Registration and login forms
**Dashboard.tsx**: Protected shipment management (largest component)
**Track.tsx**: Public shipment tracking
**Services.tsx**: Service offerings information
**Contact.tsx**: Contact form for inquiries

### 7.3 Component Patterns

#### Functional Components

All components are functional components using React Hooks:

```typescript
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  const { user } = useAuth();

  useEffect(() => {
    // Side effects here
  }, [dependencies]);

  return <div>Component content</div>;
};
```

#### Custom Hooks

The application uses custom hooks from React Context:

```typescript
// Usage in components
const { user, loading, logout } = useAuth();
```

#### State Management

- **Local State**: Component-level with useState
- **Global State**: Auth context for authentication
- **Server State**: Supabase queries for database data

### 7.4 Styling Approach

- **Framework**: Tailwind CSS utility classes
- **No CSS Files**: All styling through Tailwind classes
- **Responsive Design**: Mobile-first approach with breakpoints
- **Color Scheme**: Blue primary with slate neutrals
- **Icon Library**: Lucide React for SVG icons

### 7.5 Forms and Validation

#### Client-Side Validation

```typescript
// Form validation before submission
const validateForm = (formData) => {
  if (!formData.email) return "Email required";
  if (!formData.email.includes("@")) return "Invalid email";
  if (formData.password.length < 8) return "Password too short";
  return null;
};
```

#### Form Submission Flow

1. User enters data
2. Client-side validation runs
3. If valid, submit to Supabase
4. Handle response or error
5. Show success/error message
6. Update component state

---

## 8. API Documentation

### 8.1 Supabase Client API

The application communicates with Supabase through the official JavaScript client library.

### 8.2 Authentication Endpoints

#### Sign Up

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securePassword123'
});
```

**Response**:
```json
{
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "created_at": "2024-01-01T00:00:00Z"
    },
    "session": {
      "access_token": "jwt-token",
      "refresh_token": "refresh-token",
      "expires_in": 3600
    }
  },
  "error": null
}
```

#### Sign In

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securePassword123'
});
```

#### Sign Out

```typescript
const { error } = await supabase.auth.signOut();
```

### 8.3 Database Queries

#### Query Shipments

```typescript
const { data, error } = await supabase
  .from('shipments')
  .select('*')
  .eq('customer_id', customerId)
  .order('created_at', { ascending: false });
```

**Response**:
```json
{
  "data": [
    {
      "id": "shipment-uuid",
      "tracking_number": "SW123456789",
      "status": "in_transit",
      "recipient_name": "John Doe",
      "price": 25.00,
      "estimated_delivery": "2024-01-05T00:00:00Z"
    }
  ],
  "error": null
}
```

#### Create Shipment

```typescript
const { data, error } = await supabase
  .from('shipments')
  .insert([{
    tracking_number: 'SW' + Date.now(),
    customer_id: customerId,
    sender_name: 'Jane Doe',
    recipient_name: 'John Doe',
    recipient_address: '123 Main St',
    package_weight: 2.5,
    package_dimensions: '30x20x15',
    service_type: 'express',
    status: 'pending',
    price: 25.00,
    estimated_delivery: new Date()
  }])
  .select();
```

#### Get Tracking Events

```typescript
const { data, error } = await supabase
  .from('tracking_events')
  .select('*')
  .eq('shipment_id', shipmentId)
  .order('created_at', { ascending: false });
```

### 8.4 Error Handling

All API calls include error handling:

```typescript
try {
  const { data, error } = await supabase
    .from('shipments')
    .select('*');

  if (error) {
    console.error('Query error:', error.message);
    // Handle error
  } else {
    // Process data
  }
} catch (err) {
  console.error('Unexpected error:', err);
  // Handle unexpected error
}
```

### 8.5 Rate Limiting

Supabase applies rate limiting:
- Free tier: 250,000 requests per day
- Production: Contact Supabase for enterprise limits
- Recommended: Implement client-side caching to reduce requests

---

## 9. Component Reference

### 9.1 Dashboard Component

The Dashboard is the most complex component, handling:
- Shipment listing
- Statistics display
- Create shipment modal
- Real-time updates

```typescript
interface Shipment {
  id: string;
  tracking_number: string;
  status: string;
  recipient_name: string;
  recipient_address: string;
  estimated_delivery: string | null;
  price: number;
  created_at: string;
}
```

**Features**:
- Load shipments from Supabase
- Filter by status
- Sort by date
- Create new shipments
- Display statistics

### 9.2 CreateShipmentModal Component

Modal dialog for creating new shipments:

```typescript
interface CreateShipmentModalProps {
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
}
```

**Form Sections**:
1. Sender Information (name, phone, address)
2. Recipient Information (name, phone, address)
3. Package Details (weight, dimensions)
4. Service Type (standard, express, overnight)
5. Additional Notes (optional)

### 9.3 Login Component

Authentication form with two modes:

**Login Mode**:
- Email input
- Password input
- Login button
- Link to sign up

**Sign Up Mode**:
- Full name input
- Email input
- Password input
- Confirm password
- Terms agreement
- Sign up button

### 9.4 Track Component

Public tracking page:

```typescript
// Features:
// - Enter tracking number
// - Display shipment details
// - Show tracking events timeline
// - No authentication required
```

### 9.5 Layout Component

Main layout wrapper:

```typescript
interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}
```

**Includes**:
- Navigation header with logo
- Active page indicator
- User menu (if logged in)
- Footer with links

---

## 10. User Workflows

### 10.1 Customer Registration Workflow

```
1. Visit application
2. Click "Sign Up" link
3. Enter email and password
4. Accept terms and conditions
5. Click "Create Account"
6. Account created in Supabase
7. JWT token returned and stored
8. Redirected to Dashboard
9. Customer profile created
10. Can now create shipments
```

### 10.2 Create Shipment Workflow

```
1. Customer logged in on Dashboard
2. Click "New Shipment" button
3. Modal opens with form
4. Fill sender information
5. Fill recipient information
6. Enter package details
7. Select service type
8. Add optional notes
9. Click "Create Shipment"
10. Shipment inserted to database
11. Tracking number generated
12. Shipment appears in list
13. Customer can now track
```

### 10.3 Track Shipment Workflow

```
1. Customer receives tracking number
2. Visit application
3. Navigate to Track page
4. Enter tracking number
5. Submit search
6. Shipment details displayed
7. Tracking events shown
8. Real-time updates reflected
9. Estimated delivery shown
```

### 10.4 Customer Support Workflow

```
1. Customer has inquiry
2. Navigate to Contact page
3. Fill contact form
4. Submit inquiry
5. Message stored in database
6. Support team reviews
7. Response sent to email
8. Customer can track status
```

---

## 11. Development Guide

### 11.1 Setting Up Development Environment

#### Prerequisites Installation

```bash
# Install Node.js (LTS recommended)
# Visit https://nodejs.org

# Verify installation
node --version  # v18.0.0+
npm --version   # v9.0.0+
```

#### IDE Setup

**Visual Studio Code** (recommended):
1. Download from https://code.visualstudio.com
2. Install extensions:
   - ES7+ React/Redux/React-Native snippets
   - TypeScript Vue Plugin
   - Tailwind CSS IntelliSense
   - Prettier - Code formatter
   - ESLint

### 11.2 Code Standards

#### TypeScript Usage

```typescript
// Always define types for function parameters
const getUserShipments = async (userId: string): Promise<Shipment[]> => {
  // Implementation
};

// Use interfaces for complex objects
interface Shipment {
  id: string;
  tracking_number: string;
  status: ShipmentStatus;
  price: number;
}

// Define enums for fixed values
enum ShipmentStatus {
  PENDING = 'pending',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered'
}
```

#### Component Structure

```typescript
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ComponentProps {
  prop1: string;
  prop2?: number;
}

const MyComponent: React.FC<ComponentProps> = ({ prop1, prop2 = 0 }) => {
  const { user } = useAuth();
  const [state, setState] = useState<string>('');

  useEffect(() => {
    // Effect code
  }, []);

  return (
    <div className="p-4">
      {/* Component content */}
    </div>
  );
};

export default MyComponent;
```

#### CSS/Tailwind Practices

```typescript
// Use utility classes for styling
<div className="bg-white rounded-lg shadow-md p-6 mb-4">
  <h2 className="text-2xl font-bold text-slate-900 mb-2">Title</h2>
  <p className="text-slate-600">Content</p>
</div>

// Responsive design with breakpoints
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Content */}
</div>
```

### 11.3 Common Development Tasks

#### Adding a New Page

1. Create component in `src/pages/NewPage.tsx`
2. Import in `App.tsx`
3. Add route case in renderPage switch
4. Add navigation link in Layout

#### Adding a New Database Query

1. Create query in component or custom hook
2. Use Supabase client
3. Handle loading state
4. Handle error state
5. Update component state with data

#### Adding a New Component

1. Create file in `src/components/`
2. Define TypeScript interfaces for props
3. Implement component with proper types
4. Export as default export
5. Import in parent component

### 11.4 Testing Components Locally

```bash
# Start development server
npm run dev

# Open http://localhost:5173

# Test in browser with different screen sizes
# Chrome DevTools: Toggle device toolbar (Ctrl+Shift+M)

# Check console for errors
# Open DevTools (F12)
```

### 11.5 Debugging

```typescript
// Use console logs for debugging
console.log('Data:', data);
console.error('Error:', error);

// Browser DevTools
// - Set breakpoints
// - Step through code
// - Inspect element
// - Monitor network requests
```

---

## 12. Deployment

### 12.1 Production Build

```bash
# Build for production
npm run build

# This creates optimized bundle in dist/ folder
# Includes:
# - Minified JavaScript
# - Optimized CSS
# - Tree-shaken dependencies
# - Source maps (optional)
```

### 12.2 Deployment Platforms

#### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
vercel

# Follow prompts to configure
# Automatic deployments on git push
```

#### Option 2: Netlify

```bash
# Deploy using Netlify CLI
npm install -g netlify-cli

# Authenticate and deploy
netlify deploy --prod --dir=dist

# Or connect git repository for auto-deploys
```

#### Option 3: Traditional Server

```bash
# Build
npm run build

# Upload dist/ folder to server
# Configure web server (nginx/Apache) to serve dist/index.html

# nginx configuration example:
# location / {
#   try_files $uri $uri/ /index.html;
# }
```

### 12.3 Environment Variables in Production

```
VITE_SUPABASE_URL=https://project.supabase.co
VITE_SUPABASE_ANON_KEY=project-anon-key
```

**Important**: Set these in deployment platform's environment variables, not in code.

### 12.4 Performance Optimization

- Static site generation where possible
- Image optimization
- Code splitting
- Lazy loading of routes
- CDN distribution
- Browser caching headers

### 12.5 Monitoring & Analytics

- Set up error tracking (Sentry)
- Monitor performance (Web Vitals)
- Track user analytics
- Monitor database performance
- Set up uptime alerts

---

## 13. Performance Optimization

### 13.1 Code Splitting

React components are loaded on-demand:

```typescript
// Dynamic imports for route-based code splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
```

### 13.2 Caching Strategy

- Browser cache: Index assets with hash names
- Supabase query cache: Minimize repeated queries
- Service worker: Optional for offline support

### 13.3 Image Optimization

```typescript
// Use optimized image formats
// - WebP for modern browsers
// - JPEG/PNG as fallback
// Lazy load images below the fold
```

### 13.4 Bundle Size Analysis

```bash
# Check bundle size
npm run build

# Review what contributes to bundle
# Remove unused dependencies
# Use tree-shaking to remove unused code
```

### 13.5 Performance Metrics

Target metrics:
- First Contentful Paint (FCP): < 2 seconds
- Largest Contentful Paint (LCP): < 2.5 seconds
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5 seconds

---

## 14. Security Best Practices

### 14.1 Secret Management

```bash
# NEVER commit secrets to repository
# Use environment variables for sensitive data
# Example: VITE_SUPABASE_ANON_KEY

# .gitignore should include:
.env
.env.local
.env.*.local
node_modules/
```

### 14.2 Input Validation

```typescript
// Validate input on frontend
const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Always validate on backend too (done by Supabase)
```

### 14.3 Authentication Security

- HTTPS required in production
- Strong password requirements (8+ characters)
- Secure token storage (localStorage is acceptable with https)
- Automatic session timeout
- Password reset flow with email verification

### 14.4 SQL Injection Prevention

Supabase client library prevents SQL injection:

```typescript
// Safe - parameterized query
.eq('customer_id', customerId)

// Not used - SQL string concatenation
// Avoid this pattern
```

### 14.5 XSS Prevention

React automatically escapes values:

```typescript
// Safe - React escapes values
<div>{userInput}</div>

// Dangerous - should be avoided
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

### 14.6 CORS Configuration

CORS is handled by Supabase automatically for allowed origins.

---

## 15. Testing & Quality Assurance

### 15.1 Code Quality

```bash
# Run linter
npm run lint

# Check TypeScript types
npm run typecheck

# Format code
npm run format
```

### 15.2 Manual Testing Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Create shipment flow
- [ ] View shipments list
- [ ] Track shipment by number
- [ ] Contact form submission
- [ ] Responsive on mobile
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Navigation works
- [ ] Logout works
- [ ] Protected routes work

### 15.3 Browser Testing

Test on:
- Chrome (desktop and mobile)
- Firefox (desktop and mobile)
- Safari (desktop and mobile)
- Edge (desktop)

### 15.4 Performance Testing

```bash
# Use Lighthouse in Chrome DevTools
# Audit for:
# - Performance
# - Accessibility
# - Best Practices
# - SEO
```

---

## 16. Troubleshooting

### 16.1 Common Issues

#### Issue: "Cannot find module" errors

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Supabase connection fails

**Solution**:
1. Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
2. Check internet connection
3. Verify Supabase project is running
4. Check browser console for specific errors

#### Issue: Authentication not working

**Solution**:
1. Clear browser localStorage: `localStorage.clear()`
2. Hard refresh browser: Ctrl+Shift+R
3. Check VITE_SUPABASE_ANON_KEY has correct permissions
4. Verify email format is valid

#### Issue: Build fails

**Solution**:
```bash
# Check TypeScript errors
npm run typecheck

# Check for syntax errors
npm run lint

# Ensure all dependencies installed
npm install

# Clear build cache
rm -rf dist/
npm run build
```

#### Issue: Slow performance

**Solution**:
1. Check network tab in DevTools
2. Look for large assets
3. Verify Supabase queries are optimized
4. Consider implementing pagination

### 16.2 Debugging Techniques

#### Browser DevTools

```javascript
// Check user auth state
localStorage.getItem('supabase.auth.token')

// Check database queries in Network tab
// Look for POST requests to supabase.co
```

#### Console Logging

```typescript
// Add debug logs
console.log('Current state:', state);
console.error('Error details:', error);
```

---

## 17. Configuration

### 17.1 Tailwind CSS Configuration

Located in `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 17.2 Vite Configuration

Located in `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### 17.3 TypeScript Configuration

Located in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "strict": true
  }
}
```

---

## 18. API Integration

### 18.1 Third-Party API Integration

To integrate external APIs:

1. **Add environment variable** for API key
2. **Create API client** module
3. **Implement error handling**
4. **Cache responses** when appropriate
5. **Document API changes**

### 18.2 Webhook Integration

For receiving events from external services:

1. Create endpoint to receive webhooks
2. Validate webhook signature
3. Process webhook data
4. Update database accordingly
5. Send confirmation response

### 18.3 Payment Gateway Integration

If adding payments in future:

1. Choose provider (Stripe, PayPal)
2. Install SDK
3. Implement payment form
4. Handle payment confirmation
5. Update order status
6. Send confirmation email

---

## 19. Maintenance & Monitoring

### 19.1 Regular Maintenance Tasks

**Daily**:
- Monitor system errors
- Check database performance
- Review user feedback

**Weekly**:
- Backup verification
- Security audit logs
- Performance metrics review

**Monthly**:
- Dependency updates
- Security patches
- Database optimization
- User analytics review

### 19.2 Database Maintenance

```sql
-- Optimize indexes
REINDEX INDEX idx_shipments_customer_id;

-- Check table size
SELECT pg_size_pretty(pg_total_relation_size('shipments'));

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM shipments WHERE customer_id = '...';
```

### 19.3 Monitoring Tools

- Supabase Dashboard for database metrics
- Browser DevTools for frontend performance
- Sentry (or similar) for error tracking
- Google Analytics for user behavior
- Uptime monitoring service

### 19.4 Backup Strategy

- Automatic daily backups (via Supabase)
- Export critical data weekly
- Test restore procedures monthly
- Archive old backups yearly

---

## 20. References & Resources

### 20.1 Official Documentation

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)

### 20.2 Learning Resources

- React Tutorials
- TypeScript Deep Dive
- PostgreSQL Documentation
- Web Development Best Practices
- Performance Optimization Guide

### 20.3 Community Resources

- GitHub Issues
- Stack Overflow
- Discord Communities
- Reddit Communities

### 20.4 Tools & Services

| Tool | Purpose |
|------|---------|
| Supabase | Backend Platform |
| Vercel | Deployment Platform |
| GitHub | Version Control |
| VS Code | Code Editor |
| Postman | API Testing |
| Lighthouse | Performance Audit |

### 20.5 Version Information

- React: 18.3.1
- TypeScript: 5.5.3
- Vite: 5.4.2
- Tailwind CSS: 3.4.1
- Node.js: 16+ required

### 20.6 Support Channels

- Project Issues: GitHub Issues
- Supabase Support: Supabase Dashboard
- Community: Discord/Slack
- Email: support@swiftlogistics.com

---

## Conclusion

Swift Logistics is a modern, scalable courier management system built with industry best practices. This documentation provides comprehensive guidance for installation, development, deployment, and maintenance.

For updates to this documentation, please refer to the main repository and keep your local copy synchronized with the latest version.

**Last Updated**: January 2024
**Documentation Version**: 1.0
**Project Version**: 1.0.0

---

## Appendix A: Glossary

- **API**: Application Programming Interface
- **JWT**: JSON Web Token
- **RLS**: Row Level Security
- **UUID**: Universally Unique Identifier
- **HTTPS**: HyperText Transfer Protocol Secure
- **ORM**: Object-Relational Mapping
- **CORS**: Cross-Origin Resource Sharing
- **CLI**: Command Line Interface
- **CDN**: Content Delivery Network
- **XSS**: Cross-Site Scripting
- **CSRF**: Cross-Site Request Forgery

---

## Appendix B: Quick Reference

### Common Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Run code linter
npm run typecheck  # Check TypeScript types
npm install        # Install dependencies
npm update         # Update dependencies
```

### Common Queries

```typescript
// Get user shipments
const { data } = await supabase
  .from('shipments')
  .select('*')
  .eq('customer_id', customerId);

// Create new shipment
const { data } = await supabase
  .from('shipments')
  .insert([shipmentData])
  .select();

// Get tracking events
const { data } = await supabase
  .from('tracking_events')
  .select('*')
  .eq('shipment_id', shipmentId)
  .order('created_at', { ascending: false });
```

---

**End of Documentation**
