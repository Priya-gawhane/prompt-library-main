import type { Prompt } from "@/types/prompt"
import api from "@/services/api"

export const getPrompts = async () => {
  const response = await api.get("/prompts")
  return response.data
}

export const createPrompt = async (
  data: Omit<Prompt, "id" | "createdAt" | "updatedAt">
) => {
  const response = await api.post("/prompts", data)
  return response.data
}

export const updatePrompt = async (
  id: string,
  data: Partial<Omit<Prompt, "id" | "createdAt" | "updatedAt">>
) => {
  const response = await api.put(`/prompts/${id}`, data)
  return response.data
}

export const deletePrompt = async (id: string) => {
  const response = await api.delete(`/prompts/${id}`)
  return response.data
}