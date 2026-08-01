import { z } from "zod"
import { Category } from "../types/category"

export const createPromptSchema = z.object({
  title: z
    .string()
    .min(1, "Title cannot be empty")
    .max(150, "Title must be at most 150 characters"),

  content: z.string().min(1, "Prompt content cannot be empty"),

  description: z
    .string()
    .min(1, "Description cannot be empty")
    .max(500, "Description must be at most 500 characters"),

  category: z.enum(Object.values(Category) as [string, ...string[]], {
    error: `Category must be one of: ${Object.values(Category).join(", ")}`,
  }),

  tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .max(10, "Cannot have more than 10 tags")
    .default([]),

  pinned: z.boolean().default(false),
  favorite: z.boolean().default(false),
})

export const updatePromptSchema = createPromptSchema.partial()

export type CreatePromptInput = z.infer<typeof createPromptSchema>
export type UpdatePromptInput = z.infer<typeof updatePromptSchema>
