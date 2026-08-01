import mongoose from "mongoose"
import { Category } from "../types/category"

const PromptSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(Category),
    },
    tags: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  }
)

export default mongoose.model("Prompt", PromptSchema)