# AI Prompt Library

A modern, responsive, and full-stack web application for creating, organizing, searching, and managing reusable AI prompts. Built with **Next.js**, **TypeScript**, **shadcn/ui**, and an **Express + MongoDB** backend.

---

## 📖 Project Overview

The **AI Prompt Library** solves the problem of losing your best AI prompts in ephemeral chat histories. It provides a centralized repository where you can safely store, categorize, and quickly retrieve your carefully engineered prompts.

With features like instant search, filtering, drag-and-drop reordering, and one-click copy, this application acts as a personal team-level database for AI workflows.

---

## ✨ Features

- **📊 Dashboard Analytics**: View real-time statistics (Total Prompts, Favorites, Categories Used, Recently Added).
- **📝 Comprehensive Prompt Management**: Create, edit, delete, duplicate, pin, and favorite prompts.
- **🔍 Advanced Search & Filter**: Search by title or content instantly. Filter by predefined categories and favorites.
- **↕️ Sorting & Reordering**: Sort prompts by Date and Alphabetically. Pin important prompts to the top. Use **Drag & Drop** to manually arrange them.
- **📋 One-Click Copy**: Instantly copy prompt content to your clipboard.
- **💾 Import / Export**: Export your entire library to a JSON file for backup, and import JSON files seamlessly.
- **🌗 Dark / Light Mode**: Built-in theme toggling that persists across sessions.
- **🗄️ Persistence**: Prompts are stored in a **MongoDB** database via a REST API, while cached data leverages **LocalStorage** as a client-side fallback.
- **📱 Responsive UI**: Beautifully designed interface that scales perfectly across mobile, tablet, and desktop displays.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI, Lucide React
- **State Management**: Redux Toolkit
- **Validation**: Zod
- **HTTP Client**: Axios
- **Drag & Drop**: @hello-pangea/dnd
- **Animations**: Anime.js, tw-animate-css
- **Notifications**: Sonner

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **Validation**: Zod
- **Middleware**: CORS, Helmet, Morgan

---

## 📂 Folder Structure

```text
prompt-library/
├── client/                   # Next.js Frontend App
│   ├── app/                  # App Router
│   │   ├── api/prompts/      # Next.js API proxy (forwards to Express)
│   │   ├── dashboard/        # Dashboard page
│   │   ├── layout.tsx
│   │   └── page.tsx          # Landing page
│   ├── components/           # UI components (shadcn/ui + custom)
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities
│   ├── services/             # Axios API service layer
│   ├── store/                # Redux store & slices
│   └── types/                # TypeScript interfaces
│
├── server/                   # Express Backend App
│   └── src/
│       ├── config/           # DB connection
│       ├── controllers/      # Route handlers
│       ├── middleware/        # Custom middleware
│       ├── models/           # Mongoose schemas
│       ├── routes/           # Express routes
│       ├── services/         # Business logic
│       ├── types/            # TypeScript types
│       ├── utils/            # Utility functions
│       ├── validators/       # Zod validators
│       └── index.ts          # Entry point
│
└── docs/                     # Project documentation
```

---

## 🌐 Architecture Note

The Next.js client does **not** call the Express backend directly from the browser. Instead, it routes all API calls through a **Next.js API proxy layer** (`app/api/prompts/`), which forwards the requests to the Express backend using the `BACKEND_URL` environment variable. This keeps the backend URL server-side and avoids CORS issues in production.

```
Browser → Next.js API Route (/api/prompts) → Express Backend → MongoDB
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm
- MongoDB running locally

### 1. Clone the repository
```bash
git clone https://github.com/iamdainwi/prompt-library.git
cd prompt-library
```

### 2. Environment Setup
Copy the `.env.example` files and fill in your values:

**Server** (`server/.env`):
```env
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/prompt_library
CORS_ORIGIN=http://localhost:3000
```

**Client** (`client/.env`):
```env
# Used server-side by the Next.js API proxy — do NOT prefix with NEXT_PUBLIC_
BACKEND_URL=http://localhost:3001/api
```

### 3. Install Dependencies & Run

#### Backend (Server)
```bash
cd server
pnpm install
pnpm dev
```
*The server starts on `http://localhost:3001`*

#### Frontend (Client)
Open a new terminal window:
```bash
cd client
pnpm install
pnpm dev
```
*The client starts on `http://localhost:3000`*

---

## 🌐 API Endpoints

The Express backend exposes the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/prompts` | Retrieve all prompts |
| `POST` | `/api/prompts` | Create a new prompt |
| `PUT` | `/api/prompts/:id` | Update an existing prompt |
| `DELETE` | `/api/prompts/:id` | Delete a prompt |

All requests and responses use JSON.

---

## 🎯 Future Enhancements

- **User Authentication**: Allow multiple users to have their own private prompt libraries.
- **AI Integration**: Connect to external APIs to execute prompts directly from the dashboard.
- **Prompt Variables**: Add support for dynamic variables (e.g., `{{name}}`) inside prompt templates.
- **Analytics**: Track how often a prompt is copied and used.
