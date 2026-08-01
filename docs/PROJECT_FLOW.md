# AI Prompt Library Development Roadmap

**Project Stack**

- Frontend: Next.js 15 (App Router)
- Language: TypeScript
- UI: shadcn/ui
- Styling: Tailwind CSS
- State Management: Redux Toolkit
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Validation: Zod
- Drag & Drop: @hello-pangea/dnd
- Animations: Anime.js
- Notifications: Sonner

---

# Development Flow

The project should be developed in small, incremental milestones. Each milestone should result in a working application with meaningful Git commits.

---

# Phase 1 — Project Setup

## Frontend

- Initialize Next.js project
- Install Tailwind CSS
- Install shadcn/ui
- Configure project aliases
- Configure fonts
- Configure dark mode using `next-themes`

### Install Required Packages

- shadcn/ui
- Lucide React
- Zod
- Sonner
- @hello-pangea/dnd
- Anime.js

---

## Backend

Initialize

- Node.js
- Express
- TypeScript

Install

- Express
- Mongoose
- dotenv
- cors
- helmet
- morgan
- Zod

Create folders

```
backend
│
├── src
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── validators
│   └── index.ts
```

---

# Phase 2 — Design System

Build reusable UI components before writing application logic.

## Create

- Button
- Input
- Textarea
- Select
- Badge
- Card
- Dialog
- Dropdown Menu
- Alert Dialog
- Tooltip
- Popover
- Separator
- Skeleton
- Tabs
- Scroll Area
- Toast Provider

---

# Phase 3 — Define Types

Create TypeScript interfaces.

## Prompt

```ts
interface Prompt {
    id: string;
    title: string;
    content: string;
    description: string;
    category: Category;
    tags: string[];
    favorite: boolean;
    pinned: boolean;
    createdAt: Date;
    updatedAt: Date;
}
```

---

## Categories

```text
Coding
Marketing
Writing
Email
Resume
SQL
Design
Social Media
Productivity
Other
```

---

# Phase 4 — Backend Development

## Database Connection

Create MongoDB connection.

---

## Prompt Model

Implement schema.

---

## REST APIs

### GET

```
GET /api/prompts
```

---

### POST

```
POST /api/prompts
```

---

### PUT

```
PUT /api/prompts/:id
```

---

### DELETE

```
DELETE /api/prompts/:id
```

---

## Validation

Validate

- title
- prompt
- category
- tags

---

## Test APIs

Use

- Postman
- Bruno
- Thunder Client

---

# Phase 5 — API Service Layer

Inside frontend

```
services/

prompt.service.ts

api.ts
```

Functions

- getPrompts()
- createPrompt()
- updatePrompt()
- deletePrompt()

No UI should directly call fetch.

---

# Phase 6 — Redux Toolkit

Create

```
Redux Slices and Store
```

Store

- prompts (list)
- loading
- error
- searchQuery
- selectedCategory
- sortOrder
- showFavoritesOnly
- showPinnedOnly

Expose async thunks

- fetchPrompts
- addPrompt
- editPrompt
- removePrompt
- persistFavorite
- persistPinned
- importPromptsToServer

Expose reducers

- setSearchQuery
- setSelectedCategory
- setSortOrder
- toggleFavoritesFilter
- togglePinnedFilter
- toggleFavorite
- togglePinned
- reorderPrompts
- importPrompts

---

# Phase 7 — Application Layout

Create

```
Navbar

Sidebar

Main Layout
```

Navbar

- Logo
- Theme Toggle
- Import
- Export

Sidebar

- Dashboard
- Categories
- Favorites

---

# Phase 8 — Dashboard

Build dashboard cards.

Cards

- Total Prompts
- Favorites
- Categories Used
- Recently Added

Statistics should be computed dynamically.

---

# Phase 9 — Prompt Grid

Create

```
PromptCard
```

Display

- Title
- Description
- Category
- Tags
- Dates

Actions

- Edit
- Delete
- Favorite
- Pin
- Duplicate
- Copy

---

# Phase 10 — Add Prompt Modal

Create form.

Fields

- Title
- Prompt
- Description
- Category
- Tags

Validation

React Hook Form + Zod

---

# Phase 11 — Edit Prompt

Reuse Add Prompt modal.

Pre-fill fields.

Update API.

---

# Phase 12 — Delete Confirmation

Create Alert Dialog.

Buttons

- Cancel
- Delete

Delete only after confirmation.

---

# Phase 13 — Prompt Details Modal

Clicking a card opens

```
Prompt Details
```

Display

- Entire prompt
- Metadata
- Tags
- Copy button

---

# Phase 14 — Search

Create Search Bar.

Search

- Title
- Prompt

Use

```
useDebounce()
```

Delay

```
300 ms
```

---

# Phase 15 — Filtering

Filters

Category

Favorites

Pinned

Allow combining filters.

---

# Phase 16 — Sorting

Sorting options

- Newest
- Oldest
- A-Z
- Z-A

Pinned prompts should always remain above others.

---

# Phase 17 — Drag & Drop

Implement

```
@hello-pangea/dnd
```

Support

- Mouse
- Keyboard

Persist new order.

---

# Phase 18 — Clipboard

Implement

```
navigator.clipboard
```

Copy prompt.

Show toast.

---

# Phase 19 — Import / Export

Export

```
JSON
```

Import

Validate

- Required fields
- Duplicate IDs
- Invalid categories
- Invalid JSON

Display results.

---

# Phase 20 — Local Storage

Persist

- prompts
- theme
- filters
- sorting

Load from LocalStorage on startup for faster rendering, then synchronize with the backend if desired.

---

# Phase 21 — Theme

Implement

- Light
- Dark
- System

Persist preference.

---

# Phase 22 — Loading States

Create Skeletons

For

- Dashboard
- Cards
- Modal

---

# Phase 23 — Error Handling

Handle

- API failure
- Invalid JSON
- Clipboard failure
- Network failure

Display

```
Toast
```

---

# Phase 24 — Responsive Design

Support

## Mobile

Single-column layout with collapsible sidebar.

---

## Tablet

Two-column prompt grid.

---

## Desktop

Three or four-column prompt grid.

---

# Phase 25 — Performance Optimization

Implement

- React.memo
- useMemo
- useCallback
- Debounced search
- Lazy-loaded dialogs
- Dynamic imports where appropriate
- Optimistic UI updates for CRUD actions

---

# Phase 26 — Testing

Verify

- CRUD
- Search
- Filters
- Sorting
- Drag & Drop
- Import
- Export
- Theme
- LocalStorage
- API integration
- Responsive layouts

---

# Phase 27 — Final Polish

Improve

- Empty states
- Animations
- Hover effects
- Keyboard accessibility
- Focus management
- ARIA labels

---

# Phase 28 — Deployment

## Backend

Deploy to

- Render
- Railway

Configure

```
MONGODB_URI
PORT
CORS_ORIGIN
```

---

## Frontend

Deploy to

Vercel

Configure

```
NEXT_PUBLIC_API_URL
```

---

# Phase 29 — Documentation

Create a comprehensive `README.md` including:

- Project overview
- Features
- Tech stack
- Architecture
- Folder structure
- Installation steps
- Environment variables
- Local development
- API endpoints
- Deployment instructions
- Screenshots or GIFs
- Future improvements

---

# Suggested Git Commit Flow

```
feat: initialize Next.js project

feat: setup Express backend

feat: configure MongoDB connection

feat: create prompt schema and CRUD APIs

feat: integrate frontend API service

feat: implement Redux Toolkit

feat: build application layout

feat: add dashboard statistics

feat: implement prompt cards

feat: add prompt creation form

feat: implement prompt editing

feat: implement prompt deletion

feat: add prompt details modal

feat: implement search

feat: add category filters

feat: implement sorting

feat: add drag and drop support

feat: implement clipboard copy

feat: implement import/export

feat: persist data in LocalStorage

feat: add dark mode

perf: optimize rendering

style: improve responsive design

docs: update README

deploy: configure production deployment
```

---

# High-Level Development Timeline

```text
Project Setup
        │
        ▼
Backend CRUD APIs
        │
        ▼
Frontend Layout
        │
        ▼
Redux Toolkit
        │
        ▼
Prompt CRUD UI
        │
        ▼
Dashboard
        │
        ▼
Search + Filters + Sorting
        │
        ▼
Drag & Drop
        │
        ▼
Import / Export
        │
        ▼
Theme + LocalStorage
        │
        ▼
Performance & Accessibility
        │
        ▼
Testing
        │
        ▼
Deployment
        │
        ▼
Documentation
```

---

# Definition of Done

The project is considered complete when:

- All required CRUD operations are implemented through the REST API.
- Dashboard statistics accurately reflect the current data.
- Search, filtering, and sorting work together correctly.
- Prompt cards support pinning, favoriting, duplication, copying, and drag-and-drop reordering.
- Data persists in MongoDB and LocalStorage where applicable.
- Theme preference is preserved across sessions.
- Import and export functionality validates data and handles errors gracefully.
- The interface is responsive, accessible, and performs smoothly across supported devices.
- The application is deployed with a public GitHub repository, live demo, and complete documentation.