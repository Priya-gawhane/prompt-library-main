import { Request, Response } from "express";
import { getAllPromptService, createPromptService, updatePromptService, deletePromptService } from "../services/prompt.services";

export const getAllPrompt = async (req: Request, res: Response) => {
    try {
        const prompts = await getAllPromptService();
        return res.status(200).json({
            message: "Prompts fetched successfully",
            data: prompts,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching prompts",
            error: error,
        });
    }
}

export const createPrompt = async (req: Request, res: Response) => {
    try {
        const prompt = await createPromptService(req.body);
        return res.status(201).json({
            message: "Prompt created successfully",
            data: prompt,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating prompt",
            error: error,
        });
    }
}

export const updatePrompt = async (req: Request, res: Response) => {
    try {
        const prompt = await updatePromptService(req.params.id, req.body);
        return res.status(200).json({
            message: "Prompt updated successfully",
            data: prompt,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating prompt",
            error: error,
        });
    }
}

export const deletePrompt = async (req: Request, res: Response) => {
    try {
        const prompt = await deletePromptService(req.params.id);
        return res.status(200).json({
            message: "Prompt deleted successfully",
            data: prompt,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting prompt",
            error: error,
        });
    }
}