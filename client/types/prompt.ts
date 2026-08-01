import { Category } from "@/types/category";


export interface Prompt {
    id: string;
    title: string;
    content: string;
    category: Category;
    tags: string[];
    description: string;
    pinned: boolean;
    favorite: boolean;
    createdAt: Date;
    updatedAt: Date;
}