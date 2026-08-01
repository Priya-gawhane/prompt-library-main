"use client"

import { useRef, useState, useEffect } from "react"
import { animate } from "animejs"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Star,
  Pin,
  Copy,
  Edit,
  Trash2,
  CopyPlus,
  MoreVertical,
  GripVertical,
  CheckCheck,
  Eye,
} from "lucide-react"
import type { Prompt } from "@/types/prompt"

interface PromptCardProps {
  prompt: Prompt
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>
  onEdit: (prompt: Prompt) => void
  onDelete: (prompt: Prompt) => void
  onDuplicate: (prompt: Prompt) => void
  onToggleFavorite: (id: string) => void
  onTogglePinned: (id: string) => void
  onViewDetail: (prompt: Prompt) => void
  index?: number
}

export function PromptCard({
  prompt,
  dragHandleProps,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleFavorite,
  onTogglePinned,
  onViewDetail,
  index = 0,
}: PromptCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  // Mount animation for this card
  // Uses index for a pseudo-stagger effect when multiple mount at once (e.g., initial load or removing filter)
  useEffect(() => {
    if (!cardRef.current) return
    animate(cardRef.current, {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 700,
      delay: index * 60 + 80,
      easing: "easeOutExpo",
    })
  }, [])

  const handleMouseEnter = () => {
    if (!cardRef.current) return
    animate(cardRef.current, {
      scale: 1.01,
      translateY: -3,
      duration: 250,
      easing: "easeOutCubic",
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    animate(cardRef.current, {
      scale: 1,
      translateY: 0,
      duration: 250,
      easing: "easeOutCubic",
    })
  }

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(prompt.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="prompt-card opacity-0 translate-y-8"
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <div
              {...dragHandleProps}
              className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground mt-0.5 shrink-0"
              title="Drag to reorder"
            >
              <GripVertical className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <CardTitle
                className="text-base line-clamp-1 cursor-pointer hover:underline"
                onClick={() => onViewDetail(prompt)}
              >
                {prompt.title}
              </CardTitle>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                title={prompt.favorite ? "Remove from favorites" : "Add to favorites"}
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(prompt.id) }}
              >
                <Star
                  className={`w-4 h-4 ${prompt.favorite ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                title={prompt.pinned ? "Unpin" : "Pin to top"}
                onClick={(e) => { e.stopPropagation(); onTogglePinned(prompt.id) }}
              >
                <Pin
                  className={`w-4 h-4 ${prompt.pinned ? "fill-blue-400 text-blue-400" : "text-muted-foreground"}`}
                />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger render={
                  <Button size="icon" variant="ghost" className="h-7 w-7">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                } />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onViewDetail(prompt)}>
                    <Eye className="w-4 h-4 mr-2" /> View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(prompt)}>
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDuplicate(prompt)}>
                    <CopyPlus className="w-4 h-4 mr-2" /> Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => onDelete(prompt)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <CardDescription className="line-clamp-2 min-h-10 mt-1">
            {prompt.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="grow cursor-pointer" onClick={() => onViewDetail(prompt)}>
          <div className="bg-muted/50 p-3 rounded-xl text-sm font-mono text-muted-foreground line-clamp-3">
            {prompt.content}
          </div>
        </CardContent>

        <CardFooter className="flex-col items-start gap-3">
          <div className="flex flex-wrap gap-1.5 w-full">
            <Badge variant="secondary" className="capitalize text-xs">
              {prompt.category}
            </Badge>
            {prompt.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <Button
            size="sm"
            variant="outline"
            className="w-full gap-2"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <CheckCheck className="w-4 h-4 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Prompt
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
