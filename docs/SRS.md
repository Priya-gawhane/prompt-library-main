# Software Requirements Specification (SRS)

# AI Prompt Library

**Version:** 1.0  
**Technology Stack:** Next.js 15 + TypeScript + React + shadcn/ui + Tailwind CSS

---

# Document Information

| Field | Value |
|--------|-------|
| Project | AI Prompt Library |
| Document | Software Requirements Specification (SRS) |
| Version | 1.0 |
| Frontend | Next.js 15 (App Router) |
| UI Library | shadcn/ui |
| Styling | Tailwind CSS |
| Language | TypeScript |
| State Management | Redux Toolkit |
| Backend | Node.js + Express (REST API) |
| Database | MongoDB |
| Storage | LocalStorage + Database |
| Deployment | Vercel (Frontend), Render/Railway (Backend) |

---

# Table of Contents

1. Introduction
2. Project Overview
3. Objectives
4. Scope
5. Functional Requirements
6. Non-Functional Requirements
7. User Stories
8. System Architecture
9. Database Design
10. API Specification
11. Application Flow
12. UI/UX Specification
13. Folder Structure
14. State Management
15. Local Storage Strategy
16. Validation Rules
17. Error Handling
18. Performance Optimizations
19. Security Considerations
20. Future Enhancements

---

# 1. Introduction

The AI Prompt Library is a web application that enables users to organize, manage, search, and reuse AI prompts efficiently.

Users can create prompts for different use cases such as coding, marketing, content writing, resume generation, SQL, emails, and more.

The application provides a modern interface with fast search, filtering, drag-and-drop organization, cloud persistence through REST APIs, and offline persistence using LocalStorage.

---

# 2. Project Overview

The application consists of two major parts.

## Frontend

Built using

- Next.js 15 App Router
- TypeScript
- React Hooks
- shadcn/ui
- Tailwind CSS

Responsibilities:

- UI rendering
- Form validation
- State management
- Theme management
- LocalStorage
- API communication

---

## Backend

Built using

- Node.js
- Express
- MongoDB

Responsibilities

- CRUD APIs
- Data validation
- Database communication
- JSON responses

---

# 3. Objectives

The system should allow users to

- Create reusable prompts
- Organize prompts into categories
- Search instantly
- Filter prompts
- Mark favorites
- Pin important prompts
- Duplicate prompts
- Copy prompts
- Reorder prompts
- Import/export JSON
- Synchronize with backend
- Preserve theme preference
- Persist data

---

# 4. Scope

## In Scope

- Prompt management
- Dashboard
- Search
- Filtering
- Sorting
- Theme switching
- Import/export
- Backend CRUD
- LocalStorage
- Responsive UI

---

## Out of Scope

- User authentication
- Multi-user collaboration
- AI API integration
- Prompt execution
- Version history
- Sharing prompts publicly

---

# 5. Functional Requirements

## 5.1 Dashboard

Display summary cards.

### Card 1

Total Prompts

### Card 2

Favorite Prompts

### Card 3

Categories Used

### Card 4

Recently Added

---

## 5.2 Prompt Management

Users can

- Add prompt
- Edit prompt
- Delete prompt
- Duplicate prompt
- Favorite prompt
- Pin prompt
- Copy prompt
- View details

---

### Prompt Fields

| Field | Type | Required |
|--------|------|----------|
| id | ObjectId (virtual) | Yes |
| title | String | Yes |
| content | String | Yes |
| description | String | Yes |
| category | Enum (Category) | Yes |
| tags | String[] | No |
| favorite | Boolean | Yes |
| pinned | Boolean | Yes |
| createdAt | Date | Yes |
| updatedAt | Date | Yes |

---

## 5.3 Search

Search should work on

- title
- content

Search should be case-insensitive.

Search should update results while typing.

Debounce: 300ms

---

## 5.4 Filtering

Users can filter by

- Category
- Favorites only

Filters should be combinable.

---

## 5.5 Sorting

Supported sorting

- Newest
- Oldest
- A-Z
- Z-A

Pinned prompts should always remain above non-pinned prompts.

---

## 5.6 Categories

Exactly these categories

- Coding
- Marketing
- Writing
- Email
- Resume
- SQL
- Design
- Social Media
- Productivity
- Other

---

## 5.7 Import

Import prompts from JSON.

Requirements

- Validate JSON
- Ignore invalid entries
- Prevent duplicate IDs
- Display success/error toast

---

## 5.8 Export

Export every prompt as JSON.

Filename

```
prompts-yyyy-mm-dd.json
```

---

## 5.9 Theme

Supported themes

- Light
- Dark
- System

Persist preference in LocalStorage.

---

# 6. Non-Functional Requirements

## Performance

Initial page load

< 2 seconds

Search response

< 100 ms

Filter response

< 100 ms

---

## Responsiveness

Support

- Mobile
- Tablet
- Laptop
- Desktop

---

## Accessibility

Support

- Keyboard navigation
- Focus rings
- ARIA labels
- Screen readers
- High contrast

---

## Reliability

Application should recover gracefully from

- API failure
- Invalid import
- Network timeout

---

# 7. User Stories

### US-01

As a user,

I want to create prompts,

so I can reuse them later.

---

### US-02

As a user,

I want to favorite prompts,

so I can quickly access them.

---

### US-03

As a user,

I want to pin prompts,

so they always appear first.

---

### US-04

As a user,

I want to duplicate prompts,

so I can modify existing ones.

---

### US-05

As a user,

I want to copy prompts,

so I can paste them into AI tools.

---

### US-06

As a user,

I want to search prompts,

so I can find them instantly.

---

### US-07

As a user,

I want to export prompts,

so I can create backups.

---

### US-08

As a user,

I want to import prompts,

so I can restore my library.

---

# 8. System Architecture

```
┌───────────────────────────┐
│       Next.js Client      │
│                           │
│  shadcn/ui                │
│  Tailwind                 │
│  Redux Toolkit            │
│                           │
└─────────────┬─────────────┘
              │
         REST API
              │
┌─────────────▼─────────────┐
│      Express Backend      │
│                           │
│ CRUD Controllers          │
│ Validation                │
│ Business Logic            │
└─────────────┬─────────────┘
              │
        MongoDB Database
```

---

# 9. Database Design

## prompts

| Field | Type |
|--------|------|
| _id | ObjectId |
| title | String |
| content | String |
| description | String |
| category | String |
| tags | Array |
| favorite | Boolean |
| pinned | Boolean |
| createdAt | Date |
| updatedAt | Date |

---

# 10. API Specification

## GET

```
GET /api/prompts
```

Returns all prompts.

---

## POST

```
POST /api/prompts
```

Create new prompt.

---

## PUT

```
PUT /api/prompts/:id
```

Update prompt.

---

## DELETE

```
DELETE /api/prompts/:id
```

Delete prompt.

---

## Response Format

```json
{
  "success": true,
  "message": "Prompt created successfully",
  "data": {}
}
```

---

# 11. Application Flow

```
User

↓

Dashboard

↓

Fetch Prompts

↓

Display Cards

↓

Search / Filter / Sort

↓

Prompt Cards

↓

CRUD Operations

↓

REST API

↓

MongoDB

↓

Refresh UI
```

---

# 12. UI/UX Specification

## Layout

```
+----------------------------------------+
| Navbar                                 |
+----------+-----------------------------+
| Sidebar  | Dashboard                   |
|          |                             |
|          | Search                      |
|          | Filters                     |
|          |                             |
|          | Prompt Grid                 |
|          |                             |
+----------+-----------------------------+
```

---

## Components

### Navbar

- Logo
- Theme Toggle
- Import
- Export

---

### Sidebar

- Dashboard
- Categories
- Favorites

---

### Dashboard Cards

- Total
- Favorites
- Categories
- Recent

---

### Prompt Card

Displays

- Title
- Description
- Tags
- Category
- Created Date

Actions

- Edit
- Delete
- Favorite
- Pin
- Duplicate
- Copy

---

### Modals

- Add Prompt
- Edit Prompt
- Prompt Details
- Delete Confirmation

---

### Toasts

Display

- Success
- Error
- Warning
- Information

---

# 13. Recommended Folder Structure

```
client/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── dashboard/
│       └── page.tsx
│
├── components/
│   ├── DashboardNavbar.tsx
│   ├── DashboardSidebar.tsx
│   ├── DashboardStats.tsx
│   ├── DeleteConfirmDialog.tsx
│   ├── Features.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── LandingNavbar.tsx
│   ├── PromptCard.tsx
│   ├── PromptDetailModal.tsx
│   ├── PromptFormModal.tsx
│   ├── theme-provider.tsx
│   └── ui/
│
├── store/
│   ├── store.ts
│   ├── ReduxProvider.tsx
│   └── slices/
│       └── promptSlice.ts
│
├── hooks/
│   ├── redux.ts
│   ├── use-mobile.ts
│   ├── useDebounce.ts
│   ├── useKeyboardShortcuts.ts
│   └── useLocalStorage.ts
│
├── services/
│   ├── api.ts
│   └── prompt.service.ts
│
├── lib/
│   └── utils.ts
│
└── types/
    ├── prompt.ts
    └── category.ts
```

---

# 14. State Management

Redux Toolkit manages the following state via `promptSlice`

- Prompt list
- Search query
- Selected category
- Sort order (newest, oldest, a-z, z-a)
- Show favorites only (boolean filter)
- Show pinned only (boolean filter)
- Loading state
- Error state

UI-level state (modals, form targets) is managed with local `useState` inside the dashboard page.

---

# 15. Local Storage Strategy

Keys

```
prompt-library
theme
sort-order
filters
```

Data should be synchronized after every successful CRUD operation.

---

# 16. Validation Rules

## Title

- Required
- Maximum 100 characters

---

## Prompt

- Required
- Minimum 10 characters

---

## Description

Maximum 500 characters.

---

## Tags

- Maximum 10 tags
- Trim whitespace
- Remove duplicates

---

## Category

Must be one of the predefined categories.

---

# 17. Error Handling

Application should handle

- Network failures
- API errors
- Invalid imports
- Clipboard failures
- Missing LocalStorage
- Invalid JSON
- Database failures

Display user-friendly toast messages.

---

# 18. Performance Optimizations

- React.memo
- useMemo
- useCallback
- Debounced search
- Dynamic imports where appropriate
- Lazy-loaded modals
- Optimized API requests
- Efficient list rendering
- Avoid unnecessary re-renders
- Client-side caching for fetched prompts

---

# 19. Security Considerations

- Validate all API input
- Sanitize imported JSON
- Prevent malformed requests
- Use environment variables for secrets
- Escape user-generated content where applicable
- Enable CORS only for trusted origins
- Validate request payloads on both client and server

---

# 20. Future Enhancements

- User Authentication
- Cloud Synchronization
- AI Prompt Generation
- Prompt Version History
- Rich Text Editor
- Prompt Collections
- Folder Organization
- Prompt Sharing
- Team Collaboration
- Markdown Support
- Analytics Dashboard
- Offline-First Support with Service Workers
- Full-text Search
- AI Model-specific Prompt Templates

---

# Technology Stack Summary

| Layer | Technology |
|--------|------------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI | shadcn/ui |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Form Validation | Zod |
| State Management | Redux Toolkit |
| Notifications | Sonner |
| Animations | Anime.js, tw-animate-css |
| Drag & Drop | @hello-pangea/dnd |
| HTTP Client | Axios |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose) |
| API | REST |
| Theme | next-themes |
| Version Control | Git + GitHub |

---

# Acceptance Criteria

The project will be considered complete when:

- All required CRUD operations are functional.
- Dashboard statistics update dynamically.
- Search, filtering, and sorting work together seamlessly.
- Prompt cards support pinning, favoriting, duplication, copying, and drag-and-drop reordering.
- Theme preference persists across sessions.
- Prompt data is synchronized between LocalStorage and the backend.
- Import and export functionality includes proper validation.
- The UI is responsive across mobile, tablet, and desktop devices.
- API interactions include loading indicators and robust error handling.
- Performance optimizations minimize unnecessary re-renders and provide smooth interactions.
- The project is deployed with a public GitHub repository, live demo, and comprehensive README.