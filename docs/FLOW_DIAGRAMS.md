# AI Prompt Library — System Flow Diagram

```text
                                ┌──────────────────────────────┐
                                │          User                │
                                └──────────────┬───────────────┘
                                               │
                                               ▼
                          ┌─────────────────────────────────────┐
                          │      Next.js Frontend (UI)          │
                          │                                     │
                          │  • App Router                       │
                          │  • shadcn/ui                        │
                          │  • Tailwind CSS                     │
                          │  • Redux Toolkit                    │
                          └──────────────┬──────────────────────┘
                                         │
                                         ▼
                    ┌─────────────────────────────────────────────┐
                    │            Application Layout               │
                    │                                             │
                    │  Navbar • Sidebar • Dashboard • Prompt Grid  │
                    └──────────────┬──────────────────────────────┘
                                   │
                ┌──────────────────┴──────────────────┐
                │                                     │
                ▼                                     ▼
   ┌─────────────────────────┐             ┌──────────────────────────┐
   │ Dashboard               │             │ Prompt Library           │
   │                         │             │                          │
   │ Statistics              │             │ Prompt Cards             │
   │ Recent Prompts          │             │ Search                   │
   │ Favorites               │             │ Filters                  │
   └────────────┬────────────┘             │ Sort                     │
                │                          └───────────┬──────────────┘
                │                                      │
                │              ┌───────────────────────┘
                │              ▼
                │  ┌──────────────────────────────┐
                │  │      Prompt Operations       │
                │  │                              │
                │  │ Create                       │
                │  │ Edit                         │
                │  │ Delete                       │
                │  │ Duplicate                    │
                │  │ Favorite                     │
                │  │ Pin                          │
                │  │ Copy                         │
                │  │ Drag & Drop                  │
                │  └─────────────┬────────────────┘
                │                │
                └────────────────┘
                                  │
                                  ▼
                  ┌────────────────────────────────┐
                  │        Redux Toolkit           │
                  │                                │
                  │ Global Application State       │
                  │                                │
                  │ • Prompts                      │
                  │ • Search                       │
                  │ • Filters                      │
                  │ • Sorting                      │
                  │ • Loading                      │
                  │ • Theme                        │
                  └───────────────┬────────────────┘
                                  │
                 ┌────────────────┴────────────────┐
                 │                                 │
                 ▼                                 ▼
      ┌────────────────────┐           ┌──────────────────────┐
      │ LocalStorage        │           │ REST API Service     │
      │                    │           │                      │
      │ Theme              │           │ Axios / Fetch        │
      │ Filters            │           │ Request Handling     │
      │ Cached Prompts     │           │ Error Handling       │
      └─────────┬──────────┘           └──────────┬───────────┘
                │                                 │
                │                                 ▼
                │               ┌────────────────────────────────┐
                │               │      Express.js Backend        │
                │               │                                │
                │               │ Controllers                    │
                │               │ Routes                         │
                │               │ Validation (Zod)               │
                │               │ Services                       │
                │               └──────────────┬─────────────────┘
                │                              │
                │                              ▼
                │                ┌────────────────────────────┐
                │                │       MongoDB Database      │
                │                │                            │
                │                │ prompts collection         │
                │                │                            │
                │                │ Create                     │
                │                │ Read                       │
                │                │ Update                     │
                │                │ Delete                     │
                │                └──────────────┬─────────────┘
                │                               │
                └───────────────────────────────┘
                                Sync Updated Data
```

---

# Request Flow

```text
User Action
      │
      ▼
React Component
      │
      ▼
Redux Action
      │
      ├──────────────► Update Local State
      │
      ├──────────────► Save to LocalStorage
      │
      └──────────────► Call Backend API
                          │
                          ▼
                  Express Controller
                          │
                          ▼
                     MongoDB CRUD
                          │
                          ▼
                    JSON Response
                          │
                          ▼
                 Update Redux State
                          │
                          ▼
                    UI Re-renders
```

---

# Prompt CRUD Flow

```text
Add / Edit Prompt
        │
        ▼
Open Modal
        │
        ▼
React Hook Form
        │
        ▼
Zod Validation
        │
        ▼
Valid?
   │
 ┌─┴──────────────┐
 │                │
No               Yes
 │                │
 ▼                ▼
Show Errors    API Request
                    │
                    ▼
             Save in MongoDB
                    │
                    ▼
          Update Redux State
                    │
                    ▼
         Save to LocalStorage
                    │
                    ▼
             Refresh Prompt Grid
```

---

# Search & Filter Flow

```text
User Types Search
        │
        ▼
Debounce (300ms)
        │
        ▼
Redux Updates Search Query
        │
        ▼
Apply Filters
        │
        ▼
Apply Sorting
        │
        ▼
Pinned Prompts First
        │
        ▼
Render Prompt Grid
```

---

# Import Flow

```text
Import JSON
      │
      ▼
Read File
      │
      ▼
Validate JSON
      │
      ▼
Valid?
 │
 ├──── No ───► Error Toast
 │
 ▼
Merge / Replace Prompts
      │
      ▼
Save to MongoDB
      │
      ▼
Update Redux
      │
      ▼
Save LocalStorage
      │
      ▼
Refresh UI
```

---

# Export Flow

```text
Click Export
      │
      ▼
Fetch Prompt Data
      │
      ▼
Convert to JSON
      │
      ▼
Download File
```

---

# Overall Architecture

```text
                  User
                    │
                    ▼
        Next.js + shadcn/ui Frontend
                    │
                    ▼
             Redux Toolkit State
            ╱                  ╲
           ▼                    ▼
   LocalStorage           REST API Service
                                 │
                                 ▼
                         Express.js Backend
                                 │
                                 ▼
                              MongoDB
```