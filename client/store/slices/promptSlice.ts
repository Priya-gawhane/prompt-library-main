import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import {
  getPrompts,
  createPrompt,
  updatePrompt,
  deletePrompt,
} from "@/services/prompt.service"
import type { Prompt } from "@/types/prompt"

interface PromptState {
  prompts: Prompt[]
  loading: boolean
  error: string | null
  searchQuery: string
  selectedCategory: string | null
  sortOrder: "newest" | "oldest" | "a-z" | "z-a"
  showFavoritesOnly: boolean
  showPinnedOnly: boolean
}

const initialState: PromptState = {
  prompts: [],
  loading: false,
  error: null,
  searchQuery: "",
  selectedCategory: null,
  sortOrder: "newest",
  showFavoritesOnly: false,
  showPinnedOnly: false,
}

// Server wraps responses as { message, data }
// axios response.data gives { message, data }
// so we need .data to get the actual payload

export const fetchPrompts = createAsyncThunk(
  "prompts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getPrompts()
      return res.data as Prompt[]
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch prompts"
      return rejectWithValue(message)
    }
  }
)

export const addPrompt = createAsyncThunk(
  "prompts/add",
  async (
    data: Omit<Prompt, "id" | "createdAt" | "updatedAt">,
    { rejectWithValue }
  ) => {
    try {
      const res = await createPrompt(data)
      return res.data as Prompt
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create prompt"
      return rejectWithValue(message)
    }
  }
)

export const editPrompt = createAsyncThunk(
  "prompts/edit",
  async (
    { id, data }: { id: string; data: Partial<Omit<Prompt, "id" | "createdAt" | "updatedAt">> },
    { rejectWithValue }
  ) => {
    try {
      const res = await updatePrompt(id, data)
      return res.data as Prompt
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update prompt"
      return rejectWithValue(message)
    }
  }
)

export const removePrompt = createAsyncThunk(
  "prompts/remove",
  async (id: string, { rejectWithValue }) => {
    try {
      await deletePrompt(id)
      return id
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to delete prompt"
      return rejectWithValue(message)
    }
  }
)

// Persist favorite toggle to backend
export const persistFavorite = createAsyncThunk(
  "prompts/persistFavorite",
  async ({ id, favorite }: { id: string; favorite: boolean }, { rejectWithValue }) => {
    try {
      const res = await updatePrompt(id, { favorite })
      return res.data as Prompt
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to update")
    }
  }
)

// Persist pinned toggle to backend
export const persistPinned = createAsyncThunk(
  "prompts/persistPinned",
  async ({ id, pinned }: { id: string; pinned: boolean }, { rejectWithValue }) => {
    try {
      const res = await updatePrompt(id, { pinned })
      return res.data as Prompt
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to update")
    }
  }
)

// Import multiple prompts to backend
export const importPromptsToServer = createAsyncThunk(
  "prompts/importToServer",
  async (promptsToImport: Omit<Prompt, "id" | "createdAt" | "updatedAt">[], { rejectWithValue }) => {
    try {
      const results = await Promise.allSettled(
        promptsToImport.map(async (p) => {
          const res = await createPrompt(p)
          return res.data as Prompt
        })
      )
      
      const createdPrompts = results
        .filter((result): result is PromiseFulfilledResult<Prompt> => result.status === "fulfilled")
        .map((result) => result.value)

      if (createdPrompts.length === 0 && promptsToImport.length > 0) {
        throw new Error("All prompts failed to import")
      }

      return createdPrompts
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to import prompts")
    }
  }
)

const promptSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    },
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload
    },
    setSortOrder(state, action: PayloadAction<PromptState["sortOrder"]>) {
      state.sortOrder = action.payload
    },
    toggleFavoritesFilter(state) {
      state.showFavoritesOnly = !state.showFavoritesOnly
    },
    togglePinnedFilter(state) {
      state.showPinnedOnly = !state.showPinnedOnly
    },
    // Optimistic updates — backend sync handled by persistFavorite/persistPinned thunks
    toggleFavorite(state, action: PayloadAction<string>) {
      const prompt = state.prompts.find((p) => p.id === action.payload)
      if (prompt) prompt.favorite = !prompt.favorite
    },
    togglePinned(state, action: PayloadAction<string>) {
      const prompt = state.prompts.find((p) => p.id === action.payload)
      if (prompt) prompt.pinned = !prompt.pinned
    },
    clearError(state) {
      state.error = null
    },
    reorderPrompts(state, action: PayloadAction<Prompt[]>) {
      state.prompts = action.payload
    },
    importPrompts(state, action: PayloadAction<Prompt[]>) {
      const newPrompts = action.payload.filter(
        (p) => !state.prompts.some((existing) => existing.id === p.id)
      )
      state.prompts = [...newPrompts, ...state.prompts]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrompts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPrompts.fulfilled, (state, action) => {
        state.loading = false
        state.prompts = action.payload
      })
      .addCase(fetchPrompts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    builder
      .addCase(addPrompt.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addPrompt.fulfilled, (state, action) => {
        state.loading = false
        state.prompts.unshift(action.payload)
      })
      .addCase(addPrompt.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    builder
      .addCase(editPrompt.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(editPrompt.fulfilled, (state, action) => {
        state.loading = false
        const index = state.prompts.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) state.prompts[index] = action.payload
      })
      .addCase(editPrompt.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    builder
      .addCase(removePrompt.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removePrompt.fulfilled, (state, action) => {
        state.loading = false
        state.prompts = state.prompts.filter((p) => p.id !== action.payload)
      })
      .addCase(removePrompt.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Sync the backend-confirmed value back (replaces optimistic update)
    builder
      .addCase(persistFavorite.fulfilled, (state, action) => {
        const index = state.prompts.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) state.prompts[index] = action.payload
      })
      .addCase(persistPinned.fulfilled, (state, action) => {
        const index = state.prompts.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) state.prompts[index] = action.payload
      })

    // Import thunk success handler
    builder
      .addCase(importPromptsToServer.pending, (state) => {
        state.loading = true
      })
      .addCase(importPromptsToServer.fulfilled, (state, action) => {
        state.loading = false
        // Prepend all successfully created prompts to the state
        state.prompts = [...action.payload, ...state.prompts]
      })
      .addCase(importPromptsToServer.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const {
  setSearchQuery,
  setSelectedCategory,
  setSortOrder,
  toggleFavoritesFilter,
  togglePinnedFilter,
  toggleFavorite,
  togglePinned,
  clearError,
  reorderPrompts,
  importPrompts,
} = promptSlice.actions

export default promptSlice.reducer
