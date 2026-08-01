import { Router } from "express"
import {
  getAllPrompt,
  createPrompt,
  updatePrompt,
  deletePrompt,
} from "../controllers/prompt.controller"
import { validate } from "../middleware/validate.middleware"
import {
  createPromptSchema,
  updatePromptSchema,
} from "../validators/prompt.validator"

const router = Router()

router.get("/", getAllPrompt)
router.post("/", validate(createPromptSchema), createPrompt)
router.put("/:id", validate(updatePromptSchema), updatePrompt)
router.delete("/:id", deletePrompt)

export default router