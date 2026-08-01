import promptModel from "../models/prompt.model"
import { Prompt } from "../types/prompt"

type PromptInput = Omit<Prompt, "id" | "createdAt" | "updatedAt">

export const getAllPromptService = async () => {
  try {
    const prompts = await promptModel.find()
    return prompts
  } catch (error) {
    throw error
  }
}

export const createPromptService = async (prompt: PromptInput) => {
  try {
    const createdPrompt = await promptModel.create(prompt)
    return createdPrompt
  } catch (error) {
    throw error
  }
}

export const updatePromptService = async (
  id: Parameters<typeof promptModel.findByIdAndUpdate>[0],
  prompt: Partial<PromptInput>
) => {
  try {
    const updatedPrompt = await promptModel.findByIdAndUpdate(id, prompt, {
      new: true,
    })
    return updatedPrompt
  } catch (error) {
    throw error
  }
}

export const deletePromptService = async (
  id: Parameters<typeof promptModel.findByIdAndDelete>[0]
) => {
  try {
    const deletedPrompt = await promptModel.findByIdAndDelete(id)
    return deletedPrompt
  } catch (error) {
    throw error
  }
}