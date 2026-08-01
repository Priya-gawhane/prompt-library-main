"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Category } from "@/types/category"
import type { Prompt } from "@/types/prompt"

type PromptFormData = Omit<Prompt, "id" | "createdAt" | "updatedAt">

interface PromptFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Prompt | null
  onSubmit: (data: PromptFormData) => Promise<void>
  loading?: boolean
}

const EMPTY_FORM: PromptFormData = {
  title: "",
  content: "",
  description: "",
  category: Category.CODING,
  tags: [],
  pinned: false,
  favorite: false,
}

interface FormErrors {
  title?: string
  content?: string
  description?: string
  category?: string
}

export function PromptFormModal({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  loading,
}: PromptFormModalProps) {
  const [form, setForm] = useState<PromptFormData>(EMPTY_FORM)
  const [tagsInput, setTagsInput] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (open) {
      if (initialData) {
        const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = initialData
        setForm(rest)
        setTagsInput(initialData.tags.join(", "))
      } else {
        setForm(EMPTY_FORM)
        setTagsInput("")
      }
      setErrors({})
    }
  }, [open, initialData])

  const validate = (): boolean => {
    const errs: FormErrors = {}
    if (!form.title.trim()) errs.title = "Title is required"
    else if (form.title.length > 150) errs.title = "Title must be at most 150 characters"
    if (!form.content.trim()) errs.content = "Prompt content is required"
    if (!form.description.trim()) errs.description = "Description is required"
    else if (form.description.length > 500) errs.description = "Description must be at most 500 characters"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 10)
    await onSubmit({ ...form, tags })
  }

  const field = (key: keyof PromptFormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Prompt" : "New Prompt"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => field("title", e.target.value)}
              placeholder="Short descriptive title"
              maxLength={150}
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => field("description", e.target.value)}
              placeholder="What does this prompt do?"
              rows={2}
              maxLength={500}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="content">Prompt Content *</Label>
            <Textarea
              id="content"
              value={form.content}
              onChange={(e) => field("content", e.target.value)}
              placeholder="Enter the full prompt text…"
              rows={6}
            />
            {errors.content && <p className="text-xs text-destructive">{errors.content}</p>}
          </div>

          <div className="space-y-1">
            <Label>Category *</Label>
            <Select
              value={form.category}
              onValueChange={(val) => field("category", val as Category)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Category).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="tags">Tags (comma-separated, max 10)</Label>
            <Input
              id="tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. gpt4, writing, creative"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving…" : initialData ? "Save Changes" : "Create Prompt"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
