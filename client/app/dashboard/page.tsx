"use client"

import { useEffect, useMemo, useCallback, useRef, useState } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import {
  fetchPrompts,
  addPrompt,
  editPrompt,
  removePrompt,
  setSearchQuery,
  toggleFavorite,
  togglePinned,
  reorderPrompts,
  importPromptsToServer,
  persistFavorite,
  persistPinned,
} from "@/store/slices/promptSlice"
import { useDebounce } from "@/hooks/useDebounce"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PromptCard } from "@/components/PromptCard"
import { DashboardStats } from "@/components/DashboardStats"
import { DashboardNavbar } from "@/components/DashboardNavbar"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { PromptFormModal } from "@/components/PromptFormModal"
import { PromptDetailModal } from "@/components/PromptDetailModal"
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog"
import { Search } from "lucide-react"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import type { Prompt } from "@/types/prompt"

type PromptFormData = Omit<Prompt, "id" | "createdAt" | "updatedAt">

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const { prompts, loading, error, searchQuery, selectedCategory, sortOrder, showFavoritesOnly, showPinnedOnly } =
    useAppSelector((s) => s.prompts)

  // --- UI State ---
  const [formOpen, setFormOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Prompt | null>(null)
  const [detailTarget, setDetailTarget] = useState<Prompt | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Prompt | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const importInputRef = useRef<HTMLInputElement>(null)

  // LocalStorage cache — persist prompts locally as fallback
  const [, setCachedPrompts] = useLocalStorage<Prompt[]>("prompts_cache", [])

  const debouncedSearch = useDebounce(searchQuery, 300)

  // --- Fetch on mount ---
  useEffect(() => {
    dispatch(fetchPrompts())
  }, [dispatch])

  // --- Cache to localStorage whenever prompts change ---
  useEffect(() => {
    if (prompts.length > 0) setCachedPrompts(prompts)
  }, [prompts, setCachedPrompts])

  // --- Filtering + Sorting (memoized) ---
  const filteredPrompts = useMemo(() => {
    let result = [...prompts]

    // Pinned first
    result.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

    // Category filter
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory)

    // Favorites filter
    if (showFavoritesOnly) result = result.filter((p) => p.favorite)

    // Pinned filter
    if (showPinnedOnly) result = result.filter((p) => p.pinned)

    // Search (debounced)
    const q = debouncedSearch.toLowerCase()
    if (q) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    // Sort
    switch (sortOrder) {
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case "a-z":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "z-a":
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      case "newest":
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return result
  }, [prompts, selectedCategory, showFavoritesOnly, showPinnedOnly, debouncedSearch, sortOrder])

  // --- Handlers ---
  const handleNewPrompt = useCallback(() => {
    setEditTarget(null)
    setFormOpen(true)
  }, [])

  const handleEdit = useCallback((prompt: Prompt) => {
    setEditTarget(prompt)
    setFormOpen(true)
  }, [])

  const handleViewDetail = useCallback((prompt: Prompt) => {
    setDetailTarget(prompt)
  }, [])

  const handleDeleteRequest = useCallback((prompt: Prompt) => {
    setDeleteTarget(prompt)
  }, [])

  const handleFormSubmit = async (data: PromptFormData) => {
    setFormLoading(true)
    try {
      if (editTarget) {
        await dispatch(editPrompt({ id: editTarget.id, data })).unwrap()
        toast.success("Prompt updated successfully")
      } else {
        await dispatch(addPrompt(data)).unwrap()
        toast.success("Prompt created successfully")
      }
      setFormOpen(false)
    } catch (err) {
      toast.error(String(err) || "Failed to save prompt")
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    setDeleteLoading(true)
    try {
      await dispatch(removePrompt(deleteTarget.id)).unwrap()
      toast.success("Prompt deleted")
      setDeleteTarget(null)
    } catch {
      toast.error("Failed to delete prompt")
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleDuplicate = async (prompt: Prompt) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, createdAt: _c, updatedAt: _u, ...data } = prompt
    try {
      await dispatch(addPrompt({ ...data, title: `${data.title} (Copy)` })).unwrap()
      toast.success("Prompt duplicated")
    } catch {
      toast.error("Failed to duplicate prompt")
    }
  }

  const handleToggleFavorite = (id: string) => {
    const prompt = prompts.find((p) => p.id === id)
    if (!prompt) return
    dispatch(toggleFavorite(id))
    dispatch(persistFavorite({ id, favorite: !prompt.favorite }))
  }

  const handleTogglePinned = (id: string) => {
    const prompt = prompts.find((p) => p.id === id)
    if (!prompt) return
    dispatch(togglePinned(id))
    dispatch(persistPinned({ id, pinned: !prompt.pinned }))
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const reordered = Array.from(filteredPrompts)
    const [moved] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, moved)
    dispatch(reorderPrompts(reordered))
  }

  // --- Export ---
  const handleExport = () => {
    const data = JSON.stringify(prompts, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `prompt-library-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success(`Exported ${prompts.length} prompts`)
  }

  // --- Import ---
  const handleImport = () => importInputRef.current?.click()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string)
        if (!Array.isArray(parsed)) throw new Error("Invalid format: expected an array")
        const valid = parsed.filter(
          (p) => p.title && p.content && p.category && p.description
        )
        
        const promise = dispatch(importPromptsToServer(valid)).unwrap()
        
        toast.promise(promise, {
          loading: `Importing ${valid.length} prompt(s)...`,
          success: `Successfully imported ${valid.length} prompt(s)`,
          error: "Failed to import prompts to server",
        })
      } catch (err) {
        toast.error("Invalid JSON file: " + String(err))
      }
      e.target.value = ""
    }
    reader.readAsText(file)
  }

  // --- Keyboard Shortcuts ---
  useKeyboardShortcuts({
    n: () => handleNewPrompt(),
    "mod+k": () => {
      const searchEl = document.getElementById("dashboard-search")
      searchEl?.focus()
    },
  })

  return (
    <SidebarProvider>
      <Toaster position="bottom-right" />
      <input
        ref={importInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />

      <DashboardSidebar />

      <SidebarInset className="flex-1 flex flex-col min-w-0 bg-muted/20">
        <DashboardNavbar
          onNewPrompt={handleNewPrompt}
          onImport={handleImport}
          onExport={handleExport}
        />

        <main className="flex-1 min-w-0 p-4 md:p-6 space-y-6 container mx-auto">
          {/* Stats */}
          <DashboardStats prompts={prompts} />

          {/* Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                id="dashboard-search"
                placeholder="Search prompts… (⌘K)"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(setSearchQuery(e.target.value))
                }
                className="pl-9 w-full bg-background"
              />
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center text-destructive py-20 bg-destructive/10 rounded-xl">
              <p>Error loading prompts: {error}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => dispatch(fetchPrompts())}
              >
                Retry
              </Button>
            </div>
          ) : filteredPrompts.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed rounded-xl text-muted-foreground space-y-3">
              <p>No prompts found.</p>
              <Button onClick={handleNewPrompt}>Create your first prompt</Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? "s" : ""}
              </p>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="prompts">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                    >
                      {filteredPrompts.map((prompt, index) => (
                        <Draggable
                          key={prompt.id}
                          draggableId={prompt.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? 0.85 : 1,
                              }}
                            >
                              <PromptCard
                                prompt={prompt}
                                index={index}
                                dragHandleProps={provided.dragHandleProps ?? undefined}
                                onEdit={handleEdit}
                                onDelete={handleDeleteRequest}
                                onDuplicate={handleDuplicate}
                                onToggleFavorite={handleToggleFavorite}
                                onTogglePinned={handleTogglePinned}
                                onViewDetail={handleViewDetail}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </>
          )}
        </main>
      </SidebarInset>

      {/* Modals */}
      <PromptFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        initialData={editTarget}
        onSubmit={handleFormSubmit}
        loading={formLoading}
      />
      <PromptDetailModal
        prompt={detailTarget}
        open={!!detailTarget}
        onOpenChange={(o) => { if (!o) setDetailTarget(null) }}
      />
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(o) => { if (!o) setDeleteTarget(null) }}
        title={deleteTarget?.title ?? ""}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </SidebarProvider>
  )
}
