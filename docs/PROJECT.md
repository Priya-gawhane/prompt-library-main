# AI Prompt Library

**Frontend Engineering Assessment | React + TypeScript**

---

# Project Description

Build an **AI Prompt Library** — a web application that allows users to create, organize, search, and manage reusable AI prompts.

The application should feature a **clean, responsive, and intuitive user interface** while demonstrating proficiency in:

- React fundamentals
- TypeScript
- Component architecture
- State management
- CRUD operations
- LocalStorage
- Backend API integration
- Performance optimization

---

# Features Required (All Mandatory)

## 1. Dashboard

Display the following statistics:

- Total Prompts
- Favorite Prompts
- Categories Count
- Recently Added Prompts

---

## 2. Prompt Management

Each prompt card must support the following actions:

- Create
- Edit
- Delete (with confirmation dialog)
- Duplicate
- Favorite / Unfavorite
- Pin important prompts to the top
- Copy prompt to clipboard
- Drag & Drop reordering of prompt cards

### Prompt Data Structure

Each prompt must contain:

- **Title**
- **Prompt (Content)**
- **Category**
- **Tags**
- **Description**
- **Created Date**
- **Last Updated Date**
- **Favorite Status**

---

## 3. Search & Filter

### Search

- Search by title
- Search by prompt content

### Filters

- Filter by category
- Show favorites only

### Sorting

Support the following sort options:

- Newest
- Oldest
- A → Z
- Z → A

---

## 4. Categories

Use **exactly** these 10 categories:

1. Coding
2. Marketing
3. Writing
4. Email
5. Resume
6. SQL
7. Design
8. Social Media
9. Productivity
10. Other

---

## 5. Import / Export

### Export

- Export all prompts as a JSON file

### Import

- Import prompts from a JSON file
- Validate imported JSON before saving

---

## 6. Theme

Implement:

- Light Mode
- Dark Mode

Theme preference must persist across page reloads.

---

## 7. State Management

Use:

- Redux Toolkit

---

## 8. Storage

Persist all prompt data using:

- LocalStorage

---

## 9. Backend & Database (CRUD via API)

Set up a backend server connected to a database of your choice.

Examples:

- MongoDB
- PostgreSQL
- Firebase
- Any other suitable database

### Required API Endpoints

#### Create

Store a new prompt.

```http
POST /api/prompts
```

#### Read

Retrieve all prompts.

```http
GET /api/prompts
```

#### Update

Update an existing prompt.

```http
PUT /api/prompts/:id
```

#### Delete

Delete a prompt.

```http
DELETE /api/prompts/:id
```

The frontend must use these APIs for all CRUD operations.

---

# Technical Requirements

The project must include:

- React + TypeScript
- Functional Components
- React Hooks
- Custom Hooks
- Reusable Components
- Clean Folder Structure
- Responsive Design
  - Mobile
  - Tablet
  - Desktop
- Form Validation
- Error Handling
- Loading States
- Clipboard API Integration
- Keyboard Shortcuts
- DOM & Focus Handling
- Environment Variables (if required)
- Performance Optimization
  - Memoization
  - Debouncing
  - Lazy Loading (optional)
- Meaningful, incremental Git commits

---

# Expected UI Components

The application should include:

- Sidebar
- Navbar
- Dashboard Cards
- Search Bar
- Category Filter
- Prompt Card
  - Edit
  - Delete
  - Duplicate
  - Pin
  - Favorite
  - Copy
  - Drag Handle
- Prompt Details Modal
- Add/Edit Prompt Modal
- Delete Confirmation Dialog
- Toast Notifications
- Dark/Light Theme Toggle
- Import Button
- Export Button

---

# Submission Requirements

Submit the following:

## 1. Source Code

- Public GitHub Repository

## 2. Live Demo

Deploy the application using:

- Vercel
- Netlify
- or any equivalent free hosting service

## 3. Documentation

Include a `README.md` containing:

- Project overview
- Features
- Tech stack
- Installation steps
- Environment variable setup (if applicable)
- Running the frontend
- Running the backend
- API information
- Deployment instructions

## 4. Share

Provide:

- GitHub Repository Link
- Live Demo Link

---

# Evaluation Criteria

Candidates will be evaluated on:

- Code Quality
- Component Architecture
- React & TypeScript Best Practices
- State Management
- API Integration
- UI/UX Design
- Responsiveness
- Performance Optimization
- Error Handling
- Form Validation
- Clean Git History
- Documentation

---

# Deliverables Checklist

- [ ] Dashboard with required statistics
- [ ] Complete Prompt CRUD functionality
- [ ] Favorite, Pin, Duplicate, Copy actions
- [ ] Drag & Drop reordering
- [ ] Search functionality
- [ ] Category filtering
- [ ] Favorites filter
- [ ] Sorting options
- [ ] Fixed list of 10 categories
- [ ] JSON Import
- [ ] JSON Export
- [ ] Dark/Light Theme Toggle
- [ ] State Management (Redux Toolkit)
- [ ] LocalStorage persistence
- [ ] Backend CRUD APIs
- [ ] Connected Database
- [ ] Responsive UI
- [ ] Form validation
- [ ] Error handling
- [ ] Loading states
- [ ] Keyboard shortcuts
- [ ] Clipboard API integration
- [ ] Performance optimization
- [ ] Public GitHub repository
- [ ] Live deployment
- [ ] Complete README