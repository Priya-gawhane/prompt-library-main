"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Copy, CheckCheck } from "lucide-react"
import { useState } from "react"
import type { Prompt } from "@/types/prompt"

interface PromptDetailModalProps {
  prompt: Prompt | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PromptDetailModal({
  prompt,
  open,
  onOpenChange,
}: PromptDetailModalProps) {
  const [copied, setCopied] = useState(false)

  if (!prompt) return null

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl pr-8">{prompt.title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 items-center">
          <Badge variant="secondary" className="capitalize">
            {prompt.category}
          </Badge>
          {prompt.pinned && (
            <Badge className="bg-amber-500 hover:bg-amber-600">Pinned</Badge>
          )}
          {prompt.favorite && (
            <Badge variant="destructive">Favorite</Badge>
          )}
          {prompt.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{prompt.description}</p>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Prompt Content</p>
            <Button size="sm" variant="outline" onClick={handleCopy} className="gap-2">
              {copied ? (
                <>
                  <CheckCheck className="w-4 h-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className="bg-muted/50 p-4 rounded-xl font-mono text-sm whitespace-pre-wrap leading-relaxed">
            {prompt.content}
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Created: {new Date(prompt.createdAt).toLocaleDateString()}</span>
          <span>Updated: {new Date(prompt.updatedAt).toLocaleDateString()}</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
