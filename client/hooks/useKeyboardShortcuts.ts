"use client"

import { useEffect } from "react"

type ShortcutMap = {
  [key: string]: (e: KeyboardEvent) => void
}

export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
      const isEditing = tag === "input" || tag === "textarea" || tag === "select"

      const key = [
        e.metaKey || e.ctrlKey ? "mod" : "",
        e.shiftKey ? "shift" : "",
        e.altKey ? "alt" : "",
        e.key.toLowerCase(),
      ]
        .filter(Boolean)
        .join("+")

      const handler = shortcuts[key]
      if (handler) {
        if (!isEditing || key.startsWith("mod")) {
          e.preventDefault()
          handler(e)
        }
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [shortcuts])
}
